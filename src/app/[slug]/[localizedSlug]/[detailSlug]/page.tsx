import { notFound } from "next/navigation";
import { BlogPostContent } from "@/app/[slug]/page";
import { VacancyDetailContent } from "@/app/vakansiya/[vacancySlug]/page";
import { getBlogPostHref, isLocale, resolveLocalizedSlug } from "@/lib/routes";
import { staticPageCopy } from "@/lib/static-page-copy";
import { buildWordPressMetadata, getWordPressPost, getWordPressVacancy, stripHtml } from "@/lib/wordpress";

type PageParams = {
  slug: string;
  localizedSlug: string;
  detailSlug: string;
};

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { slug: localeParam, localizedSlug, detailSlug } = await params;

  if (!isLocale(localeParam) || localeParam === "az") {
    return { title: "166 TÉ™mizlik" };
  }

  const match = resolveLocalizedSlug(localeParam, localizedSlug);

  if (match?.routeKey === "blog") {
    const post = await getWordPressPost(detailSlug, localeParam).catch(() => null);
    return buildWordPressMetadata(post?.seo, {
      title: post?.title ? `${post.title} - 166 TÉ™mizlik` : "166 TÉ™mizlik",
      description: post ? stripHtml(post.excerpt || post.content) : undefined,
      canonical: post ? getBlogPostHref(post.slug, localeParam) : undefined,
    });
  }

  if (match?.routeKey === "vacancy") {
    const vacancy = await getWordPressVacancy(detailSlug, localeParam).catch(() => null);
    return buildWordPressMetadata(vacancy?.seo, {
      title: vacancy?.title
        ? `${vacancy.title} - 166 TÉ™mizlik`
        : `${staticPageCopy[localeParam].vacancy.title} - 166 TÉ™mizlik`,
      description: vacancy ? stripHtml(vacancy.excerpt || vacancy.content) : undefined,
    });
  }

  return { title: "166 TÉ™mizlik" };
}

export default async function LocalizedDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug: localeParam, localizedSlug, detailSlug } = await params;

  if (!isLocale(localeParam) || localeParam === "az") {
    notFound();
  }

  const match = resolveLocalizedSlug(localeParam, localizedSlug);

  if (match?.routeKey === "blog") {
    return <BlogPostContent slug={detailSlug} locale={localeParam} />;
  }

  if (match?.routeKey === "vacancy") {
    return <VacancyDetailContent vacancySlug={detailSlug} locale={localeParam} />;
  }

  notFound();
}
