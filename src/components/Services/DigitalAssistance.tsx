import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCloud,
  FaComments,
  FaLock,
  FaMobileAlt,
  FaQuestionCircle,
  FaTools,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import ServiceFinalCTA from "./ServiceFinalCTA";

type AssistanceCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  secondary: string;
  promises: string[];
  imageBriefs: Array<{ label: string; title: string; description: string }>;
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillarsText: string;
  pillars: Array<{ title: string; text: string }>;
  situationsEyebrow: string;
  situationsTitle: string;
  situations: Array<{ title: string; text: string }>;
  methodEyebrow: string;
  methodTitle: string;
  methodText: string;
  steps: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

const copies: Record<string, AssistanceCopy> = {
  fr: {
    eyebrow: "Assistance numerique",
    title: "Installez, configurez et utilisez vos outils numeriques sans stress.",
    intro:
      "Nous aidons les particuliers, entrepreneurs et petites structures a depanner leurs appareils, configurer leurs outils et gagner en autonomie dans le monde numerique.",
    primary: "Demander une assistance",
    secondary: "Expliquer mon probleme",
    promises: [
      "Depannage tech",
      "Configuration d'appareils",
      "Aide administrative en ligne",
      "Accompagnement pas a pas",
    ],
    imageBriefs: [
      {
        label: "Image 1",
        title: "Assistance tech humaine",
        description:
          "Une personne accompagnee avec ordinateur, smartphone, tablette, imprimante et box internet. Ambiance rassurante, professionnelle, pas trop corporate. Texte a traduire par langue.",
      },
      {
        label: "Image 2",
        title: "Configuration multi-appareils",
        description:
          "Un visuel montrant Wi-Fi, imprimante, ordinateur, smartphone, cloud, email et comptes connectes dans une maison ou petit bureau.",
      },
      {
        label: "Image 3",
        title: "Vie numerique plus simple",
        description:
          "Un visuel montrant achats en ligne, documents administratifs, reseaux sociaux, mots de passe et securite organises clairement.",
      },
    ],
    pillarsEyebrow: "Ce que nous faisons",
    pillarsTitle: "Une aide simple pour les problemes tech du quotidien.",
    pillarsText:
      "Le but n'est pas de vous noyer dans la technique. Le but est de regler le probleme, expliquer ce qui se passe et vous rendre plus autonome.",
    pillars: [
      {
        title: "Depanner",
        text: "Ordinateur lent, email bloque, imprimante capricieuse, Wi-Fi instable, telephone ou tablette difficile a utiliser.",
      },
      {
        title: "Installer",
        text: "Configurer un appareil, logiciel, compte, imprimante, cloud, application ou outil de travail.",
      },
      {
        title: "Securiser",
        text: "Mots de passe, sauvegardes, antivirus, comptes, arnaques en ligne et bonnes pratiques simples.",
      },
      {
        title: "Accompagner",
        text: "Achats en ligne, demarches administratives, reseaux sociaux, IA, outils modernes et autonomie numerique.",
      },
    ],
    situationsEyebrow: "Situations courantes",
    situationsTitle: "Vous pouvez demander de l'aide meme si le probleme semble petit.",
    situations: [
      {
        title: "A la maison",
        text: "Configurer internet, connecter une imprimante, organiser les photos, installer une application ou comprendre un nouveau telephone.",
      },
      {
        title: "Pour votre activite",
        text: "Mettre en place email professionnel, WhatsApp Business, outils cloud, visio, documents, reseaux sociaux ou paiements simples.",
      },
      {
        title: "Pour apprendre",
        text: "Comprendre ChatGPT, Canva, Google Drive, les achats en ligne, les formulaires administratifs ou la securite de base.",
      },
    ],
    methodEyebrow: "Notre methode",
    methodTitle: "Comprendre, corriger, expliquer, laisser une base propre.",
    methodText:
      "On avance avec patience et sans jugement. L'objectif est que vous repartiez avec un outil qui fonctionne et une explication claire.",
    steps: [
      "Ecouter le probleme et le contexte.",
      "Verifier l'appareil, le compte ou l'outil concerne.",
      "Corriger ou configurer ce qui bloque.",
      "Expliquer les gestes importants sans jargon.",
      "Laisser une mini-checklist pour eviter que le probleme revienne.",
    ],
    faqTitle: "Questions frequentes",
    faqs: [
      {
        question: "Est-ce seulement pour les entreprises ?",
        answer:
          "Non. Ce service est aussi pour les particuliers, familles, seniors, etudiants, independants et petites structures.",
      },
      {
        question: "Pouvez-vous m'aider meme si je ne comprends rien a la technologie ?",
        answer:
          "Oui. Le service est justement pense pour expliquer calmement, sans jargon et sans jugement.",
      },
      {
        question: "Quels appareils pouvez-vous aider a configurer ?",
        answer:
          "Ordinateurs, smartphones, tablettes, imprimantes, box internet, comptes email, cloud, applications et outils de travail courants.",
      },
      {
        question: "Est-ce que vous pouvez aider pour les demarches en ligne ?",
        answer:
          "Oui, nous pouvons vous accompagner pas a pas, tout en gardant vos informations sensibles sous votre controle.",
      },
      {
        question: "Pouvez-vous m'aider a securiser mes comptes ?",
        answer:
          "Oui. Nous pouvons revoir les mots de passe, sauvegardes, double authentification et bonnes pratiques contre les arnaques.",
      },
      {
        question: "Est-ce que vous formez aussi a l'utilisation des outils ?",
        answer:
          "Oui. Nous pouvons faire une prise en main simple: reseaux sociaux, cloud, IA, visio, documents, achats en ligne ou outils professionnels.",
      },
    ],
  },
  en: {
    eyebrow: "Digital assistance",
    title: "Install, configure and use your digital tools without stress.",
    intro:
      "We help individuals, entrepreneurs and small teams troubleshoot devices, configure tools and gain confidence with technology.",
    primary: "Ask for support",
    secondary: "Explain my issue",
    promises: ["Tech troubleshooting", "Device setup", "Online task support", "Step-by-step guidance"],
    imageBriefs: [
      { label: "Image 1", title: "Human tech support", description: "A reassuring visual with a person helped around a laptop, smartphone, tablet, printer and internet router. Professional, human, not too corporate. Translate text by language." },
      { label: "Image 2", title: "Multi-device setup", description: "A visual showing Wi-Fi, printer, computer, smartphone, cloud, email and accounts connected in a home or small office." },
      { label: "Image 3", title: "Simpler digital life", description: "A visual showing online shopping, admin documents, social media, passwords and security organized clearly." },
    ],
    pillarsEyebrow: "What we do",
    pillarsTitle: "Simple help for everyday tech problems.",
    pillarsText: "The goal is not to drown you in technical words. The goal is to fix, explain and make you more independent.",
    pillars: [
      { title: "Troubleshoot", text: "Slow computer, blocked email, printer issues, unstable Wi-Fi, phone or tablet problems." },
      { title: "Install", text: "Set up a device, software, account, printer, cloud, app or work tool." },
      { title: "Secure", text: "Passwords, backups, antivirus, accounts, online scams and simple safe habits." },
      { title: "Guide", text: "Online shopping, admin tasks, social media, AI, modern tools and digital independence." },
    ],
    situationsEyebrow: "Common situations",
    situationsTitle: "You can ask for help even when the problem feels small.",
    situations: [
      { title: "At home", text: "Set up internet, connect a printer, organize photos, install an app or understand a new phone." },
      { title: "For your activity", text: "Set up professional email, WhatsApp Business, cloud tools, video calls, documents, social media or simple payments." },
      { title: "To learn", text: "Understand ChatGPT, Canva, Google Drive, online shopping, admin forms or basic security." },
    ],
    methodEyebrow: "Our method",
    methodTitle: "Understand, fix, explain, leave a clean base.",
    methodText: "We work patiently and without judgment. You should leave with a working tool and a clear explanation.",
    steps: [
      "Listen to the problem and context.",
      "Check the device, account or tool involved.",
      "Fix or configure what blocks you.",
      "Explain important actions without jargon.",
      "Leave a mini-checklist to avoid repeat issues.",
    ],
    faqTitle: "Common questions",
    faqs: [
      { question: "Is this only for businesses?", answer: "No. This service is also for individuals, families, seniors, students, freelancers and small teams." },
      { question: "Can you help if I do not understand technology?", answer: "Yes. The service is designed to explain calmly, without jargon and without judgment." },
      { question: "Which devices can you help configure?", answer: "Computers, smartphones, tablets, printers, internet routers, email accounts, cloud, apps and common work tools." },
      { question: "Can you help with online administration?", answer: "Yes, we can guide you step by step while keeping sensitive information under your control." },
      { question: "Can you help secure my accounts?", answer: "Yes. We can review passwords, backups, two-factor authentication and simple habits against scams." },
      { question: "Do you also teach how to use tools?", answer: "Yes. We can help with social media, cloud, AI, video calls, documents, online shopping or professional tools." },
    ],
  },
  nl: {
    eyebrow: "Digitale assistentie",
    title: "Installeer, configureer en gebruik digitale tools zonder stress.",
    intro:
      "We helpen particulieren, ondernemers en kleine teams toestellen oplossen, tools configureren en meer vertrouwen krijgen met technologie.",
    primary: "Hulp vragen",
    secondary: "Probleem uitleggen",
    promises: ["Tech oplossen", "Toestellen instellen", "Online taken", "Begeleiding stap voor stap"],
    imageBriefs: [
      { label: "Afbeelding 1", title: "Menselijke tech hulp", description: "Een geruststellende visual met iemand die geholpen wordt met laptop, smartphone, tablet, printer en internetrouter. Professioneel en menselijk. Tekst per taal vertalen." },
      { label: "Afbeelding 2", title: "Multi-device setup", description: "Een visual met Wi-Fi, printer, computer, smartphone, cloud, email en accounts verbonden in een woning of klein kantoor." },
      { label: "Afbeelding 3", title: "Eenvoudiger digitaal leven", description: "Een visual met online aankopen, administratieve documenten, sociale media, wachtwoorden en veiligheid duidelijk georganiseerd." },
    ],
    pillarsEyebrow: "Wat we doen",
    pillarsTitle: "Eenvoudige hulp voor dagelijkse techproblemen.",
    pillarsText: "Het doel is niet u te overspoelen met techniek. Het doel is oplossen, uitleggen en u zelfstandiger maken.",
    pillars: [
      { title: "Oplossen", text: "Trage computer, geblokkeerde email, printerproblemen, instabiele Wi-Fi, telefoon of tablet." },
      { title: "Installeren", text: "Toestel, software, account, printer, cloud, app of werktool instellen." },
      { title: "Beveiligen", text: "Wachtwoorden, back-ups, antivirus, accounts, online fraude en veilige gewoontes." },
      { title: "Begeleiden", text: "Online aankopen, administratie, sociale media, AI, moderne tools en digitale autonomie." },
    ],
    situationsEyebrow: "Veel voorkomende situaties",
    situationsTitle: "U kunt hulp vragen, ook als het probleem klein lijkt.",
    situations: [
      { title: "Thuis", text: "Internet instellen, printer verbinden, foto's ordenen, app installeren of een nieuwe telefoon begrijpen." },
      { title: "Voor uw activiteit", text: "Professionele email, WhatsApp Business, cloudtools, video, documenten, sociale media of eenvoudige betalingen." },
      { title: "Om te leren", text: "ChatGPT, Canva, Google Drive, online aankopen, administratieve formulieren of basisveiligheid begrijpen." },
    ],
    methodEyebrow: "Onze methode",
    methodTitle: "Begrijpen, oplossen, uitleggen, netjes achterlaten.",
    methodText: "We werken geduldig en zonder oordeel. U vertrekt met een werkende tool en duidelijke uitleg.",
    steps: [
      "Het probleem en de context beluisteren.",
      "Het toestel, account of tool controleren.",
      "Configureren of herstellen wat blokkeert.",
      "Belangrijke handelingen zonder jargon uitleggen.",
      "Een mini-checklist achterlaten tegen herhaling.",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      { question: "Is dit alleen voor bedrijven?", answer: "Nee. Ook voor particulieren, families, senioren, studenten, zelfstandigen en kleine teams." },
      { question: "Helpen jullie als ik niets van technologie begrijp?", answer: "Ja. De service is gemaakt om rustig, zonder jargon en zonder oordeel uit te leggen." },
      { question: "Welke toestellen kunnen jullie helpen configureren?", answer: "Computers, smartphones, tablets, printers, internetrouters, emailaccounts, cloud, apps en gewone werktools." },
      { question: "Kunnen jullie helpen met online administratie?", answer: "Ja, we begeleiden stap voor stap terwijl gevoelige informatie onder uw controle blijft." },
      { question: "Kunnen jullie mijn accounts beveiligen?", answer: "Ja. We kunnen wachtwoorden, back-ups, tweestapsverificatie en gewoontes tegen fraude bekijken." },
      { question: "Geven jullie ook uitleg over tools?", answer: "Ja. Sociale media, cloud, AI, video, documenten, online aankopen of professionele tools." },
    ],
  },
  kiny: {
    eyebrow: "Assistance numerique",
    title: "Shyiraho, tunganya kandi ukoreshe tools za digital nta stress.",
    intro:
      "Dufasha abantu, entrepreneurs na teams ntoya gukemura ibibazo by'ibikoresho, gutunganya tools no kugira confidence mu ikoranabuhanga.",
    primary: "Gusaba ubufasha",
    secondary: "Gusobanura ikibazo",
    promises: ["Depannage tech", "Configuration", "Démarches online", "Ubufasha intambwe ku yindi"],
    imageBriefs: [
      { label: "Ishusho 1", title: "Ubufasha tech bwa muntu", description: "Ishusho itanga icyizere y'umuntu afashwa kuri laptop, smartphone, tablet, printer na router. Professional ariko human. Amagambo ahindurwe ku rurimi." },
      { label: "Ishusho 2", title: "Configuration y'ibikoresho", description: "Ishusho yerekana Wi-Fi, printer, computer, smartphone, cloud, email na accounts bihujwe mu rugo cyangwa office nto." },
      { label: "Ishusho 3", title: "Ubuzima bwa digital bworoshye", description: "Ishusho yerekana kugura online, documents, social media, passwords na security biteguye neza." },
    ],
    pillarsEyebrow: "Ibyo dukora",
    pillarsTitle: "Ubufasha bworoshye ku bibazo bya tech bya buri munsi.",
    pillarsText: "Intego si ukukuzanira amagambo akomeye. Intego ni gukemura, gusobanura no kukugira autonome.",
    pillars: [
      { title: "Gukemura", text: "Computer itinda, email ifunze, printer, Wi-Fi itagenda neza, telephone cyangwa tablet." },
      { title: "Gushyiraho", text: "Gutunganya appareil, software, account, printer, cloud, app cyangwa tool y'akazi." },
      { title: "Kurinda", text: "Passwords, backups, antivirus, accounts, online scams n'imyitwarire itekanye." },
      { title: "Guherekeza", text: "Kugura online, demarches, social media, AI, tools nshya no kwigenga muri digital." },
    ],
    situationsEyebrow: "Aho bikunze gukenerwa",
    situationsTitle: "Ushobora gusaba ubufasha n'iyo ikibazo gisa gito.",
    situations: [
      { title: "Mu rugo", text: "Gutunganya internet, guhuza printer, gutegura amafoto, gushyiraho app cyangwa kumva telephone nshya." },
      { title: "Ku kazi kawe", text: "Email professionnel, WhatsApp Business, cloud tools, visio, documents, social media cyangwa payments zoroshye." },
      { title: "Kwigira", text: "Kumva ChatGPT, Canva, Google Drive, kugura online, forms za administration cyangwa security basics." },
    ],
    methodEyebrow: "Uko dukora",
    methodTitle: "Kumva, gukosora, gusobanura, gusiga bitunganijwe.",
    methodText: "Dukorana patience kandi nta kugucira urubanza. Ugomba gusigarana tool ikora n'ubusobanuro bwumvikana.",
    steps: [
      "Kumva ikibazo n'uko cyaje.",
      "Kureba appareil, account cyangwa tool bireba.",
      "Gukosora cyangwa gutunganya ibikubuza.",
      "Gusobanura intambwe z'ingenzi nta jargon.",
      "Gusiga mini-checklist kugira ngo bitagaruka.",
    ],
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      { question: "Ni service y'abacuruzi gusa?", answer: "Oya. Ni n'iy'abantu ku giti cyabo, families, seniors, students, independants na teams ntoya." },
      { question: "Mwafasha umuntu utumva technology?", answer: "Yego. Iyi service igamije gusobanura buhoro, nta jargon kandi nta guca imanza." },
      { question: "Ni ibihe bikoresho mwafasha gutunganya?", answer: "Computers, smartphones, tablets, printers, routers, email accounts, cloud, apps na tools z'akazi zisanzwe." },
      { question: "Mwafasha muri demarches online?", answer: "Yego, tugufasha intambwe ku yindi, ariko amakuru yawe sensitive akaguma mu maboko yawe." },
      { question: "Mwafasha kurinda accounts?", answer: "Yego. Tureba passwords, backups, double authentification n'uko wirinda scams." },
      { question: "Munigisha gukoresha tools?", answer: "Yego. Social media, cloud, AI, visio, documents, kugura online cyangwa tools professionnels." },
    ],
  },
};

