/**
 * All website copy and structured content in one place.
 * Change wording here without touching component markup.
 */

export const hero = {
  eyebrow: "AI-Native Company",
  headline: "AI agents and automation that do the work, not just the demo.",
  sub: "Cybrum Solutions builds intelligent automation, AI agents, chatbots, and web systems that run real business workflows. Designed, built, and deployed end to end.",
  /** Keyword-rich support line under the hero copy: carries the local + service
   *  search intent (AI automation Karachi / Pakistan) without disturbing the
   *  brand headline. */
  keywordLine:
    "AI automation, AI agents, and custom chatbots for businesses in Karachi, across Pakistan, and worldwide.",
} as const;

export const trustStrip = {
  label: "Built with the tools that power modern AI systems",
  tools: ["Claude API", "LangGraph", "CrewAI", "n8n", "Next.js", "Python"],
} as const;

export type Stat = { value: string; label: string };

/**
 * Credibility strip shown in About. Every number here is real and defensible,
 * not marketing inflation. Reinforces the "one accountable partner" positioning.
 */
export const stats: Stat[] = [
  {
    value: "33",
    label: "Languages coordinated in a single AI-managed translation system",
  },
  {
    value: "8+ yrs",
    label: "Domain expertise bridging deep research and AI engineering",
  },
  {
    value: "1",
    label: "Accountable partner from architecture to deployment, no vendor juggling",
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Dedicated landing page under /services. */
  href: string;
  primary?: boolean;
};

export const services: { heading: string; items: Service[] } = {
  heading: "What Cybrum Solutions Builds",
  items: [
    {
      id: "automation",
      title: "Automation & AI Agents",
      description:
        "Multi-agent systems and automated pipelines that handle real tasks end to end. Repetitive work, decisions, and processes turned into systems that run on their own. This is what we do best.",
      href: "/services/ai-automation",
      primary: true,
    },
    {
      id: "chatbots",
      title: "Custom Chatbots & Assistants",
      description:
        "Domain-specific assistants with memory, tools, and real knowledge, built for your business, not generic wrappers.",
      href: "/services/ai-chatbots",
    },
    {
      id: "web",
      title: "Web Development",
      description:
        "Fast, modern websites and web apps built on Next.js. Clean, conversion-focused, and ready to scale.",
      href: "/services/web-development",
    },
  ],
};

export type Differentiator = { title: string; description: string };

export const whyCybrum: { heading: string; items: Differentiator[] } = {
  heading: "Why Cybrum Solutions",
  items: [
    {
      title: "AI-Native, Not AI-Added",
      description:
        "AI is the foundation of how we build, not a feature bolted on at the end.",
    },
    {
      title: "End to End, One Partner",
      description:
        "From architecture to deployment, one accountable builder. No juggling multiple vendors.",
    },
    {
      title: "Systems That Actually Run",
      description:
        "We build automation that works in your real environment, not impressive demos that break in production.",
    },
  ],
};

export type ProcessStep = { number: string; title: string; description: string };

export const process: { heading: string; steps: ProcessStep[] } = {
  heading: "How We Work",
  steps: [
    {
      number: "01",
      title: "Understand",
      description:
        "We map your actual workflow: what takes time, what breaks, what repeats.",
    },
    {
      number: "02",
      title: "Architect",
      description:
        "A clear system design before any code. Tools, data flow, and structure defined upfront.",
    },
    {
      number: "03",
      title: "Build & Deploy",
      description:
        "The system is built, tested, and deployed into your real environment.",
    },
    {
      number: "04",
      title: "Refine",
      description:
        "Real usage data drives improvements. The system gets sharper over time.",
    },
  ],
};

/** Which stylized preview the project card renders (see ProjectVisual). */
export type ProjectVisualKind =
  | "chat"
  | "pipeline"
  | "graph"
  | "store"
  | "dashboard"
  | "profile"
  | "blog"
  | "bank";

export type Project = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  /** GitHub repository. */
  link?: string;
  /** Deployed, browsable URL. */
  live?: string;
  visual: ProjectVisualKind;
};

