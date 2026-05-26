import { normalizeWordPressSchema, type WordPressSeo } from "@/lib/wordpress";

export function WordPressSeoSchema({ seo }: { seo?: WordPressSeo | null }) {
  const schemas = normalizeWordPressSchema(seo?.schema);

  if (schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      ))}
    </>
  );
}
