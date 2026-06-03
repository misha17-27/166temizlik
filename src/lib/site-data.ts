export const site = {
  phoneLabel: "166, daxili nömrə 3",
  phoneHref: "tel:166",
  mobileLabel: "+994 50 285 44 77",
  mobileHref: "tel:+994502854477",
  email: "info@166temizlik.az",
  address: "Şəfayət Mehdiyev 134, Baku, Azerbaijan",
  orderHref: "#order",
  whatsappHref: "https://api.whatsapp.com/send?phone=994502854477&text=Salam",
  logo: "https://admin.166temizlik.az/wp-content/uploads/2023/01/ALL_LddOGOS-03.png",
  footerLogo: "https://admin.166temizlik.az/wp-content/uploads/2022/12/logo-w.png",
  noteImage: "https://admin.166temizlik.az/wp-content/uploads/2024/12/u1.webp",
  aboutImage: "https://admin.166temizlik.az/wp-content/uploads/2024/12/u33.webp",
  mapImage: "https://admin.166temizlik.az/wp-content/uploads/2023/02/azerbaijan5-1-1.svg",
};

export const navItems = [
  { label: "Ana səhifə", href: "/" },
  { label: "Xidmətlər", href: "#services", hasMenu: true },
  { label: "Şirkət haqqında", href: "#about", hasMenu: true },
  { label: "Qalereya", href: "#gallery" },
  { label: "Əlaqə", href: "#contact" },
];

export type HeroSlide = {
  eyebrow?: string;
  title?: string;
  images?: string[];
  desktopImage: string;
  mobileImage: string;
  desktopBgColor: string;
  desktopWidth: number;
  desktopHeight: number;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Ev təmizliyi + kimyəvi təmizlik + pərdə yuma sifariş edənlərə",
    title: "30% ENDİRİM",
    desktopImage: "https://admin.166temizlik.az/wp-content/uploads/2025/04/Artboard-1-5.webp",
    mobileImage: "https://admin.166temizlik.az/wp-content/uploads/2025/04/Artboard-1-copy-4.webp",
    desktopBgColor: "#0271C9",
    desktopWidth: 1920,
    desktopHeight: 1080,
    images: [
      "https://admin.166temizlik.az/wp-content/uploads/2024/08/Artboard-1-copy-1-2.webp",
      "https://admin.166temizlik.az/wp-content/uploads/2024/06/Artboard-1-copy-2-2.webp",
      "https://admin.166temizlik.az/wp-content/uploads/2024/04/yum.webp",
    ],
  },
  {
    eyebrow: "Peşəkar komanda və müasir avadanlıqla",
    title: "TƏMİZ EV, RAHAT GÜN",
    desktopImage: "https://admin.166temizlik.az/wp-content/uploads/2025/01/Artboard-1-2-1.webp",
    mobileImage: "https://admin.166temizlik.az/wp-content/uploads/2025/01/Artboard-1-copy-2-2-1.webp",
    desktopBgColor: "#FBEA13",
    desktopWidth: 1200,
    desktopHeight: 500,
    images: [
      "https://admin.166temizlik.az/wp-content/uploads/2024/04/yumshaq2.webp",
      "https://admin.166temizlik.az/wp-content/uploads/2024/04/yumshaq.webp",
      "https://admin.166temizlik.az/wp-content/uploads/2024/04/yum4.webp",
    ],
  },
  {
    eyebrow: "Bakı və Bakı kəndləri üzrə operativ xidmət",
    title: "166 TƏMİZLİK",
    desktopImage: "https://admin.166temizlik.az/wp-content/uploads/2025/11/Untitled-1-1.webp",
    mobileImage: "https://admin.166temizlik.az/wp-content/uploads/2025/11/mobil-2.webp",
    desktopBgColor: "#0271C9",
    desktopWidth: 1920,
    desktopHeight: 1080,
    images: [
      "https://admin.166temizlik.az/wp-content/uploads/2024/04/AA1.webp",
      "https://admin.166temizlik.az/wp-content/uploads/2024/04/AA2.webp",
      "https://admin.166temizlik.az/wp-content/uploads/2024/04/yum2.webp",
    ],
  },
  {
    eyebrow: "166 Təmizlik",
    title: "Xidmətlər",
    desktopImage: "https://admin.166temizlik.az/wp-content/uploads/2026/04/az-desc.webp",
    mobileImage: "https://admin.166temizlik.az/wp-content/uploads/2026/04/az-mob.webp",
    desktopBgColor: "#FBEA13",
    desktopWidth: 1376,
    desktopHeight: 768,
    images: [],
  },
];

