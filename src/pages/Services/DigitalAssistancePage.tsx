import DigitalAssistance from "../../components/Services/DigitalAssistance";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const DigitalAssistancePage = () => {
  return (
    <PageLayout>
      <MarketSEOHead
        {...seoConfig.services.digitalAssistance}
        path="/services/assistance-numerique"
      />
      <DigitalAssistance />
    </PageLayout>
  );
};

export default DigitalAssistancePage;
