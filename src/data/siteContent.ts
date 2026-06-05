import { ServiceCode } from "./services";

export type ContentLocale = "fr";

export type Cta = {
  label: string;
  href: string;
};

export type ContentBlock = {
  title: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HomeContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    trustLine: string;
  };
  problem: {
    title: string;
    body: string;
    examples: string[];
  };
  approach: {
    title: string;
    body: string;
    pillars: ContentBlock[];
  };
  audiencePaths: Array<{
    title: string;
    body: string;
    cta: Cta;
  }>;
  audit: {
    title: string;
    body: string;
    checks: string[];
    cta: Cta;
  };
  localAdaptation: {
    title: string;
    body: string;
    examples: string[];
  };
  faqs: FaqItem[];
  finalCta: {
    title: string;
    body: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
};

export type ServicePageContent = {
  code: ServiceCode;
  metadata: {
    title: string;
    description: string;
  };
  slug: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  problem: ContentBlock & {
    examples?: string[];
  };
  approach: ContentBlock;
  deliverables: string[];
  benefits: ContentBlock[];
  process: ContentBlock[];
  faqs: FaqItem[];
  finalCta: {
    title: string;
    body: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
  };
};

export type AuditToolContent = {
  metadata: {
    title: string;
    description: string;
  };
  slug: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: Cta;
    microcopy: string;
  };
  form: {
    fields: string[];
    businessTypes: string[];
  };
  checks: ContentBlock[];
  scoreLevels: Array<{
    range: string;
    label: string;
  }>;
  finalCta: {
    title: string;
    body: string;
    primaryCta: Cta;
  };
};

