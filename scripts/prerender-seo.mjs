import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const baseHtmlPath = path.join(distDir, "index.html");
const baseHtml = fs
  .readFileSync(baseHtmlPath, "utf8")
  .replace(/<div id="root">[\s\S]*?<\/body>/i, '<div id="root"></div>\n</body>');

const siteUrl = "https://creativapoeta.com";
const imageUrl = `${siteUrl}/cp-logo.png`;
const generatedAt = new Date().toISOString().slice(0, 10);
const brandSameAs = [
  "https://www.linkedin.com/company/creativa-poeta",
  "https://www.facebook.com/creativapoeta",
  "https://www.instagram.com/creativapoeta",
  "https://www.tiktok.com/@creativapoeta",
];
const serviceCatalog = [
  {
    name: "Visibility on Google, maps, voice search and AI tools",
    serviceType: "AI visibility, GEO, AEO and local discovery",
    description:
      "Alignment of websites, maps, public profiles, reviews and useful answers so clients and AI tools can find and understand the business.",
  },
  {
    name: "AI-ready websites, apps and digital tools",
    serviceType: "Website, application and internal software",
    description:
      "Clear official websites, client applications, dashboards and internal tools structured around services, contact paths, data and useful content.",
  },
  {
    name: "AI assistants, GPTs, chatbots and connected agents",
    serviceType: "AI automation",
    description:
      "Custom AI assistants and connected agents trained around business knowledge, documents, workflows and client questions.",
  },
  {
    name: "Visual identity and graphic design",
    serviceType: "Brand and visual communication",
    description:
      "Logos, brand systems, social visuals, presentations, documents and publish-ready visual supports.",
  },
  {
    name: "Content writing, documents and useful pages",
    serviceType: "Copywriting and content system",
    description:
      "Professional writing, articles, service pages, documents, reports, guides and answer-focused content for clients and search engines.",
  },
  {
    name: "Digital assistance, troubleshooting and technology support",
    serviceType: "Digital assistance",
    description:
      "Setup, troubleshooting, device configuration, online procedures, security support and step-by-step digital guidance.",
  },
];
const servicePathCatalogIndex = {
  "/services/visibilite-locale": 0,
  "/services/audit-visibilite": 0,
  "/services/web-app": 1,
  "/services/site-officiel": 1,
  "/services/ia-automatisation": 2,
  "/services/graphic-design": 3,
  "/services/content-writing": 4,
  "/services/contenus-utiles": 4,
  "/services/assistance-numerique": 5,
};

function serviceForPath(pagePath) {
  const index = servicePathCatalogIndex[pagePath];
  return Number.isInteger(index) ? serviceCatalog[index] : null;
}

const fallbackFaqs = {
  en: [
    ["What does Creativa Poeta help with?", "Creativa Poeta helps businesses become easier to find, understand and contact through clear websites, maps, useful content, AI-ready structure and digital tools."],
    ["Can you help with Google, maps, voice search and AI visibility?", "Yes. We align public information, service pages, local profiles, answers and technical signals so search engines and AI tools can understand the business more clearly."],
    ["Do you guarantee that Google or an AI tool will recommend a business?", "No serious provider can guarantee that. We build the conditions that make the business easier to find, understand, cite and recommend."],
    ["Can the work be done in several languages?", "Yes. Creativa Poeta can prepare content and pages in English, French, Dutch and Kinyarwanda depending on the audience and market."],
  ],
  fr: [
    ["A quoi sert Creativa Poeta ?", "Creativa Poeta aide les entreprises a etre trouvees, comprises et contactees grace a des sites clairs, des maps alignees, du contenu utile, une structure prete pour les IA et des outils digitaux."],
    ["Pouvez-vous aider pour Google, maps, recherche vocale et visibilite IA ?", "Oui. Nous alignons les informations publiques, pages services, profils locaux, reponses et signaux techniques pour aider les moteurs et outils IA a mieux comprendre l'entreprise."],
    ["Garantissez-vous que Google ou une IA va recommander une entreprise ?", "Non. Personne ne peut le garantir serieusement. Nous mettons en place les conditions pour que l'entreprise soit plus facile a trouver, comprendre, citer et recommander."],
    ["Pouvez-vous travailler en plusieurs langues ?", "Oui. Creativa Poeta peut preparer des contenus et pages en francais, anglais, neerlandais et kinyarwanda selon le public et le marche vise."],
  ],
  nl: [
    ["Waarmee helpt Creativa Poeta?", "Creativa Poeta helpt bedrijven makkelijker gevonden, begrepen en gecontacteerd te worden via duidelijke websites, maps, nuttige content, AI-ready structuur en digitale tools."],
    ["Helpen jullie met Google, maps, voice search en AI-zichtbaarheid?", "Ja. We stemmen publieke informatie, servicepagina's, lokale profielen, antwoorden en technische signalen af zodat zoekmachines en AI-tools het bedrijf beter begrijpen."],
    ["Garanderen jullie dat Google of AI een bedrijf aanbeveelt?", "Nee. Niemand kan dat serieus garanderen. We bouwen wel de voorwaarden waardoor het bedrijf makkelijker te vinden, begrijpen, citeren en aanbevelen is."],
    ["Kunnen jullie in meerdere talen werken?", "Ja. Creativa Poeta kan content en pagina's voorbereiden in Engels, Frans, Nederlands en Kinyarwanda volgens publiek en markt."],
  ],
  rw: [
    ["Creativa Poeta ifasha iki?", "Creativa Poeta ifasha business kuboneka, kumvikana no kuvugishwa biciye kuri websites zisobanutse, maps, content ifasha, AI-ready structure na digital tools."],
    ["Mufasha kuri Google, maps, voice search na AI visibility?", "Yego. Duhuza amakuru agaragara, service pages, local profiles, answers na technical signals kugira ngo search engines na AI tools zibyumve neza."],
    ["Mwemeza ko Google cyangwa AI izatanga recommendation?", "Oya. Nta muntu wabisezeranya neza. Dushyiraho ishingiro rituma business iboneka, yumvikana kandi ishobora gukoreshwa nk'isoko."],
    ["Mushobora gukora mu ndimi nyinshi?", "Yego. Creativa Poeta ishobora gutegura content na pages mu cyongereza, igifaransa, nederlands na kinyarwanda bitewe n'isoko."],
  ],
};

