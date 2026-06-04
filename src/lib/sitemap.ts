import type { MetadataRoute } from "next";

import { getBlogPostHref, getLocalizedHref, getServiceHref, getStaticHref, getVacancyHref, locales, type Locale } from "./routes";
import {
  getWordPressPages,
  getWordPressPosts,
  getWordPressServices,
  getWordPressVacancies,
  PUBLIC_SITE_URL,
  type WordPressContentItem,
  type WordPressLocale,
} from "./wordpress";

type SitemapEntry = MetadataRoute.Sitemap[number];

const staticRouteKeys = [
  "home",
  "services",
  "about",
  "gallery",
  "contact",
  "blog",
  "equipment",
  "partners",
  "employees",
  "vacancy",
] as const;

const wordpressHomeSlugs = new Set(["ana-sehife", "glavnaya2"]);

function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalPath = normalizedPath === "/" ? normalizedPath : normalizedPath.replace(/\/+$/g, "");
  return `${PUBLIC_SITE_URL}${canonicalPath}`;
}

function itemLastModified(item: Pick<WordPressContentItem, "modified" | "date">) {
  const value = item.modified || item.date;
  const date = value ? new Date(value) : null;

  return date && Number.isFinite(date.getTime()) ? date : undefined;
}

function isIndexable(item: Pick<WordPressContentItem, "seo">) {
  return item.seo?.robots?.index !== false;
}

function isWordPressHomePage(item: Pick<WordPressContentItem, "slug">) {
  return wordpressHomeSlugs.has(item.slug);
}

function contentEntry(item: WordPressContentItem, path: string, priority: number): SitemapEntry | null {
  if (!isIndexable(item) || isWordPressHomePage(item)) {
    return null;
  }

  return {
    url: absoluteUrl(path),
    lastModified: itemLastModified(item),
    changeFrequency: "weekly",
    priority,
  };
}

function dedupeEntries(entries: Array<SitemapEntry | null>) {
  const byUrl = new Map<string, SitemapEntry>();

  entries.forEach((entry) => {
    if (!entry) {
      return;
    }

    const existing = byUrl.get(entry.url);
    if (!existing || Number(entry.lastModified ?? 0) > Number(existing.lastModified ?? 0)) {
      byUrl.set(entry.url, entry);
    }
  });

  return Array.from(byUrl.values()).sort((a, b) => a.url.localeCompare(b.url));
}

async function collectionItems<T extends WordPressContentItem>(
  loader: (locale: WordPressLocale) => Promise<{ items: T[] }>,
  locale: Locale,
) {
  const response = await loader(locale as WordPressLocale).catch(() => null);
  return response?.items ?? [];
}

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = locales.flatMap((locale) =>
    staticRouteKeys.map((routeKey) => ({
      url: absoluteUrl(getStaticHref(routeKey, locale)),
      changeFrequency: routeKey === "home" ? "daily" : "weekly",
      priority: routeKey === "home" ? 1 : 0.8,
    }) satisfies SitemapEntry),
  );

  const dynamicEntries = await Promise.all(
    locales.map(async (locale) => {
      const [pages, services, posts, vacancies] = await Promise.all([
        collectionItems(getWordPressPages, locale),
        collectionItems(getWordPressServices, locale),
        collectionItems((lang) => getWordPressPosts(lang, 1, 100), locale),
        collectionItems((lang) => getWordPressVacancies(lang, 1, 100), locale),
      ]);

      return [
        ...pages.map((item) => contentEntry(item, getLocalizedHref(locale, item.slug), 0.8)),
        ...services.map((item) => contentEntry(item, getServiceHref(item.slug, locale), 0.8)),
        ...posts.map((item) => contentEntry(item, getBlogPostHref(item.slug, locale), 0.7)),
        ...vacancies.map((item) => contentEntry(item, getVacancyHref(item.slug, locale), 0.6)),
      ];
    }),
  );

  return dedupeEntries([...staticEntries, ...dynamicEntries.flat()]);
}
