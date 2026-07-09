import { Marked } from "marked";
import { prisma } from "@/lib/prisma";

/**
 * Lightweight projection of a Skill for list/grid/search views. Deliberately
 * omits the heavy `content` and `usageNotes` columns so the /skills index (and
 * the client-side Fuse.js dataset) stays small.
 */
export type SkillSummary = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  description: string;
  downloadCount: number;
};

const summarySelect = {
  id: true,
  title: true,
  slug: true,
  category: true,
  tags: true,
  description: true,
  downloadCount: true,
} as const;

/** All published skills, most-downloaded first, for the index grid + search. */
export function getPublishedSkills(): Promise<SkillSummary[]> {
  return prisma.skill.findMany({
    where: { published: true },
    orderBy: [{ downloadCount: "desc" }, { createdAt: "desc" }],
    select: summarySelect,
  });
}

/** Distinct categories across published skills, for the filter pills. Built
 *  from the data (never hardcoded) so new categories appear automatically. */
export async function getPublishedCategories(): Promise<string[]> {
  const rows = await prisma.skill.findMany({
    where: { published: true },
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });
  return rows.map((r) => r.category);
}

/** Every published slug, for generateStaticParams and the sitemap. */
export async function getPublishedSlugs(): Promise<string[]> {
  const rows = await prisma.skill.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

/** Full published skill by slug (detail page). Null if missing/unpublished. */
export function getSkillBySlug(slug: string) {
  return prisma.skill.findFirst({ where: { slug, published: true } });
}

/** Up to `take` other published skills in the same category (related rail). */
export function getRelatedSkills(
  slug: string,
  category: string,
  take = 4,
): Promise<SkillSummary[]> {
  return prisma.skill.findMany({
    where: { published: true, category, slug: { not: slug } },
    orderBy: { downloadCount: "desc" },
    take,
    select: summarySelect,
  });
}

/** Slug + content only, for the download endpoint. Null if missing/unpublished. */
export function getSkillContent(slug: string) {
  return prisma.skill.findFirst({
    where: { slug, published: true },
    select: { slug: true, content: true },
  });
}

/** Best-effort +1 on downloadCount. Never throws so it can't block a download. */
export async function incrementDownloadCount(slug: string): Promise<void> {
  await prisma.skill.updateMany({
    where: { slug, published: true },
    data: { downloadCount: { increment: 1 } },
  });
}

/**
 * Render a skill's Markdown (usageNotes / content) to HTML. Uses a fresh Marked
 * instance so output can be dropped into a `.prose-blog` container and inherit
 * the same typography and code-block styling as the blog (globals.css).
 */
export function renderSkillMarkdown(markdown: string): string {
  return new Marked().parse(markdown) as string;
}
