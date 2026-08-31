import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, RefreshCw, CheckCircle2 } from "lucide-react";
import { site, contact } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/* ------------------------------------------------------------------ */
/*  Shared chrome: header + footer, reused by the index page and every */
/*  chapter page so the whole /anthropic-exam-prep section feels like  */
/*  one product, not a pile of one-off pages.                          */
/* ------------------------------------------------------------------ */

export function NotesHeader({
  backHref = site.url,
  backLabel = "Main Site",
}: {
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/anthropic-exam-prep" className="flex items-center gap-2.5" aria-label={site.name}>
          <Logo priority className="h-9 w-9" />
          <span className="font-heading text-lg font-semibold tracking-tight">
            {site.shortName}
            <span className="text-accent"> Solutions</span>
          </span>
        </Link>
        <div className="flex items-center gap-2.5">
          <span className="hidden rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-bright sm:inline-block">
            Exam Notes
          </span>
          <a
            href={backHref}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{backLabel}</span>
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export function NotesFooter() {
  return (
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
  );
}

/* ------------------------------------------------------------------ */
/*  Content primitives: same visual language as /exam.                 */
/* ------------------------------------------------------------------ */

export function ChapterHeader({
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

export function CoreIdea({ children }: { children: ReactNode }) {
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

export function Callout({
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

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 mt-10 text-lg font-semibold tracking-tight sm:text-xl">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 leading-relaxed text-muted">{children}</p>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

export function RecapTable({ head, rows }: { head: string[]; rows: string[][] }) {
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

export function Flow({ steps, loop = false }: { steps: string[]; loop?: boolean }) {
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

export function Ladder({ steps }: { steps: { title: string; note: string }[] }) {
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

export function CheckList({ items }: { items: string[] }) {
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
export function PartBanner({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 mt-16 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
      <span className="h-px w-5 bg-accent/50" />
      {children}
    </p>
  );
}

/** Monospace box for example prompts, mirroring the book's code blocks. */
export function PromptBox({ children }: { children: ReactNode }) {
  return (
    <pre className="my-4 whitespace-pre-wrap rounded-xl border border-border bg-black/25 p-4 font-mono text-xs leading-relaxed text-foreground/90 sm:text-[0.83rem]">
      {children}
    </pre>
  );
}

/** A short, punchy quote pulled out of the flow, for the "one sentence to
 *  remember" style lines the book likes to close sections with. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <p className="my-6 rounded-2xl border-l-4 border-accent bg-card/50 px-5 py-4 text-base font-medium italic leading-relaxed text-foreground/90 sm:text-lg">
      &ldquo;{children}&rdquo;
    </p>
  );
}
