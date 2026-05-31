import Image from "next/image";
import Link from "next/link";
import { SitePage } from "@/components/SiteChrome";
import { WordPressSeoSchema } from "@/components/WordPressSeoSchema";
import { getLocalizedServices } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";
import { staticPageCopy } from "@/lib/static-page-copy";
import { site } from "@/lib/site-data";
import type { WordPressContentItem } from "@/lib/wordpress";
import { generateStaticWordPressPageMetadata, getStaticWordPressPage } from "@/lib/wordpress-pages";

export async function generateMetadata() {
  return generateStaticWordPressPageMetadata("about", "az", "Şirkət haqqında - 166 Təmizlik");
}

const assets = {
  hero: "https://166temizlik.az/wp-content/uploads/2023/01/10-1.jpg",
  illustration: "https://166temizlik.az/wp-content/uploads/2023/01/a5577f36d5a3e02312cfc23a105bc121-1.png",
  pattern: "https://166temizlik.az/wp-content/uploads/2023/01/travel-pattern-bg.png",
  price: "https://166temizlik.az/wp-content/uploads/2024/12/Group-1000003889.webp",
  team: "https://166temizlik.az/wp-content/uploads/2024/12/Group-1000003890.webp",
  devices: "https://166temizlik.az/wp-content/uploads/2023/02/5-3.webp",
  spray: "https://166temizlik.az/wp-content/uploads/2024/12/sx.webp",
  services: "https://166temizlik.az/wp-content/uploads/2024/12/Group-1000003891.webp",
  cta: "https://166temizlik.az/wp-content/uploads/2023/01/95v9jfn79b8kscokgc80g840swkocg.jpg",
};

