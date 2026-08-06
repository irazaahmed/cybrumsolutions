import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { site } from "@/lib/site";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { JsonLd } from "@/components/JsonLd";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = site.url;
const title = "CS Academy: Learn to Build and Earn with AI";
const description =
  "CS Academy is Cybrum Solutions' training arm — practical, cohort-style courses that teach you to build and monetize AI skills, taught by the team that ships production AI systems.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/academy" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${baseUrl}/academy`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export const revalidate = 300;

export default async function AcademyPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { modules: true } } },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "CS Academy Courses",
        itemListElement: courses.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          url: `${baseUrl}/academy/courses/${c.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Academy", item: `${baseUrl}/academy` },
        ],
      },
    ],
  };

  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-lines opacity-40" />
        <div className="glow-orb animate-float-slow absolute left-[-10%] top-1/4 h-[32rem] w-[32rem] [--glow:color-mix(in_srgb,var(--color-accent)_13%,transparent)]" />
      </div>

      <BlogNav />

      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <GraduationCap size={14} />
            CS Academy
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            Learn to build and{" "}
            <span className="text-gradient">earn with AI</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Cybrum Solutions&apos; training arm. Practical, structured courses taught by the
            team that ships production AI systems — not theory, real skills you can charge for.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {courses.map((course, i) => (
            <Reveal key={course.id} delay={i * 0.08} tilt className="h-full">
              <GlowCard className="flex h-full flex-col">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-accent-bright">
                  <GraduationCap size={26} strokeWidth={1.6} />
                </span>
                <h2 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
                  {course.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                  {course.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="text-lg font-semibold text-foreground">
                    PKR {course.priceAmount.toLocaleString()}
                  </span>
                  <Link
                    href={`/academy/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-foreground"
                  >
                    View course
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </GlowCard>
            </Reveal>
          ))}

          {courses.length === 0 && (
            <p className="text-muted">New courses are on the way — check back soon.</p>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />

      <JsonLd data={jsonLd} />
    </>
  );
}
