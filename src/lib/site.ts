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
    "Cybrum Solutions is an AI-native company building intelligent automation, AI agents, chatbots, and web systems that run real business workflows, built end to end.",
  founder: "Ahmed Raza",
  founderRole: "Founder & CEO",
} as const;

export const contact = {
  whatsappNumber: "+92 313 0221118",
  whatsappLink: "https://wa.me/923130221118",
  email: "hafizahmedraza12345@gmail.com",
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
