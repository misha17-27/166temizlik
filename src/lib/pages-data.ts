import { services } from "@/lib/site-data";
import type { Locale } from "@/lib/routes";

export const galleryImages = [
  "https://166temizlik.az/wp-content/uploads/2023/02/perde333-1.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/05/DSC08207.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/03/20230223_114056.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-1.webp",
  "https://166temizlik.az/wp-content/uploads/2023/02/72c66bb8b599dfcc1af3b2488cf67f71-1.jpeg",
  "https://166temizlik.az/wp-content/uploads/2023/03/20230205_130150.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/03/IMG-20230309-WA0021.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-3.webp",
  "https://166temizlik.az/wp-content/uploads/2023/02/29902f175cfb21144fcd9279725845bf-1-1.png",
  "https://166temizlik.az/wp-content/uploads/2023/03/20230223_113905.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/03/IMG-20230309-WA0005.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/03/20230128_105519.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/05/DSC08231.jpg",
  "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-10.webp",
  "https://166temizlik.az/wp-content/uploads/2023/05/J1A8070.jpg",
];

export const galleryCategories = [
  "Ev və ofis təmizliyi",
  "Bağ evlərinin təmizlənməsi",
  "Ərazi təmizliyi",
  "Fasad təmizliyi",
  "Pərdə və Jaluz Yuma",
  "Yumşaq mebellərin kimyəvi təmizliyi",
  "Ətirləndirmə xidməti",
  "Restoran və otel təmizliyi",
];

const galleryCategoryTranslations: Partial<Record<Locale, string[]>> = {
  ru: [
    "Уборка дома и офиса",
    "Уборка дачных домов",
    "Уборка территории",
    "Чистка фасада",
    "Стирка штор и жалюзи",
    "Химчистка мягкой мебели",
    "Ароматизация",
    "Уборка ресторанов и отелей",
  ],
  tr: [
    "Ev ve ofis temizliği",
    "Bağ evlerinin temizliği",
    "Alan temizliği",
    "Cephe temizliği",
    "Perde ve jaluzi yıkama",
    "Yumuşak mobilyaların kimyasal temizliği",
    "Koku uygulama hizmeti",
    "Restoran ve otel temizliği",
  ],
};

export function getLocalizedGalleryCategories(locale: Locale) {
  return galleryCategoryTranslations[locale] ?? galleryCategories;
}

export const pageHeroAssets = {
  blog: "https://166temizlik.az/wp-content/uploads/2023/02/5282459.webp",
  partners: "https://166temizlik.az/wp-content/uploads/2023/02/business-partners.jpg",
  employees: "https://166temizlik.az/wp-content/uploads/2023/07/166-t-mizlik-ximd-ti.png",
  equipment: "https://166temizlik.az/wp-content/uploads/2023/09/aaa11.webp",
};

