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

/** The product lives on its own subdomain; every CTA on this page points there. */
const APP_URL = "https://chatbot.cybrumsolutions.dev";

export const metadata: Metadata = {
  title: "Cybrum Chatbot: AI Chatbot Trained on Your Website",
  description:
    "Add an AI chatbot that answers only from your website's content. Live in minutes, cites its sources, captures leads, and speaks English, Urdu, and Roman Urdu.",
  alternates: { canonical: "/products/chatbot" },
  openGraph: {
    title: `Cybrum Chatbot · ${site.name}`,
    description:
      "An AI chatbot trained on your website's content. Try it on your own site before signing up.",
    url: `${baseUrl}/products/chatbot`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybrum Chatbot: AI Chatbot Trained on Your Website",
    description:
      "An AI chatbot trained on your website's content. Try it on your own site before signing up.",
    images: ["/og.png"],
  },
};

const benefits = [
  {
    title: "Answers from your content only",
    description:
      "Every reply is grounded in what your website actually says, with source links under each answer. When the answer isn't on your site, it says so and offers a human instead of inventing something.",
  },
  {
    title: "Live before you even sign up",
    description:
      "Paste your URL on the landing page and chat with a working bot trained on your own pages within a minute. No account, no card, no setup call.",
  },
  {
    title: "24/7 visitor support",
    description:
      "Visitors get instant answers at any hour, in the middle of the night or during Eid holidays, while every conversation is logged for you to review.",
  },
  {
    title: "Captures leads while it chats",
    description:
      "Interested visitors share their name and contact details in the conversation, and they land in your Leads tab ready to follow up.",
  },
  {
    title: "Speaks your customers' language",
    description:
      "English, Urdu, and Roman Urdu are supported out of the box. Set the language once and the bot answers the way your customers actually type.",
  },
  {
    title: "Shows you what it couldn't answer",
    description:
      "The Unanswered tab collects every question your content couldn't cover, which is a ready-made list of what to add to your website next.",
  },
];

const steps = [
  {
    title: "Paste your URL",
    description:
      "The landing page crawls up to 15 pages instantly and opens a live chat so you can test the answers before creating an account.",
  },
  {
    title: "Verify your domain",
    description:
      "Prove you own the site with a meta tag, a file upload, or a DNS record, whichever is easiest for you. No code changes required for the DNS option.",
  },
  {
    title: "Full crawl trains the bot",
    description:
      "The system reads your whole website, up to 200 pages depending on plan, and keeps the knowledge fresh with one-click recrawls.",
  },
  {
    title: "Paste one script tag",
    description:
      "A single line on your site puts the chat bubble live. Colors, name, greeting, and position are controlled from your dashboard, no redeploys.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "5,000",
    pages: "15 pages",
    messages: "500 messages / month",
    highlight: false,
  },
  {
    name: "Pro",
    price: "15,000",
    pages: "50 pages",
    messages: "2,000 messages / month",
    highlight: true,
  },
  {
    name: "Business",
    price: "40,000",
    pages: "200 pages",
    messages: "10,000 messages / month",
    highlight: false,
  },
];

const included = [
  "Source citations under every answer",
  "Lead capture into your dashboard",
  "English, Urdu & Roman Urdu",
  "Conversation & unanswered-question logs",
  "Brand colors, name & greeting control",
  "JazzCash, EasyPaisa & bank transfer billing",
];

const faqs = [
  {
    question: "Will the chatbot make things up about my business?",
    answer:
      "No. It answers only from the content crawled off your website, and every answer carries links to the pages it came from. When your site doesn't cover a question, the bot says it doesn't know and offers to connect the visitor to a human. Those questions are logged for you so you can fill the gap.",
  },
  {
    question: "How do I install it on my website?",
    answer:
      "You paste one script tag into your site, the same way Google Analytics is installed. It works on WordPress, Shopify, Wix, custom sites, anything that lets you add a script. The widget loads asynchronously and can never break or slow your page.",
  },
  {
    question: "How does payment work in Pakistan?",
    answer:
      "Plans are billed monthly in PKR via JazzCash, EasyPaisa, or bank transfer. You get an invoice reference, pay from your phone, upload the receipt, and your account is extended immediately while we verify, so approval never blocks your chatbot.",
  },
  {
    question: "What happens when my content changes?",
    answer:
      "Hit Recrawl in the dashboard and the bot re-reads your site. The Unanswered tab also shows you exactly which visitor questions your current content misses, so you know what to write next.",
  },
];

export default function ChatbotProductPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/products/chatbot#product`,
        name: "Cybrum Chatbot",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "An AI chatbot trained only on your website's content: answers with sources, captures leads, and supports English, Urdu, and Roman Urdu.",
        url: APP_URL,
        offers: plans.map((p) => ({
          "@type": "Offer",
          name: `${p.name} plan`,
          price: p.price.replace(",", ""),
          priceCurrency: "PKR",
        })),
        provider: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cybrum Chatbot",
            item: `${baseUrl}/products/chatbot`,
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
            <span className="text-foreground">Cybrum Chatbot</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            Product
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
            An AI chatbot trained on <span className="text-gradient">your website</span>,
            live in minutes
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Cybrum Chatbot reads your website and answers your visitors from that
            content alone, with sources, in English, Urdu, or Roman Urdu. Paste your
            URL and chat with it on your own content before you even sign up.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
            >
              Try it free on your website
              <ExternalLink size={15} />
            </a>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/60 px-6 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Ask us on WhatsApp
            </a>
          </div>
        </Reveal>

        {/* Benefits */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Why businesses use it
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

        {/* How it works */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            From URL to live chatbot
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

        {/* Pricing */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Simple monthly pricing in PKR
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Every plan includes the full product. Plans differ only in how many pages
            the bot learns and how many visitor messages it answers each month.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08} className="h-full">
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm transition-colors ${
                  plan.highlight
                    ? "border-accent/60 bg-accent/[0.07] shadow-[0_0_40px_-12px_var(--color-accent)]"
                    : "border-border bg-card/60"
                }`}
              >
                {plan.highlight && (
                  <span className="mb-3 self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-accent-bright">
                    Most popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-semibold tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-3">
                  <span className="font-heading text-3xl font-semibold">
                    Rs. {plan.price}
                  </span>
                  <span className="text-sm text-muted"> / month</span>
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 text-sm text-muted">
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-accent-bright" strokeWidth={2.5} />
                    {plan.pages} of your site
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={14} className="text-accent-bright" strokeWidth={2.5} />
                    {plan.messages}
                  </li>
                </ul>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex h-11 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                    plan.highlight
                      ? "bg-accent text-white hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)]"
                      : "border border-border bg-surface/60 text-foreground hover:border-accent"
                  }`}
                >
                  Get started
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Included in every plan
            </span>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0 text-accent-bright"
                    strokeWidth={2.5}
                  />
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

        {/* CTA */}
        <Reveal className="mt-20">
          <div className="rounded-3xl border border-accent/25 bg-gradient-to-b from-accent/10 to-transparent p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              See it answer from your own website
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              The demo runs on your real content, not a canned script. Paste your URL
              and judge the answers yourself; it takes about a minute.
            </p>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
            >
              Try Cybrum Chatbot free
              <ArrowRight size={16} />
            </a>
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Want a fully custom assistant instead?{" "}
            <Link
              href="/services/ai-chatbots"
              className="font-medium text-accent-bright transition-colors hover:text-accent"
            >
              Custom Chatbots &amp; Assistants
            </Link>
          </p>
        </Reveal>
      </main>

      <Footer />
      <ScrollToTop />

      <JsonLd data={jsonLd} />
    </>
  );
}
