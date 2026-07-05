import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Boxes,
  CheckCircle2,
  ChefHat,
  Download,
  FileText,
  GraduationCap,
  Lightbulb,
  ListChecks,
  MessageSquare,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { site, contact } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";
import { BlogToc } from "@/components/blog/BlogToc";
import type { TocItem } from "@/lib/blog";

const pageTitle = "GIAIC Quarter 5 Mid Term: AI Agent Factory Study Notes";
const pageDescription =
  "Panaversity Agent Factory Foundations course ke saare chapters ka detailed Roman Urdu revision guide: Orientation, How to Think in the AI Era, What AI Actually Is, Prompting 2026, Markdown In HTML Out, Code You Never Write, Skills and Connectors. Cheat sheet aur self-test quiz ke saath.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/exam" },
  openGraph: {
    type: "article",
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/exam`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

/* ------------------------------------------------------------------ */
/*  Table of contents (reuses the blog scroll-spy sidebar)             */
/* ------------------------------------------------------------------ */

const toc: TocItem[] = [
  { id: "intro", text: "Ye Notes Kya Hain", level: 2 },
  { id: "ch00", text: "00 · Orientation", level: 2 },
  { id: "ch01", text: "01 · How to Think in the AI Era", level: 2 },
  { id: "ch02", text: "02 · What AI Actually Is", level: 2 },
  { id: "ch03", text: "03 · AI Prompting in 2026", level: 2 },
  { id: "ch04", text: "04 · Markdown In, HTML Out", level: 2 },
  { id: "ch05", text: "05 · Code You Never Write", level: 2 },
  { id: "ch06", text: "06 · Skills and Connectors", level: 2 },
  { id: "cheat-sheet", text: "Quick Revision Cheat Sheet", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
  { id: "downloads", text: "PDF Downloads", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Small presentational helpers (server components)                   */
/* ------------------------------------------------------------------ */

function ChapterHeader({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-8">
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
        <BookOpen size={14} />
        Chapter {num}
      </p>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 text-muted">{sub}</p>
    </div>
  );
}

/** Highlighted "Core Idea" box that opens every chapter, mirroring the PDF. */
function CoreIdea({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
      <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-bright">
        <Lightbulb size={14} />
        Core Idea
      </p>
      <p className="leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}

/** Callout for practical examples, engineering angles, and key rules. */
function Callout({
  label,
  tone = "accent",
  children,
}: {
  label: string;
  tone?: "accent" | "warn";
  children: ReactNode;
}) {
  const box =
    tone === "warn"
      ? "border-amber-500/30 bg-amber-500/5"
      : "border-border bg-card/60";
  const labelColor = tone === "warn" ? "text-amber-500" : "text-accent-bright";
  return (
    <div className={`my-6 rounded-2xl border p-5 ${box}`}>
      <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${labelColor}`}>
        {label}
      </p>
      <div className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">{children}</div>
    </div>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 mt-10 text-lg font-semibold tracking-tight sm:text-xl">
      {children}
    </h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 leading-relaxed text-muted">{children}</p>;
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

/** Chapter recap rendered as a responsive two/three column table. */
function RecapTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[28rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-card/80 text-left">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-accent-bright"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top ${
                    j === 0 ? "font-medium text-foreground" : "text-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Horizontal numbered flow with arrows; wraps into a column on mobile. */
function Flow({ steps, loop = false }: { steps: string[]; loop?: boolean }) {
  return (
    <div className="my-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-1.5">
      {steps.map((step, i) => (
        <div key={step} className="contents">
          <div className="flex flex-1 items-start gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 sm:block sm:text-center">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 font-heading text-xs font-bold text-accent-bright sm:mx-auto sm:mb-2">
              {i + 1}
            </span>
            <span className="text-sm leading-snug text-foreground/90">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <ArrowRight
              size={16}
              className="mx-auto shrink-0 rotate-90 text-accent sm:mx-0 sm:rotate-0"
            />
          )}
        </div>
      ))}
      {loop && (
        <div className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-accent/40 px-3 py-3 text-xs font-medium text-accent-bright">
          <RefreshCw size={14} />
          Loop repeat
        </div>
      )}
    </div>
  );
}

/** Vertical step ladder (verification ladder, build loop). */
function Ladder({ steps }: { steps: { title: string; note: string }[] }) {
  return (
    <ol className="my-6 space-y-0">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 pb-5 last:pb-0">
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute left-[0.9375rem] top-8 h-full w-px bg-border"
            />
          )}
          <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background font-heading text-sm font-bold text-accent-bright">
            {i + 1}
          </span>
          <div className="pt-1">
            <p className="font-medium text-foreground">{s.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Simple check-item list used for rules and security checklists. */
function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="my-5 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Diagrams                                                            */
/* ------------------------------------------------------------------ */

/** 10-80-10 rule: proportional segmented bar plus legend cards. */
function TenEightyTenDiagram() {
  const segments = [
    { pct: "10%", label: "Human Intent", grow: "sm:grow-[1]", cls: "bg-accent/25 text-accent-bright" },
    { pct: "80%", label: "AI Execution", grow: "sm:grow-[8]", cls: "bg-accent text-white" },
    { pct: "10%", label: "Human Verification", grow: "sm:grow-[1]", cls: "bg-accent/25 text-accent-bright" },
  ];
  const notes = [
    { t: "Pehle 10%, Human Intent", d: "Clear prompt, spec ya goal set karna. Sabse zyada leverage isi stage mein hai, ye ghalat hui to baaki 90% bhi galat direction mein jayega." },
    { t: "Beech ke 80%, AI Execution", d: "AI heavy lifting karta hai: summarizing, drafting, generating, analyzing, formatting. Time yahan sabse zyada bachta hai." },
    { t: "Aakhri 10%, Human Verification", d: "Quality check, output sharp karna, final approval. Ye stage kabhi skip nahi hoti, chahe AI kitna bhi confident lage." },
  ];
  return (
    <figure className="my-7">
      <div className="flex flex-col gap-1.5 sm:flex-row">
        {segments.map((s) => (
          <div
            key={s.label}
            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3.5 text-center font-heading text-sm font-semibold ${s.cls} ${s.grow}`}
          >
            <span>{s.pct}</span>
            <span className="text-xs font-medium opacity-90">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {notes.map((n) => (
          <div key={n.t} className="rounded-xl border border-border bg-card/60 p-4">
            <p className="mb-1 text-sm font-semibold text-foreground">{n.t}</p>
            <p className="text-xs leading-relaxed text-muted">{n.d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        10-80-10 Rule: insaan shuru mein control karta hai, AI beech mein mehnat
        karta hai, insaan aakhir mein sign-off deta hai
      </figcaption>
    </figure>
  );
}

/** Three layers of AI-era work, drawn as widening steps. */
function ThreeLayersDiagram() {
  const layers = [
    { w: "w-full sm:w-3/5", label: "1 · General Agent", note: "Problem solve karne ke liye" },
    { w: "w-full sm:w-4/5", label: "2 · Specialized AI Workers", note: "Repeatable jobs ke liye" },
    { w: "w-full", label: "3 · AI-Native Company", note: "Human sirf direction aur verification deta hai" },
  ];
  return (
    <figure className="my-7 flex flex-col items-center gap-2">
      {layers.map((l, i) => (
        <div
          key={l.label}
          className={`${l.w} rounded-xl border border-accent/30 px-4 py-3 text-center`}
          style={{ backgroundColor: `color-mix(in srgb, var(--color-accent) ${8 + i * 8}%, transparent)` }}
        >
          <p className="font-heading text-sm font-semibold text-foreground">{l.label}</p>
          <p className="text-xs text-muted">{l.note}</p>
        </div>
      ))}
      <figcaption className="mt-2 text-center text-xs text-muted">
        Kaam AI era mein teen layers mein hota hai: Agent, phir Worker, phir
        AI-Native Company
      </figcaption>
    </figure>
  );
}

/** Digital FTE: the four pillars that must all be present. */
function DigitalFteDiagram() {
  const pillars = [
    { icon: GraduationCap, t: "Domain Expertise", d: "Aapka apna specialized knowledge, jis field mein aap kaam karte hain" },
    { icon: ScrollText, t: "Explicit Specifications", d: "Documented rules aur instructions, jaise spec file ya brief" },
    { icon: Wrench, t: "Engineering Architecture", d: "Proper tools, memory aur workflow design" },
    { icon: ShieldCheck, t: "Human Oversight", d: "Verification loop jo kabhi khatam nahi hoti" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        {pillars.map(({ icon: Icon, t, d }) => (
          <div key={t} className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent-bright">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{t}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{d}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Digital FTE = chaaron cheezein ek saath. Koi ek bhi missing ho to sirf
        ek risky automation reh jata hai
      </figcaption>
    </figure>
  );
}

/** The agent loop: predictor + tools + loop. */
function AgentLoopDiagram() {
  return (
    <figure className="my-7">
      <Flow
        loop
        steps={[
          "Model predict karta hai ke konsa tool call karna hai",
          "System actually wo tool run karta hai (search, code, API)",
          "Result wapis context window mein add hota hai",
          "Model naye result se agla step predict karta hai",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Agent ki definition: same predictor + tools + loop, jo goal ki taraf
        repeat hota hai. Koi naya mind nahi hai.
      </figcaption>
    </figure>
  );
}

/** Markdown vs HTML direction asymmetry. */
function DirectionDiagram() {
  const rows = [
    { from: "Aap", to: "Agent", fmt: "Markdown", why: "Structure ambiguity khatam karta hai" },
    { from: "Agent", to: "Aap", fmt: "HTML", why: "Rich, readable, shareable" },
    { from: "Agent", to: "Agent", fmt: "Markdown", why: "Compact, precise, dusra AI parse karega" },
  ];
  return (
    <figure className="my-7 space-y-2.5">
      {rows.map((r) => (
        <div
          key={r.why}
          className="flex flex-col gap-2 rounded-xl border border-border bg-card/60 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground sm:w-44 sm:shrink-0">
            <span>{r.from}</span>
            <ArrowRight size={15} className="text-accent" />
            <span>{r.to}</span>
          </div>
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
              r.fmt === "HTML"
                ? "bg-accent text-white"
                : "bg-accent/15 text-accent-bright"
            }`}
          >
            {r.fmt}
          </span>
          <span className="text-sm text-muted">{r.why}</span>
        </div>
      ))}
      <figcaption className="pt-1 text-center text-xs text-muted">
        Test hamesha ek hi hai: ye output last mein kaun padhega
      </figcaption>
    </figure>
  );
}

