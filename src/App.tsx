import Home from "./components/sections/Home";
import NavBar from "./components/NavBars/NavBar";
import Faq from "./components/sections/Faq";
import Services from "./components/sections/Services";
import Footer from "./components/sections/Footer";
import MainFooter from "./components/sections/MainFooter";
import SEOHead from "./components/SEO/SEOHead";
import { seoConfig } from "./components/SEO/seoConfig";
import {
  getCanonicalUrl,
  getCurrentLocale,
  getCurrentMarket,
  getMarketAlternateLinks,
  getPathWithoutLocale,
} from "./data/marketRuntime";
import {
  HomeRefonteAfterServices,
  HomeRefonteBeforeServices,
} from "./components/sections/HomeRefonteSections";
// import Projects from './components/sections/Projects'
const App = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const contentPath =
    typeof window === "undefined" ? "/" : getPathWithoutLocale(window.location.pathname);
  const canonicalUrl = getCanonicalUrl(market, locale, contentPath);
  const alternateLinks = getMarketAlternateLinks(market, contentPath);

  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <SEOHead
        {...seoConfig.home}
        url={canonicalUrl}
        alternates={alternateLinks}
        structuredData={{
          ...seoConfig.home.structuredData,
          url: canonicalUrl,
          areaServed: market.countryCode ?? "Global",
          availableLanguage: market.locales,
        }}
      />
      <NavBar />
      <div className="w-full flex flex-col scroll-smooth snap-x">
        <Home />
        <HomeRefonteBeforeServices />
        <Services />
        <HomeRefonteAfterServices />
        {/* <Projects /> */}
        <Faq />
        <Footer />
        <MainFooter />
      </div>
    </div>
  );
};

export default App;
