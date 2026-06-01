export type Locale = "az" | "ru" | "tr";

export const locales = ["az", "ru", "tr"] as const;

export type StaticRouteKey =
  | "home"
  | "services"
  | "about"
  | "gallery"
  | "contact"
  | "blog"
  | "equipment"
  | "partners"
  | "employees"
  | "vacancy";

export type RouteKind = "static" | "service" | "blogPost" | "vacancyDetail";

export const localizedStaticRoutes: Record<StaticRouteKey, Record<Locale, string>> = {
  home: {
    az: "/",
    ru: "/ru/",
    tr: "/tr/",
  },
  services: {
    az: "/temizlik-xidmetleri/",
    ru: "/ru/uslugi-po-uborke/",
    tr: "/tr/temizlik-xidmetleri/",
  },
  about: {
    az: "/sirket-haqqinda/",
    ru: "/ru/o-kompanii/",
    tr: "/tr/sirket-haqqinda/",
  },
  gallery: {
    az: "/qalereya/",
    ru: "/ru/galereya/",
    tr: "/tr/qalereya/",
  },
  contact: {
    az: "/166-temizlik-elaqe/",
    ru: "/ru/166-kontaktnyj-nomer/",
    tr: "/tr/166-temizlik-elaqe/",
  },
  blog: {
    az: "/bloq/",
    ru: "/ru/bloq/",
    tr: "/tr/bloq/",
  },
  equipment: {
    az: "/temizlik-xidmeti/",
    ru: "/ru/oborudovanie-i-materialy/",
    tr: "/tr/temizlik-xidmeti/",
  },
  partners: {
    az: "/partnyorlar/",
    ru: "/ru/partnyory/",
    tr: "/tr/partnyorlar/",
  },
  employees: {
    az: "/emekdaslarimiz/",
    ru: "/ru/nashikollegi/",
    tr: "/tr/emekdaslarimiz/",
  },
  vacancy: {
    az: "/vakansiya/",
    ru: "/ru/vakansiya/",
    tr: "/tr/vakansiya/",
  },
};

export const localizedServiceSlugs: Record<string, Record<Locale, string>> = {
  "ev-temizliyi-xidmeti": {
    az: "ev-temizliyi-xidmeti",
    ru: "uborka-doma",
    tr: "ev-temizliyi-xidmeti",
  },
  "ofis-temizliyi": {
    az: "ofis-temizliyi",
    ru: "uborka-ofisa",
    tr: "ofis-temizliyi",
  },
  "bag-evlerinin-temizliyi": {
    az: "bag-evlerinin-temizliyi",
    ru: "uborka-zagorodnogo-doma",
    tr: "bag-evlerinin-temizliyi",
  },
  "erazi-temizliyi": {
    az: "erazi-temizliyi",
    ru: "uborka-territorii",
    tr: "erazi-temizliyi",
  },
  "fasad-temizliyi": {
    az: "fasad-temizliyi",
    ru: "ochistka-fasada",
    tr: "fasad-temizliyi",
  },
  "pencere-temizliyi": {
    az: "pencere-temizliyi",
    ru: "mojka-okon",
    tr: "pencere-temizliyi",
  },
  "cilciraq-temizliyi": {
    az: "cilciraq-temizliyi",
    ru: "chistka-lyustry",
    tr: "cilciraq-temizliyi",
  },
  "perde-yuma": {
    az: "perde-yuma",
    ru: "stirka-shtor-i-zhalyuzi",
    tr: "perde-yuma",
  },
  "yumsaq-mebel-temizlenmesi": {
    az: "yumsaq-mebel-temizlenmesi",
    ru: "chistka-obivki",
    tr: "yumsaq-mebel-temizlenmesi",
  },
  etirlendirme: {
    az: "etirlendirme",
    ru: "aromatizatsiya-pomeshheniya",
    tr: "etirlendirme",
  },
  "baximsiz-ev-temizliyi": {
    az: "baximsiz-ev-temizliyi",
    ru: "uborka-chistyj-dom",
    tr: "baximsiz-ev-temizliyi",
  },
  "yangindan-sonra-ev-temizliyi": {
    az: "yangindan-sonra-ev-temizliyi",
    ru: "uborka-doma-posle-pozhara",
    tr: "yangindan-sonra-ev-temizliyi",
  },
  "temir-sonrasi-temizlik": {
    az: "temir-sonrasi-temizlik",
    ru: "uborka-doma-posle-remonta",
    tr: "temir-sonrasi-temizlik",
  },
  "otel-temizlenmesi": {
    az: "otel-temizlenmesi",
    ru: "uborka-otelya",
    tr: "otel-temizlenmesi",
  },
  "restoran-temizlenmesi": {
    az: "restoran-temizlenmesi",
    ru: "uborka-restorana",
    tr: "restoran-temizlenmesi",
  },
  "kristallasdirma-xidmeti": {
    az: "kristallasdirma-xidmeti",
    ru: "sluzhba-kristallizatsii",
    tr: "kristallasdirma-xidmeti",
  },
  "hovuz-temizlenmesi-xidmeti": {
    az: "hovuz-temizlenmesi-xidmeti",
    ru: "uslugi-po-chistke-bassejna",
    tr: "hovuz-temizlenmesi-xidmeti",
  },
  "korporativ-temizlik-xidmeti": {
    az: "korporativ-temizlik-xidmeti",
    ru: "korporativ-temizlik-xidmeti",
    tr: "korporativ-temizlik-xidmeti",
  },
};

