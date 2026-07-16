import Link from "next/link";
import { Languages } from "lucide-react";
import { LANG_LABEL, type Lang } from "@/lib/blog";

type Props = {
  slug: string;
  current: Lang;
  available: Lang[];
};

const ORDER: Lang[] = ["en", "ro", "ur"];

function hrefFor(slug: string, lang: Lang): string {
  return lang === "en" ? `/blogs/${slug}` : `/blogs/${slug}/${lang}`;
}

/** Language picker shown above each article. Languages without a translation
 *  file yet are rendered disabled ("coming soon"). Cybrum blue theme. */
export function LanguageSwitcher({ slug, current, available }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
        <Languages size={14} className="text-accent-bright" />
        <span>Read in</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {ORDER.map((lang) => {
          const isAvailable = available.includes(lang);
          const isActive = lang === current;
          const isUrdu = lang === "ur";
          const label = LANG_LABEL[lang];

          if (!isAvailable) {
            return (
              <span
                key={lang}
                aria-disabled="true"
                title="Translation coming soon"
                className={`cursor-not-allowed rounded-lg border border-border px-4 py-2 text-sm text-muted/50 ${
                  isUrdu ? "urdu-heading text-lg" : ""
                }`}
              >
                {label}
              </span>
            );
          }

          return (
            <Link
              key={lang}
              href={hrefFor(slug, lang)}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "border-accent bg-accent text-white shadow-[0_0_24px_-8px_var(--color-accent)]"
                  : "border-accent/40 text-accent-bright hover:bg-accent/10"
              } ${isUrdu ? "urdu-heading text-lg" : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
