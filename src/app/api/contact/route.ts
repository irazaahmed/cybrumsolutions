import { contact, site } from "@/lib/site";

type ContactPayload = {
  name?: string;
  email?: string;
  businessType?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const businessType = body.businessType?.trim() ?? "Not specified";
  const message = body.message?.trim();

  // Basic validation
  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? contact.email;
  // Resend requires a verified sender; use onboarding sender until a domain is set up.
  const from = process.env.CONTACT_FROM_EMAIL ?? "Cybrum Solutions <onboarding@resend.dev>";

  // Email isn't configured yet, so tell the client it can offer the WhatsApp fallback.
  if (!apiKey) {
    return Response.json(
      { ok: false, error: "email_not_configured" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New AI Audit request from ${name}`,
        html: `
          <h2>New lead from ${site.name} website</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Business type:</strong> ${escapeHtml(businessType)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
