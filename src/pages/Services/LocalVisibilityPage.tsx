import LocalVisibility from "../../components/Services/LocalVisibility";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const LocalVisibilityPage = () => {
  return (
    <PageLayout>
      <MarketSEOHead
        {...seoConfig.services.localVisibility}
        path="/services/visibilite-locale"
      />
      <LocalVisibility />
    </PageLayout>
  );
};

export default LocalVisibilityPage;
