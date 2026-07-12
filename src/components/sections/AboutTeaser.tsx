import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxY } from "@/components/visuals/ParallaxY";
import { about } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Homepage teaser for the About story. The full founder profile, stats, and
 * the Cybrum name story live on /about; this keeps the homepage scannable
 * while still making the company's identity clear at a glance.
 */
export function AboutTeaser() {
  return (
    <Section id="about" divider>
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal x={-32}>
          <ParallaxY from={20} to={-20} className="relative mx-auto w-full max-w-xs">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-3xl bg-accent/15 blur-2xl"
            />
            <div className="group relative overflow-hidden rounded-3xl border border-border transition-colors duration-500 hover:border-accent/50">
              <Image
                src="/ahmed.webp"
                alt={`${site.founder}, AI Solutions Expert and ${site.founderRole} of ${site.name}`}
                width={480}
                height={560}
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5">
                <p className="font-heading text-lg font-semibold text-white">{site.founder}</p>
                <p className="text-sm font-medium text-[#5eb0ff]">{site.founderRole}</p>
              </div>
            </div>
          </ParallaxY>
        </Reveal>

        <Reveal delay={0.1} x={32}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent-bright">
            About
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {about.heading}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-5 text-base font-medium text-gradient sm:text-lg">
            {about.nameStory.closing}
          </p>
          <Link
            href="/about"
            className="btn-sheen mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
          >
            Read our story
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
