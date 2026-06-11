import { sendLeadEmail } from "@/lib/leads";

type ContactPayload = {
  name?: string;
  email?: string;
  businessType?: string;
  budget?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
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
