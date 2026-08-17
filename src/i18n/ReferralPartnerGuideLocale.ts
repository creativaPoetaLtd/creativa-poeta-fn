import type { LocaleCode } from "../data/markets";

type GuideCard = { title: string; text: string };
type MessageTemplate = { channel: string; title: string; text: string };
type GuideCase = { title: string; signal: string; approach: string };

export type ReferralPartnerGuideCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  start: string;
  introduce: string;
  contentsLabel: string;
  contents: { id: string; label: string }[];
  publicNotice: string;
  partnerNotice: string;
  partnerIdLabel: string;
  roleTitle: string;
  roleLead: string;
  roleCards: GuideCard[];
  signalsTitle: string;
  signalsLead: string;
  signals: GuideCard[];
  scoreZero: string;
  scoreLow: string;
  scoreGood: string;
  scoreStrong: string;
  placesTitle: string;
  placesLead: string;
  places: GuideCard[];
  needsTitle: string;
  needsLead: string;
  questions: string[];
  outcomesTitle: string;
  outcomesLead: string;
  outcomes: { need: string; outcome: string }[];
  templatesTitle: string;
  templatesLead: string;
  copy: string;
  copied: string;
  templates: MessageTemplate[];
  casesTitle: string;
  caseSignalLabel: string;
  caseApproachLabel: string;
  cases: GuideCase[];
  validationTitle: string;
  validationLead: string;
  validTitle: string;
  valid: string[];
  avoidTitle: string;
  avoid: string[];
  processTitle: string;
  process: GuideCard[];
  rewardTitle: string;
  rewardText: string;
  rewardExample: string;
  growthTitle: string;
  growthText: string;
  helpTitle: string;
  helpText: string;
  helpCta: string;
  finalTitle: string;
  finalText: string;
  guidePromoEyebrow: string;
  guidePromoTitle: string;
  guidePromoText: string;
  guidePromoCta: string;
};

