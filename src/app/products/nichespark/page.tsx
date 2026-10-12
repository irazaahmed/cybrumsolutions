import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ExternalLink } from "lucide-react";
import { site, contact } from "@/lib/site";
import { BlogNav } from "@/components/blog/BlogNav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { JsonLd } from "@/components/JsonLd";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = site.url;

/** NicheSpark ships through the Chrome Web Store; its own site hosts docs and guides. */
const STORE_URL =
  "https://chromewebstore.google.com/detail/nichespark/mfkjoekmjfphffamabelfngbonnjdgep";
const PRODUCT_SITE = "https://nichespark.tech";

export const metadata: Metadata = {
  // The root layout's title template appends " · Cybrum Solutions".
  title: "NicheSpark: Free Google Autocomplete Keyword Research Extension",
  description:
    "NicheSpark is a free Chrome extension by Cybrum Solutions that collects real Google Autocomplete suggestions with A to Z, prefix, suffix and template research, then saves, deduplicates and exports every long-tail keyword. No account, data stays in your browser.",
  keywords: [
    "NicheSpark",
    "Google Autocomplete keyword research",
    "keyword research Chrome extension",
    "free keyword research tool",
    "long-tail keyword finder",
    "A to Z keyword research",
    "alphabet soup keyword method",
    "niche research tool",
    "Cybrum Solutions NicheSpark",
  ],
  alternates: { canonical: "/products/nichespark" },
  openGraph: {
    title: `NicheSpark: Free Google Autocomplete Keyword Research Extension · ${site.name}`,
    description:
      "Collect real Google Autocomplete suggestions with A to Z, prefix and suffix research. Saved, deduplicated and ready to export. Free Chrome extension by Cybrum Solutions.",
    url: `${baseUrl}/products/nichespark`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NicheSpark: Free Google Autocomplete Keyword Research Extension | Cybrum Solutions",
    description:
      "Collect real Google Autocomplete suggestions with A to Z, prefix and suffix research. Free Chrome extension by Cybrum Solutions.",
    images: ["/og.png"],
  },
};

const benefits = [
  {
    title: "Real suggestions only",
    description:
      "NicheSpark reads the predictions Google actually shows in your browser. It never invents keywords or shows sample data as results, and every keyword keeps the query that found it.",
  },
  {
    title: "Hours of copy and paste, automated",
    description:
      "The manual Google Instant method means typing a query, waiting for the dropdown and copying each suggestion, dozens of times. NicheSpark runs that loop for you, one query at a time.",
  },
  {
    title: "Organized as it collects",
    description:
      "Duplicates are merged ignoring case and extra spaces. Each keyword records its source queries, research methods, first and last collected time, and how often it appeared.",
  },
  {
    title: "Honest about every query",
    description:
      "Each query is marked done, empty or failed, with the reason. Failures are never counted as completed, and Retry failed re-runs only the ones that need it.",
  },
  {
    title: "Respectful by design",
    description:
      "Collection is always started by you, runs one query at a time with a delay of at least 2 seconds, and stops if Google shows a verification or consent page. It never tries to get around it.",
  },
  {
    title: "Private: your data stays with you",
    description:
      "No account, no server, no tracking. Projects and keywords live only in your Chrome profile, and your own search-history entries are never saved as keywords.",
  },
];

const methods = [
  {
    name: "A to Z",
    example: "mobile car detailing a … z",
    description: "Seed plus every letter: 26 queries that map the breadth of a niche. Start from any letter.",
  },
  {
    name: "Prefix",
    example: "best / cheap / affordable + seed",
    description: "Words before the seed reveal commercial and comparison intent.",
  },
  {
    name: "Suffix",
    example: "seed + near me / cost / prices",
    description: "Words after the seed reveal local, pricing and service searches.",
  },
  {
    name: "Templates",
    example: "how much does {seed} cost",
    description: "Your own patterns with {seed} and {letter}; a {letter} template expands to 26 queries.",
  },
];

const steps = [
  {
    title: "Add it to Chrome",
    description:
      "Install NicheSpark free from the Chrome Web Store and pin it to your toolbar. No account or card needed.",
  },
  {
    title: "Create a project",
    description:
      "Enter a seed keyword and choose one of 18 Google domains and your interface language, so results match your market.",
  },
  {
    title: "Pick a method and start",
    description:
      "Preview the exact queries, set the delay, and click Start. Pause, resume or cancel at any time; progress is saved after every query.",
  },
  {
    title: "Filter, copy and export",
    description:
      "Search and filter by method or source query, then copy keywords or export all, filtered or selected ones to CSV. Back up a whole project as JSON.",
  },
];

const caseStudy = [
  { value: "33", label: "queries run" },
  { value: "316", label: "unique keywords" },
  { value: "4.9", label: "words per keyword" },
  { value: "200", label: "keywords of 5+ words" },
];

const included = [
  "A to Z, prefix, suffix & template research",
  "Pause, resume, cancel & retry failed",
  "Search, filters & six sort orders",
  "Copy & CSV export (all, filtered, selected)",
  "JSON backup & safe restore",
  "18 Google domains, any language",
];

