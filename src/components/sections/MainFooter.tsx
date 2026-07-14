import { Link } from "react-router-dom";
import MainFooterLocale from "../../i18n/MainFooterLocale";
import getLangFromLocalStorage from "../../../utils/Lang";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../../data/marketRuntime";

const MainFooter = () => {
  const storedLang = getLangFromLocalStorage() || "en";
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const labels = MainFooterLocale[storedLang] ?? MainFooterLocale.en;

  return (
    <div className="flex flex-wrap mx-auto text-center items-center justify-center w-full gap-y-2 laptop:justify-between desktop:justify-between desktop:flex-row px-8 laptop:flex-row flex-col-reverse bg-black h-fit p-2 py-4">
      <div className="flex flex-row flex-wrap justify-center items-center gap-x-3 gap-y-2 mr-2">
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
      <p className="text-xs font-bold text-slate-400 laptop:mt-0 desktop:mt-0">{labels.copyright}</p>
    </div>
  );
};

export default MainFooter;

