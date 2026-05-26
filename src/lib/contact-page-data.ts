import type { Locale } from "./routes";
import type { WordPressContentItem, WordPressSettings } from "./wordpress";

type ContactSourcePage = Pick<
  WordPressContentItem,
  "title" | "excerpt" | "content" | "acf"
>;

type ContactLink = {
  value: string;
  href: string;
};

export type ContactPageData = {
  formTitle: string;
  contactTitle: string;
  questionsTitle: string;
  shortText: string;
  whatsappHref: string;
  phones: ContactLink[];
  email: ContactLink;
  address: ContactLink;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
};

const fallbackText: Record<
  Locale,
  Pick<
    ContactPageData,
    | "formTitle"
    | "contactTitle"
    | "questionsTitle"
    | "shortText"
    | "whatsappHref"
  >
> = {
  az: {
    formTitle: "Müraciət et, biz əlaqə saxlayaq!",
    contactTitle: "Bizimlə əlaqə",
    questionsTitle: "Suallarınız var?",
    shortText: "Xidmətlərimiz haqqında ətraflı öyrənmək istəyirsiniz?",
    whatsappHref: "https://api.whatsapp.com/send?phone=994502854477&text=Salam",
  },
  ru: {
    formTitle: "Оставьте заявку — мы свяжемся с вами!",
    contactTitle: "Свяжитесь с нами",
    questionsTitle: "Есть вопросы?",
    shortText: "Хотите узнать больше о наших услугах?",
    whatsappHref: "https://api.whatsapp.com/send?phone=994502854477&text=Salam",
  },
  tr: {
    formTitle: "Talep bırakın, sizinle iletişime geçelim!",
    contactTitle: "Bizimle iletişim",
    questionsTitle: "Sorularınız var mı?",
    shortText: "Hizmetlerimiz hakkında detaylı bilgi almak ister misiniz?",
    whatsappHref: "https://api.whatsapp.com/send?phone=994502854477&text=Salam",
  },
};

function decodeHtml(value: string) {
  return value
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function cleanText(value: unknown) {
  return typeof value === "string"
    ? decodeHtml(value)
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

function acfText(page: ContactSourcePage | null | undefined, key: string) {
  return cleanText(page?.acf?.[key]);
}

function normalizeTelHref(value: string) {
  const compact = value.replace(/[^\d+]/g, "");
  return compact ? `tel:${compact}` : "";
}

function normalizePhoneLabel(value: string) {
  const decoded = decodeURIComponent(decodeHtml(value))
    .replace(/^tel:/i, "")
    .trim();
  return decoded.replace(/\s+/g, " ");
}

function phoneKey(value: string) {
  const normalized = normalizePhoneLabel(value).replace(/[^\d+]/g, "");
  return normalized.startsWith("+")
    ? normalized
    : normalized.replace(/^\+?/, "");
}

function pushUniquePhone(items: ContactLink[], value: string, href?: string) {
  const label = normalizePhoneLabel(value);
  const link = href ? decodeHtml(href) : normalizeTelHref(label);
  const key = phoneKey(label);

  if (
    !label ||
    !link ||
    !key ||
    items.some(
      (item) =>
        item.href === link ||
        item.value === label ||
        phoneKey(item.value) === key ||
        phoneKey(item.href) === key,
    )
  ) {
    return;
  }

  items.push({ value: label, href: link });
}

function extractHeadings(content: string) {
  return Array.from(content.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi))
    .map((match) => cleanText(match[1]))
    .filter(Boolean);
}

function extractTelLinks(content: string) {
  return Array.from(content.matchAll(/href=["'](tel:[^"']+)["']/gi)).map(
    (match) => decodeHtml(match[1]),
  );
}

function extractMapHref(content: string) {
  const match = content.match(
    /href=["'](https?:\/\/(?:www\.)?google\.com\/maps[^"']+)["']/i,
  );
  return match ? decodeHtml(match[1]) : "";
}

export function buildContactPageData(
  page: ContactSourcePage | null,
  settings: WordPressSettings | null,
  locale: Locale,
): ContactPageData {
  const fallbacks = fallbackText[locale];
  const headings = extractHeadings(page?.content ?? "");
  const phones: ContactLink[] = [];

  pushUniquePhone(
    phones,
    acfText(page, "telefon") || settings?.phonePrimary || "166",
  );
  extractTelLinks(page?.content ?? "").forEach((href) =>
    pushUniquePhone(phones, href, href),
  );
  pushUniquePhone(
    phones,
    acfText(page, "mobil_telefon") || settings?.phoneSecondary || "",
    acfText(page, "mobil_telefon_link") || undefined,
  );

  const email =
    acfText(page, "email") || settings?.email || "info@166temizlik.az";
  const address =
    acfText(page, "unvan") ||
    settings?.address ||
    "Şəfayət Mehdiyev 134, Baku, Azerbaijan";
  const mapHref =
    extractMapHref(page?.content ?? "") || settings?.locationUrl || "";
  const whatsappHref =
    acfText(page, "whatsapp_link") ||
    settings?.social?.whatsapp ||
    fallbacks.whatsappHref;

  return {
    formTitle: headings[0] || fallbacks.formTitle,
    contactTitle: headings[1] || page?.title || fallbacks.contactTitle,
    questionsTitle:
      headings.find((heading) => /sual|вопрос|soru/i.test(heading)) ||
      headings[2] ||
      fallbacks.questionsTitle,
    shortText: acfText(page, "qisa_mətn") || fallbacks.shortText,
    whatsappHref,
    phones,
    email: {
      value: email,
      href: `mailto:${email}`,
    },
    address: {
      value: address,
      href: mapHref,
    },
    social: {
      facebook:
        acfText(page, "facebook") ||
        settings?.social?.facebook ||
        "https://www.facebook.com/166temizlik",
      instagram:
        acfText(page, "instagram") ||
        settings?.social?.instagram ||
        "https://www.instagram.com/166_temizlik/",
      youtube:
        acfText(page, "youtube") ||
        settings?.social?.youtube ||
        "https://www.youtube.com/@166tmizlikxidmti9/videos",
    },
  };
}
