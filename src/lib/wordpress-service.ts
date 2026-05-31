import { stripHtml, type WordPressContentItem } from "@/lib/wordpress";

export type WordPressServiceContent = {
  title?: string;
  introImages: string[];
  introParagraphs: string[];
  includedImages: string[];
  includedTitle?: string;
  includedItems: string[];
  includedNote?: string;
  bottomText?: string;
  pricing?: WordPressServicePricing;
};

export type WordPressServicePricing = {
  features: {
    fourHours: string[];
    eightHours: string[];
  };
  prices: string[];
  noteHtml?: string;
};

export type WordPressCorporateSection = {
  title: string;
  text?: string;
  items: string[];
  image: string;
};

export type WordPressCorporateContent = {
  sections: WordPressCorporateSection[];
  partnersTitle?: string;
};

const serviceAcfPrefixes: Record<string, string[]> = {
  "ev-temizliyi-xidmeti": ["ev_temizliyi"],
  "ofis-temizliyi": ["ofis_temizliyi"],
  "bag-evlerinin-temizliyi": ["bag_evlerinin_temizliyi"],
  "erazi-temizliyi": ["erazi_temizliyi"],
  "fasad-temizliyi": ["fasad_temizliyi"],
  "pencere-temizliyi": ["pencere_temizliyi"],
  "cilciraq-temizliyi": ["cilciraq_temizliyi"],
  "perde-yuma": ["perde_ve_jaluz_yuma"],
  "yumsaq-mebel-temizlenmesi": ["yumsaq_mebeller"],
  etirlendirme: ["etirlendirme_xidmeti"],
  "baximsiz-ev-temizliyi": ["gozel_ev"],
  "yangindan-sonra-ev-temizliyi": ["yangindan_sonra"],
  "temir-sonrasi-temizlik": ["temir_sonrasi_temizlik"],
  "otel-temizlenmesi": ["otel_temizlenmesi"],
  "restoran-temizlenmesi": ["restoran_temizlenmesi"],
  "hovuz-temizlenmesi-xidmeti": ["hovuzlarin_temizliyi_xidmeti"],
  "kristallasdirma-xidmeti": ["kristallasdirma_xidmeti"],
};

type AcfEntry = {
  key: string;
  normalizedKey: string;
  value: unknown;
};

const entityMap: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": "\"",
  "&#039;": "'",
  "&ndash;": "-",
  "&mdash;": "-",
  "&#8211;": "-",
  "&#8212;": "-",
  "&#8220;": "\"",
  "&#8221;": "\"",
  "&#8217;": "'",
};

function normalizeAcfKey(key: string) {
  return key
    .toLowerCase()
    .replace(/[\u0259\u018f]/g, "e")
    .replace(/[\u0131\u0130]/g, "i")
    .replace(/[\u00f6\u00d6]/g, "o")
    .replace(/[\u00fc\u00dc]/g, "u")
    .replace(/[\u011f\u011e]/g, "g")
    .replace(/[\u015f\u015e]/g, "s")
    .replace(/[\u00e7\u00c7]/g, "c")
    .replace(/[əә]/g, "e")
    .replace(/[ıİ]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ü]/g, "u")
    .replace(/[ğ]/g, "g")
    .replace(/[ş]/g, "s")
    .replace(/[ç]/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function decodeEntities(value: string) {
  return value.replace(/&(?:nbsp|amp|quot|ndash|mdash);|&#(?:039|8211|8212|8220|8221|8217);/g, (entity) => entityMap[entity] ?? entity);
}

function toText(value: unknown) {
  if (typeof value === "string") {
    return stripHtml(decodeEntities(value)).trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  return "";
}

function getImageUrl(value: unknown): string {
  if (typeof value === "string") {
    return value.startsWith("http") || value.startsWith("/") ? value : "";
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  const record = value as Record<string, unknown>;

  if (typeof record.url === "string") {
    return record.url;
  }

  if (typeof record.source_url === "string") {
    return record.source_url;
  }

  if (record.sizes && typeof record.sizes === "object") {
    const sizes = record.sizes as Record<string, unknown>;
    const preferred = ["large", "medium_large", "medium", "thumbnail"];
    for (const size of preferred) {
      if (typeof sizes[size] === "string") {
        return sizes[size];
      }
    }
  }

  return "";
}

function getImageUrls(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => getImageUrls(item));
  }

  const image = getImageUrl(value);
  return image ? [image] : [];
}

function unique(values: string[]) {
  return values.filter((value, index, array) => value && array.indexOf(value) === index);
}

function numericSuffix(key: string) {
  return Number(key.match(/_(\d+)$/)?.[1] ?? 0);
}

function orderedTexts(entries: AcfEntry[], matcher: (entry: AcfEntry) => boolean) {
  return entries
    .filter(matcher)
    .sort((a, b) => numericSuffix(a.normalizedKey) - numericSuffix(b.normalizedKey))
    .map((entry) => toText(entry.value))
    .filter(Boolean);
}

function listTexts(value: unknown) {
  return typeof value === "string"
    ? Array.from(value.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi), (match) => toText(match[1])).filter(Boolean)
    : [];
}

function getCorporateBlocks(content: string) {
  return content
    .split(/(?=<h2\b)/i)
    .map((block) => {
      const title = toText(block.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1] ?? "");
      const text = toText(block.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "");
      const items = listTexts(block);
      const image = block.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1] ?? "";

      return { title, text: text || undefined, items, image };
    })
    .filter((block) => block.title);
}

