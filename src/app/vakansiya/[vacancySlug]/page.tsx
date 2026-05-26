import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/SiteChrome";
import { WordPressSeoSchema } from "@/components/WordPressSeoSchema";
import { pageHeroAssets, vacancyDetails } from "@/lib/pages-data";
import { getLocalizedHref, type Locale } from "@/lib/routes";
import { staticPageCopy } from "@/lib/static-page-copy";
import { buildWordPressMetadata, getWordPressVacancy, stripHtml } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return vacancyDetails.map((vacancy) => ({ vacancySlug: vacancy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ vacancySlug: string }> }) {
  const { vacancySlug } = await params;
  const vacancy = vacancyDetails.find((item) => item.slug === vacancySlug);
  const wpVacancy = vacancy ? null : await getWordPressVacancy(vacancySlug).catch(() => null);
  const title = wpVacancy?.title ?? vacancy?.title;
  const description = wpVacancy ? stripHtml(wpVacancy.excerpt || wpVacancy.content) : undefined;

  return buildWordPressMetadata(wpVacancy?.seo, {
    title: title ? `${title} - 166 Təmizlik` : "Vakansiya - 166 Təmizlik",
    description,
  });
}

export async function VacancyDetailContent({ vacancySlug, locale = "az" }: { vacancySlug: string; locale?: Locale }) {
  const vacancy = vacancyDetails.find((item) => item.slug === vacancySlug);
  const wpVacancy = await getWordPressVacancy(vacancySlug, locale).catch(() => null);
  const copy = staticPageCopy[locale].vacancy;
  const title = wpVacancy?.title ?? vacancy?.title ?? "";

  if (!vacancy && !wpVacancy) {
    notFound();
  }

  return (
    <SitePage active="about" locale={locale} currentSlug={vacancySlug} routeKind="vacancyDetail">
      <WordPressSeoSchema seo={wpVacancy?.seo} />
      <section className="bg-[#f5f5f5]">
        <div
          className="container-shell grid h-[400px] place-items-center bg-cover bg-center max-md:h-[260px]"
          style={{ backgroundImage: `linear-gradient(rgb(0 0 0 / 35%), rgb(0 0 0 / 35%)), url(${pageHeroAssets.partners})` }}
        >
          <h1 className="max-w-[850px] px-5 text-center text-[32px] font-medium leading-none text-white max-md:text-[24px]">{title}</h1>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-[30px] pb-[50px]">
        <article className="container-shell rounded-[20px] bg-white px-[30px] py-[30px] text-[16px] font-normal leading-[24px] text-black max-md:px-5">
          {wpVacancy ? (
            <div className="wp-content space-y-5" dangerouslySetInnerHTML={{ __html: wpVacancy.content }} />
          ) : (
            <div className="space-y-6">
              <p>
                {copy.duties} – {vacancy?.duties.slice(0, 2).join("; – ")};
              </p>
              {vacancy && vacancy.duties.length > 2 ? <p>– {vacancy.duties.slice(2).join("; – ")}</p> : null}
              <p>Tələblər – {vacancy?.requirements.join("; – ")};</p>
            </div>
          )}
          <Link
            href={getLocalizedHref(locale, "/166-temizlik-elaqe/")}
            className="mt-[34px] inline-flex h-[39px] items-center justify-center rounded-full bg-brand-yellow px-[30px] text-[15px] font-medium leading-none text-[#0e0e0e] transition-colors hover:bg-black hover:text-white"
          >
            CV Göndər
          </Link>
        </article>
      </section>
    </SitePage>
  );
}

export default async function VacancyDetailPage({ params }: { params: Promise<{ vacancySlug: string }> }) {
  const { vacancySlug } = await params;
  return <VacancyDetailContent vacancySlug={vacancySlug} />;
}