export const blogPosts = [
  {
    title: "Baca təmizliyi və əhəmiyyəti",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/chimney-cleaning-article-image.png",
    excerpt:
      "Bacanızın mütəmadi təmizlənməsi evinizin təhlükəsizliyi və istilik sisteminin səmərəliliyi üçün vacibdir.",
  },
  {
    title: "Bahar təmizliyi ilə evinizi yenidən canlandırın!",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/whats-included-in-a-professional-house-cleaning-checklist-included-343704.jpg",
    excerpt:
      "Bahar mövsümü evi dərin təmizləmək, lazımsız əşyaları ayırmaq və məkanı təravətləndirmək üçün ideal zamandır.",
  },
  {
    title: "Evdəki tozları aradan qaldırmaq üçün məsləhətlər",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/house-cleaning-team.jpg",
    excerpt:
      "Doğru alətlər və üsullarla evinizi sağlam, parlaq və tozsuz saxlamaq mümkündür.",
  },
  {
    title: "Evinizdəki rütubət qoxularından necə qurtula bilərsiniz",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/230405-shower-cleaning-kb-2x1-1.jpg",
    excerpt:
      "Nəmli mühit xoşagəlməz qoxulara səbəb olur. Sadə və effektiv üsullarla bu problemi azaltmaq olar.",
  },
  {
    title: "Pəncərələrinizi təmizləməyi gecikdirməyin, təmizlik mütəxəssisləri səbəbini açıqlayır",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/hig-class-window-cleaning.jpg",
    excerpt:
      "Pəncərələrin müntəzəm təmizlənməsi həm görüntünü, həm də şüşələrin uzunömürlülüyünü qoruyur.",
  },
  {
    title: "Evinizi ən təmiz halda tutmaq üçün ipucları",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/HomeWorks-thuishulp.webp",
    excerpt: "Təmizlik yalnız estetik baxımdan deyil, həm də sağlamlıq və rahatlıq üçün vacibdir.",
  },
  {
    title: "Çilçıraq təmizlənməsi",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/IMG_5340.jpg",
    excerpt: "İşıqda parıldayan çilçırağınızın toz və hörümçək torlarından təmizlənməsi üçün peşəkar tövsiyələr.",
  },
  {
    title: "Təmizləyici vasitələr bakteriyaları öldürürmü?",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/cleaning-products-stock-today-160307-tease.webp",
    excerpt: "Hər təmizləyici vasitə dezinfeksiya etmir. Səthlərin gigiyenik qalması üçün nələrə diqqət etmək lazımdır.",
  },
  {
    title: "Evinizi necə dezinfeksiya edə bilərsiniz?",
    image: "https://166temizlik.az/wp-content/uploads/2025/02/disinfecting-door-handle-2.jpg",
    excerpt: "Çox istifadə edilən səthləri düzgün dezinfeksiya etməklə mikrobların yayılmasının qarşısını almaq mümkündür.",
  },
  {
    title: "Kiflərin təmizlənməsi üsulları",
    image: "https://166temizlik.az/wp-content/uploads/2025/01/Mold-Remediation.jpg",
    excerpt: "Hamam, mətbəx və digər otaqlarda yaranan kifin aradan qaldırılması üçün sadə və effektiv üsullar.",
  },
  {
    title: "Hamam otağı təmizliyi necə edilməli",
    image: "https://166temizlik.az/wp-content/uploads/2024/07/GettyImages-153187215-65d9eaf6255a42599b005211adc5faf1.jpg",
    excerpt: "Hamam təmizliyini hissələrə bölərək düzgün alətlər və texnika ilə prosesi daha rahat etmək mümkündür.",
  },
  {
    title: "Niyə divan və kreslo təmizliyi peşəkar şəkildə edilməlidir?",
    image: "https://166temizlik.az/wp-content/uploads/2024/07/Man-professionally-cleaning-couch.webp",
    excerpt: "Evdə ən çox istifadə olunan yumşaq mebellərin dərin təmizliyi sağlam və səliqəli mühit yaradır.",
  },
];

const blogPostTranslations: Partial<Record<Locale, Array<{ title: string; excerpt: string }>>> = {
  ru: [
    {
      title: "Чистка дымохода и ее значение",
      excerpt: "Регулярная чистка дымохода важна для безопасности дома и эффективной работы отопительной системы.",
    },
    {
      title: "Оживите дом весенней уборкой!",
      excerpt: "Весна подходит для глубокой уборки, сортировки лишних вещей и обновления пространства.",
    },
    {
      title: "Советы по удалению пыли дома",
      excerpt: "Правильные инструменты и методы помогают поддерживать дом здоровым, чистым и без пыли.",
    },
    {
      title: "Как избавиться от запаха сырости дома",
      excerpt: "Влажная среда вызывает неприятные запахи. Простые и эффективные методы помогают уменьшить проблему.",
    },
    {
      title: "Не откладывайте мойку окон",
      excerpt: "Регулярная мойка окон сохраняет вид, освещенность помещения и срок службы стекол.",
    },
    {
      title: "Как поддерживать дом в чистоте",
      excerpt: "Чистота важна не только для внешнего вида, но и для здоровья, комфорта и спокойствия.",
    },
    {
      title: "Чистка люстр",
      excerpt: "Профессиональные рекомендации помогут вернуть люстре блеск и убрать пыль с деталей.",
    },
    {
      title: "Убивают ли чистящие средства бактерии?",
      excerpt: "Не каждое средство дезинфицирует поверхность. Важно знать, как поддерживать гигиену правильно.",
    },
    {
      title: "Как можно дезинфицировать дом?",
      excerpt: "Правильная обработка часто используемых поверхностей помогает сократить распространение микробов.",
    },
    {
      title: "Способы удаления плесени",
      excerpt: "Простые методы помогают убрать плесень в ванной, кухне и других влажных помещениях.",
    },
    {
      title: "Как правильно убирать ванную комнату",
      excerpt: "Разделение уборки на этапы и правильные инструменты делают процесс легче и эффективнее.",
    },
    {
      title: "Почему диван и кресла нужно чистить профессионально?",
      excerpt: "Глубокая чистка мягкой мебели создает более здоровую и аккуратную среду дома.",
    },
  ],
  tr: [
    {
      title: "Baca temizliği ve önemi",
      excerpt: "Bacanın düzenli temizlenmesi ev güvenliği ve ısıtma sisteminin verimli çalışması için önemlidir.",
    },
    {
      title: "Bahar temizliğiyle evinizi canlandırın!",
      excerpt: "Bahar, derin temizlik yapmak, gereksiz eşyaları ayırmak ve alanı yenilemek için uygun zamandır.",
    },
    {
      title: "Evdeki tozları azaltmak için ipuçları",
      excerpt: "Doğru araçlar ve yöntemlerle evinizi sağlıklı, parlak ve tozsuz tutabilirsiniz.",
    },
    {
      title: "Evdeki nem kokusundan nasıl kurtulursunuz",
      excerpt: "Nemli ortam kötü kokulara yol açar. Basit yöntemlerle bu sorunu azaltmak mümkündür.",
    },
    {
      title: "Pencere temizliğini ertelemeyin",
      excerpt: "Düzenli pencere temizliği hem görünümü hem de camların kullanım ömrünü korur.",
    },
    {
      title: "Evinizi temiz tutmak için ipuçları",
      excerpt: "Temizlik sadece görünüm için değil, sağlık ve konfor için de gereklidir.",
    },
    {
      title: "Avize temizliği",
      excerpt: "Avizenizin tozdan arınması ve yeniden parlaması için profesyonel öneriler.",
    },
    {
      title: "Temizlik ürünleri bakterileri öldürür mü?",
      excerpt: "Her temizlik ürünü dezenfekte etmez. Yüzey hijyeni için doğru kullanım önemlidir.",
    },
    {
      title: "Evinizi nasıl dezenfekte edebilirsiniz?",
      excerpt: "Sık kullanılan yüzeyleri doğru dezenfekte etmek mikropların yayılmasını azaltır.",
    },
    {
      title: "Küf temizleme yöntemleri",
      excerpt: "Banyo, mutfak ve diğer odalarda oluşan küfü gidermek için pratik yöntemler.",
    },
    {
      title: "Banyo temizliği nasıl yapılmalı",
      excerpt: "Banyo temizliğini adımlara bölmek ve doğru araçları kullanmak işi kolaylaştırır.",
    },
    {
      title: "Koltuk ve sandalye temizliği neden profesyonel yapılmalı?",
      excerpt: "Yumuşak mobilyaların derin temizliği daha sağlıklı ve düzenli bir ev ortamı oluşturur.",
    },
  ],
};

