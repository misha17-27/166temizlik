import {
  heroSlides,
  hourlyPrices,
  packageFeatures,
  services,
  site,
  testimonials,
  weeklyPrices,
} from "./site-data";
import {
  getLanguageTargets,
  getHrefForCanonical,
  getLocalizedHref,
  getServiceHref,
  type Locale,
  type RouteKind,
} from "./routes";

export type { Locale } from "./routes";

const languageLabels: Record<Locale, string> = {
  az: "AZ",
  ru: "RU",
  tr: "TR",
};

const languageNames: Record<Locale, string> = {
  az: "Azerbaycan",
  ru: "Русский",
  tr: "Türkçe",
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
    "Чистка бассейнов",
    "Кристаллизация",
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
    "Havuz temizliği",
    "Kristalizasyon hizmeti",
    "Kurumsal temizlik hizmeti",
  ],
};

export function getLocalizedServices(locale: Locale = "az") {
  return services.map((service, index) => ({
    ...service,
    slug: service.href.replace(/^\/|\/$/g, ""),
    title: serviceLabels[locale][index] ?? service.title,
    href: getServiceHref(service.href.replace(/^\/|\/$/g, ""), locale),
  }));
}

export function getLanguageOptions(locale: Locale = "az", canonicalSlug = "home", kind: RouteKind = "static") {
  return getLanguageTargets(locale, canonicalSlug, kind).map((item) => ({
    label: languageLabels[item.locale],
    href: item.href,
  }));
}

export function getLanguageSwitcherOptions(locale: Locale = "az", canonicalSlug = "home", kind: RouteKind = "static") {
  return (["az", "ru", "tr"] as Locale[]).map((itemLocale) => ({
    locale: itemLocale,
    label: languageLabels[itemLocale],
    name: languageNames[itemLocale],
    href:
      itemLocale === locale
        ? getHrefForCanonical(itemLocale, canonicalSlug, kind)
        : getLanguageTargets(locale, canonicalSlug, kind).find((item) => item.locale === itemLocale)?.href ?? "/",
    active: itemLocale === locale,
  }));
}

export { getLocalizedHref };

