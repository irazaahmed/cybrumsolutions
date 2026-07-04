"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Animates the leading number of a stat value (e.g. "33", "8+ yrs", "1")
 * from 0 to its target when scrolled into view. Non-numeric prefix/suffix
 * (like "+ yrs") render unchanged. Falls back to the static value for
 * reduced-motion users.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const match = value.match(/^(\d+)([\s\S]*)$/);
  const hasNumber = match !== null;
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  // Starts at the real target so server HTML (crawlers, JS-off readers) shows
  // the true stat, never a placeholder 0. The count-up plays once in view.
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!inView || !hasNumber) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep the static value

    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      /* easeOutCubic so the count settles softly */
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, hasNumber, target]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
