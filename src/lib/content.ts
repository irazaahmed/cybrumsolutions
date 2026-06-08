/**
 * All website copy and structured content in one place.
 * Change wording here without touching component markup.
 */

export const hero = {
  eyebrow: "AI-Native Company",
  headline: "AI agents and automation that do the work, not just the demo.",
  sub: "Cybrum Solutions builds intelligent automation, AI agents, chatbots, and web systems that run real business workflows. Designed, built, and deployed end to end.",
} as const;

export const trustStrip = {
  label: "Built with the tools that power modern AI systems",
  tools: ["Claude API", "LangGraph", "CrewAI", "n8n", "Next.js", "Python"],
} as const;

export type Service = {
  id: string;
  title: string;
  description: string;
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
      primary: true,
    },
    {
      id: "chatbots",
      title: "Custom Chatbots & Assistants",
      description:
        "Domain-specific assistants with memory, tools, and real knowledge, built for your business, not generic wrappers.",
    },
    {
      id: "web",
      title: "Web Development",
      description:
        "Fast, modern websites and web apps built on Next.js. Clean, conversion-focused, and ready to scale.",
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

export type Project = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  link?: string;
};

/**
 * Curated capabilities showcase (Option A+B): strongest, most relevant projects only.
 * Framed as "What I've Built", not client case studies.
 */
export const work: { heading: string; intro: string; projects: Project[] } = {
  heading: "What I've Built",
  intro:
    "A selection of systems built across AI agents, automation, and web. Practical execution, not theory.",
  projects: [
    {
      title: "SMIT Virtual Assistant",
      category: "AI Agent",
      description:
        "Conversational AI assistant handling student queries through intent-based flows and LLM reasoning.",
      stack: ["Dialogflow", "Flowise AI", "Node.js"],
      link: "https://github.com/irazaahmed/AI-Hackathon",
    },
    {
      title: "Quran Translation Management System",
      category: "AI System",
      description:
        "End-to-end management platform coordinating Quranic content translation across 33 languages.",
      stack: ["Next.js", "Supabase", "Vercel"],
      link: "https://github.com/irazaahmed/quranic-translation-management-system",
    },
    {
      title: "Physical AI & Humanoid Robotics",
      category: "AI / ML",
      description:
        "Exploration of intelligent control and decision-making in robotic systems.",
      stack: ["Python", "AI/ML", "Robotics"],
      link: "https://github.com/irazaahmed/physical-ai-humanoid-robotics",
    },
    {
      title: "Nike E-Commerce Platform",
      category: "Web Development",
      description:
        "Full storefront with product management, cart, and checkout flow.",
      stack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind"],
      link: "https://github.com/irazaahmed/NextJSQ2-hackathon",
    },
    {
      title: "Saylani Impact Portal",
      category: "Web Development",
      description:
        "Dashboard platform tracking and visualizing social impact metrics.",
      stack: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://github.com/irazaahmed/saylami-impact-portal",
    },
  ],
};

export const about = {
  heading: "About Cybrum Solutions",
  body: [
    "Cybrum Solutions is an AI-native company founded and led by Ahmed Raza, an AI Solutions Expert. We build intelligent automation, AI agents, chatbots, and web systems for businesses that want to move faster with less manual work.",
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
    closing: "Cybrum Solutions: the core element of intelligent automation.",
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
  sub: "If you have a workflow that should be automated, or an AI system you want built properly, let's talk.",
  formNote: "Tell us what you need. Serious inquiries get a free AI audit.",
} as const;
