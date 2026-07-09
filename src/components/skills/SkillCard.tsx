import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import type { SkillSummary } from "@/lib/skills";

/** Presentational skill card. Used on the /skills grid and the related rail. */
export function SkillCard({ skill }: { skill: SkillSummary }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_36px_-12px_var(--color-accent)] sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs font-medium text-accent-bright">
          {skill.category}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <Download size={13} />
          {skill.downloadCount.toLocaleString()}
        </span>
      </div>

      <h3 className="mt-4 font-heading text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent-bright">
        {skill.title}
      </h3>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {skill.description}
      </p>

      {skill.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {skill.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-surface/60 px-2.5 py-0.5 text-xs text-muted"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent-bright">
        View skill
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