export function getWordPressCorporateContent(item: WordPressContentItem): WordPressCorporateContent | undefined {
  const blocks = getCorporateBlocks(item.content);
  const images = Array.from(item.content.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi), (match) => match[1]);
  const sections = blocks.slice(0, 3).map((block, index) => ({
    ...block,
    image: images[index] ?? block.image,
  }));

  if (sections.length !== 3 || sections.some((section) => !section.image)) {
    return undefined;
  }

  return {
    sections,
    partnersTitle: blocks[3]?.title,
  };
}

function getPricing(entries: AcfEntry[]): WordPressServicePricing | undefined {
  const fourHours = entries.find((entry) => /_4_saat(?:_|$)/.test(entry.normalizedKey));
  const eightHours = entries.find((entry) => /_8_saat(?:_|$)/.test(entry.normalizedKey));
  const prices = orderedTexts(entries, (entry) => /_qiymet_\d+$/.test(entry.normalizedKey));
  const note = entries.find((entry) => entry.normalizedKey.includes("_qeyd"));
  const features = {
    fourHours: listTexts(fourHours?.value),
    eightHours: listTexts(eightHours?.value),
  };

  if (!features.fourHours.length || !features.eightHours.length || prices.length < 6) {
    return undefined;
  }

  return {
    features,
    prices,
    noteHtml: typeof note?.value === "string" ? note.value : undefined,
  };
}

export function getWordPressServiceContent(item: WordPressContentItem, slug: string): WordPressServiceContent {
  const allEntries = Object.entries(item.acf ?? {}).map(([key, value]) => ({
    key,
    normalizedKey: normalizeAcfKey(key),
    value,
  }));
  const prefixes = serviceAcfPrefixes[slug] ?? [];
  const entries = prefixes.length
    ? allEntries.filter((entry) => prefixes.some((prefix) => entry.normalizedKey.startsWith(prefix)))
    : allEntries;

  const introImages = unique(
    entries
      .filter((entry) => /_sekil_\d+$/.test(entry.normalizedKey))
      .sort((a, b) => numericSuffix(a.normalizedKey) - numericSuffix(b.normalizedKey))
      .flatMap((entry) => getImageUrls(entry.value))
  );
  const introParagraphs = orderedTexts(entries, (entry) => /_metn_[12]$/.test(entry.normalizedKey));
  const includedTitle = orderedTexts(entries, (entry) => /_metn_3$/.test(entry.normalizedKey))[0];
  const includedItems = orderedTexts(entries, (entry) => /_option_\d+$/.test(entry.normalizedKey));
  const includedNote = orderedTexts(entries, (entry) => /_metn_[45]$/.test(entry.normalizedKey))[0];
  const bottomText =
    orderedTexts(entries, (entry) => /_metn_son$/.test(entry.normalizedKey) || /_son$/.test(entry.normalizedKey))[0] ??
    undefined;
  const includedImages = unique(
    entries
      .filter((entry) => entry.normalizedKey.includes("qalereya") || entry.normalizedKey.includes("qaleraya"))
      .flatMap((entry) => getImageUrls(entry.value))
  );

  return {
    title: item.title,
    introImages,
    introParagraphs,
    includedImages,
    includedTitle,
    includedItems,
    includedNote,
    bottomText,
    pricing: getPricing(entries),
  };
}
