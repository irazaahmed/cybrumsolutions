import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name}: AI Agents, Automation & Web Systems`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI automation",
    "AI agents",
    "AI chatbot development",
    "AI-native company",
    "business automation",
    "n8n automation",
    "Next.js development",
    "Cybrum Solutions",
  ],
  authors: [{ name: site.founder }],
  creator: site.founder,
  openGraph: {
    type: "website",
    title: `${site.name}: AI Agents, Automation & Web Systems`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: AI Agents, Automation & Web Systems`,
    description: site.description,
  },
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the saved theme before paint to avoid a flash. Supports
            light / dark / system; defaults to dark (brand) when unset. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('cybrum-theme')||'dark';var d=p==='dark'||(p==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
