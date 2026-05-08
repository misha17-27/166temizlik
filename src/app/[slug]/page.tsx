import Image from "next/image";
import { notFound } from "next/navigation";
import { CleaningPackageCard } from "@/components/CleaningPackageCard";
import { ClockIcon } from "@/components/ClockIcon";
import { SitePage } from "@/components/SiteChrome";
import { getLocalizedServicePages, homeCopy, pageCopy, type Locale } from "@/lib/i18n";
import { pageHeroAssets, servicePages } from "@/lib/pages-data";
import { site } from "@/lib/site-data";

const packageTitles: Record<Locale, { four: string; eight: string }> = {
  az: { four: "4 saat", eight: "8 saat" },
  ru: { four: "4 часа", eight: "8 часов" },
  tr: { four: "4 saat", eight: "8 saat" },
};

type ServicePageItem = (typeof servicePages)[number];

const detailImageSets: Record<string, string[]> = {
  "ev-temizliyi-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-8-1.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyiiii.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-ve-cilciraq-temizliyi-her-ikisine-geder.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/metbex-temizliyi3.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-1.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-3.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-5.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-6.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-7.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-12-1.webp",
  ],
  "ofis-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8062.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8110.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8224.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8093.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8070.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8016.jpg",
  ],
  "bag-evlerinin-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2024/05/t-mzilik-xidm-ti.webp",
    "https://166temizlik.az/wp-content/uploads/2024/05/toz-alma-xidm-ti4-1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03584-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03584.webp",
  ],
  "erazi-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/02/erazi2-1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/02/erazi3-1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/02/6237238ed7fec9df2f8a5ef54160bf80-1.png",
  ],
  "fasad-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/02/fasad1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/02/fasad2-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/03/fasad.webp",
  ],
  "pencere-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2024/05/p-nc-r-t-mizliyi.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/pencere-temizliyi-metbex-temizliyi-fon.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08231.jpg",
  ],
  "cilciraq-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03718.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03721.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03722.webp",
    "https://166temizlik.az/wp-content/uploads/2023/01/cilciraq4.jpg",
  ],
  "perde-yuma": [
    "https://166temizlik.az/wp-content/uploads/2023/05/222.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08248-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08207.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08236.jpg",
  ],
  "yumsaq-mebel-temizlenmesi": [
    "https://166temizlik.az/wp-content/uploads/2024/01/WhatsApp-Image-2023-12-20-at-21.06.50-2.webp",
    "https://166temizlik.az/wp-content/uploads/2023/02/yumshaq2.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/03/mebel.webp",
  ],
  etirlendirme: [
    "https://166temizlik.az/wp-content/uploads/2023/02/etir.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/02/6f736f7db92cef24bb99d694c2e7c2c6-1-1.png",
    "https://166temizlik.az/wp-content/uploads/2023/02/Air_Purifier_iStock_607646922.7.webp",
  ],
  "baximsiz-ev-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/01/e427f74ecdda74a13f0ddf96c4a31341-1.png",
    "https://166temizlik.az/wp-content/uploads/2023/01/6c0c0d48bb70a4c7a8634111438b8b97-1.png",
    "https://166temizlik.az/wp-content/uploads/2023/02/gozel222-1.webp",
  ],
  "yangindan-sonra-ev-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/01/yangin222.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/01/yangin333.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/03/yangin.jpg",
  ],
  "temir-sonrasi-temizlik": [
    "https://166temizlik.az/wp-content/uploads/2023/02/fit_960_530_false_crop_1000_562_0_52_q90_2709852_1b72823ed32f1521bbdb3e471.webp",
    "https://166temizlik.az/wp-content/uploads/2023/02/XXL-1.webp",
    "https://166temizlik.az/wp-content/uploads/2023/02/8ff3e8c4c9.webp",
  ],
  "otel-temizlenmesi": [
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03405-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03522-1-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03357.webp",
  ],
  "restoran-temizlenmesi": [
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A7451.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A7802.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8070.jpg",
  ],
  "kristallasdirma-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2024/02/image-89a.webp",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-83a.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-91.jpg",
  ],
  "hovuz-temizlenmesi-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2024/02/image-89-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-83-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-48.webp",
  ],
  "korporativ-temizlik-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-16-at-13.35.38-1.jpeg",
    "https://166temizlik.az/wp-content/uploads/2023/02/business-partners.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/09/DSCF2761.webp",
  ],
};

