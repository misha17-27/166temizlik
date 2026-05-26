import type { WordPressContentItem } from "@/lib/wordpress";
import { WordPressSeoSchema } from "./WordPressSeoSchema";

export function WordPressPageContent({ page }: { page?: WordPressContentItem | null }) {
  if (!page?.content?.trim()) {
    return null;
  }

  return (
    <>
      <WordPressSeoSchema seo={page.seo} />
      <section className="bg-white py-10">
        <div className="container-shell">
          <div
            className="wp-content rounded-[10px] bg-white text-[17px] leading-[1.8] text-black/75"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </>
  );
}
