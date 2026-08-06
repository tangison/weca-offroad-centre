import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/config";

/**
 * POST /api/contact
 *
 * Accepts contact form submissions and forwards them via WhatsApp
 * (the business's primary contact channel) by returning a wa.me link.
 *
 * We do NOT send email server-side because:
 *   1. No SMTP credentials are configured in this deployment
 *   2. The business prefers WhatsApp for new enquiries
 *
 * The client uses the returned WhatsApp URL to redirect the user,
 * so the enquiry lands in the business's WhatsApp inbox immediately
 * with the message pre-filled.
 *
 * Spam protection:
 *   - Honeypot field `website` must be empty (bots fill hidden fields).
 *   - In-memory rate limit: 5 requests per IP per minute.
 *     Vercel serverless instances reset on cold start, so this is best-effort.
 *     For higher traffic, swap for @upstash/ratelimit + KV.
 *   - Zod schema validation on every field.
 *
 * If the client requests email later, add an email transport here
 * (Resend, Postmark, or Vercel's email integration) without changing
 * the public API.
 */

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200).optional().or(z.literal("")),
  phone: z.string().max(50).optional().or(z.literal("")),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  vehicle: z.string().max(200).optional().or(z.literal("")),
  service: z.string().max(200).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must agree to be contacted.",
  }),
  // Honeypot - must be empty for legitimate submissions.
  website: z.string().max(0).optional().or(z.literal("")),
});

// --- In-memory rate limiter (best-effort, per-instance) ---
// Vercel serverless resets this on cold start. For higher traffic, swap
// for @upstash/ratelimit + KV. 5 requests per IP per minute.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

type RateBucket = { count: number; firstAt: number };
const rateBuckets = new Map<string, RateBucket>();

function rateLimit(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, firstAt: now });
    return { ok: true, retryAfter: 0 };
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return {
      ok: false,
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - bucket.firstAt)) / 1000),
    };
  }
  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}

function getClientIp(request: Request): string {
  const headers = request.headers;
  // Vercel sets x-vercel-forwarded-for and x-forwarded-for.
  const xff = headers.get("x-vercel-forwarded-for") || headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many requests. Try again in ${limit.retryAfter} seconds.`,
        retryAfter: limit.retryAfter,
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(limit.retryAfter),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422, headers: { "Cache-Control": "no-store" } },
    );
  }

  const { name, email, phone, subject, message, vehicle, service } = parsed.data;

  // Build a WhatsApp message that the business owner can read at a glance
  const lines = [
    `*New enquiry from ${siteConfig.name} website*`,
    "",
    `*Name:* ${name}`,
  ];
  if (email) lines.push(`*Email:* ${email}`);
  if (phone) lines.push(`*Phone:* ${phone}`);
  if (vehicle) lines.push(`*Vehicle:* ${vehicle}`);
  if (service) lines.push(`*Service:* ${service}`);
  lines.push(`*Subject:* ${subject}`);
  lines.push("");
  lines.push(message);

  const text = lines.join("\n");
  const encoded = encodeURIComponent(text);

  // Strip the leading + and any spaces from the WhatsApp number
  const whatsappDigits = siteConfig.contact.whatsapp.replace(/[^\d]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encoded}`;

  return NextResponse.json(
    {
      ok: true,
      whatsappUrl,
      message: "Click the link to send your enquiry via WhatsApp.",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function GET() {
  return NextResponse.json(
    {
      endpoint: "/api/contact",
      method: "POST",
      schema: {
        name: "string (required, 2-100 chars)",
        email: "string (optional, valid email)",
        phone: "string (optional)",
        subject: "string (required, 2-200 chars)",
        message: "string (required, 10-5000 chars)",
        vehicle: "string (optional)",
        service: "string (optional)",
        consent: "boolean (required, must be true)",
        website: "string (honeypot, must be empty)",
      },
      rateLimit: `${RATE_LIMIT_MAX} requests per IP per ${RATE_LIMIT_WINDOW_MS / 1000}s`,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600",
      },
    },
  );
}
