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
import { contactUs } from "../APIs/Contact";
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
      await contactUs({
        fullName: `${form.name}${form.company ? ` - ${form.company}` : ""}`,
        email: form.email,
        message: [
          "[PARTNERSHIP REQUEST]",
          `Type: ${form.type}`,
          `Company: ${form.company || "-"}`,
          `Phone: ${form.phone || "-"}`,
          `Language: ${locale}`,
          "",
          form.message,
        ].join("\n"),
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
    <PageLayout className="bg-[#071323] text-white">
      <MarketSEOHead {...seoConfig.partnership} path="/partnership" />

      <main className="min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(238,186,43,0.16),transparent_34%),linear-gradient(180deg,#071323_0%,#05080d_100%)] pt-28">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-10 pt-10 md:px-8 lg:min-h-[78vh] lg:flex-row lg:items-center lg:pb-16">
          <div className="flex-1">
            <div className="mb-4 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-[#ffee00]">
              <span className="h-4 w-10 skew-x-[-15deg] bg-[#EEBA2B]" />
              {copy.heroKicker}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-normal text-white md:text-6xl lg:text-7xl">
              {pageTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-relaxed text-slate-200 md:text-2xl">
              {copy.heroLead}
            </p>
            <p className="mt-4 max-w-2xl text-base font-semibold text-[#EEBA2B] md:text-xl">
              {copy.heroLine}
            </p>
            <a
              href="#partnership-form"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-[#ffee00] px-7 text-sm font-black uppercase text-black transition hover:bg-white"
            >
              {copy.heroCta}
              <FaArrowRight />
            </a>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
            {copy.strengths.map((item, index) => {
              const Icon = strengthIcons[index] ?? FaCheckCircle;
              return (
                <div
                  key={item}
                  className="rounded-[8px] border border-white/15 bg-white/[0.06] p-4 backdrop-blur-md"
                >
                  <Icon className="mb-4 text-2xl text-[#ffee00]" />
                  <p className="text-sm font-black leading-tight text-white md:text-base">{item}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
          <div className="rounded-[10px] border border-white/15 bg-white/[0.05] p-5 backdrop-blur-md md:p-8">
            <h2 className="text-3xl font-black leading-tight md:text-5xl">{copy.whyTitle}</h2>
            <p className="mt-4 max-w-4xl text-base font-semibold leading-relaxed text-slate-200 md:text-xl">
              {copy.whyLead}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
          <h2 className="mb-5 text-3xl font-black md:text-5xl">{copy.workTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.workCards.map((card) => (
              <article key={card.title} className="rounded-[8px] border border-[#EEBA2B]/35 bg-black/20 p-5">
                <h3 className="text-2xl font-black text-[#ffee00]">{card.title}</h3>
                <p className="mt-3 text-lg font-black text-white">{card.lead}</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-300 md:text-base">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
          <h2 className="mb-5 text-3xl font-black md:text-5xl">{copy.processTitle}</h2>
          <div className="grid gap-3 md:grid-cols-5">
            {copy.process.map((step, index) => (
              <div key={step} className="relative rounded-[8px] border border-white/15 bg-white/[0.06] p-4">
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EEBA2B] text-sm font-black text-black">
                  {index + 1}
                </span>
                <p className="text-base font-black text-white">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-8 md:grid-cols-2 md:px-8">
          <div className="rounded-[8px] border border-white/15 bg-white/[0.06] p-5">
            <h2 className="text-3xl font-black text-white">{copy.pilotTitle}</h2>
            <p className="mt-3 text-base font-semibold text-slate-200">{copy.pilotLead}</p>
            <div className="mt-5 grid gap-3">
              {copy.pilotPoints.map((point) => (
                <p key={point} className="flex items-center gap-3 text-sm font-black text-white">
                  <FaCheckCircle className="shrink-0 text-[#ffee00]" />
                  {point}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[8px] border border-[#EEBA2B]/35 bg-[#EEBA2B]/10 p-5">
            <h2 className="text-3xl font-black text-[#ffee00]">{copy.satisfactionTitle}</h2>
            <div className="mt-5 text-2xl font-black leading-tight text-white md:text-4xl">
              {copy.satisfactionLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
          <h2 className="mb-5 text-3xl font-black md:text-5xl">{copy.industriesTitle}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {copy.industries.map((industry, index) => {
              const Icon = industryIcons[index] ?? FaIndustry;
              return (
                <div key={industry} className="rounded-[8px] border border-white/15 bg-white/[0.05] p-4">
                  <Icon className="mb-3 text-xl text-[#EEBA2B]" />
                  <p className="text-sm font-black text-white md:text-base">{industry}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="partnership-form" className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <div className="grid gap-6 rounded-[10px] border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md md:grid-cols-[0.85fr_1.15fr] md:p-8">
            <div>
              <h2 className="text-3xl font-black leading-tight md:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-4 text-lg font-bold leading-relaxed text-slate-200">{copy.finalLead}</p>
              <a
                href="#partnership-form"
                className="mt-6 inline-flex min-h-[46px] items-center gap-3 rounded-full border border-[#ffee00] px-6 text-sm font-black uppercase text-[#ffee00]"
              >
                {copy.finalCta}
                <FaPaperPlane />
              </a>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3">
              <div>
                <h3 className="text-2xl font-black text-[#ffee00]">{copy.formTitle}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-300">{copy.formLead}</p>
              </div>
              <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                {copy.name} *
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="min-h-[48px] rounded-[8px] border border-white/20 bg-[#071323] px-4 text-base normal-case text-white outline-none focus:border-[#ffee00]"
                />
              </label>
              <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                {copy.company}
                <input
                  value={form.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  className="min-h-[48px] rounded-[8px] border border-white/20 bg-[#071323] px-4 text-base normal-case text-white outline-none focus:border-[#ffee00]"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                  {copy.email} *
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="min-h-[48px] rounded-[8px] border border-white/20 bg-[#071323] px-4 text-base normal-case text-white outline-none focus:border-[#ffee00]"
                  />
                </label>
                <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                  {copy.phone}
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="min-h-[48px] rounded-[8px] border border-white/20 bg-[#071323] px-4 text-base normal-case text-white outline-none focus:border-[#ffee00]"
                  />
                </label>
              </div>
              <label className="grid gap-1 text-xs font-black uppercase text-slate-300">
                {copy.type}
                <select
                  value={form.type}
                  onChange={(event) => updateField("type", event.target.value)}
                  className="min-h-[48px] rounded-[8px] border border-white/20 bg-[#071323] px-4 text-base normal-case text-white outline-none focus:border-[#ffee00]"
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
                  rows={5}
                  className="rounded-[8px] border border-white/20 bg-[#071323] px-4 py-3 text-base normal-case text-white outline-none focus:border-[#ffee00]"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="min-h-[50px] rounded-full bg-[#ffee00] px-6 text-sm font-black uppercase text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
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