const pillarIcons = [FaTools, FaMobileAlt, FaLock, FaCloud];

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

const DigitalAssistance = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const requestPath = buildLocalLocalePath(market, locale, "/demander-assistance-numerique");
  const contactPath = buildLocalLocalePath(market, locale, "/contact");

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
                to={requestPath}
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
                <FaComments className="flex-none" />
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
          <SectionLabel>{copy.pillarsEyebrow}</SectionLabel>
          <div className="max-w-5xl">
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl laptop:text-6xl">
              {copy.pillarsTitle}
            </h2>
            <p className="mt-4 text-sm font-black leading-7 text-white/90 phone:text-lg phone:leading-8">
              {copy.pillarsText}
            </p>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 tablet:gap-5 laptop:grid-cols-4">
            {copy.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? FaTools;

              return (
                <article
                  key={pillar.title}
                  className="min-h-[10.5rem] rounded-[1.1rem] border border-white/20 bg-[#071a33]/80 p-3 text-white backdrop-blur-sm phone:min-h-[11rem] phone:p-4 laptop:rounded-[1.4rem] laptop:p-5"
                >
                  <Icon className="mb-3 text-2xl text-[#fff200] phone:text-3xl laptop:text-4xl" />
                  <h3 className="text-base font-black leading-tight phone:text-lg laptop:text-xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-black leading-5 text-white/85 phone:text-xs phone:leading-6 laptop:text-sm laptop:leading-7">
                    {pillar.text}
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
            <SectionLabel>{copy.situationsEyebrow}</SectionLabel>
            <h2 className="font-['Black_Ops_One'] text-4xl leading-tight text-white phone:text-5xl">
              {copy.situationsTitle}
            </h2>
            <div className="mt-7 grid gap-3">
              {copy.situations.map((situation) => (
                <article
                  key={situation.title}
                  className="rounded-[1.1rem] border border-[#EEBA2B]/40 bg-[#071a33]/80 p-4 backdrop-blur-sm phone:p-5 laptop:rounded-[1.4rem]"
                >
                  <h3 className="text-xl font-black leading-tight text-[#fff200] laptop:text-2xl">
                    {situation.title}
                  </h3>
                  <p className="mt-2 text-xs font-black leading-6 text-white/85 phone:text-sm laptop:text-base laptop:leading-7">
                    {situation.text}
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

export default DigitalAssistance;
