export const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL ?? "https://admin.166temizlik.az/wp-json/headless/v1";

export type WordPressLocale = "az" | "ru" | "tr";

export type WordPressImage = {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
  sizes?: Record<string, string>;
};

export type WordPressTranslation = {
  language: WordPressLocale | string;
  id: number;
  slug: string;
  link: string;
};

export type WordPressSeo = {
  title?: string;
  description?: string;
  canonical?: string;
};

export type WordPressContentItem = {
  id: number;
  type: string;
  slug: string;
  language: WordPressLocale | string;
  translations: WordPressTranslation[];
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

export type WordPressCollection<T> = {
  items: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

type WordPressFetchOptions = {
  lang?: WordPressLocale;
  searchParams?: Record<string, string | number | boolean | undefined>;
  tags?: string[];
  revalidate?: number;
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

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: options.revalidate ?? 300,
      tags,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status} ${response.statusText} (${url.pathname})`);
  }

  return (await response.json()) as T;
}

export function getWordPressSettings(lang: WordPressLocale = "az") {
  return wpFetch<Record<string, unknown>>("/settings", {
    lang,
    tags: ["wordpress:settings"],
  });
}

export function getWordPressPages(lang: WordPressLocale = "az", page = 1, perPage = 20) {
  return wpFetch<WordPressCollection<WordPressContentItem>>("/pages", {
    lang,
    searchParams: { page, per_page: perPage },
    tags: ["wordpress:pages"],
  });
}

export function getWordPressPage(slug: string, lang: WordPressLocale = "az") {
  return wpFetch<WordPressContentItem>(`/pages/${slug}`, {
    lang,
    tags: ["wordpress:pages", `wordpress:page:${slug}`],
  });
}

export function getWordPressServices(lang: WordPressLocale = "az") {
  return wpFetch<WordPressContentItem[]>("/services", {
    lang,
    tags: ["wordpress:services"],
  });
}

export function getWordPressService(slug: string, lang: WordPressLocale = "az") {
  return wpFetch<WordPressContentItem>(`/services/${slug}`, {
    lang,
    tags: ["wordpress:services", `wordpress:service:${slug}`],
  });
}

export function getWordPressPosts(lang: WordPressLocale = "az", page = 1, perPage = 20) {
  return wpFetch<WordPressCollection<WordPressContentItem>>("/posts", {
    lang,
    searchParams: { page, per_page: perPage },
    tags: ["wordpress:posts"],
  });
}

export function getWordPressPost(slug: string, lang: WordPressLocale = "az") {
  return wpFetch<WordPressContentItem>(`/posts/${slug}`, {
    lang,
    tags: ["wordpress:posts", `wordpress:post:${slug}`],
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
  return wpFetch<WordPressContentItem[]>("/employees", {
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

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getWordPressImageUrl(item: WordPressContentItem) {
  return item.featuredImage?.url ?? "";
}
