"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Scroll-linked connector for the process steps: the accent line draws itself
 * across as the section scrolls into view, with a glowing head that leads
 * the sweep. Desktop only (the parent hides it below lg).
 */
export function ProcessBeam() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.35"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const headLeft = useTransform(progress, (v) => `${v * 100}%`);
  const headOpacity = useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative mx-auto h-px max-w-6xl">
      {/* faint track */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
      {/* drawing beam */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-0 origin-left bg-gradient-to-r from-transparent via-accent/70 to-accent-bright"
      />
      {/* glowing head */}
      <motion.span
        style={{ left: headLeft, opacity: headOpacity }}
        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright shadow-[0_0_14px_3px_var(--color-accent)]"
      />
    </div>
  );
}
