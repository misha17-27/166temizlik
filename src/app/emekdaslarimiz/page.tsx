import { CardGrid, LightSection, PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { employees } from "@/lib/pages-data";

export const metadata = {
  title: "Əməkdaşlarımız - 166 Təmizlik",
};

export default function EmployeesPage() {
  return (
    <SitePage>
      <PageHero title="Əməkdaşlarımız" subtitle="Komandamızın peşəkar üzvləri və xidmət prosesində iştirak edən əməkdaşlarımız." />
      <LightSection>
        <div className="container-shell">
          <CardGrid items={employees.map((item) => ({ title: item.name, text: item.role, image: item.image }))} />
        </div>
      </LightSection>
    </SitePage>
  );
}
