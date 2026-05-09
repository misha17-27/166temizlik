import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/SiteChrome";
import { pageHeroAssets, vacancyDetails } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";

export function generateStaticParams() {
  return vacancyDetails.map((vacancy) => ({ vacancySlug: vacancy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ vacancySlug: string }> }) {
  const { vacancySlug } = await params;
  const vacancy = vacancyDetails.find((item) => item.slug === vacancySlug);

  return {
    title: vacancy ? `${vacancy.title} - 166 Təmizlik` : "Vakansiya - 166 Təmizlik",
  };
}

export default async function VacancyDetailPage({ params }: { params: Promise<{ vacancySlug: string }> }) {
  const { vacancySlug } = await params;
  const vacancy = vacancyDetails.find((item) => item.slug === vacancySlug);
  const copy = staticPageCopy.az.vacancy;

  if (!vacancy) {
    notFound();
  }

  return (
    <SitePage active="about" locale="az" currentSlug="vacancy">
      <section className="bg-[#f5f5f5]">
        <div
          className="container-shell grid h-[430px] place-items-center bg-cover bg-center max-md:h-[260px]"
          style={{ backgroundImage: `linear-gradient(rgb(0 0 0 / 35%), rgb(0 0 0 / 35%)), url(${pageHeroAssets.partners})` }}
        >
          <h1 className="max-w-[850px] px-5 text-center text-[32px] font-bold leading-tight text-white max-md:text-[24px]">{vacancy.title}</h1>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-10 pb-16">
        <article className="container-shell rounded-[20px] bg-white p-8 max-md:p-5">
          <div className="rounded-[10px] bg-[#f7f7fb] px-8 py-8 max-md:px-5">
            <h2 className="text-[25px] font-medium leading-[1.25] text-black max-md:text-[21px]">{vacancy.title}</h2>
            <div className="mt-8 grid gap-8 text-[16px] leading-[1.75] text-black md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-[18px] font-semibold">{copy.duties}</h3>
                <ul className="space-y-2">
                  {vacancy.duties.map((item) => (
                    <li key={item}>- {item};</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-[18px] font-semibold">Tələblər</h3>
                <ul className="space-y-2">
                  {vacancy.requirements.map((item) => (
                    <li key={item}>- {item};</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/166-temizlik-elaqe/" className="rounded-full bg-brand-yellow px-8 py-3 text-[13px] font-bold text-black">
                CV Göndər
              </Link>
              <Link href="/vakansiya/" className="rounded-full bg-black px-8 py-3 text-[13px] font-bold text-white">
                Vakansiyalara qayıt
              </Link>
            </div>
          </div>
        </article>
      </section>
    </SitePage>
  );
}
