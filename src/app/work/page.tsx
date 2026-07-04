import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { work } from "@/lib/content";
import { site } from "@/lib/site";
import { BlogNav } from "@/components/blog/BlogNav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { JsonLd } from "@/components/JsonLd";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = site.url;
const title = "Projects: AI Agents, Automation & Web Systems I've Built";
const description =
  "Every project shipped by Cybrum Solutions: AI systems, automation, e-commerce, dashboards, and web platforms, each with a live deployment and open source code.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${baseUrl}/work`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: `${site.name} Projects`,
        itemListElement: work.projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: p.live ?? p.link ?? `${baseUrl}/work`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Work", item: `${baseUrl}/work` },
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

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            Capabilities
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            Everything I&apos;ve <span className="text-gradient">built</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {work.intro} Every project below has a live deployment and public
            source code, see them running for yourself.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {work.projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="mt-16">
          <div className="rounded-3xl border border-accent/25 bg-gradient-to-b from-accent/10 to-transparent p-8 text-center sm:p-10">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Want a system like these for your business?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Tell us the workflow you want automated or the platform you want
              built. The free AI audit gives you an honest plan, cost, and
              timeline before any commitment.
            </p>
            <Link
              href="/#contact"
              className="btn-sheen mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)] hover:-translate-y-0.5"
            >
              Book a Free AI Audit
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </main>

      <Footer />
      <ScrollToTop />

      <JsonLd data={jsonLd} />
    </>
  );
}
