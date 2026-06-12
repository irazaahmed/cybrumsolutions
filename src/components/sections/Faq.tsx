import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/lib/content";

/**
 * Homepage FAQ as native <details> accordions (no JS state), emitting
 * FAQPage structured data for rich results and AI search engines.
 */
export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section id="faq" divider>
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Frequently asked <span className="text-gradient">questions</span>
          </>
        }
        intro={faq.intro}
      />

      <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-4">
        {faq.items.map((item, i) => (
          <Reveal key={item.question} delay={i * 0.05} x={i % 2 === 0 ? -24 : 24}>
            <details className="faq-item group rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-colors open:border-accent/50 hover:border-accent/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                  {item.question}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-accent-bright transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">
                {item.answer}
              </p>
            </details>
          </Reveal>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
