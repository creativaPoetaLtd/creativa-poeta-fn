import NavBar from "../../components/NavBars/NavBar";
import BrandHomeLink from "../../components/NavBars/BrandHomeLink";
import AuditVisibility from "../../components/Services/AuditVisibility";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
import Footer from "../../components/sections/Footer";
import MainFooter from "../../components/sections/MainFooter";

const AuditVisibilityPage = () => {
  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <MarketSEOHead
        {...seoConfig.services.auditVisibility}
        path="/services/audit-visibilite"
      />
      <div className="w-full ml-6 right-2 left flex justify-end">
        <BrandHomeLink />
        <NavBar />
      </div>
      <AuditVisibility />
      <div className="w-full flex flex-col scroll-smooth snap-x">
        <Footer />
        <MainFooter />
      </div>
    </div>
  );
};

export default AuditVisibilityPage;