const serviceDescriptions: Record<Locale, Record<string, string>> = {
  az: {},
  ru: {
    "ev-temizliyi-xidmeti":
      "Трата времени на уборку дома требует больших затрат энергии. Позвонив 166 или заказав услугу на сайте, вы сможете обеспечить чистоту в своем доме.",
    "ofis-temizliyi":
      "Чистота важна не только для комфорта, но и для эффективной работы. Пыль и микробы в офисе влияют на здоровье сотрудников и снижают продуктивность.",
    "bag-evlerinin-temizliyi":
      "Загородный дом должен быть готов к отдыху в любое время года. 166 берет на себя уборку дома, сада и прилегающей территории.",
    "erazi-temizliyi":
      "166 выполняет уборку территорий жилых зданий, торговых центров, отелей, школ и других объектов с использованием профессионального оборудования.",
    "fasad-temizliyi":
      "Чистый фасад формирует первое впечатление о здании. Команда 166 выполняет фасадные работы профессионально и с учетом требований безопасности.",
    "pencere-temizliyi":
      "Мойка окон помогает сохранить свет, вид и общий порядок помещения. Мы очищаем стандартные и высотные окна.",
    "cilciraq-temizliyi":
      "Плафоны и детали люстр аккуратно снимаются, моются, сушатся и возвращают первоначальный блеск.",
    "perde-yuma":
      "Команда снимает шторы и жалюзи, стирает их специальным методом, сушит, гладит и возвращает заказчику.",
    "yumsaq-mebel-temizlenmesi":
      "Химическая чистка мягкой мебели удаляет пятна, бактерии и старый вид с диванов, кресел, стульев и матрасов.",
    etirlendirme:
      "Профессиональная ароматизация помогает устранить неприятные запахи в доме, офисе и коммерческом помещении.",
    "baximsiz-ev-temizliyi":
      "Мы берем на себя уборку самых запущенных домов с использованием специальных химических средств и современной техники.",
    "yangindan-sonra-ev-temizliyi":
      "После пожара или затопления копоть, пыль и сложные загрязнения удаляются профессиональными средствами.",
    "temir-sonrasi-temizlik":
      "После ремонта строительная пыль, краска, клей и мусор убираются специальным оборудованием, чтобы помещение было готово к использованию.",
    "otel-temizlenmesi":
      "Уборка отеля важна для гигиены и комфорта гостей. Номера и общие зоны очищаются системно и аккуратно.",
    "restoran-temizlenmesi":
      "Ресторан должен быть чистым и гигиеничным для безопасности питания и доверия клиентов.",
    "kristallasdirma-xidmeti":
      "Кристаллизация восстанавливает блеск каменных, мраморных и глянцевых поверхностей.",
    "hovuz-temizlenmesi-xidmeti":
      "Чистка бассейна выполняется в Баку и регионах с учетом состояния воды, чаши и пожеланий заказчика.",
    "korporativ-temizlik-xidmeti":
      "Корпоративное сотрудничество включает оперативные заказы, контроль качества и выгодные условия для постоянных клиентов.",
  },
  tr: {
    "ev-temizliyi-xidmeti":
      "İş ve aile hayatının yoğun temposunda ev temizliğine saatler ayırmak büyük enerji gerektirir. 166 ile evinizdeki temizlik işlerini kolayca çözebilirsiniz.",
    "ofis-temizliyi":
      "Temizlik sadece konfor için değil, verimli çalışma için de önemlidir. Temiz ofis çalışan sağlığını ve iş verimini korur.",
    "bag-evlerinin-temizliyi":
      "Bağ evinizin yılın her mevsiminde hazır olması için temizlik ve bahçe bakım işlerini üstleniyoruz.",
    "erazi-temizliyi":
      "Konut binaları, alışveriş merkezleri, oteller, okullar ve diğer alanların çevre temizliği profesyonel ekipmanla yapılır.",
    "fasad-temizliyi":
      "Binaların dış cephesinin temiz olması ilk izlenim için önemlidir. 166 ekibi cephe temizliğini güvenli ve profesyonel şekilde yapar.",
    "pencere-temizliyi":
      "Pencere temizliği ışık, görünüm ve mekanın genel düzeni için önemlidir. Standart ve yüksek pencerelerde hizmet verilir.",
    "cilciraq-temizliyi":
      "Avize temizliğinde parçalar özenle sökülür, yıkanır, kurutulur ve parlaklığı geri kazandırılır.",
    "perde-yuma":
      "Perde ve jaluzi yıkama ekibi perdeleri çıkarır, özel yöntemle yıkar, kurutur, ütüler ve teslim eder.",
    "yumsaq-mebel-temizlenmesi":
      "Koltuk ve yumuşak mobilya temizliği lekeleri, bakterileri ve eski görünümü azaltmaya yardımcı olur.",
    etirlendirme:
      "Ev, ofis ve iş yerlerinde istenmeyen kokulara karşı profesyonel koku hizmeti sunulur.",
    "baximsiz-ev-temizliyi":
      "En bakımsız evlerin temizliğini özel kimyasallar ve modern ekipmanlarla üstleniyoruz.",
    "yangindan-sonra-ev-temizliyi":
      "Yangın ve su baskını sonrasında oluşan is, toz ve ağır kirler profesyonel malzemelerle temizlenir.",
    "temir-sonrasi-temizlik":
      "Tadilat sonrası toz, boya, yapıştırıcı ve inşaat kirleri özel ekipmanla temizlenir.",
    "otel-temizlenmesi":
      "Otel temizliği misafir memnuniyeti ve hijyen için temel şarttır. Odalar ve ortak alanlar sistemli şekilde temizlenir.",
    "restoran-temizlenmesi":
      "Restoranların temiz ve hijyenik olması müşteri memnuniyeti ve güvenli gıda hazırlığı için önemlidir.",
    "kristallasdirma-xidmeti":
      "Taş, mermer ve parlak yüzeylerin görünümünü yenilemek için kristalizasyon hizmeti sunulur.",
    "hovuz-temizlenmesi-xidmeti":
      "Havuz temizliği Bakü ve bölgelerde havuzun durumuna ve müşterinin taleplerine uygun yapılır.",
    "korporativ-temizlik-xidmeti":
      "Kurumsal temizlik hizmeti düzenli sipariş, kalite kontrol ve şirketlere özel iş modeli sunar.",
  },
};