const aboutBodyCopy = {
  az: {
    introParagraphs: [
      "2015-ci ildə fəaliyyətinə bir neçə işçi ilə başlayan “166 Təmizlik Xidməti” müasir avadanlıq və təmizlik vasitələri ilə istənilən təmizlik problemini həll edir. Təmizlik şirkəti axtarırsınızsa, doğru ünvandasınız.",
      "Daim müştərilərimizin xidmətində olmaq və operativ xidmət göstərmək məqsədilə 166 qaynar xəttimiz 7/24 ölkənin istənilən nöqtəsindən zəngləri qəbul edir.",
      "Xidmətlərimizin daha əlçatan olması üçün sərfəli qiymət və yüksək xidmət anlayışı ilə çalışırıq. 166 Təmizlik xidmətinin keyfiyyətinin ölçülməsi bizim üçün olduqca vacibdir. Bu məqsədlə, mütəmadi olaraq müştərilərimizin göstərilən xidmətlər üzrə fikirlərini öyrənir, təklif və iradlarına əsasən xidmət keyfiyyətini daim təkmilləşdiririk.",
      "“166 Təmizlik Xidməti - Özünüzə və sevdiklərinizə zaman ayırın!”",
    ],
    pricesParagraph:
      "Şirkətimiz sizin də büdcənizi nəzərə alaraq daha ucuz qiymətə təmizlik xidmətləri təklif edir. Təmizlik xidməti qiymətləri təmizlik paketlərində olduğu kimi hesablanır. Lakin qeyd etmək lazımdır ki, bəzi hallarda təmizlik dərəcəsindən asılı olaraq qiymətlər aşağı və ya yüksək ola bilər.",
    teamParagraphs: [
      "Böyük və peşəkar işçi heyətimiz qısa zamanda maksimum təmizliyi sizin üçün təmin edir. Onlar əraziyə və səthə uyğun kimyəvi məhlul və müasir avadanlıqlardan istifadə edirlər. Xüsusi məhlullar vasitəsi ilə çətin çıxan ləkələri, ərp, kir yerləri məharətlə təmizləyirlər.",
      "Bu xidmətlər menecer tərəfindən nizamlanır və nəzarət olunur.",
    ],
    devicesParagraphs: [
      "Təmizlik xidməti deyildikdə peşəkarlar tərəfindən ən son təmizlik cihazları ilə yaşayış sahələrinin, iş yerlərinin təmizlənməsi nəzərdə tutulur. Bu xidmət həyata keçirilən şirkətlərdə çalışan şəxslər kifayət qədər təcrübəyə sahib peşə sahibləridir.",
      "Bunu nəzərə alaraq bir çox insan məhz təmizlik xidməti təklif edən şirkətlərin köməyindən faydalanır. Bəs bilirsinizmi, təmizlik şirkəti axtaran zaman nələrə diqqət etməlisiniz? Elə isə gəlin tanış olaq!",
    ],
    features: [
      "İşçi heyətinin etibarlılığı və peşəkarlığı;",
      "Gigiyenik təmizliyi qorumaq;",
      "İşin səliqəli və təmiz görülməsi;",
      "Yuyucu vasitələrin keyfiyyətli olması;",
      "İstifadə olunan təmizlik vasitələrinin mebeli zədələməməsi;",
    ],
    featuresParagraph:
      "166 Təmizlik Xidməti sizə bu təminatı verir. Əgər siz də təmizliyə önəm verir və peşəkar təmizlik şirkəti axtarışındasınızsa, bizimlə əlaqə saxlaya və vaxt təyin edə bilərsiniz.",
    materialsAlt: "Təmizlik vasitələri",
    servicesAlt: "Təmizlik xidmətləri",
    packagesAlt: "Təmizlik paketləri",
  },
  ru: {
    introParagraphs: [
      "Клининговая Компания 166 начала свою деятельность в 2015 году и с тех пор предоставляет профессиональные комплексные услуги по уборке помещений для частных и корпоративных клиентов. Высокое качество услуг обеспечивается современной техникой, качественными моющими средствами и опытными специалистами.",
      "Мы предлагаем частным клиентам уборку квартир и коттеджей, химчистку мягкой мебели и ковров, мойку окон и другие услуги, которые требуют профессиональных знаний, опыта, инструментов и бережного подхода.",
      "Нам дорог каждый клиент и важно каждое мнение о нас, поэтому мы с максимальной ответственностью подходим к своей работе. В целях оперативного обслуживания горячая линия 166 принимает звонки из любой точки страны круглосуточно.",
      "«Клининговая Компания 166 - уделите время себе и своим близким!»",
    ],
    pricesParagraph:
      "Наша компания предлагает услуги по уборке по доступной цене с учетом вашего бюджета. Стоимость устанавливается в соответствии с заказом и может меняться в зависимости от площади, сложности и объема работ.",
    teamParagraphs: [
      "Клинеры Клининговой Службы 166 - это профессиональные, опытные и тактичные специалисты. Они используют современные средства и оборудование, подходящие для конкретной поверхности и территории.",
      "Работы организуются и контролируются менеджером, поэтому процесс остается понятным и управляемым для клиента.",
    ],
    devicesParagraphs: [
      "Клининговые услуги подразумевают уборку жилых и рабочих помещений профессионалами с использованием современной техники. Сотрудники таких компаний обладают достаточным опытом и практическими навыками.",
      "Именно поэтому многие люди обращаются за помощью в компанию, предоставляющую услуги по уборке. При выборе клининговой компании важно учитывать надежность персонала, качество средств и аккуратность работы.",
    ],
    features: [
      "Надежность и профессионализм персонала;",
      "Поддержание гигиенической чистоты;",
      "Аккуратное и чистое выполнение работы;",
      "Качество моющих средств;",
      "Использование безопасных чистящих средств для мебели;",
    ],
    featuresParagraph:
      "Клининговая Компания 166 предоставляет вам эту гарантию. Если вы заботитесь о чистоте и ищете профессиональную клининговую компанию, вы можете связаться с нами и запланировать время уборки.",
    materialsAlt: "Чистящие средства",
    servicesAlt: "Клининговые услуги",
    packagesAlt: "Пакеты клининговых услуг",
  },
  tr: {
    introParagraphs: [
      "2015 yılında birkaç çalışanla faaliyete başlayan 166 Temizlik Hizmeti, modern ekipman ve temizlik malzemeleriyle farklı temizlik ihtiyaçlarına profesyonel çözümler sunar.",
      "Müşterilerimize hızlı hizmet göstermek için 166 çağrı hattımız ülkenin her noktasından gelen aramaları 7/24 kabul eder.",
      "Hizmetlerimizin daha erişilebilir olması için uygun fiyat ve yüksek hizmet anlayışıyla çalışıyoruz. Müşteri görüşlerini düzenli olarak değerlendirir, öneri ve taleplere göre hizmet kalitesini sürekli geliştiririz.",
      "“166 Temizlik Hizmeti - kendinize ve sevdiklerinize zaman ayırın!”",
    ],
    pricesParagraph:
      "Şirketimiz bütçenizi dikkate alarak uygun fiyatlarla temizlik hizmetleri sunar. Fiyatlar seçilen pakete, alanın durumuna ve işin kapsamına göre belirlenir.",
    teamParagraphs: [
      "Geniş ve profesyonel ekibimiz kısa sürede maksimum temizlik sağlar. Çalışanlarımız yüzeye ve alana uygun kimyasal çözümler ile modern ekipman kullanır.",
      "Bu hizmetler yönetici tarafından düzenlenir ve kontrol edilir.",
    ],
    devicesParagraphs: [
      "Temizlik hizmeti, yaşam alanlarının ve iş yerlerinin profesyoneller tarafından modern temizlik cihazlarıyla temizlenmesini kapsar. Bu hizmeti veren ekipler yeterli deneyime sahip uzmanlardır.",
      "Bu nedenle birçok kişi temizlik şirketlerinden destek alır. Temizlik şirketi seçerken güvenilir personel, hijyen, kaliteli malzeme ve dikkatli çalışma önemli kriterlerdir.",
    ],
    features: [
      "Personelin güvenilirliği ve profesyonelliği;",
      "Hijyenik temizliğin korunması;",
      "İşin düzenli ve temiz yapılması;",
      "Temizlik malzemelerinin kaliteli olması;",
      "Kullanılan temizlik ürünlerinin mobilyaya zarar vermemesi;",
    ],
    featuresParagraph:
      "166 Temizlik Hizmeti size bu güvenceyi verir. Siz de temizliğe önem veriyor ve profesyonel bir temizlik şirketi arıyorsanız bizimle iletişime geçip uygun zamanı belirleyebilirsiniz.",
    materialsAlt: "Temizlik malzemeleri",
    servicesAlt: "Temizlik hizmetleri",
    packagesAlt: "Temizlik paketleri",
  },
} satisfies Record<
  Locale,
  {
    introParagraphs: string[];
    pricesParagraph: string;
    teamParagraphs: string[];
    devicesParagraphs: string[];
    features: string[];
    featuresParagraph: string;
    materialsAlt: string;
    servicesAlt: string;
    packagesAlt: string;
  }
