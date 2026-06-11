"use client";

import { useState, type FormEvent } from "react";
import { Check, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { contactSection } from "@/lib/content";
import { contact } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const businessTypes = [
  "Local business (Pakistan)",
  "International business",
  "Startup / Founder",
  "Agency / Reseller",
  "Other",
];

const budgetRanges = [
  "Under $500",
  "$500 to $2,000",
  "$2,000 to $10,000",
  "Over $10,000",
  "Not sure yet",
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessType: businessTypes[0],
    budget: budgetRanges[budgetRanges.length - 1],
    message: "",
  });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const whatsappHref = () => {
    const text = `Hi Cybrum Solutions! I'm ${form.name || "[name]"} (${
      form.businessType
    }, budget: ${form.budget}).%0A%0A${
      form.message || "I'd like to discuss an AI / automation project."
    }`;
    return `${contact.whatsappLink}?text=${text}`;
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        businessType: businessTypes[0],
        budget: budgetRanges[budgetRanges.length - 1],
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] duration-300 focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]";

  return (
    <Section id="contact" divider>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Left: pitch + direct channels */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent-bright">
            Contact
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {contactSection.heading}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {contactSection.sub}
          </p>

          <div className="mt-7 max-w-md rounded-2xl border border-accent/25 bg-accent/5 p-5">
            <p className="text-sm font-semibold text-foreground">
              {contactSection.auditHeading}
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {contactSection.auditIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-bright">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/60 text-accent-bright transition-colors group-hover:border-accent/60">
                <MessageCircle size={16} />
              </span>
              {contact.whatsappNumber}
            </a>
            <a
              href={contact.linkedinCompany}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/60 text-accent-bright transition-colors group-hover:border-accent/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
                </svg>
              </span>
              LinkedIn
            </a>
          </div>
        </Reveal>

        {/* Right: gated form */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-bright">
                  ✓
                </span>
                <h3 className="text-xl font-semibold">Thanks! Message received.</h3>
                <p className="max-w-sm text-sm text-muted">
                  I&apos;ll review your inquiry and get back to you. For a faster
                  reply, reach out directly on WhatsApp.
                </p>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
                >
                  Message on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-sm text-muted">{contactSection.formNote}</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={form.email}
                    onChange={update("email")}
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">
                      Business type
                    </span>
                    <select
                      value={form.businessType}
                      onChange={update("businessType")}
                      className={inputClass}
                    >
                      {businessTypes.map((t) => (
                        <option key={t} value={t} className="bg-surface">
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">
                      Rough budget
                    </span>
                    <select
                      value={form.budget}
                      onChange={update("budget")}
                      className={inputClass}
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b} className="bg-surface">
                          {b}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <textarea
                  required
                  rows={4}
                  placeholder="What workflow or system do you want built?"
                  value={form.message}
                  onChange={update("message")}
                  className={`${inputClass} resize-none`}
                />

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please try again or reach out on WhatsApp.
                  </p>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-sheen inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)] disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Book a Free AI Audit"}
                  </button>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface/60 px-6 text-sm font-medium text-foreground transition-colors hover:border-accent"
                  >
                    Send via WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
