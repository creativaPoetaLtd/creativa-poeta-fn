import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowRight,
  FaCheckCircle,
  FaChevronLeft,
  FaTimes,
  FaFeatherAlt,
  FaGlobe,
  FaLightbulb,
  FaMapMarkedAlt,
  FaPalette,
  FaRegCommentDots,
  FaRobot,
} from "react-icons/fa";
import image8 from "../assets/flags/image8.jpg";
import "../styles/custom-inputs.css";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../data/marketRuntime";

type LocaleKey = "fr" | "en" | "nl" | "kiny";

type ServiceGroup = {
  id: string;
  icon: typeof FaPalette;
  title: string;
  description: string;
  services: string[];
};

type ProjectCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  stepLabel: string;
  steps: string[];
  chooseOne: string;
  chooseServices: string;
  contextTitle: string;
  contextIntro: string;
  contactTitle: string;
  contactIntro: string;
  otherLabel: string;
  otherPlaceholder: string;
  websiteLabel: string;
  websiteOptions: string[];
  channelsLabel: string;
  channels: string[];
  zoneLabel: string;
  zonePlaceholder: string;
  languagesLabel: string;
  languagesPlaceholder: string;
  urgencyLabel: string;
  urgencyOptions: string[];
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  messagePlaceholder: string;
  next: string;
  back: string;
  submit: string;
  close: string;
  required: string;
  success: string;
  error: string;
  groups: ServiceGroup[];
};

