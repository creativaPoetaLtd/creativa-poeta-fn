import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaComments,
  FaSearchLocation,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import problemFr from "../../assets/problem-visibility-fr.webp";
import problemEn from "../../assets/problem-visibility-en.webp";
import problemNl from "../../assets/problem-visibility-nl.webp";
import modernFr from "../../assets/alignment/modern-visibility.webp";
import modernEn from "../../assets/alignment/modern-visibility-en.webp";
import modernNl from "../../assets/alignment/modern-visibility-nl.webp";
import sourceFr from "../../assets/alignment/official-source-flow.webp";
import sourceEn from "../../assets/alignment/official-source-flow-en.webp";
import sourceNl from "../../assets/alignment/official-source-flow-nl.webp";
import googleFr from "../../assets/alignment/google-search-result.webp";
import googleEn from "../../assets/alignment/google-search-result-en.webp";
import googleNl from "../../assets/alignment/google-search-result-nl.webp";
import mapsFr from "../../assets/alignment/google-maps-profile.webp";
import mapsEn from "../../assets/alignment/google-maps-profile-en.webp";
import mapsNl from "../../assets/alignment/google-maps-profile-nl.webp";
import routeFr from "../../assets/alignment/maps-route-phone.webp";
import routeEn from "../../assets/alignment/maps-route-phone-en.webp";
import routeNl from "../../assets/alignment/maps-route-phone-nl.webp";
import voiceFr from "../../assets/alignment/voice-search.webp";
import voiceEn from "../../assets/alignment/voice-search-en.webp";
import voiceNl from "../../assets/alignment/voice-search-nl.webp";
import chatFr from "../../assets/alignment/chatgpt-recommendation.webp";
import chatEn from "../../assets/alignment/chatgpt-recommendation-en.webp";
import chatNl from "../../assets/alignment/chatgpt-recommendation-nl.webp";
import socialFr from "../../assets/alignment/social-posts.webp";
import socialEn from "../../assets/alignment/social-posts-en.webp";
import socialNl from "../../assets/alignment/social-posts-nl.webp";
import trustFr from "../../assets/alignment/coherence-confidence.webp";
import trustEn from "../../assets/alignment/coherence-confidence-en.webp";
import trustNl from "../../assets/alignment/coherence-confidence-nl.webp";
import resultsFr from "../../assets/alignment/clear-info-results.webp";
import resultsEn from "../../assets/alignment/clear-info-results-en.webp";
import resultsNl from "../../assets/alignment/clear-info-results-nl.webp";
import ServiceFinalCTA from "./ServiceFinalCTA";
import ServiceFAQAccordion from "./ServiceFAQAccordion";

type LocalCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  secondary: string;
  promise: string[];
  problemEyebrow: string;
  problemTitle: string;
  problemText: string;
  sourceEyebrow: string;
  sourceTitle: string;
  sourceText: string;
  channelsEyebrow: string;
  channelsTitle: string;
  channelsText: string;
  channels: Array<{ title: string; text: string; imageKey: VisualKey }>;
  methodEyebrow: string;
  methodTitle: string;
  methodText: string;
  method: string[];
  resultsEyebrow: string;
  resultsTitle: string;
  resultsText: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

type VisualKey =
  | "google"
  | "maps"
  | "route"
  | "voice"
  | "chat"
  | "social";