const serviceBullets: Record<Locale, Record<string, string[]>> = {
  az: {},
  ru: {
    "ev-temizliyi-xidmeti": [
      "Уборка комнат, коридора и зала",
      "Уборка кухни",
      "Протирание потолка и стен",
      "Удаление пыли с мебели",
      "Чистка кафеля и метлаха",
      "Уборка санитарных узлов",
    ],
    "ofis-temizliyi": ["Офисная мебель и техника", "Напольные покрытия", "Двери, окна и зеркала", "Дезинфекция санитарных зон"],
    "bag-evlerinin-temizliyi": ["Уборка дома", "Уборка двора", "Чистка бассейна", "Сбор мусора"],
    "erazi-temizliyi": ["Подметание территории", "Сбор мусора", "Мойка поверхности специальным оборудованием", "Мойка брусчатки"],
    "fasad-temizliyi": ["Мойка стеклянных фасадов", "Удаление пыли и грязи", "Команда для высотных работ", "Специальное оборудование"],
    "pencere-temizliyi": ["Мойка стандартных окон", "Мойка высотных окон", "Чистка винила", "Удаление монтажной ленты"],
    "cilciraq-temizliyi": ["Отключение люстры от электричества", "Мойка плафонов", "Удаление следов воды", "Сушка деталей"],
    "perde-yuma": ["Стирка тюля", "Стирка декоративных штор", "Мойка жалюзи", "Услуга по Абшеронскому полуострову"],
    "yumsaq-mebel-temizlenmesi": ["Диваны и кресла", "Кожаная мебель", "Стулья и пуфы", "Матрасы и ковролин"],
    etirlendirme: ["Удаление неприятных запахов", "Решение по размеру помещения", "Офисы и коммерческие объекты", "Долговременный приятный аромат"],
    "baximsiz-ev-temizliyi": ["Дома пожилых людей", "Дома лежачих больных", "Глубокая уборка", "Специальные химические средства"],
    "yangindan-sonra-ev-temizliyi": ["Удаление копоти и сажи", "Мойка потолка и фасада", "Чистка мебели", "Сбор мусора"],
    "temir-sonrasi-temizlik": ["Удаление строительных загрязнений", "Чистка окон и дверей", "Сухая и влажная уборка поверхностей", "Подготовка к заселению"],
    "otel-temizlenmesi": ["Уборка санузлов", "Мебель и поверхности", "Полы и стены", "Аксессуары и кондиционеры"],
    "restoran-temizlenmesi": ["Уборка зала", "Кухонные зоны", "Санитарные узлы", "Услуга по гигиеническим правилам"],
    "kristallasdirma-xidmeti": ["Мраморные поверхности", "Восстановление блеска", "Удаление налета и пятен", "Услуга профессиональным оборудованием"],
    "hovuz-temizlenmesi-xidmeti": ["Слив загрязненной воды", "Чистка чаши бассейна", "Удаление соли и кальциевых пятен", "Дезинфекция"],
    "korporativ-temizlik-xidmeti": ["Корпоративные предложения", "Отслеживание заказов", "Звонки по удовлетворенности клиентов", "Профессиональная команда"],
  },
  tr: {
    "ev-temizliyi-xidmeti": [
      "Oda, koridor ve salon temizliği",
      "Mutfak temizliği",
      "Tavan ve duvarların silinmesi",
      "Mobilyaların tozunun alınması",
      "Fayans ve metlakh temizliği",
      "Banyo ve tuvalet temizliği",
    ],
    "ofis-temizliyi": ["Ofis mobilyaları ve ekipmanları", "Zemin kaplamaları", "Kapı, pencere ve aynalar", "Hijyen alanlarının dezenfeksiyonu"],
    "bag-evlerinin-temizliyi": ["Evin temizlenmesi", "Bahçenin temizlenmesi", "Havuzun temizlenmesi", "Çöplerin toplanması"],
    "erazi-temizliyi": ["Alanın süpürülmesi", "Çöpün toplanması", "Zemin yüzeyinin özel cihazla yıkanması", "Kilit taşı yıkama hizmeti"],
    "fasad-temizliyi": ["Cam cephelerin yıkanması", "Toz ve kirin temizlenmesi", "Yüksekte çalışma ekibi", "Özel ekipman"],
    "pencere-temizliyi": ["Standart pencere temizliği", "Yüksek pencere temizliği", "Vinil temizliği", "Montaj bandı temizliği"],
    "cilciraq-temizliyi": ["Avizenin elektrikten ayrılması", "Plafonların yıkanması", "Su lekelerinin temizlenmesi", "Parçaların kurutulması"],
    "perde-yuma": ["Tül perde yıkama", "Dekor perde yıkama", "Jaluzi yıkama", "Abşeron yarımadası genelinde hizmet"],
    "yumsaq-mebel-temizlenmesi": ["Koltuk ve berjerler", "Deri mobilyalar", "Sandalyeler ve puflar", "Yatak ve halıfleks"],
    etirlendirme: ["Kötü kokuların giderilmesi", "Mekan ölçüsüne uygun çözüm", "Ofis ve işletmeler", "Uzun süreli hoş koku"],
    "baximsiz-ev-temizliyi": ["Yaşlı insanların evleri", "Yatalak hastaların evleri", "Derin temizlik", "Özel kimyasal ürünler"],
    "yangindan-sonra-ev-temizliyi": ["İs ve kurumun temizlenmesi", "Tavan ve cephe yıkama", "Mobilyaların temizlenmesi", "Çöplerin toplanması"],
    "temir-sonrasi-temizlik": ["İnşaat kirlerinin giderilmesi", "Pencere ve kapı temizliği", "Yüzeylerin kuru ve ıslak temizliği", "Yerleşime hazırlık"],
    "otel-temizlenmesi": ["Banyo ve tuvalet temizliği", "Mobilya ve yüzeyler", "Zemin ve duvarlar", "Aksesuarlar ve klimalar"],
    "restoran-temizlenmesi": ["Salon temizliği", "Mutfak alanları", "Hijyen alanları", "Hijyen kurallarına uygun hizmet"],
    "kristallasdirma-xidmeti": ["Mermer yüzeyler", "Parlaklığın geri kazandırılması", "Kireç ve lekelerin temizlenmesi", "Profesyonel cihazlarla hizmet"],
    "hovuz-temizlenmesi-xidmeti": ["Kirli suyun boşaltılması", "Havuz haznesinin temizliği", "Tuz ve kalsiyum lekeleri", "Dezenfeksiyon"],
    "korporativ-temizlik-xidmeti": ["Kurumsal teklifler", "Siparişlerin takibi", "Müşteri memnuniyeti aramaları", "Profesyonel ekip"],
  },
};

