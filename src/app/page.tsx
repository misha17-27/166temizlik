import { HomePage } from "@/components/HomePage";
import { getHomePageData } from "@/lib/wordpress-home";
import { generateStaticWordPressPageMetadata } from "@/lib/wordpress-pages";

export async function generateMetadata() {
  return generateStaticWordPressPageMetadata("home", "az", "Pesekar temizlik sirketi, serfeli ve keyfiyyetli xidmetler - 166temizlik");
}

export default async function Home() {
  const homeData = await getHomePageData("az");
  return <HomePage homeData={homeData} />;
}
