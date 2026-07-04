"use client";
import { useState, useEffect } from "react";

function relativeTime(isoOrDate: string): string {
  const then = new Date(isoOrDate).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;

  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  const w = Math.floor(d / 7);
  const mo = Math.floor(d / 30);
  const yr = Math.floor(d / 365);

  if (s < 60) return "just now";
  if (m < 60) return `${m} min ago`;
  if (h < 24) return `${h}h ago`;
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  if (w < 5) return `${w}w ago`;
  if (mo < 12) return `${mo}mo ago`;
  return `${yr}y ago`;
}

export function TimeAgo({ iso }: { iso: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setLabel(relativeTime(iso));
    // First paint via timeout (client-only value, so it must land after
    // hydration), then refresh every minute.
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [iso]);

  if (!label) return null;
  return <span className="tabular-nums">{label}</span>;
}
