import { ArrowRight, BookOpen, CheckCircle2, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import PageLayout from "../components/layout/PageLayout";
import { getCurrentLocale, getCurrentMarket, localizePath } from "../data/marketRuntime";

type LocaleKey = "fr" | "en" | "nl" | "kiny";

type KnowledgeItem = {
  term: string;
  answer: string;
  points: string[];
  service: string;
  serviceLabel: string;
};

const copyByLocale: Record<
  LocaleKey,
  {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    searchLabel: string;
    sectionsTitle: string;
    ctaTitle: string;
    ctaText: string;
    ctaPrimary: string;
    ctaSecondary: string;
    items: KnowledgeItem[];
  }
> = {
  fr: {
    seoTitle: "Glossaire SEO, AEO, GEO et visibilité IA | Creativa Poeta",
    seoDescription:
      "Definitions claires sur le SEO, AEO, GEO, visibilité locale, sites AI-ready, schema.org, assistants IA et contenu utile.",
    eyebrow: "Knowledge base",
    title: "Comprendre la visibilité moderne avant d'agir.",
    intro:
      "Des definitions courtes pour savoir comment Google, les maps, les assistants vocaux et les moteurs IA comprennent une entreprise.",
    searchLabel: "Questions que cette page aide a clarifier",
    sectionsTitle: "Definitions utiles",
    ctaTitle: "Vous voulez appliquer ces principes à votre entreprise ?",
    ctaText:
      "Commencez par un diagnostic de visibilité ou expliquez votre projet. On identifie ensuite le bon chemin: site, contenu, maps, IA ou outil digital.",
    ctaPrimary: "Tester ma visibilité",
    ctaSecondary: "Démarrer un projet",
    items: [
      {
        term: "Qu'est-ce que le SEO ?",
        answer:
          "Le SEO aide une page à être trouvée dans les moteurs de recherche grace a sa structure, son contenu, ses liens et sa credibilite.",
        points: ["Pages claires", "Mots et intentions de recherche", "Sitemap, liens internes et performance"],
        service: "/services/visibilite-locale",
        serviceLabel: "Voir la visibilité locale",
      },
      {
        term: "Qu'est-ce que l'AEO ?",
        answer:
          "L'AEO consiste a formuler des réponses directes aux questions des utilisateurs pour les moteurs de réponse, assistants vocaux et extraits enrichis.",
        points: ["Questions naturelles", "Réponses courtes et fiables", "FAQ et contenus structurés"],
        service: "/services/content-writing",
        serviceLabel: "Structurer le contenu",
      },
      {
        term: "Qu'est-ce que le GEO ?",
        answer:
          "Le GEO optimise une marque pour être comprise, citée ou recommandée par les moteurs génératifs comme ChatGPT, Gemini ou Perplexity.",
        points: ["Entite claire", "Mentions cohérentes", "Sources lisibles par les IA"],
        service: "/services/ia-automatisation",
        serviceLabel: "Preparer la visibilité IA",
      },
      {
        term: "C'est quoi un site AI-ready ?",
        answer:
          "Un site AI-ready contient des textes lisibles sans friction, des pages services claires, des données structurees et des chemins de contact faciles.",
        points: ["HTML lisible", "Schema.org", "Pages services et FAQ"],
        service: "/services/web-app",
        serviceLabel: "Creer un site clair",
      },
      {
        term: "À quoi sert schema.org ?",
        answer:
          "Schema.org donne aux moteurs une structure explicite: organisation, service, article, FAQ, fil d'Ariane ou offre.",
        points: ["JSON-LD", "Service schema", "FAQPage et BlogPosting"],
        service: "/services/web-app",
        serviceLabel: "Structurer mon site",
      },
      {
        term: "Pourquoi Google Maps compte pour l'IA ?",
        answer:
          "Les assistants peuvent s'appuyer sur les profils locaux, avis, categories, horaires et liens pour comprendre une entreprise proche.",
        points: ["Google Business Profile", "Apple Maps et Bing Places", "Nom, adresse, téléphone cohérents"],
        service: "/services/visibilite-locale",
        serviceLabel: "Aligner mes profils",
      },
    ],
  },
  en: {
    seoTitle: "SEO, AEO, GEO and AI visibility glossary | Creativa Poeta",
    seoDescription:
      "Clear definitions about SEO, AEO, GEO, local visibility, AI-ready websites, schema.org, AI assistants and useful content.",
    eyebrow: "Knowledge base",
    title: "Understand modern visibility before taking action.",
    intro:
      "Short definitions to understand how Google, maps, voice assistants and AI engines read and recommend a business.",
    searchLabel: "Questions this page helps clarify",
    sectionsTitle: "Useful definitions",
    ctaTitle: "Want to apply this to your business?",
    ctaText:
      "Start with a visibility diagnosis or explain your project. We then identify the right path: website, content, maps, AI or digital tool.",
    ctaPrimary: "Test my visibility",
    ctaSecondary: "Start a project",
    items: [
      {
        term: "What is SEO?",
        answer:
          "SEO helps a page be found in search engines through structure, content, links, performance and credibility.",
        points: ["Clear pages", "Search intent and terms", "Sitemap, internal links and performance"],
        service: "/services/visibilite-locale",
        serviceLabel: "See local visibility",
      },
      {
        term: "What is AEO?",
        answer:
          "AEO means creating direct answers to user questions for answer engines, voice assistants and featured results.",
        points: ["Natural questions", "Short reliable answers", "FAQ and structured content"],
        service: "/services/content-writing",
        serviceLabel: "Structure content",
      },
      {
        term: "What is GEO?",
        answer:
          "GEO prepares a brand to be understood, cited or recommended by generative engines such as ChatGPT, Gemini or Perplexity.",
        points: ["Clear entity", "Consistent mentions", "AI-readable sources"],
        service: "/services/ia-automatisation",
        serviceLabel: "Prepare AI visibility",
      },
      {
        term: "What is an AI-ready website?",
        answer:
          "An AI-ready website has readable content, clear service pages, structured data and simple contact paths.",
        points: ["Readable HTML", "Schema.org", "Service pages and FAQ"],
        service: "/services/web-app",
        serviceLabel: "Build a clear website",
      },
      {
        term: "What is schema.org used for?",
        answer:
          "Schema.org gives engines explicit structure: organization, service, article, FAQ, breadcrumb or offer.",
        points: ["JSON-LD", "Service schema", "FAQPage and BlogPosting"],
        service: "/services/web-app",
        serviceLabel: "Structure my website",
      },
      {
        term: "Why does Google Maps matter for AI?",
        answer:
          "Assistants can use local profiles, reviews, categories, hours and links to understand a nearby business.",
        points: ["Google Business Profile", "Apple Maps and Bing Places", "Consistent name, address and phone"],
        service: "/services/visibilite-locale",
        serviceLabel: "Align my profiles",
      },
    ],
  },
  nl: {
    seoTitle: "Glossarium SEO, AEO, GEO en AI-zichtbaarheid | Creativa Poeta",
    seoDescription:
      "Duidelijke definities over SEO, AEO, GEO, lokale zichtbaarheid, AI-klare websites, schema.org, AI-assistenten en nuttige content.",
    eyebrow: "Knowledge base",
    title: "Begrijp moderne zichtbaarheid voordat u actie onderneemt.",
    intro:
      "Korte definities over hoe Google, maps, stemassistenten en AI-systemen een bedrijf begrijpen.",
    searchLabel: "Vragen die deze pagina verduidelijkt",
    sectionsTitle: "Nuttige definities",
    ctaTitle: "Wilt u dit toepassen op uw bedrijf?",
    ctaText:
      "Start met een zichtbaarheidsdiagnose of leg uw project uit. Daarna kiezen we het juiste pad: website, content, maps, AI of digitale tool.",
    ctaPrimary: "Test mijn zichtbaarheid",
    ctaSecondary: "Start een project",
    items: [
      {
        term: "Wat is SEO?",
        answer:
          "SEO helpt een pagina vindbaar te worden in zoekmachines via structuur, content, links, prestaties en geloofwaardigheid.",
        points: ["Duidelijke pagina's", "Zoekintentie en termen", "Sitemap, interne links en prestaties"],
        service: "/services/visibilite-locale",
        serviceLabel: "Bekijk lokale zichtbaarheid",
      },
      {
        term: "Wat is AEO?",
        answer:
          "AEO betekent directe antwoorden maken voor vragen van gebruikers in antwoordmachines, stemassistenten en rich results.",
        points: ["Natuurlijke vragen", "Korte betrouwbare antwoorden", "FAQ en gestructureerde content"],
        service: "/services/content-writing",
        serviceLabel: "Content structureren",
      },
      {
        term: "Wat is GEO?",
        answer:
          "GEO bereidt een merk voor om begrepen, geciteerd of aanbevolen te worden door generatieve systemen zoals ChatGPT, Gemini of Perplexity.",
        points: ["Duidelijke entiteit", "Consistente vermeldingen", "AI-leesbare bronnen"],
        service: "/services/ia-automatisation",
        serviceLabel: "AI-zichtbaarheid voorbereiden",
      },
      {
        term: "Wat is een AI-klare website?",
        answer:
          "Een AI-klare website bevat leesbare teksten, duidelijke servicepagina's, gestructureerde data en eenvoudige contactpaden.",
        points: ["Leesbare HTML", "Schema.org", "Servicepagina's en FAQ"],
        service: "/services/web-app",
        serviceLabel: "Bouw een duidelijke website",
      },
      {
        term: "Waarvoor dient schema.org?",
        answer:
          "Schema.org geeft zoekmachines expliciete structuur: organisatie, dienst, artikel, FAQ, breadcrumb of aanbod.",
        points: ["JSON-LD", "Service schema", "FAQPage en BlogPosting"],
        service: "/services/web-app",
        serviceLabel: "Mijn website structureren",
      },
      {
        term: "Waarom telt Google Maps voor AI?",
        answer:
          "Assistenten kunnen lokale profielen, reviews, categorieen, openingsuren en links gebruiken om een nabij bedrijf te begrijpen.",
        points: ["Google Business Profile", "Apple Maps en Bing Places", "Consistente naam, adres en telefoon"],
        service: "/services/visibilite-locale",
        serviceLabel: "Profielen afstemmen",
      },
    ],
  },
  kiny: {
    seoTitle: "Glossary ya SEO, AEO, GEO na AI visibility | Creativa Poeta",
    seoDescription:
      "Ibisobanuro bigufi kuri SEO, AEO, GEO, local visibility, AI-ready websites, schema.org, AI assistants na useful content.",
    eyebrow: "Knowledge base",
    title: "Sobanukirwa visibility ya none mbere yo gutangira.",
    intro:
      "Ibisobanuro bigufi bifasha kumva uko Google, maps, voice assistants na AI engines zisoma business.",
    searchLabel: "Ibibazo iyi page ifasha gusobanura",
    sectionsTitle: "Definitions z'ingenzi",
    ctaTitle: "Ushaka kubishyira kuri business yawe?",
    ctaText:
      "Tangira na visibility diagnosis cyangwa utubwire project yawe. Duhitamo inzira ikwiye: website, content, maps, AI cyangwa digital tool.",
    ctaPrimary: "Test my visibility",
    ctaSecondary: "Start a project",
    items: [
      {
        term: "SEO ni iki?",
        answer:
          "SEO ifasha page kuboneka muri search engines biciye kuri structure, content, links, performance na credibility.",
        points: ["Pages zisobanutse", "Search intent", "Sitemap, internal links na performance"],
        service: "/services/visibilite-locale",
        serviceLabel: "Reba local visibility",
      },
      {
        term: "AEO ni iki?",
        answer:
          "AEO ni ugutegura ibisubizo bigufi kandi bisobanutse ku bibazo abantu babaza search engines na voice assistants.",
        points: ["Natural questions", "Answers ngufi", "FAQ na structured content"],
        service: "/services/content-writing",
        serviceLabel: "Structure content",
      },
      {
        term: "GEO ni iki?",
        answer:
          "GEO itegura brand kugira ngo generative engines nka ChatGPT, Gemini cyangwa Perplexity ziyumve kandi ziyivuge neza.",
        points: ["Clear entity", "Consistent mentions", "AI-readable sources"],
        service: "/services/ia-automatisation",
        serviceLabel: "Prepare AI visibility",
      },
      {
        term: "AI-ready website ni iki?",
        answer:
          "AI-ready website igira content isomeka, service pages zisobanutse, structured data na contact paths zoroshye.",
        points: ["Readable HTML", "Schema.org", "Service pages na FAQ"],
        service: "/services/web-app",
        serviceLabel: "Build clear website",
      },
      {
        term: "Schema.org imaze iki?",
        answer:
          "Schema.org iha search engines structure isobanutse: organization, service, article, FAQ, breadcrumb cyangwa offer.",
        points: ["JSON-LD", "Service schema", "FAQPage na BlogPosting"],
        service: "/services/web-app",
        serviceLabel: "Structure website",
      },
      {
        term: "Kuki Google Maps ari important kuri AI?",
        answer:
          "Assistants zishobora gukoresha local profiles, reviews, categories, hours na links kugira ngo zumve business iri hafi.",
        points: ["Google Business Profile", "Apple Maps na Bing Places", "Name, address na phone bihuye"],
        service: "/services/visibilite-locale",
        serviceLabel: "Align profiles",
      },
    ],
  },
};

const KnowledgePage = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market) as LocaleKey;
  const copy = copyByLocale[locale] ?? copyByLocale.fr;
  const pageUrl =
    typeof window === "undefined" ? "https://creativapoeta.com/knowledge" : window.location.href;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.seoTitle,
    description: copy.seoDescription,
    itemListElement: copy.items.map((item, index) => ({
      "@type": "DefinedTerm",
      position: index + 1,
      name: item.term,
      description: item.answer,
      url: `${pageUrl}#${encodeURIComponent(item.term.toLowerCase().replace(/\s+/g, "-"))}`,
    })),
  };

  return (
    <PageLayout className="min-h-screen bg-[#071a33] text-white">
      <MarketSEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        keywords="SEO, AEO, GEO, AI visibility, schema.org, local visibility, AI-ready website, Creativa Poeta"
        path="/knowledge"
        structuredData={structuredData}
      />

      <main className="relative isolate overflow-hidden px-4 pb-14 pt-28 phone:px-6 tablet:px-10 laptop:px-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(7,26,51,.96),rgba(0,0,0,.84)),repeating-linear-gradient(135deg,rgba(238,186,43,.12)_0,rgba(238,186,43,.12)_1px,transparent_1px,transparent_11px)]" />
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-6 laptop:grid-cols-[1.05fr_.95fr] laptop:items-end">
            <div>
              <div className="inline-flex items-center gap-2 border-l-8 border-[#fff200] pl-3 text-xs font-black uppercase text-[#fff200]">
                <Sparkles size={18} />
                {copy.eyebrow}
              </div>
              <h1 className="mt-5 max-w-4xl font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl laptop:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-black leading-7 text-white/82 phone:text-lg">
                {copy.intro}
              </p>
            </div>

            <aside className="border border-[#EEBA2B]/45 bg-black/25 p-4 backdrop-blur-md phone:p-5">
              <p className="flex items-center gap-2 text-sm font-black uppercase text-[#fff200]">
                <Search size={18} />
                {copy.searchLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {copy.items.slice(0, 6).map((item) => (
                  <a
                    key={item.term}
                    href={`#${encodeURIComponent(item.term.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-black text-white transition hover:border-[#fff200] hover:text-[#fff200]"
                  >
                    {item.term}
                  </a>
                ))}
              </div>
            </aside>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2 text-xl font-black text-[#fff200] phone:text-2xl">
              <BookOpen />
              <h2>{copy.sectionsTitle}</h2>
            </div>
            <div className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
              {copy.items.map((item) => (
                <article
                  id={encodeURIComponent(item.term.toLowerCase().replace(/\s+/g, "-"))}
                  key={item.term}
                  className="flex min-h-[17rem] flex-col justify-between border border-white/15 bg-[#0d223b]/92 p-4 shadow-xl shadow-black/20 phone:p-5"
                >
                  <div>
                    <h3 className="text-xl font-black leading-tight text-white">{item.term}</h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-white/78">{item.answer}</p>
                    <ul className="mt-4 space-y-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2 text-xs font-black leading-5 text-white/78">
                          <CheckCircle2 className="mt-0.5 shrink-0 text-[#fff200]" size={15} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={localizePath(item.service)}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase text-[#fff200]"
                  >
                    {item.serviceLabel}
                    <ArrowRight size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 border border-[#EEBA2B]/55 bg-black/30 p-5 phone:p-7 laptop:flex laptop:items-center laptop:justify-between laptop:gap-8">
            <div>
              <h2 className="font-['Black_Ops_One'] text-3xl leading-tight text-white phone:text-4xl">
                {copy.ctaTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm font-bold leading-7 text-white/78 phone:text-base">
                {copy.ctaText}
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 laptop:mt-0 laptop:min-w-[24rem]">
              <Link
                to={localizePath("/tester-visibilite")}
                className="inline-flex min-w-0 items-center justify-center gap-2 border-2 border-[#fff200] bg-[#fff200] px-3 py-3 text-center text-[10px] font-black uppercase text-[#071a33] phone:text-xs"
              >
                {copy.ctaPrimary}
                <ArrowRight size={15} />
              </Link>
              <Link
                to={localizePath("/start-project")}
                className="inline-flex min-w-0 items-center justify-center gap-2 border-2 border-white px-3 py-3 text-center text-[10px] font-black uppercase text-white phone:text-xs"
              >
                {copy.ctaSecondary}
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </PageLayout>
  );
};

export default KnowledgePage;
