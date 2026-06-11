import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds a soft gradient divider line at the top of the section. */
  divider?: boolean;
};

export function Section({ id, children, className = "", divider = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      {divider && (
        <span
          aria-hidden
          className="divider-animated absolute inset-x-0 top-0 mx-auto h-px max-w-5xl"
        />
      )}
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
