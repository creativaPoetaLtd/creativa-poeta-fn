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
    <div className="flex w-full flex-col items-center justify-center bg-black px-8 py-4 text-center">
      <div className="grid w-full grid-cols-1 items-center gap-3 laptop:grid-cols-3 desktop:grid-cols-3">
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 laptop:justify-start desktop:justify-start">
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

        {market.locales.length > 1 ? (
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-slate-400">
            <span className="text-xs font-normal text-slate-400">{languageTitle}</span>
            <LanguageSwitcher
              variant="text"
              showCurrent
              className="justify-center gap-2"
              textButtonClassName="rounded-full border px-2.5 py-1 text-xs font-normal"
            />
          </div>
        ) : (
          <span />
        )}

        <p className="text-xs font-bold text-slate-400 laptop:text-right desktop:text-right">{labels.copyright}</p>
      </div>
    </div>
  );
};

export default MainFooter;