export function getLocalizedBlogPosts(locale: Locale) {
  const translations = blogPostTranslations[locale];
  return blogPosts.map((post, index) => ({ ...post, ...(translations?.[index] ?? {}) }));
}

export const employees = [
  ["Kazımova Sevər", "Ofis meneceri", "https://166temizlik.az/wp-content/uploads/2023/07/Kazimova-Sev-r.jpeg"],
  ["İsayev Habil", "Təmizlik Xidməti bölümünün müdir müavini", "https://166temizlik.az/wp-content/uploads/2023/07/Isayev-Habil.jpeg"],
  ["Əşrəfova Səidə", "Problemlər şöbəsinin əməkdaşı", "https://166temizlik.az/wp-content/uploads/2023/07/sr-fova-S-id-.jpeg"],
  ["Yunusova Səma", "Baş menecer", "https://166temizlik.az/wp-content/uploads/2023/07/Yunusova-S-ma.jpeg"],
  ["Quluyeva Vüsalə", "Satış meneceri", "https://166temizlik.az/wp-content/uploads/2023/07/Quluyeva-Vusal-.jpeg"],
  ["İsgəndərova Aysel", "Satış meneceri", "https://166temizlik.az/wp-content/uploads/2023/07/Isg-nd-rova-Aysel.jpeg"],
  ["Bağırov Fərman", "Sürücü", "https://166temizlik.az/wp-content/uploads/2023/07/Bagirov-F-rman.jpeg"],
  ["Əskərov Namiq", "Sürücü", "https://166temizlik.az/wp-content/uploads/2023/07/sk-rov-Namiq1.jpeg"],
  ["Xəlilov Qurban", "Sürücülərə nəzarət edən şəxs", "https://166temizlik.az/wp-content/uploads/2023/07/X-lilov-Qurban.jpeg"],
  ["Allahverdiyeva Aysel", "Pərdə Yuma Xidmətinin qrup rəhbəri", "https://166temizlik.az/wp-content/uploads/2023/07/Allahverdiyeva-Aysel-1.jpeg"],
  ["Bayramov Zübeyir", "Təchizat işlərinə baxan şəxs", "https://166temizlik.az/wp-content/uploads/2023/07/Bayramov-Zubeyir.jpeg"],
].map(([name, role, image]) => ({ name, role, image }));