>;

function Dots({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute bg-[radial-gradient(#d8d8d8_4px,transparent_5px)] [background-size:36px_36px] ${className}`}
    />
  );
}

function TextBlock({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="mb-7 text-[35px] font-normal leading-[42px] text-black max-md:text-[25px] max-md:leading-[32px]">{title}</h2>
      <div className="space-y-4 text-[18px] font-normal leading-[28.8px] text-black/70 max-md:text-[15px] max-md:leading-[24px]">{children}</div>
    </div>
  );
}

function ImageBox({
  src,
  alt,
  className = "",
  contain = true,
}: {
  src: string;
  alt: string;
  className?: string;
  contain?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 520px" className={contain ? "object-contain" : "object-cover"} />
    </div>
  );
}

function getAboutAcfHtml(page: WordPressContentItem | null | undefined, key: string) {
  const value = page?.acf?.[key];
  return typeof value === "string" && value.trim() ? value : "";
}

function SyncedHtml({ html }: { html: string }) {
  return <div className="space-y-4" dangerouslySetInnerHTML={{ __html: html }} />;
}

export async function AboutPageContent({
  locale = "az",
  wordpressPage,
}: {
  locale?: Locale;
  wordpressPage?: WordPressContentItem | null;
}) {
  const wpPage = wordpressPage === undefined ? await getStaticWordPressPage("about", locale) : wordpressPage;
  const copy = staticPageCopy[locale].about;
  const body = aboutBodyCopy[locale];
  const localizedServicesList = getLocalizedServices(locale).map((service) => service.title);
  const title = wpPage?.title || copy.title;
  const heroImage = wpPage?.featuredImage?.url || assets.hero;
  const synced = {
    intro: getAboutAcfHtml(wpPage, "sirkət_mətn"),
    prices: getAboutAcfHtml(wpPage, "təmizlik_xidməti_qiymətləri"),
    team: getAboutAcfHtml(wpPage, "pesəkar_isci_heyəti"),
    devices: getAboutAcfHtml(wpPage, "ən_son_təmizlik_cihazlari_ilə"),
    features: getAboutAcfHtml(wpPage, "təmizlik_xidmətləri_təklif_edən_sirkətlərin_baslica_xususiyyətləri:"),
    services: getAboutAcfHtml(wpPage, "sizə_asagidaki_təmizlik_xidmətlərini_təklif_edirik:"),
  };

  return (
    <SitePage active="about" locale={locale} currentSlug="about">
      <WordPressSeoSchema seo={wpPage?.seo} />
      <section className="relative h-[400px] bg-[#eaf8ff] max-md:h-[270px]">
        <Image src={heroImage} alt={wpPage?.featuredImage?.alt || title} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="container-shell relative flex h-full items-center">
          <h1 className="mb-20 text-[30px] font-medium text-[#15257e] max-md:mb-8 max-md:text-[24px]">{title}</h1>
        </div>
      </section>

      <section className="relative bg-white pb-10">
        <div className="container-shell relative grid grid-cols-[1.02fr_1fr] items-start gap-12 max-lg:grid-cols-1">
          <div className="relative -mt-[170px] max-lg:-mt-20">
            <div className="relative z-10 h-[610px] overflow-hidden rounded-[14px] bg-white max-md:h-[390px]">
              <Image src={assets.illustration} alt="166 Təmizlik xidməti" fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-contain p-8 max-md:p-2" />
            </div>
            <Dots className="bottom-[-125px] left-0 h-[260px] w-[390px] max-md:hidden" />
          </div>

          <article className="mt-[30px] rounded-[16px] bg-white p-12 text-[15px] font-normal leading-[1.85] text-black shadow-[0_6px_28px_rgb(17_24_39_/_10%)] max-lg:mt-0 max-md:p-6 max-md:text-[13px]">
            {synced.intro ? (
              <SyncedHtml html={synced.intro} />
            ) : (
              body.introParagraphs.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? undefined : "mt-6"}>
                  {paragraph}
                </p>
              ))
            )}
          </article>
        </div>
      </section>

      <section className="bg-white py-16 max-md:py-10">
        <div className="container-shell grid grid-cols-2 items-center gap-24 max-lg:grid-cols-1 max-lg:gap-10">
          <TextBlock title={copy.pricesTitle}>
            {synced.prices ? <SyncedHtml html={synced.prices} /> : <p>{body.pricesParagraph}</p>}
          </TextBlock>
          <ImageBox src={assets.price} alt={copy.pricesTitle} className="ml-auto h-[330px] w-[430px] max-lg:mx-auto max-md:h-[260px] max-md:w-full" />
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-shell grid grid-cols-2 items-center gap-24 max-lg:grid-cols-1 max-lg:gap-10">
          <ImageBox src={assets.team} alt={copy.teamTitle} className="h-[380px] w-[520px] max-lg:mx-auto max-md:h-[300px] max-md:w-full" />
          <TextBlock title={copy.teamTitle}>
            {synced.team ? (
              <SyncedHtml html={synced.team} />
            ) : (
              body.teamParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            )}
          </TextBlock>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-shell grid grid-cols-2 items-center gap-20 max-lg:grid-cols-1 max-lg:gap-10">
          <TextBlock title={copy.devicesTitle}>
            {synced.devices ? (
              <SyncedHtml html={synced.devices} />
            ) : (
              body.devicesParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            )}
          </TextBlock>
          <div className="relative">
            <Dots className="bottom-[-55px] left-[-55px] h-[210px] w-[260px] max-md:hidden" />
            <ImageBox src={assets.devices} alt={copy.devicesTitle} className="relative h-[360px] w-[560px] max-lg:mx-auto max-md:h-[280px] max-md:w-full" />
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-shell grid grid-cols-2 items-center gap-24 max-lg:grid-cols-1 max-lg:gap-10">
          <ImageBox src={assets.spray} alt={body.materialsAlt} className="h-[520px] w-[420px] overflow-hidden rounded-[20px] max-lg:mx-auto max-md:h-[360px] max-md:w-full" contain={false} />
          <TextBlock title={copy.featuresTitle}>
            {synced.features ? (
              <SyncedHtml html={synced.features} />
            ) : (
              <>
                <ol className="list-decimal space-y-1 pl-5">
                  {body.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <p>{body.featuresParagraph}</p>
              </>
            )}
          </TextBlock>
        </div>
      </section>

      <section className="bg-white py-10 pb-16">
        <div className="container-shell grid grid-cols-2 items-center gap-20 max-lg:grid-cols-1 max-lg:gap-10">
          <TextBlock title={copy.servicesTitle}>
            {synced.services ? (
              <SyncedHtml html={synced.services} />
            ) : (
              <ul className="list-disc pl-5">
                {localizedServicesList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </TextBlock>
          <ImageBox src={assets.services} alt={body.servicesAlt} className="h-[420px] w-[520px] max-lg:mx-auto max-md:h-[320px] max-md:w-full" />
        </div>
      </section>

      <section className="bg-white pb-24 max-md:pb-14">
        <div className="container-shell">
          <div className="relative min-h-[300px] overflow-hidden rounded-[18px] bg-black max-md:min-h-[230px]">
            <Image src={assets.cta} alt={body.packagesAlt} fill sizes="100vw" className="object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-between gap-6 px-10 max-md:flex-col max-md:items-start max-md:justify-center max-md:px-5">
              <h2 className="max-w-[720px] text-[27px] font-medium leading-tight text-white max-md:text-[21px]">
                {copy.cta}
              </h2>
              <Link
                href={site.whatsappHref}
                className="inline-flex shrink-0 items-center gap-7 rounded-[5px] bg-black px-8 py-4 text-[13px] font-bold !text-white transition-colors hover:bg-black hover:!text-white"
              >
                {copy.order} <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}

export default async function AboutPage() {
  return <AboutPageContent />;
}
