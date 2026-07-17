import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBars/NavBar";
import Footer from "../components/sections/Footer";
import MainFooter from "../components/sections/MainFooter";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import LegalContent from "../components/legal/LegalContent";
import { LegalPageKind } from "../components/legal/legalCopies";
import FixedContactActions from "../components/buttons/FixedContactActions";

const getLegalKind = (pathname: string): LegalPageKind => {
  if (pathname.includes("mentions-legales")) return "legal";
  if (pathname.includes("confidentialite-cookies")) return "privacy";
  return "terms";
};

const seoByKind: Record<LegalPageKind, { title: string; description: string; path: string }> = {
  legal: {
    title: "Mentions legales | Creativa Poeta",
    description: "Informations legales, editeur, hebergement et contact de Creativa Poeta.",
    path: "/mentions-legales",
  },
  terms: {
    title: "Conditions generales | Creativa Poeta",
    description: "Conditions generales d'utilisation du site et des demandes de service Creativa Poeta.",
    path: "/terms-and-conditions",
  },
  privacy: {
    title: "Confidentialite et cookies | Creativa Poeta",
    description: "Politique de confidentialite, donnees personnelles et gestion des cookies de Creativa Poeta.",
    path: "/confidentialite-cookies",
  },
};

const TermsPage = () => {
  const location = useLocation();
  const kind = getLegalKind(location.pathname);
  const seo = seoByKind[kind];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App w-full flex flex-col snap-x scroll-smooth">
      <MarketSEOHead
        title={seo.title}
        description={seo.description}
        keywords="Creativa Poeta, mentions legales, conditions generales, confidentialite, cookies, RGPD"
        path={seo.path}
      />
      <NavBar />
      <FixedContactActions />
      <LegalContent kind={kind} />
      <Footer />
      <MainFooter />
    </div>
  );
};

export default TermsPage;
