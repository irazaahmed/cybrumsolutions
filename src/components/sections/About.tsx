import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { about } from "@/lib/content";
import { site, contact } from "@/lib/site";

export function About() {
  return (
    <Section id="about" divider>
      {/* Founder intro */}
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-3xl bg-accent/15 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <Image
                src="/ahmed.png"
                alt={`${site.founder}, ${site.founderRole} of ${site.name}`}
                width={480}
                height={560}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5">
                <p className="font-heading text-lg font-semibold">{site.founder}</p>
                <p className="text-sm text-accent-bright">{site.founderRole}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
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
          <a
            href={contact.linkedinFounder}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent-bright"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
            </svg>
            Connect with {site.founder} on LinkedIn
          </a>
        </Reveal>
      </div>

      {/* Name story */}
      <Reveal delay={0.05}>
        <Card className="mt-12 bg-surface/40">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {about.nameStory.heading}
              </h3>
              <p className="mt-4 text-lg font-medium text-gradient">
                {about.nameStory.formula}
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              {about.nameStory.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="pt-2 font-medium text-foreground">
                {about.nameStory.closing}
              </p>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
