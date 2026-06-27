import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

/** Folder holding one Markdown file per blog post (with frontmatter). */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Supported blog languages. English is the default and lives in `<slug>.md`;
 *  translations live in `<slug>.ur.md` (Urdu) and `<slug>.ro.md` (Roman Urdu). */
export type Lang = "en" | "ur" | "ro";

export const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  ro: "Roman Urdu",
  ur: "اردو",
};

export function parseLang(v: unknown): Lang {
  return v === "ur" || v === "ro" ? v : "en";
}

export type BlogMeta = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) from frontmatter. */
  date: string;
  /** Optional ISO date the post was last revised; falls back to `date`. */
  updated: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  lang: Lang;
};

/** One entry in a post's table of contents (h2 / h3 headings). */
export type TocItem = { id: string; text: string; level: 2 | 3 };

export type BlogPost = BlogMeta & {
  /** Rendered HTML of the Markdown body (headings carry `id` anchors). */
  html: string;
  /** Ordered h2/h3 headings for the on-page table of contents. */
  toc: TocItem[];
};

/** URL-safe anchor slug. Keeps Unicode letters so Urdu headings get real ids. */
function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

/**
 * Render Markdown to HTML while (a) stamping each h2/h3 with a unique `id`
 * anchor and (b) collecting those headings into a table of contents. A fresh
 * Marked instance per call keeps the per-post `toc`/slug state isolated.
 */
function renderMarkdown(content: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();

  const uniqueSlug = (text: string): string => {
    const base = slugify(text);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  };

  const m = new Marked({
    renderer: {
      heading({ tokens, depth, text }) {
        const inner = this.parser.parseInline(tokens);
        if (depth !== 2 && depth !== 3) {
          return `<h${depth}>${inner}</h${depth}>`;
        }
        const id = uniqueSlug(text);
        toc.push({ id, text, level: depth });
        return `<h${depth} id="${id}">${inner}</h${depth}>`;
      },
    },
  });

  const html = m.parse(content) as string;
  return { html, toc };
}

function estimateReadingTime(text: string, lang: Lang): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = lang === "ur" ? 140 : 200; // Nastaliq reads a little slower
  const minutes = Math.max(1, Math.round(words / wpm));
  const suffix =
    lang === "ur" ? "منٹ پڑھائی" : lang === "ro" ? "min parhai" : "min read";
  return `${minutes} ${suffix}`;
}

/** Resolve the on-disk filename for a (slug, lang) pair. */
function fileFor(slug: string, lang: Lang): string {
  return lang === "en" ? `${slug}.md` : `${slug}.${lang}.md`;
}

/** Unique base (English) slugs across all language files. */
function listBaseSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const set = new Set<string>();
  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!file.endsWith(".md")) continue;
    set.add(file.replace(/\.(ur|ro)\.md$/, "").replace(/\.md$/, ""));
  }
  return Array.from(set);
}

function toMeta(
  slug: string,
  lang: Lang,
  data: matter.GrayMatterFile<string>["data"],
  content: string,
): BlogMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    updated: String(data.updated ?? data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: estimateReadingTime(content, lang),
    lang,
  };
}

/** All English posts, newest first. Used for the homepage and blog index. */
export function getAllPosts(): BlogMeta[] {
  return listBaseSlugs()
    .map((slug) => {
      const file = path.join(BLOG_DIR, fileFor(slug, "en"));
      if (!fs.existsSync(file)) return null;
      const { data, content } = matter(fs.readFileSync(file, "utf8"));
      return toMeta(slug, "en", data, content);
    })
    .filter((p): p is BlogMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All base slugs. Used for static generation. */
export function getAllSlugs(): string[] {
  return listBaseSlugs();
}

/** Languages available for a slug (always includes "en" if the base exists). */
export function getAvailableLangs(slug: string): Lang[] {
  const out: Lang[] = [];
  for (const l of ["en", "ro", "ur"] as const) {
    if (fs.existsSync(path.join(BLOG_DIR, fileFor(slug, l)))) out.push(l);
  }
  return out;
}

/** A single post with rendered HTML. Falls back to English when the requested
 *  language file is missing. Returns null if no version exists. */
export function getPostBySlug(slug: string, lang: Lang = "en"): BlogPost | null {
  const file = path.join(BLOG_DIR, fileFor(slug, lang));
  const fallback = path.join(BLOG_DIR, fileFor(slug, "en"));
  const target = fs.existsSync(file)
    ? file
    : fs.existsSync(fallback)
      ? fallback
      : null;
  if (!target) return null;
  const actualLang: Lang = target === file ? lang : "en";
  const { data, content } = matter(fs.readFileSync(target, "utf8"));
  const { html, toc } = renderMarkdown(content);
  return { ...toMeta(slug, actualLang, data, content), html, toc };
}
