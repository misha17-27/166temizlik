import Image from "next/image";
import { SitePage } from "@/components/SiteChrome";
import { galleryImages, getLocalizedGalleryCategories } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";

export const metadata = {
  title: "Qalereya - 166 Təmizlik",
};

const heights = [330, 265, 260, 330, 365, 355, 250, 365, 260, 245, 285, 520, 135, 335, 220];

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

          <div className="mx-auto mt-12 flex max-w-[980px] flex-wrap justify-center gap-x-12 gap-y-7 text-center text-[14px] font-medium text-[#333] max-md:mt-8 max-md:gap-x-5 max-md:gap-y-4">
            {categories.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="mt-9 columns-4 gap-5 max-lg:columns-3 max-md:columns-2 max-sm:columns-1">
            {galleryImages.map((src, index) => (
              <a
                key={src}
                href={src}
                className="mb-5 block break-inside-avoid overflow-hidden rounded-[14px] bg-[#eef6ff]"
              >
                <Image
                  src={src}
                  alt={`166 Təmizlik ${copy.gallery.title} ${index + 1}`}
                  width={360}
                  height={heights[index] ?? 300}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full object-cover transition duration-500 hover:scale-105"
                  style={{ height: `${heights[index] ?? 300}px` }}
                />
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="rounded-[3px] bg-brand-blue px-7 py-3 text-[13px] font-bold text-white">
              {copy.more}
            </button>
          </div>

          <div className="mx-auto mt-10 max-w-[1120px] overflow-hidden rounded-[14px] bg-black">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/39SFEBN7cGM"
              title="166 Təmizlik video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </SitePage>
  );
}

export default function GalleryPage() {
  return <GalleryPageContent />;
}