const serviceFaqs = {
  "/services/web-app": {
    en: [
      ["Do I need to start with a large website?", "No. The most important thing is to start with a clear base. It can later grow with pages, tools or languages."],
      ["Can you rebuild an existing website?", "Yes. We keep what works, then clarify the structure, wording, contacts, useful pages and user journeys."],
      ["Can you build a custom tool?", "Yes. It can be an advanced form, dashboard, client area, management tool or a more complete application."],
      ["Can a website also support AI and voice search visibility?", "Yes. We structure service pages, answers, schema and contact paths so search engines and assistants can understand the business."],
      ["What pages does a professional website need?", "At minimum, a clear home page, service pages, contact paths, useful answers, trust signals and pages that explain who the business helps."],
      ["How do I know if I need a website, an app or internal software?", "A website helps people understand and contact you, an app serves users repeatedly, and internal software helps your team manage work."],
    ],
    fr: [
      ["Est-ce que je dois commencer par un grand site ?", "Non. Le plus important est de commencer par une base claire. Elle peut grandir ensuite avec des pages, des outils ou des langues."],
      ["Est-ce que vous refondez aussi un site existant ?", "Oui. On garde ce qui fonctionne, puis on clarifie la structure, les textes, les contacts, les pages utiles et les parcours."],
      ["Est-ce que vous pouvez construire un outil sur mesure ?", "Oui. Cela peut etre un formulaire avance, un tableau de bord, un espace client, un outil de gestion ou une application plus complete."],
      ["Un site peut-il aider la visibilite IA et recherche vocale ?", "Oui. Nous structurons les pages services, reponses, schema et chemins de contact pour que les moteurs et assistants comprennent l'entreprise."],
      ["Quelles pages faut-il pour un site professionnel ?", "Au minimum: une home claire, des pages services, des chemins de contact, des reponses utiles, des preuves et des pages qui expliquent qui l'entreprise aide."],
      ["Comment savoir si j'ai besoin d'un site, d'une app ou d'un logiciel interne ?", "Un site aide a comprendre et contacter l'entreprise, une app sert des utilisateurs reguliers, et un logiciel interne aide l'equipe a gerer le travail."],
    ],
  },
  "/services/visibilite-locale": {
    en: [
      ["What is local visibility?", "Local visibility means making your business easy to find on Google, maps, profiles, reviews and voice searches when people look for a nearby service."],
      ["Which information must be aligned?", "Name, address, phone, opening hours, service areas, links, photos, reviews, categories and service descriptions must tell the same story everywhere."],
      ["Does this help AI tools understand a business?", "Yes. Consistent public information and clear service answers make the business easier for search engines and AI tools to interpret."],
      ["Can you improve a Google Business Profile?", "Yes. We can help clarify categories, services, descriptions, photos, links, reviews and the connection with the website."],
      ["Can voice assistants recommend a local business?", "They can use public signals such as maps, websites, categories, reviews and clear answers. We help make those signals more coherent."],
      ["Why is consistency important across Google, maps and social profiles?", "Consistent names, contacts, services, areas and links reduce confusion and make the business easier to understand."],
    ],
    fr: [
      ["C'est quoi la visibilite locale ?", "C'est le fait de rendre une entreprise facile a trouver sur Google, les maps, profils, avis et recherches vocales quand quelqu'un cherche un service proche."],
      ["Quelles informations faut-il aligner ?", "Nom, adresse, telephone, horaires, zones, liens, photos, avis, categories et descriptions de services doivent raconter la meme chose partout."],
      ["Est-ce utile pour les outils IA ?", "Oui. Des informations publiques coherentes et des reponses claires aident les moteurs et outils IA a interpreter l'entreprise."],
      ["Pouvez-vous ameliorer une fiche Google ?", "Oui. Nous pouvons clarifier categories, services, descriptions, photos, liens, avis et connexion avec le site."],
      ["Les assistants vocaux peuvent-ils recommander une entreprise locale ?", "Ils peuvent utiliser des signaux publics comme maps, site, categories, avis et reponses claires. Nous aidons a rendre ces signaux coherents."],
      ["Pourquoi la coherence entre Google, maps et reseaux sociaux est importante ?", "Des noms, contacts, services, zones et liens coherents reduisent la confusion et rendent l'entreprise plus facile a comprendre."],
    ],
  },
  "/services/ia-automatisation": {
    en: [
      ["Can an AI assistant replace a person?", "No. It helps answer faster and organize information, but important decisions and sensitive cases should stay human."],
      ["What do you need to create an assistant?", "Your pages, documents, FAQ, services, offers, brand tone and limits: what the assistant can and cannot say."],
      ["Can it speak multiple languages?", "Yes. We can prepare instructions, content and examples in the languages useful to clients or teams."],
      ["Can the assistant take actions?", "Yes, progressively: collect a request, route to a form, prepare an email or connect to selected tools."],
      ["What is the difference between a chatbot, a custom GPT and an AI agent?", "A chatbot answers in a controlled conversation, a custom GPT uses specific instructions and knowledge, and an agent can connect to tools and actions."],
      ["How do you avoid wrong AI answers?", "We define sources, limits, approved answers, human review points and clear rules for what the assistant can or cannot say."],
    ],
    fr: [
      ["Est-ce qu'un assistant IA peut remplacer une personne ?", "Non. Il aide a repondre plus vite et a organiser l'information, mais les decisions importantes et les cas sensibles doivent rester humains."],
      ["De quoi avez-vous besoin pour creer un assistant ?", "De vos pages, documents, FAQ, services, offres, ton de marque et limites: ce que l'assistant peut dire ou ne doit pas dire."],
      ["Peut-il parler plusieurs langues ?", "Oui. On peut preparer les instructions, contenus et exemples dans les langues utiles a vos clients ou votre equipe."],
      ["Est-ce que l'assistant peut faire des actions ?", "Oui, progressivement: collecter une demande, orienter vers un formulaire, preparer un email ou se connecter a certains outils."],
      ["Quelle difference entre chatbot, GPT personnalise et agent IA ?", "Un chatbot repond dans une conversation controlee, un GPT personnalise utilise des instructions et connaissances specifiques, et un agent peut se connecter a des outils et actions."],
      ["Comment eviter que l'IA donne de mauvaises reponses ?", "Nous definissons les sources, limites, reponses validees, points de controle humain et regles claires sur ce que l'assistant peut ou ne peut pas dire."],
    ],
  },
  "/services/graphic-design": {
    en: [
      ["What can Creativa Poeta design for a brand?", "We can create logos, visual identity, social media visuals, presentations, documents, flyers, posters and publish-ready supports."],
      ["Can you refresh an existing identity?", "Yes. We can keep what is recognizable and improve colors, typography, layouts and visual consistency."],
      ["Do you prepare visuals for social media?", "Yes. We can create formats for posts, stories, covers, ads and recurring content templates."],
      ["Can the visuals be prepared in several languages?", "Yes. Visuals with text can be adapted by language so each version matches the correct audience."],
      ["Do I need only a logo or a complete visual identity?", "A logo is only one element. A stronger identity also includes colors, typography, layouts, visual rules and reusable supports."],
      ["How can a brand stay recognizable everywhere?", "By using consistent visual rules across the website, social media, documents, presentations, packaging and local supports."],
    ],
    fr: [
      ["Que pouvez-vous creer pour une marque ?", "Nous pouvons creer logos, identite visuelle, visuels reseaux sociaux, presentations, documents, flyers, affiches et supports prets a publier."],
      ["Pouvez-vous rafraichir une identite existante ?", "Oui. Nous pouvons garder ce qui est reconnaissable et ameliorer couleurs, typographies, mises en page et coherence visuelle."],
      ["Preparez-vous des visuels pour les reseaux sociaux ?", "Oui. Nous pouvons creer des formats pour posts, stories, couvertures, publicites et modeles recurrents."],
      ["Les visuels peuvent-ils exister en plusieurs langues ?", "Oui. Les visuels avec texte peuvent etre adaptes par langue pour correspondre au bon public."],
      ["Ai-je besoin seulement d'un logo ou d'une identite visuelle complete ?", "Un logo est seulement un element. Une identite plus forte inclut aussi couleurs, typographies, mises en page, regles visuelles et supports reutilisables."],
      ["Comment garder une marque reconnaissable partout ?", "En utilisant des regles visuelles coherentes sur le site, les reseaux sociaux, documents, presentations, packaging et supports locaux."],
    ],
  },
  "/services/content-writing": {
    en: [
      ["Can you write from only a few ideas?", "Yes. You can give notes, audio, drafts or simple explanations. We structure them into clear content."],
      ["Can you edit an existing document?", "Yes. We can correct, rewrite, reorganize and improve an existing document without starting from zero."],
      ["Can content be adapted for SEO?", "Yes. For web copy, we structure titles, questions, important terms and answers to help search engines and AI assistants understand the content."],
      ["Can you prepare content in multiple languages?", "Yes. We can work in French, English, Dutch or Kinyarwanda depending on the target audience and required versions."],
      ["Can an article bring clients to a service?", "Yes, when it answers a real question, links to the right service and gives the reader a clear next action."],
      ["Can you write for both Google and AI assistants?", "Yes. We write clear answers, structured headings, natural wording and internal links so humans, search engines and assistants can understand the content."],
    ],
    fr: [
      ["Pouvez-vous ecrire a partir de quelques idees seulement ?", "Oui. Vous pouvez nous donner des notes, audios, brouillons ou explications simples. Nous les structurons pour creer un contenu clair."],
      ["Pouvez-vous corriger un document deja ecrit ?", "Oui. Nous pouvons corriger, reformuler, reorganiser et ameliorer un document existant sans repartir de zero."],
      ["Les contenus peuvent-ils etre adaptes au SEO ?", "Oui. Pour les textes web, nous structurons les titres, questions, mots importants et reponses pour aider les moteurs et assistants IA a comprendre."],
      ["Pouvez-vous preparer le contenu en plusieurs langues ?", "Oui. Nous pouvons travailler en francais, anglais, neerlandais ou kinyarwanda selon le public vise."],
      ["Un article peut-il amener des clients vers un service ?", "Oui, s'il repond a une vraie question, renvoie vers le bon service et donne au lecteur une action claire a faire."],
      ["Pouvez-vous ecrire pour Google et pour les assistants IA ?", "Oui. Nous ecrivons des reponses claires, titres structures, formulations naturelles et liens internes pour aider humains, moteurs et assistants a comprendre."],
    ],
  },
  "/services/assistance-numerique": {
    en: [
      ["Is this only for businesses?", "No. This service is also for individuals, families, seniors, students, freelancers and small teams."],
      ["Can you help if I do not understand technology?", "Yes. The service is designed to explain calmly, without jargon and without judgment."],
      ["Which devices can you help configure?", "Computers, smartphones, tablets, printers, internet routers, email accounts, cloud, apps and common work tools."],
      ["Can you help secure my accounts?", "Yes. We can review passwords, backups, two-factor authentication and simple habits against scams."],
      ["Can you help with online procedures or purchases?", "Yes. We can guide you step by step for forms, online accounts, payments, orders, administrative tasks and safe habits."],
      ["Can the support happen remotely or at home?", "Depending on the need, support can be prepared remotely, explained step by step, or organized with local assistance."],
    ],
    fr: [
      ["Est-ce seulement pour les entreprises ?", "Non. Ce service est aussi pour les particuliers, familles, seniors, etudiants, independants et petites structures."],
      ["Pouvez-vous m'aider meme si je ne comprends rien a la technologie ?", "Oui. Le service est pense pour expliquer calmement, sans jargon et sans jugement."],
      ["Quels appareils pouvez-vous aider a configurer ?", "Ordinateurs, smartphones, tablettes, imprimantes, box internet, comptes email, cloud, applications et outils courants."],
      ["Pouvez-vous m'aider a securiser mes comptes ?", "Oui. Nous pouvons revoir les mots de passe, sauvegardes, double authentification et bonnes pratiques contre les arnaques."],
      ["Pouvez-vous aider pour les demarches ou achats en ligne ?", "Oui. Nous pouvons guider pas a pas pour formulaires, comptes en ligne, paiements, commandes, demarches administratives et bonnes pratiques."],
      ["L'aide peut-elle se faire a distance ou a domicile ?", "Selon le besoin, l'aide peut etre preparee a distance, expliquee pas a pas, ou organisee avec un accompagnement local."],
    ],
  },
  "/services/audit-visibilite": {
    en: [
      ["Is this useful if I do not have a website yet?", "Yes. We can review your Google Maps page, social profiles and public information, then explain which official base to build first."],
      ["Is this useful if I already have a website?", "Yes. We check whether your website clearly explains your services, contacts, areas, languages and important answers."],
      ["Do you guarantee that Google or an AI tool will recommend me?", "No. Nobody can seriously guarantee that. We build the conditions that make your business easier to find, understand and cite."],
      ["What does the audit check?", "It checks website clarity, local profiles, maps, public information, useful answers, contact paths and AI-readiness signals."],
      ["What result do I receive after the visibility test?", "You receive a clearer view of weak points, useful improvements and the next actions to make the business easier to find and understand."],
      ["Can the audit help choose the right service?", "Yes. It helps decide whether the priority is local visibility, website structure, content, design, AI readiness or a digital tool."],
    ],
    fr: [
      ["Est-ce utile si je n'ai pas encore de site ?", "Oui. Nous pouvons analyser votre page Google Maps, vos reseaux sociaux, vos informations publiques et vous dire quelle base officielle construire en premier."],
      ["Est-ce utile si j'ai deja un site ?", "Oui. Nous regardons si votre site explique vraiment vos services, contacts, zones, langues et reponses importantes."],
      ["Garantissez-vous que Google ou une IA va me recommander ?", "Non. Personne ne peut garantir cela serieusement. Nous mettons en place les conditions pour etre plus facile a trouver, comprendre et citer."],
      ["Que verifie l'audit ?", "Il verifie la clarte du site, profils locaux, maps, informations publiques, reponses utiles, chemins de contact et signaux AI-ready."],
      ["Quel resultat recoit-on apres le test de visibilite ?", "Vous obtenez une vision plus claire des points faibles, ameliorations utiles et prochaines actions pour rendre l'entreprise plus facile a trouver et comprendre."],
      ["L'audit peut-il aider a choisir le bon service ?", "Oui. Il aide a savoir si la priorite est la visibilite locale, la structure du site, le contenu, le design, la preparation IA ou un outil digital."],
    ],
  },
};

