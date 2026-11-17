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
  frictions: Array<{ title: string; text: string }>;
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
    closeSuccess: string;
    error: string;
  };
};

const fr: ImpactCopy = {
  navLabel: "Impact",
  navText: "Nos compétences numériques au service des projets utiles",
  eyebrow: "Une initiative Creativa Poeta",
  program: "CP Impact",
  title: "Vos actions changent des vies.",
  titleAccent: "Le numérique peut amplifier leur impact.",
  intro:
    "Nous accompagnons des associations, ONG, collectifs et initiatives à impact qui ont un besoin numérique concret et des ressources limitées.",
  apply: "Présenter votre projet",
  discover: "Découvrir le programme",
  trust: ["Demande en 3 étapes", "Réponse sous 7 à 14 jours", "Périmètre défini ensemble"],
  capacity:
    "Les places sont limitées. Chaque demande est étudiée selon son impact, son urgence, sa faisabilité et nos capacités disponibles.",
  whyEyebrow: "Pourquoi cette initiative",
  whyTitle: "Les bonnes initiatives ne devraient pas être invisibles.",
  whyBody:
    "La technologie ne sert pas uniquement à vendre davantage. Elle peut aider une communauté à accueillir, une association à organiser ses actions, une école à accompagner ses élèves ou une œuvre à atteindre les personnes qui ont besoin d’elle.",
  frictions: [
    {
      title: "Rendre les initiatives visibles",
      text: "Leurs informations sont souvent dispersées entre le site, les réseaux sociaux et différents documents.",
    },
    {
      title: "Simplifier leur fonctionnement",
      text: "Les inscriptions, les demandes et leur suivi sont encore trop souvent traités manuellement.",
    },
    {
      title: "Donner plus de force aux petites équipes",
      text: "Faute de temps, d’outils ou de compétences, elles peinent à structurer leurs usages numériques.",
    },
  ],
  audienceEyebrow: "Pour qui ?",
  audienceTitle: "Votre projet peut être concerné si vous agissez pour les autres.",
  audienceIntro:
    "Le programme est ouvert à toute structure porteuse d’une utilité sociale réelle et d’un besoin clairement défini.",
  audiences: [
    { title: "Associations & ONG", text: "Solidarité, intégration, aide aux familles et action humanitaire." },
    { title: "Structures locales", text: "Collectifs, fondations, coopératives et projets de proximité." },
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
      note: "Les contenus médicaux, sociaux, personnels ou autrement sensibles restent toujours soumis à une validation humaine.",
    },
  ],
  promiseEyebrow: "Un échange transparent",
  promiseTitle: "Un cadre clair, sans zones d’ombre.",
  promiseIntro:
    "Nous définissons une première réalisation par écrit. Vous savez ce qui est inclus, ce qui ne l’est pas et qui garde le contrôle.",
  promises: [
    {
      title: "Ce que nous réalisons",
      text: "Le temps de conception et de réalisation du premier lot convenu.",
      items: ["Périmètre écrit", "Corrections raisonnables", "Fichiers et accès", "Documentation simple"],
    },
    {
      title: "Comment nous avançons",
      text: "Des étapes courtes permettent de garder le projet lisible et maîtrisé.",
      items: ["Un interlocuteur désigné", "Validations aux étapes clés", "Délais partagés", "Décisions tracées"],
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
    { title: "Nos priorités possibles", tone: "priority", items: ["Petites structures avec peu de ressources", "Territoires et communautés peu desservis", "Jeunes et publics vulnérables", "Résultat utile et mesurable"] },
    { title: "Ce que nous refusons", tone: "no", items: ["Fraude, haine ou discrimination", "Pratiques trompeuses ou non vérifiables", "Usage non protégé de données sensibles", "Bénéfice commercial déguisé en action sociale"] },
  ],
  showCriteria: "Voir nos critères",
  hideCriteria: "Masquer les critères",
  examplesEyebrow: "Exemples",
  examplesTitle: "À quoi peut ressembler une première pierre ?",
  examplesNote: "Découvrez comment un besoin concret peut devenir une solution numérique simple, utile et adaptée au terrain.",
  examples: [
    { title: "Une association éducative", problem: "Inscriptions manuelles et confirmations répétitives.", solution: "Un formulaire, un tableau de suivi et une confirmation automatique." },
    { title: "Un collectif local", problem: "Informations dispersées sur Facebook et WhatsApp.", solution: "Une page officielle claire pour accueillir et orienter le public." },
    { title: "Une petite ONG", problem: "Son action est difficile à présenter aux partenaires.", solution: "Une page institutionnelle, des preuves d’impact et un formulaire adapté." },
  ],
  problemLabel: "Le problème",
  solutionLabel: "La première pierre",
  faqEyebrow: "Questions fréquentes",
  faqTitle: "Des réponses claires avant de vous engager.",
  faqs: [
    { question: "Que comprend la première intervention ?", answer: "Elle porte sur un résultat numérique précis, défini ensemble avant le démarrage, avec les étapes, responsabilités et livrables clairement indiqués." },
    { question: "Faut-il disposer d’un statut officiel ?", answer: "Pas nécessairement. Une structure enregistrée, un collectif sérieux ou une initiative identifiable peut candidater si son activité et ses responsables peuvent être vérifiés." },
    { question: "Devons-nous donner nos mots de passe ?", answer: "Non pour candidater ou recevoir une première maquette. Si un accès devient nécessaire, nous expliquons pourquoi et demandons uniquement le niveau minimal." },
    { question: "À qui appartiendra le résultat ?", answer: "L’organisation conserve ses contenus, son domaine, ses données et les comptes ouverts à son nom. Les modalités exactes sont écrites dans l’accord." },
    { question: "Pouvons-nous demander un grand site ou une application ?", answer: "Le programme vise une première intervention limitée. Un besoin plus grand peut être découpé en étapes ou orienté vers une solution plus adaptée." },
  ],
  finalTitle: "Vous construisez quelque chose d’utile ? Nous pouvons peut-être apporter une pierre.",
  finalText: "Décrivez simplement votre mission, votre problème et le résultat souhaité. Aucun vocabulaire technique n’est nécessaire.",
  emailTeam: "Écrire à l’équipe Impact",
  disclaimer: "Creativa Poeta Impact accompagne les projets sélectionnés avec des compétences et des réalisations numériques, dans un périmètre défini ensemble.",
  form: {
    close: "Fermer le formulaire",
    eyebrow: "Candidature CP Impact",
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
    organizationTypes: ["Association / ASBL", "ONG", "Fondation", "Collectif local", "Éducation / jeunesse", "Initiative communautaire", "Projet culturel", "Projet environnemental", "Coopérative", "Entreprise sociale", "Autre"],
    mission: "Quelle est la mission de votre organisation ?",
    beneficiaries: "Qui accompagnez-vous ?",
    verification: "Lien permettant de vérifier votre activité (site ou réseau social)",
    needs: "Quel type d’aide pourrait être utile ?",
    needOptions: ["Nouveau site ou landing page", "Amélioration d’un site", "Page d’événement", "Formulaire ou inscriptions", "Organisation des contacts", "Automatisation", "Identité ou supports visuels", "Traduction ou sous-titrage", "Solution utilisant l’IA", "Je ne sais pas encore"],
    problem: "Quel problème rencontrez-vous aujourd’hui ?",
    result: "Quel résultat concret souhaitez-vous obtenir ?",
    deadline: "Y a-t-il une date importante ? (facultatif)",
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
    closeSuccess: "Revenir au programme",
    error: "L’envoi n’a pas abouti. Vérifiez votre connexion ou écrivez-nous à contact@creativapoeta.com.",
  },
};

