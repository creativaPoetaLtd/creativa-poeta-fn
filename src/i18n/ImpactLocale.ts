export type ImpactLanguage = "fr" | "en" | "nl";

export type ImpactCopy = {
  navLabel: string;
  navText: string;
  eyebrow: string;
  program: string;
  title: string;
  titleAccent: string;
  intro: string;
  apply: string;
  discover: string;
  trust: string[];
  capacity: string;
  whyEyebrow: string;
  whyTitle: string;
  whyBody: string;
  frictions: string[];
  audienceEyebrow: string;
  audienceTitle: string;
  audienceIntro: string;
  audiences: Array<{ title: string; text: string }>;
  solutionsEyebrow: string;
  solutionsTitle: string;
  solutionsIntro: string;
  solutions: Array<{ title: string; summary: string; items: string[]; note?: string }>;
  promiseEyebrow: string;
  promiseTitle: string;
  promiseIntro: string;
  promises: Array<{ title: string; text: string; items: string[] }>;
  processEyebrow: string;
  processTitle: string;
  process: Array<{ title: string; text: string }>;
  selectionEyebrow: string;
  selectionTitle: string;
  selectionIntro: string;
  selectionGroups: Array<{ title: string; items: string[]; tone: "yes" | "priority" | "no" }>;
  showCriteria: string;
  hideCriteria: string;
  examplesEyebrow: string;
  examplesTitle: string;
  examplesNote: string;
  examples: Array<{ title: string; problem: string; solution: string }>;
  problemLabel: string;
  solutionLabel: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalText: string;
  emailTeam: string;
  disclaimer: string;
  form: {
    close: string;
    eyebrow: string;
    title: string;
    intro: string;
    step: string;
    steps: string[];
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
    country: string;
    organization: string;
    organizationType: string;
    organizationTypes: string[];
    mission: string;
    beneficiaries: string;
    verification: string;
    needs: string;
    needOptions: string[];
    problem: string;
    result: string;
    deadline: string;
    externalCosts: string;
    externalCostOptions: string[];
    representationConsent: string;
    selectionConsent: string;
    privacyConsent: string;
    privacyLink: string;
    previous: string;
    next: string;
    submit: string;
    submitting: string;
    required: string;
    needsRequired: string;
    successTitle: string;
    successText: string;
    successNote: string;
    closeSuccess: string;
    error: string;
  };
};

