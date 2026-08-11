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
  contactOptions: Array<{ value: "email" | "whatsapp" | "phone" | "sms" | "other"; label: string }>;
  strategicButton: string;
  close: string;
};

const referralProgramActionLocale: Record<"fr" | "en" | "nl" | "kiny", ReferralProgramActionCopy> = {
  fr: {
    directTitle: "Vous avez déjà un client à nous présenter ?",
    directLead: "Vous pouvez faire votre première présentation sans attendre votre inscription. Nous enregistrerons vos informations avec celles du client et créerons automatiquement votre dossier dans le programme.",
    directButton: "Présenter ce client",
    directFormTitle: "Présenter un client à Creativa Poeta",
    identityTitle: "Vos informations",
    clientTitle: "Informations sur le client présenté",
    directTerms: "J’accepte les conditions du programme, je confirme avoir au moins 18 ans et je certifie que cette présentation repose sur un lien réel.",
    directSuccess: "La présentation a été envoyée et votre dossier d’apporteur a été créé. Creativa Poeta vérifiera les informations avant de confirmer l’attribution.",
    directError: "Impossible d’envoyer cette présentation.",
    emailOptional: "E-mail (facultatif si vous indiquez WhatsApp ou téléphone)",
    phoneOptional: "Numéro WhatsApp ou téléphone (facultatif si vous indiquez un e-mail)",
    preferredContact: "Comment préférez-vous être contacté ?",
    contactRequired: "Indiquez au moins une adresse e-mail ou un numéro WhatsApp/téléphone.",
    contactOptions: [{ value: "email", label: "E-mail" }, { value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Appel téléphonique" }, { value: "sms", label: "SMS" }, { value: "other", label: "Autre" }],
    strategicButton: "Proposer une collaboration",
    close: "Fermer",
  },
  en: {
    directTitle: "Already have a client to introduce?",
    directLead: "You can make your first introduction before registering. We will save your details with the client information and automatically create your program record.",
    directButton: "Introduce this client",
    directFormTitle: "Introduce a client to Creativa Poeta",
    identityTitle: "Your information",
    clientTitle: "Information about the client",
    directTerms: "I accept the program terms, confirm that I am at least 18 and certify that this introduction is based on a genuine connection.",
    directSuccess: "The introduction was sent and your program record was created. Creativa Poeta will verify the information before confirming attribution.",
    directError: "Could not send this introduction.",
    emailOptional: "Email (optional if you provide WhatsApp or phone)",
    phoneOptional: "WhatsApp or phone number (optional if you provide email)",
    preferredContact: "How would you prefer to be contacted?",
    contactRequired: "Provide at least an email address or a WhatsApp/phone number.",
    contactOptions: [{ value: "email", label: "Email" }, { value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Phone call" }, { value: "sms", label: "SMS" }, { value: "other", label: "Other" }],
    strategicButton: "Propose a collaboration",
    close: "Close",
  },
  nl: {
    directTitle: "Hebt u al een klant om voor te stellen?",
    directLead: "U kunt uw eerste introductie doen zonder voorafgaande registratie. We bewaren uw gegevens samen met die van de klant en maken automatisch uw programmadossier aan.",
    directButton: "Deze klant voorstellen",
    directFormTitle: "Een klant voorstellen aan Creativa Poeta",
    identityTitle: "Uw informatie",
    clientTitle: "Informatie over de voorgestelde klant",
    directTerms: "Ik aanvaard de programmavoorwaarden, bevestig dat ik minstens 18 jaar ben en verklaar dat deze introductie op een echte band berust.",
    directSuccess: "De introductie is verzonden en uw programmadossier is aangemaakt. Creativa Poeta controleert de informatie voordat de toewijzing wordt bevestigd.",
    directError: "Deze introductie kon niet worden verzonden.",
    emailOptional: "E-mail (optioneel als u WhatsApp of telefoon opgeeft)",
    phoneOptional: "WhatsApp- of telefoonnummer (optioneel als u e-mail opgeeft)",
    preferredContact: "Hoe wilt u het liefst gecontacteerd worden?",
    contactRequired: "Vul minstens een e-mailadres of WhatsApp-/telefoonnummer in.",
    contactOptions: [{ value: "email", label: "E-mail" }, { value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Telefoongesprek" }, { value: "sms", label: "SMS" }, { value: "other", label: "Andere" }],
    strategicButton: "Een samenwerking voorstellen",
    close: "Sluiten",
  },
  kiny: {
    directTitle: "Hari umukiliya usanzwe ushaka kutumenyesha?",
    directLead: "Ushobora kutwoherereza umukiliya wa mbere utarabanje kwiyandikisha. Tuzabika amakuru yawe n’ay’umukiliya kandi tugukorere dossier ya porogaramu ako kanya.",
    directButton: "Menyekanisha uyu mukiliya",
    directFormTitle: "Menyekanisha umukiliya kuri Creativa Poeta",
    identityTitle: "Amakuru yawe",
    clientTitle: "Amakuru y’umukiliya",
    directTerms: "Nemeye amategeko ya porogaramu, mfite nibura imyaka 18 kandi ndemeza ko iyi introduction ishingiye ku mubano nyawo.",
    directSuccess: "Introduction yoherejwe kandi dossier yawe yakozwe. Creativa Poeta izagenzura amakuru mbere yo kwemeza ko umukiliya ari uwawe.",
    directError: "Introduction ntiyoherejwe.",
    emailOptional: "Email (si ngombwa niba watanze WhatsApp cyangwa telefone)",
    phoneOptional: "Numero ya WhatsApp cyangwa telefone (si ngombwa niba watanze email)",
    preferredContact: "Ni ubuhe buryo ushaka ko tugukoresha tukuvugisha?",
    contactRequired: "Andika nibura email cyangwa numero ya WhatsApp/telefone.",
    contactOptions: [{ value: "email", label: "Email" }, { value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Telefone" }, { value: "sms", label: "SMS" }, { value: "other", label: "Ubundi buryo" }],
    strategicButton: "Saba ko tuganira ku bufatanye",
    close: "Funga",
  },
};

export default referralProgramActionLocale;
