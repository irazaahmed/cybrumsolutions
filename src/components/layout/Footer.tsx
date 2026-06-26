import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { contact, navLinks, site } from "@/lib/site";
import { servicePages } from "@/lib/services";
import { Logo } from "@/components/ui/Logo";
import { PhoneDisplay } from "@/components/ui/PhoneDisplay";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <Reveal y={18} className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
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
            <p className="mt-4 text-sm text-muted">{site.tagline}</p>

            {/* Contact + scannable WhatsApp QR */}
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-2">
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-accent"
                  aria-label="Chat on WhatsApp"
                >
                  <PhoneDisplay />
                </a>
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {contact.websiteLabel}
                </a>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white p-2"
                  aria-label="Scan to chat on WhatsApp"
                >
                  <QRCodeSVG
                    value={contact.whatsappLink}
                    size={96}
                    bgColor="#FFFFFF"
                    fgColor="#0B0E14"
                    level="M"
                  />
                </a>
                <span className="text-[11px] text-muted">Scan to chat on WhatsApp</span>
              </div>
            </div>

            {/* Social profiles */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cybrum Solutions on Facebook"
                className="text-accent transition-all duration-300 hover:text-accent-bright hover:scale-110"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cybrum Solutions on Instagram"
                className="text-accent transition-all duration-300 hover:text-accent-bright hover:scale-110"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
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
              href="/work"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              All Projects
            </Link>
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
        </Reveal>

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
