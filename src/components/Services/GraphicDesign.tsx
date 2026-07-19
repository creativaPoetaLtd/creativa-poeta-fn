import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBullhorn,
  FaCheckCircle,
  FaDraftingCompass,
  FaEye,
  FaLayerGroup,
  FaPalette,
  FaQuestionCircle,
  FaShareAlt,
} from "react-icons/fa";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import ServiceFinalCTA from "./ServiceFinalCTA";
import brandUniverseEn from "../../assets/services/graphic-design/brand-universe-en.webp";
import brandUniverseFr from "../../assets/services/graphic-design/brand-universe-fr.webp";
import brandUniverseNl from "../../assets/services/graphic-design/brand-universe-nl.webp";
import publishReadyEn from "../../assets/services/graphic-design/publish-ready-en.webp";
import publishReadyFr from "../../assets/services/graphic-design/publish-ready-fr.webp";
import publishReadyNl from "../../assets/services/graphic-design/publish-ready-nl.webp";
import recognizableBrandEn from "../../assets/services/graphic-design/recognizable-brand-en.webp";
import recognizableBrandFr from "../../assets/services/graphic-design/recognizable-brand-fr.webp";
import recognizableBrandNl from "../../assets/services/graphic-design/recognizable-brand-nl.webp";

type GraphicCopy = {
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
  worksEyebrow: string;
  worksTitle: string;
  worksText: string;
  works: Array<{ title: string; text: string }>;
  packsEyebrow: string;
  packsTitle: string;
  packs: Array<{ title: string; text: string }>;
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

const copies: Record<string, GraphicCopy> = {
  fr: {
    eyebrow: "Design & identité visuelle",
    title: "Nous donnons une forme claire et memorable à votre univers.",
    intro:
      "Logo, charte visuelle, affiches, flyers, posts réseaux sociaux, présentations et supports publicitaires : nous créons des visuels qui rendent votre marque reconnaissable et facile à comprendre.",
    primary: "Créer mon identité visuelle",
    secondary: "Démarrer un projet",
    promises: [
      "Logo et style cohérent",
      "Supports pros",
      "Visuels pour réseaux sociaux",
      "Marque plus reconnaissable",
    ],
    imageBriefs: [
      {
        label: "Visuel principal",
        title: "Un univers de marque cohérent",
        description:
          "Image montrant un moodboard de marque avec logo, couleurs, typographies, carte de visite, affiche et ecran mobile. Style moderne, premium, bleu nuit et jaune CP. Texte dans l'image traduit selon la langue.",
      },
      {
        label: "Supports",
        title: "Des supports prêts à publier",
        description:
          "Image montrant des flyers, affiches, posts Instagram, bannière web et présentation reunis autour d'une même identité visuelle. Faire sentir la cohérence entre print et digital.",
      },
      {
        label: "Application",
        title: "Une marque qui reste reconnaissable partout",
        description:
          "Image montrant la même identité appliquee sur réseaux sociaux, site web, packaging, document PDF, signature email et evenement local.",
      },
    ],
    whyEyebrow: "Pourquoi c'est important",
    whyTitle: "Avant de lire votre message, les gens voient déjà votre image.",
    whyText:
      "Un bon design aide votre public à vous reconnaitre, vous prendre au sérieux et comprendre rapidement ce que vous proposez. L'objectif n'est pas seulement de faire beau, mais de rendre votre communication plus claire, plus fiable et plus mémorisable.",
    worksEyebrow: "Ce que le design doit faire",
    worksTitle: "Chaque visuel doit avoir un rôle précis.",
    worksText:
      "Une identité visuelle forte ne se limite pas à un logo. Elle guide tout ce que les gens voient de vous: vos posts, documents, affiches, pages, présentations et publicités.",
    works: [
      {
        title: "Reconnaître",
        text: "Créer un style visuel que les gens associent rapidement à votre marque.",
      },
      {
        title: "Expliquer",
        text: "Transformer vos offres, messages ou étapes en visuels faciles à comprendre.",
      },
      {
        title: "Rassurer",
        text: "Donner une apparence professionnelle qui inspire confiance avant même le contact.",
      },
      {
        title: "Promouvoir",
        text: "Produire des supports qui attirent l'attention sur vos services, evenements ou campagnes.",
      },
    ],
    packsEyebrow: "Ce que nous pouvons créer",
    packsTitle: "On adapte le design à vos vrais besoins de communication.",
    packs: [
      {
        title: "Identité de marque",
        text: "Logo, palette, typographies, style graphique, variantes et mini-guide d'utilisation.",
      },
      {
        title: "Supports commerciaux",
        text: "Flyers, affiches, cartes, brochures, menus, catalogues, documents PDF et présentations.",
      },
      {
        title: "Contenus réseaux sociaux",
        text: "Templates de posts, stories, bannieres, carrousels, publicités et visuels de campagne.",
      },
    ],
    deliverEyebrow: "Livrables",
    deliverTitle: "Des fichiers utiles, pas seulement une belle image.",
    deliverText:
      "Le but est que vous puissiez vraiment utiliser votre identité et vos supports sur vos canaux de communication.",
    deliver: [
      "Logo ou éléments graphiques dans les formats adaptés.",
      "Palette de couleurs, polices et règles d'utilisation.",
      "Visuels prêts pour impression ou publication digitale.",
      "Versions adaptées aux langues et formats nécessaires.",
      "Templates réutilisables pour garder une communication cohérente.",
      "Conseils simples pour utiliser les visuels sans casser l'identité.",
    ],
    methodEyebrow: "Notre méthode",
    methodTitle: "Clarifier, designer, decliner, livrer.",
    methodText:
      "On part de votre message et de votre public. Ensuite on crée un style visuel cohérent, puis on le decline sur les supports qui ont vraiment de la valeur pour votre activité.",
    steps: [
      "Comprendre votre marque, votre public et vos objectifs.",
      "Definir une direction visuelle claire: couleurs, ambiance, style.",
      "Créer les premiers visuels et ajuster avec vos retours.",
      "Decliner le design sur les supports prioritaires.",
      "Livrer les fichiers propres et organiser les versions utiles.",
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        question: "Est-ce que vous créez seulement des logos ?",
        answer:
          "Non. Le logo peut faire partie du service, mais nous pouvons aussi créer une identité complète, des supports imprimés, des contenus réseaux sociaux, des présentations et des visuels publicitaires.",
      },
      {
        question: "Puis-je demander seulement quelques visuels ?",
        answer:
          "Oui. On peut travailler sur un besoin ponctuel, par exemple un flyer, une affiche, un carrousel ou une présentation, sans refaire toute l'identité.",
      },
      {
        question: "Pouvez-vous moderniser une identité existante ?",
        answer:
          "Oui. On peut garder ce qui est reconnaissable et corriger ce qui manque de clarté, de cohérence ou de qualité visuelle.",
      },
      {
        question: "Les fichiers seront-ils utilisables pour impression et web ?",
        answer:
          "Oui. On prépare les formats selon l'usage: réseaux sociaux, site web, PDF, impression, présentation ou autres supports.",
      },
      {
        question: "Pouvez-vous créer les visuels en plusieurs langues ?",
        answer:
          "Oui. On peut prévoir les versions français, anglais, néerlandais ou kinyarwanda si les textes sont disponibles ou si nous les préparons avec vous.",
      },
      {
        question: "Est-ce que vous aidez aussi avec le message du visuel ?",
        answer:
          "Oui. Un visuel doit porter un message clair. Nous pouvons reformuler les titres, appels a l'action et textes courts pour rendre le support plus efficace.",
      },
    ],
  },
  en: {
    eyebrow: "Design & visual identity",
    title: "We give your universe a clear and memorable visual form.",
    intro:
      "Logo, visual identity, posters, flyers, social media posts, presentations and advertising assets: we create visuals that make your brand recognizable and easy to understand.",
    primary: "Create my visual identity",
    secondary: "Start a project",
    promises: [
      "Coherent logo and style",
      "Professional assets",
      "Social media visuals",
      "More recognizable brand",
    ],
    imageBriefs: [
      {
        label: "Main visual",
        title: "A cohérent brand universe",
        description:
          "Image showing a brand moodboard with logo, colors, typography, business card, poster and mobile screen. Modern premium style, dark blue and CP yellow. Text inside the image translated by language.",
      },
      {
        label: "Assets",
        title: "Materials ready to publish",
        description:
          "Image showing flyers, posters, Instagram posts, web banner and presentation under one consistent visual identity. It should connect print and digital.",
      },
      {
        label: "Application",
        title: "A brand people recognize everywhere",
        description:
          "Image showing the same identity applied to social media, website, packaging, PDF document, email signature and local event.",
      },
    ],
    whyEyebrow: "Why it matters",
    whyTitle: "Before people read your message, they already see your image.",
    whyText:
      "Good design helps your audience recognize you, take you seriously and understand what you offer faster. The goal is not only to look beautiful, but to make your communication clearer, more trustworthy and easier to remember.",
    worksEyebrow: "What design should do",
    worksTitle: "Every visual needs a précise role.",
    worksText:
      "A strong visual identity is more than a logo. It guides everything people see from you: posts, documents, posters, pages, presentations and ads.",
    works: [
      {
        title: "Recognize",
        text: "Create a visual style people quickly associate with your brand.",
      },
      {
        title: "Explain",
        text: "Turn your offers, messages or steps into visuals that are easy to understand.",
      },
      {
        title: "Reassure",
        text: "Give a professional appearance that builds trust before the first contact.",
      },
      {
        title: "Promote",
        text: "Produce assets that draw attention to your services, events or campaigns.",
      },
    ],
    packsEyebrow: "What we can create",
    packsTitle: "We adapt design to your real communication needs.",
    packs: [
      {
        title: "Brand identity",
        text: "Logo, palette, typography, graphic style, variations and a simple usage guide.",
      },
      {
        title: "Commercial materials",
        text: "Flyers, posters, cards, brochures, menus, catalogs, PDF documents and presentations.",
      },
      {
        title: "Social media content",
        text: "Post templates, stories, banners, carousels, ads and campaign visuals.",
      },
    ],
    deliverEyebrow: "Deliverables",
    deliverTitle: "Useful files, not only a beautiful image.",
    deliverText:
      "The goal is that you can truly use your identity and materials across your communication channels.",
    deliver: [
      "Logo or graphic elements in the right formats.",
      "Color palette, fonts and usage rules.",
      "Visuals ready for print or digital publishing.",
      "Versions adapted to the required languages and formats.",
      "Reusable templates to keep communication consistent.",
      "Simple guidance to use the visuals without breaking the identity.",
    ],
    methodEyebrow: "Our method",
    methodTitle: "Clarify, design, adapt, deliver.",
    methodText:
      "We start from your message and audience. Then we create a cohérent visual style and adapt it to the materials that matter most for your activity.",
    steps: [
      "Understand your brand, audience and goals.",
      "Define a clear visual direction: colors, mood and style.",
      "Create first visuals and adjust with your feedback.",
      "Apply the design to priority materials.",
      "Deliver clean files and organize the useful versions.",
    ],
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Do you only create logos?",
        answer:
          "No. The logo can be part of the service, but we can also create a full identity, printed materials, social media content, presentations and advertising visuals.",
      },
      {
        question: "Can I request only a few visuals?",
        answer:
          "Yes. We can work on a specific need, such as a flyer, poster, carousel or presentation, without rebuilding the whole identity.",
      },
      {
        question: "Can you modernize an existing identity?",
        answer:
          "Yes. We can keep what is recognizable and improve what lacks clarity, consistency or visual quality.",
      },
      {
        question: "Will the files work for print and web?",
        answer:
          "Yes. We prepare formats according to the use: social media, website, PDF, print, presentation or other materials.",
      },
      {
        question: "Can you create multilingual visuals?",
        answer:
          "Yes. We can prepare French, English, Dutch or Kinyarwanda versions if the copy is available or if we prepare it with you.",
      },
      {
        question: "Do you also help with the message inside the visual?",
        answer:
          "Yes. A visual must carry a clear message. We can refine titles, calls to action and short copy to make the material more effective.",
      },
    ],
  },
  nl: {
    eyebrow: "Design & visuele identiteit",
    title: "Wij geven uw universum een duidelijke en herkenbare vorm.",
    intro:
      "Logo, visuele identiteit, affiches, flyers, social media posts, presentaties en reclamemateriaal: we maken visuals die uw merk herkenbaar en begrijpelijk maken.",
    primary: "Maak mijn visuele identiteit",
    secondary: "Start een project",
    promises: [
      "Coherent logo en stijl",
      "Professionele materialen",
      "Social media visuals",
      "Herkenbaarder merk",
    ],
    imageBriefs: [
      {
        label: "Hoofdbeeld",
        title: "Een cohérent merkuniversum",
        description:
          "Afbeelding met brand moodboard: logo, kleuren, typografie, visitekaartje, affiche en mobiel scherm. Moderne premium stijl, donkerblauw en CP-geel. Tekst in de afbeelding vertaald per taal.",
      },
      {
        label: "Materialen",
        title: "Materialen klaar om te publiceren",
        description:
          "Afbeelding met flyers, affiches, Instagram posts, webbanner en presentatie binnen eenzelfde visuele identiteit. Print en digitaal moeten samenhangend voelen.",
      },
      {
        label: "Toepassing",
        title: "Een merk dat overal herkenbaar blijft",
        description:
          "Afbeelding waarin dezelfde identiteit wordt toegepast op sociale media, website, verpakking, PDF-document, e-mailhandtekening en lokaal evenement.",
      },
    ],
    whyEyebrow: "Waarom dit telt",
    whyTitle: "Voordat mensen uw boodschap lezen, zien ze al uw uitstraling.",
    whyText:
      "Goed design helpt uw publiek u te herkennen, serieus te nemen en sneller te begrijpen wat u aanbiedt. Het doel is niet alleen mooi zijn, maar communicatie duidelijker, betrouwbaarder en memorabeler maken.",
    worksEyebrow: "Wat design moet doen",
    worksTitle: "Elke visual heeft een duidelijke rol nodig.",
    worksText:
      "Een sterke visuele identiteit is meer dan een logo. Ze stuurt alles wat mensen van u zien: posts, documenten, affiches, pagina's, presentaties en advertenties.",
    works: [
      {
        title: "Herkennen",
        text: "Een visuele stijl maken die mensen snel aan uw merk koppelen.",
      },
      {
        title: "Uitleggen",
        text: "Uw aanbod, boodschappen of stappen omzetten in visuals die makkelijk te begrijpen zijn.",
      },
      {
        title: "Geruststellen",
        text: "Een professionele uitstraling geven die vertrouwen opbouwt voor het eerste contact.",
      },
      {
        title: "Promoten",
        text: "Materialen maken die aandacht trekken voor uw diensten, events of campagnes.",
      },
    ],
    packsEyebrow: "Wat we kunnen maken",
    packsTitle: "We passen design aan uw echte communicatienoden aan.",
    packs: [
      {
        title: "Merkidentiteit",
        text: "Logo, kleurenpalet, typografie, grafische stijl, varianten en eenvoudige gebruiksgids.",
      },
      {
        title: "Commerciele materialen",
        text: "Flyers, affiches, kaarten, brochures, menu's, catalogi, PDF-documenten en presentaties.",
      },
      {
        title: "Social media content",
        text: "Post templates, stories, banners, carrousels, advertenties en campagnevisuals.",
      },
    ],
    deliverEyebrow: "Oplevering",
    deliverTitle: "Bruikbare bestanden, niet alleen een mooie afbeelding.",
    deliverText:
      "Het doel is dat u uw identiteit en materialen echt kunt gebruiken op uw communicatiekanalen.",
    deliver: [
      "Logo of grafische elementen in de juiste formaten.",
      "Kleurenpalet, lettertypes en gebruiksregels.",
      "Visuals klaar voor drukwerk of digitale publicatie.",
      "Versies aangepast aan de nodige talen en formaten.",
      "Herbruikbare templates om communicatie cohérent te houden.",
      "Eenvoudige tips om de visuals goed te gebruiken.",
    ],
    methodEyebrow: "Onze méthode",
    methodTitle: "Verhelderen, ontwerpen, toepassen, leveren.",
    methodText:
      "We vertrekken van uw boodschap en publiek. Daarna maken we een cohérente visuele stijl en passen die toe op de materialen die het meeste waarde hebben voor uw activitéit.",
    steps: [
      "Uw merk, publiek en doelen begrijpen.",
      "Een duidelijke visuele richting bepalen: kleuren, sfeer en stijl.",
      "Eerste visuals maken en aanpassen met uw feedback.",
      "Het design toepassen op prioritaire materialen.",
      "Propere bestanden leveren en nuttige versies organiseren.",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      {
        question: "Maken jullie alleen logo's?",
        answer:
          "Nee. Een logo kan deel zijn van de service, maar we kunnen ook een volledige identiteit, drukwerk, social media content, presentaties en reclamevisuals maken.",
      },
      {
        question: "Kan ik slechts enkele visuals vragen?",
        answer:
          "Ja. We kunnen werken aan een specifieke behoefte, zoals een flyer, affiche, carrousel of presentatie, zonder de volledige identiteit te herwerken.",
      },
      {
        question: "Kunnen jullie een bestaande identiteit moderniseren?",
        answer:
          "Ja. We behouden wat herkenbaar is en verbeteren wat duidelijkheid, samenhang of visuele kwaliteit mist.",
      },
      {
        question: "Zijn de bestanden geschikt voor print en web?",
        answer:
          "Ja. We bereiden formaten voor volgens het gebruik: social media, website, PDF, drukwerk, presentatie of andere materialen.",
      },
      {
        question: "Kunnen jullie visuals in meerdere talen maken?",
        answer:
          "Ja. We kunnen Franse, Engelse, Nederlandse of Kinyarwanda versies voorzien als de teksten beschikbaar zijn of als we ze samen voorbereiden.",
      },
      {
        question: "Helpen jullie ook met de boodschap in de visual?",
        answer:
          "Ja. Een visual moet een duidelijke boodschap dragen. We kunnen titels, calls to action en korte teksten verbeteren zodat het materiaal sterker werkt.",
      },
    ],
  },
  kiny: {
    eyebrow: "Design na visual identity",
    title: "Duha brand yawe isura isobanutse kandi yibukwa.",
    intro:
      "Logo, visual identity, posters, flyers, posts za social media, presentations n'ibikoresho bya publicity: dukora visuals zituma brand yawe imenyekana kandi yumvikana vuba.",
    primary: "Kurema visual identity",
    secondary: "Gutangira project",
    promises: [
      "Logo na style bihuye",
      "Supports za professional",
      "Visuals za social media",
      "Brand imenyekana kurusha",
    ],
    imageBriefs: [
      {
        label: "Ishusho nyamukuru",
        title: "Brand universe ihuye",
        description:
          "Ishusho yerekana moodboard ya brand ifite logo, colors, typography, business card, poster na mobile screen. Style moderne, premium, dark blue na CP yellow. Amagambo ahindurwe mu rurimi rwa page.",
      },
      {
        label: "Supports",
        title: "Ibikoresho biteguye gupublishwa",
        description:
          "Ishusho yerekana flyers, posters, Instagram posts, web banner na presentation bifite visual identity imwe. Yerekane coherence hagati ya print na digital.",
      },
      {
        label: "Application",
        title: "Brand igaragara kimwe ahantu hose",
        description:
          "Ishusho yerekana identity imwe ikoreshwa kuri social media, website, packaging, PDF document, email signature na local event.",
      },
    ],
    whyEyebrow: "Impamvu bifite akamaro",
    whyTitle: "Mbere yo gusoma message yawe, abantu babanza kubona image yawe.",
    whyText:
      "Design nziza ifasha public yawe kukumenya, kugufata serious no kumva vuba ibyo utanga. Intego si ubwiza gusa, ni ugutuma communication yawe isobanuka, yizerwa kandi yibukwa.",
    worksEyebrow: "Icyo design igomba gukora",
    worksTitle: "Buri visual igomba kugira uruhare rwayo.",
    worksText:
      "Visual identity ikomeye si logo gusa. Iyobora ibyo abantu bakubonaho: posts, documents, posters, pages, presentations na ads.",
    works: [
      {
        title: "Kumenyekana",
        text: "Gukora style abantu bahita bahuza na brand yawe.",
      },
      {
        title: "Gusobanura",
        text: "Guhindura offers, messages cyangwa steps visuals zoroshye kumva.",
      },
      {
        title: "Gutanga icyizere",
        text: "Kuguha isura ya professional yubaka icyizere mbere ya contact.",
      },
      {
        title: "Gupromota",
        text: "Gukora supports zikurura attention kuri services, events cyangwa campaigns.",
      },
    ],
    packsEyebrow: "Ibyo dushobora gukora",
    packsTitle: "Duhuza design n'ibyo communication yawe ikeneye koko.",
    packs: [
      {
        title: "Brand identity",
        text: "Logo, palette, typography, graphic style, versions na usage guide yoroshye.",
      },
      {
        title: "Commercial supports",
        text: "Flyers, posters, cards, brochures, menus, catalogs, PDF documents na presentations.",
      },
      {
        title: "Social media content",
        text: "Post templates, stories, banners, carousels, ads na campaign visuals.",
      },
    ],
    deliverEyebrow: "Ibyo dutanga",
    deliverTitle: "Files zikoreshwa, si ishusho nziza gusa.",
    deliverText:
      "Intego ni uko ukoresha identity na supports zawe kuri channels za communication.",
    deliver: [
      "Logo cyangwa graphic elements mu formats zikwiye.",
      "Color palette, fonts na rules zo gukoresha.",
      "Visuals ziteguye print cyangwa digital publishing.",
      "Versions zihuye n'indimi na formats zikenewe.",
      "Templates zongera gukoreshwa kugira ngo communication igume cohérent.",
      "Inama zoroshye zo gukoresha visuals utangije identity.",
    ],
    methodEyebrow: "Uko dukora",
    methodTitle: "Gusobanura, gukora design, kuyikoresha, gutanga files.",
    methodText:
      "Dutangirira kuri message yawe na public yawe. Hanyuma dukora visual style ihuye, tukayishyira kuri supports zifite agaciro ku kazi kawe.",
    steps: [
      "Kumva brand, public n'intego zawe.",
      "Guhitamo direction ya visual: colors, mood na style.",
      "Gukora visuals za mbere no kuzikosora dukurikije feedback.",
      "Gushyira design kuri supports z'ingenzi.",
      "Gutanga files zisukuye na versions zikenewe.",
    ],
    faqTitle: "Ibibazo bikunze kubazwa",
    faqs: [
      {
        question: "Mukora logos gusa?",
        answer:
          "Oya. Logo ishobora kuba igice cya service, ariko dushobora no gukora identity yuzuye, print materials, social media content, presentations na advertising visuals.",
      },
      {
        question: "Nshobora gusaba visuals nke gusa?",
        answer:
          "Yego. Dushobora gukora ikintu kimwe gikenewe, nko flyer, poster, carousel cyangwa presentation, tutongeye gukora identity yose.",
      },
      {
        question: "Mushobora kuvugurura identity isanzwe?",
        answer:
          "Yego. Dukomeza ibimenyekana, tugakosora ibibura clarity, coherence cyangwa visual quality.",
      },
      {
        question: "Files zizakoreshwa kuri print na web?",
        answer:
          "Yego. Dutegura formats bitewe n'uko bizakoreshwa: social media, website, PDF, print, presentation cyangwa izindi supports.",
      },
      {
        question: "Mushobora gukora visuals mu ndimi nyinshi?",
        answer:
          "Yego. Dushobora gutegura versions za French, English, Dutch cyangwa Kinyarwanda niba texts zihari cyangwa tuzitegura hamwe.",
      },
      {
        question: "Mufasha no kuri message iri muri visual?",
        answer:
          "Yego. Visual igomba gutwara message isobanutse. Dushobora kunoza titles, calls to action na texts ngufi kugira ngo support ikore neza.",
      },
    ],
  },
};

