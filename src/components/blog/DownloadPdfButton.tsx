"use client";

import { useEffect } from "react";
import { Download } from "lucide-react";

/** Snapshot the live (screen) theme onto `data-print-theme` so the PDF palette
 *  is locked to what the user sees. Without this, print emulation flips
 *  `prefers-color-scheme` to light, and the "system" theme listener would
 *  switch `data-theme` to light mid-print, so a dark screen printed light. */
function lockPrintTheme() {
  const t = document.documentElement.getAttribute("data-theme") || "dark";
  document.documentElement.setAttribute("data-print-theme", t);
}

/**
 * Triggers the browser's print dialog. A dedicated print stylesheet
 * (globals.css, @media print) restyles the page into a premium, branded
 * blue-on-dark (or blue-on-white in light theme) PDF of just the article,
 * with a cover page, running header/footer, and a founder page. So
 * "Save as PDF" yields a fully designed document. Hidden via `no-print`.
 */
export function DownloadPdfButton() {
  // Also cover Ctrl+P (not just the button) and clean up afterwards.
  useEffect(() => {
    const onAfter = () =>
      document.documentElement.removeAttribute("data-print-theme");
    window.addEventListener("beforeprint", lockPrintTheme);
    window.addEventListener("afterprint", onAfter);
    return () => {
      window.removeEventListener("beforeprint", lockPrintTheme);
      window.removeEventListener("afterprint", onAfter);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        lockPrintTheme();
        window.print();
      }}
      aria-label="Download this article as PDF"
      className="no-print inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-4 py-2 text-sm font-medium text-accent-bright transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_0_28px_-8px_var(--color-accent)]"
    >
      <Download size={15} aria-hidden />
      Download PDF
    </button>
  );
}
