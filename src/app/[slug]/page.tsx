import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LightSection, PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { servicePages } from "@/lib/pages-data";
import { site } from "@/lib/site-data";

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

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <SitePage>
      <PageHero title={service.title} subtitle="Sevdiklərinizə və özünüzə zaman ayırın!" />
      <section className="bg-white py-16 max-md:py-10">
        <div className="container-shell grid grid-cols-[1fr_0.9fr] items-center gap-14 max-lg:grid-cols-1">
          <div>
            <h2 className="text-[28px] font-bold leading-tight text-black max-md:text-[23px]">{service.title}</h2>
            <p className="mt-5 text-[16px] leading-8 text-black/75">{service.description}</p>
            <ul className="mt-8 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              {service.bullets.map((item) => (
                <li key={item} className="rounded-[14px] bg-[#eef6ff] px-5 py-4 text-[15px] font-semibold text-black">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-4 max-sm:flex-col">
              <Link href={site.whatsappHref} className="rounded-full bg-brand-yellow px-8 py-4 text-center text-[13px] font-bold text-black">
                SİFARİŞ VER
              </Link>
              <Link href="/temizlik-xidmetleri/" className="rounded-full bg-brand-blue px-8 py-4 text-center text-[13px] font-bold text-white">
                BÜTÜN XİDMƏTLƏR
              </Link>
            </div>
          </div>
          <div className="relative min-h-[430px] overflow-hidden rounded-[18px] bg-[#e4f1ff] shadow-[0_16px_36px_rgb(15_23_42_/_10%)] max-md:min-h-[260px]">
            <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" priority />
          </div>
        </div>
      </section>
      <LightSection>
        <div className="container-shell rounded-[18px] bg-brand-blue px-10 py-10 text-white max-md:px-6">
          <h2 className="text-[26px] font-bold max-md:text-[22px]">166 Təmizlik xidməti sizin büdcənizə uyğun müxtəlif təmizlik paketlərini təqdim edir.</h2>
          <p className="mt-4 max-w-[820px] text-[16px] leading-7 text-white/90">
            Qiymət və xidmət detalları məkanın ölçüsü, vəziyyəti və sifarişin həcminə görə dəqiqləşdirilir.
          </p>
        </div>
      </LightSection>
    </SitePage>
  );
}
