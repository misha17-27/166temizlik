import Image from "next/image";
import Link from "next/link";
import { SitePage } from "@/components/SiteChrome";
import { staticPageCopy } from "@/lib/static-page-copy";
import type { Locale } from "@/lib/routes";
import { site } from "@/lib/site-data";

const contactSocialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/166temizlik",
    icon: (
      <path
        d="M13.2 7.6h1.8V4.7a22 22 0 0 0-2.7-.1c-2.7 0-4.5 1.6-4.5 4.6v2.6h-3v3.2h3v8h3.5v-8h2.9l.4-3.2h-3.3V9.5c0-1 .3-1.9 1.9-1.9Z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/166_temizlik/",
    icon: (
      <>
        <rect x="5.4" y="5.4" width="13.2" height="13.2" rx="3.4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.2" cy="7.8" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: site.whatsappHref,
    icon: (
      <>
        <path d="M5.7 18.4 6.8 15a6.6 6.6 0 1 1 2.3 2.3l-3.4 1.1Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M9.3 8.6c.2-.4.4-.5.7-.5h.6c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c.6 1 1.4 1.8 2.5 2.4l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.6v.6c0 .3-.1.5-.4.7-.5.4-1.2.5-1.8.3-3-.8-5.4-3.2-6.2-6.1-.2-.7 0-1.3.3-1.8Z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@166tmizlikxidmti9/videos",
    icon: (
      <>
        <rect x="4" y="7" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="m10.6 9.7 4.4 2.3-4.4 2.3V9.7Z" fill="currentColor" />
      </>
    ),
  },
];

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
              <button className="ml-auto inline-flex items-center gap-4 rounded-full bg-brand-yellow px-8 py-4 text-[15px] font-medium text-black transition-colors hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-none">
                {copy.submit}
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
              {contactSocialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-[4px] bg-brand-yellow text-[#5447e8] transition-colors hover:bg-black hover:text-white"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
                    {item.icon}
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[540px] overflow-hidden bg-gradient-to-r from-[#0074ca] via-[#05a9dd] to-[#12d5df] text-white max-md:min-h-0">
        <div className="absolute -top-[98px] left-[-20px] h-[180px] w-[110%] origin-left rotate-[-4deg] bg-white" />
        <div className="absolute left-0 top-[78px] h-[255px] w-[90px] rounded-r-full bg-white/18 max-md:hidden" />
        <div className="absolute bottom-[-105px] right-[-20px] h-[360px] w-[430px] rounded-full bg-white/12 max-md:hidden" />
        <div className="container-shell relative grid min-h-[540px] grid-cols-[0.86fr_1fr] items-center gap-16 pt-[46px] max-lg:grid-cols-1 max-lg:gap-8 max-lg:py-20 max-md:min-h-0">
          <div className="pl-2 max-lg:pl-0">
            <h2 className="text-[42px] font-normal leading-tight text-white max-md:text-[32px]">{copy.questionsTitle}</h2>
            <Link
              href={site.whatsappHref}
              className="mt-12 inline-flex h-[45px] items-center gap-2 rounded-full bg-white px-8 text-[15px] font-bold !text-[#39c75a] shadow-[0_8px_20px_rgb(0_0_0_/_8%)] transition-colors hover:bg-black hover:!text-white"
            >
              <span>{copy.whatsapp}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none">
                <path d="M5.7 18.4 6.8 15a6.6 6.6 0 1 1 2.3 2.3l-3.4 1.1Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
                <path d="M9.3 8.6c.2-.4.4-.5.7-.5h.6c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c.6 1 1.4 1.8 2.5 2.4l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.6v.6c0 .3-.1.5-.4.7-.5.4-1.2.5-1.8.3-3-.8-5.4-3.2-6.2-6.1-.2-.7 0-1.3.3-1.8Z" fill="currentColor" />
              </svg>
            </Link>
          </div>
          <div className="relative ml-auto h-[480px] w-[480px] overflow-hidden rounded-[48px] max-lg:mx-auto max-md:h-[300px] max-md:w-full max-md:rounded-[28px]">
            <Image
              src="https://166temizlik.az/wp-content/uploads/2023/01/project_09-400x400-1.jpg"
              alt="166 Təmizlik suallar"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
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
