import Image from "next/image";
import { PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { galleryImages } from "@/lib/pages-data";

export const metadata = {
  title: "Qalereya - 166 Təmizlik",
};

export default function GalleryPage() {
  return (
    <SitePage>
      <PageHero title="Qalereya" subtitle="Gördüyümüz işlərdən və peşəkar təmizlik prosesindən görüntülər." />
      <section className="bg-[#f5f5f5] py-16 max-md:py-10">
        <div className="container-shell grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {galleryImages.map((src, index) => (
            <a key={src} href={src} className="relative h-[230px] overflow-hidden rounded-[14px] bg-white shadow-[0_12px_30px_rgb(15_23_42_/_8%)] max-md:h-[170px]">
              <Image src={src} alt={`166 Təmizlik qalereya ${index + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 hover:scale-105" />
            </a>
          ))}
        </div>
      </section>
    </SitePage>
  );
}
