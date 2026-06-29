import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { testimonials } from "@/lib/content";

/**
 * Real client testimonials shown after the Proof strip. Each card maps to a
 * system actually delivered (translation platform, client management system,
 * website), so the quotes stay honest and tie back to the Work section.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" divider>
      <SectionHeading
        eyebrow="Testimonials"
        title={
          <>
            Trusted by the people{" "}
            <span className="text-shimmer">we build for</span>
          </>
        }
        intro={testimonials.intro}
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3 sm:mt-16">
        {testimonials.items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} className="h-full">
            <GlowCard className="flex h-full flex-col">
              {/* Quote mark + star rating */}
              <div className="flex items-center justify-between">
                <Quote
                  className="h-8 w-8 fill-accent/15 text-accent/40"
                  aria-hidden
                />
                <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-accent-bright text-accent-bright"
                      aria-hidden
                    />
                  ))}
                </div>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/90 sm:text-base">
                {t.quote}
              </p>

              {/* Project chip */}
              <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs font-medium text-accent-bright">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                {t.project}
              </span>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-semibold text-white shadow-[0_4px_16px_-4px_var(--color-accent)]">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-heading text-sm font-semibold tracking-tight">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
