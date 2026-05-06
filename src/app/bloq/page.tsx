import { CardGrid, LightSection, PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { blogPosts } from "@/lib/pages-data";

export const metadata = {
  title: "Bloq - 166 Təmizlik",
};

export default function BlogPage() {
  return (
    <SitePage>
      <PageHero title="Bloq" subtitle="Təmizlik məsləhətləri, faydalı məlumatlar və 166 Təmizlik ekspertlərinin tövsiyələri." />
      <LightSection>
        <div className="container-shell">
          <CardGrid
            items={blogPosts.map((post) => ({
              title: post.title,
              text: `${post.date} · ${post.excerpt}`,
              image: post.image,
            }))}
          />
        </div>
      </LightSection>
    </SitePage>
  );
}
