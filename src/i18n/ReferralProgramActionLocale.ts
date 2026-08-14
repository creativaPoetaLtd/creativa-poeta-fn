export type ReferralProgramActionCopy = {
  directTitle: string;
  directLead: string;
  directButton: string;
  directFormTitle: string;
  identityTitle: string;
  clientTitle: string;
  directTerms: string;
  directSuccess: string;
  directError: string;
  emailOptional: string;
  phoneOptional: string;
  preferredContact: string;
  contactRequired: string;
  clientType: string;
  personOption: string;
  companyOption: string;
  personName: string;
  companyName: string;
  companyContact: string;
  clientEmailOptional: string;
  clientPhoneOptional: string;
  clientContactRequired: string;
  needOptional: string;
  strategicPhone: string;
  contactOptions: Array<{ value: "email" | "whatsapp" | "phone" | "sms" | "other"; label: string }>;
  strategicButton: string;
  close: string;
  dialogOk: string;
  successTitle: string;
  errorTitle: string;
  validationTitle: string;
  alreadyRegisteredTitle: string;
  alreadyRegisteredMessage: string;
  requestAccess: string;
  requestingAccess: string;
  recoveryReceivedTitle: string;
  recoveryReceivedMessage: string;
};

const referralProgramActionLocale: Record<"fr" | "en" | "nl" | "kiny", ReferralProgramActionCopy> = {
  fr: {
    directTitle: "Vous avez déjà un client à nous présenter ?",
    directLead: "Vous pouvez faire votre première présentation sans attendre votre inscription. Nous enregistrerons vos informations avec celles du client et créerons automatiquement votre dossier dans le programme.",
    directButton: "Présenter ce client",
    directFormTitle: "Présenter un client à Creativa Poeta",
    identityTitle: "Vos informations",
    clientTitle: "Informations sur la personne ou l’entreprise présentée",
    directTerms: "J’accepte les conditions du programme, je confirme avoir au moins 18 ans et je certifie que cette présentation repose sur un lien réel.",
    directSuccess: "La présentation a été envoyée et votre dossier d’apporteur a été créé. Creativa Poeta vérifiera les informations avant de confirmer l’attribution.",
    directError: "Impossible d’envoyer cette présentation.",
    emailOptional: "E-mail",
    phoneOptional: "Numéro WhatsApp ou téléphone",
    preferredContact: "Comment préférez-vous être contacté ?",
    contactRequired: "Indiquez au moins une adresse e-mail ou un numéro WhatsApp/téléphone.",
    clientType: "Qui souhaitez-vous présenter ?",
    personOption: "Une personne",
    companyOption: "Une entreprise",
    personName: "Nom complet de la personne",
    companyName: "Nom de l’entreprise",
    companyContact: "Personne de contact",
    clientEmailOptional: "E-mail",
    clientPhoneOptional: "Téléphone ou WhatsApp",
    clientContactRequired: "Indiquez au moins un moyen de contacter le client : e-mail ou téléphone/WhatsApp.",
    needOptional: "Décrivez le besoin",
    strategicPhone: "Téléphone",
    contactOptions: [{ value: "email", label: "E-mail" }, { value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Appel téléphonique" }, { value: "sms", label: "SMS" }, { value: "other", label: "Autre" }],
    strategicButton: "Proposer une collaboration",
    close: "Fermer",
    dialogOk: "J’ai compris",
    successTitle: "Demande bien enregistrée",
    errorTitle: "La demande n’a pas pu être envoyée",
    validationTitle: "Informations à compléter",
    alreadyRegisteredTitle: "Vous êtes déjà inscrit",
    alreadyRegisteredMessage: "Une inscription utilisant cette adresse e-mail ou ce numéro existe déjà. Il n’est pas nécessaire de vous inscrire une seconde fois. Si vous avez perdu votre lien privé pour présenter des clients, demandez-nous de vous le renvoyer.",
    requestAccess: "Redemander mon lien privé",
    requestingAccess: "Envoi de la demande…",
    recoveryReceivedTitle: "Demande de lien reçue",
    recoveryReceivedMessage: "Creativa Poeta a reçu votre demande. Notre équipe vérifiera votre inscription et vous transmettra un nouveau lien privé par votre moyen de contact enregistré.",
  },
  en: {
    directTitle: "Already have a client to introduce?",
    directLead: "You can make your first introduction before registering. We will save your details with the client information and automatically create your program record.",
    directButton: "Introduce this client",
    directFormTitle: "Introduce a client to Creativa Poeta",
    identityTitle: "Your information",
    clientTitle: "Information about the person or company",
    directTerms: "I accept the program terms, confirm that I am at least 18 and certify that this introduction is based on a genuine connection.",
    directSuccess: "The introduction was sent and your program record was created. Creativa Poeta will verify the information before confirming attribution.",
    directError: "Could not send this introduction.",
    emailOptional: "Email",
    phoneOptional: "WhatsApp or phone number",
    preferredContact: "How would you prefer to be contacted?",
    contactRequired: "Provide at least an email address or a WhatsApp/phone number.",
    clientType: "Who would you like to introduce?",
    personOption: "A person",
    companyOption: "A company",
    personName: "Person’s full name",
    companyName: "Company name",
    companyContact: "Contact person",
    clientEmailOptional: "Email",
    clientPhoneOptional: "Phone or WhatsApp",
    clientContactRequired: "Provide at least one way to contact the client: email or phone/WhatsApp.",
    needOptional: "Describe the need",
    strategicPhone: "Phone",
    contactOptions: [{ value: "email", label: "Email" }, { value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Phone call" }, { value: "sms", label: "SMS" }, { value: "other", label: "Other" }],
    strategicButton: "Propose a collaboration",
    close: "Close",
    dialogOk: "I understand",
    successTitle: "Request successfully recorded",
    errorTitle: "The request could not be sent",
    validationTitle: "Information required",
    alreadyRegisteredTitle: "You are already registered",
    alreadyRegisteredMessage: "A registration using this email address or phone number already exists. You do not need to register again. If you have lost your private client-introduction link, ask us to send you a new one.",
    requestAccess: "Request my private link",
    requestingAccess: "Sending request…",
    recoveryReceivedTitle: "Link request received",
    recoveryReceivedMessage: "Creativa Poeta has received your request. Our team will verify your registration and send a new private link through your registered contact method.",
  },
  nl: {
    directTitle: "Hebt u al een klant om voor te stellen?",
    directLead: "U kunt uw eerste introductie doen zonder voorafgaande registratie. We bewaren uw gegevens samen met die van de klant en maken automatisch uw programmadossier aan.",
    directButton: "Deze klant voorstellen",
    directFormTitle: "Een klant voorstellen aan Creativa Poeta",
    identityTitle: "Uw informatie",
    clientTitle: "Informatie over de voorgestelde persoon of het bedrijf",
    directTerms: "Ik aanvaard de programmavoorwaarden, bevestig dat ik minstens 18 jaar ben en verklaar dat deze introductie op een echte band berust.",
    directSuccess: "De introductie is verzonden en uw programmadossier is aangemaakt. Creativa Poeta controleert de informatie voordat de toewijzing wordt bevestigd.",
    directError: "Deze introductie kon niet worden verzonden.",
    emailOptional: "E-mail",
    phoneOptional: "WhatsApp- of telefoonnummer",
    preferredContact: "Hoe wilt u het liefst gecontacteerd worden?",
    contactRequired: "Vul minstens een e-mailadres of WhatsApp-/telefoonnummer in.",
    clientType: "Wie wilt u voorstellen?",
    personOption: "Een persoon",
    companyOption: "Een bedrijf",
    personName: "Volledige naam van de persoon",
    companyName: "Bedrijfsnaam",
    companyContact: "Contactpersoon",
    clientEmailOptional: "E-mail",
    clientPhoneOptional: "Telefoon of WhatsApp",
    clientContactRequired: "Geef minstens één contactmogelijkheid op: e-mail of telefoon/WhatsApp.",
    needOptional: "Beschrijf de behoefte",
    strategicPhone: "Telefoon",
    contactOptions: [{ value: "email", label: "E-mail" }, { value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Telefoongesprek" }, { value: "sms", label: "SMS" }, { value: "other", label: "Andere" }],
    strategicButton: "Een samenwerking voorstellen",
    close: "Sluiten",
    dialogOk: "Ik begrijp het",
    successTitle: "Aanvraag goed geregistreerd",
    errorTitle: "De aanvraag kon niet worden verzonden",
    validationTitle: "Informatie ontbreekt",
    alreadyRegisteredTitle: "U bent al geregistreerd",
    alreadyRegisteredMessage: "Er bestaat al een inschrijving met dit e-mailadres of telefoonnummer. U hoeft zich niet opnieuw in te schrijven. Bent u uw privélink kwijt om klanten voor te stellen, vraag ons dan om een nieuwe link.",
    requestAccess: "Mijn privélink opnieuw aanvragen",
    requestingAccess: "Aanvraag verzenden…",
    recoveryReceivedTitle: "Linkaanvraag ontvangen",
    recoveryReceivedMessage: "Creativa Poeta heeft uw aanvraag ontvangen. Ons team controleert uw inschrijving en stuurt een nieuwe privélink via uw geregistreerde contactmethode.",
  },
  kiny: {
    directTitle: "Hari umukiliya usanzwe ushaka kutumenyesha?",
    directLead: "Ushobora kutwoherereza umukiliya wa mbere utarabanje kwiyandikisha. Tuzabika amakuru yawe n’ay’umukiliya kandi tugukorere dossier ya porogaramu ako kanya.",
    directButton: "Menyekanisha uyu mukiliya",
    directFormTitle: "Menyekanisha umukiliya kuri Creativa Poeta",
    identityTitle: "Amakuru yawe",
    clientTitle: "Amakuru y’umuntu cyangwa business",
    directTerms: "Nemeye amategeko ya porogaramu, mfite nibura imyaka 18 kandi ndemeza ko iyi introduction ishingiye ku mubano nyawo.",
    directSuccess: "Introduction yoherejwe kandi dossier yawe yakozwe. Creativa Poeta izagenzura amakuru mbere yo kwemeza ko umukiliya ari uwawe.",
    directError: "Introduction ntiyoherejwe.",
    emailOptional: "Email",
    phoneOptional: "Numero ya WhatsApp cyangwa telefone",
    preferredContact: "Ni ubuhe buryo ushaka ko tugukoresha tukuvugisha?",
    contactRequired: "Andika nibura email cyangwa numero ya WhatsApp/telefone.",
    clientType: "Ni nde ushaka kutumenyesha?",
    personOption: "Umuntu",
    companyOption: "Business",
    personName: "Amazina yose y’uwo muntu",
    companyName: "Izina rya business",
    companyContact: "Umuntu tuvugisha",
    clientEmailOptional: "Email",
    clientPhoneOptional: "Telefone cyangwa WhatsApp",
    clientContactRequired: "Tanga nibura uburyo bumwe bwo kuvugisha umukiliya: email cyangwa telefone/WhatsApp.",
    needOptional: "Sobanura ibyo bakeneye",
    strategicPhone: "Telefone",
    contactOptions: [{ value: "email", label: "Email" }, { value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Telefone" }, { value: "sms", label: "SMS" }, { value: "other", label: "Ubundi buryo" }],
    strategicButton: "Saba ko tuganira ku bufatanye",
    close: "Funga",
    dialogOk: "Ndabyumvise",
    successTitle: "Ubusabe bwakiriwe neza",
    errorTitle: "Ubusabe ntibwashoboye koherezwa",
    validationTitle: "Hari amakuru abura",
    alreadyRegisteredTitle: "Usanzwe wanditswe",
    alreadyRegisteredMessage: "Hari registration isanzwe ikoresha iyi email cyangwa numero ya telefone. Ntukeneye kongera kwiyandikisha. Niba waratakaje private link ukoresha utumenyesha abakiliya, saba ko tuyikoherereza indi.",
    requestAccess: "Saba private link yanjye",
    requestingAccess: "Ubusabe burimo koherezwa…",
    recoveryReceivedTitle: "Ubusabe bwa link bwakiriwe",
    recoveryReceivedMessage: "Creativa Poeta yakiriye ubusabe bwawe. Team izagenzura registration yawe maze ikoherereze private link nshya ikoresheje contact wandikishije.",
  },
};

export default referralProgramActionLocale;
