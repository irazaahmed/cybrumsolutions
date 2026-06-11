import Link from "next/link";
import { contact, navLinks, site } from "@/lib/site";
import { servicePages } from "@/lib/services";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
              <Logo className="h-9 w-9" />
              <span className="text-lg font-semibold tracking-tight font-heading">
                {site.shortName}
                <span className="text-accent"> Solutions</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              An AI-native company building intelligent automation, AI agents, and
              web systems that run real business workflows. Based in Pakistan,
              serving clients worldwide.
            </p>
          </div>

          {/* Services */}
          <nav className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Services
            </span>
            {servicePages.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {s.name}
              </Link>
            ))}
          </nav>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Explore
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`/${link.href}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/blog"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </nav>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Connect
            </span>
            <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-foreground">
              WhatsApp
            </a>
            <a href={contact.linkedinCompany} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href={`mailto:${contact.email}`} className="text-sm text-muted transition-colors hover:text-foreground">
              Email
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Built end to end by {site.founder}. {site.tagline}.
          </p>
        </div>
      </div>
    </footer>
  );
}
