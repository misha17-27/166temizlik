import Image from "next/image";
import Link from "next/link";
import { SitePage } from "@/components/SiteChrome";
import { WordPressSeoSchema } from "@/components/WordPressSeoSchema";
import { getLocalizedServicePages, pageCopy, type Locale } from "@/lib/i18n";
import { pageHeroAssets, servicePages } from "@/lib/pages-data";
import { getWordPressImageUrl, getWordPressServices, stripHtml, type WordPressContentItem } from "@/lib/wordpress";
import { generateStaticWordPressPageMetadata, getStaticWordPressPage } from "@/lib/wordpress-pages";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return generateStaticWordPressPageMetadata("services", "az", "Təmizlik xidmətləri - 166 Təmizlik");
}

const serviceListImages: Record<string, string> = {
  "ev-temizliyi-xidmeti": "https://admin.166temizlik.az/wp-content/uploads/2023/07/ev-temizliyiiii.webp",
  "ofis-temizliyi": "https://admin.166temizlik.az/wp-content/uploads/2023/05/J1A8062.jpg",
  "bag-evlerinin-temizliyi": "https://admin.166temizlik.az/wp-content/uploads/2024/12/HRS03584.webp",
  "erazi-temizliyi": "https://admin.166temizlik.az/wp-content/uploads/2023/02/razi-t-mizliyi-1.webp",
  "fasad-temizliyi": "https://admin.166temizlik.az/wp-content/uploads/2023/03/fasad.webp",
  "pencere-temizliyi": "https://admin.166temizlik.az/wp-content/uploads/2023/07/pencere-temizliyi-metbex-temizliyi-fon.jpg",
  "cilciraq-temizliyi": "https://admin.166temizlik.az/wp-content/uploads/2024/12/HRS03718.webp",
  "perde-yuma": "https://admin.166temizlik.az/wp-content/uploads/2023/05/DSC08236.jpg",
  "yumsaq-mebel-temizlenmesi": "https://admin.166temizlik.az/wp-content/uploads/2023/03/mebel.webp",
  etirlendirme: "https://admin.166temizlik.az/wp-content/uploads/2023/02/Air_Purifier_iStock_607646922.7.webp",
  "baximsiz-ev-temizliyi": "https://admin.166temizlik.az/wp-content/uploads/2023/02/gozel222-1.webp",
  "yangindan-sonra-ev-temizliyi": "https://admin.166temizlik.az/wp-content/uploads/2023/03/yangin.jpg",
  "temir-sonrasi-temizlik": "https://admin.166temizlik.az/wp-content/uploads/2023/02/fit_960_530_false_crop_1000_562_0_52_q90_2709852_1b72823ed32f1521bbdb3e471.webp",
  "otel-temizlenmesi": "https://admin.166temizlik.az/wp-content/uploads/2024/12/HRS03357.webp",
  "restoran-temizlenmesi": "https://admin.166temizlik.az/wp-content/uploads/2023/05/J1A7802.jpg",
  "kristallasdirma-xidmeti": "https://admin.166temizlik.az/wp-content/uploads/2024/02/image-89a.webp",
  "hovuz-temizlenmesi-xidmeti": "https://admin.166temizlik.az/wp-content/uploads/2024/02/image-89-1.webp",
  "korporativ-temizlik-xidmeti": "https://admin.166temizlik.az/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-16-at-13.35.38-1.jpeg",
};

const serviceOrder = [
  "ev-temizliyi-xidmeti",
  "ofis-temizliyi",
  "bag-evlerinin-temizliyi",
  "erazi-temizliyi",
  "fasad-temizliyi",
  "pencere-temizliyi",
  "cilciraq-temizliyi",
  "perde-yuma",
  "yumsaq-mebel-temizlenmesi",
  "etirlendirme",
  "baximsiz-ev-temizliyi",
  "yangindan-sonra-ev-temizliyi",
  "temir-sonrasi-temizlik",
  "otel-temizlenmesi",
  "restoran-temizlenmesi",
  "kristallasdirma-xidmeti",
  "hovuz-temizlenmesi-xidmeti",
  "korporativ-temizlik-xidmeti",
];