/**
 * Curated capabilities showcase: strongest, most relevant projects first.
 * Framed as "What I've Built", not client case studies. The homepage shows
 * the first three; /work lists them all.
 */
export const work: { heading: string; intro: string; projects: Project[] } = {
  heading: "What I've Built",
  intro:
    "Real systems shipped across AI agents, automation, and web, not slide decks. Each one was built end to end and deployed to run.",
  projects: [
    {
      title: "Translation Management System",
      category: "Management Platform",
      description:
        "One real-time dashboard running two translation workflows: Quranic translation across 25+ languages with weekly meeting scheduling, and an 8-stage English production pipeline for books, speeches, and articles.",
      stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      link: "https://github.com/irazaahmed/translation-management-system",
      live: "https://tms-dawateislami.vercel.app/",
      visual: "pipeline",
    },
    {
      title: "Personal Professional Portfolio",
      category: "Web Development",
      description:
        "Personal brand site with an animated UI, project showcase, and content hub, designed, built, and deployed end to end.",
      stack: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://github.com/irazaahmed/iraza-portfolio",
      live: "https://www.irazaahmed.me/",
      visual: "profile",
    },
    {
      title: "Lodhi Cooperative Housing Society",
      category: "Client Portal",
      description:
        "Secure client document portal for a 360-plot housing society. Each client signs in to view and download only their own legal documents, with admin-controlled verification, private storage, and short-lived signed links.",
      stack: ["Next.js", "Prisma", "PostgreSQL", "Cloudinary"],
      link: "https://github.com/irazaahmed/builder-costumer-data",
      live: "https://lodhisociety.com/",
      visual: "dashboard",
    },
    {
      title: "Hafeez Communication",
      category: "Shop Management System",
      description:
        "Full-stack management panel for a mobile shop: stock, fast sales with credit (udhaar) tracking, printable invoices, and JazzCash and EasyPaisa cash operations, all tied to one live cash ledger that keeps the balance exact.",
      stack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
      link: "https://github.com/irazaahmed/hafeez-communication",
      live: "https://hafeez-communication.vercel.app/",
      visual: "store",
    },
    {
      title: "AR Bank Limited Banking Management System",
      category: "Full-Stack Web App",
      description:
        "A full-stack banking simulator: instant peer-to-peer transfers, live transaction history, and an admin panel tracking every account and rupee in the system, backed by a real Postgres database.",
      stack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
      link: "https://github.com/irazaahmed/bank-management-system",
      live: "https://ar-bank-management-system.vercel.app/",
      visual: "bank",
    },
    {
      title: "LinkedIn Autonomous Agent",
      category: "AI Agent",
      description:
        "Autonomous Playwright agent that reacts and comments on LinkedIn posts using an LLM, with built-in relevance filtering.",
      stack: ["Playwright", "Python", "Groq"],
      link: "https://github.com/irazaahmed/linkedin-autonomous-agent",
      live: "https://raw.githubusercontent.com/irazaahmed/linkedin-autonomous-agent/main/demo/agent_demo.webm",
      visual: "dashboard",
    },
    {
      title: "Physical AI & Humanoid Robotics",
      category: "AI / ML",
      description:
        "Intelligent control and real-time decision-making applied to robotic systems, where AI reasoning meets the physical world.",
      stack: ["Python", "AI/ML", "Robotics"],
      link: "https://github.com/irazaahmed/physical-ai-humanoid-robotics",
      live: "https://physical-ai-humanoid-robotics-ar.netlify.app/",
      visual: "graph",
    },
    {
      title: "Nike E-Commerce Platform",
      category: "Web Development",
      description:
        "Full storefront with product management, cart, and checkout flow.",
      stack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind"],
      link: "https://github.com/irazaahmed/NextJSQ2-hackathon",
      live: "https://nike-ecommerce-project.vercel.app/",
      visual: "store",
    },
    {
      title: "Saylani Impact Portal",
      category: "Web Development",
      description:
        "Dashboard platform tracking and visualizing social impact metrics.",
      stack: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://github.com/irazaahmed/saylami-impact-portal",
      live: "https://impact-portal-saylani.netlify.app/",
      visual: "dashboard",
    },
    {
      title: "InfoNest Blogs",
      category: "Blog Platform",
      description:
        "Blog platform where I write and publish my own articles, with a clean, fast reading experience.",
      stack: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/irazaahmed/InfoNest-Blogs",
      live: "https://infonest-blogs.vercel.app/",
      visual: "blog",
    },
  ],
};

