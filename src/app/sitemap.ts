import type { MetadataRoute } from "next";
import { site, ACADEMY_LIVE } from "@/lib/site";
import { getAllPosts, getAvailableLangs } from "@/lib/blog";
import { servicePages } from "@/lib/services";
import { locationPages } from "@/lib/locations";
import { getPublishedSlugsWithDates } from "@/lib/skills";
import { prisma } from "@/lib/prisma";

const baseUrl = site.url;

// `changeFrequency`/`priority` are declared but ignored by Google and Bing
// (both have said so directly), so they're deliberately left off every
// entry below — not an oversight.
//
// Real last-edit dates for the static (non-DB, non-blog) routes, sourced
// from `git log -1 --format=%aI -- <page file + its content/data source>`
// at the time of this fix (2026-08-28) — not build/request time, which told
// crawlers nothing and could make every unrelated page look equally "just
// changed" on every deploy. Bump the relevant entry by hand the next time a
// page's actual content changes.
const PAGE_LAST_MODIFIED: Record<string, string> = {
  home: "2026-08-12T10:22:45+05:00",
  services: "2026-07-04T21:57:46+05:00",
  serviceDetail: "2026-07-12T23:09:41+05:00",
  about: "2026-08-10T11:43:37+05:00",
  contact: "2026-07-12T23:09:41+05:00",
  work: "2026-07-12T23:09:41+05:00",
  chatbotProduct: "2026-08-08T13:44:26+05:00",
  location: "2026-07-08T17:33:55+05:00",
  exam: "2026-07-05T11:23:37+05:00",
  anthropicExamPrep: "2026-08-31T00:00:00+05:00",
  skillsIndex: "2026-07-12T23:26:12+05:00",
};

/** Per-language URL for a post. English is the canonical bare URL; the
 *  translations live on their own paths (/blogs/slug/ur). */
function urlFor(slug: string, lang: string): string {
  return lang === "en"
    ? `${baseUrl}/blogs/${slug}`
    : `${baseUrl}/blogs/${slug}/${lang}`;
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
  let skillRows: { slug: string; updatedAt: Date }[] = [];
  try {
    skillRows = await getPublishedSlugsWithDates();
  } catch {
    skillRows = [];
  }
  const skillEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/skills`, lastModified: PAGE_LAST_MODIFIED.skillsIndex },
    ...skillRows.map((s) => ({
      url: `${baseUrl}/skills/${s.slug}`,
      lastModified: s.updatedAt,
    })),
  ];

  const postEntries: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const lastModified = post.date ? new Date(post.date) : new Date();
    // Every language variant is its own self-canonical page (see
    // buildPostMetadata in PostArticle.tsx), so all of them belong here,
    // including 'ro' — Roman Urdu is the product's actual SEO wedge.
    return getAvailableLangs(post.slug).map((lang) => ({
      url: urlFor(post.slug, lang),
      lastModified,
    }));
  });

  const serviceEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/services`, lastModified: PAGE_LAST_MODIFIED.services },
    ...servicePages.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: PAGE_LAST_MODIFIED.serviceDetail,
    })),
  ];

  // CS Academy is paused (ACADEMY_LIVE in src/lib/site.ts) — every /academy
  // URL redirects to the homepage, so none belong in the sitemap right now.
  let academyEntries: MetadataRoute.Sitemap = [];
  if (ACADEMY_LIVE) {
    // Courses come from the database, same fallback pattern as skills above
    // so the sitemap never fails to generate at build time. Course has no
    // updatedAt column (see prisma/schema.prisma), so createdAt is the best
    // real signal available — still a genuine content date, not build time.
    let courses: { slug: string; createdAt: Date }[] = [];
    try {
      courses = await prisma.course.findMany({
        where: { published: true },
        select: { slug: true, createdAt: true },
      });
    } catch {
      courses = [];
    }
    academyEntries = [
      { url: `${baseUrl}/academy`, lastModified: new Date() },
      ...courses.map((c) => ({
        url: `${baseUrl}/academy/courses/${c.slug}`,
        lastModified: c.createdAt,
      })),
    ];
  }

  const locationEntries: MetadataRoute.Sitemap = locationPages.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: PAGE_LAST_MODIFIED.location,
  }));

  return [
    { url: baseUrl, lastModified: PAGE_LAST_MODIFIED.home },
    ...serviceEntries,
    { url: `${baseUrl}/products/chatbot`, lastModified: PAGE_LAST_MODIFIED.chatbotProduct },
    ...academyEntries,
    ...locationEntries,
    { url: `${baseUrl}/about`, lastModified: PAGE_LAST_MODIFIED.about },
    { url: `${baseUrl}/contact`, lastModified: PAGE_LAST_MODIFIED.contact },
    { url: `${baseUrl}/work`, lastModified: PAGE_LAST_MODIFIED.work },
    { url: `${baseUrl}/blogs`, lastModified: latest },
    ...skillEntries,
    {
      // GIAIC Quarter 5 exam study notes (also served at the exam subdomain).
      url: `${baseUrl}/exam`,
      lastModified: PAGE_LAST_MODIFIED.exam,
    },
    {
      // Anthropic exam prep: Agent Factory book Roman Urdu study notes.
      url: `${baseUrl}/anthropic-exam-prep`,
      lastModified: PAGE_LAST_MODIFIED.anthropicExamPrep,
    },
    {
      url: `${baseUrl}/anthropic-exam-prep/ai-fluency-4ds`,
      lastModified: PAGE_LAST_MODIFIED.anthropicExamPrep,
    },
    ...postEntries,
  ];
}
