// Low-level Resend sender shared by the lead-capture flow (src/lib/leads.ts)
// and the enrollment flow (src/lib/enrollment/notify.ts) so both use the
// exact same fetch call instead of duplicating it.

export type SendResult = { ok: boolean; error?: string };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Low-level Resend send. Never logs the API key. */
export async function send(payload: {
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
