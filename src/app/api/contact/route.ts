import { sendLeadEmail } from "@/lib/leads";
import { rateLimit, clientIp } from "@/lib/rate-limit";

type ContactPayload = {
  name?: string;
  email?: string;
  businessType?: string;
  budget?: string;
  message?: string;
  /** Honeypot: hidden in the UI, so any value means a bot filled the form. */
  company?: string;
};

export async function POST(request: Request) {
  const limited = rateLimit("contact", clientIp(request), 5, 10 * 60 * 1000);
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot tripped: report success so the bot learns nothing, send nothing.
  if (body.company?.trim()) {
    return Response.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const businessType = body.businessType?.trim() || undefined;
  const budget = body.budget?.trim() || undefined;
  const message = body.message?.trim();

  // Basic validation
  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const result = await sendLeadEmail({
    name,
    email,
    businessType,
    budget,
    need: message,
    source: "Contact form",
  });

  if (!result.ok) {
    // Email isn't configured yet, so tell the client it can offer WhatsApp.
    const status = result.error === "email_not_configured" ? 503 : 502;
    return Response.json({ ok: false, error: result.error }, { status });
  }

  return Response.json({ ok: true });
}