const copies: Record<string, LocalCopy> = {
  fr: {
    eyebrow: "Visibilite & presence locale",
    title: "Etre trouve au bon moment, la ou vos clients cherchent vraiment.",
    intro:
      "Nous rendons votre entreprise claire sur Google, les maps, les reseaux, la recherche vocale et les outils IA. Le client doit trouver la meme information partout, sans confusion.",
    primary: "Tester ma visibilite",
    secondary: "Nous contacter",
    promise: [
      "Informations exactes",
      "Maps et profils locaux alignes",
      "Avis, horaires et contacts coherents",
      "Presence lisible par les outils modernes",
    ],
    problemEyebrow: "Le probleme actuel",
    problemTitle: "Une entreprise peut exister, mais rester invisible.",
    problemText:
      "Nom different, ancienne adresse, horaires absents, avis non repondus, reseaux pas a jour : chaque petit flou peut faire perdre un client au moment decisif.",
    sourceEyebrow: "Votre base officielle",
    sourceTitle: "Votre site devient le point clair que tout le reste confirme.",
    sourceText:
      "Nous gardons ce qui existe deja quand c'est utile, puis nous relions votre site, vos profils, vos avis et vos chemins de contact autour d'une information fiable.",
    channelsEyebrow: "Les canaux a aligner",
    channelsTitle: "Google, maps, voix, reseaux et IA doivent raconter la meme chose.",
    channelsText:
      "Le but n'est pas d'etre partout pour faire joli. Le but est d'etre compris partout, avec des informations simples, recentes et faciles a verifier.",
    channels: [
      {
        title: "Google",
        text: "Etre visible quand le client cherche votre service.",
        imageKey: "google",
      },
      {
        title: "Maps",
        text: "Donner une fiche claire qui inspire confiance.",
        imageKey: "maps",
      },
      {
        title: "Itineraire",
        text: "Rendre le chemin vers vous simple et direct.",
        imageKey: "route",
      },
      {
        title: "Reseaux sociaux",
        text: "Montrer des preuves vivantes, des avis et des realisations.",
        imageKey: "social",
      },
      {
        title: "Recherche vocale",
        text: "Repondre aux questions parlees, souvent tres precises.",
        imageKey: "voice",
      },
      {
        title: "Outils IA",
        text: "Permettre aux assistants modernes de recommander votre entreprise.",
        imageKey: "chat",
      },
    ],
    methodEyebrow: "Notre methode",
    methodTitle: "On clarifie, on aligne, puis on garde vivant.",
    methodText:
      "Nous ne jetons pas tout. Nous partons de votre presence actuelle, nous corrigeons ce qui brouille le message et nous creons une base que vous controlez vraiment.",
    method: [
      "Audit de votre presence actuelle",
      "Correction du nom, adresse, horaires, telephone et liens",
      "Alignement Google, Maps, profils locaux et reseaux",
      "Organisation des avis, photos, questions et reponses utiles",
      "Preparation pour les recherches vocales et les outils IA",
    ],
    resultsEyebrow: "Resultat attendu",
    resultsTitle: "Plus de clarte. Plus de confiance. Plus de clients.",
    resultsText:
      "Quand les informations sont coherentes, vos clients comprennent plus vite, les moteurs modernes vous lisent mieux et votre entreprise devient plus facile a recommander.",
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Est-ce que je dois deja avoir un site ?",
        answer:
          "Non. On peut commencer avec vos profils existants, puis construire une base officielle si elle manque.",
      },
      {
        question: "Est-ce que Google Maps suffit ?",
        answer:
          "Non. Google Maps est important, mais il doit etre relie a votre site, vos avis, vos reseaux et vos informations officielles.",
      },
      {
        question: "Est-ce utile pour les outils IA ?",
        answer:
          "Oui. Les outils modernes ont besoin d'informations claires et coherentes pour comprendre puis recommander une entreprise.",
      },
      {
        question: "Est-ce que vous corrigez aussi les horaires, adresses et liens ?",
        answer:
          "Oui. C'est meme une partie importante du travail. Nous alignons les informations essentielles pour eviter les contradictions entre votre site, vos maps et vos profils.",
      },
      {
        question: "Est-ce que les avis clients comptent ?",
        answer:
          "Oui. Les avis, les reponses aux avis et les preuves recentes aident les clients a faire confiance et donnent aussi des signaux utiles aux plateformes.",
      },
      {
        question: "Est-ce un travail ponctuel ou continu ?",
        answer:
          "On peut commencer par une correction ponctuelle, mais la visibilite locale doit rester vivante: horaires, photos, avis, services et informations doivent etre tenus a jour.",
      },
    ],
  },
  en: {
    eyebrow: "Visibility & local presence",
    title: "Be found at the right moment, where clients actually search.",
    intro:
      "We make your business clear on Google, maps, social media, voice search and AI tools. Clients should find the same information everywhere, without confusion.",
    primary: "Test my visibility",
    secondary: "Contact us",
    promise: [
      "Accurate information",
      "Aligned maps and local profiles",
      "Consistent reviews, hours and contacts",
      "A presence modern tools can read",
    ],
    problemEyebrow: "The current problem",
    problemTitle: "A business can exist and still remain invisible.",
    problemText:
      "Different name, old address, missing hours, unanswered reviews, outdated social profiles: every small gap can cost a client at the decisive moment.",
    sourceEyebrow: "Your official base",
    sourceTitle: "Your website becomes the clear source everything else confirms.",
    sourceText:
      "We keep what already works, then connect your website, profiles, reviews and contact paths around reliable information.",
    channelsEyebrow: "Channels to align",
    channelsTitle: "Google, maps, voice, social media and AI should tell the same story.",
    channelsText:
      "The goal is not to be everywhere for decoration. The goal is to be understood everywhere, with simple, fresh and easy-to-check information.",
    channels: [
      { title: "Google", text: "Be visible when clients search for your service.", imageKey: "google" },
      { title: "Maps", text: "Give clients a clear profile that builds trust.", imageKey: "maps" },
      { title: "Directions", text: "Make the path to your business simple and direct.", imageKey: "route" },
      { title: "Social media", text: "Show living proof, reviews and real work.", imageKey: "social" },
      { title: "Voice search", text: "Answer spoken questions, often very precise.", imageKey: "voice" },
      { title: "AI tools", text: "Help modern assistants recommend your business.", imageKey: "chat" },
    ],
    methodEyebrow: "Our method",
    methodTitle: "We clarify, align, then keep it alive.",
    methodText:
      "We do not throw everything away. We start from your current presence, correct what blurs the message and build a base you truly control.",
    method: [
      "Audit your current presence",
      "Fix name, address, hours, phone and links",
      "Align Google, maps, local profiles and social media",
      "Organize reviews, photos, useful questions and answers",
      "Prepare for voice search and AI tools",
    ],
    resultsEyebrow: "Expected result",
    resultsTitle: "More clarity. More trust. More clients.",
    resultsText:
      "When information is consistent, clients understand faster, modern engines read you better and your business becomes easier to recommend.",
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Do I need to already have a website?",
        answer:
          "No. We can start with your existing profiles, then build an official base if it is missing.",
      },
      {
        question: "Is Google Maps enough?",
        answer:
          "No. Google Maps matters, but it must be connected to your website, reviews, social profiles and official information.",
      },
      {
        question: "Does this help with AI tools?",
        answer:
          "Yes. Modern tools need clear and consistent information to understand and recommend a business.",
      },
      {
        question: "Do you also fix hours, addresses and links?",
        answer:
          "Yes. This is a core part of the work. We align essential information to avoid contradictions between your website, maps and public profiles.",
      },
      {
        question: "Do customer reviews matter?",
        answer:
          "Yes. Reviews, review replies and recent proof help clients trust you and give useful signals to the platforms.",
      },
      {
        question: "Is this a one-time job or ongoing work?",
        answer:
          "We can start with a one-time cleanup, but local visibility should stay alive: hours, photos, reviews, services and information need updates.",
      },
    ],
  },
  nl: {
    eyebrow: "Zichtbaarheid & lokale aanwezigheid",
    title: "Word gevonden op het juiste moment, waar klanten echt zoeken.",
    intro:
      "Wij maken uw bedrijf duidelijk op Google, maps, sociale media, spraakzoekopdrachten en AI-tools. Klanten moeten overal dezelfde informatie vinden, zonder verwarring.",
    primary: "Mijn zichtbaarheid testen",
    secondary: "Contact opnemen",
    promise: [
      "Nauwkeurige informatie",
      "Maps en lokale profielen afgestemd",
      "Reviews, openingsuren en contacten coherent",
      "Een aanwezigheid die moderne tools kunnen lezen",
    ],
    problemEyebrow: "Het huidige probleem",
    problemTitle: "Een bedrijf kan bestaan en toch onzichtbaar blijven.",
    problemText:
      "Andere naam, oud adres, ontbrekende openingsuren, onbeantwoorde reviews, verouderde sociale profielen: elk klein verschil kan een klant kosten op het beslissende moment.",
    sourceEyebrow: "Uw officiele basis",
    sourceTitle: "Uw website wordt de duidelijke bron die alles bevestigt.",
    sourceText:
      "We behouden wat al werkt en verbinden uw website, profielen, reviews en contactwegen rond betrouwbare informatie.",
    channelsEyebrow: "Kanalen om af te stemmen",
    channelsTitle: "Google, maps, stem, sociale media en AI moeten hetzelfde verhaal vertellen.",
    channelsText:
      "Het doel is niet overal aanwezig zijn voor de show. Het doel is overal begrepen worden, met eenvoudige, actuele en controleerbare informatie.",
    channels: [
      { title: "Google", text: "Zichtbaar zijn wanneer klanten uw dienst zoeken.", imageKey: "google" },
      { title: "Maps", text: "Een duidelijke fiche geven die vertrouwen wekt.", imageKey: "maps" },
      { title: "Route", text: "De weg naar uw bedrijf eenvoudig en direct maken.", imageKey: "route" },
      { title: "Sociale media", text: "Levende bewijzen, reviews en realisaties tonen.", imageKey: "social" },
      { title: "Spraakzoekopdracht", text: "Antwoorden op gesproken, vaak heel precieze vragen.", imageKey: "voice" },
      { title: "AI-tools", text: "Moderne assistenten helpen uw bedrijf aan te bevelen.", imageKey: "chat" },
    ],
    methodEyebrow: "Onze methode",
    methodTitle: "We verduidelijken, stemmen af en houden het levend.",
    methodText:
      "We gooien niet alles weg. We starten met uw huidige aanwezigheid, corrigeren wat het verhaal vertroebelt en bouwen een basis die u echt beheert.",
    method: [
      "Audit van uw huidige aanwezigheid",
      "Correctie van naam, adres, openingsuren, telefoon en links",
      "Afstemming van Google, maps, lokale profielen en sociale media",
      "Organisatie van reviews, foto's, nuttige vragen en antwoorden",
      "Voorbereiding op spraakzoekopdrachten en AI-tools",
    ],
    resultsEyebrow: "Verwacht resultaat",
    resultsTitle: "Meer duidelijkheid. Meer vertrouwen. Meer klanten.",
    resultsText:
      "Wanneer informatie coherent is, begrijpen klanten u sneller, lezen moderne zoekmachines u beter en wordt uw bedrijf makkelijker aanbevolen.",
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Moet ik al een website hebben?",
        answer:
          "Nee. We kunnen starten met uw bestaande profielen en daarna een officiele basis bouwen als die ontbreekt.",
      },
      {
        question: "Is Google Maps genoeg?",
        answer:
          "Nee. Google Maps is belangrijk, maar moet verbonden zijn met uw website, reviews, sociale profielen en officiele informatie.",
      },
      {
        question: "Helpt dit voor AI-tools?",
        answer:
          "Ja. Moderne tools hebben duidelijke en coherente informatie nodig om een bedrijf te begrijpen en aan te bevelen.",
      },
      {
        question: "Corrigeren jullie ook openingsuren, adressen en links?",
        answer:
          "Ja. Dat is een belangrijk deel van het werk. We stemmen de essentiele informatie af om tegenstrijdigheden tussen website, maps en profielen te vermijden.",
      },
      {
        question: "Tellen klantreviews mee?",
        answer:
          "Ja. Reviews, antwoorden op reviews en recente bewijzen helpen klanten vertrouwen opbouwen en geven nuttige signalen aan platformen.",
      },
      {
        question: "Is dit een eenmalige actie of doorlopend werk?",
        answer:
          "We kunnen starten met een eenmalige correctie, maar lokale zichtbaarheid moet levend blijven: uren, foto's, reviews, diensten en informatie moeten actueel blijven.",
      },
    ],
  },
  kiny: {
    eyebrow: "Kugaragara & kuba hafi y'abakiriya",
    title: "Garagara igihe gikwiye, aho abakiriya bagushakira koko.",
    intro:
      "Dutuma ubucuruzi bwawe busobanuka kuri Google, maps, imbuga nkoranyambaga, gushakisha ukoresheje ijwi n'ibikoresho bya AI.",
    primary: "Suzuma uko ngaragara",
    secondary: "Twandikire",
    promise: [
      "Amakuru nyayo",
      "Maps n'imyirondoro bihuye",
      "Ibitekerezo, amasaha na contacts bihamye",
      "Amakuru yumvikana ku bikoresho bigezweho",
    ],
    problemEyebrow: "Ikibazo kiriho",
    problemTitle: "Ubucuruzi bushobora kubaho ariko ntibubonekere abakiriya.",
    problemText:
      "Izina ritandukanye, adresse ishaje, amasaha adahari cyangwa ibitekerezo bidasubijwe bishobora gutuma umukiriya ahitamo abandi.",
    sourceEyebrow: "Isoko yemewe",
    sourceTitle: "Website iba isoko isobanutse abandi bose bemeza.",
    sourceText:
      "Duhuza website, maps, imbuga, ibitekerezo n'inzira zo kuguhuza kugira ngo amakuru yawe avuge kimwe.",
    channelsEyebrow: "Ahantu duhuza",
    channelsTitle: "Google, maps, ijwi, imbuga na AI bigomba kuvuga inkuru imwe.",
    channelsText:
      "Intego si ukuba hose gusa. Intego ni ukumvikana hose, ufite amakuru yoroshye, agezweho kandi yizewe.",
    channels: [
      { title: "Google", text: "Kugaragara igihe umukiriya ashaka serivisi yawe.", imageKey: "google" },
      { title: "Maps", text: "Kwerekana umwirondoro usobanutse utanga icyizere.", imageKey: "maps" },
      { title: "Inzira", text: "Korohereza umukiriya kukugeraho.", imageKey: "route" },
      { title: "Imbuga nkoranyambaga", text: "Kwerekana ibikorwa, ibitekerezo n'ibimenyetso.", imageKey: "social" },
      { title: "Gushakisha n'ijwi", text: "Gusubiza ibibazo bivuzwe n'umukiriya.", imageKey: "voice" },
      { title: "Ibikoresho bya AI", text: "Gufasha assistants zigezweho kukugira inama.", imageKey: "chat" },
    ],
    methodEyebrow: "Uko dukora",
    methodTitle: "Dutegura, tugahuza, hanyuma tukabigumisha ku murongo.",
    methodText:
      "Ntitujugunya byose. Dutangirira aho uri, tugakosora ibitera urujijo, tukubakira isoko ugenzura.",
    method: [
      "Kureba uko ugaragara ubu",
      "Gukosora izina, adresse, amasaha, telefone na links",
      "Guhuza Google, maps, imyirondoro n'imbuga",
      "Gutegura ibitekerezo, amafoto, ibibazo n'ibisubizo",
      "Kwitegura gushakishwa n'ijwi na AI",
    ],
    resultsEyebrow: "Icyo tugamije",
    resultsTitle: "Ubusobanuro bwinshi. Icyizere kinshi. Abakiriya benshi.",
    resultsText:
      "Iyo amakuru ahuye, abakiriya bakumva vuba, moteri zigezweho zikagusoma neza, ubucuruzi bwawe bukoroha kubusaba abandi.",
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      {
        question: "Ngomba kuba mfite website?",
        answer:
          "Oya. Dushobora gutangirira ku myirondoro ufite, hanyuma tukubakira isoko yemewe niba ibura.",
      },
      {
        question: "Google Maps yonyine irahagije?",
        answer:
          "Oya. Ni ingenzi, ariko igomba guhuzwa na website, ibitekerezo, imbuga n'amakuru yemewe.",
      },
      {
        question: "Bifasha mu bikoresho bya AI?",
        answer:
          "Yego. Ibikoresho bigezweho bikenera amakuru asobanutse kandi ahuye kugira ngo bigusobanukirwe.",
      },
      {
        question: "Mukosora amasaha, adresse na links?",
        answer:
          "Yego. Ni igice cy'ingenzi cy'akazi. Duhuza amakuru y'ingenzi kugira ngo website, maps n'imyirondoro bitavuguruzanya.",
      },
      {
        question: "Reviews z'abakiriya zifite akamaro?",
        answer:
          "Yego. Reviews, ibisubizo ku bitekerezo n'ibimenyetso bishya bifasha abakiriya kukugirira icyizere.",
      },
      {
        question: "Ni akazi k'incuro imwe cyangwa gakomeza?",
        answer:
          "Dushobora gutangirira ku gukosora rimwe, ariko kugaragara neza bigomba gukomeza: amasaha, amafoto, reviews, serivisi n'amakuru bigomba kuba bigezweho.",
      },
    ],
  },
};

