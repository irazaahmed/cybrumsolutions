import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getPublishedSkills, getPublishedCategories } from "@/lib/skills";
import { SkillsBrowser } from "@/components/skills/SkillsBrowser";
import { BlogNav } from "@/components/blog/BlogNav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = site.url;

// Rebuild the page (and pick up newly published skills) at most once an hour,
// without a full redeploy.
export const revalidate = 3600;

// -------------------------------------------------------------------------
// Hero copy. Static and intentionally kept here so it is easy to edit.
// -------------------------------------------------------------------------
const HERO = {
  eyebrow: "Skills Library",
  title: "AI & Claude Code Skills",
  titleAccent: "you can download and run",
  intro:
    "A growing library of practical AI and Claude Code skills: reusable capabilities packaged as Markdown files. Browse, search, and download a skill, then drop it into Claude Code or your own agent to put it to work.",
  howToTitle: "How to use a skill",
  howTo: [
    "Find a skill below and open it to read what it does and how it behaves.",
    "Download the .md file with one click.",
    "Add it to your Claude Code skills folder (or your agent's toolset) and invoke it.",
  ],
} as const;

const title = "Skills Library: AI & Claude Code Skills";
const description =
  "Download practical AI and Claude Code skills from Cybrum Solutions as ready-to-use Markdown files. Browse, search, and drop them straight into Claude Code or your own agents.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/skills" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${baseUrl}/skills`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default async function SkillsIndexPage() {
  const [skills, categories] = await Promise.all([
    getPublishedSkills(),
    getPublishedCategories(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/skills#collection`,
    name: `${site.name} Skills Library`,
    description,
    url: `${baseUrl}/skills`,
    publisher: { "@id": `${baseUrl}/#organization` },
    hasPart: skills.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      description: s.description,
      url: `${baseUrl}/skills/${s.slug}`,
    })),
  };

  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-lines opacity-40" />
        <div className="glow-orb animate-float-slow absolute left-[-10%] top-1/4 h-[32rem] w-[32rem] [--glow:color-mix(in_srgb,var(--color-accent)_13%,transparent)]" />
        <div className="glow-orb animate-float-slower absolute bottom-1/4 right-[-10%] h-[30rem] w-[30rem] [--glow:color-mix(in_srgb,var(--color-accent-dim)_15%,transparent)]" />
      </div>

      <BlogNav />
      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            {HERO.eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            {HERO.title} <span className="text-gradient">{HERO.titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {HERO.intro}
          </p>

          <div className="mt-8 max-w-2xl rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              {HERO.howToTitle}
            </p>
            <ol className="mt-3 space-y-2">
              {HERO.howTo.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/5 text-xs font-semibold text-accent-bright">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <SkillsBrowser skills={skills} categories={categories} />
      </main>
      <Footer />
      <ScrollToTop />
      <JsonLd data={jsonLd} />
    </>
  );
}
