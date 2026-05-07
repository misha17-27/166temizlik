import Image from "next/image";
import Link from "next/link";
import { services, site } from "@/lib/site-data";

const navItems = [
  { key: "home", label: "Ana səhifə", href: "/" },
  { key: "services", label: "Xidmətlər", href: "/temizlik-xidmetleri/", hasMenu: true },
  { key: "about", label: "Şirkət haqqında", href: "/sirket-haqqinda/", hasMenu: true },
  { key: "gallery", label: "Qalereya", href: "/qalereya/" },
  { key: "contact", label: "Əlaqə", href: "/166-temizlik-elaqe/" },
];

const aboutMenu = [
  { label: "Bloq", href: "/bloq/" },
  { label: "Avadanlıq və maddələr", href: "/temizlik-xidmeti/" },
  { label: "Partnyorlar", href: "/partnyorlar/" },
  { label: "Əməkdaşlarımız", href: "/emekdaslarimiz/" },
  { label: "Vakansiya", href: "/vakansiya/" },
];

const socialIcons = [
  {
    label: "Facebook",
    icon: (
      <path
        d="M13.2 7.6h1.8V4.7a22 22 0 0 0-2.7-.1c-2.7 0-4.5 1.6-4.5 4.6v2.6h-3v3.2h3v8h3.5v-8h2.9l.4-3.2h-3.3V9.5c0-1 .3-1.9 1.9-1.9Z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "Instagram",
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
    icon: (
      <>
        <path
          d="M5.7 18.4 6.8 15a6.6 6.6 0 1 1 2.3 2.3l-3.4 1.1Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M9.3 8.6c.2-.4.4-.5.7-.5h.6c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c.6 1 1.4 1.8 2.5 2.4l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.6v.6c0 .3-.1.5-.4.7-.5.4-1.2.5-1.8.3-3-.8-5.4-3.2-6.2-6.1-.2-.7 0-1.3.3-1.8Z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <>
        <rect x="4" y="7" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="m10.6 9.7 4.4 2.3-4.4 2.3V9.7Z" fill="currentColor" />
      </>
    ),
  },
];

export type HeaderActive = "home" | "services" | "about" | "gallery" | "contact";

export function Header({ active = "home" }: { active?: HeaderActive }) {
  return (
    <header className="sticky top-0 z-50 blue-band">
      <div className="mx-auto flex h-[78px] w-[min(1280px,calc(100%-40px))] items-center justify-between gap-5 max-md:h-[72px] max-md:w-[calc(100%-20px)] max-md:gap-2">
        <Link href="/" aria-label="166 Təmizlik ana səhifə" className="relative h-[58px] w-[112px] shrink-0 max-md:h-[48px] max-md:w-[74px]">
          <Image src={site.logo} alt="166 Təmizlik" fill priority sizes="120px" className="object-contain brightness-0 invert" />
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-2 text-[14px] font-semibold text-white max-lg:hidden">
          {navItems.map((item) => {
            const isActive = item.key === active;
            const isServicesMenu = item.key === "services";
            const menuItems = item.key === "services" ? services.map((service) => ({ label: service.title, href: service.href })) : item.key === "about" ? aboutMenu : [];
            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  prefetch={false}
                  style={isActive ? { color: "#0074ca" } : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 transition ${
                    isActive ? "bg-white" : "text-white hover:bg-white/12"
                  }`}
                >
                  {item.label}
                  {item.hasMenu ? (
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[12px] w-[12px] translate-y-[1px]" fill="none">
                      <path d="M4.5 7.25 10 12.75l5.5-5.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </Link>

                {menuItems.length ? (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-[22px] bg-white px-3 py-3 text-center text-[15px] font-medium leading-tight text-[#0074ca] shadow-[0_16px_38px_rgb(15_23_42_/_10%)]">
                      {menuItems.map((menuItem) => (
                        <Link
                          key={menuItem.href}
                          href={menuItem.href}
                          prefetch={false}
                          className={`block rounded-[14px] px-3 transition hover:bg-[#eef6ff] ${isServicesMenu ? "py-[8px]" : "py-[13px]"}`}
                        >
                          {menuItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 max-md:gap-1">
          <Link
            href={site.orderHref}
            className="whitespace-nowrap rounded-full bg-brand-yellow px-6 py-3 text-[15px] font-bold text-[#171717] transition hover:bg-white max-md:px-4 max-md:py-2.5 max-md:text-[14px]"
          >
            Sifariş et
          </Link>
          <button aria-label="Open menu" className="hidden h-10 w-10 rounded-lg border-2 border-white text-2xl font-black leading-none text-white max-lg:block max-md:h-9 max-md:w-9 max-md:text-xl">
            ≡
          </button>
          <Link href="/ru/" prefetch={false} className="grid h-[44px] w-[44px] place-items-center rounded-full bg-white text-base font-bold text-black max-md:h-9 max-md:w-9 max-md:text-sm">
            Ru
          </Link>
          <Link href="/tr/" prefetch={false} className="grid h-[44px] w-[44px] place-items-center rounded-full bg-white text-base font-bold text-black max-md:h-9 max-md:w-9 max-md:text-sm">
            Tr
          </Link>
        </div>
      </div>
    </header>
  );
}

export function CtaFooter() {
  return (
    <>
      <section id="order" className="blue-band py-14">
        <div className="container-shell flex items-center justify-between gap-8 max-lg:flex-col max-lg:text-center">
          <h2 className="text-[23px] font-bold leading-tight text-white max-md:text-[20px]">Özünüzə və sevdiklərinizə zaman ayırın</h2>
          <div className="flex gap-9 max-sm:flex-col">
            <Link href="/166-temizlik-elaqe/" className="rounded-full bg-brand-yellow px-12 py-3 text-[12px] font-bold text-black">
              BİZİMLƏ ƏLAQƏ
            </Link>
            <Link href={site.whatsappHref} className="rounded-full bg-white px-12 py-3 text-[12px] font-bold text-black">
              SİFARİŞ ET
            </Link>
          </div>
        </div>
      </section>
      <footer id="contact" className="blue-band text-white">
        <div className="container-shell grid grid-cols-[1.1fr_1fr_1fr_1.35fr] gap-16 py-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="text-center max-sm:text-left">
            <div className="relative mx-auto h-[132px] w-[170px] max-sm:mx-0">
              <Image src={site.footerLogo} alt="166 Təmizlik" fill sizes="170px" className="object-contain" />
            </div>
            <p className="mt-3 text-[12px] font-normal">QÜSURSUZ VƏ ETİBARLI</p>
          </div>
          <div>
            <h3 className="mb-4 text-[16px] font-bold">Yararlı linklər</h3>
            <ul className="space-y-4 text-[14px] font-normal">
              {[
                ["Ana səhifə", "/"],
                ["Şirkət haqqında", "/sirket-haqqinda/"],
                ["Xidmətlər", "/temizlik-xidmetleri/"],
                ["Bloq", "/bloq/"],
                ["Vakansiya", "/vakansiya/"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} prefetch={false}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-[16px] font-bold">Xidmətlər</h3>
            <ul className="space-y-4 text-[14px] font-normal">
              {services.slice(0, 3).map((item) => (
                <li key={item.title}>
                  <Link href={item.href} prefetch={false}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-[16px] font-bold">Əlaqə</h3>
            <ul className="space-y-2 text-[14px] font-normal leading-[1.45]">
              <li>☎ <Link href={site.phoneHref}>{site.phoneLabel}</Link></li>
              <li>▯ <Link href={site.mobileHref}>{site.mobileLabel}</Link></li>
              <li>⌖ {site.address}</li>
              <li>✉ <Link href={`mailto:${site.email}`}>{site.email}</Link></li>
            </ul>
            <div className="mt-4 flex gap-2">
              {socialIcons.map((item) => (
                <span
                  key={item.label}
                  role="img"
                  aria-label={item.label}
                  className="grid h-[27px] w-[27px] place-items-center rounded-full border-2 border-white text-white"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none">
                    {item.icon}
                  </svg>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/55 py-4 text-center text-[12px] font-normal text-white">
          © 166temizlik.az. Site by Webline
        </div>
      </footer>
    </>
  );
}

export function FloatingButtons() {
  return (
    <>
      <Link href={site.whatsappHref} aria-label="Whatsapp" className="floating-action floating-whatsapp">☎</Link>
      <Link href="/166-temizlik-elaqe/" aria-label="Chat" className="floating-action floating-chat">▰</Link>
    </>
  );
}

export function SitePage({ children, active }: { children: React.ReactNode; active?: HeaderActive }) {
  return (
    <main>
      <Header active={active} />
      {children}
      <CtaFooter />
      <FloatingButtons />
    </main>
  );
}
