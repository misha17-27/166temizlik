import { HomePage } from "@/components/HomePage";
import { getHomePageData } from "@/lib/wordpress-home";
import { generateStaticWordPressPageMetadata } from "@/lib/wordpress-pages";

export async function generateMetadata() {
  return generateStaticWordPressPageMetadata("home", "ru", "Услуги уборки - 166 Təmizlik");
}

export default async function RussianHomePage() {
  const homeData = await getHomePageData("ru");
  return <HomePage locale="ru" homeData={homeData} />;
}
