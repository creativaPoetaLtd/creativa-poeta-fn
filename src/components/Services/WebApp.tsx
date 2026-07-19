import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaClipboardList,
  FaDesktop,
  FaGlobe,
  FaLayerGroup,
  FaMobileAlt,
  FaTools,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import siteFr from "../../assets/alignment/site-web.webp";
import siteEn from "../../assets/alignment/site-web-en.webp";
import siteNl from "../../assets/alignment/site-web-nl.webp";
import sourceFr from "../../assets/alignment/official-source-flow.webp";
import sourceEn from "../../assets/alignment/official-source-flow-en.webp";
import sourceNl from "../../assets/alignment/official-source-flow-nl.webp";
import modernFr from "../../assets/alignment/modern-visibility.webp";
import modernEn from "../../assets/alignment/modern-visibility-en.webp";
import modernNl from "../../assets/alignment/modern-visibility-nl.webp";
import creativeFr from "../../assets/creative-services.webp";
import creativeEn from "../../assets/creative-services-en.webp";
import creativeNl from "../../assets/creative-services-nl.webp";
import ServiceFinalCTA from "./ServiceFinalCTA";

type LocaleCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  secondary: string;
  promises: string[];
  baseEyebrow: string;
  baseTitle: string;
  baseText: string;
  buildEyebrow: string;
  buildTitle: string;
  buildText: string;
  productsEyebrow: string;
  productsTitle: string;
  productsText: string;
  products: Array<{ icon: "site" | "pages" | "platform" | "app" | "system"; title: string; text: string }>;
  methodEyebrow: string;
  methodTitle: string;
  methodText: string;
  steps: string[];
  creativeEyebrow: string;
  creativeTitle: string;
  creativeText: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

