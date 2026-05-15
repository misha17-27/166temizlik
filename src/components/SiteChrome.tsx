"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { chromeCopy, getLanguageSwitcherOptions, getLocalizedHref, getLocalizedServices, type Locale } from "@/lib/i18n";
import type { RouteKind } from "@/lib/routes";
import { site } from "@/lib/site-data";

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

const contactIcons = {
  phone: (
    <path
      d="M7.1 4.7c.4-.4.9-.5 1.4-.2l1.9 1.1c.5.3.8.9.6 1.5l-.6 1.9c-.1.4-.5.7-.9.8l-1.1.2c.9 2.1 2.5 3.7 4.6 4.6l.2-1.1c.1-.4.4-.8.8-.9l1.9-.6c.6-.2 1.2.1 1.5.6l1.1 1.9c.3.5.2 1-.2 1.4l-1.2 1.3c-.8.8-2 1.2-3.2.9-4.8-1.1-8.6-4.9-9.7-9.7-.3-1.2.1-2.4.9-3.2l1.3-1.2Z"
      fill="currentColor"
    />
  ),
  mobile: (
    <>
      <rect x="7.4" y="3.2" width="9.2" height="17.6" rx="1.7" stroke="currentColor" strokeWidth="1.9" />
      <path d="M10.4 5.7h3.2M11.3 18h1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  pin: (
    <>
      <path
        d="M12 21s6.1-5.2 6.1-11a6.1 6.1 0 1 0-12.2 0C5.9 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.9" />
    </>
  ),
  mail: (
    <>
      <rect x="4" y="6.5" width="16" height="11" rx="1.8" stroke="currentColor" strokeWidth="1.9" />
      <path d="m5.1 7.8 6.9 5.1 6.9-5.1" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </>
  ),
};

