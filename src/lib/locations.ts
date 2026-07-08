/**
 * Content for the local SEO landing pages (e.g. /ai-automation-karachi).
 * These target city and country search intent that the brand homepage does not
 * ("AI automation Karachi", "AI agency Pakistan"), so the location keyword lives
 * in the title, H1, meta, and body copy. Each page is unique, not a templated
 * duplicate, so search engines treat it as its own useful result.
 */

export type LocationFaq = { question: string; answer: string };

export type LocationPage = {
  slug: string;
  /** City or region this page targets. */
  place: string;
  /** SERP title, kept under ~60 chars. */
  metaTitle: string;
  /** SERP description, kept under ~160 chars. */
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** What the local audience gets, rendered as titled cards. */
  offerings: { title: string; description: string }[];
  /** Concrete local situations, rendered as a checklist. */
  useCases: string[];
  /** Trust / local-proof paragraphs. */
  proof: string[];
  /** Slug of the on-page testimonial to feature (matches content.ts). */
  faqs: LocationFaq[];
};

export const locationPages: LocationPage[] = [
  {
    slug: "ai-automation-karachi",
    place: "Karachi",
    metaTitle: "AI Automation Company in Karachi | Cybrum Solutions",
    metaDescription:
      "AI automation and AI agents for Karachi businesses. Cybrum Solutions builds automated workflows, chatbots, and systems that run real work, end to end. Free audit.",
    eyebrow: "AI Automation · Karachi",
    h1: "AI automation and AI agents for Karachi businesses",
    intro:
      "Cybrum Solutions is an AI-native company based in Karachi, building AI agents and automated workflows for local businesses. From wholesale and distribution to clinics, real estate, and services, we turn the repetitive work your team does by hand into systems that run on their own, deployed in your environment, on accounts you own.",
    offerings: [
      {
        title: "Workflow automation for Karachi SMEs",
        description:
          "Order handling, invoicing, follow-ups, and reporting connected across the tools you already use: WhatsApp, sheets, email, and databases, with AI reasoning where a decision is needed.",
      },
      {
        title: "WhatsApp AI assistants",
        description:
          "WhatsApp is where most Karachi customers already are. We build assistants that answer inquiries, qualify leads, and follow up around the clock, in the same channel your buyers use.",
      },
      {
        title: "AI agents that complete real tasks",
        description:
          "Multi-agent systems on LangGraph and CrewAI that plan, use tools, and finish multi-step processes, not demos that break the first time real data hits them.",
      },
      {
        title: "Fast, conversion-focused websites",
        description:
          "Modern Next.js sites and web apps that load fast on local networks, rank on Google, and turn visitors into inquiries instead of just sitting there.",
      },
    ],
    useCases: [
      "A Karachi wholesale or distribution business drowning in manual order and stock updates",
      "A clinic or practice losing patients to missed calls and slow WhatsApp replies",
      "A real estate or services firm chasing leads that go cold before anyone follows up",
      "A team copying the same data between two tools every single day",
      "A business that wants automation but has been burned by demos that never shipped",
    ],
    proof: [
      "Every engagement starts with a free AI audit: we map your workflow, rank the automation opportunities by impact, and give an honest answer on what is worth building. Local clients can talk to us on WhatsApp, on a call, or in person here in Karachi.",
      "Cybrum Solutions has shipped production systems that run real work, including a client management system handling 350+ clients for a Karachi housing society and a translation platform coordinating 33 languages in daily use. You own all of the code and infrastructure.",
    ],
    faqs: [
      {
        question: "Do you meet Karachi clients in person?",
        answer:
          "Yes. For clients in Karachi we can meet in person or talk on WhatsApp and calls, whatever is easiest for you. The free audit and delivery work the same either way, and everything is deployed into accounts you own.",
      },
      {
        question: "How much does AI automation cost for a Karachi business?",
        answer:
          "A single automated workflow usually lands at a few hundred dollars. Custom chatbots and assistants run into the low thousands, and larger multi-agent systems are quoted per project. The free audit gives you an exact scope and price before you commit, so there are no surprises.",
      },
      {
        question: "What kinds of Karachi businesses do you work with?",
        answer:
          "Wholesale and distribution, clinics and practices, real estate, agencies, and service businesses, anywhere repetitive work eats hours a team could spend elsewhere. If automation is not the right answer for your case, the audit says so honestly.",
      },
    ],
  },
  {
    slug: "ai-agency-pakistan",
    place: "Pakistan",
    metaTitle: "AI Agency in Pakistan | AI Agents & Automation | Cybrum",
    metaDescription:
      "Cybrum Solutions is an AI agency in Pakistan building AI agents, automation, and custom chatbots for businesses nationwide and worldwide. Free AI audit, end to end.",
    eyebrow: "AI Agency · Pakistan",
    h1: "An AI agency in Pakistan building agents, automation, and chatbots",
    intro:
      "Cybrum Solutions is an AI-native agency in Pakistan. We design, build, and deploy AI agents, automated workflows, and custom chatbots for businesses across Karachi, Lahore, Islamabad, and the rest of the country, as well as clients worldwide. One accountable builder, team-level output, end to end.",
    offerings: [
      {
        title: "AI agents and automation",
        description:
          "Automated pipelines and multi-agent systems that handle real business processes: lead handling, document processing, follow-ups, and reporting, running on their own in your environment.",
      },
      {
        title: "Custom chatbots and assistants",
        description:
          "Domain-specific assistants with memory, tools, and your real business knowledge, on your website or on WhatsApp, the channel most Pakistani customers prefer.",
      },
      {
        title: "Web development on Next.js",
        description:
          "Fast, SEO-ready websites and web apps that present your business seriously to local and international clients and convert traffic into inquiries.",
      },
      {
        title: "One partner, end to end",
        description:
          "Architecture to deployment with one accountable builder. No juggling vendors, no lost context, and full handover of code, accounts, and documentation.",
      },
    ],
    useCases: [
      "A Pakistani business that wants to scale output without hiring for repetitive roles",
      "Inquiries arriving at night and going cold before anyone can reply",
      "Support that cannot grow without adding another salary every few months",
      "A first AI or chatbot attempt that gave generic or wrong answers",
      "A company that needs one accountable partner instead of several vendors",
    ],
    proof: [
      "Every engagement starts with a free AI audit: we map your workflow, rank the highest-impact opportunities, and tell you honestly what is worth building, with rough cost and timeline, before any commitment.",
      "Based in Karachi and working across Pakistan and worldwide, Cybrum Solutions delivers systems that run in production, not slide decks. You own everything: code, infrastructure, and accounts, with no lock-in.",
    ],
    faqs: [
      {
        question: "Where in Pakistan does Cybrum Solutions work?",
        answer:
          "We are based in Karachi and work with businesses across Pakistan, including Lahore and Islamabad, as well as clients worldwide. Delivery is remote by default, with in-person and WhatsApp options for local clients.",
      },
      {
        question: "What makes an AI agency different from a regular software house?",
        answer:
          "AI is the foundation of how we build, not a feature added at the end. That means agents that reason and complete tasks, assistants grounded in your real knowledge, and automation designed to run reliably in production, not just demo well.",
      },
      {
        question: "How do we get started?",
        answer:
          "Book a free AI audit through the site or message us on WhatsApp. Tell us the workflow or system you have in mind and you get a clear, honest recommendation on what is worth building, what it costs, and how long it takes.",
      },
    ],
  },
];

export function getLocationPage(slug: string): LocationPage | undefined {
  return locationPages.find((p) => p.slug === slug);
}