const fr: ReferralPartnerGuideCopy = {
  eyebrow: "Guide pratique de l’apporteur de clients",
  title: "Repérez un vrai besoin. Faites une mise en relation utile.",
  lead: "Ce guide vous aide à trouver de bonnes opportunités, à engager une conversation honnête et à présenter une personne ou une entreprise à Creativa Poeta sans connaissances techniques.",
  start: "Rejoindre le programme",
  introduce: "Présenter un client",
  contentsLabel: "Dans ce guide",
  contents: [
    { id: "role", label: "Votre rôle" },
    { id: "signals", label: "Repérer un besoin" },
    { id: "messages", label: "Messages prêts à utiliser" },
    { id: "rules", label: "Introduction valable" },
  ],
  publicNotice: "Vous pouvez lire ce guide avant de rejoindre le programme. Pour présenter régulièrement des clients et suivre vos mises en relation, inscrivez-vous gratuitement.",
  partnerNotice: "Votre accès partenaire est reconnu sur cet appareil. Vous pouvez ouvrir directement votre formulaire privé de présentation d’un client.",
  partnerIdLabel: "Identifiant partenaire",
  roleTitle: "Votre rôle est simple",
  roleLead: "Vous n’avez pas à vendre une technologie ni à réaliser le projet. Vous ouvrez une conversation et, lorsque le besoin est réel, vous faites une mise en relation claire.",
  roleCards: [
    { title: "Observer", text: "Remarquez un problème concret : activité difficile à trouver, site peu clair, tâches répétitives ou communication incohérente." },
    { title: "Écouter", text: "Posez quelques questions pour comprendre le résultat recherché, sans promettre un prix, un délai ou une solution." },
    { title: "Introduire", text: "Avec l’accord de la personne, présentez-la à Creativa Poeta et expliquez brièvement le contexte." },
  ],
  signalsTitle: "Détecteur d’opportunité",
  signalsLead: "Cochez les signaux que vous avez réellement observés. Ce repère aide à préparer la conversation ; il ne remplace pas l’accord de la personne.",
  signals: [
    { title: "Difficile à trouver", text: "L’activité apparaît mal sur Google, les cartes ou les recherches locales." },
    { title: "Informations incohérentes", text: "Les horaires, contacts, services ou adresses diffèrent selon les plateformes." },
    { title: "Site absent ou peu clair", text: "Le site n’existe pas, fonctionne mal sur mobile ou n’explique pas clairement l’offre." },
    { title: "Travail manuel répétitif", text: "Réservations, devis, suivis ou documents pourraient être mieux organisés ou automatisés." },
    { title: "Image ou contenu à améliorer", text: "L’entreprise manque de visuels, de textes clairs ou de contenus réguliers." },
    { title: "Projet déjà envisagé", text: "La personne parle déjà d’un site, d’une application, de visibilité, de design ou d’automatisation." },
  ],
  scoreZero: "Commencez par observer et écouter.",
  scoreLow: "Un signal mérite une conversation, pas une promesse.",
  scoreGood: "Plusieurs besoins semblent concrets : posez quelques questions.",
  scoreStrong: "Bonne occasion de proposer une mise en relation, avec son accord.",
  placesTitle: "Où trouver de bonnes occasions",
  placesLead: "Cherchez d’abord dans les relations et les environnements où une conversation naturelle est possible.",
  places: [
    { title: "Votre réseau", text: "Commerçants, associations, collègues, amis, anciens clients, événements et groupes professionnels." },
    { title: "Google Maps et annuaires", text: "Utilisez-les pour comprendre une activité et repérer un besoin, jamais pour réserver une liste de contacts publics." },
    { title: "Réseaux sociaux", text: "Observez les entreprises actives qui demandent de l’aide, annoncent un changement ou reçoivent les mêmes questions." },
    { title: "LinkedIn et événements", text: "Échangez avec les responsables et les indépendants autour de leurs objectifs, pas avec un message envoyé en masse." },
  ],
  needsTitle: "Comprendre avant de recommander",
  needsLead: "Une courte conversation suffit souvent. Cherchez le problème, son impact et le résultat attendu.",
  questions: [
    "Qu’aimeriez-vous améliorer dans votre activité ou votre relation avec vos clients ?",
    "Qu’est-ce qui vous fait perdre le plus de temps aujourd’hui ?",
    "Comment vos clients vous trouvent-ils et vous contactent-ils actuellement ?",
    "Avez-vous déjà essayé de résoudre ce problème ?",
    "Seriez-vous d’accord pour que je vous présente une équipe qui peut étudier le besoin ?",
  ],
  outcomesTitle: "Parlez du résultat, pas du jargon",
  outcomesLead: "Expliquez ce que la personne peut améliorer. Creativa Poeta déterminera ensuite la solution adaptée.",
  outcomes: [
    { need: "Être mieux trouvé", outcome: "Présence locale claire, informations cohérentes et pages utiles." },
    { need: "Recevoir plus de demandes", outcome: "Parcours simple pour comprendre l’offre, réserver ou contacter." },
    { need: "Gagner du temps", outcome: "Outils, automatisations ou organisation numérique adaptés au travail réel." },
    { need: "Inspirer confiance", outcome: "Identité, design, textes et contenus plus professionnels." },
  ],
  templatesTitle: "Messages prêts à adapter",
  templatesLead: "Personnalisez toujours le message. Dites qui vous êtes, pourquoi vous pensez à cette personne et demandez son accord avant la mise en relation.",
  copy: "Copier",
  copied: "Copié",
  templates: [
    { channel: "WhatsApp", title: "Après une conversation", text: "Bonjour [Prénom], comme convenu, je peux vous présenter Creativa Poeta pour étudier votre besoin concernant [besoin]. L’équipe pourra vous écouter et vous proposer une suite adaptée, sans engagement de votre part. Puis-je faire la mise en relation ?" },
    { channel: "E-mail", title: "Introduction à trois", text: "Bonjour [Prénom],\n\nComme discuté, je vous présente l’équipe Creativa Poeta. [Prénom / entreprise] souhaite améliorer [besoin ou objectif]. Je vous laisse poursuivre directement pour préciser le contexte et voir ce qui serait utile.\n\nBien à vous," },
    { channel: "LinkedIn", title: "Premier échange", text: "Bonjour [Prénom], j’ai remarqué [observation précise]. Est-ce un sujet que vous cherchez actuellement à améliorer ? Si oui, je peux vous mettre en relation avec Creativa Poeta pour en discuter simplement." },
    { channel: "En personne", title: "Phrase courte", text: "Je connais une équipe qui peut regarder ce besoin avec vous. Si vous le souhaitez, je vous présente directement et vous déciderez ensuite si leur approche vous convient." },
  ],
  casesTitle: "Exemples concrets",
  caseSignalLabel: "Signal",
  caseApproachLabel: "Approche",
  cases: [
    { title: "Restaurant local", signal: "Horaires différents sur Maps et les réseaux, menu difficile à trouver.", approach: "Parler de visibilité et d’informations fiables, puis proposer une introduction." },
    { title: "Consultante indépendante", signal: "Les demandes arrivent partout et le suivi prend du temps.", approach: "Parler d’un parcours de contact plus simple et d’une meilleure organisation." },
    { title: "PME en croissance", signal: "Devis et relances sont encore gérés manuellement.", approach: "Explorer le temps perdu et proposer une étude d’automatisation, sans promettre l’outil." },
    { title: "Commerce avec Instagram", signal: "Produits visibles mais aucun espace officiel clair pour commander ou demander un prix.", approach: "Parler de confiance et de conversion, puis vérifier l’intérêt réel." },
    { title: "Association", signal: "Événements, inscriptions et documents sont dispersés.", approach: "Comprendre les utilisateurs concernés et le processus avant la mise en relation." },
  ],
  validationTitle: "Une vraie mise en relation, pas une liste de noms",
  validationLead: "Une coordonnée publique trouvée en ligne ne devient pas automatiquement votre introduction. La qualité et le consentement comptent davantage que la quantité.",
  validTitle: "Bonne pratique",
  valid: [
    "Vous connaissez la personne ou avez eu une conversation réelle avec elle.",
    "Elle a exprimé un besoin ou un intérêt identifiable.",
    "Elle accepte d’être contactée ou participe à une introduction à trois.",
    "Vous transmettez un contexte exact, sans exagération ni promesse commerciale.",
  ],
  avoidTitle: "À éviter",
  avoid: [
    "Copier des coordonnées publiques et les soumettre sans échange.",
    "Envoyer le même message à de nombreuses personnes ou insister après un refus.",
    "Promettre un prix, un délai, un résultat ou une commission non confirmés.",
    "Présenter quelqu’un qui est déjà en discussion avec Creativa Poeta comme une nouvelle introduction.",
  ],
  processTitle: "Après votre introduction",
  process: [
    { title: "1. Vérification", text: "Creativa Poeta vérifie que l’introduction est nouvelle, réelle et exploitable." },
    { title: "2. Échange", text: "L’équipe contacte la personne, comprend le besoin et prépare la suite commerciale." },
    { title: "3. Réalisation", text: "Si un accord est signé, Creativa Poeta organise et réalise la prestation." },
    { title: "4. Récompense", text: "La récompense devient payable selon les conditions, après encaissement du revenu admissible." },
  ],
  rewardTitle: "Une récompense proportionnelle",
  rewardText: "Le programme standard prévoit normalement 10 % du revenu admissible réellement encaissé par Creativa Poeta. Les conditions du programme expliquent les exclusions et le moment du paiement.",
  rewardExample: "Exemple : 2 000 € de revenu admissible encaissé → récompense indicative de 200 €.",
  growthTitle: "Vous apportez régulièrement de bonnes occasions ?",
  growthText: "Les consultants, commerciaux, agences et personnes très actives peuvent discuter d’un rôle de partenaire commercial avec des conditions adaptées à leur implication.",
  helpTitle: "Un doute avant de faire l’introduction ?",
  helpText: "Expliquez brièvement la situation à Creativa Poeta. Nous pouvons vous aider à vérifier si le besoin semble pertinent et à préparer une introduction simple.",
  helpCta: "Demander conseil sur WhatsApp",
  finalTitle: "Prêt à faire une introduction utile ?",
  finalText: "Commencez par une personne ou une entreprise que vous connaissez réellement. Écoutez le besoin, obtenez son accord, puis laissez Creativa Poeta prendre le relais.",
  guidePromoEyebrow: "Ressource gratuite",
  guidePromoTitle: "Comment trouver et présenter de bonnes occasions",
  guidePromoText: "Signaux à observer, questions utiles, exemples concrets et messages prêts à adapter : un guide simple pour commencer correctement.",
  guidePromoCta: "Ouvrir le guide",
};

