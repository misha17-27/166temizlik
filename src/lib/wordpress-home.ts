import type { Locale } from "./routes";
import type { HeroSlide } from "./site-data";
import type { WordPressLocale } from "./wordpress";
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

function imageUrl(image: WordPressImageLike | string | null | undefined) {
  if (typeof image === "string") {
    return image.trim();
  }

  return typeof image?.url === "string" && image.url.trim() ? image.url.trim() : "";
}

function normalizeSlug(slug: string | undefined) {
  return typeof slug === "string" ? slug.replace(/^\/+|\/+$/g, "") : "";
}

function readAcf(acf: Record<string, unknown>, key: string) {
  return acf[key];
}

function plainText(value: unknown) {
  return typeof value === "string" ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
}

function buildLegacyHomePayload(acf: Record<string, unknown>): HomePayload {
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

  return {
    beforeAfter,
    testimonials,
    about: about ? { paragraphs: [about] } : undefined,
  };
}

export function buildHomePageData(locale: Locale, payload: HomePayload | null | undefined): HomePageData {
  const fallback = fallbackCopy[locale] ?? fallbackCopy.az;
  const heroSlides: HeroSlide[] = payload?.heroSlides?.length
    ? payload.heroSlides
        .map((slide): HeroSlide | null => {
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
            desktopBgColor: slide.desktopBgColor ?? "#0271C9",
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
  };
}

export async function getHomePageData(locale: Locale) {
  const { getWordPressHome, getWordPressPage, getWordPressServices } = await import("@/lib/wordpress");
  const response = await getWordPressHome(locale as WordPressLocale).catch(() => null);
  const legacyPage = response ? null : await getWordPressPage("ana-sehife", locale as WordPressLocale).catch(() => null);
  const pageData = buildHomePageData(locale, response?.mappedAcf ?? (legacyPage ? buildLegacyHomePayload(legacyPage.acf) : null));
  const wordpressServices = await getWordPressServices(locale as WordPressLocale).catch(() => null);
  const wordpressTitles = new Map(wordpressServices?.items.map((service) => [service.slug, service.title]) ?? []);
  const services = getLocalizedServices(locale).map((service) => ({
    ...service,
    title: wordpressTitles.get(service.slug) || service.title,
  }));

  return {
    ...pageData,
    services,
  };
}
