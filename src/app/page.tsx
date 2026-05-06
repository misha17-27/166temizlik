import Image from "next/image";
import Link from "next/link";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { HeroSlider } from "@/components/HeroSlider";
import {
  gallery,
  hourlyPrices,
  navItems,
  packageFeatures,
  partners,
  priceCircleImages,
  services,
  site,
  testimonials,
  weeklyPrices,
} from "@/lib/site-data";

function Header() {
  return (
    <header className="sticky top-0 z-50 blue-band">
      <div className="mx-auto flex h-[90px] w-[min(1280px,calc(100%-40px))] items-center justify-between gap-6 max-md:h-[88px] max-md:w-[calc(100%-20px)] max-md:gap-2">
        <Link href="/" aria-label="166 Təmizlik ana səhifə" className="relative h-[78px] w-[150px] shrink-0 max-md:h-[62px] max-md:w-[92px]">
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

        <div className="flex items-center gap-4 max-md:gap-1">
          <Link
            href={site.orderHref}
            className="whitespace-nowrap rounded-full bg-brand-yellow px-8 py-4 [font-family:var(--font-montserrat)] text-[20px] font-bold text-[#171717] transition hover:bg-white max-md:px-4 max-md:py-3 max-md:text-[15px]"
          >
            Sifariş et
          </Link>
          <button aria-label="Open menu" className="hidden h-12 w-12 rounded-lg border-2 border-white text-3xl font-black leading-none text-white max-lg:block max-md:h-10 max-md:w-10 max-md:text-2xl">
            ≡
          </button>
          <Link href="/ru/" prefetch={false} className="grid h-[58px] w-[58px] place-items-center rounded-full bg-white text-xl font-bold text-black max-md:h-10 max-md:w-10 max-md:text-base">
            Ru
          </Link>
          <Link href="/tr/" prefetch={false} className="grid h-[58px] w-[58px] place-items-center rounded-full bg-white text-xl font-bold text-black max-md:h-10 max-md:w-10 max-md:text-base">
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
              prefetch={false}
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

function PackageCard({
  title,
  items,
  priceKey,
  tone,
}: {
  title: string;
  items: string[];
  priceKey: "four" | "eight";
  tone: "blue" | "yellow";
}) {
  const visibleItems = priceKey === "eight" ? items.slice(0, 5) : items;
  const circleImage = priceKey === "four" ? priceCircleImages.four : priceCircleImages.eight;

  return (
    <article className="relative rounded-[18px] bg-white px-10 pb-9 pt-20 shadow-[0_8px_24px_rgb(0_116_202_/_8%)] max-md:px-6">
      <div
        className={`absolute -top-3 left-8 flex h-[44px] min-w-[158px] items-center justify-center gap-2 rounded-full px-8 [font-family:var(--font-montserrat)] text-[18px] font-semibold text-white ${
          tone === "blue" ? "bg-[#1097ed]" : "bg-[#ffd000]"
        }`}
      >
        <span className="grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-white text-[12px]">◷</span>
        {title}
      </div>

      <ol className="min-h-[180px] space-y-2 [font-family:var(--font-montserrat)] text-[19px] font-normal leading-[1.36] text-black max-md:text-[16px]">
        {visibleItems.map((item, index) => (
          <li key={item} className={priceKey === "eight" && index > 2 ? "text-black/35" : ""}>
            {index + 1}. {item}
          </li>
        ))}
      </ol>

      {priceKey === "eight" ? (
        <Link href="#services" className="mt-3 inline-block [font-family:var(--font-montserrat)] text-[18px] text-[#006ed3] underline underline-offset-2">
          Daha çox
        </Link>
      ) : null}

      <div className="mt-7 grid grid-cols-3 gap-4">
        {weeklyPrices.map((price) => (
          <div key={price.label} className="text-center [font-family:var(--font-montserrat)]">
            <p className="mb-2 text-[17px] font-semibold text-black max-md:text-[14px]">{price.label}</p>
            <div className="relative mx-auto grid h-[100px] w-[100px] place-items-center max-md:h-[78px] max-md:w-[78px]">
              <Image src={circleImage} alt="" fill sizes="100px" className="object-contain" />
              <span className="relative text-[28px] font-semibold text-white max-md:text-[21px]">{price[priceKey]}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function HourlyPriceStrip() {
  return (
    <div className="relative mt-10">
      <div className="absolute inset-x-[-80px] bottom-0 h-[120px] rounded-t-[26px] bg-[#e4f1ff] max-md:hidden" />
      <div className="relative grid grid-cols-5 gap-5 max-lg:grid-cols-3 max-sm:grid-cols-1">
        {hourlyPrices.map((price) => (
          <article key={price.time} className="rounded-[16px] bg-white px-5 py-7 text-center shadow-[0_6px_20px_rgb(0_116_202_/_8%)]">
            <div className="mx-auto mb-5 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#95df22] text-3xl text-white">
              ◷
            </div>
            <h3 className="[font-family:var(--font-montserrat)] text-[20px] font-bold text-black">{price.time}</h3>
            <p className="mt-3 [font-family:var(--font-montserrat)] text-[16px] leading-[1.45] text-black">
              {price.city}
              <br />
              {price.village}
              <br />
              (1 nəfər xanım kömək məqsədi ilə gəlir)
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function PricesSection() {
  return (
    <section className="bg-white pb-10 pt-16 max-md:pt-10">
      <div className="container-shell">
        <h2 className="section-title mb-20">Ev təmizlik paketləri</h2>
        <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
          <PackageCard title="4 saat" items={packageFeatures.fourHours} priceKey="four" tone="blue" />
          <PackageCard title="8 saat" items={packageFeatures.eightHours} priceKey="eight" tone="yellow" />
        </div>
        <HourlyPriceStrip />
      </div>
    </section>
  );
}

function NotesSection() {
  return (
    <section className="bg-white py-16 max-md:py-10">
      <div className="container-shell">
        <div className="grid min-h-[400px] grid-cols-[0.75fr_1.15fr] overflow-hidden rounded-[14px] bg-brand-blue text-white max-lg:grid-cols-1">
          <div className="relative min-h-[400px] overflow-hidden max-lg:min-h-[260px]">
            <Image src={site.noteImage} alt="166 Təmizlik qeydlər" fill sizes="520px" className="object-cover" />
            <div className="absolute -right-16 top-[-20%] h-[140%] w-[160px] rounded-[50%] border-r-[22px] border-[#ffd200] bg-brand-blue max-lg:hidden" />
          </div>
          <div className="px-16 py-8 max-lg:px-8 max-md:px-6">
            <h3 className="[font-family:var(--font-montserrat)] text-[32px] font-bold">QEYD</h3>
            <ul className="mt-8 list-disc space-y-2 pl-5 [font-family:var(--font-montserrat)] text-[21px] font-normal leading-[1.35] max-md:text-[17px]">
              <li>Təmizlik zamanı bütün vasitə və təmizləyici maddələr <strong>qiymətə daxildir.</strong></li>
              <li>Təmizlik zamanı <strong>hər əlavə saata görə 10 AZN</strong> hesablanacaqdır.</li>
              <li>Təhlükəli yerdə olan pəncərələrin silinməsi <strong>qiymətə daxil deyil.</strong></li>
              <li>Yumşaq mebellərin kimyəvi təmizlənməsi <strong>qiymətə daxil deyil.</strong></li>
              <li>Öncədən ödəniş edildiyi halda qiymətlərə <strong>endirim</strong> tətbiq edilir</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-white">
      <div className="bg-[#eef6ff] py-14">
        <div className="container-shell grid grid-cols-2 items-center gap-16 max-lg:grid-cols-1">
          <div className="max-w-[500px]">
            <h2 className="[font-family:var(--font-montserrat)] text-[24px] font-bold uppercase tracking-normal text-black">
              ŞİRKƏT <span className="font-normal text-brand-blue">HAQQINDA</span>
            </h2>
            <p className="mt-5 [font-family:var(--font-montserrat)] text-[16px] leading-[1.55] text-black">
              2015-ci ildə fəaliyyətinə bir neçə işçi ilə başlayan “166 Təmizlik Xidməti” müasir avadanlıq və təmizlik vasitələri ilə istənilən təmizlik problemini həll edir. Təmizlik şirkəti axtarırsınızsa, doğru ünvandasınız.
            </p>
            <p className="mt-4 [font-family:var(--font-montserrat)] text-[16px] leading-[1.55] text-black">
              Daim müştərilərimizin xidmətində olmaq və operativ xidmət göstərmək məqsədilə 166 qaynar xəttimiz 7/24 ölkənin istənilən nöqtəsindən zəngləri qəbul edir.
            </p>
          </div>
          <div className="relative mx-auto h-[280px] w-full max-w-[430px]">
            <Image src={site.aboutImage} alt="Şirkət haqqında" fill sizes="430px" className="object-contain" />
          </div>
        </div>
      </div>

      <div className="py-14">
        <div className="container-shell text-center">
          <h2 className="[font-family:var(--font-montserrat)] text-[24px] font-bold uppercase text-black max-md:text-[20px]">
            BÜTÜN AZƏRBAYCANA XİDMƏT GÖSTƏRİRİK
          </h2>
          <div className="relative mx-auto mt-8 h-[400px] w-full max-w-[610px] max-md:h-[270px]">
            <Image src={site.mapImage} alt="Bütün Azərbaycana xidmət göstəririk" fill sizes="610px" className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return <BeforeAfterGallery />;
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
  const loop = [...partners, ...partners];

  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="container-shell rounded-b-[28px] bg-[#e4f1ff] px-[110px] pb-14 pt-9 max-lg:px-8">
        <h2 className="[font-family:var(--font-montserrat)] text-[24px] font-bold uppercase text-black">PARTNYORLAR</h2>
        <div className="mt-8 overflow-hidden">
          <div className="partners-track flex w-max gap-7">
            {loop.map((src, index) => (
              <div key={`${src}-${index}`} className="relative h-[92px] w-[150px] shrink-0 rounded-[14px] border border-[#d5dbe3] bg-white shadow-[0_8px_18px_rgb(15_23_42_/_4%)]">
                <Image src={src} alt={`Partnyor ${index + 1}`} fill sizes="150px" className="object-contain p-5" />
              </div>
            ))}
          </div>
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
          <h2 className="[font-family:var(--font-montserrat)] text-[24px] font-bold leading-tight text-white max-md:text-[22px]">Özünüzə və sevdiklərinizə zaman ayırın</h2>
          <div className="flex gap-9 max-sm:flex-col">
            <Link href="#contact" className="rounded-full bg-brand-yellow px-12 py-3 [font-family:var(--font-montserrat)] text-[12px] font-bold text-black">BİZİMLƏ ƏLAQƏ</Link>
            <Link href={site.whatsappHref} className="rounded-full bg-white px-12 py-3 [font-family:var(--font-montserrat)] text-[12px] font-bold text-black">SİFARİŞ ET</Link>
          </div>
        </div>
      </section>
      <footer id="contact" className="blue-band text-white">
        <div className="container-shell grid grid-cols-[1.1fr_1fr_1fr_1.35fr] gap-16 py-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="text-center max-sm:text-left">
            <div className="relative mx-auto h-[132px] w-[170px] max-sm:mx-0">
              <Image src={site.footerLogo} alt="166 Təmizlik" fill sizes="170px" className="object-contain" />
            </div>
            <p className="mt-3 [font-family:var(--font-montserrat)] text-[12px] font-normal">QÜSURSUZ VƏ ETİBARLI</p>
          </div>
          <div>
            <h3 className="mb-4 [font-family:var(--font-montserrat)] text-[17px] font-bold">Yararlı linklər</h3>
            <ul className="space-y-4 [font-family:var(--font-montserrat)] text-[15px] font-normal">
              {["Ana səhifə", "Şirkət haqqında", "Xidmətlər", "Bloq", "Vakansiya"].map((item) => (
                <li key={item}><Link href="#">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 [font-family:var(--font-montserrat)] text-[17px] font-bold">Xidmətlər</h3>
            <ul className="space-y-4 [font-family:var(--font-montserrat)] text-[15px] font-normal">
              {services.slice(0, 3).map((item) => (
                <li key={item.title}><Link href={item.href} prefetch={false}>{item.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 [font-family:var(--font-montserrat)] text-[17px] font-bold">Əlaqə</h3>
            <ul className="space-y-2 [font-family:var(--font-montserrat)] text-[15px] font-normal leading-[1.45]">
              <li>☎ <Link href={site.phoneHref}>{site.phoneLabel}</Link></li>
              <li>▯ <Link href={site.mobileHref}>{site.mobileLabel}</Link></li>
              <li>⌖ {site.address}</li>
              <li>✉ <Link href={`mailto:${site.email}`}>{site.email}</Link></li>
            </ul>
            <div className="mt-4 flex gap-2">
              {["f", "◎", "☏", "▶"].map((item) => (
                <span key={item} className="grid h-8 w-8 place-items-center rounded-full border border-white [font-family:var(--font-montserrat)] text-sm font-bold text-white">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/55 py-4 text-center [font-family:var(--font-montserrat)] text-[12px] font-normal text-white">
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
      <NotesSection />
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
