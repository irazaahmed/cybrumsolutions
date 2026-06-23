/**
 * Central site configuration: links, contact channels, nav, brand constants.
 * Edit values here; components read from this single source of truth.
 */

export const site = {
  name: "Cybrum Solutions",
  shortName: "Cybrum",
  tagline: "One element. Every solution.",
  domain: "www.cybrumsolutions.dev", // live production domain
  description:
    "Cybrum Solutions is an AI-native company in Pakistan building AI agents, automation, chatbots, and web systems for clients worldwide, built end to end.",
  founder: "Ahmed Raza",
  founderRole: "Founder & CEO",
} as const;

export const contact = {
  /** Mnemonic display string shown to viewers; the last 6 digits spell CYBRUM. */
  phoneDisplay: "0337-0(292786) CYBRUM",
  /** E.164 international format for tel: links and structured data (JSON-LD). */
  phoneRaw: "+923370292786",
  /** Click-to-call href. */
  callLink: "tel:+923370292786",
  whatsappLink: "https://wa.me/923370292786",
  email: "info@cybrumsolutions.dev",
  /** Canonical website URL and the bare label shown to viewers. */
  website: "https://cybrumsolutions.dev",
  websiteLabel: "cybrumsolutions.dev",
  /** Company page: use wherever Cybrum (the company) is referenced. */
  linkedinCompany: "https://www.linkedin.com/company/cybrumsolutions",
  /** Founder's personal profile: use wherever Ahmed (the founder) is referenced. */
  linkedinFounder: "https://www.linkedin.com/in/irazaahmed",
  github: "https://github.com/irazaahmed",
  portfolio: "https://irazaahmed.me",
} as const;

/** In-page anchor sections for smooth-scroll navigation. */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const;

export const primaryCta = {
  label: "Book a Free AI Audit",
  href: "#contact",
} as const;

export const secondaryCta = {
  label: "See What We Build",
  href: "#services",
} as const;
