import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaClipboardList,
  FaGlobe,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaShareAlt,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";

type OfficialCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  secondaryCta: string;
  whyTitle: string;
  whyText: string;
  blocksTitle: string;
  blocks: Array<{ title: string; text: string }>;
  pathsTitle: string;
  paths: Array<{ title: string; text: string }>;
  deliverTitle: string;
  deliver: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

const copies: Record<string, OfficialCopy> = {
  fr: {
    eyebrow: "Site officiel",
    title: "Votre site doit devenir la source officielle que les clients et les IA comprennent.",
    intro:
      "Nous creons ou refondons un site clair qui explique vos services, vos contacts, vos zones, vos langues, vos questions frequentes et vos preuves de confiance pour les clients, Google et les outils IA.",
    cta: "Construire ma source officielle",
    secondaryCta: "Tester d'abord ma visibilite",
    whyTitle: "Un site vitrine ne suffit plus s'il ne sert qu'a faire joli.",
    whyText:
      "Aujourd'hui, votre site doit aider les clients, les maps, les recherches vocales et les outils IA a comprendre votre entreprise. Il doit rassembler les informations fiables que vous controlez.",
    blocksTitle: "Ce que le site doit expliquer clairement",
    blocks: [
      {
        title: "Vos services",
        text: "Ce que vous faites, pour qui, dans quelles situations et avec quel resultat attendu.",
      },
      {
        title: "Vos contacts",
        text: "Comment vous joindre, ou vous trouver, quand vous etes disponible et quel canal utiliser.",
      },
      {
        title: "Vos zones",
        text: "Les villes, regions, pays ou publics que vous servez, sans donner une impression confuse.",
      },
      {
        title: "Vos reponses",
        text: "Les questions que les clients posent avant de vous faire confiance ou de vous contacter.",
      },
    ],
    pathsTitle: "Deux cas possibles",
    paths: [
      {
        title: "Vous avez deja un site",
        text: "Nous gardons ce qui fonctionne, puis nous clarifions la structure, les textes, les pages utiles, les liens vers vos profils et les signaux de confiance.",
      },
      {
        title: "Vous n'avez pas encore de site",
        text: "Nous commencons par une base simple et propre : accueil, services, contact, questions frequentes et liens vers vos profils publics.",
      },
    ],
    deliverTitle: "Ce que nous livrons",
    deliver: [
      "Une structure claire pour vos visiteurs et les moteurs modernes.",
      "Des pages qui expliquent vos services avec des mots simples.",
      "Un formulaire ou un chemin de contact visible.",
      "Des liens coherents vers vos maps, reseaux sociaux et profils publics.",
      "Une base evolutive pour ajouter d'autres langues, pays ou services.",
    ],
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Est-ce que je dois avoir un site si j'ai deja Google Maps ou Instagram ?",
        answer:
          "Oui si vous voulez une source officielle que vous controlez. Maps et reseaux sociaux sont utiles, mais ils ne remplacent pas une base claire qui rassemble vos informations.",
      },
      {
        question: "Est-ce que le site doit etre gros ?",
        answer:
          "Non. Il doit surtout etre clair. On peut commencer petit, puis ajouter des pages utiles quand le besoin devient precis.",
      },
      {
        question: "Est-ce que le site aide pour les IA ?",
        answer:
          "Oui, s'il contient des informations claires, coherentes et accessibles. Les outils modernes ont besoin de sources fiables pour comprendre votre entreprise.",
      },
    ],
  },
  en: {
    eyebrow: "Official website",
    title: "Your website should become the official source clients and AI tools understand.",
    intro:
      "We create or rebuild a clear website that explains your services, contacts, areas, languages, common questions and trust signals for clients, Google and AI tools.",
    cta: "Build my official source",
    secondaryCta: "Test visibility first",
    whyTitle: "A brochure website is not enough if it only looks nice.",
    whyText:
      "Today, your website should help clients, maps, voice search and AI tools understand your business. It should gather the reliable information you control.",
    blocksTitle: "What your website must explain clearly",
    blocks: [
      {
        title: "Your services",
        text: "What you do, for whom, in which situations and with what expected outcome.",
      },
      {
        title: "Your contacts",
        text: "How to reach you, where to find you, when you are available and which channel to use.",
      },
      {
        title: "Your areas",
        text: "The cities, regions, countries or audiences you serve without creating confusion.",
      },
      {
        title: "Your answers",
        text: "The questions clients ask before trusting you or contacting you.",
      },
    ],
    pathsTitle: "Two possible cases",
    paths: [
      {
        title: "You already have a website",
        text: "We keep what works, then clarify the structure, wording, useful pages, links to public profiles and trust signals.",
      },
      {
        title: "You do not have a website yet",
        text: "We start with a clean base: home, services, contact, common questions and links to public profiles.",
      },
    ],
    deliverTitle: "What we deliver",
    deliver: [
      "A clear structure for visitors and modern search tools.",
      "Pages that explain your services in simple words.",
      "A visible contact path or form.",
      "Consistent links to maps, social profiles and public profiles.",
      "A base that can grow with more languages, countries or services.",
    ],
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Do I need a website if I already have Google Maps or Instagram?",
        answer:
          "Yes if you want an official source you control. Maps and social profiles are useful, but they do not replace a clear base that gathers your information.",
      },
      {
        question: "Does the website need to be large?",
        answer:
          "No. It mostly needs to be clear. We can start small and add useful pages when the need becomes precise.",
      },
      {
        question: "Does the website help with AI tools?",
        answer:
          "Yes, if it contains clear, consistent and accessible information. Modern tools need reliable sources to understand your business.",
      },
    ],
  },
  nl: {
    eyebrow: "Officiele website",
    title: "Uw website moet de officiele bron worden die klanten en AI-tools begrijpen.",
    intro:
      "We maken of verbeteren een duidelijke website die uw diensten, contactgegevens, regio's, talen, veelgestelde vragen en vertrouwen uitlegt voor klanten, Google en AI-tools.",
    cta: "Bouw mijn officiele bron",
    secondaryCta: "Test eerst mijn zichtbaarheid",
    whyTitle: "Een mooie website is niet genoeg als hij niets duidelijk maakt.",
    whyText:
      "Vandaag moet uw site klanten, maps, gesproken zoekopdrachten en AI-tools helpen uw bedrijf te begrijpen. Hij moet betrouwbare informatie verzamelen die u controleert.",
    blocksTitle: "Wat de site duidelijk moet uitleggen",
    blocks: [
      {
        title: "Uw diensten",
        text: "Wat u doet, voor wie, in welke situaties en met welk verwacht resultaat.",
      },
      {
        title: "Uw contact",
        text: "Hoe men u bereikt, waar men u vindt, wanneer u beschikbaar bent en welk kanaal men gebruikt.",
      },
      {
        title: "Uw regio's",
        text: "De steden, regio's, landen of doelgroepen die u bedient zonder verwarring te maken.",
      },
      {
        title: "Uw antwoorden",
        text: "De vragen die klanten stellen voordat ze u vertrouwen of contacteren.",
      },
    ],
    pathsTitle: "Twee mogelijke situaties",
    paths: [
      {
        title: "U hebt al een website",
        text: "We behouden wat werkt en verduidelijken de structuur, teksten, nuttige pagina's, links naar profielen en vertrouwen.",
      },
      {
        title: "U hebt nog geen website",
        text: "We beginnen met een duidelijke basis: home, diensten, contact, veelgestelde vragen en links naar publieke profielen.",
      },
    ],
    deliverTitle: "Wat we opleveren",
    deliver: [
      "Een duidelijke structuur voor bezoekers en moderne zoektools.",
      "Pagina's die uw diensten uitleggen in eenvoudige woorden.",
      "Een zichtbare contactweg of formulier.",
      "Consistente links naar maps, sociale profielen en publieke profielen.",
      "Een basis die kan groeien met meer talen, landen of diensten.",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Heb ik een website nodig als ik al Google Maps of Instagram heb?",
        answer:
          "Ja, als u een officiele bron wilt die u controleert. Maps en sociale profielen zijn nuttig, maar vervangen geen duidelijke basis met uw informatie.",
      },
      {
        question: "Moet de website groot zijn?",
        answer:
          "Nee. Hij moet vooral duidelijk zijn. We kunnen klein starten en later nuttige pagina's toevoegen.",
      },
      {
        question: "Helpt de website voor AI-tools?",
        answer:
          "Ja, als hij duidelijke, consistente en toegankelijke informatie bevat. Moderne tools hebben betrouwbare bronnen nodig.",
      },
    ],
  },
  kiny: {
    eyebrow: "Website yemewe",
    title: "Website yawe igomba kuba isoko yemewe abakiriya na AI basobanukirwa.",
    intro:
      "Dukora cyangwa tuvugurura website isobanura serivisi, aho bakubariza, aho ukorera, indimi, ibibazo bisanzwe n'ibimenyetso bitanga icyizere ku bakiriya, Google n'ibikoresho bya AI.",
    cta: "Kubaka isoko yemewe",
    secondaryCta: "Banza urebe uko ugaragara",
    whyTitle: "Website isa neza gusa ntihagije.",
    whyText:
      "Uyu munsi website igomba gufasha abakiriya, maps, gushakisha ukoresheje ijwi n'ibikoresho bya AI gusobanukirwa ibikorwa byawe.",
    blocksTitle: "Ibyo website igomba gusobanura neza",
    blocks: [
      {
        title: "Serivisi zawe",
        text: "Ibyo ukora, abo ubikorera, igihe babikenera n'igisubizo bategereza.",
      },
      {
        title: "Aho bakubariza",
        text: "Uko baguhamagara, aho bakubona, amasaha ukora n'umuyoboro wo gukoresha.",
      },
      {
        title: "Aho ukorera",
        text: "Imijyi, uturere, ibihugu cyangwa abantu uha serivisi ku buryo budateza urujijo.",
      },
      {
        title: "Ibisubizo byawe",
        text: "Ibibazo abakiriya bibaza mbere yo kukugirira icyizere cyangwa kukwandikira.",
      },
    ],
    pathsTitle: "Uburyo bubiri bushoboka",
    paths: [
      {
        title: "Usanzwe ufite website",
        text: "Dukomeza ibikora neza, tugatunganya imiterere, amagambo, paji z'ingenzi n'ibimenyetso bitanga icyizere.",
      },
      {
        title: "Nta website uragira",
        text: "Dutangirira ku ishingiro ryoroshye: ahabanza, serivisi, contact, ibibazo bisanzwe n'imbuga ukoresha.",
      },
    ],
    deliverTitle: "Ibyo dutanga",
    deliver: [
      "Imiterere isobanutse ku basura website no ku bikoresho byo gushakisha.",
      "Paji zisobanura serivisi zawe mu magambo yoroshye.",
      "Inzira igaragara yo kukwandikira cyangwa form.",
      "Links zihuye zijya kuri maps, social media n'imbuga zawe.",
      "Ishingiro rishobora gukura rikongerwamo indimi, ibihugu cyangwa serivisi.",
    ],
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      {
        question: "Nkeneye website niba mfite Google Maps cyangwa Instagram?",
        answer:
          "Yego niba ushaka isoko yemewe ugenzura. Maps n'imbuga nkoranyambaga birafasha, ariko ntibisimbura website isobanutse.",
      },
      {
        question: "Website igomba kuba nini?",
        answer:
          "Oya. Igomba mbere na mbere gusobanuka. Dushobora gutangira ntoya tukongeraho paji uko bikenewe.",
      },
      {
        question: "Website ifasha ku bikoresho bya AI?",
        answer:
          "Yego, iyo ifite amakuru asobanutse kandi ahuye. Ibikoresho bigezweho bikenera amasoko yizewe.",
      },
    ],
  },
};

