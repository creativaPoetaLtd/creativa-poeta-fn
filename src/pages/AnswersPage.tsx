import { ArrowRight, HelpCircle, SearchCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import PageLayout from "../components/layout/PageLayout";
import { getCurrentLocale, getCurrentMarket, localizePath } from "../data/marketRuntime";

type LocaleKey = "fr" | "en" | "nl" | "kiny";

type AnswerItem = {
  question: string;
  answer: string;
  action: string;
  href: string;
};

const answersByLocale: Record<
  LocaleKey,
  {
    title: string;
    description: string;
    eyebrow: string;
    hero: string;
    intro: string;
    label: string;
    ctaTitle: string;
    ctaText: string;
    ctaPrimary: string;
    ctaSecondary: string;
    answers: AnswerItem[];
  }
> = {
  fr: {
    title: "Questions sur la visibilite moderne, Google et IA | Creativa Poeta",
    description:
      "Reponses claires aux questions que les clients posent a Google, aux assistants vocaux et aux IA sur la visibilite, les sites, maps, contenus et outils digitaux.",
    eyebrow: "Reponses utiles",
    hero: "Les vraies questions que vos clients peuvent poser a Google, Siri ou une IA.",
    intro:
      "Cette page rassemble les formulations naturelles qu'une personne peut taper ou demander a voix haute. Chaque reponse renvoie vers le service le plus logique.",
    label: "Questions prioritaires",
    ctaTitle: "Vous voulez savoir ce qui bloque votre visibilite ?",
    ctaText:
      "Commencez par un test simple. Ensuite on decide si la priorite est Google Maps, le site, les contenus, les donnees structurees ou l'IA.",
    ctaPrimary: "Tester ma visibilite",
    ctaSecondary: "Demarrer un projet",
    answers: [
      {
        question: "Comment faire pour que mon entreprise soit trouvee sur Google et Google Maps ?",
        answer:
          "Il faut aligner votre site, votre fiche Google, vos services, vos zones, vos avis, vos horaires, vos photos et vos liens. Google comprend mieux une entreprise quand les informations sont coherentes partout.",
        action: "Travailler ma visibilite locale",
        href: "/services/visibilite-locale",
      },
      {
        question: "Comment etre recommande par ChatGPT, Gemini, Perplexity ou les moteurs IA ?",
        answer:
          "Une IA recommande plus facilement une entreprise quand elle trouve des pages claires, des services bien nommes, des reponses utiles, des preuves publiques, des donnees structurees et des sources coherentes.",
        action: "Preparer ma visibilite IA",
        href: "/services/ia-automatisation",
      },
      {
        question: "Est-ce qu'un site web suffit pour etre visible ?",
        answer:
          "Non. Le site est la base officielle, mais il doit etre relie aux maps, profils sociaux, contenus, FAQ, schema.org et chemins de contact. La visibilite moderne fonctionne comme un ecosysteme.",
        action: "Construire une base digitale claire",
        href: "/services/web-app",
      },
      {
        question: "Pourquoi mon entreprise n'apparait pas bien dans les recherches locales ?",
        answer:
          "Souvent, les categories sont faibles, les textes ne disent pas clairement les services, les zones ne sont pas precisees, les avis sont peu exploites ou les informations publiques ne racontent pas la meme chose.",
        action: "Faire un diagnostic",
        href: "/tester-visibilite",
      },
      {
        question: "Quels contenus faut-il creer pour attirer les bons clients ?",
        answer:
          "Il faut des pages services, des reponses aux questions frequentes, des articles utiles, des exemples concrets, des pages locales et des contenus qui expliquent clairement pour qui vous travaillez.",
        action: "Creer des contenus utiles",
        href: "/services/content-writing",
      },
      {
        question: "Comment rendre mon site lisible par les assistants vocaux et les IA ?",
        answer:
          "Le site doit avoir une structure simple, des titres explicites, des reponses courtes, du schema.org, un sitemap propre, des liens internes et des pages accessibles sans friction technique.",
        action: "Structurer mon site",
        href: "/knowledge",
      },
    ],
  },
  en: {
    title: "Questions about modern visibility, Google and AI | Creativa Poeta",
    description:
      "Clear answers to questions clients ask Google, voice assistants and AI tools about visibility, websites, maps, content and digital tools.",
    eyebrow: "Useful answers",
    hero: "Real questions your clients may ask Google, Siri or an AI assistant.",
    intro:
      "This page gathers natural search and voice formulations. Each answer links to the most relevant service or action.",
    label: "Priority questions",
    ctaTitle: "Want to know what blocks your visibility?",
    ctaText:
      "Start with a simple test. Then we decide whether the priority is Google Maps, the website, content, structured data or AI.",
    ctaPrimary: "Test my visibility",
    ctaSecondary: "Start a project",
    answers: [
      {
        question: "How can my business be found on Google and Google Maps?",
        answer:
          "Align your website, Google profile, services, areas, reviews, hours, photos and links. Google understands a business better when public information is consistent everywhere.",
        action: "Work on local visibility",
        href: "/services/visibilite-locale",
      },
      {
        question: "How can my business be recommended by ChatGPT, Gemini, Perplexity or AI engines?",
        answer:
          "AI tools can understand and mention a business more easily when they find clear pages, named services, useful answers, public proof, structured data and consistent sources.",
        action: "Prepare AI visibility",
        href: "/services/ia-automatisation",
      },
      {
        question: "Is a website enough to be visible?",
        answer:
          "No. The website is the official base, but it should connect with maps, social profiles, content, FAQ, schema.org and contact paths. Modern visibility works as an ecosystem.",
        action: "Build a clear digital base",
        href: "/services/web-app",
      },
      {
        question: "Why does my business not appear well in local searches?",
        answer:
          "Often, categories are weak, services are unclear, areas are missing, reviews are underused or public information is inconsistent across platforms.",
        action: "Run a diagnosis",
        href: "/tester-visibilite",
      },
      {
        question: "What content should I create to attract the right clients?",
        answer:
          "You need service pages, answers to frequent questions, useful articles, concrete examples, local pages and content that clearly explains who you help.",
        action: "Create useful content",
        href: "/services/content-writing",
      },
      {
        question: "How do I make my website readable for voice assistants and AI tools?",
        answer:
          "Use simple structure, explicit headings, short answers, schema.org, a clean sitemap, internal links and pages accessible without technical friction.",
        action: "Structure my site",
        href: "/knowledge",
      },
    ],
  },
  nl: {
    title: "Vragen over moderne zichtbaarheid, Google en AI | Creativa Poeta",
    description:
      "Duidelijke antwoorden op vragen die klanten aan Google, stemassistenten en AI-tools stellen over zichtbaarheid, websites, maps, content en digitale tools.",
    eyebrow: "Nuttige antwoorden",
    hero: "Echte vragen die klanten aan Google, Siri of AI kunnen stellen.",
    intro:
      "Deze pagina verzamelt natuurlijke zoekvragen en gesproken vragen. Elk antwoord verwijst naar de meest logische actie.",
    label: "Belangrijke vragen",
    ctaTitle: "Wilt u weten wat uw zichtbaarheid blokkeert?",
    ctaText:
      "Start met een eenvoudige test. Daarna bepalen we of Google Maps, website, content, structured data of AI prioriteit heeft.",
    ctaPrimary: "Test mijn zichtbaarheid",
    ctaSecondary: "Start een project",
    answers: [
      {
        question: "Hoe kan mijn bedrijf gevonden worden op Google en Google Maps?",
        answer:
          "Stem uw website, Google-profiel, diensten, regio's, reviews, openingsuren, foto's en links op elkaar af. Google begrijpt een bedrijf beter wanneer publieke informatie consistent is.",
        action: "Werk aan lokale zichtbaarheid",
        href: "/services/visibilite-locale",
      },
      {
        question: "Hoe kan mijn bedrijf aanbevolen worden door ChatGPT, Gemini, Perplexity of AI-systemen?",
        answer:
          "AI-systemen begrijpen en noemen een bedrijf makkelijker wanneer ze duidelijke pagina's, benoemde diensten, nuttige antwoorden, publieke bewijzen, structured data en consistente bronnen vinden.",
        action: "AI-zichtbaarheid voorbereiden",
        href: "/services/ia-automatisation",
      },
      {
        question: "Is een website genoeg om zichtbaar te zijn?",
        answer:
          "Nee. De website is de officiele basis, maar moet verbonden zijn met maps, sociale profielen, content, FAQ, schema.org en contactpaden.",
        action: "Bouw een duidelijke digitale basis",
        href: "/services/web-app",
      },
      {
        question: "Waarom verschijnt mijn bedrijf niet goed in lokale zoekopdrachten?",
        answer:
          "Vaak zijn categorieen zwak, diensten onduidelijk, regio's niet vermeld, reviews weinig benut of publieke gegevens niet consistent.",
        action: "Doe een diagnose",
        href: "/tester-visibilite",
      },
      {
        question: "Welke content moet ik maken om de juiste klanten aan te trekken?",
        answer:
          "Maak servicepagina's, antwoorden op veelgestelde vragen, nuttige artikels, concrete voorbeelden, lokale pagina's en content die duidelijk uitlegt wie u helpt.",
        action: "Maak nuttige content",
        href: "/services/content-writing",
      },
      {
        question: "Hoe maak ik mijn website leesbaar voor stemassistenten en AI-tools?",
        answer:
          "Gebruik een eenvoudige structuur, duidelijke titels, korte antwoorden, schema.org, een goede sitemap, interne links en toegankelijke pagina's.",
        action: "Structureer mijn site",
        href: "/knowledge",
      },
    ],
  },
  kiny: {
    title: "Questions about modern visibility, Google and AI | Creativa Poeta",
    description:
      "Answers about Google visibility, maps, AI tools, voice assistants, websites, content and digital tools.",
    eyebrow: "Useful answers",
    hero: "Questions clients can ask Google, Siri or AI tools.",
    intro:
      "This page groups natural questions and points each answer to the right Creativa Poeta service.",
    label: "Priority questions",
    ctaTitle: "Want to know what blocks your visibility?",
    ctaText:
      "Start with a simple visibility test, then we choose the right priority.",
    ctaPrimary: "Test my visibility",
    ctaSecondary: "Start a project",
    answers: [
      {
        question: "How can my business be found on Google and maps?",
        answer:
          "Align the website, Google profile, services, areas, reviews, hours, photos and links so public information tells one clear story.",
        action: "Work on local visibility",
        href: "/services/visibilite-locale",
      },
      {
        question: "How can AI tools understand and recommend my business?",
        answer:
          "AI tools need clear pages, services, answers, structured data, public proof and consistent sources.",
        action: "Prepare AI visibility",
        href: "/services/ia-automatisation",
      },
      {
        question: "Is a website enough for visibility?",
        answer:
          "No. The website is the official base, but modern visibility also needs maps, content, social profiles, FAQ and schema.org.",
        action: "Build a digital base",
        href: "/services/web-app",
      },
      {
        question: "Why is my business weak in local searches?",
        answer:
          "Usually the categories, services, areas, reviews or public information are incomplete or inconsistent.",
        action: "Run a diagnosis",
        href: "/tester-visibilite",
      },
      {
        question: "What content should attract the right clients?",
        answer:
          "Service pages, FAQs, useful articles, local pages and concrete examples help clients and search tools understand your offer.",
        action: "Create useful content",
        href: "/services/content-writing",
      },
      {
        question: "How do I make a site readable for AI?",
        answer:
          "Use clear structure, short answers, schema.org, sitemap, internal links and accessible pages.",
        action: "Structure my site",
        href: "/knowledge",
      },
    ],
  },
};

const AnswersPage = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market) as LocaleKey;
  const copy = answersByLocale[locale] ?? answersByLocale.fr;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.answers.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageLayout className="min-h-screen bg-[#071a33] text-white">
      <MarketSEOHead
        title={copy.title}
        description={copy.description}
        keywords="questions visibility, AEO questions, GEO questions, AI visibility answers, Google Maps visibility, voice search"
        path="/answers"
        structuredData={structuredData}
      />

      <main className="relative isolate overflow-hidden px-4 pb-14 pt-28 phone:px-6 tablet:px-10 laptop:px-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(7,26,51,.96),rgba(0,0,0,.88)),repeating-linear-gradient(135deg,rgba(238,186,43,.1)_0,rgba(238,186,43,.1)_1px,transparent_1px,transparent_12px)]" />
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-6 laptop:grid-cols-[1.05fr_.95fr] laptop:items-end">
            <div>
              <div className="inline-flex items-center gap-2 border-l-8 border-[#fff200] pl-3 text-xs font-black uppercase text-[#fff200]">
                <Sparkles size={18} />
                {copy.eyebrow}
              </div>
              <h1 className="mt-5 max-w-4xl font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl laptop:text-7xl">
                {copy.hero}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-white/78 laptop:text-xl">
                {copy.intro}
              </p>
            </div>

            <div className="rounded-[8px] border border-[#fff200]/35 bg-black/28 p-5 shadow-[0_0_45px_rgba(0,0,0,.25)]">
              <div className="flex items-center gap-3 text-[#fff200]">
                <SearchCheck size={26} />
                <p className="text-sm font-black uppercase">{copy.label}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-black text-white/80">
                {copy.answers.map((item, index) => (
                  <a
                    key={item.question}
                    href={`#q-${index + 1}`}
                    className="rounded-full border border-white/16 bg-white/7 px-3 py-2 hover:border-[#fff200] hover:text-[#fff200]"
                  >
                    {index + 1}. {item.question.split("?")[0]}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-3 tablet:grid-cols-2">
            {copy.answers.map((item, index) => (
              <article
                key={item.question}
                id={`q-${index + 1}`}
                className="rounded-[8px] border border-white/14 bg-white/[.07] p-4 shadow-[0_18px_45px_rgba(0,0,0,.24)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff200] text-black">
                    <HelpCircle size={21} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black leading-snug text-white">{item.question}</h2>
                    <p className="mt-3 text-sm font-semibold leading-7 text-white/76">{item.answer}</p>
                    <Link
                      to={localizePath(item.href)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase text-[#fff200]"
                    >
                      {item.action}
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-10 rounded-[8px] border border-[#fff200]/45 bg-[#fff200] p-5 text-black tablet:flex tablet:items-center tablet:justify-between tablet:gap-8">
            <div>
              <h2 className="text-2xl font-black">{copy.ctaTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-black/76">{copy.ctaText}</p>
            </div>
            <div className="mt-5 flex gap-3 tablet:mt-0">
              <Link
                to={localizePath("/tester-visibilite")}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-black px-4 py-3 text-center text-xs font-black uppercase text-white tablet:flex-none"
              >
                {copy.ctaPrimary}
              </Link>
              <Link
                to={localizePath("/start-project")}
                className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-black px-4 py-3 text-center text-xs font-black uppercase text-black tablet:flex-none"
              >
                {copy.ctaSecondary}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </PageLayout>
  );
};

export default AnswersPage;
