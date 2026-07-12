import { Navbar } from "@/components/layout/Navbar";

/**
 * Kept as an alias so every subpage that imported BlogNav renders the shared
 * route-based Navbar. The old minimal "back to home" header is retired: all
 * pages now carry the full site navigation for consistency and internal links.
 */
export function BlogNav() {
  return <Navbar />;
}
