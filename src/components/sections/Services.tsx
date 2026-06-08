import { Workflow, MessageSquareText, Code2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";
import { primaryCta } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  automation: Workflow,
  chatbots: MessageSquareText,
  web: Code2,
};

function IconBadge({ Icon, size = "md" }: { Icon: LucideIcon; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  const ic = size === "lg" ? 26 : 20;
  return (
    <span
      className={`relative flex ${box} items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent text-accent-bright`}
    >
      <span className="absolute inset-0 rounded-2xl bg-accent/10 blur-md" />
      <Icon size={ic} className="relative" strokeWidth={1.6} />
    </span>
  );
}

export function Services() {
  const primary = services.items.find((s) => s.primary);
  const rest = services.items.filter((s) => !s.primary);

  return (
    <Section id="services" divider>
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            What <span className="text-gradient">Cybrum Solutions</span> builds
          </>
        }
        intro="Three focused capabilities, built end to end, with automation at the core."
      />

      <div className="mt-14 flex flex-col gap-6">
        {/* Primary service feature card */}
        {primary && (
          <Reveal>
            <GlowCard className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <div className="flex items-center gap-5 md:flex-1">
                <IconBadge Icon={icons[primary.id]} size="lg" />
                <div>
                  <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-bright">
                    Primary focus
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {primary.title}
                  </h3>
                </div>
              </div>
              <div className="md:flex-1">
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  {primary.description}
                </p>
                <a
                  href={primaryCta.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright transition-colors hover:text-foreground"
                >
                  Start with a free audit
                  <ArrowRight size={15} />
                </a>
              </div>
            </GlowCard>
          </Reveal>
        )}

        {/* Supporting services */}
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1} className="h-full">
              <GlowCard className="flex h-full flex-col">
                <IconBadge Icon={icons[service.id]} />
                <h3 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {service.description}
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
