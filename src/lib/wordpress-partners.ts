import { getWordPressPage, getWordPressPartners, type WordPressImage, type WordPressPartner } from "@/lib/wordpress";

function partnersFromResponse(response: Awaited<ReturnType<typeof getWordPressPartners>>) {
  return Array.isArray(response) ? response : response.items;
}

export function getPartnerLogoUrl(partner: WordPressPartner) {
  return partner.logo?.url ?? "";
}

export async function getWordPressPartnerLogoUrls(locale: Parameters<typeof getWordPressPartners>[0]) {
  try {
    const response = await getWordPressPartners(locale);
    const partnerLogos = partnersFromResponse(response).map(getPartnerLogoUrl).filter(Boolean);
    if (partnerLogos.length) {
      return partnerLogos;
    }
  } catch {
    // The production API may not expose /partners; page ACF remains the source of truth.
  }

  try {
    const page = await getWordPressPage("partnyorlar", locale);
    const logos = page.acf?.loqolar250x150px;
    if (!Array.isArray(logos)) {
      return [];
    }

    return logos
      .map((logo) => (logo && typeof logo === "object" && "url" in logo ? (logo as WordPressImage).url : ""))
      .filter(Boolean);
  } catch {
    return [];
  }
}
