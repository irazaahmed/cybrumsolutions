"use client";

import { motion, useScroll, useTransform } from "motion/react";

/**
 * Fixed ambient backdrop behind every section: dotted grid plus blurred
 * accent glows that drift at different speeds as the page scrolls (parallax
 * on the wrapper, slow CSS float on the inner blob so both can run).
 */
export function AmbientBackdrop() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const y3 = useTransform(scrollYProgress, [0, 1], [120, -160]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-lines opacity-40" />

      {/* glows shrink and the third one drops out below sm so phones stay smooth */}
      <motion.div
        style={{ y: y1 }}
        className="absolute left-[-10%] top-1/4 h-[18rem] w-[18rem] sm:h-[32rem] sm:w-[32rem]"
      >
        <div className="animate-float-slow h-full w-full rounded-full bg-accent/8 blur-[90px] sm:blur-[140px]" />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-[-10%] h-[17rem] w-[17rem] sm:h-[30rem] sm:w-[30rem]"
      >
        <div className="animate-float-slower h-full w-full rounded-full bg-accent-dim/10 blur-[90px] sm:blur-[140px]" />
      </motion.div>

      {/* third, smaller glow crossing the middle for depth */}
      <motion.div
        style={{ y: y3 }}
        className="absolute left-1/2 top-1/2 hidden h-[22rem] w-[22rem] -translate-x-1/2 sm:block"
      >
        <div className="animate-float-slow h-full w-full rounded-full bg-accent/5 blur-[120px]" />
      </motion.div>
    </div>
  );
}