const en: ImpactCopy = {
  ...fr,
  navLabel: "Impact",
  navText: "Our digital skills in service of useful projects",
  eyebrow: "A Creativa Poeta initiative",
  program: "CP Impact",
  title: "Your work changes lives.",
  titleAccent: "Digital tools can amplify its impact.",
  intro: "We support charities, NGOs, community groups and impact initiatives with a concrete digital need and limited resources.",
  apply: "Present your project",
  discover: "Discover the program",
  trust: ["Three-step application", "Reply within 7–14 days", "Scope defined together"],
  capacity: "Places are limited. Every request is assessed on its impact, urgency, feasibility and our available capacity.",
  whyEyebrow: "Why this initiative",
  whyTitle: "Good initiatives should not remain invisible.",
  whyBody: "Technology is not only about selling more. It can help a community welcome people, a charity organize its work, a school support learners or a mission reach those who need it.",
  frictions: [
    {
      title: "Make useful initiatives visible",
      text: "Their information is often scattered across a website, social media and separate documents.",
    },
    {
      title: "Simplify the way they work",
      text: "Registrations, requests and follow-up are still too often handled manually.",
    },
    {
      title: "Give small teams more capacity",
      text: "Without enough time, tools or expertise, they struggle to structure their digital work.",
    },
  ],
  audienceEyebrow: "Who is it for?",
  audienceTitle: "Your project may qualify if you work for others.",
  audienceIntro: "The program is open to any organization with genuine social value and a clearly defined need.",
  audiences: [
    { title: "Charities & NGOs", text: "Solidarity, integration, family support and humanitarian action." },
    { title: "Local organizations", text: "Community groups, foundations, cooperatives and local initiatives." },
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
    { title: "Automation & AI", summary: "Save time when the use is relevant and responsible.", items: ["Transcription and captions", "Content classification", "Simple newsletter", "Search across resources"], note: "Medical, social, personal or otherwise sensitive content always remains subject to human validation." },
  ],
  promiseEyebrow: "A transparent exchange",
  promiseTitle: "A clear framework, with no grey areas.",
  promiseIntro: "We define a first deliverable in writing. You know what is included, what is not, and who remains in control.",
  promises: [
    { title: "What we deliver", text: "Design and delivery time for the agreed first scope.", items: ["Written scope", "Reasonable revisions", "Files and access", "Simple documentation"] },
    { title: "How we move forward", text: "Short stages keep the project clear and under control.", items: ["A named contact", "Validation at key stages", "Shared timelines", "Recorded decisions"] },
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
    { title: "Possible priorities", tone: "priority", items: ["Small teams with few resources", "Underserved communities and areas", "Young or vulnerable audiences", "Useful, measurable outcome"] },
    { title: "What we decline", tone: "no", items: ["Fraud, hate or discrimination", "Misleading or unverifiable practices", "Unprotected sensitive data", "Commercial gain disguised as social impact"] },
  ],
  showCriteria: "See our criteria",
  hideCriteria: "Hide criteria",
  examplesEyebrow: "Examples",
  examplesTitle: "What could a first stone look like?",
  examplesNote: "See how a concrete need can become a simple, useful digital solution adapted to real-world work.",
  examples: [
    { title: "An education charity", problem: "Manual registrations and repeated confirmations.", solution: "A form, tracking table and automatic confirmation." },
    { title: "A local community group", problem: "Information scattered across Facebook and WhatsApp.", solution: "A clear official page to welcome and guide the public." },
    { title: "A small NGO", problem: "Its work is difficult to present to partners.", solution: "An institutional page, evidence of impact and a suitable form." },
  ],
  problemLabel: "The problem",
  solutionLabel: "The first stone",
  faqEyebrow: "Frequently asked questions",
  faqTitle: "Clear answers before you commit.",
  faqs: [
    { question: "What does the first intervention include?", answer: "It focuses on one precise digital outcome, agreed before work begins, with stages, responsibilities and deliverables clearly stated." },
    { question: "Do we need an official legal status?", answer: "Not necessarily. A registered organization, a serious collective or an identifiable initiative may apply if its work and leadership can be verified." },
    { question: "Do we need to share passwords?", answer: "Not to apply or receive a first mock-up. If access becomes necessary, we explain why and request only the minimum level." },
    { question: "Who owns the result?", answer: "The organization keeps its content, domain, data and accounts opened in its name. Exact terms are written into the agreement." },
    { question: "Can we request a large website or app?", answer: "The program focuses on a limited first intervention. Larger needs may be split into stages or directed towards a more suitable solution." },
  ],
  finalTitle: "Building something useful? Perhaps we can add one stone.",
  finalText: "Simply describe your mission, the problem and the outcome you need. No technical vocabulary is required.",
  emailTeam: "Email the Impact team",
  disclaimer: "Creativa Poeta Impact supports selected projects with digital skills and deliverables, within a scope defined together.",
  form: {
    ...fr.form,
    close: "Close form", eyebrow: "CP Impact application", title: "Present your project", intro: "Three short steps. Describe the situation in your own words — no technical jargon required.", step: "Step", steps: ["Contact", "Mission", "Need"],
    firstName: "First name", lastName: "Last name", role: "Your role", email: "Professional email", phone: "Phone or WhatsApp", country: "Country", organization: "Organization name", organizationType: "Organization type",
    organizationTypes: ["Charity / nonprofit", "NGO", "Foundation", "Local collective", "Education / youth", "Community initiative", "Cultural project", "Environmental project", "Cooperative", "Social enterprise", "Other"],
    mission: "What is your organization's mission?", beneficiaries: "Who do you support?", verification: "Link that helps verify your work (website or social profile)", needs: "What kind of help could be useful?",
    needOptions: ["New website or landing page", "Website improvement", "Event page", "Form or registration", "Contact organization", "Automation", "Visual identity or materials", "Translation or captions", "AI-enabled solution", "I am not sure yet"],
    problem: "What problem do you face today?", result: "What concrete outcome do you want?", deadline: "Is there an important date? (optional)",
    representationConsent: "I confirm that I am authorized to represent this organization.", selectionConsent: "I understand that this request does not guarantee selection.", privacyConsent: "I agree that my contact details may be used to answer this request.", privacyLink: "Privacy policy", previous: "Back", next: "Continue", submit: "Send our project", submitting: "Sending…", required: "Please complete the indicated fields.", needsRequired: "Select at least one need.", successTitle: "Your project has arrived.", successText: "Thank you for presenting your mission. Our team will review the request and, where possible, reply within 7 to 14 days.", closeSuccess: "Return to the program", error: "We could not send the request. Check your connection or email contact@creativapoeta.com.",
  },
};

