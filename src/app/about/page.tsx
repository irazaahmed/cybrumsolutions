import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { ParallaxY } from "@/components/visuals/ParallaxY";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { about, founderProfile, stats, whyCybrum } from "@/lib/content";
import { site, contact } from "@/lib/site";

const baseUrl = site.url;
const title = "About Cybrum Solutions: AI-Native Company & Founder";
const description =
  "Cybrum Solutions is an AI-native company in Karachi, Pakistan, founded by Ahmed Raza. One founder directing an agentic AI workforce, delivering automation, AI agents, and web systems end to end.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${baseUrl}/about`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        url: `${baseUrl}/about`,
        name: title,
        description,
        about: { "@id": `${baseUrl}/#organization` },
        mainEntity: { "@id": `${baseUrl}/#ahmed-raza` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "About", item: `${baseUrl}/about` },
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

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-32 sm:px-8">
        {/* Page header */}
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            About
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            {site.name}: <span className="text-gradient">{site.tagline}</span>
          </h1>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* Founder */}
        <div className="mt-16 grid items-center gap-12 sm:mt-20 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal x={-32}>
            <ParallaxY from={24} to={-24} className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl bg-accent/15 blur-2xl"
              />
              <div className="group relative overflow-hidden rounded-3xl border border-border transition-colors duration-500 hover:border-accent/50">
                <Image
                  src="/ahmed.webp"
                  alt={`${site.founder}, AI Solutions Expert and ${site.founderRole} of ${site.name}`}
                  width={480}
                  height={560}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5">
                  <p className="font-heading text-lg font-semibold text-white">{site.founder}</p>
                  <p className="text-sm font-medium text-[#5eb0ff]">{site.founderRole}</p>
                </div>
              </div>
            </ParallaxY>
          </Reveal>

          <Reveal delay={0.1} x={32}>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {founderProfile.heading}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {founderProfile.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-5 text-lg font-medium text-gradient">
              {founderProfile.motto}
            </p>
            <a
              href={contact.linkedinFounder}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent-bright"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
              </svg>
              Connect with {site.founder} on LinkedIn
            </a>
          </Reveal>
        </div>

        {/* Credibility strip: real, defensible numbers */}
        <Reveal delay={0.05} tilt>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-surface/40 p-6 text-center transition-colors duration-300 hover:border-accent/40 sm:text-left"
              >
                <p className="font-heading text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Name story */}
        <Reveal delay={0.05} tilt>
          <Card className="mt-14 bg-surface/40">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {about.nameStory.heading}
                </h2>
                <p className="mt-4 text-lg font-medium text-gradient">
                  {about.nameStory.formula}
                </p>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                {about.nameStory.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="pt-2 font-medium text-foreground">
                  {about.nameStory.closing}
                </p>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Core values */}
        <div className="mt-16 sm:mt-20">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              What we <span className="text-gradient">stand for</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyCybrum.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} tilt>
                <div className="h-full rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50">
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <CtaBand />

      <Footer />
      <ScrollToTop />

      <JsonLd data={jsonLd} />
    </>
  );
}
