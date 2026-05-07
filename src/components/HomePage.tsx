import Image from "next/image";
import Link from "next/link";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { CleaningPackageCard } from "@/components/CleaningPackageCard";
import { ClockIcon } from "@/components/ClockIcon";
import { HeroSlider } from "@/components/HeroSlider";
import { CtaFooter, Header } from "@/components/SiteChrome";
import { getLocalizedServices, homeCopy, type Locale } from "@/lib/i18n";
import { partners, site } from "@/lib/site-data";

const packageTitles: Record<Locale, { four: string; eight: string }> = {
  az: { four: "4 saat", eight: "8 saat" },
  ru: { four: "4 часа", eight: "8 часов" },
  tr: { four: "4 saat", eight: "8 saat" },
};

type HomeCopy = (typeof homeCopy)[Locale];

function ServicesSection({ locale, title }: { locale: Locale; title: string }) {
  const localizedServices = getLocalizedServices(locale);

  return (
    <section id="services" className="bg-[#f5f5f5] py-16 max-md:py-10">
      <div className="container-shell">
        <h2 className="section-title mb-12">{title}</h2>
        <div className="grid grid-cols-5 gap-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-4">
          {localizedServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              prefetch={false}
              className="group flex min-h-[190px] flex-col items-center justify-center rounded-[14px] bg-white p-6 text-center shadow-[0_14px_34px_rgb(15_23_42_/_8%)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgb(0_116_202_/_16%)] max-sm:min-h-[200px]"
            >
              <div className="relative mb-5 h-20 w-28">
                <Image src={service.icon} alt="" fill sizes="120px" className="object-contain" />
              </div>
              <h3 className="text-[15px] font-semibold leading-tight text-black max-sm:text-[14px]">{service.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HourlyPriceStrip({ copy }: { copy: HomeCopy }) {
  return (
    <div className="relative">
      <div className="relative grid grid-cols-5 gap-5 max-lg:grid-cols-3 max-sm:grid-cols-1">
        {copy.hourlyPrices.map((price) => (
          <article key={price.time} className="rounded-[16px] bg-white px-5 py-7 text-center shadow-[0_6px_20px_rgb(0_116_202_/_8%)]">
            <div className="mx-auto mb-5 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#95df22] text-white">
              <ClockIcon className="h-[30px] w-[30px]" strokeWidth={2.1} />
            </div>
            <h3 className="text-[19px] font-bold text-black">{price.time}</h3>
            <p className="mt-3 text-[15px] leading-[1.45] text-black">
              {price.city}
              <br />
              {price.village}
              <br />
              {copy.hourlyHelper}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function PricesSection({ copy, locale }: { copy: HomeCopy; locale: Locale }) {
  const titles = packageTitles[locale];

  return (
    <section className="bg-white pb-10 pt-16 max-md:pt-10">
      <div className="container-shell">
        <h2 className="section-title mb-20">{copy.packagesTitle}</h2>
        <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
          <CleaningPackageCard
            title={titles.four}
            items={copy.packageFeatures.fourHours}
            priceKey="four"
            tone="blue"
            weeklyItems={copy.weeklyPrices}
            toggleLabels={copy.packageLabels}
          />
          <CleaningPackageCard
            title={titles.eight}
            items={copy.packageFeatures.eightHours}
            priceKey="eight"
            tone="yellow"
            weeklyItems={copy.weeklyPrices}
            toggleLabels={copy.packageLabels}
          />
        </div>
        <div className="mt-[95px] rounded-[30px] bg-[#e4efff] px-[48px] pb-[66px] pt-0 max-lg:px-7 max-md:mt-12 max-md:px-4 max-md:py-8">
          <div className="-translate-y-[58px] max-md:translate-y-0">
            <HourlyPriceStrip copy={copy} />
          </div>
          <div className="pt-[88px] max-md:pt-8">
            <NotePanel copy={copy} />
          </div>
        </div>
      </div>
    </section>
  );
}

function NotePanel({ copy }: { copy: HomeCopy }) {
  return (
    <div className="mx-auto grid min-h-[320px] w-full max-w-[900px] grid-cols-[0.75fr_1.15fr] overflow-hidden rounded-[14px] bg-brand-blue text-white max-lg:grid-cols-1">
      <div className="relative min-h-[320px] overflow-hidden max-lg:min-h-[260px]">
        <Image src={site.noteImage} alt={copy.noteAlt} fill sizes="520px" className="object-cover" />
        <div className="absolute -right-16 top-[-20%] h-[140%] w-[160px] rounded-[50%] border-r-[22px] border-[#ffd200] bg-brand-blue max-lg:hidden" />
      </div>
      <div className="px-12 py-8 max-lg:px-8 max-md:px-6">
        <h3 className="text-[30px] font-bold">{copy.noteTitle}</h3>
        <ul className="mt-8 list-disc space-y-2 pl-5 text-[18px] font-normal leading-[1.35] max-md:text-[16px]">
          {copy.notes.map((item) => (
            <li key={`${item.before}-${item.strong}`}>
              {item.before}
              <strong>{item.strong}</strong>
              {item.after}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AboutSection({ copy }: { copy: HomeCopy }) {
  return (
    <section id="about" className="bg-white">
      <div className="bg-[#eef6ff] py-14">
        <div className="container-shell grid grid-cols-2 items-center gap-16 max-lg:grid-cols-1">
          <div className="max-w-[500px]">
            <h2 className="text-[23px] font-bold uppercase tracking-normal text-black">
              {copy.about.lead} <span className="font-normal text-brand-blue">{copy.about.accent}</span>
            </h2>
            {copy.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-[15px] leading-[1.65] text-black">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative mx-auto h-[280px] w-full max-w-[430px]">
            <Image src={site.aboutImage} alt={copy.about.alt} fill sizes="430px" className="object-contain" />
          </div>
        </div>
      </div>

      <div className="py-14">
        <div className="container-shell text-center">
          <h2 className="text-[23px] font-bold uppercase text-black max-md:text-[19px]">
            {copy.about.mapTitle}
          </h2>
          <div className="relative mx-auto mt-8 h-[400px] w-full max-w-[610px] max-md:h-[270px]">
            <Image src={site.mapImage} alt={copy.about.mapAlt} fill sizes="610px" className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection({ copy }: { copy: HomeCopy }) {
  return <BeforeAfterGallery partnerLogos={partners} partnerTitle={copy.beforeAfterPartnerTitle} copy={copy.beforeAfter} />;
}

function TestimonialsSection({ copy }: { copy: HomeCopy }) {
  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="container-shell">
        <h2 className="section-title mb-12">{copy.testimonialsTitle}</h2>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {copy.testimonials.map((item) => (
            <article key={item.name} className="rounded-[18px] bg-white p-8 text-center shadow-[0_14px_34px_rgb(15_23_42_/_8%)]">
              <p className="text-6xl font-black leading-none text-brand-blue">“</p>
              <p className="min-h-[120px] text-[16px] font-semibold leading-7 text-[#344054]">{item.text}</p>
              <div className="relative mx-auto mt-6 h-[86px] w-[86px] overflow-hidden rounded-full">
                <Image src={item.image} alt={item.name} fill sizes="86px" className="object-cover" />
              </div>
              <h3 className="mt-4 text-[19px] font-black">{item.name}</h3>
              <p className="mt-2 text-2xl tracking-[4px] text-brand-yellow">★★★★★</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage({ locale = "az" }: { locale?: Locale }) {
  const copy = homeCopy[locale];

  return (
    <main>
      <Header locale={locale} />
      <HeroSlider slides={copy.heroSlides} />
      <ServicesSection locale={locale} title={copy.servicesTitle} />
      <PricesSection copy={copy} locale={locale} />
      <AboutSection copy={copy} />
      <BeforeAfterSection copy={copy} />
      <TestimonialsSection copy={copy} />
      <CtaFooter locale={locale} />
    </main>
  );
}
