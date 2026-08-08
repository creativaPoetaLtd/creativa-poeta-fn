import { FormEvent, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaBrain,
  FaBuilding,
  FaBullhorn,
  FaCheckCircle,
  FaCode,
  FaHandshake,
  FaIndustry,
  FaLaptopCode,
  FaPaperPlane,
  FaRegClock,
  FaRocket,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { submitPartnershipRequest } from "../APIs/PartnershipRequests";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { seoConfig } from "../components/SEO/seoConfig";
import PageLayout from "../components/layout/PageLayout";
import { getCurrentLocale } from "../data/marketRuntime";

type LocaleCopy = {
  heroKicker: string;
  heroTitle: string;
  heroLead: string;
  heroLine: string;
  heroCta: string;
  whyTitle: string;
  whyLead: string;
  strengths: string[];
  workTitle: string;
  workCards: { title: string; lead: string; text: string }[];
  processTitle: string;
  process: string[];
  pilotTitle: string;
  pilotLead: string;
  pilotPoints: string[];
  satisfactionTitle: string;
  satisfactionLines: string[];
  industriesTitle: string;
  industries: string[];
  finalTitle: string;
  finalLead: string;
  finalCta: string;
  formTitle: string;
  formLead: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  submit: string;
  success: string;
  error: string;
  required: string;
  typeOptions: string[];
};

const copyByLocale: Record<string, LocaleCopy> = {
  fr: {
    heroKicker: "Partenariat",
    heroTitle: "Devenez notre partenaire de livraison digitale.",
    heroLead: "Étendez votre capacité sans agrandir votre équipe.",
    heroLine: "De l'idée à la livraison. Un partenaire fiable.",
    heroCta: "Parlons-en",
    whyTitle: "Pourquoi travailler avec Creativa Poeta ?",
    whyLead:
      "Nous aidons les agences, éditeurs et entreprises à livrer plus vite grâce à une équipe flexible en développement, design, IA et visibilité moderne.",
    strengths: [
      "Livraison fiable",
      "Communication rapide",
      "Productivité assistée par l'IA",
      "Capacité flexible",
      "Partenariat long terme",
      "Tranquillité d'esprit",
    ],
    workTitle: "Comment nous travaillons",
    workCards: [
      {
        title: "White label",
        lead: "Vous vendez.",
        text: "Nous livrons discrètement derrière votre marque, avec rigueur et respect de votre relation client.",
      },
      {
        title: "Équipe dédiée",
        lead: "Besoin de capacité ?",
        text: "Nous devenons une extension de votre équipe pour absorber les pics de charge sans recrutement immédiat.",
      },
      {
        title: "Livraison projet",
        lead: "Un projet précis ?",
        text: "Nous prenons en charge une partie ou l'ensemble de la production, du cadrage aux livrables.",
      },
    ],
    processTitle: "Un processus simple",
    process: ["Appel découverte", "Proposition", "Livraison", "Revue", "Partenariat long terme"],
    pilotTitle: "Projet pilote",
    pilotLead: "Pas encore convaincu ? Commencez par un petit projet.",
    pilotPoints: ["Risque limité", "Aucun engagement long terme", "Évaluez notre travail"],
    satisfactionTitle: "Satisfaction d'abord",
    satisfactionLines: ["Si vous n'êtes pas satisfait,", "nous corrigeons.", "Sans coût supplémentaire."],
    industriesTitle: "Entreprises que nous accompagnons",
    industries: [
      "Éditeurs logiciels",
      "Agences web",
      "Agences marketing",
      "Partenaires Microsoft",
      "Entreprises IA",
      "Startups",
      "Cabinets de conseil",
      "PME",
    ],
    finalTitle: "Prêt à augmenter votre capacité de livraison ?",
    finalLead: "Vous vous concentrez sur vos clients. Nous prenons soin de la livraison.",
    finalCta: "Planifier un appel",
    formTitle: "Proposer un partenariat",
    formLead: "Expliquez-nous votre besoin, votre contexte et le type de collaboration envisagé.",
    name: "Nom",
    company: "Entreprise",
    email: "E-mail",
    phone: "Téléphone",
    type: "Type de partenariat",
    message: "Message",
    submit: "Envoyer la proposition",
    success: "Votre demande de partenariat a été envoyée.",
    error: "Impossible d'envoyer la demande. Réessayez.",
    required: "Champ obligatoire",
    typeOptions: ["White label", "Équipe dédiée", "Projet ponctuel", "Partenariat long terme", "Autre"],
  },
  en: {
    heroKicker: "Partnership",
    heroTitle: "Become our digital delivery partner.",
    heroLead: "Extend your delivery capacity without growing your team.",
    heroLine: "From idea to delivery. One trusted partner.",
    heroCta: "Let's talk",
    whyTitle: "Why partner with Creativa Poeta?",
    whyLead:
      "We help agencies, software teams and companies deliver more with flexible support in development, design, AI and modern visibility.",
    strengths: [
      "Reliable delivery",
      "Fast communication",
      "AI-powered productivity",
      "Flexible capacity",
      "Long-term partnership",
      "Peace of mind",
    ],
    workTitle: "How we work",
    workCards: [
      {
        title: "White label",
        lead: "You sell.",
        text: "We deliver quietly behind your brand, with discipline and respect for your client relationship.",
      },
      {
        title: "Dedicated team",
        lead: "Need extra capacity?",
        text: "We become an extension of your team so you can absorb workload peaks without hiring immediately.",
      },
      {
        title: "Project delivery",
        lead: "Need help on one project?",
        text: "We handle part or all of the production, from scope to final delivery.",
      },
    ],
    processTitle: "A simple process",
    process: ["Discovery call", "Proposal", "Delivery", "Review", "Long-term partnership"],
    pilotTitle: "Pilot project",
    pilotLead: "Not convinced yet? Start with a small project.",
    pilotPoints: ["Low risk", "No long-term commitment", "Evaluate our work"],
    satisfactionTitle: "Satisfaction first",
    satisfactionLines: ["If you're not satisfied,", "we'll fix it.", "No additional cost."],
    industriesTitle: "Industries we support",
    industries: [
      "Software companies",
      "Web agencies",
      "Marketing agencies",
      "Microsoft partners",
      "AI companies",
      "Startups",
      "Consultancies",
      "SMEs",
    ],
    finalTitle: "Ready to scale your delivery?",
    finalLead: "You focus on your clients. We take care of the delivery.",
    finalCta: "Schedule a call",
    formTitle: "Propose a partnership",
    formLead: "Tell us what you need, your context and the kind of collaboration you have in mind.",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    type: "Partnership type",
    message: "Message",
    submit: "Send proposal",
    success: "Your partnership request has been sent.",
    error: "Could not send the request. Please try again.",
    required: "Required field",
    typeOptions: ["White label", "Dedicated team", "One project", "Long-term partnership", "Other"],
  },
  nl: {
    heroKicker: "Partnerschap",
    heroTitle: "Word onze digitale deliverypartner.",
    heroLead: "Vergroot uw leveringscapaciteit zonder uw team uit te breiden.",
    heroLine: "Van idee tot oplevering. Eén betrouwbare partner.",
    heroCta: "Laten we praten",
    whyTitle: "Waarom samenwerken met Creativa Poeta?",
    whyLead:
      "We helpen bureaus, softwareteams en bedrijven sneller te leveren met flexibele ondersteuning in ontwikkeling, design, AI en moderne zichtbaarheid.",
    strengths: [
      "Betrouwbare levering",
      "Snelle communicatie",
      "AI-gestuurde productiviteit",
      "Flexibele capaciteit",
      "Langetermijnpartnerschap",
      "Gemoedsrust",
    ],
    workTitle: "Hoe we werken",
    workCards: [
      {
        title: "White label",
        lead: "U verkoopt.",
        text: "Wij leveren discreet achter uw merk, met discipline en respect voor uw klantrelatie.",
      },
      {
        title: "Toegewijd team",
        lead: "Extra capaciteit nodig?",
        text: "Wij worden een verlengstuk van uw team zodat u piekdrukte opvangt zonder direct aan te werven.",
      },
      {
        title: "Projectlevering",
        lead: "Hulp nodig bij één project?",
        text: "Wij nemen een deel of de volledige productie op, van scope tot oplevering.",
      },
    ],
    processTitle: "Een eenvoudig proces",
    process: ["Kennismakingsgesprek", "Voorstel", "Oplevering", "Review", "Langetermijnpartnerschap"],
    pilotTitle: "Pilotproject",
    pilotLead: "Nog niet overtuigd? Start met een klein project.",
    pilotPoints: ["Laag risico", "Geen langdurige verplichting", "Beoordeel ons werk"],
    satisfactionTitle: "Tevredenheid eerst",
    satisfactionLines: ["Bent u niet tevreden,", "dan verbeteren we het.", "Zonder extra kosten."],
    industriesTitle: "Sectoren die we ondersteunen",
    industries: [
      "Softwarebedrijven",
      "Webbureaus",
      "Marketingbureaus",
      "Microsoft-partners",
      "AI-bedrijven",
      "Startups",
      "Consultants",
      "KMO's",
    ],
    finalTitle: "Klaar om uw delivery op te schalen?",
    finalLead: "U focust op uw klanten. Wij zorgen voor de oplevering.",
    finalCta: "Plan een gesprek",
    formTitle: "Stel een partnerschap voor",
    formLead: "Vertel ons wat u nodig hebt, uw context en welke samenwerking u voor ogen hebt.",
    name: "Naam",
    company: "Bedrijf",
    email: "E-mail",
    phone: "Telefoon",
    type: "Type partnerschap",
    message: "Bericht",
    submit: "Voorstel verzenden",
    success: "Uw partnerschapsaanvraag is verzonden.",
    error: "De aanvraag kon niet worden verzonden. Probeer opnieuw.",
    required: "Verplicht veld",
    typeOptions: ["White label", "Toegewijd team", "Eén project", "Langetermijnpartnerschap", "Andere"],
  },
  kiny: {
    heroKicker: "Partnership",
    heroTitle: "Dukorane mu gutanga ibisubizo bya digital.",
    heroLead: "Ongera ubushobozi bwo gutanga serivisi utarinze kongera ikipe.",
    heroLine: "Kuva ku gitekerezo kugeza ku musaruro. Umufatanyabikorwa wizewe.",
    heroCta: "Tuvugane",
    whyTitle: "Kuki wakorana na Creativa Poeta?",
    whyLead:
      "Dufasha agencies, software teams na companies gutanga byinshi dukoresheje development, design, AI na modern visibility.",
    strengths: [
      "Delivery yizewe",
      "Communication yihuse",
      "Productivity ifashijwe na AI",
      "Capacity ihinduka",
      "Partnership irambye",
      "Amahoro mu kazi",
    ],
    workTitle: "Uko dukora",
    workCards: [
      {
        title: "White label",
        lead: "Mugurisha.",
        text: "Tugatanga umusaruro inyuma ya brand yanyu, mu buryo busukuye kandi bwizewe.",
      },
      {
        title: "Dedicated team",
        lead: "Mukeneye capacity?",
        text: "Tuba igice cy'ikipe yanyu kugira ngo mubashe kwakira projects nyinshi.",
      },
      {
        title: "Project delivery",
        lead: "Mukeneye help kuri project imwe?",
        text: "Dufata igice cyangwa project yose, kuva kuri scope kugeza kuri delivery.",
      },
    ],
    processTitle: "Process yoroshye",
    process: ["Discovery call", "Proposal", "Delivery", "Review", "Long-term partnership"],
    pilotTitle: "Pilot project",
    pilotLead: "Niba mutarizera neza, dutangirire kuri project nto.",
    pilotPoints: ["Risk nkeya", "Nta long-term commitment", "Mureba quality y'akazi"],
    satisfactionTitle: "Satisfaction first",
    satisfactionLines: ["Niba mutanyuzwe,", "tubikosora.", "Nta kindi kiguzi."],
    industriesTitle: "Abo dufasha",
    industries: [
      "Software companies",
      "Web agencies",
      "Marketing agencies",
      "Microsoft partners",
      "AI companies",
      "Startups",
      "Consultancies",
      "SMEs",
    ],
    finalTitle: "Mwiteguye kongera delivery capacity?",
    finalLead: "Mwitondere clients zanyu. Twe twita kuri delivery.",
    finalCta: "Schedule a call",
    formTitle: "Saba partnership",
    formLead: "Tubwire ibyo mukeneye, context yanyu n'uburyo mushaka ko dukorana.",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    type: "Partnership type",
    message: "Message",
    submit: "Send proposal",
    success: "Partnership request yoherejwe.",
    error: "Request ntiyoherejwe. Gerageza nanone.",
    required: "Required field",
    typeOptions: ["White label", "Dedicated team", "One project", "Long-term partnership", "Other"],
  },
};

const strengthIcons = [FaCheckCircle, FaRegClock, FaBrain, FaRocket, FaHandshake, FaShieldAlt];
const industryIcons = [FaLaptopCode, FaCode, FaBullhorn, FaBuilding, FaBrain, FaRocket, FaUsers, FaIndustry];

const PartnershipPage = () => {
  const locale = getCurrentLocale();
  const copy = copyByLocale[locale] ?? copyByLocale.fr;
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    type: copy.typeOptions[0],
    message: "",
  });
  const [sending, setSending] = useState(false);

  const pageTitle = useMemo(() => copy.heroTitle.replace(".", ""), [copy.heroTitle]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(copy.required);
      return;
    }

    setSending(true);
    try {
      await submitPartnershipRequest({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        partnershipType: form.type,
        locale,
        message: form.message,
      });
      toast.success(copy.success);
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        type: copy.typeOptions[0],
        message: "",
      });
    } catch {
      toast.error(copy.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <PageLayout className="text-white">
      <MarketSEOHead {...seoConfig.partnership} path="/partnership" />

      <main className="min-h-screen w-full overflow-hidden bg-[linear-gradient(180deg,rgba(5,12,22,0.38)_0%,rgba(5,12,22,0.68)_55%,rgba(5,12,22,0.78)_100%)] pt-24 sm:pt-28">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-6 pt-3 sm:gap-8 sm:pt-8 md:px-8 lg:min-h-[72vh] lg:flex-row lg:items-center lg:pb-12">
          <div className="flex-1">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffee00] sm:mb-4 sm:gap-3 sm:text-sm">
              <span className="h-3 w-7 skew-x-[-15deg] bg-[#EEBA2B] sm:h-4 sm:w-10" />
              {copy.heroKicker}
            </div>
            <h1 className="max-w-4xl text-[2.35rem] font-black leading-[0.96] tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {pageTitle}
            </h1>
            <p className="mt-3 max-w-2xl text-base font-bold leading-snug text-slate-200 sm:mt-5 sm:text-lg md:text-2xl">
              {copy.heroLead}
            </p>
            <p className="mt-2 max-w-2xl text-sm font-semibold text-[#EEBA2B] sm:mt-4 sm:text-base md:text-xl">
              {copy.heroLine}
            </p>
            <a
              href="#partnership-form"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#ffee00] px-6 text-xs font-black uppercase text-black transition hover:bg-white sm:mt-8 sm:min-h-[48px] sm:gap-3 sm:px-7 sm:text-sm"
            >
              {copy.heroCta}
              <FaArrowRight />
            </a>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {copy.strengths.map((item, index) => {
              const Icon = strengthIcons[index] ?? FaCheckCircle;
              return (
                <div
                  key={item}
                  className="rounded-lg border border-white/15 bg-black/25 p-3 backdrop-blur-sm sm:p-4"
                >
                  <Icon className="mb-2 text-lg text-[#ffee00] sm:mb-4 sm:text-2xl" />
                  <p className="text-xs font-black leading-tight text-white sm:text-sm md:text-base">{item}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:py-8 md:px-8">
          <div className="border-y border-white/15 bg-black/20 px-1 py-4 backdrop-blur-sm sm:rounded-xl sm:border sm:p-6 md:p-8">
            <h2 className="text-2xl font-black leading-tight sm:text-3xl md:text-5xl">{copy.whyTitle}</h2>
            <p className="mt-2 max-w-4xl text-sm font-semibold leading-relaxed text-slate-200 sm:mt-4 sm:text-base md:text-xl">
              {copy.whyLead}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:py-8 md:px-8">
          <h2 className="mb-3 text-2xl font-black sm:mb-5 sm:text-3xl md:text-5xl">{copy.workTitle}</h2>
          <div className="grid gap-2.5 sm:gap-4 md:grid-cols-3">
            {copy.workCards.map((card) => (
              <article key={card.title} className="rounded-lg border border-[#EEBA2B]/30 bg-black/25 p-4 backdrop-blur-sm sm:p-5">
                <h3 className="text-xl font-black text-[#ffee00] sm:text-2xl">{card.title}</h3>
                <p className="mt-1.5 text-base font-black text-white sm:mt-3 sm:text-lg">{card.lead}</p>
                <p className="mt-1.5 text-sm font-semibold leading-relaxed text-slate-300 sm:mt-3 md:text-base">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:py-8 md:px-8">
          <h2 className="mb-3 text-2xl font-black sm:mb-5 sm:text-3xl md:text-5xl">{copy.processTitle}</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-5">
            {copy.process.map((step, index) => (
              <div key={step} className="relative flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 p-2.5 backdrop-blur-sm sm:block sm:p-4">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEBA2B] text-xs font-black text-black sm:mb-3 sm:h-9 sm:w-9 sm:text-sm">
                  {index + 1}
                </span>
                <p className="text-xs font-black leading-tight text-white sm:text-base">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-2.5 px-4 py-5 sm:gap-4 sm:py-8 md:grid-cols-2 md:px-8">
          <div className="rounded-lg border border-white/15 bg-black/20 p-4 backdrop-blur-sm sm:p-5">
            <h2 className="text-2xl font-black text-white sm:text-3xl">{copy.pilotTitle}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-200 sm:mt-3 sm:text-base">{copy.pilotLead}</p>
            <div className="mt-3 grid gap-2 sm:mt-5 sm:gap-3">
              {copy.pilotPoints.map((point) => (
                <p key={point} className="flex items-center gap-3 text-sm font-black text-white">
                  <FaCheckCircle className="shrink-0 text-[#ffee00]" />
                  {point}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[#EEBA2B]/35 bg-[#EEBA2B]/10 p-4 backdrop-blur-sm sm:p-5">
            <h2 className="text-2xl font-black text-[#ffee00] sm:text-3xl">{copy.satisfactionTitle}</h2>
            <div className="mt-3 text-xl font-black leading-tight text-white sm:mt-5 sm:text-2xl md:text-4xl">
              {copy.satisfactionLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:py-8 md:px-8">
          <h2 className="mb-3 text-2xl font-black sm:mb-5 sm:text-3xl md:text-5xl">{copy.industriesTitle}</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
            {copy.industries.map((industry, index) => {
              const Icon = industryIcons[index] ?? FaIndustry;
              return (
                <div key={industry} className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 p-2.5 backdrop-blur-sm sm:block sm:p-4">
                  <Icon className="shrink-0 text-base text-[#EEBA2B] sm:mb-3 sm:text-xl" />
                  <p className="text-xs font-black leading-tight text-white sm:text-sm md:text-base">{industry}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="partnership-form" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-6 sm:py-10 md:px-8 md:py-14">
          <div className="grid gap-5 rounded-xl border border-white/15 bg-black/35 p-4 backdrop-blur-md sm:p-5 md:grid-cols-[0.85fr_1.15fr] md:gap-6 md:p-8">
            <div>
              <h2 className="text-2xl font-black leading-tight sm:text-3xl md:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-2 text-sm font-bold leading-relaxed text-slate-200 sm:mt-4 sm:text-lg">{copy.finalLead}</p>
              <a
                href="#partnership-form"
                className="mt-4 inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#ffee00] px-5 text-xs font-black uppercase text-[#ffee00] sm:mt-6 sm:min-h-[46px] sm:gap-3 sm:px-6 sm:text-sm"
              >
                {copy.finalCta}
                <FaPaperPlane />
              </a>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-2.5 sm:gap-3">
              <div>
                <h3 className="text-xl font-black text-[#ffee00] sm:text-2xl">{copy.formTitle}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-300">{copy.formLead}</p>
              </div>
              <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                {copy.name} *
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="min-h-[44px] rounded-lg border border-white/20 bg-black/35 px-3 text-sm normal-case text-white outline-none focus:border-[#ffee00] sm:min-h-[48px] sm:px-4 sm:text-base"
                />
              </label>
              <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                {copy.company}
                <input
                  value={form.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  className="min-h-[44px] rounded-lg border border-white/20 bg-black/35 px-3 text-sm normal-case text-white outline-none focus:border-[#ffee00] sm:min-h-[48px] sm:px-4 sm:text-base"
                />
              </label>
              <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                  {copy.email} *
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="min-h-[44px] rounded-lg border border-white/20 bg-black/35 px-3 text-sm normal-case text-white outline-none focus:border-[#ffee00] sm:min-h-[48px] sm:px-4 sm:text-base"
                  />
                </label>
                <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                  {copy.phone}
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="min-h-[44px] rounded-lg border border-white/20 bg-black/35 px-3 text-sm normal-case text-white outline-none focus:border-[#ffee00] sm:min-h-[48px] sm:px-4 sm:text-base"
                  />
                </label>
              </div>
              <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                {copy.type}
                <select
                  value={form.type}
                  onChange={(event) => updateField("type", event.target.value)}
                  className="min-h-[44px] rounded-lg border border-white/20 bg-[#071323]/85 px-3 text-sm normal-case text-white outline-none focus:border-[#ffee00] sm:min-h-[48px] sm:px-4 sm:text-base"
                >
                  {copy.typeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                {copy.message} *
                <textarea
                  required
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  rows={4}
                  className="rounded-lg border border-white/20 bg-black/35 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-[#ffee00] sm:px-4 sm:py-3 sm:text-base"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="min-h-[46px] rounded-full bg-[#ffee00] px-6 text-xs font-black uppercase text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[50px] sm:text-sm"
              >
                {sending ? "..." : copy.submit}
              </button>
            </form>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default PartnershipPage;


