import {
  heroSlides,
  hourlyPrices,
  packageFeatures,
  services,
  site,
  testimonials,
  weeklyPrices,
} from "./site-data";

export type Locale = "az" | "ru" | "tr";

const languageLabels: Record<Locale, string> = {
  az: "Az",
  ru: "Ru",
  tr: "Tr",
};

const languageHrefs: Record<Locale, string> = {
  az: "/",
  ru: "/ru/",
  tr: "/tr/",
};

const serviceLabels: Record<Locale, string[]> = {
  az: services.map((service) => service.title),
  ru: [
    "Уборка дома",
    "Уборка офиса",
    "Уборка дачных домов",
    "Уборка территории",
    "Чистка фасада",
    "Мойка окон",
    "Чистка люстр",
    "Стирка штор",
    "Химчистка мягкой мебели",
    "Ароматизация",
    "Уборка «Красивый дом»",
    "Уборка после пожара и затопления",
    "Уборка после ремонта",
    "Уборка отелей",
    "Уборка ресторанов",
    "Кристаллизация",
    "Чистка бассейнов",
    "Корпоративная уборка",
  ],
  tr: [
    "Ev temizliği",
    "Ofis temizliği",
    "Bağ evlerinin temizliği",
    "Arazi temizliği",
    "Cephe temizliği",
    "Pencere temizliği",
    "Avize temizliği",
    "Perde yıkama",
    "Yumuşak mobilyaların kuru temizliği",
    "Kokulandırma hizmeti",
    "“Güzel ev” temizliği",
    "Yangın ve su baskını sonrası temizlik",
    "Tadilat sonrası temizlik",
    "Otel temizliği",
    "Restoran temizliği",
    "Kristalizasyon hizmeti",
    "Havuz temizliği",
    "Kurumsal temizlik hizmeti",
  ],
};

export function getLocalizedServices(locale: Locale = "az") {
  return services.map((service, index) => ({
    ...service,
    title: serviceLabels[locale][index] ?? service.title,
  }));
}

export function getLanguageOptions(locale: Locale = "az") {
  return (Object.keys(languageLabels) as Locale[])
    .filter((item) => item !== locale)
    .map((item) => ({
      label: languageLabels[item],
      href: languageHrefs[item],
    }));
}

export const chromeCopy = {
  az: {
    logoLabel: "166 Təmizlik ana səhifə",
    nav: {
      home: "Ana səhifə",
      services: "Xidmətlər",
      about: "Şirkət haqqında",
      gallery: "Qalereya",
      contact: "Əlaqə",
      order: "Sifariş et",
    },
    aboutMenu: [
      { label: "Bloq", href: "/bloq/" },
      { label: "Avadanlıq və maddələr", href: "/temizlik-xidmeti/" },
      { label: "Partnyorlar", href: "/partnyorlar/" },
      { label: "Əməkdaşlarımız", href: "/emekdaslarimiz/" },
      { label: "Vakansiya", href: "/vakansiya/" },
    ],
    cta: {
      title: "Özünüzə və sevdiklərinizə zaman ayırın",
      contact: "BİZİMLƏ ƏLAQƏ",
      order: "SİFARİŞ ET",
    },
    footer: {
      motto: "QÜSURSUZ VƏ ETİBARLI",
      useful: "Yararlı linklər",
      services: "Xidmətlər",
      contact: "Əlaqə",
      links: {
        home: "Ana səhifə",
        about: "Şirkət haqqında",
        services: "Xidmətlər",
        blog: "Bloq",
        vacancy: "Vakansiya",
      },
      phone: site.phoneLabel,
      address: site.address,
    },
  },
  ru: {
    logoLabel: "166 Təmizlik главная",
    nav: {
      home: "Главная",
      services: "Услуги",
      about: "О компании",
      gallery: "Галерея",
      contact: "Контакты",
      order: "Заказать",
    },
    aboutMenu: [
      { label: "Блог", href: "/bloq/" },
      { label: "Оборудование и средства", href: "/temizlik-xidmeti/" },
      { label: "Партнеры", href: "/partnyorlar/" },
      { label: "Сотрудники", href: "/emekdaslarimiz/" },
      { label: "Вакансия", href: "/vakansiya/" },
    ],
    cta: {
      title: "Посвятите время себе и близким",
      contact: "СВЯЗАТЬСЯ С НАМИ",
      order: "ЗАКАЗАТЬ",
    },
    footer: {
      motto: "БЕЗУПРЕЧНО И НАДЕЖНО",
      useful: "Полезные ссылки",
      services: "Услуги",
      contact: "Контакты",
      links: {
        home: "Главная",
        about: "О компании",
        services: "Услуги",
        blog: "Блог",
        vacancy: "Вакансия",
      },
      phone: "166, внутренний номер 3",
      address: "ул. Шафает Мехтиев 134, Баку, Азербайджан",
    },
  },
  tr: {
    logoLabel: "166 Təmizlik ana sayfa",
    nav: {
      home: "Ana sayfa",
      services: "Hizmetler",
      about: "Şirket hakkında",
      gallery: "Galeri",
      contact: "İletişim",
      order: "Sipariş et",
    },
    aboutMenu: [
      { label: "Blog", href: "/bloq/" },
      { label: "Ekipman ve ürünler", href: "/temizlik-xidmeti/" },
      { label: "Partnerler", href: "/partnyorlar/" },
      { label: "Çalışanlarımız", href: "/emekdaslarimiz/" },
      { label: "Kariyer", href: "/vakansiya/" },
    ],
    cta: {
      title: "Kendinize ve sevdiklerinize zaman ayırın",
      contact: "BİZİMLE İLETİŞİM",
      order: "SİPARİŞ ET",
    },
    footer: {
      motto: "KUSURSUZ VE GÜVENİLİR",
      useful: "Faydalı linkler",
      services: "Hizmetler",
      contact: "İletişim",
      links: {
        home: "Ana sayfa",
        about: "Şirket hakkında",
        services: "Hizmetler",
        blog: "Blog",
        vacancy: "Kariyer",
      },
      phone: "166, dahili numara 3",
      address: "Şafayet Mehdiyev 134, Bakü, Azerbaycan",
    },
  },
} satisfies Record<Locale, unknown>;

