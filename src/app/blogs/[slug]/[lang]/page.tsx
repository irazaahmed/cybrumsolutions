import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getAvailableLangs, type Lang } from "@/lib/blog";
import { PostArticle, buildPostMetadata } from "@/components/blog/PostArticle";

type Props = {
  params: Promise<{ slug: string; lang: string }>;
};

/** Translated posts on crawlable paths (/blogs/slug/ur, /blogs/slug/ro), one
 *  static page per available translation. English stays at /blogs/slug. */
export function generateStaticParams() {
  return getAllSlugs().flatMap((slug) =>
    getAvailableLangs(slug)
      .filter((lang) => lang !== "en")
      .map((lang) => ({ slug, lang })),
  );
}

/** Anything outside the generated (slug, lang) pairs is a 404, not a render. */
export const dynamicParams = false;

function parseRouteLang(value: string): Lang | null {
  return value === "ur" || value === "ro" ? value : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const parsed = parseRouteLang(lang);
  if (!parsed) return { title: "Post not found" };
  return buildPostMetadata(slug, parsed);
}

export default async function TranslatedBlogPostPage({ params }: Props) {
  const { slug, lang } = await params;
  const parsed = parseRouteLang(lang);
  if (!parsed) notFound();
  return <PostArticle slug={slug} lang={parsed} />;
}
