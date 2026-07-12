import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import type { LocationPage } from "@/lib/locations";
import { site, contact } from "@/lib/site";
import { servicePages } from "@/lib/services";
import { BlogNav } from "@/components/blog/BlogNav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { JsonLd } from "@/components/JsonLd";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = site.url;

/**
 * Renders a local SEO landing page from a LocationPage record. Shares the
 * layout language of the service pages so the site feels consistent, while the
 * copy and structured data carry the city / country search intent.
 */
export function LocalLanding({ page }: { page: LocationPage }) {
  const url = `${baseUrl}/${page.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        description: page.metaDescription,
        serviceType: "AI automation and AI agent development",
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: { "@type": "Place", name: page.place },
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
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
        {/* Hero */}
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span aria-hidden className="mx-2">/</span>
            <span className="text-foreground">{page.place}</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            {page.eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {page.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
            >
              Book a Free AI Audit
              <ArrowRight size={16} />
            </Link>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/60 px-6 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>

        {/* Offerings */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            What we build for {page.place} businesses
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {page.offerings.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.08} className="h-full">
              <GlowCard className="h-full">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {/* Use cases */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            This is for you if
          </h2>
          <ul className="mt-8 flex flex-col gap-3">
            {page.useCases.map((useCase) => (
              <li
                key={useCase}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/60 px-5 py-4 text-sm leading-relaxed text-muted sm:text-base"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-bright">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                {useCase}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Proof */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            How we work
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {page.proof.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Common questions
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {page.faqs.map((f, i) => (
            <Reveal key={f.question} delay={i * 0.05}>
              <details className="group rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-colors open:border-accent/50 hover:border-accent/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                    {f.question}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-accent-bright transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown size={16} />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">
                  {f.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        {/* CTA + related services */}
        <Reveal className="mt-20">
          <div className="rounded-3xl border border-accent/25 bg-gradient-to-b from-accent/10 to-transparent p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Start with a free AI audit
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Tell us about the workflow or system you have in mind. You get a clear,
              honest answer on what is worth building, what it costs, and how long it takes.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
            >
              Book a Free AI Audit
              <ArrowRight size={16} />
            </Link>
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Explore our services:{" "}
            {servicePages.map((s, i) => (
              <span key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="font-medium text-accent-bright transition-colors hover:text-accent"
                >
                  {s.name}
                </Link>
                {i < servicePages.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </Reveal>
      </main>

      <Footer />
      <ScrollToTop />

      <JsonLd data={jsonLd} />
    </>
  );
}
