"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** The product lives on its own subdomain; every CTA here points there. */
const APP_URL = "https://chatbot.cybrumsolutions.dev";

type Cycle = "monthly" | "quarterly" | "yearly";

const CYCLES: { id: Cycle; label: string; save: string | null }[] = [
  { id: "monthly", label: "Monthly", save: null },
  { id: "quarterly", label: "Quarterly", save: "Save 10%" },
  { id: "yearly", label: "Yearly", save: "Save 20%" },
];

const UNLIMITED = 100_000;

interface Plan {
  name: string;
  popular: boolean;
  pageCap: number;
  conversationCap: number;
  prices: Record<Cycle, number>;
  features: string[];
}

// Marketing display only — the real billing runs in the CS Chatbot app. Keep
// these numbers in sync with cs-chatbot/lib/billing/plans.ts.
const PLANS: Plan[] = [
  {
    name: "Starter",
    popular: false,
    pageCap: 100,
    conversationCap: 200,
    prices: { monthly: 3500, quarterly: 9450, yearly: 33600 },
    features: [
      "The full product & website widget",
      "Lead capture into your dashboard",
      "Email notifications",
      "Monthly usage report",
    ],
  },
  {
    name: "Pro",
    popular: true,
    pageCap: 500,
    conversationCap: 800,
    prices: { monthly: 9000, quarterly: 24300, yearly: 86400 },
    features: [
      "Everything in Starter",
      "Lead export to Google Sheet / CRM",
      'Remove the "Powered by Cybrum" branding',
      "Priority email support",
    ],
  },
  {
    name: "Business",
    popular: false,
    pageCap: UNLIMITED,
    conversationCap: 3000,
    prices: { monthly: 24000, quarterly: 64800, yearly: 230400 },
    features: [
      "Everything in Pro",
      "Full custom branding",
      "Priority support",
      "Multiple team members",
    ],
  },
];

function pages(cap: number): string {
  return cap >= UNLIMITED ? "Unlimited pages" : `${cap.toLocaleString()} pages`;
}

export function ChatbotPricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <div>
      {/* Cycle toggle */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur-sm">
          {CYCLES.map((c) => {
            const active = cycle === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCycle(c.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-accent text-white shadow-[0_0_20px_-6px_var(--color-accent)]" : "text-muted hover:text-foreground"
                }`}
              >
                {c.label}
                {c.save && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      active ? "bg-white/20 text-white" : "bg-accent/15 text-accent-bright"
                    }`}
                  >
                    {c.save}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {cycle === "yearly" && (
        <p className="mt-3 text-center text-xs font-medium text-accent-bright">
          Save 20% — 2 months free
        </p>
      )}

      {/* Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08} className="h-full">
            <div
              className={`flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm transition-colors ${
                plan.popular
                  ? "border-accent/60 bg-accent/[0.07] shadow-[0_0_40px_-12px_var(--color-accent)]"
                  : "border-border bg-card/60"
              }`}
            >
              {plan.popular && (
                <span className="mb-3 self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-accent-bright">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-lg font-semibold tracking-tight">{plan.name}</h3>
              <p className="mt-3">
                <span className="font-heading text-3xl font-semibold tabular-nums">
                  Rs {plan.prices[cycle].toLocaleString()}
                </span>
                <span className="text-sm text-muted"> / {cycle}</span>
              </p>

              <div className="mt-5 space-y-1.5 text-sm">
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <Check size={14} className="text-accent-bright" strokeWidth={2.5} />
                  {pages(plan.pageCap)} learned
                </p>
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <Check size={14} className="text-accent-bright" strokeWidth={2.5} />
                  {plan.conversationCap.toLocaleString()} conversations / month
                </p>
              </div>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-border pt-5 text-sm text-muted">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={14} className="mt-0.5 shrink-0 text-accent-bright" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex h-11 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                  plan.popular
                    ? "bg-accent text-white hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)]"
                    : "border border-border bg-surface/60 text-foreground hover:border-accent"
                }`}
              >
                Get started
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm font-medium text-foreground">
        Still cheaper than one support hire.
      </p>
    </div>
  );
}