export const about = {
  heading: "About Cybrum Solutions",
  body: [
    "Cybrum Solutions is an AI-native company based in Karachi, Pakistan, founded and led by Ahmed Raza, an AI Solutions Expert. We build intelligent automation, AI agents, chatbots, and web systems for businesses that want to move faster with less manual work, locally and worldwide.",
    "One founder directing an agentic AI workforce, delivering team-level output with direct and accountable ownership from architecture to deployment.",
  ],
  nameStory: {
    heading: 'Why "Cybrum"?',
    formula: "Cyber + um = Cybrum",
    paragraphs: [
      'The name Cybrum is built from "Cyber" joined with the suffix "-um", the same ending found in words like quantum, spectrum, and forum.',
      "That suffix turns a word into a single, foundational element. Cybrum names exactly that: the core building block of the intelligent digital world.",
      "For your business, Cybrum Solutions is that element. The substance that turns scattered tools, tasks, and processes into one intelligent system that runs on its own.",
    ],
    closing: "Cybrum Solutions: one element, every solution.",
  },
} as const;

export const contentHub = {
  heading: "Insights",
  intro:
    "Practical breakdowns of how AI agents, automation, and real systems are built. No theory, only execution.",
  ctaLabel: "Read on LinkedIn",
} as const;

export const contactSection = {
  heading: "Let's build something that actually works.",
  sub: "Tell us about the workflow you want automated or the AI system you want built. You get a free audit with a clear, honest answer on what is worth building and how.",
  formNote: "Tell us what you need. Serious inquiries get a free AI audit, usually a reply within 24 hours.",
  auditHeading: "Your free AI audit includes:",
  auditIncludes: [
    "A map of your current workflow: what takes time, what repeats, what breaks",
    "A shortlist of automation and AI agent opportunities, ranked by impact",
    "An honest build-or-not recommendation with rough cost and timeline",
  ],
} as const;

export type FaqItem = { question: string; answer: string };

/**
 * Homepage FAQ. Doubles as FAQPage structured data, so keep answers
 * plain-text, honest, and keyword-rich without stuffing.
 */
