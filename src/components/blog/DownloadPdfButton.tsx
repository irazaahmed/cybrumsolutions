"use client";

import { Download } from "lucide-react";

/**
 * Triggers the browser's print dialog. A dedicated print stylesheet
 * (globals.css, @media print) restyles the page into a premium, branded
 * blue-on-dark (or blue-on-white in light theme) PDF of just the article,
 * with a cover page and running header/footer. So "Save as PDF" yields a
 * fully designed document. Hidden from the printed output via `no-print`.
 */
export function DownloadPdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="Download this article as PDF"
      className="no-print inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-4 py-2 text-sm font-medium text-accent-bright transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_0_28px_-8px_var(--color-accent)]"
    >
      <Download size={15} aria-hidden />
      Download PDF
    </button>
  );
}