const blockIcons = [FaClipboardList, FaGlobe, FaMapMarkedAlt, FaQuestionCircle];

const OfficialWebsite = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const startPath = buildLocalLocalePath(market, locale, "/start-project");
  const auditPath = buildLocalLocalePath(market, locale, "/services/audit-visibilite");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071a33]/80 text-white">
      <section className="relative px-5 pb-16 pt-28 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/95 via-[#071a33]/85 to-[#123b30]/85" />
        <div className="absolute right-[-5rem] top-24 -z-10 h-64 w-64 rounded-full border-[3rem] border-[#EEBA2B]/20" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 laptop:min-h-[78vh] laptop:grid-cols-[1fr_.9fr]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-sm font-black uppercase tracking-wide">
              <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
              {copy.eyebrow}
            </div>
            <h1 className="font-['Black_Ops_One'] text-4xl leading-tight text-[#fff200] phone:text-5xl laptop:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/90 phone:text-xl">
              {copy.intro}
            </p>
            <div className="mt-9 flex flex-col gap-4 phone:flex-row">
              <Link
                to={startPath}
                className="inline-flex items-center justify-center gap-3 border-2 border-[#EEBA2B] bg-[#EEBA2B] px-6 py-4 text-sm font-black uppercase text-[#071a33] transition hover:bg-transparent hover:text-[#EEBA2B]"
              >
                {copy.cta}
                <FaShareAlt />
              </Link>
              <Link
                to={auditPath}
                className="inline-flex items-center justify-center gap-3 border-2 border-white px-6 py-4 text-sm font-black uppercase text-white transition hover:border-[#EEBA2B] hover:text-[#EEBA2B]"
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/12 p-6 shadow-2xl backdrop-blur-md phone:p-8">
            <FaGlobe className="mb-5 text-5xl text-[#EEBA2B]" />
            <h2 className="text-2xl font-black phone:text-3xl">{copy.whyTitle}</h2>
            <p className="mt-5 text-base font-semibold leading-8 text-white/85">
              {copy.whyText}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex items-center gap-3 text-sm font-black uppercase">
            <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
            {copy.blocksTitle}
          </div>
          <div className="grid gap-5 tablet:grid-cols-2 laptop:grid-cols-4">
            {copy.blocks.map((block, index) => {
              const Icon = blockIcons[index] ?? FaCheckCircle;
              return (
                <article
                  key={block.title}
                  className="rounded-[1.7rem] border border-white/20 bg-white/90 p-6 text-[#071a33] shadow-xl transition duration-300 hover:-translate-y-2"
                >
                  <Icon className="mb-5 text-5xl text-[#071a33]" />
                  <div className="mb-5 h-1.5 w-16 bg-[#EEBA2B]" />
                  <h3 className="text-xl font-black">{block.title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-700">
                    {block.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 laptop:grid-cols-2">
          {copy.paths.map((path) => (
            <article
              key={path.title}
              className="rounded-[2rem] border border-[#EEBA2B]/40 bg-[#071a33]/80 p-7 backdrop-blur-md phone:p-9"
            >
              <h2 className="text-3xl font-black text-[#fff200]">{path.title}</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-white/85">
                {path.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/20 bg-white/90 p-7 text-[#071a33] phone:p-9">
          <h2 className="text-3xl font-black">{copy.deliverTitle}</h2>
          <ul className="mt-7 space-y-4">
            {copy.deliver.map((item) => (
              <li key={item} className="flex gap-3 text-lg font-semibold leading-8">
                <FaCheckCircle className="mt-1 flex-none text-[#EEBA2B]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black text-[#fff200] phone:text-4xl">
            {copy.faqTitle}
          </h2>
          <div className="mt-8 space-y-5">
            {copy.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.5rem] border border-white/20 bg-white/90 p-6 text-[#071a33]"
              >
                <h3 className="text-xl font-black">{faq.question}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-700">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default OfficialWebsite;
