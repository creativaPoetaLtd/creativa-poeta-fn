import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaClipboardList,
  FaGlobe,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaSearch,
  FaShareAlt,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import siteToolsDashboardEn from "../../assets/services/official-website/site-tools-dashboard-en.webp";
import siteToolsDashboardFr from "../../assets/services/official-website/site-tools-dashboard-fr.webp";
import siteToolsDashboardNl from "../../assets/services/official-website/site-tools-dashboard-nl.webp";
import siteToolsEcosystemEn from "../../assets/services/official-website/site-tools-ecosystem-en.webp";
import siteToolsEcosystemFr from "../../assets/services/official-website/site-tools-ecosystem-fr.webp";
import siteToolsEcosystemNl from "../../assets/services/official-website/site-tools-ecosystem-nl.webp";
import siteToolsSystemEn from "../../assets/services/official-website/site-tools-system-en.webp";
import siteToolsSystemFr from "../../assets/services/official-website/site-tools-system-fr.webp";
import siteToolsSystemNl from "../../assets/services/official-website/site-tools-system-nl.webp";
import ServiceFinalCTA from "./ServiceFinalCTA";
import ServiceFAQAccordion from "./ServiceFAQAccordion";

type OfficialCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  secondaryCta: string;
  promise: string[];
  whyEyebrow: string;
  whyTitle: string;
  whyText: string;
  imageBriefs: Array<{ label: string; title: string; description: string }>;
  blocksEyebrow: string;
  blocksTitle: string;
  blocksText: string;
  blocks: Array<{ title: string; text: string }>;
  pathsEyebrow: string;
  pathsTitle: string;
  paths: Array<{ title: string; text: string }>;
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

