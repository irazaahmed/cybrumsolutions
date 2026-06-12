"use client";

import { motion } from "motion/react";

/**
 * Section divider that draws itself from the center outward when the
 * section scrolls into view, then keeps the slow panning glow.
 */
export function DividerDraw() {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="divider-animated absolute inset-x-0 top-0 mx-auto h-px max-w-5xl origin-center"
    />
  );
}
