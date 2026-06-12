"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Section header with a staggered scroll entrance: the eyebrow pill pops in,
 * then the title and intro rise out of a blur one after the other.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      className={`flex flex-col gap-5 ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      {eyebrow && (
        <motion.span
          variants={pop}
          className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright shadow-[0_0_24px_-10px_var(--color-accent)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={rise}
        className="max-w-3xl text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          variants={rise}
          className={`max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${isCenter ? "mx-auto" : ""}`}
        >
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
