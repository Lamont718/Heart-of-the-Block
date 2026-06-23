/**
 * Renders a schema.org JSON-LD <script> tag for rich search results.
 * Pass any schema.org object; it is serialized as-is. First-party data only.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is first-party and built from our own data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
