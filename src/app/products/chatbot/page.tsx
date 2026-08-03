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
import { ChatbotPricing } from "@/components/sections/ChatbotPricing";

const baseUrl = site.url;

/** The product lives on its own subdomain; every CTA on this page points there. */
const APP_URL = "https://chatbot.cybrumsolutions.dev";

export const metadata: Metadata = {
  title: "CS Chatbot: AI Chatbot for Your Website & WhatsApp | Cybrum Solutions",
  description:
    "CS Chatbot is an AI chatbot for your website, with an optional WhatsApp add-on, that answers only from your own content, cites its sources, and captures leads in English, Urdu, or Roman Urdu. PKR pricing, live in minutes. Try it free on your own site first.",
  keywords: [
    "CS Chatbot",
    "AI chatbot for website",
    "AI chatbot for WhatsApp",
    "WhatsApp AI chatbot Pakistan",
    "chatbot for website free",
    "website chatbot builder",
    "chatbot pricing Pakistan",
    "chatbot monthly plan Pakistan",
    "Roman Urdu chatbot for website",
    "AI chatbot for small business Pakistan",
    "lead-capture chatbot Pakistan",
    "Cybrum Solutions chatbot",
  ],
  alternates: { canonical: "/products/chatbot" },
  openGraph: {
    title: `CS Chatbot: AI Chatbot for Your Website & WhatsApp · ${site.name}`,
    description:
      "An AI chatbot trained on your website's content, with an optional WhatsApp add-on for your own number. Cites sources, captures leads, PKR pricing. Try it on your own site before signing up.",
    url: `${baseUrl}/products/chatbot`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CS Chatbot: AI Chatbot for Your Website & WhatsApp | Cybrum Solutions",
    description:
      "An AI chatbot trained on your website's content, with an optional WhatsApp add-on for your own number. Cites sources, captures leads, PKR pricing.",
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
      "The system reads your whole website, from 100 pages on Starter up to unlimited on Business, and keeps the knowledge fresh with one-click recrawls.",
  },
  {
    title: "Paste one script tag",
    description:
      "A single line on your site puts the chat bubble live. Colors, name, greeting, and position are controlled from your dashboard, no redeploys.",
  },
];

// Monthly prices for structured data only; the interactive cards (with all
// billing cycles) live in <ChatbotPricing />. Keep in sync with that component.
const planOffers = [
  { name: "Starter", price: "3499" },
  { name: "Pro", price: "8999" },
  { name: "Business", price: "23999" },
  { name: "WhatsApp Add-on", price: "4499" },
  { name: "WhatsApp Standalone", price: "4999" },
];

const whatsappSteps = [
  {
    title: "Request it in your dashboard",
    description:
      "WhatsApp is switched on per account so number connections stay clean and reliable. Sign up, then request WhatsApp access from your dashboard and we will enable it for your account.",
  },
  {
    title: "Scan a QR code",
    description:
      "Once enabled, link your own WhatsApp Business number from your dashboard the same way you would link WhatsApp Web. No app, no separate number to manage.",
  },
  {
    title: "It just works",
    description:
      "The exact same AI, trained on the exact same crawled content, with the exact same lead capture and conversation history, now also answering on WhatsApp.",
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
    question: "Does CS Chatbot work on WhatsApp too?",
    answer:
      "Yes. CS Chatbot can also answer on your own WhatsApp Business number, either as an add-on to any plan or on its own with no website plan at all, using the exact same crawled content, lead capture, and conversation history as the website widget. It is not Meta's official WhatsApp Business API, it runs on Cybrum Solutions' own infrastructure. It is enabled per account, so request it from your dashboard after you sign up and we will turn it on for you.",
  },
  {
    question: "How is this different from a typical WhatsApp bot?",
    answer:
      "Most WhatsApp bots are scripted menus, or they forward every message to a generic AI with no knowledge of your business. CS Chatbot, on your website or on your own WhatsApp number, only answers from your actual content. On the website every answer also cites the exact page it came from. When it does not know something, it says so instead of guessing.",
  },
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
      "Plans are billed in PKR: monthly, quarterly (save 10%), or yearly (save 20%), via JazzCash, EasyPaisa, or bank transfer. You get an invoice reference, pay from your phone, upload the receipt, and your account is extended immediately while we verify, so approval never blocks your chatbot.",
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
        name: "CS Chatbot",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "An AI chatbot trained only on your website's content, with an optional WhatsApp add-on: answers with sources, captures leads, and supports English, Urdu, and Roman Urdu.",
        url: APP_URL,
        offers: planOffers.map((p) => ({
          "@type": "Offer",
          name: `${p.name} plan`,
          price: p.price,
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
            name: "CS Chatbot",
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
            <span className="text-foreground">CS Chatbot</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            Product
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
            Stop losing customers who leave before{" "}
            <span className="text-gradient">you reply</span>
          </h1>
          <p className="mt-5 max-w-2xl font-heading text-lg font-medium text-foreground sm:text-xl">
            Cheaper than one support hire, answering every visitor 24/7.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            CS Chatbot is an AI chatbot for your website: it reads your pages and
            answers visitors from that content alone, with sources, in English, Urdu,
            or Roman Urdu. Paste your URL and chat with it on your own content before
            you even sign up.
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

        {/* WhatsApp add-on */}
        <Reveal className="mt-20">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            Add-on
          </span>
          <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            One AI, on your website and your own WhatsApp number
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            CS Chatbot does not have to stay on your website. Connect your own WhatsApp Business
            number and the same AI, trained on the same crawled content, with the same lead
            capture, answers there too. One knowledge base, two channels, one dashboard.
          </p>
        </Reveal>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {whatsappSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="h-full">
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
            Simple chatbot pricing in PKR for Pakistani businesses
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Every plan includes the full product. Plans differ only in how many pages
            the bot learns and how many visitor conversations it answers each month.
          </p>
        </Reveal>
        <div className="mt-8">
          <ChatbotPricing />
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
              Try CS Chatbot free
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
