import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaGoogle,
  FaMapMarkedAlt,
  FaMicrophoneAlt,
  FaRegLightbulb,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import ServiceFinalCTA from "./ServiceFinalCTA";

type AuditCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  secondaryCta: string;
  promiseTitle: string;
  promise: string;
  checksTitle: string;
  checks: Array<{ title: string; text: string }>;
  deliverTitle: string;
  deliver: string[];
  notTitle: string;
  notItems: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

const copies: Record<string, AuditCopy> = {
  fr: {
    eyebrow: "Premier produit d'appel",
    title: "Votre entreprise est-elle visible dans Google, les maps et les moteurs IA ?",
    intro:
      "Nous analysons votre site, votre page Google Maps, vos profils locaux et vos informations publiques pour voir si un client ou un outil comme ChatGPT peut vous trouver, vous comprendre et vous recommander.",
    cta: "Tester ma visibilit?",
    secondaryCta: "Parler a Creativa Poeta",
    promiseTitle: "Le but n'est pas de faire un rapport complique.",
    promise:
      "Le but est de vous montrer clairement ce qui bloque aujourd'hui : informations manquantes, textes confus, profils qui ne disent pas la meme chose, manque de réponses utiles ou presence difficile a lire pour les outils modernes.",
    checksTitle: "Ce que nous regardons",
    checks: [
      {
        title: "Google",
        text: "Est-ce que votre entreprise est facile à trouver et à comprendre dans les résultats de recherche ?",
      },
      {
        title: "Maps",
        text: "Est-ce que vos horaires, contacts, services et zones sont cohérents sur les cartes ?",
      },
      {
        title: "Recherche vocale",
        text: "Est-ce qu'une personne qui cherche en parlant peut obtenir une réponse claire sur votre entreprise ?",
      },
      {
        title: "Outils IA",
        text: "Est-ce que vos informations sont assez claires pour être reprises par des outils comme ChatGPT ?",
      },
    ],
    deliverTitle: "Ce que vous recevez",
    deliver: [
      "Une note simple de votre visibilit? actuelle.",
      "Les blocages les plus importants a corriger.",
      "Les informations a harmoniser sur votre site, vos maps et vos profils.",
      "Une liste d'actions prioritaires, classees du plus urgent au moins urgent.",
    ],
    notTitle: "Ce que ce service n'est pas",
    notItems: [
      "Ce n'est pas une promesse de première place sur Google.",
      "Ce n'est pas un jargon technique incomprehensible.",
      "Ce n'est pas une refonte complete du site.",
      "C'est un point de depart clair avant de depenser plus.",
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        question: "Est-ce utile si je n'ai pas encore de site ?",
        answer:
          "Oui. Nous pouvons analyser votre page Google Maps, vos réseaux sociaux, vos informations publiques et vous dire quelle base officielle construire en premier.",
      },
      {
        question: "Est-ce utile si j'ai déjà un site ?",
        answer:
          "Oui. Nous regardons si votre site explique vraiment vos services, vos contacts, vos zones, vos langues et les réponses importantes pour vos clients.",
      },
      {
        question: "Est-ce que vous garantissez que Google ou une IA va me recommander ?",
        answer:
          "Non. Personne ne peut garantir cela serieusement. Nous mettons en place les conditions pour que votre entreprise soit plus facile à trouver, comprendre et citer.",
      },
    ],
  },
  en: {
    eyebrow: "First entry service",
    title: "Is your business visible on Google, maps and AI search tools?",
    intro:
      "We review your website, Google Maps page, local profiles and public information to see whether clients or tools like ChatGPT can find, understand and recommend you.",
    cta: "Test my visibility",
    secondaryCta: "Talk to Creativa Poeta",
    promiseTitle: "The goal is not a complicated report.",
    promise:
      "The goal is to show what blocks visibility today: missing information, unclear wording, profiles that disagree, weak answers or a presence that modern tools cannot read clearly.",
    checksTitle: "What we check",
    checks: [
      {
        title: "Google",
        text: "Can your business be found and understood in search results?",
      },
      {
        title: "Maps",
        text: "Are your hours, contacts, services and areas consistent on maps?",
      },
      {
        title: "Voice search",
        text: "Can someone searching by voice get a clear answer about your business?",
      },
      {
        title: "AI tools",
        text: "Is your information clear enough for tools like ChatGPT to understand?",
      },
    ],
    deliverTitle: "What you receive",
    deliver: [
      "A simple score of your current visibility.",
      "The most important blockers to fix.",
      "The information to align across your website, maps and profiles.",
      "A priority list, from most urgent to least urgent.",
    ],
    notTitle: "What this service is not",
    notItems: [
      "It is not a promise to rank first on Google.",
      "It is not confusing technical jargon.",
      "It is not a full website redesign.",
      "It is a clear starting point before spending more.",
    ],
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Is this useful if I do not have a website yet?",
        answer:
          "Yes. We can review your Google Maps page, social profiles and public information, then explain which official base to build first.",
      },
      {
        question: "Is this useful if I already have a website?",
        answer:
          "Yes. We check whether your website clearly explains your services, contacts, areas, languages and important answers.",
      },
      {
        question: "Do you guarantee that Google or an AI tool will recommend me?",
        answer:
          "No. Nobody can seriously guarantee that. We build the conditions that make your business easier to find, understand and cite.",
      },
    ],
  },
  nl: {
    eyebrow: "Eerste instapdienst",
    title: "Is uw bedrijf zichtbaar op Google, maps en AI-tools?",
    intro:
      "We bekijken uw website, Google Maps-pagina, lokale profielen en publieke informatie om te zien of klanten of tools zoals ChatGPT u kunnen vinden, begrijpen en aanbevelen.",
    cta: "Test mijn zichtbaarheid",
    secondaryCta: "Praat met Creativa Poeta",
    promiseTitle: "Het doel is geen ingewikkeld rapport.",
    promise:
      "Het doel is duidelijk tonen wat vandaag blokkeert: ontbrekende informatie, onduidelijke teksten, profielen die niet hetzelfde zeggen, zwakke antwoorden of informatie die moderne tools moeilijk begrijpen.",
    checksTitle: "Wat we controleren",
    checks: [
      {
        title: "Google",
        text: "Is uw bedrijf makkelijk te vinden en te begrijpen in zoekresultaten?",
      },
      {
        title: "Maps",
        text: "Zijn uw openingsuren, contacten, diensten en regio's consistent op kaarten?",
      },
      {
        title: "Spraakzoekopdracht",
        text: "Krijgt iemand die spreekt tegen zijn telefoon een duidelijk antwoord over uw bedrijf?",
      },
      {
        title: "AI-tools",
        text: "Is uw informatie duidelijk genoeg voor tools zoals ChatGPT?",
      },
    ],
    deliverTitle: "Wat u ontvangt",
    deliver: [
      "Een eenvoudige score van uw huidige zichtbaarheid.",
      "De belangrijkste blokkades om te corrigeren.",
      "De informatie die moet kloppen op uw website, maps en profielen.",
      "Een prioriteitenlijst van dringend naar minder dringend.",
    ],
    notTitle: "Wat deze dienst niet is",
    notItems: [
      "Geen belofte van eerste plaats op Google.",
      "Geen onbegrijpelijke technische taal.",
      "Geen volledige herwerking van uw website.",
      "Wel een duidelijk startpunt voordat u meer investeert.",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Is dit nuttig als ik nog geen website heb?",
        answer:
          "Ja. We kunnen uw Google Maps-pagina, sociale profielen en publieke informatie bekijken en zeggen welke officiele basis eerst nodig is.",
      },
      {
        question: "Is dit nuttig als ik al een website heb?",
        answer:
          "Ja. We kijken of uw site uw diensten, contacten, regio's, talen en belangrijke antwoorden duidelijk uitlegt.",
      },
      {
        question: "Garanderen jullie dat Google of een AI-tool mij aanbeveelt?",
        answer:
          "Nee. Niemand kan dat serieus garanderen. We bouwen wel de voorwaarden waardoor uw bedrijf makkelijker te vinden, begrijpen en citeren is.",
      },
    ],
  },
  kiny: {
    eyebrow: "Serivisi yo gutangiriraho",
    title: "Ese ibikorwa byawe biragaragara kuri Google, maps na AI?",
    intro:
      "Tureba website yawe, Google Maps, imbuga ukoresha n'amakuru agaragara hanze kugira ngo tumenye niba umukiriya cyangwa igikoresho nka ChatGPT gishobora kukubona no kugusobanukirwa.",
    cta: "Reba uko ugaragara",
    secondaryCta: "Vugana na Creativa Poeta",
    promiseTitle: "Intego si raporo igoye.",
    promise:
      "Intego ni ukukwereka neza ibikubuza kugaragara: amakuru abura, amagambo atumvikana, imbuga zitavuga kimwe, ibisubizo bidahagije cyangwa amakuru atumvikana ku bikoresho bigezweho.",
    checksTitle: "Ibyo tureba",
    checks: [
      {
        title: "Google",
        text: "Ese ibikorwa byawe biraboneka kandi bisobanuka mu byo abantu bashaka?",
      },
      {
        title: "Maps",
        text: "Ese amasaha, aho bakubariza, serivisi n'aho ukorera birahuye ku makarita?",
      },
      {
        title: "Gushakisha ukoresheje ijwi",
        text: "Ese umuntu ubaza telefone ashobora kubona igisubizo gisobanutse kuri wowe?",
      },
      {
        title: "Ibikoresho bya AI",
        text: "Ese amakuru yawe arasobanutse bihagije ku bikoresho nka ChatGPT?",
      },
    ],
    deliverTitle: "Ibyo uhabwa",
    deliver: [
      "Isuzuma ryoroshye ry'uko ugaragara ubu.",
      "Ibibazo by'ingenzi bikwiye gukosorwa.",
      "Amakuru akwiye guhuzwa kuri website, maps n'imbuga ukoresha.",
      "Urutonde rw'ibikorwa byihutirwa.",
    ],
    notTitle: "Icyo iyi serivisi atari cyo",
    notItems: [
      "Si isezerano ryo kuba uwa mbere kuri Google.",
      "Si amagambo y'ikoranabuhanga agoye.",
      "Si uguhindura website yose.",
      "Ni intangiriro isobanutse mbere yo gushora byinshi.",
    ],
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      {
        question: "Bimfasha niba nta website mfite?",
        answer:
          "Yego. Dushobora kureba Google Maps, imbuga nkoranyambaga n'amakuru yawe agaragara, tukakubwira aho watangirira.",
      },
      {
        question: "Bimfasha niba nsanzwe mfite website?",
        answer:
          "Yego. Tureba niba website isobanura neza serivisi, aho bakubariza, aho ukorera, indimi n'ibisubizo by'ingenzi.",
      },
      {
        question: "Mwemeza ko Google cyangwa AI izangira inama abantu kuza iwanjye?",
        answer:
          "Oya. Nta muntu wabisezeranya neza. Dushyiraho ishingiro rituma ibikorwa byawe byoroha kuboneka, kumvikana no gusubirwamo.",
      },
    ],
  },
};

