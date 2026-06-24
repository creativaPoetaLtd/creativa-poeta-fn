import UsefulContent from "../../components/Services/UsefulContent";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const UsefulContentPage = () => {
  return (
    <PageLayout>
      <MarketSEOHead
        {...seoConfig.services.usefulContent}
        path="/services/contenus-utiles"
      />
      <UsefulContent />
    </PageLayout>
  );
};

export default UsefulContentPage;