const en: ReferralPartnerGuideCopy = {
  eyebrow: "Practical client introducer guide",
  title: "Spot a real need. Make a useful introduction.",
  lead: "This guide helps you find good opportunities, start an honest conversation and introduce a person or business to Creativa Poeta without technical knowledge.",
  start: "Join the program", introduce: "Introduce a client", contentsLabel: "In this guide",
  contents: [{ id: "role", label: "Your role" }, { id: "signals", label: "Spot a need" }, { id: "messages", label: "Ready-to-use messages" }, { id: "rules", label: "Valid introduction" }],
  publicNotice: "You can read this guide before joining. To introduce clients regularly and keep your introductions attributed to you, join the program for free.",
  partnerNotice: "Your partner access is recognised on this device. You can open your private introduction form directly.", partnerIdLabel: "Partner ID",
  roleTitle: "Your role is simple", roleLead: "You do not need to sell technology or deliver the project. Start a conversation and, when the need is real, make a clear introduction.",
  roleCards: [{ title: "Observe", text: "Notice a concrete problem: hard-to-find activity, unclear website, repetitive work or inconsistent communication." }, { title: "Listen", text: "Ask a few questions about the desired outcome without promising a price, deadline or solution." }, { title: "Introduce", text: "With the person’s agreement, connect them with Creativa Poeta and briefly explain the context." }],
  signalsTitle: "Opportunity detector", signalsLead: "Select only the signals you have actually observed. This prepares the conversation; it never replaces the person’s agreement.",
  signals: [{ title: "Hard to find", text: "The activity is poorly visible on Google, maps or local searches." }, { title: "Inconsistent information", text: "Opening hours, contacts, services or addresses differ across platforms." }, { title: "No clear website", text: "The site is missing, weak on mobile or fails to explain the offer." }, { title: "Repetitive manual work", text: "Bookings, quotes, follow-ups or documents could be organised or automated." }, { title: "Image or content needs work", text: "The business lacks clear copy, professional visuals or regular content." }, { title: "A project is already being considered", text: "The person already mentions a website, app, visibility, design or automation." }],
  scoreZero: "Start by observing and listening.", scoreLow: "One signal deserves a conversation, not a promise.", scoreGood: "Several needs look concrete: ask a few questions.", scoreStrong: "A good moment to suggest an introduction, with their agreement.",
  placesTitle: "Where to find good opportunities", placesLead: "Start with relationships and places where a natural conversation is possible.",
  places: [{ title: "Your network", text: "Shops, associations, colleagues, friends, former clients, events and professional groups." }, { title: "Google Maps and directories", text: "Use them to understand a business and spot a need, never to reserve a list of public contacts." }, { title: "Social media", text: "Notice active businesses asking for help, announcing change or answering the same customer questions." }, { title: "LinkedIn and events", text: "Talk with owners and professionals about their goals rather than sending mass messages." }],
  needsTitle: "Understand before recommending", needsLead: "A short conversation is often enough. Look for the problem, its impact and the expected outcome.",
  questions: ["What would you like to improve in your business or customer experience?", "What takes the most time today?", "How do customers currently find and contact you?", "Have you already tried to solve this problem?", "Would you agree to an introduction to a team that can assess the need?"],
  outcomesTitle: "Talk outcomes, not jargon", outcomesLead: "Explain what can improve. Creativa Poeta will determine the suitable solution afterwards.",
  outcomes: [{ need: "Be easier to find", outcome: "Clear local presence, consistent information and useful pages." }, { need: "Receive more enquiries", outcome: "A simple path to understand, book or contact." }, { need: "Save time", outcome: "Tools, automation or digital organisation suited to real work." }, { need: "Build trust", outcome: "More professional identity, design, copy and content." }],
  templatesTitle: "Messages ready to adapt", templatesLead: "Always personalise the message. Say who you are, why you thought of them and ask for agreement before introducing them.", copy: "Copy", copied: "Copied",
  templates: [{ channel: "WhatsApp", title: "After a conversation", text: "Hello [Name], as discussed, I can introduce you to Creativa Poeta to look at your need regarding [need]. The team can listen and suggest a suitable next step, with no obligation. May I make the introduction?" }, { channel: "Email", title: "Three-way introduction", text: "Hello [Name],\n\nAs discussed, I’m introducing you to the Creativa Poeta team. [Person / business] would like to improve [need or goal]. I’ll let you continue directly to clarify the context and see what may help.\n\nBest regards," }, { channel: "LinkedIn", title: "First conversation", text: "Hello [Name], I noticed [specific observation]. Is this something you are currently looking to improve? If so, I can connect you with Creativa Poeta for a simple discussion." }, { channel: "In person", title: "Short phrase", text: "I know a team that can look at this need with you. If you want, I’ll introduce you directly and you can then decide whether their approach suits you." }],
  casesTitle: "Concrete examples", caseSignalLabel: "Signal", caseApproachLabel: "Approach", cases: [{ title: "Local restaurant", signal: "Different hours on Maps and social media; menu hard to find.", approach: "Discuss visibility and reliable information, then offer an introduction." }, { title: "Independent consultant", signal: "Enquiries arrive everywhere and follow-up takes time.", approach: "Discuss a simpler contact journey and better organisation." }, { title: "Growing SME", signal: "Quotes and follow-ups are still handled manually.", approach: "Explore lost time and suggest an automation assessment without promising a tool." }, { title: "Instagram shop", signal: "Products are visible but there is no clear official place to order or ask for a price.", approach: "Discuss trust and conversion, then confirm genuine interest." }, { title: "Association", signal: "Events, registrations and documents are scattered.", approach: "Understand the users and process before the introduction." }],
  validationTitle: "A real introduction, not a list of names", validationLead: "Public contact details found online do not automatically become your introduction. Quality and consent matter more than quantity.", validTitle: "Good practice",
  valid: ["You know the person or have had a real conversation with them.", "They expressed an identifiable need or interest.", "They agree to be contacted or take part in a three-way introduction.", "You provide accurate context without exaggeration or commercial promises."], avoidTitle: "Avoid",
  avoid: ["Copying public contact details and submitting them without a conversation.", "Sending the same message widely or persisting after a refusal.", "Promising an unconfirmed price, deadline, outcome or reward.", "Claiming someone already speaking with Creativa Poeta as a new introduction."],
  processTitle: "After your introduction", process: [{ title: "1. Validation", text: "Creativa Poeta checks that the introduction is new, genuine and usable." }, { title: "2. Conversation", text: "The team contacts the person, understands the need and prepares the commercial next step." }, { title: "3. Delivery", text: "If an agreement is signed, Creativa Poeta organises and delivers the service." }, { title: "4. Reward", text: "The reward becomes payable under the terms after eligible revenue has been collected." }],
  rewardTitle: "A proportional reward", rewardText: "The standard program normally provides 10% of eligible revenue actually collected by Creativa Poeta. The program terms explain exclusions and payment timing.", rewardExample: "Example: €2,000 in eligible revenue collected → indicative €200 reward.",
  growthTitle: "Do you bring good opportunities regularly?", growthText: "Consultants, sales professionals, agencies and highly active introducers can discuss a commercial partner role with terms suited to their involvement.",
  helpTitle: "Unsure before making the introduction?", helpText: "Briefly explain the situation to Creativa Poeta. We can help you assess whether the need seems relevant and prepare a simple introduction.", helpCta: "Ask on WhatsApp",
  finalTitle: "Ready to make a useful introduction?", finalText: "Start with a person or business you genuinely know. Listen, get their agreement, then let Creativa Poeta take over.",
  guidePromoEyebrow: "Free resource", guidePromoTitle: "How to find and introduce good opportunities", guidePromoText: "Signals to notice, useful questions, real examples and adaptable messages: a simple guide to start well.", guidePromoCta: "Open the guide",
};

