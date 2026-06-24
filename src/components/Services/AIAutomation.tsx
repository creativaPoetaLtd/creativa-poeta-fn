import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaComments,
  FaDatabase,
  FaQuestionCircle,
  FaRobot,
  FaSearch,
  FaTasks,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import ServiceFinalCTA from "./ServiceFinalCTA";

type AICopy = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  secondary: string;
  promises: string[];
  imageBriefs: Array<{ label: string; title: string; description: string }>;
  rolesEyebrow: string;
  rolesTitle: string;
  rolesText: string;
  roles: Array<{ title: string; text: string }>;
  examplesEyebrow: string;
  examplesTitle: string;
  examples: Array<{ title: string; text: string }>;
  methodEyebrow: string;
  methodTitle: string;
  methodText: string;
  steps: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

const copies: Record<string, AICopy> = {
  fr: {
    eyebrow: "Assistants IA",
    title: "Des assistants IA utiles, entraines sur votre metier et vos vraies informations.",
    intro:
      "Nous creons des assistants IA, GPT personnalises, chatbots et agents simples qui aident vos clients ou votre equipe a obtenir des reponses plus vite.",
    primary: "Creer mon assistant IA",
    secondary: "Tester ma visibilite",
    promises: [
      "Assistant prive",
      "GPT personnalise",
      "Chatbot client",
      "Agent connecte a vos contenus",
    ],
    imageBriefs: [
      {
        label: "Image 1",
        title: "Assistant IA de marque",
        description:
          "Un visuel montrant un assistant IA dans l'univers Creativa Poeta, avec bulles de conversation, documents de l'entreprise et reponses claires. Texte a traduire par langue.",
      },
      {
        label: "Image 2",
        title: "Base de connaissances",
        description:
          "Un visuel montrant documents, FAQ, pages web, services et informations internes qui alimentent un assistant IA.",
      },
      {
        label: "Image 3",
        title: "Agent connecte",
        description:
          "Un visuel montrant un agent IA relie a formulaire, email, calendrier, CRM ou dashboard avec actions simples.",
      },
    ],
    rolesEyebrow: "Ce que l'IA doit faire",
    rolesTitle: "Un assistant IA doit avoir une mission precise.",
    rolesText:
      "On ne cree pas un assistant pour faire gadget. On le cree pour repondre, guider, filtrer, organiser ou aider une personne a avancer.",
    roles: [
      {
        title: "Repondre",
        text: "Questions frequentes, informations de service, conditions, horaires, processus ou demandes simples.",
      },
      {
        title: "Guider",
        text: "Aider un client a choisir une offre, preparer une demande ou comprendre les prochaines etapes.",
      },
      {
        title: "Assister",
        text: "Aider l'equipe a retrouver des informations, reformuler, trier ou produire des reponses.",
      },
      {
        title: "Connecter",
        text: "Relier l'assistant a vos pages, documents, formulaires ou outils internes quand c'est utile.",
      },
    ],
    examplesEyebrow: "Cas d'usage",
    examplesTitle: "On commence par des usages simples, puis on ajoute de l'intelligence.",
    examples: [
      {
        title: "Assistant client",
        text: "Repond aux questions courantes et oriente vers le bon service ou le bon contact.",
      },
      {
        title: "Assistant interne",
        text: "Aide l'equipe a retrouver des procedures, documents, offres, messages et informations utiles.",
      },
      {
        title: "GPT personnalise",
        text: "Un assistant configure avec votre ton, vos contenus et vos limites pour produire des reponses coherentes.",
      },
    ],
    methodEyebrow: "Notre methode",
    methodTitle: "Definir, nourrir, tester, connecter.",
    methodText:
      "La qualite d'un assistant depend surtout de ce qu'on lui donne: bonnes informations, bonnes limites, bons exemples et bon usage.",
    steps: [
      "Definir le role exact de l'assistant.",
      "Identifier les documents, pages, FAQ et donnees utiles.",
      "Ecrire les instructions, limites et exemples de reponses.",
      "Tester les cas sensibles avant de le publier.",
      "Connecter l'assistant aux bons canaux si necessaire.",
    ],
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Est-ce qu'un assistant IA peut remplacer une personne ?",
        answer:
          "Non. Il aide a repondre plus vite et a organiser l'information, mais les decisions importantes et les cas sensibles doivent rester humains.",
      },
      {
        question: "De quoi avez-vous besoin pour creer un assistant ?",
        answer:
          "De vos pages, documents, FAQ, services, offres, ton de marque et limites: ce que l'assistant peut dire ou ne doit pas dire.",
      },
      {
        question: "Peut-on creer un assistant prive pour l'equipe ?",
        answer:
          "Oui. Il peut aider a retrouver des procedures, reformuler des messages, preparer des reponses ou organiser des informations internes.",
      },
      {
        question: "Peut-il parler plusieurs langues ?",
        answer:
          "Oui. On peut preparer les instructions, contenus et exemples dans les langues utiles a vos clients ou votre equipe.",
      },
      {
        question: "Est-ce qu'on peut le mettre sur le site ?",
        answer:
          "Oui, selon le besoin. On peut aussi commencer avec un GPT prive ou un assistant interne avant de l'exposer aux visiteurs.",
      },
      {
        question: "Est-ce que l'assistant peut faire des actions ?",
        answer:
          "Oui, progressivement: collecter une demande, orienter vers un formulaire, preparer un email ou se connecter a certains outils.",
      },
    ],
  },
  en: {
    eyebrow: "AI assistants",
    title: "Useful AI assistants trained around your work and real information.",
    intro:
      "We create AI assistants, custom GPTs, chatbots and simple agents that help clients or teams get answers faster.",
    primary: "Create my AI assistant",
    secondary: "Test visibility",
    promises: ["Private assistant", "Custom GPT", "Client chatbot", "Agent connected to content"],
    imageBriefs: [
      {
        label: "Image 1",
        title: "Brand AI assistant",
        description:
          "A visual showing an AI assistant in the Creativa Poeta universe, with conversation bubbles, company documents and clear answers. Translate text for each language.",
      },
      {
        label: "Image 2",
        title: "Knowledge base",
        description:
          "A visual showing documents, FAQ, web pages, services and internal information feeding an AI assistant.",
      },
      {
        label: "Image 3",
        title: "Connected agent",
        description:
          "A visual showing an AI agent connected to a form, email, calendar, CRM or dashboard with simple actions.",
      },
    ],
    rolesEyebrow: "What AI should do",
    rolesTitle: "An AI assistant needs a precise mission.",
    rolesText:
      "We do not create an assistant as a gimmick. We create it to answer, guide, filter, organize or help someone move forward.",
    roles: [
      { title: "Answer", text: "FAQ, service information, conditions, hours, processes or simple requests." },
      { title: "Guide", text: "Help a client choose an offer, prepare a request or understand next steps." },
      { title: "Assist", text: "Help the team find information, rewrite, sort or produce answers." },
      { title: "Connect", text: "Connect the assistant to pages, documents, forms or internal tools when useful." },
    ],
    examplesEyebrow: "Use cases",
    examplesTitle: "Start with simple use cases, then add intelligence.",
    examples: [
      { title: "Client assistant", text: "Answers common questions and routes people to the right service or contact." },
      { title: "Internal assistant", text: "Helps the team find procedures, documents, offers, messages and useful information." },
      { title: "Custom GPT", text: "An assistant configured with your tone, content and limits for consistent answers." },
    ],
    methodEyebrow: "Our method",
    methodTitle: "Define, feed, test, connect.",
    methodText:
      "Assistant quality depends mostly on what we give it: good information, clear limits, examples and the right use case.",
    steps: [
      "Define the exact assistant role.",
      "Identify useful documents, pages, FAQ and data.",
      "Write instructions, limits and answer examples.",
      "Test sensitive cases before publishing.",
      "Connect the assistant to the right channels if needed.",
    ],
    faqTitle: "Common questions",
    faqs: [
      { question: "Can an AI assistant replace a person?", answer: "No. It helps answer faster and organize information, but important decisions and sensitive cases should stay human." },
      { question: "What do you need to create an assistant?", answer: "Your pages, documents, FAQ, services, offers, brand tone and limits: what the assistant can and cannot say." },
      { question: "Can we create a private assistant for the team?", answer: "Yes. It can help find procedures, rewrite messages, prepare answers or organize internal information." },
      { question: "Can it speak multiple languages?", answer: "Yes. We can prepare instructions, content and examples in the languages useful to clients or teams." },
      { question: "Can it be added to the website?", answer: "Yes, depending on the need. We can also start with a private GPT or internal assistant before exposing it to visitors." },
      { question: "Can the assistant take actions?", answer: "Yes, progressively: collect a request, route to a form, prepare an email or connect to selected tools." },
    ],
  },
  nl: {
    eyebrow: "AI-assistenten",
    title: "Nuttige AI-assistenten getraind rond uw werk en echte informatie.",
    intro:
      "We maken AI-assistenten, aangepaste GPTs, chatbots en eenvoudige agents die klanten of teams sneller antwoorden geven.",
    primary: "Maak mijn AI-assistent",
    secondary: "Test zichtbaarheid",
    promises: ["Prive-assistent", "Aangepaste GPT", "Klantchatbot", "Agent verbonden met content"],
    imageBriefs: [
      { label: "Afbeelding 1", title: "AI-assistent van het merk", description: "Een visual met AI-assistent in de wereld van Creativa Poeta, chatbubbels, bedrijfsdocumenten en duidelijke antwoorden. Tekst per taal vertalen." },
      { label: "Afbeelding 2", title: "Kennisbank", description: "Een visual met documenten, FAQ, webpagina's, diensten en interne informatie die een AI-assistent voeden." },
      { label: "Afbeelding 3", title: "Verbonden agent", description: "Een visual met AI-agent verbonden met formulier, email, kalender, CRM of dashboard met eenvoudige acties." },
    ],
    rolesEyebrow: "Wat AI moet doen",
    rolesTitle: "Een AI-assistent heeft een duidelijke missie nodig.",
    rolesText: "We maken geen assistent als gadget. We maken hem om te antwoorden, begeleiden, filteren, organiseren of iemand vooruit te helpen.",
    roles: [
      { title: "Antwoorden", text: "FAQ, service-informatie, voorwaarden, uren, processen of eenvoudige aanvragen." },
      { title: "Begeleiden", text: "Een klant helpen een aanbod te kiezen, aanvraag voor te bereiden of volgende stappen te begrijpen." },
      { title: "Assisteren", text: "Het team helpen informatie vinden, herschrijven, sorteren of antwoorden produceren." },
      { title: "Verbinden", text: "De assistent koppelen aan pagina's, documenten, formulieren of interne tools waar nuttig." },
    ],
    examplesEyebrow: "Gebruik",
    examplesTitle: "We starten met eenvoudige toepassingen en voegen daarna intelligentie toe.",
    examples: [
      { title: "Klantassistent", text: "Beantwoordt gewone vragen en stuurt mensen naar de juiste dienst of contactweg." },
      { title: "Interne assistent", text: "Helpt het team procedures, documenten, aanbiedingen, berichten en informatie vinden." },
      { title: "Aangepaste GPT", text: "Een assistent met uw toon, content en grenzen voor consistente antwoorden." },
    ],
    methodEyebrow: "Onze methode",
    methodTitle: "Bepalen, voeden, testen, verbinden.",
    methodText: "De kwaliteit hangt vooral af van wat we geven: goede informatie, duidelijke grenzen, voorbeelden en juist gebruik.",
    steps: [
      "De exacte rol van de assistent bepalen.",
      "Nuttige documenten, pagina's, FAQ en data identificeren.",
      "Instructies, grenzen en antwoordvoorbeelden schrijven.",
      "Gevoelige gevallen testen voor publicatie.",
      "De assistent verbinden met de juiste kanalen indien nodig.",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      { question: "Kan een AI-assistent een persoon vervangen?", answer: "Nee. Hij helpt sneller antwoorden en informatie organiseren, maar belangrijke beslissingen en gevoelige gevallen blijven menselijk." },
      { question: "Wat hebben jullie nodig om een assistent te maken?", answer: "Uw pagina's, documenten, FAQ, diensten, aanbiedingen, merktoon en grenzen: wat de assistent wel en niet mag zeggen." },
      { question: "Kan er een prive-assistent voor het team komen?", answer: "Ja. Die kan procedures vinden, berichten herschrijven, antwoorden voorbereiden of interne informatie ordenen." },
      { question: "Kan hij meerdere talen spreken?", answer: "Ja. We kunnen instructies, content en voorbeelden voorbereiden in de talen die nuttig zijn." },
      { question: "Kan hij op de website komen?", answer: "Ja, afhankelijk van de behoefte. We kunnen ook starten met een private GPT of interne assistent." },
      { question: "Kan de assistent acties uitvoeren?", answer: "Ja, geleidelijk: aanvraag verzamelen, naar formulier sturen, email voorbereiden of geselecteerde tools koppelen." },
    ],
  },
  kiny: {
    eyebrow: "AI assistants",
    title: "Assistant za AI zifasha, zitojwe ku kazi kawe n'amakuru nyayo.",
    intro:
      "Dukora AI assistants, GPTs zihariye, chatbots na agents zoroshye zifasha abakiriya cyangwa team kubona ibisubizo vuba.",
    primary: "Kubaka AI assistant",
    secondary: "Kureba uko ngaragara",
    promises: ["Assistant prive", "Custom GPT", "Chatbot y'abakiriya", "Agent ihujwe na content"],
    imageBriefs: [
      { label: "Ishusho 1", title: "AI assistant ya brand", description: "Ishusho yerekana AI assistant mu isura ya Creativa Poeta, ibiganiro, documents za business n'ibisubizo bisobanutse. Amagambo ahindurwe ku rurimi." },
      { label: "Ishusho 2", title: "Knowledge base", description: "Ishusho yerekana documents, FAQ, pages, serivisi n'amakuru y'imbere bigaburira AI assistant." },
      { label: "Ishusho 3", title: "Agent ihujwe", description: "Ishusho yerekana AI agent ihujwe na form, email, calendar, CRM cyangwa dashboard ifite actions zoroshye." },
    ],
    rolesEyebrow: "Icyo AI igomba gukora",
    rolesTitle: "AI assistant igomba kugira inshingano isobanutse.",
    rolesText: "Ntituyikora ngo ibe gadget. Tuyikora ngo isubize, iyobore, itoranye, itegure cyangwa ifashe umuntu gutera intambwe.",
    roles: [
      { title: "Gusubiza", text: "FAQ, amakuru ya service, conditions, amasaha, processes cyangwa demandes zoroshye." },
      { title: "Kuyobora", text: "Gufasha umukiriya guhitamo offer, gutegura demande cyangwa kumva intambwe zikurikira." },
      { title: "Gufasha", text: "Gufasha team kubona amakuru, reformuler, gutoranya cyangwa gutegura ibisubizo." },
      { title: "Guhuza", text: "Guhuza assistant na pages, documents, forms cyangwa tools z'imbere aho bikenewe." },
    ],
    examplesEyebrow: "Aho ikoreshwa",
    examplesTitle: "Dutangirira ku bintu byoroshye, hanyuma tukongeramo ubwenge.",
    examples: [
      { title: "Assistant y'abakiriya", text: "Isubiza ibibazo bisanzwe ikanayobora abantu kuri service cyangwa contact ikwiye." },
      { title: "Assistant y'imbere", text: "Ifasha team kubona procedures, documents, offers, messages n'amakuru y'ingenzi." },
      { title: "Custom GPT", text: "Assistant ifite ton yawe, content yawe n'imbibi kugira ngo itange ibisubizo bihuye." },
    ],
    methodEyebrow: "Uko dukora",
    methodTitle: "Gusobanura role, kugaburira, kugerageza, guhuza.",
    methodText: "Ubwiza bwa assistant buva ku byo tuyihaye: amakuru meza, imbibi zisobanutse, ingero n'usage ikwiye.",
    steps: [
      "Kumenya role nyayo ya assistant.",
      "Guhitamo documents, pages, FAQ na data bifasha.",
      "Kwandika instructions, limits n'ingero z'ibisubizo.",
      "Kugerageza cases zikomeye mbere yo kuyitangaza.",
      "Kuyihuza n'imiyoboro ikwiye niba bikenewe.",
    ],
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      { question: "AI assistant ishobora gusimbura umuntu?", answer: "Oya. Ifasha gusubiza vuba no gutegura amakuru, ariko decisions zikomeye n'ibibazo sensitive bigomba kuguma ku bantu." },
      { question: "Mukenera iki kugira ngo muyikore?", answer: "Pages, documents, FAQ, services, offers, ton ya brand n'imbibi: ibyo assistant yemerewe kuvuga n'ibyo itemerewe." },
      { question: "Dushobora kugira assistant prive ya team?", answer: "Yego. Yafasha kubona procedures, reformuler messages, gutegura ibisubizo cyangwa gutegura amakuru y'imbere." },
      { question: "Ishobora kuvuga indimi nyinshi?", answer: "Yego. Dushobora gutegura instructions, content n'ingero mu ndimi zikenewe." },
      { question: "Ishobora gushyirwa kuri website?", answer: "Yego, bitewe n'icyo mukeneye. Dushobora no gutangirira kuri GPT prive cyangwa assistant y'imbere." },
      { question: "Assistant ishobora gukora actions?", answer: "Yego, buhoro buhoro: kwakira demande, kuyohereza kuri form, gutegura email cyangwa kuyihuza na tools zimwe." },
    ],
  },
};