export const homeContentFr: HomeContent = {
  metadata: {
    title: "Creativa Poeta | Visibilite digitale pour Google, maps et moteurs IA",
    description:
      "Creativa Poeta aide les entreprises a etre trouvees, comprises et recommandees dans Google, les maps, les recherches vocales et les moteurs IA.",
  },
  hero: {
    eyebrow: "Sites, Google Maps et visibilite dans les moteurs IA",
    title: "Soyez visible la ou vos clients cherchent maintenant.",
    body:
      "Creativa Poeta aide votre entreprise a etre trouvee, comprise et recommandee dans Google, les maps, les recherches vocales et les moteurs IA. Nous construisons des sites clairs, des presences locales coherentes et des contenus utiles pour que vos clients sachent qui vous etes, ce que vous proposez et pourquoi vous contacter.",
    primaryCta: {
      label: "Tester ma visibilite",
      href: "/audit-visibilite-ia",
    },
    secondaryCta: {
      label: "Voir nos services",
      href: "/services",
    },
    trustLine:
      "Pour les entreprises qui veulent etre plus faciles a trouver, comprendre et contacter.",
  },
  problem: {
    title: "Vos clients ne cherchent plus comme avant.",
    body:
      "Aujourd'hui, un client peut vous chercher sur Google, demander une recommandation a un assistant vocal, regarder Google Maps, comparer des avis, visiter Instagram ou poser une question a une IA. Si vos informations sont dispersees, contradictoires ou difficiles a comprendre, vous pouvez etre invisible au moment precis ou le client a besoin de vous.",
    examples: [
      "Quelle agence peut refaire mon site pour etre visible dans Google et les moteurs IA ?",
      "Quel service proche de moi est ouvert maintenant ?",
      "Quelle entreprise parle francais et neerlandais ?",
      "Qui peut m'aider a etre visible dans Google Maps, Apple Maps et ChatGPT ?",
    ],
  },
  approach: {
    title: "Nous alignons votre site, vos profils locaux et vos contenus.",
    body:
      "Votre presence digitale doit etre claire partout. Votre site explique votre offre. Vos profils locaux aident les clients a vous trouver. Vos reseaux sociaux montrent votre activite. Vos contenus repondent aux questions.",
    pillars: [
      {
        title: "Une source officielle claire",
        body:
          "Un site ou une page officielle qui presente vos services, vos contacts, vos langues, vos zones et vos reponses importantes.",
      },
      {
        title: "Une presence locale coherente",
        body:
          "Des informations fiables sur Google, Apple Maps, Bing Maps et les plateformes que vos clients utilisent.",
      },
      {
        title: "Des reponses utiles",
        body:
          "Des contenus simples qui repondent aux vraies questions de vos clients avant qu'ils vous contactent.",
      },
      {
        title: "Une base prete a grandir",
        body:
          "Une structure qui peut s'adapter a plusieurs langues, regions, services et offres sans refaire tout le travail.",
      },
    ],
  },
  audiencePaths: [
    {
      title: "Vous avez deja un site",
      body:
        "Nous analysons ce qui bloque votre visibilite, puis nous refondons votre site pour qu'il soit plus clair, plus rapide et mieux relie a vos profils locaux.",
      cta: {
        label: "Refondre mon site",
        href: "/services/sites-web-prets-pour-ia",
      },
    },
    {
      title: "Vous n'avez pas encore de site",
      body:
        "Nous pouvons commencer par une page officielle simple qui presente vos services, relie vos profils et permet aux clients de vous contacter.",
      cta: {
        label: "Creer ma page officielle",
        href: "/services/sites-web-prets-pour-ia",
      },
    },
    {
      title: "Vous voulez toucher plusieurs langues ou regions",
      body:
        "Nous preparons une structure qui peut s'adapter a plusieurs langues, regions ou publics sans refaire tout le travail.",
      cta: {
        label: "Adapter ma presence",
        href: "/services/visibilite-ia-recherche-locale",
      },
    },
  ],
  audit: {
    title: "Commencez par savoir ou vous en etes.",
    body:
      "Notre audit de visibilite IA donne une premiere lecture de votre presence actuelle. Il montre si vos informations sont claires, coherentes et faciles a comprendre par les clients, les maps et les moteurs modernes.",
    checks: [
      "votre site ou votre profil principal",
      "vos informations essentielles",
      "vos profils locaux",
      "vos reponses aux questions clients",
      "votre coherence entre les plateformes",
    ],
    cta: {
      label: "Lancer mon audit gratuit",
      href: "/audit-visibilite-ia",
    },
  },
  localAdaptation: {
    title: "Une presence adaptee au contexte de vos clients.",
    body:
      "Les clients ne cherchent pas toujours avec les memes mots, les memes langues ou les memes habitudes. Selon le contexte, il peut etre utile d'adapter vos pages, vos profils, vos informations et vos contenus.",
    examples: [
      "langue du client",
      "zone desservie",
      "devise ou fourchette de prix",
      "adresse ou contact local",
      "exemples adaptes au public",
      "plateformes locales importantes",
    ],
  },
  faqs: [
    {
      question: "Est-ce que j'ai besoin d'un site si j'ai deja Google Maps ou Instagram ?",
      answer:
        "Oui, si vous voulez une base officielle que vous controlez. Google Maps et Instagram sont utiles, mais un site clair rassemble vos informations importantes et les rend plus faciles a verifier.",
    },
    {
      question: "Est-ce que vous pouvez commencer petit ?",
      answer:
        "Oui. Nous pouvons commencer par une page officielle, un audit ou une optimisation de vos profils locaux, puis construire un site complet plus tard.",
    },
    {
      question: "Est-ce que vous garantissez une premiere position sur Google ?",
      answer:
        "Non. Nous ne promettons pas de miracle. Nous mettons en place les fondations qui augmentent vos chances d'etre trouve, compris et contacte.",
    },
  ],
  finalCta: {
    title: "Votre entreprise est-elle prete pour la nouvelle recherche ?",
    body:
      "Testez votre presence actuelle et decouvrez les premieres ameliorations possibles.",
    primaryCta: {
      label: "Tester ma visibilite",
      href: "/audit-visibilite-ia",
    },
    secondaryCta: {
      label: "Parler a Creativa Poeta",
      href: "/contact",
    },
  },
};

