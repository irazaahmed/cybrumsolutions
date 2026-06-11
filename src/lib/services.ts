/**
 * Content for the dedicated service landing pages under /services/[slug].
 * Each page targets its own search intent (the homepage stays the brand page),
 * so titles, descriptions, and body copy here carry the keywords.
 */

export type ServiceFaq = { question: string; answer: string };

export type ServicePage = {
  slug: string;
  /** Browser tab / SERP title, kept under ~60 chars. */
  metaTitle: string;
  /** SERP description, kept under ~160 chars. */
  metaDescription: string;
  name: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** What this service covers, rendered as titled bullets. */
  offerings: { title: string; description: string }[];
  /** Concrete situations this service solves, rendered as a checklist. */
  useCases: string[];
  /** Short paragraph block under "How delivery works". */
  delivery: string[];
  faqs: ServiceFaq[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "ai-automation",
    metaTitle: "AI Automation & AI Agent Development Services",
    metaDescription:
      "AI automation agency building AI agents and automated workflows that run real business processes end to end. Serving Pakistan and clients worldwide.",
    name: "Automation & AI Agents",
    eyebrow: "Primary service",
    h1: "AI automation and AI agents that run your business workflows",
    intro:
      "Cybrum Solutions is an AI automation agency that builds AI agents and automated pipelines around your actual workflow. Repetitive tasks, handovers, follow-ups, and decisions become systems that run on their own, in your environment, on accounts you own.",
    offerings: [
      {
        title: "Multi-agent systems",
        description:
          "Teams of specialized AI agents built on LangGraph and CrewAI that plan, use tools, and complete multi-step business processes without a human driving every step.",
      },
      {
        title: "Workflow automation with n8n",
        description:
          "Automated pipelines connecting your existing tools: email, WhatsApp, sheets, CRMs, and databases. Triggers, branching logic, and AI reasoning in one flow.",
      },
      {
        title: "Document and data processing",
        description:
          "Invoices, applications, reports, and inbound messages classified, extracted, and routed automatically with an audit trail you can inspect.",
      },
      {
        title: "Lead handling and follow-up",
        description:
          "Inquiries captured from forms, chat, and WhatsApp, qualified against your criteria, and pushed into your pipeline with notifications you control.",
      },
    ],
    useCases: [
      "A back-office task your team repeats every day that follows known rules",
      "Inquiries that go cold because follow-up depends on someone remembering",
      "Data moved by hand between two tools that both have APIs",
      "Reports assembled manually from the same sources every week",
      "A process that breaks whenever the one person who knows it is away",
    ],
    delivery: [
      "Every engagement starts with a free AI audit: we map the workflow, rank the automation opportunities by impact, and give an honest answer on what is worth building. Then the system is architected, built, and deployed into your environment, with documentation and a handover so you own everything.",
      "A focused single workflow usually ships in 1 to 2 weeks. Larger multi-agent systems run 4 to 8 weeks depending on integrations.",
    ],
    faqs: [
      {
        question: "What is AI workflow automation?",
        answer:
          "AI workflow automation combines triggers and integrations with AI reasoning, so a process like handling an inquiry, processing a document, or producing a report runs automatically instead of depending on someone doing it by hand. Unlike simple rule-based automation, AI steps can read, classify, and decide.",
      },
      {
        question: "Do I need AI agents or simple automation?",
        answer:
          "If the process follows fixed rules, simple automation with a tool like n8n is cheaper and more reliable. If steps need judgment, reading documents, or choosing between actions, an AI agent fits. The free audit tells you which one your workflow actually needs.",
      },
      {
        question: "What does AI automation cost?",
        answer:
          "A single automated workflow usually lands at a few hundred dollars. Multi-agent systems covering complete processes are quoted per project, typically in the low thousands. You get an exact scope and price from the free audit before committing.",
      },
    ],
  },
  {
    slug: "ai-chatbots",
    metaTitle: "Custom AI Chatbot & Assistant Development",
    metaDescription:
      "Custom AI chatbots and assistants with memory, tools, and your real business knowledge. Website, WhatsApp, and internal assistants built end to end.",
    name: "Custom Chatbots & Assistants",
    eyebrow: "Service",
    h1: "Custom AI chatbots and assistants built on your real knowledge",
    intro:
      "Generic chatbot wrappers answer generically and fail on anything specific. Cybrum Solutions builds domain-specific AI assistants with memory, tool access, and your actual business knowledge, so they answer accurately, capture leads, and hand over to a human at the right moment.",
    offerings: [
      {
        title: "Website assistants that sell",
        description:
          "An assistant trained on your services, pricing logic, and FAQs that qualifies visitors and books the next step instead of just chatting.",
      },
      {
        title: "WhatsApp business assistants",
        description:
          "Assistants on the channel your customers in Pakistan and worldwide already use, handling inquiries, order status, and follow-ups around the clock.",
      },
      {
        title: "Internal knowledge assistants",
        description:
          "Retrieval-augmented (RAG) assistants over your documents, SOPs, and policies, so your team gets sourced answers instead of searching folders.",
      },
      {
        title: "Assistants with tools and memory",
        description:
          "Built on the Claude API with function calling: the assistant can look up live data, create records, and remember context across a conversation.",
      },
    ],
    useCases: [
      "The same customer questions answered manually many times a day",
      "Leads arriving at night and going cold before anyone replies",
      "Support that cannot scale without hiring another person",
      "Institutional knowledge locked in documents nobody can search",
      "A first chatbot attempt that gave generic or wrong answers",
    ],
    delivery: [
      "We start from your real conversations and documents, define what the assistant must answer and what it must never claim, and wire in escalation to a human. The assistant ships with guardrails, analytics on what users ask, and full handover of code and accounts.",
      "A production assistant typically takes 2 to 4 weeks, including knowledge preparation and testing against real questions.",
    ],
    faqs: [
      {
        question: "How is a custom chatbot different from a ChatGPT wrapper?",
        answer:
          "A wrapper forwards questions to a general model with no knowledge of your business, so answers are generic and sometimes wrong. A custom assistant is grounded in your documents and data, has defined boundaries, and can take actions like creating a lead or checking an order. It answers like a trained employee, not a search engine.",
      },
      {
        question: "Can the chatbot work on WhatsApp?",
        answer:
          "Yes. Assistants can run on your website, on WhatsApp through the Business API, or both with shared knowledge. For businesses in Pakistan, WhatsApp is usually the channel where an assistant pays for itself fastest.",
      },
      {
        question: "What happens when the chatbot does not know an answer?",
        answer:
          "It says so and escalates. Every assistant we ship has explicit boundaries: topics it must not guess on, and a handover path to a human with the conversation context attached. Wrong answers cost trust, so refusing gracefully is part of the design.",
      },
    ],
  },
  {
    slug: "web-development",
    metaTitle: "Next.js Web Development: Fast, Conversion-Focused Sites",
    metaDescription:
      "Modern web development on Next.js: fast, SEO-ready websites and web apps built end to end, designed to convert visitors into inquiries.",
    name: "Web Development",
    eyebrow: "Service",
    h1: "Fast, modern websites and web apps built on Next.js",
    intro:
      "Your website is the first system clients judge you by. Cybrum Solutions builds fast, modern, conversion-focused websites and web applications on Next.js, with technical SEO, analytics, and a clear path from visitor to inquiry built in from day one.",
    offerings: [
      {
        title: "Company and marketing sites",
        description:
          "Premium, animated, SEO-ready sites that load fast and present your business seriously to local and international clients alike.",
      },
      {
        title: "Web applications and dashboards",
        description:
          "Custom portals, admin panels, and dashboards on Next.js, TypeScript, and Supabase, built to handle real data and real users.",
      },
      {
        title: "E-commerce storefronts",
        description:
          "Product catalogs, carts, and checkout flows with CMS-managed content, so your team updates the store without touching code.",
      },
      {
        title: "AI-ready by default",
        description:
          "Sites built so assistants, lead automation, and analytics plug in cleanly, because we build those systems too.",
      },
    ],
    useCases: [
      "A website that looks dated next to competitors you lose deals to",
      "Pages that load slowly and rank nowhere on Google",
      "A site that gets traffic but produces no inquiries",
      "A manual business process that should be a customer-facing portal",
      "A store or catalog the team cannot update without a developer",
    ],
    delivery: [
      "Every build covers the full path: architecture, design system, content structure, technical SEO (metadata, structured data, sitemaps), analytics, and deployment on Vercel. You get the repository, the accounts, and documentation, with no dependency on us to keep it running.",
      "A focused marketing site ships in 2 to 3 weeks; web applications are scoped per project after the free audit.",
    ],
    faqs: [
      {
        question: "Why Next.js instead of WordPress?",
        answer:
          "Next.js sites are faster, more secure, and rank better because performance and structured data are first-class. There are no plugins to patch and no theme lock-in. WordPress still fits content-heavy sites with non-technical editors, and the audit will say so honestly if that is your case.",
      },
      {
        question: "Is SEO included in web development?",
        answer:
          "Technical SEO is always included: metadata, Open Graph, structured data, sitemaps, performance, and clean semantics. Ongoing content SEO like writing articles is a separate engagement, but the site ships ready for it.",
      },
      {
        question: "Can you redesign an existing website?",
        answer:
          "Yes. Redesigns start the same way as new builds: an audit of what works, what loses visitors, and what the new site must do. Content and rankings you already have are preserved through redirects and matched page structure.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}
