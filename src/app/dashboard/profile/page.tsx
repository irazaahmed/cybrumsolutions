import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";
import { updateProfile, logout } from "@/lib/enrollment/actions";

export const metadata = { title: "Your profile · Cybrum Solutions" };
export const dynamic = "force-dynamic";

const inputClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] duration-300 focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]";

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Awaiting payment",
  pending_review: "Payment under review",
  active: "Active",
  rejected: "Payment rejected",
};

const PAYMENT_STATUS_LABEL: Record<string, string> = {
  submitted: "Submitted — under review",
  approved: "Approved",
  rejected: "Rejected",
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const session = await auth();
  const studentId = session?.user?.id;
  if (!studentId) redirect("/login");

  const { saved, error } = await searchParams;

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) redirect("/login");

  const [enrollments, payments] = await Promise.all([
    prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.findMany({
      where: { studentId },
      include: { course: true },
      orderBy: { submittedAt: "desc" },
    }),
  ]);

  const initial = (student.name.trim()[0] ?? "?").toUpperCase();

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Your profile</h1>
          <form action={logout}>
            <button type="submit" className="text-sm text-muted hover:text-foreground">
              Log out
            </button>
          </form>
        </div>

        {/* Avatar + edit form */}
        <div className="mt-8 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border bg-accent/15 text-2xl font-semibold text-accent-bright">
              {student.avatarFilename ? (
                // eslint-disable-next-line @next/next/no-img-element -- own /avatar route, not an optimizable static asset
                <img src={`/avatar/${student.avatarFilename}`} alt="" className="h-full w-full object-cover" />
              ) : (
                initial
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">{student.name}</p>
              <p className="text-sm text-muted">{student.email}</p>
            </div>
          </div>

          <form action={updateProfile} className="mt-6 flex flex-col gap-4" encType="multipart/form-data">
            <input type="text" name="name" defaultValue={student.name} placeholder="Full name" className={inputClass} />
            <input
              type="tel"
              name="phone"
              defaultValue={student.phone ?? ""}
              placeholder="WhatsApp / phone"
              className={inputClass}
            />
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Profile picture (JPEG/PNG/WEBP, max 2MB)
              </span>
              <input type="file" name="avatar" accept="image/jpeg,image/png,image/webp" className={inputClass} />
            </label>

            {saved === "1" && <p className="text-sm text-emerald-400">Saved.</p>}
            {error === "avatar" && (
              <p className="text-sm text-red-400">
                That image couldn&apos;t be saved — make sure it&apos;s a JPEG/PNG/WEBP under 2MB.
              </p>
            )}

            <button
              type="submit"
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent-bright sm:w-auto"
            >
              Save changes
            </button>
          </form>
        </div>

        {/* Enrollments */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">Your courses</h2>
          {enrollments.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Not enrolled in any course yet.</p>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {enrollments.map((e) => (
                <div key={e.id} className="flex items-center justify-between rounded-2xl border border-border bg-surface/60 p-5">
                  <span className="font-medium text-foreground">{e.course.title}</span>
                  <span className="text-sm text-muted">{STATUS_LABEL[e.status] ?? e.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment history */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">Payment history</h2>
          {payments.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No payments submitted yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-border bg-surface/60 text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Course</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Method</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-3 text-muted">
                        {p.submittedAt.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-4 py-3">{p.course.title}</td>
                      <td className="px-4 py-3 text-muted">PKR {p.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted">{p.method}</td>
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
