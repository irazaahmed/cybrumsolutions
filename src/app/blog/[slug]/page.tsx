import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import {
  getAllSlugs,
  getAvailableLangs,
  getPostBySlug,
  parseLang,
  type Lang,
} from "@/lib/blog";
import { site, contact } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { BlogNav } from "@/components/blog/BlogNav";
import { LanguageSwitcher } from "@/components/blog/LanguageSwitcher";
import { DownloadPdfButton } from "@/components/blog/DownloadPdfButton";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = `https://${site.domain}`;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

/** Pre-render every English post at build time. Translated variants render on
 *  demand via the `?lang=` query parameter. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** Localized UI strings (the article body itself comes from the .md files). */
const T: Record<
  Lang,
  {
    back: string;
    backBottom: string;
    download: string;
    article: string;
    aboutAuthor: string;
    role: string;
    bio: string;
    links: { portfolio: string; whatsapp: string; linkedin: string };
  }
> = {
  en: {
    back: "All insights",
    backBottom: "Back to all insights",
    download: "Download PDF",
    article: "Article",
    aboutAuthor: "About the author",
    role: "Founder & CEO, Cybrum Solutions",
    bio: "AI Solutions Expert and founder of Cybrum Solutions. Ahmed Raza orchestrates an agentic AI workforce to build intelligent automation, AI agents, chatbots, and web systems end to end, with one accountable builder.",
    links: { portfolio: "Portfolio", whatsapp: "WhatsApp", linkedin: "LinkedIn" },
  },
  ro: {
    back: "Sari tehreerain",
    backBottom: "Wapis sari tehreerain",
    download: "PDF Download Karein",
    article: "Article",
    aboutAuthor: "Musannif ke baare mein",
    role: "Founder & CEO, Cybrum Solutions",
    bio: "AI Solutions Expert aur Cybrum Solutions ke founder. Ahmed Raza aik agentic AI team ko orchestrate karte hain taake intelligent automation, AI agents, chatbots aur web systems shuru se aakhir tak, aik accountable builder ke saath banaye jaa sakein.",
    links: { portfolio: "Portfolio", whatsapp: "WhatsApp", linkedin: "LinkedIn" },
  },
  ur: {
    back: "تمام تحریریں",
    backBottom: "تمام تحریروں پر واپس",
    download: "پی ڈی ایف ڈاؤن لوڈ کریں",
    article: "مضمون",
    aboutAuthor: "مصنف کے بارے میں",
    role: "بانی و سی ای او، سائبرم سلوشنز",
    bio: "اے آئی سلوشنز ایکسپرٹ اور سائبرم سلوشنز کے بانی۔ احمد رضا ایک ایجنٹک اے آئی ٹیم کو منظم کرتے ہیں تاکہ ذہین آٹومیشن، اے آئی ایجنٹس، چیٹ بوٹس اور ویب سسٹمز کو شروع سے آخر تک ایک ذمہ دار بلڈر کے ساتھ تیار کیا جا سکے۔",
    links: { portfolio: "پورٹ فولیو", whatsapp: "واٹس ایپ", linkedin: "لنکڈاِن" },
  },
};

function formatDate(iso: string, lang: Lang): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const locale = lang === "ur" ? "ur-PK" : "en-US";
  return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

function pathFor(slug: string, lang: Lang): string {
  return lang === "en" ? `/blog/${slug}` : `/blog/${slug}?lang=${lang}`;
}

