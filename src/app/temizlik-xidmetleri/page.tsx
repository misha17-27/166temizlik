import { CardGrid, LightSection, PageHero } from "@/components/InnerPage";
import { SitePage } from "@/components/SiteChrome";
import { servicePages } from "@/lib/pages-data";

export const metadata = {
  title: "Təmizlik xidmətləri - 166 Təmizlik",
};

export default function ServicesPage() {
  return (
    <SitePage>
      <PageHero title="Xidmətlər" subtitle="Sevdiklərinizə və özünüzə zaman ayırın. Peşəkar təmizlik komandamız ev, ofis və obyektlər üçün xidmət göstərir." />
      <LightSection>
        <div className="container-shell">
          <CardGrid
            items={servicePages.map((service) => ({
              title: service.title,
              text: service.description,
              icon: service.icon,
              href: service.href,
            }))}
          />
        </div>
      </LightSection>
    </SitePage>
  );
}
