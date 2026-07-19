import { Link } from "react-router-dom";
import co from "../../assets/co.png";
import des from "../../assets/des.png";
import marketIcon from "../../assets/market.png";
import tech from "../../assets/tech.png";
import web from "../../assets/web.png";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import type { LocaleCode } from "../../data/markets";
import "./Services.css";

const serviceImages = {
  visibility: marketIcon,
  digital: web,
  ai: tech,
  design: des,
  content: co,
  support: tech,
};

const servicesCopy: Record<
  LocaleCode,
  {
    eyebrow: string;
    title: string;
    intro: string;
    services: Array<{
      eyebrow: string;
      title: string;
      description: string;
      includes: string[];
      image: string;
      path: string;
    }>;
  }
> = {
  fr: {
    eyebrow: "Nos services",
    title: "Ce que nous construisons avec vous.",
    intro:
      "Des idées, des images, des mots, des sites, des outils intelligents et une présence plus claire là où vos clients vous cherchent.",
    services: [
      {
        eyebrow: "Visibilité",
        title: "présence locale",
        description:
          "Nous aidons votre entreprise à être trouvée au bon moment, sur Google, les maps, la recherche vocale et les outils intelligents.",
        includes: [
          "Audit de visibilité",
          "Google, Maps et profils locaux",
          "Avis, horaires et informations cohérentes",
          "Présence dans les moteurs IA",
          "Référencement local",
        ],
        image: serviceImages.visibility,
        path: "/services/visibilite-locale",
      },
      {
        eyebrow: "Sites, apps",
        title: "outils digitaux",
        description:
          "Nous construisons la base officielle de votre entreprise: sites, pages utiles, applications, logiciels internes et systèmes complets.",
        includes: [
          "Site vitrine et pages de service",
          "Landing pages",
          "Plateformes web et applications",
          "Logiciels internes",
          "Formulaires et tableaux de bord",
        ],
        image: serviceImages.digital,
        path: "/services/site-officiel",
      },
      {
        eyebrow: "IA",
        title: "assistants IA",
        description:
          "Nous créons des assistants IA, GPT personnalisés, chatbots et agents intelligents adaptés à votre métier.",
        includes: [
          "Assistant IA privé",
          "GPT personnalisé",
          "Chatbot pour entreprise",
          "Automatisation de réponses",
          "Agents IA et intégrations API",
        ],
        image: serviceImages.ai,
        path: "/services/ia-automatisation",
      },
      {
        eyebrow: "Design",
        title: "identité visuelle",
        description:
          "Nous donnons une forme visible à votre univers avec des visuels clairs, beaux et mémorables.",
        includes: [
          "Logo et identité visuelle",
          "Affiches, flyers et brochures",
          "Supports réseaux sociaux",
          "Présentations",
          "Infographies et publicités",
        ],
        image: serviceImages.design,
        path: "/services/graphic-design",
      },
      {
        eyebrow: "Contenu",
        title: "documents",
        description:
          "Nous transformons vos idées en mots, documents et supports professionnels qui racontent clairement votre histoire.",
        includes: [
          "Rédaction professionnelle",
          "Ghostwriting",
          "Articles, blogs et textes web",
          "CV, lettres et profils LinkedIn",
          "Rapports, ebooks et guides",
        ],
        image: serviceImages.content,
        path: "/services/content-writing",
      },
      {
        eyebrow: "Aide tech",
        title: "assistance numérique",
        description:
          "Nous aidons les particuliers, entrepreneurs et petites structures à installer, configurer, dépanner et mieux utiliser leurs outils numériques.",
        includes: [
          "Dépannage ordinateur, téléphone et tablette",
          "Installation et configuration",
          "Comptes, emails, cloud et imprimantes",
          "Démarches en ligne et réseaux sociaux",
          "Sécurité, mots de passe et accompagnement pas à pas",
        ],
        image: serviceImages.support,
        path: "/services/assistance-numerique",
      },
    ],
  },
  en: {
    eyebrow: "Our services",
    title: "What we build with you.",
    intro:
      "Ideas, visuals, words, websites, intelligent tools and a clearer présence where your customers search.",
    services: [
      {
        eyebrow: "Visibility",
        title: "local presence",
        description:
          "We help your business be found at the right moment on Google, maps, voice search and intelligent tools.",
        includes: [
          "Visibility audit",
          "Google, Maps and local profiles",
          "Reviews, opening hours and consistent information",
          "Presence in AI search tools",
          "Local search visibility",
        ],
        image: serviceImages.visibility,
        path: "/services/visibilite-locale",
      },
      {
        eyebrow: "Sites, apps",
        title: "digital tools",
        description:
          "We build your official base: websites, useful pages, applications, internal software and complete systems.",
        includes: [
          "Business websites and service pages",
          "Landing pages",
          "Web platforms and applications",
          "Internal software",
          "Forms and dashboards",
        ],
        image: serviceImages.digital,
        path: "/services/site-officiel",
      },
      {
        eyebrow: "AI",
        title: "assistants",
        description:
          "We create AI assistants, custom GPTs, chatbots and smart agents adapted to your work.",
        includes: [
          "Private AI assistant",
          "Custom GPT",
          "Business chatbot",
          "Automated answers",
          "AI agents and API integrations",
        ],
        image: serviceImages.ai,
        path: "/services/ia-automatisation",
      },
      {
        eyebrow: "Design",
        title: "visual identity",
        description:
          "We give your world a visible shape with clear, beautiful and memorable visuals.",
        includes: [
          "Logo and visual identity",
          "Posters, flyers and brochures",
          "Social media visuals",
          "Presentations",
          "Infographics and ads",
        ],
        image: serviceImages.design,
        path: "/services/graphic-design",
      },
      {
        eyebrow: "Content",
        title: "documents",
        description:
          "We turn your ideas into words, documents and professional materials that tell your story clearly.",
        includes: [
          "Professional writing",
          "Ghostwriting",
          "Articles, blogs and website copy",
          "CVs, letters and LinkedIn profiles",
          "Reports, ebooks and guides",
        ],
        image: serviceImages.content,
        path: "/services/content-writing",
      },
      {
        eyebrow: "Tech help",
        title: "digital assistance",
        description:
          "We help individuals, entrepreneurs and small teams install, configure, troubleshoot and use digital tools with more confidence.",
        includes: [
          "Computer, phone and tablet troubleshooting",
          "Installation and configuration",
          "Accounts, email, cloud and printers",
          "Online tasks and social media",
          "Security, passwords and step-by-step support",
        ],
        image: serviceImages.support,
        path: "/services/assistance-numerique",
      },
    ],
  },
  nl: {
    eyebrow: "Onze diensten",
    title: "Wat wij samen met u bouwen.",
    intro:
      "Ideeen, beelden, woorden, websites, intelligente tools en een duidelijkere aanwezigheid waar uw klanten zoeken.",
    services: [
      {
        eyebrow: "Zichtbaarheid",
        title: "lokale aanwezigheid",
        description:
          "We helpen uw bedrijf gevonden te worden op het juiste moment, via Google, maps, spraakzoekopdrachten en intelligente tools.",
        includes: [
          "Zichtbaarheidsaudit",
          "Google, Maps en lokale profielen",
          "Reviews, openingsuren en consistente informatie",
          "Aanwezigheid in AI-zoektools",
          "Lokale vindbaarheid",
        ],
        image: serviceImages.visibility,
        path: "/services/visibilite-locale",
      },
      {
        eyebrow: "Sites, apps",
        title: "digitale tools",
        description:
          "We bouwen uw officiele basis: websites, nuttige pagina's, applicaties, interne software en complete systemen.",
        includes: [
          "Bedrijfswebsite en servicepagina's",
          "Landingspagina's",
          "Webplatformen en applicaties",
          "Interne software",
          "Formulieren en dashboards",
        ],
        image: serviceImages.digital,
        path: "/services/site-officiel",
      },
      {
        eyebrow: "AI",
        title: "assistenten",
        description:
          "We maken AI-assistenten, gepersonaliseerde GPTs, chatbots en slimme agents aangepast aan uw werk.",
        includes: [
          "Prive AI-assistent",
          "Gepersonaliseerde GPT",
          "Chatbot voor bedrijven",
          "Automatische antwoorden",
          "AI-agents en API-integraties",
        ],
        image: serviceImages.ai,
        path: "/services/ia-automatisation",
      },
      {
        eyebrow: "Design",
        title: "visuele identiteit",
        description:
          "We geven uw wereld een zichtbare vorm met heldere, mooie en memorabele visuals.",
        includes: [
          "Logo en visuele identiteit",
          "Affiches, flyers en brochures",
          "Social media visuals",
          "Presentaties",
          "Infographics en advertenties",
        ],
        image: serviceImages.design,
        path: "/services/graphic-design",
      },
      {
        eyebrow: "Content",
        title: "documenten",
        description:
          "We zetten uw ideeen om in woorden, documenten en professionele materialen die uw verhaal duidelijk vertellen.",
        includes: [
          "Professionele redactie",
          "Ghostwriting",
          "Artikels, blogs en websiteteksten",
          "CV's, brieven en LinkedIn-profielen",
          "Rapporten, ebooks en gidsen",
        ],
        image: serviceImages.content,
        path: "/services/content-writing",
      },
      {
        eyebrow: "Tech hulp",
        title: "digitale assistentie",
        description:
          "We helpen particulieren, ondernemers en kleine teams digitale tools installeren, configureren, herstellen en met vertrouwen gebruiken.",
        includes: [
          "Computer, telefoon en tablet oplossen",
          "Installatie en configuratie",
          "Accounts, email, cloud en printers",
          "Online taken en sociale media",
          "Veiligheid, wachtwoorden en begeleiding stap voor stap",
        ],
        image: serviceImages.support,
        path: "/services/assistance-numerique",
      },
    ],
  },
  kiny: {
    eyebrow: "Serivisi zacu",
    title: "Ibyo twubakana namwe.",
    intro:
      "Ibitekerezo, amashusho, amagambo, website, tools zifite ubwenge n'uburyo burushijeho gusobanuka aho abakiriya bashakira.",
    services: [
      {
        eyebrow: "Kugaragara",
        title: "aho abakiriya bashakira",
        description:
          "Dufasha business yawe kuboneka igihe gikwiye kuri Google, maps, search y'ijwi n'ibikoresho bifite ubwenge.",
        includes: [
          "Kureba uko mugaragara",
          "Google, Maps na profiles za local",
          "Reviews, amasaha n'amakuru ahuye",
          "Kugaragara muri AI search",
          "Local visibility",
        ],
        image: serviceImages.visibility,
        path: "/services/visibilite-locale",
      },
      {
        eyebrow: "Websites, apps",
        title: "tools za digital",
        description:
          "Twubaka isoko y'amakuru yemewe ya business: websites, pages zifasha, apps, software y'imbere na systems.",
        includes: [
          "Website na pages za services",
          "Landing pages",
          "Platforms na applications",
          "Software y'imbere",
          "Forms na dashboards",
        ],
        image: serviceImages.digital,
        path: "/services/site-officiel",
      },
      {
        eyebrow: "AI",
        title: "assistants",
        description:
          "Dukora AI assistants, GPTs zihariye, chatbots na agents zijyanye n'akazi kawe.",
        includes: [
          "Private AI assistant",
          "Custom GPT",
          "Chatbot ya business",
          "Ibisubizo automatic",
          "AI agents na API integrations",
        ],
        image: serviceImages.ai,
        path: "/services/ia-automatisation",
      },
      {
        eyebrow: "Design",
        title: "identity",
        description:
          "Duha isura igaragara ibyo mukora, tukoresheje visuals zisobanutse kandi zibukwa.",
        includes: [
          "Logo na identity",
          "Affiches, flyers na brochures",
          "Visuals za social media",
          "Presentations",
          "Infographics na ads",
        ],
        image: serviceImages.design,
        path: "/services/graphic-design",
      },
      {
        eyebrow: "Content",
        title: "documents",
        description:
          "Duhindura ibitekerezo byanyu amagambo, documents n'ibikoresho bisobanura neza inkuru yanyu.",
        includes: [
          "Professional writing",
          "Ghostwriting",
          "Articles, blogs na website texts",
          "CV, letters na LinkedIn profiles",
          "Reports, ebooks na guides",
        ],
        image: serviceImages.content,
        path: "/services/content-writing",
      },
      {
        eyebrow: "Tech help",
        title: "digital support",
        description:
          "Dufasha abantu, entrepreneurs na teams ntoya gushyiraho, gutunganya, gukemura ibibazo no gukoresha tools za digital.",
        includes: [
          "Gukemura ibibazo bya computer, telephone na tablet",
          "Installation na configuration",
          "Accounts, email, cloud na printers",
          "Démarchés online na social media",
          "Security, passwords no kugufasha intambwe ku yindi",
        ],
        image: serviceImages.support,
        path: "/services/assistance-numerique",
      },
    ],
  },
};

const Services = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = servicesCopy[locale] ?? servicesCopy.en;
  const servicePath = (path: string) => buildLocalLocalePath(market, locale, path);

  return (
    <section id="services" className="cp-services-section">
      <div className="cp-services-shell">
        <div className="cp-services-heading cp-title-on-bg">
          <p>{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <span>{copy.intro}</span>
        </div>

        <div className="cp-services-list">
          {copy.services.map((service) => {
            return (
              <Link
                className="cp-service-line"
                to={servicePath(service.path)}
                key={service.path}
              >
                <span className="cp-service-icon">
                  <img src={service.image} alt="" height={72} width={72} />
                </span>
                <span className="cp-service-name">
                  <em>{service.eyebrow}</em>
                  <strong>{service.title}</strong>
                </span>
                <span className="cp-service-divider" aria-hidden="true" />
                <span className="cp-service-content">
                  <span className="cp-service-description">{service.description}</span>
                  <span className="cp-service-includes">
                    {service.includes.map((item) => (
                      <small key={item}>{item}</small>
                    ))}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
