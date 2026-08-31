import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Eye,
  Gauge,
  GitBranch,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Package,
  RefreshCw,
  Rocket,
  Scale,
  Settings,
  ShieldCheck,
  Sliders,
  Target,
  Users,
} from "lucide-react";
import { site, contact } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";
import { BlogToc } from "@/components/blog/BlogToc";
import type { TocItem } from "@/lib/blog";

const pageTitle = "Anthropic Exam Prep: Agent Factory Study Notes";
const pageDescription =
  "Anthropic ke exam ki tayari ke liye Agent Factory book ka detailed Roman Urdu revision guide: har chapter ka Core Idea, easy explanation, aur recap table, bina kisi heading ya terminology miss kiye.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/anthropic-exam-prep" },
  openGraph: {
    type: "article",
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

/* ------------------------------------------------------------------ */
/*  Table of contents (reuses the blog scroll-spy sidebar)             */
/* ------------------------------------------------------------------ */
/*  Har naya chapter add hote waqt yahan bhi ek entry add karein, id  */
/*  wahi honi chahiye jo neeche <section id="..."> mein di gayi ho.   */

const toc: TocItem[] = [
  { id: "intro", text: "Ye Notes Kya Hain", level: 2 },
  { id: "ch01", text: "01 · AI Fluency, The 4Ds", level: 2 },
  { id: "self-test", text: "Self-Test Quiz", level: 2 },
];

/* ------------------------------------------------------------------ */
/*  Shared presentational helpers (server components)                  */
/*  Same components as /exam, taake dono guides ek hi visual language  */
/*  follow karein.                                                     */
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

/** Big eyebrow label that marks the start of a book "Part" inside a chapter. */
function PartBanner({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 mt-16 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
      <span className="h-px w-5 bg-accent/50" />
      {children}
    </p>
  );
}

/** Monospace box for example prompts, mirroring the book's code blocks. */
function PromptBox({ children }: { children: ReactNode }) {
  return (
    <pre className="my-4 whitespace-pre-wrap rounded-xl border border-border bg-black/25 p-4 font-mono text-xs leading-relaxed text-foreground/90 sm:text-[0.83rem]">
      {children}
    </pre>
  );
}

/** A short, punchy quote pulled out of the flow, for the "one sentence to
 *  remember" style lines the book likes to close sections with. */
function PullQuote({ children }: { children: ReactNode }) {
  return (
    <p className="my-6 rounded-2xl border-l-4 border-accent bg-card/50 px-5 py-4 text-base font-medium italic leading-relaxed text-foreground/90 sm:text-lg">
      &ldquo;{children}&rdquo;
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Chapter 01 diagrams: AI Fluency, The 4Ds                           */
/*  Recreated in Cybrum's own visual language (Tailwind + lucide),     */
/*  not the book's original illustrations, to stay on-brand.           */
/* ------------------------------------------------------------------ */

/** Fig-01 equivalent: the four qualities every 4D serves. */
function FourQualitiesDiagram() {
  const items = [
    { icon: Target, t: "Effective", d: "Aap actually apne goal tak pahunchte hain" },
    { icon: Gauge, t: "Efficient", d: "Time, effort ya tokens waste nahi hote" },
    { icon: Scale, t: "Ethical", d: "AI ka role fair aur honest tareeke se batate hain" },
    { icon: ShieldCheck, t: "Safe", d: "Privacy, security aur important info protect rehti hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4 text-center">
            <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={18} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Chaar qualities, har ek 4D isi mein se kam az kam ek ki khidmat karti
        hai, ye ek durable skill set hai, prompt tricks ka collection nahi
      </figcaption>
    </figure>
  );
}

/** Fig-02 equivalent: automation → augmentation → agency autonomy spectrum. */
function ThreeModesDiagram() {
  const modes = [
    { icon: Settings, t: "Automation", q: "Ye kaam kar do", role: "Aap script writer hain", d: "AI aapki specific instructions se ek specific task perform karta hai" },
    { icon: Users, t: "Augmentation", q: "Chalein mil kar sochein", role: "Aap co-creator hain", d: "Aap aur AI thinking partners ki tarah collaborate karte hain" },
    { icon: Compass, t: "Agency", q: "Mere liye ye goal pursue karo", role: "Aap director hain", d: "AI aapke set kiye vision ke andar khud faisle karta hai" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {modes.map(({ icon: Icon, t, q, role, d }, i) => (
          <div key={t} className="relative rounded-xl border border-border bg-card/60 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={17} />
            </span>
            <p className="text-sm font-bold text-foreground">{t}</p>
            <p className="mt-0.5 text-xs font-medium italic text-accent-bright">
              &ldquo;{q}&rdquo;
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{d}</p>
            <p className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-1 text-[0.65rem] font-semibold text-accent-bright">
              {role}
            </p>
            {i < modes.length - 1 && (
              <ArrowRight
                size={14}
                className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-accent sm:block"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span className="rounded-full border border-border px-2 py-0.5">Low AI autonomy</span>
        <span className="h-px flex-1 bg-border" />
        <span className="rounded-full border border-border px-2 py-0.5">High AI autonomy</span>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Koi mode behtar nahi, fluency wahi mode chunna hai jo task ko chahiye,
        aur unke beech move kar sakna
      </figcaption>
    </figure>
  );
}

/** Fig-03 equivalent: how a model produces a "plausible continuation". */
function LlmRealityDiagram() {
  return (
    <figure className="my-7">
      <Flow steps={["Aapka prompt", "Training ke patterns", "Plausible continuation"]} />
      <div className="grid gap-2.5 sm:grid-cols-3">
        {[
          { t: "Plausible ≠ Correct", d: "Confident aur ghalat dono sath ho sakte hain" },
          { t: "Output badalta hai", d: "Wahi sawal alag waqt pe alag jawab de sakta hai" },
          { t: "Sirf jo available ho", d: "Training, chat, documents, tools; jo missing ho wahan guess ho sakta hai" },
        ].map((n) => (
          <div key={n.t} className="rounded-xl border border-border bg-card/60 p-4">
            <p className="text-sm font-semibold text-foreground">{n.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{n.d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Har output ko ek capable colleague ka informed draft samajhein, kabhi
        bhi ground truth nahi
      </figcaption>
    </figure>
  );
}

/** Fig-04 equivalent: the three parts of Delegation. */
function DelegationPartsDiagram() {
  return (
    <figure className="my-7">
      <Flow
        steps={[
          "Problem Awareness: goal aur success ka matlab pata ho",
          "Platform Awareness: kaunsa AI tool is task ke liye sahi hai",
          "Task Delegation: kaam jaan-boojh kar divide karo",
        ]}
      />
      <figcaption className="mt-1 text-center text-xs text-muted">
        Domain expert pehle, AI delegator baad mein: AI expertise ko speed
        deta hai, replace kam hi karta hai
      </figcaption>
    </figure>
  );
}

/** Fig-05 equivalent: the three parts of Description. */
function DescriptionPartsDiagram() {
  const parts = [
    { icon: Package, t: "Product", q: "Kya chahiye", d: "Output ka type, audience, format, length, tone" },
    { icon: GitBranch, t: "Process", q: "Kaise ho", d: "Steps, order, method, examples, beech ke checks" },
    { icon: Sliders, t: "Performance", q: "Kaise behave kare", d: "AI aapke saath aur khud se kaise behave kare" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-3 sm:grid-cols-3">
        {parts.map(({ icon: Icon, t, q, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={17} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="text-xs font-medium text-accent-bright">{q}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Yaad rakhne ka tareeka: What → How → Mere saath kaam kaise kare.
        Completeness cleverness se jeetti hai
      </figcaption>
    </figure>
  );
}

/** Fig-07 equivalent: diligence across a before / during / after timeline. */
function DiligenceTimelineDiagram() {
  const stops = [
    { icon: ShieldCheck, t: "Pehle · Creation", d: "Sahi tool, sahi data, sahi context chunna" },
    { icon: Eye, t: "Dauran · Transparency", d: "AI ke role ke baare mein sabse honest rehna" },
    { icon: Rocket, t: "Baad Mein · Deployment", d: "Ship karne se pehle verify karna aur vouch karna" },
  ];
  return (
    <figure className="my-7">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {stops.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-xl border border-border bg-card/60 p-4">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
              <Icon size={17} />
            </span>
            <p className="text-sm font-semibold text-foreground">{t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        &ldquo;Kya main confidently is par apna naam laga sakta hoon? Agar
        nahi, to ye ship nahi hoga.&rdquo;
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
  url: `${site.url}/anthropic-exam-prep`,
  inLanguage: "ur-Latn",
  learningResourceType: "Study notes",
  author: {
    "@type": "Person",
    name: site.founder,
    url: contact.portfolio,
  },
  publisher: { "@id": `${site.url}/#organization` },
};

export default function AnthropicExamPrepPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={jsonLd} />

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
              guide, Anthropic exam ki tayari ke liye. Har chapter mein Core
              Idea, detailed explanation, aur ek recap table &mdash; koi bhi
              heading ya terminology miss kiye bina.
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
          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#intro"
                className="glow-accent inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <BookOpen size={16} />
                Start Reading
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
              Ye page <Strong>Agent Factory book</Strong> ka ek detailed aur
              asaan Roman Urdu revision guide hai, Anthropic ke exam ki
              tayari ke liye. Chapters ahista ahista add hote rahenge, jaise
              jaise topics organize honge.
            </P>
            <P>
              Har chapter mein teen cheezein hamesha milengi. Pehla, ek{" "}
              <Strong>Core Idea box</Strong> jo us poore chapter ka essence ek
              jagah deta hai. Doosra, <Strong>detailed explanation</Strong>{" "}
              easy examples ke saath, taake concept sirf ratta na lage balke
              samajh mein aaye. Teesra, ek <Strong>recap table</Strong> jo
              revision ke waqt ek nazar mein sab yaad dila de.
            </P>
          </Reveal>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Chapter 01 · AI Fluency, The 4Ds                               */}
        {/* Source: agentfactory.panaversity.org/docs/ai-fluency-crash-course */}
        {/* ------------------------------------------------------------ */}
        <section id="ch01" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <ChapterHeader
              num="01"
              title="AI Fluency, The 4Ds"
              sub="Delegation, Description, Discernment, Diligence — AI ke saath kaam karne ka insaan wala skill"
            />
            <CoreIdea>
              AI fluency ka matlab clever prompts yaad karna nahi hai. Ye chaar
              competencies hain, <Strong>4Ds</Strong>: Delegation (kaam divide
              karo), Description (AI ko sahi cheez do), Discernment (jo wapis
              aaye usay judge karo), Diligence (zimmedari lo). Powerful AI bhi
              in chaaron ke bina galat, off-brand ya risky result de sakta
              hai.
            </CoreIdea>
          </Reveal>

          {/* ---------------------------- Opening hook --------------- */}
          <Reveal>
            <SubHeading>Ek Naye Colleague Ki Kahani</SubHeading>
            <P>
              Socho ek talented naya colleague team join karta hai. Pehle hi
              din aap usay kehte hain: &ldquo;AI agents par ek course outline
              tayar karo.&rdquo; Kuch ghanton baad wo PhD researchers ke liye
              ek polished outline deta hai, poore semester ka timeline, aur
              hands-on practice na ke barabar. Problem uski qabiliyat nahi
              hai, <Strong>direction ki kami hai.</Strong>
            </P>
            <Callout label="Key Distinction">
              Insaan colleague se farq ye hai: AI conversations ke beech kuch
              bhi yaad nahi rakhta. Har naya chat ek aisi entity se shuru hota
              hai jo aapse pehle kabhi nahi mili. Jo baat aap kisi insaan ko
              ek dafa batate hain, AI ko wo har dafa dobara batani padti hai,
              ya kahin aisi jagah rakhni padti hai jahan se AI khud parh le.
              Ye khaami nahi hai, ek working condition hai jiske around plan
              karna padta hai, aur wahi plan karna 4 essential skills mein se
              ek hai.
            </Callout>
            <P>
              Powerful AI bhi poor collaboration se galat result deta hai.
              Sirf clever prompts jaanna kaafi nahi. <Strong>AI Fluency ka
              matlab hai:</Strong> AI ko kya dena hai, kaise guide karna hai,
              uske kaam ko kaise judge karna hai, aur kab use nahi karna ya
              trust nahi karna, ye sab jaanna.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Framework Ka Naam: 4Ds</SubHeading>
            <P>
              Ye framework Professor Rick Dakan aur Professor Joseph Feller ne
              banaya, Anthropic ke saath courses ke through taught. Char
              human competencies hain:
            </P>
            <RecapTable
              head={["Competency", "Ek Line Sawal"]}
              rows={[
                ["Delegation", "AI kya kare, aur mere paas kya rahe?"],
                ["Description", "AI ko kaam achay se karne ke liye kya chahiye?"],
                ["Discernment", "Result actually achha aur trustworthy hai?"],
                ["Diligence", "Ye AI ka responsible use hai, aur main result ka zimmedar banne ke liye ready hoon?"],
              ]}
            />
            <P>
              Plain English mein: <Strong>Decide → Explain → Check →
              Own.</Strong> Reading time taqreeban 30 minute hai, plus 15-20
              minute practice prompts ke liye.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Ye Course Foundations Mein Kahan Fit Hota Hai</SubHeading>
            <P>Recommended sequence yehi hai:</P>
            <Flow
              steps={[
                "What AI Actually Is, machine ko samjhata hai",
                "AI Fluency, ye course, machine ke saath kaam karna sikhata hai",
                "AI Prompting in 2026, practical techniques sikhata hai",
              ]}
            />
            <RecapTable
              head={["Topic", "What AI Actually Is", "Ye Course", "AI Prompting 2026"]}
              rows={[
                ["AI kaise kaam karta hai", "In depth", "Quick reminder", "Assumed"],
                ["Communicate kaise karein", "Context kyun matter karta hai", "Description", "Practical techniques"],
                ["Jawab judge kaise karein", "Plausible ghalat kyun ho sakta hai", "Discernment", "Model-checking habits"],
                ["AI ko kya dein", "Jagged frontier", "Delegation", "Models/tools choose karna"],
                ["Responsible use", "Mostly out of scope", "Diligence", "Safe tool use, permissions"],
              ]}
            />
            <Callout label="Note">
              Techniques models improve hone ke saath badalti rahengi. Ye
              chaar competencies isliye design hui hain ke wo last karein.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>3 Minute Mein Farq Dekhein</SubHeading>
            <P>Pehla prompt, generic:</P>
            <PromptBox>Write a welcome email for new members.</PromptBox>
            <P>Result: competent, grammatical, mukammal generic.</P>
            <P>Doosra prompt, specific, fresh chat mein:</P>
            <PromptBox>{`Write a welcome email for new members of a small women's cycling club
in Karachi. Most are nervous beginners who have never ridden in traffic.
Warm and a bit funny, under 150 words, no exclamation marks. End by
telling them the Saturday 6am ride is slow on purpose and nobody gets
dropped.`}</PromptBox>
            <P>
              Same model, same teen second ka kaam. Doosra email kaafi behtar
              hai. <Strong>Do observations:</Strong> gap results ke beech
              aapse (insaan se) aaya, model se nahi; aur aap doosre email ko
              behtar isliye judge kar paaye kyunke aap cycling clubs, nervous
              beginners aur Karachi ko kaafi samajhte hain. Pehli baat{" "}
              <Strong>Description</Strong> hai, doosri <Strong>Discernment</Strong>.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Course Khatam Hone Tak Kya Samajh Aana Chahiye</SubHeading>
            <CheckList
              items={[
                "AI fluency ka matlab, sirf \"prompts mein achha hona\" se zyada kya hai",
                "Automation, augmentation aur agency mein farq",
                "Kaam khud rakhna hai ya AI ko dena hai, ye kaise decide karein",
                "Description ke teen types: product, process, performance",
                "AI ka output evaluate kaise karein, sirf confident jawab accept karne ki jagah",
                "Diligence ke teen types: creation, transparency, deployment",
                "Ek real project mein chaaron competencies sath kaise chalti hain",
                "Ye personal skills Agent Factory ki engineering practices mein kaise scale hoti hain",
              ]}
            />
          </Reveal>

          {/* ---------------------------- PART 1 ---------------------- */}
          <Reveal>
            <PartBanner>Part 1 · Bari Tasveer Se Shuru</PartBanner>
            <SubHeading>1. AI Access, AI Fluency Nahi Hai</SubHeading>
            <P>
              Powerful AI tak access hona, use achay se istemal karna jaanne
              ke barabar nahi. Taqreeban sabke paas same models available
              hain. Same plan par same assistant use karne wale do log bilkul
              alag results paate hain. Tool alag nahi tha, <Strong>unhon ne
              usse jo kiya wo alag tha.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>AI Fluency Ka Matlab: AI Ke Saath Aise Kaam Karna Jo</SubHeading>
            <FourQualitiesDiagram />
            <P>
              <Strong>Jo zaroori NAHI hai:</Strong> large language models
              train karna samajhna, transformer architecture ki deep
              knowledge, ya &ldquo;magic prompts&rdquo; ka koi collection.
              Foundation sirf itni hai: AI ke around achay human decisions
              lena seekhna. Progression yehi hai: Delegation → Description →
              Discernment → Diligence, ya plain English mein: Decide →
              Explain → Check → Own.
            </P>
            <Callout label="Agent Factory Readers Ke Liye Ahmiyat">
              Ye sab se pehle aata hai. Mode 1 mein aap general agents use
              karte hain problems solve karne ke liye. Mode 2 mein aap doosron
              ke liye Digital FTEs banate hain. Dono ke liye AI fluency
              zaroori hai. <Strong>&ldquo;Agar aap ek AI assistant ke saath
              achay se kaam nahi kar sakte, to aap ek aisa AI system design
              karne ke liye ready nahi hain jo sainkron ya hazaron users ke
              liye act kare.&rdquo;</Strong>
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Pichle Chapter Se 3 Facts Yaad Rakhein</SubHeading>
            <CheckList
              items={[
                "Plausible, correct ke barabar nahi hai, AI confident jawab de sakta hai jo ghalat ho (hallucination)",
                "Outputs vary karte hain, wahi request alag waqt par alag jawab de sakti hai",
                "AI sirf available information ke saath kaam karta hai, missing info guess ban sakti hai",
              ]}
            />
            <LlmRealityDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>2. AI Ke Saath Kaam Karne Ke 3 Tareeqe: Automation, Augmentation, Agency</SubHeading>
            <P>
              4Ds seekhne se pehle ek aur foundational idea zaroori hai.
              Insaan AI ke saath teen broad modes mein kaam karte hain, farq
              mainly is baat se hota hai ke <Strong>AI ko agla step decide
              karne ki kitni azadi hai.</Strong>
            </P>
            <ThreeModesDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>Automation: &ldquo;Ye Task Karo&rdquo;</SubHeading>
            <P>
              Aap AI ko exactly bata dete hain kaunsa task karna hai, jaise
              &ldquo;is report ko 5 bullets mein summarize karo&rdquo;,
              &ldquo;is email ko Urdu mein translate karo&rdquo;, ya
              &ldquo;invoice se number, date, total nikal do&rdquo;. Aap{" "}
              <Strong>script writer</Strong> hain. Best use tab hai jab kaam
              clear aur repeatable ho.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Augmentation: &ldquo;Mere Saath Socho&rdquo;</SubHeading>
            <P>
              Aap aur AI sath milkar kaam karte hain: business idea
              brainstorm karna, software architecture review karna, lesson
              plan behtar banana, do strategies compare karna. AI ek{" "}
              <Strong>thinking partner</Strong> ki tarah kaam karta hai, sirf
              instructions execute nahi karta. Aap kai turns aage peeche jaate
              hain: aap poochte hain, wo jawab deta hai, aap challenge karte
              hain, wo revise karta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Agency: &ldquo;Mere Liye Ye Goal Pursue Karo&rdquo;</SubHeading>
            <P>
              Aap AI ko ek goal aur boundaries dete hain, phir usay kai steps
              khud decide karne dete hain. &ldquo;In paanch emails ko parh kar
              summarize karo&rdquo; kehne ki jagah, aap kehte hain:
            </P>
            <PromptBox>{`"Keep my inbox manageable. Reply to routine messages, flag important ones,
and ask me before doing anything you are unsure about."`}</PromptBox>
            <P>
              Ab AI ko decide karna padta hai ke kya routine hai, kya important
              hai, kab poochna hai. Aap script writer se <Strong>director</Strong>{" "}
              ban gaye. Do lafz weight uthate hain: <Strong>Future</Strong>{" "}
              (aap room mein nahi hain, Monday ko set kiya, Thursday ka kaam
              khud handle hota hai) aur <Strong>for others</Strong> (jis insaan
              ki AI khidmat kar rahi hai, wo aap khud nahi bhi ho sakte).
              Automation aur augmentation aapko chair mein rakhte hain. Agency
              mein aap chair se uth jate hain, aur Mode 2 ki har mushkil isi
              ek fact se nikalti hai: aap har decision supervise nahi kar
              sakte, isliye judgment pehle se built-in honi chahiye.
            </P>
            <RecapTable
              head={["Aspect", "Automation", "Agency"]}
              rows={[
                ["Aap dete hain", "Task ya steps", "Goal aur boundaries"],
                ["AI decide karta hai", "Bohot kam", "Kai agle steps"],
                ["Aapka role", "Script writer", "Director"],
                ["Common failure", "Ek step ghalat hota hai", "Goal ya boundary misunderstood hoti hai"],
              ]}
            />
            <P>
              Koi mode automatically behtar nahi. Ek achha AI user wahi mode
              chunta hai jo kaam ko chahiye, ek project mein teenon mil sakte
              hain. Mode 1 automation aur augmentation zyada use karta hai,
              Mode 2 agency ko systematic banata hai: ek Digital FTE sirf
              &ldquo;AI kaam kar raha hai&rdquo; nahi, balke ek job
              definition, System of Record, permissions, rules aur governance
              ke andar AI act kar raha hai.
            </P>
          </Reveal>

          {/* ---------------------------- PART 2 ---------------------- */}
          <Reveal>
            <PartBanner>Part 2 · Chaar Competencies</PartBanner>
            <SubHeading>3. Delegation: Decide Karo Kaun Kya Kare</SubHeading>
            <P>
              Sabse common beginner mistake pehle prompt se pehle hoti hai:
              log AI assistant khol kar type karna shuru kar dete hain bina ye
              decide kiye ke actually achieve kya karna hai, achha result
              kaisa dikhega, kaunse parts AI kare, kaunse parts khud karein,
              aur kaunse decisions kabhi AI ko na diye jayein. Yehi Delegation
              ka problem hai.
            </P>
            <Callout label="Definition">
              <Strong>Delegation</Strong> ka matlab hai decide karna ke kaam
              insaan aur AI ke beech kaise divide ho. Ye sirf &ldquo;AI ko
              kaam de dena&rdquo; nahi hai, ye poori workflow design karna
              hai.
            </Callout>
            <DelegationPartsDiagram />
            <Callout label="Slate Banner">
              Domain expert pehle, AI delegator baad mein, kyunke AI
              expertise ko accelerate karta hai, usay replace kam hi karta
              hai. <Strong>Delegation workflow design hai, task offloading
              nahi.</Strong>
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>3.1 Problem Awareness</SubHeading>
            <P>AI se kuch bhi poochne se pehle khud se poochein:</P>
            <CheckList
              items={[
                "Goal kya hai?",
                "Ye kiske liye hai?",
                "Success kaisa dikhta hai?",
                "Kya galat ho sakta hai?",
                "Human judgment kahan zaroori hai?",
              ]}
            />
            <P>
              <Strong>Example:</Strong> ek beginner bolta hai &ldquo;mujhe ek
              invoice-chasing agent bana do&rdquo;. AI kuch bana to dega,
              lekin hard sawal reh jate hain: kaunse customers ko contact
              kare, kitne din late hone par, kaunsa tone use kare, kis amount
              par human approve kare, customer dispute kare to kya ho, agent
              kaunsa accounting system parh sakta hai, agent messages sirf
              draft kare ya bhej bhi sake. <Strong>Ye business sawal hain,
              prompting sawal nahi.</Strong> AI aapki business policy decide
              nahi kar sakta jab tak aap jaan-boojh kar wo authority na dein,
              aur kai cases mein aapko dena bhi nahi chahiye.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3.2 Platform Awareness</SubHeading>
            <P>
              Har AI system har kaam mein equally achha nahi hota. Aap chun
              sakte hain: mushkil multi-step problems ke liye reasoning
              model, current info ke liye search-enabled assistant, software
              ke liye coding agent, ya tools/multiple steps wale kaam ke liye
              agent-capable system. Habit banayein: &ldquo;kya ye tool is job
              ke liye sahi hai?&rdquo; poochna, alag systems try karna,
              results compare karna, notes rakhna.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>3.3 Task Delegation</SubHeading>
            <P>
              Problem aur platform samajhne ke baad, kaam ko deliberately
              parts mein baantein. Example, ek course banate waqt:
            </P>
            <RecapTable
              head={["Task", "Best Owner", "Kyun"]}
              rows={[
                ["Audience aur learning goals decide karna", "Human", "Purpose aur judgment chahiye"],
                ["Possible course structures suggest karna", "AI + Human", "AI breadth deta hai, human choose karta hai"],
                ["Agreed outline se sections draft karna", "AI", "First drafts mein tez hai"],
                ["Factual claims verify karna", "Human", "Accountability author ke paas rehti hai"],
                ["Lived experience aur local examples add karna", "Human", "AI ke paas aapka experience nahi hai"],
                ["Grammar aur consistency improve karna", "AI", "Mechanical review ke liye achha fit"],
                ["Final course approve karna", "Human", "Aapka naam aur reputation attached hai"],
              ]}
            />
            <Callout label="Behtar Sawal">
              &ldquo;Kya AI ye kar sakta hai?&rdquo; ki jagah poochein:{" "}
              <Strong>&ldquo;Kaunse parts AI kare, kaunse main karoon, aur
              kyun?&rdquo;</Strong>
            </Callout>
            <P>
              Agent Factory mein Delegation engineering ban jati hai: Problem
              Awareness <Strong>specification</Strong> ban jati hai (goal,
              constraints, risks, definition of done), aur Task Delegation
              Digital FTE ki boundary ban jati hai (AI kya kar sakta hai,
              humans kya rakhte hain, kya escalate hona chahiye).
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>4. Description: AI Ko Wo Do Jo Usay Chahiye</SubHeading>
            <P>
              Shuru wale colleague ko yaad karein, uski outline isliye galat
              thi kyunke important information chhoot gayi thi. AI ko bhi
              yehi problem hai, magar zyada shiddat se. Wo aapka mind parh
              nahi sakta. Agar aap kuch important chhod dete hain, wo ek
              reasonable guess kar sakta hai, aur reasonable guess bhi ghalat
              ho sakti hai.
            </P>
            <Callout label="Definition">
              <Strong>Description</Strong> wo skill hai jisse aap AI ko wo
              information aur guidance dete hain jo usay kaam achay se karne
              ke liye chahiye. Ye sirf &ldquo;achha prompt likhna&rdquo; se
              kaafi bara hai.
            </Callout>
            <DescriptionPartsDiagram />
            <Callout label="Key Principle">
              &ldquo;Completeness cleverness ko harati hai, best prompt clever
              nahi hota, complete hota hai.&rdquo; Scale par, description{" "}
              <Strong>context engineering</Strong> ban jati hai: har cheez
              design karna jo AI ko succeed karne ke liye chahiye, na ke sirf
              ek message ki wording.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>4.1 Product Description: Result Define Karo</SubHeading>
            <P>Sawal: &ldquo;mujhe wapis exactly kya chahiye?&rdquo;</P>
            <P>Vague:</P>
            <PromptBox>Summarize this report.</PromptBox>
            <P>Clearer:</P>
            <PromptBox>{`Summarize this quarterly financial report for senior executives who have
ten minutes to read. Focus on revenue trends, major risks, and recommended
actions. Use short bullet points and keep it to one page. Highlight any
figure that changed significantly from last quarter. Avoid unnecessary
accounting jargon.`}</PromptBox>
            <P>
              Doosra request zyada intelligent nahi, <Strong>zyada
              complete</Strong> hai. Completeness aksar clever wording se
              zyada matter karti hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>4.2 Process Description: Approach Define Karo</SubHeading>
            <P>Sawal: &ldquo;AI ko kaam kaise karna chahiye?&rdquo; Example:</P>
            <PromptBox>{`Review this code for correctness first, security second, and style last.
Do not spend time on naming issues until you have checked whether the
code actually works.`}</PromptBox>
            <P>
              Process description sabse zyada matter karti hai jab kaam ke
              kai stages hon. Example, teen vendors (A, B, C) ke proposals se
              recommendation banana:
            </P>
            <Ladder
              steps={[
                { title: "Extract", note: "Har proposal se same facts ek table mein: price, contract length, exit terms, support hours. Check: 3-4 cells source se confirm karein." },
                { title: "Compare", note: "Sirf table use karke vendors compare karein. Check: har farq actually table mein maujood hai?" },
                { title: "Score", note: "Har vendor ko score dein, jo aapke liye zyada matter karta hai usay zyada weight dein. Check: scores aapki criteria follow karte hain, ya AI ne khud koi criterion add kar diya?" },
                { title: "Draft", note: "Recommendation likhein. Check: sirf wahi claim karta hai jo steps 1-3 support karte hain?" },
              ]}
            />
            <Callout label="General Rule" tone="warn">
              Jis step ki galti sabse door tak failaye, wo pehle aata hai, aur
              aage barhne se pehle usay check karein. Extraction pehle isliye
              hai kyunke table mein ghalat prices comparison, scoring aur
              draft tak carry ho jati hain, reading time tak sahi lagti
              rehti hain.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>4.3 Performance Description: Behavior Define Karo</SubHeading>
            <P>Sawal: &ldquo;ye AI kaise behave kare, aur kiske liye?&rdquo; Example:</P>
            <PromptBox>{`Challenge my assumptions when they are weak. Flag uncertainty. Do not
agree with me just to be polite. If my argument is stronger, explain why.
If yours is stronger, hold your position and explain it.`}</PromptBox>
            <P>
              Ye AI ko polite answer machine se behtar thinking partner bana
              deta hai. Do versions hain: <Strong>chhota version</Strong>{" "}
              (chat window, sirf aapke liye) aur <Strong>bara version</Strong>{" "}
              (deployed agent, jaise ek tutoring agent ka rule &ldquo;student
              ke attempt karne se pehle answer mat do&rdquo;, ye same sentence
              hai bas stakes badal gaye: ek dafa likha, hazar dafa apply hota
              hai, aise logon par jinse aap kabhi nahi milenge). Chat mein
              buri performance description das minute pareshan karti hai,
              deployed agent mein wahi <Strong>product</Strong> ban jati hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Prompt Engineering Se Context Engineering Tak</SubHeading>
            <P>
              <Strong>Prompt engineering poochta hai:</Strong> &ldquo;Ye
              message kaise likhun?&rdquo; <Strong>Context engineering ek
              bara sawal poochta hai:</Strong> &ldquo;AI ko succeed karne ke
              liye kya available hona chahiye?&rdquo;
            </P>
            <CheckList
              items={[
                "Documents", "Examples", "Memory", "Conversation history",
                "Policies", "Tools", "Database records", "Definitions", "Instructions",
              ]}
            />
            <P>
              Ek agent ke liye ye bohot matter karta hai: khubsurat prompt bhi
              agent ko nahi bacha sakta agar uske paas galat data ho, missing
              rules hon, kamzor examples hon, ya zaroori tools tak access na
              ho. Agent Factory mein: system prompt ek performance
              description ko persistent banata hai, ek <Strong>SKILL.md</Strong>{" "}
              ek process description ko reusable banata hai, aur ek System of
              Record domain knowledge, rules, definitions, governance rakh
              sakta hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5. Discernment: Confidence Ko Correctness Na Samjhein</SubHeading>
            <P>
              AI aksar confident sound karta hai. Ye readability ke liye
              useful hai, trust ke liye khatarnak. Ek ghalat AI answer aam
              taur par warning label ke sath nahi aata, wo polished, detailed
              aur certain dikh sakta hai.
            </P>
            <Callout label="Definition">
              <Strong>Discernment</Strong> AI ka diya hua kaam judge karne ki
              ability hai. Description poochti hai &ldquo;kya maine kaam
              clearly explain kiya?&rdquo;, Discernment poochti hai &ldquo;kya
              AI ne actually kaam achay se kiya?&rdquo;
            </Callout>
            <Callout label="Important Term" tone="warn">
              <Strong>Automation Bias:</Strong> ek automated answer ko zaroorat
              se zyada aasani se trust kar lena, khaas kar jab wo confident ya
              professional lage.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Bani Hui Baat Bhi Success Jaisi Dikh Sakti Hai</SubHeading>
            <P>
              Hallucinated answer, sahi answer se almost identical dikh sakta
              hai. Fluent writing proof nahi, citation jaisi link proof nahi,
              confident tone proof nahi. Char signs jo aksar bani hui baat
              dikhati hai:
            </P>
            <RecapTable
              head={["Sign", "Kya Karein"]}
              rows={[
                ["Bohot exact specifics", "Source khol kar number repeat karne se pehle check karein"],
                ["Wahan confidence jahan expert hesitate kare", "Poochein kya cheez answer badal degi"],
                ["Lambe output mein contradiction", "Ending ko beginning ke against parhein"],
                ["Ek claimed action jo hui hi nahi", "Jab tak tool sabot na de (sent message, opened page, test log), claim ko sentence samjhein, event nahi"],
              ]}
            />
            <Callout label="General Principle" tone="warn">
              Jahan accuracy matter karti hai, wahan verify zaroor karein.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Discernment, Description Ko Mirror Karti Hai</SubHeading>
            <P>Isi ke bhi teen parts hain, teen hi cheezon ki taraf ishara karte hue:</P>
            <RecapTable
              head={["Type", "Sawal"]}
              rows={[
                ["Product Discernment", "Kya result achha hai?"],
                ["Process Discernment", "Kya AI ke saath is tarah kaam karna faida de raha hai?"],
                ["Performance Discernment", "Jab AI khud act karta hai, log achay se serve ho rahe hain?"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>5.1 Product Discernment</SubHeading>
            <CheckList
              items={[
                "Kya ye factually correct hai?",
                "Kya har important requirement follow hui?",
                "Kuch missing to nahi?",
                "Kya ye internally consistent hai?",
                "Kya ek expert isay credible samjhega?",
                "Kya main is par apna naam laga sakta hoon?",
              ]}
            />
            <P>
              <Strong>Critical insight:</Strong> aapka apna domain knowledge
              bohot valuable ban jata hai, ek accountant buri assumptions
              notice karta hai, ek programmer subtle bugs pakarta hai, ek
              teacher beginners ke liye confusing explanation pakarta hai.
              &ldquo;AI expert work ki speed barha sakta hai. Expertise ki
              zaroorat khatam nahi karta.&rdquo;
            </P>
            <P>
              Result ke peeche ki <Strong>reasoning bhi judge karein</Strong>,
              kyunke AI kamzor wajoohat se bhi sahi jawab tak pohanch sakta
              hai, aur ghalat assumption par khara sahi jawab zyada der sahi
              nahi rehta. Useful hai AI se ye dikhwana: assumptions, evidence,
              decision criteria, calculations, intermediate results,
              alternative interpretations. Inhe ek{" "}
              <Strong>review ke liye justification</Strong> samjhein, hidden
              reasoning ka literal transcript nahi.
            </P>
            <PromptBox>{`Before recommending one option, list your assumptions, the evidence
supporting them, and the criteria you are using to decide. Then give
the recommendation.`}</PromptBox>
            <P>Documents-based answers ke liye ye bhi add karein:</P>
            <PromptBox>{`Answer only from the three proposals I attached, not from anything
you know about these vendors. If a proposal does not state its exit
terms, say so instead of guessing. For every term you report, quote
the proposal's section heading and the sentence it came from.`}</PromptBox>
            <P>
              Ye teen cheezein karta hai: sirf attached cheez use karta hai
              (na ke training knowledge se gaps bharta, jahan se imaginary
              features aati hain), &ldquo;ye nahi likha&rdquo; bolne ki
              ijazat deta hai, aur aapko ek minute mein checkable cheez deta
              hai, teenon proposals dobara parhne ki jagah. Koi bhi cheez
              answer parhna replace nahi karti, ye parhna tez banati hai aur
              bani hui baat pakarna aasan.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5.2 Process Discernment</SubHeading>
            <P>
              Kabhi kabhi answer theek hota hai lekin working relationship
              nahi. Ye wo sawal hai jo log almost kabhi nahi poochte, kyunke
              output acceptable laga aur session success jaisa feel hua. Khud
              se poochein:
            </P>
            <CheckList
              items={[
                "Kya AI mere feedback se adapt kar raha hai, ya wapis purani cheez par drift ho raha hai?",
                "Kya do dafa correct karne ke baad bhi wahi galti dohra raha hai?",
                "Kya wo itna agreeable ho gaya hai ke useless ban gaya?",
                "Kya main har turn wahi formatting problem repair kar raha hoon?",
                "Kya main iska draft khud likhne se zyada heavily edit kar raha hoon?",
              ]}
            />
            <P>
              Jab process kaam nahi kar raha, teen escalating moves hain, aur
              teenon fluency hain: performance description badlein, tool
              badlein, ya task wapis apne paas le lein. Sirf teesra defeat
              jaisa lagta hai, aksar hota nahi.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>5.3 Performance Discernment</SubHeading>
            <P>
              Ye tab exist karti hai jab aap agency use kar chuke hon, aur
              book aakhir mein isi ki sabse zyada parwah karti hai. Ye poochti
              hai: kya AI ka <Strong>independent, user-facing behavior</Strong>{" "}
              logon ke liye achay outcomes deta hai. Ye is baat se alag hai ke
              koi ek output sahi tha ya nahi. Example: ek AI tutor har sawal
              ka sahi jawab de sakta hai aur phir bhi bura tutor ho sakta hai
              agar wo student ke hesitate karte hi solution de deta hai,
              koi seekhta nahi. Ye single chats mein nahi, aggregate mein
              nazar aata hai: users aage kya karte hain, wo kis baat par
              complain karte hain, kaunse cases chupke se har baar wahi galat
              hote hain. Aap hazar conversations eyeball nahi kar sakte,
              isliye kuch aisa banana padta hai jo unhe aapki jagah dekhe.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>The Description–Discernment Loop</SubHeading>
            <Flow
              loop
              steps={[
                "Aap describe karte hain kya chahiye",
                "AI kuch produce karta hai",
                "Aap inspect karte hain",
                "Aap batate hain kya badalna hai",
              ]}
            />
            <P>
              Jab discernment koi problem flag karti hai, usually fix behtar
              description hoti hai, kabhi kabhi ye wapis delegation tak le
              jati hai, galat tool, galat split, ya galat approach ki wajah
              se. <Strong>&ldquo;Professional AI collaboration iteration se
              converge hoti hai, ek hi shot mein kabhi nahi hoti.&rdquo;</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Ye Normal Hai</SubHeading>
            <P>
              Achha AI kaam usually iterative hota hai. Pehla response aksar
              ek draft hota hai, finish line nahi. Feedback dete waqt ye
              pattern use karein: <Strong>Problem → Kyun matter karta hai →
              Direction</Strong>
            </P>
            <P>Weak feedback:</P>
            <PromptBox>Wrong. Try again.</PromptBox>
            <P>Behtar feedback:</P>
            <PromptBox>{`The second section assumes enterprise customers. Our audience is solo
founders, so the advice is too expensive. Rewrite that section for a
one-person business with a limited budget.`}</PromptBox>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Achhe Draft Ko Doosri Pass Ki Zaroorat Kyun Padti Hai</SubHeading>
            <P>
              Kyunke wo galat reader ke liye likha gaya tha. Example: ek
              quarterly report ka finding, board ke liye aur support team ke
              liye alag alag likhein:
            </P>
            <RecapTable
              head={["Board Ke Liye", "Support Team Ke Liye"]}
              rows={[
                [
                  "Number, cause, decision: \"Tickets doubled, reply time 4 se 9 ghante, team nahi barhi. Do hires approve karein ya 9-ghante replies accept karein.\"",
                  "Kya badla, kyun unki galti nahi, Monday ko kya karna hai: \"Tickets is quarter double huye, team same size rahi, isliye 9-ghante replies volume se aayi hain, aapse nahi. Do hires request ho chuke hain. Jab tak aayen, sabse purana ticket pehle karein.\"",
                ],
              ]}
            />
            <P>
              Same facts, same model, do outputs. Koi bhi doosre reader ke
              liye kaam nahi karta.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Har Review Ka Ek Anjaam Hota Hai</SubHeading>
            <CheckList
              items={[
                "Kaam bhej diya jata hai (jaise cycling club email bhej diya gaya)",
                "Feedback ke sath wapis chala jata hai",
                "Aap task wapis apne paas le lete hain, kyunke fix ke liye sirf aap jaante hain",
              ]}
            />
            <Callout label="Critical Practice">
              Agla message type karne se pehle decide karein konsa anjaam
              hoga. Iterate karna hamesha ke liye nahi chalna chahiye, ending
              naam dena us &ldquo;bas ek aur chhoti change&rdquo; loop ko
              rokta hai jo poora din kha jata hai.
            </Callout>
            <P>
              Kabhi kabhi behtar description bhi kaafi nahi hoti, discernment
              dikhata hai ke original Delegation decision hi galat tha, shayad
              tool galat chuna, shayad AI ko wo part kabhi milna hi nahi
              chahiye tha, shayad ye kaam ek human expert maangta hai. Ye bhi
              fluency hai. Agent Factory mein Discernment{" "}
              <Strong>evaluation engineering</Strong> ban jati hai: aapka
              manual sawal &ldquo;kya ye kaafi achha hai?&rdquo; eval suites,
              production checks, monitoring, sampling aur release gates ban
              jata hai. <Strong>&ldquo;Aap wo judgment automate nahi kar sakte
              jo aapne khud kabhi seekha hi nahi.&rdquo;</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>6. Diligence: Zimmedari Se AI Use Karna</SubHeading>
            <P>Pehle teen Ds behtar results dilate hain. Diligence alag sawal poochti hai:</P>
            <PullQuote>Kya mujhe AI ko is tarah use karna chahiye bhi?</PullQuote>
            <Callout label="Example: Lecture Feedback Ka Masla" tone="warn">
              Ek lecturer AI se end-of-term student feedback draft karwata
              hai. Writing excellent hai. Lekin usne student names, grades
              aur disciplinary notes ek consumer AI service mein paste kar
              diye jo university ne approve nahi kiya tha. Students ko bataya
              hi nahi gaya ke unke academic record ka hissa AI ki madad se
              bana. <Strong>Output achha ho sakta hai, AI ka use phir bhi
              irresponsible hai.</Strong>
            </Callout>
            <Callout label="Definition">
              <Strong>Diligence</Strong> ka matlab hai AI kaise use hui iski
              zimmedari lena, aur uske output ka kya hota hai uski bhi.
            </Callout>
            <DiligenceTimelineDiagram />
          </Reveal>

          <Reveal>
            <SubHeading>6.1 Creation Diligence</SubHeading>
            <P>Information share karne se pehle poochein:</P>
            <CheckList
              items={[
                "Kya ismein personal data hai?",
                "Kya ismein confidential company information hai?",
                "Kya mujhe ye info is tool mein daalne ki ijazat hai?",
                "Data ko kaun access ya retain kar sakta hai?",
                "Kya ye service meri organization se approved hai?",
                "Koi legal, contractual ya professional restrictions hain?",
              ]}
            />
            <P>
              <Strong>Aasan raasta hamesha responsible raasta nahi hota.</Strong>{" "}
              Fix aksar task chhorna nahi, data <Strong>strip</Strong> karna
              hota hai. Lecturer example mein, wo naam aur student ID hata
              sakta tha, sirf grade range aur ek behavior rakh sakta tha,
              phir usi se feedback draft kar sakta tha. Principle: &ldquo;AI
              ko pattern chahiye, person nahi.&rdquo; Isay{" "}
              <Strong>redaction</Strong> kehte hain.
            </P>
            <RecapTable
              head={["Redaction Kaise Fail Hoti Hai", "Kya Hota Hai"]}
              rows={[
                ["Bohot zyada hata dena", "Feedback bina grade, bina incident ke feedback nahi rehta"],
                ["Bohot kam hata dena", "Details ka combination bhi ek insaan ko pehchan deta hai, jaise \"jo student week 3 lab miss kiya\""],
              ]}
            />
            <Callout label="Test">
              Kya koi sirf ye paste kiya hua parh kar samajh sakta hai ye kis
              ke baare mein hai? Agar haan, to aapne bohot kam strip kiya hai.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6.2 Transparency Diligence</SubHeading>
            <P>
              Har AI-assisted task ko public announcement ki zaroorat nahi.
              Lekin jab AI doosre logon ko materially affect kare, disclosure
              matter kar sakti hai: academic work, hiring decisions, customer
              communications, medical/financial advice, professional
              reports, ya original human work ki tarah present ki gayi
              content. Exact rules context, organization, law aur
              professional standard par depend karti hain.
            </P>
            <Callout label="Guiding Principle">
              &ldquo;AI-assisted result jitna zyada doosron ko affect karta
              hai, transparency ka case utna hi strong hai.&rdquo; Transparency
              ka matlab apni poori workflow bata dena nahi, matlab hai jab
              AI ka role matter kare to logon ko misleading na karna.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>6.3 Deployment Diligence</SubHeading>
            <P>
              AI-assisted kaam publish, send, execute ya kisi decision mein
              use hone se pehle check karein. Checking ka scope transparency
              principle set karti hai, jitne zyada log affect hote hain,
              utni zyada checking chahiye: khud ke liye note ek nazar leta
              hai, welcome email full read leta hai, regulator ko report ek
              second reviewer leta hai.
            </P>
            <CheckList
              items={[
                "Facts verify karein",
                "Sources actually exist confirm karein",
                "Calculations check karein",
                "Bias ya unfair outcomes review karein",
                "Permissions aur rights confirm karein",
                "Organization policy follow karein",
                "High-impact actions ke liye human approval lein",
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>The Numbers Rule</SubHeading>
            <Callout label="Critical Rule" tone="warn">
              <Strong>Jis number par koi decision khara ho, wo hamesha
              compute hona chahiye, kabhi generate nahi.</Strong> Jab aap AI
              se quarterly report summarize karwate hain, wo column ko
              spreadsheet ki tarah add nahi karta, sirf predict karta hai ke
              likely-looking total kya hoga, isliye total ghalat ho sakta hai
              chahe har line item sahi ho. Number spreadsheet, calculator ya
              AI ke chalaye code se lein jo aapko dikhaya gaya ho, phir inputs
              check karein, sum nahi: sahi rows aur sahi rate use hui?
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Ek Powerful Aakhri Sawal</SubHeading>
            <PullQuote>Kya main confidently is par apna naam laga sakta hoon?</PullQuote>
            <P>Agar jawab na hai, kaam ready nahi hai.</P>
            <P>
              Kabhi kabhi case unclear hota hai, saaf ghalat nahi. Example: ek
              AI-ranked job applicant shortlist reasonable lagti hai, lekin
              pata nahi chalta ke wo chupke se do universities ke graduates
              ko favor kar rahi hai ya nahi. Decide karne se pehle 4 sawal:
            </P>
            <CheckList
              items={[
                "Is result se kaun affect hota hai, un logon samet jo isay kabhi dekhenge bhi nahi?",
                "Unke liye kya galat ho sakta hai, aur kya wo bata payenge?",
                "Yahan fair outcome kaisa dikhega?",
                "Kya disclose hona chahiye, aur kise?",
              ]}
            />
            <P>
              Agar chaaron ka jawab de sakte hain, decide karein aur likh
              lein. Agar nahi, us decision ke owner tak escalate karein,
              guess kar ke bhejne ki jagah. <Strong>Guessing ek unclear case
              ko aapki mistake bana deta hai.</Strong>
            </P>
            <PullQuote>AI kaam automate kar sakta hai. Accountability automate nahi kar sakta.</PullQuote>
            <P>
              Agar ek AI-assisted system koi harmful decision leta hai, us
              system ko chalane wali organization phir bhi responsible hai.
              Agar coding assistant ek vulnerability introduce karta hai aur
              engineer usay ship kar deta hai, engineer aur organization
              dono result ke owner rehte hain. Agent Factory governance-first
              isi wajah se hai: Creation diligence data rules, access
              control, approved-tool policy ban jati hai; Transparency
              diligence disclosure aur user experience design ban jati hai;
              Deployment diligence evaluation gates, audit logs, monitoring,
              human review ban jati hai.
            </P>
          </Reveal>

          {/* ---------------------------- PART 3 ---------------------- */}
          <Reveal>
            <PartBanner>Part 3 · Chaaron Ko Mila Kar</PartBanner>
            <SubHeading>7. 4Ds Ek Practical Operating Loop Ki Tarah</SubHeading>
            <Flow
              loop
              steps={["Delegate karein", "Describe karein", "Discern karein", "Diligent rahein"]}
            />
            <P>
              <Strong>Delegation</Strong> decide karti hai AI kaam mein aaye
              ya nahi, aur kya owns kare. <Strong>Description</Strong> AI ko
              goal, context, process aur behavior deti hai. <Strong>
              Discernment</Strong> result check karti hai aur agla round
              behtar banati hai. <Strong>Diligence</Strong> poore process ko
              responsibility se gher deti hai.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Example: Ek Bookkeeping Digital FTE</SubHeading>
            <P>
              Ayesha Lahore mein ek Forward Deployed Engineer hai, Karachi ki
              ek chhoti accounting practice ke liye bookkeeping Digital FTE
              bana rahi hai. Pehla kaam automate karna: monthly bank
              reconciliation.
            </P>
            <Ladder
              steps={[
                { title: "Step 1 · Delegation", note: "Ayesha \"reconciliation agent bana do\" nahi poochti. Accounting partners ke sath job map karti hai: agent bank transactions match kar sakta hai, unmatched items flag kar sakta hai, report draft kar sakta hai; humans har journal adjustment approve karte hain, har write-off decision rakhte hain, tax se juri cheez accountant ke paas rehti hai, high-value unmatched items ek named person tak escalate hoti hain." },
                { title: "Step 2 · Description", note: "System ko chart of accounts, matching rules, purani reconciliations ki examples, partners ka report format, escalation rules, duplicate/stale cheque ki definitions deti hai. Rule: agent kabhi khud journal entry post nahi karega, kabhi client ko directly contact nahi karega." },
                { title: "Step 3 · Discernment", note: "Demo impressive lagne se agent kaam kar raha hai, ye assume nahi karti. Purani trusted reconciliations ke against test karti hai: kitne matches sahi hain, kitne ghalat matches slip karte hain, sahi cases escalate hote hain ya nahi, agent zyada escalate to nahi kar raha, performance time ke sath change to nahi ho rahi. Ek accountant kuch \"successful\" matches bhi review karta hai, sirf failures nahi." },
                { title: "Step 4 · Diligence", note: "Client financial data approved infrastructure ke andar rehta hai, agent actions log hote hain, jahan zaroori ho clients ko batayein reconciliation AI-assisted hai, ek human partner phir bhi reconciliation sign karta hai aur final result ka zimmedar rehta hai." },
              ]}
            />
            <P>
              Yehi 4D loop practice mein hai. <Strong>Personal skill ek
              system property ban gayi.</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Chart: Chat Skill Se Factory System Tak</SubHeading>
            <RecapTable
              head={["Competency", "Ek Chat Mein", "Agent Factory Mein"]}
              rows={[
                ["Delegation", "AI se kya poochna hai decide karna", "Digital FTE scope karna, human/AI boundary set karna"],
                ["Description", "Instructions aur context dena", "System prompts, skills, context engineering, Systems of Record"],
                ["Discernment", "Answer review karna", "Evals, monitoring, sampling, checker ko trust karna"],
                ["Diligence", "Data protect karna, result ka zimmedar hona", "Governance, permissions, audit, disclosure, human review"],
              ]}
            />
            <P>
              <Strong>&ldquo;Agent Factory AI fluency replace nahi karta. Wo
              usay industrialize karta hai.&rdquo;</Strong>
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>10-80-10 Rule Se Connection</SubHeading>
            <RecapTable
              head={["Stage", "4Ds Kaise Kaam Karti Hain"]}
              rows={[
                ["Pehle 10%: direction set karo", "Delegation aur Description sabse strong yahan hain, decide karo kya karne layak hai, goal clear karo"],
                ["Beech ke 80%: AI orchestrate karo", "Description aur Discernment continuously repeat hoti hain, jaise AI kaam banata hai aap usay steer karte hain"],
                ["Aakhri 10%: truth judge karo", "Kuch bhi ship hone se pehle Discernment critical ban jati hai"],
                ["Poore 100% mein: responsibly act karo", "Diligence koi final checkbox nahi, poori workflow ko gherti hai"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>8. Chaar Common Beginner Mistakes</SubHeading>
            <RecapTable
              head={["Mistake", "Missing Skill", "Fix"]}
              rows={[
                ["Problem define kiye bina prompt karna", "Delegation", "Pehle goal, audience, constraints aur human/AI split define karein"],
                ["Pehle answer ko hi final samajhna", "Description + Discernment loop", "Result inspect karein, specific feedback dein, iterate karein"],
                ["Professional sounding answer ko blindly trust karna", "Discernment", "Important facts, assumptions, calculations, sources verify karein"],
                ["Privacy/accountability sirf kuch ghalat hone ke baad sochna", "Diligence", "Deployment se pehle data, disclosure, approval, accountability rules decide karein"],
              ]}
            />
          </Reveal>

          <Reveal>
            <SubHeading>Roz Ka Checklist</SubHeading>
            <RecapTable
              head={["Stage", "Khud Se Poochein"]}
              rows={[
                ["Delegate", "Goal kya hai? AI kya kare? Mere paas kya rahe?"],
                ["Describe", "Output, context, method aur behavior mein se AI ko kya chahiye?"],
                ["Discern", "Mujhe kaise pata chalega answer correct, complete aur useful hai?"],
                ["Be diligent", "Data safe hai? AI ke role ko disclosure chahiye? Result kaun approve/own karta hai?"],
              ]}
            />
            <P>
              Har chhote task ke liye ise paperwork banane ki zaroorat nahi,
              maqsad ye hai ke ye chaar sawal automatic ban jayen.
            </P>
          </Reveal>

          <Reveal>
            <SubHeading>Practice Se Pehle Ek Chhota Recap</SubHeading>
            <P>
              AI fluency prompts ratta lagane ki ability nahi. Ye AI ke sath{" "}
              <Strong>effectively, efficiently, ethically aur safely</Strong>{" "}
              kaam karne ki ability hai. Teen modes: Automation (AI defined
              task karta hai), Augmentation (aap aur AI sath sochte hain),
              Agency (AI aapke set kiye goal ki taraf khud kaam karta hai,
              aksar un logon ke liye jo aap khud nahi hain).
            </P>
            <PullQuote>
              Decide karo AI kya kare. Kaam clearly describe karo. Jo wapis
              aaye usay check karo. Aage jo ho uska zimmedar bano.
            </PullQuote>
          </Reveal>

          <Reveal>
            <SubHeading>Ab Try Karo: 6 Prompts</SubHeading>
            <P>
              Sirf parhna kaafi nahi, ek AI assistant khol kar in exercises ko
              try karein. Sab ek hi baithak mein complete karne ki zaroorat
              nahi.
            </P>
            <CheckList
              items={[
                "4D Plan Banayein: koi real task chunein aur AI se poochein ke ek ek karke Delegation, Description, Discernment, Diligence par sawal pooche, aakhir mein ek chhoti table de",
                "Ek jaani-pehchani topic par Discernment use karein: dekhein kitni aasani se aap ghalat claims pakarte hain jab domain aapka apna ho",
                "Ek anjaan topic par non-expert hona feel karein: yehi feeling har us user ki hai jo aapka banaya agent use karega",
                "Ek Performance Description likhein: session shuru mein hi AI ko batayein weak assumptions challenge kare, uncertainty flag kare",
                "Recommendation accept karne se pehle uski justification inspect karein: assumptions, evidence, criteria, uncertainties maangein",
                "Ek chhota project poore 4D loop se guzarein: delegation se shuru, har AI-owned task se pehle description, har output ke baad evaluation, aakhir mein diligence check",
              ]}
            />
            <Callout label="Har Exercise Ke Baad">
              Khud se poochein: &ldquo;Kaunsi D mujhse sabse zyada effort
              maangti hai?&rdquo; Wahi competency hai jo aapko sabse zyada
              practice karni chahiye.
            </Callout>
          </Reveal>

          <Reveal>
            <SubHeading>Terms Jo Ye Chapter Add Karta Hai</SubHeading>
            <P>
              Exam ke liye ye poori glossary yaad rakhein, koi bhi term chhorna
              nahi:
            </P>
            <RecapTable
              head={["Term", "Matlab"]}
              rows={[
                ["AI fluency", "AI ke saath effectively, efficiently, ethically aur safely kaam karne ki ability"],
                ["The 4Ds", "Delegation, Description, Discernment, aur Diligence"],
                ["Automation", "AI specific instructions se ek defined task perform karta hai"],
                ["Augmentation", "Human aur AI thinking partners ki tarah sath kaam karte hain"],
                ["Agency", "AI kisi insaan ki taraf se ek goal ki taraf kaam karta hai aur khud kai steps chunta hai"],
                ["Delegation", "Decide karna kya kaam hona chahiye, AI kya kare, humans kya rakhein"],
                ["Problem awareness", "AI involve karne se pehle goal, kaam, risks aur success samajhna"],
                ["Platform awareness", "Samajhna kaunsa AI system ya tool is task ke liye fit hai"],
                ["Task delegation", "Kaam ke parts jaan-boojh kar humans ya AI ko assign karna"],
                ["Description", "AI ko wo information aur guidance dena jo achay kaam ke liye chahiye"],
                ["Product description", "Chahiye wala output define karna"],
                ["Process description", "AI ko kaam kaise approach karna hai ye define karna"],
                ["Performance description", "AI khud se kaise behave kare, un logon ke liye jo use karenge, ye define karna"],
                ["Discernment", "AI ke output, justification aur behavior ko evaluate karna"],
                ["Product discernment", "Khud result ko evaluate karna"],
                ["Process discernment", "Evaluate karna AI ke saath kaam karne ka tareeka faida de raha hai ya nahi"],
                ["Performance discernment", "AI ke independent, user-facing behavior se logon ke liye achay outcomes ban rahe hain ya nahi, ye evaluate karna"],
                ["Diligence", "AI kaise use hui aur uske output ka kya hua, iski zimmedari lena"],
                ["Creation diligence", "Creation se pehle aur dauran tools, data aur AI use responsibly chunna"],
                ["Transparency diligence", "Jab AI ka role affected logon ke liye matter kare to honest rehna"],
                ["Deployment diligence", "AI-assisted kaam use, publish, send ya execute hone se pehle verify aur vouch karna"],
                ["Context engineering", "AI system ko chahiye wala poora information environment design karna: instructions, documents, tools, memory, policies, examples"],
                ["Automation bias", "Automated output ko zaroorat se zyada aasani se trust kar lene ki human tendency"],
                ["Hallucination", "Ek confident ya plausible AI output jismein fabricated ya ghalat information ho"],
                ["Redaction", "AI ko data dene se pehle person ya organization identify karne wale details hatana, jabke task ke liye zaroori pattern rakhna"],
              ]}
            />
          </Reveal>

          <Reveal>
            <Callout label="Source &amp; License Note">
              AI Fluency Framework <Strong>Rick Dakan</Strong> (Ringling
              College) aur <Strong>Joseph Feller</Strong> (University College
              Cork) ne banaya, Anthropic ke saath produce hua, CC
              BY-NC-SA 4.0 ke under release hua. Ye Cybrum notes is framework
              ki ek independent Roman Urdu tashreeh hain, Agent Factory book
              (agentfactory.panaversity.org) ke crash course par based, uski
              copy nahi. Original padhne ke liye:{" "}
              <a
                href="https://aifluencyframework.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                aifluencyframework.org
              </a>{" "}
              aur Claude Academy ka free course{" "}
              <a
                href="https://academy.claude.com/courses/ai-fluency-framework-foundations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-bright underline-offset-4 hover:underline"
              >
                AI Fluency: Framework and Foundations
              </a>
              .
            </Callout>
          </Reveal>
        </section>

        {/* Self test */}
        <section id="self-test" className="scroll-mt-24 border-t border-border pt-12 mt-12">
          <Reveal>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
              <ListChecks size={14} />
              Self-Test
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Khud Se Poochein
            </h2>
            <P>
              Pehle khud jawab dein, phir sawal pe click kar ke answer check
              karein. Jaise jaise naye chapters add honge, waise waise yahan
              bhi sawal add hote rahenge.
            </P>
          </Reveal>
          <Reveal>
            <div className="mt-6 space-y-2.5">
              {[
                {
                  q: "AI fluency ki 4 qualities kya hain?",
                  a: "Effective, Efficient, Ethical, aur Safe. Ye ek durable skill set hai, prompt tricks ka collection nahi.",
                },
                {
                  q: "Automation, augmentation aur agency mein farq kya hai?",
                  a: "Automation ek defined task specific instructions se execute karta hai (aap script writer hain). Augmentation mein aap aur AI thinking partners ki tarah collaborate karte hain (aap co-creator hain). Agency mein AI ek goal ki taraf boundaries ke andar khud kai steps chunta hai, aksar aapke bina aur kabhi kabhi doosron ke liye (aap director hain).",
                },
                {
                  q: "Delegation ke teen parts kya hain?",
                  a: "Problem Awareness (goal aur success samajhna), Platform Awareness (sahi AI tool chunna), aur Task Delegation (kaam jaan-boojh kar divide karna).",
                },
                {
                  q: "Description ke teen parts kya hain?",
                  a: "Product description (kya chahiye), Process description (kaise ho), aur Performance description (AI kaise behave kare). Memory aid: What → How → Mere saath kaise kaam kare.",
                },
                {
                  q: "Confident AI answer ko bhi verification kyun chahiye?",
                  a: "Kyunke AI plausible output generate karta hai, aur plausible correct ke barabar nahi. Fluent wording facts, assumptions ya reasoning verify nahi karti; automation bias humein confident-looking answers ko zaroorat se zyada aasani se trust karwa deta hai.",
                },
                {
                  q: "Discernment ke teen parts kya hain?",
                  a: "Product discernment (result achha hai?), Process discernment (ye tareeka faida de raha hai?), aur Performance discernment (AI khud act karte waqt logon ko achay se serve kar raha hai?).",
                },
                {
                  q: "Diligence ke teen parts kya hain?",
                  a: "Creation diligence (tools/data responsibly chunna), Transparency diligence (AI ke role ke baare mein honest rehna), aur Deployment diligence (ship karne se pehle verify aur vouch karna).",
                },
                {
                  q: "AI-assisted kaam ship karne se pehle kaunsa sawal poochna chahiye?",
                  a: "\"Kya main confidently is par apna naam laga sakta hoon?\" Agar jawab na hai, kaam ready nahi hai.",
                },
                {
                  q: "Ek line mein, 4D loop kya hai?",
                  a: "Decide karo AI kya kare, kaam describe karo, jo wapis aaye usay evaluate karo, aur poore process ka zimmedar bano, zaroorat pade to repeat karo.",
                },
                {
                  q: "Agent Factory mein Discernment ek engineering practice kaise banti hai?",
                  a: "Ye eval suites, monitoring, sampling, review gates aur doosre tareeqon mein badal jati hai jo test karte hain ke ek AI system acceptably perform kar raha hai ya nahi. Manual sawal \"kya ye kaafi achha hai?\" system-scale infrastructure ban jata hai.",
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
          <p className="mt-4 font-heading text-sm font-semibold text-accent-bright">
            {site.tagline}
          </p>
        </div>
      </footer>
    </div>
  );
}
