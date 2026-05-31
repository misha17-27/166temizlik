import type { Metadata } from "next";
import type { Locale, StaticRouteKey } from "./routes";
import type { HeroSlide } from "./site-data";
import { buildWordPressMetadata, getWordPressHome, getWordPressPage, stripHtml, type WordPressContentItem } from "./wordpress";

const wordpressPageSlugs = {
  home: "home",
  services: "temizlik-xidmetleri",
  about: "sirket-haqqinda",
  gallery: "qalereya",
  blog: "bloq",
  equipment: "temizlik-xidmeti",
  partners: "partnyorlar",
  employees: "emekdaslarimiz",
  vacancy: "vakansiya",
  contact: "166-temizlik-elaqe",
} satisfies Partial<Record<StaticRouteKey, string>>;

export type StaticWordPressRouteKey = keyof typeof wordpressPageSlugs;

export function getWordPressPageSlug(routeKey: StaticRouteKey) {
  return wordpressPageSlugs[routeKey as StaticWordPressRouteKey] ?? null;
}

export async function getStaticWordPressPage(routeKey: StaticRouteKey, locale: Locale) {
  const slug = getWordPressPageSlug(routeKey);

  if (!slug) {
    return null;
  }

  try {
    if (routeKey === "home") {
      const response = await getWordPressHome(locale).catch(() => null);
      return response?.page ?? (await getWordPressPage("ana-sehife", locale));
    }

    return await getWordPressPage(slug, locale);
  } catch {
    return null;
  }
}

type MetadataPage = Pick<WordPressContentItem, "title" | "seo" | "featuredImage">;

export function buildWordPressPageMetadata(page: MetadataPage | null, fallbackTitle: string): Metadata {
  const title = page?.title || fallbackTitle;
  const metadata = buildWordPressMetadata(page?.seo, { title });
  const image = page?.featuredImage?.url
    ? [
        {
          url: page.featuredImage.url,
          alt: page.featuredImage.alt || page.title,
        },
      ]
    : undefined;

  if (page?.featuredImage?.url) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: metadata.openGraph?.images ?? image,
    };
    metadata.twitter = {
      ...metadata.twitter,
      images: metadata.twitter?.images ?? [page.featuredImage.url],
    };
  }

  return metadata;
}

export async function generateStaticWordPressPageMetadata(
  routeKey: StaticRouteKey,
  locale: Locale,
  fallbackTitle: string,
) {
  const page = await getStaticWordPressPage(routeKey, locale);
  return buildWordPressPageMetadata(page, fallbackTitle);
}

export function getWordPressHomeHeroSlides(
  page: Pick<WordPressContentItem, "title" | "featuredImage"> | null,
  fallbackSlides: HeroSlide[],
): HeroSlide[] {
  if (!page?.featuredImage?.url) {
    return fallbackSlides;
  }

  const fallback = fallbackSlides[0];

  return [
    {
      title: page.title,
      desktopImage: page.featuredImage.url,
      mobileImage: page.featuredImage.url,
      desktopBgColor: fallback?.desktopBgColor ?? "#0271C9",
      desktopWidth: page.featuredImage.width || fallback?.desktopWidth || 1200,
      desktopHeight: page.featuredImage.height || fallback?.desktopHeight || 500,
    },
    ...fallbackSlides,
  ];
}

export type WordPressEquipmentCard = {
  title: string;
  text: string;
  image: string;
};

export type WordPressMaterialCard = {
  title: string;
  text: string;
};

export type WordPressEquipmentPageContent = {
  title: string;
  heroImage: string;
  equipmentTitle: string;
  materialsTitle: string;
  equipmentCards: WordPressEquipmentCard[];
  materialCards: WordPressMaterialCard[];
};

type EquipmentPageSource = Pick<WordPressContentItem, "title" | "content" | "featuredImage">;

const htmlEntityMap: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": "\"",
  "&#039;": "'",
  "&ndash;": "-",
  "&mdash;": "-",
  "&#8211;": "-",
  "&#8212;": "-",
  "&#8217;": "'",
  "&#8220;": "\"",
  "&#8221;": "\"",
};

function decodeHtmlEntities(value: string) {
  return value.replace(
    /&(?:nbsp|amp|quot|ndash|mdash);|&#(?:039|8211|8212|8217|8220|8221);/g,
    (entity) => htmlEntityMap[entity] ?? entity,
  );
}

function toPlainText(value: string) {
  return stripHtml(decodeHtmlEntities(value)).trim();
}

function normalizeHeading(value: string) {
  return toPlainText(value)
    .toLowerCase()
    .replace(/[əә]/g, "e")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function extractImageUrls(html: string) {
  return Array.from(html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi), (match) => match[1])
    .filter(Boolean)
    .filter((url, index, urls) => urls.indexOf(url) === index);
}

type HtmlSection = {
  title: string;
  body: string;
};

function splitH2Sections(html: string): HtmlSection[] {
  const headings = Array.from(html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi));

  return headings.map((heading, index) => {
    const bodyStart = (heading.index ?? 0) + heading[0].length;
    const bodyEnd = headings[index + 1]?.index ?? html.length;

    return {
      title: toPlainText(heading[1]),
      body: html.slice(bodyStart, bodyEnd),
    };
  });
}

function isMaterialsHeading(value: string) {
  const heading = normalizeHeading(value);
  return (
    heading.includes("madde") ||
    heading.includes("material") ||
    heading.includes("malzeme") ||
    heading.includes("средств")
  );
}

function extractMaterialCards(html: string): WordPressMaterialCard[] {
  return Array.from(html.matchAll(/<p\b[^>]*>\s*<strong\b[^>]*>([\s\S]*?)<\/strong>([\s\S]*?)<\/p>/gi))
    .map((match) => {
      const title = toPlainText(match[1]);
      const text = toPlainText(match[2]).replace(/^[-–—:]+/, "").trim();
      return title && text ? { title, text } : null;
    })
    .filter((card): card is WordPressMaterialCard => Boolean(card));
}

export function getWordPressEquipmentPageContent(page: EquipmentPageSource | null): WordPressEquipmentPageContent | null {
  if (!page?.content?.trim()) {
    return null;
  }

  const sections = splitH2Sections(page.content);
  const materialsIndex = sections.findIndex((section) => isMaterialsHeading(section.title));
  const equipmentTitle = sections[0]?.title || page.title;
  const materialsTitle = materialsIndex >= 0 ? sections[materialsIndex].title : "";
  const equipmentSections = sections.slice(1, materialsIndex >= 0 ? materialsIndex : undefined);
  const equipmentHtml = equipmentSections.map((section) => section.body).join("\n");
  const equipmentImages = extractImageUrls(equipmentHtml);
  const equipmentCards = equipmentSections
    .map((section, index) => {
      const text = toPlainText(section.body);
      const image = extractImageUrls(section.body)[0] ?? equipmentImages[index] ?? "";
      return section.title && text && image ? { title: section.title, text, image } : null;
    })
    .filter((card): card is WordPressEquipmentCard => Boolean(card));
  const materialCards = materialsIndex >= 0 ? extractMaterialCards(sections.slice(materialsIndex).map((section) => section.body).join("\n")) : [];

  return {
    title: page.title,
    heroImage: page.featuredImage?.url ?? "",
    equipmentTitle,
    materialsTitle,
    equipmentCards,
    materialCards,
  };
}