const roleIcons = [FaComments, FaSearch, FaTasks, FaDatabase];

const SectionLabel = ({ children }: { children: string }) => (
  <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-wide text-[#fff200] phone:text-sm">
    <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
    {children}
  </div>
);

const ImagePlaceholder = ({
  label,
  title,
  description,
  className = "",
}: {
  label: string;
  title: string;
  description: string;
  className?: string;
}) => (
  <article
    className={`flex min-h-[17rem] flex-col justify-between rounded-[1.4rem] border border-[#EEBA2B]/45 bg-[linear-gradient(135deg,rgba(7,26,51,.92),rgba(0,0,0,.72)),repeating-linear-gradient(135deg,rgba(238,186,43,.16)_0,rgba(238,186,43,.16)_1px,transparent_1px,transparent_12px)] p-4 text-white shadow-[0_20px_70px_rgba(0,0,0,.28)] phone:p-5 ${className}`}
  >
    <div>
      <span className="inline-flex rounded-full border border-[#fff200]/60 px-3 py-1 text-[10px] font-black uppercase text-[#fff200] phone:text-xs">
        {label}
      </span>
      <h3 className="mt-4 text-xl font-black phone:text-2xl">{title}</h3>
    </div>
    <p className="mt-5 text-xs font-black leading-6 text-white/85 phone:text-sm phone:leading-7">
      {description}
    </p>
  </article>
);

const AIAutomation = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const startPath = buildLocalLocalePath(market, locale, "/start-project");
  const auditPath = buildLocalLocalePath(market, locale, "/tester-visibilite");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071a33]/55 text-white">
      <section className="relative px-4 pb-10 pt-28 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 laptop:grid-cols-[.85fr_1.15fr] laptop:items-center">
          <div>
            <SectionLabel>{copy.eyebrow}</SectionLabel>
            <h1 className="font-['Black_Ops_One'] text-4xl leading-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,.35)] phone:text-5xl laptop:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-black leading-8 text-white/90 phone:text-xl">
              {copy.intro}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {copy.promises.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border border-[#EEBA2B]/35 bg-[#071a33]/75 px-3 py-3 text-xs font-black backdrop-blur-sm phone:text-sm"
                >
                  <FaCheckCircle className="flex-none text-[#fff200]" />
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
                to={auditPath}
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border-2 border-white px-3 py-3 text-[10px] font-black uppercase leading-tight text-white transition hover:border-[#fff200] hover:text-[#fff200] phone:px-5 phone:text-xs"
              >
                <span className="truncate">{copy.secondary}</span>
                <FaSearch className="flex-none" />
              </Link>
            </div>
          </div>
          <ImagePlaceholder
            {...copy.imageBriefs[0]}
            className="min-h-[22rem] laptop:min-h-[31rem]"
          />
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-12 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>{copy.rolesEyebrow}</SectionLabel>
          <div className="max-w-5xl">
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl laptop:text-6xl">
              {copy.rolesTitle}
            </h2>
            <p className="mt-4 text-sm font-black leading-7 text-white/90 phone:text-lg phone:leading-8">
              {copy.rolesText}
            </p>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 tablet:gap-5 laptop:grid-cols-4">
            {copy.roles.map((role, index) => {
              const Icon = roleIcons[index] ?? FaRobot;

              return (
                <article
                  key={role.title}
                  className="min-h-[10.5rem] rounded-[1.1rem] border border-white/20 bg-[#071a33]/80 p-3 text-white backdrop-blur-sm phone:min-h-[11rem] phone:p-4 laptop:rounded-[1.4rem] laptop:p-5"
                >
                  <Icon className="mb-3 text-2xl text-[#fff200] phone:text-3xl laptop:text-4xl" />
                  <h3 className="text-base font-black leading-tight phone:text-lg laptop:text-xl">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-black leading-5 text-white/85 phone:text-xs phone:leading-6 laptop:text-sm laptop:leading-7">
                    {role.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-12 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 laptop:grid-cols-[1.05fr_.95fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.examplesEyebrow}</SectionLabel>
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl">
              {copy.examplesTitle}
            </h2>
            <div className="mt-7 grid gap-3">
              {copy.examples.map((example) => (
                <article
                  key={example.title}
                  className="rounded-[1.1rem] border border-[#EEBA2B]/40 bg-[#071a33]/80 p-4 backdrop-blur-sm phone:p-5 laptop:rounded-[1.4rem]"
                >
                  <h3 className="text-xl font-black leading-tight text-[#fff200] laptop:text-2xl">
                    {example.title}
                  </h3>
                  <p className="mt-2 text-xs font-black leading-6 text-white/85 phone:text-sm laptop:text-base laptop:leading-7">
                    {example.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <ImagePlaceholder {...copy.imageBriefs[1]} />
            <ImagePlaceholder {...copy.imageBriefs[2]} />
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-12 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 laptop:grid-cols-[.85fr_1.15fr] laptop:items-start">
          <div>
            <SectionLabel>{copy.methodEyebrow}</SectionLabel>
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl">
              {copy.methodTitle}
            </h2>
            <p className="mt-4 text-sm font-black leading-7 text-white/90 phone:text-lg phone:leading-8">
              {copy.methodText}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-[#EEBA2B]/45 bg-[linear-gradient(135deg,rgba(7,26,51,.86),rgba(0,0,0,.72)),repeating-linear-gradient(135deg,rgba(238,186,43,.16)_0,rgba(238,186,43,.16)_1px,transparent_1px,transparent_10px)] p-4 backdrop-blur-sm phone:p-5 laptop:p-7">
            <ol className="space-y-3">
              {copy.steps.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-2xl border border-white/15 bg-black/20 p-3 phone:grid-cols-[3rem_1fr] phone:p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fff200] text-sm font-black text-[#fff200] phone:h-12 phone:w-12 phone:text-lg">
                    {index + 1}
                  </span>
                  <span className="text-xs font-black leading-5 text-white phone:text-sm phone:leading-6">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEBA2B] px-4 py-12 phone:px-5 tablet:px-10 laptop:px-16">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>{copy.faqTitle}</SectionLabel>
          <ServiceFAQAccordion
            items={copy.faqs}
            icon={<FaQuestionCircle aria-hidden="true" />}
          />
        </div>
      </section>

      <ServiceFinalCTA />
    </main>
  );
};

export default AIAutomation;
