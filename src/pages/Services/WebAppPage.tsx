import WebApp from "../../components/Services/WebApp";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const WebAppPage = () => {
  return (
    <PageLayout>
      <MarketSEOHead
        {...seoConfig.services.webDevelopment}
        path="/services/web-app"
      />
      <WebApp />
    </PageLayout>
  );
};

export default WebAppPage;