const visualSets = {
  fr: {
    problem: problemFr,
    modern: modernFr,
    source: sourceFr,
    google: googleFr,
    maps: mapsFr,
    route: routeFr,
    voice: voiceFr,
    chat: chatFr,
    social: socialFr,
    trust: trustFr,
    results: resultsFr,
  },
  en: {
    problem: problemEn,
    modern: modernEn,
    source: sourceEn,
    google: googleEn,
    maps: mapsEn,
    route: routeEn,
    voice: voiceEn,
    chat: chatEn,
    social: socialEn,
    trust: trustEn,
    results: resultsEn,
  },
  nl: {
    problem: problemNl,
    modern: modernNl,
    source: sourceNl,
    google: googleNl,
    maps: mapsNl,
    route: routeNl,
    voice: voiceNl,
    chat: chatNl,
    social: socialNl,
    trust: trustNl,
    results: resultsNl,
  },
  kiny: {
    problem: problemEn,
    modern: modernEn,
    source: sourceEn,
    google: googleEn,
    maps: mapsEn,
    route: routeEn,
    voice: voiceEn,
    chat: chatEn,
    social: socialEn,
    trust: trustEn,
    results: resultsEn,
  },
};

const SectionLabel = ({ children }: { children: string }) => (
  <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-wide text-[#fff200] phone:text-sm [overflow-wrap:anywhere]">
    <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
    {children}
  </div>
);

const VisualPanel = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div
    className={`max-w-full overflow-hidden rounded-[1.4rem] border border-white/25 bg-[#071a33]/70 p-2 shadow-[0_18px_70px_rgba(0,0,0,.3)] backdrop-blur-sm ${className}`}
  >
    <img src={src} alt={alt} className="h-auto max-w-full w-full rounded-[1rem] object-contain" />
  </div>
);

