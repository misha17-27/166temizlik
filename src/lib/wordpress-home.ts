import type { Locale } from "./routes";
import { weeklyPrices as fallbackWeeklyPrices, type HeroSlide } from "./site-data";
import { normalizeWordPressMediaUrl, type WordPressLocale, type WordPressSeo } from "./wordpress";
import { getLocalizedServices } from "./i18n";

type WordPressImageLike = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

type HomePayload = {
  heroSlides?: Array<{
    title?: string;
    eyebrow?: string;
    desktopImage?: WordPressImageLike | null;
    mobileImage?: WordPressImageLike | null;
    desktopBgColor?: string;
  }>;
  services?: Array<{
    title?: string;
    slug?: string;
    icon?: WordPressImageLike | null;
  }>;
  beforeAfter?: Array<{
    title?: string;
    before?: WordPressImageLike | null;
    after?: WordPressImageLike | null;
  }>;
  partners?: Array<{
    name?: string;
    logo?: WordPressImageLike | null;
  }>;
  testimonials?: Array<{
    name?: string;
    text?: string;
    image?: WordPressImageLike | null;
  }>;
  about?: {
    lead?: string;
    accent?: string;
    paragraphs?: string[];
    image?: WordPressImageLike | null;
  };
  mapImage?: WordPressImageLike | null;
};

export type HomeServiceItem = {
  slug: string;
  title: string;
  href: string;
  icon: string;
};

export type HomeBeforeAfterItem = {
  title: string;
  before: string;
  after: string;
};

export type HomePageData = {
  seo?: WordPressSeo | null;
  copy: {
    heroSlides: HeroSlide[];
    servicesTitle: string;
    testimonials: Array<{
      name: string;
      text: string;
      image: string;
    }>;
    about: {
      lead: string;
      accent: string;
      paragraphs: string[];
    };
  };
  services: HomeServiceItem[];
  beforeAfter: HomeBeforeAfterItem[];
  partnerLogos: string[];
  aboutImage: string;
  mapImage: string;
  packages?: {
    features: {
      fourHours: string[];
      eightHours: string[];
    };
    weeklyPrices: typeof fallbackWeeklyPrices;
    notes: Array<{
      before: string;
      strong: string;
      after: string;
    }>;
  };
};

const fallbackCopy: Record<Locale, Pick<HomePageData["copy"], "heroSlides" | "servicesTitle" | "testimonials" | "about">> = {
  az: {
    heroSlides: [],
    servicesTitle: "Xidmətlərimiz",
    testimonials: [],
    about: {
      lead: "ŞİRKƏT",
      accent: "HAQQINDA",
      paragraphs: [],
    },
  },
  ru: {
    heroSlides: [],
    servicesTitle: "Услуги",
    testimonials: [],
    about: {
      lead: "О",
      accent: "КОМПАНИИ",
      paragraphs: [],
    },
  },
  tr: {
    heroSlides: [],
    servicesTitle: "Hizmetlerimiz",
    testimonials: [],
    about: {
      lead: "ŞİRKET",
      accent: "HAKKINDA",
      paragraphs: [],
    },
  },
};

const heroSlideBackgrounds = ["#0271C9", "#FFF424"];

function imageUrl(image: WordPressImageLike | string | null | undefined) {
  if (typeof image === "string") {
    return normalizeWordPressMediaUrl(image.trim()) ?? "";
  }

  return typeof image?.url === "string" && image.url.trim() ? normalizeWordPressMediaUrl(image.url.trim()) ?? "" : "";
}

function normalizeSlug(slug: string | undefined) {
  return typeof slug === "string" ? slug.replace(/^\/+|\/+$/g, "") : "";
}