export const services = [
  ["Ev təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-442.svg", "/ev-temizliyi-xidmeti/"],
  ["Ofis təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-443.svg", "/ofis-temizliyi/"],
  ["Bağ evlərinin təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-4434.svg", "/bag-evlerinin-temizliyi/"],
  ["Ərazi təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-4431.svg", "/erazi-temizliyi/"],
  ["Fasad təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-443aaa.svg", "/fasad-temizliyi/"],
  ["Pəncərə təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-4435.svg", "/pencere-temizliyi/"],
  ["Çilçıraq təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-44344.svg", "/cilciraq-temizliyi/"],
  ["Pərdə Yuma", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-44355.svg", "/perde-yuma/"],
  ["Yumşaq mebellərin kimyəvi təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/04/Frame-443tsss.svg", "/yumsaq-mebel-temizlenmesi/"],
  ["Ətirləndirmə xidməti", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-443j.svg", "/etirlendirme/"],
  ["“Gözəl ev” təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-443d.svg", "/baximsiz-ev-temizliyi/"],
  ["Yanğından sonra ev təmizliyi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-443444.svg", "/yangindan-sonra-ev-temizliyi/"],
  ["Təmir sonrası təmizlik", "https://admin.166temizlik.az/wp-content/uploads/2023/05/Group-6.svg", "/temir-sonrasi-temizlik/"],
  ["Otel təmizlənməsi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-443aaaa.svg", "/otel-temizlenmesi/"],
  ["Restoran təmizlənməsi", "https://admin.166temizlik.az/wp-content/uploads/2023/03/Frame-443kk.svg", "/restoran-temizlenmesi/"],
  ["Hovuz təmizlənməsi", "https://admin.166temizlik.az/wp-content/uploads/2024/02/hovuz.svg", "/hovuz-temizlenmesi-xidmeti/"],
  ["Kristallaşdırma xidməti", "https://admin.166temizlik.az/wp-content/uploads/2024/02/kristal.svg", "/kristallasdirma-xidmeti/"],
  ["Korporativ təmizlik xidməti", "https://admin.166temizlik.az/wp-content/uploads/2024/10/korporativ.svg", "/korporativ-temizlik-xidmeti/"],
].map(([title, icon, href]) => ({ title, icon, href }));

export const packageFeatures = {
  fourHours: [
    "Evin ümumi səliqəyə salınması",
    "Döşəmənin quru və nəm təmizlənməsi",
    "Sanitar qovşaqların təmizlənməsi",
    "Daxili şüşə və güzgülərin silinməsi",
    "Mebellərin tozunun alınması",
    "Məişət texnikasının üzdən təmizlənməsi",
    "Az ləkəli səthlərin təmizlənməsi",
  ],
  eightHours: [
    "Evin ümumi səliqəyə salınması",
    "Döşəmənin quru və nəm təmizlənməsi",
    "Sanitar qovşaqların təmizlənməsi",
    "Daxili şüşə və güzgülərin silinməsi",
    "Mebellərin tozunun alınması",
    "Məişət texnikasının üzdən təmizlənməsi",
    "Yağ, ərp, torlu səthlərin təmizlənməsi",
    "Kiçik çilçıraqların təmizlənməsi",
    "Divarların tozunun alınması",
    "Mətbəxin ümumi səliqəyə salınması",
    "Pəncərələrin silinməsi",
    "Eyvanın silinməsi",
  ],
};

export const priceCircleImages = {
  four: "https://admin.166temizlik.az/wp-content/uploads/2022/12/Group-3.png",
  eight: "https://admin.166temizlik.az/wp-content/uploads/2022/12/Group-4.png",
};

export const weeklyPrices = [
  { label: "1 gün / həftə", four: "90₼", eight: "110₼" },
  { label: "2 gün / həftə", four: "160₼", eight: "200₼" },
  { label: "3 gün / həftə", four: "210₼", eight: "270₼" },
];

export const hourlyPrices = [
  ["2 saat", "Bakı - 70 azn", "Bakı kəndləri - 90 azn"],
  ["3 saat", "Bakı - 80 azn", "Bakı kəndləri - 100 azn"],
  ["4 saat", "Bakı - 90 azn", "Bakı kəndləri - 110 azn"],
  ["6 saat", "Bakı - 100 azn", "Bakı kəndləri - 120 azn"],
  ["8 saat", "Bakı - 110 azn", "Bakı kəndləri - 130 azn"],
].map(([time, city, village]) => ({ time, city, village }));

export const notes = [
  "Təmizlik zamanı bütün vasitə və təmizləyici maddələr qiymətə daxildir.",
  "Təmizlik zamanı hər əlavə saata görə 10 AZN hesablanacaqdır.",
  "Təhlükəli yerdə olan pəncərələrin silinməsi qiymətə daxil deyil.",
  "Yumşaq mebellərin kimyəvi təmizlənməsi qiymətə daxil deyil.",
  "Öncədən ödəniş edildiyi halda qiymətlərə endirim tətbiq edilir.",
];

export const beforeAfter = [
  {
    before: "https://admin.166temizlik.az/wp-content/uploads/2023/02/kovralin-temizliyi-evvel.webp",
    after: "https://admin.166temizlik.az/wp-content/uploads/2023/02/kovralin-temizliyi-sonra.webp",
    title: "Kovralin təmizliyi",
  },
  {
    before: "https://admin.166temizlik.az/wp-content/uploads/2023/02/metbex-temizliyi-evvel-1.webp",
    after: "https://admin.166temizlik.az/wp-content/uploads/2023/02/metbex-sonra.webp",
    title: "Mətbəx təmizliyi",
  },
  {
    before: "https://admin.166temizlik.az/wp-content/uploads/2024/01/as12.webp",
    after: "https://admin.166temizlik.az/wp-content/uploads/2024/01/as11.webp",
    title: "Divan təmizliyi",
  },
  {
    before: "https://admin.166temizlik.az/wp-content/uploads/2024/01/b11.webp",
    after: "https://admin.166temizlik.az/wp-content/uploads/2024/01/b22.webp",
    title: "Yumşaq mebel",
  },
  {
    before: "https://admin.166temizlik.az/wp-content/uploads/2024/01/q11.webp",
    after: "https://admin.166temizlik.az/wp-content/uploads/2024/01/q22.webp",
    title: "Kreslo təmizliyi",
  },
];

export const gallery = [
  "https://admin.166temizlik.az/wp-content/uploads/2024/04/yum.webp",
  "https://admin.166temizlik.az/wp-content/uploads/2024/04/yumshaq2.webp",
  "https://admin.166temizlik.az/wp-content/uploads/2024/04/yumshaq.webp",
  "https://admin.166temizlik.az/wp-content/uploads/2024/04/yum4.webp",
  "https://admin.166temizlik.az/wp-content/uploads/2024/04/yum3.webp",
  "https://admin.166temizlik.az/wp-content/uploads/2024/04/yum2.webp",
  "https://admin.166temizlik.az/wp-content/uploads/2024/04/AA1.webp",
  "https://admin.166temizlik.az/wp-content/uploads/2024/04/AA2.webp",
];

export const partners = [
  "Artboard-13.jpg",
  "Artboard-14.jpg",
  "Artboard-20.jpg",
  "Artboard-2-3.jpg",
  "Artboard-1-4.jpg",
  "Artboard-3-3.jpg",
  "Artboard-5-1.jpg",
  "Artboard-4-3.jpg",
  "Artboard-6.jpg",
  "Artboard-8.jpg",
  "Artboard-7.jpg",
  "Artboard-9.jpg",
  "Artboard-10.jpg",
  "Artboard-11.jpg",
  "Artboard-12.jpg",
].map((file) => `https://admin.166temizlik.az/wp-content/uploads/2023/02/${file}`);

export const testimonials = [
  {
    name: "Sevda Səmədova",
    image: "https://admin.166temizlik.az/wp-content/uploads/2023/02/170x170-02.png",
    text: "Bu gün evimizə 166 Təmizlik xidmətindən Günel xanım başda olmaqla Təranə 2, Türkan və Mehriban 6 xanımlar gəlmişdilər. Çox razı qaldıq, təşəkkürlər!",
  },
  {
    name: "Nigar Əliyeva",
    image: "https://admin.166temizlik.az/wp-content/uploads/2023/02/170x170-01.png",
    text: "Operativ əlaqə, səliqəli iş və mehriban komanda. Ev təmizliyi xidmətindən çox razı qaldıq.",
  },
  {
    name: "Rauf Məmmədov",
    image: "https://admin.166temizlik.az/wp-content/uploads/2023/02/170x170-05.png",
    text: "Ofis təmizliyi üçün müraciət etdik. Vaxtında gəldilər, iş keyfiyyəti gözlədiyimizdən də yaxşı oldu.",
  },
];
