/**
 * Soft animated aurora glows. Place inside a relatively-positioned container
 * with overflow-hidden. Purely decorative.
 */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* smaller blobs and lighter blur below sm: huge blur layers stall mobile GPUs */}
      <div className="animate-float-slow absolute -top-32 left-1/4 h-[20rem] w-[20rem] rounded-full bg-accent/20 blur-[80px] sm:h-[34rem] sm:w-[34rem] sm:blur-[130px]" />
      <div className="animate-float-slower absolute top-1/3 -right-24 h-[17rem] w-[17rem] rounded-full bg-accent-dim/25 blur-[80px] sm:h-[28rem] sm:w-[28rem] sm:blur-[130px]" />
      <div className="animate-float-slow absolute bottom-0 left-0 hidden h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[120px] sm:block" />
    </div>
  );
}
