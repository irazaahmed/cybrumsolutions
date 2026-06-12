"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Branded error boundary so a runtime failure never shows an unstyled crash. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-5 py-24 text-center text-foreground sm:px-8">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-lines opacity-40" />
        <div className="absolute left-1/2 top-1/3 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[90px] sm:h-[30rem] sm:w-[30rem] sm:blur-[130px]" />
      </div>

      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent-bright">
        Something went wrong
      </p>
      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        An unexpected error occurred
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
        This was on our side, not yours. Try again, or head back to the
        homepage.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button as="button" onClick={reset}>
          <RefreshCw size={16} />
          Try Again
        </Button>
        <Button href="/" variant="secondary">
          Back to Home
        </Button>
      </div>
    </main>
  );
}
