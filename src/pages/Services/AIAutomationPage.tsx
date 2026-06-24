import AIAutomation from "../../components/Services/AIAutomation";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const AIAutomationPage = () => {
  return (
    <PageLayout>
      <MarketSEOHead
        {...seoConfig.services.aiAutomation}
        path="/services/ia-automatisation"
      />
      <AIAutomation />
    </PageLayout>
  );
};

export default AIAutomationPage;
