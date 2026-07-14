import {
  Bot,
  FileText,
  MapPin,
  MonitorSmartphone,
  Palette,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../../data/marketRuntime";
import modernVisibilityFr from "../../assets/alignment/modern-visibility.webp";
import modernVisibilityEn from "../../assets/alignment/modern-visibility-en.webp";
import modernVisibilityNl from "../../assets/alignment/modern-visibility-nl.webp";
import siteToolsFr from "../../assets/services/official-website/site-tools-ecosystem-fr.webp";
import siteToolsEn from "../../assets/services/official-website/site-tools-ecosystem-en.webp";
import siteToolsNl from "../../assets/services/official-website/site-tools-ecosystem-nl.webp";
import assistantFr from "../../assets/services/ai-automation/assistant-ai-fr.webp";
import assistantEn from "../../assets/services/ai-automation/assistant-ai-en.webp";
import assistantNl from "../../assets/services/ai-automation/assistant-ai-nl.webp";
import designFr from "../../assets/services/graphic-design/brand-universe-fr.webp";
import designEn from "../../assets/services/graphic-design/brand-universe-en.webp";
import designNl from "../../assets/services/graphic-design/brand-universe-nl.webp";
import contentFr from "../../assets/services/content-writing/clear-documents-fr.webp";
import contentEn from "../../assets/services/content-writing/clear-documents-en.webp";
import contentNl from "../../assets/services/content-writing/clear-documents-nl.webp";
import assistanceFr from "../../assets/services/digital-assistance/human-support-fr.webp";
import assistanceEn from "../../assets/services/digital-assistance/human-support-en.webp";
import assistanceNl from "../../assets/services/digital-assistance/human-support-nl.webp";

type LocaleKey = "fr" | "en" | "nl" | "kiny";

type LocalizedAsset = {
  fr: string;
  en: string;
  nl: string;
};

type ServiceStory = {
  sectionName: string;
  imageTitle: string;
  imageText: string;
  title: string;
  body: string;
  bullets: string[];
  path: string;
  action: string;
  image: LocalizedAsset;
  alt: string;
  icon: typeof MapPin;
};

const pickAsset = (locale: LocaleKey, asset: LocalizedAsset) => {
  if (locale === "fr") return asset.fr;
  if (locale === "nl") return asset.nl;
  return asset.en;
};

const homeServiceCopy: Record<
  LocaleKey,
  {
    intro: {
      eyebrow: string;
      title: string;
      body: string;
    };
    services: ServiceStory[];
  }
> = {
  fr: {
    intro: {
      eyebrow: "Ce que nous faisons",
      title: "Creativa Poeta ne fait pas seulement de la visibilite.",
      body:
        "Nous construisons toute la presence digitale autour de votre activite: etre trouve, expliquer clairement, creer des outils, automatiser, presenter votre image et accompagner vos besoins numeriques.",
    },
    services: [
      {
        sectionName: "Presence locale",
        imageTitle: "Etre trouve au bon moment",
        imageText: "Votre entreprise devient plus claire pour Google, Maps, les recherches vocales et les assistants IA.",
        title: "Visibilite locale, Google, maps et IA",
        body:
          "Nous alignons votre site, vos profils, vos maps, vos avis et vos reponses pour que les clients et les moteurs modernes comprennent mieux qui vous etes.",
        bullets: ["Google Maps", "Recherche vocale", "AEO, GEO et presence IA"],
        path: "/services/visibilite-locale",
        action: "Voir la visibilite",
        image: { fr: modernVisibilityFr, en: modernVisibilityEn, nl: modernVisibilityNl },
        alt: "Visibilite moderne sur Google, maps, voix et outils IA",
        icon: MapPin,
      },
      {
        sectionName: "Outils digitaux",
        imageTitle: "Une base digitale utile",
        imageText: "Site, application, formulaire, dashboard et donnees travaillent ensemble pour servir vos clients.",
        title: "Sites web, applications et outils digitaux",
        body:
          "Nous creons la base officielle de votre entreprise: site clair, pages utiles, application client, tableau de bord ou logiciel interne.",
        bullets: ["Site officiel", "Application ou portail", "Dashboard et systeme interne"],
        path: "/services/site-officiel",
        action: "Voir les outils digitaux",
        image: { fr: siteToolsFr, en: siteToolsEn, nl: siteToolsNl },
        alt: "Ecosysteme digital avec site, application, formulaire, tableau de bord et base de donnees",
        icon: MonitorSmartphone,
      },
      {
        sectionName: "Voix et IA",
        imageTitle: "Un assistant qui comprend votre activite",
        imageText: "Vos documents et processus deviennent une base claire pour repondre plus vite et mieux guider vos utilisateurs.",
        title: "Assistants IA, GPT, chatbots et agents",
        body:
          "Nous transformons vos documents, services et processus en assistants capables de repondre, guider, resumer ou preparer des actions.",
        bullets: ["Assistant prive", "Base de connaissances", "Agent connecte aux outils"],
        path: "/services/ia-automatisation",
        action: "Voir les assistants IA",
        image: { fr: assistantFr, en: assistantEn, nl: assistantNl },
        alt: "Assistant IA Creativa Poeta avec sources, documents et conversation",
        icon: Bot,
      },
      {
        sectionName: "Image de marque",
        imageTitle: "Un univers visuel coherent",
        imageText: "Vos couleurs, logos, supports et publications gardent la meme force partout ou votre marque apparait.",
        title: "Design graphique et identite visuelle",
        body:
          "Nous donnons une forme visible a votre univers: logo, couleurs, supports, publications, presentations et visuels coherents.",
        bullets: ["Identite visuelle", "Supports prets a publier", "Marque reconnaissable"],
        path: "/services/graphic-design",
        action: "Voir le design",
        image: { fr: designFr, en: designEn, nl: designNl },
        alt: "Univers de marque coherent avec logo, couleurs, typographies et supports",
        icon: Palette,
      },
      {
        sectionName: "Mots et documents",
        imageTitle: "Des idees transformees en supports clairs",
        imageText: "Vos contenus deviennent plus structures, plus lisibles et prets a etre utilises par vos clients.",
        title: "Contenu, redaction et documents professionnels",
        body:
          "Nous transformons vos idees en textes, articles, documents, rapports, guides, profils et supports clairs pour vos clients.",
        bullets: ["Textes web et articles", "Rapports et guides", "CV, lettres et profils LinkedIn"],
        path: "/services/content-writing",
        action: "Voir le contenu",
        image: { fr: contentFr, en: contentEn, nl: contentNl },
        alt: "Idees transformees en documents clairs et supports professionnels",
        icon: FileText,
      },
      {
        sectionName: "Assistance numerique",
        imageTitle: "Une aide humaine et concrete",
        imageText: "Installation, securite, comptes, appareils et demarches deviennent plus simples a gerer au quotidien.",
        title: "Assistance numerique et depannage",
        body:
          "Nous aidons a installer, configurer, securiser, depanner et mieux utiliser les appareils, comptes, outils et demarches numeriques.",
        bullets: ["Configuration appareils", "Securite et comptes", "Accompagnement pas a pas"],
        path: "/services/assistance-numerique",
        action: "Voir l'assistance",
        image: { fr: assistanceFr, en: assistanceEn, nl: assistanceNl },
        alt: "Assistance numerique humaine pour simplifier la vie digitale",
        icon: Wrench,
      },
    ],
  },
  en: {
    intro: {
      eyebrow: "What we do",
      title: "Creativa Poeta is not only about visibility.",
      body:
        "We build the full digital presence around your activity: being found, explaining clearly, creating tools, automating, shaping your image and supporting digital needs.",
    },
    services: [
      {
        sectionName: "Local presence",
        imageTitle: "Be found at the right moment",
        imageText: "Your business becomes clearer for Google, Maps, voice searches and AI assistants.",
        title: "Local visibility, Google, maps and AI",
        body:
          "We align your website, profiles, maps, reviews and answers so customers and modern search tools understand who you are.",
        bullets: ["Google Maps", "Voice search", "AEO, GEO and AI presence"],
        path: "/services/visibilite-locale",
        action: "See visibility",
        image: { fr: modernVisibilityFr, en: modernVisibilityEn, nl: modernVisibilityNl },
        alt: "Modern visibility across Google, maps, voice and AI tools",
        icon: MapPin,
      },
      {
        sectionName: "Digital tools",
        imageTitle: "A useful digital base",
        imageText: "Website, app, form, dashboard and data work together to serve your customers.",
        title: "Websites, apps and digital tools",
        body:
          "We create your official digital base: a clear website, useful pages, customer app, dashboard or internal software.",
        bullets: ["Official website", "App or portal", "Dashboard and internal system"],
        path: "/services/site-officiel",
        action: "See digital tools",
        image: { fr: siteToolsFr, en: siteToolsEn, nl: siteToolsNl },
        alt: "Digital ecosystem with website, app, form, dashboard and database",
        icon: MonitorSmartphone,
      },
      {
        sectionName: "Voice and AI",
        imageTitle: "An assistant that understands your activity",
        imageText: "Your documents and processes become a clear base to answer faster and guide users better.",
        title: "AI assistants, GPT, chatbots and agents",
        body:
          "We turn your documents, services and processes into assistants that can answer, guide, summarize and prepare actions.",
        bullets: ["Private assistant", "Knowledge base", "Agent connected to tools"],
        path: "/services/ia-automatisation",
        action: "See AI assistants",
        image: { fr: assistantFr, en: assistantEn, nl: assistantNl },
        alt: "Creativa Poeta AI assistant with sources, documents and conversation",
        icon: Bot,
      },
      {
        sectionName: "Brand image",
        imageTitle: "A coherent visual universe",
        imageText: "Your colors, logos, assets and posts keep the same strength wherever your brand appears.",
        title: "Graphic design and visual identity",
        body:
          "We shape your visual universe: logo, colors, assets, posts, presentations and consistent brand materials.",
        bullets: ["Visual identity", "Ready-to-publish assets", "Recognizable brand"],
        path: "/services/graphic-design",
        action: "See design",
        image: { fr: designFr, en: designEn, nl: designNl },
        alt: "Coherent brand universe with logo, colors, typography and assets",
        icon: Palette,
      },
      {
        sectionName: "Words and documents",
        imageTitle: "Ideas transformed into clear materials",
        imageText: "Your content becomes more structured, easier to read and ready for clients to use.",
        title: "Content, writing and professional documents",
        body:
          "We turn your ideas into texts, articles, documents, reports, guides, profiles and clear client-facing materials.",
        bullets: ["Web copy and articles", "Reports and guides", "CVs, letters and LinkedIn profiles"],
        path: "/services/content-writing",
        action: "See content",
        image: { fr: contentFr, en: contentEn, nl: contentNl },
        alt: "Ideas transformed into clear documents and professional materials",
        icon: FileText,
      },
      {
        sectionName: "Digital assistance",
        imageTitle: "Human and concrete help",
        imageText: "Setup, security, accounts, devices and online tasks become easier to manage every day.",
        title: "Digital assistance and troubleshooting",
        body:
          "We help install, configure, secure, repair and better use devices, accounts, tools and online processes.",
        bullets: ["Device setup", "Security and accounts", "Step-by-step support"],
        path: "/services/assistance-numerique",
        action: "See assistance",
        image: { fr: assistanceFr, en: assistanceEn, nl: assistanceNl },
        alt: "Human digital assistance to simplify digital life",
        icon: Wrench,
      },
    ],
  },
  nl: {
    intro: {
      eyebrow: "Wat we doen",
      title: "Creativa Poeta gaat niet alleen over zichtbaarheid.",
      body:
        "We bouwen de volledige digitale aanwezigheid rond uw activiteit: gevonden worden, duidelijk uitleggen, tools maken, automatiseren, uw beeld vormgeven en digitale ondersteuning bieden.",
    },
    services: [
      {
        sectionName: "Lokale aanwezigheid",
        imageTitle: "Gevonden worden op het juiste moment",
        imageText: "Uw bedrijf wordt duidelijker voor Google, Maps, voice search en AI-assistenten.",
        title: "Lokale zichtbaarheid, Google, maps en AI",
        body:
          "We stemmen uw website, profielen, kaarten, reviews en antwoorden op elkaar af zodat klanten en moderne zoektools u beter begrijpen.",
        bullets: ["Google Maps", "Voice search", "AEO, GEO en AI-aanwezigheid"],
        path: "/services/visibilite-locale",
        action: "Bekijk zichtbaarheid",
        image: { fr: modernVisibilityFr, en: modernVisibilityEn, nl: modernVisibilityNl },
        alt: "Moderne zichtbaarheid op Google, maps, voice en AI-tools",
        icon: MapPin,
      },
      {
        sectionName: "Digitale tools",
        imageTitle: "Een nuttige digitale basis",
        imageText: "Website, app, formulier, dashboard en data werken samen om uw klanten beter te bedienen.",
        title: "Websites, apps en digitale tools",
        body:
          "We bouwen uw officiele digitale basis: een duidelijke website, nuttige pagina's, klantenapp, dashboard of interne software.",
        bullets: ["Officiele website", "App of portaal", "Dashboard en intern systeem"],
        path: "/services/site-officiel",
        action: "Bekijk digitale tools",
        image: { fr: siteToolsFr, en: siteToolsEn, nl: siteToolsNl },
        alt: "Digitaal ecosysteem met website, app, formulier, dashboard en database",
        icon: MonitorSmartphone,
      },
      {
        sectionName: "Voice en AI",
        imageTitle: "Een assistent die uw activiteit begrijpt",
        imageText: "Uw documenten en processen worden een duidelijke basis om sneller te antwoorden en gebruikers beter te begeleiden.",
        title: "AI-assistenten, GPT, chatbots en agents",
        body:
          "We maken van uw documenten, diensten en processen assistenten die kunnen antwoorden, begeleiden, samenvatten en acties voorbereiden.",
        bullets: ["Private assistent", "Kennisbank", "Agent verbonden met tools"],
        path: "/services/ia-automatisation",
        action: "Bekijk AI-assistenten",
        image: { fr: assistantFr, en: assistantEn, nl: assistantNl },
        alt: "Creativa Poeta AI-assistent met bronnen, documenten en gesprek",
        icon: Bot,
      },
      {
        sectionName: "Merkbeeld",
        imageTitle: "Een coherente visuele wereld",
        imageText: "Uw kleuren, logo, materialen en posts behouden dezelfde kracht overal waar uw merk verschijnt.",
        title: "Grafisch design en visuele identiteit",
        body:
          "We geven uw merk een duidelijke vorm: logo, kleuren, materialen, posts, presentaties en consistente visuele dragers.",
        bullets: ["Visuele identiteit", "Publicatieklare materialen", "Herkenbaar merk"],
        path: "/services/graphic-design",
        action: "Bekijk design",
        image: { fr: designFr, en: designEn, nl: designNl },
        alt: "Coherente merkwereld met logo, kleuren, typografie en materialen",
        icon: Palette,
      },
      {
        sectionName: "Teksten en documenten",
        imageTitle: "Ideeen omgezet in duidelijke materialen",
        imageText: "Uw content wordt beter gestructureerd, leesbaarder en klaar voor gebruik door klanten.",
        title: "Content, teksten en professionele documenten",
        body:
          "We zetten uw ideeen om in teksten, artikels, documenten, rapporten, gidsen, profielen en duidelijke klantgerichte materialen.",
        bullets: ["Webteksten en artikels", "Rapporten en gidsen", "CV's, brieven en LinkedIn-profielen"],
        path: "/services/content-writing",
        action: "Bekijk content",
        image: { fr: contentFr, en: contentEn, nl: contentNl },
        alt: "Ideeen omgezet in duidelijke documenten en professionele materialen",
        icon: FileText,
      },
      {
        sectionName: "Digitale ondersteuning",
        imageTitle: "Menselijke en concrete hulp",
        imageText: "Installatie, veiligheid, accounts, apparaten en online taken worden eenvoudiger te beheren.",
        title: "Digitale ondersteuning en troubleshooting",
        body:
          "We helpen apparaten, accounts, tools en online stappen installeren, configureren, beveiligen, herstellen en beter gebruiken.",
        bullets: ["Apparaatconfiguratie", "Veiligheid en accounts", "Stap-voor-stap begeleiding"],
        path: "/services/assistance-numerique",
        action: "Bekijk ondersteuning",
        image: { fr: assistanceFr, en: assistanceEn, nl: assistanceNl },
        alt: "Menselijke digitale ondersteuning om het digitale leven te vereenvoudigen",
        icon: Wrench,
      },
    ],
  },
  kiny: {
    intro: {
      eyebrow: "What we do",
      title: "Creativa Poeta is not only about visibility.",
      body:
        "We build visibility, websites, digital tools, AI assistants, design, content and digital assistance around your activity.",
    },
    services: [],
  },
};



homeServiceCopy.kiny.services = homeServiceCopy.en.services;

const sectionStyleOne = {
  backgroundImage:
    "linear-gradient(115deg, rgba(1, 13, 26, 0.58), rgba(5, 23, 43, 0.68)), url('/images/home-refonte-bg.jpg')",
};

const sectionStyleTwo = {
  backgroundImage:
    "linear-gradient(120deg, rgba(0, 8, 20, 0.74), rgba(5, 23, 43, 0.78)), url('/images/home-refonte-bg.jpg')",
};

const HomeServiceStorySections = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market) as LocaleKey;
  const copy = homeServiceCopy[locale] ?? homeServiceCopy.fr;

  return (
    <>
      {copy.services.map((service, index) => {
        const isDark = index % 2 === 1;
        const Icon = service.icon;
        return (
          <section
            id={index === 0 ? "__next-section" : undefined}
            key={service.path}
            className={`cp-refonte-section ${isDark ? "cp-refonte-dark" : "cp-refonte-light"} cp-visual-section`}
            style={isDark ? sectionStyleTwo : sectionStyleOne}
          >
            <div className={`cp-refonte-shell cp-home-service-row ${index % 2 === 1 ? "is-reversed" : ""}`}>
              <div className={`cp-refonte-heading cp-floating-heading cp-home-service-copy ${isDark ? "cp-refonte-heading-dark" : "cp-title-on-bg"}`}>
                <p>{service.sectionName}</p>
                <h2>{service.title}</h2>
                <span>{service.body}</span>
                <div className="cp-home-service-actions cp-home-service-actions-desktop">
                  <div className="cp-home-service-tags">
                    {service.bullets.map((bullet) => (
                      <small key={bullet}>{bullet}</small>
                    ))}
                  </div>
                  <Link to={localizePath(service.path)} className="cp-home-service-cta">
                    <Icon size={18} aria-hidden="true" />
                    {service.action}
                  </Link>
                </div>
              </div>

              <div className="cp-visual-stack cp-home-service-visual-stack">
                <article className="is-wide">
                  <img
                    src={pickAsset(locale, service.image)}
                    alt={service.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div>
                    <h3>{service.imageTitle}</h3>
                    <p>{service.imageText}</p>
                  </div>
                </article>
                <div className="cp-home-service-actions cp-home-service-actions-mobile">
                  <div className="cp-home-service-tags">
                    {service.bullets.map((bullet) => (
                      <small key={bullet}>{bullet}</small>
                    ))}
                  </div>
                  <Link to={localizePath(service.path)} className="cp-home-service-cta">
                    <Icon size={18} aria-hidden="true" />
                    {service.action}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default HomeServiceStorySections;






