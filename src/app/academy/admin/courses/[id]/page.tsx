import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { requireAdmin } from "@/lib/admin/current";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";

export const metadata = { title: "Course roster · CS Academy admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Awaiting payment",
  pending_review: "Under review",
  active: "Active",
  rejected: "Rejected",
};

export default async function AdminCourseRosterPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: { student: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!course) notFound();

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
        <Link
          href="/academy/admin"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} />
          Back to admin
        </Link>

        <h1 className="mt-5 font-heading text-3xl font-semibold tracking-tight">{course.title}</h1>
        <p className="mt-2 text-sm text-muted">{course.enrollments.length} students enrolled</p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-border bg-surface/60 text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {course.enrollments.map((e) => (
                <tr key={e.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{e.student.name}</td>
                  <td className="px-4 py-3 text-muted">{e.student.email}</td>
                  <td className="px-4 py-3 text-muted">{STATUS_LABEL[e.status] ?? e.status}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/academy/admin/students/${e.id}`}
                      className="inline-flex items-center gap-1 text-accent-bright hover:underline"
                    >
                      Fee history
                      <ArrowRight size={13} />
                    </Link>
                  </td>
                </tr>
              ))}
              {course.enrollments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted">
                    No enrollments yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
