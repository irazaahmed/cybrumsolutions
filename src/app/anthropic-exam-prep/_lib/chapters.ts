export type ChapterMeta = {
  slug: string;
  num: string;
  title: string;
  sub: string;
  tag: string;
  /** Approx. reading time shown on the index card. */
  readTime: string;
  /** Which official Anthropic exam this chapter's content maps to, per
   *  agentfactory.panaversity.org/docs/certifications. */
  examCode: string;
};

/** Registry of every chapter on /anthropic-exam-prep. Add a new entry here
 *  (and a matching `[slug]/page.tsx`) whenever a new topic is organized. */
export const chapters: ChapterMeta[] = [
  {
    slug: "ai-fluency",
    num: "01",
    title: "AI Fluency, The 4Ds",
    sub: "Delegation, Description, Discernment, Diligence — AI ke saath kaam karne ka insaan wala skill",
    tag: "Foundations",
    readTime: "25-30 min",
    examCode: "CCAO-F",
  },
];
