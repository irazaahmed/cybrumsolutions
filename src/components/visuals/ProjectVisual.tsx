import type { ProjectVisualKind } from "@/lib/content";

/**
 * Decorative, CSS-built preview header for a Work card. Honest by design:
 * stylized UI sketches instead of fake screenshots, one motif per project
 * kind (chat thread, translation pipeline, node graph, storefront, dashboard).
 */
export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  return (
    <div
      aria-hidden
      className="relative h-36 overflow-hidden border-b border-border bg-gradient-to-b from-accent/10 via-surface/40 to-transparent"
    >
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative flex h-full items-center justify-center px-6">
        {visuals[kind]}
      </div>
    </div>
  );
}

/* Shared bits */
function Bar({ w, strong = false }: { w: string; strong?: boolean }) {
  return (
    <span
      className={`block h-1.5 rounded-full ${strong ? "bg-accent/70" : "bg-foreground/15"}`}
      style={{ width: w }}
    />
  );
}

const visuals: Record<ProjectVisualKind, React.ReactNode> = {
  /* Chat thread: assistant + user bubbles with a typing indicator */
  chat: (
    <div className="flex w-full max-w-[14rem] flex-col gap-2">
      <div className="flex max-w-[80%] flex-col gap-1.5 self-start rounded-xl rounded-bl-sm border border-border bg-card/90 p-2.5">
        <Bar w="7rem" />
        <Bar w="4.5rem" />
      </div>
      <div className="flex max-w-[70%] flex-col gap-1.5 self-end rounded-xl rounded-br-sm bg-accent/80 p-2.5">
        <Bar w="5rem" strong={false} />
      </div>
      <div className="flex items-center gap-1 self-start rounded-xl rounded-bl-sm border border-border bg-card/90 px-2.5 py-2">
        <span className="pv-dot h-1 w-1 rounded-full bg-accent-bright" />
        <span className="pv-dot h-1 w-1 rounded-full bg-accent-bright [animation-delay:0.2s]" />
        <span className="pv-dot h-1 w-1 rounded-full bg-accent-bright [animation-delay:0.4s]" />
      </div>
    </div>
  ),

  /* Translation pipeline: language rows with progress bars */
  pipeline: (
    <div className="flex w-full max-w-[14rem] flex-col gap-2">
      {[
        { tag: "UR", w: "100%", delay: "0s" },
        { tag: "AR", w: "78%", delay: "0.18s" },
        { tag: "EN", w: "62%", delay: "0.36s" },
        { tag: "+30", w: "40%", delay: "0.54s" },
      ].map((row) => (
        <div key={row.tag} className="flex items-center gap-2.5">
          <span className="w-7 rounded-md border border-accent/30 bg-accent/10 px-1 py-0.5 text-center text-[9px] font-semibold text-accent-bright">
            {row.tag}
          </span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
            <span
              className="pv-fill block h-full rounded-full bg-accent/70"
              style={{ width: row.w, animationDelay: row.delay }}
            />
          </span>
        </div>
      ))}
    </div>
  ),

  /* Node graph: central core wired to surrounding nodes */
  graph: (
    <div className="relative h-24 w-full max-w-[12rem]">
      <svg viewBox="0 0 192 96" className="h-full w-full">
        {[
          [96, 48, 24, 16],
          [96, 48, 168, 16],
          [96, 48, 24, 80],
          [96, 48, 168, 80],
        ].map(([x1, y1, x2, y2]) => (
          <line
            key={`${x2}-${y2}`}
            className="pv-dash"
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--color-accent)"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        ))}
        {[
          [24, 16],
          [168, 16],
          [24, 80],
          [168, 80],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="var(--color-card)"
            stroke="var(--color-accent)"
            strokeOpacity="0.6"
          />
        ))}
        <circle className="pv-pulse [transform-origin:96px_48px]" cx="96" cy="48" r="11" fill="var(--color-accent)" fillOpacity="0.25" />
        <circle cx="96" cy="48" r="6" fill="var(--color-accent)" />
      </svg>
    </div>
  ),

  /* Storefront: product tiles with price bars and a cart pill */
  store: (
    <div className="flex w-full max-w-[14rem] flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-1.5 rounded-lg border border-border bg-card/90 p-2">
            <span className={`h-8 rounded-md ${i === 1 ? "bg-accent/40" : "bg-foreground/10"}`} />
            <Bar w="80%" />
            <Bar w="50%" strong />
          </div>
        ))}
      </div>
      <span className="pv-pulse self-end rounded-full bg-accent/80 px-3 py-1 text-[9px] font-semibold text-white">
        Checkout
      </span>
    </div>
  ),

  /* Profile: avatar, name lines, and skill chips (personal portfolio) */
  profile: (
    <div className="flex w-full max-w-[14rem] items-center gap-3.5">
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent/60 bg-gradient-to-b from-accent/30 to-accent/5">
        <span className="pv-pulse absolute inset-0 rounded-full border border-accent/40" />
        <span className="h-5 w-5 rounded-full bg-accent/70" />
        <span className="absolute bottom-1 left-1/2 h-2.5 w-7 -translate-x-1/2 rounded-t-full bg-accent/70" />
      </span>
      <div className="flex flex-1 flex-col gap-1.5">
        <Bar w="70%" strong />
        <Bar w="45%" />
        <div className="mt-1 flex gap-1.5">
          {["AI", "Web", "Auto"].map((chip) => (
            <span
              key={chip}
              className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold text-accent-bright"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  ),

  /* Blog: article list with a fresh-post badge */
  blog: (
    <div className="flex w-full max-w-[14rem] flex-col gap-2">
      <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card/90 p-2.5">
        <div className="flex items-center justify-between gap-2">
          <Bar w="7rem" strong />
          <span className="pv-pulse rounded-full bg-accent/80 px-2 py-0.5 text-[8px] font-semibold text-white">
            NEW
          </span>
        </div>
        <Bar w="100%" />
        <Bar w="72%" />
      </div>
      <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card/90 p-2.5">
        <Bar w="5.5rem" strong />
        <Bar w="86%" />
      </div>
    </div>
  ),

  /* Bank: balance card with a pulsing credit badge, plus a transfer row */
  bank: (
    <div className="flex w-full max-w-[14rem] flex-col gap-2.5">
      <div className="flex items-center justify-between rounded-lg border border-border bg-card/90 p-2.5">
        <div className="flex flex-col gap-1.5">
          <Bar w="4rem" />
          <Bar w="6rem" strong />
        </div>
        <span className="pv-pulse rounded-full bg-accent/80 px-2 py-0.5 text-[8px] font-semibold text-white">
          +Rs 1,000
        </span>
      </div>
      <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card/90 p-2.5">
        <span className="h-6 w-6 shrink-0 rounded-full bg-accent/30" />
        <svg viewBox="0 0 60 12" className="h-3 flex-1">
          <line
            className="pv-dash"
            x1="2"
            y1="6"
            x2="56"
            y2="6"
            stroke="var(--color-accent)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <polygon points="50,2 58,6 50,10" fill="var(--color-accent)" />
        </svg>
        <span className="h-6 w-6 shrink-0 rounded-full bg-accent/70" />
      </div>
    </div>
  ),

  /* Dashboard: stat chips and a rising bar chart */
  dashboard: (
    <div className="flex w-full max-w-[14rem] flex-col gap-2.5">
      <div className="flex gap-2">
        {["62%", "84%"].map((w, i) => (
          <div key={i} className="flex flex-1 flex-col gap-1.5 rounded-lg border border-border bg-card/90 p-2">
            <Bar w="60%" />
            <Bar w={w} strong />
          </div>
        ))}
      </div>
      <div className="flex h-12 items-end gap-1.5 rounded-lg border border-border bg-card/90 p-2">
        {[35, 55, 40, 70, 60, 90, 75].map((h, i) => (
          <span
            key={i}
            className={`pv-grow flex-1 rounded-sm ${i === 5 ? "bg-accent/80" : "bg-accent/30"}`}
            style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  ),
};
