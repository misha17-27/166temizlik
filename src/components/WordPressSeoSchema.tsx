import type { WordPressSeo } from "@/lib/wordpress";

function normalizeSchema(schema: unknown): string[] {
  if (!schema) {
    return [];
  }

  const schemas = Array.isArray(schema) ? schema : [schema];

  return schemas
    .map((item) => {
      if (!item) {
        return null;
      }

      if (typeof item === "string") {
        return item.trim() || null;
      }

      return JSON.stringify(item);
    })
    .filter((item): item is string => Boolean(item));
}

export function WordPressSeoSchema({ seo }: { seo?: WordPressSeo | null }) {
  const schemas = normalizeSchema(seo?.schema);

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