const employeeRoleTranslations: Partial<Record<Locale, string[]>> = {
  ru: [
    "Офис-менеджер",
    "Заместитель руководителя отдела клининговых услуг",
    "Сотрудник отдела проблем",
    "Главный менеджер",
    "Менеджер по продажам",
    "Менеджер по продажам",
    "Водитель",
    "Водитель",
    "Ответственный за контроль водителей",
    "Руководитель группы услуги стирки штор",
    "Ответственный за снабжение",
  ],
  tr: [
    "Ofis yöneticisi",
    "Temizlik Hizmeti bölüm müdür yardımcısı",
    "Sorunlar bölümünün çalışanı",
    "Baş yönetici",
    "Satış yöneticisi",
    "Satış yöneticisi",
    "Sürücü",
    "Sürücü",
    "Sürücüleri denetleyen kişi",
    "Perde yıkama hizmeti grup lideri",
    "Tedarik işlerinden sorumlu kişi",
  ],
};

export function getLocalizedEmployees(locale: Locale) {
  const roles = employeeRoleTranslations[locale];
  return employees.map((person, index) => ({ ...person, role: roles?.[index] ?? person.role }));
}

export const vacancies = [
  {
    title: "Təmizlikçi",
    summary: "166 Təmizlik Xidməti Təmizlikçi vəzifəsinə müraciət etməyə dəvət edir.",
    items: ["Peşə təhsilli olması arzuolunandır", "Sahə üzrə təcrübə üstünlükdür", "Komanda ilə işləmə bacarığı"],
  },
  {
    title: "Menecer",
    summary: "166 Təmizlik Xidmətində Menecer vəzifəsinə müraciət etməyə dəvət edir.",
    items: ["Ali təhsil", "Sahə üzrə 3 il təcrübə", "Müştəri ilə düzgün ünsiyyət bacarığı"],
  },
];

const vacancyTranslations: Partial<Record<Locale, typeof vacancies>> = {
  ru: [
    {
      title: "Уборщик",
      summary: "166 Təmizlik приглашает подать заявку на вакансию уборщика.",
      items: ["Профессиональное образование желательно", "Опыт в сфере будет преимуществом", "Умение работать в команде"],
    },
    {
      title: "Менеджер",
      summary: "166 Təmizlik приглашает подать заявку на вакансию менеджера.",
      items: ["Высшее образование", "3 года опыта в сфере", "Навыки корректного общения с клиентами"],
    },
  ],
  tr: [
    {
      title: "Temizlikçi",
      summary: "166 Temizlik Hizmeti temizlikçi pozisyonu için başvuruya davet eder.",
      items: ["Mesleki eğitim tercih edilir", "Alan deneyimi avantajdır", "Takım çalışması becerisi"],
    },
    {
      title: "Yönetici",
      summary: "166 Temizlik Hizmeti yönetici pozisyonu için başvuruya davet eder.",
      items: ["Yüksek öğrenim", "Alanında 3 yıl deneyim", "Müşteriyle doğru iletişim becerisi"],
    },
  ],
};

export function getLocalizedVacancies(locale: Locale) {
  return vacancyTranslations[locale] ?? vacancies;
}

export const equipment = [
  {
    title: "Tozsoran",
    image: "https://166temizlik.az/wp-content/uploads/2023/09/tozsoran.webp",
    text: "Karcher tozsoranları quru və yaş təmizlikdə, təmirdən sonra zibil və tozun yığılmasında etibarlı nəticə verir.",
  },
  {
    title: "Buxarlı döşəmə təmizləyicisi",
    image: "https://166temizlik.az/wp-content/uploads/2023/09/buxar.webp",
    text: "Buxarlı təmizləmə səthləri gigiyenik şəkildə təmizləməyə və çətin ləkələri yumşaltmağa kömək edir.",
  },
  {
    title: "Yuyucu tozsoran",
    image: "https://166temizlik.az/wp-content/uploads/2023/09/yuycu.webp",
    text: "Yumşaq mebel, xalça və döşəmə örtüklərinin kimyəvi təmizliyində istifadə olunur.",
  },
  {
    title: "Buxar aparatı",
    image: "https://166temizlik.az/wp-content/uploads/2023/09/aaa11.webp",
    text: "Kärcher buxar təmizləyiciləri kimyəvi maddəyə ehtiyac olmadan səthlərdə gigiyenik təmizliyi təmin edir.",
  },
  {
    title: "Kristallaşma aparatı",
    image: "https://166temizlik.az/wp-content/uploads/2023/09/Untitled-1-1.webp",
    text: "Daş və mərmər səthlərin parıldadılması, yenilənməsi və qorunması üçün peşəkar avadanlıqdır.",
  },
  {
    title: "Piləkan təmizliyi üçün aparat",
    image: "https://166temizlik.az/wp-content/uploads/2023/09/aaa.webp",
    text: "Nəm təmizləmə, şampunlama, cilalama və kristallaşdırma imkanları pilləkən və sərt səthlər üçün effektiv həll təqdim edir.",
  },
];

