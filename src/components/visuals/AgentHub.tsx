"use client";

import { motion } from "motion/react";
import { Core3D } from "@/components/visuals/Core3D";

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
 * Hero centerpiece: a real WebGL 3D core (glowing sphere, wireframe shells,
 * orbit rings, particles) with capability chips rotating around it in HTML.
 * Communicates AI orchestration at a glance.
 */
export function AgentHub() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md select-none">
      {/* WebGL core */}
      <Core3D className="absolute inset-0 h-full w-full" />

      {/* faint outer orbit guide for the chips */}
      <div className="absolute inset-0 m-auto h-[92%] w-[92%] rounded-full border border-border/40" />

      {/* rotating outer ring with capability chips */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {orbit.map((node, idx) => {
          const angle = (idx / orbit.length) * Math.PI * 2;
          const radius = 46; // % from center
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

      {/* center label floating over the 3D core */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="px-2 text-center font-heading text-[11px] font-semibold uppercase leading-tight tracking-wide text-white [text-shadow:0_1px_12px_rgba(10,13,20,0.9)] sm:text-xs">
          AI Native
          <br />
          Company
        </span>
      </div>
    </div>
  );
}
