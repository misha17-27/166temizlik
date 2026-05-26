import { getWordPressPartners, type WordPressPartner } from "@/lib/wordpress";

function partnersFromResponse(response: Awaited<ReturnType<typeof getWordPressPartners>>) {
  return Array.isArray(response) ? response : response.items;
}

export function getPartnerLogoUrl(partner: WordPressPartner) {
  return partner.logo?.url ?? "";
}

export async function getWordPressPartnerLogoUrls(locale: Parameters<typeof getWordPressPartners>[0]) {
  try {
    const response = await getWordPressPartners(locale);
    return partnersFromResponse(response).map(getPartnerLogoUrl).filter(Boolean);
  } catch {
    return [];
  }
}
