"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RotatingWords } from "@/components/ui/RotatingWords";
import { NeuralBackground } from "@/components/visuals/NeuralBackground";
import { Aurora } from "@/components/visuals/Aurora";
import { AgentHub } from "@/components/visuals/AgentHub";
import { Marquee } from "@/components/visuals/Marquee";
import { hero, trustStrip } from "@/lib/content";
import { primaryCta, secondaryCta } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/* Headline split into chunks so each word rises in on its own beat.
   The shimmer phrase animates as one unit to keep its gradient intact. */
const headlineLead = ["AI", "agents", "and", "automation", "that"];
const headlineTail = ["not", "just", "the", "demo."];

function Word({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  // No blur filter and short stagger: the headline is the LCP element, so it
  // must reach full opacity fast (Google ignores paints while transparent).
  return (
    <motion.span
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease, delay: 0.05 + index * 0.035 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* gentle parallax: copy and visual drift apart + fade as the hero scrolls away */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden bg-grid-lines px-5 pt-28 pb-10 sm:px-8"
    >
      {/* Layered animated background */}
      <NeuralBackground className="absolute inset-0 h-full w-full opacity-70" />
      <Aurora />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--color-background)_88%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <motion.div
          style={{ y: copyY, opacity: fade }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent-bright backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-bright" />
            </span>
            {hero.eyebrow}
          </motion.span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {headlineLead.map((word, i) => (
              <Fragment key={word + i}>
                <Word index={i}>{word}</Word>{" "}
              </Fragment>
            ))}
            <Word index={headlineLead.length}>
              <span className="text-shimmer">do the work</span>,
            </Word>{" "}
            {headlineTail.map((word, i) => (
              <Fragment key={word + i}>
                <Word index={headlineLead.length + 1 + i}>{word}</Word>
                {i < headlineTail.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h1>

          {/* Rotating capability line */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="mt-5 flex items-center gap-2 font-heading text-lg font-medium text-muted sm:text-xl"
          >
            <span>We build</span>
            <RotatingWords
              words={["automation pipelines", "AI agents", "custom chatbots", "web systems"]}
              className="font-semibold"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.62 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {hero.sub}
          </motion.p>

          {/* CTAs with the region line centered under the button group */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.7 }}
            className="mt-9 flex w-fit flex-col items-center gap-3"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Button href={primaryCta.href} className="btn-sheen">
                  {primaryCta.label}
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </Button>
              </Magnetic>
            </div>
            <p className="mt-3 text-center text-sm text-muted/80">
              Serving businesses in Pakistan and worldwide.
            </p>
          </motion.div>
        </motion.div>

        {/* AI core visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="mx-auto w-full max-w-[17rem] sm:max-w-sm lg:max-w-md"
        >
          <motion.div style={{ y: visualY, scale: visualScale, opacity: fade }}>
            <AgentHub />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 1.1 }}
        className="relative mx-auto mb-6 hidden lg:block"
        aria-hidden
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-border/80 p-1.5">
          <span className="scroll-hint-dot block h-1.5 w-1 rounded-full bg-accent-bright" />
        </span>
      </motion.div>

      {/* Tech marquee in normal flow at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
        className="relative mx-auto w-full max-w-6xl"
      >
        <p className="mb-4 text-center text-xs uppercase tracking-[0.18em] text-muted">
          {trustStrip.label}
        </p>
        <Marquee>
          {trustStrip.tools.map((tool) => (
            <span
              key={tool}
              className="flex items-center gap-2 text-base font-medium text-muted/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              {tool}
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