const copies: Record<string, LocaleCopy> = {
  fr: {
    eyebrow: "Sites web, applications & outils digitaux",
    title: "Nous construisons la base officielle de votre entreprise.",
    intro:
      "Un site, une application ou un outil interne doit faire plus que fonctionner. Il doit expliquer, guider, rassurer et permettre à vos clients comme à votre équipe d'agir simplement.",
    primary: "Demarrer un projet",
    secondary: "Nous contacter",
    promises: [
      "Site vitrine clair",
      "Pages de service utiles",
      "Applications et plateformes",
      "Formulaires, tableaux de bord et outils internes",
    ],
    baseEyebrow: "Votre base officielle",
    baseTitle: "Votre site devient l'endroit ou tout est clair.",
    baseText:
      "Nous rassemblons vos services, vos preuves, vos contacts, vos zones et vos réponses dans une expérience simple à comprendre. Votre présence devient plus propre pour vos clients, Google, les maps et les assistants modernes.",
    buildEyebrow: "Ce que nous construisons",
    buildTitle: "Du site simple au système complet, on part de votre vrai besoin.",
    buildText:
      "Une entreprise n'a pas toujours besoin d'une grande plateforme. Parfois il faut une page claire. Parfois un formulaire solide. Parfois un espace complet pour gerer les demandes, les clients ou les documents.",
    productsEyebrow: "Solutions possibles",
    productsTitle: "Chaque support a un role précis.",
    productsText:
      "Nous evitons les sites remplis de contenu vide. Chaque page, chaque bouton et chaque outil doit aider quelqu'un à comprendre, choisir, contacter ou travailler plus vite.",
    products: [
      {
        icon: "site",
        title: "Site vitrine",
        text: "Une présence claire qui presente votre entreprise, vos services et vos chemins de contact.",
      },
      {
        icon: "pages",
        title: "Pages utiles",
        text: "Des pages de service, zones, questions fréquentes et cas concrets pour mieux répondre aux recherches.",
      },
      {
        icon: "platform",
        title: "Plateformes web",
        text: "Des espaces plus complets pour vendre, publier, presenter, reserver ou organiser une activité.",
      },
      {
        icon: "app",
        title: "Applications",
        text: "Des interfaces web ou mobiles pensées pour une action précise, avec un parcours simple.",
      },
      {
        icon: "system",
        title: "Outils internes",
        text: "Formulaires, tableaux de bord, suivi de demandes, documents et systèmes adaptés à votre travail.",
      },
    ],
    methodEyebrow: "Notre méthode",
    methodTitle: "On clarifie d'abord. On construit ensuite.",
    methodText:
      "Le but n'est pas d'ajouter de la technique pour impressionner. Le but est de créer un outil propre, utile et durable, que vous pouvez faire évoluer.",
    steps: [
      "Comprendre votre activité et vos priorites",
      "Definir les pages, actions et informations essentielles",
      "Créer une structure lisible sur mobile d'abord",
      "Relier le site à vos profils, formulaires et outils utiles",
      "Prevoir une base facile a faire grandir",
    ],
    creativeEyebrow: "Creativa Poeta",
    creativeTitle: "Une base technique, mais avec une ame.",
    creativeText:
      "Nous gardons l'ADN de Creativa Poeta : des mots choisis, des visuels justes, une expérience fluide et une présence qui porte votre histoire.",
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        question: "Est-ce que je dois commencer par un grand site ?",
        answer:
          "Non. Le plus important est de commencer par une base claire. Elle peut grandir ensuite avec des pages, des outils ou des langues.",
      },
      {
        question: "Est-ce que vous refondez aussi un site existant ?",
        answer:
          "Oui. On garde ce qui fonctionne, puis on clarifie la structure, les textes, les contacts, les pages utiles et les parcours.",
      },
      {
        question: "Est-ce que vous pouvez construire un outil sur mesure ?",
        answer:
          "Oui. Cela peut être un formulaire avance, un tableau de bord, un espace client, un outil de gestion ou une application plus complète.",
      },
    ],
  },
  en: {
    eyebrow: "Websites, applications & digital tools",
    title: "We build the official base of your business.",
    intro:
      "A website, app or internal tool should do more than work. It should explain, guide, reassure and help clients or teams act simply.",
    primary: "Start a project",
    secondary: "Contact us",
    promises: [
      "Clear business website",
      "Useful service pages",
      "Applications and platforms",
      "Forms, dashboards and internal tools",
    ],
    baseEyebrow: "Your official base",
    baseTitle: "Your website becomes the place where everything is clear.",
    baseText:
      "We gather your services, proof, contacts, areas and answers into an experience that is easy to understand. Your presence becomes cleaner for clients, Google, maps and modern assistants.",
    buildEyebrow: "What we build",
    buildTitle: "From a simple website to a complete system, we start from the real need.",
    buildText:
      "A business does not always need a large platform. Sometimes it needs one clear page. Sometimes a solid form. Sometimes a full space to manage requests, clients or documents.",
    productsEyebrow: "Possible solutions",
    productsTitle: "Every support has a precise role.",
    productsText:
      "We avoid websites full of empty content. Each page, button and tool must help someone understand, choose, contact or work faster.",
    products: [
      {
        icon: "site",
        title: "Business website",
        text: "A clear presence that presents your business, services and contact paths.",
      },
      {
        icon: "pages",
        title: "Useful pages",
        text: "Service pages, areas, common questions and concrete cases to answer searches better.",
      },
      {
        icon: "platform",
        title: "Web platforms",
        text: "Richer spaces to sell, publish, present, book or organize an activity.",
      },
      {
        icon: "app",
        title: "Applications",
        text: "Web or mobile interfaces designed for a specific action, with a simple journey.",
      },
      {
        icon: "system",
        title: "Internal tools",
        text: "Forms, dashboards, request tracking, documents and systems adapted to your work.",
      },
    ],
    methodEyebrow: "Our method",
    methodTitle: "We clarify first. Then we build.",
    methodText:
      "The goal is not to add technology to impress. The goal is to create a clean, useful and durable tool that can grow.",
    steps: [
      "Understand your activity and priorities",
      "Define essential pages, actions and information",
      "Create a mobile-first readable structure",
      "Connect the site to profiles, forms and useful tools",
      "Prepare a base that can grow easily",
    ],
    creativeEyebrow: "Creativa Poeta",
    creativeTitle: "A technical base, but with a soul.",
    creativeText:
      "We keep Creativa Poeta's DNA: chosen words, precise visuals, a smooth experience and a presence that carries your story.",
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Do I need to start with a large website?",
        answer:
          "No. The most important thing is to start with a clear base. It can later grow with pages, tools or languages.",
      },
      {
        question: "Can you rebuild an existing website?",
        answer:
          "Yes. We keep what works, then clarify the structure, wording, contacts, useful pages and user journeys.",
      },
      {
        question: "Can you build a custom tool?",
        answer:
          "Yes. It can be an advanced form, dashboard, client area, management tool or a more complete application.",
      },
    ],
  },
  nl: {
    eyebrow: "Websites, applicaties & digitale tools",
    title: "Wij bouwen de officiele basis van uw bedrijf.",
    intro:
      "Een website, app of intern hulpmiddel moet meer doen dan werken. Het moet uitleggen, begeleiden, vertrouwen geven en klanten of teams eenvoudig laten handelen.",
    primary: "Project starten",
    secondary: "Contact opnemen",
    promises: [
      "Duidelijke bedrijfswebsite",
      "Nuttige dienstenpagina's",
      "Applicaties en platformen",
      "Formulieren, dashboards en interne tools",
    ],
    baseEyebrow: "Uw officiele basis",
    baseTitle: "Uw website wordt de plek waar alles duidelijk is.",
    baseText:
      "We verzamelen uw diensten, bewijzen, contactgegevens, regio's en antwoorden in een ervaring die gemakkelijk te begrijpen is. Uw aanwezigheid wordt duidelijker voor klanten, Google, maps en moderne assistenten.",
    buildEyebrow: "Wat wij bouwen",
    buildTitle: "Van een eenvoudige site tot een volledig systeem, we vertrekken van uw echte behoefte.",
    buildText:
      "Een bedrijf heeft niet altijd een groot platform nodig. Soms volstaat een duidelijke pagina. Soms een stevig formulier. Soms een volledige ruimte om aanvragen, klanten of documenten te beheren.",
    productsEyebrow: "Mogelijke oplossingen",
    productsTitle: "Elke drager heeft een precieze rol.",
    productsText:
      "We vermijden websites vol lege inhoud. Elke pagina, knop en tool moet iemand helpen sneller te begrijpen, kiezen, contact opnemen of werken.",
    products: [
      {
        icon: "site",
        title: "Bedrijfswebsite",
        text: "Een duidelijke aanwezigheid die uw bedrijf, diensten en contactpaden presenteert.",
      },
      {
        icon: "pages",
        title: "Nuttige pagina's",
        text: "Diensten, regio's, veelgestelde vragen en concrete voorbeelden om beter op zoekvragen te antwoorden.",
      },
      {
        icon: "platform",
        title: "Webplatformen",
        text: "Ruimere omgevingen om te verkopen, publiceren, presenteren, reserveren of organiseren.",
      },
      {
        icon: "app",
        title: "Applicaties",
        text: "Web- of mobiele interfaces voor een duidelijke actie, met een eenvoudig traject.",
      },
      {
        icon: "system",
        title: "Interne tools",
        text: "Formulieren, dashboards, opvolging van aanvragen, documenten en systemen op maat van uw werk.",
      },
    ],
    methodEyebrow: "Onze methode",
    methodTitle: "Eerst verduidelijken. Daarna bouwen.",
    methodText:
      "Het doel is niet om techniek toe te voegen om indruk te maken. Het doel is een duidelijke, nuttige en duurzame tool te maken die kan groeien.",
    steps: [
      "Uw activiteit en prioriteiten begrijpen",
      "Essentiele pagina's, acties en informatie bepalen",
      "Een leesbare structuur maken, eerst voor mobiel",
      "De site verbinden met profielen, formulieren en nuttige tools",
      "Een basis voorzien die gemakkelijk kan groeien",
    ],
    creativeEyebrow: "Creativa Poeta",
    creativeTitle: "Een technische basis, maar met een ziel.",
    creativeText:
      "We bewaren het DNA van Creativa Poeta: gekozen woorden, juiste beelden, een vloeiende ervaring en een aanwezigheid die uw verhaal draagt.",
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Moet ik beginnen met een grote website?",
        answer:
          "Nee. Het belangrijkste is starten met een duidelijke basis. Die kan later groeien met pagina's, tools of talen.",
      },
      {
        question: "Kunnen jullie ook een bestaande website vernieuwen?",
        answer:
          "Ja. We behouden wat werkt en verduidelijken daarna de structuur, teksten, contacten, nuttige pagina's en trajecten.",
      },
      {
        question: "Kunnen jullie een tool op maat bouwen?",
        answer:
          "Ja. Dat kan een geavanceerd formulier, dashboard, klantenzone, beheertool of volledige applicatie zijn.",
      },
    ],
  },
  kiny: {
    eyebrow: "Websites, apps & digital tools",
    title: "We build the official base of your business.",
    intro:
      "A website, app or internal tool should explain your services clearly, help clients contact you and give your team a cleaner way to work.",
    primary: "Start a project",
    secondary: "Contact us",
    promises: [
      "Clear business website",
      "Useful service pages",
      "Applications and platforms",
      "Forms, dashboards and internal tools",
    ],
    baseEyebrow: "Your official base",
    baseTitle: "Your website becomes the place where everything is clear.",
    baseText:
      "We gather your services, proof, contacts, areas and answers into an experience that is easy to understand and easy to trust.",
    buildEyebrow: "What we build",
    buildTitle: "From a simple website to a complete system, we start from the real need.",
    buildText:
      "Sometimes you need one clear page. Sometimes a solid form. Sometimes a full space to manage requests, clients or documents.",
    productsEyebrow: "Possible solutions",
    productsTitle: "Every support has a precise role.",
    productsText:
      "Each page, button and tool must help someone understand, choose, contact or work faster.",
    products: [
      {
        icon: "site",
        title: "Business website",
        text: "A clear presence that presents your business, services and contact paths.",
      },
      {
        icon: "pages",
        title: "Useful pages",
        text: "Service pages, areas, common questions and concrete cases.",
      },
      {
        icon: "platform",
        title: "Web platforms",
        text: "Richer spaces to sell, publish, present, book or organize an activity.",
      },
      {
        icon: "app",
        title: "Applications",
        text: "Web or mobile interfaces designed for a specific action.",
      },
      {
        icon: "system",
        title: "Internal tools",
        text: "Forms, dashboards, request tracking, documents and custom systems.",
      },
    ],
    methodEyebrow: "Our method",
    methodTitle: "We clarify first. Then we build.",
    methodText:
      "The goal is to create a clean, useful and durable tool that can grow with your business.",
    steps: [
      "Understand your activity and priorities",
      "Define essential pages, actions and information",
      "Create a mobile-first readable structure",
      "Connect the site to profiles, forms and useful tools",
      "Prepare a base that can grow easily",
    ],
    creativeEyebrow: "Creativa Poeta",
    creativeTitle: "A technical base, but with a soul.",
    creativeText:
      "We keep Creativa Poeta's DNA: chosen words, precise visuals, a smooth experience and a presence that carries your story.",
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Do I need to start with a large website?",
        answer:
          "No. The most important thing is to start with a clear base. It can later grow with pages, tools or languages.",
      },
      {
        question: "Can you rebuild an existing website?",
        answer:
          "Yes. We keep what works, then clarify the structure, wording, contacts, useful pages and user journeys.",
      },
      {
        question: "Can you build a custom tool?",
        answer:
          "Yes. It can be an advanced form, dashboard, client area, management tool or a more complete application.",
      },
    ],
  },
};

