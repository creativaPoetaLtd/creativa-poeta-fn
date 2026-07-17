import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaClipboardCheck,
  FaEdit,
  FaFileAlt,
  FaPenNib,
  FaQuestionCircle,
  FaShareAlt,
  FaUserTie,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import ServiceFinalCTA from "./ServiceFinalCTA";
import clearDocumentsEn from "../../assets/services/content-writing/clear-documents-en.webp";
import clearDocumentsFr from "../../assets/services/content-writing/clear-documents-fr.webp";
import clearDocumentsNl from "../../assets/services/content-writing/clear-documents-nl.webp";
import contentUsesEn from "../../assets/services/content-writing/content-uses-en.webp";
import contentUsesFr from "../../assets/services/content-writing/content-uses-fr.webp";
import contentUsesNl from "../../assets/services/content-writing/content-uses-nl.webp";
import finalDocumentEn from "../../assets/services/content-writing/final-document-en.webp";
import finalDocumentFr from "../../assets/services/content-writing/final-document-fr.webp";
import finalDocumentNl from "../../assets/services/content-writing/final-document-nl.webp";

type ContentCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  secondary: string;
  promises: string[];
  imageBriefs: Array<{ label: string; title: string; description: string }>;
  whyEyebrow: string;
  whyTitle: string;
  whyText: string;
  rolesEyebrow: string;
  rolesTitle: string;
  rolesText: string;
  roles: Array<{ title: string; text: string }>;
  formatsEyebrow: string;
  formatsTitle: string;
  formats: Array<{ title: string; text: string }>;
  deliverEyebrow: string;
  deliverTitle: string;
  deliverText: string;
  deliver: string[];
  methodEyebrow: string;
  methodTitle: string;
  methodText: string;
  steps: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

