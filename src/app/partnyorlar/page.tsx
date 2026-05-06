import Image from "next/image";
import { SitePage } from "@/components/SiteChrome";
import { newerPartnerLogos, pageHeroAssets, partnerLogos } from "@/lib/pages-data";

export const metadata = {
  title: "Partnyorlar - 166 Təmizlik",
};

export default function PartnersPage() {
  return (
    <SitePage active="about">
      <section className="bg-[#f5f5f5]">
        <div className="container-shell relative h-[520px] overflow-hidden max-md:h-[280px]">
          <Image src={pageHeroAssets.partners} alt="Partnyorlar" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute inset-0 grid place-items-center text-[34px] font-bold text-white max-md:text-[28px]">Partnyorlar</h1>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-9 pb-16">
        <div className="container-shell bg-white px-16 py-14 max-md:px-4">
          <div className="grid grid-cols-6 gap-4 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-2">
            {[...partnerLogos, ...newerPartnerLogos].map((src, index) => (
              <div key={`${src}-${index}`} className="relative h-[112px] rounded-[16px] border border-[#dcdcdc] bg-white">
                <Image src={src} alt={`Partnyor ${index + 1}`} fill sizes="180px" className="object-contain p-5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}
