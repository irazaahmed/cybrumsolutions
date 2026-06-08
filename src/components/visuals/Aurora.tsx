/**
 * Soft animated aurora glows. Place inside a relatively-positioned container
 * with overflow-hidden. Purely decorative.
 */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="animate-float-slow absolute -top-32 left-1/4 h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[130px]" />
      <div className="animate-float-slower absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent-dim/25 blur-[130px]" />
      <div className="animate-float-slow absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[120px]" />
    </div>
  );
}
