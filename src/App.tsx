import Home from "./components/sections/Home";
import NavBar from "./components/NavBars/NavBar";
import Faq from "./components/sections/Faq";
import Services from "./components/sections/Services";
import Footer from "./components/sections/Footer";
import MainFooter from "./components/sections/MainFooter";
import FixedContactActions from "./components/buttons/FixedContactActions";
import SEOHead from "./components/SEO/SEOHead";
import { seoConfig } from "./components/SEO/seoConfig";
import {
  getCanonicalUrl,
  getCurrentLocale,
  getCurrentMarket,
  getMarketAlternateLinks,
  getPathWithoutLocale,
} from "./data/marketRuntime";
import { HomeRefonteAfterServices } from "./components/sections/HomeRefonteSections";
import HomeServiceStorySections from "./components/sections/HomeServiceStorySections";
import { LocaleCode, MarketCode } from "./data/markets";
// import Projects from './components/sections/Projects'

const marketHomeSeo: Partial<
  Record<
    MarketCode,
    Partial<Record<LocaleCode, { title: string; description: string }>>
  >
> = {
  global: {
    en: {
      title: "Creativa Poeta | Be found where clients search",
      description:
        "Creativa Poeta helps businesses build a clear official présence for Google, maps, voice search and tools like ChatGPT.",
    },
    fr: {
      title: "Creativa Poeta | Visibilité digitale claire et utile",
      description:
        "Creativa Poeta aide les entreprises à être trouvées, comprises et contactées via leur site, les maps, la recherche vocale et les moteurs IA.",
    },
  },
  be: {
    fr: {
      title:
        "Creativa Poeta Belgique | Visibilité locale en français et néerlandais",
      description:
        "Creativa Poeta aide les entreprises en Belgique à clarifier leur site, leurs profils locaux, leurs maps et leurs réponses clients.",
    },
    nl: {
      title:
        "Creativa Poeta Belgie | Lokale zichtbaarheid in Frans en Nederlands",
      description:
        "Creativa Poeta helpt bedrijven in Belgie hun website, lokale profielen, maps en klantinformatie duidelijk en betrouwbaar te maken.",
    },
  },
  fr: {
    fr: {
      title: "Creativa Poeta France | Site clair, maps et visibilité moderne",
      description:
        "Creativa Poeta aide les entreprises en France à créer une présence officielle claire pour leur site, leurs maps et les recherches modernes.",
    },
  },
  rw: {
    kiny: {
      title: "Creativa Poeta Rwanda | Garagara aho abakiriya bagushakira",
      description:
        "Creativa Poeta ifasha ubucuruzi mu Rwanda kugira amakuru asobanutse kuri website, maps, imbuga nkoranyambaga n'ibikoresho bya AI.",
    },
    fr: {
      title: "Creativa Poeta Rwanda | Site, maps et visibilité locale",
      description:
        "Creativa Poeta aide les entreprises au Rwanda à clarifier leur site, leurs profils locaux, leurs contacts et leurs réponses clients.",
    },
    en: {
      title: "Creativa Poeta Rwanda | Website, maps and local visibility",
      description:
        "Creativa Poeta helps businesses in Rwanda make their website, maps, profiles and contact information clear and easy to find.",
    },
  },
  nl: {
    nl: {
      title:
        "Creativa Poeta Nederland | Website, maps en moderne zichtbaarheid",
      description:
        "Creativa Poeta helpt bedrijven in Nederland hun website, maps, lokale profielen en klantinformatie duidelijker te maken.",
    },
  },
};

const App = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const homeSeo = marketHomeSeo[market.code]?.[locale] ?? seoConfig.home;
  const contentPath =
    typeof window === "undefined" ? "/" : getPathWithoutLocale(window.location.pathname);
  const canonicalUrl = getCanonicalUrl(market, locale, contentPath);
  const alternateLinks = getMarketAlternateLinks(market, contentPath);

  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <SEOHead
        {...seoConfig.home}
        title={homeSeo.title}
        description={homeSeo.description}
        url={canonicalUrl}
        alternates={alternateLinks}
        structuredData={{
          ...seoConfig.home.structuredData,
          name:
            market.code === "global"
              ? "Creativa Poeta"
              : `Creativa Poeta ${market.label}`,
          description: homeSeo.description,
          url: canonicalUrl,
          areaServed: market.countryCode ?? "Global",
          availableLanguage: market.locales,
        }}
      />
      <NavBar />
      <FixedContactActions />
      <div className="w-full flex flex-col scroll-smooth snap-x">
        <Home />
        <HomeServiceStorySections />
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
