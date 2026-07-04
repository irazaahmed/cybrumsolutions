import type { Metadata } from "next";
import { BlogNav } from "@/components/blog/BlogNav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-lines opacity-40" />
        <div className="glow-orb animate-float-slow absolute left-1/2 top-1/3 h-[20rem] w-[20rem] -translate-x-1/2 sm:h-[32rem] sm:w-[32rem] [--glow:color-mix(in_srgb,var(--color-accent)_15%,transparent)]" />
      </div>

      <BlogNav />

      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
        <Reveal>
          <p className="font-heading text-[6rem] font-semibold leading-none tracking-tight text-gradient sm:text-[9rem]">
            404
          </p>
          <h1 className="mt-4 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            This page does not exist
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
            The link may be outdated or mistyped. Everything we build is still
            here, start from the homepage or see our projects.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/">Back to Home</Button>
            <Button href="/work" variant="secondary">
              View Projects
            </Button>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