const faqs = [
  {
    question: "Is NicheSpark really free?",
    answer:
      "Yes. NicheSpark is free on the Chrome Web Store, with no account and no card. Cybrum Solutions built it as a practical tool for SEO researchers, bloggers and site owners.",
  },
  {
    question: "Where do the keywords come from?",
    answer:
      "From the Google Autocomplete dropdown in your own browser. NicheSpark types each research query into the Google search box, waits for the suggestions to settle and saves exactly what Google displayed. It does not generate or guess keywords.",
  },
  {
    question: "Does it show search volume or keyword difficulty?",
    answer:
      "No. Autocomplete shows that people search a phrase, not how many do. Google itself says its predictions don't simply show the most common queries. Use NicheSpark to discover the phrases, then size the best ones in the metrics tool of your choice.",
  },
  {
    question: "Is my research data uploaded anywhere?",
    answer:
      "No. NicheSpark has no server. Projects and keywords are stored locally in your Chrome profile and never sent anywhere. Because of that, removing the extension deletes your data, so use Backup (JSON) to keep a copy.",
  },
  {
    question: "Will Google block me?",
    answer:
      "NicheSpark runs one query at a time with conservative delays, the way a person would. If Google shows a verification page anyway, the job stops and waits for you to resolve it yourself. It never bypasses it.",
  },
  {
    question: "Which countries and languages does it support?",
    answer:
      "You can research on 18 Google domains, including google.com, google.com.pk, google.co.uk, google.co.in, google.de and google.com.au, in any interface language, so the suggestions match your audience's market.",
  },
];

export default function NicheSparkProductPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/products/nichespark#product`,
        name: "NicheSpark",
        applicationCategory: "BrowserApplication",
        applicationSubCategory: "SEO keyword research",
        operatingSystem: "Google Chrome",
        description:
          "Chrome extension that collects real Google Autocomplete suggestions with A to Z, prefix, suffix and template research, then saves, deduplicates and exports the keywords locally.",
        url: PRODUCT_SITE,
        installUrl: STORE_URL,
        sameAs: [STORE_URL, PRODUCT_SITE],
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "NicheSpark",
            item: `${baseUrl}/products/nichespark`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
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
        <div className="glow-orb animate-float-slower absolute right-[-12%] top-2/3 h-[28rem] w-[28rem] [--glow:color-mix(in_srgb,var(--color-accent)_9%,transparent)]" />
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
            <span className="text-foreground">NicheSpark</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            Product · Free Chrome extension
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
            Find the long-tail keywords{" "}
            <span className="text-gradient">Google already suggests</span>
          </h1>
          <p className="mt-5 max-w-2xl font-heading text-lg font-medium text-foreground sm:text-xl">
            Discover Keywords. Uncover Opportunities.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            NicheSpark is a free Chrome extension that collects the real suggestions
            Google Autocomplete shows and turns them into an organized keyword list for
            your niche. Run A to Z, prefix and suffix research in one click; every
            result is saved, deduplicated and linked to the query that found it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
            >
              Add to Chrome, it&apos;s free
              <ExternalLink size={15} />
            </a>
            <a
              href={PRODUCT_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-6 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Visit nichespark.tech
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>

        {/* Benefits */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Why SEO researchers use it
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {benefits.map((item, i) => (
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

        {/* Research methods */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Four ways to expand any niche
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Queries are generated from your seed keyword, duplicates are removed, and you
            can preview every query before collection starts.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {methods.map((m, i) => (
            <Reveal key={m.name} delay={(i % 2) * 0.08} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
                <h3 className="font-semibold tracking-tight">{m.name}</h3>
                <p className="mt-2 rounded-lg border border-border bg-surface/60 px-3 py-2 font-mono text-xs text-accent-bright">
                  {m.example}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* How it works */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            From seed keyword to keyword list
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={(i % 2) * 0.08} className="h-full">
              <li className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-heading text-sm font-semibold text-accent-bright">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Real case study */}
        <Reveal className="mt-20">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            Real data
          </span>
          <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            One session, one seed: &quot;mobile car detailing&quot;
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            A real NicheSpark session on google.com surfaced clear themes: pricing,
            &quot;near me&quot; searches with distance and booking details, city pages,
            and a second audience of people starting a detailing business.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {caseStudy.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card/60 p-5 text-center backdrop-blur-sm">
                <p className="font-heading text-3xl font-semibold text-accent-bright">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <a
            href={`${PRODUCT_SITE}/blog/mobile-car-detailing-keyword-research-case-study/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-bright transition-colors hover:text-accent"
          >
            Read the full case study
            <ArrowRight size={15} />
          </a>
        </Reveal>

        {/* Included */}
        <Reveal className="mt-20">
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Everything included, free
            </span>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check size={14} className="mt-0.5 shrink-0 text-accent-bright" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Common questions
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {faqs.map((f, i) => (
            <Reveal key={f.question} delay={i * 0.05}>
              <details className="group rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-colors open:border-accent/50 hover:border-accent/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">{f.question}</h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-accent-bright transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown size={16} />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">{f.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="mt-20">
          <div className="rounded-3xl border border-accent/25 bg-gradient-to-b from-accent/10 to-transparent p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Run your first A to Z research in minutes
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Free, private and built on real Google suggestions. Add NicheSpark to Chrome
              and see what your niche is really searching for.
            </p>
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
            >
              Add NicheSpark to Chrome
              <ArrowRight size={16} />
            </a>
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Need a custom automation or AI agent for your SEO workflow?{" "}
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-bright transition-colors hover:text-accent"
            >
              Talk to Cybrum on WhatsApp
            </a>
          </p>
        </Reveal>
      </main>

      <Footer />
      <ScrollToTop />

      <JsonLd data={jsonLd} />
    </>
  );
}
