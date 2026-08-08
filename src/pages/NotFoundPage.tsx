import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NavBar from "../components/NavBars/NavBar";
import Footer from "../components/sections/Footer";
import MainFooter from "../components/sections/MainFooter";
import FixedContactActions from "../components/buttons/FixedContactActions";
import { trackAnalyticsEvent } from "../analytics/analytics";
import { getCurrentLocale, getCurrentMarket, localizePath } from "../data/marketRuntime";
import type { LocaleCode } from "../data/markets";

const content: Record<LocaleCode, { title: string; description: string; home: string; contact: string }> = {
  fr: {
    title: "Page introuvable",
    description: "Cette adresse n’existe plus ou le lien utilisé est incorrect. Revenez à l’accueil ou contactez-nous si vous cherchiez une information précise.",
    home: "Retour à l’accueil",
    contact: "Nous contacter",
  },
  en: {
    title: "Page not found",
    description: "This address no longer exists or the link is incorrect. Return home or contact us if you were looking for something specific.",
    home: "Back to home",
    contact: "Contact us",
  },
  nl: {
    title: "Pagina niet gevonden",
    description: "Dit adres bestaat niet meer of de link is onjuist. Ga terug naar de startpagina of neem contact met ons op als je iets specifieks zocht.",
    home: "Terug naar home",
    contact: "Contact opnemen",
  },
  kiny: {
    title: "Ipaji ntiboneka",
    description: "Iyi aderesi ntikibaho cyangwa ihuza wakoresheje ntiryo. Subira ahabanza cyangwa utwandikire niba hari amakuru washakaga.",
    home: "Subira ahabanza",
    contact: "Twandikire",
  },
};

export default function NotFoundPage() {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = content[locale];

  useEffect(() => {
    trackAnalyticsEvent("not_found", "page_not_found");
  }, []);

  return (
    <div className="App w-full min-h-screen flex flex-col bg-[#f6f8fb]">
      <Helmet>
        <title>{copy.title} | Creativa Poeta</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="w-full ml-6 right-2 left flex justify-end">
        <NavBar />
      </div>
      <FixedContactActions />
      <main
        className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-5 py-20"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(238,186,43,0.17), transparent 24rem), radial-gradient(circle at 82% 30%, rgba(37,99,235,0.10), transparent 27rem), #f6f8fb",
        }}
      >
        <div className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-slate-200/80 bg-white/80 px-6 py-12 text-center shadow-[0_24px_80px_rgba(7,26,51,0.10)] backdrop-blur-xl sm:px-12 sm:py-16">
          <p className="text-[5rem] font-black leading-none tracking-[-0.08em] text-[#EEBA2B] sm:text-[7rem]">404</p>
          <h1 className="mt-5 text-3xl font-black text-[#071a33] sm:text-5xl">{copy.title}</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">{copy.description}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={localizePath("/", market, locale)}
              className="rounded-xl bg-[#071a33] px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#12365f]"
            >
              {copy.home}
            </Link>
            <Link
              to={localizePath("/contact", market, locale)}
              className="rounded-xl border border-[#071a33]/15 bg-white px-6 py-3.5 font-bold text-[#071a33] transition hover:-translate-y-0.5 hover:border-[#EEBA2B]"
            >
              {copy.contact}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <MainFooter />
    </div>
  );
}
