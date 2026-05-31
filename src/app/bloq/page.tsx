import Image from "next/image";
import { BlogList } from "@/components/BlogList";
import { SitePage } from "@/components/SiteChrome";
import { WordPressSeoSchema } from "@/components/WordPressSeoSchema";
import { getLocalizedBlogPosts, pageHeroAssets } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";
import { getWordPressImageUrl, getWordPressPage, getWordPressPageMetadata, getWordPressPosts, stripHtml } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return getWordPressPageMetadata("bloq", "az", { title: "Bloq - 166 Təmizlik" });
}

function getPostTimestamp(date: string) {
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

async function getBlogCards(locale: Locale) {
  try {
    const response = await getWordPressPosts(locale, 1, 100, { cache: "no-store" });
    if (response.items.length > 0) {
      return [...response.items]
        .sort((left, right) => getPostTimestamp(right.date) - getPostTimestamp(left.date))
        .map((post) => ({
          slug: post.slug,
          title: post.title,
          image: getWordPressImageUrl(post) || pageHeroAssets.blog,
          excerpt: stripHtml(post.excerpt || post.content),
        }));
    }
  } catch {
    // Keep the frontend available if WordPress is temporarily unavailable.
  }

  return getLocalizedBlogPosts(locale);
}

export async function BlogPageContent({ locale = "az" }: { locale?: Locale }) {
  const copy = staticPageCopy[locale];
  const page = await getWordPressPage("bloq", locale).catch(() => null);
  const posts = await getBlogCards(locale);
  const title = page?.title || copy.blog.title;
  const heroImage = page?.featuredImage?.url || pageHeroAssets.blog;

  return (
    <SitePage active="about" locale={locale} currentSlug="blog">
      <WordPressSeoSchema seo={page?.seo} />
      <section className="bg-[#f5f5f5]">
        <div className="container-shell relative h-[395px] overflow-hidden max-md:h-[260px]">
          <Image src={heroImage} alt={page?.featuredImage?.alt || title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-[36px] font-bold leading-tight max-md:text-[30px]">{title}</h1>
            <p className="mt-2 text-[18px] font-semibold max-md:text-[15px]">{copy.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-8 pb-24">
        <BlogList posts={posts} readMore={copy.readMore} locale={locale} />
      </section>
    </SitePage>
  );
}

export default async function BlogPage() {
  return <BlogPageContent />;
}