const equipmentTranslations: Partial<Record<Locale, Array<{ title: string; text: string }>>> = {
  ru: [
    {
      title: "Пылесос",
      text: "Пылесосы Karcher дают надежный результат при сухой и влажной уборке, а также при удалении мусора и пыли после ремонта.",
    },
    {
      title: "Паровая машина для пола",
      text: "Паровая уборка помогает гигиенично очищать поверхности и размягчать сложные пятна.",
    },
    {
      title: "Моющий пылесос",
      text: "Используется для химчистки мягкой мебели, ковров и напольных покрытий.",
    },
    {
      title: "Паровой аппарат",
      text: "Паровые очистители Kärcher обеспечивают гигиеничную уборку поверхностей без необходимости в агрессивной химии.",
    },
    {
      title: "Аппарат для кристаллизации",
      text: "Профессиональное оборудование для полировки, обновления и защиты каменных и мраморных поверхностей.",
    },
    {
      title: "Аппарат для чистки лестниц",
      text: "Влажная уборка, шампунирование, полировка и кристаллизация помогают эффективно очищать лестницы и твердые покрытия.",
    },
  ],
  tr: [
    {
      title: "Elektrikli süpürge",
      text: "Karcher süpürgeler kuru ve ıslak temizlikte, tadilat sonrası çöp ve toz toplamada güvenilir sonuç verir.",
    },
    {
      title: "Buharlı zemin temizleyici",
      text: "Buharlı temizlik yüzeyleri hijyenik şekilde temizlemeye ve zor lekeleri yumuşatmaya yardımcı olur.",
    },
    {
      title: "Yıkamalı süpürge",
      text: "Yumuşak mobilya, halı ve zemin kaplamalarının kimyasal temizliğinde kullanılır.",
    },
    {
      title: "Buhar cihazı",
      text: "Kärcher buhar temizleyicileri kimyasal maddeye gerek kalmadan yüzeylerde hijyenik temizlik sağlar.",
    },
    {
      title: "Kristalleştirme cihazı",
      text: "Taş ve mermer yüzeylerin parlatılması, yenilenmesi ve korunması için profesyonel ekipmandır.",
    },
    {
      title: "Merdiven temizliği cihazı",
      text: "Islak temizlik, şampuanlama, cilalama ve kristalleştirme özellikleri merdiven ve sert yüzeyler için etkilidir.",
    },
  ],
};

export function getLocalizedEquipment(locale: Locale) {
  const translations = equipmentTranslations[locale];
  return equipment.map((item, index) => ({ ...item, ...(translations?.[index] ?? {}) }));
}

export const materialCards = [
  ["H-04 Genel Fresh Multi Clean", "Antibakterial məhsul, kif və göbələyə qarşı bütün səthlərdə istifadə olunur. Güzgü və şüşələri tozdan qoruyur."],
  ["H-19 Asit Miracle Plus", "Hamam və sanuzel təmizliyində istifadə üçün əvəzolunmaz antibakterial məhsuldur. Ərpin qarşısını alır."],
  ["K-11 Yağ Kir Overget", "Mətbəxdə əvəzolunmaz, yüksək keyfiyyətli yağ sökücü maddədir. Qril və yanmış yağları təmizləməyə kömək edir."],
  ["K-12 Ərp Ripper Scale", "Ərp önləyici və təmizləyici vasitədir. Hamam və sanuzeldə qalmış kirəc və ərplərin təmizliyinə kömək edir."],
  ["H-23 Luxe Oxi", "Ağardıcı dezinfeksiyaedici vasitə. Ləkələri iz qoymadan rahatlıqla çıxardır və bakteriyalara qarşı effektivdir."],
  ["H-17 Orgine", "Kimyəvi təmizlik zamanı istifadə olunan lokal ləkə təmizləyici mayədir. Yumşaq mebellər üçün uyğundur."],
  ["Antistiker", "Yapışqan lentlərin iz saxlamadan çıxarılmasına kömək edir. Stiker və saqqız ləkələrini qoparır."],
].map(([title, text]) => ({ title, text }));

