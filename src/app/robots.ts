import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const baseUrl = `https://${site.domain}`;

/**
 * Tells search engines they may crawl everything and where the sitemap lives.
 * Served at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
