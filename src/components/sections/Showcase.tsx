"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";

/**
 * Company promo video shown as its own cinematic section right after the hero.
 * A branded poster cover (logo + play button) sits over the <video> until the
 * viewer clicks, so the 5.9MB file never downloads on page load: the element
 * uses preload="none" and only fetches once play is requested.
 */
export function Showcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    // Reveal the element first, then start playback on the next frame.
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <Section id="intro" divider>
      <SectionHeading
        eyebrow="Company Intro"
        title={
          <>
            See Cybrum <span className="text-shimmer">in action</span>
          </>
        }
        intro="A quick look at who we are and what we build. AI agents, automation, chatbots, and web systems, delivered end to end."
      />

      <Reveal delay={0.1} tilt className="mt-12 sm:mt-16">
        <div className="relative mx-auto w-full max-w-4xl">
          {/* Soft accent glow bleeding out from behind the frame */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-accent/15 blur-2xl sm:-inset-6"
          />

          <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_90px_-35px_rgba(0,0,0,0.75)] transition-colors duration-500 hover:border-accent/50 sm:rounded-3xl">
            <video
              ref={videoRef}
              src="/cs-promo.mp4"
              controls={playing}
              playsInline
              preload="none"
              onEnded={() => setPlaying(false)}
              className={`h-full w-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Branded poster cover (click anywhere to play) */}
            {!playing && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Play the Cybrum Solutions intro video"
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-grid-lines bg-gradient-to-br from-surface via-background to-surface"
              >
                {/* center radial accent wash */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-accent)_18%,transparent),transparent_65%)]"
                />

                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 backdrop-blur-sm sm:h-14 sm:w-14">
                  <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
                </span>

                {/* Play button with a pulsing ring */}
                <span className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_40px_-6px_var(--color-accent)] transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-bright sm:h-20 sm:w-20">
                    <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
                  </span>
                </span>

                <span className="relative flex flex-col items-center gap-1">
                  <span className="text-base font-semibold text-foreground sm:text-lg">
                    Watch our intro
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-muted">
                    27 seconds
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
