import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The Cybrum Solutions mark, theme-aware.
 *   - dark theme  -> blue + white  (logo-dark-theme.png)
 *   - light theme -> blue + black  (logo-light-theme.png)
 * Both variants are rendered and swapped purely via CSS off [data-theme]
 * (see globals.css), so there is no theme-state flash on load.
 */
export function Logo({
  className = "",
  size = 36,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  const common = `object-contain ${className}`;
  return (
    <>
      <Image
        src="/logo-dark-theme.png"
        alt={`${site.name} logo`}
        width={size}
        height={size}
        priority={priority}
        className={`logo-dark-asset ${common}`}
      />
      <Image
        src="/logo-light-theme.png"
        alt={`${site.name} logo`}
        width={size}
        height={size}
        priority={priority}
        className={`logo-light-asset ${common}`}
      />
    </>
  );
}
