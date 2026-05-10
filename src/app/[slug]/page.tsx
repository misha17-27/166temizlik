import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CleaningPackageCard } from "@/components/CleaningPackageCard";
import { ClockIcon } from "@/components/ClockIcon";
import { ServiceImageGallery } from "@/components/ServiceImageGallery";
import { SitePage } from "@/components/SiteChrome";
import { getLocalizedServicePages, homeCopy, pageCopy, type Locale } from "@/lib/i18n";
import { blogPosts, pageHeroAssets, servicePages } from "@/lib/pages-data";
import { site } from "@/lib/site-data";

const packageTitles: Record<Locale, { four: string; eight: string }> = {
  az: { four: "4 saat", eight: "8 saat" },
  ru: { four: "4 часа", eight: "8 часов" },
  tr: { four: "4 saat", eight: "8 saat" },
};

type ServicePageItem = (typeof servicePages)[number];

const detailImageSets: Record<string, string[]> = {
  "ev-temizliyi-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-8-1.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyiiii.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-ve-cilciraq-temizliyi-her-ikisine-geder.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/metbex-temizliyi3.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-1.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-3.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-5.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-6.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-7.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/ev-temizliyi-12-1.webp",
  ],
  "ofis-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8062.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8110.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8224.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8093.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8070.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8016.jpg",
  ],
  "bag-evlerinin-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2024/05/t-mzilik-xidm-ti.webp",
    "https://166temizlik.az/wp-content/uploads/2024/05/toz-alma-xidm-ti4-1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03584-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03584.webp",
  ],
  "erazi-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/02/erazi2-1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/02/erazi3-1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/02/6237238ed7fec9df2f8a5ef54160bf80-1.png",
  ],
  "fasad-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/02/fasad1-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/02/fasad2-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/03/fasad.webp",
  ],
  "pencere-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2024/05/p-nc-r-t-mizliyi.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/pencere-temizliyi-metbex-temizliyi-fon.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/01/dfd32fe24f874a0cd8dc95b23407c965-1.png",
    "https://166temizlik.az/wp-content/uploads/2023/01/3b383dbaea1ce2ccb0be116ccaac03cf-1.png",
    "https://166temizlik.az/wp-content/uploads/2023/07/pencere-temizliyi-metbex-temizliyi.-1.webp",
    "https://166temizlik.az/wp-content/uploads/2023/07/pencere-temizliyi-metbex-temizliyi..-1.webp",
  ],
  "cilciraq-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03718.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03721.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03722.webp",
    "https://166temizlik.az/wp-content/uploads/2023/01/cilciraq4.jpg",
  ],
  "perde-yuma": [
    "https://166temizlik.az/wp-content/uploads/2023/05/222.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08248-1.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08207.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/DSC08236.jpg",
  ],
  "yumsaq-mebel-temizlenmesi": [
    "https://166temizlik.az/wp-content/uploads/2024/01/WhatsApp-Image-2023-12-20-at-21.06.50-2.webp",
    "https://166temizlik.az/wp-content/uploads/2023/02/yumshaq2.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/03/mebel.webp",
  ],
  etirlendirme: [
    "https://166temizlik.az/wp-content/uploads/2023/02/etir.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/02/6f736f7db92cef24bb99d694c2e7c2c6-1-1.png",
    "https://166temizlik.az/wp-content/uploads/2023/02/Air_Purifier_iStock_607646922.7.webp",
  ],
  "baximsiz-ev-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/01/e427f74ecdda74a13f0ddf96c4a31341-1.png",
    "https://166temizlik.az/wp-content/uploads/2023/01/6c0c0d48bb70a4c7a8634111438b8b97-1.png",
    "https://166temizlik.az/wp-content/uploads/2023/02/gozel222-1.webp",
  ],
  "yangindan-sonra-ev-temizliyi": [
    "https://166temizlik.az/wp-content/uploads/2023/01/yangin222.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/01/yangin333.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/03/yangin.jpg",
  ],
  "temir-sonrasi-temizlik": [
    "https://166temizlik.az/wp-content/uploads/2023/02/fit_960_530_false_crop_1000_562_0_52_q90_2709852_1b72823ed32f1521bbdb3e471.webp",
    "https://166temizlik.az/wp-content/uploads/2023/02/XXL-1.webp",
    "https://166temizlik.az/wp-content/uploads/2023/02/8ff3e8c4c9.webp",
  ],
  "otel-temizlenmesi": [
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03405-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03522-1-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/12/HRS03357.webp",
  ],
  "restoran-temizlenmesi": [
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A7451.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A7802.jpg",
    "https://166temizlik.az/wp-content/uploads/2023/05/J1A8070.jpg",
  ],
  "kristallasdirma-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2024/02/image-89a.webp",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-83a.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-91.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-95as.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-95.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-92.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-94.jpg",
  ],
  "hovuz-temizlenmesi-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2024/02/image-89-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-83-1.webp",
    "https://166temizlik.az/wp-content/uploads/2024/02/image-48.webp",
  ],
  "korporativ-temizlik-xidmeti": [
    "https://166temizlik.az/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-16-at-13.35.38-1.jpeg",
    "https://166temizlik.az/wp-content/uploads/2023/02/business-partners.jpg",
    "https://166temizlik.az/wp-content/uploads/2024/09/DSCF2761.webp",
  ],
};

