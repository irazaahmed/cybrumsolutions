import { Compass, Target } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { visionMission } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Vision and Mission, shown as the two halves of the brand promise. Sits
 * between what we build (Services) and why we're different (Why Cybrum) so
 * visitors get purpose before differentiators.
 */
export function VisionMission() {
  const cards = [
    { icon: Compass, ...visionMission.vision },
    { icon: Target, ...visionMission.mission },
  ];

  return (
    <Section id="vision-mission" divider>
      <SectionHeading
        eyebrow={visionMission.eyebrow}
        title={<span className="text-gradient">{site.tagline}</span>}
        intro={visionMission.heading}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {cards.map(({ icon: Icon, label, text }, i) => (
          <Reveal key={label} delay={i * 0.1} tilt className="h-full">
            <GlowCard className="flex h-full flex-col">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-accent-bright">
                <span className="absolute inset-0 rounded-2xl bg-accent/10 blur-md" />
                <Icon size={20} strokeWidth={1.6} className="relative" />
              </span>
              <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-accent-bright">
                {label}
              </h3>
              <p className="mt-3 text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
                {text}
              </p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