const copies: Record<string, ContentCopy> = {
  fr: {
    eyebrow: "Contenu & documents",
    title: "Nous transformons vos idees en mots, documents et supports professionnels.",
    intro:
      "Redaction professionnelle, ghostwriting, articles, textes web, CV, lettres, profils LinkedIn, rapports, ebooks et guides : nous structurons vos idees pour qu'elles soient claires, utiles et credibles.",
    primary: "Creer mon document",
    secondary: "Demarrer un projet",
    promises: [
      "Textes clairs",
      "Documents professionnels",
      "Ton adapte",
      "Message mieux structure",
    ],
    imageBriefs: [
      {
        label: "Image principale",
        title: "Des idees transformees en documents clairs",
        description:
          "Image montrant des notes, idees, post-it et brouillons qui deviennent un document professionnel, un article web, un rapport et une presentation. Style premium bleu nuit et jaune CP. Texte dans l'image traduit selon la langue.",
      },
      {
        label: "Formats",
        title: "Des contenus pour chaque usage",
        description:
          "Image montrant plusieurs formats: page web, article de blog, CV, lettre, profil LinkedIn, ebook, rapport et guide pratique. Mettre en scene des documents propres et lisibles.",
      },
      {
        label: "Processus",
        title: "Un document bien pense du brouillon a la version finale",
        description:
          "Image montrant un flux clair: collecte des idees, plan, redaction, correction, mise en forme et livraison finale. Le visuel doit faire sentir le serieux et la methode.",
      },
    ],
    whyEyebrow: "Pourquoi c'est important",
    whyTitle: "Un bon document fait comprendre plus vite, decide plus facilement et inspire plus confiance.",
    whyText:
      "Vos idees peuvent etre bonnes, mais si elles sont mal formulees, elles perdent de la force. Un contenu bien structure aide vos clients, partenaires, recruteurs ou lecteurs a comprendre votre valeur sans effort.",
    rolesEyebrow: "Ce que le contenu doit faire",
    rolesTitle: "Chaque texte doit avoir un objectif clair.",
    rolesText:
      "On n'ecrit pas seulement pour remplir une page. On ecrit pour expliquer, convaincre, guider, vendre, presenter ou documenter quelque chose d'important.",
    roles: [
      {
        title: "Clarifier",
        text: "Mettre de l'ordre dans vos idees pour rendre le message simple et direct.",
      },
      {
        title: "Convaincre",
        text: "Construire des arguments solides pour rassurer et pousser a l'action.",
      },
      {
        title: "Presenter",
        text: "Valoriser une personne, une entreprise, un projet ou une offre avec le bon ton.",
      },
      {
        title: "Documenter",
        text: "Creer des supports utiles: rapports, guides, procedures, ebooks ou dossiers.",
      },
    ],
    formatsEyebrow: "Ce que nous pouvons rediger",
    formatsTitle: "On choisit le bon format selon votre objectif.",
    formats: [
      {
        title: "Textes business et web",
        text: "Pages services, articles, blogs, descriptions, FAQ, textes de site et contenus qui expliquent votre activite.",
      },
      {
        title: "Documents professionnels",
        text: "Rapports, dossiers, guides, ebooks, presentations, notes, propositions et documents internes.",
      },
      {
        title: "Profils et parcours",
        text: "CV, lettres de motivation, biographies, profils LinkedIn, pitch personnel et documents de candidature.",
      },
    ],
    deliverEyebrow: "Livrables",
    deliverTitle: "Des contenus prets a utiliser, pas seulement des phrases jolies.",
    deliverText:
      "Le resultat doit pouvoir etre publie, envoye, presente ou reutilise selon votre besoin.",
    deliver: [
      "Un texte structure avec titre, sections et progression logique.",
      "Un ton adapte a votre public: professionnel, simple, humain ou commercial.",
      "Une version corrigee, propre et facile a lire.",
      "Des reformulations pour rendre le message plus clair et plus fort.",
      "Des formats adaptes au web, PDF, presentation ou reseaux sociaux.",
      "Des versions multilingues si le projet le demande.",
    ],
    methodEyebrow: "Notre methode",
    methodTitle: "Comprendre, structurer, rediger, affiner.",
    methodText:
      "On commence par comprendre ce que le contenu doit accomplir. Ensuite on organise les idees, on redige une version claire, puis on ajuste le ton, la precision et la mise en forme.",
    steps: [
      "Recueillir vos idees, documents existants et objectifs.",
      "Definir le lecteur, le message central et le format.",
      "Construire un plan clair avant la redaction.",
      "Rediger, corriger et rendre le contenu plus fluide.",
      "Livrer une version finale prete a publier ou partager.",
    ],
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Est-ce que vous pouvez ecrire a partir de quelques idees seulement ?",
        answer:
          "Oui. Vous pouvez nous donner des notes, audios, brouillons ou explications simples. Nous les structurons pour creer un contenu clair.",
      },
      {
        question: "Pouvez-vous corriger un document deja ecrit ?",
        answer:
          "Oui. Nous pouvons corriger, reformuler, reorganiser et ameliorer un document existant sans repartir de zero.",
      },
      {
        question: "Faites-vous du ghostwriting ?",
        answer:
          "Oui. Nous pouvons ecrire dans votre ton pour des articles, biographies, publications, discours, documents ou contenus professionnels.",
      },
      {
        question: "Pouvez-vous aider pour un CV ou un profil LinkedIn ?",
        answer:
          "Oui. Nous pouvons clarifier votre parcours, valoriser vos competences et creer un CV, une lettre ou un profil LinkedIn plus convaincant.",
      },
      {
        question: "Les contenus peuvent-ils etre adaptes au SEO ?",
        answer:
          "Oui. Pour les textes web, nous pouvons structurer les titres, questions, mots importants et reponses pour aider Google, les moteurs de recherche et les assistants IA a comprendre le contenu.",
      },
      {
        question: "Pouvez-vous preparer le contenu en plusieurs langues ?",
        answer:
          "Oui. Nous pouvons travailler en francais, anglais, neerlandais ou kinyarwanda selon le public vise et les versions necessaires.",
      },
    ],
  },
  en: {
    eyebrow: "Content & documents",
    title: "We turn your ideas into words, documents and professional materials.",
    intro:
      "Professional writing, ghostwriting, articles, web copy, resumes, letters, LinkedIn profiles, reports, ebooks and guides: we structure your ideas so they become clear, useful and credible.",
    primary: "Create my document",
    secondary: "Start a project",
    promises: [
      "Clear copy",
      "Professional documents",
      "Adapted tone",
      "Better structured message",
    ],
    imageBriefs: [
      {
        label: "Main image",
        title: "Ideas transformed into clear documents",
        description:
          "Image showing notes, ideas, post-its and drafts becoming a professional document, web article, report and presentation. Premium dark blue and CP yellow style. Text inside the image translated by language.",
      },
      {
        label: "Formats",
        title: "Content for every use",
        description:
          "Image showing several formats: web page, blog article, resume, letter, LinkedIn profile, ebook, report and practical guide. Documents should look clean and readable.",
      },
      {
        label: "Process",
        title: "A document built from draft to final version",
        description:
          "Image showing a clear flow: collecting ideas, outline, writing, editing, formatting and final delivery. The visual should feel serious and methodical.",
      },
    ],
    whyEyebrow: "Why it matters",
    whyTitle: "A good document helps people understand faster, decide easier and trust you more.",
    whyText:
      "Your ideas may be strong, but if they are poorly expressed, they lose impact. Well-structured content helps clients, partners, recruiters or readers understand your value without effort.",
    rolesEyebrow: "What content should do",
    rolesTitle: "Every text needs a clear goal.",
    rolesText:
      "We do not write just to fill a page. We write to explain, convince, guide, sell, present or document something important.",
    roles: [
      {
        title: "Clarify",
        text: "Organize your ideas so the message becomes simple and direct.",
      },
      {
        title: "Convince",
        text: "Build strong arguments that reassure and push people to act.",
      },
      {
        title: "Present",
        text: "Showcase a person, business, project or offer with the right tone.",
      },
      {
        title: "Document",
        text: "Create useful materials: reports, guides, procedures, ebooks or files.",
      },
    ],
    formatsEyebrow: "What we can write",
    formatsTitle: "We choose the right format according to your goal.",
    formats: [
      {
        title: "Business and web copy",
        text: "Service pages, articles, blogs, descriptions, FAQ, website copy and content that explains your activity.",
      },
      {
        title: "Professional documents",
        text: "Reports, files, guides, ebooks, presentations, notes, proposals and internal documents.",
      },
      {
        title: "Profiles and career materials",
        text: "Resumes, cover letters, biographies, LinkedIn profiles, personal pitch and application documents.",
      },
    ],
    deliverEyebrow: "Deliverables",
    deliverTitle: "Content ready to use, not only nice sentences.",
    deliverText:
      "The result should be ready to publish, send, present or reuse according to your need.",
    deliver: [
      "A structured text with title, sections and logical progression.",
      "A tone adapted to your audience: professional, simple, human or commercial.",
      "A corrected, clean and easy-to-read version.",
      "Rewording to make the message clearer and stronger.",
      "Formats adapted to web, PDF, presentation or social media.",
      "Multilingual versions if the project requires them.",
    ],
    methodEyebrow: "Our method",
    methodTitle: "Understand, structure, write, refine.",
    methodText:
      "We start by understanding what the content must achieve. Then we organize the ideas, write a clear version, and refine tone, precision and formatting.",
    steps: [
      "Collect your ideas, existing documents and goals.",
      "Define the reader, central message and format.",
      "Build a clear outline before writing.",
      "Write, edit and make the content smoother.",
      "Deliver a final version ready to publish or share.",
    ],
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Can you write from only a few ideas?",
        answer:
          "Yes. You can give us notes, audio, drafts or simple explanations. We structure them into clear content.",
      },
      {
        question: "Can you edit a document that already exists?",
        answer:
          "Yes. We can correct, rewrite, reorganize and improve an existing document without starting from zero.",
      },
      {
        question: "Do you offer ghostwriting?",
        answer:
          "Yes. We can write in your tone for articles, biographies, publications, speeches, documents or professional content.",
      },
      {
        question: "Can you help with a resume or LinkedIn profile?",
        answer:
          "Yes. We can clarify your experience, highlight your skills and create a stronger resume, letter or LinkedIn profile.",
      },
      {
        question: "Can content be adapted for SEO?",
        answer:
          "Yes. For web copy, we can structure titles, questions, important terms and answers to help Google, search engines and AI assistants understand the content.",
      },
      {
        question: "Can you prepare content in multiple languages?",
        answer:
          "Yes. We can work in French, English, Dutch or Kinyarwanda depending on the target audience and required versions.",
      },
    ],
  },
  nl: {
    eyebrow: "Content & documenten",
    title: "Wij zetten uw ideeen om in woorden, documenten en professionele materialen.",
    intro:
      "Professionele redactie, ghostwriting, artikels, webteksten, CV's, brieven, LinkedIn-profielen, rapporten, ebooks en gidsen: we structureren uw ideeen zodat ze duidelijk, nuttig en geloofwaardig worden.",
    primary: "Maak mijn document",
    secondary: "Start een project",
    promises: [
      "Duidelijke teksten",
      "Professionele documenten",
      "Aangepaste toon",
      "Beter gestructureerde boodschap",
    ],
    imageBriefs: [
      {
        label: "Hoofdbeeld",
        title: "Ideeen omgezet in duidelijke documenten",
        description:
          "Afbeelding met notities, ideeen, post-its en kladversies die veranderen in een professioneel document, webartikel, rapport en presentatie. Premium stijl in donkerblauw en CP-geel. Tekst in de afbeelding vertaald per taal.",
      },
      {
        label: "Formaten",
        title: "Content voor elk gebruik",
        description:
          "Afbeelding met verschillende formaten: webpagina, blogartikel, CV, brief, LinkedIn-profiel, ebook, rapport en praktische gids. Documenten moeten proper en leesbaar ogen.",
      },
      {
        label: "Proces",
        title: "Een document van kladversie tot finale versie",
        description:
          "Afbeelding met een duidelijke flow: ideeen verzamelen, plan, redactie, correctie, vormgeving en finale levering. De visual moet serieus en methodisch aanvoelen.",
      },
    ],
    whyEyebrow: "Waarom dit telt",
    whyTitle: "Een goed document laat mensen sneller begrijpen, makkelijker beslissen en meer vertrouwen voelen.",
    whyText:
      "Uw ideeen kunnen sterk zijn, maar slecht geformuleerd verliezen ze impact. Goed gestructureerde content helpt klanten, partners, recruiters of lezers uw waarde zonder moeite te begrijpen.",
    rolesEyebrow: "Wat content moet doen",
    rolesTitle: "Elke tekst heeft een duidelijk doel nodig.",
    rolesText:
      "We schrijven niet om een pagina te vullen. We schrijven om iets belangrijks uit te leggen, te overtuigen, te begeleiden, te verkopen, te presenteren of te documenteren.",
    roles: [
      {
        title: "Verhelderen",
        text: "Uw ideeen ordenen zodat de boodschap eenvoudig en direct wordt.",
      },
      {
        title: "Overtuigen",
        text: "Sterke argumenten bouwen die geruststellen en aanzetten tot actie.",
      },
      {
        title: "Presenteren",
        text: "Een persoon, bedrijf, project of aanbod tonen met de juiste toon.",
      },
      {
        title: "Documenteren",
        text: "Nuttige materialen maken: rapporten, gidsen, procedures, ebooks of dossiers.",
      },
    ],
    formatsEyebrow: "Wat we kunnen schrijven",
    formatsTitle: "We kiezen het juiste formaat volgens uw doel.",
    formats: [
      {
        title: "Business- en webteksten",
        text: "Servicepagina's, artikels, blogs, beschrijvingen, FAQ, websiteteksten en content die uw activiteit uitlegt.",
      },
      {
        title: "Professionele documenten",
        text: "Rapporten, dossiers, gidsen, ebooks, presentaties, nota's, voorstellen en interne documenten.",
      },
      {
        title: "Profielen en loopbaanmateriaal",
        text: "CV's, motivatiebrieven, biografieen, LinkedIn-profielen, persoonlijke pitch en sollicitatiedocumenten.",
      },
    ],
    deliverEyebrow: "Oplevering",
    deliverTitle: "Content klaar voor gebruik, niet alleen mooie zinnen.",
    deliverText:
      "Het resultaat moet klaar zijn om te publiceren, te verzenden, te presenteren of opnieuw te gebruiken volgens uw behoefte.",
    deliver: [
      "Een gestructureerde tekst met titel, secties en logische opbouw.",
      "Een toon aangepast aan uw publiek: professioneel, eenvoudig, menselijk of commercieel.",
      "Een gecorrigeerde, propere en makkelijk leesbare versie.",
      "Herformuleringen om de boodschap duidelijker en sterker te maken.",
      "Formaten aangepast aan web, PDF, presentatie of sociale media.",
      "Meertalige versies als het project dat vraagt.",
    ],
    methodEyebrow: "Onze methode",
    methodTitle: "Begrijpen, structureren, schrijven, verfijnen.",
    methodText:
      "We beginnen met begrijpen wat de content moet bereiken. Daarna ordenen we de ideeen, schrijven we een duidelijke versie en verfijnen we toon, precisie en vormgeving.",
    steps: [
      "Uw ideeen, bestaande documenten en doelen verzamelen.",
      "De lezer, centrale boodschap en formaat bepalen.",
      "Een duidelijk plan maken voor het schrijven.",
      "Schrijven, corrigeren en de content vlotter maken.",
      "Een finale versie leveren die klaar is om te publiceren of delen.",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Kunnen jullie schrijven op basis van enkele ideeen?",
        answer:
          "Ja. U kunt notities, audio, kladversies of eenvoudige uitleg geven. Wij structureren dat tot duidelijke content.",
      },
      {
        question: "Kunnen jullie een bestaand document verbeteren?",
        answer:
          "Ja. We kunnen een bestaand document corrigeren, herschrijven, reorganiseren en verbeteren zonder vanaf nul te starten.",
      },
      {
        question: "Doen jullie ghostwriting?",
        answer:
          "Ja. We kunnen in uw toon schrijven voor artikels, biografieen, publicaties, speeches, documenten of professionele content.",
      },
      {
        question: "Kunnen jullie helpen met een CV of LinkedIn-profiel?",
        answer:
          "Ja. We kunnen uw ervaring verduidelijken, uw vaardigheden sterker tonen en een overtuigender CV, brief of LinkedIn-profiel maken.",
      },
      {
        question: "Kan content aangepast worden voor SEO?",
        answer:
          "Ja. Voor webteksten kunnen we titels, vragen, belangrijke termen en antwoorden structureren zodat Google, zoekmachines en AI-assistenten de content beter begrijpen.",
      },
      {
        question: "Kunnen jullie content in meerdere talen voorbereiden?",
        answer:
          "Ja. We kunnen werken in het Frans, Engels, Nederlands of Kinyarwanda volgens het doelpubliek en de nodige versies.",
      },
    ],
  },
  kiny: {
    eyebrow: "Content na documents",
    title: "Duhindura ibitekerezo byanyu amagambo, documents n'ibikoresho bya professional.",
    intro:
      "Professional writing, ghostwriting, articles, web copy, CV, letters, LinkedIn profiles, reports, ebooks na guides: dutegura ibitekerezo byanyu bikaba content isobanutse, ifite akamaro kandi yizerwa.",
    primary: "Gukora document yanjye",
    secondary: "Gutangira project",
    promises: [
      "Texts zisobanutse",
      "Documents za professional",
      "Tone ihuye na public",
      "Message iteguye neza",
    ],
    imageBriefs: [
      {
        label: "Ishusho nyamukuru",
        title: "Ibitekerezo bihinduka documents zisobanutse",
        description:
          "Ishusho yerekana notes, ideas, post-its na drafts bihinduka professional document, web article, report na presentation. Style premium dark blue na CP yellow. Amagambo ahindurwe mu rurimi rwa page.",
      },
      {
        label: "Formats",
        title: "Content kuri buri usage",
        description:
          "Ishusho yerekana formats zitandukanye: web page, blog article, CV, letter, LinkedIn profile, ebook, report na practical guide. Documents zigaragare zisukuye kandi zisomeka.",
      },
      {
        label: "Process",
        title: "Document iva kuri draft ikagera kuri final version",
        description:
          "Ishusho yerekana flow: gukusanya ideas, outline, writing, editing, formatting na final delivery. Visual igaragaze serious na method.",
      },
    ],
    whyEyebrow: "Impamvu bifite akamaro",
    whyTitle: "Document nziza ituma abantu bumva vuba, bafata decision byoroshye kandi bakakwizera.",
    whyText:
      "Ibitekerezo byawe bishobora kuba bikomeye, ariko iyo bitanditse neza bitakaza impact. Content iteguye neza ifasha clients, partners, recruiters cyangwa readers kumva value yawe nta mbaraga nyinshi.",
    rolesEyebrow: "Icyo content igomba gukora",
    rolesTitle: "Buri text igomba kugira intego isobanutse.",
    rolesText:
      "Ntitwandika ngo page yuzure gusa. Twandika kugira ngo dusobanure, twemeze, tuyobore, tugurishe, twerekane cyangwa dukore documentation y'ikintu cy'ingenzi.",
    roles: [
      {
        title: "Gusobanura",
        text: "Gutondeka ibitekerezo kugira ngo message ibe simple kandi direct.",
      },
      {
        title: "Kwemeza",
        text: "Kubaka arguments zikomeye zitanga icyizere kandi ziganisha kuri action.",
      },
      {
        title: "Kwerekana",
        text: "Kwerekana umuntu, business, project cyangwa offer ukoresheje tone ikwiye.",
      },
      {
        title: "Gukora documentation",
        text: "Gukora reports, guides, procedures, ebooks cyangwa dossiers bifite akamaro.",
      },
    ],
    formatsEyebrow: "Ibyo dushobora kwandika",
    formatsTitle: "Duhitamo format ikwiye dukurikije intego yawe.",
    formats: [
      {
        title: "Business na web copy",
        text: "Service pages, articles, blogs, descriptions, FAQ, website copy na content isobanura activity yawe.",
      },
      {
        title: "Professional documents",
        text: "Reports, files, guides, ebooks, presentations, notes, proposals na internal documents.",
      },
      {
        title: "Profiles na career materials",
        text: "CV, cover letters, biographies, LinkedIn profiles, personal pitch na application documents.",
      },
    ],
    deliverEyebrow: "Ibyo dutanga",
    deliverTitle: "Content yiteguye gukoreshwa, si sentences nziza gusa.",
    deliverText:
      "Ibisohoka bigomba kuba biteguye gupublishwa, koherezwa, kwerekanwa cyangwa kongera gukoreshwa bitewe n'icyo ukeneye.",
    deliver: [
      "Text ifite structure, title, sections na progression yumvikana.",
      "Tone ihuye na public: professional, simple, human cyangwa commercial.",
      "Version ikosoye, isukuye kandi yoroshye gusoma.",
      "Reformulations zituma message isobanuka kandi ikomera.",
      "Formats zihuye na web, PDF, presentation cyangwa social media.",
      "Versions mu ndimi nyinshi niba project ibikeneye.",
    ],
    methodEyebrow: "Uko dukora",
    methodTitle: "Kumva, gutegura, kwandika, kunoza.",
    methodText:
      "Dutangirira ku kumva icyo content igomba kugeraho. Hanyuma dutondeka ideas, tukandika version isobanutse, tukanoza tone, precision na formatting.",
    steps: [
      "Gukusanya ideas, documents zihari n'intego.",
      "Kumenya reader, central message na format.",
      "Kubaka outline isobanutse mbere yo kwandika.",
      "Kwandika, gukosora no gutuma content igenda neza.",
      "Gutanga final version yiteguye gupublishwa cyangwa gusangizwa abandi.",
    ],
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      {
        question: "Mushobora kwandika mufite ideas nke gusa?",
        answer:
          "Yego. Ushobora kuduha notes, audio, drafts cyangwa explanations zoroshye. Turabitegura bikaba content isobanutse.",
      },
      {
        question: "Mushobora gukosora document isanzwe ihari?",
        answer:
          "Yego. Dushobora gukosora, rewriting, reorganizing no kunoza document iriho tutatangiriye kuri zero.",
      },
      {
        question: "Mukora ghostwriting?",
        answer:
          "Yego. Dushobora kwandika mu tone yawe kuri articles, biographies, publications, speeches, documents cyangwa professional content.",
      },
      {
        question: "Mushobora gufasha kuri CV cyangwa LinkedIn profile?",
        answer:
          "Yego. Dushobora gusobanura experience yawe, kugaragaza skills zawe no gukora CV, letter cyangwa LinkedIn profile ikomeye.",
      },
      {
        question: "Content ishobora gutegurwa kuri SEO?",
        answer:
          "Yego. Kuri web copy, dushobora gutegura titles, questions, important terms na answers kugira ngo Google, search engines na AI assistants bibyumve neza.",
      },
      {
        question: "Mushobora gutegura content mu ndimi nyinshi?",
        answer:
          "Yego. Dushobora gukora mu gifaransa, icyongereza, nederlands cyangwa kinyarwanda bitewe na public igamijwe na versions zikenewe.",
      },
    ],
  },
};