const fr: ImpactCopy = {
  navLabel: "Impact",
  navText: "Nos compétences numériques au service des projets utiles",
  eyebrow: "Une initiative Creativa Poeta",
  program: "Une Pierre de Plus",
  title: "Vos actions changent des vies.",
  titleAccent: "Le numérique peut amplifier leur impact.",
  intro:
    "Nous accompagnons gratuitement ou à conditions solidaires des associations, églises, ONG et initiatives à impact qui ont un besoin numérique concret et des ressources limitées.",
  apply: "Présenter votre projet",
  discover: "Découvrir le programme",
  trust: ["Candidature gratuite", "Aucun abonnement", "Aucun accès bancaire"],
  capacity:
    "Les places sont limitées. Chaque demande est étudiée selon son impact, son urgence, sa faisabilité et nos capacités disponibles.",
  whyEyebrow: "Pourquoi cette initiative",
  whyTitle: "Les bonnes initiatives ne devraient pas être invisibles.",
  whyBody:
    "La technologie ne sert pas uniquement à vendre davantage. Elle peut aider une communauté à accueillir, une association à organiser ses actions, une école à accompagner ses élèves ou une œuvre à atteindre les personnes qui ont besoin d’elle.",
  frictions: [
    "Informations dispersées entre le site et les réseaux",
    "Inscriptions et demandes encore traitées à la main",
    "Équipe trop petite pour structurer les outils numériques",
  ],
  audienceEyebrow: "Pour qui ?",
  audienceTitle: "Votre projet peut être concerné si vous agissez pour les autres.",
  audienceIntro:
    "Le programme est ouvert sans discrimination religieuse. Nous cherchons une utilité sociale réelle et un besoin clairement défini.",
  audiences: [
    { title: "Associations & ONG", text: "Solidarité, intégration, aide aux familles et action humanitaire." },
    { title: "Églises & ministères", text: "Communautés locales, missions, médias et programmes de jeunesse." },
    { title: "Éducation & jeunesse", text: "Formation, mentorat, alphabétisation et inclusion numérique." },
    { title: "Action sociale", text: "Santé communautaire, handicap, aide alimentaire et accompagnement." },
    { title: "Culture & communauté", text: "Initiatives artistiques, citoyennes et interculturelles à impact." },
    { title: "Environnement", text: "Sensibilisation, économie circulaire et projets climatiques locaux." },
  ],
  solutionsEyebrow: "Notre contribution",
  solutionsTitle: "Une première pierre numérique, précise et utile.",
  solutionsIntro:
    "Choisissez une famille de besoins pour voir ce que nous pouvons raisonnablement débloquer en premier.",
  solutions: [
    {
      title: "Présence en ligne",
      summary: "Rendre votre action claire, accessible et facile à trouver.",
      items: ["Landing page ou petit site", "Page d’événement", "Amélioration mobile", "Structure multilingue"],
    },
    {
      title: "Formulaires & organisation",
      summary: "Réduire les tâches répétitives et mieux orienter les demandes.",
      items: ["Inscriptions et bénévolat", "Confirmation automatique", "Tableau de suivi simple", "Centralisation des demandes"],
    },
    {
      title: "Communication visuelle",
      summary: "Présenter votre mission avec cohérence et dignité.",
      items: ["Affiche ou flyer", "Kit de publications", "Présentation", "Rapport d’activité"],
    },
    {
      title: "Automatisation & IA",
      summary: "Gagner du temps, quand l’usage est pertinent et responsable.",
      items: ["Transcription et sous-titrage", "Classement de contenus", "Newsletter simple", "Recherche dans des ressources"],
      note: "Les contenus sensibles, religieux, médicaux ou sociaux restent toujours soumis à une validation humaine.",
    },
  ],
  promiseEyebrow: "Un échange transparent",
  promiseTitle: "Gratuit ne signifie ni caché, ni sans limites.",
  promiseIntro:
    "Nous définissons une première réalisation par écrit. Vous savez ce qui est inclus, ce qui ne l’est pas et qui garde le contrôle.",
  promises: [
    {
      title: "Ce que nous offrons",
      text: "Le temps de conception et de réalisation du premier lot convenu.",
      items: ["Périmètre écrit", "Corrections raisonnables", "Fichiers et accès", "Documentation simple"],
    },
    {
      title: "Ce qui peut rester payant",
      text: "Uniquement des services externes validés avant le démarrage.",
      items: ["Domaine ou hébergement", "Licence ou outil tiers", "Email, SMS ou IA", "Paiement direct au fournisseur"],
    },
    {
      title: "Ce que nous pouvons demander",
      text: "Après satisfaction, votre accord pour raconter honnêtement le projet.",
      items: ["Étude de cas validée", "Témoignage libre", "Crédit discret", "Aucun engagement futur"],
    },
    {
      title: "Ce qui reste à vous",
      text: "Votre organisation conserve la propriété et la maîtrise de son projet.",
      items: ["Domaine et contenus", "Données et comptes", "Accès remis à la fin", "Confidentialité et RGPD"],
    },
  ],
  processEyebrow: "Comment ça marche",
  processTitle: "De votre besoin à une solution utile.",
  process: [
    { title: "Présentez votre mission", text: "Expliquez votre action, le public aidé et le problème à résoudre." },
    { title: "Nous étudions la demande", text: "Nous vérifions l’impact, le besoin, la faisabilité et les risques." },
    { title: "Définissons la première pierre", text: "Un échange de 20 à 30 minutes permet de fixer un résultat limité." },
    { title: "Réalisons et transmettons", text: "Vous validez les étapes, puis recevez le livrable, les accès et les instructions." },
  ],
  selectionEyebrow: "Sélection",
  selectionTitle: "Nous ne pouvons pas tout réaliser, mais nous étudions chaque demande sérieuse.",
  selectionIntro:
    "Déposer une demande ne garantit pas sa sélection. Si nous ne pouvons pas intervenir, nous pouvons proposer une version réduite, une autre période ou une alternative.",
  selectionGroups: [
    { title: "Ce que nous recherchons", tone: "yes", items: ["Impact positif concret", "Organisation ou responsable identifiable", "Besoin précis et réaliste", "Interlocuteur disponible pour collaborer"] },
    { title: "Nos priorités possibles", tone: "priority", items: ["Petites structures avec peu de ressources", "Projets en Belgique ou au Rwanda", "Jeunes et publics vulnérables", "Résultat utile et mesurable"] },
    { title: "Ce que nous refusons", tone: "no", items: ["Fraude, haine ou discrimination", "Collecte de fonds douteuse", "Usage non protégé de données sensibles", "Bénéfice commercial déguisé en action sociale"] },
  ],
  showCriteria: "Voir nos critères",
  hideCriteria: "Masquer les critères",
  examplesEyebrow: "Exemples",
  examplesTitle: "À quoi peut ressembler une première pierre ?",
  examplesNote: "Scénarios illustratifs — ils ne sont pas présentés comme des réalisations déjà livrées.",
  examples: [
    { title: "Une association éducative", problem: "Inscriptions manuelles et confirmations répétitives.", solution: "Un formulaire, un tableau de suivi et une confirmation automatique." },
    { title: "Une église locale", problem: "Horaires et informations dispersés sur Facebook et WhatsApp.", solution: "Une page officielle claire pour accueillir et orienter les visiteurs." },
    { title: "Une petite ONG", problem: "Son action est difficile à présenter aux partenaires.", solution: "Une page institutionnelle, des preuves d’impact et un formulaire adapté." },
  ],
  problemLabel: "Le problème",
  solutionLabel: "La première pierre",
  faqEyebrow: "Questions fréquentes",
  faqTitle: "Des réponses claires avant de vous engager.",
  faqs: [
    { question: "Est-ce réellement gratuit ?", answer: "Oui, pour un projet sélectionné et dans le périmètre écrit. Certains frais externes peuvent être nécessaires, mais ils sont annoncés avant et payés directement au fournisseur." },
    { question: "Devons-nous être une organisation chrétienne ?", answer: "Non. Les œuvres chrétiennes sont les bienvenues, comme les initiatives éducatives, sociales, culturelles, environnementales et communautaires qui respectent nos critères." },
    { question: "Devons-nous donner nos mots de passe ?", answer: "Non pour candidater ou recevoir une première maquette. Si un accès devient nécessaire, nous expliquons pourquoi et demandons uniquement le niveau minimal." },
    { question: "À qui appartiendra le résultat ?", answer: "L’organisation conserve ses contenus, son domaine, ses données et les comptes ouverts à son nom. Les modalités exactes sont écrites dans l’accord." },
    { question: "Pouvons-nous demander un grand site ou une application ?", answer: "Le programme vise une première intervention limitée. Un besoin plus grand peut être découpé en phases, proposé à tarif solidaire ou financé par un partenaire d’impact." },
  ],
  finalTitle: "Vous construisez quelque chose d’utile ? Nous pouvons peut-être apporter une pierre.",
  finalText: "Décrivez simplement votre mission, votre problème et le résultat souhaité. Aucun vocabulaire technique n’est nécessaire.",
  emailTeam: "Écrire à l’équipe Impact",
  disclaimer: "Creativa Poeta Impact n’est pas un fonds de financement et ne verse pas d’argent. Le programme apporte des compétences et des réalisations numériques aux projets sélectionnés.",
  form: {
    close: "Fermer le formulaire",
    eyebrow: "Candidature gratuite",
    title: "Présentez votre projet",
    intro: "Trois étapes courtes. Décrivez votre situation avec vos mots — aucun jargon technique n’est nécessaire.",
    step: "Étape",
    steps: ["Contact", "Mission", "Besoin"],
    firstName: "Prénom",
    lastName: "Nom",
    role: "Votre fonction",
    email: "Email professionnel",
    phone: "Téléphone ou WhatsApp",
    country: "Pays",
    organization: "Nom de l’organisation",
    organizationType: "Type d’organisation",
    organizationTypes: ["Association / ASBL", "ONG", "Église / paroisse", "Ministère / mission", "Éducation / jeunesse", "Initiative communautaire", "Projet culturel", "Projet environnemental", "Entreprise sociale", "Autre"],
    mission: "Quelle est la mission de votre organisation ?",
    beneficiaries: "Qui accompagnez-vous ?",
    verification: "Lien permettant de vérifier votre activité (site ou réseau social)",
    needs: "Quel type d’aide pourrait être utile ?",
    needOptions: ["Nouveau site ou landing page", "Amélioration d’un site", "Page d’événement", "Formulaire ou inscriptions", "Organisation des contacts", "Automatisation", "Identité ou supports visuels", "Traduction ou sous-titrage", "Solution utilisant l’IA", "Je ne sais pas encore"],
    problem: "Quel problème rencontrez-vous aujourd’hui ?",
    result: "Quel résultat concret souhaitez-vous obtenir ?",
    deadline: "Y a-t-il une date importante ? (facultatif)",
    externalCosts: "Si un coût externe est indispensable, votre organisation peut-elle le prendre en charge après validation ?",
    externalCostOptions: ["Oui", "Peut-être, selon le montant", "Non", "Je ne sais pas"],
    representationConsent: "Je confirme être autorisé·e à représenter cette organisation.",
    selectionConsent: "Je comprends que cette demande ne garantit pas la sélection du projet.",
    privacyConsent: "J’accepte l’utilisation de mes coordonnées pour répondre à cette demande.",
    privacyLink: "Politique de confidentialité",
    previous: "Retour",
    next: "Continuer",
    submit: "Envoyer notre projet",
    submitting: "Envoi en cours…",
    required: "Merci de compléter les champs indiqués.",
    needsRequired: "Sélectionnez au moins un besoin.",
    successTitle: "Votre projet est bien arrivé.",
    successText: "Merci de nous avoir présenté votre mission. Notre équipe examinera la demande et vous répondra, dans la mesure du possible, sous 7 à 14 jours.",
    successNote: "Aucun paiement ne sera demandé pour l’examen de votre candidature.",
    closeSuccess: "Revenir au programme",
    error: "L’envoi n’a pas abouti. Vérifiez votre connexion ou écrivez-nous à contact@creativapoeta.com.",
  },
};