const visuals = {
  fr: {
    site: siteFr,
    source: sourceFr,
    modern: modernFr,
    creative: creativeFr,
  },
  en: {
    site: siteEn,
    source: sourceEn,
    modern: modernEn,
    creative: creativeEn,
  },
  nl: {
    site: siteNl,
    source: sourceNl,
    modern: modernNl,
    creative: creativeNl,
  },
  kiny: {
    site: siteEn,
    source: sourceEn,
    modern: modernEn,
    creative: creativeEn,
  },
};

const iconMap = {
  site: FaDesktop,
  pages: FaLayerGroup,
  platform: FaGlobe,
  app: FaMobileAlt,
  system: FaTools,
};

const getCopy = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  return {
    market,
    locale,
    copy: copies[locale] ?? copies.en,
    visual: visuals[locale as keyof typeof visuals] ?? visuals.en,
  };
};

const SectionTitle = ({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) => (
  <div className="mx-auto mb-8 max-w-6xl px-5 phone:px-7 tablet:px-12 laptop:px-0">
    <div className="mb-3 flex items-center gap-3 text-xs font-black uppercase tracking-wide text-white [overflow-wrap:anywhere]">
      <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
      {eyebrow}
    </div>
    <h2 className="max-w-5xl font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white drop-shadow-lg phone:text-5xl laptop:text-6xl">
      {title}
    </h2>
    {text ? (
      <p className="mt-5 max-w-4xl text-base font-bold leading-8 text-white/90 phone:text-lg">
        {text}
      </p>
    ) : null}
  </div>
);

const ImagePanel = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div
    className={`max-w-full overflow-hidden rounded-[1.6rem] border border-white/45 bg-[#071a33]/70 p-2 shadow-[0_20px_60px_rgba(0,0,0,.25)] backdrop-blur-sm ${className}`}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full max-w-full w-full rounded-[1.2rem] object-contain"
    />
  </div>
);

