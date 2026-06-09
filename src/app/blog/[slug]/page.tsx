import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { site, contact } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { BlogNav } from "@/components/blog/BlogNav";
import { DownloadPdfButton } from "@/components/blog/DownloadPdfButton";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = `https://${site.domain}`;

type Props = { params: Promise<{ slug: string }> };

/** Pre-render every post at build time. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const url = `${baseUrl}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [site.founder],
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${baseUrl}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    inLanguage: "en",
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    image: `${baseUrl}/og.png`,
    author: { "@type": "Person", name: site.founder, url: contact.portfolio },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
        <div className="no-print flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            All insights
          </Link>
          <DownloadPdfButton />
        </div>

        <div id="pdf-root" className="mt-6">
          {/* Cover page: shown only in the printed PDF (hidden on screen) */}
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
              <div className="pdf-cover-kicker">Article</div>
              <div className="pdf-cover-rule" />
              <div className="pdf-cover-title">{post.title}</div>
              <div className="pdf-cover-rule" />
              <div className="pdf-cover-meta">
                {formatDate(post.date)} &middot; {post.readingTime}
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
                    <span className="pdf-rfoot-r">The core element of intelligent automation</span>
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td>
                  <article>
                    <header className="mb-10 border-b border-border pb-8">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span aria-hidden>·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                        {post.title}
                      </h1>
                      {post.tags.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {post.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs font-medium text-accent-bright"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </header>

                    <div
                      className="prose-blog"
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
              <div className="pdf-author-kicker">About the author</div>
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
              <div className="pdf-author-name">{site.founder}</div>
              <div className="pdf-author-role">{site.founderRole}, Cybrum Solutions</div>
              <p className="pdf-author-bio">
                AI Solutions Expert and founder of Cybrum Solutions. Ahmed
                orchestrates an agentic AI workforce to build intelligent
                automation, AI agents, chatbots, and web systems end to end,
                with one accountable builder.
              </p>
              <div className="pdf-author-links">
                <div className="pdf-author-link">
                  <span className="pdf-author-link-label">Portfolio</span>
                  <a href={contact.portfolio}>irazaahmed.me</a>
                </div>
                <div className="pdf-author-link">
                  <span className="pdf-author-link-label">WhatsApp</span>
                  <a href={contact.whatsappLink}>{contact.whatsappNumber}</a>
                </div>
                <div className="pdf-author-link">
                  <span className="pdf-author-link-label">LinkedIn</span>
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
            Back to all insights
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
