import { GalleryTabs, type GalleryTabItem } from "@/components/GalleryTabs";
import { SitePage } from "@/components/SiteChrome";
import { getLocalizedGalleryCategories } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";
import { getWordPressPage, getWordPressPageMetadata } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return getWordPressPageMetadata("qalereya", "az", { title: "Qalereya - 166 Təmizlik" });
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

function getImageHeight(image: GalleryAcfImage) {
  const width = typeof image.width === "number" ? image.width : 360;
  const height = typeof image.height === "number" ? image.height : 300;
  return Math.max(150, Math.round((360 * height) / Math.max(width, 1)));
}

function getGalleryItemsFromAcf(acf: Record<string, unknown>): GalleryTabItem[] {
  return galleryAcfFields.flatMap(([category, field]) => {
    const value = acf[field];
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

async function getWordPressGallery(locale: Locale) {
  try {
    const page = await getWordPressPage("qalereya", locale);
    const items = getGalleryItemsFromAcf(page.acf);
    const videoUrl = typeof page.acf.youtube_link === "string" ? page.acf.youtube_link : undefined;

    return {
      items,
      videoUrl,
    };
  } catch {
    return {
      items: [],
      videoUrl: undefined,
    };
  }
}

export async function GalleryPageContent({ locale = "az" }: { locale?: Locale }) {
  const copy = staticPageCopy[locale];
  const categories = getLocalizedGalleryCategories(locale);
  const allLabel = locale === "ru" ? "Смотреть все" : locale === "tr" ? "Tümünü göster" : "Hamısına bax";
  const gallery = await getWordPressGallery(locale);

  return (
    <SitePage active="gallery" locale={locale} currentSlug="gallery">
      <section className="bg-white pb-20 pt-16 max-md:pb-12 max-md:pt-10">
        <div className="container-shell">
          <div className="text-center">
            <h1 className="text-[42px] font-extrabold leading-tight text-black max-md:text-[32px]">{copy.gallery.title}</h1>
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
