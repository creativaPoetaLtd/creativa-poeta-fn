import NavBar from "../../components/NavBars/NavBar";
import LocalVisibility from "../../components/Services/LocalVisibility";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import Footer from "../../components/sections/Footer";
import MainFooter from "../../components/sections/MainFooter";

const LocalVisibilityPage = () => {
  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <MarketSEOHead
        {...seoConfig.services.localVisibility}
        path="/services/visibilite-locale"
      />
      <div className="w-full ml-6 right-2 left flex justify-end">
        <NavBar />
      </div>
      <LocalVisibility />
      <div className="w-full flex flex-col scroll-smooth snap-x">
        <Footer />
        <MainFooter />
      </div>
    </div>
  );
};

export default LocalVisibilityPage;
