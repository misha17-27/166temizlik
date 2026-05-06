import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import {
  beforeAfter,
  gallery,
  hourlyPrices,
  navItems,
  notes,
  packageFeatures,
  partners,
  services,
  site,
  testimonials,
  weeklyPrices,
} from "@/lib/site-data";

function Header() {
  return (
    <header className="sticky top-0 z-50 blue-band">
      <div className="mx-auto flex h-[90px] w-[min(1280px,calc(100%-40px))] items-center justify-between gap-6 max-md:h-[110px] max-md:w-[min(100%-30px,620px)] max-md:gap-3">
        <Link href="/" aria-label="166 Təmizlik ana səhifə" className="relative h-[78px] w-[150px] shrink-0 max-md:h-[76px] max-md:w-[120px]">
          <Image src={site.logo} alt="166 Təmizlik" fill priority sizes="170px" className="object-contain brightness-0 invert" />
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-3 [font-family:var(--font-montserrat)] text-[16px] font-semibold text-white max-lg:hidden">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              style={index === 0 ? { color: "#0074ca" } : undefined}
              className={`whitespace-nowrap rounded-full px-6 py-3 transition ${index === 0 ? "bg-white" : "hover:bg-white/12"}`}
            >
              {item.label}
              {item.hasMenu ? <span className="ml-3 text-sm">▼</span> : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 max-md:gap-2">
          <Link
            href={site.orderHref}
            className="whitespace-nowrap rounded-full bg-brand-yellow px-8 py-4 [font-family:var(--font-montserrat)] text-[20px] font-bold text-[#171717] transition hover:bg-white max-md:px-6 max-md:py-3 max-md:text-lg"
          >
            Sifariş et
          </Link>
          <button aria-label="Open menu" className="hidden h-12 w-12 rounded-lg border-2 border-white text-3xl font-black leading-none text-white max-lg:block">
            ≡
          </button>
          <Link href="/ru/" className="grid h-[58px] w-[58px] place-items-center rounded-full bg-white text-xl font-bold text-black max-md:h-11 max-md:w-11">
            Ru
          </Link>
          <Link href="/tr/" className="grid h-[58px] w-[58px] place-items-center rounded-full bg-white text-xl font-bold text-black max-md:h-11 max-md:w-11">
            Tr
          </Link>
        </div>
      </div>
    </header>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="bg-[#f5f5f5] py-16 max-md:py-10">
      <div className="container-shell">
        <h2 className="section-title mb-12">Xidmətlərimiz</h2>
        <div className="grid grid-cols-5 gap-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex min-h-[190px] flex-col items-center justify-center rounded-[14px] bg-white p-6 text-center shadow-[0_14px_34px_rgb(15_23_42_/_8%)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgb(0_116_202_/_16%)] max-sm:min-h-[200px]"
            >
              <div className="relative mb-5 h-20 w-28">
                <Image src={service.icon} alt="" fill sizes="120px" className="object-contain" />
              </div>
              <h3 className="[font-family:var(--font-montserrat)] text-[16px] font-semibold leading-none text-black max-sm:text-[16px] max-sm:leading-tight">{service.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ title, items, priceKey }: { title: string; items: string[]; priceKey: "four" | "eight" }) {
  return (
    <article className="overflow-hidden rounded-[18px] bg-white shadow-[0_16px_42px_rgb(15_23_42_/_10%)]">
      <div className="blue-band px-8 py-5 text-center text-3xl font-black">{title}</div>
      <div className="p-8">
        <ul className="space-y-3 text-[17px] font-semibold text-[#243145]">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-blue text-xs text-white">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {weeklyPrices.map((price) => (
            <div key={price.label} className="rounded-xl border border-[#dbe5f0] p-4 text-center">
              <p className="text-sm font-bold text-[#65748a]">{price.label}</p>
              <p className="mt-2 text-3xl font-black text-brand-blue">{price[priceKey]}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function PricesSection() {
  return (
    <section className="bg-white py-16 max-md:py-10">
      <div className="container-shell">
        <h2 className="section-title mb-12">Ev təmizlik paketləri</h2>
        <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
          <PackageCard title="4 saat" items={packageFeatures.fourHours} priceKey="four" />
          <PackageCard title="8 saat" items={packageFeatures.eightHours} priceKey="eight" />
        </div>

        <div className="mt-10 grid grid-cols-5 gap-5 max-lg:grid-cols-3 max-sm:grid-cols-1">
          {hourlyPrices.map((price) => (
            <article key={price.time} className="rounded-[16px] bg-[#f5f8fb] p-6 text-center shadow-[0_10px_28px_rgb(15_23_42_/_6%)]">
              <h3 className="text-3xl font-black text-brand-blue">{price.time}</h3>
              <p className="mt-4 text-lg font-bold">{price.city}</p>
              <p className="mt-1 text-lg font-bold">{price.village}</p>
              <p className="mt-4 text-sm font-semibold text-[#65748a]">(1 nəfər xanım kömək məqsədi ilə gəlir)</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[16px] border-l-[8px] border-brand-yellow bg-[#f8fbff] p-8">
          <h3 className="mb-4 text-3xl font-black text-black">QEYD</h3>
          <ul className="grid gap-3 text-lg font-semibold text-[#263445]">
            {notes.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="text-brand-blue">●</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="blue-band py-16">
      <div className="container-shell grid grid-cols-[0.9fr_1.1fr] items-center gap-12 max-lg:grid-cols-1">
        <div>
          <p className="text-2xl font-black text-brand-yellow">ŞİRKƏT</p>
          <h2 className="mt-1 text-[56px] font-black leading-none text-white max-md:text-4xl">HAQQINDA</h2>
          <p className="mt-8 text-xl font-semibold leading-8 text-white/95">
            2015-ci ildə fəaliyyətinə bir neçə işçi ilə başlayan “166 Təmizlik Xidməti” müasir avadanlıq və təmizlik vasitələri ilə istənilən təmizlik problemini həll edir. Təmizlik şirkəti axtarırsınızsa, doğru ünvandasınız.
          </p>
          <p className="mt-5 text-xl font-semibold leading-8 text-white/95">
            Daim müştərilərimizin xidmətində olmaq və operativ xidmət göstərmək məqsədilə 166 qaynar xəttimiz 7/24 ölkənin istənilən nöqtəsindən zəngləri qəbul edir.
          </p>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[24px] bg-white/10">
          <Image
            src="https://166temizlik.az/wp-content/uploads/2023/02/azerbaijan5-1-1.svg"
            alt="Bütün Azərbaycana xidmət göstəririk"
            fill
            sizes="600px"
            className="object-contain p-8"
          />
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className="bg-white py-16">
      <div className="container-shell">
        <p className="section-kicker text-center">GÖRDÜYÜMÜZ</p>
        <h2 className="section-title mb-12">İŞLƏR</h2>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {beforeAfter.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[18px] bg-[#f5f8fb] shadow-[0_16px_38px_rgb(15_23_42_/_9%)]">
              <div className="grid grid-cols-2">
                <div className="relative h-[300px]">
                  <Image src={item.before} alt={`${item.title} əvvəl`} fill sizes="300px" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/70 px-4 py-2 text-sm font-bold text-white">Əvvəl</span>
                </div>
                <div className="relative h-[300px]">
                  <Image src={item.after} alt={`${item.title} sonra`} fill sizes="300px" className="object-cover" />
                  <span className="absolute right-4 top-4 rounded-full bg-brand-blue px-4 py-2 text-sm font-bold text-white">Sonra</span>
                </div>
              </div>
              <h3 className="p-5 text-center text-xl font-black">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="bg-[#f5f5f5] py-16">
      <div className="container-shell">
        <h2 className="section-title mb-12">Qalereya</h2>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {gallery.map((src, index) => (
            <a key={src} href={src} className="relative h-[230px] overflow-hidden rounded-[14px] bg-white shadow-[0_12px_30px_rgb(15_23_42_/_8%)] max-md:h-[170px]">
              <Image src={src} alt={`166 Təmizlik qalereya ${index + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 hover:scale-105" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="bg-white py-16">
      <div className="container-shell">
        <h2 className="section-title mb-10">PARTNYORLAR</h2>
        <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {partners.map((src, index) => (
            <div key={`${src}-${index}`} className="relative h-[112px] rounded-[12px] border border-[#e8edf3] bg-white p-4 shadow-[0_10px_22px_rgb(15_23_42_/_5%)]">
              <Image src={src} alt={`Partnyor ${index + 1}`} fill sizes="220px" className="object-contain p-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="container-shell">
        <h2 className="section-title mb-12">MÜŞTƏRİ RƏYLƏRİ</h2>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[18px] bg-white p-8 text-center shadow-[0_14px_34px_rgb(15_23_42_/_8%)]">
              <p className="text-6xl font-black leading-none text-brand-blue">“</p>
              <p className="min-h-[120px] text-lg font-semibold leading-7 text-[#344054]">{item.text}</p>
              <div className="relative mx-auto mt-6 h-[86px] w-[86px] overflow-hidden rounded-full">
                <Image src={item.image} alt={item.name} fill sizes="86px" className="object-cover" />
              </div>
              <h3 className="mt-4 text-xl font-black">{item.name}</h3>
              <p className="mt-2 text-2xl tracking-[4px] text-brand-yellow">★★★★★</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFooter() {
  return (
    <>
      <section id="order" className="blue-band py-14">
        <div className="container-shell flex items-center justify-between gap-8 max-lg:flex-col max-lg:text-center">
          <div>
            <h2 className="text-4xl font-black leading-tight text-white max-md:text-3xl">Özünüzə və sevdiklərinizə zaman ayırın</h2>
            <p className="mt-3 max-w-3xl text-lg font-semibold text-white/90">
              Pesekar temizlik sirketi, serfeli ve keyfiyyetli xidmetler - 166temizlik.
            </p>
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <Link href="#contact" className="rounded-full bg-white px-8 py-4 text-lg font-black text-brand-blue">BİZİMLƏ ƏLAQƏ</Link>
            <Link href={site.whatsappHref} className="rounded-full bg-brand-yellow px-8 py-4 text-lg font-black text-black">SİFARİŞ ET</Link>
          </div>
        </div>
      </section>
      <footer id="contact" className="bg-[#07111f] py-14 text-white">
        <div className="container-shell grid grid-cols-[1.2fr_1fr_1fr_1.2fr] gap-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div>
            <div className="relative h-[112px] w-[148px]">
              <Image src={site.footerLogo} alt="166 Təmizlik" fill sizes="150px" className="object-contain" />
            </div>
            <p className="mt-4 text-xl font-black">QÜSURSUZ VƏ ETİBARLI</p>
          </div>
          <div>
            <h3 className="mb-5 text-2xl font-black">Yararlı linklər</h3>
            <ul className="space-y-3 text-lg font-semibold text-white/78">
              {["Ana səhifə", "Şirkət haqqında", "Xidmətlər", "Bloq", "Vakansiya"].map((item) => (
                <li key={item}><Link href="#">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-2xl font-black">Xidmətlər</h3>
            <ul className="space-y-3 text-lg font-semibold text-white/78">
              {services.slice(0, 3).map((item) => (
                <li key={item.title}><Link href={item.href}>{item.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-2xl font-black">Əlaqə</h3>
            <ul className="space-y-3 text-lg font-semibold text-white/78">
              <li><Link href={site.phoneHref}>{site.phoneLabel}</Link></li>
              <li><Link href={site.mobileHref}>{site.mobileLabel}</Link></li>
              <li>{site.address}</li>
              <li><Link href={`mailto:${site.email}`}>{site.email}</Link></li>
            </ul>
            <div className="mt-6 flex gap-3">
              {["f", "ig", "wa", "yt"].map((item) => (
                <span key={item} className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-black text-brand-blue">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="container-shell mt-10 border-t border-white/12 pt-6 text-sm font-semibold text-white/55">
          © 166temizlik.az. Site by Webline
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <ServicesSection />
      <PricesSection />
      <AboutSection />
      <BeforeAfterSection />
      <GallerySection />
      <PartnersSection />
      <TestimonialsSection />
      <CtaFooter />
      <Link href={site.whatsappHref} aria-label="Whatsapp" className="floating-action floating-whatsapp">☎</Link>
      <Link href="#order" aria-label="Chat" className="floating-action floating-chat">▰</Link>
    </main>
  );
}