const serviceListAcfFields: Record<string, { text: string; image: string }> = {
  "ev-temizliyi-xidmeti": { text: "ev_təmizliyi_xidmet", image: "ev_təmizliyi_xidmet_səkil" },
  "ofis-temizliyi": { text: "ofis_təmizliyi", image: "ofis_təmizliyi_səkil" },
  "bag-evlerinin-temizliyi": { text: "bag_evlərinin_təmizliyi_xidmət", image: "bag_evlərinin_təmizliyi_səkil" },
  "erazi-temizliyi": { text: "ərazi_təmizliyi_xidmət", image: "ərazi_təmizliyi_səkil" },
  "fasad-temizliyi": { text: "fasad_təmizliyi_xidmət", image: "fasad_təmizliyi_səkil" },
  "pencere-temizliyi": { text: "pəncərə_təmizliyi_xidmət", image: "pəncərə_təmizliyi_səkil" },
  "cilciraq-temizliyi": { text: "cilciraq_təmizliyi_xidmət", image: "cilciraq_təmizliyi_səkil" },
  "perde-yuma": { text: "pərdə_və_jaluz_yuma_xidmət", image: "pərdə_və_jaluz_yuma_səkil" },
  "yumsaq-mebel-temizlenmesi": { text: "yumsaq_mebellərin_kimyəvi_təmizliyi_xidmət", image: "yumsaq_mebellərin_kimyəvi_təmizliyi_səkil" },
  etirlendirme: { text: "ətirləndirmə_xidməti", image: "ətirləndirmə_xidməti_səkil" },
  "baximsiz-ev-temizliyi": { text: "“gozəl_ev”_təmizliyi_xidmət", image: "“gozəl_ev”_təmizliyi_səkil" },
  "yangindan-sonra-ev-temizliyi": { text: "yangin_və_subasma_təmizlik_xidmət", image: "yangin_və_subasma_sonrasi_təmizlik_səkil" },
  "temir-sonrasi-temizlik": { text: "təmir_sonrasi_təmizlik_xi", image: "təmir_sonrasi_təmizlik_xidmət_səkil" },
  "otel-temizlenmesi": { text: "otel_təmizlənməsi_xidməti", image: "otel_təmizlənməsi_xidməti_səkil" },
  "restoran-temizlenmesi": { text: "restoran_təmizlənməsi_xidməti", image: "restoran_təmizlənməsi_xidməti_səkil" },
  "kristallasdirma-xidmeti": { text: "kristallasdirma_xidməti", image: "kristallasdirma_xidməti_səkil" },
  "hovuz-temizlenmesi-xidmeti": { text: "hovuz_təmizlənməsi", image: "hovuz_təmizlənməsi_səkil" },
};

