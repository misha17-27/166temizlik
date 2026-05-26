import Image from "next/image";
import { SitePage } from "@/components/SiteChrome";
import { getLocalizedEmployees, pageHeroAssets } from "@/lib/pages-data";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";
import { getWordPressEmployees, getWordPressImageUrl, stripHtml } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Əməkdaşlarımız - 166 Təmizlik",
};

async function getEmployeeCards(locale: Locale) {
  try {
    const response = await getWordPressEmployees(locale);
    if (response.items.length > 0) {
      return response.items.map((person) => ({
        name: person.title,
        role: stripHtml(person.excerpt || person.content),
        image: getWordPressImageUrl(person),
      }));
    }
  } catch {
    // Keep the frontend available if WordPress is temporarily unavailable.
  }

  return getLocalizedEmployees(locale);
}

export async function EmployeesPageContent({ locale = "az" }: { locale?: Locale }) {
  const copy = staticPageCopy[locale].employees;
  const employees = await getEmployeeCards(locale);

  return (
    <SitePage active="about" locale={locale} currentSlug="employees">
      <section className="relative h-[410px] bg-white max-md:h-[240px]">
        <Image src={pageHeroAssets.employees} alt={copy.title} fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-white/35" />
        <div className="container-shell relative flex h-full items-center">
          <h1 className="text-[30px] font-medium text-[#202b90] max-md:text-[24px]">{copy.title}</h1>
        </div>
      </section>

      <section className="bg-white py-16 pb-20">
        <div className="container-shell grid grid-cols-4 gap-x-9 gap-y-9 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {employees.map((person) => (
            <article key={person.name} className="overflow-hidden rounded-[8px] bg-brand-blue">
              <div className="relative h-[390px] bg-[#eef6ff] max-md:h-[340px]">
                <Image src={person.image} alt={person.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-top" />
              </div>
              <div className="grid min-h-[105px] place-items-center px-5 py-5 text-center text-white">
                <div>
                  <h2 className="text-[17px] font-bold">{person.name}</h2>
                  <p className="mt-3 text-[13px] font-semibold leading-[1.35]">{person.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SitePage>
  );
}

export default function EmployeesPage() {
  return <EmployeesPageContent />;
}
