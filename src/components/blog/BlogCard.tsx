import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogMeta } from "@/lib/blog";
import { TimeAgo } from "@/components/blog/TimeAgo";

/** Formats an ISO date as e.g. "June 9, 2026"; falls back to the raw string. */
function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Clickable blog preview card. Opens the full post at /blog/[slug]. */
export function BlogCard({ post }: { post: BlogMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_36px_-12px_var(--color-accent)] sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
        <span aria-hidden>·</span>
        <TimeAgo iso={post.date} />
      </div>

      <h3 className="mt-3 font-heading text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent-bright">
        {post.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

      {post.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs font-medium text-accent-bright"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent-bright">
        Read article
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
