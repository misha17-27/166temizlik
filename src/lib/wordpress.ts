import type { Metadata } from "next";

export const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL ?? "https://admin.166temizlik.az/wp-json/headless/v1";
export const PUBLIC_SITE_URL =
  (process.env.PUBLIC_SITE_URL ?? "https://166temizlik.az").replace(/\/$/, "");
const WORDPRESS_REVALIDATE_SECONDS = 60;

export type WordPressLocale = "az" | "ru" | "tr";

export type WordPressImage = {
  id: number | string;
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
  sizes?: Record<string, string>;
};

export type WordPressTranslation = {
  language?: WordPressLocale | string;
  id: number;
  slug: string;
  link: string;
};

export type WordPressSeo = {
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
  schema?: unknown;
  robots?: {
    index?: boolean | null;
    follow?: boolean | null;
    advanced?: string[] | null;
  } | null;
  openGraph?: {
    title?: string | null;
    description?: string | null;
    image?: string | null;
  } | null;
  twitter?: {
    title?: string | null;
    description?: string | null;
    image?: string | null;
  } | null;
};

export type WordPressContentItem = {
  id: number;
  type: string;
  slug: string;
  language: WordPressLocale | string;
  translations: WordPressTranslation[] | Record<string, WordPressTranslation>;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: WordPressImage | null;
  acf: Record<string, unknown>;
  seo: WordPressSeo;
  link: string;
  date: string;
  modified: string;
};

export type WordPressPartner = {
  id: number | string;
  title: string;
  url: string;
  logo: WordPressImage | null;
};

