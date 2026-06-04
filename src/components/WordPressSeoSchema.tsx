import { normalizeWordPressSchema, type WordPressSeo } from "@/lib/wordpress";

export function WordPressSeoSchema({
  seo,
  canonical,
}: {
  seo?: WordPressSeo | null;
  canonical?: string;
}) {
  const schemas = normalizeWordPressSchema(seo?.schema, { source: seo?.canonical ?? undefined, target: canonical });

  if (schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema.replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
