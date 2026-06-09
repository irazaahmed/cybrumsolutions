import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

/**
 * Fixed header for the blog routes. Separate from the homepage scroll-spy
 * navbar, since blog pages are standalone routes, not in-page anchors.
 */
export function BlogNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={site.name}>
          <Logo priority className="h-9 w-9" />
          <span className="font-heading text-lg font-semibold tracking-tight">
            {site.shortName}
            <span className="text-accent"> Solutions</span>
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
