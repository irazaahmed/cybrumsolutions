"use client";

import { motion } from "motion/react";

const orbit = [
  { label: "Automation" },
  { label: "AI Agents" },
  { label: "Chatbots" },
  { label: "Web Dev" },
  { label: "Workflows" },
  { label: "Integrations" },
  { label: "n8n" },
  { label: "LLM Apps" },
];

/**
 * A glowing central "core" (the orchestrator) with capability nodes rotating
 * around it on two rings. Communicates AI orchestration at a glance.
 */
export function AgentHub() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md select-none">
      {/* pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute inset-0 m-auto h-40 w-40 rounded-full border border-accent/30"
          initial={{ scale: 0.6, opacity: 0.5 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.33, ease: "easeOut" }}
        />
      ))}

      {/* faint orbit guides */}
      <div className="absolute inset-0 m-auto h-[60%] w-[60%] rounded-full border border-border/60" />
      <div className="absolute inset-0 m-auto h-[92%] w-[92%] rounded-full border border-border/40" />

      {/* rotating outer ring with nodes */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {orbit.map((node, idx) => {
          const angle = (idx / orbit.length) * Math.PI * 2;
          const radius = 42; // % from center
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <motion.div
              key={node.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            >
              <span className="hidden items-center whitespace-nowrap rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-sm sm:inline-flex">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-bright align-middle" />
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* inner counter-rotating dots */}
      <motion.div
        className="absolute inset-0 m-auto h-[60%] w-[60%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = 50 + Math.cos(angle) * 50;
          const y = 50 + Math.sin(angle) * 50;
          return (
            <span
              key={i}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          );
        })}
      </motion.div>

      {/* core */}
      <div className="absolute inset-0 m-auto flex h-28 w-28 items-center justify-center rounded-full border border-accent/40 bg-gradient-to-b from-accent/30 to-accent-dim/10 backdrop-blur-md">
        <div className="absolute inset-0 m-auto h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
        <span className="relative px-2 text-center font-heading text-[11px] font-semibold uppercase leading-tight tracking-wide text-foreground sm:text-xs">
          AI Native
          <br />
          Company
        </span>
      </div>
    </div>
  );
}
