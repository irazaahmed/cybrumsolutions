/**
 * Soft animated aurora glows. Place inside a relatively-positioned container
 * with overflow-hidden. Purely decorative. Radial-gradient orbs instead of
 * blur() filters so they cost nothing on weak GPUs (see .glow-orb).
 */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="glow-orb animate-float-slow absolute -top-32 left-1/4 h-[20rem] w-[20rem] sm:h-[34rem] sm:w-[34rem] [--glow:color-mix(in_srgb,var(--color-accent)_26%,transparent)]" />
      <div className="glow-orb animate-float-slower absolute top-1/3 -right-24 h-[17rem] w-[17rem] sm:h-[28rem] sm:w-[28rem] [--glow:color-mix(in_srgb,var(--color-accent-dim)_30%,transparent)]" />
      <div className="glow-orb animate-float-slow absolute bottom-0 left-0 hidden h-[26rem] w-[26rem] sm:block [--glow:color-mix(in_srgb,var(--color-accent)_20%,transparent)]" />
    </div>
  );
}
