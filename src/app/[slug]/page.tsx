import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/SiteChrome";
import { pageHeroAssets, servicePages } from "@/lib/pages-data";
import { packageFeatures, priceCircleImages, site, weeklyPrices } from "@/lib/site-data";

const detailImageSets: Record<string, string[]> = {
  "ev-temizliyi-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-8-1.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyiiii.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/metbex-temizliyi3.webp",
  ],
  "ofis-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8062.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8110.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8224.jpg",
  ],
  "bag-evlerinin-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2024/05/t-mzilik-xidm-ti.webp",
    "https://166temizlik.az/wp-content/uploads/2024/05/toz-alma-xidm-ti4-1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03584-1.webp",
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
  ],
  "perde-yuma": [
    "https://166temizlik.az/wp-content/uploads/2023/05/222.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08248-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08207.jpg",
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
    "Təmizliyinizi 166 Təmizlik Xidmətinin peşəkar komandasına həvalə etməklə vaxtınıza qənaət edin. İş və ailə həyatının bu qədər sürətli olduğu bir vaxtda ev təmizliyinə saatlar sərf etmək böyük enerji tələb edir.",
    "166-ya bir zənglə və ya saytımıza yazmaqla istəyinizə uyğun gündəlik və əsaslı təmizlik xidməti sifariş edib evinizdəki işləri yoluna qoya bilərsiniz.",
  ],
  "ofis-temizliyi": [
    "Ofis təmizliyi rahat iş mühitinin, əməkdaşların sağlamlığının və məhsuldarlığın qorunması üçün vacibdir. Peşəkar komandamız ofislərin ölçüsünə və iş qrafikinə uyğun təmizlik planı hazırlayır.",
  ],
  "korporativ-temizlik-xidmeti": [
    "Korporativ əməkdaşlıq şirkətimizin əsas prioritetlərindən biridir. Müqaviləli müştərilər üçün operativ sifariş, nəzarət və keyfiyyət izləmə sistemi ilə xidmət göstəririk.",
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

function DetailHero({ title, heroImage }: { title: string; heroImage: string }) {
  return (
    <section className="bg-[#f7f7f7] pb-10">
      <div className="mx-auto w-[min(980px,calc(100%-40px))] max-sm:w-full">
        <div className="relative h-[260px] overflow-hidden max-md:h-[220px] max-sm:h-[190px]">
          <Image src={heroImage} alt="" fill priority sizes="980px" className="object-cover" />
          <div className="absolute inset-0 bg-black/38" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
            <h1 className="text-[30px] font-bold leading-tight max-md:text-[25px]">{title}</h1>
            <p className="mt-3 text-[17px] font-semibold max-md:text-[14px]">Sevdiklərinizə və özünüzə zaman ayırın!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagePreview() {
  return (
    <section className="bg-white py-14 max-md:py-10">
      <div className="mx-auto w-[min(980px,calc(100%-40px))]">
        <h2 className="mb-12 text-center text-[28px] font-bold leading-tight text-black max-md:text-[23px]">Təmizlik paketləri</h2>
        <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
          {[
            { title: "4 saat", items: packageFeatures.fourHours, image: priceCircleImages.four, color: "bg-[#1097ed]" },
            { title: "8 saat", items: packageFeatures.eightHours, image: priceCircleImages.eight, color: "bg-[#ffd000]" },
          ].map((pack) => (
            <article key={pack.title} className="relative rounded-[18px] bg-white px-8 pb-8 pt-16 shadow-[0_8px_24px_rgb(0_116_202_/_9%)] max-md:px-5">
              <div className={`absolute -top-3 left-8 rounded-full px-9 py-3 text-[16px] font-semibold text-white ${pack.color}`}>{pack.title}</div>
              <ol className="min-h-[150px] space-y-2 text-[15px] leading-[1.45] text-black">
                {pack.items.slice(0, 6).map((item, index) => (
                  <li key={item}>
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {weeklyPrices.map((price) => (
                  <div key={price.label} className="text-center">
                    <p className="mb-2 text-[12px] font-semibold text-black">{price.label}</p>
                    <div className="relative mx-auto grid h-[78px] w-[78px] place-items-center">
                      <Image src={pack.image} alt="" fill sizes="78px" className="object-contain" />
                      <span className="relative text-[19px] font-semibold text-white">{pack.title === "4 saat" ? price.four : price.eight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const images = detailImageSets[service.slug] ?? [service.image];
  const heroImage = service.slug === "korporativ-temizlik-xidmeti" ? pageHeroAssets.partners : pageHeroAssets.blog;
  const copy = serviceLongCopy[service.slug] ?? [service.description];

  return (
    <SitePage active="services">
      <DetailHero title={service.title} heroImage={heroImage} />
      <section className="bg-white pb-10 pt-4">
        <div className="mx-auto w-[min(980px,calc(100%-40px))]">
          <div className="grid grid-cols-[0.9fr_1fr] items-center gap-12 max-lg:grid-cols-1">
            <div className="relative min-h-[360px] overflow-hidden rounded-[16px] bg-[#eef6ff] shadow-[0_14px_36px_rgb(15_23_42_/_8%)] max-md:min-h-[260px]">
              <Image src={images[0]} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 440px" className="object-cover" priority />
            </div>
            <div className="rounded-[16px] bg-white p-8 shadow-[0_12px_32px_rgb(15_23_42_/_8%)] max-md:p-5">
              <h2 className="text-[25px] font-bold leading-tight text-black max-md:text-[22px]">{service.title}</h2>
              {copy.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[14px] font-normal leading-[1.75] text-black/75">
                  {paragraph}
                </p>
              ))}
              <div className="mt-7 flex gap-4 max-sm:flex-col">
                <Link href={site.whatsappHref} className="rounded-full bg-brand-yellow px-7 py-3 text-center text-[12px] font-bold text-black">
                  Sifariş ver
                </Link>
                <Link href="/temizlik-xidmetleri/" className="rounded-full bg-brand-blue px-7 py-3 text-center text-[12px] font-bold text-white">
                  Bütün xidmətlər
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-[25px] font-bold leading-tight text-black max-md:text-[22px]">{service.title} xidmətinə daxildir</h2>
            <div className="mt-7 grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {service.bullets.map((item) => (
                <article key={item} className="rounded-[14px] bg-[#f6f8fb] px-6 py-5 text-[15px] font-semibold leading-[1.45] text-black shadow-[0_8px_22px_rgb(15_23_42_/_5%)]">
                  {item}
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {images.slice(0, 3).map((image, index) => (
              <div key={image} className={`relative overflow-hidden rounded-[16px] bg-[#eef6ff] shadow-[0_12px_28px_rgb(15_23_42_/_8%)] ${index === 1 ? "min-h-[310px]" : "min-h-[240px]"}`}>
                <Image src={image} alt={`${service.title} ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <PackagePreview />
      <section className="bg-white pb-16">
        <div className="mx-auto w-[min(980px,calc(100%-40px))]">
          <div className="relative min-h-[210px] overflow-hidden rounded-[18px] bg-black text-white">
            <Image src="https://166temizlik.az/wp-content/uploads/2023/09/aaa11.webp" alt="" fill sizes="980px" className="object-cover opacity-65" />
            <div className="absolute inset-0 flex items-center justify-between gap-8 px-10 max-md:flex-col max-md:items-start max-md:justify-center max-md:px-6">
              <h2 className="max-w-[600px] text-[24px] font-semibold leading-tight max-md:text-[20px]">
                166 Təmizlik xidməti sizin büdcənizə uyğun müxtəlif təmizlik paketlərini təqdim edir.
              </h2>
              <Link href={site.whatsappHref} className="rounded-full bg-black px-8 py-3 text-[12px] font-bold text-white">
                Sifariş ver
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
