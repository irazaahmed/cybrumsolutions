import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { BlogNav } from "@/components/blog/BlogNav";
import { BlogCard } from "@/components/blog/BlogCard";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollToTop } from "@/components/visuals/ScrollToTop";

const baseUrl = `https://${site.domain}`;
const title = "Insights: AI Agents, Automation & Chatbots";
const description =
  "Practical breakdowns from Cybrum Solutions on building AI agents, business automation, custom chatbots, and systems that actually run in production.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${baseUrl}/blog`,
    type: "website",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    name: `${site.name} Insights`,
    description,
    url: `${baseUrl}/blog`,
    publisher: { "@id": `${baseUrl}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `${baseUrl}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-lines opacity-40" />
        <div className="animate-float-slow absolute left-[-10%] top-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/8 blur-[140px]" />
        <div className="animate-float-slower absolute bottom-1/4 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-accent-dim/10 blur-[140px]" />
      </div>

      <BlogNav />
      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
            Insights
          </span>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            AI Agents, Automation &amp;{" "}
            <span className="text-gradient">Chatbot Insights</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Practical breakdowns of how AI agents, automation, and real systems are built.
            No theory, only execution.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted">No posts yet. Check back soon.</p>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
