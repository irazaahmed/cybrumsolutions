import { Layers, Boxes, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { whyCybrum } from "@/lib/content";

const icons: LucideIcon[] = [Layers, Boxes, ShieldCheck];

export function WhyCybrum() {
  return (
    <Section id="why" divider>
      <SectionHeading
        eyebrow="Why Cybrum Solutions"
        title={
          <>
            Not a vendor. <span className="text-gradient">A digital partner.</span>
          </>
        }
        intro="What it means to work with an AI-native builder instead of a traditional agency."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {whyCybrum.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <GlowCard className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-accent-bright">
                    <span className="absolute inset-0 rounded-2xl bg-accent/10 blur-md" />
                    <Icon size={20} strokeWidth={1.6} className="relative" />
                  </span>
                  <span className="font-heading text-4xl font-semibold text-accent/15 transition-colors duration-300 group-hover:text-accent/45">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
