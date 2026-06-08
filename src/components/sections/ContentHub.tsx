import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { contentHub } from "@/lib/content";
import { contact } from "@/lib/site";

export function ContentHub() {
  return (
    <Section id="insights" divider>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent-bright">
                Insights
              </span>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                {contentHub.heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {contentHub.intro}
              </p>
            </div>
            <Button href={contact.linkedinCompany} variant="secondary" target="_blank" rel="noopener noreferrer">
              {contentHub.ctaLabel}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