const staticSlugToRoute = new Map<string, StaticRouteKey>(
  Object.entries(localizedStaticRoutes).flatMap(([routeKey, byLocale]) =>
    Object.values(byLocale)
      .map(normalizePathToSlug)
      .filter(Boolean)
      .map((slug) => [slug, routeKey as StaticRouteKey]),
  ),
);

const serviceSlugToCanonical = new Map<string, string>(
  Object.entries(localizedServiceSlugs).flatMap(([canonicalSlug, byLocale]) =>
    Object.values(byLocale).map((slug) => [slug, canonicalSlug]),
  ),
);

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizePathToSlug(path: string) {
  return path
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/(ru|tr)\//, "/")
    .replace(/^\/|\/$/g, "");
}

export function getStaticHref(routeKey: StaticRouteKey, locale: Locale) {
  return localizedStaticRoutes[routeKey][locale];
}

export function getServiceHref(canonicalSlug: string, locale: Locale) {
  const localizedSlug = localizedServiceSlugs[canonicalSlug]?.[locale] ?? canonicalSlug;
  return locale === "az" ? `/${localizedSlug}/` : `/${locale}/${localizedSlug}/`;
}

export function getBlogPostHref(slug: string, locale: Locale) {
  const normalized = normalizePathToSlug(slug);
  const collidesWithKnownRoute =
    staticSlugToRoute.has(normalized) || serviceSlugToCanonical.has(normalized) || isLocale(normalized);

  if (locale === "az") {
    return collidesWithKnownRoute ? `/bloq/${normalized}/` : `/${normalized}/`;
  }

  return collidesWithKnownRoute ? `/${locale}/bloq/${normalized}/` : `/${locale}/${normalized}/`;
}

export function getVacancyHref(slug: string, locale: Locale) {
  const normalized = normalizePathToSlug(slug);
  return `${getStaticHref("vacancy", locale)}${normalized}/`;
}

export function getLocalizedHref(locale: Locale, href: string) {
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return href;
  }

  const normalized = normalizePathToSlug(href);
  if (!normalized) {
    return getStaticHref("home", locale);
  }

  const staticRoute = staticSlugToRoute.get(normalized);
  if (staticRoute) {
    return getStaticHref(staticRoute, locale);
  }

  const serviceSlug = serviceSlugToCanonical.get(normalized);
  if (serviceSlug) {
    return getServiceHref(serviceSlug, locale);
  }

  return locale === "az" ? `/${normalized}/` : `/${locale}/${normalized}/`;
}

export function resolveLocalizedSlug(locale: Locale, slug: string): { kind: RouteKind; canonicalSlug: string; routeKey?: StaticRouteKey } | null {
  const normalized = normalizePathToSlug(slug);
  const staticRoute = staticSlugToRoute.get(normalized);

  if (staticRoute) {
    return { kind: "static", canonicalSlug: staticRoute, routeKey: staticRoute };
  }

  const serviceSlug = serviceSlugToCanonical.get(normalized);
  if (serviceSlug) {
    return { kind: "service", canonicalSlug: serviceSlug };
  }

  // Keep locale in the signature so invalid locale segments are validated by callers.
  void locale;
  return null;
}

export function getLocalizedCanonicalRedirectHref(locale: Locale, slug: string) {
  const normalized = normalizePathToSlug(slug);
  const match = resolveLocalizedSlug(locale, normalized);

  if (!match) {
    return null;
  }

  const canonicalHref =
    match.kind === "service"
      ? getServiceHref(match.canonicalSlug, locale)
      : getStaticHref(match.routeKey ?? "home", locale);

  return normalizePathToSlug(canonicalHref) === normalized ? null : canonicalHref;
}

export function getHrefForCanonical(locale: Locale, canonicalSlug: string, kind: RouteKind = "static") {
  if (kind === "service") {
    return getServiceHref(canonicalSlug, locale);
  }

  if (kind === "blogPost") {
    return getBlogPostHref(canonicalSlug, locale);
  }

  if (kind === "vacancyDetail") {
    return getVacancyHref(canonicalSlug, locale);
  }

  return getStaticHref(canonicalSlug as StaticRouteKey, locale);
}

export function getLanguageTargets(currentLocale: Locale, canonicalSlug: string, kind: RouteKind = "static") {
  return locales
    .filter((locale) => locale !== currentLocale)
    .map((locale) => ({
      locale,
      href: getHrefForCanonical(locale, canonicalSlug, kind),
    }));
}

export function getLocalizedStaticParams() {
  const staticParams = (["ru", "tr"] as Locale[]).flatMap((locale) =>
    Object.entries(localizedStaticRoutes)
      .filter(([routeKey]) => routeKey !== "home")
      .map(([, byLocale]) => ({
        locale,
        slug: normalizePathToSlug(byLocale[locale]),
      })),
  );

  const serviceParams = (["ru", "tr"] as Locale[]).flatMap((locale) =>
    Object.values(localizedServiceSlugs).map((byLocale) => ({
      locale,
      slug: byLocale[locale],
    })),
  );

  return [...staticParams, ...serviceParams];
}
