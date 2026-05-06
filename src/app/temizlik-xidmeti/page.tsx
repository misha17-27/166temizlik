import Image from "next/image";
import { SitePage } from "@/components/SiteChrome";
import { equipment, materialCards, pageHeroAssets } from "@/lib/pages-data";

export const metadata = {
  title: "Avadanlıq və maddələr - 166 Təmizlik",
};

export default function EquipmentPage() {
  return (
    <SitePage active="about">
      <section className="relative h-[260px] bg-white max-md:h-[190px]">
        <Image src={pageHeroAssets.equipment} alt="Avadanlıq və maddələr" fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="container-shell relative flex h-full items-center">
          <h1 className="text-[24px] font-semibold text-[#253b8d] max-md:text-[20px]">Avadanlıq və maddələr</h1>
        </div>
      </section>

      <section className="bg-white py-10 pb-20">
        <div className="container-shell">
          <h2 className="mb-14 text-center text-[28px] font-bold text-black">Avadanlıqlar</h2>
          <div className="space-y-20">
            {equipment.map((item, index) => {
              const reverse = index % 2 === 1;
              return (
                <article key={item.title} className={`grid grid-cols-2 items-center gap-16 max-lg:grid-cols-1 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
                  <div>
                    <h3 className="mb-8 text-[23px] font-medium text-[#252525]">{item.title}</h3>
                    <p className="text-[13px] font-normal leading-[1.75] text-[#4b4b4b]">{item.text}</p>
                  </div>
                  <div className="relative mx-auto w-full max-w-[420px]">
                    <div className="absolute -bottom-12 -left-10 h-[190px] w-[260px] bg-[radial-gradient(#d4d4d4_1px,transparent_1.5px)] [background-size:14px_14px]" />
                    <div className="relative h-[360px] overflow-hidden rounded-[5px] bg-white max-md:h-[280px]">
                      <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <h2 className="mb-8 mt-24 text-center text-[28px] font-bold text-black">Maddələr</h2>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {materialCards.map((item) => (
              <article key={item.title} className="rounded-[10px] bg-white p-5 shadow-[0_3px_16px_rgb(15_23_42_/_10%)]">
                <h3 className="text-[13px] font-bold text-[#4a4a4a]">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-[1.55] text-[#606060]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}
