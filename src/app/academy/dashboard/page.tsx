import Link from "next/link";
import { redirect } from "next/navigation";
import { GraduationCap, Clock3, CheckCircle2, ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";
import { submitPayment, enrollInCourse } from "@/lib/enrollment/actions";
import { checkIsAdmin } from "@/lib/admin/current";

export const metadata = { title: "Dashboard · CS Academy", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const inputClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] duration-300 focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]";

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 px-5 py-4">
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  const studentId = session?.user?.id;
  if (!studentId) redirect("/academy/login");

  // Every sign-in method (Google or Credentials) lands here first, so
  // sending admins straight to the review queue happens once, here, instead
  // of duplicating the check in every login/signup code path.
  if (await checkIsAdmin()) redirect("/academy/admin");

  const { error } = await searchParams;

  const [enrollments, availableCourses] = await Promise.all([
    prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.course.findMany({
      where: { published: true, enrollments: { none: { studentId } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const activeCount = enrollments.filter((e) => e.status === "active").length;

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Welcome, {session.user?.name?.split(/\s+/)[0] ?? "there"}
        </h1>
        <p className="mt-2 text-sm text-muted">Your CS Academy learning dashboard.</p>

        {enrollments.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:w-fit sm:grid-cols-2">
            <StatTile label="Enrolled" value={enrollments.length} />
            <StatTile label="Active" value={activeCount} />
          </div>
        )}

        {enrollments.length === 0 ? (
          <p className="mt-8 text-muted">You&apos;re not enrolled in any course yet.</p>
        ) : (
          <div className="mt-8 flex flex-col gap-6">
            {enrollments.map((enrollment) =>
              enrollment.status === "pending_payment" ? (
                <div key={enrollment.id} className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-accent-bright">
                      <GraduationCap size={20} strokeWidth={1.6} />
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold">Complete your payment</h2>
                      <p className="text-sm text-muted">
                        {enrollment.course.title} &middot; PKR {enrollment.course.priceAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface/60 p-5 text-sm">
                    <p>
                      <strong>JazzCash:</strong> {process.env.PAYMENT_JAZZCASH_NUMBER ?? "—"}
                    </p>
                    <p>
                      <strong>Easypaisa:</strong> {process.env.PAYMENT_EASYPAISA_NUMBER ?? "—"}
                    </p>
                    <p>
                      <strong>Bank transfer:</strong> {process.env.PAYMENT_BANK_ACCOUNT_TITLE ?? "—"},{" "}
                      {process.env.PAYMENT_BANK_NAME ?? "—"}, A/C {process.env.PAYMENT_BANK_ACCOUNT_NUMBER ?? "—"}
                      {process.env.PAYMENT_BANK_IBAN ? `, IBAN ${process.env.PAYMENT_BANK_IBAN}` : ""}
                    </p>
                  </div>

                  <form action={submitPayment} className="mt-6 flex flex-col gap-4" encType="multipart/form-data">
                    <input type="hidden" name="enrollmentId" value={enrollment.id} />

                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted">Payment method</span>
                      <select name="method" defaultValue="jazzcash" className={inputClass}>
                        <option value="jazzcash">JazzCash</option>
                        <option value="easypaisa">Easypaisa</option>
                        <option value="bank">Bank transfer</option>
                      </select>
                    </label>

                    <input type="text" name="senderName" required placeholder="Sender's name" className={inputClass} />
                    <input
                      type="text"
                      name="transactionRef"
                      required
                      placeholder="Transaction ID / reference"
                      className={inputClass}
                    />
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted">
                        Payment screenshot (JPEG/PNG/WEBP, max 5MB)
                      </span>
                      <input
                        type="file"
                        name="screenshot"
                        required
                        accept="image/jpeg,image/png,image/webp"
                        className={inputClass}
                      />
                    </label>

                    {error === "validation" && (
                      <p className="text-sm text-red-400">Please fill in every field and attach a screenshot.</p>
                    )}
                    {error === "file" && (
                      <p className="text-sm text-red-400">
                        That file couldn&apos;t be saved — make sure it&apos;s a JPEG/PNG/WEBP under 5MB.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn-sheen mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)]"
                    >
                      Submit payment proof
                    </button>
                  </form>
                </div>
              ) : enrollment.status === "pending_review" ? (
                <div key={enrollment.id} className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-accent-bright">
                      <Clock3 size={20} strokeWidth={1.6} />
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold">We&apos;re verifying your payment</h2>
                      <p className="text-sm text-muted">
                        {enrollment.course.title} &middot; usually within 24 hours
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted">We&apos;ll email you as soon as you&apos;re enrolled.</p>
                </div>
              ) : (
                <Link
                  key={enrollment.id}
                  href={`/academy/dashboard/courses/${enrollment.id}`}
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_36px_-16px_var(--color-accent)] sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-accent-bright">
                      <CheckCircle2 size={20} strokeWidth={1.6} />
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold">{enrollment.course.title}</h2>
                      <p className="text-sm text-muted">Active &middot; view your course outline</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="shrink-0 text-accent-bright transition-transform group-hover:translate-x-1" />
                </Link>
              ),
            )}
          </div>
        )}

        {availableCourses.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Available courses</h2>
            <div className="mt-4 flex flex-col gap-3">
              {availableCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface/60 p-5"
                >
                  <div>
                    <p className="font-medium text-foreground">{course.title}</p>
                    <p className="text-sm text-muted">PKR {course.priceAmount.toLocaleString()}</p>
                  </div>
                  <form action={enrollInCourse}>
                    <input type="hidden" name="courseId" value={course.id} />
                    <button
                      type="submit"
                      className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-bright"
                    >
                      Enroll
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 text-sm">
          <Link href="/academy/dashboard/profile" className="text-accent-bright hover:underline">
            View your profile &amp; payment history
          </Link>
        </p>
      </main>
    </>
  );
}