const serviceLongCopy: Record<string, string[]> = {
  "ev-temizliyi-xidmeti": [
    "Təmizliyinizi 166 Təmizlik Xidmətinin peşəkar komandasına həvalə etməklə vaxtınıza qənaət edin! İş və ailə həyatının bu qədər stresli olduğu bir vaxtda ev təmizliyinə saatlarınızı sərf etmək böyük enerji tələb edir. 166-ya bir zənglə və ya saytımıza yazmaqla istəyinizə uyğun “gündəlik” və “əsaslı” təmizlik xidməti sifariş edib, evinizdəki bütün təmizlik işlərini yoluna qoya bilərsiniz.",
    "Sizin üçün daha doğru qiymət təklifimizi formalaşdırmaq üçün ilkin mərhələdə evinizə baxış keçirilir və təmizlik paketlərimiz müştərilərimizin istəklərinə uyğun olaraq optimallaşdırılır. Beləcə, təmizlik paketinə istədiyiniz təmizliyi əlavə edə və ya çıxara bilərsiniz. Xidmət zamanı təmizlik işçilərinin sayı, təmizlik olunacaq saat və müddət müştərilərimizin istəyinə uyğun təyin olunur.",
  ],
  "ofis-temizliyi": [
    "Təmizlik sadəcə rahatlıq üçün yox eyni zamanda səmərəli iş üçün də vacibdir. Təmiz olmayan ofisdə toz və mikrob ofis əməkdaşlarının sağlamlığına təsir edir və onların əmək məhsuldarlığını azaldır. Təmizlik məsələləri həll olunmadığı müddətcə iş üçün tamamilə uyğun olmayan mühit yaranmağa başlayır.",
    "166 Təmizlik Xidməti ofis büdcənizə təsir etmədən, müxtəlif xidmət paketləri ilə sizə uyğun ofis təmizliyini təklif edir. Təmizləmə işi ofisin xüsusiyyətləri və müştərinin istəkləri nəzərə alınaraq həyata keçirir. Peşəkar işçi heyətimiz müəyyənləşdirdiyiniz zaman kəsiyində ofisinizdə təmizliyi bərpa edəcək.",
  ],
  "bag-evlerinin-temizliyi": [
    "Təbiətdən zövq almaq üçün bağ evi əla seçim olsa da, baxımsız vəziyyətdəki bağ, hovuz heç də ürəkaçan olmur. Təmizləməyə başlasanız, bağ mövsümünün sonuna qurtararsınız.",
    "166 Təmizlik Xidməti ilin bütün fəsilləri üçün bağ evinizi sizə hazır vəziyyətə salmaq üçün təmizlik və bağa qulluğu işlərini öz üzərinə götürür. Sürətli iş rejimi ilə qısa zamanda bağ eviniz təmizlənərək istifadənizə verilir. Bağların təmizliyinə zibillərin yığılması, payız mövsümündə xəzəllərin təmizlənməsi, həmçinin istəyinizə uyğun digər xidmətlərin də görülməsi daxildir.",
  ],
  "erazi-temizliyi": [
    "166 Təmizlik xidməti yaşayış binalarının, alış-veriş mərkəzlərinin, mehmanxanaların, istirahət mərkəzlərinin, məktəblərin və başqa binaların ətraf mühitinin təmizləmə işlərini həyata keçirir.",
    "Peşəkar təmizlik komandamız ərazi təmizliyi zamanı xüsusi avadanlıq və vasitələrdən istifadə edir. Bir sözlə, əməkdaşlarımız sizə uyğun zaman aralığında müəyyənləşdirdiyiniz təmizlik işlərini həyata keçirərək yaşadığınız ərazini istifadəyə yararlı vəziyyətə gətirəcək.",
  ],
  "fasad-temizliyi": [
    "Binaların xaricinin təmiz olması şirkət haqqında ilk təəssürat üçün vacibdir. Bu işi 166 Təmizlik Xidmətinin peşəkar komandasına həvalə etmək isə ən düzgün qərardır. Bakıda çoxmərtəbəli binaların sayını nəzərə alaraq, fasadlarının təmizlənməsi yüksək risk zonasına daxildir. Bu səbəbdən təmizlik zamanı əmək təhlükəsizliyinə ciddi riayət edilməlidir.",
    "166 Təmizlik Xidməti xüsusi təchizatlı qaldırıcı sistemi ilə ən hündür yerlərin də təmizliyini həyata keçirir. İstifadə etdiyimiz təmizləyici maddələr heç bir şüşə və metal səthə ziyan vurmur.",
  ],
  "pencere-temizliyi": [
    "Yüksək mərtəbəli binalarda pəncərə təmizliyi həm çətin, həm də təhlükəli bir prosesdir. Təmir sonrası təmizlikdə isə ən çətin məsələ pəncərələrdən montaj lentlərinin təmizlənməsidir.",
    "166 Təmizlik Xidməti ilə pəncərələrinizin gündəlik və təmir sonrası təmizliyi indi daha da asan olacaq. Təmizlik üçün peşəkar təmizlik komandamız hər zaman xidmətinizdədir.",
  ],
  "cilciraq-temizliyi": [
    "Çilçiraq təmizliyi zamanı platformalar tərəfimizdən təmin edilir. Təmizləmə prosesi aşağıdakı qaydada həyata keçirilir: Çilçiraq elektrikdən söndürülür; Plafonlar yuyucu maddələr vasitəsi ilə isladılır; Su ləkələrini təmizləmək və parlaqlıq vermək üçün təmamilə qurudulur;",
    "166 Təmizlik xidməti sizin büdcənizə uyğun müxtəlif təmizlik paketlərini təqdim edir. Təmizlik xidməti sizin seçiminiz əsasında olur. Təmizlik paketləri seçərkən bizim əməkdaşlarımız da sizin istəklərinizə uyğun tövsiyələr verəcək.",
  ],
  "perde-yuma": [
    "Evin dekorunda xüsusi rolu olan pərdələrin təmizliyi çox önəmli bir məsələdir. Peşəkar pərdə yuma komandamız ipək, tül, kətan və digər növ pərdələrinizi və jalüzlərinizi çıxarır xüsusi metoddan istifadə etməklə yuyur, havalandırma otağında təmamilə qurudur, ütüləyir və təyin olunmuş tarixdə sizə təhvil verir.",
    "Pərdələrin çıxarılması və yuyulduqdan sonra təkrar yerinə asılması ödənişsizdir. Nəzərinizə çatdıraq ki, pərdələrin asılması üçün istifadə olunan asılqanlar şirkət tərəfimizdən təmin edilir. Pərdə yuma xidməti Abşeron yarımadasının istənilən nöqtəsinə xidmət göstərir.",
  ],
  "yumsaq-mebel-temizlenmesi": [
    "Gündəlik istifadə olunan divan, kreslo və stul kimi mebellərin kirlənmə ehtimalı çox yüksəkdir. Hər əşya kimi yumşaq mebelləri də mütəmadi olaraq təmizləmək mütləqdir. Mebellər təmizlənmədikdə əsl bakteriya yuvası olur, həmçinin çirk onların rəngini soldurur və köhnə görkəm verir. 166 Təmizlik Xidməti ilə yumşaq mebellərinizi yenisi ilə əvəz etməyə gərək qalmayacaq.",
    "Xüsusi avadanlıqlar və yumşaq mebelə qulluq etmək üçün tətbiq edilən keyfiyyətli təmizləyici vasitələr ilə təmizlənən yumşaq mebelləriniz təzə kimi tərtəmiz olacaq. Sifariş zamanı mebeldəki ləkələr xüsusi ləkəçıxarıcı maddələrlə təmizlənir, fırça vasitəsilə fırçalanır. Ləkələrdən tam azad olduqdan sonra, mebeldəki su vaakum aparatı ilə çəkilir.",
  ],
  etirlendirme: [
    "Xoşagəlməz qoxulara qarşı effektiv üsül. Evdə, ofisdə və ya obyektdə olan pis qoxular sizi və ətrafınızdakı insanları narahat edə bilər. Bu problemi aradan qaldırmaq üçün peşəkar üsullardan istifadə etmək lazımdır. Belə ki, məkanlardakı pis qoxulardan azad olmaq istəyirsinizsə, bizə müraciət edə bilərsiniz.",
    "166 Təmizlik xidməti sizin büdcənizə uyğun müxtəlif təmizlik paketlərini təqdim edir. Təmizlik xidməti sizin seçiminiz əsasında olur. Təmizlik paketləri seçərkən bizim əməkdaşlarımız da sizin istəklərinizə uyğun tövsiyələr verəcək.",
  ],
  "baximsiz-ev-temizliyi": [
    "Təmizlik bizim işimizdir. Ən baxımsız halda yəni – yaşlı insanların, yataq xəstələrinin, qayğıya ehtiyacı olan şəxslərin evlərinin təmizliyini öz üzərimizə götürüb, xüsusi kimyəvi məhlullar və müasir avadanlıqlar vasitəsilə evinizi tərtəmiz edirik. Peşəkar komandamız ləkələr ilə mübarizə aparmaq üçün 54 gizli nou-haudan istifadə edir, hətta inadkar hesab etdiyiniz ləkələri belə təmizləyə bilirik.",
    "Təmizlik xidməti sizin seçiminiz əsasında olur. Təmizlik paketləri seçərkən bizim əməkdaşlarımız da sizin istəklərinizə uyğun tövsiyələr verəcək. Təmizlik firması olaraq sizə ən təmiz xidməti göstərməyə çalışırıq.",
  ],
  "yangindan-sonra-ev-temizliyi": [
    "Yanğından dəyən zərəri geri qaytara bilməsəkdə, bu arzuolunmaz hadisənin izlərini birdəfəlik təmizləyərik! Lazımlı vasitələr olmadan yanğın nəticəsində yaranan his, toz və qubar ləkələrinin təmizlənməsi olduqca çətindir. Ona görə də peşəkar kömək almalısınız.",
    "Yanğın təmizliyi üzrə ixtisaslaşmış əməkdaşlarımız xüsusi maddələrdən istifadə edərək yanğının törətdiyi ləkə və izləri maksimum azaldaraq təhvil verəcək. Fasadın üzərindən his və qubarın xüsusi apparat vasitəsi ilə yuyulması da xidmətə daxildir.",
  ],
  "temir-sonrasi-temizlik": [
    "Təmir sonrası təmizlik zamanı qapı və pəncərələri zədələmədən qoruyucu lentləri çıxartmaq, döşəməni cızmadan boya və kley ləkələrini təmizləmək lazımdır. Bu işləri görmək sizə yeni evinizdən zövq almağa imkan vermir. 166 Təmizlik Xidməti sizə belə çətin vəziyyətdən çıxmağa kömək olacaq! Peşəkar təmizlik komandası xüsusi təmizlik vasitələri və xüsusi avadanlıqlarla istənilən ölçüdə mənzil və obyektlərin təmir sonrası təmizlik işlərini həyata keçirir.",
    "Təmizlik prosesinə tikinti materialları, qarışıqlar, ləkələr, yapışqan, qoruyucu lent, sement tozu, boya qalıqları və başqa çirklənmələrin aradan qaldırılması daxildir. Tullantıların yığılmasından ən kiçik sənaye ləkələrinin təmizlənməsinə qədər hər bir detal təmizlənərək mənzil və obyektləriniz qısa zamanda istifadənizə verilir. Biz sizə evinizi və iş yerinizi tam təmiz şəkildə təhvil verəcəyik.",
  ],
  "otel-temizlenmesi": [
    "İnsanlar otel seçərkən onun yerləşdiyi yerə, göz oxşayan interyerə, münasib qiymətə fikir verməklə yanaşı, onun təmiz və gigiyenik olmasına da nəzər yetirir. Ona görə də seçilən otellər siyahısında olmaq istəyirsinizsə təmizliyin qeydinə qalmaq lazımdır. 166 Təmizlik Xidmətinə müraciət edib, peşəkar təmizlikdən zövq alın!",
    "Təmizlik xidməti sizin seçiminiz əsasında olur. Belə ki, daha mükəmməl təmizlik üçün premium paketi seçə bilərsiniz. Bundan əlavə saatlıq paketlər də sizin üçün münasib hesab edilir. Təmizlik paketləri seçərkən bizim əməkdaşlarımız da sizin istəklərinizə uyğun tövsiyələr verəcək.",
  ],
  "restoran-temizlenmesi": [
    "Restoranların olduqca təmiz və səliqəli olması insanlarda həmin yer ilə bağlı müsbət təəsürat yaradır və orada oturub oturmama qərarlarına birbaşa təsir edir. Restoranların təmizliyi ilk öncə orada işləyən işçi heyətinin və müştərilərinin təhlükəsizliyi üçün olduqca vacib nüansdır.",
    "Gigiyenik qaydalara riayət edilməlidir ki, qidalar sağlam şəkildə hazırlansın. Biznesin inkişafını, müştəri məmnuniyyətini düşünürsünüzsə, həmçinin restoranın yaxşı reputasiya qazanmasını istəyirsinizsə, 166 Təmizliklik Xidmətinə müraciət edib peşəkar təmizlikdən yararlana bilərsiniz.",
  ],
  "kristallasdirma-xidmeti": [
    "Məkanın daxili ilə yanaşı, onun zahiri ətraf sahəsinin də görkəmi böyük rol oynayır. Ərp və ləkələr ərazidə qaçılmazdır. Qonaqlara və ya məkanın önündən keçənlərə heç də xoş təəssürat bağışlamır. 166 təmizlik xidməti yaşayış binalarının, alış-veriş mərkəzlərinin, mehmanxanaların, istirahət mərkəzlərinin, istehsalat müəssisələrinin, məktəb və s. kimi yerlərin ərazilərinin təmizliyini həyata keçirir. Ərazi təmizliyi daha çox qış vaxtlarında və təmir sonrası problem yaşadır. Və bu halda xüsusi avadanlıq, alət və vasitələrə tələb duyulur.",
    "Biz müxtəlif ölçülü, çirklənmə dərəcəli və müxtəlif mürəkkəblikdə iş tələb edən ərazi təmizliyini peşəkarlıqla kristallaşma apparatı vasitəsi ilə öhdəsindən gəlirik. Bu işi 166 Təmizlik Xidmətinin peşəkar komandasına həvalə etmək ən düzgün qərardır.",
  ],
  "hovuz-temizlenmesi-xidmeti": [
    "Hal-hazırda hovuzlar şəxsi evlərin, villaların, bağ evlərinin, həmçinin fitnes mərkəzləri, idman zalları, qadın gözəllik və sağlamlıq mərkəzləri və əlbətdə ki, akvaparkların əvəzedilməz hissəsidir. Şəhərimizdə belə çox miqdarda hovuzların olduğunu nəzərə alaraq Bakıda hovuzların təmizlənməsi xidmətinə ehtiyac yetərincə çoxdur. Bildiyimiz kimi gün ərzində idman zalları, akvaparklardaki hovuzlardan onlarla insan istifadə edir və müntəzəm təmizlik və dezinfeksiya edilmədiyi halda onlar bakteriya və xəsətəlik daşıyıcısıdırlar. Aydındır ki, hovuzlar kafel ilə yığılır və kafel aralıqları çirk, bakteriya və xəstəlik yuvasıdır. Bu risk mozaik kafeldə bir neçə qat artır. Hovuz təmizliyi yetərincə əmək, təcrübə, xüsusi avadanlıq və təmizləyici vasitələr tələb edən prosedurdur.",
    "166 təmizlik xidməti-nin hovuz təmizliyi xidməti bütün növ sahəli, relyefli və səthli hovuzların təmizliyinin tətbiqini təqdim edir. Təmizlik zamanı xüsusi Alman məhsullarından istifadə edilir. Xidmət sifarişçinin istəyindən asılı olaraq birdəfəlik və ya müntəzəm həyata keçirilir.",
  ],
  "korporativ-temizlik-xidmeti": [
    "Korporativ əməkdaşlıq şirkətimizin əsas prioritetlərindən biridir. Korporativ müştərilərimiz üçün nəzərdə tutduğumuz güzəştlər həm iş prosesinin asanlaşmasına həm də biznes partnyorlarımızın məmnunluguna səbəb olur.",
    "Təmizlik xidmətləri üzrə korporativ təkliflər, sifarişlərin xüsusi proqramda izlənilməsi, müştərilərin təklif və iradlarını öyrənən müştəri məmnuniyyəti zəngləri, peşəkar işçi heyəti və köçürmə vasitəsi ilə asan ödəmə imkanı təqdim edirik.",
  ],
};

