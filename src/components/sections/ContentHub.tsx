import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { contentHub } from "@/lib/content";
import { contact } from "@/lib/site";

export function ContentHub() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Section id="insights" divider>
      <SectionHeading eyebrow="Insights" title={contentHub.heading} intro={contentHub.intro} />

      {posts.length > 0 && (
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/blog"
          className="btn-sheen inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)] hover:-translate-y-0.5"
        >
          Read all insights
          <ArrowRight size={16} />
        </Link>
        <a
          href={contact.linkedinCompany}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:bg-surface hover:-translate-y-0.5"
        >
          {contentHub.ctaLabel}
        </a>
      </Reveal>
    </Section>
  );
}