function ogLocale(lang: Lang): string {
  return lang === "ur" ? "ur_PK" : "en_US";
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = parseLang((await searchParams).lang);
  const post = getPostBySlug(slug, lang);
  if (!post) return { title: "Post not found" };

  // hreflang alternates so Google serves the right language version.
  const languages: Record<string, string> = {};
  for (const l of getAvailableLangs(slug)) {
    const tag = l === "ur" ? "ur" : l === "ro" ? "en-x-roman-ur" : "en";
    languages[tag] = `${baseUrl}${pathFor(slug, l)}`;
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: pathFor(slug, post.lang), languages },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}${pathFor(slug, post.lang)}`,
      type: "article",
      publishedTime: post.date,
      authors: [site.founder],
      locale: ogLocale(post.lang),
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og.png"],
    },
  };
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const lang = parseLang((await searchParams).lang);
  const post = getPostBySlug(slug, lang);
  if (!post) notFound();

  const available = getAvailableLangs(slug);
  const isUrdu = post.lang === "ur";
  const t = T[post.lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    inLanguage: post.lang === "ur" ? "ur" : "en",
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    image: `${baseUrl}/og.png`,
    author: { "@type": "Person", name: site.founder, url: contact.portfolio },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}${pathFor(slug, post.lang)}` },
  };

  return (
    <>
      <div aria-hidden className="no-print fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-lines opacity-30" />
        <div className="animate-float-slow absolute left-[-10%] top-1/4 h-[30rem] w-[30rem] rounded-full bg-accent/8 blur-[140px]" />
      </div>

      <div className="no-print">
        <BlogNav />
      </div>

      <main id="pdf-main" className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <Link
          href="/blog"
          className="no-print inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          {t.back}
        </Link>

        <div className="no-print mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <LanguageSwitcher slug={slug} current={post.lang} available={available} />
          </div>
          <DownloadPdfButton label={t.download} isUrdu={isUrdu} />
        </div>

        <div id="pdf-root" className="mt-6">
          {/* Cover page: shown only in the printed PDF (hidden on screen). */}
          <div className="pdf-cover print-only" aria-hidden>
            <div className="pdf-cover-logo">
              <Logo size={56} priority />
            </div>
            <div className="pdf-cover-watermark">Cybrum Solutions</div>
            <div className="pdf-cover-top">
              <div className="pdf-cover-brand">CYBRUM SOLUTIONS</div>
              <div className="pdf-cover-role">AI-Native Company</div>
            </div>
            <div className="pdf-cover-main">
              <div className="pdf-cover-kicker">{t.article}</div>
              <div className="pdf-cover-rule" />
              <div className={`pdf-cover-title ${isUrdu ? "urdu-heading" : ""}`}>
                {post.title}
              </div>
              <div className="pdf-cover-rule" />
              <div className="pdf-cover-meta">
                {formatDate(post.date, post.lang)} &middot; {post.readingTime}
              </div>
              {post.tags.length > 0 && (
                <div className="pdf-cover-tags">{post.tags.join("    •    ")}</div>
              )}
            </div>
            <div className="pdf-cover-foot">www.cybrumsolutions.dev</div>
          </div>

          {/* Content pages. The table's thead/tfoot reprint on every PDF page
              as the running header/footer (both are hidden on screen). */}
          <table className="pdf-doc">
            <thead>
              <tr>
                <td>
                  <div className="pdf-rhead">
                    <span className="pdf-rhead-l">Cybrum Solutions</span>
                    <span className="pdf-rhead-r">AI-Native Company</span>
                  </div>
                </td>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td>
                  <div className="pdf-rfoot">
                    <span className="pdf-rfoot-l">www.cybrumsolutions.dev</span>
                    <span className="pdf-rfoot-r">One element. Every solution.</span>
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td>
                  <article dir={isUrdu ? "rtl" : "ltr"} lang={post.lang === "ur" ? "ur" : "en"}>
                    <header className="mb-10 border-b border-border pb-8">
                      <div
                        className={`flex flex-wrap items-center gap-2 text-xs text-muted ${
                          isUrdu ? "justify-end" : ""
                        }`}
                      >
                        <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
                        <span aria-hidden>·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h1
                        className={
                          isUrdu
                            ? "urdu-heading mt-3 text-4xl font-semibold leading-tight sm:text-5xl"
                            : "mt-3 font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
                        }
                      >
                        {post.title}
                      </h1>
                      {post.tags.length > 0 && (
                        <div className={`mt-5 flex flex-wrap gap-2 ${isUrdu ? "justify-end" : ""}`}>
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs font-medium text-accent-bright ${
                                isUrdu ? "urdu-heading text-base" : ""
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </header>

                    <div
                      className={isUrdu ? "prose-blog prose-urdu" : "prose-blog"}
                      dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                  </article>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Founder page: print-only clean final page (its own header/footer,
              outside the running-header table so no stray trailing page). */}
          <section className="pdf-author print-only" aria-hidden>
            <div className="pdf-author-top">
              <div className={`pdf-author-kicker ${isUrdu ? "urdu-heading" : ""}`}>
                {t.aboutAuthor}
              </div>
            </div>
            <div className="pdf-author-main">
              <Image
                src="/ahmed.webp"
                alt={site.founder}
                width={180}
                height={180}
                priority
                className="pdf-author-photo"
              />
              <a href={contact.linkedinFounder} className="pdf-author-name">
                {site.founder}
              </a>
              <div className={`pdf-author-role ${isUrdu ? "urdu-heading" : ""}`}>{t.role}</div>
              <p className={`pdf-author-bio ${isUrdu ? "urdu-heading" : ""}`} dir={isUrdu ? "rtl" : "ltr"}>
                {t.bio}
              </p>
              <div className="pdf-author-links">
                <div className="pdf-author-link">
                  <span className="pdf-author-link-label">{t.links.portfolio}</span>
                  <a href={contact.portfolio}>irazaahmed.me</a>
                </div>
                <div className="pdf-author-link">
                  <span className="pdf-author-link-label">{t.links.whatsapp}</span>
                  <a href={contact.whatsappLink}>{contact.whatsappNumber}</a>
                </div>
                <div className="pdf-author-link">
                  <span className="pdf-author-link-label">{t.links.linkedin}</span>
                  <a href={contact.linkedinFounder}>linkedin.com/in/irazaahmed</a>
                </div>
              </div>
            </div>
            <div className="pdf-author-foot">www.cybrumsolutions.dev</div>
          </section>
        </div>

        <div className="no-print mt-14 border-t border-border pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            {t.backBottom}
          </Link>
        </div>
      </main>

      <div className="no-print">
        <Footer />
        <ScrollToTop />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
