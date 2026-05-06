import Image from "next/image";
import { PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { partnerLogos } from "@/lib/pages-data";

export const metadata = {
  title: "Partnyorlar - 166 Təmizlik",
};

export default function PartnersPage() {
  return (
    <SitePage>
      <PageHero title="Partnyorlar" subtitle="166 Təmizlik Xidmətinə etibar edən korporativ partnyorlar." />
      <section className="bg-[#f5f5f5] py-16 max-md:py-10">
        <div className="container-shell grid grid-cols-5 gap-7 max-lg:grid-cols-4 max-md:grid-cols-2">
          {partnerLogos.map((src, index) => (
            <div key={src} className="relative h-[112px] rounded-[14px] border border-[#d5dbe3] bg-white shadow-[0_8px_18px_rgb(15_23_42_/_4%)]">
              <Image src={src} alt={`Partnyor ${index + 1}`} fill sizes="180px" className="object-contain p-6" />
            </div>
          ))}
        </div>
      </section>
    </SitePage>
  );
}
