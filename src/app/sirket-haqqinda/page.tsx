import Image from "next/image";
import Link from "next/link";
import { SitePage } from "@/components/SiteChrome";
import { site } from "@/lib/site-data";

export const metadata = {
  title: "Şirkət haqqında - 166 Təmizlik",
};

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

const servicesList = [
  "Ev təmizliyi ( gündəlik, əsaslı, təmir sonrası)",
  "Ofis təmizliyi ( gündəlik, əsaslı, təmir sonrası)",
  "Bağ evlərinin təmizliyi",
  "Ərazi təmizliyi",
  "Fasad təmizliyi",
  "Pəncərə təmizliyi",
  "Çilçıraq təmizliyi",
  "Pərdə və Jalüz yuma (tül, günlük, dekor, adyal, sintepon yorğan, döşək yuyulması)",
  "Yumşaq mebellərin kimyəvi təmizliyi ( divan, kreslo, stul, matras, kovrolin)",
  "Ətirləndirmə xidməti",
  "“Gözəl ev” təmizliyi",
  "Yanğın və subasma sonrası təmizlik",
  "Otel təmizlənməsi",
  "Restoran təmizlənməsi",
  "Təmir sonrası təmizlik",
  "Kristallaşdırma xidməti",
  "Hovuz təmizlənməsi",
  "Korporativ təmizlik xidməti",
];

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
      <h2 className="mb-7 text-[28px] font-medium leading-[1.15] text-[#1c1c1c] max-md:text-[23px]">{title}</h2>
      <div className="space-y-4 text-[14px] font-normal leading-[1.75] text-[#5f6470] max-md:text-[13px]">{children}</div>
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

