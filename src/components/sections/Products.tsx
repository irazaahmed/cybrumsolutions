import Link from "next/link";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** The product runs on its own subdomain; the homepage teaser links out to it. */
const APP_URL = "https://chatbot.cybrumsolutions.dev";

const highlights = [
  "Answers only from your website's content, with sources",
  "Live demo on your own site before signup",
  "English, Urdu & Roman Urdu",
  "Captures leads while it chats",
];

/**
 * Products section: features Cybrum Chatbot, the first packaged product.
 * A mini widget-style chat preview animates on the right; copy and CTAs on
 * the left link to the dedicated /products/chatbot page and the live app.
 */
export function Products() {
  return (
    <Section id="products" divider>
      <SectionHeading
        eyebrow="Product"
        title={
          <>
            Meet <span className="text-gradient">Cybrum Chatbot</span>
          </>
        }
        intro="Our first packaged product: an AI chatbot trained on your website that answers visitors 24/7, cites its sources, and never invents facts about your business."
      />

      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-2">
        {/* Copy + CTAs */}
        <Reveal x={-24}>
          <ul className="flex flex-col gap-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-bright">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sheen inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_36px_-6px_var(--color-accent)]"
            >
              Try it on your website
              <ExternalLink size={15} />
            </a>
            <Link
              href="/products/chatbot"
              aria-label="Learn more about Cybrum Chatbot"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-6 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Learn more
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Widget-style chat preview (pure CSS animation, no JS) */}
        <Reveal x={24}>
          <div
            aria-hidden
            className="glass relative mx-auto w-full max-w-sm rounded-2xl p-4 shadow-[0_24px_70px_-30px_var(--color-accent)]"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-semibold">Cybrum Chatbot</p>
                <p className="text-[11px] text-muted">Trained on your website</p>
              </div>
            </div>

            {/* messages */}
            <div className="flex flex-col gap-2.5 py-4 text-[13px] leading-relaxed">
              <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm border border-border bg-surface/80 px-3.5 py-2.5">
                Salaam! Ask me anything about this business.
              </div>
              <div className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-3.5 py-2.5 text-white">
                Aap ki delivery Karachi me kitne din leti hai?
              </div>
              <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm border border-border bg-surface/80 px-3.5 py-2.5">
                Karachi me delivery 2 se 3 working days me hoti hai.
                <span className="mt-1.5 block text-[11px] text-accent-bright underline decoration-accent/40 underline-offset-2">
                  yoursite.com/shipping
                </span>
              </div>
              {/* typing indicator */}
              <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-tl-sm border border-border bg-surface/80 px-3.5 py-3">
                <span className="pv-dot h-1.5 w-1.5 rounded-full bg-muted" />
                <span className="pv-dot h-1.5 w-1.5 rounded-full bg-muted [animation-delay:0.15s]" />
                <span className="pv-dot h-1.5 w-1.5 rounded-full bg-muted [animation-delay:0.3s]" />
              </div>
            </div>

            {/* input */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2.5">
              <span className="text-[13px] text-muted">Type a message…</span>
              <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
