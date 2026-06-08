import type { ComponentProps, ReactNode } from "react";

type CardProps = ComponentProps<"div"> & {
  children: ReactNode;
  /** Adds the accent hover treatment (lift + blue border glow). */
  interactive?: boolean;
};

export function Card({
  children,
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  const hover = interactive
    ? "transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_8px_40px_-12px_var(--color-accent)]"
    : "";
  return (
    <div
      className={`rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm sm:p-8 ${hover} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