const serviceLongCopy: Record<string, string[]> = {
  "ev-temizliyi-xidmeti": [
    "Təmizliyinizi 166 Təmizlik Xidmətinin peşəkar komandasına həvalə etməklə vaxtınıza qənaət edin! İş və ailə həyatının bu qədər stresli olduğu bir vaxtda ev təmizliyinə saatlarınızı sərf etmək böyük enerji tələb edir. 166-ya bir zənglə və ya saytımıza yazmaqla istəyinizə uyğun gündəlik və əsaslı təmizlik xidməti sifariş edib, evinizdəki bütün təmizlik işlərini yoluna qoya bilərsiniz.",
    "Sizin üçün daha doğru qiymət təklifimizi formalaşdırmaq üçün ilkin mərhələdə evinizə baxış keçirilir və təmizlik paketlərimiz müştərilərimizin istəklərinə uyğun olaraq optimallaşdırılır. Beləcə, təmizlik paketinə istədiyiniz təmizliyi əlavə edə və ya çıxara bilərsiniz. Xidmət zamanı təmizlik işçilərinin sayı, təmizlik olunacaq saat və müddət müştərilərimizin istəyinə uyğun təyin olunur.",
  ],
  "ofis-temizliyi": [
    "Ofis təmizliyi rahat iş mühitinin, əməkdaşların sağlamlığının və məhsuldarlığın qorunması üçün vacibdir. Peşəkar komandamız ofislərin ölçüsünə və iş qrafikinə uyğun təmizlik planı hazırlayır.",
    "Təmiz və səliqəli ofis həm əməkdaşların rahatlığına, həm də şirkətin imicinə müsbət təsir göstərir. Xidmət zamanı mebel, döşəmə, pəncərə və sanitar sahələr diqqətlə təmizlənir.",
  ],
  "korporativ-temizlik-xidmeti": [
    "Korporativ əməkdaşlıq şirkətimizin əsas prioritetlərindən biridir. Müqaviləli müştərilər üçün operativ sifariş, nəzarət və keyfiyyət izləmə sistemi ilə xidmət göstəririk.",
    "166 Təmizlik xidmətinin korporativ təmizliyi biznes proseslərini rahatlaşdırır, obyektlərin davamlı səliqəsini və müştəri məmnuniyyətini qorumağa kömək edir.",
  ],
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  return {
    title: service ? `${service.title} - 166 Təmizlik` : "166 Təmizlik",
  };
}

export function ServiceDetailContent({ slug, locale = "az" }: { slug: string; locale?: Locale }) {
  const localizedServicePages = getLocalizedServicePages(servicePages, locale);
  const service = localizedServicePages.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const copy = pageCopy[locale];
  const images = detailImageSets[service.slug] ?? [service.image];
  const paragraphs =
    locale === "az"
      ? serviceLongCopy[service.slug] ?? [
          service.description,
          "166 Təmizlik Xidməti bu istiqamətdə peşəkar komanda, müasir avadanlıq və keyfiyyətli təmizləyici vasitələrlə xidmət göstərir. Sifarişin həcmi, məkanın vəziyyəti və müştərinin istəyinə uyğun olaraq xidmət planı formalaşdırılır.",
        ]
      : [service.description, copy.bottomText];
  const heroImage = service.slug === "korporativ-temizlik-xidmeti" ? pageHeroAssets.partners : pageHeroAssets.blog;

  return (
    <SitePage active="services" locale={locale} currentSlug={service.slug} routeKind="service">
      <DetailHero title={service.title} heroImage={heroImage} subtitle={copy.subtitle} />
      <IntroBlocks service={service} images={images} paragraphs={paragraphs} />
      <IncludedSection service={service} images={images} locale={locale} />
      <PackagesAndNote locale={locale} />
      <OrderFormSection serviceTitle={service.title} locale={locale} />
      <BottomImageCta locale={locale} />
    </SitePage>
  );
}

function getGalleryImages(images: string[]) {
  const source = images.length > 5 ? images.slice(2) : images;

  return Array.from({ length: 8 }, (_, index) => source[index % source.length]);
}

