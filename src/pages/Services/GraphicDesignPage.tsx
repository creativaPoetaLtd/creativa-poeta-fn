import GraphicDesign from "../../components/Services/GraphicDesign";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import PageLayout from "../../components/layout/PageLayout";

const GraphicDesignPage = () => {
  return (
    <PageLayout>
      <MarketSEOHead
        {...seoConfig.services.graphicDesign}
        path="/services/graphic-design"
      />
      <GraphicDesign />
    </PageLayout>
  );
};

export default GraphicDesignPage;
