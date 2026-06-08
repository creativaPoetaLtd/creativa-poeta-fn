import NavBar from "../../components/NavBars/NavBar";
import BrandHomeLink from "../../components/NavBars/BrandHomeLink";
import UsefulContent from "../../components/Services/UsefulContent";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import Footer from "../../components/sections/Footer";
import MainFooter from "../../components/sections/MainFooter";

const UsefulContentPage = () => {
  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <MarketSEOHead
        {...seoConfig.services.usefulContent}
        path="/services/contenus-utiles"
      />
      <div className="relative w-full ml-6 right-2 left flex justify-end">
        <BrandHomeLink />
        <NavBar />
      </div>
      <UsefulContent />
      <div className="w-full flex flex-col scroll-smooth snap-x">
        <Footer />
        <MainFooter />
      </div>
    </div>
  );
};

export default UsefulContentPage;