const copies: Record<string, OfficialCopy> = {
  fr: {
    eyebrow: "Sites, apps & systemes",
    title: "Nous construisons les outils digitaux qui rendent votre activite plus claire et plus simple.",
    intro:
      "Site vitrine, application, logiciel interne, espace client, formulaire avance ou systeme complet : nous construisons des outils utiles, clairs et adaptes a votre maniere de travailler.",
    cta: "Construire mon outil digital",
    secondaryCta: "Tester d'abord ma visibilite",
    promise: [
      "Site clair",
      "Application utile",
      "Logiciel interne",
      "Systeme relie a vos vrais besoins",
    ],
    whyEyebrow: "Pourquoi c'est important",
    whyTitle: "Un outil digital doit servir votre entreprise, pas seulement exister en ligne.",
    whyText:
      "Un site explique votre offre. Une application guide vos clients. Un logiciel interne fait gagner du temps a votre equipe. Un bon systeme relie les bonnes informations, les bonnes personnes et les bonnes actions.",
    imageBriefs: [
      {
        label: "Image 1",
        title: "L'ecosysteme digital",
        description:
          "Un visuel montrant un ecosysteme avec site web, application mobile, tableau de bord, formulaire, base de donnees et notifications relies entre eux. Le texte dans l'image doit etre traduit selon la langue.",
      },
      {
        label: "Image 2",
        title: "Du site au systeme",
        description:
          "Une composition montrant trois niveaux: un site vitrine, une application client et un logiciel interne. L'image doit faire comprendre qu'on choisit l'outil selon le besoin.",
      },
      {
        label: "Image 3",
        title: "Un tableau de bord utile",
        description:
          "Un visuel de dashboard propre avec demandes clients, statuts, documents, messages, calendrier et actions rapides. Prevoir une version traduite pour chaque langue.",
      },
    ],
    blocksEyebrow: "Ce que l'outil doit faire",
    blocksTitle: "Chaque outil doit avoir un role clair dans votre activite.",
    blocksText:
      "On ne construit pas une app ou un logiciel pour faire moderne. On le construit parce qu'il aide un client, une equipe ou une operation a avancer plus simplement.",
    blocks: [
      {
        title: "Presenter",
        text: "Un site ou une page claire explique vos services, vos preuves, vos zones et vos chemins de contact.",
      },
      {
        title: "Convertir",
        text: "Un formulaire, une demande de devis, une reservation ou un espace client transforme l'interet en action.",
      },
      {
        title: "Gerer",
        text: "Un tableau de bord ou logiciel interne aide a suivre les demandes, documents, clients, statuts et taches.",
      },
      {
        title: "Relier",
        text: "Un systeme bien pense connecte vos formulaires, emails, notifications, contenus et donnees importantes.",
      },
    ],
    pathsEyebrow: "Ce que nous pouvons construire",
    pathsTitle: "On part du besoin reel, puis on choisit le bon format.",
    paths: [
      {
        title: "Site ou mini-site",
        text: "Pour expliquer votre activite, presenter vos services, rassurer les visiteurs et creer une base officielle claire.",
      },
      {
        title: "Application ou plateforme",
        text: "Pour proposer une experience plus interactive: espace client, reservations, demandes, profils, suivi ou contenus accessibles.",
      },
      {
        title: "Logiciel interne ou systeme",
        text: "Pour organiser votre travail: gestion des demandes, dashboard, documents, automatisations simples et suivi d'activite.",
      },
    ],
    deliverEyebrow: "Livrables",
    deliverTitle: "Un outil utilisable, pas seulement une belle maquette.",
    deliverText:
      "Le resultat doit pouvoir etre utilise par vos clients, votre equipe ou votre organisation, selon le probleme a resoudre.",
    deliver: [
      "Une structure claire pour le site, l'app ou le logiciel.",
      "Des ecrans et parcours faciles a comprendre.",
      "Des formulaires, tableaux de bord ou espaces de gestion selon le besoin.",
      "Des contenus et messages clairs pour guider l'utilisateur.",
      "Une base evolutive pour ajouter langues, services, roles ou fonctionnalites.",
      "Des connexions utiles avec vos contacts, profils, emails ou donnees existantes.",
    ],
    methodEyebrow: "Notre methode",
    methodTitle: "Comprendre, structurer, construire, ameliorer.",
    methodText:
      "On commence par le probleme concret: informer, vendre, recevoir des demandes, suivre des clients ou organiser une equipe. Ensuite on construit l'outil le plus simple qui peut vraiment servir.",
    steps: [
      "Identifier les utilisateurs, les actions et les informations importantes.",
      "Choisir le bon format: site, app, dashboard, logiciel ou systeme.",
      "Dessiner les ecrans et les parcours essentiels.",
      "Construire une interface claire, responsive et facile a utiliser.",
      "Tester, ajuster et preparer l'outil pour evoluer.",
    ],
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Est-ce que ce service concerne seulement les sites web ?",
        answer:
          "Non. Le site est une partie du service, mais nous pouvons aussi construire des applications, plateformes, logiciels internes, tableaux de bord et systemes simples.",
      },
      {
        question: "Comment savoir si j'ai besoin d'un site, d'une app ou d'un logiciel ?",
        answer:
          "On regarde d'abord l'usage. Si vous devez expliquer, un site suffit souvent. Si l'utilisateur doit agir ou suivre quelque chose, une app ou un espace client peut etre utile. Si votre equipe doit gerer, un logiciel interne devient pertinent.",
      },
      {
        question: "Peut-on commencer petit ?",
        answer:
          "Oui. On peut commencer avec une base simple, puis ajouter des formulaires, dashboards, roles, langues ou automatisations quand le besoin devient clair.",
      },
      {
        question: "Pouvez-vous refondre un outil existant sans tout jeter ?",
        answer:
          "Oui. On garde ce qui fonctionne, puis on corrige la structure, l'interface, les parcours et les parties qui bloquent les utilisateurs.",
      },
      {
        question: "Est-ce que vous ecrivez aussi les textes et messages de l'outil ?",
        answer:
          "Oui. La clarte fait partie du service: textes de pages, boutons, messages d'erreur, instructions, FAQ et contenus qui guident l'utilisateur.",
      },
      {
        question: "Peut-on preparer l'outil pour plusieurs langues ?",
        answer:
          "Oui. On peut prevoir les contenus et images en francais, anglais, neerlandais ou kinyarwanda selon le marche vise.",
      },
    ],
  },
  en: {
    eyebrow: "Websites, apps & systems",
    title: "We build the digital tools that make your work clearer and easier.",
    intro:
      "Business website, application, internal software, client portal, advanced form or complete system: we build useful tools adapted to the way you work.",
    cta: "Build my digital tool",
    secondaryCta: "Test visibility first",
    promise: [
      "Clear website",
      "Useful application",
      "Internal software",
      "System connected to real needs",
    ],
    whyEyebrow: "Why it matters",
    whyTitle: "A digital tool should serve your business, not only exist online.",
    whyText:
      "A website explains your offer. An application guides your clients. Internal software saves your team time. A good system connects the right information, people and actions.",
    imageBriefs: [
      {
        label: "Image 1",
        title: "The digital ecosystem",
        description:
          "A visual showing an ecosystem with website, mobile app, dashboard, form, database and notifications connected together. Text inside the image must be translated for each language.",
      },
      {
        label: "Image 2",
        title: "From website to system",
        description:
          "A composition showing three levels: a business website, a client application and internal software. The image should show that the tool is chosen according to the need.",
      },
      {
        label: "Image 3",
        title: "A useful dashboard",
        description:
          "A clean dashboard visual with client requests, statuses, documents, messages, calendar and quick actions. Prepare translated versions for every language.",
      },
    ],
    blocksEyebrow: "What the tool should do",
    blocksTitle: "Every tool needs a clear role in your activity.",
    blocksText:
      "We do not build an app or software just to look modern. We build it because it helps a client, team or operation move forward more simply.",
    blocks: [
      {
        title: "Present",
        text: "A website or clear page explains your services, proof, areas and contact paths.",
      },
      {
        title: "Convert",
        text: "A form, quote request, booking or client portal turns interest into action.",
      },
      {
        title: "Manage",
        text: "A dashboard or internal software helps track requests, documents, clients, statuses and tasks.",
      },
      {
        title: "Connect",
        text: "A well-designed system connects forms, emails, notifications, content and important data.",
      },
    ],
    pathsEyebrow: "What we can build",
    pathsTitle: "We start from the real need, then choose the right format.",
    paths: [
      {
        title: "Website or mini-site",
        text: "To explain your activity, present your services, reassure visitors and create a clear official base.",
      },
      {
        title: "Application or platform",
        text: "To offer a more interactive experience: client portal, bookings, requests, profiles, tracking or accessible content.",
      },
      {
        title: "Internal software or system",
        text: "To organize your work: request management, dashboard, documents, simple automations and activity tracking.",
      },
    ],
    deliverEyebrow: "Deliverables",
    deliverTitle: "A usable tool, not only a beautiful mockup.",
    deliverText:
      "The result should be usable by your clients, your team or your organization, depending on the problem to solve.",
    deliver: [
      "A clear structure for the website, app or software.",
      "Screens and flows that are easy to understand.",
      "Forms, dashboards or management spaces according to the need.",
      "Clear content and messages that guide the user.",
      "A base that can grow with languages, services, roles or features.",
      "Useful connections with contacts, profiles, emails or existing data.",
    ],
    methodEyebrow: "Our method",
    methodTitle: "Understand, structure, build, improve.",
    methodText:
      "We start from the concrete problem: inform, sell, receive requests, track clients or organize a team. Then we build the simplest tool that can truly serve.",
    steps: [
      "Identify users, actions and important information.",
      "Choose the right format: website, app, dashboard, software or system.",
      "Design the essential screens and flows.",
      "Build a clear, responsive and easy-to-use interface.",
      "Test, adjust and prepare the tool to evolve.",
    ],
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Is this service only about websites?",
        answer:
          "No. The website is one part of the service, but we can also build applications, platforms, internal software, dashboards and simple systems.",
      },
      {
        question: "How do I know if I need a website, an app or software?",
        answer:
          "We look at the use first. If you need to explain, a website is often enough. If the user needs to act or track something, an app or client portal can help. If your team needs to manage work, internal software becomes relevant.",
      },
      {
        question: "Can we start small?",
        answer:
          "Yes. We can start with a simple base, then add forms, dashboards, roles, languages or automations when the need becomes clear.",
      },
      {
        question: "Can you rebuild an existing tool without throwing everything away?",
        answer:
          "Yes. We keep what works, then improve structure, interface, user flows and the parts that block users.",
      },
      {
        question: "Do you also write the texts and messages inside the tool?",
        answer:
          "Yes. Clarity is part of the service: page copy, buttons, error messages, instructions, FAQ and content that guides the user.",
      },
      {
        question: "Can the tool be prepared for multiple languages?",
        answer:
          "Yes. We can prepare content and images in French, English, Dutch or Kinyarwanda depending on the target market.",
      },
    ],
  },
  nl: {
    eyebrow: "Websites, apps & systemen",
    title: "Wij bouwen digitale tools die uw werk duidelijker en eenvoudiger maken.",
    intro:
      "Website, applicatie, interne software, klantenportaal, geavanceerd formulier of volledig systeem: we bouwen nuttige tools die passen bij hoe u werkt.",
    cta: "Bouw mijn digitale tool",
    secondaryCta: "Test eerst mijn zichtbaarheid",
    promise: [
      "Duidelijke website",
      "Nuttige applicatie",
      "Interne software",
      "Systeem verbonden met echte noden",
    ],
    whyEyebrow: "Waarom dit telt",
    whyTitle: "Een digitale tool moet uw bedrijf dienen, niet alleen online bestaan.",
    whyText:
      "Een website legt uw aanbod uit. Een applicatie begeleidt uw klanten. Interne software bespaart uw team tijd. Een goed systeem verbindt de juiste informatie, mensen en acties.",
    imageBriefs: [
      {
        label: "Afbeelding 1",
        title: "Het digitale ecosysteem",
        description:
          "Een visual met website, mobiele app, dashboard, formulier, databank en notificaties die met elkaar verbonden zijn. Tekst in de afbeelding moet per taal vertaald worden.",
      },
      {
        label: "Afbeelding 2",
        title: "Van website naar systeem",
        description:
          "Een compositie met drie niveaus: een website, een klantenapplicatie en interne software. De afbeelding moet tonen dat het juiste hulpmiddel afhangt van de behoefte.",
      },
      {
        label: "Afbeelding 3",
        title: "Een nuttig dashboard",
        description:
          "Een duidelijke dashboardvisual met klantaanvragen, statussen, documenten, berichten, kalender en snelle acties. Voorzie een vertaalde versie per taal.",
      },
    ],
    blocksEyebrow: "Wat de tool moet doen",
    blocksTitle: "Elke tool moet een duidelijke rol hebben in uw activiteit.",
    blocksText:
      "We bouwen geen app of software om modern te lijken. We bouwen ze omdat ze een klant, team of operatie eenvoudiger vooruithelpt.",
    blocks: [
      {
        title: "Presenteren",
        text: "Een website of duidelijke pagina legt uw diensten, bewijzen, regio's en contactwegen uit.",
      },
      {
        title: "Converteren",
        text: "Een formulier, offerteaanvraag, reservatie of klantenportaal zet interesse om in actie.",
      },
      {
        title: "Beheren",
        text: "Een dashboard of interne software helpt aanvragen, documenten, klanten, statussen en taken opvolgen.",
      },
      {
        title: "Verbinden",
        text: "Een goed ontworpen systeem verbindt formulieren, emails, notificaties, content en belangrijke data.",
      },
    ],
    pathsEyebrow: "Wat we kunnen bouwen",
    pathsTitle: "We vertrekken van de echte behoefte en kiezen daarna het juiste formaat.",
    paths: [
      {
        title: "Website of mini-site",
        text: "Om uw activiteit uit te leggen, diensten te tonen, bezoekers gerust te stellen en een duidelijke officiele basis te maken.",
      },
      {
        title: "Applicatie of platform",
        text: "Voor een interactievere ervaring: klantenportaal, reservaties, aanvragen, profielen, opvolging of toegankelijke content.",
      },
      {
        title: "Interne software of systeem",
        text: "Om uw werk te organiseren: aanvraagbeheer, dashboard, documenten, eenvoudige automatiseringen en activiteitsopvolging.",
      },
    ],
    deliverEyebrow: "Wat we opleveren",
    deliverTitle: "Een bruikbare tool, niet alleen een mooie mockup.",
    deliverText:
      "Het resultaat moet bruikbaar zijn voor uw klanten, team of organisatie, afhankelijk van het probleem dat we oplossen.",
    deliver: [
      "Een duidelijke structuur voor website, app of software.",
      "Schermen en trajecten die makkelijk te begrijpen zijn.",
      "Formulieren, dashboards of beheerruimtes volgens de behoefte.",
      "Duidelijke content en berichten die de gebruiker begeleiden.",
      "Een basis die kan groeien met talen, diensten, rollen of functies.",
      "Nuttige verbindingen met contacten, profielen, emails of bestaande data.",
    ],
    methodEyebrow: "Onze methode",
    methodTitle: "Begrijpen, structureren, bouwen, verbeteren.",
    methodText:
      "We starten bij het concrete probleem: informeren, verkopen, aanvragen ontvangen, klanten opvolgen of een team organiseren. Daarna bouwen we de eenvoudigste tool die echt helpt.",
    steps: [
      "Gebruikers, acties en belangrijke informatie bepalen.",
      "Het juiste formaat kiezen: website, app, dashboard, software of systeem.",
      "De essentiele schermen en trajecten ontwerpen.",
      "Een duidelijke, responsive en gebruiksvriendelijke interface bouwen.",
      "Testen, aanpassen en de tool voorbereiden om te groeien.",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Gaat deze service alleen over websites?",
        answer:
          "Nee. De website is een deel van de service, maar we kunnen ook applicaties, platformen, interne software, dashboards en eenvoudige systemen bouwen.",
      },
      {
        question: "Hoe weet ik of ik een website, app of software nodig heb?",
        answer:
          "We kijken eerst naar het gebruik. Als u moet uitleggen, volstaat vaak een website. Als de gebruiker iets moet doen of volgen, helpt een app of klantenportaal. Als uw team moet beheren, wordt interne software relevant.",
      },
      {
        question: "Kunnen we klein starten?",
        answer:
          "Ja. We kunnen starten met een eenvoudige basis en later formulieren, dashboards, rollen, talen of automatiseringen toevoegen.",
      },
      {
        question: "Kunnen jullie een bestaande tool verbeteren zonder alles weg te gooien?",
        answer:
          "Ja. We behouden wat werkt en verbeteren daarna structuur, interface, gebruikersflows en de delen die gebruikers blokkeren.",
      },
      {
        question: "Schrijven jullie ook de teksten en berichten in de tool?",
        answer:
          "Ja. Duidelijkheid hoort bij de service: paginacopy, knoppen, foutmeldingen, instructies, FAQ en content die de gebruiker begeleidt.",
      },
      {
        question: "Kan de tool voorbereid worden op meerdere talen?",
        answer:
          "Ja. We kunnen content en afbeeldingen voorbereiden in Frans, Engels, Nederlands of Kinyarwanda volgens de markt.",
      },
    ],
  },
  kiny: {
    eyebrow: "Websites, apps na systems",
    title: "Twubaka tools za digital zituma akazi kawe gasobanuka kandi koroha.",
    intro:
      "Website, application, software y'imbere, portal y'abakiriya, form ikomeye cyangwa system yuzuye: twubaka tools zifasha kandi zijyanye n'uko mukora.",
    cta: "Kubaka tool ya digital",
    secondaryCta: "Banza urebe uko ugaragara",
    promise: [
      "Website isobanutse",
      "Application ifasha",
      "Software y'imbere",
      "System ihuye n'ibyo mukeneye",
    ],
    whyEyebrow: "Impamvu bifite akamaro",
    whyTitle: "Tool ya digital igomba gufasha business, si ukubaho online gusa.",
    whyText:
      "Website isobanura offer yawe. Application iyobora abakiriya. Software y'imbere igabanya igihe team itakaza. System nziza ihuza amakuru, abantu n'ibikorwa bikwiye.",
    imageBriefs: [
      {
        label: "Ishusho 1",
        title: "Ecosystem ya digital",
        description:
          "Ishusho yerekana website, mobile app, dashboard, form, database na notifications bihujwe. Amagambo ari ku ishusho agomba guhindurwa mu rurimi rujyanye na page.",
      },
      {
        label: "Ishusho 2",
        title: "Kuva kuri website kugera kuri system",
        description:
          "Ishusho yerekana levels eshatu: website, application y'abakiriya na software y'imbere. Igomba kwerekana ko tool ihitamo hakurikijwe icyo mukeneye.",
      },
      {
        label: "Ishusho 3",
        title: "Dashboard ifasha",
        description:
          "Ishusho ya dashboard ifite demandes z'abakiriya, statuses, documents, messages, calendar na quick actions. Muyitange no mu zindi ndimi.",
      },
    ],
    blocksEyebrow: "Icyo tool igomba gukora",
    blocksTitle: "Buri tool igomba kugira uruhare rusobanutse mu kazi kawe.",
    blocksText:
      "Ntitwubaka app cyangwa software kugira ngo bigaragare modern gusa. Tuyubaka kuko ifasha umukiriya, team cyangwa operation kugenda neza.",
    blocks: [
      {
        title: "Gusobanura",
        text: "Website cyangwa page isobanutse isobanura serivisi, ibimenyetso, aho ukorera n'inzira za contact.",
      },
      {
        title: "Guhindura interest action",
        text: "Form, devis, booking cyangwa portal y'abakiriya bihindura interest igikorwa.",
      },
      {
        title: "Gucunga",
        text: "Dashboard cyangwa software y'imbere ifasha gukurikirana demandes, documents, clients, statuses na tasks.",
      },
      {
        title: "Guhuza",
        text: "System iteguye neza ihuza forms, emails, notifications, content n'amakuru y'ingenzi.",
      },
    ],
    pathsEyebrow: "Ibyo twubaka",
    pathsTitle: "Dutangirira ku gikenewe koko, hanyuma tugahitamo format ikwiye.",
    paths: [
      {
        title: "Website cyangwa mini-site",
        text: "Kugira ngo usobanure business, werekane serivisi, utange icyizere kandi ugire isoko yemewe isobanutse.",
      },
      {
        title: "Application cyangwa platform",
        text: "Ku experience irimo interaction: portal y'abakiriya, bookings, demandes, profiles, gukurikirana cyangwa content iboneka.",
      },
      {
        title: "Software y'imbere cyangwa system",
        text: "Gutegura akazi: gestion des demandes, dashboard, documents, automations zoroshye no gukurikirana ibikorwa.",
      },
    ],
    deliverEyebrow: "Ibyo dutanga",
    deliverTitle: "Tool ikoreshwa, si mockup nziza gusa.",
    deliverText:
      "Ibisohoka bigomba gukoreshwa n'abakiriya, team cyangwa organization bitewe n'ikibazo dushaka gukemura.",
    deliver: [
      "Structure isobanutse ya website, app cyangwa software.",
      "Screens na flows zoroshye kumva.",
      "Forms, dashboards cyangwa spaces zo gucunga bitewe n'icyo mukeneye.",
      "Content n'ubutumwa bisobanutse biyobora user.",
      "Ishingiro rishobora gukura rikongerwamo indimi, serivisi, roles cyangwa features.",
      "Connections zifasha na contacts, profiles, emails cyangwa data musanganywe.",
    ],
    methodEyebrow: "Uko dukora",
    methodTitle: "Kumva, gutegura, kubaka, kunoza.",
    methodText:
      "Dutangirira ku kibazo nyacyo: gusobanura, kugurisha, kwakira demandes, gukurikirana clients cyangwa gutegura team. Hanyuma twubaka tool yoroshye ishobora gufasha koko.",
    steps: [
      "Kumenya users, actions n'amakuru y'ingenzi.",
      "Guhitamo format ikwiye: website, app, dashboard, software cyangwa system.",
      "Gushushanya screens na flows z'ingenzi.",
      "Kubaka interface isobanutse, responsive kandi yoroshye gukoresha.",
      "Kugerageza, kunoza no gutegura tool kugira ngo ikure.",
    ],
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      {
        question: "Iyi service ni iya websites gusa?",
        answer:
          "Oya. Website ni igice kimwe, ariko dushobora no kubaka applications, platforms, software y'imbere, dashboards na systems zoroshye.",
      },
      {
        question: "Namenya nte niba nkeneye website, app cyangwa software?",
        answer:
          "Tubanza kureba uko izakoreshwa. Niba ushaka gusobanura, website irahagije kenshi. Niba user agomba gukora cyangwa gukurikirana ikintu, app cyangwa portal irafasha. Niba team igomba gucunga akazi, software y'imbere iba ngombwa.",
      },
      {
        question: "Dushobora gutangira ntoya?",
        answer:
          "Yego. Dushobora gutangira ku ishingiro ryoroshye, hanyuma tukongeramo forms, dashboards, roles, indimi cyangwa automations uko bikenewe.",
      },
      {
        question: "Mushobora kuvugurura tool iriho mutajugunye byose?",
        answer:
          "Yego. Dukomeza ibikora neza, hanyuma tugatunganya structure, interface, user flows n'ibice bibuza users gukoresha neza.",
      },
      {
        question: "Mwandika n'amagambo n'ubutumwa biri muri tool?",
        answer:
          "Yego. Ubusobanuro buri muri service: page copy, buttons, error messages, instructions, FAQ na content iyobora user.",
      },
      {
        question: "Tool ishobora gutegurwa mu ndimi nyinshi?",
        answer:
          "Yego. Dushobora gutegura content n'amashusho mu gifaransa, icyongereza, nederlands cyangwa kinyarwanda bitewe n'isoko.",
      },
    ],
  },
};

