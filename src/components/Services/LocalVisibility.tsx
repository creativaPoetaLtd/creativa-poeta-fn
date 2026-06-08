import { Link } from "react-router-dom";
import {
  FaApple,
  FaCheckCircle,
  FaGoogle,
  FaMapMarkedAlt,
  FaMicrophoneAlt,
  FaRegCompass,
  FaSearchLocation,
  FaStar,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import ServiceFinalCTA from "./ServiceFinalCTA";

type LocalCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  secondaryCta: string;
  whyTitle: string;
  whyText: string;
  platformsTitle: string;
  platforms: Array<{ title: string; text: string }>;
  workTitle: string;
  work: string[];
  proofTitle: string;
  proofText: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

const copies: Record<string, LocalCopy> = {
  fr: {
    eyebrow: "Visibilite locale",
    title: "Vos clients et les IA doivent vous trouver sur les maps, pas seulement sur votre site.",
    intro:
      "Nous alignons vos informations sur Google Maps, Apple Maps, Bing, vos profils locaux et vos reseaux pour que vos clients et les outils IA voient les memes informations partout.",
    cta: "Ameliorer ma visibilite locale",
    secondaryCta: "Faire l'audit d'abord",
    whyTitle: "La recherche locale se joue au moment ou le client a besoin de vous.",
    whyText:
      "Un client peut chercher un service proche, ouvert maintenant, qui parle sa langue, qui accepte un certain besoin ou qui a de bons avis. Si vos informations sont incompletes ou contradictoires, il peut passer a quelqu'un d'autre.",
    platformsTitle: "Les endroits a aligner",
    platforms: [
      {
        title: "Google Maps",
        text: "Services, horaires, categories, photos, avis, zone servie et lien vers votre site doivent etre clairs.",
      },
      {
        title: "Apple Maps",
        text: "Les clients sur iPhone, Siri ou voiture connectee peuvent chercher sans passer par Google.",
      },
      {
        title: "Bing",
        text: "Bing alimente certains usages Microsoft et peut aussi servir de source a des recherches modernes.",
      },
      {
        title: "Recherche vocale",
        text: "Les questions parlees sont souvent precises : proche de moi, ouvert, langue, service, prix ou disponibilite.",
      },
    ],
    workTitle: "Ce que nous faisons",
    work: [
      "Verification des informations publiques de votre entreprise.",
      "Harmonisation du nom, adresse, telephone, horaires, zones et liens.",
      "Clarification des categories, services, descriptions et questions frequentes.",
      "Connexion logique entre votre site, vos maps et vos profils sociaux.",
      "Plan d'actions pour avis clients, photos utiles et preuves de confiance.",
    ],
    proofTitle: "Le but : une presence coherente.",
    proofText:
      "Votre site, vos maps, vos profils et vos contenus doivent raconter la meme chose. C'est cette coherence qui aide les clients, les moteurs de recherche et les outils modernes a vous comprendre.",
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Est-ce que Google Maps suffit ?",
        answer:
          "Non. Google Maps est important, mais il doit etre relie a une source officielle, a des informations coherentes et a des contenus qui expliquent vos services.",
      },
      {
        question: "Faut-il aussi Apple Maps et Bing ?",
        answer:
          "Oui, si vous voulez couvrir les clients qui cherchent depuis iPhone, voiture, Siri, Microsoft ou d'autres outils.",
      },
      {
        question: "Est-ce que les avis clients comptent ?",
        answer:
          "Oui. Ils ne remplacent pas les informations de base, mais ils renforcent la confiance et aident les clients a choisir.",
      },
    ],
  },
  en: {
    eyebrow: "Local visibility",
    title: "Clients and AI tools should find you on maps, not only on your website.",
    intro:
      "We align your information across Google Maps, Apple Maps, Bing, local profiles and social profiles so clients and AI tools see the same facts everywhere.",
    cta: "Improve local visibility",
    secondaryCta: "Run the audit first",
    whyTitle: "Local search happens when the client needs you.",
    whyText:
      "A client can search for a nearby service, open now, speaking their language, matching a need or trusted by reviews. If your information is incomplete or contradictory, they can choose someone else.",
    platformsTitle: "Places to align",
    platforms: [
      {
        title: "Google Maps",
        text: "Services, hours, categories, photos, reviews, area served and website link must be clear.",
      },
      {
        title: "Apple Maps",
        text: "Clients on iPhone, Siri or connected cars may search without using Google.",
      },
      {
        title: "Bing",
        text: "Bing powers some Microsoft experiences and can also be a source for modern search.",
      },
      {
        title: "Voice search",
        text: "Spoken questions are often precise: near me, open, language, service, price or availability.",
      },
    ],
    workTitle: "What we do",
    work: [
      "Review your public business information.",
      "Align name, address, phone, hours, areas and links.",
      "Clarify categories, services, descriptions and common questions.",
      "Connect your website, maps and social profiles logically.",
      "Plan actions for reviews, useful photos and trust signals.",
    ],
    proofTitle: "The goal: a coherent presence.",
    proofText:
      "Your website, maps, profiles and content should tell the same story. That coherence helps clients, search engines and modern tools understand you.",
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Is Google Maps enough?",
        answer:
          "No. Google Maps is important, but it should be connected to an official source, consistent information and content that explains your services.",
      },
      {
        question: "Do Apple Maps and Bing matter too?",
        answer:
          "Yes, if you want to cover clients searching from iPhone, cars, Siri, Microsoft or other tools.",
      },
      {
        question: "Do client reviews matter?",
        answer:
          "Yes. They do not replace basic information, but they strengthen trust and help clients choose.",
      },
    ],
  },
  nl: {
    eyebrow: "Lokale zichtbaarheid",
    title: "Klanten en AI-tools moeten u vinden op maps, niet alleen op uw website.",
    intro:
      "We stemmen uw informatie af op Google Maps, Apple Maps, Bing, lokale profielen en sociale profielen zodat klanten en AI-tools overal dezelfde feiten zien.",
    cta: "Verbeter mijn lokale zichtbaarheid",
    secondaryCta: "Eerst de audit doen",
    whyTitle: "Lokale zoekopdrachten gebeuren wanneer de klant u nodig heeft.",
    whyText:
      "Een klant kan zoeken naar een dienst dichtbij, nu open, in zijn taal, passend bij een behoefte of met goede reviews. Als uw informatie onvolledig of tegenstrijdig is, kiest hij iemand anders.",
    platformsTitle: "Plaatsen die moeten kloppen",
    platforms: [
      {
        title: "Google Maps",
        text: "Diensten, uren, categorieen, foto's, reviews, regio en website-link moeten duidelijk zijn.",
      },
      {
        title: "Apple Maps",
        text: "Klanten op iPhone, Siri of in de auto zoeken soms zonder Google te gebruiken.",
      },
      {
        title: "Bing",
        text: "Bing voedt sommige Microsoft-ervaringen en kan ook een bron zijn voor moderne zoekopdrachten.",
      },
      {
        title: "Spraakzoekopdracht",
        text: "Gesproken vragen zijn vaak precies: dichtbij, open, taal, dienst, prijs of beschikbaarheid.",
      },
    ],
    workTitle: "Wat we doen",
    work: [
      "Controle van uw publieke bedrijfsinformatie.",
      "Afstemming van naam, adres, telefoon, uren, regio's en links.",
      "Verduidelijking van categorieen, diensten, beschrijvingen en vragen.",
      "Logische verbinding tussen website, maps en sociale profielen.",
      "Actieplan voor reviews, nuttige foto's en vertrouwen.",
    ],
    proofTitle: "Het doel: een coherente aanwezigheid.",
    proofText:
      "Uw website, maps, profielen en content moeten hetzelfde verhaal vertellen. Die coherentie helpt klanten, zoekmachines en moderne tools u te begrijpen.",
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Is Google Maps genoeg?",
        answer:
          "Nee. Google Maps is belangrijk, maar moet verbonden zijn met een officiele bron, consistente informatie en content die uw diensten uitlegt.",
      },
      {
        question: "Zijn Apple Maps en Bing ook belangrijk?",
        answer:
          "Ja, als u klanten wilt bereiken die zoeken via iPhone, auto, Siri, Microsoft of andere tools.",
      },
      {
        question: "Tellen klantreviews mee?",
        answer:
          "Ja. Ze vervangen basisinformatie niet, maar versterken vertrouwen en helpen klanten kiezen.",
      },
    ],
  },
  kiny: {
    eyebrow: "Kugaragara hafi y'abakiriya",
    title: "Abakiriya na AI bigomba kukubona kuri maps, si kuri website gusa.",
    intro:
      "Duhuza amakuru yawe kuri Google Maps, Apple Maps, Bing, imbuga z'ibanze n'imbuga nkoranyambaga kugira ngo abakiriya n'ibikoresho bya AI bibone amakuru amwe hose.",
    cta: "Kongera kugaragara hafi",
    secondaryCta: "Banza ukore audit",
    whyTitle: "Umukiriya ashaka hafi ye igihe agukeneye.",
    whyText:
      "Ashobora gushaka serivisi iri hafi, ifunguye, ivuga ururimi rwe, ifite ibyo akeneye cyangwa ifite ibitekerezo byiza. Amakuru atuzuye cyangwa atandukanye ashobora gutuma ahitamo abandi.",
    platformsTitle: "Ahantu dukwiye guhuza",
    platforms: [
      {
        title: "Google Maps",
        text: "Serivisi, amasaha, ibyiciro, amafoto, ibitekerezo, aho ukorera na link ya website bigomba gusobanuka.",
      },
      {
        title: "Apple Maps",
        text: "Abakoresha iPhone, Siri cyangwa imodoka zigezweho bashobora kugushaka batanyuze kuri Google.",
      },
      {
        title: "Bing",
        text: "Bing ikoreshwa muri Microsoft kandi ishobora gufasha mu gushakisha gushingiye ku makuru agezweho.",
      },
      {
        title: "Gushakisha ukoresheje ijwi",
        text: "Ibibazo bivuzwe akenshi biba bisobanutse: hafi yanjye, ifunguye, ururimi, serivisi cyangwa igiciro.",
      },
    ],
    workTitle: "Ibyo dukora",
    work: [
      "Kureba amakuru yawe agaragara hanze.",
      "Guhuza izina, adresse, telefone, amasaha, aho ukorera na links.",
      "Gusobanura ibyiciro, serivisi, ibisobanuro n'ibibazo bisanzwe.",
      "Guhuza website, maps n'imbuga nkoranyambaga mu buryo bumvikana.",
      "Gahunda y'ibitekerezo by'abakiriya, amafoto n'ibimenyetso bitanga icyizere.",
    ],
    proofTitle: "Intego: amakuru avuga kimwe.",
    proofText:
      "Website, maps, imbuga n'ibirimo bigomba kuvuga inkuru imwe. Ibyo bifasha abakiriya, moteri zishakisha n'ibikoresho bigezweho kugusobanukirwa.",
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      {
        question: "Google Maps irahagije?",
        answer:
          "Oya. Google Maps ni ingenzi, ariko igomba guhuzwa na website yemewe, amakuru ahuye n'ibirimo bisobanura serivisi.",
      },
      {
        question: "Apple Maps na Bing na byo bifite akamaro?",
        answer:
          "Yego, niba ushaka kugera ku bakoresha iPhone, imodoka, Siri, Microsoft cyangwa ibindi bikoresho.",
      },
      {
        question: "Ibitekerezo by'abakiriya bifite agaciro?",
        answer:
          "Yego. Ntibisimbura amakuru y'ibanze, ariko bitanga icyizere kandi bifasha abakiriya guhitamo.",
      },
    ],
  },
};

