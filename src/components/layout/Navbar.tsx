"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { navLinks, primaryCta, site } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  // While smooth-scrolling to a clicked link, ignore the observer so the
  // underline lands on (and stays on) the link the user actually tapped.
  const lockUntil = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scrollspy: highlight the nav link of the section currently in view */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Click: light up the tapped link immediately and hold it through the
     smooth scroll, so even short sections (e.g. Reviews) underline reliably. */
  const onNavClick = (href: string) => {
    setActive(href);
    lockUntil.current = Date.now() + 900;
  };

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
        <a href="#top" className="flex items-center gap-2.5" aria-label={site.name}>
          <Logo priority className="h-9 w-9" />
          <span className="text-lg font-semibold tracking-tight font-heading">
            {site.shortName}
            <span className="text-accent"> Solutions</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={() => onNavClick(link.href)}
                  className={`text-sm transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
                {isActive && (
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

          {/* Desktop CTA */}
          <a
            href={primaryCta.href}
            className="btn-sheen hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)] lg:inline-flex"
          >
            {primaryCta.label}
          </a>

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
        className={`overflow-hidden border-border bg-background/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96 border-b" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => {
                  onNavClick(link.href);
                  setOpen(false);
                }}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={primaryCta.href}
              onClick={() => setOpen(false)}
              className="block rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-white"
            >
              {primaryCta.label}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