function getAcfCardText(page: WordPressContentItem | null, key: string) {
  const value = page?.acf?.[key];

  return typeof value === "string"
    ? stripHtml(value)
        .replace(/&#8211;/g, "-")
        .replace(/&nbsp;/g, " ")
        .trim()
    : "";
}

function getAcfCardImage(page: WordPressContentItem | null, key: string) {
  const value = page?.acf?.[key];

  if (!value || typeof value !== "object") {
    return "";
  }

  const url = (value as Record<string, unknown>).url;
  return typeof url === "string" ? url : "";
}

function getServiceListAcfOverrides(page: WordPressContentItem | null) {
  return new Map(
    Object.entries(serviceListAcfFields).map(([slug, fields]) => [
      slug,
      {
        description: getAcfCardText(page, fields.text),
        image: getAcfCardImage(page, fields.image),
      },
    ]),
  );
}

const serviceListDescriptions: Record<Locale, Record<string, string>> = {
  az: {
    "ev-temizliyi-xidmeti":
      "İş və ailə həyatının bu qədər stresli olduğu bir vaxtda ev təmizliyinə saatlarınızı sərf etmək böyük enerji tələb edir. 166-ya bir zənglə və ya saytımıza yazmaqla istəyinizə uyğun “gündəlik” və “əsaslı” təmizlik xidməti sifariş edib, evinizdəki bütün təmizlik işlərini yoluna qoya bilərsiniz.",
    "ofis-temizliyi":
      "Təmizlik sadəcə rahatlıq üçün yox eyni zamanda səmərəli iş üçün də vacibdir. Təmiz olmayan ofisdə toz və mikrob ofis əməkdaşlarının sağlamlığına təsir edir və onların əmək məhsuldarlığını azaldır. Təmizlik məsələləri həll olunmadığı müddətcə iş üçün tamamilə uyğun olmayan mühit yaranmağa başlayır.",
    "bag-evlerinin-temizliyi":
      "Təbiətdən zövq almaq üçün bağ evi əla seçim olsa da, baxımsız vəziyyətdəki bağ, hovuz heç də ürəkaçan olmur. Təmizləməyə başlasanız, bağ mövsümünün sonuna qurtararsınız. 166 Təmizlik Xidməti ilin bütün fəsilləri üçün bağ evinizi sizə hazır vəziyyətə salmaq üçün təmizlik və bağa qulluğu işlərini öz üzərinə götürür.",
    "erazi-temizliyi":
      "166 Təmizlik xidməti yaşayış binalarının, alış-veriş mərkəzlərinin, mehmanxanaların, istirahət mərkəzlərinin, məktəblərin və başqa binaların ətraf mühitinin təmizləmə işlərini həyata keçirir.Peşəkar təmizlik komandamız ərazi təmizliyi zamanı xüsusi avadanlıq və vasitələrdən istifadə edir.",
    "fasad-temizliyi":
      "Binaların xaricinin təmiz olması şirkət haqqında ilk təəssürat üçün vacibdir. Bu işi 166 Təmizlik Xidmətinin peşəkar komandasına həvalə etmək isə ən düzgün qərardır. Bakıda çoxmərtəbəli binaların sayını nəzərə alaraq, fasadlarının təmizlənməsi yüksək risk zonasına daxildir.",
    "pencere-temizliyi":
      "Binaların xaricinin təmiz olması şirkət haqqında ilk təəssürat üçün vacibdir. Bu işi 166 Təmizlik Xidmətinin peşəkar komandasına həvalə etmək isə ən düzgün qərardır. Bakıda çoxmərtəbəli binaların sayını nəzərə alaraq, fasadlarının təmizlənməsi yüksək risk zonasına daxildir.",
    "cilciraq-temizliyi":
      "*Təmizləmə prosesi aşağıdakı qaydada həyata keçirilir:* • Çilçiraq elektrikdən söndürülür; • Plafonlar yuyucu maddələr vasitəsi ilə isladılır; • Su ləkələrini təmizləmək və parlaqlıq vermək üçün təmamilə qurudulur;",
    "perde-yuma":
      "Evin dekorunda xüsusi rolu olan pərdələrin təmizliyi çox önəmli bir məsələdir. Peşəkar pərdə yuma komandamız ipək, tül, kətan və digər növ pərdələrinizi və jalüzlərinizi çıxarır xüsusi metoddan istifadə etməklə yuyur, havalandırma otağında təmamilə qurudur, ütüləyir və təyin olunmuş tarixdə sizə təhvil verir.",
    "yumsaq-mebel-temizlenmesi":
      "Gündəlik istifadə olunan divan, kreslo və stul kimi mebellərin kirlənmə ehtimalı çox yüksəkdir. Hər əşya kimi yumşaq mebelləri də mütəmadi olaraq təmizləmək mütləqdir. Mebellər təmizlənmədikdə əsl bakteriya yuvası olur, həmçinin çirk onların rəngini soldurur və köhnə görkəm verir.",
    etirlendirme:
      "Xoşagəlməz qoxulara qarşı effektiv üsül. Evdə, ofisdə və ya obyektdə olan pis qoxular sizi və ətrafınızdakı insanları narahat edə bilər. Bu problemi aradan qaldırmaq üçün peşəkar üsullardan istifadə etmək lazımdır. Belə ki, məkanlardakı pis qoxulardan azad olmaq istəyirsinizsə, bizə müraciət edə bilərsiniz.",
    "baximsiz-ev-temizliyi":
      "Təmizlik bizim işimizdir. Ən baxımsız halda yəni – yaşlı insanların, yataq xəstələrinin, qayğıya ehtiyacı olan şəxslərin evlərinin təmizliyini öz üzərimizə götürüb, xüsusi kimyəvi məhlullar və müasir avadanlıqlar vasitəsilə evinizi tərtəmiz edirik.",
    "yangindan-sonra-ev-temizliyi":
      "Yanğından dəyən zərəri geri qaytara bilməsəkdə, bu arzuolunmaz hadisənin izlərini birdəfəlik təmizləyərik! Lazımlı vasitələr olmadan yanğın nəticəsində yaranan his, toz və qubar ləkələrinin təmizlənməsi olduqca çətindir. Ona görə də peşəkar kömək almalısınız.",
    "temir-sonrasi-temizlik":
      "Təmir sonrası təmizlik zamanı qapı və pəncərələri zədələmədən qoruyucu lentləri çıxartmaq, döşəməni cızmadan boya və kley ləkələrini təmizləmək lazımdır. Bu işləri görmək sizə yeni evinizdən zövq almağa imkan vermir. 166 Təmizlik Xidməti sizə belə çətin vəziyyətdən çıxmağa kömək olacaq! Peşəkar təmizlik komandası xüsusi təmizlik vasitələri və xüsusi avadanlıqlarla istənilən ölçüdə mənzil və obyektlərin təmir sonrası təmizlik işlərini həyata keçirir.",
    "otel-temizlenmesi":
      "İnsanlar otel seçərkən onun yerləşdiyi yerə, göz oxşayan interyerə, münasib qiymətə fikir verməklə yanaşı, onun təmiz və gigiyenik olmasına da nəzər yetirir. Ona görə də seçilən otellər siyahısında olmaq istəyirsinizsə təmizliyin qeydinə qalmaq lazımdır. 166 Təmizlik Xidmətinə müraciət edib, peşəkar təmizlikdən zövq alın!",
    "restoran-temizlenmesi":
      "Restoranların olduqca təmiz və səliqəli olması insanlarda həmin yer ilə bağlı müsbət təəsürat yaradır və orada oturub oturmama qərarlarına birbaşa təsir edir. Restoranların təmizliyi ilk öncə orada işləyən işçi heyətinin və müştərilərinin təhlükəsizliyi üçün olduqca vacib nüansdır. Gigiyenik qaydalara riayət edilməlidir ki, qidalar sağlam şəkildə hazırlansın.",
    "kristallasdirma-xidmeti":
      "Məkanın daxili ilə yanaşı, onun zahiri ətraf sahəsinin də görkəmi böyük rol oynayır. Ərp və ləkələr ərazidə qaçılmazdır. Qonaqlara və ya məkanın önündən keçənlərə heç də xoş təəssürat bağışlamır.",
    "hovuz-temizlenmesi-xidmeti":
      "Hal-hazırda hovuzlar şəxsi evlərin, villaların, bağ evlərinin, həmçinin fitnes mərkəzləri, idman zalları, qadın gözəllik və sağlamlıq mərkəzləri və əlbətdə ki, akvaparkların əvəzedilməz hissəsidir. Şəhərimizdə belə çox miqdarda hovuzların olduğunu nəzərə alaraq Bakıda hovuzların təmizlənməsi xidmətinə ehtiyac yetərincə çoxdur. Bildiyimiz kimi gün ərzində idman zalları, akvaparklardaki hovuzlardan onlarla insan istifadə edir və müntəzəm təmizlik və dezinfeksiya edilmədiyi halda onlar bakteriya və xəsətəlik daşıyıcısıdırlar.",
    "korporativ-temizlik-xidmeti":
      "Korporativ əməkdaşlıq şirkətimizin əsas prioritetlərindən biridir. Korporativ müşdərilərimiz üçün nəzərdə tutduğumuz güzəştlər həm iş prosesinin asanlaşmasına həm də biznes partnyorlarımızın məmnunluguna səbəb olur.",
  },
  ru: {
    "ev-temizliyi-xidmeti":
      "Сэкономьте время, доверив уборку профессиональной команде Клининговой Компании 166! Трата времени на уборку дома требует огромных затрат энергии. Позвонив по номеру 166 или заказав на нашем сайте клининговую услугу, Вы сможете обеспечить чистоту в своем доме.",
    "ofis-temizliyi":
      "Неопрятный и неухоженный офис ухудшает репутацию компании. Трудиться в таком помещении неприятно и опасно для здоровья, поэтому производительность сотрудников снижается, а следовательно владелец бизнеса недополучает прибыль.",
    "bag-evlerinin-temizliyi":
      "Дача отличный выбор для гармонии с природой. Но когда дача в запущенном состоянии, насладиться природой становится невозможным. Вы можете доверить нам уборку Вашей дачи и бассейна в любое время года независимо от погоды.",
    "erazi-temizliyi":
      "Клининговая Компания 166 осуществляет экологическую уборку жилых домов, торговых центров, гостиниц, центров отдыха, школ и других зданий. Наша профессиональная команда по уборке использует специальное оборудование во время уборки территорий. Наши сотрудники приведут вашу территорию в пригодное для использования состояние.",
    "fasad-temizliyi":
      "Клининговая Компания 166 готова взять на себя поддержание чистоты постройки как снаружи, так и внутри. Нам под силу отмыть панорамные остекленные стены, широкие витрины, вывески, эркеры, водосточные трубы, ливнеотводы и любые другие фасадные элементы. Учитывая количество многоэтажных зданий в Баку, очистка фасадов относится к зоне повышенного риска. По этой причине во время уборки необходимо строго соблюдать правила безопасности.",
    "pencere-temizliyi":
      "Клининговая Компания 166 готова взять на себя поддержание чистоты постройки как снаружи, так и внутри. Нам под силу отмыть панорамные остекленные стены, широкие витрины, вывески, эркеры, водосточные трубы, ливнеотводы и любые другие фасадные элементы. Учитывая количество многоэтажных зданий в Баку, очистка фасадов относится к зоне повышенного риска. По этой причине во время уборки необходимо строго соблюдать правила безопасности.",
    "cilciraq-temizliyi":
      "Платформa, необходимая во время чистки люстры, обеспечивается со стороны компании. Процесс очистки осуществляется в следующем порядке: • Люстра отключается от электричества; • Плафоны протираются специальными моющими средствами; • Для удаления пятен от воды и придания блеска, плафоны полностью высушиваются.",
    "perde-yuma":
      "Шторы играют особую роль в декоре интерьера, поэтому очень важно поддерживать их в чистоте. Наша профессиональная команда по стирке штор разбирает Ваши шелковые, тюлевые, льняные и другие виды штор и жалюзи, стирает их специальным методом, полностью сушит в проветриваемом помещении, гладит и доставляет Вам в назначенный срок.",
    "yumsaq-mebel-temizlenmesi":
      "Мягкая мебель нуждается в тщательном и профессиональном уходе, тaк кaк при регулярном пользовании тканевый материал более подвержен износу. Со временем на мебели скапливаются бактерии и различные микроорганизмы очень опасные для здоровья человека. С помощью специального оборудования и профессиональных чистящих средств Клининговой Компании 166, Ваша мебель прослужит Вам долгие годы и при этом будет иметь новый вид.",
    etirlendirme:
      "Плохие запахи в доме, офисе или любом другом помещении могут причинять дискомфорт Вам и окружающим Вас людям. Для устранения этой проблемы необходимо использовать профессиональные методы. Если Вы хотите избавиться от неприятных запахов, Клининговая Компания 166 готова прийти вам на помощь.",
    "baximsiz-ev-temizliyi":
      "Мы берем на себя уборку домов пожилых людей, лежачих больных и других, нуждающихся в уходе людей. Генеральная или специальная уборка помогут привести жилье в порядок.",
    "yangindan-sonra-ev-temizliyi":
      "Если Ваше жилище пострадало после пожара и уборка кажется невыполнимой, Клининговая Компания 166 готова прийти Вам на помощь. Наша компания очистит причиненные огнем и дымом загрязнения, спасет те предметы интерьера, которые не получили критических повреждений.",
    "temir-sonrasi-temizlik":
      "При уборке дома после ремонта необходимо снять защитные ленты, не повредив двери и окна, очистить пятна краски и клея, не поцарапав напольное покрытие. Выполнение этой работы мешает Вам наслаждаться своим новым домом. Клининговая Компания 166 поможет Вам выбраться из такой сложной ситуации! Профессиональная клининговая бригада осуществляет послеремонтную уборку квартир и объектов любой площади с помощью специальных оборудований и чистящих средств.",
    "otel-temizlenmesi":
      "Выбирая отель, люди обращают внимание не только на его расположение, привлекательный интерьер и приемлемую цену, а также на чистоту и гигиеничность. Поэтому, если Вы хотите попасть в список избранных отелей, вам необходимо позаботиться о чистоте. Обратитесь в Клининговую Компанию 166 и насладитесь профессиональной уборкой!",
    "restoran-temizlenmesi":
      "Тот факт, что рестораны очень чистые и опрятные, создает у людей положительное впечатление об этом месте и напрямую влияет на их решение сидеть там или нет. При приготовлении и реализации пищевых продуктов и напитков, необходимо соблюдать правила гигиены.",
    "kristallasdirma-xidmeti":
      "Наряду с интерьером помещения,большую роль в его презентабельном виде, играет прилегающая к нему территория. Пятна и налёт вокруг территории неизбежны. Создают самые не лучшие впечатления у прохожих и y гостей вашего предприятия.",
    "hovuz-temizlenmesi-xidmeti":
      "В настоящее время бассейны являются неотъемлемой частью частных домов, вилл, дач, а также фитнесс-центров, спортзалов, женских центров красоты и здоровья, ну и, конечно же, аквапарков. Учитывая столь большое количество бассейнов в городе, услуги по чистке бассейнов в Баку пользуются большим спросом. Все мы знаем, что бассейны – еще один носитель различных бактерий и заболеваний при нерегулярной чистке и дезинфецировании, так как им пользуются десятки людей в течение дня в спортзалах, аквапарках и т.д.",
    "korporativ-temizlik-xidmeti":
      "Корпоративное сотрудничество — один из главных приоритетов нашей компании. Скидки, которые мы предоставляем нашим корпоративным клиентам, облегчают как бизнес-процесс, так и удовлетворение наших деловых партнеров.",
  },
  tr: {
    "ev-temizliyi-xidmeti":
      "İş ve aile hayatının bu kadar stresli olduğu bir dönemde ev temizliğine saatlar harcamak büyük bir enerji gerektiriyor. 166’yı arayarak ya da web sitemizden yazarak ihtiyacınıza uygun “günlük” veya “detaylı” temizlik hizmeti sipariş edebilir, evinizdeki tüm temizlik işlerini kolayca halledebilirsiniz.",
    "ofis-temizliyi":
      "Temizlik sadece konfor için değil, aynı zamanda verimli çalışma için de önemlidir. Temiz olmayan bir ofisteki toz ve mikroplar çalışanların sağlığını olumsuz etkiler ve iş verimliliğini düşürür. Temizlik sorunları çözülmedikçe, iş için tamamen elverişsiz bir ortam oluşmaya başlar.",
    "bag-evlerinin-temizliyi":
      "Doğanın tadını çıkarmak için bir bağ evi harika bir seçenek olsa da, bakımsız bir bahçe veya havuz pek de iç açıcı olmaz. Temizlemeye başlasanız, bahçe sezonu bitene kadar uğraşırsınız. 166 Temizlik Hizmeti, yılın her mevsimi için bağ evinizi size hazır hale getirmek üzere temizlik ve bahçe bakım işlerini üstlenir.",
    "erazi-temizliyi":
      "166 Temizlik Hizmeti; konut binalarının, alışveriş merkezlerinin, otellerin, dinlenme tesislerinin, okulların ve diğer binaların çevre temizliğini gerçekleştirir. Profesyonel temizlik ekibimiz, alan temizliği sırasında özel ekipman ve malzemeler kullanmaktadır.",
    "fasad-temizliyi":
      "Binaların dış cephesinin temiz olması, bir şirket hakkında ilk izlenim için oldukça önemlidir. Bu işi 166 Temizlik Hizmeti’nin profesyonel ekibine emanet etmek ise en doğru karardır. Bakü’de çok katlı binaların sayısı göz önünde bulundurulduğunda, cephe temizliği yüksek riskli bir alan olarak değerlendirilir.",
    "pencere-temizliyi":
      "Binaların dış cephesinin temiz olması, bir şirket hakkında ilk izlenim için oldukça önemlidir. Bu işi 166 Temizlik Hizmeti’nin profesyonel ekibine emanet etmek ise en doğru karardır. Bakü’de çok katlı binaların sayısı göz önünde bulundurulduğunda, cephe temizliği yüksek riskli bir alan olarak değerlendirilir.",
    "cilciraq-temizliyi":
      "** Temizlik süreci aşağıdaki şekilde gerçekleştirilir: • Avize elektrikten kapatılır; • Plafonlar temizleyici maddelerle ıslatılır; • Su lekelerini temizlemek ve parlaklık kazandırmak için tamamen kurulanır.**",
    "perde-yuma":
      "Evin dekorasyonunda özel bir yeri olan perdelerin temizliği oldukça önemli bir konudur. Profesyonel perde yıkama ekibimiz; ipek, tül, keten ve diğer perde türlerinizi ve jaluzilerinizi söker, özel bir yöntemle yıkar, havalandırmalı odada tamamen kurutur, ütüler ve belirlenen tarihte size teslim eder.",
    "yumsaq-mebel-temizlenmesi":
      "Günlük olarak kullanılan koltuk, berjer ve sandalye gibi mobilyaların kirlenme olasılığı oldukça yüksektir. Her eşya gibi, yumuşak mobilyaların da düzenli olarak temizlenmesi şarttır. Temizlenmeyen mobilyalar gerçek bir bakteri yuvasına dönüşür, ayrıca kirler kumaşın rengini soldurur ve eskimiş bir görünüm verir.",
    etirlendirme:
      "Kötü kokulara karşı etkili bir yöntem. Evde, ofiste ya da herhangi bir mekânda oluşan kötü kokular sizi ve çevrenizdekileri rahatsız edebilir. Bu sorunu ortadan kaldırmak için profesyonel yöntemler kullanmak gerekir. Eğer mekânınızdaki kötü kokulardan kurtulmak istiyorsanız, bize başvurabilirsiniz.",
    "baximsiz-ev-temizliyi":
      "Temizlik bizim işimizdir. En bakımsız durumlarda bile — yaşlılar, yatalak hastalar ve bakıma muhtaç kişilerin evlerinin temizliğini üstleniyor, özel kimyasal çözümler ve modern ekipmanlarla evinizi tertemiz hale getiriyoruz.",
    "yangindan-sonra-ev-temizliyi":
      "Yangının verdiği zararı geri getiremesek de, bu istenmeyen olayın izlerini tamamen temizleyebiliriz! Gerekli ekipmanlar olmadan yangın sonrası oluşan is, toz ve kir lekelerini temizlemek oldukça zordur. Bu nedenle profesyonel yardım almanız gerekir.",
    "temir-sonrasi-temizlik":
      "Tadilat sonrası temizlik sırasında kapı ve pencerelere zarar vermeden koruyucu bantları çıkarmak, zemini çizmeden boya ve yapıştırıcı lekelerini temizlemek gerekir. Bu işleri yapmak, yeni evinizin keyfini çıkarmanıza engel olabilir. 166 Temizlik Hizmeti bu zorlu süreci sizin yerinize üstlenir! Profesyonel temizlik ekibi, özel temizlik malzemeleri ve ekipmanlarla her ölçekteki daire ve mekânın tadilat sonrası temizliğini titizlikle gerçekleştirir.",
    "otel-temizlenmesi":
      "İnsanlar otel seçerken, konumuna, göz alıcı iç tasarımına ve uygun fiyatına dikkat ettikleri kadar, temiz ve hijyenik olmasına da önem verirler. Bu nedenle tercih edilen oteller listesinde yer almak istiyorsanız, temizliğe özen göstermeniz gerekir. 166 Temizlik Hizmeti’ne başvurarak profesyonel temizlik ayrıcalığını yaşayın!",
    "restoran-temizlenmesi":
      "Restoranların son derece temiz ve düzenli olması, insanlarda o mekânla ilgili olumlu bir izlenim oluşturur ve orada oturup oturmama kararını doğrudan etkiler. Restoran temizliği, öncelikle çalışan personelin ve müşterilerin güvenliği açısından son derece önemli bir unsurdur. Gıdaların sağlıklı bir şekilde hazırlanabilmesi için hijyen kurallarına mutlaka uyulmalıdır.",
    "kristallasdirma-xidmeti":
      "Bir mekanın iç mekanı kadar dış çevresinin görünümü de büyük rol oynar. Kireç ve lekeler bu alanlarda kaçınılmazdır ve misafirlere ya da mekânın önünden geçenlere hoş bir izlenim vermez.",
    "hovuz-temizlenmesi-xidmeti":
      "Günümüzde havuzlar; özel evlerin, villaların, bağ evlerinin yanı sıra fitness merkezlerinin, spor salonlarının, kadın güzellik ve sağlık merkezlerinin ve elbette aquaparkların vazgeçilmez bir parçasıdır. Şehrimizde bu tür havuzların oldukça fazla sayıda olduğunu göz önünde bulundurduğumuzda, Bakü’de havuz temizliği hizmetine duyulan ihtiyaç da oldukça fazladır. Bildiğiniz gibi, spor salonları ve aquaparklardaki havuzları gün içinde onlarca kişi kullanıyor ve düzenli temizlik ile dezenfeksiyon yapılmadığı takdirde bu havuzlar bakteri ve hastalık taşıyıcısına dönüşebilir.",
    "korporativ-temizlik-xidmeti":
      "Kurumsal iş birliği, şirketimizin başlıca önceliklerinden biridir. Kurumsal müşterilerimize sunduğumuz indirimler, hem iş süreçlerinin kolaylaşmasına hem de iş ortaklarımızın memnuniyetine katkı sağlamaktadır.",
  },
};

function ServicesHero({
  locale,
  title,
  image,
}: {
  locale: Locale;
  title?: string;
  image?: string;
}) {
  const copy = pageCopy[locale];

  return (
    <section className="bg-[#f7f7f7] pb-8">
      <div className="mx-auto w-[min(var(--site-container),calc(100%-40px))] max-sm:w-full">
        <div className="relative h-[400px] overflow-hidden max-md:h-[260px] max-sm:h-[210px]">
          <Image src={image || pageHeroAssets.blog} alt="" fill priority sizes="1140px" className="object-cover" />
          <div className="absolute inset-0 bg-black/38" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
            <h1 className="text-[29px] font-bold leading-tight max-md:text-[25px]">{title || copy.servicesTitle}</h1>
            <p className="mt-3 text-[17px] font-semibold max-md:text-[14px]">{copy.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceListCard({
  service,
  reverse,
  locale,
}: {
  service: (typeof servicePages)[number];
  reverse: boolean;
  locale: Locale;
}) {
  const copy = pageCopy[locale];

  return (
    <article
      className={`grid min-h-[271px] overflow-hidden rounded-[30px] bg-transparent max-md:grid-cols-1 ${
        reverse ? "md:grid-cols-[1fr_380px]" : "md:grid-cols-[380px_1fr]"
      }`}
    >
      <div className={`relative min-h-[271px] max-md:min-h-[220px] ${reverse ? "md:order-2" : ""}`}>
        <Image
          src={service.image || serviceListImages[service.slug]}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover object-top"
        />
      </div>
      <div className={`flex flex-col justify-center bg-white p-[30px] max-md:rounded-b-[30px] ${reverse ? "md:rounded-l-[30px]" : "md:rounded-r-[30px]"}`}>
        <h2 className="text-[22px] font-semibold leading-none text-black max-md:text-[20px]">{service.title}</h2>
        <p className="mt-5 max-w-[700px] text-[16px] font-normal leading-6 text-black/75 max-md:text-[15px]">{service.description}</p>
        <Link
          href={service.href}
          prefetch={false}
          className="mt-5 inline-flex w-fit rounded-full bg-brand-yellow px-6 py-3 text-[15px] font-medium leading-none text-black transition hover:bg-[#ffd900]"
        >
          {copy.readMore}
        </Link>
      </div>
    </article>
  );
}

async function getServiceCards(locale: Locale, page: WordPressContentItem | null) {
  const localizedServicePages = getLocalizedServicePages(servicePages, locale);
  const acfOverrides = getServiceListAcfOverrides(page);
  const fallbackServices = serviceOrder
    .map((slug) => localizedServicePages.find((service) => service.slug === slug))
    .filter((service): service is (typeof servicePages)[number] => Boolean(service))
    .map((service) => {
      const acfOverride = acfOverrides.get(service.slug);

      return {
        ...service,
        image: acfOverride?.image || serviceListImages[service.slug] || service.image,
        description: acfOverride?.description || serviceListDescriptions[locale][service.slug] || service.description,
      };
    });

  try {
    const response = await getWordPressServices(locale);
    if (response.items.length > 0) {
      const fallbackBySlug = new Map(fallbackServices.map((service) => [service.slug, service]));
      const wordpressBySlug = new Map(response.items.map((service) => [service.slug, service]));

      return serviceOrder
        .map((slug) => {
          const wpService = wordpressBySlug.get(slug);
          const fallback = fallbackBySlug.get(slug);
          const acfOverride = acfOverrides.get(slug);

          if (!fallback) {
            return null;
          }

          return {
            ...fallback,
            title: wpService?.title ?? fallback.title,
            image: acfOverride?.image || (wpService ? getWordPressImageUrl(wpService) : "") || fallback.image,
            description: acfOverride?.description || (wpService ? stripHtml(wpService.excerpt || wpService.content) : "") || fallback.description,
          };
        })
        .filter((service): service is (typeof fallbackServices)[number] => Boolean(service));
    }
  } catch {
    // Keep the frontend available if WordPress is temporarily unavailable.
  }

  return fallbackServices;
}

export async function ServicesPageContent({ locale = "az" }: { locale?: Locale }) {
  const page = await getStaticWordPressPage("services", locale);
  const orderedServices = await getServiceCards(locale, page);

  return (
    <SitePage active="services" locale={locale} currentSlug="services">
      <WordPressSeoSchema seo={page?.seo} />
      <ServicesHero locale={locale} title={page?.title} image={page?.featuredImage?.url} />
      <section className="relative overflow-hidden bg-[#f7f7f7] pb-20 pt-7 max-md:pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_7%_38%,rgba(255,236,20,0.22),transparent_34%),radial-gradient(circle_at_94%_48%,rgba(0,116,202,0.16),transparent_36%)]" />
        <div className="relative mx-auto flex w-[min(var(--site-container),calc(100%-40px))] flex-col gap-6">
          {orderedServices.map((service, index) => (
            <ServiceListCard key={service.slug} service={service} reverse={index % 2 === 1} locale={locale} />
          ))}
        </div>
      </section>
    </SitePage>
  );
}

export default function ServicesPage() {
  return <ServicesPageContent />;
}
