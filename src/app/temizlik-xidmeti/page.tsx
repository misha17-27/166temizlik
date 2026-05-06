import { CardGrid, LightSection, PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { equipment } from "@/lib/pages-data";

export const metadata = {
  title: "Avadanlıq və maddələr - 166 Təmizlik",
};

export default function EquipmentPage() {
  return (
    <SitePage>
      <PageHero title="Avadanlıq və maddələr" subtitle="Təmizlik zamanı istifadə etdiyimiz peşəkar cihazlar və keyfiyyətli vasitələr." />
      <LightSection>
        <div className="container-shell">
          <h2 className="section-title mb-12">Avadanlıqlar</h2>
          <CardGrid items={equipment.map((item) => ({ title: item.title, text: item.text, image: item.image }))} />
        </div>
      </LightSection>
    </SitePage>
  );
}
