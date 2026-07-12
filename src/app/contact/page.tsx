import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { Proof } from "@/components/sections/Proof";
import { Faq } from "@/components/sections/Faq";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const baseUrl = site.url;
const title = "Contact: Book a Free AI Audit";
const description =
  "Book a free AI audit with Cybrum Solutions. Tell us the workflow you want automated and get an honest answer on what is worth building, with rough cost and timeline. WhatsApp and LinkedIn available.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${baseUrl}/contact`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        url: `${baseUrl}/contact`,
        name: title,
        description,
        about: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${baseUrl}/contact` },
        ],
      },
    ],
  };

  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-lines opacity-40" />
        <div className="glow-orb animate-float-slow absolute right-[-10%] top-1/4 h-[32rem] w-[32rem] [--glow:color-mix(in_srgb,var(--color-accent)_13%,transparent)]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-14">
        {/* Gated audit form + direct channels (WhatsApp, call, socials) */}
        <Contact />

        {/* Working-model guarantees near the form */}
        <Proof />

        {/* FAQ with FAQPage structured data */}
        <Faq />
      </main>

      <Footer />
      <ScrollToTop />

      <JsonLd data={jsonLd} />
    </>
  );
}