const materialCardTranslations: Partial<Record<Locale, Array<{ title: string; text: string }>>> = {
  ru: [
    { title: "H-04 Genel Fresh Multi Clean", text: "Антибактериальное средство против плесени и грибка для разных поверхностей. Защищает зеркала и стекла от пыли." },
    { title: "H-19 Asit Miracle Plus", text: "Антибактериальное средство для ванной и санузла. Помогает предотвращать образование налета." },
    { title: "K-11 Yağ Kir Overget", text: "Качественное обезжиривающее средство для кухни, гриля и пригоревшего жира." },
    { title: "K-12 Scale Ripper", text: "Средство против известкового налета и загрязнений в ванной и санузле." },
    { title: "H-23 Luxe Oxi", text: "Отбеливающее дезинфицирующее средство. Удаляет пятна и эффективно работает против бактерий." },
    { title: "H-17 Orgine", text: "Локальный пятновыводитель для химчистки. Подходит для мягкой мебели." },
    { title: "Antistiker", text: "Помогает удалить следы клейкой ленты, стикеры и жевательную резинку без следов." },
  ],
  tr: [
    { title: "H-04 Genel Fresh Multi Clean", text: "Küf ve mantara karşı farklı yüzeylerde kullanılan antibakteriyel ürün. Ayna ve camları tozdan korur." },
    { title: "H-19 Asit Miracle Plus", text: "Banyo ve tuvalet temizliğinde kullanılan antibakteriyel ürün. Kireç oluşumunu önlemeye yardımcı olur." },
    { title: "K-11 Yağ Kir Overget", text: "Mutfak, ızgara ve yanmış yağlar için yüksek kaliteli yağ çözücü üründür." },
    { title: "K-12 Scale Ripper", text: "Banyo ve tuvalette kalan kireç ve kirlerin temizliğine yardımcı olan kireç çözücü üründür." },
    { title: "H-23 Luxe Oxi", text: "Beyazlatıcı dezenfektan ürün. Lekeleri iz bırakmadan çıkarır ve bakterilere karşı etkilidir." },
    { title: "H-17 Orgine", text: "Kimyasal temizlikte kullanılan lokal leke çıkarıcı sıvıdır. Yumuşak mobilyalar için uygundur." },
    { title: "Antistiker", text: "Yapışkan bant izlerini, stikerleri ve sakız lekelerini iz bırakmadan çıkarmaya yardımcı olur." },
  ],
};

export function getLocalizedMaterialCards(locale: Locale) {
  const translations = materialCardTranslations[locale];
  return materialCards.map((item, index) => ({ ...item, ...(translations?.[index] ?? {}) }));
}

