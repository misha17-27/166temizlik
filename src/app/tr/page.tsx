import { HomePage } from "@/components/HomePage";
import { getHomePageData } from "@/lib/wordpress-home";
import { generateStaticWordPressPageMetadata } from "@/lib/wordpress-pages";

export async function generateMetadata() {
  return generateStaticWordPressPageMetadata("home", "tr", "Temizlik hizmetleri - 166 Təmizlik");
}

export default async function TurkishHomePage() {
  const homeData = await getHomePageData("tr");
  return <HomePage locale="tr" homeData={homeData} />;
}
