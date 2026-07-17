import { Link } from "react-router-dom";
import MainFooterLocale from "../../i18n/MainFooterLocale";
import getLangFromLocalStorage from "../../../utils/Lang";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../../data/marketRuntime";
import LanguageSwitcher from "../NavBars/LanguageSwitcher";

const languageTitles: Record<string, string> = {
  en: "Language",
  fr: "Langue",
  nl: "Taal",
  kiny: "Ururimi",
};

const MainFooter = () => {
  const storedLang = getLangFromLocalStorage() || "en";
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const labels = MainFooterLocale[storedLang] ?? MainFooterLocale.en;
  const languageTitle = languageTitles[locale] ?? languageTitles.en;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 bg-black px-8 py-4 text-center">
      {market.locales.length > 1 && (
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-400">
          <span className="text-xs font-normal text-slate-400">{languageTitle}</span>
          <LanguageSwitcher
            variant="text"
            showCurrent
            className="justify-center gap-2"
            textButtonClassName="rounded-full border px-2.5 py-1 text-xs font-normal"
          />
        </div>
      )}

      <div className="flex flex-col-reverse items-center justify-center gap-3 laptop:w-full laptop:flex-row laptop:justify-between desktop:w-full desktop:flex-row desktop:justify-between">
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <Link to={localizePath("/mentions-legales", market, locale)} className="text-xs text-slate-400 hover:text-white">
            {labels.legalMentions}
          </Link>
          <Link to={localizePath("/terms-and-conditions", market, locale)} className="text-xs text-slate-400 hover:text-white">
            {labels.terms}
          </Link>
          <Link to={localizePath("/confidentialite-cookies", market, locale)} className="text-xs text-slate-400 hover:text-white">
            {labels.cookies}
          </Link>
        </div>
        <p className="text-xs font-bold text-slate-400">{labels.copyright}</p>
      </div>
    </div>
  );
};

export default MainFooter;