function normalizeAcfKey(key: string) {
  return key
    .toLowerCase()
    .replace(/\u00e9\u2122/g, "e")
    .replace(/[\u0259\u018f]/g, "e")
    .replace(/[\u0131\u0130]/g, "i")
    .replace(/[\u00f6\u00d6]/g, "o")
    .replace(/[\u00fc\u00dc]/g, "u")
    .replace(/[\u011f\u011e]/g, "g")
    .replace(/[\u015f\u015e]/g, "s")
    .replace(/[\u00e7\u00c7]/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function readAcf(acf: Record<string, unknown>, key: string) {
  if (key in acf) {
    return acf[key];
  }

  const normalizedKey = normalizeAcfKey(key);
  const match = Object.entries(acf).find(([entryKey]) => normalizeAcfKey(entryKey) === normalizedKey);
  return match?.[1];
}

function plainText(value: unknown) {
  return typeof value === "string" ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
}

function listItems(value: unknown) {
  return typeof value === "string"
    ? Array.from(value.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi), (match) => plainText(match[1])).filter(Boolean)
    : [];
}

function buildLegacyHomePackages(acf: Record<string, unknown>): HomePageData["packages"] {
  const prices = Array.from({ length: 6 }, (_, index) => plainText(readAcf(acf, `qiymət_${index + 1}`)));
  const features = {
    fourHours: listItems(readAcf(acf, "4_saatliq_metn")),
    eightHours: listItems(readAcf(acf, "8_saatliq_metn")),
  };
  const noteHtml = readAcf(acf, "qeyd");
  const notes =
    typeof noteHtml === "string"
      ? Array.from(noteHtml.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi), (match) => {
          const html = match[1];
          const strongMatch = html.match(/<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>/i);
          const strong = plainText(strongMatch?.[1] ?? "");
          const [before = "", after = ""] = strongMatch ? html.split(strongMatch[0], 2) : [html, ""];
          const beforeText = plainText(before);
          const afterText = plainText(after);
          return {
            before: beforeText ? `${beforeText} ` : "",
            strong,
            after: afterText ? `${/^[.,;:!?]/.test(afterText) ? "" : " "}${afterText}` : "",
          };
        })
      : [];

  if (!features.fourHours.length || !features.eightHours.length || prices.some((price) => !price)) {
    return undefined;
  }

  return {
    features,
    weeklyPrices: fallbackWeeklyPrices.map((price, index) => ({
      ...price,
      four: prices[index] || price.four,
      eight: prices[index + 3] || price.eight,
    })),
    notes,
  };
}

const legacyHomeServiceSlugs = [
  "ev-temizliyi-xidmeti",
  "ofis-temizliyi",
  "bag-evlerinin-temizliyi",
  "erazi-temizliyi",
  "fasad-temizliyi",
  "pencere-temizliyi",
  "cilciraq-temizliyi",
  "perde-yuma",
  "yumsaq-mebel-temizlenmesi",
  "etirlendirme",
  "baximsiz-ev-temizliyi",
  "yangindan-sonra-ev-temizliyi",
  "otel-temizlenmesi",
  "restoran-temizlenmesi",
  "temir-sonrasi-temizlik",
  "kristallasdirma-xidmeti",
  "hovuz-temizlenmesi-xidmeti",
  "korporativ-temizlik-xidmeti",
] as const;

function getLegacyHomeImages(content: string) {
  return Array.from(
    content.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi),
    (match) => normalizeWordPressMediaUrl(match[1]) ?? "",
  ).filter((image) => image && !image.includes("/revslider-2/public/assets/assets/dummy.png"));
}

function getLegacyHomeServiceIcons(content: string) {
  const images = getLegacyHomeImages(content);

  return new Map(legacyHomeServiceSlugs.map((slug, index) => [slug, images[index] ?? ""]));
}

function getLegacyHomeSectionImages(content: string) {
  const images = getLegacyHomeImages(content);

  return {
    about: images.at(-8) ?? "",
    map: images.at(-7) ?? "",
  };
}

function buildLegacyHomePayload(acf: Record<string, unknown>, content: string): HomePayload {
  const beforeAfter = [
    {
      title: "1",
      before: readAcf(acf, "əvvəl_1") as WordPressImageLike,
      after: readAcf(acf, "sonra_1__867x640") as WordPressImageLike,
    },
    {
      title: "2",
      before: readAcf(acf, "əvvəl_2") as WordPressImageLike,
      after: readAcf(acf, "sonra_2__867x640") as WordPressImageLike,
    },
  ];
  const testimonials = Array.from({ length: 5 }, (_, index) => {
    const number = index + 1;
    return {
      name: plainText(readAcf(acf, `ad_${number}`)),
      text: plainText(readAcf(acf, `mustəri_mətn_${number}`)),
      image: readAcf(acf, `mustəri_səkil_${number}`) as WordPressImageLike,
    };
  });
  const about = plainText(readAcf(acf, "sirkət_haqqinda"));
  const sectionImages = getLegacyHomeSectionImages(content);
  const partners = Array.isArray(readAcf(acf, "partnyorlar"))
    ? (readAcf(acf, "partnyorlar") as WordPressImageLike[]).map((logo, index) => ({
        name: `Partner ${index + 1}`,
        logo,
      }))
    : [];

  return {
    beforeAfter,
    testimonials,
    about: about ? { paragraphs: [about], image: sectionImages.about ? { url: sectionImages.about } : undefined } : undefined,
    mapImage: sectionImages.map ? { url: sectionImages.map } : undefined,
    partners,
  };
}

