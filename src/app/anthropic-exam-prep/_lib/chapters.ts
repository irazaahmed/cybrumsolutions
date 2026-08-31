export type ChapterMeta = {
  slug: string;
  num: string;
  title: string;
  sub: string;
  tag: string;
  /** Approx. reading time shown on the index card. */
  readTime: string;
};

/** Registry of every chapter on /anthropic-exam-prep. Add a new entry here
 *  (and a matching `[slug]/page.tsx`) whenever a new topic is organized. */
export const chapters: ChapterMeta[] = [
  {
    slug: "ai-fluency-4ds",
    num: "01",
    title: "AI Fluency, The 4Ds",
    sub: "Delegation, Description, Discernment, Diligence — AI ke saath kaam karne ka insaan wala skill",
    tag: "Foundations",
    readTime: "25-30 min",
  },
];
