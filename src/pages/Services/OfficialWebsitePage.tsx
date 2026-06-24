import OfficialWebsite from "../../components/Services/OfficialWebsite";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const OfficialWebsitePage = () => {
  return (
    <PageLayout>
      <MarketSEOHead
        {...seoConfig.services.officialWebsite}
        path="/services/site-officiel"
      />
      <OfficialWebsite />
    </PageLayout>
  );
};

export default OfficialWebsitePage;