const nl: ReferralPartnerGuideCopy = {
  ...en,
  eyebrow: "Praktische gids voor klantenaanbrengers", title: "Herken een echte behoefte. Maak een nuttige introductie.", lead: "Deze gids helpt u goede kansen te vinden, een eerlijk gesprek te starten en een persoon of bedrijf aan Creativa Poeta voor te stellen zonder technische kennis.",
  start: "Deelnemen", introduce: "Een klant voorstellen", contentsLabel: "In deze gids",
  contents: [{ id: "role", label: "Uw rol" }, { id: "signals", label: "Een behoefte herkennen" }, { id: "messages", label: "Berichten om te gebruiken" }, { id: "rules", label: "Geldige introductie" }],
  publicNotice: "U kunt deze gids lezen voordat u deelneemt. Schrijf u gratis in om regelmatig klanten voor te stellen en uw introducties aan u toe te wijzen.", partnerNotice: "Uw partnertoegang wordt op dit apparaat herkend. U kunt meteen uw privéformulier openen.", partnerIdLabel: "Partner-ID",
  roleTitle: "Uw rol is eenvoudig", roleLead: "U hoeft geen technologie te verkopen of het project uit te voeren. U start een gesprek en maakt, als de behoefte echt is, een duidelijke introductie.",
  roleCards: [{ title: "Observeren", text: "Merk een concreet probleem op: moeilijk vindbaar, onduidelijke website, repetitief werk of inconsistente communicatie." }, { title: "Luisteren", text: "Stel enkele vragen over het gewenste resultaat zonder prijs, termijn of oplossing te beloven." }, { title: "Voorstellen", text: "Breng de persoon met zijn of haar toestemming in contact met Creativa Poeta en leg kort de context uit." }],
  signalsTitle: "Kansendetector", signalsLead: "Vink alleen signalen aan die u echt hebt gezien. Dit helpt het gesprek voor te bereiden, maar vervangt nooit de toestemming.",
  signals: [{ title: "Moeilijk vindbaar", text: "De activiteit is slecht zichtbaar op Google, kaarten of lokale zoekopdrachten." }, { title: "Tegenstrijdige informatie", text: "Openingsuren, contactgegevens, diensten of adressen verschillen per platform." }, { title: "Geen duidelijke website", text: "De site ontbreekt, werkt slecht op mobiel of legt het aanbod niet duidelijk uit." }, { title: "Herhaald handmatig werk", text: "Boekingen, offertes, opvolging of documenten kunnen beter worden georganiseerd of geautomatiseerd." }, { title: "Beeld of inhoud kan beter", text: "Het bedrijf mist duidelijke teksten, professionele beelden of regelmatige inhoud." }, { title: "Een project wordt al overwogen", text: "De persoon spreekt al over een website, app, zichtbaarheid, design of automatisering." }],
  scoreZero: "Begin met observeren en luisteren.", scoreLow: "Eén signaal verdient een gesprek, geen belofte.", scoreGood: "Meerdere behoeften lijken concreet: stel enkele vragen.", scoreStrong: "Een goed moment om met toestemming een introductie voor te stellen.",
  placesTitle: "Waar vindt u goede kansen?", placesLead: "Begin bij relaties en omgevingen waar een natuurlijk gesprek mogelijk is.",
  places: [{ title: "Uw netwerk", text: "Handelaars, verenigingen, collega’s, vrienden, voormalige klanten, evenementen en beroepsgroepen." }, { title: "Google Maps en bedrijvengidsen", text: "Gebruik ze om een activiteit te begrijpen en een behoefte te zien, nooit om een lijst openbare contacten te reserveren." }, { title: "Sociale media", text: "Let op actieve bedrijven die hulp vragen, verandering aankondigen of telkens dezelfde vragen beantwoorden." }, { title: "LinkedIn en evenementen", text: "Praat met verantwoordelijken en zelfstandigen over hun doelen in plaats van massaberichten te sturen." }],
  needsTitle: "Begrijp vóór u aanbeveelt", needsLead: "Een kort gesprek is vaak genoeg. Zoek naar het probleem, de impact en het verwachte resultaat.",
  questions: ["Wat wilt u verbeteren in uw activiteit of klantenervaring?", "Wat kost vandaag het meeste tijd?", "Hoe vinden en contacteren klanten u nu?", "Hebt u dit probleem al proberen op te lossen?", "Mag ik u voorstellen aan een team dat de behoefte kan onderzoeken?"],
  outcomesTitle: "Praat over resultaat, niet over jargon", outcomesLead: "Leg uit wat beter kan. Creativa Poeta bepaalt daarna de geschikte oplossing.",
  outcomes: [{ need: "Beter gevonden worden", outcome: "Duidelijke lokale aanwezigheid, consistente informatie en nuttige pagina’s." }, { need: "Meer aanvragen ontvangen", outcome: "Een eenvoudig traject om het aanbod te begrijpen, te boeken of contact op te nemen." }, { need: "Tijd besparen", outcome: "Tools, automatisering of digitale organisatie aangepast aan het echte werk." }, { need: "Vertrouwen wekken", outcome: "Professionelere identiteit, vormgeving, teksten en inhoud." }],
  templatesTitle: "Berichten om aan te passen", templatesLead: "Personaliseer elk bericht. Zeg wie u bent, waarom u aan hen dacht en vraag toestemming vóór de introductie.", copy: "Kopiëren", copied: "Gekopieerd",
  templates: [{ channel: "WhatsApp", title: "Na een gesprek", text: "Hallo [Naam], zoals besproken kan ik u voorstellen aan Creativa Poeta om uw behoefte rond [behoefte] te bekijken. Het team kan luisteren en een geschikte volgende stap voorstellen, zonder verplichting. Mag ik de introductie maken?" }, { channel: "E-mail", title: "Introductie met drie", text: "Hallo [Naam],\n\nZoals besproken stel ik u voor aan het team van Creativa Poeta. [Persoon / bedrijf] wil graag [behoefte of doel] verbeteren. Ik laat jullie rechtstreeks verdergaan om de context te verduidelijken en te bekijken wat nuttig kan zijn.\n\nMet vriendelijke groet," }, { channel: "LinkedIn", title: "Eerste gesprek", text: "Hallo [Naam], ik merkte [specifieke observatie] op. Is dit iets dat u momenteel wilt verbeteren? Zo ja, dan kan ik u met Creativa Poeta in contact brengen voor een eenvoudig gesprek." }, { channel: "Persoonlijk", title: "Korte zin", text: "Ik ken een team dat deze behoefte samen met u kan bekijken. Als u wilt, stel ik u rechtstreeks voor en beslist u daarna of hun aanpak past." }],
  casesTitle: "Concrete voorbeelden", caseSignalLabel: "Signaal", caseApproachLabel: "Aanpak",
  cases: [{ title: "Lokaal restaurant", signal: "Verschillende openingsuren op Maps en sociale media; menu moeilijk vindbaar.", approach: "Praat over zichtbaarheid en betrouwbare informatie en stel daarna een introductie voor." }, { title: "Zelfstandige consultant", signal: "Aanvragen komen overal binnen en opvolging kost tijd.", approach: "Praat over een eenvoudiger contacttraject en betere organisatie." }, { title: "Groeiende kmo", signal: "Offertes en opvolging gebeuren nog handmatig.", approach: "Onderzoek het tijdverlies en stel een automatiseringsanalyse voor zonder een tool te beloven." }, { title: "Instagram-winkel", signal: "Producten zijn zichtbaar maar er is geen duidelijke officiële plaats om te bestellen of een prijs te vragen.", approach: "Praat over vertrouwen en conversie en bevestig daarna de echte interesse." }, { title: "Vereniging", signal: "Evenementen, inschrijvingen en documenten zijn verspreid.", approach: "Begrijp eerst de gebruikers en het proces vóór de introductie." }],
  validationTitle: "Een echte introductie, geen namenlijst", validationLead: "Openbare contactgegevens worden niet automatisch uw introductie. Kwaliteit en toestemming tellen meer dan hoeveelheid.", validTitle: "Goede werkwijze", avoidTitle: "Te vermijden",
  valid: ["U kent de persoon of hebt echt met hem of haar gesproken.", "Er is een herkenbare behoefte of interesse uitgesproken.", "De persoon stemt in met contact of neemt deel aan een introductie met drie.", "U geeft correcte context zonder overdrijving of commerciële belofte."],
  avoid: ["Openbare contactgegevens kopiëren en zonder gesprek indienen.", "Hetzelfde bericht massaal versturen of blijven aandringen na een weigering.", "Een niet-bevestigde prijs, termijn, uitkomst of beloning beloven.", "Iemand die al met Creativa Poeta spreekt als een nieuwe introductie claimen."],
  processTitle: "Na uw introductie", rewardTitle: "Een evenredige beloning", rewardText: "Het standaardprogramma voorziet normaal 10% van de in aanmerking komende inkomsten die Creativa Poeta werkelijk ontvangt. De programmavoorwaarden leggen uitzonderingen en betaling uit.", rewardExample: "Voorbeeld: €2.000 ontvangen in aanmerking komende inkomsten → indicatieve beloning van €200.",
  process: [{ title: "1. Controle", text: "Creativa Poeta controleert of de introductie nieuw, echt en bruikbaar is." }, { title: "2. Gesprek", text: "Het team neemt contact op, begrijpt de behoefte en bereidt de commerciële volgende stap voor." }, { title: "3. Uitvoering", text: "Als een overeenkomst wordt gesloten, organiseert en levert Creativa Poeta de dienst." }, { title: "4. Beloning", text: "De beloning wordt volgens de voorwaarden betaalbaar nadat de in aanmerking komende inkomsten zijn ontvangen." }],
  growthTitle: "Brengt u regelmatig goede kansen aan?", growthText: "Consultants, verkopers, bureaus en zeer actieve aanbrengers kunnen een commerciële partnerrol bespreken met aangepaste voorwaarden.",
  helpTitle: "Twijfelt u vóór de introductie?", helpText: "Leg de situatie kort uit aan Creativa Poeta. We helpen beoordelen of de behoefte relevant lijkt en een eenvoudige introductie voorbereiden.", helpCta: "Vraag advies via WhatsApp",
  finalTitle: "Klaar voor een nuttige introductie?", finalText: "Begin met een persoon of bedrijf dat u echt kent. Luister, vraag toestemming en laat Creativa Poeta daarna overnemen.",
  guidePromoEyebrow: "Gratis hulpmiddel", guidePromoTitle: "Goede kansen vinden en voorstellen", guidePromoText: "Signalen, nuttige vragen, concrete voorbeelden en aanpasbare berichten: een eenvoudige gids om goed te beginnen.", guidePromoCta: "Open de gids",
};