const en: ImpactCopy = {
  ...fr,
  navLabel: "Impact",
  navText: "Our digital skills in service of useful projects",
  eyebrow: "A Creativa Poeta initiative",
  program: "One More Stone",
  title: "Your work changes lives.",
  titleAccent: "Digital tools can amplify its impact.",
  intro: "We offer free or solidarity-based support to charities, churches, NGOs and impact initiatives with a concrete digital need and limited resources.",
  apply: "Present your project",
  discover: "Discover the program",
  trust: ["Free application", "No subscription", "No banking access"],
  capacity: "Places are limited. Every request is assessed on its impact, urgency, feasibility and our available capacity.",
  whyEyebrow: "Why this initiative",
  whyTitle: "Good initiatives should not remain invisible.",
  whyBody: "Technology is not only about selling more. It can help a community welcome people, a charity organize its work, a school support learners or a mission reach those who need it.",
  frictions: ["Information scattered across websites and social media", "Registrations and requests still handled manually", "Teams too small to structure their digital tools"],
  audienceEyebrow: "Who is it for?",
  audienceTitle: "Your project may qualify if you work for others.",
  audienceIntro: "The program is open regardless of religion. We look for genuine social value and a clearly defined need.",
  audiences: [
    { title: "Charities & NGOs", text: "Solidarity, integration, family support and humanitarian action." },
    { title: "Churches & ministries", text: "Local communities, missions, media and youth programs." },
    { title: "Education & youth", text: "Training, mentoring, literacy and digital inclusion." },
    { title: "Social action", text: "Community health, disability, food aid and support." },
    { title: "Culture & community", text: "Artistic, civic and intercultural impact initiatives." },
    { title: "Environment", text: "Awareness, circular economy and local climate projects." },
  ],
  solutionsEyebrow: "Our contribution",
  solutionsTitle: "A precise and useful first digital step.",
  solutionsIntro: "Choose a need to see what we can reasonably unlock first.",
  solutions: [
    { title: "Online presence", summary: "Make your work clear, accessible and easy to find.", items: ["Landing page or small website", "Event page", "Mobile improvements", "Multilingual structure"] },
    { title: "Forms & organization", summary: "Reduce repetitive tasks and route requests better.", items: ["Registration and volunteering", "Automatic confirmation", "Simple tracking table", "Centralized requests"] },
    { title: "Visual communication", summary: "Present your mission consistently and with dignity.", items: ["Poster or flyer", "Social media kit", "Presentation", "Activity report"] },
    { title: "Automation & AI", summary: "Save time when the use is relevant and responsible.", items: ["Transcription and captions", "Content classification", "Simple newsletter", "Search across resources"], note: "Sensitive religious, medical or social content always remains subject to human validation." },
  ],
  promiseEyebrow: "A transparent exchange",
  promiseTitle: "Free does not mean hidden or unlimited.",
  promiseIntro: "We define a first deliverable in writing. You know what is included, what is not, and who remains in control.",
  promises: [
    { title: "What we offer", text: "Design and delivery time for the agreed first scope.", items: ["Written scope", "Reasonable revisions", "Files and access", "Simple documentation"] },
    { title: "What may still cost", text: "Only external services approved before work begins.", items: ["Domain or hosting", "Third-party license or tool", "Email, SMS or AI", "Direct payment to provider"] },
    { title: "What we may ask", text: "Once satisfied, permission to tell the project's story honestly.", items: ["Approved case study", "Voluntary testimonial", "Discreet credit", "No future commitment"] },
    { title: "What stays yours", text: "Your organization keeps ownership and control of its project.", items: ["Domain and content", "Data and accounts", "Access handed over", "Confidentiality and GDPR"] },
  ],
  processEyebrow: "How it works",
  processTitle: "From your need to a useful solution.",
  process: [
    { title: "Present your mission", text: "Explain your work, who you help and the problem to solve." },
    { title: "We review the request", text: "We assess impact, need, feasibility and risks." },
    { title: "Define the first stone", text: "A 20–30 minute conversation sets a focused outcome." },
    { title: "Build and hand over", text: "You validate key steps, then receive the deliverable, access and instructions." },
  ],
  selectionEyebrow: "Selection",
  selectionTitle: "We cannot build everything, but we review every serious request.",
  selectionIntro: "Submitting does not guarantee selection. If we cannot help now, we may suggest a smaller version, another period or an alternative.",
  selectionGroups: [
    { title: "What we look for", tone: "yes", items: ["Concrete positive impact", "Identifiable organization or lead", "Specific and realistic need", "Available project contact"] },
    { title: "Possible priorities", tone: "priority", items: ["Small teams with few resources", "Projects in Belgium or Rwanda", "Young or vulnerable audiences", "Useful, measurable outcome"] },
    { title: "What we decline", tone: "no", items: ["Fraud, hate or discrimination", "Questionable fundraising", "Unprotected sensitive data", "Commercial gain disguised as social impact"] },
  ],
  showCriteria: "See our criteria",
  hideCriteria: "Hide criteria",
  examplesEyebrow: "Examples",
  examplesTitle: "What could a first stone look like?",
  examplesNote: "Illustrative scenarios — not presented as projects already delivered.",
  examples: [
    { title: "An education charity", problem: "Manual registrations and repeated confirmations.", solution: "A form, tracking table and automatic confirmation." },
    { title: "A local church", problem: "Times and information scattered across Facebook and WhatsApp.", solution: "A clear official page to welcome and guide visitors." },
    { title: "A small NGO", problem: "Its work is difficult to present to partners.", solution: "An institutional page, evidence of impact and a suitable form." },
  ],
  problemLabel: "The problem",
  solutionLabel: "The first stone",
  faqEyebrow: "Frequently asked questions",
  faqTitle: "Clear answers before you commit.",
  faqs: [
    { question: "Is it really free?", answer: "Yes, for a selected project and within the written scope. Some external costs may be necessary, but they are disclosed in advance and paid directly to the provider." },
    { question: "Must we be a Christian organization?", answer: "No. Christian initiatives are welcome, as are educational, social, cultural, environmental and community projects that meet our criteria." },
    { question: "Do we need to share passwords?", answer: "Not to apply or receive a first mock-up. If access becomes necessary, we explain why and request only the minimum level." },
    { question: "Who owns the result?", answer: "The organization keeps its content, domain, data and accounts opened in its name. Exact terms are written into the agreement." },
    { question: "Can we request a large website or app?", answer: "The program focuses on a limited first intervention. Larger needs may be split into phases, offered at a solidarity rate or funded by an impact partner." },
  ],
  finalTitle: "Building something useful? Perhaps we can add one stone.",
  finalText: "Simply describe your mission, the problem and the outcome you need. No technical vocabulary is required.",
  emailTeam: "Email the Impact team",
  disclaimer: "Creativa Poeta Impact is not a funding body and does not provide money. The program contributes digital skills and deliverables to selected projects.",
  form: {
    ...fr.form,
    close: "Close form", eyebrow: "Free application", title: "Present your project", intro: "Three short steps. Describe the situation in your own words — no technical jargon required.", step: "Step", steps: ["Contact", "Mission", "Need"],
    firstName: "First name", lastName: "Last name", role: "Your role", email: "Professional email", phone: "Phone or WhatsApp", country: "Country", organization: "Organization name", organizationType: "Organization type",
    organizationTypes: ["Charity / nonprofit", "NGO", "Church / parish", "Ministry / mission", "Education / youth", "Community initiative", "Cultural project", "Environmental project", "Social enterprise", "Other"],
    mission: "What is your organization's mission?", beneficiaries: "Who do you support?", verification: "Link that helps verify your work (website or social profile)", needs: "What kind of help could be useful?",
    needOptions: ["New website or landing page", "Website improvement", "Event page", "Form or registration", "Contact organization", "Automation", "Visual identity or materials", "Translation or captions", "AI-enabled solution", "I am not sure yet"],
    problem: "What problem do you face today?", result: "What concrete outcome do you want?", deadline: "Is there an important date? (optional)", externalCosts: "If an external cost is essential, can your organization cover it after approval?", externalCostOptions: ["Yes", "Maybe, depending on the amount", "No", "I don't know"],
    representationConsent: "I confirm that I am authorized to represent this organization.", selectionConsent: "I understand that this request does not guarantee selection.", privacyConsent: "I agree that my contact details may be used to answer this request.", privacyLink: "Privacy policy", previous: "Back", next: "Continue", submit: "Send our project", submitting: "Sending…", required: "Please complete the indicated fields.", needsRequired: "Select at least one need.", successTitle: "Your project has arrived.", successText: "Thank you for presenting your mission. Our team will review the request and, where possible, reply within 7 to 14 days.", successNote: "No payment will be requested to review your application.", closeSuccess: "Return to the program", error: "We could not send the request. Check your connection or email contact@creativapoeta.com.",
  },
};

