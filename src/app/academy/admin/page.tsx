import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { requireAdmin } from "@/lib/admin/current";
import { approvePayment, rejectPayment } from "@/lib/admin/enrollment-actions";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";

export const metadata = { title: "Admin · CS Academy", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Awaiting payment",
  pending_review: "Under review",
  active: "Active",
  rejected: "Rejected",
};

export default async function AdminAcademyPage() {
  await requireAdmin();

  const [courses, enrollments, pendingPayments] = await Promise.all([
    prisma.course.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.enrollment.findMany({ select: { courseId: true, status: true } }),
    prisma.payment.findMany({
      where: { status: "submitted" },
      orderBy: { submittedAt: "asc" },
      include: { student: true, course: true },
    }),
  ]);

  const countsByCourse = new Map<string, Record<string, number>>();
  for (const e of enrollments) {
    const counts = countsByCourse.get(e.courseId) ?? {};
    counts[e.status] = (counts[e.status] ?? 0) + 1;
    countsByCourse.set(e.courseId, counts);
  }

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">CS Academy admin</h1>

        {/* Action needed: payments awaiting review */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">
            Action needed ({pendingPayments.length})
          </h2>
          {pendingPayments.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nothing pending review right now.</p>
          ) : (
            <div className="mt-4 flex flex-col gap-6">
              {pendingPayments.map((p) => (
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
                      src={`/academy/admin/payments/${p.id}/proof`}
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
        </div>

        {/* Courses overview */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-foreground">Courses</h2>
          <div className="mt-4 flex flex-col gap-3">
            {courses.map((course) => {
              const counts = countsByCourse.get(course.id) ?? {};
              const total = Object.values(counts).reduce((a, b) => a + b, 0);
              return (
                <Link
                  key={course.id}
                  href={`/academy/admin/courses/${course.id}`}
                  className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/60"
                >
                  <div>
                    <p className="font-medium text-foreground">{course.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {total} enrolled
                      {Object.entries(counts).length > 0 && (
                        <>
                          {" "}
                          &middot;{" "}
                          {Object.entries(counts)
                            .map(([status, count]) => `${count} ${STATUS_LABEL[status] ?? status}`)
                            .join(", ")}
                        </>
                      )}
                    </p>
                  </div>
                  <ArrowRight size={18} className="shrink-0 text-accent-bright transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
