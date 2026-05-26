import Image from "next/image";
import { SitePage } from "@/components/SiteChrome";
import { WordPressPageContent } from "@/components/WordPressPageContent";
import { newerPartnerLogos, pageHeroAssets, partnerLogos } from "@/lib/pages-data";
import { getWordPressPartnerLogoUrls } from "@/lib/wordpress-partners";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";
import type { WordPressContentItem } from "@/lib/wordpress";
import { generateStaticWordPressPageMetadata, getStaticWordPressPage } from "@/lib/wordpress-pages";

export async function generateMetadata() {
  return generateStaticWordPressPageMetadata("partners", "az", "Partnyorlar - 166 Təmizlik");
}

export async function PartnersPageContent({
  locale = "az",
  wordpressPage,
}: {
  locale?: Locale;
  wordpressPage?: WordPressContentItem | null;
}) {
  const wpPage = wordpressPage === undefined ? await getStaticWordPressPage("partners", locale) : wordpressPage;
  const copy = staticPageCopy[locale].partners;
  const wordpressLogos = await getWordPressPartnerLogoUrls(locale);
  const logos = wordpressLogos.length ? wordpressLogos : [...partnerLogos, ...newerPartnerLogos];
  const title = wpPage?.title || copy.title;
  const heroImage = wpPage?.featuredImage?.url || pageHeroAssets.partners;

  return (
    <SitePage active="about" locale={locale} currentSlug="partners">
      <section className="bg-[#f5f5f5]">
        <div className="container-shell relative h-[520px] overflow-hidden max-md:h-[280px]">
          <Image src={heroImage} alt={wpPage?.featuredImage?.alt || title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute inset-0 grid place-items-center text-[34px] font-bold text-white max-md:text-[28px]">{title}</h1>
        </div>
      </section>

      <WordPressPageContent page={wpPage} />

      <section className="bg-[#f5f5f5] py-9 pb-16">
        <div className="container-shell bg-white px-16 py-14 max-md:px-4">
          <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-4 max-md:grid-cols-2">
            {logos.map((src, index) => (
              <div key={`${src}-${index}`} className="relative h-[126px] rounded-[16px] border border-[#dcdcdc] bg-white">
                <Image src={src} alt={`${copy.title} ${index + 1}`} fill sizes="200px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}

export default async function PartnersPage() {
  return <PartnersPageContent />;
}