function DetailHero({ title, heroImage, subtitle }: { title: string; heroImage: string; subtitle: string }) {
  return (
    <section className="bg-[#f7f7f7]">
      <div className="mx-auto w-[min(1140px,calc(100%-40px))] max-sm:w-full">
        <div className="relative h-[400px] overflow-hidden max-lg:h-[320px] max-md:h-[230px]">
          <Image src={heroImage} alt="" fill priority sizes="1140px" className="object-cover" />
          <div className="absolute inset-0 bg-black/38" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
            <h1 className="text-[28px] font-bold leading-tight max-md:text-[23px]">{title}</h1>
            <p className="mt-3 text-[16px] font-semibold max-md:text-[13px]">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FramedImage({
  src,
  alt,
  tone = "yellow",
  heightClass = "h-[369px]",
}: {
  src: string;
  alt: string;
  tone?: "yellow" | "blue";
  heightClass?: string;
}) {
  return (
    <div className={`relative p-[10px] max-md:h-[250px] ${heightClass} ${tone === "yellow" ? "bg-brand-yellow" : "bg-brand-blue"}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 400px" className="object-cover p-[10px]" />
    </div>
  );
}

function IntroTextCard({
  children,
  reverse = false,
  heightClass = "h-[349px]",
}: {
  children: React.ReactNode;
  reverse?: boolean;
  heightClass?: string;
}) {
  return (
    <div
      className={`mt-5 flex items-center bg-white p-[30px] text-[16px] font-medium leading-[24px] text-black shadow-[5px_10px_10px_rgb(0_0_0_/_11%)] max-md:mt-0 max-md:h-auto max-md:p-6 ${heightClass} ${
        reverse
          ? "mr-[30px] rounded-[30px_0_0_30px] max-lg:mr-0 max-md:rounded-[20px]"
          : "ml-[30px] rounded-[0_30px_30px_0] max-lg:ml-0 max-md:rounded-[20px]"
      }`}
    >
      {children}
    </div>
  );
}

function IntroBlocks({ service, images, paragraphs }: { service: ServicePageItem; images: string[]; paragraphs: string[] }) {
  return (
    <section className="bg-[#f7f7f7] pb-14 pt-[50px]">
      <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
        <div className="grid grid-cols-[396px_1fr] items-start gap-0 max-lg:grid-cols-1">
          <FramedImage src={images[0]} alt={service.title} />
          <IntroTextCard>
            <p>{paragraphs[0]}</p>
          </IntroTextCard>
        </div>
        <div className="mt-[50px] grid grid-cols-[1fr_396px] items-start gap-0 max-lg:grid-cols-1">
          <IntroTextCard reverse heightClass="h-[286px]">
            <p>{paragraphs[1] ?? service.description}</p>
          </IntroTextCard>
          <FramedImage src={images[1] ?? images[0]} alt={service.title} tone="blue" heightClass="h-[306px]" />
        </div>
      </div>
    </section>
  );
}

function IncludedGallery({ images, title }: { images: string[]; title: string }) {
  const gallery = getGalleryImages(images);
  const columns = [
    [
      { image: gallery[0], height: "h-[218px]" },
      { image: gallery[5], height: "h-[218px]" },
    ],
    [
      { image: gallery[1], height: "h-[182px]" },
      { image: gallery[4], height: "h-[218px]" },
    ],
    [
      { image: gallery[2], height: "h-[218px]" },
      { image: gallery[6], height: "h-[182px]" },
    ],
    [
      { image: gallery[3], height: "h-[218px]" },
      { image: gallery[7], height: "h-[218px]" },
    ],
  ];

  return (
    <div className="grid w-full grid-cols-4 gap-[10px] p-[10px] max-sm:grid-cols-2">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-[10px]">
          {column.map((item, imageIndex) => (
            <div key={`${item.image}-${columnIndex}-${imageIndex}`} className={`relative overflow-hidden ${item.height} max-sm:h-[165px]`}>
              <Image src={item.image} alt={`${title} ${columnIndex * 2 + imageIndex + 1}`} fill sizes="146px" className="object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function IncludedSection({ service, images, locale }: { service: ServicePageItem; images: string[]; locale: Locale }) {
  const copy = pageCopy[locale];
  const title = service.slug === "ev-temizliyi-xidmeti" ? copy.includedHome : `${service.title} ${copy.included}`;

  return (
    <section className="bg-[#f7f7f7] pb-12">
      <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
        <h2 className="text-center text-[20px] font-semibold text-black max-md:text-[18px]">{title}</h2>
        <div className="mt-[30px] grid grid-cols-[632px_508px] gap-0 max-lg:grid-cols-1">
          <div className="w-full">
            <IncludedGallery images={images} title={service.title} />
          </div>
          <div className="flex flex-col gap-5 px-[30px] max-lg:mt-8 max-lg:px-0">
            {service.bullets.map((item, index) => (
              <div
                key={item}
                className={`flex h-[52px] items-center justify-center rounded-[8px] border bg-white px-4 text-center text-[20px] font-medium leading-[20px] text-black max-md:text-[16px] ${
                  index % 2 === 0 ? "border-[#008cfd]" : "border-[#ffd600]"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-9 text-center text-[13px] font-semibold text-black">
          {copy.serviceCare}
        </p>
      </div>
    </section>
  );
}

function HourlyCards({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];

  return (
    <div className="grid grid-cols-5 gap-5 max-lg:grid-cols-3 max-sm:grid-cols-1">
      {copy.hourlyPrices.map((price) => (
        <article key={price.time} className="rounded-[12px] bg-white px-4 py-5 text-center shadow-[0_6px_20px_rgb(0_116_202_/_7%)]">
          <div className="mx-auto mb-3 grid h-[42px] w-[42px] place-items-center rounded-full bg-[#95df22] text-white">
            <ClockIcon className="h-[23px] w-[23px]" strokeWidth={2.1} />
          </div>
          <h3 className="text-[15px] font-bold text-black">{price.time}</h3>
          <p className="mt-2 text-[11px] leading-[1.5] text-black">
            {price.city}
            <br />
            {price.village}
            <br />
            {copy.hourlyHelper}
          </p>
        </article>
      ))}
    </div>
  );
}

function NotePanel({ locale }: { locale: Locale }) {
  const copy = pageCopy[locale];

  return (
    <div className="mx-auto grid max-w-[850px] grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-[14px] bg-brand-blue text-white max-md:grid-cols-1">
      <div className="relative min-h-[265px] overflow-hidden max-md:min-h-[220px]">
        <Image src={site.noteImage} alt={copy.noteTitle} fill sizes="360px" className="object-cover" />
        <div className="absolute -right-10 top-[-20%] h-[140%] w-[90px] rounded-[50%] border-r-[18px] border-[#ffd600] bg-brand-blue max-md:hidden" />
      </div>
      <div className="px-10 py-9 max-md:px-6">
        <h3 className="text-[22px] font-bold">{copy.noteTitle}</h3>
        <p className="mt-5 text-[13px] font-semibold leading-[1.6] text-white">
          {copy.noteText}
        </p>
      </div>
    </div>
  );
}

function PackagesAndNote({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const titles = packageTitles[locale];

  return (
    <section className="bg-[#f7f7f7] pb-20">
      <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
        <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
          <CleaningPackageCard title={titles.four} items={copy.packageFeatures.fourHours} priceKey="four" tone="blue" variant="detail" weeklyItems={copy.weeklyPrices} toggleLabels={copy.packageLabels} />
          <CleaningPackageCard title={titles.eight} items={copy.packageFeatures.eightHours} priceKey="eight" tone="yellow" variant="detail" weeklyItems={copy.weeklyPrices} toggleLabels={copy.packageLabels} />
        </div>
        <div className="mt-[92px] rounded-[30px] bg-[#e4efff] px-[42px] pb-[70px] pt-0 max-lg:px-8 max-md:mt-10 max-md:px-4 max-md:py-8">
          <div className="relative z-10 -translate-y-[54px] max-md:translate-y-0">
            <HourlyCards locale={locale} />
          </div>
          <div className="pt-[72px] max-md:pt-8">
            <NotePanel locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderFormSection({ serviceTitle, locale }: { serviceTitle: string; locale: Locale }) {
  const copy = pageCopy[locale];

  return (
    <section className="relative overflow-hidden bg-[#eaf7ff] py-[95px]">
      <div className="absolute -right-16 bottom-[-90px] h-[420px] w-[520px] rotate-[-18deg] border-[42px] border-brand-blue max-md:hidden" />
      <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
        <form className="max-w-[430px]">
          <h2 className="text-[22px] font-semibold text-black">{copy.packagesTitle}</h2>
          <p className="mt-2 text-[12px] leading-[1.5] text-black/75">{copy.packagesIntro}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <input className="h-10 border-0 bg-white px-4 text-[12px] outline-none" placeholder={copy.formName} />
            <input className="h-10 border-0 bg-white px-4 text-[12px] outline-none" placeholder={copy.formPhone} />
          </div>
          <select className="mt-3 h-10 w-full border-0 bg-white px-4 text-[12px] text-black/70 outline-none" defaultValue={serviceTitle}>
            <option>{serviceTitle}</option>
          </select>
          <input className="mt-3 h-10 w-full border-0 bg-white px-4 text-[12px] outline-none" placeholder={copy.formAddress} />
          <textarea className="mt-3 h-[92px] w-full resize-none border-0 bg-white px-4 py-3 text-[12px] outline-none" placeholder={copy.formMessage} />
          <button type="button" className="mt-4 rounded-full bg-brand-yellow px-8 py-3 text-[12px] font-bold text-black">
            {copy.order}
          </button>
        </form>
      </div>
    </section>
  );
}

function BottomImageCta({ locale }: { locale: Locale }) {
  const copy = pageCopy[locale];

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-black text-white max-md:min-h-[430px]">
      <Image src="https://166temizlik.az/wp-content/uploads/2023/01/d5330e546919a7c0d9970c407935da78-1.jpeg" alt="" fill sizes="100vw" className="object-cover opacity-55" />
      <div className="relative mx-auto flex min-h-[600px] w-[min(1140px,calc(100%-40px))] items-center justify-end max-md:min-h-[430px] max-md:justify-center">
        <p className="max-w-[490px] text-[14px] font-semibold leading-[1.65] text-white">
          {copy.bottomText}
        </p>
      </div>
    </section>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetailContent slug={slug} />;
}