export const auditToolContentFr: AuditToolContent = {
  metadata: {
    title: "Audit de Visibilite IA | Creativa Poeta",
    description:
      "Testez si votre entreprise est facile a trouver et a comprendre par Google, les maps, les assistants vocaux et les moteurs IA.",
  },
  slug: "/audit-visibilite-ia",
  hero: {
    eyebrow: "Diagnostic gratuit",
    title: "Votre entreprise est-elle vraiment visible pour les moteurs IA ?",
    body:
      "Entrez votre site, votre page Google Maps ou votre profil principal. Nous analysons les premiers signaux qui aident Google, les maps, les recherches vocales et les assistants IA a comprendre votre entreprise.",
    primaryCta: {
      label: "Lancer mon audit",
      href: "#audit-form",
    },
    microcopy:
      "L'audit donne une premiere lecture rapide. Pour un diagnostic complet, notre equipe peut analyser votre presence en detail.",
  },
  form: {
    fields: [
      "Adresse du site ou profil principal",
      "Pays ou vous voulez etre visible",
      "Langue principale de vos clients",
      "Type d'entreprise",
      "Email pour recevoir le resultat",
    ],
    businessTypes: [
      "commerce local",
      "restaurant ou horeca",
      "service professionnel",
      "sante ou bien-etre",
      "agence ou consultant",
      "e-commerce",
      "autre",
    ],
  },
  checks: [
    {
      title: "Votre presence officielle",
      body: "Nous regardons si votre entreprise a une base claire: site, page officielle ou profil principal.",
    },
    {
      title: "Vos informations essentielles",
      body:
        "Nous verifions si le nom, les services, le pays, la langue, les contacts, les horaires et les zones desservies sont faciles a comprendre.",
    },
    {
      title: "Vos profils locaux",
      body:
        "Nous regardons si Google Maps, Apple Maps ou Bing Maps peuvent s'appuyer sur des informations coherentes.",
    },
  ],
  scoreLevels: [
    {
      range: "0-3",
      label: "difficile a comprendre",
    },
    {
      range: "4-6",
      label: "visible mais incomplet",
    },
    {
      range: "7-8",
      label: "bonne base",
    },
    {
      range: "9-10",
      label: "tres bonne base",
    },
  ],
  finalCta: {
    title: "Commencez par savoir ou vous en etes.",
    body:
      "En quelques informations, vous obtenez une premiere lecture de votre visibilite actuelle et des points a ameliorer en priorite.",
    primaryCta: {
      label: "Lancer mon audit",
      href: "#audit-form",
    },
  },
};

