import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts, getAvailableLangs } from "@/lib/blog";
import { servicePages } from "@/lib/services";
import { locationPages } from "@/lib/locations";
import { getPublishedSlugs } from "@/lib/skills";

const baseUrl = site.url;

/** Per-language URL for a post. English is the canonical bare URL; the
 *  translations live on their own paths (/blog/slug/ur). */
function urlFor(slug: string, lang: string): string {
  return lang === "en"
    ? `${baseUrl}/blog/${slug}`
    : `${baseUrl}/blog/${slug}/${lang}`;
}

/**
 * Multi-page marketing site plus a blog. The homepage is the primary URL;
 * services, about, contact, work, skills, and every blog article (in every
 * available language) get their own entries so search engines can discover
 * and rank each one. Served at /sitemap.xml.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();
  const latest = posts[0]?.date ? new Date(posts[0].date) : new Date();

  // Skills come from the database. If it is unreachable at build time, fall
  // back to just the index so the sitemap never fails to generate.
  let skillSlugs: string[] = [];
  try {
    skillSlugs = await getPublishedSlugs();
  } catch {
    skillSlugs = [];
  }
  const skillEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...skillSlugs.map((slug) => ({
      url: `${baseUrl}/skills/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

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

  const locationEntries: MetadataRoute.Sitemap = locationPages.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceEntries,
    ...locationEntries,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
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
    ...skillEntries,
    {
      // GIAIC Quarter 5 exam study notes (also served at the exam subdomain).
      url: `${baseUrl}/exam`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...postEntries,
  ];
}