export type HeaderActive = "home" | "services" | "about" | "gallery" | "contact";

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 12h17M12 3c2.3 2.4 3.5 5.4 3.5 9s-1.2 6.6-3.5 9M12 3c-2.3 2.4-3.5 5.4-3.5 9s1.2 6.6 3.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LanguageSwitcher({
  locale,
  currentSlug,
  routeKind,
}: {
  locale: Locale;
  currentSlug: string;
  routeKind: RouteKind;
}) {
  const options = getLanguageSwitcherOptions(locale, currentSlug, routeKind);
  const current = options.find((item) => item.active) ?? options[0];

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label={`Select language, current ${current.label}`}
        aria-haspopup="menu"
        className="flex h-[46px] items-center gap-2.5 rounded-full bg-white/12 px-4 text-[16px] font-bold text-white transition hover:bg-white/18 max-md:h-10 max-md:px-3 max-md:text-[14px]"
      >
        <GlobeIcon className="h-[20px] w-[20px] text-white max-md:h-[18px] max-md:w-[18px]" />
        <span>{current.label}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[12px] w-[12px] transition group-focus-within:rotate-180 group-hover:rotate-180" fill="none">
          <path d="M5 7.5 10 12.5l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="invisible absolute right-0 top-full z-[70] w-[205px] pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 max-md:right-[-6px] max-md:w-[190px]">
        <div
          role="menu"
          className="translate-y-[-4px] rounded-[18px] bg-white p-2 text-[#0074ca] shadow-[0_16px_38px_rgb(15_23_42_/_14%)] transition group-focus-within:translate-y-0 group-hover:translate-y-0"
        >
          {options.map((item) => (
            <Link
              key={item.locale}
              href={item.href}
              prefetch={false}
              role="menuitem"
              aria-current={item.active ? "page" : undefined}
              className={`flex items-center justify-between rounded-[14px] px-4 py-2.5 text-[16px] font-semibold transition max-md:px-3 max-md:text-[15px] ${
                item.active ? "bg-[#eef6ff] text-[#0074ca]" : "text-[#0074ca] hover:bg-[#eef6ff]"
              }`}
            >
              <span>{item.name}</span>
              <span className={item.active ? "text-[#0074ca]" : "text-[#9db5c8]"}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderPopup({
  locale,
  services,
  open,
  onClose,
}: {
  locale: Locale;
  services: Array<{ title: string; href: string; slug: string }>;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  const labels =
    locale === "ru"
      ? {
          title: "Пакеты уборки",
          name: "Имя",
          phone: "Номер телефона",
          service: "Тип услуги:",
          address: "Адрес уборки",
          note: "Примечание",
          submit: "Заказать",
        }
      : locale === "tr"
        ? {
            title: "Temizlik paketleri",
            name: "Ad",
            phone: "Telefon numarası",
            service: "Hizmet türü:",
            address: "Temizlik yapılacak adres",
            note: "Not",
            submit: "Sipariş et",
          }
        : {
            title: "Təmizlik paketləri",
            name: "Ad",
            phone: "Əlaqə nömrəsi",
            service: "Xidmət növü:",
            address: "Təmizlik olunacaq ünvan",
            note: "İsmaric",
            submit: "Sifariş et",
          };

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-black/75 px-4 py-8" role="dialog" aria-modal="true" aria-label={labels.title}>
      <div className="relative w-full max-w-[800px] rounded-[18px] bg-[#eaf8ff] px-[38px] py-[70px] shadow-[0_20px_60px_rgb(0_0_0_/_24%)] max-md:px-5 max-md:py-14">
        <button
          type="button"
          aria-label="Close order form"
          onClick={onClose}
          className="absolute right-7 top-6 grid h-8 w-8 place-items-center text-[#222] transition-colors hover:text-[#0074ca]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className="mb-7 text-center text-[29px] font-normal leading-tight text-black max-md:text-[25px]">{labels.title}</h2>
        <form className="grid gap-3">
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <input className="h-[41px] rounded-[4px] bg-white px-4 text-[16px] text-black outline-none placeholder:text-[#a9a9a9]" placeholder={labels.name} />
            <input className="h-[41px] rounded-[4px] bg-white px-4 text-[16px] text-black outline-none placeholder:text-[#a9a9a9]" placeholder={labels.phone} />
          </div>
          <label className="mt-1 text-[18px] font-normal text-black">{labels.service}</label>
          <select className="h-[41px] rounded-[4px] bg-white px-4 text-[16px] text-[#777] outline-none">
            {services.map((service) => (
              <option key={service.slug}>{service.title}</option>
            ))}
          </select>
          <input className="h-[41px] rounded-[4px] bg-white px-4 text-[16px] text-black outline-none placeholder:text-[#b9b9b9]" placeholder={labels.address} />
          <textarea className="min-h-[110px] rounded-[4px] bg-white px-4 py-3 text-[16px] text-black outline-none placeholder:text-[#b9b9b9]" placeholder={labels.note} />
          <button
            type="submit"
            className="mt-2 inline-flex h-[50px] w-[168px] items-center justify-center rounded-full bg-brand-yellow text-[18px] font-bold text-black transition-colors hover:bg-black hover:text-white"
          >
            {labels.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export function Header({
  active = "home",
  locale = "az",
  currentSlug = "home",
  routeKind = "static",
}: {
  active?: HeaderActive;
  locale?: Locale;
  currentSlug?: string;
  routeKind?: RouteKind;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<"services" | "about" | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const copy = chromeCopy[locale];
  const localizedServices = getLocalizedServices(locale);
  const popupServices = currentSlug
    ? [...localizedServices].sort((a, b) => (a.slug === currentSlug ? -1 : b.slug === currentSlug ? 1 : 0))
    : localizedServices;
  const navItems = [
    { key: "home", label: copy.nav.home, href: getLocalizedHref(locale, "/") },
    { key: "services", label: copy.nav.services, href: getLocalizedHref(locale, "/temizlik-xidmetleri/"), hasMenu: true },
    { key: "about", label: copy.nav.about, href: getLocalizedHref(locale, "/sirket-haqqinda/"), hasMenu: true },
    { key: "gallery", label: copy.nav.gallery, href: getLocalizedHref(locale, "/qalereya/") },
    { key: "contact", label: copy.nav.contact, href: getLocalizedHref(locale, "/166-temizlik-elaqe/") },
  ];
  const activeMobileSubmenu = mobileSubmenu ? navItems.find((item) => item.key === mobileSubmenu) : null;
  const activeMobileSubmenuItems =
    mobileSubmenu === "services"
      ? localizedServices.map((service) => ({ label: service.title, href: service.href, slug: service.slug }))
      : mobileSubmenu === "about"
        ? copy.aboutMenu.map((item) => ({ ...item, href: getLocalizedHref(locale, item.href) }))
        : [];

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  }

  useEffect(() => {
    if (!mobileMenuOpen && !orderOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [mobileMenuOpen, orderOpen]);

  return (
    <header className="sticky top-0 z-50 blue-band">
      <div className="mx-auto flex h-[78px] w-[min(var(--header-container),calc(100%-40px))] items-center justify-between gap-5 max-md:h-[72px] max-md:w-[calc(100%-20px)] max-md:gap-2">
        <Link href={getLocalizedHref(locale, "/")} aria-label={copy.logoLabel} className="relative h-[58px] w-[112px] shrink-0 max-md:h-[48px] max-md:w-[74px]">
          <Image src={site.logo} alt="166 Təmizlik" fill priority sizes="120px" className="object-contain brightness-0 invert" />
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-2 text-[14px] font-semibold text-white max-lg:hidden">
          {navItems.map((item) => {
            const isActive = item.key === active;
            const isServicesMenu = item.key === "services";
            const menuItems =
              item.key === "services"
                ? localizedServices.map((service) => ({ label: service.title, href: service.href, slug: service.slug }))
                : item.key === "about"
                  ? copy.aboutMenu.map((menuItem) => ({ ...menuItem, href: getLocalizedHref(locale, menuItem.href) }))
                  : [];
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
                      {menuItems.map((menuItem) => {
                        const isCurrentService = isServicesMenu && "slug" in menuItem && menuItem.slug === currentSlug;

                        return (
                          <Link
                            key={menuItem.href}
                            href={menuItem.href}
                            prefetch={false}
                            aria-current={isCurrentService ? "page" : undefined}
                            className={`block rounded-[14px] px-3 transition hover:bg-[#eef6ff] ${
                              isCurrentService ? "bg-[#eef6ff]" : ""
                            } ${isServicesMenu ? "py-[8px]" : "py-[13px]"}`}
                          >
                            {menuItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 max-md:gap-1">
          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            className="whitespace-nowrap rounded-full bg-brand-yellow px-6 py-3 text-[15px] font-bold text-[#171717] transition hover:bg-black hover:text-white max-md:px-4 max-md:py-2.5 max-md:text-[14px]"
          >
            {copy.nav.order}
          </button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className="hidden h-10 w-10 rounded-lg border-2 border-white text-2xl font-black leading-none text-white max-lg:block max-md:h-9 max-md:w-9 max-md:text-xl"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-auto h-6 w-6" fill="none">
              <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
          <LanguageSwitcher locale={locale} currentSlug={currentSlug} routeKind={routeKind} />
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-white text-[#050505] lg:hidden">
          <div className="relative mx-auto min-h-full w-full max-w-[520px] px-4 pb-16 pt-10">
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="absolute right-5 top-10 grid h-7 w-7 place-items-center rounded-full border border-[#050505] text-[#050505]"
            >
              <svg aria-hidden="true" viewBox="0 0 18 18" className="h-4 w-4" fill="none">
                <path d="M5 5 13 13M13 5 5 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <div className="mt-[33px] h-[2px] w-full bg-brand-yellow" />

            {mobileSubmenu ? (
              <nav className="pt-8">
                <div className="flex items-center justify-between gap-5">
                  <h2 className="text-[28px] font-medium leading-tight text-[#050505]">{activeMobileSubmenu?.label}</h2>
                  <button
                    type="button"
                    aria-label="Back to menu"
                    onClick={() => setMobileSubmenu(null)}
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#050505] text-[#050505]"
                  >
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                      <path d="M12.5 5 7.5 10l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <ul className="mt-8 space-y-6 text-[21px] font-normal leading-tight text-[#050505]">
                  {activeMobileSubmenuItems.map((menuItem) => {
                    const isCurrentService = "slug" in menuItem && menuItem.slug === currentSlug;

                    return (
                      <li key={menuItem.href}>
                        <Link
                          href={menuItem.href}
                          prefetch={false}
                          onClick={closeMobileMenu}
                          aria-current={isCurrentService ? "page" : undefined}
                          className={`block rounded-[14px] px-3 py-2 ${isCurrentService ? "bg-[#eef6ff] text-[#0074ca]" : ""}`}
                        >
                          {menuItem.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : (
              <nav className="pt-8">
                <ul className="space-y-8 text-[22px] font-normal leading-tight text-[#050505]">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      {item.hasMenu ? (
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-4 py-1 text-left text-[#050505]"
                          aria-expanded={mobileSubmenu === item.key}
                          onClick={() => setMobileSubmenu(item.key as "services" | "about")}
                        >
                          <span>{item.label}</span>
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#050505] text-[#050505]">
                            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                              <path d="M7.5 5 12.5 10l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>
                      ) : (
                        <Link href={item.href} prefetch={false} onClick={closeMobileMenu} className="block py-1">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      ) : null}
      <OrderPopup locale={locale} services={popupServices} open={orderOpen} onClose={() => setOrderOpen(false)} />
    </header>
  );
}

export function CtaFooter({ locale = "az" }: { locale?: Locale }) {
  const copy = chromeCopy[locale];
  const localizedServices = getLocalizedServices(locale);

  return (
    <>
      <section id="order" className="blue-band py-14">
        <div className="container-shell flex items-center justify-between gap-8 max-lg:flex-col max-lg:text-center">
          <h2 className="text-[23px] font-bold leading-tight text-white max-md:text-[20px]">{copy.cta.title}</h2>
          <div className="flex gap-9 max-sm:flex-col">
            <Link href={getLocalizedHref(locale, "/166-temizlik-elaqe/")} className="rounded-full bg-brand-yellow px-12 py-3 text-[12px] font-bold text-black">
              {copy.cta.contact}
            </Link>
            <Link href={site.whatsappHref} className="rounded-full bg-white px-12 py-3 text-[12px] font-bold text-black">
              {copy.cta.order}
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
            <p className="mt-3 text-[12px] font-normal">{copy.footer.motto}</p>
          </div>
          <div>
            <h3 className="mb-4 text-[16px] font-bold">{copy.footer.useful}</h3>
            <ul className="space-y-4 text-[14px] font-normal">
              {[
                [copy.footer.links.home, getLocalizedHref(locale, "/")],
                [copy.footer.links.about, getLocalizedHref(locale, "/sirket-haqqinda/")],
                [copy.footer.links.services, getLocalizedHref(locale, "/temizlik-xidmetleri/")],
                [copy.footer.links.blog, getLocalizedHref(locale, "/bloq/")],
                [copy.footer.links.vacancy, getLocalizedHref(locale, "/vakansiya/")],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} prefetch={false}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-[16px] font-bold">{copy.footer.services}</h3>
            <ul className="space-y-4 text-[14px] font-normal">
              {localizedServices.slice(0, 3).map((item) => (
                <li key={item.title}>
                  <Link href={item.href} prefetch={false}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-[16px] font-bold">{copy.footer.contact}</h3>
            <ul className="space-y-2 text-[14px] font-normal leading-[1.45]">
              <li className="flex items-start gap-2">
                <span className="mt-[3px] grid h-[15px] w-[15px] shrink-0 place-items-center text-white">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[15px] w-[15px]">
                    {contactIcons.phone}
                  </svg>
                </span>
                <Link href={site.phoneHref}>{copy.footer.phone}</Link>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[2px] grid h-[15px] w-[15px] shrink-0 place-items-center text-white">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none">
                    {contactIcons.mobile}
                  </svg>
                </span>
                <Link href={site.mobileHref}>{site.mobileLabel}</Link>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[3px] grid h-[15px] w-[15px] shrink-0 place-items-center text-white">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none">
                    {contactIcons.pin}
                  </svg>
                </span>
                <span>{copy.footer.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[3px] grid h-[15px] w-[15px] shrink-0 place-items-center text-white">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none">
                    {contactIcons.mail}
                  </svg>
                </span>
                <Link href={`mailto:${site.email}`}>{site.email}</Link>
              </li>
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

export function SitePage({
  children,
  active,
  locale = "az",
  currentSlug = "home",
  routeKind = "static",
}: {
  children: React.ReactNode;
  active?: HeaderActive;
  locale?: Locale;
  currentSlug?: string;
  routeKind?: RouteKind;
}) {
  return (
    <main>
      <Header active={active} locale={locale} currentSlug={currentSlug} routeKind={routeKind} />
      {children}
      <CtaFooter locale={locale} />
    </main>
  );
}
