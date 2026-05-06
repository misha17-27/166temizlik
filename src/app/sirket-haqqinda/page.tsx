import Link from "next/link";
import { PageHero, SplitContent } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { services, site } from "@/lib/site-data";

export const metadata = {
  title: "Şirkət haqqında - 166 Təmizlik",
};

export default function AboutPage() {
  return (
    <SitePage>
      <PageHero title="Şirkət haqqında" subtitle="2015-ci ildən müasir avadanlıq və peşəkar komanda ilə təmizlik xidmətləri göstəririk." />
      <SplitContent
        title="Təmizlik xidməti qiymətləri"
        text="166 Təmizlik xidməti sizin büdcənizə uyğun müxtəlif təmizlik paketlərini təqdim edir. Məkanın vəziyyəti və sifariş həcmi nəzərə alınaraq xidmət planı hazırlanır."
        image="https://166temizlik.az/wp-content/uploads/2024/12/Group-1000003889.webp"
      />
      <SplitContent
        title="Peşəkar işçi heyəti"
        text="Böyük və peşəkar işçi heyətimiz qısa zamanda maksimum təmizliyi təmin edir. Əraziyə və səthə uyğun kimyəvi məhlul və müasir avadanlıqlardan istifadə olunur."
        image="https://166temizlik.az/wp-content/uploads/2024/12/Group-1000003890.webp"
        reverse
      />
      <SplitContent
        title="Ən son təmizlik cihazları ilə"
        text="Təmizlik şirkəti seçərkən etibarlı komanda, gigiyena qaydaları, keyfiyyətli vasitələr və səthlərə zərər verməyən metodlar əsasdır. 166 Təmizlik bu təminatı verir."
        image="https://166temizlik.az/wp-content/uploads/2023/02/5-3.webp"
      />
      <section className="bg-[#f5f5f5] py-16 max-md:py-10">
        <div className="container-shell rounded-[18px] bg-white p-10 shadow-[0_16px_36px_rgb(15_23_42_/_8%)] max-md:p-6">
          <h2 className="text-[26px] font-bold text-black">Sizə aşağıdakı təmizlik xidmətlərini təklif edirik:</h2>
          <div className="mt-7 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {services.map((service) => (
              <Link key={service.title} href={service.href} prefetch={false} className="rounded-[12px] bg-[#eef6ff] px-5 py-4 text-[15px] font-semibold text-black">
                {service.title}
              </Link>
            ))}
          </div>
          <Link href={site.whatsappHref} className="mt-8 inline-block rounded-full bg-brand-yellow px-10 py-4 text-[13px] font-bold text-black">
            SİFARİŞ VER
          </Link>
        </div>
      </section>
    </SitePage>
  );
}