const serviceDetails: Record<string, { description: string; image: string; bullets: string[] }> = {
  "ev-temizliyi-xidmeti": {
    description:
      "İş və ailə həyatının stresli olduğu bir vaxtda ev təmizliyinə saatlar sərf etmək böyük enerji tələb edir. 166-ya müraciət etməklə gündəlik və əsaslı təmizlik sifariş edə bilərsiniz.",
    image: "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-8-1.webp",
    bullets: ["Otaq, dəhliz və zal təmizliyi", "Mətbəxin təmizliyi", "Mebellərin tozunun alınması", "Sanitar qovşaqlarının təmizlənməsi"],
  },
  "ofis-temizliyi": {
    description:
      "Təmizlik sadəcə rahatlıq üçün deyil, səmərəli iş üçün də vacibdir. Təmiz ofis əməkdaşların sağlamlığını və iş məhsuldarlığını qoruyur.",
    image: "https://166temizlik.az/wp-content/uploads/2023/05/J1A8062.jpg",
    bullets: ["Döşəmə örtüyünün təmizlənməsi", "Ofis mebelləri və avadanlıqları", "Qapı-pəncərə və güzgülər", "Sanitar qovşaqlarının dezinfeksiyası"],
  },
  "bag-evlerinin-temizliyi": {
    description:
      "166 Təmizlik Xidməti bağ evinizi ilin bütün fəsillərində hazır vəziyyətə gətirmək üçün təmizlik və bağa qulluq işlərini görür.",
    image: "https://166temizlik.az/wp-content/uploads/2024/05/t-mzilik-xidm-ti.webp",
    bullets: ["Evin təmizlənməsi", "Həyətin təmizlənməsi", "Hovuzun təmizlənməsi", "Zibillərin yığılması"],
  },
  "erazi-temizliyi": {
    description:
      "Yaşayış binaları, alış-veriş mərkəzləri, mehmanxanalar və digər obyektlərin ətraf əraziləri xüsusi avadanlıqla təmizlənir.",
    image: "https://166temizlik.az/wp-content/uploads/2023/02/erazi2-1-1.jpg",
    bullets: ["Ərazinin süpürülməsi", "Zibilin yığılması", "Yer səthinin xüsusi aparatla yuyulması", "Tamet yuma xidməti"],
  },
  "fasad-temizliyi": {
    description:
      "Binaların xaricinin təmiz olması şirkət haqqında ilk təəssürat üçün vacibdir. Fasad təmizliyi peşəkar və təhlükəsiz komanda ilə görülür.",
    image: "https://166temizlik.az/wp-content/uploads/2023/02/fasad1-1.jpg",
    bullets: ["Şüşə fasadların yuyulması", "Toz və çirkin təmizlənməsi", "Hündürlük işlərinə uyğun komanda", "Xüsusi avadanlıq"],
  },
  "pencere-temizliyi": {
    description:
      "Pəncərələrin təmizliyi işıq, görüntü və məkanın ümumi səliqəsi üçün vacibdir. Standart və hündür pəncərələr üzrə xidmət göstərilir.",
    image: "https://166temizlik.az/wp-content/uploads/2024/05/p-nc-r-t-mizliyi.webp",
    bullets: ["Standart pəncərə təmizliyi", "Hündür pəncərə təmizliyi", "Vinil təmizliyi", "Montaj lenti təmizliyi"],
  },
  "cilciraq-temizliyi": {
    description:
      "Çilçıraq təmizliyi zamanı plafonlar və detallar diqqətlə sökülür, yuyulur, qurudulur və parlaqlığı bərpa edilir.",
    image: "https://166temizlik.az/wp-content/uploads/2024/12/HRS03718.webp",
    bullets: ["Çilçıraq elektrikdən ayrılır", "Plafonlar yuyulur", "Su ləkələri təmizlənir", "Detallar qurudulur"],
  },
  "perde-yuma": {
    description:
      "Peşəkar pərdə yuma komandası pərdə və jalüzləri çıxarır, xüsusi metodla yuyur, qurudur, ütüləyir və təhvil verir.",
    image: "https://166temizlik.az/wp-content/uploads/2023/05/222.jpg",
    bullets: ["Tül pərdə yuma", "Dekor pərdə yuma", "Jalüz yuma", "Abşeron yarımadası üzrə xidmət"],
  },
  "yumsaq-mebel-temizlenmesi": {
    description:
      "Gündəlik istifadə olunan divan, kreslo və stulların kimyəvi təmizliyi bakteriyaları, ləkələri və köhnə görünüşü aradan qaldırmağa kömək edir.",
    image: "https://166temizlik.az/wp-content/uploads/2024/01/WhatsApp-Image-2023-12-20-at-21.06.50-2.webp",
    bullets: ["Divan və kreslolar", "Dəri mebellər", "Stullar və pufiklər", "Matras və kovrolin"],
  },
  etirlendirme: {
    description:
      "Evdə, ofisdə və obyektdə xoşagəlməz qoxulara qarşı peşəkar ətirləndirmə xidməti təqdim olunur.",
    image: "https://166temizlik.az/wp-content/uploads/2023/02/etir.jpg",
    bullets: ["Pis qoxuların aradan qaldırılması", "Məkan ölçüsünə uyğun həll", "Ofis və obyektlər", "Uzunmüddətli xoş qoxu"],
  },
  "baximsiz-ev-temizliyi": {
    description:
      "Ən baxımsız evlərin təmizliyini xüsusi kimyəvi məhlullar və müasir avadanlıqla öz üzərimizə götürürük.",
    image: "https://166temizlik.az/wp-content/uploads/2023/01/e427f74ecdda74a13f0ddf96c4a31341-1.png",
    bullets: ["Yaşlı insanların evləri", "Yataq xəstələrinin evləri", "Dərin təmizlik", "Xüsusi kimyəvi məhlullar"],
  },
  "yangindan-sonra-ev-temizliyi": {
    description:
      "Yanğın və subasma sonrası yaranan his, toz, qubar və ağır çirklənmələr peşəkar vasitələrlə təmizlənir.",
    image: "https://166temizlik.az/wp-content/uploads/2023/01/yangin222.jpg",
    bullets: ["His və qubarın təmizlənməsi", "Tavan və fasad yuyulması", "Mebellərin təmizlənməsi", "Zibillərin yığılması"],
  },
  "otel-temizlenmesi": {
    description:
      "Otel təmizliyi qonaq məmnuniyyəti və gigiyena üçün əsas şərtdir. Otaqlar və ümumi sahələr sistemli şəkildə təmizlənir.",
    image: "https://166temizlik.az/wp-content/uploads/2024/12/HRS03405-1.webp",
    bullets: ["Sanuzel təmizliyi", "Mebel və səthlər", "Döşəmə və divarlar", "Aksessuar və kondisionerlər"],
  },
  "restoran-temizlenmesi": {
    description:
      "Restoranların təmiz və gigiyenik olması müştəri məmnuniyyəti və təhlükəsiz qida hazırlığı üçün vacibdir.",
    image: "https://166temizlik.az/wp-content/uploads/2023/05/J1A7451.jpg",
    bullets: ["Zal təmizliyi", "Mətbəx sahələri", "Sanitar qovşaqları", "Gigiyenik qaydalara uyğun xidmət"],
  },
  "temir-sonrasi-temizlik": {
    description:
      "Təmir sonrası toz, boya, kley və tikinti çirkləri xüsusi avadanlıqla təmizlənir, məkan istifadəyə hazır vəziyyətə gətirilir.",
    image: "https://166temizlik.az/wp-content/uploads/2023/02/fit_960_530_false_crop_1000_562_0_52_q90_2709852_1b72823ed32f1521bbdb3e471.webp",
    bullets: ["Tikinti çirklərinin aradan qaldırılması", "Pəncərə və qapı təmizliyi", "Səthlərin yaş və quru təmizliyi", "Məskunlaşmaya hazırlıq"],
  },
  "kristallasdirma-xidmeti": {
    description:
      "Daş, mərmər və parlaq səthlərin görünüşünü bərpa etmək üçün kristallaşdırma xidməti təqdim olunur.",
    image: "https://166temizlik.az/wp-content/uploads/2024/02/image-89a.webp",
    bullets: ["Mərmər səthlər", "Parlaqlığın bərpası", "Ərp və ləkələrin təmizlənməsi", "Peşəkar aparatlarla xidmət"],
  },
  "hovuz-temizlenmesi-xidmeti": {
    description:
      "Hovuzların təmizliyi həm Bakı daxilində, həm də regionlarda sifarişçinin tələblərinə uyğun həyata keçirilir.",
    image: "https://166temizlik.az/wp-content/uploads/2024/02/image-89-1.webp",
    bullets: ["Çirklənmiş suyun boşaldılması", "Hovuz çəninin təmizliyi", "Duz və kalsium ləkələri", "Dezinfeksiya"],
  },
  "korporativ-temizlik-xidmeti": {
    description:
      "Korporativ əməkdaşlıq şirkətimizin əsas prioritetlərindən biridir. Müştərilərimiz üçün güzəştlər və operativ xidmət modeli təqdim olunur.",
    image: "https://166temizlik.az/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-16-at-13.35.38-1.jpeg",
    bullets: ["Korporativ təkliflər", "Sifarişlərin izlənilməsi", "Müştəri məmnuniyyəti zəngləri", "Peşəkar işçi heyəti"],
  },
};

