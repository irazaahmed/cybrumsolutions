"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";

type Pref = "light" | "dark" | "system";

const STORAGE_KEY = "cybrum-theme";

/** Resolve a preference to a concrete theme and apply it to <html data-theme>. */
function applyResolved(pref: Pref) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = pref === "dark" || (pref === "system" && prefersDark);
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
}

function readPref(): Pref {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "light" || s === "dark" || s === "system") return s;
  } catch {
    /* ignore */
  }
  return "dark";
}

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

/**
 * Theme switcher with three choices: Light, Dark, System.
 * The active theme is applied before paint by the inline script in layout.tsx
 * (no flash). The trigger icon (sun/moon) is CSS-driven off the resolved
 * [data-theme]; the menu highlights the stored *preference* (incl. System).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [pref, setPref] = useState<Pref>("dark");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keep the resolved theme in sync with the OS while preference is "system".
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readPref() === "system") applyResolved("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close the menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleMenu = () => {
    if (!open) setPref(readPref()); // sync highlight to the real stored value
    setOpen((v) => !v);
  };

  const choose = (value: Pref) => {
    setPref(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    applyResolved(value);
    setOpen(false);
  };

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Change color theme"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Change color theme"
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-accent/60 hover:text-accent-bright ${className}`}
      >
        {/* Reflects the resolved appearance: Sun on light, Moon on dark */}
        <Sun size={18} className="theme-toggle-sun" />
        <Moon size={18} className="theme-toggle-moon" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Theme"
          className="absolute right-0 z-[60] mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card/95 p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          {OPTIONS.map(({ value, label, Icon }) => {
            const active = pref === value;
            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => choose(value)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent/15 text-accent-bright"
                    : "text-foreground hover:bg-surface"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
                {active && <Check size={14} className="ml-auto" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
