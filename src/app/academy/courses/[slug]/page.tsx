import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug, published: true } });
  return { title: course ? `${course.title} · CS Academy` : "Course · CS Academy" };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug, published: true },
    include: { modules: { orderBy: { order: "asc" }, include: { lessons: { orderBy: { order: "asc" } } } } },
  });
  if (!course) notFound();

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent-bright">
          CS Academy Course
        </span>
        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {course.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {course.description}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <span className="text-2xl font-semibold text-foreground">
            PKR {course.priceAmount.toLocaleString()}
          </span>
          <Link
            href={`/academy/courses/${course.slug}/enroll`}
            className="btn-sheen inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)]"
          >
            Enroll Now
          </Link>
        </div>

        {course.modules.length > 0 && (
          <div className="mt-14">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <BookOpen size={20} className="text-accent-bright" />
              What you&apos;ll learn
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {course.modules.map((mod) => (
                <div key={mod.id} className="rounded-2xl border border-border bg-surface/60 p-5">
                  <h3 className="font-medium text-foreground">{mod.title}</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-start gap-2.5 text-sm text-muted">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-dim" />
                        {lesson.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
