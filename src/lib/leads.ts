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

const RESEND_ENDPOINT = "https://api.resend.com/emails";

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

/** The verified sender address (inside any "Name <addr>" form). Used as the
 *  from address for the founder acknowledgement. */
function senderAddress(): string {
  const configured = process.env.CONTACT_FROM_EMAIL;
  if (configured) {
    const match = configured.match(/<([^>]+)>/);
    return match ? match[1] : configured;
  }
  return "onboarding@resend.dev";
}

/** Where lead notifications and any replies should land. */
function inboxAddress(): string {
  return process.env.CONTACT_TO_EMAIL ?? contact.email;
}

/** Low-level Resend send. Never logs the API key. */
async function send(payload: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "email_not_configured" };

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from,
        to: [payload.to],
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
        subject: payload.subject,
        html: payload.html,
      }),
    });
    if (!res.ok) return { ok: false, error: "send_failed" };
    return { ok: true };
  } catch {
    return { ok: false, error: "send_failed" };
  }
}

/** Branded, responsive HTML for the founder acknowledgement sent back to the
 *  visitor. Inline styles are the base; the media query progressively enhances
 *  spacing and stacks the buttons on small screens. */
function buildAckHtml(lead: Lead): string {
  const firstName = escapeHtml(lead.name.split(/\s+/)[0] || lead.name);
  const need = escapeHtml(lead.need).replace(/\n/g, "<br/>");
  const accent = "#1B7FE0";
  const ink = "#0B0E14";
  const logoUrl = `https://${site.domain}/logo-dark-theme.png`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>Cybrum Solutions</title>
<style>
  body { margin:0; padding:0; background:#eef1f7; -webkit-text-size-adjust:100%; }
  a { text-decoration:none; }
  .btn { display:inline-block; color:#ffffff !important; font-size:14px; font-weight:600; padding:13px 26px; border-radius:10px; }
  @media only screen and (max-width:480px) {
    .px { padding:24px 20px !important; }
    .hpx { padding:26px 20px !important; }
    .h1 { font-size:19px !important; }
    .btn { display:block !important; width:100% !important; box-sizing:border-box; text-align:center; }
    .btn-cell { display:block !important; width:100% !important; padding:0 0 12px 0 !important; }
  }
</style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f7;">
    <tr>
      <td align="center" style="padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e6e9f0;">
          <tr>
            <td class="hpx" style="background:${ink};padding:26px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="${logoUrl}" width="44" height="44" alt="Cybrum Solutions" style="display:block;border:0;outline:none;text-decoration:none;width:44px;height:44px;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <div style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.3px;">Cybrum<span style="color:${accent};"> Solutions</span></div>
                    <div style="color:#8a93a6;font-size:12px;margin-top:5px;">One element. Every solution.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:32px;">
              <p class="h1" style="color:${ink};font-size:18px;font-weight:700;margin:0 0 16px;">Hi ${firstName},</p>
              <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0 0 16px;">
                Thank you for reaching out to Cybrum Solutions. Your message has reached our team and I have personally received it.
              </p>
              <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0 0 24px;">
                I will review what you need and get back to you, usually within 24 hours. If anything is urgent, message me directly on WhatsApp using the button below.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;border:1px solid #e6e9f0;border-radius:12px;margin:0 0 28px;">
                <tr>
                  <td style="padding:16px 18px;">
                    <div style="color:#8a93a6;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">What you sent us</div>
                    <div style="color:#3a4252;font-size:14px;line-height:1.6;">${need}</div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
                      <tr>
                        <td class="btn-cell" align="center" style="padding:0 6px;">
                          <a class="btn" href="${contact.whatsappLink}" style="background:#25D366;">Message on WhatsApp</a>
                        </td>
                        <td class="btn-cell" align="center" style="padding:0 6px;">
                          <a class="btn" href="${contact.linkedinFounder}" style="background:#0A66C2;">Connect on LinkedIn</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e6e9f0;margin-top:30px;">
                <tr>
                  <td style="padding-top:22px;">
                    <div style="color:${ink};font-size:15px;font-weight:700;">${escapeHtml(site.founder)}</div>
                    <div style="color:${accent};font-size:13px;margin-top:2px;">${escapeHtml(site.founderRole)}, ${escapeHtml(site.name)}</div>
                    <div style="margin-top:12px;font-size:13px;line-height:1.9;">
                      <a href="${contact.whatsappLink}" style="color:#3a4252;">WhatsApp: ${escapeHtml(contact.whatsappNumber)}</a><br/>
                      <a href="${contact.linkedinFounder}" style="color:#3a4252;">LinkedIn: linkedin.com/in/irazaahmed</a><br/>
                      <a href="https://${site.domain}" style="color:#3a4252;">${escapeHtml(site.domain)}</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f7f9fc;padding:16px 32px;border-top:1px solid #e6e9f0;">
              <div style="color:#9aa3b2;font-size:12px;font-family:Arial,Helvetica,sans-serif;">You are receiving this because you contacted Cybrum Solutions. Just reply to this email to reach the team.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send a warm, branded acknowledgement from the founder back to the visitor,
 * confirming their message was received. Best-effort: a failure here must never
 * affect the lead capture itself, so callers ignore the result.
 */
async function sendLeadAck(lead: Lead): Promise<SendResult> {
  if (!lead.email) return { ok: false, error: "no_recipient" };
  const firstName = lead.name.split(/\s+/)[0] || lead.name;
  return send({
    from: `${site.founder} (${site.name}) <${senderAddress()}>`,
    to: lead.email,
    replyTo: inboxAddress(),
    subject: `Thanks ${firstName}, your message reached Cybrum Solutions`,
    html: buildAckHtml(lead),
  });
}

/**
 * Email a lead to the Cybrum Solutions inbox via Resend. Shared by the contact
 * form and the chat assistant's capture_lead tool. Returns a result object
 * instead of throwing so callers can offer a WhatsApp fallback when email is
 * not configured. On success, also sends the visitor a founder acknowledgement
 * (best-effort). Never logs the API key.
 */
export async function sendLeadEmail(lead: Lead): Promise<SendResult> {
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Cybrum Solutions <onboarding@resend.dev>";

  const result = await send({
    from,
    to: inboxAddress(),
    replyTo: lead.email,
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
  });

  // Acknowledge the visitor only after the team notification succeeded, and
  // never let an ack failure change what we report to the caller.
  if (result.ok && lead.email) {
    await sendLeadAck(lead).catch(() => undefined);
  }

  return result;
}
