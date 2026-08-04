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
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
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
      { status: 422 },
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
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600",
      },
    },
  );
}
