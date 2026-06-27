"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { TocItem } from "@/lib/blog";

type TocLang = "en" | "ro" | "ur";

const LABEL: Record<TocLang, string> = {
  en: "On this page",
  ro: "Is safhe par",
  ur: "اس صفحے پر",
};

/**
 * On-page table of contents for a blog article. Renders a sticky sidebar on
 * wide screens and a collapsible accordion on smaller ones, highlighting the
 * heading currently in view. Purely a navigation aid: no-print, no SEO impact.
 */
export function BlogToc({ items, lang }: { items: TocItem[]; lang: TocLang }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const isUrdu = lang === "ur";

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        // Keep the last active heading when nothing is in the band, so the
        // marker never flickers back to empty mid-scroll.
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -68% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const linkClass = (item: TocItem) =>
    [
      "block border-l py-1 text-sm leading-snug transition-colors",
      item.level === 3 ? (isUrdu ? "pr-6 pl-3" : "pl-6") : isUrdu ? "pr-3" : "pl-3",
      active === item.id
        ? "border-accent text-accent-bright"
        : "border-border text-muted hover:text-foreground",
    ].join(" ");

  const links = (
    <nav dir={isUrdu ? "rtl" : "ltr"} className={isUrdu ? "border-r border-l-0" : ""}>
      <ul className={`flex flex-col gap-0.5 ${isUrdu ? "border-r-0" : ""}`}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              className={linkClass(item)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="no-print" dir={isUrdu ? "rtl" : "ltr"}>
      {/* Desktop: sticky sidebar floating beside the centered reading column. */}
      <aside className="fixed top-32 hidden max-h-[64vh] w-52 overflow-y-auto xl:block xl:left-[calc(50%_+_25rem)]">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <List size={13} />
          {LABEL[lang]}
        </p>
        {links}
      </aside>

      {/* Mobile / tablet: collapsible accordion above the article. */}
      <details className="group mb-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm xl:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3.5 text-sm font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
          <List size={15} className="text-accent-bright" />
          {LABEL[lang]}
        </summary>
        <div className="px-5 pb-4">{links}</div>
      </details>
    </div>
  );
}
