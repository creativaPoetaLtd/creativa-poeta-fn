import NavBar from "../../components/NavBars/NavBar";
import Footer from "../../components/sections/Footer";
import MainFooter from "../../components/sections/MainFooter";
import GraphicDesign from "../../components/Services/GraphicDesign";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";

const GraphicDesignPage = () => {
  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <MarketSEOHead
        {...seoConfig.services.graphicDesign}
        path="/services/graphic-design"
      />
      <div className="w-full ml-6 right-2 left flex justify-end">
        <NavBar />
      </div>
      <GraphicDesign />
      <div className="w-full flex flex-col scroll-smooth snap-x">
        <Footer />
        <MainFooter />
      </div>
    </div>
  );
};

export default GraphicDesignPage;
