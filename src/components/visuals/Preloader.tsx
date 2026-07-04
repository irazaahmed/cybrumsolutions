"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

/** Minimum time the splash stays visible so the animation reads, not blinks. */
const MIN_VISIBLE_MS = 1000;
/** Hard cap: never hold the page hostage waiting on slow assets (promo video). */
const MAX_WAIT_MS = 3500;
/** Matches the CSS fade-out duration on .preloader */
const EXIT_MS = 650;

/**
 * Brand splash shown on initial page load: the theme-aware Cybrum mark in the
 * center with an orbiting loading arc. Server-rendered, so it covers the page
 * from the very first paint; fades out once the page has loaded (or after the
 * hard cap), respecting a minimum visible time.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    // Once per session: the inline head script already hid the splash via
    // CSS for repeat visits, so just unmount it right away and skip the flag
    // bookkeeping. First visit marks the session so later navigations skip.
    try {
      if (sessionStorage.getItem("cybrum-splash")) {
        const skip = window.setTimeout(() => setPhase("done"), 0);
        return () => window.clearTimeout(skip);
      }
      sessionStorage.setItem("cybrum-splash", "1");
    } catch {
      /* storage blocked: fall through and show the splash normally */
    }

    const start = performance.now();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const minVisible = reduceMotion ? 300 : MIN_VISIBLE_MS;
    let leaveTimer: number | undefined;
    let doneTimer: number | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, minVisible - (performance.now() - start));
      leaveTimer = window.setTimeout(() => {
        setPhase("leaving");
        doneTimer = window.setTimeout(() => setPhase("done"), EXIT_MS);
      }, wait);
    };

    const capTimer = window.setTimeout(finish, MAX_WAIT_MS);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(capTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  // Keep the page from scrolling behind the splash.
  useEffect(() => {
    if (phase !== "loading") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader ${phase === "leaving" ? "preloader-leave" : ""}`}
      role="status"
      aria-label="Cybrum Solutions is loading"
    >
      <div className="preloader-stage">
        <span className="preloader-ring" aria-hidden="true" />
        <span className="preloader-ring preloader-ring-outer" aria-hidden="true" />
        <div className="preloader-logo">
          <Logo size={72} priority />
        </div>
      </div>
      <p className="preloader-word">
        CYBRUM<span className="preloader-word-sub"> SOLUTIONS</span>
      </p>
    </div>
  );
}
