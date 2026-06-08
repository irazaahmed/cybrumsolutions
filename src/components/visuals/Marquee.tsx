import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee. Children are duplicated so the loop is seamless;
 * edges fade out via a mask.
 */
export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div
      className="group relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-12 group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
