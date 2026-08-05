import { redirect } from "next/navigation";
import { auth } from "@/auth";

function isAdminEmail(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return adminEmails.includes(email.toLowerCase());
}

/**
 * Single-founder-stage admin gate: no roles table, just an allowlist of
 * emails via env var (mirrors cs-chatbot's lib/admin/current.ts).
 */
export async function requireAdmin(): Promise<{ email: string }> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");
  if (!isAdminEmail(email)) redirect("/dashboard");
  return { email };
}

/** Non-redirecting check, for conditionally showing an admin link in the UI. */
export async function checkIsAdmin(): Promise<boolean> {
  const session = await auth();
  const email = session?.user?.email;
  return email ? isAdminEmail(email) : false;
}
