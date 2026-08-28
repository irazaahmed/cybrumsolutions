import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { site, contact } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/visuals/Preloader";
import "./globals.css";

const baseUrl = site.url;

// Buyer-intent homepage title: leads with the service term clients actually
// search ("AI Automation Agency") while keeping the brand. Kept under ~60 chars.
const homeTitle = `${site.name}: AI Automation Agency & AI Agents`;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Nastaliq script for Urdu blog articles and PDFs only (see .prose-urdu /
// .urdu-heading in globals.css and SkillsIntro). preload: false so this
// ~235KB font isn't force-downloaded on every page — the browser only
// fetches it on the routes that actually render Urdu text.
const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

// "resizes-content" shrinks the layout viewport when the mobile keyboard opens,
// so fixed-position UI (chat widget) stays visible above the keyboard.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: homeTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Cybrum Solutions",
    "Cybrum",
    "Ahmed Raza",
    "Ahmed Raza Cybrum Solutions",
    "AI Solutions Expert",
    "AI automation",
    "AI agents",
    "AI agent development",
    "AI chatbot development",
    "custom AI assistants",
    "AI-native company",
    "business automation",
    "n8n automation",
    "LangGraph",
    "CrewAI",
    "Next.js development",
    "AI company Pakistan",
    "AI automation Karachi",
    "AI agents Pakistan",
    "custom chatbot development Pakistan",
    "AI solutions company Karachi",
    "automation agency Pakistan",
    "WhatsApp chatbot development Pakistan",
    "multi-agent AI systems",
    "RAG chatbot development",
    "AI skills library",
    "Claude Code skills",
    "n8n vs Zapier",
  ],
  authors: [{ name: site.founder, url: contact.portfolio }],
  creator: site.founder,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: homeTitle,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name}: AI agents, automation, chatbots and web systems`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.description,
    images: ["/og.png"],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "cybrum-verify": "4767a9434d5290a310e738b5e8b8340b",
  },
};

/** Structured data so search engines understand the brand, site, and founder. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: site.name,
      alternateName: "Cybrum",
      url: baseUrl,
      logo: `${baseUrl}/logo-dark-theme.png`,
      image: `${baseUrl}/og.png`,
      description: site.description,
      email: contact.email,
      foundingDate: "2025-12",
      slogan: site.tagline,
      founder: { "@id": `${baseUrl}/#ahmed-raza` },
      sameAs: [contact.linkedinCompany, contact.facebook, contact.instagram, contact.tiktok],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        "@id": `${baseUrl}/#ai-services-catalog`,
        name: "AI Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Automation & AI Agents",
              url: `${baseUrl}/services/ai-automation`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Chatbots & Assistants",
              url: `${baseUrl}/services/ai-chatbots`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Development",
              url: `${baseUrl}/services/web-development`,
            },
          },
        ],
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phoneRaw,
        contactType: "sales",
        areaServed: ["PK", "Worldwide"],
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      // ProfessionalService is a LocalBusiness subtype: gives search engines a
      // business entity with contact, area served, and services for local /
      // "near me" and map-style results. Country-level (Pakistan) + Worldwide,
      // matching the brand's local + international positioning.
      "@type": "ProfessionalService",
      "@id": `${baseUrl}/#localbusiness`,
      name: site.name,
      alternateName: "Cybrum",
      url: baseUrl,
      logo: `${baseUrl}/logo-dark-theme.png`,
      image: `${baseUrl}/og.png`,
      description: site.description,
      email: contact.email,
      telephone: contact.phoneRaw,
      priceRange: "$$",
      slogan: site.tagline,
      founder: { "@id": `${baseUrl}/#ahmed-raza` },
      parentOrganization: { "@id": `${baseUrl}/#organization` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressRegion: "Sindh",
        addressCountry: "PK",
      },
      // No `geo` here deliberately: the previous coordinates (24.8607,
      // 67.0011) were Karachi's generic city-centroid, not a real
      // business-specific location — that reads as placeholder data to
      // anyone who checks, and provides no local-ranking benefit over
      // omitting it. Add back real coordinates only if a genuine (even
      // block-approximate) location for in-person client meetings exists.
      // `areaServed` intentionally excludes "Worldwide": this is the
      // *local* entity (Organization carries the global/remote scope via
      // its own contactPoint below), so keeping it Pakistan-only sharpens
      // the local-business signal instead of contradicting it.
      areaServed: [
        { "@type": "City", name: "Karachi" },
        { "@type": "City", name: "Lahore" },
        { "@type": "City", name: "Islamabad" },
        { "@type": "Country", name: "Pakistan" },
      ],
      knowsLanguage: ["English", "Urdu"],
      sameAs: [
        contact.linkedinCompany,
        contact.facebook,
        contact.instagram,
        contact.tiktok,
      ],
      hasOfferCatalog: { "@id": `${baseUrl}/#ai-services-catalog` },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phoneRaw,
        contactType: "sales",
        areaServed: ["PK", "Worldwide"],
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${baseUrl}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/#ahmed-raza`,
      name: site.founder,
      jobTitle: "Founder & CEO, AI Solutions Expert",
      description:
        "AI Solutions Expert and founder of Cybrum Solutions, building intelligent automation, AI agents, and AI-native systems.",
      worksFor: { "@id": `${baseUrl}/#organization` },
      url: contact.portfolio,
      sameAs: [contact.linkedinFounder, contact.github, contact.portfolio],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${nastaliq.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the saved theme before paint to avoid a flash. Supports
            light / dark / system; defaults to dark (brand) when unset.
            Also marks repeat visits in the same tab so the brand splash
            (Preloader) only plays once per session and never delays LCP on
            in-session navigations. Also corrects <html lang>/dir for the
            /ur and /ro blog locale variants before paint: the root layout
            is shared across every route (Next.js only allows one <html> per
            app), so this can't be set server-side per page without forcing
            the whole site into dynamic rendering just for two blog routes.
            "ur" -> native Urdu script (rtl); "ro" (Roman Urdu) -> Urdu
            content in Latin script, so lang="ur-Latn" per BCP 47, dir="ltr". */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('cybrum-theme')||'dark';var d=p==='dark'||(p==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','dark');}try{if(sessionStorage.getItem('cybrum-splash'))document.documentElement.setAttribute('data-splash','seen');}catch(e){}try{var seg=location.pathname.split('/').filter(Boolean).pop();if(seg==='ur'){document.documentElement.lang='ur';document.documentElement.dir='rtl';}else if(seg==='ro'){document.documentElement.lang='ur-Latn';document.documentElement.dir='ltr';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={jsonLd} />
        <Preloader />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