const roleIcons = [FaEdit, FaPenNib, FaUserTie, FaClipboardCheck];

const serviceImages: Record<string, string[]> = {
  fr: [clearDocumentsFr, contentUsesFr, finalDocumentFr],
  en: [clearDocumentsEn, contentUsesEn, finalDocumentEn],
  nl: [clearDocumentsNl, contentUsesNl, finalDocumentNl],
  kiny: [clearDocumentsEn, contentUsesEn, finalDocumentEn],
};

const SectionLabel = ({ children }: { children: string }) => (
  <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-wide text-[#fff200] phone:text-sm">
    <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
    {children}
  </div>
);

const ServiceImage = ({
  title,
  description,
  src,
  className = "",
}: {
  title: string;
  description: string;
  src: string;
  className?: string;
}) => (
  <figure
    className={`max-w-full overflow-hidden rounded-[1.4rem] border border-[#EEBA2B]/45 bg-[#071a33]/80 text-white shadow-[0_20px_70px_rgba(0,0,0,.28)] ${className}`}
  >
    <img
      src={src}
      alt={`${title}. ${description}`}
      className="aspect-square h-auto w-full max-w-full object-contain"
      loading="lazy"
      decoding="async"
    />
    <figcaption className="border-t border-[#EEBA2B]/35 bg-black/25 p-4">
      <h3 className="text-lg font-black leading-tight">{title}</h3>
    </figcaption>
  </figure>
);
const ContentWritting = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const images = serviceImages[locale] ?? serviceImages.en;
  const startPath = buildLocalLocalePath(market, locale, "/start-project");
  const contactPath = buildLocalLocalePath(market, locale, "/contact");

  return (
    <main className="relative isolate min-h-screen max-w-full overflow-x-hidden bg-[#071a33]/55 text-white">
      <section className="relative px-4 pb-12 pt-28 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-8 laptop:grid-cols-[.82fr_1.18fr] laptop:items-center">
          <div>
            <SectionLabel>{copy.eyebrow}</SectionLabel>
            <h1 className="max-w-full break-words font-['Black_Ops_One'] text-[clamp(2.25rem,11vw,4rem)] leading-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,.35)] [overflow-wrap:anywhere] phone:text-5xl laptop:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl break-words text-base font-black leading-8 text-white/90 [overflow-wrap:anywhere] phone:text-xl">
              {copy.intro}
            </p>
            <div className="mt-8 grid gap-3 phone:grid-cols-2">
              {copy.promises.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[#EEBA2B]/35 bg-[#071a33]/75 px-4 py-3 text-sm font-black backdrop-blur-sm"
                >
                  <FaCheckCircle className="text-[#fff200]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2 phone:gap-3">
              <Link
                to={startPath}
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border-2 border-[#fff200] bg-[#fff200] px-3 py-3 text-[10px] font-black uppercase leading-tight text-[#071a33] transition hover:bg-transparent hover:text-[#fff200] phone:px-5 phone:text-xs"
              >
                <span className="truncate">{copy.primary}</span>
                <FaArrowRight className="flex-none" />
              </Link>
              <Link
                to={contactPath}
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border-2 border-white px-3 py-3 text-[10px] font-black uppercase leading-tight text-white transition hover:border-[#fff200] hover:text-[#fff200] phone:px-5 phone:text-xs"
              >
                <span className="truncate">{copy.secondary}</span>
                <FaFileAlt className="flex-none" />
              </Link>
            </div>
          </div>

          <ServiceImage
            {...copy.imageBriefs[0]}
            src={images[0]}
            className="min-h-[24rem] laptop:min-h-[32rem]"
          />
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-8 laptop:grid-cols-[.82fr_1.18fr] laptop:items-center">
          <div>
            <SectionLabel>{copy.whyEyebrow}</SectionLabel>
            <h2 className="max-w-full break-words font-['Black_Ops_One'] text-4xl leading-tight text-white [overflow-wrap:anywhere] phone:text-5xl">
              {copy.whyTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg">
              {copy.whyText}
            </p>
          </div>
          <ServiceImage {...copy.imageBriefs[1]} src={images[1]} />
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{copy.rolesEyebrow}</SectionLabel>
          <div className="max-w-5xl">
            <h2 className="max-w-full break-words font-['Black_Ops_One'] text-4xl leading-tight text-white [overflow-wrap:anywhere] phone:text-5xl laptop:text-6xl">
              {copy.rolesTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg">
              {copy.rolesText}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 tablet:gap-5 laptop:grid-cols-4">
            {copy.roles.map((item, index) => {
              const Icon = roleIcons[index] ?? FaEdit;

              return (
                <article
                  key={item.title}
                  className="min-h-[10.5rem] rounded-[1.1rem] border border-white/20 bg-[#071a33]/80 p-3 text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 phone:min-h-[11rem] phone:p-4 laptop:rounded-[1.4rem] laptop:p-5"
                >
                  <Icon className="mb-3 text-2xl text-[#fff200] phone:text-3xl laptop:mb-5 laptop:text-4xl" />
                  <h3 className="text-base font-black leading-tight phone:text-lg laptop:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-black leading-5 text-white/85 phone:text-xs phone:leading-6 laptop:mt-3 laptop:text-sm laptop:leading-7">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-8 laptop:grid-cols-[1.05fr_.95fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.formatsEyebrow}</SectionLabel>
            <h2 className="max-w-full break-words font-['Black_Ops_One'] text-4xl leading-tight text-white [overflow-wrap:anywhere] phone:text-5xl">
              {copy.formatsTitle}
            </h2>
            <div className="mt-7 grid gap-3 tablet:gap-5">
              {copy.formats.map((format) => (
                <article
                  key={format.title}
                  className="rounded-[1.1rem] border border-[#EEBA2B]/40 bg-[#071a33]/80 p-4 backdrop-blur-sm phone:p-5 laptop:rounded-[1.4rem] laptop:p-6"
                >
                  <h3 className="text-xl font-black leading-tight text-[#fff200] laptop:text-2xl">
                    {format.title}
                  </h3>
                  <p className="mt-2 text-xs font-black leading-6 text-white/85 phone:text-sm laptop:mt-3 laptop:text-base laptop:leading-7">
                    {format.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <ServiceImage {...copy.imageBriefs[2]} src={images[2]} />
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-8 laptop:grid-cols-[.82fr_1.18fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.deliverEyebrow}</SectionLabel>
            <h2 className="max-w-full break-words font-['Black_Ops_One'] text-4xl leading-tight text-white [overflow-wrap:anywhere] phone:text-5xl">
              {copy.deliverTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg">
              {copy.deliverText}
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-[#EEBA2B]/45 bg-[#071a33]/80 p-5 backdrop-blur-sm phone:p-7">
            <ul className="space-y-4">
              {copy.deliver.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm font-black leading-7 text-white/90 phone:text-base"
                >
                  <FaCheckCircle className="mt-1 flex-none text-[#fff200]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-8 laptop:grid-cols-[.85fr_1.15fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.methodEyebrow}</SectionLabel>
            <h2 className="max-w-full break-words font-['Black_Ops_One'] text-4xl leading-tight text-white [overflow-wrap:anywhere] phone:text-5xl">
              {copy.methodTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg">
              {copy.methodText}
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-[#EEBA2B]/45 bg-[linear-gradient(135deg,rgba(7,26,51,.86),rgba(0,0,0,.72)),repeating-linear-gradient(135deg,rgba(238,186,43,.16)_0,rgba(238,186,43,.16)_1px,transparent_1px,transparent_10px)] p-5 backdrop-blur-sm phone:p-7">
            <ol className="space-y-4">
              {copy.steps.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[3rem_1fr] items-center gap-4 rounded-2xl border border-white/15 bg-black/20 p-4"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#fff200] text-lg font-black text-[#fff200]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-black leading-6 text-white phone:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>{copy.faqTitle}</SectionLabel>
          <ServiceFAQAccordion
            items={copy.faqs}
            icon={<FaQuestionCircle aria-hidden="true" />}
          />
        </div>
      </section>

      <section className="px-4 pb-16 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto max-w-7xl rounded-[1.6rem] border border-white/15 bg-[#071a33]/80 p-5 backdrop-blur-sm phone:p-7">
          <div className="flex flex-col gap-5 laptop:flex-row laptop:items-center laptop:justify-between">
            <div>
              <SectionLabel>{copy.eyebrow}</SectionLabel>
              <h2 className="font-['Black_Ops_One'] text-3xl leading-tight text-white phone:text-4xl">
                {copy.methodTitle}
              </h2>
            </div>
            <Link
              to={startPath}
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#fff200] bg-[#fff200] px-6 py-4 text-xs font-black uppercase text-[#071a33] transition hover:bg-transparent hover:text-[#fff200]"
            >
              {copy.primary}
              <FaShareAlt />
            </Link>
          </div>
        </div>
      </section>

      <ServiceFinalCTA />
    </main>
  );
};

export default ContentWritting;