const LocalVisibility = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const visuals = visualSets[locale] ?? visualSets.en;
  const startPath = buildLocalLocalePath(market, locale, "/start-project");
  const contactPath = buildLocalLocalePath(market, locale, "/contact");

  return (
    <main className="relative isolate min-h-screen max-w-full overflow-x-hidden bg-[#071a33]/55 text-white">
      <section className="max-w-full overflow-x-hidden relative px-4 pb-12 pt-28 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid min-w-0 max-w-7xl gap-8 laptop:grid-cols-[.82fr_1.18fr] laptop:items-center">
          <div>
            <SectionLabel>{copy.eyebrow}</SectionLabel>
            <h1 className="font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,.35)] phone:text-5xl laptop:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-black leading-8 text-white/90 phone:text-xl [overflow-wrap:anywhere]">
              {copy.intro}
            </p>
            <div className="mt-8 grid min-w-0 gap-3 phone:grid-cols-2">
              {copy.promise.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[#EEBA2B]/35 bg-[#071a33]/75 px-4 py-3 text-sm font-black backdrop-blur-sm [overflow-wrap:anywhere]"
                >
                  <FaCheckCircle className="text-[#fff200]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex min-w-0 flex-row flex-wrap gap-3">
              <Link
                to={startPath}
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-3 rounded-full border-2 border-[#fff200] bg-[#fff200] px-5 py-4 text-xs font-black uppercase text-[#071a33] transition hover:bg-transparent hover:text-[#fff200] phone:flex-none phone:px-7 [overflow-wrap:anywhere]"
              >
                {copy.primary}
                <FaArrowRight />
              </Link>
              <Link
                to={contactPath}
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-3 rounded-full border-2 border-white px-5 py-4 text-xs font-black uppercase text-white transition hover:border-[#fff200] hover:text-[#fff200] phone:flex-none phone:px-7 [overflow-wrap:anywhere]"
              >
                {copy.secondary}
                <FaComments />
              </Link>
            </div>
          </div>
          <VisualPanel src={visuals.modern} alt={copy.title} />
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto min-w-0 max-w-7xl">
          <SectionLabel>{copy.problemEyebrow}</SectionLabel>
          <div className="grid gap-7 laptop:grid-cols-[.75fr_1.25fr] laptop:items-center">
            <div>
              <h2 className="font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white phone:text-5xl">
                {copy.problemTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base font-black leading-8 text-white/90 phone:text-lg [overflow-wrap:anywhere]">
                {copy.problemText}
              </p>
            </div>
            <VisualPanel src={visuals.problem} alt={copy.problemTitle} />
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto min-w-0 max-w-7xl">
          <SectionLabel>{copy.sourceEyebrow}</SectionLabel>
          <div className="grid gap-7 laptop:grid-cols-[1.18fr_.82fr] laptop:items-center">
            <VisualPanel src={visuals.source} alt={copy.sourceTitle} />
            <div>
              <h2 className="font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white phone:text-5xl">
                {copy.sourceTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base font-black leading-8 text-white/90 phone:text-lg [overflow-wrap:anywhere]">
                {copy.sourceText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto min-w-0 max-w-7xl">
          <SectionLabel>{copy.channelsEyebrow}</SectionLabel>
          <div className="max-w-5xl">
            <h2 className="font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white phone:text-5xl laptop:text-6xl">
              {copy.channelsTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg [overflow-wrap:anywhere]">
              {copy.channelsText}
            </p>
          </div>

          <div className="mt-9 grid gap-5 tablet:grid-cols-2 laptop:grid-cols-3">
            {copy.channels.map((channel, index) => (
              <article
                key={channel.title}
                className={`group overflow-hidden rounded-[1.4rem] border border-white/25 bg-[#071a33]/75 p-2 backdrop-blur-sm transition duration-300 hover:-translate-y-1 ${
                  index === 1 || index === 5 ? "laptop:translate-y-10" : ""
                }`}
              >
                <img
                  src={visuals[channel.imageKey]}
                  alt={channel.title}
                  className="h-auto max-w-full w-full rounded-[1rem] object-contain"
                />
                <div className="px-3 py-4">
                  <h3 className="text-xl font-black text-white [overflow-wrap:anywhere]">{channel.title}</h3>
                  <p className="mt-2 text-sm font-black leading-6 text-white/85 [overflow-wrap:anywhere]">
                    {channel.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid min-w-0 max-w-7xl gap-8 laptop:grid-cols-[.85fr_1.15fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.methodEyebrow}</SectionLabel>
            <h2 className="font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white phone:text-5xl">
              {copy.methodTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg [overflow-wrap:anywhere]">
              {copy.methodText}
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-[#EEBA2B]/45 bg-[linear-gradient(135deg,rgba(7,26,51,.86),rgba(0,0,0,.72)),repeating-linear-gradient(135deg,rgba(238,186,43,.16)_0,rgba(238,186,43,.16)_1px,transparent_1px,transparent_10px)] p-5 backdrop-blur-sm phone:p-7">
            <ol className="space-y-4">
              {copy.method.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[3rem_1fr] items-center gap-4 rounded-2xl border border-white/15 bg-black/20 p-4"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#fff200] text-lg font-black text-[#fff200] [overflow-wrap:anywhere]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-black leading-6 text-white phone:text-base [overflow-wrap:anywhere]">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto min-w-0 max-w-7xl">
          <SectionLabel>{copy.resultsEyebrow}</SectionLabel>
          <h2 className="max-w-5xl font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white phone:text-5xl laptop:text-6xl">
            {copy.resultsTitle}
          </h2>
          <p className="mt-5 max-w-4xl text-base font-black leading-8 text-white/90 phone:text-lg [overflow-wrap:anywhere]">
            {copy.resultsText}
          </p>
          <div className="mt-9 grid gap-5 laptop:grid-cols-2">
            <VisualPanel src={visuals.trust} alt={copy.resultsTitle} />
            <VisualPanel src={visuals.results} alt={copy.resultsTitle} />
          </div>
        </div>
      </section>

      <section className="max-w-full overflow-x-hidden border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto min-w-0 max-w-5xl">
          <SectionLabel>{copy.faqTitle}</SectionLabel>
          <ServiceFAQAccordion
            items={copy.faqs}
            icon={<FaSearchLocation aria-hidden="true" />}
          />
        </div>
      </section>

      <ServiceFinalCTA />
    </main>
  );
};

export default LocalVisibility;
