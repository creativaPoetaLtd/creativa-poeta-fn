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
    eyebrow: "Creativa Poeta Referral Partner Program",
    title: "Votre réseau a de la valeur.",
    hero: "Présentez-nous une entreprise qui a besoin de solutions numériques. Nous gérons la vente et la réalisation. Vous recevez une récompense lorsque le client paie.",
    rewardLine: "Gagnez 10 % du montant admissible encaissé, jusqu’à 200 € par nouveau client.",
    join: "Devenir Referral Partner",
    submitLead: "Soumettre un referral",
    trust: ["Inscription gratuite", "Aucune connaissance technique requise", "Pays éligibles"],
    howTitle: "Vous faites l’introduction. Nous nous occupons du reste.",
    howLead: "Un parcours simple, transparent et sans obligation de vendre techniquement le projet.",
    steps: [
      { title: "Présentez", text: "Faites une vraie introduction auprès d’une entreprise qui a exprimé un besoin." },
      { title: "Nous livrons", text: "CP qualifie l’opportunité, prépare la proposition et réalise le projet." },
      { title: "Vous êtes récompensé", text: "Après encaissement du projet admissible, votre récompense est calculée et validée." },
    ],
    servicesTitle: "Les opportunités que vous pouvez nous présenter",
    services: ["Sites web & e-commerce", "Logiciels & applications", "IA & automatisation", "SEO & visibilité", "Marketing digital", "Branding & design", "Contenus créatifs"],
    calculatorTitle: "Estimez votre récompense",
    calculatorLead: "La récompense standard correspond à 10 % du montant admissible réellement encaissé par CP, plafonnée à 200 €.",
    estimatedValue: "Valeur admissible estimée du projet",
    estimatedReward: "Récompense estimée",
    estimateNote: "Cette estimation n’est pas une promesse de paiement. L’éligibilité et le montant final dépendent des conditions du programme.",
    programsTitle: "Choisissez la collaboration qui vous correspond",
    referralTitle: "Referral Partner",
    referralText: "Pour toute personne capable de faire une introduction authentique.",
    referralPoints: ["10 % jusqu’à 200 €", "Pas d’expérience commerciale requise", "CP gère la vente et la production"],
    businessTitle: "Business Partner",
    businessText: "Pour les consultants, commerciaux et agences qui apportent ou développent régulièrement des opportunités.",
    businessPoints: ["Commission personnalisée", "Possibilité de relation récurrente", "Conditions adaptées au rôle joué"],
    validTitle: "Un referral valide",
    valid: ["Vous connaissez réellement le prospect", "Le prospect a exprimé un besoin", "Vous pouvez faire l’introduction", "Le prospect est nouveau pour CP"],
    invalidTitle: "Ce qui ne compte pas",
    invalid: ["Coordonnées copiées sur Internet", "Listes achetées ou extraites", "Spam ou fausses identités", "Prospect déjà connu de CP"],
    applyTitle: "Rejoignez le CPRPP",
    applyLead: "Tout le monde peut postuler. CP vérifie chaque candidature avant d’activer l’accès partenaire.",
    form: {
      name: "Nom complet", email: "E-mail", country: "Pays", profile: "Votre profil", program: "Programme souhaité", website: "LinkedIn ou site (facultatif)",
      network: "Décrivez brièvement votre réseau ou la manière dont vous trouvez des opportunités", terms: "J’accepte les conditions du Referral Program et je confirme avoir au moins 18 ans.", marketing: "Je souhaite recevoir les actualités et conseils du programme (facultatif).", send: "Envoyer ma candidature", sending: "Envoi…",
      profiles: ["Particulier", "Étudiant", "Freelance", "Consultant", "Commercial", "Agence", "Autre"], referral: "Referral Partner", business: "Business Partner", success: "Votre candidature a bien été envoyée.", error: "Impossible d’envoyer la candidature.",
    },
    leadTitle: "Vous êtes déjà partenaire ?",
    leadLead: "Ouvrez le lien privé reçu après validation pour soumettre et attribuer correctement votre referral.",
    leadLocked: "Le formulaire sécurisé apparaît uniquement depuis votre lien partenaire privé.",
    leadForm: {
      company: "Entreprise", contact: "Personne de contact", email: "E-mail du prospect", phone: "Téléphone du prospect", website: "Site de l’entreprise", service: "Service recherché", budget: "Budget approximatif (facultatif)", need: "Quel est le besoin ?", relationship: "Quel est votre lien avec ce prospect ?", consent: "Le prospect a-t-il accepté d’être contacté par CP ?", consentYes: "Oui, il a accepté", consentNo: "Pas encore — conserver en attente", intro: "Comment ferez-vous l’introduction ?", introDetails: "Contexte ou détails de l’introduction", send: "Soumettre le referral", sending: "Envoi…", success: "Le referral a bien été transmis.", error: "Impossible de transmettre le referral.",
      relationships: ["Je connais personnellement le contact", "Il m’a parlé de son besoin", "Je lui ai déjà parlé de CP", "Je peux faire une introduction directe", "Autre"],
      intros: ["E-mail à trois", "WhatsApp", "LinkedIn", "Lien personnel", "Autre"],
    },
    strategicTitle: "Vous recherchez une collaboration plus large ?",
    strategicLead: "Les agences, entreprises et institutions peuvent également proposer une collaboration stratégique avec Creativa Poeta.",
    strategicPoints: ["Production white label", "Capacité dédiée", "Collaboration agence", "Partenariat technologique ou institutionnel"],
    strategicFormTitle: "Proposer un partenariat stratégique",
    strategicSuccess: "Votre proposition de partenariat a été envoyée.",
    faqTitle: "Questions fréquentes",
    faq: [
      { question: "Quand suis-je payé ?", answer: "Une récompense devient payable après validation du referral et encaissement effectif du montant admissible par CP." },
      { question: "Puis-je envoyer un contact trouvé sur Google ?", answer: "Non. Un referral nécessite une relation réelle ou une introduction authentique. Une coordonnée publique ne réserve jamais un prospect." },
      { question: "Que se passe-t-il si deux partenaires proposent la même entreprise ?", answer: "CP examine la première introduction authentique acceptée, pas simplement le premier formulaire envoyé." },
      { question: "Puis-je représenter Creativa Poeta ?", answer: "Non. Un Referral Partner n’est ni employé ni représentant légal de CP et ne peut faire de promesse au nom de CP." },
    ],
    termsLink: "Consulter les conditions complètes du programme",
  },
  en: {
    eyebrow: "Creativa Poeta Referral Partner Program",
    title: "Your network has value.",
    hero: "Introduce us to a business that needs digital solutions. We handle sales and delivery. You earn a reward when the client pays.",
    rewardLine: "Earn 10% of eligible revenue collected, up to €200 per new client.",
    join: "Become a Referral Partner", submitLead: "Submit a referral",
    trust: ["Free to join", "No technical knowledge required", "Eligible countries"],
    howTitle: "You make the introduction. We handle the rest.", howLead: "A simple, transparent journey with no need to sell the project technically.",
    steps: [
      { title: "Introduce", text: "Make a genuine introduction to a business that has expressed a need." },
      { title: "We deliver", text: "CP qualifies the opportunity, prepares the proposal and delivers the project." },
      { title: "Get rewarded", text: "After eligible project revenue is collected, your reward is calculated and approved." },
    ],
    servicesTitle: "Opportunities you can refer", services: ["Websites & e-commerce", "Software & applications", "AI & automation", "SEO & visibility", "Digital marketing", "Branding & design", "Creative content"],
    calculatorTitle: "Estimate your reward", calculatorLead: "The standard reward is 10% of eligible revenue actually collected by CP, capped at €200.", estimatedValue: "Estimated eligible project value", estimatedReward: "Estimated reward", estimateNote: "This estimate is not a promise of payment. Eligibility and the final amount depend on the program terms.",
    programsTitle: "Choose the right collaboration", referralTitle: "Referral Partner", referralText: "For anyone who can make a genuine introduction.", referralPoints: ["10% up to €200", "No sales experience required", "CP handles sales and delivery"], businessTitle: "Business Partner", businessText: "For consultants, sales professionals and agencies that regularly source or develop opportunities.", businessPoints: ["Custom commission", "Recurring relationship possible", "Terms based on your actual role"],
    validTitle: "A valid referral", valid: ["You genuinely know the prospect", "They expressed a need", "You can make the introduction", "The prospect is new to CP"], invalidTitle: "What does not qualify", invalid: ["Contact details copied online", "Purchased or scraped lists", "Spam or false identities", "A prospect already known to CP"],
    applyTitle: "Join the CPRPP", applyLead: "Anyone can apply. CP reviews every application before partner access is activated.",
    form: { name: "Full name", email: "Email", country: "Country", profile: "Your profile", program: "Preferred program", website: "LinkedIn or website (optional)", network: "Briefly describe your network or how you find opportunities", terms: "I accept the Referral Program Terms and confirm that I am at least 18.", marketing: "I would like to receive program news and tips (optional).", send: "Submit my application", sending: "Sending…", profiles: ["Individual", "Student", "Freelancer", "Consultant", "Sales professional", "Agency", "Other"], referral: "Referral Partner", business: "Business Partner", success: "Your application has been submitted.", error: "Could not submit the application." },
    leadTitle: "Already a partner?", leadLead: "Open the private link received after approval to submit and correctly attribute your referral.", leadLocked: "The secure form only appears through your private partner link.",
    leadForm: { company: "Company", contact: "Contact person", email: "Prospect email", phone: "Prospect phone", website: "Company website", service: "Service needed", budget: "Approximate budget (optional)", need: "What do they need?", relationship: "How are you connected to this prospect?", consent: "Has the prospect agreed to be contacted by CP?", consentYes: "Yes, they agreed", consentNo: "Not yet — keep it waiting", intro: "How will you make the introduction?", introDetails: "Context or introduction details", send: "Submit referral", sending: "Sending…", success: "The referral has been submitted.", error: "Could not submit the referral.", relationships: ["I know the contact personally", "They told me about their need", "I already told them about CP", "I can make a direct introduction", "Other"], intros: ["Three-way email", "WhatsApp", "LinkedIn", "Personal link", "Other"] },
    strategicTitle: "Looking for a broader collaboration?", strategicLead: "Agencies, companies and institutions can also propose a strategic collaboration with Creativa Poeta.", strategicPoints: ["White-label delivery", "Dedicated capacity", "Agency collaboration", "Technology or institutional partnership"], strategicFormTitle: "Propose a strategic partnership", strategicSuccess: "Your partnership proposal has been sent.",
    faqTitle: "Frequently asked questions", faq: [
      { question: "When do I get paid?", answer: "A reward becomes payable after the referral is validated and CP has actually collected the eligible amount." },
      { question: "Can I submit a contact found on Google?", answer: "No. A referral requires a real connection or genuine introduction. Public contact details never reserve a prospect." },
      { question: "What if two partners submit the same company?", answer: "CP reviews the first genuine introduction it accepts, not simply the first submitted form." },
      { question: "Can I represent Creativa Poeta?", answer: "No. A Referral Partner is not an employee or legal representative of CP and cannot make promises on CP's behalf." },
    ], termsLink: "Read the full Referral Program Terms",
  },
  nl: {
    eyebrow: "Creativa Poeta Referral Partner Program", title: "Uw netwerk heeft waarde.", hero: "Breng ons in contact met een bedrijf dat digitale oplossingen nodig heeft. Wij regelen verkoop en uitvoering. U ontvangt een beloning wanneer de klant betaalt.", rewardLine: "Verdien 10% van de ontvangen in aanmerking komende omzet, tot €200 per nieuwe klant.", join: "Referral Partner worden", submitLead: "Een referral indienen", trust: ["Gratis deelname", "Geen technische kennis nodig", "In aanmerking komende landen"],
    howTitle: "U maakt de introductie. Wij doen de rest.", howLead: "Een eenvoudig en transparant proces zonder dat u het project technisch hoeft te verkopen.", steps: [{ title: "Introduceer", text: "Maak een echte introductie bij een bedrijf dat een behoefte heeft uitgesproken." }, { title: "Wij leveren", text: "CP kwalificeert de kans, maakt het voorstel en voert het project uit." }, { title: "Ontvang uw beloning", text: "Na ontvangst van de in aanmerking komende projectomzet wordt uw beloning berekend en goedgekeurd." }],
    servicesTitle: "Kansen die u kunt doorverwijzen", services: ["Websites & e-commerce", "Software & applicaties", "AI & automatisering", "SEO & zichtbaarheid", "Digitale marketing", "Branding & design", "Creatieve content"], calculatorTitle: "Schat uw beloning", calculatorLead: "De standaardbeloning bedraagt 10% van de omzet die CP werkelijk ontvangt, met een maximum van €200.", estimatedValue: "Geschatte projectwaarde", estimatedReward: "Geschatte beloning", estimateNote: "Deze schatting is geen betalingsbelofte. De voorwaarden bepalen de uiteindelijke geschiktheid en het bedrag.",
    programsTitle: "Kies de juiste samenwerking", referralTitle: "Referral Partner", referralText: "Voor iedereen die een authentieke introductie kan maken.", referralPoints: ["10% tot €200", "Geen verkoopervaring vereist", "CP regelt verkoop en uitvoering"], businessTitle: "Business Partner", businessText: "Voor consultants, verkopers en bureaus die regelmatig zakelijke kansen aanbrengen of ontwikkelen.", businessPoints: ["Commissie op maat", "Terugkerende samenwerking mogelijk", "Voorwaarden volgens uw werkelijke rol"], validTitle: "Een geldige referral", valid: ["U kent de prospect echt", "De prospect heeft een behoefte", "U kunt de introductie maken", "De prospect is nieuw voor CP"], invalidTitle: "Wat niet geldig is", invalid: ["Contactgegevens van internet", "Gekochte of gescrapete lijsten", "Spam of valse identiteiten", "Een prospect die CP al kent"],
    applyTitle: "Word lid van het CPRPP", applyLead: "Iedereen kan zich aanmelden. CP beoordeelt elke aanvraag voordat partnertoegang wordt geactiveerd.", form: { name: "Volledige naam", email: "E-mail", country: "Land", profile: "Uw profiel", program: "Gewenst programma", website: "LinkedIn of website (optioneel)", network: "Beschrijf kort uw netwerk of hoe u kansen vindt", terms: "Ik accepteer de Referral Program Terms en bevestig dat ik minstens 18 jaar ben.", marketing: "Ik wil nieuws en tips over het programma ontvangen (optioneel).", send: "Aanvraag verzenden", sending: "Verzenden…", profiles: ["Particulier", "Student", "Freelancer", "Consultant", "Verkoper", "Bureau", "Andere"], referral: "Referral Partner", business: "Business Partner", success: "Uw aanvraag is verzonden.", error: "De aanvraag kon niet worden verzonden." },
    leadTitle: "Al partner?", leadLead: "Open de privélink die u na goedkeuring ontving om uw referral correct toe te wijzen.", leadLocked: "Het beveiligde formulier verschijnt alleen via uw privé-partnerlink.", leadForm: { company: "Bedrijf", contact: "Contactpersoon", email: "E-mail prospect", phone: "Telefoon prospect", website: "Website bedrijf", service: "Benodigde dienst", budget: "Geschat budget (optioneel)", need: "Wat is de behoefte?", relationship: "Hoe bent u met deze prospect verbonden?", consent: "Heeft de prospect ingestemd om door CP gecontacteerd te worden?", consentYes: "Ja, er is toestemming", consentNo: "Nog niet — in afwachting bewaren", intro: "Hoe maakt u de introductie?", introDetails: "Context of details", send: "Referral indienen", sending: "Verzenden…", success: "De referral is verzonden.", error: "De referral kon niet worden verzonden.", relationships: ["Ik ken de contactpersoon persoonlijk", "De prospect vertelde over de behoefte", "Ik heb al over CP verteld", "Ik kan rechtstreeks introduceren", "Andere"], intros: ["E-mail met drie partijen", "WhatsApp", "LinkedIn", "Persoonlijke link", "Andere"] },
    strategicTitle: "Een bredere samenwerking nodig?", strategicLead: "Bureaus, bedrijven en instellingen kunnen ook een strategische samenwerking met Creativa Poeta voorstellen.", strategicPoints: ["White-label uitvoering", "Toegewijde capaciteit", "Samenwerking met bureaus", "Technologisch of institutioneel partnerschap"], strategicFormTitle: "Strategisch partnerschap voorstellen", strategicSuccess: "Uw voorstel is verzonden.", faqTitle: "Veelgestelde vragen", faq: [{ question: "Wanneer word ik betaald?", answer: "Een beloning is betaalbaar nadat de referral is gevalideerd en CP het in aanmerking komende bedrag werkelijk heeft ontvangen." }, { question: "Mag ik een contact van Google indienen?", answer: "Nee. Een referral vereist een echte band of introductie. Openbare contactgegevens reserveren nooit een prospect." }, { question: "Wat als twee partners hetzelfde bedrijf indienen?", answer: "CP beoordeelt de eerste authentieke introductie die wordt aanvaard, niet gewoon het eerste formulier." }, { question: "Mag ik Creativa Poeta vertegenwoordigen?", answer: "Nee. Een Referral Partner is geen werknemer of wettelijke vertegenwoordiger van CP." }], termsLink: "Lees de volledige programmavoorwaarden",
  },
  kiny: {
    eyebrow: "Creativa Poeta Referral Partner Program", title: "Network yawe ifite agaciro.", hero: "Tumenyeshe business ikeneye digital solutions. Twe dukurikirana sales na delivery, nawe ugahabwa reward client amaze kwishyura.", rewardLine: "Habwa 10% by’amafaranga yemerewe CP yakiriye, kugeza kuri €200 kuri client mushya.", join: "Ba Referral Partner", submitLead: "Ohereza referral", trust: ["Kwiyandikisha ni ubuntu", "Nta bumenyi bwa tekiniki busabwa", "Ibihugu byemewe"],
    howTitle: "Wowe ukora introduction. Twe tugakora ibisigaye.", howLead: "Process yoroshye kandi iboneye; ntugomba kugurisha project mu buryo bwa tekiniki.", steps: [{ title: "Kora introduction", text: "Tumenyeshe business uzi kandi yamaze kuvuga ko ikeneye service." }, { title: "Twe turayikora", text: "CP isuzuma opportunity, igakora proposal kandi igatanga project." }, { title: "Habwa reward", text: "CP imaze kwakira amafaranga yemerewe, reward yawe irabarwa kandi ikemezwa." }],
    servicesTitle: "Opportunities ushobora kutwoherereza", services: ["Websites & e-commerce", "Software & applications", "AI & automation", "SEO & visibility", "Digital marketing", "Branding & design", "Creative content"], calculatorTitle: "Bara reward yawe", calculatorLead: "Reward isanzwe ni 10% by’amafaranga yemerewe CP yakiriye, ariko ntirenga €200.", estimatedValue: "Agaciro ka project kagereranyijwe", estimatedReward: "Reward igereranyijwe", estimateNote: "Iyi mibare ni estimate gusa. Eligibility n’amafaranga ya nyuma bigengwa n’amategeko ya program.",
    programsTitle: "Hitamo uburyo bwo gukorana", referralTitle: "Referral Partner", referralText: "Ku muntu wese ushobora gukora introduction nyayo.", referralPoints: ["10% kugeza kuri €200", "Nta sales experience isabwa", "CP ikora sales na delivery"], businessTitle: "Business Partner", businessText: "Ku consultants, sales professionals na agencies bizana cyangwa biteza imbere opportunities kenshi.", businessPoints: ["Commission yihariye", "Gukorana kenshi birashoboka", "Amategeko ashingira ku ruhare rwawe"], validTitle: "Referral yemewe", valid: ["Uzi prospect by’ukuri", "Yavuze ko ikeneye service", "Ushobora gukora introduction", "Ni prospect nshya kuri CP"], invalidTitle: "Ibitabarwa", invalid: ["Contacts zakuwe kuri Internet", "Lists zaguzwe cyangwa zascrapwe", "Spam cyangwa identities z’ibinyoma", "Prospect CP yari isanzwe izi"],
    applyTitle: "Injira muri CPRPP", applyLead: "Umuntu wese ashobora gusaba. CP ibanza gusuzuma application mbere yo gutanga partner access.", form: { name: "Amazina yose", email: "Email", country: "Igihugu", profile: "Profile yawe", program: "Program ushaka", website: "LinkedIn cyangwa website (optional)", network: "Vuga muri make network yawe cyangwa uko ubona opportunities", terms: "Nemeye Referral Program Terms kandi mfite nibura imyaka 18.", marketing: "Ndashaka kwakira amakuru n’inama za program (optional).", send: "Ohereza application", sending: "Birimo koherezwa…", profiles: ["Umuntu ku giti cye", "Umunyeshuri", "Freelancer", "Consultant", "Sales professional", "Agency", "Ikindi"], referral: "Referral Partner", business: "Business Partner", success: "Application yawe yoherejwe.", error: "Application ntiyoherejwe." },
    leadTitle: "Usanzwe uri partner?", leadLead: "Fungura private link wakiriye umaze kwemerwa kugira ngo referral yandikwe neza kuri wowe.", leadLocked: "Secure form igaragara gusa ukoresheje private partner link yawe.", leadForm: { company: "Company", contact: "Contact person", email: "Email ya prospect", phone: "Telephone ya prospect", website: "Website ya company", service: "Service ikenewe", budget: "Budget igereranyijwe (optional)", need: "Bakeneye iki?", relationship: "Ufitanye iyihe sano na prospect?", consent: "Prospect yemeye ko CP imuvugisha?", consentYes: "Yego, yaremeye", consentNo: "Ntabwo arabyemeza — bigume bitegereje", intro: "Introduction uzayikora ute?", introDetails: "Context cyangwa details", send: "Ohereza referral", sending: "Birimo koherezwa…", success: "Referral yoherejwe.", error: "Referral ntiyoherejwe.", relationships: ["Nzi contact ku giti cyanjye", "Yambwiye ibyo akeneye", "Namubwiye CP", "Nshobora gukora direct introduction", "Ikindi"], intros: ["Email irimo impande eshatu", "WhatsApp", "LinkedIn", "Personal link", "Ikindi"] },
    strategicTitle: "Murashaka partnership yagutse?", strategicLead: "Agencies, companies n’institutions bishobora no gusaba strategic collaboration na Creativa Poeta.", strategicPoints: ["White-label delivery", "Dedicated capacity", "Agency collaboration", "Technology cyangwa institutional partnership"], strategicFormTitle: "Saba strategic partnership", strategicSuccess: "Partnership proposal yoherejwe.", faqTitle: "Ibibazo bikunze kubazwa", faq: [{ question: "Nishyurwa ryari?", answer: "Reward yishyurwa referral imaze kwemezwa kandi CP imaze kwakira amafaranga yemerewe." }, { question: "Nshobora kohereza contact nabonye kuri Google?", answer: "Oya. Referral igomba kuba ifite relationship cyangwa introduction nyayo. Public contact ntiha umuntu uburenganzira kuri prospect." }, { question: "Bigenda bite partners babiri bohereje company imwe?", answer: "CP ireba introduction nyayo yabanje kwemerwa, ntabwo ari form yabanje gusa." }, { question: "Nshobora guhagararira Creativa Poeta?", answer: "Oya. Referral Partner ntabwo ari employee cyangwa legal representative wa CP." }], termsLink: "Soma Referral Program Terms zose",
  },
};

export default referralProgramLocale;
