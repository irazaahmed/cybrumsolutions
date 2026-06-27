/**
 * Injects a JSON-LD structured-data block as a server-rendered
 * <script type="application/ld+json">. Centralizes the markup so individual
 * pages pass a plain schema object instead of repeating the script element.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
