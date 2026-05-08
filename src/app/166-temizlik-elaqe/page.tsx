import Image from "next/image";
import Link from "next/link";
import { SitePage } from "@/components/SiteChrome";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";
import { site } from "@/lib/site-data";

function getContactCards(locale: Locale) {
  const copy = staticPageCopy[locale].contact;
  const address =
    locale === "ru"
      ? "ул. Шафает Мехтиев 134, Баку, Азербайджан"
      : locale === "tr"
        ? "Şafayet Mehdiyev 134, Bakü, Azerbaycan"
        : site.address;

  return [
    { title: copy.phone, value: "166", href: site.phoneHref, icon: "https://166temizlik.az/wp-content/uploads/2023/02/telephone.png" },
    { title: copy.mobile, value: "+994 10 123 01 66", href: "tel:+994101230166", icon: "https://166temizlik.az/wp-content/uploads/2023/01/Phoneicon.png" },
    { title: copy.mobile, value: site.mobileLabel, href: site.mobileHref, icon: "https://166temizlik.az/wp-content/uploads/2023/01/Phoneicon.png" },
    { title: copy.address, value: address, icon: "https://166temizlik.az/wp-content/uploads/2023/01/Location-Icon.png" },
    { title: copy.email, value: site.email, href: `mailto:${site.email}`, icon: "https://166temizlik.az/wp-content/uploads/2023/01/Mail-icon.png" },
  ];
}

export const metadata = {
  title: "Əlaqə - 166 Təmizlik",
};

export function ContactPageContent({ locale = "az" }: { locale?: Locale }) {
  const copy = staticPageCopy[locale].contact;
  const contactCards = getContactCards(locale);

  return (
    <SitePage active="contact" locale={locale} currentSlug="contact">
      <section className="relative overflow-hidden bg-white pb-24 pt-[130px] max-lg:pt-16">
        <div className="absolute -left-28 bottom-10 h-[380px] w-[520px] rounded-[55%] bg-[#f8f8ff]" />
        <div className="absolute -right-20 top-[300px] h-[360px] w-[170px] rounded-[55%] bg-[#e8fbff]" />
        <div className="container-shell relative grid grid-cols-2 items-start gap-20 max-lg:grid-cols-1 max-lg:gap-12">
          <form className="rounded-[10px] bg-white p-[72px] shadow-[0_12px_42px_rgb(25_34_70_/_8%)] max-md:p-7">
            <h1 className="mb-8 text-[34px] font-bold leading-tight text-[#6252ee] max-md:text-[26px]">
              {copy.formTitle}
            </h1>
            <div className="grid gap-7">
              {[copy.name, copy.phone, copy.email].map((placeholder) => (
                <input
                  key={placeholder}
                  placeholder={placeholder}
                  className="h-[48px] rounded-[4px] bg-[#fafafa] px-4 text-[15px] text-[#222] outline-none placeholder:text-[#9aa0ad]"
                />
              ))}
              <textarea
                placeholder={copy.message}
                className="min-h-[100px] rounded-[4px] bg-[#fafafa] px-4 py-3 text-[15px] text-[#222] outline-none placeholder:text-[#9aa0ad]"
              />
              <button className="ml-auto inline-flex items-center gap-4 rounded-full bg-brand-yellow px-8 py-4 text-[15px] font-medium text-black">
                {copy.submit} <span className="text-[22px] leading-none">→</span>
              </button>
            </div>
          </form>

          <div className="pt-14 max-lg:pt-0">
            <h2 className="mb-8 text-[39px] font-bold text-[#6252ee] max-md:text-[30px]">{copy.contactTitle}</h2>
            <div className="space-y-7">
              {contactCards.map((item) => (
                <div key={`${item.title}-${item.value}`} className="flex items-center gap-5">
                  <div className="relative grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#f4f0ff]">
                    <Image src={item.icon} alt="" width={28} height={28} className="object-contain" />
                  </div>
                  <div className="text-[#20294b]">
                    <h3 className="text-[20px] font-medium leading-tight">{item.title}</h3>
                    {item.href ? (
                      <Link href={item.href} className="mt-1 block text-[16px] font-normal">
                        {item.value}
                      </Link>
                    ) : (
                      <p className="mt-1 text-[16px] font-normal">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex gap-2">
              {["f", "◎", "☏", "▶"].map((item) => (
                <span key={item} className="grid h-9 w-9 place-items-center rounded-[4px] bg-brand-yellow text-[18px] font-bold text-[#5447e8]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0074ca] to-[#12d5df] py-24 text-white max-md:py-14">
        <div className="absolute -top-20 left-0 h-[160px] w-full rotate-[-4deg] bg-white" />
        <div className="container-shell relative grid min-h-[410px] grid-cols-[0.9fr_1fr] items-center gap-12 max-lg:grid-cols-1">
          <div>
            <h2 className="text-[44px] font-normal max-md:text-[32px]">{copy.questionsTitle}</h2>
            <Link href={site.whatsappHref} className="mt-12 inline-flex rounded-full bg-white px-8 py-3 text-[15px] font-medium text-[#17b840]">
              {copy.whatsapp}&nbsp; ☎
            </Link>
          </div>
          <div className="relative ml-auto h-[540px] w-[520px] overflow-hidden rounded-[46px] max-lg:mx-auto max-md:h-[300px] max-md:w-full">
            <Image
              src="https://166temizlik.az/wp-content/uploads/2023/01/project_09-400x400-1.jpg"
              alt="166 Təmizlik suallar"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover grayscale"
            />
          </div>
        </div>
      </section>
    </SitePage>
  );
}

export default function ContactPage() {
  return <ContactPageContent />;
}
