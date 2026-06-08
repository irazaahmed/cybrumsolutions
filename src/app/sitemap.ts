import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const baseUrl = `https://${site.domain}`;

/**
 * Single-page site: the homepage is the one canonical URL. In-page sections
 * (#services, #about, etc.) are part of the same document, so only the root
 * URL is listed. Served at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