const kiny: ReferralPartnerGuideCopy = {
  ...en,
  eyebrow: "Igitabo gifasha umuhuza w’abakiliya", title: "Menya ikibazo nyacyo. Huza abantu mu buryo bufite akamaro.", lead: "Iki gitabo kigufasha kubona amahirwe meza, kuganira mu kuri no kumenyekanisha umuntu cyangwa business kuri Creativa Poeta nubwo utazi ibya tekiniki.",
  start: "Injira muri porogaramu", introduce: "Menyekanisha umukiliya", contentsLabel: "Muri iki gitabo",
  contents: [{ id: "role", label: "Uruhare rwawe" }, { id: "signals", label: "Menya icyo bakeneye" }, { id: "messages", label: "Ubutumwa bwo gukoresha" }, { id: "rules", label: "Introduction yemewe" }],
  publicNotice: "Ushobora gusoma iki gitabo mbere yo kwinjira. Iyandikishe ku buntu kugira ngo umenyekanishe abakiliya kandi introductions zawe zandikwe kuri wowe.", partnerNotice: "Partner access yawe yamenyekanye kuri iki gikoresho. Ushobora gufungura form yawe bwite ako kanya.", partnerIdLabel: "Partner ID",
  roleTitle: "Uruhare rwawe ruroroshye", roleLead: "Ntugomba kugurisha technology cyangwa gukora project. Tangira ikiganiro, wumve need nyayo, hanyuma ubahuze na Creativa Poeta babyemeye.",
  roleCards: [{ title: "Itegereze", text: "Menya ikibazo gifatika: business itaboneka neza, website idasobanutse, akazi gasubirwamo cyangwa communication idahuye." }, { title: "Tega amatwi", text: "Baza ibibazo bike ku gisubizo bashaka utabasezeranya igiciro, igihe cyangwa solution." }, { title: "Huza abantu", text: "Babyemeye, bahuze na Creativa Poeta kandi usobanure muri make impamvu y’ikiganiro." }],
  signalsTitle: "Menya amahirwe", signalsLead: "Hitamo gusa ibimenyetso wabonye koko. Ibi bifasha gutegura ikiganiro ariko ntibisimbura ukwemera k’umuntu.",
  signals: [{ title: "Ntibaborohera kuboneka", text: "Business ntigaragara neza kuri Google, maps cyangwa local search." }, { title: "Amakuru ntahuye", text: "Amasaha, contacts, services cyangwa addresses biratandukanye ku mbuga." }, { title: "Website nta yo cyangwa ntisobanutse", text: "Website nta yo, ntikora neza kuri mobile cyangwa ntisobanura services." }, { title: "Akazi k’amaboko gasubirwamo", text: "Bookings, quotes, follow-up cyangwa documents bishobora gutunganywa cyangwa gukora automatically." }, { title: "Image cyangwa content birakeneye kunozwa", text: "Business ibura texts zisobanutse, visuals nziza cyangwa content ihoraho." }, { title: "Basanzwe batekereza project", text: "Umuntu asanzwe avuga website, app, visibility, design cyangwa automation." }],
  scoreZero: "Tangira witegereza kandi utega amatwi.", scoreLow: "Ikimenyetso kimwe gisaba ikiganiro, si isezerano.", scoreGood: "Hari needs nyinshi zifatika: baza ibibazo bike.", scoreStrong: "Ni umwanya mwiza wo gusaba kubahuza, babyemeye.",
  placesTitle: "Aho wabona amahirwe meza", placesLead: "Tangira ku bantu uzi n’ahantu ikiganiro gisanzwe gishoboka.",
  places: [{ title: "Network yawe", text: "Abacuruzi, associations, colleagues, inshuti, former clients, events na professional groups." }, { title: "Google Maps na directories", text: "Bikoreshe mu kumenya business no kubona need, ariko ntukoporore urutonde rwa public contacts ngo uzigire izawe." }, { title: "Social media", text: "Reba businesses zisaba ubufasha, zivuga impinduka cyangwa zisubiza ibibazo bimwe kenshi." }, { title: "LinkedIn na events", text: "Ganira n’abayobozi n’abikorera ku byo bashaka kugeraho aho kohereza mass messages." }],
  needsTitle: "Banza usobanukirwe", needsLead: "Ikiganiro kigufi kirahagije kenshi. Menya ikibazo, ingaruka zacyo n’igisubizo bashaka.",
  questions: ["Ni iki mwifuza kunoza muri business cyangwa mu buryo mukorana n’abakiliya?", "Ni iki kibatwara igihe kinini ubu?", "Abakiliya bababona kandi babavugisha bate?", "Mwagerageje gukemura iki kibazo?", "Mwakwemera ko mbahuza n’ikipe ishobora kwiga iyi need?"],
  outcomesTitle: "Vuga ku musaruro, si amagambo ya tekiniki", outcomesLead: "Sobanura icyo bashobora kunoza. Creativa Poeta izagena solution ibakwiriye.",
  outcomes: [{ need: "Kuboneka neza", outcome: "Local presence isobanutse, amakuru ahuye na pages zifasha." }, { need: "Kubona requests nyinshi", outcome: "Inzira yoroshye yo kumenya offer, booking cyangwa contact." }, { need: "Kuzigama igihe", outcome: "Tools, automation cyangwa digital organization bihuye n’akazi nyako." }, { need: "Kugirirwa icyizere", outcome: "Identity, design, texts na content birushijeho kuba professional." }],
  templatesTitle: "Ubutumwa ushobora guhindura", templatesLead: "Buri butumwa bugomba guhuza n’uwo uvugisha. Vuga uwo uri we, impamvu wamutekerejeho kandi usabe uruhushya mbere yo kumuhuza.", copy: "Koporora", copied: "Byakoporowe",
  templates: [{ channel: "WhatsApp", title: "Nyuma y’ikiganiro", text: "Muraho [Izina], nk’uko twabivuze, nshobora kubahuza na Creativa Poeta kugira ngo barebe need yanyu kuri [need]. Ikipe irabatega amatwi kandi ikabasaba intambwe ibakwiriye nta gahato. Nshobora kubahuza?" }, { channel: "E-mail", title: "Introduction y’abantu batatu", text: "Muraho [Izina],\n\nNk’uko twabivuze, ndabahuza n’ikipe ya Creativa Poeta. [Umuntu / business] yifuza kunoza [need cyangwa goal]. Ndabasigiye muganire directly, musobanure context kandi murebe icyabafasha.\n\nMurakoze," }, { channel: "LinkedIn", title: "Ikiganiro cya mbere", text: "Muraho [Izina], nabonye [ikintu wabonye]. Ese ni ikintu mushaka kunoza ubu? Niba ari byo, nshobora kubahuza na Creativa Poeta mukabiganiraho mu buryo bworoshye." }, { channel: "Imbonankubone", title: "Interuro ngufi", text: "Nzi ikipe ishobora kureba iyi need hamwe namwe. Nimubyifuza, ndabahuza directly hanyuma murebe niba uburyo bwabo bubakwiriye." }],
  casesTitle: "Ingero zifatika", caseSignalLabel: "Ikimenyetso", caseApproachLabel: "Uburyo bwo kubivuga",
  cases: [{ title: "Restaurant yo hafi", signal: "Amasaha ntahuye kuri Maps na social media; menu ntiborohera kuyibona.", approach: "Vuga kuri visibility n’amakuru yizewe, hanyuma usabe kubahuza." }, { title: "Consultant wigenga", signal: "Requests ziza ahantu henshi kandi follow-up itwara igihe.", approach: "Vuga ku nzira yoroshye ya contact no gutunganya akazi." }, { title: "SME iri gukura", signal: "Quotes na follow-up biracyakorwa manually.", approach: "Menya igihe batakaza kandi usabire automation assessment udasezeranya tool." }, { title: "Ubucuruzi bwa Instagram", signal: "Products ziragaragara ariko nta hantu official ho gutumiza cyangwa kubaza igiciro.", approach: "Vuga ku cyizere na conversion, hanyuma wemeze ko babishaka koko." }, { title: "Association", signal: "Events, registrations na documents biri ahantu hatandukanye.", approach: "Banza wumve users na process mbere yo kubahuza." }],
  validationTitle: "Introduction nyayo, si urutonde rw’amazina", validationLead: "Contact iboneka online ntihita iba introduction yawe. Quality n’ukwemera bifite agaciro kurusha ubwinshi.", validTitle: "Uburyo bwiza", avoidTitle: "Irinde",
  valid: ["Uzi umuntu cyangwa mwagiranye ikiganiro nyacyo.", "Yavuze need cyangwa interest ishobora gusobanurwa.", "Yemeye kuvugishwa cyangwa kwinjira muri introduction y’abantu batatu.", "Utanga context nyayo nta gukabya cyangwa isezerano ry’ubucuruzi."],
  avoid: ["Gukoporora public contacts no kuzohereza nta kiganiro.", "Kohereza message imwe ku bantu benshi cyangwa gukomeza nyuma yo kwangwa.", "Gusezeranya igiciro, igihe, result cyangwa reward bitaremezwa.", "Kwita umuntu usanzwe avugana na Creativa Poeta introduction nshya."],
  processTitle: "Nyuma yo kubahuza", rewardTitle: "Reward ijyanye n’umushinga", rewardText: "Porogaramu isanzwe iteganya 10% by’amafaranga yemerewe Creativa Poeta yakiriye koko. Amategeko ya porogaramu asobanura exclusions n’igihe cyo kwishyura.", rewardExample: "Urugero: €2,000 yakiriwe kandi yemewe → reward igereranyije ya €200.",
  process: [{ title: "1. Kugenzura", text: "Creativa Poeta ireba ko introduction ari nshya, nyayo kandi ishobora gukurikiranwa." }, { title: "2. Ikiganiro", text: "Ikipe ivugisha umuntu, ikumva need kandi igategura intambwe y’ubucuruzi." }, { title: "3. Gukora service", text: "Amasezerano nasinywa, Creativa Poeta itegura kandi igakora service." }, { title: "4. Reward", text: "Reward yishyurwa hakurikijwe amategeko nyuma y’uko amafaranga yemerewe yakiriwe." }],
  growthTitle: "Uzana amahirwe meza kenshi?", growthText: "Consultants, sales professionals, agencies n’abandi bakora cyane bashobora kuganira ku ruhare rwa commercial partner n’amasezerano abakwiriye.",
  helpTitle: "Ufite ikibazo mbere yo kubahuza?", helpText: "Sobanurira Creativa Poeta uko ibintu bimeze. Turagufasha kureba niba need ifite akamaro no gutegura introduction yoroshye.", helpCta: "Saba inama kuri WhatsApp",
  finalTitle: "Witeguye gukora introduction ifite akamaro?", finalText: "Tangira ku muntu cyangwa business uzi koko. Tega amatwi, saba uruhushya, hanyuma Creativa Poeta ikomeze.",
  guidePromoEyebrow: "Igikoresho cy’ubuntu", guidePromoTitle: "Uko wabona kandi ukamenyekanisha amahirwe meza", guidePromoText: "Ibimenyetso, ibibazo, ingero n’ubutumwa ushobora guhindura: guide yoroshye yo gutangira neza.", guidePromoCta: "Fungura guide",
};

const referralPartnerGuideLocale: Record<LocaleCode, ReferralPartnerGuideCopy> = { fr, en, nl, kiny };

export default referralPartnerGuideLocale;
