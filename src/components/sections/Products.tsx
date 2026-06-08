/**
 * Products section: PLACEHOLDER (structure only).
 *
 * Per strategy, Cybrum has no products yet. This component is intentionally
 * NOT mounted in page.tsx. When a real product (e.g. reusable AI systems or
 * prompt libraries) is ready, fill this in and add <Products /> to the page.
 */
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Products() {
  return (
    <Section id="products" divider>
      <Reveal>
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card/30 px-6 py-16 text-center">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent-bright">
            Coming Soon
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
            Products
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Reusable AI systems built from real client work, packaged for teams
            who want results without a custom build. In development.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
