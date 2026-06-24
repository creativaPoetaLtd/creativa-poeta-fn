import { Link } from "react-router-dom";
import { FaArrowRight, FaComments, FaSearch } from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";

const ctaCopy: Record<
  string,
  {
    eyebrow: string;
    title: string;
    text: string;
    primary: string;
    secondary: string;
  }
> = {
  fr: {
    eyebrow: "Passer a l'action",
    title: "Vous voulez savoir par ou commencer ?",
    text: "On peut analyser votre presence actuelle, repérer ce qui bloque vos clients et vos outils IA, puis definir les premieres actions utiles.",
    primary: "Tester ma visibilite",
    secondary: "Parler a Creativa Poeta",
  },
  en: {
    eyebrow: "Take action",
    title: "Want to know where to start?",
    text: "We can review your current presence, identify what blocks clients and AI tools, then define the first useful actions.",
    primary: "Test my visibility",
    secondary: "Talk to Creativa Poeta",
  },
  nl: {
    eyebrow: "Actie nemen",
    title: "Wilt u weten waar u moet beginnen?",
    text: "We kunnen uw huidige aanwezigheid bekijken, zien wat klanten en AI-tools blokkeert, en de eerste nuttige acties bepalen.",
    primary: "Mijn zichtbaarheid testen",
    secondary: "Praat met Creativa Poeta",
  },
  kiny: {
    eyebrow: "Tangira",
    title: "Urashaka kumenya aho watangirira?",
    text: "Dushobora gusuzuma uko ugaragara ubu, tukabona ibibuza abakiriya na AI kukumva, hanyuma tugategura intambwe za mbere.",
    primary: "Gusuzuma uko ngaragara",
    secondary: "Kuvugana na Creativa Poeta",
  },
};

const ServiceFinalCTA = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = ctaCopy[locale] ?? ctaCopy.en;
  const auditPath = buildLocalLocalePath(market, locale, "/tester-visibilite");
  const contactPath = buildLocalLocalePath(market, locale, "/contact");

  return (
    <section className="px-5 pb-20 pt-10 phone:px-7 tablet:px-12 laptop:px-20">
      <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[2rem] border border-[#EEBA2B]/50 bg-[#071a33]/85 p-7 text-white shadow-2xl backdrop-blur-md phone:p-9 laptop:grid-cols-[.75fr_1fr] laptop:items-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#EEBA2B] bg-white/10">
          <FaSearch className="text-5xl text-[#fff200]" />
        </div>
        <div>
          <div className="mb-4 flex items-center gap-3 text-sm font-black uppercase tracking-wide text-[#fff200]">
            <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
            {copy.eyebrow}
          </div>
          <h2 className="font-['Black_Ops_One'] text-3xl leading-tight text-white phone:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-white/85 phone:text-lg">
            {copy.text}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 phone:gap-4">
            <Link
              to={auditPath}
              className="inline-flex min-w-0 items-center justify-center gap-2 border-2 border-[#EEBA2B] bg-[#EEBA2B] px-3 py-3 text-[10px] font-black uppercase leading-tight text-[#071a33] transition hover:bg-transparent hover:text-[#EEBA2B] phone:px-6 phone:py-4 phone:text-sm"
            >
              <span className="truncate">{copy.primary}</span>
              <FaArrowRight className="flex-none" />
            </Link>
            <Link
              to={contactPath}
              className="inline-flex min-w-0 items-center justify-center gap-2 border-2 border-white px-3 py-3 text-[10px] font-black uppercase leading-tight text-white transition hover:border-[#EEBA2B] hover:text-[#EEBA2B] phone:px-6 phone:py-4 phone:text-sm"
            >
              <span className="truncate">{copy.secondary}</span>
              <FaComments className="flex-none" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFinalCTA;
