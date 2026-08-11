export type ReferralProgramCopy = {
  eyebrow: string;
  title: string;
  hero: string;
  rewardLine: string;
  join: string;
  submitLead: string;
  trust: string[];
  howTitle: string;
  howLead: string;
  steps: Array<{ title: string; text: string }>;
  servicesTitle: string;
  services: string[];
  calculatorTitle: string;
  calculatorLead: string;
  estimatedValue: string;
  estimatedReward: string;
  estimateNote: string;
  programsTitle: string;
  referralTitle: string;
  referralText: string;
  referralPoints: string[];
  businessTitle: string;
  businessText: string;
  businessPoints: string[];
  validTitle: string;
  valid: string[];
  invalidTitle: string;
  invalid: string[];
  applyTitle: string;
  applyLead: string;
  form: {
    name: string; email: string; country: string; profile: string; program: string; website: string;
    network: string; terms: string; marketing: string; send: string; sending: string;
    profiles: string[]; referral: string; business: string; success: string; error: string;
  };
  leadTitle: string;
  leadLead: string;
  leadLocked: string;
  leadForm: {
    company: string; contact: string; email: string; phone: string; website: string; service: string;
    budget: string; need: string; relationship: string; consent: string; consentYes: string; consentNo: string;
    intro: string; introDetails: string; send: string; sending: string; success: string; error: string;
    relationships: string[]; intros: string[];
  };
  strategicTitle: string;
  strategicLead: string;
  strategicPoints: string[];
  strategicFormTitle: string;
  strategicSuccess: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  termsLink: string;
};

