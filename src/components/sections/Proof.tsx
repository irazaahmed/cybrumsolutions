import { UserCheck, ServerCog, KeyRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { proof } from "@/lib/content";

const icons: LucideIcon[] = [UserCheck, ServerCog, KeyRound];

/**
 * Slim trust strip after Work: honest working-model guarantees instead of
 * invented testimonials. Compact on purpose so it reads as assurance,
 * not another full section.
 */
export function Proof() {
  return (
    <section className="relative px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-7xl">
        <Reveal tilt>
          <div className="rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/8 to-transparent p-8 sm:p-10">
            <h2 className="text-center font-heading text-xl font-semibold tracking-tight sm:text-2xl">
              {proof.heading}
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {proof.items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <span
                      className="animate-float-y flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent-bright"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    >
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
