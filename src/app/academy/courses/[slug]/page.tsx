import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { site, contact } from "@/lib/site";
import { BlogNav } from "@/components/blog/BlogNav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { JsonLd } from "@/components/JsonLd";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

export const revalidate = 300;

const baseUrl = site.url;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug, published: true } });
  if (!course) return { title: "Course not found" };

  return {
    title: `${course.title} · CS Academy`,
    description: course.description,
    alternates: { canonical: `/academy/courses/${course.slug}` },
    openGraph: {
      title: `${course.title} · CS Academy`,
      description: course.description,
      url: `${baseUrl}/academy/courses/${course.slug}`,
      type: "website",
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} · CS Academy`,
      description: course.description,
      images: ["/og.png"],
    },
  };
}

// Splits "Week 1 — Understand AI, Remove the Fear" into a small badge label
// ("Week 1") and the rest of the module name, and pulls out the trailing
// "Output: ..." lesson so it can render as a deliverable, not a checklist item.
function splitModuleTitle(title: string) {
  const [badge, ...rest] = title.split(" — ");
  return { badge, name: rest.join(" — ") || badge };
}

function splitLessons(lessons: { id: string; title: string }[]) {
  const output = lessons.find((l) => l.title.toLowerCase().startsWith("output:"));
  const steps = lessons.filter((l) => l !== output);
  return { steps, output: output?.title.replace(/^output:\s*/i, "") };
}

// Course-specific marketing copy — CS Academy has one course today, so this
// lives alongside the page rather than in a shared content file.
const stats = [
  { value: "2", label: "Months, structured program" },
  { value: "0", label: "Coding required" },
  { value: "AI", label: "100% AI-powered learning" },
  { value: "PR", label: "Local network client system" },
];

const whatYoullBuild = [
  "AI-written captions, posts, and marketing copy tailored to a business's own voice",
  "AI-generated images and designs for product posts, offers, and promotions",
  "A full monthly content calendar, planned and produced in advance",
  "Consistent, professional posting that a business owner never has time to do themselves",
];

const included = [
  "Weekly live Q&A call",
  "Private WhatsApp group for peer support and doubt-clearing",
  "Submission review after every module",
  "“Verified by Cybrum” showcase post at course completion, featured on Cybrum's official platforms",
];

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "No. The entire course is built around no-code AI tools.",
  },
  {
    q: "Do I need a Fiverr or Upwork account?",
    a: "No. This course is specifically built around getting clients through your own local network.",
  },
  {
    q: "What will I actually have after 2 months?",
    a: "A real, working AI content skill, a showable portfolio asset, and your own attempt at landing a paying client through your own network.",
  },
  {
    q: "Is there a monthly payment option?",
    a: "Yes — PKR 2,999/month over 2 months (PKR 5,998 total), or pay PKR 5,499 one time and save. Message us on WhatsApp to set up the monthly plan.",
  },
];

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug, published: true },
    include: { modules: { orderBy: { order: "asc" }, include: { lessons: { orderBy: { order: "asc" } } } } },
  });
  if (!course) notFound();

  const monthOne = course.modules.slice(0, 4);
  const monthTwo = course.modules.slice(4, 8);
  const bonus = course.modules[8];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${baseUrl}/academy/courses/${course.slug}#course`,
        name: course.title,
        description: course.description,
        provider: { "@id": `${baseUrl}/#organization` },
        url: `${baseUrl}/academy/courses/${course.slug}`,
        offers: {
          "@type": "Offer",
          price: course.priceAmount,
          priceCurrency: course.priceCurrency,
          url: `${baseUrl}/academy/courses/${course.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Academy", item: `${baseUrl}/academy` },
          {
            "@type": "ListItem",
            position: 3,
            name: course.title,
            item: `${baseUrl}/academy/courses/${course.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
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
            <Link href="/academy" className="transition-colors hover:text-foreground">
              Academy
            </Link>
            <span aria-hidden className="mx-2">/</span>
            <span className="text-foreground">{course.title}</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <GraduationCap size={14} />
            A CS Academy Program
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
            From zero AI knowledge to your first paying client.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {course.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/academy/courses/${course.slug}/enroll`}
              className="btn-sheen inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
            >
              Enroll Now &mdash; PKR {course.priceAmount.toLocaleString()}
              <ArrowRight size={16} />
            </Link>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-6 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              <MessageCircle size={16} />
              Ask on WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-accent-bright">
            Admission open &middot; limited seats
          </p>
        </Reveal>

        {/* Stats strip */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-surface/60 px-4 py-5 text-center">
                <p className="text-2xl font-semibold text-accent-bright">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Method callout */}
        <Reveal className="mt-14">
          <div className="rounded-3xl border border-border bg-background p-6 sm:p-8">
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
              Built on the same method Cybrum Solutions founder{" "}
              <span className="text-accent-bright">Ahmed Raza</span> used to land his own first
              clients &mdash; no Fiverr, no Upwork, no cold platforms.
            </p>
          </div>
        </Reveal>

        {/* Core idea / pitch */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            You&apos;re not selling &ldquo;AI content&rdquo;
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Anyone can prompt ChatGPT. What you actually sell is a done-for-you system: local
            business owners don&apos;t lack access to AI &mdash; they lack the time, skill, and
            consistency to use it well.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-red-500/25 bg-red-500/[0.04] p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-red-400">Not this</p>
            <p className="mt-3 text-base italic leading-relaxed text-foreground/80 sm:text-lg">
              &ldquo;I&apos;ll make you AI content.&rdquo;
            </p>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-accent-bright">The pitch you learn</p>
            <p className="mt-3 text-base italic leading-relaxed text-foreground sm:text-lg">
              &ldquo;I&apos;ll manage this for you, so you don&apos;t have to. You focus on your
              business, I&apos;ll handle the rest.&rdquo;
            </p>
          </div>
        </div>

        {/* Who can join */}
        <Reveal className="mt-14">
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-accent-bright">
              <Users size={20} strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="font-semibold text-foreground">Who can join</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">
                Beginners, students, job seekers, small business owners, and anyone who wants to
                monetize their local network. No coding background required.
              </p>
            </div>
          </div>
        </Reveal>

        {/* The track & package */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            The track: Content &amp; Social Media Management, powered by AI
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            One focused, sellable skill, trained end to end: becoming a local business&apos;s
            AI-powered social media manager &mdash; deliverable in 2 months, genuinely masterable by
            a complete beginner.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {whatYoullBuild.map((item, i) => (
            <Reveal key={item} delay={(i % 2) * 0.08}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card/60 px-5 py-4 text-sm leading-relaxed text-muted sm:text-base">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-bright">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                {item}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <GlowCard>
            <p className="text-xs font-medium uppercase tracking-wider text-accent-bright">
              The package you sell
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
              AI Social Media Management
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Monthly content calendar, 10&ndash;15 AI-generated posts, captions, and designs,
              delivered with consistent posting.
            </p>
            <p className="mt-3 text-sm text-muted">
              <span className="text-foreground">For:</span> shops, clinics, food businesses,
              schools, real estate &mdash; any local business without a proper online presence.
            </p>
          </GlowCard>
        </Reveal>

        <Reveal className="mt-6">
          <p className="rounded-2xl border border-border bg-surface/60 px-5 py-4 text-sm leading-relaxed text-muted sm:text-base">
            <span className="text-foreground">Note:</span> chatbot and automation work (WhatsApp
            bots, website chatbots, lead capture) is not part of this course. In the bonus module
            you&apos;ll learn how to refer a client who needs that to Cybrum&apos;s own product,
            CS Chatbot &mdash; an optional extra opportunity, not a skill you build here.
          </p>
        </Reveal>

        {/* Roadmap */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            The 8-week roadmap
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Every module ends with a real, tangible output &mdash; never just theory.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-8">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
              <Target size={18} className="text-accent-bright" />
              Month 1 &mdash; AI Foundation &amp; First Output
            </h3>
            <div className="mt-5 flex flex-col gap-4">
              {monthOne.map((mod, i) => {
                const { badge, name } = splitModuleTitle(mod.title);
                const { steps, output } = splitLessons(mod.lessons);
                return (
                  <Reveal key={mod.id} delay={i * 0.05}>
                    <details
                      open={i === 0}
                      className="group rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-colors open:border-accent/50 hover:border-accent/40"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent-bright">
                            {badge?.replace("Week ", "")}
                          </span>
                          <h4 className="text-base font-semibold tracking-tight sm:text-lg">{name}</h4>
                        </span>
                        <ChevronDown size={16} className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-6">
                        <ul className="flex flex-col gap-2">
                          {steps.map((step) => (
                            <li key={step.id} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted sm:text-base">
                              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-dim" />
                              {step.title}
                            </li>
                          ))}
                        </ul>
                        {output && (
                          <p className="mt-4 rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3 text-sm text-foreground/90">
                            <span className="font-medium text-accent-bright">Output: </span>
                            {output}
                          </p>
                        )}
                      </div>
                    </details>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
              <Sparkles size={18} className="text-accent-bright" />
              Month 2 &mdash; Entering the Local Market
            </h3>
            <div className="mt-5 flex flex-col gap-4">
              {monthTwo.map((mod, i) => {
                const { badge, name } = splitModuleTitle(mod.title);
                const { steps, output } = splitLessons(mod.lessons);
                return (
                  <Reveal key={mod.id} delay={i * 0.05}>
                    <details className="group rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-colors open:border-accent/50 hover:border-accent/40">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent-bright">
                            {badge?.replace("Week ", "")}
                          </span>
                          <h4 className="text-base font-semibold tracking-tight sm:text-lg">{name}</h4>
                        </span>
                        <ChevronDown size={16} className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-6">
                        <ul className="flex flex-col gap-2">
                          {steps.map((step) => (
                            <li key={step.id} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted sm:text-base">
                              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-dim" />
                              {step.title}
                            </li>
                          ))}
                        </ul>
                        {output && (
                          <p className="mt-4 rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3 text-sm text-foreground/90">
                            <span className="font-medium text-accent-bright">Output: </span>
                            {output}
                          </p>
                        )}
                      </div>
                    </details>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {bonus && (
            <Reveal>
              <div className="rounded-2xl border border-accent/25 bg-accent/[0.05] p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent-bright">Bonus</p>
                <h4 className="mt-2 text-base font-semibold tracking-tight sm:text-lg">
                  Beyond content
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {bonus.lessons[0]?.title}
                </p>
              </div>
            </Reveal>
          )}
        </div>

        {/* What's included */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            What&apos;s included
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {included.map((item, i) => (
            <Reveal key={item} delay={(i % 2) * 0.08}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card/60 px-5 py-4 text-sm leading-relaxed text-muted sm:text-base">
                <BookOpen size={16} className="mt-0.5 shrink-0 text-accent-bright" />
                {item}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pricing */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Pricing
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
              <p className="text-sm font-medium text-muted">Monthly</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                PKR 2,999<span className="text-base font-normal text-muted">/month</span>
              </p>
              <p className="mt-2 text-sm text-muted">PKR 5,998 total over 2 months</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col rounded-2xl border border-accent/40 bg-accent/[0.06] p-6 sm:p-8">
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                Recommended
              </span>
              <p className="text-sm font-medium text-accent-bright">One-time payment</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                PKR {course.priceAmount.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-muted">Save PKR 499 vs the monthly plan</p>
              <Link
                href={`/academy/courses/${course.slug}/enroll`}
                className="btn-sheen mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)]"
              >
                Enroll Now
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* FAQ */}
        <Reveal className="mt-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Common questions
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-colors open:border-accent/50 hover:border-accent/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">{f.q}</h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-accent-bright transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown size={16} />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        {/* Final CTA */}
        <Reveal className="mt-20">
          <div className="rounded-3xl border border-accent/25 bg-gradient-to-b from-accent/10 to-transparent p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Admission open &mdash; limited seats
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Register now through CS Academy, a Cybrum Solutions company.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/academy/courses/${course.slug}/enroll`}
                className="btn-sheen inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
              >
                Enroll Now
                <ArrowRight size={16} />
              </Link>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-7 text-sm font-medium text-foreground transition-colors hover:border-accent"
              >
                <MessageCircle size={16} />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
      <ScrollToTop />

      <JsonLd data={jsonLd} />
    </>
  );
}