const copies: Record<LocaleKey, ProjectCopy> = {
  fr: {
    eyebrow: "Votre creativite, notre passion",
    title: "Dites-nous ce que vous voulez creer, ameliorer ou rendre visible.",
    intro:
      "Creativa Poeta rassemble creation, contenu, sites web, presence locale et visibilite moderne. Choisissez une porte d'entree, puis precisez les services qui vous interessent.",
    stepLabel: "Etape",
    steps: ["Orientation", "Services", "Contexte", "Contact"],
    chooseOne: "Quelle famille de besoin correspond le mieux a votre projet ?",
    chooseServices: "Quels sous-services voulez-vous explorer ?",
    contextTitle: "Ou en est votre presence aujourd'hui ?",
    contextIntro:
      "Ces informations nous aident a comprendre votre base actuelle avant de vous repondre.",
    contactTitle: "Comment pouvons-nous vous recontacter ?",
    contactIntro:
      "Laissez vos coordonnees et un court message. Nous reviendrons vers vous avec une premiere lecture claire.",
    otherLabel: "Autre besoin",
    otherPlaceholder: "Expliquez le service ou l'idee que vous avez en tete...",
    websiteLabel: "Avez-vous deja un site ou une page officielle ?",
    websiteOptions: [
      "Oui, j'ai deja un site",
      "Non, pas encore",
      "J'ai seulement des reseaux sociaux ou une fiche Maps",
      "Je ne sais pas quoi choisir",
    ],
    channelsLabel: "Ou etes-vous deja visible ?",
    channels: [
      "Site web",
      "Google Maps",
      "Apple Maps",
      "Instagram",
      "Facebook",
      "LinkedIn",
      "TikTok",
      "Aucun ou presque",
    ],
    zoneLabel: "Pays, ville ou zone visee",
    zonePlaceholder: "Ex. Bruxelles, Kigali, Paris, Pays-Bas, monde entier...",
    languagesLabel: "Langues importantes",
    languagesPlaceholder: "Ex. francais, neerlandais, anglais, kinyarwanda...",
    urgencyLabel: "Delai souhaite",
    urgencyOptions: [
      "Le plus tot possible",
      "Dans les prochaines semaines",
      "Dans les prochains mois",
      "Je veux d'abord un conseil",
    ],
    name: "Nom",
    email: "E-mail",
    phone: "Telephone",
    company: "Entreprise ou projet",
    message: "Message",
    messagePlaceholder:
      "Ajoutez ce qui est important : objectif, probleme, public vise, liens existants, budget indicatif...",
    next: "Continuer",
    back: "Retour",
    submit: "Envoyer ma demande",
    close: "Retour a l'accueil",
    required: "Veuillez remplir les informations necessaires avant de continuer.",
    success: "Votre demande a bien ete envoyee.",
    error: "Impossible d'envoyer la demande pour le moment.",
    groups: [
      {
        id: "creative",
        icon: FaPalette,
        title: "Creer une identite ou un visuel",
        description:
          "Donner une forme forte a votre idee : logo, image, message, support ou campagne.",
        services: [
          "Creation ou refonte de logo",
          "Identite visuelle complete",
          "Affiches, flyers, brochures et supports imprimes",
          "Visuels pour reseaux sociaux",
          "Infographies et messages visuels",
          "Presentations, slides et dossiers commerciaux",
          "Design pour emballages, vetements, vehicules ou objets",
          "Direction artistique pour une campagne",
        ],
      },
      {
        id: "content",
        icon: FaFeatherAlt,
        title: "Ecrire, raconter ou clarifier",
        description:
          "Transformer vos idees en mots simples, utiles et memorables.",
        services: [
          "Textes pour site web",
          "Pages utiles qui repondent aux questions clients",
          "Articles, histoires et contenus longs",
          "Descriptions de services ou produits",
          "Traduction et adaptation de contenu",
          "Guides, ebooks et documents explicatifs",
          "Discours, lettres, CV ou dossiers",
          "Messages pour reseaux sociaux et campagnes",
        ],
      },
      {
        id: "website",
        icon: FaGlobe,
        title: "Construire votre presence officielle",
        description:
          "Creer ou refondre la base que vos clients, Google, maps et outils IA peuvent comprendre.",
        services: [
          "Site vitrine ou page officielle",
          "Refonte d'un site existant",
          "Pages services claires",
          "Formulaire de contact ou demande de devis",
          "Landing page pour une campagne",
          "Maintenance et mises a jour",
          "Application web, outil interne ou systeme simple",
          "Structure multilingue ou multi-pays",
        ],
      },
      {
        id: "visibility",
        icon: FaMapMarkedAlt,
        title: "Rendre votre entreprise visible",
        description:
          "Aligner votre presence pour que vos clients vous trouvent la ou ils cherchent vraiment.",
        services: [
          "Audit de visibilite",
          "Google Maps et profils locaux",
          "Apple Maps, Bing et autres annuaires utiles",
          "Reseaux sociaux et coherence des informations",
          "Avis clients, photos et preuves de confiance",
          "Recherche vocale et demandes locales",
          "Campagnes de promotion en ligne",
          "Plan d'amelioration continue",
        ],
      },
      {
        id: "ai",
        icon: FaRobot,
        title: "Preparer votre presence pour les outils IA",
        description:
          "Aider les assistants comme ChatGPT a comprendre qui vous etes, ce que vous faites et pourquoi vous recommander.",
        services: [
          "Audit de lisibilite pour les outils IA",
          "Clarification des informations essentielles",
          "Questions frequentes et reponses utiles",
          "Organisation des pages pour etre mieux compris",
          "Contenus par service, ville, langue ou besoin",
          "Alignement site, maps et reseaux",
          "Conseil pour etre cite comme source fiable",
          "Creation d'un assistant ou outil IA simple",
        ],
      },
      {
        id: "advice",
        icon: FaLightbulb,
        title: "Je ne sais pas encore, conseillez-moi",
        description:
          "Vous avez une idee, un blocage ou une envie, mais pas encore le bon chemin.",
        services: [
          "Analyse de votre situation actuelle",
          "Priorites pour commencer sans se disperser",
          "Choix entre site, maps, contenu, visuels ou IA",
          "Plan simple par etapes",
          "Accompagnement creatif et digital",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Your creativity, our passion",
    title: "Tell us what you want to create, improve or make visible.",
    intro:
      "Creativa Poeta combines creativity, content, websites, local presence and modern visibility. Choose a starting point, then select the services that fit your project.",
    stepLabel: "Step",
    steps: ["Direction", "Services", "Context", "Contact"],
    chooseOne: "Which need best matches your project?",
    chooseServices: "Which services would you like to explore?",
    contextTitle: "Where does your presence stand today?",
    contextIntro:
      "This helps us understand your current base before we reply.",
    contactTitle: "How can we contact you?",
    contactIntro:
      "Leave your details and a short message. We will come back with a clear first reading.",
    otherLabel: "Other need",
    otherPlaceholder: "Explain the service or idea you have in mind...",
    websiteLabel: "Do you already have a website or official page?",
    websiteOptions: [
      "Yes, I already have a website",
      "No, not yet",
      "I only have social profiles or maps",
      "I am not sure",
    ],
    channelsLabel: "Where are you visible today?",
    channels: [
      "Website",
      "Google Maps",
      "Apple Maps",
      "Instagram",
      "Facebook",
      "LinkedIn",
      "TikTok",
      "Almost nowhere",
    ],
    zoneLabel: "Target country, city or area",
    zonePlaceholder: "Ex. Brussels, Kigali, Paris, Netherlands, worldwide...",
    languagesLabel: "Important languages",
    languagesPlaceholder: "Ex. French, Dutch, English, Kinyarwanda...",
    urgencyLabel: "Desired timing",
    urgencyOptions: [
      "As soon as possible",
      "In the next few weeks",
      "In the next few months",
      "I want advice first",
    ],
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company or project",
    message: "Message",
    messagePlaceholder:
      "Add what matters: goal, problem, audience, existing links, indicative budget...",
    next: "Continue",
    back: "Back",
    submit: "Send my request",
    close: "Back to home",
    required: "Please complete the required information before continuing.",
    success: "Your request has been sent.",
    error: "Unable to send the request right now.",
    groups: [],
  },
  nl: {
    eyebrow: "Uw creativiteit, onze passie",
    title: "Vertel ons wat u wilt maken, verbeteren of zichtbaar maken.",
    intro:
      "Creativa Poeta combineert creativiteit, content, websites, lokale aanwezigheid en moderne zichtbaarheid. Kies een startpunt en selecteer daarna de diensten die passen.",
    stepLabel: "Stap",
    steps: ["Richting", "Diensten", "Context", "Contact"],
    chooseOne: "Welke behoefte past het best bij uw project?",
    chooseServices: "Welke diensten wilt u verkennen?",
    contextTitle: "Waar staat uw aanwezigheid vandaag?",
    contextIntro:
      "Zo begrijpen we uw huidige basis voordat we antwoorden.",
    contactTitle: "Hoe kunnen we u contacteren?",
    contactIntro:
      "Laat uw gegevens en een kort bericht achter. We komen terug met een duidelijke eerste analyse.",
    otherLabel: "Andere behoefte",
    otherPlaceholder: "Leg uit welke dienst of welk idee u in gedachten heeft...",
    websiteLabel: "Heeft u al een website of officiele pagina?",
    websiteOptions: [
      "Ja, ik heb al een website",
      "Nee, nog niet",
      "Ik heb alleen sociale profielen of maps",
      "Ik weet het niet zeker",
    ],
    channelsLabel: "Waar bent u vandaag zichtbaar?",
    channels: [
      "Website",
      "Google Maps",
      "Apple Maps",
      "Instagram",
      "Facebook",
      "LinkedIn",
      "TikTok",
      "Bijna nergens",
    ],
    zoneLabel: "Doelland, stad of regio",
    zonePlaceholder: "Bijv. Brussel, Kigali, Parijs, Nederland, wereldwijd...",
    languagesLabel: "Belangrijke talen",
    languagesPlaceholder: "Bijv. Frans, Nederlands, Engels, Kinyarwanda...",
    urgencyLabel: "Gewenste timing",
    urgencyOptions: [
      "Zo snel mogelijk",
      "In de komende weken",
      "In de komende maanden",
      "Ik wil eerst advies",
    ],
    name: "Naam",
    email: "E-mail",
    phone: "Telefoon",
    company: "Bedrijf of project",
    message: "Bericht",
    messagePlaceholder:
      "Voeg toe wat belangrijk is: doel, probleem, publiek, bestaande links, indicatief budget...",
    next: "Verder",
    back: "Terug",
    submit: "Mijn aanvraag verzenden",
    close: "Terug naar home",
    required: "Vul de nodige informatie in voordat u verdergaat.",
    success: "Uw aanvraag is verzonden.",
    error: "De aanvraag kan nu niet worden verzonden.",
    groups: [],
  },
  kiny: {
    eyebrow: "Igitekerezo cyawe, ni passion yacu",
    title: "Tubwire icyo ushaka gukora, kuvugurura cyangwa kugaragaza.",
    intro:
      "Creativa Poeta ihuza ubugeni, amagambo, websites, kugaragara hafi y'abakiriya n'uko ugaragara muri iki gihe. Hitamo aho utangirira, hanyuma uhitemo serivisi zikenewe.",
    stepLabel: "Intambwe",
    steps: ["Icyerekezo", "Serivisi", "Aho ugeze", "Contact"],
    chooseOne: "Ni iki gihuye cyane n'umushinga wawe?",
    chooseServices: "Ni izihe serivisi ushaka kureba?",
    contextTitle: "Ubu ugaragara gute?",
    contextIntro:
      "Ibi bidufasha kumva aho ugeze mbere yo kugusubiza.",
    contactTitle: "Twakuvugisha gute?",
    contactIntro:
      "Siga contact yawe n'ubutumwa bugufi. Tuzagusubiza tuguhaye icyerekezo cya mbere.",
    otherLabel: "Ikindi ukeneye",
    otherPlaceholder: "Sobanura serivisi cyangwa igitekerezo ufite...",
    websiteLabel: "Usanzwe ufite website cyangwa paji yemewe?",
    websiteOptions: [
      "Yego, mfite website",
      "Oya, nta yo ndagira",
      "Mfite social media cyangwa maps gusa",
      "Sinzi neza",
    ],
    channelsLabel: "Ugaragara hehe ubu?",
    channels: [
      "Website",
      "Google Maps",
      "Apple Maps",
      "Instagram",
      "Facebook",
      "LinkedIn",
      "TikTok",
      "Hafi nta hantu",
    ],
    zoneLabel: "Igihugu, umujyi cyangwa aho ushaka kugera",
    zonePlaceholder: "Urugero: Bruxelles, Kigali, Paris, Netherlands...",
    languagesLabel: "Indimi zikenewe",
    languagesPlaceholder: "Urugero: francais, Nederlands, English, Kinyarwanda...",
    urgencyLabel: "Igihe wifuza",
    urgencyOptions: [
      "Vuba bishoboka",
      "Mu byumweru biri imbere",
      "Mu mezi ari imbere",
      "Ndashaka inama mbere",
    ],
    name: "Izina",
    email: "E-mail",
    phone: "Telefone",
    company: "Business cyangwa project",
    message: "Ubutumwa",
    messagePlaceholder:
      "Andika icy'ingenzi: intego, ikibazo, abo ugamije, links ufite, budget niba ihari...",
    next: "Komeza",
    back: "Subira",
    submit: "Ohereza",
    close: "Subira ahabanza",
    required: "Uzuza amakuru akenewe mbere yo gukomeza.",
    success: "Ubutumwa bwawe bwoherejwe.",
    error: "Ntibishobotse kohereza ubu.",
    groups: [],
  },
};

const serviceTranslations: Record<Exclude<LocaleKey, "fr">, Record<string, string[]>> = {
  en: {
    creative: [
      "Logo creation or redesign",
      "Complete visual identity",
      "Posters, flyers, brochures and printed materials",
      "Visuals for social media",
      "Infographics and visual messages",
      "Presentations, slides and commercial documents",
      "Design for packaging, clothing, vehicles or objects",
      "Art direction for a campaign",
    ],
    content: [
      "Website copy",
      "Useful pages that answer client questions",
      "Articles, stories and long-form content",
      "Service or product descriptions",
      "Translation and content adaptation",
      "Guides, ebooks and explanatory documents",
      "Speeches, letters, resumes or files",
      "Messages for social media and campaigns",
    ],
    website: [
      "Business website or official page",
      "Redesign of an existing website",
      "Clear service pages",
      "Contact or quote request form",
      "Landing page for a campaign",
      "Maintenance and updates",
      "Web app, internal tool or simple system",
      "Multilingual or multi-country structure",
    ],
    visibility: [
      "Visibility audit",
      "Google Maps and local profiles",
      "Apple Maps, Bing and useful directories",
      "Social profiles and information consistency",
      "Client reviews, photos and trust signals",
      "Voice search and local requests",
      "Online promotion campaigns",
      "Continuous improvement plan",
    ],
    ai: [
      "AI readability audit",
      "Clarification of essential information",
      "Common questions and useful answers",
      "Page structure that is easier to understand",
      "Content by service, city, language or need",
      "Alignment between website, maps and social profiles",
      "Advice to be seen as a reliable source",
      "Creation of a simple AI assistant or tool",
    ],
    advice: [
      "Review of your current situation",
      "Priorities to start without spreading yourself thin",
      "Choice between website, maps, content, visuals or AI",
      "Simple step-by-step plan",
      "Creative and digital support",
    ],
  },
  nl: {
    creative: [
      "Logo maken of vernieuwen",
      "Volledige visuele identiteit",
      "Posters, flyers, brochures en drukwerk",
      "Visuals voor sociale media",
      "Infographics en visuele boodschappen",
      "Presentaties, slides en commerciele dossiers",
      "Design voor verpakkingen, kleding, voertuigen of objecten",
      "Art direction voor een campagne",
    ],
    content: [
      "Teksten voor website",
      "Nuttige pagina's die klantvragen beantwoorden",
      "Artikels, verhalen en langere content",
      "Beschrijvingen van diensten of producten",
      "Vertaling en aanpassing van content",
      "Gidsen, ebooks en uitlegdocumenten",
      "Speeches, brieven, CV's of dossiers",
      "Berichten voor sociale media en campagnes",
    ],
    website: [
      "Website of officiele pagina",
      "Vernieuwing van een bestaande website",
      "Duidelijke dienstenpagina's",
      "Contactformulier of offerte-aanvraag",
      "Landingspagina voor een campagne",
      "Onderhoud en updates",
      "Webapp, interne tool of eenvoudig systeem",
      "Structuur voor meerdere talen of landen",
    ],
    visibility: [
      "Audit van zichtbaarheid",
      "Google Maps en lokale profielen",
      "Apple Maps, Bing en nuttige gidsen",
      "Sociale profielen en consistente informatie",
      "Reviews, foto's en vertrouwen",
      "Spraakzoekopdrachten en lokale vragen",
      "Online promotiecampagnes",
      "Plan voor continue verbetering",
    ],
    ai: [
      "Audit voor leesbaarheid door AI-tools",
      "Verduidelijking van essentiele informatie",
      "Veelgestelde vragen en nuttige antwoorden",
      "Pagina's die makkelijker te begrijpen zijn",
      "Content per dienst, stad, taal of behoefte",
      "Afstemming tussen website, maps en sociale profielen",
      "Advies om als betrouwbare bron gezien te worden",
      "Creatie van een eenvoudige AI-assistent of tool",
    ],
    advice: [
      "Analyse van uw huidige situatie",
      "Prioriteiten om te starten zonder te versnipperen",
      "Keuze tussen website, maps, content, visuals of AI",
      "Eenvoudig stappenplan",
      "Creatieve en digitale begeleiding",
    ],
  },
  kiny: {
    creative: [
      "Gukora cyangwa kuvugurura logo",
      "Identity yuzuye ya business",
      "Posters, flyers, brochures n'ibindi bicapwa",
      "Visuals za social media",
      "Infographics n'ubutumwa bugaragara",
      "Presentations, slides na dossiers",
      "Design ku bipfunyika, imyenda, imodoka cyangwa ibikoresho",
      "Kuyobora image ya campagne",
    ],
    content: [
      "Amagambo ya website",
      "Paji zisubiza ibibazo by'abakiriya",
      "Articles, inkuru n'ibindi byanditse birebire",
      "Gusobanura serivisi cyangwa ibicuruzwa",
      "Guhindura no guhuza content n'ururimi",
      "Guides, ebooks n'inyandiko zisobanura",
      "Discours, amabaruwa, CV cyangwa dossiers",
      "Ubutumwa bwa social media na campagnes",
    ],
    website: [
      "Website cyangwa paji yemewe",
      "Kuvugurura website isanzwe",
      "Paji zisobanura serivisi",
      "Form ya contact cyangwa gusaba igiciro",
      "Landing page ya campagne",
      "Maintenance n'updates",
      "Web app, outil interne cyangwa system yoroshye",
      "Imiterere y'indimi cyangwa ibihugu byinshi",
    ],
    visibility: [
      "Isuzuma ry'uko ugaragara",
      "Google Maps n'imbuga z'ibanze",
      "Apple Maps, Bing n'ahandi h'ingenzi",
      "Social media n'amakuru ahuye",
      "Reviews, amafoto n'ibimenyetso bitanga icyizere",
      "Gushakisha ukoresheje ijwi n'ibibazo by'aho uri",
      "Campagnes zo kumenyekanisha online",
      "Plan yo gukomeza kunoza",
    ],
    ai: [
      "Isuzuma ry'uko AI igusobanukirwa",
      "Gusobanura amakuru y'ingenzi",
      "Ibibazo bisanzwe n'ibisubizo bifasha",
      "Imiterere ya paji yoroshye kumva",
      "Content kuri serivisi, umujyi, ururimi cyangwa ikibazo",
      "Guhuza website, maps na social media",
      "Inama zo kuba isoko yizewe",
      "Gukora assistant cyangwa outil AI yoroshye",
    ],
    advice: [
      "Gusuzuma aho ugeze ubu",
      "Iby'ibanze byo gutangiriraho",
      "Guhitamo hagati ya website, maps, content, visuals cyangwa AI",
      "Plan yoroshye y'intambwe",
      "Ubujyanama creative na digital",
    ],
  },
};

copies.en.groups = copies.fr.groups.map((group) => ({
  ...group,
  services: serviceTranslations.en[group.id],
  title:
    group.id === "creative"
      ? "Create an identity or visual"
      : group.id === "content"
        ? "Write, tell or clarify"
        : group.id === "website"
          ? "Build your official presence"
          : group.id === "visibility"
            ? "Make your business visible"
            : group.id === "ai"
              ? "Prepare your presence for AI tools"
              : "I am not sure yet, advise me",
  description:
    group.id === "creative"
      ? "Give a strong shape to your idea: logo, image, message, support or campaign."
      : group.id === "content"
        ? "Turn your ideas into simple, useful and memorable words."
        : group.id === "website"
          ? "Create or rebuild the base that clients, Google, maps and AI tools can understand."
          : group.id === "visibility"
            ? "Align your presence so clients find you where they actually search."
            : group.id === "ai"
              ? "Help assistants like ChatGPT understand who you are, what you do and why they should recommend you."
              : "You have an idea, a blocker or a wish, but not yet the right path.",
}));

copies.nl.groups = copies.fr.groups.map((group) => ({
  ...group,
  services: serviceTranslations.nl[group.id],
  title:
    group.id === "creative"
      ? "Een identiteit of visual maken"
      : group.id === "content"
        ? "Schrijven, vertellen of verduidelijken"
        : group.id === "website"
          ? "Uw officiele aanwezigheid bouwen"
          : group.id === "visibility"
            ? "Uw bedrijf zichtbaar maken"
            : group.id === "ai"
              ? "Uw aanwezigheid voorbereiden voor AI-tools"
              : "Ik weet het nog niet, adviseer mij",
}));

copies.kiny.groups = copies.fr.groups.map((group) => ({
  ...group,
  services: serviceTranslations.kiny[group.id],
  title:
    group.id === "creative"
      ? "Gukora identity cyangwa visual"
      : group.id === "content"
        ? "Kwandika no gusobanura"
        : group.id === "website"
          ? "Kubaka presence yawe yemewe"
          : group.id === "visibility"
            ? "Gutuma business yawe iboneka"
            : group.id === "ai"
              ? "Gutegura uko ugaragara kuri AI"
              : "Sinzi neza, mungire inama",
}));

const ProjectForm = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market) as LocaleKey;
  const copy = copies[locale] ?? copies.en;
  const navigate = useNavigate();
  const homePath = buildLocalLocalePath(market, locale, "/");

  const [step, setStep] = useState(1);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    selectedServices: [] as string[],
    customServiceDescription: "",
    customServiceNeeds: "",
    additionalInfo: "",
    websiteStatus: "",
    currentChannels: [] as string[],
    targetZone: "",
    languages: "",
    urgency: "",
  });

  const selectedGroup = copy.groups.find((group) => group.title === formData.serviceType);
  const totalSteps = 4;

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const toggleService = (service: string) => {
    setFormData((current) => ({
      ...current,
      selectedServices: current.selectedServices.includes(service)
        ? current.selectedServices.filter((item) => item !== service)
        : [...current.selectedServices, service],
    }));
  };

  const toggleChannel = (channel: string) => {
    setFormData((current) => ({
      ...current,
      currentChannels: current.currentChannels.includes(channel)
        ? current.currentChannels.filter((item) => item !== channel)
        : [...current.currentChannels, channel],
    }));
  };

  const chooseGroup = (group: ServiceGroup) => {
    setFormData((current) => ({
      ...current,
      serviceType: group.title,
      selectedServices: [],
      customServiceDescription: "",
    }));
    setShowError(false);
  };

  const isStepValid = () => {
    if (step === 1) return Boolean(formData.serviceType);
    if (step === 2) {
      if (selectedGroup?.id === "advice") return true;
      return (
        formData.selectedServices.length > 0 ||
        formData.customServiceDescription.trim().length > 0
      );
    }
    if (step === 3) return Boolean(formData.websiteStatus || formData.targetZone);
    return Boolean(
      formData.name.trim() &&
        formData.email.trim() &&
        formData.phone.trim() &&
        formData.company.trim()
    );
  };

  const handleNext = () => {
    if (!isStepValid()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (step < totalSteps) {
      setStep((current) => current + 1);
      return;
    }
    void handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((current) => current - 1);
      setShowError(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const contextSummary = [
        `Statut site: ${formData.websiteStatus || "Non precise"}`,
        `Canaux actuels: ${formData.currentChannels.join(", ") || "Non precise"}`,
        `Zone visee: ${formData.targetZone || "Non precise"}`,
        `Langues: ${formData.languages || "Non precise"}`,
        `Delai: ${formData.urgency || "Non precise"}`,
        `Message: ${formData.additionalInfo || "Non precise"}`,
      ].join("\n");

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: formData.serviceType,
        selectedServices: formData.selectedServices,
        customServiceDescription: formData.customServiceDescription,
        customServiceNeeds: contextSummary,
        serviceSpecificOtherDescription: "",
        additionalInfo: contextSummary,
      };

      const { projectForm } = await import("../APIs/projectForm");
      const response = await projectForm(payload);
      toast.success(response?.message || copy.success);
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting project request:", error);
      toast.error(error instanceof Error ? error.message : copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div>
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 flex items-center gap-3 text-sm font-black uppercase tracking-wide text-[#fff200]">
              <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
              {copy.eyebrow}
            </p>
            <h1 className="font-['Black_Ops_One'] text-3xl leading-tight text-white phone:text-4xl laptop:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 text-base font-semibold leading-8 text-white/80 phone:text-lg">
              {copy.intro}
            </p>
          </div>
          <h2 className="mb-5 text-xl font-black text-[#fff200]">{copy.chooseOne}</h2>
          <div className="grid gap-4 tablet:grid-cols-2">
            {copy.groups.map((group) => {
              const Icon = group.icon;
              const active = formData.serviceType === group.title;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => chooseGroup(group)}
                  className={`group rounded-[1.5rem] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                    active
                      ? "border-[#EEBA2B] bg-[#EEBA2B] text-[#071a33]"
                      : "border-white/20 bg-white/10 text-white hover:border-[#EEBA2B]"
                  }`}
                >
                  <Icon className={`mb-4 text-4xl ${active ? "text-[#071a33]" : "text-[#fff200]"}`} />
                  <h3 className="text-lg font-black">{group.title}</h3>
                  <p className={`mt-3 text-sm font-semibold leading-6 ${active ? "text-[#071a33]/80" : "text-white/75"}`}>
                    {group.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div>
          <h1 className="font-['Black_Ops_One'] text-3xl text-[#fff200]">
            {copy.chooseServices}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white/80">
            {selectedGroup?.description}
          </p>
          <div className="mt-8 grid gap-3 tablet:grid-cols-2">
            {(selectedGroup?.services ?? []).map((service) => {
              const active = formData.selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left font-semibold leading-6 transition ${
                    active
                      ? "border-[#EEBA2B] bg-white text-[#071a33]"
                      : "border-white/20 bg-white/10 text-white hover:border-[#EEBA2B]"
                  }`}
                >
                  <FaCheckCircle className={`mt-1 flex-none ${active ? "text-[#EEBA2B]" : "text-white/30"}`} />
                  <span>{service}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6">
            <label className="mb-2 block text-sm font-black uppercase text-white">
              {copy.otherLabel}
            </label>
            <textarea
              name="customServiceDescription"
              value={formData.customServiceDescription}
              onChange={updateField}
              rows={4}
              placeholder={copy.otherPlaceholder}
              className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 font-semibold text-white placeholder:text-white/45 focus:border-[#EEBA2B] focus:outline-none"
            />
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div>
          <h1 className="font-['Black_Ops_One'] text-3xl text-[#fff200]">
            {copy.contextTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white/80">
            {copy.contextIntro}
          </p>
          <div className="mt-8 grid gap-6 laptop:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black uppercase text-white">
                {copy.websiteLabel}
              </label>
              <select
                name="websiteStatus"
                value={formData.websiteStatus}
                onChange={updateField}
                className="w-full rounded-2xl border border-white/20 bg-[#071a33] p-4 font-semibold text-white focus:border-[#EEBA2B] focus:outline-none"
              >
                <option value="">--</option>
                {copy.websiteOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-black uppercase text-white">
                {copy.urgencyLabel}
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={updateField}
                className="w-full rounded-2xl border border-white/20 bg-[#071a33] p-4 font-semibold text-white focus:border-[#EEBA2B] focus:outline-none"
              >
                <option value="">--</option>
                {copy.urgencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-black uppercase text-white">
                {copy.zoneLabel}
              </label>
              <input
                type="text"
                name="targetZone"
                value={formData.targetZone}
                onChange={updateField}
                placeholder={copy.zonePlaceholder}
                className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 font-semibold text-white placeholder:text-white/45 focus:border-[#EEBA2B] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-black uppercase text-white">
                {copy.languagesLabel}
              </label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={updateField}
                placeholder={copy.languagesPlaceholder}
                className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 font-semibold text-white placeholder:text-white/45 focus:border-[#EEBA2B] focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-7">
            <label className="mb-3 block text-sm font-black uppercase text-white">
              {copy.channelsLabel}
            </label>
            <div className="flex flex-wrap gap-3">
              {copy.channels.map((channel) => {
                const active = formData.currentChannels.includes(channel);
                return (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => toggleChannel(channel)}
                    className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                      active
                        ? "border-[#EEBA2B] bg-[#EEBA2B] text-[#071a33]"
                        : "border-white/20 bg-white/10 text-white hover:border-[#EEBA2B]"
                    }`}
                  >
                    {channel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1 className="font-['Black_Ops_One'] text-3xl text-[#fff200]">
          {copy.contactTitle}
        </h1>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white/80">
          {copy.contactIntro}
        </p>
        <div className="mt-8 grid gap-5 tablet:grid-cols-2">
          {[
            ["name", copy.name, "text"],
            ["email", copy.email, "email"],
            ["phone", copy.phone, "tel"],
            ["company", copy.company, "text"],
          ].map(([name, label, type]) => (
            <div key={name}>
              <label className="mb-2 block text-sm font-black uppercase text-white">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={updateField}
                className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 font-semibold text-white placeholder:text-white/45 focus:border-[#EEBA2B] focus:outline-none"
              />
            </div>
          ))}
        </div>
        <div className="mt-5">
          <label className="mb-2 block text-sm font-black uppercase text-white">
            {copy.message}
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={updateField}
            rows={5}
            placeholder={copy.messagePlaceholder}
            className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 font-semibold text-white placeholder:text-white/45 focus:border-[#EEBA2B] focus:outline-none"
          />
        </div>
      </div>
    );
  };

  return (
    <main
      className="min-h-screen bg-cover bg-left bg-fixed px-4 py-28 text-white phone:px-6 laptop:px-10"
      style={{
        backgroundImage: `linear-gradient(rgba(7, 26, 51, 0.88), rgba(0, 0, 0, 0.82)), url(${image8})`,
      }}
    >
      <section className="relative mx-auto max-w-6xl rounded-[2rem] border border-white/15 bg-[#071a33]/85 p-5 shadow-2xl backdrop-blur-md phone:p-8 laptop:p-10">
        <button
          type="button"
          onClick={() => navigate(homePath)}
          aria-label={copy.close}
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:border-[#EEBA2B] hover:text-[#fff200]"
        >
          <FaTimes />
        </button>
        <button
          type="button"
          onClick={() => navigate(homePath)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-black uppercase text-white/70 transition hover:text-[#fff200]"
        >
          <FaChevronLeft />
          {copy.close}
        </button>

        <div className="mb-8 flex flex-col gap-5 laptop:flex-row laptop:items-center laptop:justify-between">
          <div className="flex flex-wrap gap-2">
            {copy.steps.map((label, index) => {
              const stepNumber = index + 1;
              const active = step >= stepNumber;
              return (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black uppercase ${
                    active
                      ? "border-[#EEBA2B] bg-[#EEBA2B] text-[#071a33]"
                      : "border-white/20 bg-white/10 text-white/55"
                  }`}
                >
                  <span>{stepNumber}</span>
                  <span className="hidden phone:inline">{label}</span>
                </div>
              );
            })}
          </div>
          <div className="text-sm font-black uppercase text-white/60">
            {copy.stepLabel} {step} / {totalSteps}
          </div>
        </div>

        {showError && (
          <div className="mb-6 rounded-2xl border border-red-400/50 bg-red-950/50 p-4 font-semibold text-red-100">
            {copy.required}
          </div>
        )}

        {renderStep()}

        <div className="mt-10 flex flex-col justify-between gap-4 phone:flex-row">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || isSubmitting}
            className="inline-flex items-center justify-center gap-3 border-2 border-white px-6 py-4 text-sm font-black uppercase text-white transition hover:border-[#EEBA2B] hover:text-[#EEBA2B] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaChevronLeft />
            {copy.back}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-3 border-2 border-[#EEBA2B] bg-[#EEBA2B] px-6 py-4 text-sm font-black uppercase text-[#071a33] transition hover:bg-transparent hover:text-[#EEBA2B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {step === totalSteps ? copy.submit : copy.next}
            {step === totalSteps ? <FaRegCommentDots /> : <FaArrowRight />}
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProjectForm;
