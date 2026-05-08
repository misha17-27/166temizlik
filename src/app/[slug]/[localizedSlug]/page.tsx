import { notFound } from "next/navigation";
import { ContactPageContent } from "@/app/166-temizlik-elaqe/page";
import { ServiceDetailContent } from "@/app/[slug]/page";
import { BlogPageContent } from "@/app/bloq/page";
import { EmployeesPageContent } from "@/app/emekdaslarimiz/page";
import { PartnersPageContent } from "@/app/partnyorlar/page";
import { GalleryPageContent } from "@/app/qalereya/page";
import { AboutPageContent } from "@/app/sirket-haqqinda/page";
import { EquipmentPageContent } from "@/app/temizlik-xidmeti/page";
import { ServicesPageContent } from "@/app/temizlik-xidmetleri/page";
import { VacancyPageContent } from "@/app/vakansiya/page";
import { getLocalizedServicePages, pageCopy } from "@/lib/i18n";
import { servicePages } from "@/lib/pages-data";
import {
  getLocalizedStaticParams,
  isLocale,
  resolveLocalizedSlug,
  type Locale,
  type StaticRouteKey,
} from "@/lib/routes";
import { staticPageCopy } from "@/lib/static-page-copy";

type PageParams = {
  slug: string;
  localizedSlug: string;
};

const staticTitleKeys: Partial<Record<StaticRouteKey, (locale: Locale) => string>> = {
  services: (locale) => pageCopy[locale].servicesTitle,
  about: (locale) => staticPageCopy[locale].about.title,
  gallery: (locale) => staticPageCopy[locale].gallery.title,
  contact: (locale) => staticPageCopy[locale].contact.contactTitle,
  blog: (locale) => staticPageCopy[locale].blog.title,
  equipment: (locale) => staticPageCopy[locale].equipment.title,
  partners: (locale) => staticPageCopy[locale].partners.title,
  employees: (locale) => staticPageCopy[locale].employees.title,
  vacancy: (locale) => staticPageCopy[locale].vacancy.title,
};

export function generateStaticParams() {
  return getLocalizedStaticParams().map((item) => ({
    slug: item.locale,
    localizedSlug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { slug: localeParam, localizedSlug } = await params;

  if (!isLocale(localeParam) || localeParam === "az") {
    return { title: "166 Təmizlik" };
  }

  const match = resolveLocalizedSlug(localeParam, localizedSlug);

  if (!match) {
    return { title: "166 Təmizlik" };
  }

  if (match.kind === "service") {
    const service = getLocalizedServicePages(servicePages, localeParam).find((item) => item.slug === match.canonicalSlug);
    return {
      title: service ? `${service.title} - 166 Təmizlik` : "166 Təmizlik",
    };
  }

  return {
    title: `${staticTitleKeys[match.routeKey ?? "home"]?.(localeParam) ?? "166 Təmizlik"} - 166 Təmizlik`,
  };
}

export default async function LocalizedSlugPage({ params }: { params: Promise<PageParams> }) {
  const { slug: localeParam, localizedSlug } = await params;

  if (!isLocale(localeParam) || localeParam === "az") {
    notFound();
  }

  const match = resolveLocalizedSlug(localeParam, localizedSlug);

  if (!match) {
    notFound();
  }

  if (match.kind === "service") {
    return <ServiceDetailContent slug={match.canonicalSlug} locale={localeParam} />;
  }

  switch (match.routeKey) {
    case "services":
      return <ServicesPageContent locale={localeParam} />;
    case "about":
      return <AboutPageContent locale={localeParam} />;
    case "gallery":
      return <GalleryPageContent locale={localeParam} />;
    case "contact":
      return <ContactPageContent locale={localeParam} />;
    case "blog":
      return <BlogPageContent locale={localeParam} />;
    case "equipment":
      return <EquipmentPageContent locale={localeParam} />;
    case "partners":
      return <PartnersPageContent locale={localeParam} />;
    case "employees":
      return <EmployeesPageContent locale={localeParam} />;
    case "vacancy":
      return <VacancyPageContent locale={localeParam} />;
    default:
      notFound();
  }
}
