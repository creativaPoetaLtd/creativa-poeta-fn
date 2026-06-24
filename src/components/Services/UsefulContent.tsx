import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaComments,
  FaLightbulb,
  FaQuestionCircle,
  FaRegFileAlt,
  FaRobot,
  FaSearch,
  FaShareAlt,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import ServiceFinalCTA from "./ServiceFinalCTA";

type UsefulContentCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  secondaryCta: string;
  whyTitle: string;
  whyText: string;
  blocksTitle: string;
  blocks: Array<{ title: string; text: string }>;
  examplesTitle: string;
  examples: string[];
  deliverTitle: string;
  deliver: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

const copies: Record<string, UsefulContentCopy> = {
  fr: {
    eyebrow: "Contenus utiles",
    title: "Repondez aux vraies questions de vos clients avant qu'ils vous appellent.",
    intro:
      "Nous creons des pages claires pour vos services, vos questions frequentes, vos zones et vos cas concrets afin que vos clients, Google et les outils IA comprennent mieux votre entreprise.",
    cta: "Creer mes contenus utiles",
    secondaryCta: "Tester ma visibilite",
    whyTitle: "Une page utile peut devenir une reponse.",
    whyText:
      "Les clients ne cherchent pas toujours votre nom. Ils posent des questions precises : prix, disponibilite, zone, langue, probleme, urgence ou comparaison. Votre site doit pouvoir repondre avec des mots simples et fiables.",
    blocksTitle: "Ce que nous clarifions",
    blocks: [
      {
        title: "Questions clients",
        text: "Les demandes que vos clients posent avant de vous faire confiance ou de vous contacter.",
      },
      {
        title: "Services",
        text: "Des pages qui expliquent chaque service avec des mots simples, des limites claires et un appel a l'action.",
      },
      {
        title: "Zones et langues",
        text: "Des informations adaptees a la ville, au pays, a la langue ou au public vise.",
      },
      {
        title: "Outils IA",
        text: "Des contenus faciles a comprendre pour les assistants comme ChatGPT, sans texte vide ni repetitif.",
      },
    ],
    examplesTitle: "Exemples de pages utiles",
    examples: [
      "Quelle agence peut refaire mon site pour etre visible dans Google et les outils IA ?",
      "Quel service proche de moi est ouvert maintenant ?",
      "Comment rendre mon entreprise claire sur Google Maps et Apple Maps ?",
      "Quels services proposez-vous pour une petite entreprise qui n'a pas encore de site ?",
    ],
    deliverTitle: "Ce que vous recevez",
    deliver: [
      "Une liste de questions importantes pour votre activite.",
      "Des pages courtes, claires et reliees a vos services.",
      "Des reponses simples qui parlent a monsieur tout le monde.",
      "Une structure qui peut grandir par langue, pays, ville ou service.",
      "Des contenus alignes avec votre site, vos maps et vos profils publics.",
    ],
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Est-ce qu'il faut publier beaucoup de pages ?",
        answer:
          "Non. Il faut d'abord publier les bonnes pages. Une petite base claire vaut mieux qu'un grand site rempli de textes inutiles.",
      },
      {
        question: "Est-ce que vous ecrivez tout pour nous ?",
        answer:
          "Oui, mais nous partons de vos services reels. Vous validez les informations pour que le contenu reste exact et credible.",
      },
      {
        question: "Pourquoi c'est important pour les outils IA ?",
        answer:
          "Ces outils cherchent des informations claires et coherentes. Si votre site repond bien aux questions, il devient plus facile a comprendre et a citer.",
      },
    ],
  },
  en: {
    eyebrow: "Useful content",
    title: "Answer real client questions before they contact you.",
    intro:
      "We create clear pages for your services, common questions, areas and practical cases so clients, Google and AI tools understand your business better.",
    cta: "Create useful content",
    secondaryCta: "Test my visibility",
    whyTitle: "A useful page can become an answer.",
    whyText:
      "Clients do not always search your name. They ask precise questions about price, availability, area, language, problem, urgency or comparison. Your website should answer with simple and reliable words.",
    blocksTitle: "What we clarify",
    blocks: [
      {
        title: "Client questions",
        text: "The questions clients ask before they trust you or contact you.",
      },
      {
        title: "Services",
        text: "Pages that explain each service with simple words, clear limits and a call to action.",
      },
      {
        title: "Areas and languages",
        text: "Information adapted to the city, country, language or audience you target.",
      },
      {
        title: "AI tools",
        text: "Content that assistants like ChatGPT can understand, without empty or repetitive text.",
      },
    ],
    examplesTitle: "Useful page examples",
    examples: [
      "Which agency can rebuild my website to be visible on Google and AI tools?",
      "Which nearby service is open now?",
      "How can I make my business clear on Google Maps and Apple Maps?",
      "What services do you offer for a small business without a website yet?",
    ],
    deliverTitle: "What you receive",
    deliver: [
      "A list of important questions for your activity.",
      "Short, clear pages connected to your services.",
      "Simple answers written for normal clients.",
      "A structure that can grow by language, country, city or service.",
      "Content aligned with your website, maps and public profiles.",
    ],
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Do we need to publish many pages?",
        answer:
          "No. The first goal is to publish the right pages. A small clear base is better than a large site full of useless text.",
      },
      {
        question: "Do you write everything for us?",
        answer:
          "Yes, but we start from your real services. You validate the information so the content stays accurate and credible.",
      },
      {
        question: "Why does this matter for AI tools?",
        answer:
          "These tools look for clear and consistent information. If your site answers questions well, it becomes easier to understand and quote.",
      },
    ],
  },
  nl: {
    eyebrow: "Nuttige content",
    title: "Beantwoord echte klantvragen voordat ze u contacteren.",
    intro:
      "We maken duidelijke pagina's voor uw diensten, veelgestelde vragen, regio's en praktische situaties zodat klanten, Google en AI-tools uw bedrijf beter begrijpen.",
    cta: "Nuttige content maken",
    secondaryCta: "Mijn zichtbaarheid testen",
    whyTitle: "Een nuttige pagina kan een antwoord worden.",
    whyText:
      "Klanten zoeken niet altijd uw naam. Ze stellen precieze vragen over prijs, beschikbaarheid, regio, taal, probleem, urgentie of vergelijking. Uw website moet daarop eenvoudig en betrouwbaar antwoorden.",
    blocksTitle: "Wat we verduidelijken",
    blocks: [
      {
        title: "Klantvragen",
        text: "De vragen die klanten stellen voordat ze u vertrouwen of contacteren.",
      },
      {
        title: "Diensten",
        text: "Pagina's die elke dienst uitleggen met eenvoudige woorden, duidelijke grenzen en een actie.",
      },
      {
        title: "Regio's en talen",
        text: "Informatie aangepast aan stad, land, taal of doelgroep.",
      },
      {
        title: "AI-tools",
        text: "Content die assistenten zoals ChatGPT begrijpen, zonder lege of herhalende tekst.",
      },
    ],
    examplesTitle: "Voorbeelden van nuttige pagina's",
    examples: [
      "Welke agency kan mijn website vernieuwen voor Google en AI-tools?",
      "Welke dienst in de buurt is nu open?",
      "Hoe maak ik mijn bedrijf duidelijk op Google Maps en Apple Maps?",
      "Welke diensten bieden jullie aan voor een klein bedrijf zonder website?",
    ],
    deliverTitle: "Wat u ontvangt",
    deliver: [
      "Een lijst met belangrijke vragen voor uw activiteit.",
      "Korte, duidelijke pagina's verbonden met uw diensten.",
      "Eenvoudige antwoorden voor gewone klanten.",
      "Een structuur die kan groeien per taal, land, stad of dienst.",
      "Content die klopt met uw website, maps en publieke profielen.",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Moeten we veel pagina's publiceren?",
        answer:
          "Nee. Eerst moeten we de juiste pagina's publiceren. Een kleine duidelijke basis is beter dan een grote site vol nutteloze tekst.",
      },
      {
        question: "Schrijven jullie alles voor ons?",
        answer:
          "Ja, maar we vertrekken van uw echte diensten. U valideert de informatie zodat de content juist en geloofwaardig blijft.",
      },
      {
        question: "Waarom is dit belangrijk voor AI-tools?",
        answer:
          "Deze tools zoeken duidelijke en consistente informatie. Als uw site goed antwoordt, wordt hij makkelijker te begrijpen en te citeren.",
      },
    ],
  },
  kiny: {
    eyebrow: "Paji zifite akamaro",
    title: "Subiza ibibazo nyabyo by'abakiriya mbere y'uko bakwandikira.",
    intro:
      "Dukora paji zisobanutse kuri serivisi zawe, ibibazo bikunze kubazwa, aho ukorera n'ingero zifatika kugira ngo abakiriya, Google na AI bakumve neza.",
    cta: "Gukora paji zifasha",
    secondaryCta: "Gusuzuma uko ngaragara",
    whyTitle: "Paji isobanutse ishobora kuba igisubizo.",
    whyText:
      "Abakiriya ntibahora bashaka izina ryawe. Babaza ibibazo ku giciro, aho ukorera, igihe, ururimi, ikibazo bafite cyangwa icyo bakeneye. Website yawe igomba kubisubiza mu magambo yoroshye.",
    blocksTitle: "Ibyo dusobanura",
    blocks: [
      {
        title: "Ibibazo by'abakiriya",
        text: "Ibibazo abantu bibaza mbere yo kukwizera cyangwa kukwandikira.",
      },
      {
        title: "Serivisi",
        text: "Paji zisobanura buri serivisi mu magambo yoroshye n'uburyo bwo kuguhamagara.",
      },
      {
        title: "Aho ukorera n'indimi",
        text: "Amakuru ajyanye n'umujyi, igihugu, ururimi cyangwa abo ushaka gufasha.",
      },
      {
        title: "AI",
        text: "Amakuru yoroshye kumvwa n'ibikoresho nka ChatGPT, atari amagambo yuzuye ubusa.",
      },
    ],
    examplesTitle: "Ingero za paji zifasha",
    examples: [
      "Ni nde wamfasha kuvugurura website kugira ngo ngaragare kuri Google na AI?",
      "Ni iyihe serivisi iri hafi ifunguye ubu?",
      "Nakora iki ngo business yanjye yumvikane kuri Google Maps na Apple Maps?",
      "Mufasha iki business nto itaragira website?",
    ],
    deliverTitle: "Ibyo uhabwa",
    deliver: [
      "Urutonde rw'ibibazo by'ingenzi ku kazi kawe.",
      "Paji ngufi kandi zisobanutse zijyanye na serivisi zawe.",
      "Ibisubizo byoroshye abantu bose bumva.",
      "Imiterere ishobora gukura ku ndimi, ibihugu, imijyi cyangwa serivisi.",
      "Amakuru ahuye na website, maps n'imbuga ukoresha.",
    ],
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      {
        question: "Tugomba gushyira paji nyinshi?",
        answer:
          "Oya. Icya mbere ni ugushyira paji zikenewe. Paji nke zisobanutse ziruta website nini yuzuye amagambo adafasha.",
      },
      {
        question: "Mwandikira byose?",
        answer:
          "Yego, ariko duhera kuri serivisi zawe nyazo. Wemeza amakuru kugira ngo agume ari ukuri.",
      },
      {
        question: "Kuki bifasha kuri AI?",
        answer:
          "AI ishaka amakuru asobanutse kandi ahuye. Iyo website isubiza ibibazo neza, biroroha kuyumva no kuyikoresha nk'isoko.",
      },
    ],
  },
};

