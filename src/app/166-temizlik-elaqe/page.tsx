import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { site } from "@/lib/site-data";

const contactCards = [
  { title: "Telefon", value: site.phoneLabel, href: site.phoneHref, icon: "https://166temizlik.az/wp-content/uploads/2023/02/telephone.png" },
  { title: "Mobil telefon", value: "+994 10 123 01 66", href: "tel:+994101230166", icon: "https://166temizlik.az/wp-content/uploads/2023/01/Phoneicon.png" },
  { title: "Mobil telefon", value: site.mobileLabel, href: site.mobileHref, icon: "https://166temizlik.az/wp-content/uploads/2023/01/Phoneicon.png" },
  { title: "Ünvan", value: site.address, icon: "https://166temizlik.az/wp-content/uploads/2023/01/Location-Icon.png" },
  { title: "Email", value: site.email, href: `mailto:${site.email}`, icon: "https://166temizlik.az/wp-content/uploads/2023/01/Mail-icon.png" },
];

export const metadata = {
  title: "Əlaqə - 166 Təmizlik",
};

export default function ContactPage() {
  return (
    <SitePage>
      <PageHero title="Əlaqə" subtitle="Müraciət et, biz əlaqə saxlayaq!" />
      <section className="bg-white py-16 max-md:py-10">
        <div className="container-shell grid grid-cols-[0.9fr_1.1fr] gap-12 max-lg:grid-cols-1">
          <div>
            <h2 className="text-[28px] font-bold text-black">Bizimlə əlaqə</h2>
            <div className="mt-8 grid gap-4">
              {contactCards.map((item) => (
                <div key={`${item.title}-${item.value}`} className="flex items-center gap-5 rounded-[16px] bg-[#eef6ff] p-5">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image src={item.icon} alt="" fill sizes="48px" className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-black">{item.title}</h3>
                    {item.href ? (
                      <Link href={item.href} className="mt-1 block text-[15px] text-black/75">{item.value}</Link>
                    ) : (
                      <p className="mt-1 text-[15px] text-black/75">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[18px] bg-[#f5f5f5] p-8 shadow-[0_16px_36px_rgb(15_23_42_/_8%)] max-md:p-5">
            <h2 className="text-[26px] font-bold text-black">Suallarınız var?</h2>
            <p className="mt-3 text-[15px] leading-7 text-black/70">Formu doldurun və ya WhatsApp vasitəsilə yazın. Komandamız sizinlə ən qısa zamanda əlaqə saxlayacaq.</p>
            <form className="mt-7 grid gap-4">
              <input className="rounded-[10px] border border-black/10 bg-white px-5 py-4 text-[15px] outline-none" placeholder="Adınız" />
              <input className="rounded-[10px] border border-black/10 bg-white px-5 py-4 text-[15px] outline-none" placeholder="Telefon nömrəsi" />
              <textarea className="min-h-[130px] rounded-[10px] border border-black/10 bg-white px-5 py-4 text-[15px] outline-none" placeholder="Mesajınız" />
              <Link href={site.whatsappHref} className="rounded-full bg-brand-blue px-8 py-4 text-center text-[13px] font-bold text-white">
                WHATSAPP İLƏ YAZIN
              </Link>
            </form>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