const nl: ImpactCopy = {
  ...en,
  navLabel: "Impact",
  navText: "Onze digitale kennis voor projecten die ertoe doen",
  eyebrow: "Een initiatief van Creativa Poeta",
  program: "CP Impact",
  title: "Uw inzet verandert levens.",
  titleAccent: "Digitale middelen kunnen die impact vergroten.",
  intro: "We helpen verenigingen, ngo’s, collectieven en impactinitiatieven met een concrete digitale behoefte en beperkte middelen.",
  apply: "Stel uw project voor",
  discover: "Ontdek het programma",
  trust: ["Aanvraag in drie stappen", "Antwoord binnen 7–14 dagen", "Scope samen bepaald"],
  capacity: "De plaatsen zijn beperkt. Elke aanvraag wordt beoordeeld op impact, urgentie, haalbaarheid en onze beschikbare capaciteit.",
  whyEyebrow: "Waarom dit initiatief",
  whyTitle: "Goede initiatieven mogen niet onzichtbaar blijven.",
  whyBody: "Technologie dient niet alleen om meer te verkopen. Ze kan een gemeenschap helpen mensen te ontvangen, een vereniging haar werk te organiseren, een school leerlingen te begeleiden of een initiatief de juiste mensen te bereiken.",
  frictions: [
    {
      title: "Nuttige initiatieven zichtbaar maken",
      text: "Hun informatie staat vaak verspreid over de website, sociale media en verschillende documenten.",
    },
    {
      title: "Hun werking vereenvoudigen",
      text: "Inschrijvingen, aanvragen en opvolging worden nog te vaak handmatig verwerkt.",
    },
    {
      title: "Kleine teams meer slagkracht geven",
      text: "Door een gebrek aan tijd, hulpmiddelen of expertise slagen ze er moeilijk in hun digitale werking te structureren.",
    },
  ],
  audienceEyebrow: "Voor wie?",
  audienceTitle: "Uw project kan in aanmerking komen als u zich inzet voor anderen.",
  audienceIntro: "Het programma staat open voor elke organisatie met echte maatschappelijke waarde en een duidelijk omschreven behoefte.",
  audiences: [
    { title: "Verenigingen & ngo’s", text: "Solidariteit, integratie, gezinsondersteuning en humanitaire actie." },
    { title: "Lokale organisaties", text: "Collectieven, stichtingen, coöperaties en buurtinitiatieven." },
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
    { title: "Automatisering & AI", summary: "Bespaar tijd wanneer het gebruik relevant en verantwoord is.", items: ["Transcriptie en ondertiteling", "Inhoud ordenen", "Eenvoudige nieuwsbrief", "Zoeken in bronnen"], note: "Medische, sociale, persoonlijke of andere gevoelige inhoud blijft altijd onderworpen aan menselijke controle." },
  ],
  promiseEyebrow: "Een transparante uitwisseling",
  promiseTitle: "Een duidelijk kader, zonder grijze zones.",
  promiseIntro: "We leggen een eerste oplevering schriftelijk vast. U weet wat inbegrepen is, wat niet, en wie de controle houdt.",
  promises: [
    { title: "Wat wij realiseren", text: "Ontwerp- en realisatietijd voor de afgesproken eerste scope.", items: ["Schriftelijke scope", "Redelijke correcties", "Bestanden en toegang", "Eenvoudige documentatie"] },
    { title: "Hoe we vooruitgaan", text: "Korte stappen houden het project helder en beheersbaar.", items: ["Een vaste contactpersoon", "Validatie op sleutelmomenten", "Gedeelde planning", "Vastgelegde beslissingen"] },
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
    { title: "Mogelijke prioriteiten", tone: "priority", items: ["Kleine teams met weinig middelen", "Minder bediende buurten en gemeenschappen", "Jongeren of kwetsbare groepen", "Nuttig, meetbaar resultaat"] },
    { title: "Wat we weigeren", tone: "no", items: ["Fraude, haat of discriminatie", "Misleidende of niet-verifieerbare praktijken", "Onbeschermde gevoelige data", "Commerciële winst vermomd als sociale impact"] },
  ],
  showCriteria: "Bekijk onze criteria",
  hideCriteria: "Verberg de criteria",
  examplesEyebrow: "Voorbeelden",
  examplesTitle: "Hoe kan een eerste steen eruitzien?",
  examplesNote: "Ontdek hoe een concrete behoefte kan uitgroeien tot een eenvoudige, nuttige digitale oplossing op maat van de praktijk.",
  examples: [
    { title: "Een onderwijsvereniging", problem: "Handmatige inschrijvingen en herhaalde bevestigingen.", solution: "Een formulier, opvolgtabel en automatische bevestiging." },
    { title: "Een lokaal collectief", problem: "Informatie verspreid over Facebook en WhatsApp.", solution: "Een heldere officiële pagina die het publiek ontvangt en begeleidt." },
    { title: "Een kleine ngo", problem: "Haar werk is moeilijk aan partners te presenteren.", solution: "Een organisatiepagina, impactbewijzen en een geschikt formulier." },
  ],
  problemLabel: "Het probleem",
  solutionLabel: "De eerste steen",
  faqEyebrow: "Veelgestelde vragen",
  faqTitle: "Duidelijke antwoorden voordat u begint.",
  faqs: [
    { question: "Wat omvat de eerste interventie?", answer: "Ze richt zich op één precies digitaal resultaat dat vooraf samen wordt bepaald, met duidelijke stappen, verantwoordelijkheden en opleveringen." },
    { question: "Hebben we een officieel juridisch statuut nodig?", answer: "Niet noodzakelijk. Een geregistreerde organisatie, een ernstig collectief of een herkenbaar initiatief kan zich aanmelden als de werking en verantwoordelijken verifieerbaar zijn." },
    { question: "Moeten we wachtwoorden delen?", answer: "Niet om aan te vragen of een eerste ontwerp te ontvangen. Als toegang nodig wordt, leggen we uit waarom en vragen we alleen het minimale niveau." },
    { question: "Van wie is het resultaat?", answer: "De organisatie behoudt haar inhoud, domein, data en accounts op haar naam. De exacte afspraken staan in de overeenkomst." },
    { question: "Kunnen we een grote website of app vragen?", answer: "Het programma richt zich op een beperkte eerste interventie. Grotere behoeften kunnen in stappen worden verdeeld of naar een geschiktere oplossing worden geleid." },
  ],
  finalTitle: "Bouwt u iets nuttigs? Misschien kunnen wij één steen bijdragen.",
  finalText: "Beschrijf eenvoudig uw missie, het probleem en het gewenste resultaat. Technische woorden zijn niet nodig.",
  emailTeam: "Mail het Impact-team",
  disclaimer: "Creativa Poeta Impact ondersteunt geselecteerde projecten met digitale kennis en realisaties, binnen een scope die we samen bepalen.",
  form: {
    ...en.form,
    close: "Formulier sluiten", eyebrow: "CP Impact-aanvraag", title: "Stel uw project voor", intro: "Drie korte stappen. Beschrijf de situatie in uw eigen woorden — technische termen zijn niet nodig.", step: "Stap", steps: ["Contact", "Missie", "Behoefte"],
    firstName: "Voornaam", lastName: "Achternaam", role: "Uw functie", email: "Professionele e-mail", phone: "Telefoon of WhatsApp", country: "Land", organization: "Naam van de organisatie", organizationType: "Type organisatie",
    organizationTypes: ["Vereniging / vzw", "Ngo", "Stichting", "Lokaal collectief", "Onderwijs / jeugd", "Gemeenschapsinitiatief", "Cultureel project", "Milieuproject", "Coöperatie", "Sociale onderneming", "Andere"],
    mission: "Wat is de missie van uw organisatie?", beneficiaries: "Wie ondersteunt u?", verification: "Link waarmee we uw activiteit kunnen verifiëren (site of sociaal profiel)", needs: "Welke hulp kan nuttig zijn?",
    needOptions: ["Nieuwe website of landingspagina", "Website verbeteren", "Evenementpagina", "Formulier of inschrijvingen", "Contacten organiseren", "Automatisering", "Visuele identiteit of materiaal", "Vertaling of ondertiteling", "AI-oplossing", "Ik weet het nog niet"],
    problem: "Welk probleem ervaart u vandaag?", result: "Welk concreet resultaat wilt u bereiken?", deadline: "Is er een belangrijke datum? (optioneel)",
    representationConsent: "Ik bevestig dat ik deze organisatie mag vertegenwoordigen.", selectionConsent: "Ik begrijp dat deze aanvraag geen selectie garandeert.", privacyConsent: "Ik ga ermee akkoord dat mijn contactgegevens worden gebruikt om deze aanvraag te beantwoorden.", privacyLink: "Privacybeleid", previous: "Terug", next: "Doorgaan", submit: "Ons project verzenden", submitting: "Verzenden…", required: "Vul de aangeduide velden in.", needsRequired: "Selecteer minstens één behoefte.", successTitle: "Uw project is goed aangekomen.", successText: "Bedankt om uw missie voor te stellen. Ons team bekijkt de aanvraag en antwoordt waar mogelijk binnen 7 tot 14 dagen.", closeSuccess: "Terug naar het programma", error: "De aanvraag kon niet worden verzonden. Controleer uw verbinding of mail contact@creativapoeta.com.",
  },
};

export const impactLocale: Record<ImpactLanguage, ImpactCopy> = { fr, en, nl };

export default impactLocale;