export function generateStaticParams() {
  return [...servicePages.map((service) => ({ slug: service.slug })), ...blogPosts.map((post) => ({ slug: post.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  const post = blogPosts.find((item) => item.slug === slug);

  return {
    title: service ? `${service.title} - 166 Təmizlik` : post ? `${post.title} - 166 Təmizlik` : "166 Təmizlik",
    description: post?.excerpt,
  };
}

export function ServiceDetailContent({ slug, locale = "az" }: { slug: string; locale?: Locale }) {
  const localizedServicePages = getLocalizedServicePages(servicePages, locale);
  const service = localizedServicePages.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const copy = pageCopy[locale];
  const images = detailImageSets[service.slug] ?? [service.image];
  const paragraphs =
    locale === "az"
      ? serviceLongCopy[service.slug] ?? [
          service.description,
          "166 Təmizlik Xidməti bu istiqamətdə peşəkar komanda, müasir avadanlıq və keyfiyyətli təmizləyici vasitələrlə xidmət göstərir. Sifarişin həcmi, məkanın vəziyyəti və müştərinin istəyinə uyğun olaraq xidmət planı formalaşdırılır.",
        ]
      : [service.description, copy.bottomText];
  const heroImage = service.slug === "korporativ-temizlik-xidmeti" ? pageHeroAssets.partners : pageHeroAssets.blog;

  return (
    <SitePage active="services" locale={locale} currentSlug={service.slug} routeKind="service">
      <DetailHero title={service.title} heroImage={heroImage} subtitle={copy.subtitle} />
      <IntroBlocks service={service} images={images} paragraphs={paragraphs} />
      <IncludedSection service={service} images={images} locale={locale} />
      <PackagesAndNote locale={locale} />
      <OrderFormSection serviceTitle={service.title} locale={locale} />
      <BottomImageCta locale={locale} />
    </SitePage>
  );
}

function getGalleryImages(images: string[]) {
  const source = images.length > 5 ? images.slice(2) : images;

  return Array.from({ length: 8 }, (_, index) => source[index % source.length]);
}

function DetailHero({ title, heroImage, subtitle }: { title: string; heroImage: string; subtitle: string }) {
  return (
    <section className="bg-[#f7f7f7]">
      <div className="mx-auto w-[min(1140px,calc(100%-40px))] max-sm:w-full">
        <div className="relative h-[400px] overflow-hidden max-lg:h-[320px] max-md:h-[230px]">
          <Image src={heroImage} alt="" fill priority sizes="1140px" className="object-cover" />
          <div className="absolute inset-0 bg-black/38" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white">
            <h1 className="text-[28px] font-bold leading-tight max-md:text-[23px]">{title}</h1>
            <p className="mt-3 text-[16px] font-semibold max-md:text-[13px]">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FramedImage({
  src,
  alt,
  tone = "yellow",
  heightClass = "h-[369px]",
}: {
  src: string;
  alt: string;
  tone?: "yellow" | "blue";
  heightClass?: string;
}) {
  return (
    <div className={`relative p-[10px] max-md:h-[250px] ${heightClass} ${tone === "yellow" ? "bg-brand-yellow" : "bg-brand-blue"}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 400px" className="object-cover p-[10px]" />
    </div>
  );
}

function IntroTextCard({
  children,
  reverse = false,
  heightClass = "h-[349px]",
}: {
  children: React.ReactNode;
  reverse?: boolean;
  heightClass?: string;
}) {
  return (
    <div
      className={`mt-5 flex items-center bg-white p-[30px] text-[16px] font-medium leading-[24px] text-black shadow-[5px_10px_10px_rgb(0_0_0_/_11%)] max-md:mt-0 max-md:h-auto max-md:p-6 ${heightClass} ${
        reverse
          ? "mr-[30px] rounded-[30px_0_0_30px] max-lg:mr-0 max-md:rounded-[20px]"
          : "ml-[30px] rounded-[0_30px_30px_0] max-lg:ml-0 max-md:rounded-[20px]"
      }`}
    >
      {children}
    </div>
  );
}

function IntroBlocks({ service, images, paragraphs }: { service: ServicePageItem; images: string[]; paragraphs: string[] }) {
  return (
    <section className="bg-[#f7f7f7] pb-14 pt-[50px]">
      <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
        <div className="grid grid-cols-[396px_1fr] items-start gap-0 max-lg:grid-cols-1">
          <FramedImage src={images[0]} alt={service.title} />
          <IntroTextCard>
            <p>{paragraphs[0]}</p>
          </IntroTextCard>
        </div>
        <div className="mt-[50px] grid grid-cols-[1fr_396px] items-start gap-0 max-lg:grid-cols-1">
          <IntroTextCard reverse heightClass="h-[286px]">
            <p>{paragraphs[1] ?? service.description}</p>
          </IntroTextCard>
          <FramedImage src={images[1] ?? images[0]} alt={service.title} tone="blue" heightClass="h-[306px]" />
        </div>
      </div>
    </section>
  );
}

function IncludedSection({ service, images, locale }: { service: ServicePageItem; images: string[]; locale: Locale }) {
  const copy = pageCopy[locale];
  const isHomeService = service.slug === "ev-temizliyi-xidmeti";
  const title = isHomeService ? copy.includedHome : service.title;
  const galleryImages = isHomeService ? getGalleryImages(images) : getGalleryImages(images).slice(0, 5);
  const windowPrices = [
    "1 ədəd standart ölçülü pəncərə təmizlənməsi – 10 azn-dən başlayır",
    "1 ədəd hündürlüyü 3 m -dən hündür ölçülü pəncərə təmizliyi – 30 azn-dən başlayır",
    "Vinil təmizliyi 1.5*2.2 kv metr üçün - 40 azn-dən başlayır",
    "Montaj lenti təmizliyi 1.5*1.5 m - 30 azn-dən başlayır",
  ];

  if (service.slug === "pencere-temizliyi") {
    return (
      <section className="bg-[#f7f7f7] pb-12">
        <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
          <h2 className="text-center text-[20px] font-semibold text-black max-md:text-[18px]">Pəncərə təmizlənməsi qiymətləri</h2>
          <div className="mt-[50px] grid grid-cols-[520px_470px] items-start justify-center gap-[35px] max-lg:grid-cols-1">
            <ServiceImageGallery images={images.slice(2, 6)} title={service.title} layout="quad" />
            <div className="flex flex-col gap-5">
              {windowPrices.map((item, index) => (
                <div
                  key={item}
                  className={`flex min-h-[64px] items-center justify-center rounded-[8px] border bg-white px-5 text-center text-[18px] font-medium leading-[21px] text-black max-md:text-[15px] ${
                    index % 2 === 0 ? "border-[#008cfd]" : "border-[#ffd600]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f7f7f7] pb-12">
      <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
        <h2 className="text-center text-[20px] font-semibold text-black max-md:text-[18px]">{title}</h2>
        {isHomeService ? (
          <div className="mt-[30px] grid grid-cols-[632px_508px] gap-0 max-lg:grid-cols-1">
            <div className="w-full">
              <ServiceImageGallery images={galleryImages} title={service.title} />
            </div>
            <div className="flex flex-col gap-5 px-[30px] max-lg:mt-8 max-lg:px-0">
              {service.bullets.map((item, index) => (
                <div
                  key={item}
                  className={`flex h-[52px] items-center justify-center rounded-[8px] border bg-white px-4 text-center text-[20px] font-medium leading-[20px] text-black max-md:text-[16px] ${
                    index % 2 === 0 ? "border-[#008cfd]" : "border-[#ffd600]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-[60px]">
            <ServiceImageGallery images={galleryImages} title={service.title} layout="row" />
          </div>
        )}
        <p className="mt-9 text-center text-[13px] font-semibold text-black">
          {copy.serviceCare}
        </p>
      </div>
    </section>
  );
}

function HourlyCards({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];

  return (
    <div className="grid grid-cols-5 gap-5 max-lg:grid-cols-3 max-sm:grid-cols-1">
      {copy.hourlyPrices.map((price) => (
        <article key={price.time} className="rounded-[12px] bg-white px-4 py-5 text-center shadow-[0_6px_20px_rgb(0_116_202_/_7%)]">
          <div className="mx-auto mb-3 grid h-[42px] w-[42px] place-items-center rounded-full bg-[#95df22] text-white">
            <ClockIcon className="h-[23px] w-[23px]" strokeWidth={2.1} />
          </div>
          <h3 className="text-[15px] font-bold text-black">{price.time}</h3>
          <p className="mt-2 text-[11px] leading-[1.5] text-black">
            {price.city}
            <br />
            {price.village}
            <br />
            {copy.hourlyHelper}
          </p>
        </article>
      ))}
    </div>
  );
}

function NotePanel({ locale }: { locale: Locale }) {
  const copy = pageCopy[locale];

  return (
    <div className="mx-auto grid max-w-[850px] grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-[14px] bg-brand-blue text-white max-md:grid-cols-1">
      <div className="relative min-h-[265px] overflow-hidden max-md:min-h-[220px]">
        <Image src={site.noteImage} alt={copy.noteTitle} fill sizes="360px" className="object-cover" />
        <div className="absolute -right-10 top-[-20%] h-[140%] w-[90px] rounded-[50%] border-r-[18px] border-[#ffd600] bg-brand-blue max-md:hidden" />
      </div>
      <div className="px-10 py-9 max-md:px-6">
        <h3 className="text-[22px] font-bold">{copy.noteTitle}</h3>
        <p className="mt-5 text-[13px] font-semibold leading-[1.6] text-white">
          {copy.noteText}
        </p>
      </div>
    </div>
  );
}

function PackagesAndNote({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const titles = packageTitles[locale];

  return (
    <section className="bg-[#f7f7f7] pb-20">
      <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
        <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
          <CleaningPackageCard title={titles.four} items={copy.packageFeatures.fourHours} priceKey="four" tone="blue" variant="detail" weeklyItems={copy.weeklyPrices} toggleLabels={copy.packageLabels} />
          <CleaningPackageCard title={titles.eight} items={copy.packageFeatures.eightHours} priceKey="eight" tone="yellow" variant="detail" weeklyItems={copy.weeklyPrices} toggleLabels={copy.packageLabels} />
        </div>
        <div className="mt-[92px] rounded-[30px] bg-[#e4efff] px-[42px] pb-[70px] pt-0 max-lg:px-8 max-md:mt-10 max-md:px-4 max-md:py-8">
          <div className="relative z-10 -translate-y-[54px] max-md:translate-y-0">
            <HourlyCards locale={locale} />
          </div>
          <div className="pt-[72px] max-md:pt-8">
            <NotePanel locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderFormSection({ serviceTitle, locale }: { serviceTitle: string; locale: Locale }) {
  const copy = pageCopy[locale];
  const serviceOptions = getLocalizedServicePages(servicePages, locale).map((service) => service.title);
  const orderedServiceOptions = [serviceTitle, ...serviceOptions.filter((title) => title !== serviceTitle)];

  return (
    <section className="relative overflow-hidden bg-[#eaf7ff] py-[95px]">
      <div className="absolute -right-16 bottom-[-90px] h-[420px] w-[520px] rotate-[-18deg] border-[42px] border-brand-blue max-md:hidden" />
      <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
        <form className="max-w-[430px]">
          <h2 className="text-[22px] font-semibold text-black">{copy.packagesTitle}</h2>
          <p className="mt-2 text-[12px] leading-[1.5] text-black/75">{copy.packagesIntro}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <input className="h-10 border-0 bg-white px-4 text-[12px] outline-none" placeholder={copy.formName} />
            <input className="h-10 border-0 bg-white px-4 text-[12px] outline-none" placeholder={copy.formPhone} />
          </div>
          <select className="mt-3 h-10 w-full border-0 bg-white px-4 text-[12px] text-black/70 outline-none" defaultValue={serviceTitle}>
            {orderedServiceOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
          <input className="mt-3 h-10 w-full border-0 bg-white px-4 text-[12px] outline-none" placeholder={copy.formAddress} />
          <textarea className="mt-3 h-[92px] w-full resize-none border-0 bg-white px-4 py-3 text-[12px] outline-none" placeholder={copy.formMessage} />
          <button type="button" className="mt-4 rounded-full bg-brand-yellow px-8 py-3 text-[12px] font-bold text-black">
            {copy.order}
          </button>
        </form>
      </div>
    </section>
  );
}

function BottomImageCta({ locale }: { locale: Locale }) {
  const copy = pageCopy[locale];

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-black text-white max-md:min-h-[430px]">
      <Image src="https://166temizlik.az/wp-content/uploads/2023/01/d5330e546919a7c0d9970c407935da78-1.jpeg" alt="" fill sizes="100vw" className="object-cover opacity-55" />
      <div className="relative mx-auto flex min-h-[600px] w-[min(1140px,calc(100%-40px))] items-center justify-end max-md:min-h-[430px] max-md:justify-center">
        <p className="max-w-[490px] text-[14px] font-semibold leading-[1.65] text-white">
          {copy.bottomText}
        </p>
      </div>
    </section>
  );
}

function BlogPostContent({ slug, locale = "az" }: { slug: string; locale?: Locale }) {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <SitePage active="about" locale={locale} currentSlug="blog">
      <section className="bg-[#f5f5f5] pb-16">
        <div className="mx-auto w-[min(1140px,calc(100%-40px))]">
          <div className="relative h-[430px] overflow-hidden max-md:h-[270px]">
            <Image src={post.image} alt={post.title} fill priority sizes="1140px" className="object-cover" />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 flex items-center justify-center px-5 text-center text-white">
              <h1 className="max-w-[850px] text-[36px] font-bold leading-tight max-md:text-[26px]">{post.title}</h1>
            </div>
          </div>
          <article className="mx-auto mt-10 max-w-[880px] rounded-[18px] bg-white px-10 py-10 shadow-[0_12px_30px_rgb(0_0_0_/_6%)] max-md:px-6 max-md:py-7">
            <p className="text-[18px] font-medium leading-[1.7] text-[#30313a] max-md:text-[16px]">{post.excerpt}</p>
            <div className="mt-8 space-y-5 text-[16px] font-normal leading-[1.85] text-[#3f4652]">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link href="/bloq/" className="mt-10 inline-flex rounded-full bg-brand-yellow px-7 py-3 text-[13px] font-bold text-black">
              Bloqa qayıt
            </Link>
          </article>
        </div>
      </section>
    </SitePage>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (blogPosts.some((post) => post.slug === slug)) {
    return <BlogPostContent slug={slug} />;
  }

  return <ServiceDetailContent slug={slug} />;
}