const checkIcons = [FaGoogle, FaMapMarkedAlt, FaMicrophoneAlt, TbMessageChatbot];

const AuditVisibility = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const auditToolPath = buildLocalLocalePath(market, locale, "/tester-visibilite");
  const contactPath = buildLocalLocalePath(market, locale, "/contact");

  return (
    <main className="relative isolate min-h-screen max-w-full overflow-x-hidden bg-[#071a33]/80 text-white">
      <section className="max-w-full overflow-x-hidden relative min-h-screen px-5 pb-16 pt-28 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#071a33]/95 via-[#10281f]/80 to-black/90" />
        <div className="absolute left-[-5rem] top-32 -z-10 h-56 w-56 rounded-full border-[2.8rem] border-[#EEBA2B]/20" />
        <div className="absolute bottom-10 right-[-4rem] -z-10 h-48 w-48 rotate-12 bg-[repeating-linear-gradient(135deg,rgba(238,186,43,.35)_0_12px,transparent_12px_24px)]" />

        <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-10 laptop:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-sm font-black uppercase tracking-wide text-white [overflow-wrap:anywhere]">
              <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
              {copy.eyebrow}
            </div>
            <h1 className="font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-[#fff200] phone:text-5xl laptop:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/90 phone:text-xl">
              {copy.intro}
            </p>
            <div className="mt-9 flex flex-col gap-4 phone:flex-row">
              <Link
                to={auditToolPath}
                className="inline-flex items-center justify-center gap-3 border-2 border-[#EEBA2B] bg-[#EEBA2B] px-6 py-4 text-sm font-black uppercase text-[#071a33] transition hover:bg-transparent hover:text-[#EEBA2B] [overflow-wrap:anywhere]"
              >
                {copy.cta}
                <FaSearch />
              </Link>
              <Link
                to={contactPath}
                className="inline-flex items-center justify-center gap-3 border-2 border-white px-6 py-4 text-sm font-black uppercase text-white transition hover:border-[#EEBA2B] hover:text-[#EEBA2B] [overflow-wrap:anywhere]"
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/12 p-5 shadow-2xl backdrop-blur-md phone:p-7">
            <FaRegLightbulb className="mb-5 text-5xl text-[#EEBA2B]" />
            <h2 className="text-2xl font-black text-white phone:text-3xl [overflow-wrap:anywhere]">
              {copy.promiseTitle}
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-white/85">
              {copy.promise}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden relative px-5 py-16 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="mx-auto min-w-0 max-w-7xl">
          <div className="mb-9 flex items-center gap-3 text-sm font-black uppercase text-white [overflow-wrap:anywhere]">
            <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
            {copy.checksTitle}
          </div>
          <div className="grid gap-5 tablet:grid-cols-2 laptop:grid-cols-4">
            {copy.checks.map((check, index) => {
              const Icon = checkIcons[index] ?? FaCheckCircle;
              return (
                <article
                  key={check.title}
                  className="group rounded-[1.7rem] border border-white/20 bg-white/90 p-6 text-[#071a33] shadow-xl transition duration-300 hover:-translate-y-2 hover:bg-white"
                >
                  <Icon className="mb-5 text-5xl text-[#071a33]" />
                  <div className="mb-5 h-1.5 w-16 bg-[#EEBA2B]" />
                  <h3 className="text-xl font-black [overflow-wrap:anywhere]">{check.title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-700">
                    {check.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden px-5 py-16 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="mx-auto grid min-w-0 max-w-7xl gap-8 laptop:grid-cols-2">
          <div className="rounded-[2rem] border border-[#EEBA2B]/50 bg-[#071a33]/80 p-7 backdrop-blur-md phone:p-9">
            <h2 className="text-3xl font-black text-[#fff200] [overflow-wrap:anywhere]">
              {copy.deliverTitle}
            </h2>
            <ul className="mt-7 space-y-4">
              {copy.deliver.map((item) => (
                <li key={item} className="flex gap-3 text-lg font-semibold leading-8">
                  <FaCheckCircle className="mt-1 flex-none text-[#EEBA2B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-md phone:p-9">
            <h2 className="text-3xl font-black text-white [overflow-wrap:anywhere]">{copy.notTitle}</h2>
            <ul className="mt-7 space-y-4">
              {copy.notItems.map((item) => (
                <li key={item} className="flex gap-3 text-lg font-semibold leading-8">
                  <FaTimesCircle className="mt-1 flex-none text-[#EEBA2B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden px-5 py-16 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="mx-auto min-w-0 max-w-5xl">
          <h2 className="text-3xl font-black text-[#fff200] phone:text-4xl [overflow-wrap:anywhere]">
            {copy.faqTitle}
          </h2>
          <div className="mt-8 space-y-5">
            {copy.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.5rem] border border-white/20 bg-white/90 p-6 text-[#071a33]"
              >
                <h3 className="text-xl font-black [overflow-wrap:anywhere]">{faq.question}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-700">
                  {faq.answer}
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

export default AuditVisibility;