export const faq: { heading: string; intro: string; items: FaqItem[] } = {
  heading: "Frequently Asked Questions",
  intro:
    "Straight answers about AI automation, agents, chatbots, cost, and timelines.",
  items: [
    {
      question: "What is the difference between an AI agent and a chatbot?",
      answer:
        "A chatbot answers questions in a conversation. An AI agent goes further: it reasons about a goal, uses tools, and completes real tasks like updating systems, sending emails, or processing orders. Most businesses that ask for a chatbot actually need an agent that does the work, not just talks about it.",
    },
    {
      question: "How much does AI automation or an AI agent cost?",
      answer:
        "It depends on scope. A single automated workflow is usually a few hundred dollars. Custom chatbots and assistants typically run into the low thousands. Multi-agent systems that handle complete business processes are quoted per project. The free AI audit gives you an exact scope and price before any commitment.",
    },
    {
      question: "How long does it take to build and deploy?",
      answer:
        "A focused automation workflow usually ships in 1 to 2 weeks. A custom chatbot or assistant takes 2 to 4 weeks. Larger multi-agent systems run 4 to 8 weeks depending on integrations. You see working progress during the build, not just at the end.",
    },
    {
      question: "Which tools and platforms does Cybrum Solutions build with?",
      answer:
        "Claude API, LangGraph, CrewAI, and n8n for agents and automation, plus Next.js and Python for web systems and backends. Every build uses the stack that fits your workflow, and you own all of the code and infrastructure.",
    },
    {
      question: "What is included in the free AI audit?",
      answer:
        "A map of your current workflow, a shortlist of automation and AI opportunities ranked by impact, and an honest recommendation on what is worth building with rough cost and timeline. If automation is not the right answer for your case, the audit says so.",
    },
    {
      question: "Do you work with businesses in Karachi and across Pakistan?",
      answer:
        "Yes. Cybrum Solutions is based in Karachi and works with businesses across Pakistan, on WhatsApp, on call, or in person for local clients. The free AI audit is the same for everyone: we map your workflow and give an honest answer on what is worth automating.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Yes. Cybrum Solutions is based in Karachi, Pakistan, and serves clients worldwide. Everything is delivered remotely with direct communication over WhatsApp, LinkedIn, or email, and systems are deployed into your own environment and accounts.",
    },
  ],
};

/**
 * Honest trust signals shown before Contact. No invented clients or numbers;
 * each point is defensible and reinforces the one-accountable-builder model.
 */
export const proof: { heading: string; items: Differentiator[] } = {
  heading: "What working with us looks like",
  items: [
    {
      title: "Direct line to the builder",
      description:
        "You talk to the person building your system. No account managers, no handoffs, no lost context.",
    },
    {
      title: "Proven in production",
      description:
        "The systems behind this site run real work, including a translation management platform coordinating 33 languages in daily use.",
    },
    {
      title: "You own everything",
      description:
        "Code, infrastructure, accounts, and documentation are handed over fully. No lock-in, no dependency on us to keep running.",
    },
  ],
};

export type Testimonial = {
  /** Client's words. May be English or Roman Urdu (mixed on purpose: real
   *  local and organizational clients). */
  quote: string;
  /** Display name, or a title when the client is referenced by role only. */
  name: string;
  /** Role plus organization, shown muted under the name. */
  role: string;
  /** What we built for them, shown as a small chip on the card. */
  project: string;
  /** Avatar initials. */
  initials: string;
};

/**
 * Real client testimonials from delivered projects. Honest by design: every
 * quote maps to a system actually built and running (see the Work section).
 */
export const testimonials: { heading: string; intro: string; items: Testimonial[] } = {
  heading: "Trusted by the people we build for",
  intro:
    "Real systems, delivered to real clients and still running. Here is what they had to say.",
  items: [
    {
      quote:
        "We needed one system to coordinate Quran translation across dozens of languages, something our teams could actually work in every day. Ahmed built exactly that. The translation management system brought order to a process that used to be scattered across files and people, and it has run reliably ever since.",
      name: "Director, Translation Department",
      role: "Dawat-e-Islami",
      project: "Translation Management System",
      initials: "DI",
    },
    {
      quote:
        "Lodhi Brothers Housing Society ke liye humein aisa system chahiye tha jo hamare saare clients ek jagah sambhal sake. Ahmed ne pura client management system bana kar diya jo aaj 350 se zyada clients handle karta hai. Record dhoondhna, follow up, sab kuch ab minutes ka kaam hai. Bilkul professional aur waqt par delivery.",
      name: "Obaidullah",
      role: "Builder, Lodhi Brothers Housing Society",
      project: "Client Management System",
      initials: "OB",
    },
    {
      quote:
        "Ahmed built our website end to end and made the whole process effortless. It is fast, clean, and represents Softwavez exactly the way we wanted. Communication stayed clear throughout and everything was delivered on time. Highly recommended.",
      name: "Nada Khaleel",
      role: "CEO, Softwavez",
      project: "Website Development",
      initials: "NK",
    },
  ],
};