/** VPRF test: four trigger cards. */
function VprfDiagram() {
  const items = [
    { l: "V", t: "Volume", d: "Hath se karne layak se zyada items hain" },
    { l: "P", t: "Precision", d: "Galti ki cost hai" },
    { l: "R", t: "Repetition", d: "Ye kaam dobara hoga" },
    { l: "F", t: "Files", d: "Data files mein rehta hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((i) => (
          <div key={i.t} className="rounded-xl border border-border bg-card/60 p-4 text-center">
            <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 font-heading text-lg font-bold text-accent-bright">
              {i.l}
            </span>
            <p className="text-sm font-semibold text-foreground">{i.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{i.d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Koi ek bhi fire ho jaye to task code problem hai, warna normal prompt
        se jawab lein
      </figcaption>
    </figure>
  );
}

/** Kitchen analogy: connector vs skill side by side. */
function KitchenDiagram() {
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/60 p-5">
          <p className="mb-2 flex items-center gap-2 font-heading text-sm font-bold text-accent-bright">
            <Boxes size={17} />
            Connector = Kitchen
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Stove, chaqu, stocked pantry: yani Google Drive, Gmail, Slack,
            aapka tracker. AI ko haath deta hai aapke real apps tak pahunchne
            ke liye. Kitchen bina recipe ke improvised aur inconsistent output
            degi.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-5">
          <p className="mb-2 flex items-center gap-2 font-heading text-sm font-bold text-accent-bright">
            <ChefHat size={17} />
            Skill = Recipe Card
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Recipe card jo batati hai dish aapke restaurant ke tareeke se kaise
            banti hai: har baar wahi kaam sahi tareeke se. Recipe bina kitchen
            ke sirf padhi ja sakti hai, cook nahi ki ja sakti.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Dono alag cheez hain, dono zaroori hain
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: pageTitle,
  description: pageDescription,
  url: `${site.url}/exam`,
  inLanguage: "ur-Latn",
  educationalLevel: "GIAIC Quarter 5",
  learningResourceType: "Study notes",
  author: {
    "@type": "Person",
    name: site.founder,
    url: contact.portfolio,
  },
  publisher: { "@id": `${site.url}/#organization` },
};

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={jsonLd} />

      {/* Standalone header: absolute link back to the main site so it also
          works when served from the exam subdomain. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href={site.url} className="flex items-center gap-2.5" aria-label={site.name}>
            <Logo priority className="h-9 w-9" />
            <span className="font-heading text-lg font-semibold tracking-tight">
              {site.shortName}
              <span className="text-accent"> Solutions</span>
            </span>
          </a>
          <div className="flex items-center gap-2.5">
            <span className="hidden rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-bright sm:inline-block">
              Exam Notes
            </span>
            <a
              href={site.url}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Main Site</span>
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

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
              GIAIC Quarter 5 · Mid Term Exam Preparation
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              AI Agent Factory
              <span className="block text-gradient">Complete Study Notes</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted">
              Panaversity ke Agent Factory Foundations course ke saare chapters
              ka detailed aur asaan Roman Urdu revision guide: Orientation se
              Skills &amp; Connectors tak. Har chapter mein Core Idea, detailed
              explanation practical examples ke saath, aur ek recap table.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted">
              {["7 Chapters", "Cheat Sheet", "10-Question Self Test", "Roman Urdu"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border bg-card/60 px-3 py-1.5"
                  >
                    {chip}
                  </span>
                ),
              )}
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#ch00"
                className="glow-accent inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <BookOpen size={16} />
                Start Reading
              </a>
              <a
                href="#downloads"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/50"
              >
                <Download size={16} />
                Download PDFs
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogToc items={toc} lang="ro" />

      <main className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        {/* Intro / preface */}
        <section id="intro" className="scroll-mt-24 border-t border-border pt-12">
          <Reveal>
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Ye Notes Kya Hain
            </h2>
            <P>
              Ye page Panaversity ke <Strong>Agent Factory Foundations course</Strong>{" "}
              ke saare chapters ka ek detailed aur asaan Roman Urdu revision
              guide hai. Maqsad simple hai: mid-term quiz se pehle har chapter
              ka core concept, real-world application, aur exam-ready recap ek
              hi jagah mil jaye, bina complicated English jargon ke.
            </P>
            <P>
              Har chapter mein teen cheezein hamesha milengi. Pehla, ek{" "}
              <Strong>Core Idea box</Strong> jo us poore chapter ka essence ek
              jagah deta hai. Doosra, <Strong>detailed explanation</Strong>{" "}
              practical examples ke saath, taake concept sirf ratta na lage
              balke samajh mein aaye. Teesra, ek <Strong>recap table</Strong>{" "}
              jo revision ke waqt ek nazar mein sab yaad dila de. Aakhir mein
              ek cheat sheet aur 10 sawalon ka self-test quiz bhi hai.
            </P>
            <P>
              Ye guide un logon ke liye bhi useful hai jo AI agents, chatbots,
              ya automation systems par kaam kar rahe hain, kyunke har concept
              ke saath ek practical engineering angle bhi diya gaya hai, na
              sirf exam ka nazariya.
            </P>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Chapter 00                                                     */}
        {/* ------------------------------------------------------------ */}
        <section id="ch00" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <ChapterHeader
              num="00"
              title="Orientation, The AI-Native Company Model"
              sub="10-80-10 Rule, Digital FTE, aur is poore course ka roadmap"
            />
            <CoreIdea>
              Kaam AI era mein teen layers mein hota hai. Pehle aap ek general
              agent use karte hain problem solve karne ke liye, phir
              specialized AI Workers banate hain repeatable jobs ke liye, phir
              un Workers ko mila kar ek AI-Native Company banate hain jahan
              human sirf direction aur verification deta hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Har Kaam Insaan Se Shuru Hota Hai</SubHeading>
            <P>
              Chahe kitna bhi advanced automation system ho, har professional
              engagement ek human se shuru hoti hai jo ek general agent ko
              direct karta hai. Sawal sirf ye hota hai ke kaunsa agent chuna
              jaye, aur ye poori tarah is baat par depend karta hai ke aap
              actually achieve kya karna chahte hain. Ye poori philosophy ek
              simple lekin powerful formula par khari hai jisay{" "}
              <Strong>10-80-10 Rule</Strong> kehte hain.
            </P>
            <ThreeLayersDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>10-80-10 Rule Ka Matlab</SubHeading>
            <TenEightyTenDiagram />
            <Callout label="Practical Example">
              Kisi bhi content ya social media automation system mein yehi
              rule chalti hai. Aap topic aur brand voice set karte hain (10%),
              AI poora post ya draft banata hai (80%), aur phir aap final
              review karte hain publish karne se pehle (10%). Jis din ye
              aakhri 10% skip ki jayegi, wahi din ek off-brand ya galat cheez
              publish ho sakti hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Digital FTE, Sirf Ek Prompt Nahi</SubHeading>
            <P>
              <Strong>Digital FTE (Digital Full Time Employee)</Strong> ka
              matlab sirf ek achha model ya achha prompt nahi hai. Ye ek poora
              system hai jo char cheezein combine karta hai:
            </P>
            <DigitalFteDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Course Ka Roadmap</SubHeading>
            <P>
              Prerequisites sequence yehi hai jo ye poora course follow karwata
              hai, taake koi bhi shortcut na le aur foundation strong rahe:
            </P>
            <Flow
              steps={[
                "Thesis padhein, vocabulary set karne ke liye",
                "Char Foundations courses (Prompting, Markdown/HTML, Code You Never Write, Skills and Connectors)",
                "Apna specific mode chunein (Automation Builder, Content Creator...)",
                "Us mode ke specialized courses",
              ]}
            />
            <RecapTable
              head={["Concept", "Ek Line Mein"]}
              rows={[
                ["3 Layers", "Agent, phir Worker, phir AI-Native Company"],
                ["10-80-10 Rule", "Intent set karo, AI se karwao, phir khud verify karo"],
                ["Digital FTE", "Expertise + Spec + Architecture + Oversight, chaaron zaroori"],
                ["Course Roadmap", "Thesis se Foundations se Mode-specific courses tak"],
              ]}
            />
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Chapter 01                                                     */}
        {/* ------------------------------------------------------------ */}
        <section id="ch01" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <ChapterHeader
              num="01"
              title="How to Think in the AI Era"
              sub="6 disciplines, 6 AI failure modes: Prediction Lock, Reasoning Receipt, Error Taxonomy, Cascade Map"
            />
            <CoreIdea>
              Deliverable kabhi bhi sirf answer nahi hota. Deliverable hai
              documented evidence of thinking. AI seconds mein polished answer
              de deta hai, isliye answer produce karna hard part nahi raha.
              Hard part ab evaluate karna hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>AI Gravity, Jo Force Yahan Address Hoti Hai</SubHeading>
            <P>
              Teen forces hamesha pull karte hain AI ko sochne dene ki taraf:
              brain energy bachana chahta hai, aap expert-level output chahte
              hain fast, aur aapko pata nahi doosre kitna AI use kar rahe hain
              isliye race khud speed up hoti hai. MIT Media Lab ke study mein{" "}
              <Strong>83% log apna hi submit kiya essay ka ek sentence bhi
              repeat nahi kar sake</Strong>, kyunke words screen se seedhe
              submission mein gaye, unke brain se guzre bina.
            </P>
            <Callout label="Important Distinction">
              Fix ye nahi hai ke AI kam use karo. Fix ek counterweight hai:
              six disciplines jo teen parts mein baante gaye hain. Gravity
              sirf un cheezon ke against jeet ti hai jo apna weight khud hold
              karna band kar dein.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Discipline 1: The Prediction Lock</SubHeading>
            <P>
              AI kholne se pehle 4 lines likhein, sirf teen minute lagte hain:
            </P>
            <Ladder
              steps={[
                { title: "Line 1: Real decision kya hai", note: "Surface label ke neeche wali asli confusion" },
                { title: "Line 2: Wo ek fact jo settle kar de", note: "Specific aur checkable hona chahiye" },
                { title: "Line 3: Aapka decision AI se pehle", note: "Apni reasoning ke saath" },
                { title: "Line 4: Confidence percentage", note: "Plus exact wo finding jo aapko flip kar de" },
              ]}
            />
            <Callout label="Critical Implementation Detail" tone="warn">
              Sirf Line 1 aur 2 AI ko prompt mein jati hain. Line 3 aur 4 apne
              paas rakhein. Agar AI ko pata chal jaye aap already kya decide
              kar chuke hain, wo aapse agree karega, aur comparison ka poora
              point khatam ho jayega. Verification test: bolein out loud,
              &quot;main ye decide kiya kyunke...&quot; bina &quot;AI ne
              kaha&quot; use kiye. Agar bol sakte hain, lock kaam kar gaya.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Discipline 2: The Reasoning Receipt</SubHeading>
            <P>
              Har AI claim ke saath ek row banayein, teen columns: AI ne kya
              kaha, aapne kya kiya, kyun. <Strong>Paanch labels hain, na sirf
              teen:</Strong>
            </P>
            <RecapTable
              head={["Label", "Matlab"]}
              rows={[
                ["ACCEPT", "Bina change rakha, kyun trust kiya likhein"],
                ["REJECT", "Ghalat samjha, hataya, kya wajah thi likhein"],
                ["MODIFY", "Idea rakha, part change kiya, kya badla likhein"],
                ["SURFACED", "AI ne wo diya jo socha nahi tha, kyun matter karta hai"],
                ["MISSED", "AI ne miss kiya, khud add kiya, kya tha wo"],
              ]}
            />
            <Callout label="Sabse Important Insight">
              Agar har row ACCEPT hai, aap actually soch nahi rahe, sirf
              sign-off kar rahe hain. Receipt sirf audit ke liye nahi hai:
              likhne ka act khud decision badalta hai, receipt khud kaam ka
              tool ban jata hai. Aur future aap hi sabse common auditor hain,
              3 mahine baad khud yaad nahi rahega kya socha tha.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Discipline 3: The Error Taxonomy</SubHeading>
            <P>
              Ye direct connect hota hai &quot;What AI Actually Is&quot;
              chapter se: AI ke paas koi truth-checker nahi hai, to checker
              aap hain. Six specific error types hain jo{" "}
              <Strong>naam se scan karne padte hain</Strong>; &quot;kya ye
              theek lagta hai&quot; jaisa vague check kaam nahi karta.
            </P>
            <RecapTable
              head={["Error Type", "Kahan Dekhein"]}
              rows={[
                ["Factual error", "Har specific number wali sentence"],
                ["Logical gap", "“Therefore/so” ke baad, kya evidence actually prove karta hai"],
                ["False confidence", "Bina may/could ke flat statement jo debatable ho"],
                ["Missing context", "Jo ek expert first pooche wo AI ne miss kiya"],
                ["Fabricated source", "Har quote/study ka naam Google karein"],
                ["Stale fact", "Prices, rules, versions jo time ke saath change hote hain"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Discipline 4: Thinking in Systems, Cascade Map</SubHeading>
            <P>
              AI sirf wahi answer deta hai jo aapne poocha, side effects trace
              nahi karta. Fix teen steps ka hai:
            </P>
            <Flow
              steps={[
                "5 groups list karein jo decision affect karte hain",
                "Har group ke liye “aur phir kya hoga” 3 baar poochein",
                "Ek loop dhoondein jahan later effect wapis circle kar ke original decision ko undo kar de",
              ]}
            />
            <Callout label="Real Example">
              University ne AI chatbot se tutoring replace ki, &quot;30% cost
              save hoga&quot; bola gaya. 3 layers deep gaye to pata chala:
              struggling students samajh nahi paye, grades gir gayi, students
              transfer ho gaye, university ne tuition lose ki, jo tighter
              budget bana, jo aur kam tutoring resources bana. Loop ne
              original 30% saving wipe kar diya.
            </Callout>
            <P>
              Aap aur AI ke <Strong>opposite blind spots</Strong> hote hain,
              isliye ye discipline partnership hai. AI specific sawal ka jawab
              dene mein achha hai, side effects miss karta hai. Aap side
              effects sochne mein better hain. Map khud draw karein pehle,
              phir AI se har branch stress-test karwayein.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Discipline 5 aur 6: Origination</SubHeading>
            <P>
              <Strong>First Principles:</Strong> common advice ko apni
              specific situation pe test karein. Generic advice har jagah fit
              nahi hoti; kahan wo break hoti hai wahi asli signal hai.
            </P>
            <P>
              <Strong>Working WITH AI:</Strong> aap decide aur think karte
              hain, AI research aur draft karta hai. Agar reverse ho jaye, AI
              thinks aur aap sirf edit karte hain, to aap redundant ban jate
              hain. Jo log sirf AI ka answer forward karte hain, unhe
              eventually AI khud replace kar dega.
            </P>
            <RecapTable
              head={["Discipline", "Action"]}
              rows={[
                ["1. Prediction Lock", "AI se pehle 4 lines likhein"],
                ["2. Reasoning Receipt", "Har claim pe ACCEPT/REJECT/MODIFY/SURFACED/MISSED"],
                ["3. Error Taxonomy", "6 error types naam se scan karein"],
                ["4. Thinking in Systems", "5 groups, 3 layers, loop dhoondein"],
                ["5. First Principles", "Advice ko apni situation pe test karein"],
                ["6. Working WITH AI", "Aap decide karte hain, AI research/draft karta hai"],
              ]}
            />
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Chapter 02                                                     */}
        {/* ------------------------------------------------------------ */}
        <section id="ch02" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <ChapterHeader
              num="02"
              title="What AI Actually Is, A Crash Course"
              sub="Prediction machine, tokens, context window, hallucination, aur agents ki asal mechanic"
            />
            <CoreIdea>
              AI ek &quot;next token predictor&quot; hai, librarian nahi. Ye
              fact search nahi karta, sirf itna predict karta hai ke agla piece
              of text kya aana chahiye. Iske paas sach check karne ka koi
              internal organ nahi hai. Sab kuch isi ek fact se nikalta hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>1. Predicts, Lookup Nahi Karta</SubHeading>
            <P>
              Jab aap poochte hain &quot;France ki capital kya hai&quot;, AI
              kisi database mein France to Paris search nahi karta. Wo sirf
              itna predict karta hai ke &quot;The capital of France is...&quot;
              ke baad sabse plausible continuation kya hai, aur training data
              mein &quot;Paris&quot; itni baar aaya hota hai ke wahi predict
              hota hai. Common facts pe prediction aur lookup same result dete
              hain, isliye farq nazar nahi aata. Lekin jab topic rare ho, tab
              AI ke paas koi &quot;sach&quot; continue karne ko nahi hota, to
              wo sabse plausible-sounding cheez bana deta hai. Wo lying nahi
              kar raha, uska yehi kaam hai: continue karna, chahe sach ho ya
              na ho.
            </P>
            <Callout label="Practical Example">
              Jab aap kisi niche ya low-known business, topic, ya kisi obscure
              client ki history ke baare mein AI se poochte hain, wahan
              hallucination ka risk zyada hota hai kyunke training data thin
              hota hai. Jitna kam-known topic, utna zyada verify karna zaroori.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>2. Training Ek Dafa Hui, Phir Freeze Ho Gayi</SubHeading>
            <P>
              Do terms yaad rakhein. <Strong>Training</Strong> ek dafa hoti
              hai, company ke paas, model banate waqt; ismein weights (numbers)
              set hote hain. <Strong>Inference</Strong> har dafa jab aap use
              karte hain; wahi frozen weights chalte hain, kuch change nahi
              hota. Jab aap chat mein AI ko correct karte hain aur wo
              &quot;haan aap sahi hain&quot; kehta hai, wo seekh nahi raha,
              sirf ek plausible reply predict kar raha hai. Naya chat kholein,
              wahi purani ghalti dubara aayegi. Isi wajah se knowledge cutoff
              hota hai, aur isi wajah se AI ko aapka private data pata nahi
              hota, kyunke wo kabhi training text mein tha hi nahi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3. Koi Second Faculty Nahi Jo Sach Check Kare</SubHeading>
            <P>
              Insaan ke paas do faculties hoti hain: ek jo jawab generate karti
              hai, dusri jo check karti hai &quot;kya mujhe yakeen hai
              iska&quot;. AI ke paas sirf pehli faculty hai. Wahi mechanism jo
              sahi jawab banata hai, wahi ghalat bhi banata hai; koi internal
              flag nahi hota farq batane ke liye. Yehi{" "}
              <Strong>hallucination</Strong> hai. Ye bug nahi hai, ye machine
              ka exactly wahi kaam hai jo wo design se karti hai: plausible
              continuation, chahe sach ho ya na ho.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>4. Ye Letters Nahi, Tokens Padhta Hai</SubHeading>
            <P>
              Text pehle <Strong>tokens</Strong> mein chop hota hai: chunks,
              usually ek word ya word ka hissa. &quot;Strawberry&quot; jaise
              word ko wo 2-3 chunks mein dekhta hai, letters individually
              nahi. Isi wajah se AI kabhi kabhi &quot;strawberry mein kitne R
              hain&quot; jaisa simple sawal bhi ghalat count kar deta hai.
            </P>
            <Callout label="Practical Example">
              Ye seedha kisi bhi multilingual chatbot ya translation system ke
              liye relevant hai. Non-English languages, jaise Urdu aur Arabic,
              mein zyada tokens lagte hain per word, isliye cost bhi zyada aur
              context window jaldi bhar jata hai. Agar aap multi-language relay
              pipeline chala rahe hain (ek language se doosri, phir teesri mein
              translate karna), har hop pe token count badalta hai; budgeting
              karte waqt is factor ko zaroor shamil karein.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>5. Context Window Hi Uski Poori Duniya Hai</SubHeading>
            <P>
              Weights frozen hain, koi apni memory nahi, to model sirf wahi
              dekh sakta hai jo <Strong>context window</Strong> mein maujood
              ho: aapka prompt, conversation history, uploaded files, system
              prompt. Isko &quot;reading desk&quot; samjhein, brain nahi. Jo
              cheez desk pe nahi rakhi, wo model ke liye exist hi nahi karti,
              chahe aapko kitna bhi obvious lage. Isi wajah se lambi
              conversations mein quality girti hai: purani cheezein desk se hat
              jati hain ya summarize ho jati hain.
            </P>
            <Callout label="Engineering Angle">
              Agar aap Claude Code jaise tools ya AI agents ke saath kaam karte
              hain, direct lesson yehi hai. Instruction files (jaise CLAUDE.md)
              aur subagent context, sab isi principle par based hain: jo bhi
              context aap provide karenge wahi model use kar sakega, baaki sab
              uske liye invisible rahega.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6. Confidence Ek Learned Style Hai, Sach Ka Proof Nahi</SubHeading>
            <P>
              Training ke baad models ko human feedback se tune kiya jata hai
              jisay <Strong>RLHF</Strong> kehte hain. Log confident, agreeable
              jawabon ko zyada rate karte hain, chahe wo sahi ho ya na ho.
              Isliye model confident sound karna seekh leta hai as a style, aur{" "}
              <Strong>sycophancy</Strong> bhi isi se aati hai, yani aapse agree
              karne ki tendency. Fix yehi hai ke neutral framing use karein,
              jaise &quot;iske dono sides evaluate karo&quot;, ya score
              maangein: &quot;1 se 10 scale par grade karo&quot;.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>7. Jagged Frontier, Ek Jagah Brilliant, Agli Jagah Useless</SubHeading>
            <P>
              Insaan ki ability smooth hoti hai: agar koi hard calculus kar
              sakta hai to easy arithmetic bhi kar lega. AI ki nahi. Wo legal
              contract clause likh dega perfectly, aur &quot;strawberry&quot;
              mein letters miscount kar dega. Farq training data ki frequency
              se aata hai: jo tasks common thay unme wo strong hai, jo rare
              hain unme weak hai.
            </P>
            <Callout label="Practical Rule" tone="warn">
              Agar hard task pe achha kiya to easy task pe bharosa mat karein,
              har cheez verify karein. Khaas kar wo easy-looking tasks jinko
              aap check karna bhool jate hain, wahi sabse risky hote hain.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>8. Tools Use Karke Ye Act Karta Hai</SubHeading>
            <P>
              Pure text predictor sirf text de sakta hai, real duniya mein kuch
              kar nahi sakta. <Strong>Tools</Strong> (web search, code
              execution, file read, API call) is limit ko todte hain. Mechanism
              simple hai:
            </P>
            <AgentLoopDiagram />
            <P>
              Yehi definition hai <Strong>&quot;agent&quot;</Strong> ki: same
              predictor, plus tools, plus loop, jo goal ki taraf repeat hota
              hai. Koi naya &quot;mind&quot; nahi hai, sirf predictor + tools +
              loop. Claude Code ke subagents bhi isi loop ka scaled version
              hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>9. &quot;Thinking&quot; Bhi Bas Extra Prediction Hai</SubHeading>
            <P>
              Reasoning models pehle apna kaam (steps, working) predict karte
              hain, phir usi ko apne context mein rakh ke final answer predict
              karte hain. Ye sach mein help karta hai kyunke reasoning desk pe
              rakhne ke baad answer predict karna asaan ho jata hai. Lekin isse
              dusri faculty nahi milti; reasoning bhi wahi single process hai
              jo galti kar sakta hai. Zyada thinking gap kam karta hai, khatam
              nahi karta.
            </P>
            <RecapTable
              head={["#", "Idea", "Ek Line Takeaway"]}
              rows={[
                ["1", "Predicts not lookup", "Fluency sach nahi, plausibility hai"],
                ["2", "Training frozen", "Knowledge cutoff, private data blind"],
                ["3", "No truth-checker", "Hallucination normal operation hai"],
                ["4", "Tokens not letters", "Non-English costlier in tokens"],
                ["5", "Context window = duniya", "Jo desk pe nahi wo exist nahi"],
                ["6", "Confidence = style", "Sycophancy isi se aati hai"],
                ["7", "Jagged frontier", "Easy task bhi fail ho sakta hai"],
                ["8", "Tools = action", "Agent = predictor + tools + loop"],
                ["9", "Thinking = extra prediction", "Gap kam karta hai, khatam nahi"],
              ]}
            />
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Chapter 03                                                     */}
        {/* ------------------------------------------------------------ */}
        <section id="ch03" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <ChapterHeader
              num="03"
              title="AI Prompting in 2026"
              sub="Retrieval modes, context rot, sycophancy fix, brainstorm-iterate loop"
            />
            <CoreIdea>
              Har advanced prompting technique asal mein sirf do moves hain:
              sahi context andar daalna, ya galat context bahar rakhna. Baaki
              sab isi ka variation hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Novice Vs Power User</SubHeading>
            <P>
              Novice &quot;which car should I buy&quot; pooch ke generic jawab
              leta hai. Power user spec sheets, insurance quotes, apni driving
              pattern ka data upload karta hai, phir &quot;trade-offs batao,
              think hard&quot; bolta hai. Mental model yaad rakhein:{" "}
              <Strong>
                AI ek highly motivated fresh grad hai jo aapke baare mein kuch
                nahi janta.
              </Strong>{" "}
              Jitna aap usay brief karenge utna behtar output aayega.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Teen Retrieval Modes</SubHeading>
            <div className="my-6 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Zap,
                  t: "Pretrained",
                  d: "Fast lekin stale. Static sawal ke liye theek hai.",
                },
                {
                  icon: MessageSquare,
                  t: "Web Search",
                  d: "“Latest on X” jaisi cheezon pe trigger hota hai. Model original page nahi padhta; retrieval layer ka condensed summary milta hai, isi se summary drift aata hai. Sources specify karein, exact quote maangein.",
                },
                {
                  icon: FileText,
                  t: "Deep Research",
                  d: "Heaviest mode. Minutes leta hai, dozens of sources scan karta hai, structured report banata hai.",
                },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-xl border border-border bg-card/60 p-4">
                  <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Icon size={16} className="text-accent-bright" />
                    {t}
                  </p>
                  <p className="text-xs leading-relaxed text-muted">{d}</p>
                </div>
              ))}
            </div>
            <Callout label="Practical Example">
              Agar kisi language ya market ki current regulatory ya updated
              info chahiye ho, jaise kisi multilingual project ke context mein,
              deep research mode use karein, na ke simple search.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Talking to AI Ka Real Mechanic</SubHeading>
            <P>
              <Strong>System prompt</Strong> aapko nazar nahi aata lekin har
              chat mein already load hota hai. Aap apni personal instructions
              bhi add kar sakte hain; ye exactly wahi cheez hai jo CLAUDE.md
              files mein hoti hai subagents ke liye.
            </P>
            <P>
              <Strong>Context rot</Strong> ek real problem hai. Ek lambi
              conversation mein multiple unrelated topics mix karna performance
              girata hai. Chat lambi hone par tools chupke se purani baaton ko
              compact kar dete hain: summary bana ke original detail replace
              kar dete hain. Rule: jab topic change ho, naya chat kholein. Agar
              kuch save karne layak hai, pehle file mein save karein, phir
              reset karein.
            </P>
            <P>
              <Strong>Reasoning mode</Strong> (&quot;think hard&quot;) ab
              explicitly invoke ki ja sakti hai. Simple lookups pe mat use
              karein, slow aur costly hai. Complex multi-input decisions pe
              zaroor use karein.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Sycophancy Ka Fix Mechanical Hai</SubHeading>
            <div className="my-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-4">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-red-400">
                  In verbs se bachein
                </p>
                <p className="text-sm text-muted">
                  find, defend, confirm, prove: AI conclusion pehle se maan ke
                  chalta hai
                </p>
              </div>
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-bright">
                  Ye verbs use karein
                </p>
                <p className="text-sm text-muted">
                  evaluate, compare, critique, find any: neutral framing,
                  honest jawab
                </p>
              </div>
            </div>
            <P>
              Sabse powerful move: <Strong>number maangein.</Strong> &quot;Is
              ye code sahi hai&quot; ke bajaye &quot;har criterion ko 1-10
              grade karo, justification ke saath.&quot; Adjectives
              (&quot;strong&quot;, &quot;solid&quot;) aapko decide karne layak
              kuch nahi dete, numbers dete hain.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Brainstorm-Iterate Loop</SubHeading>
            <P>
              Ye is chapter ka sabse high-leverage habit hai. Seedha final
              draft mat maango:
            </P>
            <Flow
              steps={[
                "Context load karein",
                "3-5 options maangein (expand mat karwayein abhi)",
                "Explicit feedback dein: kya reject kiya aur kyun",
                "2-3 rounds iterate karein, phir hi expand karwayein",
              ]}
            />
            <Callout label="Practical Example">
              Kisi bhi content generation system mein jahan output ke saath ek
              &quot;why this works&quot; jaisi justification bhi maangi jaye,
              wahi discipline isi loop ko formalize karti hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Text Se Aage, Aur Safe Use</SubHeading>
            <CheckList
              items={[
                "Image input coarse detail dekhta hai, fine detail par weak hai.",
                "Data analysis mein hamesha confirm karein ke AI actually code run kar raha hai, guess nahi. “Write and run code, show me the code” explicitly bolein.",
                "Desktop apps (Cowork, OpenWork) plan-review-approve workflow follow karte hain. Delete kabhi bhi recycle bin mein nahi jata; permission hamesha smallest scope se start karein.",
                "Model selection jagged hai, koi ek best nahi. Har mahine leaderboard check karein aur apna common task 2-3 models mein try karein.",
                "Models checking models sabse high-stakes technique hai: ek model se self-critique karwayein, high-stakes decisions par doosri model family se bhi grade karwayein. Dono ke beech disagreement hi asli signal hai jahan blind spot chhupa hai.",
              ]}
            />
            <RecapTable
              head={["#", "Concept", "Practical Takeaway"]}
              rows={[
                ["1", "Novice vs power user", "Brief AI jaise naye colleague ko"],
                ["2", "3 retrieval modes", "Wording se mode trigger hoti hai"],
                ["3", "Context window/system prompt", "Naya topic, naya chat"],
                ["4", "Sycophancy", "Verbs badlein, number maangein"],
                ["5", "Brainstorm-iterate loop", "Pehle options, phir hi expand"],
                ["6", "Data analysis", "Code run hote dekhna zaroori hai"],
                ["7", "Models checking models", "Cross-family disagreement asal signal hai"],
              ]}
            />
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Chapter 04                                                     */}
        {/* ------------------------------------------------------------ */}
        <section id="ch04" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <ChapterHeader
              num="04"
              title="Markdown In, HTML Out"
              sub="Structure ki asymmetry, spec skeleton, document format decisions"
            />
            <CoreIdea>
              Agent ko likhte waqt Markdown use karein, agent se jawab mangte
              waqt HTML mangwayein. Decision hamesha ek sawal se hoti hai: ye
              output last mein kaun padhega.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Teen Jagah, Teen Format</SubHeading>
            <DirectionDiagram />
            <P>
              Teesri row sabse important hai. Jab aap ek chat ka context doosre
              chat mein copy karte hain, wo bhi &quot;agent to agent&quot; hai,
              chahe dono side aap hi baithe hon. Wahan Markdown rahegi, HTML
              nahi. Test hamesha yehi hai:{" "}
              <Strong>
                agar insaan browser mein padhega, HTML mangwayein. Agar AI ne
                dubara padhna hai, Markdown mein rakhein.
              </Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Markdown Ka Poora Syllabus, Sirf Paanch Cheezein</SubHeading>
            <CheckList
              items={[
                "Headings importance dikhate hain. Ek document mein ek hi title, level skip mat karein, aur heading ko label mat rakhein, claim banayein. “Budget” ki jagah “Budget: PKR 50,000 hard ceiling” likhein.",
                "Bullets vs Numbers: bullets ka matlab set hai, order matter nahi karta. Numbers ka matlab sequence hai, order hi instruction ka hissa hai.",
                "Triple backtick fences batate hain “ye data hai, instruction nahi”. Error message, example output, ya kisi aur ka quote fence ke andar rakhein.",
                "Links: jab aap URL prompt mein dete hain, AI asli page visit kar ke padh sakta hai; summary se guess karne ki jagah asli source use hota hai.",
                "Images: bracket ke andar wala description hi wo cheez hai jo AI dekhta hai. Isay caption samjhein jo batata hai kis cheez pe focus karna hai.",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Spec Skeleton</SubHeading>
            <P>
              Ye woh structure hai jo real client projects mein use hoti hai:
            </P>
            <div className="my-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {["Goal", "Context", "Requirements", "Hard Constraints", "Out of Scope", "Expected Output"].map(
                (s, i) => (
                  <div
                    key={s}
                    className="rounded-xl border border-border bg-card/60 px-3 py-3 text-center"
                  >
                    <p className="font-heading text-xs font-bold text-accent-bright">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{s}</p>
                  </div>
                ),
              )}
            </div>
            <P>
              Do sections sabse zyada kaam karte hain.{" "}
              <Strong>Out of Scope</Strong> agent ke sabse common failure ko
              rokti hai: over-delivery. <Strong>Expected Output</Strong> format
              drift ko rokta hai.
            </P>
            <Callout label="High-Leverage Habit">
              Spec ko build karwane se pehle validate karwayein. Spec paste
              karein, agent se poochein: &quot;har ambiguity list karo, missing
              constraints list karo, clarity/completeness/checkability pe 10
              mein se grade do.&quot; 2-3 rounds mein spec 6 se 9 pe pahunch
              jata hai, aur ye sabse sasti quality improvement hai poore
              agentic workflow mein.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>HTML Kyun Mangwayein</SubHeading>
            <P>
              Test simple hai: kya aap ye poora plain text padhenge? Agar nahi
              to HTML mangwayein. HTML mangwate waqt 4 cheezein zaroor
              batayein: <Strong>kaun padhega</Strong>,{" "}
              <Strong>kya include ho</Strong>,{" "}
              <Strong>interactive chahiye ya nahi</Strong>, aur{" "}
              <Strong>kaise padha jayega</Strong>.
            </P>
            <P>Paanch HTML patterns jo sabse zyada kaam aate hain:</P>
            <CheckList
              items={[
                "Decision grids: options cards mein, trade-off label ke saath",
                "Explainer reports: long document ko ek page summary mein",
                "Code review: color-coded diffs, annotated code",
                "Design prototypes: live sliders jab words se describe karna mushkil ho",
                "Throwaway editors: ek baar ke decision ke liye drag-drop tool",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Social Media Aur Document Formats</SubHeading>
            <P>
              WhatsApp/LinkedIn/Facebook plain text hain, formatting strip ho
              jati hai. HTML sirf link preview card aur designed images (PNG
              export) ke liye kaam ki hai. Document format sawal &quot;insaan
              is output ka karega kya&quot; se decide hota hai:
            </P>
            <div className="my-5 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {[
                { a: "Sign / Print", f: "PDF" },
                { a: "Edit", f: "Word" },
                { a: "Present", f: "Slides" },
                { a: "Numbers", f: "Excel" },
                { a: "Tool feed", f: "CSV" },
              ].map((x) => (
                <div key={x.f} className="rounded-xl border border-border bg-card/60 px-3 py-3 text-center">
                  <p className="text-xs text-muted">{x.a}</p>
                  <p className="mt-0.5 font-heading text-sm font-bold text-accent-bright">{x.f}</p>
                </div>
              ))}
            </div>
            <Callout label="Key Rule">
              CSV Markdown jaisa hai, machine ke liye. Excel HTML jaisa hai,
              insaan ke liye. Content ek dafa plain structured text mein
              likhein; office format sirf final export step hai.
            </Callout>
            <RecapTable
              head={["Concept", "Ek Line Takeaway"]}
              rows={[
                ["Direction asymmetry", "Kaun last mein padhega, wahi decision hai"],
                ["Headings/lists", "Heading = claim, bullets = set, numbers = sequence"],
                ["Spec skeleton", "Build se pehle grade aur fix karein"],
                ["HTML brief", "Kaun, kya, interactive, kaise padhega"],
                ["Social feeds", "Plain text body, HTML sirf preview/image ke liye"],
                ["Documents", "Sign=PDF, Edit=Word, Present=Slides, Numbers=Excel"],
              ]}
            />
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Chapter 05                                                     */}
        {/* ------------------------------------------------------------ */}
        <section id="ch05" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <ChapterHeader
              num="05"
              title="Code You Never Write"
              sub="VPRF test, five-section brief, verification ladder, blast radius safety"
            />
            <CoreIdea>
              AI ab sirf answer nahi deta, code likh ke run bhi kar deta hai,
              apne sandbox mein. Aap client hain, AI developer hai.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>VPRF Test</SubHeading>
            <P>
              Ye test decide karta hai koi task &quot;code problem&quot; hai ya
              sirf &quot;answer problem&quot;:
            </P>
            <VprfDiagram />
            <Callout label="Practical Example">
              Invoice reconciliation, multi-item order totals, ya kisi bhi bulk
              financial data ka calculation: ye sab clearly VPRF fire karte
              hain, isliye wahan explicit &quot;write and run code&quot; bolna
              chahiye, sirf &quot;check karo&quot; nahi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Commissioning Discipline</SubHeading>
            <P>
              Precision-critical kaam mein hamesha explicit bolein:{" "}
              <Strong>
                &quot;write and run code, show me the code you ran, pehle exact
                row count aur column names batao.&quot;
              </Strong>{" "}
              Ye teesri line lie-detector hai: agar row count galat aaya to
              samajh jayein AI ne file actually padhi hi nahi.
            </P>
            <P>
              <Strong>Five-section brief</Strong> replace karta hai casual
              prompting ko: Goal, Input, Output, Rules, Edge cases.{" "}
              <Strong>Rules</Strong> wahi jagah hai jahan aapka domain
              knowledge jata hai. <Strong>Edge cases</Strong> wo jagah hai
              jahan aap explicitly bolte hain blank/duplicate/corrupt data ka
              kya karna hai, warna AI khud guess karega aur wo guess silent
              rahega.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Verification Ladder</SubHeading>
            <Ladder
              steps={[
                { title: "Known-answer test", note: "Chota slice jiska jawab pehle se pata ho, us pe test karein" },
                { title: "Reality check", note: "Row count in vs out, basic sanity numbers" },
                { title: "Plain-English replay", note: "AI se poochein step by step logic batao; galat logic English mein bhi galat lagega" },
                { title: "Adversarial pass", note: "“Apni analysis mein galti dhoondo” bolein" },
                { title: "Cross-model check", note: "High-stakes cases mein doosre model se bhi verify karwayein" },
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Errors Aur Reusability</SubHeading>
            <P>
              <Strong>Errors dialogue hain, failure nahi.</Strong> Red error
              poori paste kar dein, AI khud diagnose kar leta hai. Agar number
              galat lag raha ho lekin error na aaye, symptom report karein
              expected value ke saath.
            </P>
            <P>
              <Strong>Keep the script:</Strong> ek dafa solve hua problem ko
              script + brief.md pair bana ke folder mein rakhein. Agli baar
              sirf &quot;isi script ko naye data pe chalao&quot; bolna kaafi
              hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Five Surfaces</SubHeading>
            <P>
              <Strong>Chat sandbox</Strong> zero-risk, temporary, one-off jobs
              ke liye. <Strong>Terminal agents</Strong> (Claude Code, OpenCode)
              folder ko directly dekh sakte hain, script permanent rehti hai,
              error khud fix ho jati hai. <Strong>Desktop apps</Strong>{" "}
              (Cowork, OpenWork) plan-then-approve built-in rakhte hain. Rule
              of thumb: jab upload karna annoying lagne lage, wahi signal hai
              terminal/desktop surface pe move karne ka.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Blast Radius Rules, Production Safety</SubHeading>
            <CheckList
              items={[
                "Copies pe kaam karein jab tak script trusted na ho jaye",
                "Destructive action (rename/delete/move) se pehle dry run maangein; poori list dekhein approve karne se pehle",
                "Scope smallest folder tak rakhein, kabhi poori drive point mat karein",
                "Output naye file mein likhwayein, original ko kabhi overwrite mat karwayein",
              ]}
            />
            <Callout label="Client Work Angle">
              Ye chaar rules teen sentences ki cost pe aati hain har brief
              mein, lekin real client files touch karte waqt, jaise koi AI
              agency apne clients ka data handle karti hai, ek galat rename ya
              delete se bachati hain jo recycle bin mein bhi wapis nahi aata.
            </Callout>
            <Callout label="Edge of the Map" tone="warn">
              Multi-user software, unattended automation, no-undo high-stakes
              actions, aur pure judgment calls: ye sab is chapter ke scope se
              bahar hain. Inke liye proper engineering discipline chahiye:
              agents, evals, human approval gates. Sirf ek prompt kaafi nahi.
            </Callout>
            <RecapTable
              head={["Concept", "Ek Line Takeaway"]}
              rows={[
                ["VPRF", "Volume, Precision, Repetition, Files: ek bhi fire ho to code problem"],
                ["Five-section brief", "Rules aur Edge cases sabse zyada kaam karte hain"],
                ["Verification ladder", "Known-answer test kabhi skip mat karein"],
                ["Keep the script", "Brief + script + sample ek folder mein"],
                ["Blast radius", "Copy, dry run, scope, new output file"],
              ]}
            />
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Chapter 06                                                     */}
        {/* ------------------------------------------------------------ */}
        <section id="ch06" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <ChapterHeader
              num="06"
              title="Skills and Connectors"
              sub="Recipe vs kitchen analogy, SKILL.md anatomy, security checklist"
            />
            <CoreIdea>
              Chat message ek dafa ka order hai, Skill har baar wahi kaam sahi
              tareeke se karne ka tareeka hai, Connector AI ko haath deta hai
              aapke real apps tak pahunchne ke liye.
            </CoreIdea>
          </Reveal>

          <Reveal>
            <SubHeading>Kitchen Analogy</SubHeading>
            <KitchenDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Skill Technically Kya Hai</SubHeading>
            <P>
              Ek folder jismein ek <Strong>SKILL.md</Strong> file hoti hai. Us
              file ke top pe do cheezein hamesha loaded rehti hain: name aur
              description. Neeche jo bhi likha hai wo tab tak load nahi hota
              jab tak description match na ho. Isay{" "}
              <Strong>progressive disclosure</Strong> kehte hain; isi wajah se
              aap dus-bees skills install kar sakte hain bina AI ko slow kiye.
            </P>
            <Callout label="Sabse Zaroori Baat">
              Description hi decide karti hai skill kabhi fire hogi ya nahi.
              Formula: kya karta hai + kab use karna hai + exact phrases jo aap
              bolenge. &quot;Handles reports&quot; jaisi vague description
              kabhi fire nahi hogi; &quot;client summary ya monthly close bole
              to fire ho&quot; jaisi specific description reliably fire hogi.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Connector Technically Kya Hai</SubHeading>
            <P>
              Ek <Strong>MCP server</Strong> jo aapke app se safe connection
              banata hai. Teen facts yaad rakhein:
            </P>
            <CheckList
              items={[
                "AI aapki hi permissions inherit karta hai: jahan aap khud nahi ja sakte wahan AI bhi nahi ja sakta.",
                "Aap khud decide karte hain read-only ya read-write. Hamesha read-only se start karein.",
                "Har conversation mein alag se enable karna parta hai: connect karna aur enable karna do alag steps hain.",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Farq Yaad Rakhne Ka Tareeka</SubHeading>
            <RecapTable
              head={["Feature", "Kab Active", "Kaam"]}
              rows={[
                ["Project", "Hamesha on", "Standing context/persona"],
                ["Skill", "On-demand fire", "Specific task ka tareeka"],
                ["Custom Instruction", "Har jagah apply", "Global preference"],
                ["Connector", "Per-chat enable", "Real app tak access"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Sath Mein, Real Power Yahan Hai</SubHeading>
            <P>
              Pattern simple hai:{" "}
              <Strong>
                Connector real data fetch karta hai, Skill usay aapke tareeke
                se shape karta hai.
              </Strong>{" "}
              Misal ke taur par, agar koi content generation system Google
              Drive se past posts pull kare (Connector) aur phir ek fixed brand
              format mein dhale (Skill), wo poora automation ek sentence mein
              ho sakta hai.
            </P>
            <SubHeading>Kaunsa Chahiye, Teen-Step Test</SubHeading>
            <CheckList
              items={[
                "Friction ye hai ke “main baar baar explain kar raha hun kaise karna hai”: Skill chahiye.",
                "Friction ye hai ke “main baar baar doosre app se data copy-paste kar raha hun”: Connector chahiye.",
                "Dono ho to dono chahiye.",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Skill Banana, Koi Code Nahi Likhna</SubHeading>
            <P>
              <Strong>skill-creator</Strong> naam ki built-in skill hai jo
              aapke liye SKILL.md khud likh deti hai. Build loop:
            </P>
            <Flow
              steps={[
                "Describe karo",
                "AI first draft banaye",
                "Khud padh ke check karo",
                "Trigger phrases test karo",
                "Output test karo real data pe, edge cases samet",
              ]}
            />
            <P>
              <Strong>Portability:</Strong> Skill ek open standard hai, isliye
              ek jagah likha hua SKILL.md Claude.ai, Cowork, Claude Code,
              OpenCode, Codex CLI, aur Gemini CLI tak bhi chal jata hai. Lekin
              ChatGPT ke Custom GPTs aur Gemini ke Gems vendor-locked hain: ek
              jagah se doosri jagah portable nahi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Security Checklist</SubHeading>
            <CheckList
              items={[
                "Trusted sources se hi skill install karein",
                "Enable karne se pehle SKILL.md khud padhein ya AI se padhwayein",
                "Connectors read-only se start karein, sirf zaroori scope tak access dein",
                "Poori drive kabhi mat connect karein",
              ]}
            />
            <RecapTable
              head={["Concept", "Ek Line Takeaway"]}
              rows={[
                ["Kitchen analogy", "Connector = kitchen, Skill = recipe"],
                ["SKILL.md anatomy", "Name + description hamesha loaded"],
                ["Description", "Yehi decide karti hai fire hogi ya nahi"],
                ["3-step test", "Re-explain=Skill, copy-paste=Connector"],
                ["Portability", "Skills open standard, GPTs/Gems vendor-locked"],
                ["Safety", "Read before enable, read-only start, small scope"],
              ]}
            />
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Cheat sheet                                                    */}
        {/* ------------------------------------------------------------ */}
        <section id="cheat-sheet" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
              <Sparkles size={14} />
              Final
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Quick Revision Cheat Sheet
            </h2>
            <P>
              Agar sirf 5 minute milein exam se pehle, sirf ye 6 lines dobara
              parh lein, poora course wapis yaad aa jayega.
            </P>
            <div className="mt-6 space-y-2.5">
              {[
                ["Orientation", "Agent se Worker se AI-Native Company; 10-80-10 rule sab kuch drive karta hai."],
                ["What AI Actually Is", "AI predictor hai, truth-checker nahi. Context window hi uski duniya hai."],
                ["Prompting 2026", "Sahi context andar daalo ya galat context bahar rakho, yahi har technique ka core hai."],
                ["Markdown In, HTML Out", "Agent likhne ko Markdown, insaan ke padhne ko HTML."],
                ["Code You Never Write", "VPRF test se decide karo code problem hai ya nahi, phir five-section brief se commission karo."],
                ["Skills and Connectors", "Skill = kaise karna hai, Connector = kahan se data lena hai."],
              ].map(([t, d], i) => (
                <div
                  key={t}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card/60 px-4 py-3.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 font-heading text-xs font-bold text-accent-bright">
                    {i}
                  </span>
                  <p className="text-sm leading-relaxed text-muted">
                    <Strong>{t}:</Strong> {d}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Self test                                                      */}
        {/* ------------------------------------------------------------ */}
        <section id="self-test" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
              <ListChecks size={14} />
              Self-Test
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Khud Se Poochein: 10 Sawal
            </h2>
            <P>
              Pehle khud jawab dein, phir sawal pe click kar ke answer check
              karein. Agar 8+ sahi hain to aap ready hain.
            </P>
          </Reveal>
          <Reveal>
            <div className="mt-6 space-y-2.5">
              {[
                {
                  q: "AI “France ki capital Paris hai” kaise jaanta hai, agar wo lookup nahi karta?",
                  a: "Training data mein “The capital of France is Paris” itni baar aaya hai ke “Paris” hi sabse plausible next-token prediction ban jata hai. Common facts pe prediction aur lookup ka result same hota hai, isliye farq nazar nahi aata.",
                },
                {
                  q: "Ek chat mein AI ko correct karne ke baad, doosri chat mein wo galti dobara kyun karega?",
                  a: "Kyunke training ek dafa hoti hai aur weights freeze ho jate hain. Chat mein correction inference hai, learning nahi; model sirf ek plausible reply predict karta hai. Naye chat mein wahi frozen weights chalte hain, isliye wahi ghalti wapis aa sakti hai.",
                },
                {
                  q: "Hallucination ko “bug” kehna kyun galat hai?",
                  a: "Kyunke machine exactly wahi kar rahi hai jo design se karti hai: plausible continuation. Uske paas koi second faculty nahi jo sach check kare, isliye wahi mechanism jo sahi jawab banata hai wahi ghalat bhi banata hai. Ye normal operation hai, defect nahi.",
                },
                {
                  q: "Sycophancy fix karne ke liye kaunse do practical tareeke hain?",
                  a: "Pehla: verbs badlein. “Find, defend, confirm, prove” ki jagah “evaluate, compare, critique, find any” use karein. Doosra: number maangein, jaise “har criterion ko 1-10 grade karo, justification ke saath.”",
                },
                {
                  q: "Brainstorm-iterate loop ke 4 steps kya hain?",
                  a: "1) Context load karein. 2) 3-5 options maangein, abhi expand na karwayein. 3) Explicit feedback dein: kya reject kiya aur kyun. 4) 2-3 rounds iterate karein, phir hi expand karwayein.",
                },
                {
                  q: "Markdown aur HTML ka use kis sawal se decide hota hai?",
                  a: "“Ye output last mein kaun padhega?” Agar insaan browser mein padhega to HTML mangwayein; agar AI ne dubara padhna hai to Markdown mein rakhein.",
                },
                {
                  q: "VPRF test ke chaar letters kya represent karte hain?",
                  a: "Volume (hath se karne layak se zyada items), Precision (galti ki cost hai), Repetition (kaam dobara hoga), Files (data files mein rehta hai). Koi ek bhi fire ho jaye to task code problem hai.",
                },
                {
                  q: "Verification ladder ke 5 steps kya hain?",
                  a: "1) Known-answer test. 2) Reality check (row count in vs out). 3) Plain-English replay. 4) Adversarial pass (“apni analysis mein galti dhoondo”). 5) Cross-model check high-stakes cases mein.",
                },
                {
                  q: "Skill aur Connector mein bunyadi farq kya hai?",
                  a: "Skill batati hai kaam kaise karna hai (recipe card), Connector real apps aur data tak access deta hai (kitchen). Skill on-demand fire hoti hai, Connector per-chat enable hota hai. Dono alag hain, dono zaroori hain.",
                },
                {
                  q: "Ek skill ki description sabse zyada important kyun hoti hai?",
                  a: "Kyunke SKILL.md mein sirf name aur description hamesha loaded rehte hain (progressive disclosure); baaki content tab load hota hai jab description match kare. Isliye description hi decide karti hai skill kabhi fire hogi ya nahi.",
                },
              ].map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-card/60 transition-colors open:border-accent/40"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3.5 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 font-heading text-xs font-bold text-accent-bright">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{item.q}</span>
                  </summary>
                  <div className="border-t border-border/60 px-4 py-3.5 pl-[3.25rem] text-sm leading-relaxed text-muted">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Downloads                                                      */}
        {/* ------------------------------------------------------------ */}
        <section id="downloads" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
              <Download size={14} />
              Downloads
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              PDF Notes Apne Paas Rakhein
            </h2>
            <P>
              Offline revision ke liye dono PDFs download karein: detailed
              notes poori tayari ke liye, quick revision exam se theek pehle
              ke liye.
            </P>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="/exam/AI_Agent_Factory_Detailed_Notes.pdf"
                download
                className="group flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent-bright">
                  <FileText size={19} />
                </span>
                <span>
                  <span className="block font-heading text-sm font-semibold text-foreground group-hover:text-accent-bright">
                    Detailed Study Notes (PDF)
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    20 pages: saare chapters, examples, recap tables aur
                    self-test quiz
                  </span>
                </span>
              </a>
              <a
                href="/exam/Agent_Factory_Revision_Notes.pdf"
                download
                className="group flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent-bright">
                  <Zap size={19} />
                </span>
                <span>
                  <span className="block font-heading text-sm font-semibold text-foreground group-hover:text-accent-bright">
                    Quick Revision Notes (PDF)
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    Compact version: exam se 10 minute pehle ke liye
                  </span>
                </span>
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <ScrollToTop />

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-3xl px-5 py-10 text-center sm:px-8">
          <p className="text-sm text-muted">
            Prepared &amp; compiled by{" "}
            <a
              href={contact.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:text-accent-bright hover:underline"
            >
              {site.founder}
            </a>
            , {site.founderRole},{" "}
            <a
              href={site.url}
              className="font-medium text-foreground underline-offset-4 hover:text-accent-bright hover:underline"
            >
              {site.name}
            </a>
          </p>
          <p className="mt-2 text-xs text-muted">
            AI Agents · Automation Pipelines · Custom Chatbots · Web
            Development
          </p>
          <p className="mt-4 font-heading text-sm font-semibold text-accent-bright">
            {site.tagline}
          </p>
        </div>
      </footer>
    </div>
  );
}
