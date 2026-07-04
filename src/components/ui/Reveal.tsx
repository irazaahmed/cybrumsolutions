"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical offset the element rises from. */
  y?: number;
  /** Horizontal offset for directional slide-ins (negative = from left). */
  x?: number;
  /** Adds a subtle 3D flip-up (rotateX) to the entrance. */
  tilt?: boolean;
  className?: string;
};

/* Opacity + transform only: both run on the compositor. An animated blur()
   filter here re-rasterizes every revealing section each frame, which crawls
   on integrated GPUs (sections stayed blurred for seconds on mid-range
   laptops), so it was removed deliberately. */
const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fades and rises its children into view on scroll, optionally sliding in
 * from a side (x) or flipping up in 3D (tilt). Animates once.
 * Respects reduced-motion via the global CSS rule.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  tilt = false,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {
          opacity: 0,
          y,
          x,
          rotateX: tilt ? 14 : 0,
          transformPerspective: 900,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          rotateX: 0,
          transformPerspective: 900,
        },
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export { variants as revealVariants };