const blockIcons = [FaClipboardList, FaGlobe, FaMapMarkedAlt, FaQuestionCircle];

const serviceImages: Record<string, string[]> = {
  fr: [siteToolsEcosystemFr, siteToolsSystemFr, siteToolsDashboardFr],
  en: [siteToolsEcosystemEn, siteToolsSystemEn, siteToolsDashboardEn],
  nl: [siteToolsEcosystemNl, siteToolsSystemNl, siteToolsDashboardNl],
  kiny: [siteToolsEcosystemEn, siteToolsSystemEn, siteToolsDashboardEn],
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
    className={`overflow-hidden rounded-[1.5rem] border border-[#EEBA2B]/45 bg-[#071a33]/80 text-white shadow-[0_20px_70px_rgba(0,0,0,.28)] ${className}`}
  >
    <img
      src={src}
      alt={`${title}. ${description}`}
      className="h-full min-h-[19rem] w-full object-contain"
      loading="lazy"
      decoding="async"
    />
    <figcaption className="border-t border-[#EEBA2B]/35 bg-black/25 p-4">
      <h3 className="text-lg font-black leading-tight">{title}</h3>
    </figcaption>
  </figure>
);

const OfficialWebsite = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const images = serviceImages[locale] ?? serviceImages.en;
  const startPath = buildLocalLocalePath(market, locale, "/start-project");
  const auditPath = buildLocalLocalePath(market, locale, "/tester-visibilite");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071a33]/55 text-white">
      <section className="relative px-4 pb-12 pt-28 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 laptop:grid-cols-[.82fr_1.18fr] laptop:items-center">
          <div>
            <SectionLabel>{copy.eyebrow}</SectionLabel>
            <h1 className="font-['Black_Ops_One'] text-4xl leading-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,.35)] phone:text-5xl laptop:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-black leading-8 text-white/90 phone:text-xl">
              {copy.intro}
            </p>
            <div className="mt-8 grid gap-3 phone:grid-cols-2">
              {copy.promise.map((item) => (
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
                <span className="truncate">{copy.cta}</span>
                <FaArrowRight className="flex-none" />
              </Link>
              <Link
                to={auditPath}
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border-2 border-white px-3 py-3 text-[10px] font-black uppercase leading-tight text-white transition hover:border-[#fff200] hover:text-[#fff200] phone:px-5 phone:text-xs"
              >
                <span className="truncate">{copy.secondaryCta}</span>
                <FaSearch className="flex-none" />
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
        <div className="mx-auto grid max-w-7xl gap-8 laptop:grid-cols-[.82fr_1.18fr] laptop:items-center">
          <div>
            <SectionLabel>{copy.whyEyebrow}</SectionLabel>
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl">
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
          <SectionLabel>{copy.blocksEyebrow}</SectionLabel>
          <div className="max-w-5xl">
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl laptop:text-6xl">
              {copy.blocksTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg">
              {copy.blocksText}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 tablet:gap-5 laptop:grid-cols-4">
            {copy.blocks.map((block, index) => {
              const Icon = blockIcons[index] ?? FaClipboardList;

              return (
                <article
                  key={block.title}
                  className="min-h-[10.5rem] rounded-[1.1rem] border border-white/20 bg-[#071a33]/80 p-3 text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 phone:min-h-[11rem] phone:p-4 laptop:rounded-[1.4rem] laptop:p-5"
                >
                  <Icon className="mb-3 text-2xl text-[#fff200] phone:text-3xl laptop:mb-5 laptop:text-4xl" />
                  <h3 className="text-base font-black leading-tight phone:text-lg laptop:text-xl">{block.title}</h3>
                  <p className="mt-2 text-[11px] font-black leading-5 text-white/85 phone:text-xs phone:leading-6 laptop:mt-3 laptop:text-sm laptop:leading-7">
                    {block.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 laptop:grid-cols-[1.05fr_.95fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.pathsEyebrow}</SectionLabel>
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl">
              {copy.pathsTitle}
            </h2>
            <div className="mt-7 grid gap-3 tablet:gap-5">
              {copy.paths.map((path) => (
                <article
                  key={path.title}
                  className="rounded-[1.1rem] border border-[#EEBA2B]/40 bg-[#071a33]/80 p-4 backdrop-blur-sm phone:p-5 laptop:rounded-[1.4rem] laptop:p-6"
                >
                  <h3 className="text-xl font-black leading-tight text-[#fff200] laptop:text-2xl">
                    {path.title}
                  </h3>
                  <p className="mt-2 text-xs font-black leading-6 text-white/85 phone:text-sm laptop:mt-3 laptop:text-base laptop:leading-7">
                    {path.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <ServiceImage {...copy.imageBriefs[2]} src={images[2]} />
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 laptop:grid-cols-[.82fr_1.18fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.deliverEyebrow}</SectionLabel>
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl">
              {copy.deliverTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg">
              {copy.deliverText}
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-[#EEBA2B]/45 bg-[#071a33]/80 p-5 backdrop-blur-sm phone:p-7">
            <ul className="space-y-4">
              {copy.deliver.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-black leading-7 text-white/90 phone:text-base">
                  <FaCheckCircle className="mt-1 flex-none text-[#fff200]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-14 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 laptop:grid-cols-[.85fr_1.15fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.methodEyebrow}</SectionLabel>
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl">
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
              {copy.cta}
              <FaShareAlt />
            </Link>
          </div>
        </div>
      </section>

      <ServiceFinalCTA />
    </main>
  );
};

export default OfficialWebsite;
