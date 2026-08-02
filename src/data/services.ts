export type ServiceCode =
  | "ai-visibility"
  | "ai-ready-websites"
  | "brand-content"
  | "programmatic-growth";

export type ServiceSummary = {
  code: ServiceCode;
  priority: number;
  title: string;
  shortTitle: string;
  slug: string;
  summary: string;
  primaryCta: string;
};

export const serviceSummariesFr: ServiceSummary[] = [
  {
    code: "ai-visibility",
    priority: 1,
    title: "Être trouvé dans Google, les maps et les IA",
    shortTitle: "Être trouvé",
    slug: "/services/visibilite-ia-recherche-locale",
    summary:
      "Nous aidons votre entreprise à être plus facile a trouver dans Google, les maps, les recherches vocales et les moteurs IA.",
    primaryCta: "Améliorer ma visibilité",
  },
  {
    code: "ai-ready-websites",
    priority: 2,
    title: "Un site qui explique clairement votre entreprise",
    shortTitle: "Site clair",
    slug: "/services/sites-web-prets-pour-ia",
    summary:
      "Nous creons ou refondons votre site pour en faire une source officielle claire, utile et evolutive.",
    primaryCta: "Construire mon site",
  },
  {
    code: "brand-content",
    priority: 3,
    title: "Un message et une image plus clairs",
    shortTitle: "Message & image",
    slug: "/services/marque-contenu-systemes-creatifs",
    summary:
      "Nous clarifions votre message, votre image et vos contenus pour que votre entreprise soit comprise plus vite.",
    primaryCta: "Clarifier ma marque",
  },
  {
    code: "programmatic-growth",
    priority: 4,
    title: "Plus de pages utiles pour plus de recherches",
    shortTitle: "Pages utiles",
    slug: "/services/croissance-programmatique",
    summary:
      "Nous creons des structures de pages utiles pour répondre à des recherches précises sans contenu inutile.",
    primaryCta: "Construire ma strategie",
  },
];
