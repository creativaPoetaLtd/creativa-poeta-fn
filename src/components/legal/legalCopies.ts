export type LegalPageKind = "legal" | "terms" | "privacy";
export type LegalLocale = "fr" | "en" | "nl" | "kiny";

type LegalSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

type LegalPageCopy = {
  title: string;
  eyebrow: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export const legalCopies: Record<LegalLocale, Record<LegalPageKind, LegalPageCopy>> = {
  fr: {
    legal: {
      eyebrow: "Informations legales",
      title: "Mentions legales",
      intro: "Cette page presente les informations principales relatives au site Creativa Poeta, a son editeur et a ses moyens de contact.",
      updated: "Derniere mise a jour : 14 juillet 2026",
      sections: [
        {
          heading: "Editeur du site",
          body: [
            "Le site creativapoeta.com est edite par Creativa Poeta, service de creation digitale, visibilite moderne, design, contenu, outils digitaux, automatisation IA et assistance numerique.",
            "Contact principal : creativapoeta@gmail.com. Telephone : 0479 08 99 25."
          ]
        },
        {
          heading: "Responsable de publication",
          body: [
            "Le responsable de publication est le representant de Creativa Poeta. Pour toute question relative au site, au contenu publie ou a une demande de correction, vous pouvez nous contacter par email."
          ]
        },
        {
          heading: "Hebergement",
          body: [
            "Le frontend du site peut etre heberge par Netlify. Les services backend et formulaires peuvent etre heberges par Vercel ou par des prestataires techniques equivalents utilises par Creativa Poeta.",
            "Ces prestataires assurent l'infrastructure technique necessaire a l'affichage du site, a la securite, aux formulaires et aux fonctionnalites associees."
          ]
        },
        {
          heading: "Propriete intellectuelle",
          body: [
            "Les textes, visuels, images, logos, structures de pages, contenus de service, elements graphiques et tout autre element publie sur ce site appartiennent a Creativa Poeta ou sont utilises avec autorisation.",
            "Toute reproduction, adaptation, distribution ou reutilisation sans autorisation ecrite prealable est interdite."
          ]
        },
        {
          heading: "Liens externes",
          body: [
            "Le site peut contenir des liens vers des services externes, reseaux sociaux, outils tiers ou plateformes partenaires. Creativa Poeta n'est pas responsable du contenu, du fonctionnement ou des politiques de confidentialite de ces sites externes."
          ]
        },
        {
          heading: "Contact",
          body: [
            "Pour toute question concernant le site, une demande de correction, une reclamation ou une demande liee aux donnees personnelles, contactez-nous a : creativapoeta@gmail.com."
          ]
        }
      ]
    },
    terms: {
      eyebrow: "Conditions d'utilisation",
      title: "Conditions generales",
      intro: "Ces conditions encadrent l'utilisation du site Creativa Poeta et les demandes de services envoyees via nos formulaires.",
      updated: "Derniere mise a jour : 14 juillet 2026",
      sections: [
        {
          heading: "Objet",
          body: [
            "Creativa Poeta propose des services de presence locale, sites web, applications, outils digitaux, assistants IA, design graphique, contenu professionnel, documents et assistance numerique.",
            "Le site permet de consulter nos services, de demander un projet, de demander une assistance, de tester une visibilite et de nous contacter."
          ]
        },
        {
          heading: "Demandes et devis",
          body: [
            "L'envoi d'un formulaire ne constitue pas automatiquement une commande definitive. Il permet a Creativa Poeta d'analyser la demande et de recontacter l'utilisateur.",
            "Une mission commence uniquement apres validation claire des besoins, du budget, des delais et des conditions convenues entre les parties."
          ]
        },
        {
          heading: "Informations transmises par l'utilisateur",
          body: [
            "L'utilisateur s'engage a fournir des informations exactes, utiles et non trompeuses. Creativa Poeta ne peut pas etre responsable d'une mauvaise execution causee par des informations incompletes, fausses ou tardives.",
            "Les contenus, documents, images ou acces transmis par le client doivent lui appartenir ou etre utilises avec autorisation."
          ]
        },
        {
          heading: "Delais et livrables",
          body: [
            "Les delais sont indiques selon la complexite du projet et les informations disponibles. Ils peuvent evoluer si le perimetre change, si des validations sont retardees ou si des elements necessaires ne sont pas fournis a temps.",
            "Les livrables exacts sont definis dans l'accord de projet, le devis ou les messages de validation."
          ]
        },
        {
          heading: "Paiement",
          body: [
            "Selon le projet, un acompte peut etre demande avant le demarrage. Le solde est du selon les conditions convenues. Les retards de paiement peuvent suspendre le travail ou la livraison finale."
          ]
        },
        {
          heading: "Limites de garantie",
          body: [
            "Creativa Poeta s'engage a travailler avec soin, clarte et professionnalisme. Toutefois, aucun resultat commercial, positionnement Google, recommandation IA, volume de trafic ou nombre de clients ne peut etre garanti de maniere absolue.",
            "Nos services visent a ameliorer la clarte, la coherence, la structure et la visibilite, mais les resultats dependent aussi du marche, de la concurrence, du contenu fourni, de la reputation et de facteurs externes."
          ]
        },
        {
          heading: "Utilisation interdite du site",
          body: ["Il est interdit d'utiliser le site pour envoyer des contenus illicites, nuisibles, frauduleux, abusifs, automatises ou portant atteinte aux droits de tiers." ]
        },
        {
          heading: "Modification des conditions",
          body: ["Creativa Poeta peut adapter ces conditions lorsque ses services, outils ou obligations evoluent. La version publiee sur cette page est celle applicable au moment de la consultation." ]
        }
      ]
    },
    privacy: {
      eyebrow: "Donnees personnelles et cookies",
      title: "Confidentialite et cookies",
      intro: "Cette page explique quelles donnees peuvent etre collectees, pourquoi elles sont utilisees et comment vous pouvez gerer vos choix de cookies.",
      updated: "Derniere mise a jour : 14 juillet 2026",
      sections: [
        {
          heading: "Donnees collectees",
          body: ["Nous pouvons collecter les donnees que vous nous transmettez via les formulaires du site."],
          bullets: ["Nom et prenom", "Adresse email", "Telephone", "Entreprise ou activite", "Ville ou zone visee", "Message, besoin, service demande", "Informations techniques utiles a une demande d'assistance ou de visibilite"]
        },
        {
          heading: "Finalites",
          body: ["Ces donnees sont utilisees pour repondre a vos demandes, preparer un devis, analyser un besoin, assurer le suivi d'un projet, fournir une assistance numerique ou ameliorer nos services." ]
        },
        {
          heading: "Base legale",
          body: ["Selon le cas, le traitement repose sur votre consentement, l'execution de mesures precontractuelles, l'execution d'un contrat, notre interet legitime a repondre aux demandes, ou une obligation legale." ]
        },
        {
          heading: "Conservation",
          body: ["Les donnees sont conservees pendant la duree necessaire au traitement de la demande, au suivi commercial ou projet, puis archivees ou supprimees selon les obligations applicables et les besoins raisonnables de preuve." ]
        },
        {
          heading: "Partage avec des prestataires",
          body: ["Certaines donnees peuvent etre traitees par nos prestataires techniques : hebergement, formulaires, email, base de donnees, outils d'administration, securite, analyse ou services IA si une fonctionnalite le necessite." ]
        },
        {
          heading: "Cookies",
          body: ["Les cookies strictement necessaires permettent au site de fonctionner et de memoriser vos choix. Les cookies de preferences, d'analyse ou de marketing ne sont utilises que selon vos choix lorsque ces categories sont activees."],
          bullets: ["Necessaires : fonctionnement du site et sauvegarde du choix cookies", "Preferences : langue, confort d'utilisation ou reglages", "Analyse : statistiques anonymisees ou mesure d'audience", "Marketing : campagnes, remarketing ou contenus personnalises si actives"]
        },
        {
          heading: "Vos droits",
          body: ["Vous pouvez demander l'acces, la rectification, la suppression, la limitation ou l'opposition au traitement de vos donnees. Vous pouvez aussi retirer votre consentement lorsque le traitement repose sur celui-ci." ]
        },
        {
          heading: "Contact confidentialite",
          body: ["Pour toute demande concernant vos donnees ou vos cookies : creativapoeta@gmail.com." ]
        }
      ]
    }
  },
  en: {
    legal: {
      eyebrow: "Legal information",
      title: "Legal notice",
      intro: "This page provides the main information about the Creativa Poeta website, its publisher and contact channels.",
      updated: "Last updated: July 14, 2026",
      sections: [
        { heading: "Website publisher", body: ["creativapoeta.com is published by Creativa Poeta, a digital creation, modern visibility, design, content, digital tools, AI automation and digital assistance service.", "Main contact: creativapoeta@gmail.com. Phone: 0479 08 99 25."] },
        { heading: "Publication manager", body: ["The publication manager is the representative of Creativa Poeta. For questions about the website, published content or correction requests, contact us by email."] },
        { heading: "Hosting", body: ["The frontend may be hosted by Netlify. Backend services and forms may be hosted by Vercel or equivalent technical providers used by Creativa Poeta.", "These providers support website display, security, forms and related features."] },
        { heading: "Intellectual property", body: ["Texts, visuals, images, logos, page structures, service content, graphic elements and other published materials belong to Creativa Poeta or are used with permission.", "Any reproduction, adaptation, distribution or reuse without prior written permission is prohibited."] },
        { heading: "External links", body: ["The website may contain links to external services, social networks, third-party tools or partner platforms. Creativa Poeta is not responsible for their content, operation or privacy policies."] },
        { heading: "Contact", body: ["For website questions, correction requests, complaints or personal data requests, contact: creativapoeta@gmail.com."] }
      ]
    },
    terms: {
      eyebrow: "Terms of use",
      title: "Terms and conditions",
      intro: "These terms govern the use of the Creativa Poeta website and service requests submitted through our forms.",
      updated: "Last updated: July 14, 2026",
      sections: [
        { heading: "Purpose", body: ["Creativa Poeta provides local presence, websites, apps, digital tools, AI assistants, graphic design, professional content, documents and digital assistance services.", "The website lets users discover services, start a project, request assistance, test visibility and contact us."] },
        { heading: "Requests and quotes", body: ["Submitting a form does not automatically create a final order. It allows Creativa Poeta to review the request and contact the user.", "A mission starts only after clear validation of needs, budget, timelines and agreed conditions."] },
        { heading: "Information provided by users", body: ["Users must provide accurate, useful and non-misleading information. Creativa Poeta is not responsible for poor execution caused by incomplete, false or late information.", "Content, documents, images or access credentials provided by the client must belong to the client or be used with permission."] },
        { heading: "Timelines and deliverables", body: ["Timelines depend on project complexity and available information. They may change if the scope changes, validations are delayed or required materials are not provided on time.", "Exact deliverables are defined in the project agreement, quote or validation messages."] },
        { heading: "Payment", body: ["Depending on the project, a deposit may be requested before work begins. The balance is due under the agreed conditions. Late payment may suspend work or final delivery."] },
        { heading: "Limits of guarantee", body: ["Creativa Poeta works carefully and professionally. However, no commercial result, Google ranking, AI recommendation, traffic volume or number of clients can be absolutely guaranteed.", "Our services improve clarity, consistency, structure and visibility, but results also depend on market conditions, competition, content, reputation and external factors."] },
        { heading: "Prohibited use", body: ["The website must not be used to submit illegal, harmful, fraudulent, abusive, automated or third-party-infringing content."] },
        { heading: "Changes", body: ["Creativa Poeta may update these terms as services, tools or obligations evolve. The published version is the applicable version at the time of consultation."] }
      ]
    },
    privacy: {
      eyebrow: "Personal data and cookies",
      title: "Privacy and cookies",
      intro: "This page explains what data may be collected, why it is used and how you can manage cookie choices.",
      updated: "Last updated: July 14, 2026",
      sections: [
        { heading: "Data collected", body: ["We may collect the data you submit through website forms."], bullets: ["Name", "Email address", "Phone number", "Company or activity", "City or target area", "Message, need or requested service", "Technical information needed for assistance or visibility requests"] },
        { heading: "Purposes", body: ["Data is used to answer requests, prepare quotes, analyze needs, follow projects, provide digital assistance or improve our services."] },
        { heading: "Legal basis", body: ["Depending on the situation, processing may rely on consent, pre-contractual steps, contract performance, legitimate interest in responding to requests, or legal obligations."] },
        { heading: "Retention", body: ["Data is kept for the time needed to process the request and project follow-up, then archived or deleted according to applicable obligations and reasonable evidence needs."] },
        { heading: "Service providers", body: ["Some data may be processed by technical providers: hosting, forms, email, database, administration tools, security, analytics or AI services when required by a feature."] },
        { heading: "Cookies", body: ["Strictly necessary cookies make the website work and store your choices. Preference, analytics or marketing cookies are used only according to your choices when enabled."], bullets: ["Necessary: website operation and cookie choice storage", "Preferences: language or comfort settings", "Analytics: audience measurement", "Marketing: campaigns, remarketing or personalized content if enabled"] },
        { heading: "Your rights", body: ["You may request access, correction, deletion, restriction or objection to the processing of your data. You may also withdraw consent when processing is based on consent."] },
        { heading: "Privacy contact", body: ["For data or cookie requests: creativapoeta@gmail.com."] }
      ]
    }
  },
  nl: {
    legal: {
      eyebrow: "Juridische informatie",
      title: "Juridische vermeldingen",
      intro: "Deze pagina geeft de belangrijkste informatie over de website van Creativa Poeta, de uitgever en de contactkanalen.",
      updated: "Laatst bijgewerkt: 14 juli 2026",
      sections: [
        { heading: "Uitgever van de website", body: ["creativapoeta.com wordt uitgegeven door Creativa Poeta, een dienst voor digitale creatie, moderne zichtbaarheid, design, content, digitale tools, AI-automatisering en digitale hulp.", "Hoofdcontact: creativapoeta@gmail.com. Telefoon: 0479 08 99 25."] },
        { heading: "Verantwoordelijke publicatie", body: ["De publicatieverantwoordelijke is de vertegenwoordiger van Creativa Poeta. Voor vragen over de website, gepubliceerde inhoud of correcties kunt u ons per e-mail contacteren."] },
        { heading: "Hosting", body: ["De frontend kan worden gehost door Netlify. Backenddiensten en formulieren kunnen worden gehost door Vercel of gelijkwaardige technische leveranciers die Creativa Poeta gebruikt.", "Deze leveranciers ondersteunen weergave, veiligheid, formulieren en bijhorende functies."] },
        { heading: "Intellectuele eigendom", body: ["Teksten, visuals, beelden, logo's, paginaregels, service-inhoud, grafische elementen en andere gepubliceerde materialen behoren toe aan Creativa Poeta of worden met toestemming gebruikt.", "Reproductie, aanpassing, distributie of hergebruik zonder voorafgaande schriftelijke toestemming is verboden."] },
        { heading: "Externe links", body: ["De website kan links bevatten naar externe diensten, sociale netwerken, tools of partnerplatformen. Creativa Poeta is niet verantwoordelijk voor hun inhoud, werking of privacybeleid."] },
        { heading: "Contact", body: ["Voor vragen over de website, correcties, klachten of persoonsgegevens: creativapoeta@gmail.com."] }
      ]
    },
    terms: {
      eyebrow: "Gebruiksvoorwaarden",
      title: "Algemene voorwaarden",
      intro: "Deze voorwaarden regelen het gebruik van de website van Creativa Poeta en aanvragen die via onze formulieren worden verzonden.",
      updated: "Laatst bijgewerkt: 14 juli 2026",
      sections: [
        { heading: "Doel", body: ["Creativa Poeta biedt diensten rond lokale aanwezigheid, websites, apps, digitale tools, AI-assistenten, grafisch ontwerp, professionele content, documenten en digitale hulp.", "Via de website kunnen gebruikers diensten bekijken, een project starten, hulp aanvragen, zichtbaarheid testen en contact opnemen."] },
        { heading: "Aanvragen en offertes", body: ["Een formulier verzenden vormt niet automatisch een definitieve bestelling. Het laat Creativa Poeta toe de vraag te analyseren en de gebruiker te contacteren.", "Een opdracht start pas na duidelijke validatie van behoeften, budget, timing en afgesproken voorwaarden."] },
        { heading: "Informatie van gebruikers", body: ["Gebruikers moeten correcte, nuttige en niet-misleidende informatie bezorgen. Creativa Poeta is niet verantwoordelijk voor problemen veroorzaakt door onvolledige, foutieve of late informatie.", "Content, documenten, beelden of toegangen die de klant bezorgt, moeten eigendom zijn van de klant of met toestemming worden gebruikt."] },
        { heading: "Termijnen en opleveringen", body: ["Termijnen hangen af van de complexiteit van het project en beschikbare informatie. Ze kunnen wijzigen bij scopewijzigingen, vertraagde goedkeuringen of ontbrekend materiaal.", "Exacte opleveringen worden bepaald in de projectafspraak, offerte of validatieberichten."] },
        { heading: "Betaling", body: ["Afhankelijk van het project kan een voorschot worden gevraagd. Het saldo is verschuldigd volgens de afgesproken voorwaarden. Laattijdige betaling kan werk of finale oplevering pauzeren."] },
        { heading: "Beperkingen van garantie", body: ["Creativa Poeta werkt zorgvuldig en professioneel. Toch kan geen commercieel resultaat, Google-positie, AI-aanbeveling, bezoekersvolume of aantal klanten absoluut worden gegarandeerd.", "Onze diensten verbeteren duidelijkheid, consistentie, structuur en zichtbaarheid, maar resultaten hangen ook af van markt, concurrentie, content, reputatie en externe factoren."] },
        { heading: "Verboden gebruik", body: ["De website mag niet worden gebruikt voor illegale, schadelijke, frauduleuze, beledigende, geautomatiseerde of rechten-schendende inhoud."] },
        { heading: "Wijzigingen", body: ["Creativa Poeta kan deze voorwaarden aanpassen wanneer diensten, tools of verplichtingen evolueren. De gepubliceerde versie is van toepassing op het moment van raadpleging."] }
      ]
    },
    privacy: {
      eyebrow: "Persoonsgegevens en cookies",
      title: "Privacy en cookies",
      intro: "Deze pagina legt uit welke gegevens kunnen worden verzameld, waarom ze worden gebruikt en hoe u cookies beheert.",
      updated: "Laatst bijgewerkt: 14 juli 2026",
      sections: [
        { heading: "Verzamelde gegevens", body: ["Wij kunnen gegevens verzamelen die u via formulieren verzendt."], bullets: ["Naam", "E-mailadres", "Telefoonnummer", "Bedrijf of activiteit", "Stad of doelgebied", "Bericht, behoefte of gevraagde dienst", "Technische informatie voor hulp- of zichtbaarheidsvragen"] },
        { heading: "Doeleinden", body: ["Gegevens worden gebruikt om aanvragen te beantwoorden, offertes op te stellen, behoeften te analyseren, projecten op te volgen, digitale hulp te bieden of onze diensten te verbeteren."] },
        { heading: "Rechtsgrond", body: ["Afhankelijk van de situatie steunt verwerking op toestemming, precontractuele stappen, uitvoering van een overeenkomst, gerechtvaardigd belang om te antwoorden of wettelijke verplichtingen."] },
        { heading: "Bewaring", body: ["Gegevens worden bewaard zolang nodig voor behandeling, opvolging en redelijke bewijsnoden, daarna gearchiveerd of verwijderd volgens toepasselijke verplichtingen."] },
        { heading: "Dienstverleners", body: ["Sommige gegevens kunnen worden verwerkt door technische leveranciers: hosting, formulieren, e-mail, database, administratie, veiligheid, analyse of AI-diensten wanneer een functie dat vereist."] },
        { heading: "Cookies", body: ["Noodzakelijke cookies laten de website werken en bewaren uw keuzes. Voorkeuren-, analyse- of marketingcookies worden alleen gebruikt volgens uw keuzes."], bullets: ["Noodzakelijk: werking van de site en bewaren van cookie-keuze", "Voorkeuren: taal of comfortinstellingen", "Analyse: publieksmeting", "Marketing: campagnes of gepersonaliseerde inhoud indien actief"] },
        { heading: "Uw rechten", body: ["U kunt toegang, correctie, verwijdering, beperking of bezwaar vragen. U kunt toestemming intrekken wanneer verwerking daarop steunt."] },
        { heading: "Privacycontact", body: ["Voor gegevens- of cookievragen: creativapoeta@gmail.com."] }
      ]
    }
  },
  kiny: {
    legal: {
      eyebrow: "Amakuru yemewe",
      title: "Amakuru yemewe n'amategeko",
      intro: "Iyi page isobanura amakuru y'ibanze yerekeye urubuga rwa Creativa Poeta, uwurukora n'uko mwatwandikira.",
      updated: "Byavuguruwe: 14 Nyakanga 2026",
      sections: [
        { heading: "Ushinzwe urubuga", body: ["creativapoeta.com ikoreshwa na Creativa Poeta, service ikora creation digitale, visibility, design, content, tools, AI automation na assistance numerique.", "Contact: creativapoeta@gmail.com. Telephone: 0479 08 99 25."] },
        { heading: "Ushinzwe publication", body: ["Ushinzwe publication ni representant wa Creativa Poeta. Ku bibazo byerekeye site cyangwa gukosora content, twandikire kuri email."] },
        { heading: "Hosting", body: ["Frontend ishobora kuba kuri Netlify. Backend na forms bishobora kuba kuri Vercel cyangwa abandi providers ba technical dukoresha."] },
        { heading: "Intellectual property", body: ["Texts, visuals, images, logos, page structures na content biri kuri site ni ibya Creativa Poeta cyangwa bikoreshwa dufite permission.", "Kubikoresha utabanje kubona uruhushya rwanditse ntibyemewe."] },
        { heading: "External links", body: ["Site ishobora kugira links zijya kuri services zo hanze. Creativa Poeta ntabwo ishinzwe content cyangwa privacy policies z'izo sites."] },
        { heading: "Contact", body: ["Ku bibazo byerekeye site cyangwa personal data: creativapoeta@gmail.com."] }
      ]
    },
    terms: {
      eyebrow: "Amategeko yo gukoresha",
      title: "Amategeko n'amabwiriza",
      intro: "Aya mategeko agenga uko site ya Creativa Poeta ikoreshwa n'uko demandes zoherezwa kuri forms zacu.",
      updated: "Byavuguruwe: 14 Nyakanga 2026",
      sections: [
        { heading: "Intego", body: ["Creativa Poeta itanga services za local presence, websites, apps, digital tools, AI assistants, graphic design, professional content, documents na digital assistance."] },
        { heading: "Demandes na devis", body: ["Kohereza form ntibivuze ko order yatangiye. Bituma dusuzuma demande tukakugarukira.", "Project itangira nyuma yo kwemeza needs, budget, deadlines na conditions."] },
        { heading: "Amakuru user atanga", body: ["User agomba gutanga amakuru y'ukuri kandi yuzuye. Creativa Poeta ntishinzwe ibibazo biva ku makuru atuzuye cyangwa atariyo."] },
        { heading: "Deadlines na deliverables", body: ["Deadlines ziterwa na complexity ya project n'ibikoresho byatanzwe. Zishobora guhinduka iyo scope ihindutse cyangwa validations zitinze."] },
        { heading: "Payment", body: ["Hashobora gusabwa advance mbere yo gutangira. Payment itinze ishobora guhagarika work cyangwa delivery."] },
        { heading: "Limits", body: ["Dukora neza kandi professionally, ariko nta guarantee absolute ya ranking kuri Google, recommendation ya AI, traffic cyangwa clients dushobora gutanga."] },
        { heading: "Gukoresha nabi site", body: ["Ntibyemewe kohereza ibintu illegal, harmful, fraudulent, abusive cyangwa bibangamira rights z'abandi."] },
        { heading: "Impinduka", body: ["Creativa Poeta ishobora guhindura aya mategeko uko services cyangwa obligations bihinduka."] }
      ]
    },
    privacy: {
      eyebrow: "Personal data na cookies",
      title: "Privacy na cookies",
      intro: "Iyi page isobanura data dushobora kwakira, impamvu tuyikoresha n'uko wahitamo cookies.",
      updated: "Byavuguruwe: 14 Nyakanga 2026",
      sections: [
        { heading: "Data dukusanya", body: ["Dushobora kwakira data wohereza ukoresheje forms."], bullets: ["Izina", "Email", "Telephone", "Company cyangwa activity", "City cyangwa zone", "Message cyangwa service usaba", "Technical information ikenewe kuri assistance cyangwa visibility"] },
        { heading: "Impamvu", body: ["Data ikoreshwa gusubiza demandes, gutegura quote, gukurikirana project, gutanga assistance cyangwa kunoza services."] },
        { heading: "Legal basis", body: ["Biterwa na case: consent, contract, steps before contract, legitimate interest cyangwa legal obligation."] },
        { heading: "Kubika data", body: ["Data ibikwa igihe gikenewe kugira ngo demande ikurikiranwe, hanyuma igasibwa cyangwa ikabikwa nk'archive hakurikijwe obligations."] },
        { heading: "Providers", body: ["Data zimwe zishobora kunyuzwa kuri technical providers: hosting, forms, email, database, admin tools, security, analytics cyangwa AI services."] },
        { heading: "Cookies", body: ["Necessary cookies zituma site ikora kandi zikabika choices. Preferences, analytics na marketing cookies zikoreshwa gusa niba ubyemeye."], bullets: ["Necessary: site operation", "Preferences: language/settings", "Analytics: audience measurement", "Marketing: campaigns or personalized content"] },
        { heading: "Rights", body: ["Ushobora gusaba access, correction, deletion cyangwa withdrawal of consent aho bikenewe."] },
        { heading: "Contact", body: ["Ku bibazo bya data cyangwa cookies: creativapoeta@gmail.com."] }
      ]
    }
  }
};