export const servicePageContentFr: Record<ServiceCode, ServicePageContent> = {
  "ai-visibility": {
    code: "ai-visibility",
    metadata: {
      title: "Visibilite IA & Recherche Locale | Creativa Poeta",
      description:
        "Rendez votre entreprise visible dans Google, ChatGPT, Siri, Apple Maps, Bing et les moteurs IA grace a une strategie locale, technique et structuree.",
    },
    slug: "/services/visibilite-ia-recherche-locale",
    hero: {
      eyebrow: "Visibilite sur Google, les maps et les moteurs IA",
      title: "Soyez visible la ou vos clients cherchent maintenant.",
      body:
        "Vos clients ne cherchent plus seulement sur Google. Ils demandent a ChatGPT, Perplexity, Siri, Apple Maps, Bing, Google Maps et aux nouveaux moteurs IA de leur recommander une entreprise proche, fiable et adaptee a leur besoin. Creativa Poeta configure votre presence digitale pour que votre entreprise soit plus facile a trouver, comprendre et recommander.",
      primaryCta: {
        label: "Demander un audit de visibilite IA",
        href: "/audit-visibilite-ia",
      },
      secondaryCta: {
        label: "Voir comment ca fonctionne",
        href: "#process",
      },
    },
    problem: {
      title: "Etre visible sur Google ne suffit plus.",
      body:
        "Les clients posent des questions plus precises, souvent par voix ou via une IA. Si vos informations sont incompletes, mal structurees, incoherentes ou invisibles sur les bonnes plateformes, les moteurs modernes risquent de ne pas vous proposer.",
      examples: [
        "Quel service proche de moi est ouvert maintenant ?",
        "Quelle agence peut m'aider a apparaitre dans Apple Maps et Google Maps ?",
        "Quel prestataire peut rendre mon site plus visible dans Google et ChatGPT ?",
      ],
    },
    approach: {
      title: "Nous structurons votre presence pour les humains, les moteurs et les IA.",
      body:
        "Creativa Poeta met en place une base de visibilite locale et IA: site lisible, informations claires, profils locaux, contenus sous forme de reponses, coherence des donnees et signaux de confiance.",
    },
    deliverables: [
      "audit de visibilite IA et locale",
      "rapport des blocages prioritaires",
      "plan de correction",
      "optimisation des profils Google, Apple et Bing",
      "questions et reponses pretes a integrer",
      "checklist de coherence des informations",
    ],
    benefits: [
      {
        title: "Etre plus facile a comprendre",
        body:
          "Les moteurs modernes doivent comprendre rapidement votre activite, vos services, votre zone, vos horaires et vos contacts.",
      },
      {
        title: "Etre plus coherent partout",
        body:
          "Quand vos informations sont identiques sur votre site, Google, Apple, Bing et vos profils, les moteurs ont plus de signaux de confiance.",
      },
      {
        title: "Generer des demandes plus qualifiees",
        body:
          "Un client qui vous trouve via une recherche precise comprend deja mieux ce que vous faites et pourquoi vous etes pertinent.",
      },
    ],
    process: [
      {
        title: "Audit",
        body:
          "Nous analysons votre site, vos profils locaux, vos contenus, votre structure et vos donnees existantes.",
      },
      {
        title: "Strategie",
        body:
          "Nous definissons les langues, plateformes, services prioritaires et questions clients a cibler.",
      },
      {
        title: "Implementation",
        body:
          "Nous mettons en place les corrections, les profils locaux et les contenus prioritaires.",
      },
      {
        title: "Mesure",
        body:
          "Nous suivons les resultats, les demandes, les erreurs et les opportunites d'amelioration.",
      },
    ],
    faqs: [
      {
        question: "Qu'est-ce que la visibilite IA ?",
        answer:
          "C'est la capacite d'une entreprise a etre trouvee, comprise et recommandee par les moteurs de recherche, les maps et les assistants IA.",
      },
      {
        question: "Est-ce que vous garantissez que ChatGPT va recommander mon entreprise ?",
        answer:
          "Non. Personne ne peut le garantir. Nous mettons en place les fondations qui augmentent vos chances d'etre trouve, compris et cite.",
      },
      {
        question: "Est-ce que Google Business Profile suffit ?",
        answer:
          "Non. C'est important, mais il doit etre coherent avec votre site, vos services, vos avis et vos autres profils.",
      },
    ],
    finalCta: {
      title: "Votre entreprise est-elle prete pour la recherche IA ?",
      body:
        "Commencez par un audit. Nous identifions ce qui bloque votre visibilite dans Google, les maps, les recherches vocales et les moteurs IA.",
      primaryCta: {
        label: "Lancer mon audit de visibilite IA",
        href: "/audit-visibilite-ia",
      },
    },
  },
  "ai-ready-websites": {
    code: "ai-ready-websites",
    metadata: {
      title: "Sites Web Prets pour l'IA | Creativa Poeta",
      description:
        "Construisez ou refondez un site rapide, clair et utile aux clients comme aux moteurs de recherche, aux maps et aux assistants IA.",
    },
    slug: "/services/sites-web-prets-pour-ia",
    hero: {
      eyebrow: "Site vitrine moderne, clair et lisible par les moteurs",
      title: "Votre site doit devenir la source officielle de votre entreprise.",
      body:
        "Un site web ne sert plus seulement a presenter une entreprise. Il sert aussi de base fiable pour expliquer qui vous etes, ce que vous proposez, ou vous travaillez et comment vous contacter.",
      primaryCta: {
        label: "Demander une refonte",
        href: "/contact",
      },
      secondaryCta: {
        label: "Tester la visibilite de mon site",
        href: "/audit-visibilite-ia",
      },
    },
    problem: {
      title: "Beaucoup d'entreprises sont visibles, mais pas vraiment comprises.",
      body:
        "Certaines entreprises n'ont pas de site et comptent sur Google Maps, Facebook, Instagram ou WhatsApp. D'autres ont deja un site, mais il est ancien, lent, incomplet ou difficile a comprendre. Dans les deux cas, les informations importantes sont dispersees.",
    },
    approach: {
      title: "Le site n'est pas mort. Son role a change.",
      body:
        "Vos reseaux montrent votre activite. Vos profils locaux aident les clients a vous trouver. Votre site doit servir de reference officielle: il rassemble vos services, vos informations, vos questions frequentes, vos langues, vos zones et vos preuves de confiance.",
    },
    deliverables: [
      "site vitrine ou mini-site",
      "pages services",
      "textes clairs et reutilisables",
      "formulaire de contact",
      "integration des profils sociaux et locaux",
      "base evolutive pour ajouter d'autres langues ou services",
    ],
    benefits: [
      {
        title: "Plus de clarte",
        body:
          "Les clients comprennent plus vite ce que vous faites et pourquoi ils devraient vous contacter.",
      },
      {
        title: "Plus de coherence",
        body:
          "Votre site, vos maps et vos reseaux sociaux affichent les memes informations importantes.",
      },
      {
        title: "Plus d'evolutivite",
        body:
          "Votre site peut grandir avec votre entreprise: nouvelles langues, regions, services ou formulaires.",
      },
    ],
    process: [
      {
        title: "Clarifier",
        body:
          "Nous identifions vos services, vos publics, vos langues et les informations qui doivent etre fiables partout.",
      },
      {
        title: "Structurer",
        body:
          "Nous organisons les pages pour que chaque information importante ait sa place.",
      },
      {
        title: "Construire",
        body:
          "Nous creons un site rapide, clair et adapte a vos besoins actuels.",
      },
      {
        title: "Relier",
        body:
          "Nous connectons le site a vos profils Google, Apple, Bing et reseaux sociaux.",
      },
    ],
    faqs: [
      {
        question: "Ai-je encore besoin d'un site si j'ai deja Google Maps et Instagram ?",
        answer:
          "Oui, si vous voulez une source officielle stable. Google Maps et Instagram sont importants, mais ils ne remplacent pas un espace que vous controlez.",
      },
      {
        question: "Est-ce qu'un petit site suffit ?",
        answer:
          "Oui, pour commencer. Une page officielle claire peut deja presenter vos services, contacts, horaires, zones et liens importants.",
      },
    ],
    finalCta: {
      title: "Votre presence digitale a besoin d'une base fiable.",
      body:
        "Que vous ayez deja un site ou non, nous pouvons construire une base claire pour vos clients, vos recherches locales et les moteurs IA.",
      primaryCta: {
        label: "Parler de mon projet",
        href: "/contact",
      },
    },
  },
  "brand-content": {
    code: "brand-content",
    metadata: {
      title: "Marque, Contenu & Systemes Creatifs | Creativa Poeta",
      description:
        "Clarifiez votre message, votre image et vos contenus pour que vos clients comprennent mieux votre entreprise et vous fassent confiance plus vite.",
    },
    slug: "/services/marque-contenu-systemes-creatifs",
    hero: {
      eyebrow: "Message, image et contenus",
      title: "Une entreprise visible doit d'abord etre claire.",
      body:
        "Avant de convaincre Google, les maps, les reseaux ou les moteurs IA, votre entreprise doit etre facile a comprendre pour une personne reelle.",
      primaryCta: {
        label: "Clarifier ma marque",
        href: "/contact",
      },
      secondaryCta: {
        label: "Voir nos services creatifs",
        href: "/services",
      },
    },
    problem: {
      title: "Beaucoup d'entreprises ont de la valeur, mais l'expliquent mal.",
      body:
        "Le probleme n'est pas toujours le service. Souvent, le probleme est la facon de le presenter: mots trop vagues, visuels incoherents, offres mal organisees ou messages differents selon les plateformes.",
    },
    approach: {
      title: "Nous transformons votre expertise en message clair.",
      body:
        "Nous partons de ce que vous faites vraiment, de vos clients, de vos services et de votre difference. Ensuite, nous construisons un systeme simple: mots, visuels, pages, contenus et reponses.",
    },
    deliverables: [
      "message principal de marque",
      "description courte de l'entreprise",
      "textes de pages principales",
      "descriptions de services",
      "FAQ clients",
      "kit visuel ou direction artistique",
      "modeles de contenus pour reseaux",
    ],
    benefits: [
      {
        title: "Etre compris plus vite",
        body:
          "Un message clair evite au client de chercher trop longtemps ce que vous faites.",
      },
      {
        title: "Inspirer plus confiance",
        body:
          "Une image coherente et des textes propres donnent une impression plus professionnelle.",
      },
      {
        title: "Alimenter votre visibilite",
        body:
          "Des contenus clairs peuvent etre reutilises sur votre site, vos profils locaux, vos reseaux sociaux et vos campagnes.",
      },
    ],
    process: [
      {
        title: "Comprendre",
        body: "Nous ecoutons votre histoire, vos objectifs, vos clients et vos services.",
      },
      {
        title: "Clarifier",
        body: "Nous organisons vos offres, votre message et vos priorites.",
      },
      {
        title: "Creer",
        body: "Nous produisons les textes, visuels et contenus necessaires.",
      },
      {
        title: "Harmoniser",
        body:
          "Nous adaptons les contenus pour votre site, vos reseaux, vos profils locaux et vos supports.",
      },
    ],
    faqs: [
      {
        question: "Est-ce que le branding aide vraiment la visibilite ?",
        answer:
          "Oui. Une marque claire aide les clients a comprendre et retenir votre entreprise. Elle facilite aussi la coherence entre votre site, vos profils locaux et vos contenus.",
      },
      {
        question: "Est-ce que vous creez aussi les textes ?",
        answer:
          "Oui. Nous pouvons ecrire les textes du site, les descriptions de services, les questions frequentes et les contenus de base.",
      },
    ],
    finalCta: {
      title: "Votre entreprise merite un message plus clair.",
      body:
        "Nous vous aidons a transformer vos idees, vos services et votre expertise en une presence coherente, visible et professionnelle.",
      primaryCta: {
        label: "Clarifier ma marque",
        href: "/contact",
      },
      secondaryCta: {
        label: "Parler a Creativa Poeta",
        href: "/contact",
      },
    },
  },
  "programmatic-growth": {
    code: "programmatic-growth",
    metadata: {
      title: "Croissance Programmatique | Creativa Poeta",
      description:
        "Creez des pages utiles et ciblees pour repondre a beaucoup de recherches precises sans produire du contenu faible ou repetitif.",
    },
    slug: "/services/croissance-programmatique",
    hero: {
      eyebrow: "Contenu utile a grande echelle",
      title: "Repondez a plus de recherches sans refaire le meme travail.",
      body:
        "Vos clients ne cherchent pas tous la meme chose. Creativa Poeta construit des systemes de pages utiles pour couvrir ces recherches de facon claire, controlee et durable.",
      primaryCta: {
        label: "Construire ma strategie de contenu",
        href: "/contact",
      },
      secondaryCta: {
        label: "Voir si ce service me convient",
        href: "/audit-visibilite-ia",
      },
    },
    problem: {
      title: "Une seule page ne peut pas repondre a toutes les recherches.",
      body:
        "Une entreprise peut proposer plusieurs services, travailler dans plusieurs zones, parler plusieurs langues ou servir plusieurs types de clients. Beaucoup de sites essaient pourtant de tout expliquer sur quelques pages seulement.",
    },
    approach: {
      title: "Nous creons un systeme, pas une pile de pages au hasard.",
      body:
        "Le but n'est pas de publier beaucoup pour publier beaucoup. Le but est de repondre clairement a beaucoup de recherches reelles avec des pages utiles et controlees.",
    },
    deliverables: [
      "liste des opportunites de recherche",
      "liste des pages prioritaires",
      "structure de pages",
      "textes sources",
      "modeles reutilisables",
      "plan de liens entre les pages",
      "checklist qualite",
    ],
    benefits: [
      {
        title: "Capter des recherches plus precises",
        body:
          "Les recherches precises ont souvent moins de concurrence et une intention plus claire.",
      },
      {
        title: "Eviter le contenu inutile",
        body:
          "Chaque page est construite pour repondre a un besoin, pas pour remplir le site.",
      },
      {
        title: "Preparer l'expansion",
        body:
          "La meme base peut s'adapter a de nouvelles langues, regions, services ou secteurs.",
      },
    ],
    process: [
      {
        title: "Selectionner",
        body: "Nous choisissons les recherches et les pages qui valent vraiment la peine.",
      },
      {
        title: "Structurer",
        body:
          "Nous definissons les modeles, les contenus communs et les differences importantes entre les pages.",
      },
      {
        title: "Produire",
        body:
          "Nous creons les premieres pages et validons leur qualite avant d'aller plus loin.",
      },
      {
        title: "Mesurer",
        body:
          "Nous suivons les pages, les visites, les demandes et les opportunites d'amelioration.",
      },
    ],
    faqs: [
      {
        question: "Qu'est-ce que la croissance programmatique ?",
        answer:
          "C'est une methode qui permet de creer plusieurs pages utiles a partir d'une structure commune, pour repondre a des recherches precises sans tout refaire a la main.",
      },
      {
        question: "Est-ce risque pour Google ?",
        answer:
          "Ce qui est risque, c'est de publier beaucoup de pages faibles ou presque identiques. Une strategie propre privilegie la qualite, la clarte et l'utilite.",
      },
      {
        question: "Est-ce utile pour une petite entreprise ?",
        answer:
          "Parfois oui, mais pas toujours. Si votre offre est simple, il vaut mieux commencer par une page claire, vos profils locaux et un bon audit.",
      },
    ],
    finalCta: {
      title: "Vos clients posent des questions precises. Votre site doit pouvoir y repondre.",
      body:
        "Nous vous aidons a identifier les recherches utiles et a construire une structure de contenu claire, durable et evolutive.",
      primaryCta: {
        label: "Construire ma strategie de contenu",
        href: "/contact",
      },
      secondaryCta: {
        label: "Commencer par un audit",
        href: "/audit-visibilite-ia",
      },
    },
  },
};
