import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/** Folder holding one Markdown file per blog post (with frontmatter). */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogMeta = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) from frontmatter. */
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
};

export type BlogPost = BlogMeta & {
  /** Rendered HTML of the Markdown body. */
  html: string;
};

/** Roughly 200 words per minute; English-only content. */
function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/** All Markdown slugs in the blog directory. */
function listSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function toMeta(
  slug: string,
  data: matter.GrayMatterFile<string>["data"],
  content: string,
): BlogMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: estimateReadingTime(content),
  };
}

/** All posts, newest first. Used for the homepage and the blog index. */
export function getAllPosts(): BlogMeta[] {
  return listSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data, content } = matter(raw);
      return toMeta(slug, data, content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All slugs. Used for static generation. */
export function getAllSlugs(): string[] {
  return listSlugs();
}

/** A single post with rendered HTML, or null if it does not exist. */
export function getPostBySlug(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;
  return { ...toMeta(slug, data, content), html };
}
