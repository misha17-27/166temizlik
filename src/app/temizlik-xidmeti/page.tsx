import Image from "next/image";
import { SitePage } from "@/components/SiteChrome";
import { getLocalizedEquipment, getLocalizedMaterialCards, pageHeroAssets } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";
import type { WordPressContentItem } from "@/lib/wordpress";
import { generateStaticWordPressPageMetadata, getStaticWordPressPage, getWordPressEquipmentPageContent } from "@/lib/wordpress-pages";

export async function generateMetadata() {
  return generateStaticWordPressPageMetadata("equipment", "az", "Avadanlıq və maddələr - 166 Təmizlik");
}

export async function EquipmentPageContent({
  locale = "az",
  wordpressPage,
}: {
  locale?: Locale;
  wordpressPage?: WordPressContentItem | null;
}) {
  const wpPage = wordpressPage === undefined ? await getStaticWordPressPage("equipment", locale) : wordpressPage;
  const wpContent = getWordPressEquipmentPageContent(wpPage);
  const copy = staticPageCopy[locale].equipment;
  const equipment = wpContent?.equipmentCards.length ? wpContent.equipmentCards : getLocalizedEquipment(locale);
  const materialCards = wpContent?.materialCards.length ? wpContent.materialCards : getLocalizedMaterialCards(locale);
  const title = wpContent?.title || copy.title;
  const heroImage = wpContent?.heroImage || pageHeroAssets.equipment;
  const equipmentTitle = wpContent?.equipmentTitle || copy.equipmentTitle;
  const materialsTitle = wpContent?.materialsTitle || copy.materialsTitle;

  return (
    <SitePage active="about" locale={locale} currentSlug="equipment">
      <section className="relative h-[400px] bg-white max-md:h-[240px]">
        <Image src={heroImage} alt={wpPage?.featuredImage?.alt || title} fill preload sizes="100vw" className="object-cover" />
        <div className="container-shell relative flex h-full items-center">
          <h1 className="text-[32px] font-normal leading-[32px] text-[#13287e] max-md:text-[24px]">{title}</h1>
        </div>
      </section>

      <section className="bg-white py-10 pb-20">
        <div className="container-shell">
          <h2 className="mb-14 text-center text-[35px] font-semibold leading-[42px] text-black max-md:text-[26px]">{equipmentTitle}</h2>
          <div className="space-y-20">
            {equipment.map((item, index) => {
              const reverse = index % 2 === 1;
              return (
                <article key={`${item.title}-${index}`} className={`grid grid-cols-2 items-center gap-16 max-lg:grid-cols-1 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
                  <div>
                    <h3 className="mb-8 text-[35px] font-normal leading-[42px] text-black max-md:text-[25px]">{item.title}</h3>
                    <p className="text-[18px] font-normal leading-[28.8px] text-black/70 max-md:text-[15px] max-md:leading-[24px]">{item.text}</p>
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

          <h2 className="mb-8 mt-24 text-center text-[35px] font-semibold leading-[42px] text-black max-md:text-[26px]">{materialsTitle}</h2>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {materialCards.map((item, index) => (
              <article key={`${item.title}-${index}`} className="rounded-[10px] bg-white p-5 shadow-[0_3px_16px_rgb(15_23_42_/_10%)]">
                <p className="text-[18px] font-normal leading-[28.8px] text-black/70 max-md:text-[15px] max-md:leading-[24px]">
                  <strong className="font-bold">{item.title}</strong> – {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}

export default async function EquipmentPage() {
  return <EquipmentPageContent />;
}
