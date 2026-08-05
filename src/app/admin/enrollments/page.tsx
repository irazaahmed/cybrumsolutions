import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/current";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";
import { sendEnrollmentApprovedEmail, sendPaymentRejectedEmail } from "@/lib/enrollment/notify";

async function approvePayment(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { student: true, course: true, enrollment: true },
  });
  if (!payment || payment.status !== "submitted") return;

  const now = new Date();
  await prisma.$transaction([
    prisma.payment.update({ where: { id }, data: { status: "approved", reviewedAt: now } }),
    prisma.enrollment.update({
      where: { id: payment.enrollmentId },
      data: { status: "active", activatedAt: now },
    }),
  ]);

  await sendEnrollmentApprovedEmail(payment.student.email, payment.student.name, payment.course.title);

  revalidatePath("/admin/enrollments");
}

async function rejectPayment(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { student: true, course: true, enrollment: true },
  });
  if (!payment || payment.status !== "submitted") return;

  await prisma.$transaction([
    prisma.payment.update({ where: { id }, data: { status: "rejected", reviewedAt: new Date() } }),
    prisma.enrollment.update({ where: { id: payment.enrollmentId }, data: { status: "pending_payment" } }),
  ]);

  await sendPaymentRejectedEmail(payment.student.email, payment.student.name, payment.course.title);

  revalidatePath("/admin/enrollments");
}

export const metadata = { title: "Admin · Enrollments", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminEnrollmentsPage() {
  await requireAdmin();

  const payments = await prisma.payment.findMany({
    where: { status: "submitted" },
    orderBy: { submittedAt: "asc" },
    include: { student: true, course: true },
  });

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Enrollments to review ({payments.length})
        </h1>

        {payments.length === 0 ? (
          <p className="mt-8 text-muted">Nothing pending review right now.</p>
        ) : (
          <div className="mt-8 flex flex-col gap-6">
            {payments.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-surface/60 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {p.student.name} &middot; {p.student.email}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {p.course.title} &middot; PKR {p.amount.toLocaleString()} &middot; {p.method}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Sender: {p.senderName} &middot; Ref: {p.transactionRef}
                    </p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element -- admin-only, authenticated route, never a static/optimized asset */}
                  <img
                    src={`/admin/enrollments/${p.id}/proof`}
                    alt="Payment proof"
                    className="h-32 w-32 rounded-lg border border-border object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <form action={approvePayment}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-bright"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={rejectPayment}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted hover:border-red-400/60 hover:text-red-400"
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
