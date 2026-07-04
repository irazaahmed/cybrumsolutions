import type { Metadata } from "next";
import { getAllSlugs } from "@/lib/blog";
import { PostArticle, buildPostMetadata } from "@/components/blog/PostArticle";

type Props = {
  params: Promise<{ slug: string }>;
};

/** English posts, fully static. Translations live at /blog/[slug]/[lang];
 *  old `?lang=` links are redirected there in next.config.ts. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildPostMetadata(slug, "en");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <PostArticle slug={slug} lang="en" />;
}
