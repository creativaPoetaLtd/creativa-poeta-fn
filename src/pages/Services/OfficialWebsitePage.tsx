import NavBar from "../../components/NavBars/NavBar";
import BrandHomeLink from "../../components/NavBars/BrandHomeLink";
import OfficialWebsite from "../../components/Services/OfficialWebsite";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import Footer from "../../components/sections/Footer";
import MainFooter from "../../components/sections/MainFooter";

const OfficialWebsitePage = () => {
  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <MarketSEOHead
        {...seoConfig.services.officialWebsite}
        path="/services/site-officiel"
      />
      <div className="relative w-full ml-6 right-2 left flex justify-end">
        <BrandHomeLink />
        <NavBar />
      </div>
      <OfficialWebsite />
      <div className="w-full flex flex-col scroll-smooth snap-x">
        <Footer />
        <MainFooter />
      </div>
    </div>
  );
};

export default OfficialWebsitePage;