export const homeCopy = {
  az: {
    heroSlides,
    servicesTitle: "Xidmətlərimiz",
    packagesTitle: "Ev təmizlik paketləri",
    packageFeatures,
    packageLabels: { more: "Daha çox", less: "Daha az" },
    weeklyPrices,
    hourlyPrices,
    hourlyHelper: "(1 nəfər xanım kömək məqsədi ilə gəlir)",
    noteTitle: "QEYD",
    noteAlt: "166 Təmizlik qeydlər",
    notes: [
      { before: "Təmizlik zamanı bütün vasitə və təmizləyici maddələr ", strong: "qiymətə daxildir.", after: "" },
      { before: "Təmizlik zamanı ", strong: "hər əlavə saata görə 10 AZN", after: " hesablanacaqdır." },
      { before: "Təhlükəli yerdə olan pəncərələrin silinməsi ", strong: "qiymətə daxil deyil.", after: "" },
      { before: "Yumşaq mebellərin kimyəvi təmizlənməsi ", strong: "qiymətə daxil deyil.", after: "" },
      { before: "Öncədən ödəniş edildiyi halda qiymətlərə ", strong: "endirim", after: " tətbiq edilir" },
    ],
    about: {
      lead: "ŞİRKƏT",
      accent: "HAQQINDA",
      alt: "Şirkət haqqında",
      paragraphs: [
        "2015-ci ildə fəaliyyətinə bir neçə işçi ilə başlayan “166 Təmizlik Xidməti” müasir avadanlıq və təmizlik vasitələri ilə istənilən təmizlik problemini həll edir. Təmizlik şirkəti axtarırsınızsa, doğru ünvandasınız.",
        "Daim müştərilərimizin xidmətində olmaq və operativ xidmət göstərmək məqsədilə 166 qaynar xəttimiz 7/24 ölkənin istənilən nöqtəsindən zəngləri qəbul edir.",
      ],
      mapTitle: "BÜTÜN AZƏRBAYCANA XİDMƏT GÖSTƏRİRİK",
      mapAlt: "Bütün Azərbaycana xidmət göstəririk",
    },
    beforeAfter: {
      title: "GÖRDÜYÜMÜZ",
      accent: "İŞLƏR",
      beforeLabel: "Əvvəl",
      afterLabel: "Sonra",
    },
    beforeAfterPartnerTitle: "PARTNYORLAR",
    testimonialsTitle: "MÜŞTƏRİ RƏYLƏRİ",
    testimonials,
  },
  ru: {
    heroSlides: [
      {
        eyebrow: "При заказе уборки дома + химчистки + стирки штор",
        title: "СКИДКА 30%",
        images: heroSlides[0].images,
      },
      {
        eyebrow: "Профессиональная команда и современное оборудование",
        title: "ЧИСТЫЙ ДОМ, УЮТНЫЙ ДЕНЬ",
        images: heroSlides[1].images,
      },
      {
        eyebrow: "Оперативный сервис по Баку и поселкам Баку",
        title: "166 TEMİZLİK",
        images: heroSlides[2].images,
      },
    ],
    servicesTitle: "Наши услуги",
    packagesTitle: "Пакеты уборки дома",
    packageFeatures: {
      fourHours: [
        "Общая уборка дома",
        "Сухая и влажная уборка пола",
        "Уборка санитарных узлов",
        "Протирка внутренних стекол и зеркал",
        "Удаление пыли с мебели",
        "Поверхностная чистка бытовой техники",
        "Чистка поверхностей с легкими пятнами",
      ],
      eightHours: [
        "Общая уборка дома",
        "Сухая и влажная уборка пола",
        "Уборка санитарных узлов",
        "Протирка внутренних стекол и зеркал",
        "Удаление пыли с мебели",
        "Поверхностная чистка бытовой техники",
        "Чистка жирных и сетчатых поверхностей",
        "Чистка небольших люстр",
        "Удаление пыли со стен",
        "Общая уборка кухни",
        "Мойка окон",
        "Уборка балкона",
      ],
    },
    packageLabels: { more: "Подробнее", less: "Скрыть" },
    weeklyPrices: [
      { label: "1 день / неделя", four: "90₼", eight: "110₼" },
      { label: "2 дня / неделя", four: "160₼", eight: "200₼" },
      { label: "3 дня / неделя", four: "210₼", eight: "270₼" },
    ],
    hourlyPrices: [
      { time: "2 часа", city: "Баку - 70 azn", village: "Поселки Баку - 90 azn" },
      { time: "3 часа", city: "Баку - 80 azn", village: "Поселки Баку - 100 azn" },
      { time: "4 часа", city: "Баку - 90 azn", village: "Поселки Баку - 110 azn" },
      { time: "6 часов", city: "Баку - 100 azn", village: "Поселки Баку - 120 azn" },
      { time: "8 часов", city: "Баку - 110 azn", village: "Поселки Баку - 130 azn" },
    ],
    hourlyHelper: "(1 сотрудница приходит для помощи)",
    noteTitle: "ПРИМЕЧАНИЕ",
    noteAlt: "Примечания 166 Təmizlik",
    notes: [
      { before: "Все средства и чистящие материалы во время уборки ", strong: "включены в стоимость.", after: "" },
      { before: "Каждый дополнительный час уборки рассчитывается как ", strong: "10 AZN.", after: "" },
      { before: "Мойка окон в опасных местах ", strong: "не входит в стоимость.", after: "" },
      { before: "Химчистка мягкой мебели ", strong: "не входит в стоимость.", after: "" },
      { before: "При предварительной оплате к ценам применяется ", strong: "скидка.", after: "" },
    ],
    about: {
      lead: "О",
      accent: "КОМПАНИИ",
      alt: "О компании",
      paragraphs: [
        "Компания “166 Təmizlik Xidməti”, начавшая деятельность в 2015 году с небольшой команды, решает любые задачи уборки с помощью современного оборудования и чистящих средств.",
        "Чтобы всегда быть на связи с клиентами и оперативно оказывать услуги, наша горячая линия 166 принимает звонки 24/7 из любой точки страны.",
      ],
      mapTitle: "МЫ ОКАЗЫВАЕМ УСЛУГИ ПО ВСЕМУ АЗЕРБАЙДЖАНУ",
      mapAlt: "Услуги по всему Азербайджану",
    },
    beforeAfter: {
      title: "ПРОДЕЛАННЫЕ",
      accent: "РАБОТЫ",
      beforeLabel: "До",
      afterLabel: "После",
    },
    beforeAfterPartnerTitle: "ПАРТНЕРЫ",
    testimonialsTitle: "ОТЗЫВЫ КЛИЕНТОВ",
    testimonials: testimonials.map((item, index) => ({
      ...item,
      text:
        index === 0
          ? "Сегодня к нам приехала команда 166 Təmizlik. Работа была выполнена аккуратно, быстро и качественно. Спасибо!"
          : index === 1
            ? "Оперативная связь, чистая работа и приятная команда. Мы остались очень довольны услугой уборки дома."
            : "Обратились для уборки офиса. Команда приехала вовремя, а качество работы оказалось выше ожиданий.",
    })),
  },
  tr: {
    heroSlides: [
      {
        eyebrow: "Ev temizliği + kuru temizleme + perde yıkama sipariş edenlere",
        title: "%30 İNDİRİM",
        images: heroSlides[0].images,
      },
      {
        eyebrow: "Profesyonel ekip ve modern ekipmanlarla",
        title: "TEMİZ EV, RAHAT GÜN",
        images: heroSlides[1].images,
      },
      {
        eyebrow: "Bakü ve Bakü çevresi için hızlı hizmet",
        title: "166 TEMİZLİK",
        images: heroSlides[2].images,
      },
    ],
    servicesTitle: "Hizmetlerimiz",
    packagesTitle: "Ev temizlik paketleri",
    packageFeatures: {
      fourHours: [
        "Evin genel temizliği",
        "Zeminin kuru ve nemli temizliği",
        "Banyo ve tuvaletlerin temizliği",
        "İç cam ve aynaların silinmesi",
        "Mobilyaların tozunun alınması",
        "Ev aletlerinin yüzey temizliği",
        "Az lekeli yüzeylerin temizliği",
      ],
      eightHours: [
        "Evin genel temizliği",
        "Zeminin kuru ve nemli temizliği",
        "Banyo ve tuvaletlerin temizliği",
        "İç cam ve aynaların silinmesi",
        "Mobilyaların tozunun alınması",
        "Ev aletlerinin yüzey temizliği",
        "Yağlı ve kirli yüzeylerin temizliği",
        "Küçük avizelerin temizliği",
        "Duvar tozlarının alınması",
        "Mutfağın genel temizliği",
        "Pencerelerin silinmesi",
        "Balkonun silinmesi",
      ],
    },
    packageLabels: { more: "Daha fazla", less: "Daha az" },
    weeklyPrices: [
      { label: "1 gün / hafta", four: "90₼", eight: "110₼" },
      { label: "2 gün / hafta", four: "160₼", eight: "200₼" },
      { label: "3 gün / hafta", four: "210₼", eight: "270₼" },
    ],
    hourlyPrices: [
      { time: "2 saat", city: "Bakü - 70 azn", village: "Bakü köyleri - 90 azn" },
      { time: "3 saat", city: "Bakü - 80 azn", village: "Bakü köyleri - 100 azn" },
      { time: "4 saat", city: "Bakü - 90 azn", village: "Bakü köyleri - 110 azn" },
      { time: "6 saat", city: "Bakü - 100 azn", village: "Bakü köyleri - 120 azn" },
      { time: "8 saat", city: "Bakü - 110 azn", village: "Bakü köyleri - 130 azn" },
    ],
    hourlyHelper: "(1 kadın çalışan yardım amacıyla gelir)",
    noteTitle: "NOT",
    noteAlt: "166 Təmizlik notları",
    notes: [
      { before: "Temizlik sırasında tüm araçlar ve temizlik ürünleri ", strong: "fiyata dahildir.", after: "" },
      { before: "Her ek temizlik saati için ", strong: "10 AZN", after: " hesaplanır." },
      { before: "Tehlikeli yerde bulunan pencerelerin silinmesi ", strong: "fiyata dahil değildir.", after: "" },
      { before: "Yumuşak mobilyaların kuru temizliği ", strong: "fiyata dahil değildir.", after: "" },
      { before: "Önceden ödeme yapıldığında fiyatlara ", strong: "indirim", after: " uygulanır." },
    ],
    about: {
      lead: "ŞİRKET",
      accent: "HAKKINDA",
      alt: "Şirket hakkında",
      paragraphs: [
        "2015 yılında birkaç çalışanla faaliyete başlayan “166 Təmizlik Xidməti”, modern ekipman ve temizlik ürünleriyle her türlü temizlik sorununu çözer.",
        "Müşterilerimize her zaman hızlı hizmet sunmak için 166 çağrı merkezimiz ülkenin her noktasından 7/24 aramaları kabul eder.",
      ],
      mapTitle: "TÜM AZERBAYCAN'A HİZMET VERİYORUZ",
      mapAlt: "Tüm Azerbaycan'a hizmet veriyoruz",
    },
    beforeAfter: {
      title: "YAPTIĞIMIZ",
      accent: "İŞLER",
      beforeLabel: "Önce",
      afterLabel: "Sonra",
    },
    beforeAfterPartnerTitle: "PARTNERLER",
    testimonialsTitle: "MÜŞTERİ YORUMLARI",
    testimonials: testimonials.map((item, index) => ({
      ...item,
      text:
        index === 0
          ? "Bugün evimize 166 Təmizlik ekibi geldi. İşlerinden çok memnun kaldık, teşekkür ederiz!"
          : index === 1
            ? "Hızlı iletişim, düzenli çalışma ve güler yüzlü ekip. Ev temizliği hizmetinden çok memnun kaldık."
            : "Ofis temizliği için başvurduk. Zamanında geldiler ve iş kalitesi beklentimizin üstündeydi.",
    })),
  },
} satisfies Record<Locale, unknown>;
