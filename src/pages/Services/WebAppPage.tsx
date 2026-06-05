import NavBar from "../../components/NavBars/NavBar";
import Footer from "../../components/sections/Footer";
import MainFooter from "../../components/sections/MainFooter";
import WebApp from "../../components/Services/WebApp";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";

const WebAppPage = () => {
  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <MarketSEOHead
        {...seoConfig.services.webDevelopment}
        path="/services/web-app"
      />
      <div className="w-full ml-6 right-2 left flex justify-end">
        <NavBar />
      </div>
      <WebApp />
      <div className="w-full flex flex-col scroll-smooth snap-x">
        <Footer />
        <MainFooter />
      </div>
    </div>
  );
};

export default WebAppPage;