const blockIcons = [FaQuestionCircle, FaRegFileAlt, FaSearch, FaRobot];

const UsefulContent = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const startPath = buildLocalLocalePath(market, locale, "/start-project");
  const auditPath = buildLocalLocalePath(market, locale, "/tester-visibilite");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071a33]/80 text-white">
      <section className="relative px-5 pb-16 pt-28 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/95 via-[#071a33]/85 to-[#123b30]/85" />
        <div className="absolute left-[-4rem] top-32 -z-10 h-56 w-56 rounded-full border-[2.5rem] border-[#EEBA2B]/20" />

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
            <FaLightbulb className="mb-5 text-5xl text-[#EEBA2B]" />
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
        <div className="mx-auto grid max-w-7xl gap-8 laptop:grid-cols-[.8fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-sm font-black uppercase">
              <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
              {copy.examplesTitle}
            </div>
            <FaComments className="text-6xl text-[#EEBA2B]" />
          </div>
          <div className="space-y-4">
            {copy.examples.map((example) => (
              <article
                key={example}
                className="rounded-[1.5rem] border border-[#EEBA2B]/30 bg-[#071a33]/80 p-5 font-black leading-7 text-white backdrop-blur-md"
              >
                {example}
              </article>
            ))}
          </div>
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
      <ServiceFinalCTA />
    </main>
  );
};

export default UsefulContent;