function faqsForPage(pagePath, lang) {
  const aliasPath = {
    "/services/site-officiel": "/services/web-app",
    "/services/contenus-utiles": "/services/content-writing",
  }[pagePath] || pagePath;
  const localized = serviceFaqs[aliasPath]?.[lang];
  const source = localized || fallbackFaqs[lang] || serviceFaqs[aliasPath]?.en || fallbackFaqs.en;
  return source.map(([question, answer]) => ({ question, answer }));
}
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
    locales: ["en"],
    hreflang: {
      en: "en",
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
    locales: ["fr", "en"],
    hreflang: {
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
      title: "Creativa Poeta | Digital services for visibility, websites, AI and content",
      description:
        "Creativa Poeta helps businesses become easier to find, understand and contact with clear websites, local visibility, AI assistants, visual identity, content and digital assistance.",
    },
    fr: {
      title: "Creativa Poeta | Services digitaux pour visibilite, sites, IA et contenu",
      description:
        "Creativa Poeta aide les entreprises a etre trouvees, comprises et contactees grace a des sites clairs, la visibilite locale, les assistants IA, l'identite visuelle, le contenu et l'assistance numerique.",
    },
  },
  be: {
    fr: {
      title: "Creativa Poeta Belgique | Sites, visibilite, IA, design et contenu",
      description:
        "Creativa Poeta aide les entreprises en Belgique avec sites web, visibilite locale, assistants IA, design, contenus utiles et assistance numerique.",
    },
    nl: {
      title: "Creativa Poeta Belgie | Websites, zichtbaarheid, AI, design en content",
      description:
        "Creativa Poeta helpt bedrijven in Belgie met websites, lokale zichtbaarheid, AI-assistenten, design, nuttige content en digitale ondersteuning.",
    },
  },
  fr: {
    fr: {
      title: "Creativa Poeta France | Sites, visibilite, IA, design et contenu",
      description:
        "Creativa Poeta aide les entreprises en France avec sites web, visibilite moderne, assistants IA, identite visuelle, contenu et outils digitaux.",
    },
  },
  rw: {
    rw: {
      title: "Creativa Poeta Rwanda | Websites, visibility, AI, design and content",
      description:
        "Creativa Poeta ifasha business gutegura websites, visibility, AI assistants, visual identity, content na digital tools.",
    },
    fr: {
      title: "Creativa Poeta Rwanda | Sites, visibilite, IA, design et contenu",
      description:
        "Creativa Poeta aide les entreprises au Rwanda avec sites web, visibilite, assistants IA, design, contenu et outils digitaux.",
    },
    en: {
      title: "Creativa Poeta Rwanda | Websites, visibility, AI, design and content",
      description:
        "Creativa Poeta helps businesses in Rwanda with websites, visibility, AI assistants, visual identity, content and digital tools.",
    },
  },
  nl: {
    nl: {
      title: "Creativa Poeta Nederland | Websites, zichtbaarheid, AI, design en content",
      description:
        "Creativa Poeta helpt bedrijven in Nederland met websites, moderne zichtbaarheid, AI-assistenten, design, content en digitale tools.",
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
    homeTitle: "Creativa Poeta | Digital services for visibility, websites, AI and content",
    homeDescription:
      "Creativa Poeta helps businesses become easier to find, understand and contact with clear websites, local visibility, AI assistants, visual identity, useful content and digital assistance.",
    problemTitle: "One clear digital base for every service you offer.",
    problem:
      "Creativa Poeta brings together the foundations clients expect: a clear website, searchable services, local visibility, trustworthy visuals, useful content, AI-ready structure and simple ways to contact you.",
    officialSourceTitle: "Your services become clear, useful and easy to act on.",
    officialSource:
      "We structure your visibility, website, AI assistants, visual identity, documents and support paths so clients understand what you do and what to do next.",
    cta: "Test my visibility",
  },
  fr: {
    label: "Francais",
    prefix: "/fr",
    homePath: "/fr",
    homeTitle: "Creativa Poeta | Services digitaux pour visibilite, sites, IA et contenu",
    homeDescription:
      "Creativa Poeta aide les entreprises a etre trouvees, comprises et contactees avec des sites clairs, la visibilite locale, des assistants IA, une identite visuelle, du contenu utile et une assistance numerique.",
    problemTitle: "Une base digitale claire pour tous vos services.",
    problem:
      "Creativa Poeta rassemble les bases dont une entreprise a besoin: site clair, services faciles a comprendre, visibilite locale, visuels coherents, contenu utile, structure prete pour les IA et chemins de contact simples.",
    officialSourceTitle: "Vos services deviennent clairs, utiles et actionnables.",
    officialSource:
      "Nous structurons votre visibilite, votre site, vos assistants IA, votre identite visuelle, vos documents et vos parcours d'assistance pour que le client comprenne vite quoi faire.",
    cta: "Tester ma visibilite",
  },
  nl: {
    label: "Nederlands",
    prefix: "/nl",
    homePath: "/nl",
    homeTitle: "Creativa Poeta | Digitale diensten voor zichtbaarheid, websites, AI en content",
    homeDescription:
      "Creativa Poeta helpt bedrijven makkelijker gevonden, begrepen en gecontacteerd te worden met duidelijke websites, lokale zichtbaarheid, AI-assistenten, visuele identiteit, nuttige content en digitale ondersteuning.",
    problemTitle: "Een duidelijke digitale basis voor al uw diensten.",
    problem:
      "Creativa Poeta brengt de basis samen die klanten verwachten: een duidelijke website, vindbare diensten, lokale zichtbaarheid, herkenbare visuals, nuttige content, AI-ready structuur en eenvoudige contactpaden.",
    officialSourceTitle: "Uw diensten worden duidelijk, nuttig en makkelijk te gebruiken.",
    officialSource:
      "We structureren uw zichtbaarheid, website, AI-assistenten, visuele identiteit, documenten en ondersteuning zodat klanten snel begrijpen wat u doet.",
    cta: "Test mijn zichtbaarheid",
  },
  rw: {
    label: "Kinyarwanda",
    prefix: "/rw",
    homePath: "/rw",
    homeTitle: "Creativa Poeta | Websites, visibility, AI, design na content",
    homeDescription:
      "Creativa Poeta ifasha business gukora websites zisobanutse, visibility, AI assistants, visual identity, content na digital assistance.",
    problemTitle: "Digital base isobanutse kuri service zanyu.",
    problem:
      "Creativa Poeta ihuza ibikenewe: website isobanutse, services zigaragara, local visibility, visuals, content ifasha, AI-ready structure n'inzira zoroshye zo kubavugisha.",
    officialSourceTitle: "Services zanyu ziba zisobanutse kandi zoroshye gukoresha.",
    officialSource:
      "Dutunganya visibility, website, AI assistants, visual identity, documents na digital support kugira ngo abakiriya basobanukirwe vuba ibyo mukora.",
    cta: "Reba uko ugaragara",
  },
};

