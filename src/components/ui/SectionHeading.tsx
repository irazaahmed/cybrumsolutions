import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-bright shadow-[0_0_24px_-10px_var(--color-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]" />
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {intro && (
        <p className={`max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${isCenter ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