const platformIcons = [FaGoogle, FaApple, FaSearchLocation, FaMicrophoneAlt];

const LocalVisibility = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const startPath = buildLocalLocalePath(market, locale, "/start-project");
  const auditPath = buildLocalLocalePath(market, locale, "/services/audit-visibilite");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071a33]/80 text-white">
      <section className="relative px-5 pb-16 pt-28 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#10281f]/95 via-[#071a33]/90 to-black/95" />
        <div className="absolute left-[-4rem] top-36 -z-10 h-52 w-52 rounded-full border-[2.5rem] border-[#EEBA2B]/20" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 laptop:min-h-[78vh] laptop:grid-cols-[1.05fr_.95fr]">
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
                <FaMapMarkedAlt />
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
            <FaRegCompass className="mb-5 text-5xl text-[#EEBA2B]" />
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
            {copy.platformsTitle}
          </div>
          <div className="grid gap-5 tablet:grid-cols-2 laptop:grid-cols-4">
            {copy.platforms.map((platform, index) => {
              const Icon = platformIcons[index] ?? FaStar;
              return (
                <article
                  key={platform.title}
                  className="rounded-[1.7rem] border border-white/20 bg-white/90 p-6 text-[#071a33] shadow-xl transition duration-300 hover:-translate-y-2"
                >
                  <Icon className="mb-5 text-5xl text-[#071a33]" />
                  <div className="mb-5 h-1.5 w-16 bg-[#EEBA2B]" />
                  <h3 className="text-xl font-black">{platform.title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-700">
                    {platform.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 phone:px-7 tablet:px-12 laptop:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 laptop:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-[#EEBA2B]/50 bg-[#071a33]/80 p-7 backdrop-blur-md phone:p-9">
            <h2 className="text-3xl font-black text-[#fff200]">{copy.proofTitle}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/85">
              {copy.proofText}
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/20 bg-white/90 p-7 text-[#071a33] phone:p-9">
            <h2 className="text-3xl font-black">{copy.workTitle}</h2>
            <ul className="mt-7 space-y-4">
              {copy.work.map((item) => (
                <li key={item} className="flex gap-3 text-lg font-semibold leading-8">
                  <FaCheckCircle className="mt-1 flex-none text-[#EEBA2B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
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

export default LocalVisibility;
