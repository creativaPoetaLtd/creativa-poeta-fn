import { Link } from "react-router-dom";
import logo from "../../assets/flags/logopoeta1.png";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";

const BrandHomeLink = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const homePath = buildLocalLocalePath(market, locale, "/");

  return (
    <Link
      to={homePath}
      aria-label="Retour a l'accueil Creativa Poeta"
      className="fixed left-4 top-5 z-50 block w-[150px] phone:left-8 phone:w-[190px] laptop:left-16 laptop:w-[260px]"
    >
      <img src={logo} alt="Creativa Poeta" className="h-auto w-full" />
    </Link>
  );
};

export default BrandHomeLink;