const richFrenchHome = {
  title: "Creativa Poeta | Services digitaux pour visibilite, sites, IA et contenu",
  description:
    "Creativa Poeta aide les entreprises a etre trouvees, comprises et contactees grace a des sites clairs, la visibilite locale, les assistants IA, l'identite visuelle, le contenu et l'assistance numerique.",
  sections: [
    [
      "Une base digitale claire pour tous vos services.",
      "Creativa Poeta rassemble les bases dont une entreprise a besoin: site clair, services faciles a comprendre, visibilite locale, visuels coherents, contenu utile, structure prete pour les IA et chemins de contact simples.",
    ],
    [
      "Visibilite locale, Google, maps et assistants IA",
      "Nous alignons vos informations publiques, vos pages services, vos profils locaux, vos questions-reponses et vos signaux techniques pour que les clients, moteurs de recherche et assistants modernes comprennent mieux votre activite.",
    ],
    [
      "Sites web, applications et outils digitaux",
      "Nous construisons ou refondons des sites, pages officielles, applications, tableaux de bord et outils internes qui presentent clairement vos services et transforment les demandes en actions.",
    ],
    [
      "Assistants IA, GPT personnalises et agents connectes",
      "Nous preparons des assistants capables de repondre avec vos informations, guider les clients, resumer vos documents, collecter les demandes et aider votre equipe sans remplacer le controle humain.",
    ],
    [
      "Identite visuelle, design et supports prets a publier",
      "Nous donnons une forme claire et reconnaissable a votre univers: logo, direction visuelle, posts, presentations, documents, affiches, brochures et supports adaptes a vos langues.",
    ],
    [
      "Contenus, documents, articles et reponses utiles",
      "Nous transformons vos idees en textes, pages, FAQ, articles, guides, rapports et documents professionnels qui expliquent votre valeur aux clients comme aux moteurs de recherche.",
    ],
    [
      "Assistance numerique et depannage technologique",
      "Nous aidons a installer, configurer, reparer, securiser ou mieux utiliser les appareils, comptes, outils en ligne, documents, achats, demarches et usages numeriques du quotidien.",
    ],
    [
      "Commencez par le bon chemin",
      "Un projet peut commencer par un test de visibilite, une demande d'assistance, une page officielle, une refonte, un outil ou un contenu. Le but est de choisir la priorite utile, pas d'ajouter du bruit.",
    ],
    [
      "Questions frequentes",
      "Creativa Poeta fait-il seulement de la visibilite ? Non. La visibilite est une base importante, mais nous travaillons aussi sur sites web, IA, design, contenu, outils digitaux et assistance numerique. Peut-on commencer petit ? Oui, avec une action prioritaire claire.",
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
      "Creativa Poeta, local visibility, websites, apps, AI assistants, graphic design, content writing, digital assistance, business digital tools",
    sections: (lang) => lang === "fr" ? richFrenchHome.sections : [
      [languages[lang].problemTitle, languages[lang].problem],
      [languages[lang].officialSourceTitle, languages[lang].officialSource],
      [
        "Six connected service families",
        "Visibility, websites, AI assistants, visual identity, content and digital assistance work better when they share the same clear business information.",
      ],
      [
        "Start with the useful next step",
        "You can test your visibility, start a project, request digital assistance or explore a service page depending on the most urgent need.",
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
  legalNotice: {
    path: "/mentions-legales",
    title: () => "Legal notice | Creativa Poeta",
    description: () =>
      "Legal notice, publisher information, hosting and contact details for Creativa Poeta.",
    keywords: "Creativa Poeta legal notice, legal mentions, publisher information",
    sections: () => [
      [
        "Legal notice",
        "This page presents the publisher, hosting information, intellectual property rules and contact details for Creativa Poeta.",
      ],
    ],
  },
  privacyCookies: {
    path: "/confidentialite-cookies",
    title: () => "Privacy and cookies | Creativa Poeta",
    description: () =>
      "Privacy policy, personal data, cookie choices and user rights for Creativa Poeta.",
    keywords: "Creativa Poeta privacy, cookies, personal data, GDPR",
    sections: () => [
      [
        "Privacy and cookies",
        "This page explains how Creativa Poeta handles personal data, cookie preferences, analytics and user rights.",
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
  aiAutomation: {
    path: "/services/ia-automatisation",
    title: (lang) =>
      lang === "fr"
        ? "Assistants IA, GPT personnalises et agents | Creativa Poeta"
        : lang === "nl"
          ? "AI-assistenten, GPTs en verbonden agents | Creativa Poeta"
          : lang === "rw"
            ? "AI assistants, GPT na agents | Creativa Poeta"
            : "AI assistants, custom GPTs and connected agents | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Creez des assistants IA, GPT personnalises, chatbots et agents connectes capables de comprendre vos informations et d'aider vos clients ou vos equipes."
        : lang === "nl"
          ? "Maak AI-assistenten, aangepaste GPTs, chatbots en verbonden agents die uw informatie begrijpen en uw klanten of teams helpen."
          : lang === "rw"
            ? "Dukora AI assistants, GPT, chatbots na agents zifasha abakiriya cyangwa team yawe gukoresha amakuru ya business."
            : "Create AI assistants, custom GPTs, chatbots and connected agents that understand your information and support your clients or teams.",
    keywords:
      "AI assistant, custom GPT, chatbot, connected agent, business automation, knowledge base, Creativa Poeta",
    sections: (lang) => [
      [
        lang === "fr" ? "Un assistant IA base sur vos vraies informations" : "An AI assistant based on your real information",
        lang === "fr"
          ? "Nous structurons vos documents, services, questions frequentes et processus pour creer un assistant utile, clair et controle."
          : "We structure your documents, services, frequently asked questions and processes to create a useful, clear and controlled assistant.",
      ],
      [
        lang === "fr" ? "Des agents qui peuvent passer a l'action" : "Agents that can take action",
        lang === "fr"
          ? "Selon votre besoin, l'agent peut aider a repondre, qualifier une demande, preparer un message, creer une fiche ou guider une etape."
          : "Depending on your need, the agent can help answer, qualify a request, prepare a message, create a record or guide a step.",
      ],
    ],
  },
  digitalAssistance: {
    path: "/services/assistance-numerique",
    title: (lang) =>
      lang === "fr"
        ? "Assistance numerique et depannage tech | Creativa Poeta"
        : lang === "nl"
          ? "Digitale hulp en technische ondersteuning | Creativa Poeta"
          : lang === "rw"
            ? "Assistance numerique na depannage | Creativa Poeta"
            : "Digital assistance and technology support | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Depannage informatique, configuration d'appareils, securite, achats en ligne, demarches administratives et accompagnement numerique pas a pas."
        : lang === "nl"
          ? "Hulp met apparaten, installatie, beveiliging, online aankopen, administratie en stap-voor-stap digitale begeleiding."
          : lang === "rw"
            ? "Ubufasha mu gukoresha devices, installation, security, online services no gukoresha technology intambwe ku yindi."
            : "Troubleshooting, device setup, security, online shopping, administrative procedures and step-by-step digital guidance.",
    keywords:
      "digital assistance, computer troubleshooting, device setup, online help, technology support, digital guidance, Creativa Poeta",
    sections: (lang) => [
      [
        lang === "fr" ? "Une aide numerique humaine et claire" : "Human and clear digital support",
        lang === "fr"
          ? "Nous aidons a installer, configurer, securiser et comprendre les outils numeriques sans jargon inutile."
          : "We help install, configure, secure and understand digital tools without unnecessary jargon.",
      ],
      [
        lang === "fr" ? "Pour les appareils, comptes et demarches" : "For devices, accounts and online tasks",
        lang === "fr"
          ? "Ordinateur, smartphone, imprimante, Wi-Fi, comptes, sauvegardes, documents, achats en ligne ou reseaux sociaux."
          : "Computer, smartphone, printer, Wi-Fi, accounts, backups, documents, online shopping or social media.",
      ],
    ],
  },
  visibilityTool: {
    path: "/tester-visibilite",
    title: (lang) =>
      lang === "fr"
        ? "Tester ma visibilite Google, maps et IA | Creativa Poeta"
        : lang === "nl"
          ? "Test mijn zichtbaarheid op Google, maps en AI | Creativa Poeta"
          : lang === "rw"
            ? "Suzuma visibility yawe kuri Google, maps na AI | Creativa Poeta"
            : "Test my Google, maps and AI visibility | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Testez rapidement votre presence actuelle sur Google, maps, profils publics et outils IA, puis envoyez votre demande a Creativa Poeta."
        : "Quickly test your current presence on Google, maps, public profiles and AI tools, then send your request to Creativa Poeta.",
    keywords:
      "visibility test, AI visibility audit, Google Maps audit, local SEO audit, voice search audit, Creativa Poeta",
    sections: (lang) => [
      [
        lang === "fr" ? "Un premier diagnostic de visibilite" : "A first visibility diagnosis",
        lang === "fr"
          ? "Le test aide a voir si votre entreprise est facile a trouver, comprendre et contacter sur les canaux importants."
          : "The test helps check whether your business is easy to find, understand and contact across important channels.",
      ],
    ],
  },
  digitalAssistanceRequest: {
    path: "/demander-assistance-numerique",
    title: (lang) =>
      lang === "fr"
        ? "Demander une assistance numerique | Creativa Poeta"
        : lang === "nl"
          ? "Digitale hulp aanvragen | Creativa Poeta"
          : lang === "rw"
            ? "Saba assistance numerique | Creativa Poeta"
            : "Request digital assistance | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Envoyez une demande d'aide pour depannage, configuration d'appareil, securite, comptes, achats en ligne ou demarches numeriques."
        : "Send a request for troubleshooting, device setup, security, accounts, online shopping or digital procedures.",
    keywords:
      "request digital assistance, technology help, computer support, device setup, Creativa Poeta",
    sections: (lang) => [
      [
        lang === "fr" ? "Expliquez votre besoin numerique" : "Explain your digital need",
        lang === "fr"
          ? "Nous recevons votre demande et pouvons vous guider sur le bon niveau d'assistance."
          : "We receive your request and can guide you to the right level of support.",
      ],
    ],
  },
  answers: {
    path: "/answers",
    title: (lang) =>
      lang === "fr"
        ? "Questions sur la visibilite moderne, Google et IA | Creativa Poeta"
        : lang === "nl"
          ? "Vragen over moderne zichtbaarheid, Google en AI | Creativa Poeta"
          : lang === "rw"
            ? "Questions about Google, maps and AI visibility | Creativa Poeta"
            : "Questions about modern visibility, Google and AI | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Reponses claires aux questions que les clients posent a Google, aux assistants vocaux et aux IA sur la visibilite, les sites, maps, contenus et outils digitaux."
        : "Clear answers to questions clients ask Google, voice assistants and AI tools about visibility, websites, maps, content and digital tools.",
    keywords:
      "AI visibility questions, AEO questions, GEO questions, Google Maps visibility, voice search, Creativa Poeta",
    sections: (lang) => [
      [
        lang === "fr" ? "Comment faire pour que mon entreprise soit trouvee sur Google et Google Maps ?" : "How can my business be found on Google and Google Maps?",
        lang === "fr"
          ? "Il faut aligner le site, la fiche Google, les services, les zones, les avis, les horaires, les photos et les liens."
          : "Align the website, Google profile, services, areas, reviews, hours, photos and links.",
      ],
      [
        lang === "fr" ? "Comment etre recommande par ChatGPT, Gemini ou Perplexity ?" : "How can a business be recommended by ChatGPT, Gemini or Perplexity?",
        lang === "fr"
          ? "Les moteurs IA comprennent mieux une entreprise quand les pages, services, reponses, preuves publiques et donnees structurees sont clairs."
          : "AI engines understand a business better when pages, services, answers, public proof and structured data are clear.",
      ],
      [
        lang === "fr" ? "Est-ce qu'un site web suffit pour etre visible ?" : "Is a website enough to be visible?",
        lang === "fr"
          ? "Non. Le site est la base officielle, mais il doit etre relie aux maps, profils sociaux, contenus, FAQ et schema.org."
          : "No. The website is the official base, but it should connect with maps, social profiles, content, FAQ and schema.org.",
      ],
      [
        lang === "fr" ? "Pourquoi mon entreprise n'apparait pas bien dans les recherches locales ?" : "Why does my business not appear well in local searches?",
        lang === "fr"
          ? "Souvent les categories, services, zones, avis ou informations publiques sont incomplets ou incoherents."
          : "Often categories, services, areas, reviews or public information are incomplete or inconsistent.",
      ],
      [
        lang === "fr" ? "Quels contenus faut-il creer pour attirer les bons clients ?" : "What content should attract the right clients?",
        lang === "fr"
          ? "Il faut des pages services, des FAQ, articles utiles, exemples concrets, pages locales et reponses claires."
          : "You need service pages, FAQ, useful articles, concrete examples, local pages and clear answers.",
      ],
      [
        lang === "fr" ? "Comment rendre mon site lisible par les assistants vocaux et les IA ?" : "How do I make my site readable for voice assistants and AI tools?",
        lang === "fr"
          ? "Le site doit avoir une structure simple, des titres explicites, des reponses courtes, schema.org, un sitemap et des liens internes."
          : "The site needs simple structure, explicit headings, short answers, schema.org, a sitemap and internal links.",
      ],
    ],
  },
  knowledge: {
    path: "/knowledge",
    title: (lang) =>
      lang === "fr"
        ? "Glossaire SEO, AEO, GEO et visibilite IA | Creativa Poeta"
        : lang === "nl"
          ? "Glossarium SEO, AEO, GEO en AI-zichtbaarheid | Creativa Poeta"
          : lang === "rw"
            ? "Glossary ya SEO, AEO, GEO na AI visibility | Creativa Poeta"
            : "SEO, AEO, GEO and AI visibility glossary | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Definitions claires sur le SEO, AEO, GEO, visibilite locale, sites AI-ready, schema.org, assistants IA et contenu utile."
        : lang === "nl"
          ? "Duidelijke definities over SEO, AEO, GEO, lokale zichtbaarheid, AI-klare websites, schema.org, AI-assistenten en nuttige content."
          : lang === "rw"
            ? "Ibisobanuro bigufi kuri SEO, AEO, GEO, local visibility, AI-ready websites, schema.org, AI assistants na useful content."
            : "Clear definitions about SEO, AEO, GEO, local visibility, AI-ready websites, schema.org, AI assistants and useful content.",
    keywords:
      "SEO, AEO, GEO, AI visibility, schema.org, local visibility, AI-ready website, Creativa Poeta",
    sections: (lang) => [
      [
        lang === "fr" ? "Qu'est-ce que le SEO ?" : "What is SEO?",
        lang === "fr"
          ? "Le SEO aide une page a etre trouvee dans les moteurs de recherche grace a sa structure, son contenu, ses liens et sa credibilite."
          : "SEO helps a page be found in search engines through structure, content, links, performance and credibility.",
      ],
      [
        lang === "fr" ? "Qu'est-ce que l'AEO ?" : "What is AEO?",
        lang === "fr"
          ? "L'AEO consiste a formuler des reponses directes aux questions des utilisateurs pour les moteurs de reponse et assistants vocaux."
          : "AEO creates direct answers to user questions for answer engines, voice assistants and featured results.",
      ],
      [
        lang === "fr" ? "Qu'est-ce que le GEO ?" : "What is GEO?",
        lang === "fr"
          ? "Le GEO optimise une marque pour etre comprise, citee ou recommandee par les moteurs generatifs comme ChatGPT, Gemini ou Perplexity."
          : "GEO prepares a brand to be understood, cited or recommended by generative engines such as ChatGPT, Gemini or Perplexity.",
      ],
      [
        lang === "fr" ? "C'est quoi un site AI-ready ?" : "What is an AI-ready website?",
        lang === "fr"
          ? "Un site AI-ready contient des textes lisibles, des pages services claires, des donnees structurees et des chemins de contact faciles."
          : "An AI-ready website has readable content, clear service pages, structured data and simple contact paths.",
      ],
    ],
  },
  referralProgram: {
    path: "/referral-partners",
    title: (lang) =>
      lang === "fr"
        ? "Programme d'apporteurs de clients | Creativa Poeta"
        : lang === "nl"
          ? "Programma voor klantenaanbrengers | Creativa Poeta"
          : lang === "rw"
            ? "Creativa Poeta Referral Partner Program"
            : "Client Introduction Program | Creativa Poeta",
    description: (lang) =>
      lang === "fr"
        ? "Presentez a Creativa Poeta une entreprise qui a besoin de services numeriques et gagnez une recompense lorsque le client paie."
        : lang === "nl"
          ? "Breng Creativa Poeta in contact met een bedrijf dat digitale diensten nodig heeft en ontvang een beloning wanneer de klant betaalt."
          : lang === "rw"
            ? "Tumenyeshe business ikeneye digital services, CP ikore delivery, nawe ubone reward client amaze kwishyura."
            : "Introduce a business that needs digital services. Creativa Poeta handles sales and delivery, and rewards successful referrals.",
    keywords:
      "Creativa Poeta referral program, referral partner, business partner, digital services referral reward",
    sections: (lang) =>
      lang === "fr"
        ? [
            [
              "Votre reseau a de la valeur",
              "Faites une introduction authentique. Creativa Poeta qualifie, vend et realise le projet. Vous recevez normalement 10 % du revenu admissible encaisse.",
            ],
            [
              "Referral Partner ou Business Partner",
              "Le programme standard est ouvert aux introductions ponctuelles; les professionnels peuvent demander des conditions personnalisees.",
            ],
          ]
        : [
            [
              "Your network has value",
              "Make a genuine introduction. Creativa Poeta qualifies, sells and delivers the project. You normally receive 10% of eligible revenue collected.",
            ],
            [
              "Referral Partner or Business Partner",
              "The standard program supports occasional introductions, while professionals can request custom terms.",
            ],
          ],
  },
  career: {
    path: "/career",
    title: (lang) =>
      lang === "fr" ? "Carrieres, opportunites et candidatures | Creativa Poeta"
        : lang === "nl" ? "Carriere, kansen en sollicitaties | Creativa Poeta"
          : lang === "rw" ? "Career & opportunities | Creativa Poeta"
            : "Careers, opportunities and applications | Creativa Poeta",
    description: (lang) =>
      lang === "fr" ? "Decouvrez les opportunites chez Creativa Poeta, le programme d'apporteurs de clients et la candidature spontanee."
        : lang === "nl" ? "Bekijk kansen bij Creativa Poeta, het programma voor klantenaanbrengers en spontane sollicitaties."
          : lang === "rw" ? "Reba opportunities za Creativa Poeta, client introducer program na spontaneous applications."
            : "Explore opportunities at Creativa Poeta, the client introduction program and spontaneous applications.",
    keywords: "Creativa Poeta careers, digital jobs, spontaneous application, client introducer program",
    sections: (lang) => [[lang === "fr" ? "Construisons quelque chose d'utile" : "Build something useful with us", lang === "fr" ? "Consultez les postes ouverts ou envoyez votre profil pour de futures missions." : "Explore open roles or share your profile for future assignments."]],
  },
  referralTerms: {
    path: "/referral-program-terms",
    title: (lang) => lang === "fr" ? "Conditions du Referral Partner Program | Creativa Poeta" : lang === "nl" ? "Voorwaarden Referral Partner Program | Creativa Poeta" : "Referral Partner Program Terms | Creativa Poeta",
    description: (lang) => lang === "fr" ? "Regles concernant les referrals valides, l'attribution, le revenu admissible et le paiement des recompenses CPRPP." : lang === "nl" ? "Regels voor geldige referrals, toewijzing, in aanmerking komende omzet en beloningen." : "Rules for valid referrals, attribution, eligible revenue and reward payments in the CPRPP.",
    keywords: "CPRPP terms, referral program terms, Creativa Poeta",
    sections: (lang) => [[lang === "fr" ? "Des regles transparentes" : "Transparent rules", lang === "fr" ? "Les conditions expliquent clairement ce qui constitue un referral valide et quand une recompense devient payable." : "The terms clearly explain what qualifies as a valid referral and when a reward becomes payable."]],
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

function normalizeRelatedTerm(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function relatedWords(blog) {
  return new Set(
    normalizeRelatedTerm(
      `${blog.title || ""} ${blog.focusKeyword || ""} ${(blog.tags || []).join(" ")}`
    )
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length >= 4)
  );
}

function relatedBlogScore(source, candidate) {
  let score = 0;
  const sourceCategory = normalizeRelatedTerm(source.category);
  const sourceKeyword = normalizeRelatedTerm(source.focusKeyword);
  const sourceTags = new Set((source.tags || []).map(normalizeRelatedTerm).filter(Boolean));

  if (sourceCategory && sourceCategory === normalizeRelatedTerm(candidate.category)) score += 8;
  if (sourceKeyword && sourceKeyword === normalizeRelatedTerm(candidate.focusKeyword)) score += 10;
  for (const tag of candidate.tags || []) {
    if (sourceTags.has(normalizeRelatedTerm(tag))) score += 4;
  }

  const sourceTerms = relatedWords(source);
  for (const term of relatedWords(candidate)) {
    if (sourceTerms.has(term)) score += 1;
  }
  return score;
}

function relatedBlogsFor(blog, limit = 3) {
  return publishedBlogs
    .filter(
      (candidate) =>
        candidate.slug !== blog.slug && candidate.language === blog.language
    )
    .map((candidate) => ({ candidate, score: relatedBlogScore(blog, candidate) }))
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return String(right.candidate.publishedAt || right.candidate.createdAt || "").localeCompare(
        String(left.candidate.publishedAt || left.candidate.createdAt || "")
      );
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
function globalBlogPath(blog) {
  const prefix = blog.language === "en" ? "" : `/${blog.language}`;
  return `${prefix}/blogs/${blog.slug}`;
}

function relatedBlogPath(page, blog) {
  if (!page.market) return globalBlogPath(blog);
  const config = marketHosts[page.market];
  return localizedMarketPath(blog.language, config.locales[0], `/blogs/${blog.slug}`);
}

function relatedBlogUrl(page, blog) {
  const baseUrl = page.market ? marketHosts[page.market].baseUrl : siteUrl;
  return `${baseUrl}${relatedBlogPath(page, blog)}`;
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
    "Local visibility and Google Maps",
    "AI visibility and answer engine readiness",
    "Websites, apps and digital tools",
    "AI assistants, GPTs and automation",
    "Visual identity and graphic design",
    "Content writing, documents and useful pages",
    "Digital assistance and technology support",
  ];
  const pathSegments = new URL(page.url).pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !["en", "fr", "nl", "rw"].includes(segment));
  const servicePage = serviceForPath(page.template.path);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: marketConfig.baseUrl,
    },
    ...pathSegments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      item: `${marketConfig.baseUrl}/${pathSegments.slice(0, index + 1).join("/")}`,
    })),
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
              isRelatedTo: relatedBlogsFor(page.blog).map((related) => ({
                "@type": "BlogPosting",
                headline: related.title,
                url: relatedBlogUrl(page, related),
              })),
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
        breadcrumb: {
          "@id": `${page.url}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${page.url}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
      ...(page.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${page.url}#faq`,
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
      ...(servicePage
        ? [
            {
              "@type": "Service",
              "@id": `${page.url}#service`,
              name: servicePage.name,
              serviceType: servicePage.serviceType,
              description: servicePage.description,
              url: page.url,
              provider: {
                "@id": `${marketConfig.baseUrl}/#professionalservice`,
              },
              areaServed: serviceArea,
              availableLanguage: marketConfig.locales.map(languageName),
              mainEntityOfPage: {
                "@id": `${page.url}#webpage`,
              },
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                url: page.url,
                seller: {
                  "@id": `${marketConfig.baseUrl}/#professionalservice`,
                },
              },
            },
          ]
        : []),
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
        sameAs: brandSameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Creativa Poeta service catalog",
          itemListElement: serviceCatalog.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.name,
              serviceType: service.serviceType,
              description: service.description,
              provider: {
                "@id": `${marketConfig.baseUrl}/#professionalservice`,
              },
              areaServed: serviceArea,
              availableLanguage: marketConfig.locales.map(languageName),
            },
          })),
        },
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
      .cp-prerender__related { margin-top: 38px; padding-top: 24px; border-top: 1px solid #526174; }
      .cp-prerender__related ul { padding: 0; list-style: none; }
      .cp-prerender .cp-prerender__related a { display: block; margin-top: 10px; padding: 12px 0; color: #fff200; background: transparent; }
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
    const relatedTitle = {
      fr: "A lire aussi",
      en: "Related articles",
      nl: "Lees ook",
      rw: "Soma kandi",
    }[page.lang] || "Related articles";
    const relatedMarkup = relatedBlogsFor(page.blog)
      .map((related) =>
        `<li><a href="${escapeHtml(relatedBlogPath(page, related))}">${escapeHtml(related.title)}</a></li>`
      )
      .join("");

    return `<div id="root">
      <main class="cp-prerender" data-cp-prerender="true">
        <article class="cp-prerender__inner cp-prerender__article">
          <p class="cp-prerender__meta">${escapeHtml(page.blog.category || "Conseils")} - ${escapeHtml(publishedDate)}</p>
          <h1>${escapeHtml(page.blog.title)}</h1>
          <p class="cp-prerender__excerpt">${escapeHtml(page.blog.excerpt || page.description)}</p>
          <div class="cp-prerender__content">${sanitizeArticleHtml(page.blog.content)}</div>
          ${relatedMarkup ? `<nav class="cp-prerender__related" aria-label="${escapeHtml(relatedTitle)}"><h2>${escapeHtml(relatedTitle)}</h2><ul>${relatedMarkup}</ul></nav>` : ""}
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
    faqs: !route.blog && route.template.path === "/answers"
      ? route.template.sections(route.lang).map(([question, answer]) => ({ question, answer }))
      : !route.blog && route.template.path.startsWith("/services/")
        ? faqsForPage(route.template.path, route.lang)
        : [],
  };

  const output = applyFallback(applyMeta(baseHtml, page), page);
  const filePath = routeToFile(route.outputPath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, output, "utf8");
}

const redirectedPagePaths = new Set([
  "/services/audit-visibilite",
  "/services/site-officiel",
  "/services/contenus-utiles",
]);

const sitemapPagePaths = [
  ...new Set(
    Object.values(pageTemplates)
      .map((template) => template.path)
      .filter((pagePath) => !redirectedPagePaths.has(pagePath))
  ),
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
Llms-Txt: ${siteUrl}/llms.txt
Llms-Full: ${siteUrl}/llms-full.txt
`,
    "utf8"
  );
}

writeSitemapFiles();

console.log(`Pre-rendered ${routeDefinitions.length} SEO pages (${publishedBlogs.length} published blog article(s)).`);