const referralProgramLocale: Record<"fr" | "en" | "nl" | "kiny", ReferralProgramCopy> = {
  fr: {
    eyebrow: "Programme d’apporteurs de clients Creativa Poeta",
    title: "Votre réseau peut créer des opportunités.",
    hero: "Vous connaissez une personne ou une entreprise qui a besoin d’un site web, d’un logiciel, de design, de visibilité ou d’une autre solution numérique ? Présentez-la à Creativa Poeta. Notre équipe s’occupe de la vente et de la réalisation du projet.",
    rewardLine: "Si cette présentation devient un projet payé, vous recevez normalement 10 % du montant admissible réellement encaissé.",
    join: "Rejoindre le programme",
    submitLead: "Présenter un client",
    trust: ["Ouvert à tous", "Aucune connaissance technique requise", "Inscription gratuite"],
    howTitle: "En quoi consiste ce programme ?",
    howLead: "Il récompense les personnes qui mettent Creativa Poeta en relation avec de nouveaux clients. Vous n’avez pas besoin de vendre ni de réaliser le projet : une introduction réelle et honnête suffit.",
    steps: [
      { title: "Vous faites l’introduction", text: "Présentez une personne ou une entreprise dont vous connaissez réellement le besoin et qui accepte cette mise en relation." },
      { title: "Creativa Poeta prend le relais", text: "Notre équipe comprend le besoin, prépare l’offre et réalise le service convenu." },
      { title: "Vous recevez votre récompense", text: "Après acceptation du projet et encaissement du paiement admissible, votre récompense est calculée et payée." },
    ],
    servicesTitle: "Quels besoins pouvez-vous nous présenter ?",
    services: ["Sites web & e-commerce", "Logiciels & applications", "IA & automatisation", "SEO & visibilité", "Marketing digital", "Branding & design", "Contenus créatifs"],
    calculatorTitle: "Estimez votre récompense",
    calculatorLead: "La récompense standard correspond à 10 % du montant admissible réellement encaissé par Creativa Poeta, sans plafond fixe.",
    estimatedValue: "Valeur admissible estimée du projet",
    estimatedReward: "Récompense estimée",
    estimateNote: "Cette estimation n’est pas une promesse de paiement. L’éligibilité et le montant final dépendent des conditions du programme.",
    programsTitle: "Deux façons de participer",
    referralTitle: "Apporteur occasionnel (Referral Partner)",
    referralText: "C’est une personne qui nous présente ponctuellement un nouveau client. Aucun métier commercial ou technique n’est nécessaire.",
    referralPoints: ["10 % du montant admissible encaissé", "Une vraie introduction suffit", "Creativa Poeta gère la vente et la réalisation"],
    businessTitle: "Partenaire commercial (Business Partner)",
    businessText: "Un consultant, commercial, freelance ou une agence qui développe régulièrement des opportunités avec Creativa Poeta.",
    businessPoints: ["Commission personnalisée", "Possibilité de relation récurrente", "Conditions adaptées au rôle joué"],
    validTitle: "Une présentation recevable",
    valid: ["Vous connaissez réellement la personne ou l’entreprise", "Un besoin numérique a été exprimé", "La personne accepte l’introduction ou le contact", "Le client est nouveau pour Creativa Poeta"],
    invalidTitle: "Ce qui ne compte pas",
    invalid: ["Coordonnées copiées sur Internet", "Listes achetées ou extraites", "Spam ou fausses identités", "Client déjà connu de Creativa Poeta"],
    applyTitle: "Rejoindre le programme",
    applyLead: "Inscrivez-vous pour recevoir, après validation, votre identifiant et votre lien privé. Vous pourrez ensuite présenter des clients sans ressaisir vos informations.",
    form: {
      name: "Nom complet", email: "E-mail", country: "Pays", profile: "Votre profil", program: "Programme souhaité", website: "LinkedIn ou site",
      network: "", terms: "J’accepte les conditions du programme et je confirme avoir au moins 18 ans.", marketing: "Je souhaite recevoir les actualités et conseils du programme.", send: "Envoyer ma demande", sending: "Envoi…",
      profiles: ["Particulier", "Étudiant", "Freelance", "Consultant", "Commercial", "Agence", "Autre"], referral: "Apporteur occasionnel", business: "Partenaire commercial", success: "Votre demande a bien été envoyée.", error: "Impossible d’envoyer votre demande.",
    },
    leadTitle: "Présenter un client avec votre accès privé",
    leadLead: "Votre identifiant est déjà associé à ce formulaire. Complétez uniquement les informations du client que vous souhaitez présenter.",
    leadLocked: "Le formulaire sécurisé apparaît uniquement depuis votre lien partenaire privé.",
    leadForm: {
      company: "Entreprise", contact: "Personne de contact", email: "E-mail du client", phone: "Téléphone du client", website: "Site de l’entreprise", service: "Service recherché", budget: "Budget approximatif", need: "Décrivez le besoin", relationship: "Quel lien avez-vous avec cette personne ou entreprise ?", consent: "A-t-elle accepté d’être contactée par Creativa Poeta ?", consentYes: "Oui, elle a accepté", consentNo: "Pas encore — conserver en attente", intro: "Comment ferez-vous l’introduction ?", introDetails: "Contexte ou détails de l’introduction", send: "Envoyer la présentation", sending: "Envoi…", success: "La présentation a bien été transmise.", error: "Impossible de transmettre la présentation.",
      relationships: ["Je connais personnellement le contact", "Cette personne m’a parlé de son besoin", "J’ai déjà parlé de Creativa Poeta avec elle", "Je peux faire une introduction directe", "Autre"],
      intros: ["E-mail à trois", "WhatsApp", "LinkedIn", "Lien personnel", "Autre"],
    },
    strategicTitle: "Vous représentez une entreprise, une agence ou une institution ?",
    strategicLead: "Si vous recherchez une collaboration privée, une production en marque blanche, une capacité dédiée ou un partenariat adapté à votre organisation, discutons d’un accord sur mesure.",
    strategicPoints: ["Production white label", "Capacité dédiée", "Collaboration agence", "Partenariat technologique ou institutionnel"],
    strategicFormTitle: "Proposer un partenariat stratégique",
    strategicSuccess: "Votre proposition de partenariat a été envoyée.",
    faqTitle: "Questions fréquentes",
    faq: [
      { question: "Quand serai-je payé ?", answer: "Après validation de la présentation, signature du projet et encaissement effectif du montant admissible par Creativa Poeta." },
      { question: "Puis-je envoyer un contact trouvé sur Google ?", answer: "Non. Il faut une relation réelle ou une introduction authentique. Une simple coordonnée publique ne donne droit à aucune récompense." },
      { question: "Que se passe-t-il si deux personnes présentent la même entreprise ?", answer: "Creativa Poeta vérifie la première introduction authentique acceptée, et non simplement le premier formulaire envoyé." },
      { question: "Puis-je parler au nom de Creativa Poeta ?", answer: "Non. Participer au programme ne fait pas de vous un salarié, un agent ou un représentant légal de Creativa Poeta." },
    ],
    termsLink: "Consulter les conditions complètes du programme",
  },
  en: {
    eyebrow: "Creativa Poeta Client Introduction Program",
    title: "Your network can create opportunities.",
    hero: "Know a person or business that needs a website, software, design, visibility or another digital solution? Introduce them to Creativa Poeta. Our team handles the sale and delivers the project.",
    rewardLine: "If your introduction becomes a paid project, you normally receive 10% of the eligible amount actually collected.",
    join: "Join the program", submitLead: "Introduce a client",
    trust: ["Open to everyone", "No technical knowledge required", "Free to join"],
    howTitle: "What is this program?", howLead: "It rewards people who connect Creativa Poeta with new clients. You do not need to sell or deliver the project: a real and honest introduction is enough.",
    steps: [
      { title: "Introduce", text: "Make a genuine introduction to a person or business that has expressed a need and agreed to the connection." },
      { title: "Creativa Poeta takes over", text: "Our team understands the need, prepares the offer and delivers the agreed service." },
      { title: "Get rewarded", text: "After eligible project revenue is collected, your reward is calculated and approved." },
    ],
    servicesTitle: "Opportunities you can refer", services: ["Websites & e-commerce", "Software & applications", "AI & automation", "SEO & visibility", "Digital marketing", "Branding & design", "Creative content"],
    calculatorTitle: "Estimate your reward", calculatorLead: "The standard reward is 10% of the eligible amount actually collected by Creativa Poeta, with no fixed cap.", estimatedValue: "Estimated eligible project amount", estimatedReward: "Estimated 10% reward", estimateNote: "This estimate is not a promise of payment. Taxes, refunds and pass-through third-party costs are excluded. The program terms determine the final amount.",
    programsTitle: "Two ways to participate", referralTitle: "Occasional introducer (Referral Partner)", referralText: "Someone who occasionally introduces a new client. No sales or technical profession is required.", referralPoints: ["10% of eligible revenue collected", "One genuine introduction is enough", "Creativa Poeta handles sales and delivery"], businessTitle: "Commercial partner (Business Partner)", businessText: "A consultant, sales professional, freelancer or agency that regularly develops opportunities with Creativa Poeta.", businessPoints: ["Ongoing cooperation possible", "Role and commission adapted", "Specific agreement based on involvement"],
    validTitle: "An acceptable introduction", valid: ["You genuinely know the person or business", "They expressed a digital need", "They agree to the introduction or contact", "They are new to Creativa Poeta"], invalidTitle: "What does not count", invalid: ["Contact details copied online", "Purchased or automatically scraped lists", "Spam or false identities", "A client already known to Creativa Poeta"],
    applyTitle: "Join the program", applyLead: "Register to receive your identifier and private link after approval. You can then introduce clients without entering your own details again.",
    form: { name: "Full name", email: "Email address", country: "Country", profile: "Your profile", program: "Participation type", website: "LinkedIn or website", network: "", terms: "I accept the program terms and confirm that I am at least 18.", marketing: "I would like to receive program news and tips.", send: "Send my application", sending: "Sending…", profiles: ["Individual", "Student", "Freelancer", "Consultant", "Sales professional", "Agency", "Other"], referral: "Occasional introducer", business: "Commercial partner", success: "Your application has been submitted.", error: "Could not submit your application." },
    leadTitle: "Introduce a client with your private access", leadLead: "Your identifier is already linked to this form. Only complete the information about the client you want to introduce.", leadLocked: "The secure form only appears through your private program link.",
    leadForm: { company: "Company", contact: "Contact person", email: "Client email", phone: "Client phone", website: "Company website", service: "Service needed", budget: "Approximate budget", need: "Describe the need", relationship: "How are you connected to this person or business?", consent: "Have they agreed to be contacted by Creativa Poeta?", consentYes: "Yes, they agreed", consentNo: "Not yet — keep it waiting", intro: "How will you make the introduction?", introDetails: "Context or introduction details", send: "Send the introduction", sending: "Sending…", success: "The introduction has been submitted.", error: "Could not submit the introduction.", relationships: ["I know the contact personally", "They told me about their need", "I already told them about Creativa Poeta", "I can make a direct introduction", "Other"], intros: ["Three-way email", "WhatsApp", "LinkedIn", "In-person introduction", "Other"] },
    strategicTitle: "Do you represent a company, agency or institution?", strategicLead: "If you need a private collaboration, white-label delivery, dedicated production capacity or a partnership tailored to your organisation, let us discuss a custom agreement.", strategicPoints: ["White-label delivery", "Dedicated capacity", "Agency collaboration", "Technology or institutional partnership"], strategicFormTitle: "Tell us about your collaboration project", strategicSuccess: "Your proposal has been submitted.",
    faqTitle: "Frequently asked questions", faq: [
      { question: "When will I be paid?", answer: "After the introduction is validated, the project is signed and Creativa Poeta has actually collected the eligible amount." },
      { question: "Can I send a contact found on Google?", answer: "No. A real relationship or genuine introduction is required. Public contact details alone do not qualify for a reward." },
      { question: "What if two people introduce the same business?", answer: "Creativa Poeta verifies the first genuine introduction it accepts, not simply the first form submitted." },
      { question: "Can I speak on behalf of Creativa Poeta?", answer: "No. Joining the program does not make you an employee, agent or legal representative of Creativa Poeta." },
    ], termsLink: "Read the full Referral Program Terms",
  },
  nl: {
    eyebrow: "Creativa Poeta-programma voor klantenaanbrengers", title: "Uw netwerk kan kansen creëren.", hero: "Kent u een persoon of bedrijf dat een website, software, design, zichtbaarheid of een andere digitale oplossing nodig heeft? Breng hen in contact met Creativa Poeta. Ons team verzorgt de verkoop en uitvoering.", rewardLine: "Wordt uw introductie een betaald project, dan ontvangt u normaal 10% van het werkelijk ontvangen, in aanmerking komende bedrag.", join: "Deelnemen aan het programma", submitLead: "Een klant voorstellen", trust: ["Open voor iedereen", "Geen technische kennis nodig", "Gratis deelname"],
    howTitle: "Wat houdt dit programma in?", howLead: "Het beloont mensen die Creativa Poeta met nieuwe klanten verbinden. U hoeft niets te verkopen of uit te voeren: een echte en eerlijke introductie volstaat.", steps: [{ title: "U maakt de introductie", text: "Stel ons voor aan een persoon of bedrijf waarvan u de behoefte echt kent en dat instemt met het contact." }, { title: "Creativa Poeta neemt over", text: "Ons team begrijpt de behoefte, maakt het aanbod en levert de afgesproken dienst." }, { title: "U ontvangt uw beloning", text: "Na aanvaarding van het project en ontvangst van de in aanmerking komende betaling wordt uw beloning berekend en betaald." }],
    servicesTitle: "Welke behoeften kunt u voorstellen?", services: ["Websites & e-commerce", "Software & applicaties", "AI & automatisering", "SEO & zichtbaarheid", "Digitale marketing", "Branding & design", "Creatieve content"], calculatorTitle: "Schat uw beloning", calculatorLead: "De standaardbeloning is 10% van het werkelijk door Creativa Poeta ontvangen, in aanmerking komende bedrag, zonder vaste limiet.", estimatedValue: "Geschat in aanmerking komend projectbedrag", estimatedReward: "Geschatte beloning van 10%", estimateNote: "Deze schatting is geen betalingsbelofte. Belastingen, terugbetalingen en doorgerekende kosten van derden zijn uitgesloten.",
    programsTitle: "Twee manieren om deel te nemen", referralTitle: "Occasionele aanbrenger (Referral Partner)", referralText: "Iemand die af en toe een nieuwe klant voorstelt. Verkoop- of technische ervaring is niet nodig.", referralPoints: ["10% van ontvangen in aanmerking komende omzet", "Eén echte introductie volstaat", "Creativa Poeta regelt verkoop en uitvoering"], businessTitle: "Commerciële partner (Business Partner)", businessText: "Een consultant, verkoper, freelancer of bureau dat regelmatig kansen ontwikkelt met Creativa Poeta.", businessPoints: ["Doorlopende samenwerking mogelijk", "Aangepaste rol en commissie", "Specifieke overeenkomst volgens betrokkenheid"], validTitle: "Een geldige introductie", valid: ["U kent de persoon of het bedrijf echt", "Er werd een digitale behoefte uitgesproken", "Er is toestemming voor de introductie of het contact", "De klant is nieuw voor Creativa Poeta"], invalidTitle: "Wat niet meetelt", invalid: ["Contactgegevens van het internet", "Gekochte of automatisch verzamelde lijsten", "Spam of valse identiteiten", "Een klant die Creativa Poeta al kent"],
    applyTitle: "Deelnemen aan het programma", applyLead: "Registreer u om na goedkeuring uw identificatie en privélink te ontvangen. Daarna kunt u klanten voorstellen zonder uw eigen gegevens opnieuw in te vullen.", form: { name: "Volledige naam", email: "E-mailadres", country: "Land", profile: "Uw profiel", program: "Manier van deelnemen", website: "LinkedIn of website", network: "", terms: "Ik aanvaard de programmavoorwaarden en bevestig dat ik minstens 18 jaar ben.", marketing: "Ik ontvang graag nieuws en tips over het programma.", send: "Mijn aanvraag verzenden", sending: "Verzenden…", profiles: ["Particulier", "Student", "Freelancer", "Consultant", "Verkoper", "Bureau", "Andere"], referral: "Occasionele aanbrenger", business: "Commerciële partner", success: "Uw aanvraag is verzonden.", error: "Uw aanvraag kon niet worden verzonden." },
    leadTitle: "Een klant voorstellen met uw privétoegang", leadLead: "Uw identificatie is al aan dit formulier gekoppeld. Vul alleen de gegevens in van de klant die u wilt voorstellen.", leadLocked: "Het beveiligde formulier verschijnt alleen via uw privélink.", leadForm: { company: "Bedrijf", contact: "Contactpersoon", email: "E-mail klant", phone: "Telefoon klant", website: "Website bedrijf", service: "Benodigde dienst", budget: "Geschat budget", need: "Beschrijf de behoefte", relationship: "Wat is uw band met deze persoon of dit bedrijf?", consent: "Heeft deze persoon ingestemd met contact door Creativa Poeta?", consentYes: "Ja, er is toestemming", consentNo: "Nog niet — in afwachting bewaren", intro: "Hoe maakt u de introductie?", introDetails: "Context of details", send: "Introductie verzenden", sending: "Verzenden…", success: "De introductie is verzonden.", error: "De introductie kon niet worden verzonden.", relationships: ["Ik ken de contactpersoon persoonlijk", "Deze persoon vertelde mij over de behoefte", "Ik heb Creativa Poeta al vermeld", "Ik kan rechtstreeks introduceren", "Andere"], intros: ["E-mail met drie partijen", "WhatsApp", "LinkedIn", "Persoonlijke introductie", "Andere"] },
    strategicTitle: "Vertegenwoordigt u een bedrijf, bureau of instelling?", strategicLead: "Zoekt u een private samenwerking, white-label uitvoering, toegewijde productiecapaciteit of een partnerschap op maat? Dan bespreken we graag een aangepaste overeenkomst.", strategicPoints: ["White-label uitvoering", "Toegewijde capaciteit", "Samenwerking tussen bureaus", "Technologisch of institutioneel partnerschap"], strategicFormTitle: "Vertel ons over uw samenwerkingsproject", strategicSuccess: "Uw voorstel is verzonden.", faqTitle: "Veelgestelde vragen", faq: [{ question: "Wanneer word ik betaald?", answer: "Na validatie van de introductie en werkelijke ontvangst van het in aanmerking komende bedrag door Creativa Poeta." }, { question: "Mag ik een contact van Google indienen?", answer: "Nee. Een echte relatie of authentieke introductie is vereist. Openbare contactgegevens alleen geven geen recht op een beloning." }, { question: "Wat als twee mensen hetzelfde bedrijf voorstellen?", answer: "Creativa Poeta controleert de eerste echte introductie die wordt aanvaard, niet gewoon het eerste formulier." }, { question: "Mag ik namens Creativa Poeta spreken?", answer: "Nee. Deelname maakt u niet tot werknemer, agent of wettelijke vertegenwoordiger van Creativa Poeta." }], termsLink: "Lees de volledige programmavoorwaarden",
  },
  kiny: {
    eyebrow: "Porogaramu ya Creativa Poeta yo kumenyekanisha abakiliya", title: "Abantu uzi bashobora kurema amahirwe mashya.", hero: "Hari umuntu cyangwa business uzi ikeneye website, software, design, visibility cyangwa indi digital solution? Muyihuze na Creativa Poeta. Team yacu izakurikirana ibiganiro, offer no gukora project.", rewardLine: "Iyo uwo muntu abaye umukiliya akishyura project, usanzwe uhabwa 10% by’amafaranga yemerewe Creativa Poeta yakiriye.", join: "Injira muri porogaramu", submitLead: "Menyekanisha umukiliya", trust: ["Ifunguye kuri bose", "Nta bumenyi bwa tekiniki busabwa", "Kwiyandikisha ni ubuntu"],
    howTitle: "Iyi porogaramu ikora ite?", howLead: "Ihemba abantu bahuza Creativa Poeta n’abakiliya bashya. Ntugomba kugurisha cyangwa gukora project: introduction nyayo kandi y’ukuri irahagije.", steps: [{ title: "Uduhuza n’umukiliya", text: "Utumenyesha umuntu cyangwa business uzi neza icyo ikeneye kandi yemeye ko tuyivugisha." }, { title: "Creativa Poeta ikomeza akazi", text: "Team yacu yumva ibyo bakeneye, igategura offer kandi igakora service bumvikanyeho." }, { title: "Uhabwa igihembo", text: "Project imaze kwemerwa n’amafaranga yemerewe amaze kwakirwa, igihembo cyawe kirabarwa kikishyurwa." }],
    servicesTitle: "Ni izihe services ushobora kutumenyeshereza?", services: ["Websites & e-commerce", "Software & applications", "AI & automation", "SEO & visibility", "Digital marketing", "Branding & design", "Creative content"], calculatorTitle: "Gereranya igihembo cyawe", calculatorLead: "Igihembo gisanzwe ni 10% by’amafaranga yemerewe Creativa Poeta yakiriye, nta cap ihamye.", estimatedValue: "Agaciro kagereranyijwe ka project", estimatedReward: "Igihembo cya 10% kigereranyijwe", estimateNote: "Iyi mibare ni igereranya, si isezerano ryo kwishyura. Amategeko ya porogaramu ni yo agena amafaranga ya nyuma.",
    programsTitle: "Uburyo bubiri bwo kwitabira", referralTitle: "Umuntu utuzanira umukiliya rimwe na rimwe (Referral Partner)", referralText: "Ni umuntu utumenyesha umukiliya mushya rimwe na rimwe. Ntabwo bisaba kuba umucuruzi cyangwa umutekinisiye.", referralPoints: ["10% by’amafaranga yemerewe yakiriwe", "Introduction imwe nyayo irahagije", "Creativa Poeta ikora sales na delivery"], businessTitle: "Umufatanyabikorwa w’ubucuruzi (Business Partner)", businessText: "Consultant, umucuruzi, freelancer cyangwa agency izana opportunities kenshi kandi igakorana na Creativa Poeta.", businessPoints: ["Gukorana igihe kirekire birashoboka", "Uruhare na commission birategurwa", "Amasezerano ajyana n’uruhare rwawe"], validTitle: "Introduction yemewe", valid: ["Uzi uwo muntu cyangwa business by’ukuri", "Bavuze digital service bakeneye", "Bemeye ko ubahuza natwe cyangwa ko tubavugisha", "Ni umukiliya mushya kuri Creativa Poeta"], invalidTitle: "Ibitabarwa", invalid: ["Contacts zakuwe kuri Internet gusa", "Lists zaguzwe cyangwa zakusanyijwe na robots", "Spam cyangwa amazina y’ibinyoma", "Umukiliya Creativa Poeta yari isanzwe izi"],
    applyTitle: "Injira muri porogaramu", applyLead: "Iyandikishe kugira ngo nyuma yo kwemezwa ubone identifier na private link yawe. Uzajya utumenyesha abakiliya utabanje kongera kwandika amakuru yawe.", form: { name: "Amazina yose", email: "Email", country: "Igihugu", profile: "Icyiciro cyawe", program: "Uburyo ushaka kwitabira", website: "LinkedIn cyangwa website", network: "", terms: "Nemeye amategeko ya porogaramu kandi mfite nibura imyaka 18.", marketing: "Ndashaka kwakira amakuru n’inama za porogaramu.", send: "Ohereza ubusabe", sending: "Birimo koherezwa…", profiles: ["Umuntu ku giti cye", "Umunyeshuri", "Freelancer", "Consultant", "Umucuruzi", "Agency", "Ikindi"], referral: "Utuzanira umukiliya rimwe na rimwe", business: "Umufatanyabikorwa w’ubucuruzi", success: "Ubusabe bwawe bwoherejwe.", error: "Ubusabe bwawe ntibwoherejwe." },
    leadTitle: "Menyekanisha umukiliya ukoresheje private access yawe", leadLead: "Identifier yawe isanzwe iri kuri iyi form. Uzuza gusa amakuru y’umukiliya ushaka kutumenyesha.", leadLocked: "Iyi form igaragara gusa ukoresheje private link yawe.", leadForm: { company: "Business", contact: "Umuntu tuvugisha", email: "Email y’umukiliya", phone: "Telefone y’umukiliya", website: "Website ya business", service: "Service bakeneye", budget: "Budget igereranyijwe", need: "Sobanura ibyo bakeneye", relationship: "Ufitanye uwuhe mubano n’uyu muntu cyangwa business?", consent: "Bemeye ko Creativa Poeta ibavugisha?", consentYes: "Yego, barabyemeye", consentNo: "Ntabwo barabyemeza — bibe bitegereje", intro: "Uzabahuza natwe ute?", introDetails: "Context cyangwa details za introduction", send: "Ohereza introduction", sending: "Birimo koherezwa…", success: "Introduction yoherejwe.", error: "Introduction ntiyoherejwe.", relationships: ["Nzi uwo muntu ku giti cyanjye", "Yambwiye service akeneye", "Namubwiye Creativa Poeta", "Nshobora kubahuza direct", "Ikindi"], intros: ["Email irimo impande eshatu", "WhatsApp", "LinkedIn", "Kubahuza imbonankubone", "Ikindi"] },
    strategicTitle: "Uhagarariye company, agency cyangwa institution?", strategicLead: "Niba mushaka private collaboration, white-label delivery, dedicated production capacity cyangwa partnership ijyanye n’umuryango wanyu, twaganira ku masezerano yihariye.", strategicPoints: ["White-label delivery", "Dedicated capacity", "Gukorana hagati ya agencies", "Technology cyangwa institutional partnership"], strategicFormTitle: "Tubwire project y’ubufatanye mushaka", strategicSuccess: "Proposal yanyu yoherejwe.", faqTitle: "Ibibazo bikunze kubazwa", faq: [{ question: "Nishyurwa ryari?", answer: "Introduction imaze kwemezwa, project igasinywa kandi Creativa Poeta ikakira amafaranga yemerewe." }, { question: "Nshobora kohereza contact nabonye kuri Google?", answer: "Oya. Hagomba kuba hari relationship cyangwa introduction nyayo. Contact yo kuri Internet gusa ntiyemerera igihembo." }, { question: "Bigenda bite abantu babiri bazanye business imwe?", answer: "Creativa Poeta igenzura introduction nyayo yabanje kwemerwa, ntabwo ireba form yabanje gusa." }, { question: "Nshobora kuvuga mu izina rya Creativa Poeta?", answer: "Oya. Kwitabira porogaramu ntibiguhindura employee, agent cyangwa legal representative wa Creativa Poeta." }], termsLink: "Soma amategeko yose ya porogaramu",
  },
};

export default referralProgramLocale;
