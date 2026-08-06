"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import { navLinks, site } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

/** Circular avatar: the student's uploaded picture, or their initial. */
function ProfileAvatar({ name, image }: { name?: string | null; image?: string | null }) {
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();
  return (
    <Link
      href="/academy/dashboard/profile"
      aria-label="Your profile"
      className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-accent/15 text-sm font-semibold text-accent-bright transition-colors hover:border-accent"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- small avatar served from our own route, no benefit from next/image optimization here
        <img src={image} alt="" className="h-full w-full object-cover" />
      ) : (
        initial
      )}
    </Link>
  );
}

/**
 * Shared site header. Every nav entry is a route (multi-page site), so the
 * active state comes from the pathname instead of a scrollspy.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // CS Academy is a sub-brand, not a separate site: same logo/theme, just a
  // different wordmark on its own routes (mirrors the "Cybrum Solutions"
  // treatment below, not a second Navbar component).
  const isAcademy = pathname.startsWith("/academy");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <Link href={isAcademy ? "/academy" : "/"} className="flex items-center gap-2.5">
          <Logo priority className="h-9 w-9" />
          <span className="text-lg font-semibold tracking-tight font-heading">
            {isAcademy ? (
              <>
                CS<span className="text-accent"> Academy</span>
              </>
            ) : (
              <>
                {site.shortName}
                <span className="text-accent"> Solutions</span>
              </>
            )}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`text-sm transition-colors hover:text-foreground ${
                    active ? "text-foreground" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-accent-bright shadow-[0_0_8px_var(--color-accent)]"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          {/* Theme switch (all sizes) */}
          <ThemeToggle />

          {/* Desktop auth slot: avatar once logged in, otherwise the same
              pill-button spot doubles as Login/Signup. */}
          {status === "authenticated" ? (
            <ProfileAvatar name={session.user?.name} image={session.user?.image} />
          ) : (
            <Link
              href="/academy/signup"
              className="btn-sheen hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)] lg:inline-flex"
            >
              Log in / Sign up
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto border-border bg-background/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[calc(100vh-4rem)] border-b" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-surface hover:text-foreground ${
                  isActive(link.href) ? "text-foreground" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              href={status === "authenticated" ? "/academy/dashboard/profile" : "/academy/signup"}
              onClick={() => setOpen(false)}
              className="block rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-white"
            >
              {status === "authenticated" ? "Your profile" : "Log in / Sign up"}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
