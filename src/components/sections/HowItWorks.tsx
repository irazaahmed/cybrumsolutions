import { Search, DraftingCompass, Rocket, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessBeam } from "@/components/visuals/ProcessBeam";
import { process } from "@/lib/content";

const icons: LucideIcon[] = [Search, DraftingCompass, Rocket, RefreshCw];

export function HowItWorks() {
  return (
    <Section id="process" divider>
      <SectionHeading
        eyebrow="Process"
        title={
          <>
            From workflow to a system that{" "}
            <span className="text-gradient">runs itself.</span>
          </>
        }
        intro="A clear path from your workflow to a system that runs it. Discovery starts with a free AI audit."
      />

      <div className="relative mt-16">
        {/* scroll-linked connecting beam (desktop) */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-7 hidden h-px lg:block"
        >
          <ProcessBeam />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={step.number} delay={i * 0.1} tilt>
                <div className="group relative flex flex-col">
                  {/* node */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-card text-accent-bright transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_30px_-8px_var(--color-accent)]">
                    <span className="absolute inset-0 rounded-2xl bg-accent/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon size={22} strokeWidth={1.6} className="relative" />
                  </div>

                  <span className="mt-5 font-heading text-xs font-semibold tracking-[0.2em] text-accent-bright">
                    STEP {step.number}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
