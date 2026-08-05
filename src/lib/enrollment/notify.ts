import { send, escapeHtml } from "@/lib/email/send";
import { site, contact } from "@/lib/site";

// High-level, best-effort notification functions for the enrollment/payment
// lifecycle — mirrors cs-chatbot's lib/email/notify.ts. Every function
// swallows its own errors so a bad template or unconfigured RESEND_API_KEY
// can never break the signup/payment flow that triggered it.

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

function senderAddress(): string {
  return `${site.name} <${contact.email}>`;
}

function shell(title: string, bodyHtml: string): string {
  const accent = "#1B7FE0";
  const ink = "#0B0E14";
  const logoUrl = `https://${site.domain}/logo-dark-theme.png`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#eef1f7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f7;">
    <tr>
      <td align="center" style="padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e6e9f0;">
          <tr>
            <td style="background:${ink};padding:26px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img src="${logoUrl}" width="44" height="44" alt="${escapeHtml(site.name)}" style="display:block;border:0;width:44px;height:44px;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <div style="color:#ffffff;font-size:20px;font-weight:700;">Cybrum<span style="color:${accent};"> Solutions</span></div>
                    <div style="color:#8a93a6;font-size:12px;margin-top:5px;">One element. Every solution.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background:#f7f9fc;padding:16px 32px;border-top:1px solid #e6e9f0;">
              <div style="color:#9aa3b2;font-size:12px;">Cybrum Solutions &middot; ${escapeHtml(site.domain)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function firstName(name: string): string {
  return name.split(/\s+/)[0] || name;
}

/** Sent to the student right after they submit a payment proof. */
export async function sendPaymentSubmittedEmail(
  to: string,
  studentName: string,
  courseTitle: string,
): Promise<void> {
  const body = `
    <p style="color:#0B0E14;font-size:18px;font-weight:700;margin:0 0 16px;">Hi ${escapeHtml(firstName(studentName))},</p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0 0 16px;">
      We've received your payment proof for <strong>${escapeHtml(courseTitle)}</strong>. Our team will verify it and activate your enrollment, usually within 24 hours.
    </p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0;">You'll get another email as soon as you're enrolled.</p>
  `;
  try {
    await send({
      from: senderAddress(),
      to,
      subject: `Payment received — ${courseTitle}`,
      html: shell("Payment received", body),
    });
  } catch {
    // best-effort, ignore
  }
}

/** Sent to the admin inbox(es) whenever a student submits a payment proof. */
export async function sendAdminPaymentSubmittedEmail(
  studentName: string,
  studentEmail: string,
  courseTitle: string,
  amount: number,
  method: string,
): Promise<void> {
  const recipients = adminEmails();
  if (recipients.length === 0) return;
  const body = `
    <p style="color:#0B0E14;font-size:18px;font-weight:700;margin:0 0 16px;">New payment to review</p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0 0 8px;"><strong>Student:</strong> ${escapeHtml(studentName)} (${escapeHtml(studentEmail)})</p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0 0 8px;"><strong>Course:</strong> ${escapeHtml(courseTitle)}</p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0 0 8px;"><strong>Amount:</strong> PKR ${amount.toLocaleString()}</p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0;"><strong>Method:</strong> ${escapeHtml(method)}</p>
  `;
  try {
    await Promise.all(
      recipients.map((to) =>
        send({
          from: senderAddress(),
          to,
          subject: `New payment to review — ${studentName}`,
          html: shell("New payment to review", body),
        }),
      ),
    );
  } catch {
    // best-effort, ignore
  }
}

/** The enrollment confirmation email — sent once an admin approves the payment. */
export async function sendEnrollmentApprovedEmail(
  to: string,
  studentName: string,
  courseTitle: string,
): Promise<void> {
  const body = `
    <p style="color:#0B0E14;font-size:18px;font-weight:700;margin:0 0 16px;">Hi ${escapeHtml(firstName(studentName))},</p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0 0 16px;">
      You're officially enrolled in <strong>${escapeHtml(courseTitle)}</strong>. Welcome aboard!
    </p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0;">
      Log in to your dashboard any time to access the course: <a href="https://${escapeHtml(site.domain)}/dashboard" style="color:#1B7FE0;">${escapeHtml(site.domain)}/dashboard</a>
    </p>
  `;
  try {
    await send({
      from: senderAddress(),
      to,
      subject: `You're enrolled — ${courseTitle}`,
      html: shell("You're enrolled", body),
    });
  } catch {
    // best-effort, ignore
  }
}

/** Sent to the student if an admin rejects their submitted payment proof. */
export async function sendPaymentRejectedEmail(
  to: string,
  studentName: string,
  courseTitle: string,
): Promise<void> {
  const body = `
    <p style="color:#0B0E14;font-size:18px;font-weight:700;margin:0 0 16px;">Hi ${escapeHtml(firstName(studentName))},</p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0 0 16px;">
      We couldn't verify your payment proof for <strong>${escapeHtml(courseTitle)}</strong>. Please double-check the details and submit it again from your dashboard.
    </p>
    <p style="color:#3a4252;font-size:15px;line-height:1.6;margin:0;">
      If you think this is a mistake, message us on WhatsApp: <a href="${contact.whatsappLink}" style="color:#1B7FE0;">${escapeHtml(contact.phoneDisplay)}</a>
    </p>
  `;
  try {
    await send({
      from: senderAddress(),
      to,
      subject: `Action needed — payment for ${courseTitle}`,
      html: shell("Action needed", body),
    });
  } catch {
    // best-effort, ignore
  }
}
