import Link from "next/link";
import { SitePage } from "@/components/SiteChrome";
import { WordPressSeoSchema } from "@/components/WordPressSeoSchema";
import { getLocalizedVacancies, pageHeroAssets, vacancyDetails } from "@/lib/pages-data";
import { getVacancyHref, type Locale } from "@/lib/routes";
import { staticPageCopy } from "@/lib/static-page-copy";
import { getWordPressPage, getWordPressPageMetadata, getWordPressVacancies, stripHtml } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return getWordPressPageMetadata("vakansiya", "az", { title: "Vakansiya - 166 Təmizlik" });
}

type VacancyCard = {
  slug: string;
  title: string;
  summary: string;
  excerpt: string;
};

async function getVacancyCards(locale: Locale): Promise<VacancyCard[]> {
  try {
    const response = await getWordPressVacancies(locale, 1, 50);
    if (response.items.length > 0) {
      return response.items.map((vacancy) => ({
        slug: vacancy.slug,
        title: vacancy.title,
        summary: vacancy.title,
        excerpt: stripHtml(vacancy.excerpt || vacancy.content),
      }));
    }
  } catch {
    // Keep the frontend available if WordPress is temporarily unavailable.
  }

  return getLocalizedVacancies(locale).map((vacancy, index) => ({
    slug: vacancyDetails[index]?.slug ?? "",
    title: vacancy.title,
    summary: vacancy.summary,
    excerpt: vacancy.items.slice(0, 2).join("; "),
  }));
}

export async function VacancyPageContent({ locale = "az" }: { locale?: Locale }) {
  const copy = staticPageCopy[locale].vacancy;
  const sharedCopy = staticPageCopy[locale];
  const page = await getWordPressPage("vakansiya", locale).catch(() => null);
  const vacancies = await getVacancyCards(locale);
  const title = page?.title || copy.title;
  const heroImage = page?.featuredImage?.url || pageHeroAssets.partners;

  return (
    <SitePage active="about" locale={locale} currentSlug="vacancy">
      <WordPressSeoSchema seo={page?.seo} />
      <section className="bg-[#f5f5f5]">
        <div
          className="container-shell grid h-[520px] place-items-center bg-cover bg-center max-md:h-[280px]"
          style={{ backgroundImage: `linear-gradient(rgb(0 0 0 / 28%), rgb(0 0 0 / 28%)), url(${heroImage})` }}
        >
          <h1 className="text-[34px] font-bold text-white max-md:text-[28px]">{title}</h1>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-9 pb-16">
        <div className="container-shell rounded-[20px] bg-white p-8 max-md:p-4">
          <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
            {vacancies.map((vacancy) => {
              const href = getVacancyHref(vacancy.slug, locale);

              return (
                <article key={vacancy.slug || vacancy.title} className="bg-[#f7f7fb] px-8 py-7">
                  <h2 className="text-[25px] font-medium leading-[1.2] text-black max-md:text-[21px]">
                    <Link href={href} className="transition-colors hover:text-[#0075c9]">
                      {vacancy.summary}
                    </Link>
                  </h2>
                  <p className="mt-8 text-[15px] font-normal text-black">{vacancy.excerpt}</p>
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

export default async function VacancyPage() {
  return <VacancyPageContent />;
}
