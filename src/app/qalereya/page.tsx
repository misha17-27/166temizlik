import { GalleryTabs, type GalleryTabItem } from "@/components/GalleryTabs";
import { SitePage } from "@/components/SiteChrome";
import { WordPressSeoSchema } from "@/components/WordPressSeoSchema";
import { getLocalizedGalleryCategories } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";
import { getWordPressGallery, getWordPressPage } from "@/lib/wordpress";
import { generateStaticWordPressPageMetadata } from "@/lib/wordpress-pages";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return generateStaticWordPressPageMetadata("gallery", "az", "Qalereya - 166 Təmizlik");
}

const galleryAcfFields = [
  ["home-office", "ev_və_ofis_təmizliyi_səkiller"],
  ["garden", "bag_evlərinin_təmizlənməsi_səkillər"],
  ["area", "ərazi_təmizliyi_səkillər"],
  ["facade", "fasad_təmizliyi_səkillər"],
  ["curtains", "pərdə_və_jaluz_yuma_səkillər"],
  ["furniture", "yumsaq_mebellərin_kimyəvi_təmizliyi_səkillər"],
  ["fragrance", "ətirləndirmə_xidməti_səkillər"],
  ["restaurant-hotel", "restoran_və_hotel_təmizliyi"],
] as const;

type GalleryAcfImage = {
  url?: unknown;
  width?: unknown;
  height?: unknown;
};

type GalleryCategory = GalleryTabItem["categories"][number];

const galleryCategoryKeys = new Set<GalleryCategory>(galleryAcfFields.map(([category]) => category));
const galleryAcfFieldFallbacks: Record<GalleryCategory, string> = {
  "home-office": "ev_və_ofis_təmizliyi_səkiller",
  garden: "bag_evlərinin_təmizlənməsi_səkillər",
  area: "ərazi_təmizliyi_səkillər",
  facade: "fasad_təmizliyi_səkillər",
  curtains: "pərdə_və_jaluz_yuma_səkillər",
  furniture: "yumsaq_mebellərin_kimyəvi_təmizliyi_səkillər",
  fragrance: "ətirləndirmə_xidməti_səkillər",
  "restaurant-hotel": "restoran_və_hotel_təmizliyi",
};

function isGalleryCategory(category: unknown): category is GalleryCategory {
  return typeof category === "string" && galleryCategoryKeys.has(category as GalleryCategory);
}

function getImageHeight(image: GalleryAcfImage) {
  const width = typeof image.width === "number" ? image.width : 360;
  const height = typeof image.height === "number" ? image.height : 300;
  return Math.max(150, Math.round((360 * height) / Math.max(width, 1)));
}

function getGalleryAcfValue(acf: Record<string, unknown>, category: GalleryCategory, field: string) {
  return acf[field] ?? acf[galleryAcfFieldFallbacks[category]];
}

function getGalleryItemsFromAcf(acf: Record<string, unknown>): GalleryTabItem[] {
  return galleryAcfFields.flatMap(([category, field]) => {
    const value = getGalleryAcfValue(acf, category, field);
    if (!Array.isArray(value)) {
      return [];
    }

    return value.flatMap((image): GalleryTabItem[] => {
      if (!image || typeof image !== "object") {
        return [];
      }

      const galleryImage = image as GalleryAcfImage;
      if (typeof galleryImage.url !== "string" || galleryImage.url === "") {
        return [];
      }

      return [
        {
          src: galleryImage.url,
          categories: [category],
          height: getImageHeight(galleryImage),
        },
      ];
    });
  });
}

function getGalleryItemsFromApi(response: Record<string, unknown> | null): GalleryTabItem[] {
  const items = response?.items;
  if (!Array.isArray(items)) {
    return [];
  }

  return items.flatMap((item): GalleryTabItem[] => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const record = item as Record<string, unknown>;
    const image = record.image && typeof record.image === "object" ? (record.image as GalleryAcfImage) : record;
    const src = typeof record.url === "string" ? record.url : image.url;
    const categories = Array.isArray(record.categories)
      ? record.categories.filter(isGalleryCategory)
      : [];

    return typeof src === "string" && src
      ? [{ src, categories, height: getImageHeight(image) }]
      : [];
  });
}

function getGalleryCategoryLabels(response: Record<string, unknown> | null): string[] {
  const labels = response?.categoryLabels;
  if (!Array.isArray(labels)) {
    return [];
  }

  return labels.filter((label): label is string => typeof label === "string" && label.trim() !== "");
}

async function getGalleryPageData(locale: Locale) {
  try {
    const [response, page] = await Promise.all([
      getWordPressGallery(locale).catch(() => null),
      getWordPressPage("qalereya", locale),
    ]);
    const apiItems = getGalleryItemsFromApi(response);
    const items = apiItems.length ? apiItems : getGalleryItemsFromAcf(page.acf);
    const videoUrl =
      (typeof response?.videoUrl === "string" ? response.videoUrl : "") ||
      (typeof page.acf.youtube_link === "string" ? page.acf.youtube_link : undefined);

    return {
      categoryLabels: getGalleryCategoryLabels(response),
      items,
      videoUrl,
      seo: page.seo,
      title: page.title,
    };
  } catch {
    return {
      categoryLabels: [],
      items: [],
      videoUrl: undefined,
      seo: null,
      title: "",
    };
  }
}

export async function GalleryPageContent({ locale = "az" }: { locale?: Locale }) {
  const copy = staticPageCopy[locale];
  const fallbackCategories = getLocalizedGalleryCategories(locale);
  const allLabel = locale === "ru" ? "Смотреть все" : locale === "tr" ? "Tümünü göster" : "Hamısına bax";
  const gallery = await getGalleryPageData(locale);
  const categories = gallery.categoryLabels.length === fallbackCategories.length ? gallery.categoryLabels : fallbackCategories;

  return (
    <SitePage active="gallery" locale={locale} currentSlug="gallery">
      <WordPressSeoSchema seo={gallery.seo} />
      <section className="bg-white pb-20 pt-16 max-md:pb-12 max-md:pt-10">
        <div className="container-shell">
          <div className="text-center">
            <h1 className="text-[42px] font-extrabold leading-tight text-black max-md:text-[32px]">{gallery.title || copy.gallery.title}</h1>
            <p className="mt-3 text-[19px] font-bold text-[#8c8c8c] max-md:text-[16px]">{copy.gallery.subtitle}</p>
          </div>

          <GalleryTabs
            categories={categories}
            moreLabel={copy.more}
            allLabel={allLabel}
            items={gallery.items.length > 0 ? gallery.items : undefined}
            videoUrl={gallery.videoUrl}
          />
        </div>
      </section>
    </SitePage>
  );
}

export default function GalleryPage() {
  return <GalleryPageContent />;
}