const workIcons = [FaEye, FaDraftingCompass, FaLayerGroup, FaBullhorn];

const serviceImages: Record<string, string[]> = {
  fr: [brandUniverseFr, publishReadyFr, recognizableBrandFr],
  en: [brandUniverseEn, publishReadyEn, recognizableBrandEn],
  nl: [brandUniverseNl, publishReadyNl, recognizableBrandNl],
  kiny: [brandUniverseEn, publishReadyEn, recognizableBrandEn],
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
const GraphicDesign = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = copies[locale] ?? copies.en;
  const images = serviceImages[locale] ?? serviceImages.en;
  const startPath = `${buildLocalLocalePath(market, locale, "/start-project")}?service=creative`;
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
                <FaPalette className="flex-none" />
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
          <SectionLabel>{copy.worksEyebrow}</SectionLabel>
          <div className="max-w-5xl">
            <h2 className="max-w-full break-words font-['Black_Ops_One'] text-4xl leading-tight text-white [overflow-wrap:anywhere] phone:text-5xl laptop:text-6xl">
              {copy.worksTitle}
            </h2>
            <p className="mt-5 text-base font-black leading-8 text-white/90 phone:text-lg">
              {copy.worksText}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 tablet:gap-5 laptop:grid-cols-4">
            {copy.works.map((item, index) => {
              const Icon = workIcons[index] ?? FaEye;

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
            <SectionLabel>{copy.packsEyebrow}</SectionLabel>
            <h2 className="max-w-full break-words font-['Black_Ops_One'] text-4xl leading-tight text-white [overflow-wrap:anywhere] phone:text-5xl">
              {copy.packsTitle}
            </h2>
            <div className="mt-7 grid gap-3 tablet:gap-5">
              {copy.packs.map((pack) => (
                <article
                  key={pack.title}
                  className="rounded-[1.1rem] border border-[#EEBA2B]/40 bg-[#071a33]/80 p-4 backdrop-blur-sm phone:p-5 laptop:rounded-[1.4rem] laptop:p-6"
                >
                  <h3 className="text-xl font-black leading-tight text-[#fff200] laptop:text-2xl">
                    {pack.title}
                  </h3>
                  <p className="mt-2 text-xs font-black leading-6 text-white/85 phone:text-sm laptop:mt-3 laptop:text-base laptop:leading-7">
                    {pack.text}
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

export default GraphicDesign;