export const servicePages = services.map((service) => {
  const slug = service.href.replace(/^\/|\/$/g, "");
  const detail = serviceDetails[slug];

  return {
    ...service,
    slug,
    description: detail?.description ?? "166 Təmizlik Xidməti bu istiqamətdə peşəkar komanda və müasir avadanlıqla xidmət göstərir.",
    image: detail?.image ?? service.icon,
    bullets: detail?.bullets ?? ["Peşəkar komanda", "Müasir avadanlıq", "Keyfiyyətli təmizlik vasitələri", "Operativ sifariş"],
  };
});

export const partnerLogos = [
  "Artboard-20.jpg",
  "Artboard-2-3.jpg",
  "Artboard-1-4.jpg",
  "Artboard-3-3.jpg",
  "Artboard-5-1.jpg",
  "Artboard-4-3.jpg",
  "Artboard-6.jpg",
  "Artboard-7.jpg",
  "Artboard-8.jpg",
  "Artboard-9.jpg",
  "Artboard-10.jpg",
  "Artboard-11.jpg",
  "Artboard-12.jpg",
  "Artboard-13.jpg",
  "Artboard-14.jpg",
  "Artboard-15.jpg",
  "Artboard-16.jpg",
  "Artboard-18.jpg",
  "Artboard-17.jpg",
  "Artboard-19.jpg",
].map((file) => `https://166temizlik.az/wp-content/uploads/2023/02/${file}`);

export const newerPartnerLogos = [
  "1.jpg",
  "18.jpg",
  "17.jpg",
  "16.jpg",
  "15.jpg",
  "14.jpg",
  "13.jpg",
  "12.jpg",
  "11.jpg",
  "9.jpg",
  "7.jpg",
  "6.jpg",
  "5.jpg",
  "4.jpg",
  "3.jpg",
  "2.jpg",
].map((file) => `https://166temizlik.az/wp-content/uploads/2024/09/${file}`);
