"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import type { SkillSummary } from "@/lib/skills";
import { SkillCard } from "./SkillCard";

type Props = {
  skills: SkillSummary[];
  categories: string[];
};

/**
 * Client-side browser for the skills grid: debounced Fuse.js fuzzy search over
 * title/description/tags plus category filter pills. Operates entirely on the
 * dataset passed in from the server, so there is no refetch per keystroke.
 */
export function SkillsBrowser({ skills, categories }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Debounce the raw input so filtering runs at most ~5x/second while typing.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query.trim()), 200);
    return () => clearTimeout(id);
  }, [query]);

  const fuse = useMemo(
    () =>
      new Fuse(skills, {
        keys: ["title", "description", "tags"],
        threshold: 0.38,
        ignoreLocation: true,
      }),
    [skills],
  );

  const results = useMemo(() => {
    const base = debouncedQuery
      ? fuse.search(debouncedQuery).map((r) => r.item)
      : skills;
    return activeCategory
      ? base.filter((s) => s.category === activeCategory)
      : base;
  }, [debouncedQuery, activeCategory, fuse, skills]);

  // No skills exist at all yet.
  if (skills.length === 0) {
    return (
      <div className="mt-16 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
        <p className="font-heading text-xl font-semibold tracking-tight">
          Skills coming soon
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          We are packaging up our AI and Claude Code skills into downloadable
          files. Check back shortly, or reach out if there is one you want first.
        </p>
      </div>
    );
  }

  const pillBase =
    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";
  const pillActive = "border-accent bg-accent/10 text-accent-bright";
  const pillIdle =
    "border-border bg-surface/60 text-muted hover:border-accent/50 hover:text-foreground";

  return (
    <div className="mt-12">
      {/* Search */}
      <div className="relative max-w-xl">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills by name, description, or tag..."
          aria-label="Search skills"
          className="h-12 w-full rounded-full border border-border bg-surface/60 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/40"
        />
      </div>

      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`${pillBase} ${activeCategory === null ? pillActive : pillIdle}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              className={`${pillBase} ${activeCategory === c ? pillActive : pillIdle}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {results.length === 0 ? (
        <p className="mt-14 text-muted">
          No skills match your search. Try a different term or category.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
