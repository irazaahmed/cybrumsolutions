import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, ChevronDown, PlayCircle } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ enrollmentId: string }> }) {
  const { enrollmentId } = await params;
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: { course: true },
  });
  return {
    title: enrollment ? `${enrollment.course.title} · CS Academy` : "Course · CS Academy",
    robots: { index: false, follow: false },
  };
}

export default async function EnrollmentCoursePage({
  params,
}: {
  params: Promise<{ enrollmentId: string }>;
}) {
  const session = await auth();
  const studentId = session?.user?.id;
  if (!studentId) redirect("/academy/login");

  const { enrollmentId } = await params;

  const enrollment = await prisma.enrollment.findFirst({
    where: { id: enrollmentId, studentId },
    include: {
      course: {
        include: { modules: { orderBy: { order: "asc" }, include: { lessons: { orderBy: { order: "asc" } } } } },
      },
    },
  });
  if (!enrollment) notFound();
  if (enrollment.status !== "active") redirect("/academy/dashboard");

  const { course } = enrollment;

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8">
        <Link
          href="/academy/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} />
          Back to dashboard
        </Link>

        <h1 className="mt-5 font-heading text-3xl font-semibold tracking-tight">{course.title}</h1>
        <p className="mt-2 text-sm text-muted">Your course outline</p>

        <div className="mt-8 flex flex-col gap-4">
          {course.modules.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface/60 p-6 text-sm text-muted">
              Curriculum coming soon — we&apos;ll email you as lessons are added.
            </div>
          ) : (
            course.modules.map((mod, i) => (
              <details
                key={mod.id}
                open={i === 0}
                className="group rounded-2xl border border-border bg-surface/60 open:border-accent/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                  <span className="font-medium text-foreground">{mod.title}</span>
                  <ChevronDown size={18} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <ul className="flex flex-col gap-1 px-5 pb-5">
                  {mod.lessons.length === 0 ? (
                    <li className="text-sm text-muted">Lessons coming soon.</li>
                  ) : (
                    mod.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-start gap-2.5 rounded-lg px-2 py-2 text-sm text-muted"
                      >
                        <PlayCircle size={16} className="mt-0.5 shrink-0 text-accent-dim" />
                        <span>
                          <span className="text-foreground">{lesson.title}</span>
                          {lesson.summary && <span className="block text-xs text-muted">{lesson.summary}</span>}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </details>
            ))
          )}
        </div>
      </main>
    </>
  );
}
