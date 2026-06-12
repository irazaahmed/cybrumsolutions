import type { ReactNode } from "react";
import { DividerDraw } from "@/components/visuals/DividerDraw";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds a gradient divider line that draws itself in on scroll. */
  divider?: boolean;
};

export function Section({ id, children, className = "", divider = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      {divider && <DividerDraw />}
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
