import Link from "next/link";
import { PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { vacancies } from "@/lib/pages-data";
import { site } from "@/lib/site-data";

export const metadata = {
  title: "Vakansiya - 166 Təmizlik",
};

export default function VacancyPage() {
  return (
    <SitePage>
      <PageHero title="Vakansiya" subtitle="166 Təmizlik Xidmətində işləmək istəyən namizədlər üçün aktiv vakansiyalar." />
      <section className="bg-[#f5f5f5] py-16 max-md:py-10">
        <div className="container-shell grid grid-cols-2 gap-8 max-lg:grid-cols-1">
          {vacancies.map((vacancy) => (
            <article key={vacancy.title} className="rounded-[18px] bg-white p-8 shadow-[0_16px_36px_rgb(15_23_42_/_8%)]">
              <h2 className="text-[25px] font-bold text-black">{vacancy.title}</h2>
              <p className="mt-4 text-[16px] leading-7 text-black/75">{vacancy.summary}</p>
              <ul className="mt-6 space-y-3">
                {vacancy.items.map((item) => (
                  <li key={item} className="rounded-[12px] bg-[#eef6ff] px-5 py-3 text-[15px] font-semibold text-black">{item}</li>
                ))}
              </ul>
              <Link href={site.whatsappHref} className="mt-7 inline-block rounded-full bg-brand-blue px-8 py-4 text-[13px] font-bold text-white">
                MÜRACİƏT ET
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SitePage>
  );
}
