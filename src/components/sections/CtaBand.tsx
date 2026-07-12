import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { contactSection } from "@/lib/content";
import { contact, primaryCta } from "@/lib/site";

/**
 * Closing call-to-action band. The full audit form lives on /contact; this
 * band is the bridge to it from the homepage and other pages. The optional
 * id keeps legacy #contact anchor links working on the homepage.
 */
export function CtaBand({ id }: { id?: string }) {
  return (
    <section id={id} className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal tilt>
          <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-b from-accent/10 to-transparent px-6 py-14 text-center sm:px-10 sm:py-16">
            {/* soft radial accent wash behind the copy */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_60%)]"
            />

            <h2 className="relative mx-auto max-w-2xl font-heading text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
              {contactSection.heading}
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {contactSection.sub}
            </p>

            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={primaryCta.href}
                className="btn-sheen inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)] sm:w-auto"
              >
                {primaryCta.label}
                <ArrowRight size={16} />
              </Link>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent sm:w-auto"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>

            <p className="relative mt-5 text-xs uppercase tracking-[0.18em] text-muted">
              Free audit · Honest answer · Usually within 24 hours
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