const WebApp = () => {
  const { market, locale, copy, visual } = getCopy();
  const startPath = `${buildLocalLocalePath(market, locale, "/start-project")}?service=website`;
  const contactPath = buildLocalLocalePath(market, locale, "/contact");

  return (
    <main className="relative z-10 max-w-full overflow-x-hidden text-white">
      <section className="max-w-full overflow-x-hidden px-5 pb-12 pt-28 phone:px-7 tablet:px-12 laptop:px-20 laptop:pt-36">
        <div className="mx-auto grid min-w-0 max-w-6xl gap-8 laptop:grid-cols-[.85fr_1.15fr] laptop:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-wide text-white [overflow-wrap:anywhere]">
              <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
              {copy.eyebrow}
            </div>
            <h1 className="font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white drop-shadow-xl phone:text-5xl laptop:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 text-base font-bold leading-8 text-white/90 phone:text-lg">
              {copy.intro}
            </p>
            <div className="mt-7 grid grid-cols-2 min-w-0 gap-3">
              {copy.promises.map((item) => (
                <div
                  key={item}
                  className="flex min-h-20 items-center gap-3 rounded-2xl border border-[#EEBA2B]/45 bg-[#071a33]/75 p-3 text-sm font-black backdrop-blur-sm [overflow-wrap:anywhere]"
                >
                  <FaCheckCircle className="shrink-0 text-xl text-[#fff200]" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex min-w-0 flex-row flex-wrap gap-3">
              <Link
                to={startPath}
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-3 rounded-full border-2 border-[#EEBA2B] bg-[#EEBA2B] px-5 py-4 text-xs font-black uppercase text-[#071a33] transition hover:bg-transparent hover:text-[#EEBA2B] phone:flex-none [overflow-wrap:anywhere]"
              >
                {copy.primary}
                <FaArrowRight />
              </Link>
              <Link
                to={contactPath}
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-3 rounded-full border-2 border-white px-5 py-4 text-xs font-black uppercase text-white transition hover:border-[#EEBA2B] hover:text-[#EEBA2B] phone:flex-none [overflow-wrap:anywhere]"
              >
                {copy.secondary}
              </Link>
            </div>
          </div>
          <ImagePanel src={visual.site} alt={copy.title} className="laptop:rotate-1" />
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B]/70 px-0 py-12 laptop:py-20">
        <SectionTitle
          eyebrow={copy.baseEyebrow}
          title={copy.baseTitle}
          text={copy.baseText}
        />
        <div className="mx-auto min-w-0 max-w-6xl px-5 phone:px-7 tablet:px-12 laptop:px-0">
          <ImagePanel src={visual.source} alt={copy.baseTitle} />
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B]/70 px-0 py-12 laptop:py-20">
        <SectionTitle
          eyebrow={copy.buildEyebrow}
          title={copy.buildTitle}
          text={copy.buildText}
        />
        <div className="mx-auto grid min-w-0 max-w-6xl gap-5 px-5 phone:px-7 tablet:px-12 laptop:grid-cols-[.95fr_1.05fr] laptop:px-0">
          <div className="rounded-[1.7rem] border border-[#EEBA2B]/55 bg-[#071a33]/80 p-5 backdrop-blur-md phone:p-7">
            <div className="mb-5 flex items-center gap-3 text-[#fff200]">
              <FaClipboardList className="text-3xl" />
              <p className="text-sm font-black uppercase tracking-wide [overflow-wrap:anywhere]">
                {copy.productsEyebrow}
              </p>
            </div>
            <h3 className="font-['Black_Ops_One'] text-3xl leading-tight text-white phone:text-4xl">
              {copy.productsTitle}
            </h3>
            <p className="mt-5 text-base font-bold leading-8 text-white/85">
              {copy.productsText}
            </p>
          </div>
          <ImagePanel src={visual.modern} alt={copy.productsTitle} />
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B]/70 px-5 py-12 phone:px-7 tablet:px-12 laptop:px-20 laptop:py-20">
        <div className="mx-auto min-w-0 max-w-6xl">
          <div className="grid gap-4 laptop:grid-cols-5">
            {copy.products.map((product) => {
              const Icon = iconMap[product.icon];
              return (
                <article
                  key={product.title}
                  className="rounded-[1.4rem] border border-white/25 bg-[linear-gradient(135deg,rgba(7,26,51,.92),rgba(6,17,29,.82)),repeating-linear-gradient(135deg,rgba(238,186,43,.14)_0,rgba(238,186,43,.14)_1px,transparent_1px,transparent_10px)] p-5 shadow-xl backdrop-blur-sm"
                >
                  <Icon className="mb-4 text-4xl text-[#EEBA2B]" />
                  <h3 className="font-['Black_Ops_One'] text-2xl leading-none text-white">
                    {product.title}
                  </h3>
                  <div className="my-4 h-1 w-16 bg-[#EEBA2B]" />
                  <p className="text-sm font-bold leading-7 text-white/85">
                    {product.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B]/70 px-0 py-12 laptop:py-20">
        <SectionTitle
          eyebrow={copy.methodEyebrow}
          title={copy.methodTitle}
          text={copy.methodText}
        />
        <div className="mx-auto min-w-0 max-w-6xl px-5 phone:px-7 tablet:px-12 laptop:px-0">
          <div className="rounded-[1.7rem] border border-[#EEBA2B]/55 bg-[#071a33]/80 p-5 backdrop-blur-md phone:p-7">
            <div className="grid gap-4 laptop:grid-cols-5">
              {copy.steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/20 bg-white/8 p-4"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#EEBA2B] text-lg font-black text-[#071a33] [overflow-wrap:anywhere]">
                    {index + 1}
                  </div>
                  <p className="text-sm font-black leading-6 text-white [overflow-wrap:anywhere]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B]/70 px-0 py-12 laptop:py-20">
        <SectionTitle
          eyebrow={copy.creativeEyebrow}
          title={copy.creativeTitle}
          text={copy.creativeText}
        />
        <div className="mx-auto min-w-0 max-w-6xl px-5 phone:px-7 tablet:px-12 laptop:px-0">
          <ImagePanel src={visual.creative} alt={copy.creativeTitle} />
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B]/70 px-5 py-12 phone:px-7 tablet:px-12 laptop:px-20 laptop:py-20">
        <div className="mx-auto min-w-0 max-w-6xl">
          <h2 className="font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white phone:text-5xl">
            {copy.faqTitle}
          </h2>
          <div className="mt-7 grid gap-4 laptop:grid-cols-3">
            {copy.faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.4rem] border border-white/25 bg-[#071a33]/80 p-5 backdrop-blur-md"
              >
                <h3 className="text-lg font-black text-[#fff200] [overflow-wrap:anywhere]">
                  {item.question}
                </h3>
                <p className="mt-4 text-sm font-bold leading-7 text-white/85">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceFinalCTA />
    </main>
  );
};

export default WebApp;
