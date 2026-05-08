import { GalleryTabs } from "@/components/GalleryTabs";
import { SitePage } from "@/components/SiteChrome";
import { getLocalizedGalleryCategories } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";

export const metadata = {
  title: "Qalereya - 166 Təmizlik",
};

export function GalleryPageContent({ locale = "az" }: { locale?: Locale }) {
  const copy = staticPageCopy[locale];
  const categories = getLocalizedGalleryCategories(locale);

  return (
    <SitePage active="gallery" locale={locale} currentSlug="gallery">
      <section className="bg-white pb-20 pt-16 max-md:pb-12 max-md:pt-10">
        <div className="container-shell">
          <div className="text-center">
            <h1 className="text-[42px] font-extrabold leading-tight text-black max-md:text-[32px]">{copy.gallery.title}</h1>
            <p className="mt-3 text-[19px] font-bold text-[#8c8c8c] max-md:text-[16px]">{copy.gallery.subtitle}</p>
          </div>

          <GalleryTabs categories={categories} moreLabel={copy.more} />
        </div>
      </section>
    </SitePage>
  );
}

export default function GalleryPage() {
  return <GalleryPageContent />;
}