export type WordPressCollection<T> = {
  items: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

export type WordPressListResponse<T> = {
  lang: WordPressLocale | string;
  items: T[];
};

export type WordPressHomeResponse = {
  lang: WordPressLocale | string;
  page: WordPressContentItem | null;
  acf: Record<string, unknown>;
  mappedAcf: Record<string, unknown>;
};

export type WordPressSettingsImage = string | WordPressImage | null;

export type WordPressSettings = {
  lang: WordPressLocale | string;
  siteName: string;
  description: string;
  homeUrl: string;
  logo?: WordPressSettingsImage;
  logoDark?: WordPressSettingsImage;
  favicon?: WordPressSettingsImage;
  phonePrimary: string | null;
  phoneSecondary: string | null;
  email: string | null;
  address: string | null;
  locationUrl?: string | null;
  social: {
    facebook: string | null;
    instagram: string | null;
    whatsapp: string | null;
    youtube: string | null;
  };
  acf: Record<string, unknown>;
};

type WordPressFetchOptions = {
  lang?: WordPressLocale;
  searchParams?: Record<string, string | number | boolean | undefined>;
  tags?: string[];
  revalidate?: number;
  cache?: RequestCache;
};

function createWordPressUrl(path: string, options: WordPressFetchOptions = {}) {
  const base = WORDPRESS_API_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (options.lang) {
    url.searchParams.set("lang", options.lang);
  }

  Object.entries(options.searchParams ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

export async function wpFetch<T>(path: string, options: WordPressFetchOptions = {}) {
  const url = createWordPressUrl(path, options);
  const tags = ["wordpress", ...(options.lang ? [`wordpress:${options.lang}`] : []), ...(options.tags ?? [])];
  const requestOptions: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    headers: {
      Accept: "application/json",
    },
  };

  if (options.cache) {
    requestOptions.cache = options.cache;
  } else {
    requestOptions.next = {
      revalidate: options.revalidate ?? WORDPRESS_REVALIDATE_SECONDS,
      tags,
    };
  }

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status} ${response.statusText} (${url.pathname})`);
  }

  return (await response.json()) as T;
}

export function getWordPressSettings(lang: WordPressLocale = "az") {
  return wpFetch<WordPressSettings>("/settings", {
    lang,
    tags: ["wordpress:settings"],
  });
}

export function getWordPressPage(slug: string, lang: WordPressLocale = "az") {
  return wpFetch<WordPressContentItem>(`/pages/${slug}`, {
    lang,
    tags: ["wordpress:pages", `wordpress:page:${slug}`],
  });
}

export function getWordPressPages(lang: WordPressLocale = "az", page = 1, perPage = 100) {
  return wpFetch<WordPressCollection<WordPressContentItem>>("/pages", {
    lang,
    searchParams: { page, per_page: perPage },
    tags: ["wordpress:pages"],
  });
}

export function getWordPressHome(lang: WordPressLocale = "az") {
  return wpFetch<WordPressHomeResponse>("/home", {
    lang,
    tags: ["wordpress:pages", "wordpress:page:home"],
  });
}

export function getWordPressServices(lang: WordPressLocale = "az") {
  return wpFetch<WordPressCollection<WordPressContentItem>>("/services", {
    lang,
    tags: ["wordpress:services"],
  });
}

export async function getWordPressService(slug: string, lang: WordPressLocale = "az") {
  try {
    return await wpFetch<WordPressContentItem>(`/services/${slug}`, {
      lang,
      tags: ["wordpress:services", `wordpress:service:${slug}`],
    });
  } catch (error) {
    const response = await getWordPressServices(lang);
    const item = response.items.find((service) => service.slug === slug || getWordPressCanonicalSlug(service) === slug);

    if (item) {
      return item;
    }

    throw error;
  }
}

export function getWordPressPosts(
  lang: WordPressLocale = "az",
  page = 1,
  perPage = 20,
  options: Pick<WordPressFetchOptions, "cache" | "revalidate"> = {},
) {
  return wpFetch<WordPressCollection<WordPressContentItem>>("/posts", {
    lang,
    searchParams: { page, per_page: perPage },
    tags: ["wordpress:posts"],
    ...options,
  });
}

export function getWordPressPost(
  slug: string,
  lang: WordPressLocale = "az",
  options: Pick<WordPressFetchOptions, "cache" | "revalidate"> = {},
) {
  return wpFetch<WordPressContentItem>(`/posts/${slug}`, {
    lang,
    tags: ["wordpress:posts", `wordpress:post:${slug}`],
    ...options,
  });
}

export function getWordPressVacancies(lang: WordPressLocale = "az", page = 1, perPage = 20) {
  return wpFetch<WordPressCollection<WordPressContentItem>>("/vacancies", {
    lang,
    searchParams: { page, per_page: perPage },
    tags: ["wordpress:vacancies"],
  });
}

export function getWordPressVacancy(slug: string, lang: WordPressLocale = "az") {
  return wpFetch<WordPressContentItem>(`/vacancies/${slug}`, {
    lang,
    tags: ["wordpress:vacancies", `wordpress:vacancy:${slug}`],
  });
}

export function getWordPressEmployees(lang: WordPressLocale = "az") {
  return wpFetch<WordPressCollection<WordPressContentItem>>("/employees", {
    lang,
    tags: ["wordpress:employees"],
  });
}

export function getWordPressGallery(lang: WordPressLocale = "az") {
  return wpFetch<Record<string, unknown>>("/gallery", {
    lang,
    tags: ["wordpress:gallery"],
  });
}

export function getWordPressPartners(lang: WordPressLocale = "az") {
  return wpFetch<WordPressListResponse<WordPressPartner> | WordPressPartner[]>("/partners", {
    lang,
    tags: ["wordpress:partners"],
  });
}

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getWordPressImageUrl(item: WordPressContentItem) {
  return item.featuredImage?.url ?? "";
}

export function getWordPressCanonicalSlug(item: Pick<WordPressContentItem, "slug" | "translations">) {
  if (!Array.isArray(item.translations)) {
    return item.translations.az?.slug || item.slug;
  }

  return item.translations.find((translation) => translation.language === "az")?.slug || item.slug;
}

export function getWordPressTranslationSlugs(
  item: Pick<WordPressContentItem, "slug" | "language" | "translations">,
) {
  const slugs: Partial<Record<WordPressLocale, string>> = {};

  if (Array.isArray(item.translations)) {
    item.translations.forEach((translation) => {
      if (
        (translation.language === "az" || translation.language === "ru" || translation.language === "tr") &&
        translation.slug
      ) {
        slugs[translation.language] = translation.slug;
      }
    });
  } else {
    const translations = item.translations;

    (["az", "ru", "tr"] as WordPressLocale[]).forEach((locale) => {
      if (translations[locale]?.slug) {
        slugs[locale] = translations[locale].slug;
      }
    });
  }

  if ((item.language === "az" || item.language === "ru" || item.language === "tr") && !slugs[item.language]) {
    slugs[item.language] = item.slug;
  }

  return slugs;
}

function cleanSeoValue(value: string | null | undefined) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function normalizePublicSiteUrl(value: string | undefined) {
  return value?.replace(/https?:\/\/admin\.166temizlik\.az/gi, PUBLIC_SITE_URL);
}

function parseRobotsNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function buildRobotsMetadata(robots: WordPressSeo["robots"]): Metadata["robots"] | undefined {
  if (!robots) {
    return undefined;
  }

  const metadataRobots: Record<string, boolean | number | string> = {};

  if (typeof robots.index === "boolean") {
    metadataRobots.index = robots.index;
  }

  if (typeof robots.follow === "boolean") {
    metadataRobots.follow = robots.follow;
  }

  robots.advanced?.forEach((directive) => {
    const normalized = directive.trim().toLowerCase();

    if (!normalized) {
      return;
    }

    if (normalized === "noarchive" || normalized === "noimageindex" || normalized === "nositelinkssearchbox") {
      metadataRobots[normalized] = true;
      return;
    }

    if (normalized === "notranslate") {
      metadataRobots.notranslate = true;
      return;
    }

    if (normalized.startsWith("max-snippet:")) {
      const value = parseRobotsNumber(normalized.slice("max-snippet:".length));

      if (value !== undefined) {
        metadataRobots["max-snippet"] = value;
      }

      return;
    }

    if (normalized.startsWith("max-video-preview:")) {
      const value = parseRobotsNumber(normalized.slice("max-video-preview:".length));

      if (value !== undefined) {
        metadataRobots["max-video-preview"] = value;
      }

      return;
    }

    if (normalized.startsWith("max-image-preview:")) {
      const value = normalized.slice("max-image-preview:".length);

      if (value === "none" || value === "standard" || value === "large") {
        metadataRobots["max-image-preview"] = value;
      }
    }
  });

  return Object.keys(metadataRobots).length > 0 ? (metadataRobots as Metadata["robots"]) : undefined;
}

export function buildWordPressMetadata(
  seo: WordPressSeo | null | undefined,
  fallback: { title?: string; description?: string } = {},
): Metadata {
  const title = cleanSeoValue(seo?.title) ?? cleanSeoValue(fallback.title);
  const description = cleanSeoValue(seo?.description) ?? cleanSeoValue(fallback.description);
  const canonical = normalizePublicSiteUrl(cleanSeoValue(seo?.canonical));
  const openGraphTitle = cleanSeoValue(seo?.openGraph?.title);
  const openGraphDescription = cleanSeoValue(seo?.openGraph?.description);
  const openGraphImage = normalizePublicSiteUrl(cleanSeoValue(seo?.openGraph?.image));
  const twitterTitle = cleanSeoValue(seo?.twitter?.title);
  const twitterDescription = cleanSeoValue(seo?.twitter?.description);
  const twitterImage = normalizePublicSiteUrl(cleanSeoValue(seo?.twitter?.image));
  const robots = buildRobotsMetadata(seo?.robots);

  const metadata: Metadata = {};

  if (title) {
    metadata.title = title;
  }

  if (description) {
    metadata.description = description;
  }

  if (canonical) {
    metadata.alternates = { canonical };
  }

  if (openGraphTitle || openGraphDescription || openGraphImage) {
    metadata.openGraph = {
      ...(openGraphTitle ? { title: openGraphTitle } : {}),
      ...(openGraphDescription ? { description: openGraphDescription } : {}),
      ...(openGraphImage ? { images: [openGraphImage] } : {}),
    };
  }

  if (twitterTitle || twitterDescription || twitterImage) {
    metadata.twitter = {
      ...(twitterTitle ? { title: twitterTitle } : {}),
      ...(twitterDescription ? { description: twitterDescription } : {}),
      ...(twitterImage ? { images: [twitterImage] } : {}),
    };
  }

  if (robots) {
    metadata.robots = robots;
  }

  return metadata;
}

export function normalizeWordPressSchema(schema: unknown): string[] {
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
        return normalizePublicSiteUrl(item.trim()) || null;
      }

      return normalizePublicSiteUrl(JSON.stringify(item));
    })
    .filter((item): item is string => Boolean(item));
}

export async function getWordPressPageMetadata(
  slug: string,
  lang: WordPressLocale = "az",
  fallback: { title?: string; description?: string } = {},
) {
  const page = await getWordPressPage(slug, lang).catch(() => null);
  return buildWordPressMetadata(page?.seo, fallback);
}
