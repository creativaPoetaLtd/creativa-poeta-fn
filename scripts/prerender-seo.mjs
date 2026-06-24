import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const baseHtmlPath = path.join(distDir, "index.html");
const baseHtml = fs
  .readFileSync(baseHtmlPath, "utf8")
  .replace(/<div id="root">[\s\S]*?<\/body>/i, '<div id="root"></div>\n</body>');

const siteUrl = "https://creativapoeta.com";
const imageUrl = `${siteUrl}/poeta.jpeg`;
const generatedAt = new Date().toISOString().slice(0, 10);
const blogApiBase = (
  process.env.SEO_BLOG_API_URL ||
  process.env.VITE_API_BASE_URL ||
  "https://creativa-poeta-bn-phi.vercel.app"
).replace(/\/$/, "");
const maxBlogPages = Math.max(1, Number(process.env.SEO_MAX_BLOG_PAGES) || 20);

function normalizePublishedBlog(blog) {
  if (!blog || typeof blog !== "object" || !blog.slug || !blog.title) return null;
  const language = blog.language === "kiny" ? "rw" : blog.language || "fr";
  if (!['en', 'fr', 'nl', 'rw'].includes(language)) return null;
  return {
    ...blog,
    language,
    slug: String(blog.slug).replace(/^\/+|\/+$/g, ""),
    title: String(blog.title),
    excerpt: String(blog.excerpt || blog.seoDescription || ""),
    content: String(blog.content || ""),
    seoTitle: String(blog.seoTitle || blog.title).slice(0, 70),
    seoDescription: String(blog.seoDescription || blog.excerpt || "").slice(0, 180),
    tags: Array.isArray(blog.tags) ? blog.tags.map(String) : [],
  };
}

