import { SitePage } from "@/components/SiteChrome";
import { pageHeroAssets, vacancies } from "@/lib/pages-data";

export const metadata = {
  title: "Vakansiya - 166 Təmizlik",
};

export default function VacancyPage() {
  return (
    <SitePage active="about">
      <section className="bg-[#f5f5f5]">
        <div
          className="container-shell grid h-[520px] place-items-center bg-cover bg-center max-md:h-[280px]"
          style={{ backgroundImage: `linear-gradient(rgb(0 0 0 / 28%), rgb(0 0 0 / 28%)), url(${pageHeroAssets.partners})` }}
        >
          <h1 className="text-[34px] font-bold text-white max-md:text-[28px]">Vakansiya</h1>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-9 pb-16">
        <div className="container-shell rounded-[20px] bg-white p-8 max-md:p-4">
          <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
            {vacancies.map((vacancy) => (
              <article key={vacancy.title} className="bg-[#f7f7fb] px-8 py-7">
                <h2 className="text-[25px] font-medium leading-[1.2] text-black max-md:text-[21px]">{vacancy.summary}</h2>
                <p className="mt-8 text-[15px] font-normal text-black">
                  Öhdəliklər – {vacancy.items[0]}; – {vacancy.items[1]}
                </p>
                <button className="mt-8 text-[16px] font-medium text-black">Daha ətraflı »</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}
