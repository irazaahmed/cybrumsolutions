import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, DollarSign, GraduationCap, Lock, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { NotesHeader, NotesFooter, P, Strong, Callout } from "./_components/notes-ui";
import { chapters } from "./_lib/chapters";

const pageTitle = "Anthropic Exam Prep: Agent Factory Study Notes";
const pageDescription =
  "Anthropic ke exam ki tayari ke liye Agent Factory book ka detailed Roman Urdu revision guide, chapter-wise: har chapter ka apna Core Idea, easy explanation, recap tables aur self-test quiz, bina kisi heading ya terminology miss kiye.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep" },
  openGraph: {
    type: "website",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/anthropic-exam-prep`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: pageTitle,
  description: pageDescription,
  url: `${site.url}/anthropic-exam-prep`,
  itemListElement: chapters
    .filter((c) => c.live)
    .map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/anthropic-exam-prep/${c.slug}`,
      name: c.title,
    })),
};

export default function AnthropicExamPrepIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={jsonLd} />
      <NotesHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-grid opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-bright">
              <GraduationCap size={14} />
              Anthropic Exam Preparation
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Agent Factory
              <span className="block text-gradient">Exam Study Notes</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted">
              Agent Factory book ka detailed aur asaan Roman Urdu revision
              guide, Anthropic exam ki tayari ke liye. Har chapter apna alag
              page hai: Core Idea, detailed explanation, diagrams aur
              self-test quiz ke saath &mdash; koi bhi heading ya terminology
              miss kiye bina.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted">
              {["Roman Urdu", "Chapter-wise", "Self Test"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border bg-card/60 px-3 py-1.5"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        {/* Intro / preface */}
        <section className="border-t border-border pt-12">
          <Reveal>
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Ye Notes Kya Hain
            </h2>
            <P>
              Ye page <Strong>Agent Factory book</Strong> ka ek detailed aur
              asaan Roman Urdu revision guide hai, Anthropic ke exam ki
              tayari ke liye. Har topic apna alag chapter page hai, taake ek
              hi lambi scroll mein sab kuch dhoondna na pade. Chapters ahista
              ahista add hote rahenge, jaise jaise topics organize honge.
            </P>
            <P>
              Har chapter mein teen cheezein hamesha milengi. Pehla, ek{" "}
              <Strong>Core Idea box</Strong> jo us poore chapter ka essence ek
              jagah deta hai. Doosra, <Strong>detailed explanation</Strong>{" "}
              easy examples ke saath, taake concept sirf ratta na lage balke
              samajh mein aaye. Teesra, ek <Strong>self-test quiz</Strong>{" "}
              us chapter ke aakhir mein, revision check karne ke liye.
            </P>
          </Reveal>
        </section>

        {/* Exam facts */}
        <section className="border-t border-border pt-12 mt-12">
          <Reveal>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
              <GraduationCap size={14} />
              Exam Ke Baare Mein
            </p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Ye Kis Exam Ki Tayari Hai
            </h2>
            <P>
              Anthropic ke do Foundations-level exams hain: <Strong>Claude
              Certified Associate (CCAO-F)</Strong> aur{" "}
              <Strong>Claude Certified Architect (CCAR-F)</Strong>.
              Panaversity ka apna free gate bhi hai, PCAO-F phir PCAR-F, jo
              isi blueprint par chalta hai aur FDE Internship tak rasai
              deta hai. Anthropic ke asal exams optional hain, aur unke
              liye registration Panaversity ke internship route se madad
              milti hai.
            </P>
          </Reveal>
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card/60 p-4">
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                  <Clock size={17} />
                </span>
                <p className="text-sm font-semibold text-foreground">Format</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  120 minute, 60 sawal, pass karne ke liye 1000 mein se 720
                  score chahiye
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-4">
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                  <DollarSign size={17} />
                </span>
                <p className="text-sm font-semibold text-foreground">Cost</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  CCAO-F $99, CCAR-F $125 (list price); Panaversity ke
                  PCAO-F/PCAR-F students ke liye pehle do attempts free hain
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-4">
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                  <ShieldCheck size={17} />
                </span>
                <p className="text-sm font-semibold text-foreground">Eligibility</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Anthropic ke official exam ke liye organizational account
                  chahiye (Anthropic Partner Academy se), personal email se
                  register nahi ho sakta
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <Callout label="Note">
              Ye maloomat{" "}
              <a
                href="https://agentfactory.panaversity.org/docs/certifications"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                Agent Factory book ke Certifications page
              </a>{" "}
              se li gayi hai (last checked: August 2026). Prices, format,
              aur eligibility waqt ke sath badal sakti hain, book karne se
              pehle Anthropic ke official exam guide se zaroor taeed
              karein.
            </Callout>
          </Reveal>
        </section>

        {/* Chapter cards */}
        <section className="border-t border-border pt-12 mt-12">
          <Reveal>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
              <BookOpen size={14} />
              Chapters
            </p>
            <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Poora Study Guide, 9 Chapters
            </h2>
            <P>
              Ye PCAO-F/CCAO-F ke official study guide ka poora order hai.
              Jo chapters likh chuke hain wo click karke parh sakte ho, baaki
              ka roadmap yahan pehle se pata chal jaye ga.
            </P>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {chapters.map((c, i) =>
              c.live ? (
                <Reveal key={c.slug} delay={i * 0.06}>
                  <Link
                    href={`/anthropic-exam-prep/${c.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/50"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent-bright">
                        {c.tag}
                      </span>
                      <span className="text-xs font-semibold text-muted">
                        Chapter {c.num}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-accent-bright">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {c.sub}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted">
                      <span className="inline-flex items-center gap-2">
                        <span>{c.readTime}</span>
                        <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem]">
                          {c.examCode}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-accent-bright">
                        Parhein
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ) : (
                <Reveal key={c.slug} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-dashed border-border p-5 opacity-60">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full border border-border px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted">
                        {c.tag}
                      </span>
                      <span className="text-xs font-semibold text-muted">
                        Chapter {c.num}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {c.sub}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-muted">
                      <Lock size={12} />
                      Jald aa raha hai
                    </div>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </section>
      </main>

      <NotesFooter />
    </div>
  );
}
