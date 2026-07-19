import {
  ArrowRight,
  Bot,
  Globe2,
  MapPin,
  MessageCircle,
  Search,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../../data/marketRuntime";
import problemVisibilityEn from "../../assets/problem-visibility-en.webp";
import problemVisibilityFr from "../../assets/problem-visibility-fr.webp";
import problemVisibilityNl from "../../assets/problem-visibility-nl.webp";
import chatgptRecommendationFr from "../../assets/alignment/chatgpt-recommendation.webp";
import chatgptRecommendationEn from "../../assets/alignment/chatgpt-recommendation-en.webp";
import chatgptRecommendationNl from "../../assets/alignment/chatgpt-recommendation-nl.webp";
import chatgptScreenFr from "../../assets/alignment/chatgpt-screen.webp";
import chatgptScreenEn from "../../assets/alignment/chatgpt-screen-en.webp";
import chatgptScreenNl from "../../assets/alignment/chatgpt-screen-nl.webp";
import creativeServicesFr from "../../assets/creative-services.webp";
import creativeServicesEn from "../../assets/creative-services-en.webp";
import creativeServicesNl from "../../assets/creative-services-nl.webp";
import clearInfoResultsFr from "../../assets/alignment/clear-info-results.webp";
import clearInfoResultsEn from "../../assets/alignment/clear-info-results-en.webp";
import clearInfoResultsNl from "../../assets/alignment/clear-info-results-nl.webp";
import coherenceConfidenceFr from "../../assets/alignment/coherence-confidence.webp";
import coherenceConfidenceEn from "../../assets/alignment/coherence-confidence-en.webp";
import coherenceConfidenceNl from "../../assets/alignment/coherence-confidence-nl.webp";
import googleMapsProfileFr from "../../assets/alignment/google-maps-profile.webp";
import googleMapsProfileEn from "../../assets/alignment/google-maps-profile-en.webp";
import googleMapsProfileNl from "../../assets/alignment/google-maps-profile-nl.webp";
import googleSearchResultFr from "../../assets/alignment/google-search-result.webp";
import googleSearchResultEn from "../../assets/alignment/google-search-result-en.webp";
import googleSearchResultNl from "../../assets/alignment/google-search-result-nl.webp";
import localMapCardFr from "../../assets/alignment/local-map-card.webp";
import localMapCardEn from "../../assets/alignment/local-map-card-en.webp";
import localMapCardNl from "../../assets/alignment/local-map-card-nl.webp";
import mapsRoutePhoneFr from "../../assets/alignment/maps-route-phone.webp";
import mapsRoutePhoneEn from "../../assets/alignment/maps-route-phone-en.webp";
import mapsRoutePhoneNl from "../../assets/alignment/maps-route-phone-nl.webp";
import modernVisibilityFr from "../../assets/alignment/modern-visibility.webp";
import modernVisibilityEn from "../../assets/alignment/modern-visibility-en.webp";
import modernVisibilityNl from "../../assets/alignment/modern-visibility-nl.webp";
import officialSourceFlowFr from "../../assets/alignment/official-source-flow.webp";
import officialSourceFlowEn from "../../assets/alignment/official-source-flow-en.webp";
import officialSourceFlowNl from "../../assets/alignment/official-source-flow-nl.webp";
import siteWebFr from "../../assets/alignment/site-web.webp";
import siteWebEn from "../../assets/alignment/site-web-en.webp";
import siteWebNl from "../../assets/alignment/site-web-nl.webp";
import socialPostsFr from "../../assets/alignment/social-posts.webp";
import socialPostsEn from "../../assets/alignment/social-posts-en.webp";
import socialPostsNl from "../../assets/alignment/social-posts-nl.webp";
import voiceAssistantQuestionFr from "../../assets/alignment/voice-assistant-question.webp";
import voiceAssistantQuestionEn from "../../assets/alignment/voice-assistant-question-en.webp";
import voiceAssistantQuestionNl from "../../assets/alignment/voice-assistant-question-nl.webp";
import voiceSearchFr from "../../assets/alignment/voice-search.webp";
import voiceSearchEn from "../../assets/alignment/voice-search-en.webp";
import voiceSearchNl from "../../assets/alignment/voice-search-nl.webp";
import "./HomeRefonteSections.css";

const homeRefonteCopy = {
  fr: {
    about: {
      eyebrow: "Qui sommes-nous",
      title: "Un souffle creatif, une main technique, une touche poetique.",
      body: "Creativa Poeta donne vie aux idees. Nous melons design, mots, sites web, contenus, visibilité et intelligence artificielle pour créer des présences qui se voient, se comprennent et se retiennent. Votre creativite est notre passion.",
    },
    pillars: [
      { icon: MessageCircle, title: "Une voix", body: "Des mots qui portent votre idée avec clarté, rythme et intention." },
      { icon: Target, title: "Une image", body: "Des visuels, logos et supports qui donnent une forme visible a votre univers." },
      { icon: Globe2, title: "Une présence", body: "Un site, des profils et des contenus qui relient votre creation au public." },
      { icon: Bot, title: "Une intelligence", body: "Des assistants IA et outils sur mesure qui prolongent votre savoir-faire." },
    ],
    problem: {
      eyebrow: "Le probleme actuel",
      title: "Vos clients ne cherchent plus comme avant.",
      body: "Aujourd'hui, un client peut vous chercher sur Google, demander une recommandation a un assistant vocal, regarder Google Maps, comparer des avis, visiter Instagram ou poser une question a une IA. Si vos informations sont dispersees, contradictoires ou difficiles à comprendre, vous pouvez etre invisible au moment precis ou le client a besoin de vous.",
      alt: "Presence invisible ou visible au bon moment selon la cohérence des informations",
    },
    localCta: {
      first: "Quelle agence peut refaire mon site pour etre visible dans Google et les moteurs IA ?",
      second: "Qui peut m'aider à être visible dans Google Maps, Apple Maps et ChatGPT ?",
      with: "avec Creativa Poeta",
      have: "vous avez",
      line: "la bonne visibilité, au bon moment, sur tous les réseaux",
      action: "Nous contacter",
      aria: "Contacter Creativa Poeta",
    },
    modern: {
      eyebrow: "Visibilite moderne",
      title: "Etre visible sur Google ne suffit plus.",
      body: "Nous preparons votre présence pour Google, les maps, les réseaux, la voix et les outils IA.",
      alt: "Visibilite moderne sur Google, maps, voix et outils IA",
    },
    source: {
      eyebrow: "Votre base officielle",
      title: "Un site clair devient la source que tout le reste peut confirmer.",
      body: "Vos profils, vos avis, vos réseaux et les assistants modernes doivent trouver les memes informations fiables.",
      alt: "Site officiel relie a Google, maps, réseaux sociaux et assistants IA",
    },
    channels: {
      eyebrow: "Vos canaux",
      title: "Chaque endroit ou l'on vous cherche doit raconter la meme histoire.",
      body: "Site, Google, maps et réseaux sociaux travaillent ensemble pour rendre votre entreprise plus facile a trouver.",
    },
    ai: {
      eyebrow: "Voix et IA",
      title: "Vos clients ne tapent plus seulement des mots. Ils posent des questions.",
      body: "Nous vous aidons à devenir une reponse claire dans les recherches vocales, les assistants et les moteurs conversationnels.",
    },
    trust: {
      eyebrow: "Confiance",
      title: "Plus de clarté. Plus de coherence. Plus de visibilité.",
      body: "Quand vos informations sont exactes et a jour partout, les clients et les moteurs modernes vous comprennent mieux.",
      coherenceAlt: "Coherence des informations et confiance client",
      resultAlt: "Informations claires pour plus de visibilité et de clients",
    },
    creative: {
      eyebrow: "Votre creativite",
      title: "Nos services creatifs restent au coeur de Creativa Poeta.",
      body: "Design graphique, redaction, contenus, presentations, documents, videos, publications et supports professionnels : nous transformons vos idées en creations visibles, utiles et memorables.",
      alt: "Services creatifs de Creativa Poeta : design, redaction, contenus, documents, presentations et visibilité",
    },
    final: {
      title: "Votre creativite, notre passion.",
      body: "Que vous soyez entrepreneur, createur de contenu, entreprise ou particulier, nous sommes la pour donner vie a vos idées, renforcer votre présence en ligne et susciter l'engagement de votre public.",
      primary: "Demarrer un projet",
      secondary: "Parler a Creativa Poeta",
    },
    channelCards: {
      site: ["Votre site", "La base claire qui explique votre offre."],
      google: ["Google", "Etre trouve au moment ou le client cherche."],
      local: ["Profils locaux", "Des informations cohérentes là où les clients regardent."],
      social: ["Reseaux sociaux", "Des preuves vivantes, des avis, des realisations."],
      maps: ["Google Maps", "Une fiche complete qui inspire confiance."],
      route: ["Itineraire", "Le chemin le plus court vers votre entreprise."],
    },
    aiCards: {
      voiceQuestion: ["Questions vocales", "Vos clients parlent a leur téléphone, leur voiture ou leur assistant."],
      voiceSearch: ["Recherche vocale", "Votre entreprise doit pouvoir etre la reponse simple et utile."],
      recommendation: ["Recommandations IA", "Les outils comme ChatGPT doivent comprendre pourquoi vous recommander."],
      conversation: ["Conversation", "Votre présence doit être assez claire pour etre citee dans une reponse."],
    },
  },
  en: {
    about: {
      eyebrow: "About us",
      title: "A creative breath, a technical hand, a poetic touch.",
      body: "Creativa Poeta brings ideas to life. We blend design, words, websites, content, visibility and artificial intelligence to create présences people can find, understand and remember. Your creativity is our passion.",
    },
    pillars: [
      { icon: MessageCircle, title: "A voice", body: "Words that carry your idea with clarity, rhythm and intention." },
      { icon: Target, title: "An image", body: "Visuals, logos and supports that give your world a visible form." },
      { icon: Globe2, title: "A présence", body: "A website, profiles and content that connect your creation to your audience." },
      { icon: Bot, title: "An intelligence", body: "Custom AI assistants and tools that extend your know-how." },
    ],
    problem: {
      eyebrow: "The current problem",
      title: "Your customers no longer search like before.",
      body: "Today, a customer can search for you on Google, ask a voice assistant for a recommendation, check Google Maps, compare reviews, visit Instagram or ask an AI tool a question. If your information is scattered, contradictory or hard to understand, you can be invisible at the exact moment the customer needs you.",
      alt: "Invisible or visible at the right time depending on information consistency",
    },
    localCta: {
      first: "Which agency can rebuild my website so it can be found on Google and AI engines?",
      second: "Who can help me appear on Google Maps, Apple Maps and ChatGPT?",
      with: "with Creativa Poeta",
      have: "you have",
      line: "the right visibility, at the right time, across every channel",
      action: "Contact us",
      aria: "Contact Creativa Poeta",
    },
    modern: {
      eyebrow: "Modern visibility",
      title: "Being visible on Google is no longer enough.",
      body: "We prepare your presence for Google, maps, social media, voice search and AI tools.",
      alt: "Modern visibility across Google, maps, voice search and AI tools",
    },
    source: {
      eyebrow: "Your official base",
      title: "A clear website becomes the source everything else can confirm.",
      body: "Your profiles, reviews, social channels and modern assistants must all find the same reliable information.",
      alt: "Official website connected to Google, maps, social media and AI assistants",
    },
    channels: {
      eyebrow: "Your channels",
      title: "Every place where people search for you must tell the same story.",
      body: "Website, Google, maps and social media work together so your business is easier to find.",
    },
    ai: {
      eyebrow: "Voice and AI",
      title: "Your customers no longer just type words. They ask questions.",
      body: "We help you become a clear answer in voice searches, assistants and conversational engines.",
    },
    trust: {
      eyebrow: "Trust",
      title: "More clarity. More consistency. More visibility.",
      body: "When your information is accurate and up to date everywhere, customers and modern engines understand you better.",
      coherenceAlt: "Information consistency and customer trust",
      resultAlt: "Clear information for more visibility and customers",
    },
    creative: {
      eyebrow: "Your creativity",
      title: "Creative services remain at the heart of Creativa Poeta.",
      body: "Graphic design, writing, content, presentations, documents, videos, posts and professional supports: we turn your ideas into visible, useful and memorable creations.",
      alt: "Creativa Poeta creative services: design, writing, content, documents, presentations and visibility",
    },
    final: {
      title: "Your creativity, our passion.",
      body: "Whether you are an entrepreneur, content creator, company or individual, we help bring your ideas to life, strengthen your online présence and engage your audience.",
      primary: "Start a project",
      secondary: "Talk to Creativa Poeta",
    },
    channelCards: {
      site: ["Your website", "The clear base that explains your offer."],
      google: ["Google", "Be found when the customer is searching."],
      local: ["Local profiles", "Consistent information where customers look."],
      social: ["Social media", "Living proof, reviews and recent work."],
      maps: ["Google Maps", "A complete profile that inspires trust."],
      route: ["Directions", "The shortest path to your business."],
    },
    aiCards: {
      voiceQuestion: ["Voice questions", "Your customers speak to their phone, car or assistant."],
      voiceSearch: ["Voice search", "Your business must become the simple, useful answer."],
      recommendation: ["AI recommendations", "Tools like ChatGPT need to understand why they should recommend you."],
      conversation: ["Conversation", "Your présence must be clear enough to be cited in an answer."],
    },
  },
  nl: {
    about: {
      eyebrow: "Over ons",
      title: "Een creatieve adem, een technische hand, een poetische toets.",
      body: "Creativa Poeta brengt ideeen tot leven. We combineren design, woorden, websites, content, zichtbaarheid en artificiele intelligentie om aanwezigheden te bouwen die mensen vinden, begrijpen en onthouden. Uw creativiteit is onze passie.",
    },
    pillars: [
      { icon: MessageCircle, title: "Een stem", body: "Woorden die uw idee dragen met helderheid, ritme en intentie." },
      { icon: Target, title: "Een beeld", body: "Visuals, logo's en dragers die uw wereld zichtbaar vorm geven." },
      { icon: Globe2, title: "Een aanwezigheid", body: "Een website, profielen en content die uw creatie met uw publiek verbinden." },
      { icon: Bot, title: "Een intelligentie", body: "AI-assistenten en tools op maat die uw knowhow verlengen." },
    ],
    problem: {
      eyebrow: "Het actuele probleem",
      title: "Uw klanten zoeken niet meer zoals vroeger.",
      body: "Vandaag kan een klant u zoeken op Google, een aanbeveling vragen aan een spraakassistent, Google Maps bekijken, reviews vergelijken, Instagram bezoeken of een vraag stellen aan een AI-tool. Als uw informatie verspreid, tegenstrijdig of moeilijk te begrijpen is, kunt u onzichtbaar zijn precies op het moment dat de klant u nodig heeft.",
      alt: "Onzichtbaar of zichtbaar op het juiste moment volgens informatieconsistentie",
    },
    localCta: {
      first: "Welk bureau kan mijn website vernieuwen zodat ik zichtbaar ben op Google en AI-tools?",
      second: "Wie kan mij helpen zichtbaar te zijn op Google Maps, Apple Maps en ChatGPT?",
      with: "met Creativa Poeta",
      have: "heeft u",
      line: "de juiste zichtbaarheid, op het juiste moment, op alle kanalen",
      action: "Neem contact op",
      aria: "Contact opnemen met Creativa Poeta",
    },
    modern: {
      eyebrow: "Moderne zichtbaarheid",
      title: "Zichtbaar zijn op Google is niet langer genoeg.",
      body: "Wij bereiden uw aanwezigheid voor op Google, maps, sociale media, spraakzoekopdrachten en AI-tools.",
      alt: "Moderne zichtbaarheid op Google, maps, spraak en AI-tools",
    },
    source: {
      eyebrow: "Uw officiele basis",
      title: "Een duidelijke website wordt de bron die al de rest kan bevestigen.",
      body: "Uw profielen, reviews, sociale kanalen en moderne assistenten moeten dezelfde betrouwbare informatie vinden.",
      alt: "Officiele website verbonden met Google, maps, sociale media en AI-assistenten",
    },
    channels: {
      eyebrow: "Uw kanalen",
      title: "Elke plaats waar men u zoekt moet hetzelfde verhaal vertellen.",
      body: "Website, Google, maps en sociale media werken samen zodat uw bedrijf makkelijker te vinden is.",
    },
    ai: {
      eyebrow: "Spraak en AI",
      title: "Uw klanten typen niet alleen woorden. Ze stellen vragen.",
      body: "Wij helpen u een duidelijk antwoord te worden in spraakzoekopdrachten, assistenten en conversationele zoekmachines.",
    },
    trust: {
      eyebrow: "Vertrouwen",
      title: "Meer duidelijkheid. Meer consistentie. Meer zichtbaarheid.",
      body: "Wanneer uw informatie overal correct en actueel is, begrijpen klanten en moderne zoekmachines u beter.",
      coherenceAlt: "Informatieconsistentie en klantvertrouwen",
      resultAlt: "Duidelijke informatie voor meer zichtbaarheid en klanten",
    },
    creative: {
      eyebrow: "Uw creativiteit",
      title: "Onze creatieve diensten blijven het hart van Creativa Poeta.",
      body: "Grafisch ontwerp, redactie, content, presentaties, documenten, video's, berichten en professionele dragers: wij maken van uw ideeen zichtbare, nuttige en memorabele creaties.",
      alt: "Creatieve diensten van Creativa Poeta: design, redactie, content, documenten, presentaties en zichtbaarheid",
    },
    final: {
      title: "Uw creativiteit, onze passie.",
      body: "Of u nu ondernemer, content creator, bedrijf of particulier bent, wij helpen uw ideeen tot leven brengen, uw online aanwezigheid versterken en uw publiek betrekken.",
      primary: "Start een project",
      secondary: "Praat met Creativa Poeta",
    },
    channelCards: {
      site: ["Uw website", "De duidelijke basis die uw aanbod uitlegt."],
      google: ["Google", "Gevonden worden op het moment dat de klant zoekt."],
      local: ["Lokale profielen", "Consistente informatie waar klanten kijken."],
      social: ["Sociale media", "Levende bewijzen, reviews en realisaties."],
      maps: ["Google Maps", "Een volledige fiche die vertrouwen wekt."],
      route: ["Route", "De kortste weg naar uw bedrijf."],
    },
    aiCards: {
      voiceQuestion: ["Spraakvragen", "Uw klanten spreken met hun telefoon, wagen of assistent."],
      voiceSearch: ["Spraakzoekopdracht", "Uw bedrijf moet het eenvoudige en nuttige antwoord kunnen zijn."],
      recommendation: ["AI-aanbevelingen", "Tools zoals ChatGPT moeten begrijpen waarom ze u kunnen aanbevelen."],
      conversation: ["Conversatie", "Uw aanwezigheid moet duidelijk genoeg zijn om in een antwoord vermeld te worden."],
    },
  },
} as const;

const getHomeRefonteCopy = (locale: string) => {
  if (locale === "fr") return homeRefonteCopy.fr;
  if (locale === "nl") return homeRefonteCopy.nl;
  return homeRefonteCopy.en;
};

const sectionStyleOne = {
  background: "rgba(247, 244, 237, 0.32)",
};

const sectionStyleTwo = {
  background: "rgba(12, 34, 25, 0.58)",
};

type LocalizedAsset = {
  fr: string;
  en: string;
  nl: string;
};

const pickLocalizedAsset = (locale: string, assets: LocalizedAsset) => {
  if (locale === "fr") return assets.fr;
  if (locale === "nl") return assets.nl;
  return assets.en;
};

const getLocalizedVisuals = (locale: string) => ({
  chatgptRecommendation: pickLocalizedAsset(locale, {
    fr: chatgptRecommendationFr,
    en: chatgptRecommendationEn,
    nl: chatgptRecommendationNl,
  }),
  chatgptScreen: pickLocalizedAsset(locale, {
    fr: chatgptScreenFr,
    en: chatgptScreenEn,
    nl: chatgptScreenNl,
  }),
  clearInfoResults: pickLocalizedAsset(locale, {
    fr: clearInfoResultsFr,
    en: clearInfoResultsEn,
    nl: clearInfoResultsNl,
  }),
  coherenceConfidence: pickLocalizedAsset(locale, {
    fr: coherenceConfidenceFr,
    en: coherenceConfidenceEn,
    nl: coherenceConfidenceNl,
  }),
  creativeServices: pickLocalizedAsset(locale, {
    fr: creativeServicesFr,
    en: creativeServicesEn,
    nl: creativeServicesNl,
  }),
  googleMapsProfile: pickLocalizedAsset(locale, {
    fr: googleMapsProfileFr,
    en: googleMapsProfileEn,
    nl: googleMapsProfileNl,
  }),
  googleSearchResult: pickLocalizedAsset(locale, {
    fr: googleSearchResultFr,
    en: googleSearchResultEn,
    nl: googleSearchResultNl,
  }),
  localMapCard: pickLocalizedAsset(locale, {
    fr: localMapCardFr,
    en: localMapCardEn,
    nl: localMapCardNl,
  }),
  mapsRoutePhone: pickLocalizedAsset(locale, {
    fr: mapsRoutePhoneFr,
    en: mapsRoutePhoneEn,
    nl: mapsRoutePhoneNl,
  }),
  modernVisibility: pickLocalizedAsset(locale, {
    fr: modernVisibilityFr,
    en: modernVisibilityEn,
    nl: modernVisibilityNl,
  }),
  officialSourceFlow: pickLocalizedAsset(locale, {
    fr: officialSourceFlowFr,
    en: officialSourceFlowEn,
    nl: officialSourceFlowNl,
  }),
  siteWeb: pickLocalizedAsset(locale, {
    fr: siteWebFr,
    en: siteWebEn,
    nl: siteWebNl,
  }),
  socialPosts: pickLocalizedAsset(locale, {
    fr: socialPostsFr,
    en: socialPostsEn,
    nl: socialPostsNl,
  }),
  voiceAssistantQuestion: pickLocalizedAsset(locale, {
    fr: voiceAssistantQuestionFr,
    en: voiceAssistantQuestionEn,
    nl: voiceAssistantQuestionNl,
  }),
  voiceSearch: pickLocalizedAsset(locale, {
    fr: voiceSearchFr,
    en: voiceSearchEn,
    nl: voiceSearchNl,
  }),
});

const getChannelImages = (
  locale: string,
  copy: ReturnType<typeof getHomeRefonteCopy>
) => {
  const visuals = getLocalizedVisuals(locale);

  return [
    {
      src: visuals.siteWeb,
      title: copy.channelCards.site[0],
      text: copy.channelCards.site[1],
      size: "large",
    },
    {
      src: visuals.googleSearchResult,
      title: copy.channelCards.google[0],
      text: copy.channelCards.google[1],
      size: "compact",
    },
    {
      src: visuals.localMapCard,
      title: copy.channelCards.local[0],
      text: copy.channelCards.local[1],
      size: "compact",
    },
    {
      src: visuals.socialPosts,
      title: copy.channelCards.social[0],
      text: copy.channelCards.social[1],
      size: "wide",
    },
    {
      src: visuals.googleMapsProfile,
      title: copy.channelCards.maps[0],
      text: copy.channelCards.maps[1],
      size: "wide",
    },
    {
      src: visuals.mapsRoutePhone,
      title: copy.channelCards.route[0],
      text: copy.channelCards.route[1],
      size: "compact",
    },
  ];
};

const getAiImages = (
  locale: string,
  copy: ReturnType<typeof getHomeRefonteCopy>
) => {
  const visuals = getLocalizedVisuals(locale);

  return [
    {
      src: visuals.voiceAssistantQuestion,
      title: copy.aiCards.voiceQuestion[0],
      text: copy.aiCards.voiceQuestion[1],
    },
    {
      src: visuals.voiceSearch,
      title: copy.aiCards.voiceSearch[0],
      text: copy.aiCards.voiceSearch[1],
    },
    {
      src: visuals.chatgptRecommendation,
      title: copy.aiCards.recommendation[0],
      text: copy.aiCards.recommendation[1],
    },
    {
      src: visuals.chatgptScreen,
      title: copy.aiCards.conversation[0],
      text: copy.aiCards.conversation[1],
    },
  ];
};

export const HomeRefonteBeforeServices = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = getHomeRefonteCopy(locale);
  const channelImages = getChannelImages(locale, copy);
  const visuals = getLocalizedVisuals(locale);
  const aiImages = getAiImages(locale, copy);
  const problemImage =
    locale === "fr"
      ? problemVisibilityFr
      : locale === "nl"
        ? problemVisibilityNl
        : problemVisibilityEn;

  return (
    <>
      <section
        id="about"
        className="cp-refonte-section cp-refonte-light cp-heading-open"
        style={sectionStyleOne}
      >
        <div className="cp-shape-ring cp-shape-ring-left" aria-hidden="true" />
        <div className="cp-shape-slab cp-shape-slab-right" aria-hidden="true" />
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-floating-heading cp-title-on-bg">
            <p>{copy.about.eyebrow}</p>
            <h2>{copy.about.title}</h2>
            <span>{copy.about.body}</span>
          </div>
          <div className="cp-refonte-icon-grid cp-animate-list">
            {copy.pillars.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <span className="cp-refonte-icon-badge">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="probleme-actuel"
        className="cp-refonte-section cp-refonte-light cp-refonte-problem-visual"
      >
        <div className="cp-shape-slab cp-shape-slab-right" aria-hidden="true" />
        <div className="cp-refonte-shell cp-refonte-problem-inner">
          <div className="cp-refonte-heading cp-floating-heading cp-title-on-bg">
            <p>{copy.problem.eyebrow}</p>
            <h2>{copy.problem.title}</h2>
            <span>{copy.problem.body}</span>
          </div>
        </div>
        <div className="cp-refonte-shell cp-refonte-problem-shell cp-refonte-problem-image-only">
          <figure className="cp-refonte-problem-art">
            <img
              src={problemImage}
              alt={copy.problem.alt}
            />
          </figure>
        </div>
        <Link
          to={localizePath("/contact")}
          className="cp-refonte-local-cta"
          aria-label={copy.localCta.aria}
        >
          <div className="cp-refonte-local-bubbles" aria-hidden="true">
            <span>
              <Search size={30} />
              {copy.localCta.first}
            </span>
            <span>
              <MapPin size={32} />
              {copy.localCta.second}
            </span>
          </div>
          <div className="cp-refonte-local-ribbon">
            <span className="cp-refonte-local-target">
              <Target size={52} />
            </span>
            <strong>
              {copy.localCta.with}
              <em>{copy.localCta.have}</em>
            </strong>
            <small>{copy.localCta.line}</small>
            <span className="cp-refonte-local-action">
              {copy.localCta.action}
              <ArrowRight size={18} />
            </span>
          </div>
        </Link>
      </section>

      <section
        id="visibilité-moderne"
        className="cp-refonte-section cp-refonte-dark cp-visual-section"
        style={sectionStyleTwo}
      >
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-refonte-heading-dark cp-floating-heading">
            <p>{copy.modern.eyebrow}</p>
            <h2>{copy.modern.title}</h2>
            <span>{copy.modern.body}</span>
          </div>
          <figure className="cp-visual-hero cp-visual-hero-light">
            <img src={visuals.modernVisibility} alt={copy.modern.alt} />
          </figure>
        </div>
      </section>

      <section
        id="source-officielle"
        className="cp-refonte-section cp-refonte-light cp-visual-section"
        style={sectionStyleOne}
      >
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-floating-heading cp-title-on-bg">
            <p>{copy.source.eyebrow}</p>
            <h2>{copy.source.title}</h2>
            <span>{copy.source.body}</span>
          </div>
          <figure className="cp-visual-hero">
            <img src={visuals.officialSourceFlow} alt={copy.source.alt} />
          </figure>
        </div>
      </section>

      <section
        id="canaux"
        className="cp-refonte-section cp-refonte-dark cp-visual-section"
        style={sectionStyleTwo}
      >
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-refonte-heading-dark cp-floating-heading">
            <p>{copy.channels.eyebrow}</p>
            <h2>{copy.channels.title}</h2>
            <span>{copy.channels.body}</span>
          </div>
          <div className="cp-visual-mosaic">
            {channelImages.map((item) => (
              <article key={item.title} className={`cp-visual-card cp-visual-card-${item.size}`}>
                <img src={item.src} alt={item.title} loading="lazy" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="voix-ia"
        className="cp-refonte-section cp-refonte-light cp-visual-section"
        style={sectionStyleOne}
      >
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-floating-heading cp-title-on-bg">
            <p>{copy.ai.eyebrow}</p>
            <h2>{copy.ai.title}</h2>
            <span>{copy.ai.body}</span>
          </div>
          <div className="cp-visual-stack">
            {aiImages.map((item, index) => (
              <article key={item.title} className={index % 2 === 0 ? "is-wide" : ""}>
                <img src={item.src} alt={item.title} loading="lazy" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="confiance"
        className="cp-refonte-section cp-refonte-dark cp-visual-section"
        style={sectionStyleTwo}
      >
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-refonte-heading-dark cp-floating-heading">
            <p>{copy.trust.eyebrow}</p>
            <h2>{copy.trust.title}</h2>
            <span>{copy.trust.body}</span>
          </div>
          <div className="cp-visual-duo">
            <figure>
              <img src={visuals.coherenceConfidence} alt={copy.trust.coherenceAlt} loading="lazy" />
            </figure>
            <figure>
              <img src={visuals.clearInfoResults} alt={copy.trust.resultAlt} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};

export const HomeRefonteAfterServices = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = getHomeRefonteCopy(locale);
  const assistanceLabel =
    locale === "nl"
      ? "Digitale hulp"
      : locale === "en"
      ? "Digital assistance"
      : locale === "kiny"
      ? "Assistance numérique"
      : "Assistance numérique";

  return (
    <>
      <section id="cta-final" className="cp-refonte-final">
        <div className="cp-shape-stripes cp-shape-stripes-left" aria-hidden="true" />
        <div className="cp-refonte-shell">
          <Globe2 size={36} aria-hidden="true" />
          <h2>{copy.final.title}</h2>
          <p>{copy.final.body}</p>
          <div className="cp-refonte-actions">
            <Link className="cp-refonte-button cp-refonte-button-yellow" to={localizePath("/start-project")}>
              {copy.final.primary}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="cp-refonte-button cp-refonte-button-outline" to={localizePath("/demander-assistance-numerique")}>
              {assistanceLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};



