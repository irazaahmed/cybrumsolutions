import type { Metadata } from "next";
import { getLocationPage } from "@/lib/locations";
import { site } from "@/lib/site";
import { LocalLanding } from "@/components/sections/LocalLanding";

const page = getLocationPage("ai-agency-pakistan")!;
const url = `${site.url}/${page.slug}`;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `/${page.slug}` },
  openGraph: {
    title: `${page.metaTitle}`,
    description: page.metaDescription,
    url,
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: page.metaTitle,
    description: page.metaDescription,
    images: ["/og.png"],
  },
};

export default function AiAgencyPakistanPage() {
  return <LocalLanding page={page} />;
}