const nl: ImpactCopy = {
  ...en,
  navLabel: "Impact",
  navText: "Onze digitale kennis voor projecten die ertoe doen",
  eyebrow: "Een initiatief van Creativa Poeta",
  program: "Een Steen Erbij",
  title: "Uw inzet verandert levens.",
  titleAccent: "Digitale middelen kunnen die impact vergroten.",
  intro: "We helpen verenigingen, kerken, ngo’s en impactinitiatieven gratis of aan een sociaal tarief wanneer zij een concrete digitale behoefte en beperkte middelen hebben.",
  apply: "Stel uw project voor",
  discover: "Ontdek het programma",
  trust: ["Gratis aanvraag", "Geen abonnement", "Geen banktoegang"],
  capacity: "De plaatsen zijn beperkt. Elke aanvraag wordt beoordeeld op impact, urgentie, haalbaarheid en onze beschikbare capaciteit.",
  whyEyebrow: "Waarom dit initiatief",
  whyTitle: "Goede initiatieven mogen niet onzichtbaar blijven.",
  whyBody: "Technologie dient niet alleen om meer te verkopen. Ze kan een gemeenschap helpen mensen te ontvangen, een vereniging haar werk te organiseren, een school leerlingen te begeleiden of een initiatief de juiste mensen te bereiken.",
  frictions: ["Informatie verspreid over websites en sociale media", "Inschrijvingen en aanvragen nog handmatig verwerkt", "Teams te klein om digitale tools goed te structureren"],
  audienceEyebrow: "Voor wie?",
  audienceTitle: "Uw project kan in aanmerking komen als u zich inzet voor anderen.",
  audienceIntro: "Het programma staat open ongeacht religie. We zoeken echte maatschappelijke waarde en een duidelijk omschreven behoefte.",
  audiences: [
    { title: "Verenigingen & ngo’s", text: "Solidariteit, integratie, gezinsondersteuning en humanitaire actie." },
    { title: "Kerken & bedieningen", text: "Lokale gemeenschappen, missies, media en jeugdprogramma’s." },
    { title: "Onderwijs & jeugd", text: "Opleiding, mentoring, alfabetisering en digitale inclusie." },
    { title: "Sociale actie", text: "Buurtgezondheid, handicap, voedselhulp en begeleiding." },
    { title: "Cultuur & gemeenschap", text: "Artistieke, burgerlijke en interculturele impactprojecten." },
    { title: "Milieu", text: "Bewustmaking, circulaire economie en lokale klimaatprojecten." },
  ],
  solutionsEyebrow: "Onze bijdrage",
  solutionsTitle: "Een precieze en nuttige eerste digitale stap.",
  solutionsIntro: "Kies een behoefte en ontdek wat we redelijkerwijs als eerste kunnen realiseren.",
  solutions: [
    { title: "Online aanwezigheid", summary: "Maak uw werk helder, toegankelijk en vindbaar.", items: ["Landingspagina of kleine website", "Evenementpagina", "Mobiele verbeteringen", "Meertalige structuur"] },
    { title: "Formulieren & organisatie", summary: "Beperk repetitieve taken en stuur aanvragen beter door.", items: ["Inschrijving en vrijwilligers", "Automatische bevestiging", "Eenvoudige opvolgtabel", "Centrale aanvragen"] },
    { title: "Visuele communicatie", summary: "Presenteer uw missie coherent en waardig.", items: ["Affiche of flyer", "Socialemediakit", "Presentatie", "Activiteitenverslag"] },
    { title: "Automatisering & AI", summary: "Bespaar tijd wanneer het gebruik relevant en verantwoord is.", items: ["Transcriptie en ondertiteling", "Inhoud ordenen", "Eenvoudige nieuwsbrief", "Zoeken in bronnen"], note: "Gevoelige religieuze, medische of sociale inhoud blijft altijd onderworpen aan menselijke controle." },
  ],
  promiseEyebrow: "Een transparante uitwisseling",
  promiseTitle: "Gratis betekent niet verborgen of onbeperkt.",
  promiseIntro: "We leggen een eerste oplevering schriftelijk vast. U weet wat inbegrepen is, wat niet, en wie de controle houdt.",
  promises: [
    { title: "Wat wij aanbieden", text: "Ontwerp- en realisatietijd voor de afgesproken eerste scope.", items: ["Schriftelijke scope", "Redelijke correcties", "Bestanden en toegang", "Eenvoudige documentatie"] },
    { title: "Wat betalend kan blijven", text: "Alleen externe diensten die vooraf zijn goedgekeurd.", items: ["Domein of hosting", "Licentie of externe tool", "E-mail, sms of AI", "Rechtstreeks betalen aan leverancier"] },
    { title: "Wat wij kunnen vragen", text: "Na tevredenheid, toestemming om het project eerlijk te tonen.", items: ["Goedgekeurde case", "Vrije getuigenis", "Discrete credit", "Geen toekomstige verplichting"] },
    { title: "Wat van u blijft", text: "Uw organisatie behoudt eigendom en controle over haar project.", items: ["Domein en inhoud", "Data en accounts", "Toegang overgedragen", "Vertrouwelijkheid en AVG"] },
  ],
  processEyebrow: "Hoe werkt het?",
  processTitle: "Van uw behoefte naar een nuttige oplossing.",
  process: [
    { title: "Presenteer uw missie", text: "Vertel wat u doet, wie u helpt en welk probleem u wilt oplossen." },
    { title: "Wij bekijken de aanvraag", text: "We beoordelen impact, behoefte, haalbaarheid en risico’s." },
    { title: "Bepaal de eerste steen", text: "Een gesprek van 20–30 minuten legt een haalbaar resultaat vast." },
    { title: "Bouwen en overdragen", text: "U valideert belangrijke stappen en ontvangt het resultaat, de toegang en uitleg." },
  ],
  selectionEyebrow: "Selectie",
  selectionTitle: "We kunnen niet alles realiseren, maar bekijken elke ernstige aanvraag.",
  selectionIntro: "Een aanvraag garandeert geen selectie. Als we nu niet kunnen helpen, stellen we mogelijk een kleinere versie, een andere periode of een alternatief voor.",
  selectionGroups: [
    { title: "Wat we zoeken", tone: "yes", items: ["Concrete positieve impact", "Identificeerbare organisatie of leider", "Specifieke, haalbare behoefte", "Beschikbare contactpersoon"] },
    { title: "Mogelijke prioriteiten", tone: "priority", items: ["Kleine teams met weinig middelen", "Projecten in België of Rwanda", "Jongeren of kwetsbare groepen", "Nuttig, meetbaar resultaat"] },
    { title: "Wat we weigeren", tone: "no", items: ["Fraude, haat of discriminatie", "Twijfelachtige fondsenwerving", "Onbeschermde gevoelige data", "Commerciële winst vermomd als sociale impact"] },
  ],
  showCriteria: "Bekijk onze criteria",
  hideCriteria: "Verberg de criteria",
  examplesEyebrow: "Voorbeelden",
  examplesTitle: "Hoe kan een eerste steen eruitzien?",
  examplesNote: "Illustratieve scenario’s — niet voorgesteld als reeds opgeleverde projecten.",
  examples: [
    { title: "Een onderwijsvereniging", problem: "Handmatige inschrijvingen en herhaalde bevestigingen.", solution: "Een formulier, opvolgtabel en automatische bevestiging." },
    { title: "Een lokale kerk", problem: "Uren en informatie verspreid over Facebook en WhatsApp.", solution: "Een heldere officiële pagina die bezoekers ontvangt en begeleidt." },
    { title: "Een kleine ngo", problem: "Haar werk is moeilijk aan partners te presenteren.", solution: "Een organisatiepagina, impactbewijzen en een geschikt formulier." },
  ],
  problemLabel: "Het probleem",
  solutionLabel: "De eerste steen",
  faqEyebrow: "Veelgestelde vragen",
  faqTitle: "Duidelijke antwoorden voordat u begint.",
  faqs: [
    { question: "Is het echt gratis?", answer: "Ja, voor een geselecteerd project binnen de schriftelijke scope. Externe kosten kunnen nodig zijn, maar worden vooraf gemeld en rechtstreeks aan de leverancier betaald." },
    { question: "Moeten we een christelijke organisatie zijn?", answer: "Nee. Christelijke initiatieven zijn welkom, net als educatieve, sociale, culturele, ecologische en gemeenschapsprojecten die aan onze criteria voldoen." },
    { question: "Moeten we wachtwoorden delen?", answer: "Niet om aan te vragen of een eerste ontwerp te ontvangen. Als toegang nodig wordt, leggen we uit waarom en vragen we alleen het minimale niveau." },
    { question: "Van wie is het resultaat?", answer: "De organisatie behoudt haar inhoud, domein, data en accounts op haar naam. De exacte afspraken staan in de overeenkomst." },
    { question: "Kunnen we een grote website of app vragen?", answer: "Het programma richt zich op een beperkte eerste interventie. Grotere behoeften kunnen in fasen, aan sociaal tarief of met een impactpartner worden aangepakt." },
  ],
  finalTitle: "Bouwt u iets nuttigs? Misschien kunnen wij één steen bijdragen.",
  finalText: "Beschrijf eenvoudig uw missie, het probleem en het gewenste resultaat. Technische woorden zijn niet nodig.",
  emailTeam: "Mail het Impact-team",
  disclaimer: "Creativa Poeta Impact is geen financieringsfonds en keert geen geld uit. Het programma levert digitale kennis en realisaties aan geselecteerde projecten.",
  form: {
    ...en.form,
    close: "Formulier sluiten", eyebrow: "Gratis aanvraag", title: "Stel uw project voor", intro: "Drie korte stappen. Beschrijf de situatie in uw eigen woorden — technische termen zijn niet nodig.", step: "Stap", steps: ["Contact", "Missie", "Behoefte"],
    firstName: "Voornaam", lastName: "Achternaam", role: "Uw functie", email: "Professionele e-mail", phone: "Telefoon of WhatsApp", country: "Land", organization: "Naam van de organisatie", organizationType: "Type organisatie",
    organizationTypes: ["Vereniging / vzw", "Ngo", "Kerk / parochie", "Bediening / missie", "Onderwijs / jeugd", "Gemeenschapsinitiatief", "Cultureel project", "Milieuproject", "Sociale onderneming", "Andere"],
    mission: "Wat is de missie van uw organisatie?", beneficiaries: "Wie ondersteunt u?", verification: "Link waarmee we uw activiteit kunnen verifiëren (site of sociaal profiel)", needs: "Welke hulp kan nuttig zijn?",
    needOptions: ["Nieuwe website of landingspagina", "Website verbeteren", "Evenementpagina", "Formulier of inschrijvingen", "Contacten organiseren", "Automatisering", "Visuele identiteit of materiaal", "Vertaling of ondertiteling", "AI-oplossing", "Ik weet het nog niet"],
    problem: "Welk probleem ervaart u vandaag?", result: "Welk concreet resultaat wilt u bereiken?", deadline: "Is er een belangrijke datum? (optioneel)", externalCosts: "Kan uw organisatie een noodzakelijke externe kost betalen na voorafgaande goedkeuring?", externalCostOptions: ["Ja", "Misschien, afhankelijk van het bedrag", "Nee", "Ik weet het niet"],
    representationConsent: "Ik bevestig dat ik deze organisatie mag vertegenwoordigen.", selectionConsent: "Ik begrijp dat deze aanvraag geen selectie garandeert.", privacyConsent: "Ik ga ermee akkoord dat mijn contactgegevens worden gebruikt om deze aanvraag te beantwoorden.", privacyLink: "Privacybeleid", previous: "Terug", next: "Doorgaan", submit: "Ons project verzenden", submitting: "Verzenden…", required: "Vul de aangeduide velden in.", needsRequired: "Selecteer minstens één behoefte.", successTitle: "Uw project is goed aangekomen.", successText: "Bedankt om uw missie voor te stellen. Ons team bekijkt de aanvraag en antwoordt waar mogelijk binnen 7 tot 14 dagen.", successNote: "Voor de beoordeling van uw aanvraag wordt geen betaling gevraagd.", closeSuccess: "Terug naar het programma", error: "De aanvraag kon niet worden verzonden. Controleer uw verbinding of mail contact@creativapoeta.com.",
  },
};

export const impactLocale: Record<ImpactLanguage, ImpactCopy> = { fr, en, nl };

export default impactLocale;
