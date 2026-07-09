import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { site } from "@/lib/site";
import {
  getSkillBySlug,
  getPublishedSlugs,
  getRelatedSkills,
  renderSkillMarkdown,
} from "@/lib/skills";
import { Button } from "@/components/ui/Button";
import { SkillCard } from "@/components/skills/SkillCard";
import { BlogNav } from "@/components/blog/BlogNav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/visuals/ScrollProgress";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = site.url;

// Regenerate detail pages hourly so edits and new skills appear without a full
// redeploy. Slugs not yet built render on demand, then cache (dynamicParams).
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) return { title: "Skill not found" };

  const title = `${skill.title} | Cybrum Solutions Skills`;
  return {
    title,
    description: skill.description,
    keywords: skill.tags,
    alternates: { canonical: `/skills/${slug}` },
    openGraph: {
      title,
      description: skill.description,
      url: `${baseUrl}/skills/${slug}`,
      type: "article",
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: skill.description,
      images: ["/og.png"],
    },
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const related = await getRelatedSkills(slug, skill.category, 4);
  const usageNotesHtml = renderSkillMarkdown(skill.usageNotes);
  const contentHtml = renderSkillMarkdown(skill.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: skill.title,
    description: skill.description,
    url: `${baseUrl}/skills/${slug}`,
    keywords: skill.tags.join(", "),
    genre: skill.category,
    publisher: { "@id": `${baseUrl}/#organization` },
  };

  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-lines opacity-30" />
        <div className="glow-orb animate-float-slow absolute left-[-10%] top-1/4 h-[30rem] w-[30rem] [--glow:color-mix(in_srgb,var(--color-accent)_13%,transparent)]" />
      </div>

      <ScrollProgress />
      <BlogNav />

      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          All skills
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs font-medium text-accent-bright">
              {skill.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <Download size={13} />
              {skill.downloadCount.toLocaleString()} downloads
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {skill.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {skill.description}
          </p>

          {skill.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface/60 px-2.5 py-0.5 text-xs text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-7">
            <Button as="a" href={`/api/skills/${slug}/download`} download>
              <Download size={17} />
              Download Skill
            </Button>
          </div>
        </header>

        {skill.usageNotes.trim() && (
          <section className="mt-10">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Usage notes
            </h2>
            <div
              className="prose-blog mt-4"
              dangerouslySetInnerHTML={{ __html: usageNotesHtml }}
            />
          </section>
        )}

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Skill content
            </h2>
            <a
              href={`/api/skills/${slug}/download`}
              download
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-accent"
            >
              <Download size={15} />
              Download .md
            </a>
          </div>
          <div
            className="prose-blog rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </section>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
              Related skills
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((s) => (
                <SkillCard key={s.id} skill={s} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
      <JsonLd data={jsonLd} />
    </>
  );
}
