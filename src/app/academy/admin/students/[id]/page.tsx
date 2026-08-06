import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin/current";
import { approvePayment, rejectPayment } from "@/lib/admin/enrollment-actions";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";

export const metadata = { title: "Student fee history · CS Academy admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Awaiting payment",
  pending_review: "Under review",
  active: "Active",
  rejected: "Rejected",
};

const PAYMENT_STATUS_LABEL: Record<string, string> = {
  submitted: "Submitted — under review",
  approved: "Approved",
  rejected: "Rejected",
};

// The route param is the Enrollment id, not the Student id: a student's fee
// history is always viewed in the context of one specific course enrollment
// (mirrors how Payment rows are scoped by enrollmentId).
export default async function AdminStudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const enrollment = await prisma.enrollment.findUnique({
    where: { id },
    include: {
      student: true,
      course: true,
      payments: { orderBy: { submittedAt: "desc" } },
    },
  });
  if (!enrollment) notFound();

  const { student, course, payments } = enrollment;
  const pendingPayment = payments.find((p) => p.status === "submitted");

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8">
        <Link
          href={`/academy/admin/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} />
          Back to {course.title}
        </Link>

        <h1 className="mt-5 font-heading text-3xl font-semibold tracking-tight">{student.name}</h1>
        <p className="mt-2 text-sm text-muted">
          {student.email} &middot; {student.phone ?? "no phone on file"}
        </p>
        <p className="mt-1 text-sm text-muted">
          {course.title} &middot; {STATUS_LABEL[enrollment.status] ?? enrollment.status}
        </p>

        {pendingPayment && (
          <div className="mt-8 rounded-2xl border border-accent/40 bg-surface/60 p-5">
            <h2 className="font-medium text-foreground">Payment awaiting review</h2>
            <p className="mt-1 text-sm text-muted">
              PKR {pendingPayment.amount.toLocaleString()} &middot; {pendingPayment.method} &middot; Sender:{" "}
              {pendingPayment.senderName} &middot; Ref: {pendingPayment.transactionRef}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-only, authenticated route, never a static/optimized asset */}
            <img
              src={`/academy/admin/payments/${pendingPayment.id}/proof`}
              alt="Payment proof"
              className="mt-3 h-40 w-40 rounded-lg border border-border object-cover"
            />
            <div className="mt-4 flex items-center gap-3">
              <form action={approvePayment}>
                <input type="hidden" name="id" value={pendingPayment.id} />
                <button
                  type="submit"
                  className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-bright"
                >
                  Approve
                </button>
              </form>
              <form action={rejectPayment}>
                <input type="hidden" name="id" value={pendingPayment.id} />
                <button
                  type="submit"
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted hover:border-red-400/60 hover:text-red-400"
                >
                  Reject
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">Fee history</h2>
          {payments.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No payments submitted yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-border bg-surface/60 text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Method</th>
                    <th className="px-4 py-3 font-medium">Reference</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-3 text-muted">
                        {p.submittedAt.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-4 py-3">PKR {p.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted">{p.method}</td>
                      <td className="px-4 py-3 text-muted">{p.transactionRef}</td>
                      <td className="px-4 py-3 text-muted">{PAYMENT_STATUS_LABEL[p.status] ?? p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