export default function AboutPage() {
  return (
    <SitePage active="about">
      <section className="relative h-[400px] bg-[#eaf8ff] max-md:h-[270px]">
        <Image src={assets.hero} alt="Şirkət haqqında" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="container-shell relative flex h-full items-center">
          <h1 className="mb-20 text-[30px] font-medium text-[#15257e] max-md:mb-8 max-md:text-[24px]">Şirkət haqqında</h1>
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
            <p>
              2015-ci ildə fəaliyyətinə bir neçə işçi ilə başlayan “166 Təmizlik Xidməti” müasir avadanlıq və təmizlik
              vasitələri ilə istənilən təmizlik problemini həll edir. Təmizlik şirkəti axtarırsınızsa, doğru ünvandasınız.
            </p>
            <p className="mt-6">
              Daim müştərilərimizin xidmətində olmaq və operativ xidmət göstərmək məqsədilə 166 qaynar xəttimiz 7/24 ölkənin
              istənilən nöqtəsindən zəngləri qəbul edir.
            </p>
            <p className="mt-6">
              Xidmətlərimizin daha əlçatan olması üçün sərfəli qiymət və yüksək xidmət anlayışı ilə çalışırıq. 166 Təmizlik
              xidmətinin keyfiyyətinin ölçülməsi bizim üçün olduqca vacibdir. Bu məqsədlə, mütəmadi olaraq müştərilərimizin
              göstərilən xidmətlər üzrə fikirlərini öyrənir, təklif və iradlarına əsasən xidmət keyfiyyətini daim təkmilləşdiririk.
            </p>
            <p className="mt-6">“166 Təmizlik Xidməti - Özünüzə və sevdiklərinizə zaman ayırın!”</p>
          </article>
        </div>
      </section>

      <section className="bg-white py-16 max-md:py-10">
        <div className="container-shell grid grid-cols-2 items-center gap-24 max-lg:grid-cols-1 max-lg:gap-10">
          <TextBlock title="Təmizlik xidməti qiymətləri">
            <p>
              Şirkətimiz sizin də büdcənizi nəzərə alaraq daha ucuz qiymətə təmizlik xidmətləri təklif edir. Təmizlik xidməti
              qiymətləri təmizlik paketlərində olduğu kimi hesablanır. Lakin qeyd etmək lazımdır ki, bəzi hallarda təmizlik
              dərəcəsindən asılı olaraq qiymətlər aşağı və ya yüksək ola bilər.
            </p>
          </TextBlock>
          <ImageBox src={assets.price} alt="Təmizlik xidməti qiymətləri" className="ml-auto h-[330px] w-[430px] max-lg:mx-auto max-md:h-[260px] max-md:w-full" />
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-shell grid grid-cols-2 items-center gap-24 max-lg:grid-cols-1 max-lg:gap-10">
          <ImageBox src={assets.team} alt="Peşəkar işçi heyəti" className="h-[380px] w-[520px] max-lg:mx-auto max-md:h-[300px] max-md:w-full" />
          <TextBlock title="Peşəkar işçi heyəti">
            <p>
              Böyük və peşəkar işçi heyətimiz qısa zamanda maksimum təmizliyi sizin üçün təmin edir. Onlar əraziyə və səthə
              uyğun kimyəvi məhlul və müasir avadanlıqlardan istifadə edirlər. Xüsusi məhlullar vasitəsi ilə çətin çıxan
              ləkələri, ərp, kir yerləri məharətlə təmizləyirlər.
            </p>
            <p>Bu xidmətlər menecer tərəfindən nizamlanır və nəzarət olunur.</p>
          </TextBlock>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-shell grid grid-cols-2 items-center gap-20 max-lg:grid-cols-1 max-lg:gap-10">
          <TextBlock title="Ən son təmizlik cihazları ilə">
            <p>
              Təmizlik xidməti deyildikdə peşəkarlar tərəfindən ən son təmizlik cihazları ilə yaşayış sahələrinin, iş yerlərinin
              təmizlənməsi nəzərdə tutulur. Bu xidmət həyata keçirilən şirkətlərdə çalışan şəxslər kifayət qədər təcrübəyə
              sahib peşə sahibləridir.
            </p>
            <p>
              Bunu nəzərə alaraq bir çox insan məhz təmizlik xidməti təklif edən şirkətlərin köməyindən faydalanır. Bəs bilirsinizmi,
              təmizlik şirkəti axtaran zaman nələrə diqqət etməlisiniz? Elə isə gəlin tanış olaq!
            </p>
          </TextBlock>
          <div className="relative">
            <Dots className="bottom-[-55px] left-[-55px] h-[210px] w-[260px] max-md:hidden" />
            <ImageBox src={assets.devices} alt="Ən son təmizlik cihazları" className="relative h-[360px] w-[560px] max-lg:mx-auto max-md:h-[280px] max-md:w-full" />
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-shell grid grid-cols-2 items-center gap-24 max-lg:grid-cols-1 max-lg:gap-10">
          <ImageBox src={assets.spray} alt="Təmizlik vasitələri" className="h-[520px] w-[420px] max-lg:mx-auto max-md:h-[360px] max-md:w-full" contain={false} />
          <TextBlock title="Təmizlik xidmətləri təklif edən şirkətlərin başlıca xüsusiyyətləri:">
            <ol className="list-decimal space-y-1 pl-5">
              <li>İşçi heyətinin etibarlılığı və peşəkarlığı;</li>
              <li>Gigiyenik təmizliyi qorumaq;</li>
              <li>İşin səliqəli və təmiz görülməsi;</li>
              <li>Yuyucu vasitələrin keyfiyyətli olması;</li>
              <li>İstifadə olunan təmizlik vasitələrinin mebeli zədələməməsi;</li>
            </ol>
            <p>
              166 Təmizlik Xidməti sizə bu təminatı verir. Əgər siz də təmizliyə önəm verir və peşəkar təmizlik şirkəti
              axtarışındasınızsa, bizimlə əlaqə saxlaya və vaxt təyin edə bilərsiniz.
            </p>
          </TextBlock>
        </div>
      </section>

      <section className="bg-white py-10 pb-16">
        <div className="container-shell grid grid-cols-2 items-center gap-20 max-lg:grid-cols-1 max-lg:gap-10">
          <TextBlock title="Sizə aşağıdakı təmizlik xidmətlərini təklif edirik:">
            <ul className="list-disc pl-5">
              {servicesList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TextBlock>
          <ImageBox src={assets.services} alt="Təmizlik xidmətləri" className="h-[420px] w-[520px] max-lg:mx-auto max-md:h-[320px] max-md:w-full" />
        </div>
      </section>

      <section className="bg-white pb-24 max-md:pb-14">
        <div className="container-shell">
          <div className="relative min-h-[300px] overflow-hidden rounded-[18px] bg-black max-md:min-h-[230px]">
            <Image src={assets.cta} alt="Təmizlik paketləri" fill sizes="100vw" className="object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-between gap-6 px-10 max-md:flex-col max-md:items-start max-md:justify-center max-md:px-5">
              <h2 className="max-w-[720px] text-[27px] font-medium leading-tight text-white max-md:text-[21px]">
                166 Təmizlik xidməti sizin büdcənizə uyğun müxtəlif təmizlik paketlərini təqdim edir.
              </h2>
              <Link href={site.whatsappHref} className="inline-flex shrink-0 items-center gap-7 rounded-[5px] bg-black px-8 py-4 text-[13px] font-bold text-white">
                Sifariş ver <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