function mergeHomePayload(primary: HomePayload | null | undefined, fallback: HomePayload | null | undefined): HomePayload | null {
  if (!primary && !fallback) {
    return null;
  }

  return {
    heroSlides: primary?.heroSlides?.length ? primary.heroSlides : fallback?.heroSlides,
    services: primary?.services?.length ? primary.services : fallback?.services,
    beforeAfter: primary?.beforeAfter?.length ? primary.beforeAfter : fallback?.beforeAfter,
    partners: primary?.partners?.length ? primary.partners : fallback?.partners,
    testimonials: primary?.testimonials?.length ? primary.testimonials : fallback?.testimonials,
    about: primary?.about && Object.keys(primary.about).length ? primary.about : fallback?.about,
    mapImage: primary?.mapImage ?? fallback?.mapImage,
  };
}

export function buildHomePageData(locale: Locale, payload: HomePayload | null | undefined): HomePageData {
  const fallback = fallbackCopy[locale] ?? fallbackCopy.az;
  const heroSlides: HeroSlide[] = payload?.heroSlides?.length
    ? payload.heroSlides
        .map((slide, index): HeroSlide | null => {
          const desktopImage = imageUrl(slide.desktopImage);
          const mobileImage = imageUrl(slide.mobileImage) || desktopImage;

          if (!desktopImage || !mobileImage) {
            return null;
          }

          return {
            title: slide.title,
            eyebrow: slide.eyebrow,
            desktopImage,
            mobileImage,
            desktopBgColor: slide.desktopBgColor ?? heroSlideBackgrounds[index % heroSlideBackgrounds.length],
            desktopWidth: slide.desktopImage?.width ?? 1920,
            desktopHeight: slide.desktopImage?.height ?? 1080,
            images: [],
          };
        })
        .filter((slide): slide is HeroSlide => Boolean(slide))
    : fallback.heroSlides;

  const services = payload?.services?.length
    ? payload.services
        .map((service) => {
          const slug = normalizeSlug(service.slug);

          if (!slug) {
            return null;
          }

          return {
            slug,
            title: service.title ?? slug,
            icon: imageUrl(service.icon),
            href: `/${slug}/`,
          };
        })
        .filter((service): service is HomeServiceItem => Boolean(service))
    : [];

  const beforeAfter = payload?.beforeAfter?.length
    ? payload.beforeAfter
        .map((item) => {
          const before = imageUrl(item.before);
          const after = imageUrl(item.after);

          return item.title && before && after
            ? {
                title: item.title,
                before,
                after,
              }
            : null;
        })
        .filter((item): item is HomeBeforeAfterItem => Boolean(item))
    : [];

  const partnerLogos = payload?.partners?.length ? payload.partners.map((partner) => imageUrl(partner.logo)).filter(Boolean) : [];
  const testimonials = payload?.testimonials?.length
    ? payload.testimonials.map((item) => ({
        name: item.name ?? "",
        text: item.text ?? "",
        image: imageUrl(item.image),
      }))
    : fallback.testimonials;

  return {
    copy: {
      ...fallback,
      heroSlides,
      testimonials,
      about: {
        ...fallback.about,
        lead: payload?.about?.lead ?? fallback.about.lead,
        accent: payload?.about?.accent ?? fallback.about.accent,
        paragraphs: payload?.about?.paragraphs?.length ? payload.about.paragraphs : fallback.about.paragraphs,
      },
    },
    services,
    beforeAfter,
    partnerLogos,
    aboutImage: imageUrl(payload?.about?.image),
    mapImage: imageUrl(payload?.mapImage),
  };
}

export async function getHomePageData(locale: Locale) {
  const { getWordPressCanonicalSlug, getWordPressHome, getWordPressPage, getWordPressServices } = await import("@/lib/wordpress");
  const response = await getWordPressHome(locale as WordPressLocale).catch(() => null);
  const legacyPage = response ? null : await getWordPressPage("ana-sehife", locale as WordPressLocale).catch(() => null);
  const sourcePage = response?.page ?? legacyPage;
  const legacyPayload = sourcePage ? buildLegacyHomePayload(sourcePage.acf, sourcePage.content) : null;
  const pageData = buildHomePageData(locale, mergeHomePayload(response?.mappedAcf, legacyPayload));
  const wordpressServices = await getWordPressServices(locale as WordPressLocale).catch(() => null);
  const wordpressTitles = new Map(wordpressServices?.items.map((service) => [getWordPressCanonicalSlug(service), service.title]) ?? []);
  const mappedServiceIcons = new Map(pageData.services.map((service) => [service.slug, service.icon]));
  const legacyServiceIcons = sourcePage ? getLegacyHomeServiceIcons(sourcePage.content) : new Map<string, string>();
  const services = getLocalizedServices(locale).map((service) => ({
    ...service,
    title: wordpressTitles.get(service.slug) || service.title,
    icon: legacyServiceIcons.get(service.slug) || mappedServiceIcons.get(service.slug) || service.icon,
  }));

  return {
    seo: sourcePage?.seo,
    ...pageData,
    services,
    packages: sourcePage ? buildLegacyHomePackages(sourcePage.acf) : undefined,
  };
}
