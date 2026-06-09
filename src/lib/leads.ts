import { contact, site } from "@/lib/site";

/** A captured sales lead, from either the contact form or the chat assistant. */
export type Lead = {
  name: string;
  email?: string;
  /** WhatsApp or phone number. */
  phone?: string;
  businessType?: string;
  /** What the visitor wants help with. */
  need: string;
  /** Rough budget, if mentioned. */
  budget?: string;
  /** Where the lead came from, e.g. "Contact form" or "Chat assistant". */
  source: string;
};

export type SendResult = { ok: boolean; error?: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `<p><strong>${label}:</strong> ${escapeHtml(value).replace(/\n/g, "<br/>")}</p>`;
}

/**
 * Email a lead to the Cybrum Solutions inbox via Resend. Shared by the contact
 * form and the chat assistant's capture_lead tool. Returns a result object
 * instead of throwing so callers can offer a WhatsApp fallback when email is
 * not configured. Never logs the API key.
 */
export async function sendLeadEmail(lead: Lead): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? contact.email;
  // Resend requires a verified sender; use onboarding sender until a domain is set up.
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Cybrum Solutions <onboarding@resend.dev>";

  if (!apiKey) return { ok: false, error: "email_not_configured" };

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
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject: `New lead (${lead.source}) from ${lead.name}`,
        html: `
          <h2>New lead from ${site.name} website</h2>
          <p><em>Source: ${escapeHtml(lead.source)}</em></p>
          ${row("Name", lead.name)}
          ${row("Email", lead.email)}
          ${row("WhatsApp / phone", lead.phone)}
          ${row("Business type", lead.businessType)}
          ${row("Budget", lead.budget)}
          <p><strong>What they need:</strong></p>
          <p>${escapeHtml(lead.need).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!res.ok) return { ok: false, error: "send_failed" };
    return { ok: true };
  } catch {
    return { ok: false, error: "send_failed" };
  }
}
