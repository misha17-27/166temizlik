import Link from "next/link";
import { SitePage } from "@/components/SiteChrome";
import { getLocalizedVacancies, pageHeroAssets, vacancyDetails } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";

export const metadata = {
  title: "Vakansiya - 166 Təmizlik",
};

export function VacancyPageContent({ locale = "az" }: { locale?: Locale }) {
  const copy = staticPageCopy[locale].vacancy;
  const sharedCopy = staticPageCopy[locale];
  const vacancies = getLocalizedVacancies(locale);

  return (
    <SitePage active="about" locale={locale} currentSlug="vacancy">
      <section className="bg-[#f5f5f5]">
        <div
          className="container-shell grid h-[520px] place-items-center bg-cover bg-center max-md:h-[280px]"
          style={{ backgroundImage: `linear-gradient(rgb(0 0 0 / 28%), rgb(0 0 0 / 28%)), url(${pageHeroAssets.partners})` }}
        >
          <h1 className="text-[34px] font-bold text-white max-md:text-[28px]">{copy.title}</h1>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-9 pb-16">
        <div className="container-shell rounded-[20px] bg-white p-8 max-md:p-4">
          <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
            {vacancies.map((vacancy, index) => {
              const href = `/vakansiya/${vacancyDetails[index]?.slug ?? ""}/`;

              return (
                <article key={vacancy.title} className="bg-[#f7f7fb] px-8 py-7">
                  <h2 className="text-[25px] font-medium leading-[1.2] text-black max-md:text-[21px]">
                    <Link href={href} className="transition-colors hover:text-[#0075c9]">
                      {vacancy.summary}
                    </Link>
                  </h2>
                  <p className="mt-8 text-[15px] font-normal text-black">
                    {copy.duties} – {vacancy.items[0]}; – {vacancy.items[1]}
                  </p>
                  <Link href={href} className="mt-8 inline-block text-[16px] font-medium text-black">
                    {sharedCopy.readMore}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SitePage>
  );
}

export default function VacancyPage() {
  return <VacancyPageContent />;
}
