import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts, getAvailableLangs } from "@/lib/blog";
import { servicePages } from "@/lib/services";

const baseUrl = `https://${site.domain}`;

/** Per-language URL for a post. English is the canonical bare URL; the
 *  translations carry a `?lang=` query param. */
function urlFor(slug: string, lang: string): string {
  return lang === "en"
    ? `${baseUrl}/blog/${slug}`
    : `${baseUrl}/blog/${slug}?lang=${lang}`;
}

/**
 * Single-page marketing site plus a blog. The homepage is the primary URL;
 * the blog index and every article (in every available language) get their
 * own entries so search engines can discover and rank each one. Served at
 * /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const postEntries: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const lastModified = post.date ? new Date(post.date) : new Date();
    // Roman Urdu variants canonicalize to English, so they stay out of the
    // sitemap; only canonical language versions (en, ur) are listed.
    return getAvailableLangs(post.slug)
      .filter((lang) => lang !== "ro")
      .map((lang) => ({
        url: urlFor(post.slug, lang),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: lang === "en" ? 0.7 : 0.6,
      }));
  });

  const serviceEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...servicePages.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceEntries,
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
  ];
}