export const pageCopy = {
  az: {
    subtitle: "Sevdiklərinizə və özünüzə zaman ayırın!",
    readMore: "Daha ətraflı",
    servicesTitle: "Xidmətlər",
    servicesListTitle: "Xidmətlər",
    included: "xidmətinə daxildir",
    includedHome: "Əsaslı təmizlik xidmətinə daxildir",
    serviceCare: "Təmizlik qayğısından azad olun, indi sevdiklərinizə zaman ayırmaq və sevdiyiniz işlə məşğul olmaq vaxtıdır!",
    packagesTitle: "Təmizlik paketləri",
    packagesIntro: "166 Təmizlik xidməti sizin büdcənizə uyğun müxtəlif təmizlik paketlərini təqdim edir.",
    noteTitle: "QEYD",
    noteText:
      "Təmizlik xidməti sizin seçiminiz əsasında olur. Belə ki, daha mükəmməl təmizlik üçün premium paketi seçə bilərsiniz. Bundan əlavə saatlıq paketlər də sizin üçün münasib hesab edilir. Təmizlik paketleri seçərkən bizim əməkdaşlarımız da sizin istəklərinizə uyğun tövsiyələr verəcək. Təmizlik firması olaraq sizə ən təmiz xidməti göstərməyə çalışırıq.",
    formName: "Ad",
    formPhone: "Əlaqə nömrəsi",
    formAddress: "Təmizlik olunacaq ünvan",
    formMessage: "İsmarıc",
    order: "Sifariş et",
    bottomText:
      "Təmizlik xidməti sizin seçiminiz əsasında olur. Belə ki, daha mükəmməl təmizlik üçün premium paketi seçə bilərsiniz. Bundan əlavə saatlıq paketlər də sizin üçün münasib hesab edilir. Təmizlik paketleri seçərkən bizim əməkdaşlarımız da sizin istəklərinizə uyğun tövsiyələr verəcək. Təmizlik firması olaraq sizə ən təmiz xidməti göstərməyə çalışırıq.",
  },
  ru: {
    subtitle: "Уделите внимание себе и своим близким!",
    readMore: "Подробнее",
    servicesTitle: "Услуги",
    servicesListTitle: "Услуги",
    included: "включает",
    includedHome: "Генеральная уборка включает",
    serviceCare: "Освободитесь от заботы о чистоте, сейчас самое время уделить время близким и заняться любимым делом!",
    packagesTitle: "Пакеты клининговых услуг",
    packagesIntro: "Клининговая Компания 166 предлагает разные пакеты услуг с учетом вашего бюджета.",
    noteTitle: "Заметка",
    noteText:
      "Услуги по уборке выбираются по вашим потребностям. Для более тщательной уборки можно выбрать премиум-пакет или удобный почасовой пакет.",
    formName: "Имя",
    formPhone: "Контактный номер",
    formAddress: "Адрес уборки",
    formMessage: "Сообщение",
    order: "Заказать",
    bottomText:
      "Услуги по уборке выбираются по вашим потребностям. Наши сотрудники помогут подобрать подходящий пакет и дадут рекомендации.",
  },
  tr: {
    subtitle: "Sevdiklerinize ve kendinize zaman ayırın!",
    readMore: "Daha detaylı",
    servicesTitle: "Hizmetler",
    servicesListTitle: "Hizmetlerimiz",
    included: "hizmetine dahildir",
    includedHome: "Detaylı temizlik hizmetine dahildir",
    serviceCare: "Temizlik kaygısından kurtulun, artık sevdiklerinize ve sevdiğiniz işlere zaman ayırma zamanı!",
    packagesTitle: "Temizlik paketleri",
    packagesIntro: "166 Temizlik hizmeti bütçenize uygun farklı temizlik paketleri sunar.",
    noteTitle: "NOT",
    noteText:
      "Temizlik hizmeti seçiminize göre belirlenir. Daha kapsamlı temizlik için premium paketi veya saatlik paketleri tercih edebilirsiniz.",
    formName: "Ad",
    formPhone: "İletişim numarası",
    formAddress: "Temizlik yapılacak adres",
    formMessage: "Mesaj",
    order: "Sipariş et",
    bottomText:
      "Temizlik hizmeti seçiminize göre belirlenir. Paket seçerken çalışanlarımız ihtiyaçlarınıza uygun öneriler sunacaktır.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function getLocalizedServicePages<T extends { slug: string; title: string; description: string; href: string; bullets: string[] }>(items: T[], locale: Locale = "az") {
  return items.map((item, index) => ({
    ...item,
    title: serviceLabels[locale][index] ?? item.title,
    description: serviceDescriptions[locale][item.slug] ?? item.description,
    href: getServiceHref(item.slug, locale),
    bullets: serviceBullets[locale][item.slug] ?? item.bullets,
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
        "Компания 166, начавшая деятельность в 2015 году с небольшой команды, решает любые задачи уборки с помощью современного оборудования и чистящих средств.",
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
        "2015 yılında birkaç çalışanla faaliyete başlayan 166, modern ekipman ve temizlik ürünleriyle her türlü temizlik sorununu çözer.",
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
