import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST, GET } from "@/app/api/contact/route";

/**
 * Contact form API tests.
 *
 * The endpoint validates input and returns a WhatsApp redirect URL.
 * It does not send email server-side (no SMTP configured).
 */

describe("GET /api/contact", () => {
  it("returns endpoint documentation", async () => {
    const res = await GET();
    const body = await res.json();
    expect(body.endpoint).toBe("/api/contact");
    expect(body.method).toBe("POST");
    expect(body.schema).toBeDefined();
    expect(body.schema.name).toBeDefined();
    expect(body.schema.message).toBeDefined();
  });
});

describe("POST /api/contact", () => {
  it("rejects invalid JSON", async () => {
    const req = new Request("https://example.com/api/contact", {
      method: "POST",
      body: "not json",
      headers: { "Content-Type": "application/json" },
    });
    // Make json() throw
    vi.spyOn(req, "json").mockRejectedValueOnce(new Error("Invalid JSON"));
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  it("rejects missing required fields", async () => {
    const req = new Request("https://example.com/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "A" }), // too short, missing other fields
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.issues).toBeDefined();
    expect(body.issues.length).toBeGreaterThan(0);
  });

  it("rejects a too-short message", async () => {
    const req = new Request("https://example.com/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        subject: "Subject",
        message: "short", // < 10 chars
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  it("accepts a valid submission and returns a WhatsApp URL", async () => {
    const req = new Request("https://example.com/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Werner Schaap",
        email: "werner@example.com",
        phone: "+264 81 169 1942",
        subject: "Rooftop tent installation",
        message: "I would like to enquire about installing a Tentco rooftop tent on my Land Cruiser 79.",
        vehicle: "Land Cruiser 79",
        service: "Rooftop Tent Installation",
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.whatsappUrl).toMatch(/^https:\/\/wa\.me\/\d+/);
    // The WhatsApp URL should contain URL-encoded text
    expect(body.whatsappUrl).toContain("text=");
  });

  it("accepts a submission without optional fields", async () => {
    const req = new Request("https://example.com/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        subject: "General enquiry",
        message: "I would like more information about your products and services please.",
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.whatsappUrl).toMatch(/^https:\/\/wa\.me\/\d+/);
  });
});