async function fetchPublishedBlogs() {
  if (process.env.SEO_FETCH_BLOGS === "false") return [];
  const blogs = [];
  try {
    for (let page = 1; page <= maxBlogPages; page += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8_000);
      let response;
      try {
        response = await fetch(`${blogApiBase}/api/blogs?limit=50&page=${page}`, {
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const pageBlogs = Array.isArray(payload) ? payload : payload.blogs || [];
      blogs.push(...pageBlogs.map(normalizePublishedBlog).filter(Boolean));
      const totalPages = Number(payload?.pagination?.pages) || 1;
      if (page >= totalPages || pageBlogs.length === 0) break;
    }
  } catch (error) {
    console.warn(
      `Blog pre-render skipped: ${error instanceof Error ? error.message : "API unavailable"}`
    );
    return [];
  }
  return blogs;
}

const publishedBlogs = await fetchPublishedBlogs();
const marketHosts = {
  global: {
    baseUrl: "https://creativapoeta.com",
    locales: ["en", "fr"],
    hreflang: {
      en: "en",
      fr: "fr",
    },
    countryCode: "Global",
    areaName: "International",
    brandSuffix: "",
  },
  be: {
    baseUrl: "https://be.creativapoeta.com",
    locales: ["fr", "nl"],
    hreflang: {
      fr: "fr-BE",
      nl: "nl-BE",
    },
    countryCode: "BE",
    areaName: "Belgique",
    brandSuffix: "Belgique",
  },
  fr: {
    baseUrl: "https://fr.creativapoeta.com",
    locales: ["fr"],
    hreflang: {
      fr: "fr-FR",
    },
    countryCode: "FR",
    areaName: "France",
    brandSuffix: "France",
  },
  rw: {
    baseUrl: "https://rw.creativapoeta.com",
    locales: ["rw", "fr", "en"],
    hreflang: {
      rw: "rw-RW",
      fr: "fr-RW",
      en: "en-RW",
    },
    countryCode: "RW",
    areaName: "Rwanda",
    brandSuffix: "Rwanda",
  },
  nl: {
    baseUrl: "https://nl.creativapoeta.com",
    locales: ["nl"],
    hreflang: {
      nl: "nl-NL",
    },
    countryCode: "NL",
    areaName: "Nederland",
    brandSuffix: "Nederland",
  },
};

const marketHomeMeta = {
  global: {
    en: {
      title: "Creativa Poeta | Be found where clients search",
      description:
        "Creativa Poeta helps businesses build a clear official presence for Google, maps, voice search and tools like ChatGPT.",
    },
    fr: {
      title: "Creativa Poeta | Visibilite digitale claire et utile",
      description:
        "Creativa Poeta aide les entreprises a etre trouvees, comprises et contactees via leur site, les maps, la recherche vocale et les moteurs IA.",
    },
  },
  be: {
    fr: {
      title: "Creativa Poeta Belgique | Visibilite locale en francais et neerlandais",
      description:
        "Creativa Poeta aide les entreprises en Belgique a clarifier leur site, leurs profils locaux, leurs maps et leurs reponses clients.",
    },
    nl: {
      title: "Creativa Poeta Belgie | Lokale zichtbaarheid in Frans en Nederlands",
      description:
        "Creativa Poeta helpt bedrijven in Belgie hun website, lokale profielen, maps en klantinformatie duidelijk en betrouwbaar te maken.",
    },
  },
  fr: {
    fr: {
      title: "Creativa Poeta France | Site clair, maps et visibilite moderne",
      description:
        "Creativa Poeta aide les entreprises en France a creer une presence officielle claire pour leur site, leurs maps et les recherches modernes.",
    },
  },
  rw: {
    rw: {
      title: "Creativa Poeta Rwanda | Garagara aho abakiriya bagushakira",
      description:
        "Creativa Poeta ifasha ubucuruzi mu Rwanda kugira amakuru asobanutse kuri website, maps, imbuga nkoranyambaga n'ibikoresho bya AI.",
    },
    fr: {
      title: "Creativa Poeta Rwanda | Site, maps et visibilite locale",
      description:
        "Creativa Poeta aide les entreprises au Rwanda a clarifier leur site, leurs profils locaux, leurs contacts et leurs reponses clients.",
    },
    en: {
      title: "Creativa Poeta Rwanda | Website, maps and local visibility",
      description:
        "Creativa Poeta helps businesses in Rwanda make their website, maps, profiles and contact information clear and easy to find.",
    },
  },
  nl: {
    nl: {
      title: "Creativa Poeta Nederland | Website, maps en moderne zichtbaarheid",
      description:
        "Creativa Poeta helpt bedrijven in Nederland hun website, maps, lokale profielen en klantinformatie duidelijker te maken.",
    },
  },
};

const marketServiceIntro = {
  global: {
    en: "Useful for companies that need one clear source of information for clients and modern search tools.",
    fr: "Utile pour les entreprises qui veulent une source officielle claire pour leurs clients et les moteurs modernes.",
  },
  be: {
    fr: "Adapte aux entreprises qui doivent etre comprises en Belgique, en francais et en neerlandais.",
    nl: "Aangepast voor bedrijven die in Belgie duidelijk willen zijn in het Frans en het Nederlands.",
  },
  fr: {
    fr: "Adapte aux entreprises qui veulent etre plus claires et mieux trouvees en France.",
  },
  rw: {
    rw: "Bikenewe ku bucuruzi bwo mu Rwanda bushaka gusobanuka no kuboneka neza.",
    fr: "Adapte aux entreprises au Rwanda qui veulent etre plus claires, visibles et faciles a contacter.",
    en: "Adapted for businesses in Rwanda that want to be clearer, easier to find and easier to contact.",
  },
  nl: {
    nl: "Aangepast voor bedrijven in Nederland die duidelijker en beter vindbaar willen zijn.",
  },
};

const languages = {
  en: {
    label: "English",
    prefix: "/en",
    homePath: "/",
    homeTitle: "Creativa Poeta | Be found where clients search",
    homeDescription:
      "Creativa Poeta helps businesses become easier to find, understand and contact by aligning websites, maps, social profiles and useful content.",
    problemTitle: "Clients no longer search in one place.",
    problem:
      "A client can search on Google, ask a voice assistant, check maps, compare reviews, visit social profiles or ask an AI tool. If your information is scattered or unclear, your business can be missed.",
    officialSourceTitle: "Your website becomes your official source.",
    officialSource:
      "Your website explains your services, contacts, questions, languages, zones and proofs of trust. Your maps and social profiles remain useful, but your website becomes the reference.",
    cta: "Test my visibility",
  },
  fr: {
    label: "Francais",
    prefix: "/fr",
    homePath: "/fr",
    homeTitle: "Creativa Poeta | Soyez visible la ou vos clients cherchent",
    homeDescription:
      "Creativa Poeta aide les entreprises a etre plus faciles a trouver, comprendre et contacter en alignant site, maps, profils sociaux et contenus utiles.",
    problemTitle: "Vos clients ne cherchent plus comme avant.",
    problem:
      "Un client peut vous chercher sur Google, demander une recommandation a un assistant vocal, regarder Google Maps, comparer des avis, visiter Instagram ou poser une question a une IA. Si vos informations sont dispersees ou peu claires, vous pouvez etre invisible au moment important.",
    officialSourceTitle: "Votre site devient votre source officielle.",
    officialSource:
      "Votre site explique vos services, vos contacts, vos questions frequentes, vos langues, vos zones et vos preuves de confiance. Les maps et les reseaux restent utiles, mais votre site devient la reference.",
    cta: "Tester ma visibilite",
  },
  nl: {
    label: "Nederlands",
    prefix: "/nl",
    homePath: "/nl",
    homeTitle: "Creativa Poeta | Word gevonden waar klanten zoeken",
    homeDescription:
      "Creativa Poeta helpt bedrijven makkelijker gevonden, begrepen en gecontacteerd te worden via website, maps, sociale profielen en duidelijke inhoud.",
    problemTitle: "Klanten zoeken niet meer op een plaats.",
    problem:
      "Een klant kan zoeken via Google, een spraakassistent, maps, reviews, sociale profielen of een AI-tool. Als uw informatie verspreid of onduidelijk is, kan uw bedrijf gemist worden.",
    officialSourceTitle: "Uw website wordt uw officiele bron.",
    officialSource:
      "Uw website legt uw diensten, contactgegevens, vragen, talen, regio's en vertrouwen uit. Maps en sociale profielen blijven nuttig, maar de website wordt de referentie.",
    cta: "Test mijn zichtbaarheid",
  },
  rw: {
    label: "Kinyarwanda",
    prefix: "/rw",
    homePath: "/rw",
    homeTitle: "Creativa Poeta | Garagara aho abakiriya bagushakira",
    homeDescription:
      "Creativa Poeta ifasha ubucuruzi gusobanuka no kuboneka neza kuri website, maps, imbuga nkoranyambaga n'ibisubizo bifasha abakiriya.",
    problemTitle: "Abakiriya ntibagishakira ahantu hamwe gusa.",
    problem:
      "Umukiriya ashobora kugushakira kuri Google, maps, imbuga nkoranyambaga cyangwa akabaza igikoresho cya AI. Niba amakuru yawe atatanye cyangwa adasobanutse, ushobora kutagaragara.",
    officialSourceTitle: "Website yawe iba isoko y'amakuru yizewe.",
    officialSource:
      "Website yawe isobanura serivisi, aho bakubariza, ibibazo bisanzwe, indimi, aho ukorera n'ibimenyetso bitanga icyizere. Maps n'imbuga nkoranyambaga birafasha, ariko website iba isoko nyamukuru.",
    cta: "Reba uko ugaragara",
  },
};

const richFrenchHome = {
  title: "Creativa Poeta | Visibilite digitale pour Google, maps et moteurs IA",
  description:
    "Creativa Poeta aide les entreprises a etre trouvees, comprises et recommandees dans Google, les maps, les recherches vocales et les moteurs IA.",
  sections: [
    [
      "Vos clients ne cherchent plus comme avant.",
      "Aujourd'hui, un client peut vous chercher sur Google, demander une recommandation a un assistant vocal, regarder Google Maps, comparer des avis, visiter Instagram ou poser une question a une IA. Si vos informations sont dispersees, contradictoires ou difficiles a comprendre, vous pouvez etre invisible au moment precis ou le client a besoin de vous.",
    ],
    [
      "Exemples de recherches qui doivent trouver votre entreprise",
      "Quelle agence peut refaire mon site pour etre visible dans Google et les moteurs IA ? Quel service proche de moi est ouvert maintenant ? Quelle entreprise parle francais et neerlandais ? Qui peut m'aider a etre visible dans Google Maps, Apple Maps et ChatGPT ?",
    ],
    [
      "Nous alignons votre site, vos profils locaux et vos contenus.",
      "Votre presence digitale doit etre claire partout. Votre site explique votre offre. Vos profils locaux aident les clients a vous trouver. Vos reseaux sociaux montrent votre activite. Vos contenus repondent aux questions.",
    ],
    [
      "Une source officielle claire",
      "Nous construisons un site ou une page officielle qui presente vos services, vos contacts, vos langues, vos zones, vos questions frequentes et vos reponses importantes.",
    ],
    [
      "Une presence locale coherente",
      "Vos informations doivent etre fiables sur Google, Apple Maps, Bing Maps et les plateformes que vos clients utilisent. Le but est que les maps, les reseaux sociaux et le site racontent la meme chose.",
    ],
    [
      "Avec ou sans site aujourd'hui",
      "Si vous avez deja un site, nous analysons ce qui bloque votre visibilite puis nous le refondons. Si vous n'avez pas encore de site, nous pouvons commencer par une page officielle simple qui presente vos services et permet aux clients de vous contacter.",
    ],
    [
      "Une base prete a grandir",
      "La structure peut s'adapter a plusieurs langues, regions, services et offres sans refaire tout le travail. C'est utile pour garder une base commune tout en adaptant certains details au public vise.",
    ],
    [
      "Commencez par savoir ou vous en etes",
      "Notre audit donne une premiere lecture de votre presence actuelle. Il montre si vos informations sont claires, coherentes et faciles a comprendre par les clients, les maps et les moteurs modernes.",
    ],
    [
      "Questions frequentes",
      "Est-ce que j'ai besoin d'un site si j'ai deja Google Maps ou Instagram ? Oui, si vous voulez une base officielle que vous controlez. Est-ce que vous garantissez une premiere position sur Google ? Non, personne ne peut le garantir serieusement. Nous mettons en place les fondations qui augmentent vos chances d'etre trouve, compris et contacte.",
    ],
  ],
};

const richFrenchServices = {
  webApp: {
    title: "Sites Web Prets pour l'IA | Creativa Poeta",
    description:
      "Construisez ou refondez un site rapide, clair et utile aux clients comme aux moteurs de recherche, aux maps et aux assistants IA.",
    sections: [
      [
        "Votre site doit devenir la source officielle de votre entreprise.",
        "Un site web ne sert plus seulement a presenter une entreprise. Il sert aussi de base fiable pour expliquer qui vous etes, ce que vous proposez, ou vous travaillez et comment vous contacter.",
      ],
      [
        "Beaucoup d'entreprises sont visibles, mais pas vraiment comprises.",
        "Certaines entreprises n'ont pas de site et comptent sur Google Maps, Facebook, Instagram ou WhatsApp. D'autres ont deja un site, mais il est ancien, lent, incomplet ou difficile a comprendre. Dans les deux cas, les informations importantes sont dispersees.",
      ],
      [
        "Le site n'est pas mort. Son role a change.",
        "Vos reseaux montrent votre activite. Vos profils locaux aident les clients a vous trouver. Votre site doit servir de reference officielle: il rassemble vos services, vos informations, vos questions frequentes, vos langues, vos zones et vos preuves de confiance.",
      ],
      [
        "Ce que nous livrons",
        "Site vitrine ou mini-site, pages services, textes clairs et reutilisables, formulaire de contact, integration des profils sociaux et locaux, base evolutive pour ajouter d'autres langues ou services.",
      ],
      [
        "Pourquoi c'est utile",
        "Les clients comprennent plus vite ce que vous faites. Votre site, vos maps et vos reseaux affichent les memes informations importantes. Votre presence peut grandir avec de nouvelles langues, regions, services ou formulaires.",
      ],
    ],
  },
  graphicDesign: {
    title: "Marque, Contenu & Systemes Creatifs | Creativa Poeta",
    description:
      "Clarifiez votre message, votre image et vos contenus pour que vos clients comprennent mieux votre entreprise et vous fassent confiance plus vite.",
    sections: [
      [
        "Une entreprise visible doit d'abord etre claire.",
        "Avant de convaincre Google, les maps, les reseaux ou les moteurs IA, votre entreprise doit etre facile a comprendre pour une personne reelle.",
      ],
      [
        "Beaucoup d'entreprises ont de la valeur, mais l'expliquent mal.",
        "Le probleme n'est pas toujours le service. Souvent, le probleme est la facon de le presenter: mots trop vagues, visuels incoherents, offres mal organisees ou messages differents selon les plateformes.",
      ],
      [
        "Nous transformons votre expertise en message clair.",
        "Nous partons de ce que vous faites vraiment, de vos clients, de vos services et de votre difference. Ensuite, nous construisons un systeme simple: mots, visuels, pages, contenus et reponses.",
      ],
      [
        "Ce que nous livrons",
        "Message principal de marque, description courte de l'entreprise, textes de pages principales, descriptions de services, FAQ clients, kit visuel ou direction artistique, modeles de contenus pour reseaux.",
      ],
      [
        "Pourquoi c'est utile",
        "Un message clair aide le client a comprendre plus vite. Une image coherente donne plus de confiance. Des contenus clairs peuvent etre reutilises sur votre site, vos profils locaux, vos reseaux et vos campagnes.",
      ],
    ],
  },
  digitalMarketing: {
    title: "Visibilite IA & Recherche Locale | Creativa Poeta",
    description:
      "Rendez votre entreprise visible dans Google, ChatGPT, Siri, Apple Maps, Bing et les moteurs IA grace a une strategie locale, technique et structuree.",
    sections: [
      [
        "Soyez visible la ou vos clients cherchent maintenant.",
        "Vos clients ne cherchent plus seulement sur Google. Ils demandent a ChatGPT, Perplexity, Siri, Apple Maps, Bing, Google Maps et aux nouveaux moteurs IA de leur recommander une entreprise proche, fiable et adaptee a leur besoin.",
      ],
      [
        "Etre visible sur Google ne suffit plus.",
        "Les clients posent des questions plus precises, souvent par voix ou via une IA. Si vos informations sont incompletes, mal structurees, incoherentes ou invisibles sur les bonnes plateformes, les moteurs modernes risquent de ne pas vous proposer.",
      ],
      [
        "Nous structurons votre presence pour les humains, les moteurs et les IA.",
        "Creativa Poeta met en place une base de visibilite locale et IA: site lisible, informations claires, profils locaux, contenus sous forme de reponses, coherence des donnees et signaux de confiance.",
      ],
      [
        "Ce que nous livrons",
        "Audit de visibilite IA et locale, rapport des blocages prioritaires, plan de correction, optimisation des profils Google, Apple et Bing, questions et reponses pretes a integrer, checklist de coherence.",
      ],
      [
        "Questions utiles",
        "Qu'est-ce que la visibilite IA ? C'est la capacite d'une entreprise a etre trouvee, comprise et recommandee par les moteurs de recherche, les maps et les assistants IA. Est-ce garanti ? Non, mais une bonne base augmente les chances d'etre trouve et compris.",
      ],
    ],
  },
  contentWriting: {
    title: "Croissance Programmatique | Creativa Poeta",
    description:
      "Creez des pages utiles et ciblees pour repondre a beaucoup de recherches precises sans produire du contenu faible ou repetitif.",
    sections: [
      [
        "Repondez a plus de recherches sans refaire le meme travail.",
        "Vos clients ne cherchent pas tous la meme chose. Creativa Poeta construit des systemes de pages utiles pour couvrir ces recherches de facon claire, controlee et durable.",
      ],
      [
        "Une seule page ne peut pas repondre a toutes les recherches.",
        "Une entreprise peut proposer plusieurs services, travailler dans plusieurs zones, parler plusieurs langues ou servir plusieurs types de clients. Beaucoup de sites essaient pourtant de tout expliquer sur quelques pages seulement.",
      ],
      [
        "Nous creons un systeme, pas une pile de pages au hasard.",
        "Le but n'est pas de publier beaucoup pour publier beaucoup. Le but est de repondre clairement a beaucoup de recherches reelles avec des pages utiles et controlees.",
      ],
      [
        "Ce que nous livrons",
        "Liste des opportunites de recherche, liste des pages prioritaires, structure de pages, textes sources, modeles reutilisables, plan de liens entre les pages et checklist qualite.",
      ],
      [
        "Pourquoi c'est utile",
        "Les recherches precises ont souvent moins de concurrence et une intention plus claire. Chaque page est construite pour repondre a un besoin, pas pour remplir le site.",
      ],
    ],
  },
};

const pageTemplates = {
  home: {
    path: "",
    title: (lang) => (lang === "fr" ? richFrenchHome.title : languages[lang].homeTitle),
    description: (lang) =>
      lang === "fr" ? richFrenchHome.description : languages[lang].homeDescription,
    keywords:
      "Creativa Poeta, business visibility, website, maps, Google, AI tools, local presence",
    sections: (lang) => lang === "fr" ? richFrenchHome.sections : [
      [languages[lang].problemTitle, languages[lang].problem],
      [languages[lang].officialSourceTitle, languages[lang].officialSource],
      [
        "What we align",
        "Your website, maps, social profiles, contact details, service pages and useful answers must tell the same clear story.",
      ],
      [
        "Visibility test",
        "We can check your current presence and show the first improvements before a full project starts.",
      ],
    ],
  },
  contact: {
    path: "/contact",
    title: () => "Contact Creativa Poeta",
    description: () =>
      "Contact Creativa Poeta to improve your website, local visibility, maps, social profiles and business content.",
    keywords:
      "contact Creativa Poeta, website help, local visibility help, business digital presence",
    sections: () => [
      [
        "Talk to Creativa Poeta",
        "Send your question, your website or your main profile. We will review the situation and explain the next useful step.",
      ],
    ],
  },
  startProject: {
    path: "/start-project",
    title: () => "Start your project | Creativa Poeta",
    description: () =>
      "Start a project with Creativa Poeta: website, official page, local visibility, content or platform alignment.",
    keywords:
      "start project, business website, local visibility, official page, Creativa Poeta",
    sections: () => [
      [
        "Start with the right base",
        "Tell us what you have today: website, maps, social profiles, content, languages and target area. We use that to prepare a clear project.",
      ],
    ],
  },
  terms: {
    path: "/terms-and-conditions",
    title: () => "Terms and conditions | Creativa Poeta",
    description: () =>
      "Read the terms and conditions for using Creativa Poeta services and website.",
    keywords: "Creativa Poeta terms, terms and conditions, service terms",
    sections: () => [
      [
        "Terms and conditions",
        "This page explains the conditions for using Creativa Poeta services and website.",
      ],
    ],
  },
  auditVisibility: {
    path: "/services/audit-visibilite",
    title: (lang) =>
      lang === "fr"
        ? "Audit de visibilite IA, Google et maps | Creativa Poeta"
        : lang === "nl"
          ? "Zichtbaarheidsaudit | Creativa Poeta"
          : lang === "rw"
            ? "Isuzuma ry'uko ugaragara | Creativa Poeta"
            : "AI, Google and maps visibility audit | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Analysez votre site, vos maps, vos profils locaux et vos informations publiques pour savoir si vos clients et les outils IA peuvent vous trouver, vous comprendre et vous recommander."
        : lang === "nl"
          ? "Laat uw website, maps, lokale profielen en publieke informatie controleren om te zien of klanten u makkelijk vinden en begrijpen."
          : lang === "rw"
            ? "Reba niba website, maps, imbuga ukoresha n'amakuru yawe bifasha abakiriya kukubona no kugusobanukirwa."
            : "Review your website, maps, local profiles and public information to see whether clients and AI tools can find, understand and recommend you.",
    keywords:
      "visibility audit, local visibility, Google Maps, voice search, AI tools, ChatGPT visibility, Creativa Poeta",
    sections: (lang) =>
      lang === "fr"
        ? [
            [
              "Votre presence est-elle claire partout ?",
              "Nous regardons votre site, vos maps, vos profils publics et vos informations importantes pour voir si un client peut comprendre rapidement qui vous etes, ce que vous proposez et comment vous contacter.",
            ],
            [
              "Ce que vous recevez",
              "Une lecture simple de vos blocages, les informations a harmoniser et une liste d'actions prioritaires avant de lancer une refonte ou un travail plus large.",
            ],
          ]
        : [
            [
              "Can clients understand your business?",
              "We check your website, maps, public profiles and important information to see whether clients can understand who you are, what you offer and how to contact you.",
            ],
            [
              "What you receive",
              "A simple view of the main blockers, the information to align and a priority list before a bigger project starts.",
            ],
          ],
  },
  officialWebsite: {
    path: "/services/site-officiel",
    title: (lang) =>
      lang === "fr"
        ? "Site officiel pret pour les IA | Creativa Poeta"
        : lang === "nl"
          ? "Officiele website als betrouwbare bron | Creativa Poeta"
          : lang === "rw"
            ? "Website yemewe y'ubucuruzi bwawe | Creativa Poeta"
            : "AI-ready official business website | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Creez ou refondez un site clair qui devient la source officielle de votre entreprise pour vos clients, Google, les maps et les outils IA."
        : lang === "nl"
          ? "Maak of verbeter een duidelijke website die de officiele bron wordt voor klanten, maps, sociale profielen en moderne tools."
          : lang === "rw"
            ? "Kubaka cyangwa kuvugurura website isobanura serivisi, aho bakubariza, aho ukorera n'amakuru yizewe y'ubucuruzi bwawe."
            : "Create or rebuild a clear website that becomes your official source for clients, Google, maps and AI tools.",
    keywords:
      "official business website, clear website, business source, service pages, contact page, local visibility, Creativa Poeta",
    sections: (lang) =>
      lang === "fr"
        ? [
            [
              "Votre site rassemble les informations que vous controlez.",
              "Il explique vos services, vos contacts, vos zones, vos langues, vos questions frequentes et vos preuves de confiance.",
            ],
            [
              "Avec ou sans site aujourd'hui",
              "Nous pouvons refondre une base existante ou commencer par une page officielle simple avant d'ajouter d'autres contenus.",
            ],
          ]
        : [
            [
              "Your website gathers the information you control.",
              "It explains your services, contacts, areas, languages, common questions and trust signals.",
            ],
            [
              "With or without a website today",
              "We can improve an existing base or start with a simple official page before adding more content.",
            ],
          ],
  },
  localVisibility: {
    path: "/services/visibilite-locale",
    title: (lang) =>
      lang === "fr"
        ? "Visibilite locale pour Google, maps et IA | Creativa Poeta"
        : lang === "nl"
          ? "Lokale zichtbaarheid, maps en spraakzoekopdrachten | Creativa Poeta"
          : lang === "rw"
            ? "Kugaragara kuri maps no mu gushakisha hafi | Creativa Poeta"
            : "Local visibility for Google, maps and AI tools | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Alignez vos informations sur Google Maps, Apple Maps, Bing, vos profils locaux et vos reseaux pour aider les clients et les outils IA a vous trouver."
        : lang === "nl"
          ? "Stem uw informatie af op Google Maps, Apple Maps, Bing, lokale profielen en sociale profielen zodat klanten u kunnen vinden en contacteren."
          : lang === "rw"
            ? "Duhuza amakuru yawe kuri Google Maps, Apple Maps, Bing n'imbuga ukoresha kugira ngo abakiriya bakubone kandi bakwandikire."
            : "Align your information across Google Maps, Apple Maps, Bing, local profiles and social profiles so clients and AI tools can find you.",
    keywords:
      "local visibility, Google Maps, Apple Maps, Bing Places, voice search, local profiles, client reviews, Creativa Poeta",
    sections: (lang) =>
      lang === "fr"
        ? [
            [
              "Vos informations doivent etre coherentes partout.",
              "Nom, contact, horaires, services, zones, liens, photos et avis doivent raconter la meme chose sur votre site, vos maps et vos profils.",
            ],
            [
              "Les clients cherchent localement",
              "Ils peuvent chercher un service proche, ouvert maintenant, dans une langue precise ou recommande par des avis. Les maps et la recherche vocale doivent comprendre vos informations.",
            ],
          ]
        : [
            [
              "Your information must be consistent everywhere.",
              "Name, contact, hours, services, areas, links, photos and reviews should tell the same story on your website, maps and profiles.",
            ],
            [
              "Clients search locally",
              "They can search for a nearby service, open now, in a specific language or trusted by reviews. Maps and voice search must understand your information.",
            ],
          ],
  },
  usefulContent: {
    path: "/services/contenus-utiles",
    title: (lang) =>
      lang === "fr"
        ? "Pages utiles pour Google, clients et IA | Creativa Poeta"
        : lang === "nl"
          ? "Nuttige pagina's voor klanten, Google en AI | Creativa Poeta"
          : lang === "rw"
            ? "Paji zifasha abakiriya, Google na AI | Creativa Poeta"
            : "Useful pages for clients, Google and AI | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Creez des pages claires qui repondent aux vraies questions de vos clients et aident Google, les maps et les outils IA a comprendre votre entreprise."
        : lang === "nl"
          ? "Maak duidelijke pagina's die echte klantvragen beantwoorden en Google, maps en AI-tools helpen uw bedrijf te begrijpen."
          : lang === "rw"
            ? "Dukora paji zisubiza ibibazo by'abakiriya kandi zigafasha Google, maps na AI kumva business yawe."
            : "Create clear pages that answer real client questions and help Google, maps and AI tools understand your business.",
    keywords:
      "useful pages, client questions, service pages, business FAQ, AI visibility, Google, ChatGPT, Creativa Poeta",
    sections: (lang) =>
      lang === "fr"
        ? [
            [
              "Repondez aux vraies questions de vos clients.",
              "Nous creons des pages simples pour vos services, vos questions frequentes, vos zones, vos langues et vos cas concrets.",
            ],
            [
              "Le but",
              "Votre site doit devenir une source claire que vos clients, Google, les maps et les outils IA peuvent comprendre sans effort.",
            ],
          ]
        : lang === "nl"
          ? [
              [
                "Beantwoord echte klantvragen.",
                "We maken eenvoudige pagina's voor uw diensten, veelgestelde vragen, regio's, talen en concrete situaties.",
              ],
              [
                "Het doel",
                "Uw website moet een duidelijke bron worden die klanten, Google, maps en AI-tools makkelijk begrijpen.",
              ],
            ]
          : lang === "rw"
            ? [
                [
                  "Subiza ibibazo nyabyo by'abakiriya.",
                  "Dukora paji zoroshye kuri serivisi, ibibazo bikunze kubazwa, aho ukorera, indimi n'ingero zifatika.",
                ],
                [
                  "Intego",
                  "Website yawe igomba kuba isoko isobanutse abakiriya, Google, maps na AI bumva byoroshye.",
                ],
              ]
            : [
                [
                  "Answer real client questions.",
                  "We create simple pages for your services, common questions, areas, languages and practical cases.",
                ],
                [
                  "The goal",
                  "Your website should become a clear source that clients, Google, maps and AI tools can understand easily.",
                ],
              ],
  },
  webApp: {
    path: "/services/web-app",
    title: (lang) =>
      lang === "fr" ? richFrenchServices.webApp.title : "Clear official websites | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? richFrenchServices.webApp.description
        : "Create or improve a website so it becomes the official place where clients understand your services, contact details and answers.",
    keywords:
      "business website, website redesign, official business page, clear website, Creativa Poeta",
    sections: (lang) => lang === "fr" ? richFrenchServices.webApp.sections : [
      [
        "A clear official website",
        "We create or improve a website so it becomes the reliable source for your services, contact details, questions, languages and areas served.",
      ],
    ],
  },
  graphicDesign: {
    path: "/services/graphic-design",
    title: (lang) =>
      lang === "fr" ? richFrenchServices.graphicDesign.title : "Message, image and content | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? richFrenchServices.graphicDesign.description
        : "Clarify your words, visuals and content so clients understand who you are, what you offer and why they should contact you.",
    keywords:
      "brand message, business content, visual identity, clear communication, Creativa Poeta",
    sections: (lang) => lang === "fr" ? richFrenchServices.graphicDesign.sections : [
      [
        "A clearer message",
        "We turn your expertise into simple words, useful content and visual identity that clients can understand quickly.",
      ],
    ],
  },
  digitalMarketing: {
    path: "/services/digital-marketing",
    title: (lang) =>
      lang === "fr" ? richFrenchServices.digitalMarketing.title : "Visibility on Google, maps and AI tools | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? richFrenchServices.digitalMarketing.description
        : "Make your business easier to find and understand on Google, maps, voice search and tools like ChatGPT.",
    keywords:
      "local visibility, Google Maps, voice search, AI tools, ChatGPT visibility, digital presence",
    sections: (lang) => lang === "fr" ? richFrenchServices.digitalMarketing.sections : [
      [
        "Modern visibility",
        "We align your information across Google, maps, social profiles, contact channels and tools that answer client questions.",
      ],
    ],
  },
  contentWriting: {
    path: "/services/content-writing",
    title: (lang) =>
      lang === "fr" ? richFrenchServices.contentWriting.title : "Useful pages for precise searches | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? richFrenchServices.contentWriting.description
        : "Create useful pages that answer precise client questions without empty or repetitive content.",
    keywords:
      "service pages, business FAQ, useful content, precise searches, content strategy",
    sections: (lang) => lang === "fr" ? richFrenchServices.contentWriting.sections : [
      [
        "Useful answers for precise searches",
        "We create clear pages and questions that explain your services in the words clients actually use.",
      ],
    ],
  },
  blogs: {
    path: "/blogs",
    title: (lang) =>
      lang === "fr"
        ? "Conseils visibilite, design et outils digitaux | Creativa Poeta"
        : lang === "nl"
          ? "Advies over zichtbaarheid, design en digitale tools | Creativa Poeta"
          : lang === "rw"
            ? "Inama kuri visibility, design na digital tools | Creativa Poeta"
            : "Visibility, design and digital tools advice | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Guides pratiques sur la visibilite locale, le design, les sites, applications, contenus, IA et outils numeriques."
        : lang === "nl"
          ? "Praktische gidsen over lokale zichtbaarheid, design, websites, apps, content, AI en digitale tools."
          : lang === "rw"
            ? "Guides kuri local visibility, design, websites, applications, content, AI na digital tools."
            : "Practical guides about local visibility, design, websites, apps, content, AI and digital tools.",
    keywords:
      "digital visibility, graphic design tools, websites, applications, AI, technology support, Creativa Poeta blog",
    sections: (lang) => [
      [
        lang === "fr" ? "Des conseils faits pour agir" : "Practical advice built for action",
        lang === "fr"
          ? "Nos articles expliquent les choix, outils et methodes utiles avant de lancer un projet digital."
          : "Our articles explain the choices, tools and methods that matter before starting a digital project.",
      ],
    ],
  },};

const routeDefinitions = [];

function localizedMarketPath(locale, defaultLocale, pagePath) {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${prefix}${pagePath}` || "/";
}

function hreflangFor(config, locale) {
  return config.hreflang?.[locale] ?? locale;
}

function marketAlternates(config, pagePath) {
  const defaultLocale = config.locales[0];
  return config.locales.map((locale) => ({
    lang: hreflangFor(config, locale),
    href: `${config.baseUrl}${localizedMarketPath(locale, defaultLocale, pagePath)}`,
  }));
}

for (const lang of Object.keys(languages)) {
  for (const [key, template] of Object.entries(pageTemplates)) {
    const isDefaultEnglishHome = lang === "en" && key === "home";
    const localePrefix = lang === "en" ? "" : languages[lang].prefix;
    const routePath = isDefaultEnglishHome
      ? "/"
      : key === "home"
        ? languages[lang].homePath
        : `${localePrefix}${template.path}`;

    routeDefinitions.push({
      outputPath: routePath,
      canonicalPath: routePath,
      lang,
      template,
    });

    if (lang === "en") {
      const enAliasPath = key === "home" ? "/en" : `/en${template.path}`;
      routeDefinitions.push({
        outputPath: enAliasPath,
        canonicalPath: routePath,
        lang,
        template,
      });
    }
  }
}

for (const [market, config] of Object.entries(marketHosts)) {
  const defaultLocale = config.locales[0];

  for (const template of Object.values(pageTemplates)) {
    for (const lang of config.locales) {
      const publicPath = localizedMarketPath(lang, defaultLocale, template.path);
      routeDefinitions.push({
        outputPath: `/__markets/${market}${publicPath}`,
        canonicalUrl: `${config.baseUrl}${publicPath}`,
        market,
        lang,
        template,
        alternates: marketAlternates(config, template.path),
      });
    }
  }
}

function blogGroup(blog) {
  const key = blog.translationKey || `${blog.language}:${blog.slug}`;
  return publishedBlogs.filter(
    (candidate) => (candidate.translationKey || `${candidate.language}:${candidate.slug}`) === key
  );
}

function globalBlogPath(blog) {
  const prefix = blog.language === "en" ? "" : `/${blog.language}`;
  return `${prefix}/blogs/${blog.slug}`;
}

function globalBlogAlternates(blog) {
  return blogGroup(blog).map((translation) => ({
    lang: translation.language,
    href: `${siteUrl}${globalBlogPath(translation)}`,
  }));
}

function xDefaultBlogUrl(blog) {
  const group = blogGroup(blog);
  const preferred =
    group.find((translation) => translation.language === "en") ||
    group.find((translation) => translation.language === "fr") ||
    group[0] ||
    blog;
  return `${siteUrl}${globalBlogPath(preferred)}`;
}

for (const blog of publishedBlogs) {
  const publicPath = globalBlogPath(blog);
  routeDefinitions.push({
    outputPath: publicPath,
    canonicalPath: publicPath,
    canonicalUrl: `${siteUrl}${publicPath}`,
    lang: blog.language,
    template: pageTemplates.blogs,
    blog,
    alternates: globalBlogAlternates(blog),
    xDefaultUrl: xDefaultBlogUrl(blog),
  });

  for (const [market, config] of Object.entries(marketHosts)) {
    if (market === "global" || !config.locales.includes(blog.language)) continue;
    const defaultLocale = config.locales[0];
    const marketPath = localizedMarketPath(
      blog.language,
      defaultLocale,
      `/blogs/${blog.slug}`
    );
    const translations = blogGroup(blog).filter((translation) =>
      config.locales.includes(translation.language)
    );
    routeDefinitions.push({
      outputPath: `/__markets/${market}${marketPath}`,
      canonicalUrl: `${config.baseUrl}${marketPath}`,
      market,
      lang: blog.language,
      template: pageTemplates.blogs,
      blog,
      alternates: translations.map((translation) => {
        const translationPath = localizedMarketPath(
          translation.language,
          defaultLocale,
          `/blogs/${translation.slug}`
        );
        return {
          lang: hreflangFor(config, translation.language),
          href: `${config.baseUrl}${translationPath}`,
        };
      }),
      xDefaultUrl: xDefaultBlogUrl(blog),
    });
  }
}
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function routeToFile(routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, routePath.replace(/^\//, ""), "index.html");
}

function absoluteUrl(routePath) {
  return `${siteUrl}${routePath === "/" ? "/" : routePath}`;
}

function alternatesFor(template) {
  return Object.keys(languages).map((lang) => {
    const pathForLang =
      template === pageTemplates.home
        ? languages[lang].homePath
        : `${lang === "en" ? "" : languages[lang].prefix}${template.path}`;

    return {
      lang,
      href: absoluteUrl(pathForLang),
    };
  });
}

function withoutBrandSuffix(title) {
  return title.replace(/\s*\|\s*Creativa Poeta.*$/i, "");
}

function titleForRoute(route) {
  const baseTitle = route.template.title(route.lang);
  if (!route.market) return baseTitle;

  const marketMeta = marketHomeMeta[route.market]?.[route.lang];
  if (route.template === pageTemplates.home && marketMeta?.title) {
    return marketMeta.title;
  }

  const marketConfig = marketHosts[route.market];
  if (!marketConfig?.brandSuffix) return baseTitle;

  return `${withoutBrandSuffix(baseTitle)} | Creativa Poeta ${marketConfig.brandSuffix}`;
}

function descriptionForRoute(route) {
  const baseDescription = route.template.description(route.lang);
  if (!route.market) return baseDescription;

  const marketMeta = marketHomeMeta[route.market]?.[route.lang];
  if (route.template === pageTemplates.home && marketMeta?.description) {
    return marketMeta.description;
  }

  const intro = marketServiceIntro[route.market]?.[route.lang];
  return intro ? `${baseDescription} ${intro}` : baseDescription;
}

function keywordsForRoute(route) {
  const marketConfig = route.market ? marketHosts[route.market] : undefined;
  const marketWords = marketConfig
    ? `, ${marketConfig.areaName}, ${marketConfig.countryCode}, local business visibility`
    : "";

  return `${route.template.keywords}${marketWords}`;
}

function languageName(lang) {
  return languages[lang]?.label ?? lang;
}

function updateTag(html, regex, replacement) {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace("</head>", `${replacement}\n</head>`);
}

function stripOldSeo(html) {
  return html
    .replace(/<link rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<link rel="alternate"[^>]*>\s*/gi, "")
    .replace(/<script>document\.documentElement\.classList\.add\("cp-js"\);<\/script>\s*/gi, "")
    .replace(/<style>[\s\S]*?\.cp-prerender[\s\S]*?<\/style>\s*/gi, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
}

function stripManagedMeta(html) {
  const managedNames = [
    "title",
    "description",
    "keywords",
    "language",
  ];
  const managedProperties = [
    "og:url",
    "og:title",
    "og:description",
    "og:image",
    "twitter:url",
    "twitter:title",
    "twitter:description",
    "twitter:image",
  ];

  const namePattern = managedNames.join("|").replace(/\./g, "\\.");
  const propertyPattern = managedProperties.join("|").replace(/\./g, "\\.");

  return html
    .replace(
      new RegExp(`<meta\\s+[^>]*name=["'](?:${namePattern})["'][^>]*>\\s*`, "gi"),
      ""
    )
    .replace(
      new RegExp(`<meta\\s+[^>]*property=["'](?:${propertyPattern})["'][^>]*>\\s*`, "gi"),
      ""
    );
}

function applyMeta(html, page) {
  let next = stripManagedMeta(stripOldSeo(html));
  const escapedTitle = escapeHtml(page.title);
  const escapedDescription = escapeHtml(page.description);
  const escapedKeywords = escapeHtml(page.keywords);
  const escapedUrl = escapeHtml(page.url);
  const socialImage = page.blog?.image || imageUrl;
  const escapedSocialImage = escapeHtml(socialImage);
  const escapedXDefaultUrl = escapeHtml(
    page.xDefaultUrl || `${siteUrl}${page.template.path || "/"}`
  );

  next = next.replace(/<html[^>]*>/i, `<html lang="${page.lang}">`);
  next = updateTag(next, /<title>[\s\S]*?<\/title>/i, `<title>${escapedTitle}</title>`);
  next = updateTag(
    next,
    /<meta name="title"[^>]*>/i,
    `<meta name="title" content="${escapedTitle}" />`
  );
  next = updateTag(
    next,
    /<meta name="description"[^>]*>/i,
    `<meta name="description" content="${escapedDescription}" />`
  );
  next = updateTag(
    next,
    /<meta name="keywords"[^>]*>/i,
    `<meta name="keywords" content="${escapedKeywords}" />`
  );
  next = updateTag(next, /<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${escapedUrl}" />`);
  next = updateTag(next, /<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapedTitle}" />`);
  next = updateTag(
    next,
    /<meta property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${escapedDescription}" />`
  );
  next = updateTag(next, /<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${escapedSocialImage}" />`);
  next = updateTag(next, /<meta property="twitter:url"[^>]*>/i, `<meta property="twitter:url" content="${escapedUrl}" />`);
  next = updateTag(
    next,
    /<meta property="twitter:title"[^>]*>/i,
    `<meta property="twitter:title" content="${escapedTitle}" />`
  );
  next = updateTag(
    next,
    /<meta property="twitter:description"[^>]*>/i,
    `<meta property="twitter:description" content="${escapedDescription}" />`
  );
  next = updateTag(next, /<meta property="twitter:image"[^>]*>/i, `<meta property="twitter:image" content="${escapedSocialImage}" />`);

  const alternateLinks = page.alternates
    .map(
      (alternate) =>
        `<link rel="alternate" hreflang="${alternate.lang}" href="${escapeHtml(alternate.href)}" />`
    )
    .join("\n    ");

  const marketConfig = page.market ? marketHosts[page.market] : marketHosts.global;
  const pageType = page.blog
    ? "BlogPosting"
    : page.template === pageTemplates.contact
      ? "ContactPage"
      : "WebPage";
  const serviceArea =
    marketConfig.countryCode === "Global"
      ? "Global"
      : {
          "@type": "Country",
          name: marketConfig.areaName,
          identifier: marketConfig.countryCode,
        };
  const serviceNames = [
    "Official business website",
    "Local visibility",
    "Maps profile alignment",
    "Voice search readiness",
    "AI answer readiness",
    "Clear service pages",
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": pageType,
        "@id": `${page.url}#webpage`,
        name: page.title,
        description: page.description,
        url: page.url,
        inLanguage: page.lang,
        ...(page.blog
          ? {
              headline: page.blog.title,
              image: socialImage,
              datePublished: page.blog.publishedAt || page.blog.createdAt,
              dateModified: page.blog.updatedAt || page.blog.publishedAt || page.blog.createdAt,
              articleSection: page.blog.category || "Conseils",
              keywords: page.blog.tags || [],
              wordCount: page.blog.generation?.wordCount,
              author: {
                "@type": "Person",
                name: page.blog.author?.name || "Creativa Poeta",
              },
              publisher: {
                "@id": `${marketConfig.baseUrl}/#professionalservice`,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": page.url,
              },
            }
          : {}),
        isPartOf: {
          "@id": `${marketConfig.baseUrl}/#website`,
        },
        about: {
          "@id": `${marketConfig.baseUrl}/#professionalservice`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${marketConfig.baseUrl}/#website`,
        name: "Creativa Poeta",
        url: marketConfig.baseUrl,
        inLanguage: marketConfig.locales,
        publisher: {
          "@id": `${marketConfig.baseUrl}/#professionalservice`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${marketConfig.baseUrl}/#professionalservice`,
        name: marketConfig.brandSuffix
          ? `Creativa Poeta ${marketConfig.brandSuffix}`
          : "Creativa Poeta",
        url: marketConfig.baseUrl,
        logo: imageUrl,
        image: imageUrl,
        description: page.description,
        areaServed: serviceArea,
        availableLanguage: marketConfig.locales.map(languageName),
        knowsAbout: serviceNames,
        serviceType: serviceNames,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: `${marketConfig.baseUrl}/contact`,
        },
      },
    ],
  };

  const injected = `
    <script>document.documentElement.classList.add("cp-js");</script>
    <link rel="canonical" href="${escapedUrl}" />
    ${alternateLinks}
    <link rel="alternate" hreflang="x-default" href="${escapedXDefaultUrl}" />
    <style>
      .cp-prerender { min-height: 100vh; padding: 96px 22px; color: #ffffff; background: #101a29; font-family: Arial, sans-serif; }
      .cp-prerender__inner { max-width: 980px; margin: 0 auto; }
      .cp-prerender h1 { max-width: 900px; margin: 0 0 24px; color: #fff200; font-size: clamp(2rem, 7vw, 4.5rem); line-height: 1.02; text-transform: uppercase; }
      .cp-prerender p { max-width: 760px; color: #f6f6f6; font-size: 1.1rem; line-height: 1.75; }
      .cp-prerender section { margin-top: 34px; }
      .cp-prerender h2 { color: #fff; font-size: 1.55rem; margin: 0 0 10px; }
      .cp-prerender__article { max-width: 820px; }
      .cp-prerender__meta { color: #fff200 !important; font-weight: 700; text-transform: uppercase; }
      .cp-prerender__excerpt { font-size: 1.25rem !important; font-weight: 700; }
      .cp-prerender__content h2, .cp-prerender__content h3 { margin-top: 34px; }
      .cp-prerender__content li { margin: 8px 0; line-height: 1.65; }
      .cp-prerender a { display: inline-block; margin-top: 28px; color: #101a29; background: #fff200; padding: 14px 22px; font-weight: 700; text-decoration: none; }
      .cp-js .cp-prerender { display: none; }
    </style>
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  `;

  return next.replace("</head>", `${injected}\n  </head>`);
}

function sanitizeArticleHtml(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<(iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/\son\w+\s*=\s*(["']).*?\1/gi, "")
    .replace(/\s(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, "");
}

function safeLink(value, fallback) {
  const link = String(value || "").trim();
  return /^(https?:\/\/|\/)/i.test(link) ? link : fallback;
}

function renderFallback(page) {
  if (page.blog) {
    const ctaPath = page.lang === "en" ? "/start-project" : `/${page.lang}/start-project`;
    const ctaUrl = safeLink(page.blog.cta?.url, ctaPath);
    const ctaLabel = page.blog.cta?.label || languages[page.lang].cta;
    const publishedDate = String(
      page.blog.publishedAt || page.blog.createdAt || generatedAt
    ).slice(0, 10);
    const affiliateRel =
      page.blog.cta?.type === "affiliate" ? ' rel="sponsored noopener"' : "";

    return `<div id="root">
      <main class="cp-prerender" data-cp-prerender="true">
        <article class="cp-prerender__inner cp-prerender__article">
          <p class="cp-prerender__meta">${escapeHtml(page.blog.category || "Conseils")} - ${escapeHtml(publishedDate)}</p>
          <h1>${escapeHtml(page.blog.title)}</h1>
          <p class="cp-prerender__excerpt">${escapeHtml(page.blog.excerpt || page.description)}</p>
          <div class="cp-prerender__content">${sanitizeArticleHtml(page.blog.content)}</div>
          <a href="${escapeHtml(ctaUrl)}"${affiliateRel}>${escapeHtml(ctaLabel)}</a>
        </article>
      </main>
    </div>`;
  }

  const sections = page.sections
    .map(
      ([title, body]) => `
        <section>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(body)}</p>
        </section>`
    )
    .join("");

  return `<div id="root">
      <main class="cp-prerender" data-cp-prerender="true">
        <div class="cp-prerender__inner">
          <h1>${escapeHtml(page.title)}</h1>
          <p>${escapeHtml(page.description)}</p>
          ${sections}
          <a href="${page.lang === "en" ? "/start-project" : `/${page.lang}/start-project`}">${escapeHtml(languages[page.lang].cta)}</a>
        </div>
      </main>
    </div>`;
}
function applyFallback(html, page) {
  return html.replace(/<div id="root"><\/div>/i, renderFallback(page));
}

for (const route of routeDefinitions) {
  const page = {
    ...route,
    title: route.blog?.seoTitle || route.blog?.title || titleForRoute(route),
    description:
      route.blog?.seoDescription || route.blog?.excerpt || descriptionForRoute(route),
    keywords: route.blog?.tags?.join(", ") || keywordsForRoute(route),
    sections: route.blog ? [] : route.template.sections(route.lang),
    image: route.blog?.image || imageUrl,
    url: route.canonicalUrl ?? absoluteUrl(route.canonicalPath),
    alternates: route.alternates ?? alternatesFor(route.template),
  };

  const output = applyFallback(applyMeta(baseHtml, page), page);
  const filePath = routeToFile(route.outputPath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, output, "utf8");
}

const sitemapPagePaths = [
  "",
  "/contact",
  "/start-project",
  "/terms-and-conditions",
  "/blogs",
  "/services/audit-visibilite",
  "/services/site-officiel",
  "/services/visibilite-locale",
  "/services/contenus-utiles",
];

function localePathForSitemap(locale, defaultLocale, pagePath) {
  return localizedMarketPath(locale, defaultLocale, pagePath);
}

function blogSitemapUrls(config) {
  const defaultLocale = config.locales[0];
  return publishedBlogs
    .filter((blog) => config.locales.includes(blog.language))
    .map((blog) => {
      const locPath = localizedMarketPath(
        blog.language,
        defaultLocale,
        `/blogs/${blog.slug}`
      );
      const alternates = blogGroup(blog)
        .filter((translation) => config.locales.includes(translation.language))
        .map((translation) => {
          const altPath = localizedMarketPath(
            translation.language,
            defaultLocale,
            `/blogs/${translation.slug}`
          );
          return `    <xhtml:link rel="alternate" hreflang="${hreflangFor(config, translation.language)}" href="${escapeHtml(`${config.baseUrl}${altPath}`)}" />`;
        })
        .join("\n");
      const lastmod = String(
        blog.updatedAt || blog.publishedAt || blog.createdAt || generatedAt
      ).slice(0, 10);

      return `  <url>
    <loc>${escapeHtml(`${config.baseUrl}${locPath}`)}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(xDefaultBlogUrl(blog))}" />
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
}
function writeSitemapFiles() {
  const sitemapDir = path.join(distDir, "sitemaps");
  fs.mkdirSync(sitemapDir, { recursive: true });

  const sitemapEntries = Object.entries(marketHosts).map(([market, config]) => {
    const defaultLocale = config.locales[0];
    const urls = sitemapPagePaths.flatMap((pagePath) =>
      config.locales.map((locale) => {
        const locPath = localePathForSitemap(locale, defaultLocale, pagePath);
        const alternates = config.locales
          .map((alternateLocale) => {
            const altPath = localePathForSitemap(
              alternateLocale,
              defaultLocale,
              pagePath
            );
            return `    <xhtml:link rel="alternate" hreflang="${hreflangFor(config, alternateLocale)}" href="${config.baseUrl}${altPath}" />`;
          })
          .join("\n");

        return `  <url>
    <loc>${config.baseUrl}${locPath}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="https://creativapoeta.com${pagePath || "/"}" />
    <lastmod>${generatedAt}</lastmod>
    <changefreq>${pagePath ? "monthly" : "weekly"}</changefreq>
    <priority>${pagePath ? "0.8" : "1.0"}</priority>
  </url>`;
      })
    );
    urls.push(...blogSitemapUrls(config));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n\n")}
</urlset>
`;

    const fileName = `${market}.xml`;
    fs.writeFileSync(path.join(sitemapDir, fileName), sitemap, "utf8");
    return {
      market,
      loc: `${siteUrl}/sitemaps/${fileName}`,
    };
  });

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <sitemap>
    <loc>${entry.loc}</loc>
    <lastmod>${generatedAt}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapIndex, "utf8");
  fs.writeFileSync(
    path.join(distDir, "robots.txt"),
    `User-agent: *
Allow: /

Disallow: /secure-admin-*
Disallow: /admin/
Disallow: /dashboard/
Disallow: /thank-you
Disallow: /thank-you-for-applying

Sitemap: ${siteUrl}/sitemap.xml
`,
    "utf8"
  );
}

writeSitemapFiles();

console.log(`Pre-rendered ${routeDefinitions.length} SEO pages (${publishedBlogs.length} published blog article(s)).`);
