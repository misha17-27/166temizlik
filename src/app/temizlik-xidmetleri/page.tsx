import Image from "next/image";
import Link from "next/link";
import { SitePage } from "@/components/SiteChrome";
import { getLocalizedServicePages, pageCopy, type Locale } from "@/lib/i18n";
import { pageHeroAssets, servicePages } from "@/lib/pages-data";

export const metadata = {
  title: "Təmizlik xidmətləri - 166 Təmizlik",
};

const serviceListImages: Record<string, string> = {
  "ev-temizliyi-xidmeti": "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyiiii.webp",
  "ofis-temizliyi": "https://166temizlik.az/wp-content/uploads/2023/05/J1A8062.jpg",
  "bag-evlerinin-temizliyi": "https://166temizlik.az/wp-content/uploads/2024/12/HRS03584.webp",
  "erazi-temizliyi": "https://166temizlik.az/wp-content/uploads/2023/02/razi-t-mizliyi-1.webp",
  "fasad-temizliyi": "https://166temizlik.az/wp-content/uploads/2023/03/fasad.webp",
  "pencere-temizliyi": "https://166temizlik.az/wp-content/uploads/2023/07/pencere-temizliyi-metbex-temizliyi-fon.jpg",
  "cilciraq-temizliyi": "https://166temizlik.az/wp-content/uploads/2024/12/HRS03718.webp",
  "perde-yuma": "https://166temizlik.az/wp-content/uploads/2023/05/DSC08236.jpg",
  "yumsaq-mebel-temizlenmesi": "https://166temizlik.az/wp-content/uploads/2023/03/mebel.webp",
  etirlendirme: "https://166temizlik.az/wp-content/uploads/2023/02/Air_Purifier_iStock_607646922.7.webp",
  "baximsiz-ev-temizliyi": "https://166temizlik.az/wp-content/uploads/2023/02/gozel222-1.webp",
  "yangindan-sonra-ev-temizliyi": "https://166temizlik.az/wp-content/uploads/2023/03/yangin.jpg",
  "temir-sonrasi-temizlik": "https://166temizlik.az/wp-content/uploads/2023/02/fit_960_530_false_crop_1000_562_0_52_q90_2709852_1b72823ed32f1521bbdb3e471.webp",
  "otel-temizlenmesi": "https://166temizlik.az/wp-content/uploads/2024/12/HRS03357.webp",
  "restoran-temizlenmesi": "https://166temizlik.az/wp-content/uploads/2023/05/J1A7802.jpg",
  "kristallasdirma-xidmeti": "https://166temizlik.az/wp-content/uploads/2024/02/image-89a.webp",
  "hovuz-temizlenmesi-xidmeti": "https://166temizlik.az/wp-content/uploads/2024/02/image-89-1.webp",
  "korporativ-temizlik-xidmeti": "https://166temizlik.az/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-16-at-13.35.38-1.jpeg",
};

const serviceOrder = [
  "ev-temizliyi-xidmeti",
  "ofis-temizliyi",
  "bag-evlerinin-temizliyi",
  "erazi-temizliyi",
  "fasad-temizliyi",
  "pencere-temizliyi",
  "cilciraq-temizliyi",
  "perde-yuma",
  "yumsaq-mebel-temizlenmesi",
  "etirlendirme",
  "baximsiz-ev-temizliyi",
  "yangindan-sonra-ev-temizliyi",
  "temir-sonrasi-temizlik",
  "otel-temizlenmesi",
  "restoran-temizlenmesi",
  "kristallasdirma-xidmeti",
  "hovuz-temizlenmesi-xidmeti",
  "korporativ-temizlik-xidmeti",
];

function ServicesHero({ locale }: { locale: Locale }) {
  const copy = pageCopy[locale];

  return (
    <section className="bg-[#f7f7f7] pb-8">
      <div className="mx-auto w-[min(980px,calc(100%-40px))] max-sm:w-full">
        <div className="relative h-[260px] overflow-hidden max-md:h-[220px] max-sm:h-[190px]">
          <Image src={pageHeroAssets.blog} alt="" fill priority sizes="980px" className="object-cover" />
          <div className="absolute inset-0 bg-black/38" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
            <h1 className="text-[29px] font-bold leading-tight max-md:text-[25px]">{copy.servicesTitle}</h1>
            <p className="mt-3 text-[17px] font-semibold max-md:text-[14px]">{copy.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceListCard({
  service,
  reverse,
  locale,
}: {
  service: (typeof servicePages)[number];
  reverse: boolean;
  locale: Locale;
}) {
  const copy = pageCopy[locale];

  return (
    <article className="grid min-h-[178px] grid-cols-[300px_1fr] overflow-hidden rounded-[16px] bg-white shadow-[0_10px_28px_rgb(15_23_42_/_6%)] max-md:grid-cols-1">
      <div className={`relative min-h-[178px] max-md:min-h-[220px] ${reverse ? "md:order-2" : ""}`}>
        <Image
          src={serviceListImages[service.slug] ?? service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-8 py-6 max-md:px-6">
        <h2 className="text-[15px] font-bold leading-tight text-black">{service.title}</h2>
        <p className="mt-3 max-w-[560px] text-[12px] font-normal leading-[1.55] text-black/70">{service.description}</p>
        <Link
          href={service.href}
          prefetch={false}
          className="mt-5 inline-flex w-fit rounded-full bg-brand-yellow px-5 py-2 text-[10px] font-bold text-black transition hover:bg-[#ffd900]"
        >
          {copy.readMore}
        </Link>
      </div>
    </article>
  );
}

export function ServicesPageContent({ locale = "az" }: { locale?: Locale }) {
  const localizedServicePages = getLocalizedServicePages(servicePages, locale);
  const orderedServices = serviceOrder
    .map((slug) => localizedServicePages.find((service) => service.slug === slug))
    .filter((service): service is (typeof servicePages)[number] => Boolean(service));

  return (
    <SitePage active="services" locale={locale} currentSlug="services">
      <ServicesHero locale={locale} />
      <section className="relative overflow-hidden bg-[#f7f7f7] pb-20 pt-7 max-md:pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_7%_38%,rgba(255,236,20,0.22),transparent_34%),radial-gradient(circle_at_94%_48%,rgba(0,116,202,0.16),transparent_36%)]" />
        <div className="relative mx-auto flex w-[min(980px,calc(100%-40px))] flex-col gap-6">
          {orderedServices.map((service, index) => (
            <ServiceListCard key={service.slug} service={service} reverse={index % 2 === 1} locale={locale} />
          ))}
        </div>
      </section>
    </SitePage>
  );
}

export default function ServicesPage() {
  return <ServicesPageContent />;
}
