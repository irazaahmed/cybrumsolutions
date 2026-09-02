export type ChapterMeta = {
  slug: string;
  /** Position in the real PCAO-F/CCAO-F study guide order, per
   *  agentfactory.panaversity.org/docs/certifications/pcao-f — not just
   *  the order we happened to write pages in. */
  num: string;
  title: string;
  sub: string;
  tag: string;
  /** Approx. reading time shown on the index card. Only meaningful when
   *  `live` is true. */
  readTime: string;
  /** Which official Anthropic exam this chapter's content maps to, per
   *  agentfactory.panaversity.org/docs/certifications. */
  examCode: string;
  /** Whether `[slug]/page.tsx` actually exists yet. Non-live entries render
   *  as locked "coming soon" cards on the index instead of links, so the
   *  full 9-course roadmap is visible before every chapter is written. */
  live: boolean;
};

/** The full PCAO-F study guide, in its real order (per the certifications
 *  page's "Study Guide" table). Add a matching `[slug]/page.tsx` and flip
 *  `live` to true whenever a new one gets written. */
export const chapters: ChapterMeta[] = [
  {
    slug: "what-ai-actually-is",
    num: "01",
    title: "What AI Actually Is",
    sub: "What Claude is and is not",
    tag: "Foundations",
    readTime: "",
    examCode: "CCAO-F",
    live: false,
  },
  {
    slug: "ai-fluency",
    num: "02",
    title: "AI Fluency, The 4Ds",
    sub: "Delegation, Description, Discernment, Diligence — AI ke saath kaam karne ka insaan wala skill",
    tag: "Foundations",
    readTime: "25-30 min",
    examCode: "CCAO-F",
    live: true,
  },
  {
    slug: "ai-prompting-2026",
    num: "03",
    title: "AI Prompting in 2026",
    sub: "Getting useful output",
    tag: "Foundations",
    readTime: "",
    examCode: "CCAO-F",
    live: false,
  },
  {
    slug: "claude-chatgpt-101",
    num: "04",
    title: "Claude Aur ChatGPT 101",
    sub: "9 concepts, 2 cockpits — Claude aur ChatGPT ke workspace ko bharosay se chalana",
    tag: "Foundations",
    readTime: "30-35 min",
    examCode: "CCAO-F",
    live: true,
  },
  {
    slug: "skills-connectors",
    num: "05",
    title: "Skills & Connectors",
    sub: "Extending Claude with skills and connectors",
    tag: "Foundations",
    readTime: "",
    examCode: "CCAO-F",
    live: false,
  },
  {
    slug: "general-agents-web",
    num: "06",
    title: "General Agents on the Web",
    sub: "Cowork in a browser",
    tag: "Foundations",
    readTime: "",
    examCode: "CCAO-F",
    live: false,
  },
  {
    slug: "workflow-design-diagnosis",
    num: "07",
    title: "Workflow Design & Diagnosis",
    sub: "Fitting AI into a workflow, and fixing it",
    tag: "Foundations",
    readTime: "",
    examCode: "CCAO-F",
    live: false,
  },
  {
    slug: "governance-risk-responsible-use",
    num: "08",
    title: "Governance, Risk & Responsible Use",
    sub: "What is allowed, and who it affects",
    tag: "Foundations",
    readTime: "",
    examCode: "CCAO-F",
    live: false,
  },
  {
    slug: "code-you-never-write",
    num: "09",
    title: "Code You Never Write",
    sub: "What is buildable without an engineer, and when to hand work to one",
    tag: "Foundations",
    readTime: "",
    examCode: "CCAO-F",
    live: false,
  },
];

/** Chapters that actually have a page, in study-guide order. Use this for
 *  prev/next nav so it always points at another real page. */
export const liveChapters = chapters.filter((c) => c.live);

export function getPrevLiveChapter(slug: string): ChapterMeta | undefined {
  const i = liveChapters.findIndex((c) => c.slug === slug);
  return i > 0 ? liveChapters[i - 1] : undefined;
}

export function getNextLiveChapter(slug: string): ChapterMeta | undefined {
  const i = liveChapters.findIndex((c) => c.slug === slug);
  return i >= 0 && i < liveChapters.length - 1 ? liveChapters[i + 1] : undefined;
}
