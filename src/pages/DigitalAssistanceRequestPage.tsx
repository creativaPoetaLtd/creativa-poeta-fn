import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowRight,
  FaCheckCircle,
  FaLaptop,
  FaMobileAlt,
  FaShieldAlt,
  FaTools,
  FaWifi,
} from "react-icons/fa";
import PageLayout from "../components/layout/PageLayout";
import InternationalPhoneInput from "../components/forms/InternationalPhoneInput";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { projectForm } from "../APIs/projectForm";
import { getCurrentLocale, getCurrentMarket, localizePath } from "../data/marketRuntime";
import { getExampleCity, getExampleEmail, getExampleName, getExamplePhone } from "../utils/localExamples";
import { validateLocalizedForm } from "../utils/localizedFormValidation";

type LocaleKey = "fr" | "en" | "nl" | "kiny";

type AssistanceForm = {
  name: string;
  email: string;
  phone: string;
  city: string;
  device: string;
  urgency: string;
  selectedNeeds: string[];
  message: string;
};

const initialForm: AssistanceForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  device: "",
  urgency: "normal",
  selectedNeeds: [],
  message: "",
};

const copies: Record<
  LocaleKey,
  {
    seoTitle: string;
    seoDescription: string;
    backHome: string;
    eyebrow: string;
    title: string;
    intro: string;
    chooseTitle: string;
    detailsTitle: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    contact: string;
    labels: Record<keyof Omit<AssistanceForm, "selectedNeeds">, string>;
    placeholders: Partial<Record<keyof AssistanceForm, string>>;
    urgency: Array<{ value: string; label: string }>;
    needs: Array<{ label: string; icon: "tools" | "laptop" | "wifi" | "mobile" | "shield" }>;
  }
> = {
  fr: {
    seoTitle: "Demander une assistance numérique | Creativa Poeta",
    seoDescription:
      "Demandez une aide pour dépannage informatique, configuration d'appareils, Wi-Fi, comptes, sécurité ou accompagnement numérique.",
    backHome: "Retour à l'accueil",
    eyebrow: "Assistance numérique",
    title: "Demandez une aide claire pour vos outils, appareils et démarches.",
    intro:
      "Expliquez le problème ou le besoin. Nous recevons la demande dans l'espace admin et pouvons vous répondre àvec les prochaines étapes.",
    chooseTitle: "De quoi avez-vous besoin ?",
    detailsTitle: "Informations utiles",
    submit: "Envoyer la demande",
    submitting: "Envoi...",
    success: "Demande d'assistance envoyée.",
    error: "Impossible d'envoyer la demande pour le moment.",
    contact: "Contact direct",
    labels: {
      name: "Votre nom",
      email: "Email",
      phone: "Téléphone",
      city: "Ville / zone",
      device: "Appareil ou outil concerne",
      urgency: "Urgence",
      message: "Expliquez votre besoin",
    },
    placeholders: {
      name: "Jane Doe",
      email: "vous@email.com",
      phone: "+32 ...",
      city: "Bruxelles",
      device: "PC, smartphone, imprimante, TV, compte email...",
      message: "Ex. Je dois configurer mon email sur mon téléphone et sécuriser mon compte.",
    },
    urgency: [
      { value: "normal", label: "Normal" },
      { value: "soon", label: "Cette semaine" },
      { value: "urgent", label: "Urgent" },
    ],
    needs: [
      { label: "Dépannage ordinateur, smartphone ou tablette", icon: "tools" },
      { label: "Installation et configuration d'appareils", icon: "laptop" },
      { label: "Wi-Fi, email, comptes, sauvegardes et cloud", icon: "wifi" },
      { label: "Aide pour achats, formulaires ou démarches en ligne", icon: "mobile" },
      { label: "Sécurité, mots de passe et protection des données", icon: "shield" },
      { label: "Formation pas à pas pour gagner en autonomie", icon: "laptop" },
    ],
  },
  en: {
    seoTitle: "Request digital assistance | Creativa Poeta",
    seoDescription:
      "Request help with tech troubleshooting, device setup, Wi-Fi, accounts, security or digital guidance.",
    backHome: "Back home",
    eyebrow: "Digital assistance",
    title: "Request clear help for your tools, devices and online tasks.",
    intro:
      "Explain the problem or need. We receive it in the admin space and can reply with next steps.",
    chooseTitle: "What do you need?",
    detailsTitle: "Useful details",
    submit: "Send request",
    submitting: "Sending...",
    success: "Assistance request sent.",
    error: "Could not send the request right now.",
    contact: "Direct contact",
    labels: {
      name: "Your name",
      email: "Email",
      phone: "Phone",
      city: "City / area",
      device: "Device or tool",
      urgency: "Urgency",
      message: "Explain your need",
    },
    placeholders: {
      name: "John Doe",
      email: "you@email.com",
      phone: "+32 ...",
      city: "Brussels",
      device: "PC, smartphone, printer, TV, email account...",
      message: "Ex. I need to configure email on my phone and secure my account.",
    },
    urgency: [
      { value: "normal", label: "Normal" },
      { value: "soon", label: "This week" },
      { value: "urgent", label: "Urgent" },
    ],
    needs: [
      { label: "Computer, smartphone or tablet troubleshooting", icon: "tools" },
      { label: "Device installation and setup", icon: "laptop" },
      { label: "Wi-Fi, email, accounts, backups and cloud", icon: "wifi" },
      { label: "Help with online purchases, forms or admin tasks", icon: "mobile" },
      { label: "Security, passwords and data protection", icon: "shield" },
      { label: "Step-by-step training to become independent", icon: "laptop" },
    ],
  },
  nl: {
    seoTitle: "Digitale hulp aanvragen | Creativa Poeta",
    seoDescription:
      "Vraag hulp voor technische problemen, toestelconfiguratie, Wi-Fi, accounts, beveiliging of digitale begeleiding.",
    backHome: "Terug naar home",
    eyebrow: "Digitale hulp",
    title: "Vraag duidelijke hulp voor uw tools, toestellen en online taken.",
    intro:
      "Leg het probleem of de behoefte uit. Wij ontvangen de aanvraag in de adminruimte en kunnen u antwoorden met de volgende stappen.",
    chooseTitle: "Waarmee heeft u hulp nodig?",
    detailsTitle: "Nuttige informatie",
    submit: "Aanvraag verzenden",
    submitting: "Verzenden...",
    success: "Hulpaanvraag verzonden.",
    error: "De aanvraag kon nu niet worden verzonden.",
    contact: "Direct contact",
    labels: {
      name: "Uw naam",
      email: "Email",
      phone: "Telefoon",
      city: "Stad / regio",
      device: "Toestel of tool",
      urgency: "Urgentie",
      message: "Leg uw behoefte uit",
    },
    placeholders: {
      name: "Jane Doe",
      email: "u@email.com",
      phone: "+32 ...",
      city: "Amsterdam",
      device: "PC, smartphone, printer, TV, emailaccount...",
      message: "Ex. Ik wil mijn email op mijn telefoon instellen en mijn account beveiligen.",
    },
    urgency: [
      { value: "normal", label: "Normaal" },
      { value: "soon", label: "Deze week" },
      { value: "urgent", label: "Dringend" },
    ],
    needs: [
      { label: "Problemen met computer, smartphone of tablet", icon: "tools" },
      { label: "Installatie en configuratie van toestellen", icon: "laptop" },
      { label: "Wi-Fi, email, accounts, backups en cloud", icon: "wifi" },
      { label: "Hulp bij online aankopen, formulieren of administratie", icon: "mobile" },
      { label: "Beveiliging, wachtwoorden en gegevensbescherming", icon: "shield" },
      { label: "Stap-voor-stap begeleiding om zelfstandig te worden", icon: "laptop" },
    ],
  },
  kiny: {
    seoTitle: "Saba ubufasha bwa digital | Creativa Poeta",
    seoDescription:
      "Saba ubufasha kuri mudasobwa, telefone, internet, konti, umutekano cyangwa gukoresha services zo kuri internet.",
    backHome: "Subira ahabanza",
    eyebrow: "Assistance numérique",
    title: "Saba ubufasha bworoshye ku bikoresho, konti n'ibikorwa byo kuri internet.",
    intro:
      "Sobanura ikibazo cyangwa icyo ukeneye. Tuzakibona muri admin maze tugusubize intambwe zikurikira.",
    chooseTitle: "Ukeneye iki?",
    detailsTitle: "Amakuru adufasha",
    submit: "Ohereza icyifuzo",
    submitting: "Kohereza...",
    success: "Icyifuzo cyoherejwe.",
    error: "Kohereza icyifuzo ntibikunze ubu.",
    contact: "Twandikire",
    labels: {
      name: "Izina ryawe",
      email: "Email",
      phone: "Telefone",
      city: "Umujyi / akarere",
      device: "Igikoresho cyangwa tool",
      urgency: "Byihutirwa",
      message: "Sobanura icyo ukeneye",
    },
    placeholders: {
      name: "John Doe",
      email: "wowe@email.com",
      phone: "+250 ...",
      city: "Kigali",
      device: "PC, smartphone, printer, TV, email...",
      message: "Urugero: nshaka gushyira email kuri telefone no kurinda konti yanjye.",
    },
    urgency: [
      { value: "normal", label: "Bisanzwe" },
      { value: "soon", label: "Muri iki cyumweru" },
      { value: "urgent", label: "Byihutirwa" },
    ],
    needs: [
      { label: "Depannage ya mudasobwa, smartphone cyangwa tablette", icon: "tools" },
      { label: "Installation na configuration y'ibikoresho", icon: "laptop" },
      { label: "Wi-Fi, email, konti, backup na cloud", icon: "wifi" },
      { label: "Ubufasha mu kugura cyangwa kuzuza online forms", icon: "mobile" },
      { label: "Umutekano, passwords no kurinda amakuru", icon: "shield" },
      { label: "Kwigishwa buhoro buhoro kugira ngo wigire", icon: "laptop" },
    ],
  },
};

const icons = {
  tools: FaTools,
  laptop: FaLaptop,
  wifi: FaWifi,
  mobile: FaMobileAlt,
  shield: FaShieldAlt,
};

export default function DigitalAssistanceRequestPage() {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market) as LocaleKey;
  const baseCopy = copies[locale] ?? copies.fr;
  const copy = {
    ...baseCopy,
    placeholders: {
      ...baseCopy.placeholders,
      name: getExampleName(locale),
      email: getExampleEmail(locale),
      phone: getExamplePhone(market),
      city: getExampleCity(market, locale),
    },
  };
  const [form, setForm] = useState<AssistanceForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (field: keyof AssistanceForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleNeed = (need: string) => {
    setForm((current) => ({
      ...current,
      selectedNeeds: current.selectedNeeds.includes(need)
        ? current.selectedNeeds.filter((item) => item !== need)
        : [...current.selectedNeeds, need],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateLocalizedForm(event.currentTarget, locale);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setIsSubmitting(true);

    try {
      await projectForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.city,
        serviceType: "Assistance numérique",
        selectedServices: form.selectedNeeds,
        customServiceDescription: `Appareil / outil: ${form.device || "Non précise"}\nUrgence: ${form.urgency}`,
        customServiceNeeds: form.message,
        additionalInfo: `Ville / zone: ${form.city}`,
        locale,
      });
      toast.success(copy.success);
      setForm(initialForm);
    } catch (error) {
      toast.error(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout className="bg-[#071a33] [&>header]:hidden [&>main+div]:hidden laptop:[&>header]:flex laptop:[&>main+div]:flex">
      <MarketSEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        keywords="assistance numérique, depannage informatique, configuration appareil, aide technologie, Creativa Poeta"
        path="/demander-assistance-numerique"
      />

      <MobileAssistanceRequest copy={copy} locale={locale} />

      <main className="relative isolate hidden min-h-screen overflow-hidden px-4 pb-16 pt-28 text-white phone:px-6 tablet:px-10 laptop:block laptop:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(238,186,43,.2),transparent_30rem),linear-gradient(145deg,#071a33,#020609_72%)]" />
        <div className="mx-auto max-w-6xl">
          <Link
            to={localizePath("/")}
            className="mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white/75 transition hover:text-[#fff200]"
          >
            <span>&lt;</span>
            {copy.backHome}
          </Link>

          <section className="grid gap-5 laptop:grid-cols-[.8fr_1.2fr] laptop:items-start">
            <aside className="rounded-[1.7rem] border border-[#EEBA2B]/35 bg-black/25 p-5 shadow-2xl backdrop-blur-md phone:p-7 laptop:sticky laptop:top-24">
              <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[.18em] text-[#fff200]">
                <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
                {copy.eyebrow}
              </div>
              <h1 className="font-['Black_Ops_One'] text-3xl leading-tight text-white phone:text-5xl laptop:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-5 text-sm font-bold leading-7 text-white/80 phone:text-base">
                {copy.intro}
              </p>
              <Link
                to={localizePath("/contact")}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-5 py-3 text-xs font-black uppercase text-white transition hover:border-[#fff200] hover:text-[#fff200]"
              >
                {copy.contact}
                <FaArrowRight />
              </Link>
            </aside>

            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-[1.7rem] border border-white/20 bg-white/[.06] p-4 shadow-2xl backdrop-blur-md phone:p-6"
            >
              <h2 className="mb-4 text-xl font-black text-[#fff200]">{copy.chooseTitle}</h2>
              <div className="grid gap-2 phone:grid-cols-2">
                {copy.needs.map((need) => {
                  const Icon = icons[need.icon];
                  const selected = form.selectedNeeds.includes(need.label);
                  return (
                    <button
                      key={need.label}
                      type="button"
                      onClick={() => toggleNeed(need.label)}
                      className={`flex min-h-[4rem] items-center gap-3 rounded-2xl border px-4 py-3 text-left text-xs font-black leading-tight transition ${
                        selected
                          ? "border-[#fff200] bg-[#EEBA2B] text-[#071a33]"
                          : "border-white/20 bg-white/10 text-white hover:border-[#EEBA2B]"
                      }`}
                    >
                      <Icon className="flex-none text-lg" />
                      <span>{need.label}</span>
                      {selected ? <FaCheckCircle className="ml-auto flex-none" /> : null}
                    </button>
                  );
                })}
              </div>

              <h2 className="mb-4 mt-6 text-xl font-black text-[#fff200]">{copy.detailsTitle}</h2>
              <div className="grid gap-3 tablet:grid-cols-2">
                <Field label={copy.labels.name} value={form.name} placeholder={copy.placeholders.name} onChange={(value) => setField("name", value)} required />
                <Field label={copy.labels.email} value={form.email} type="email" placeholder={copy.placeholders.email} onChange={(value) => setField("email", value)} required />
                <label className="block min-w-0">
                  <RequiredLabel required={false}>{copy.labels.phone}</RequiredLabel>
                  <InternationalPhoneInput value={form.phone} onChange={(value) => setField("phone", value)} locale={locale} defaultCountry={market.countryCode} placeholder={copy.placeholders.phone} />
                </label>
                <Field label={copy.labels.city} value={form.city} placeholder={copy.placeholders.city} onChange={(value) => setField("city", value)} />
                <Field label={copy.labels.device} value={form.device} placeholder={copy.placeholders.device} onChange={(value) => setField("device", value)} />
                <label>
                  <RequiredLabel required={false}>{copy.labels.urgency}</RequiredLabel>
                  <select
                    value={form.urgency}
                    onChange={(event) => setField("urgency", event.target.value)}
                    className="h-14 w-full rounded-2xl border border-white/20 bg-transparent px-4 text-sm laptop:h-12 font-bold text-white outline-none transition focus:border-[#fff200]"
                  >
                    {copy.urgency.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-3 block">
                <RequiredLabel>{copy.labels.message}</RequiredLabel>
                <textarea
                  value={form.message}
                  onChange={(event) => setField("message", event.target.value)}
                  placeholder={copy.placeholders.message}
                  rows={5}
                  required
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-sm font-bold text-white outline-none transition placeholder:text-white/40 focus:border-[#fff200]"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#fff200] bg-[#fff200] px-5 py-4 text-xs font-black uppercase text-[#071a33] transition hover:bg-transparent hover:text-[#fff200] disabled:cursor-not-allowed disabled:opacity-60 phone:w-auto"
              >
                {isSubmitting ? copy.submitting : copy.submit}
                <FaArrowRight />
              </button>
            </form>
          </section>
        </div>
      </main>
    </PageLayout>
  );
}

type FieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

const Field = ({ label, value, placeholder, type = "text", required = false, onChange }: FieldProps) => (
  <label className="block min-w-0">
    <RequiredLabel required={required}>{label}</RequiredLabel>
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 w-full rounded-2xl border border-white/20 bg-transparent px-3 text-xs font-bold text-white outline-none transition placeholder:text-white/40 focus:border-[#fff200] tablet:h-14 tablet:px-4 tablet:text-sm laptop:h-12"
    />
  </label>
);

const RequiredLabel = ({ children, required = true }: { children: string; required?: boolean }) => (
  <span className="mb-1.5 block text-xs font-black uppercase text-white/75">
    {children}
    {required ? <span className="ml-1 text-[#fff200]" aria-hidden="true">*</span> : null}
  </span>
);

type MobileAssistanceRequestProps = {
  copy: (typeof copies)[LocaleKey];
  locale: LocaleKey;
};

const MobileAssistanceRequest = ({ copy, locale }: MobileAssistanceRequestProps) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AssistanceForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stepLabels = locale === "nl" ? ["Hulp", "Details"] : locale === "en" ? ["Need", "Details"] : locale === "kiny" ? ["Ubufasha", "Amakuru"] : ["Besoin", "Details"];
  const back = locale === "nl" ? "Terug" : locale === "en" ? "Back" : "Retour";
  const next = locale === "nl" ? "Verder" : locale === "en" ? "Continue" : "Continuer";
  const setField = (field: keyof AssistanceForm, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const toggleNeed = (need: string) => setForm((current) => ({ ...current, selectedNeeds: current.selectedNeeds.includes(need) ? current.selectedNeeds.filter((item) => item !== need) : [...current.selectedNeeds, need] }));

  const closeForm = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = localizePath("/");
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateLocalizedForm(event.currentTarget, locale);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setIsSubmitting(true);
    try {
      await projectForm({
        name: form.name, email: form.email, phone: form.phone, company: form.city,
        serviceType: "Assistance numérique", selectedServices: form.selectedNeeds,
        customServiceDescription: `Appareil / outil: ${form.device || "Non précise"}\nUrgence: ${form.urgency}`,
        customServiceNeeds: form.message, additionalInfo: `Ville / zone: ${form.city}`,
        locale,
      });
      toast.success(copy.success);
      setForm(initialForm);
      setStep(1);
    } catch { toast.error(copy.error); } finally { setIsSubmitting(false); }
  };

  return (
    <main className="min-h-[100dvh] bg-[#071a33] p-3 text-white laptop:hidden">
      <form noValidate onSubmit={submit} className="flex min-h-[calc(100dvh-1.5rem)] flex-col rounded-[1.4rem] border border-white/20 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-2">
          <Link to={localizePath("/")} className="text-[10px] font-black uppercase text-white/65">&lt; {copy.backHome}</Link>
          <button type="button" onClick={closeForm} aria-label={copy.backHome} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-xl font-black text-white">X</button>
        </div>
        <div className="mt-3 flex justify-center gap-2">
            {stepLabels.map((label, index) => { const number = index + 1; return <button key={label} type="button" onClick={() => setStep(number)} className={`h-8 rounded-full border text-[9px] font-black uppercase ${step === number ? "border-[#fff200] bg-[#fff200] px-3 text-[#071a33]" : "w-8 border-white/20 bg-white/10 text-white/70"}`}>{step === number ? `${number} ${label}` : number}</button>; })}
          </div>

        <div className="mt-6 flex-1">
          {step === 1 && <section>
            <h1 className="mb-5 text-2xl font-black leading-tight text-[#fff200]">{copy.chooseTitle}</h1>
            <div className="grid grid-cols-2 gap-3">
              {copy.needs.map((need) => { const Icon = icons[need.icon]; const selected = form.selectedNeeds.includes(need.label); return (
                <button key={need.label} type="button" onClick={() => toggleNeed(need.label)} className={`flex min-h-[6rem] items-center gap-3 rounded-2xl border p-3 text-left text-[11px] font-black leading-tight ${selected ? "border-[#fff200] bg-[#EEBA2B] text-[#071a33]" : "border-white/20 bg-white/10"}`}>
                  <Icon className="flex-none text-xl" /><span>{need.label}</span>{selected && <FaCheckCircle className="ml-auto flex-none" />}
                </button>
              ); })}
            </div>
          </section>}

          {step === 2 && <section>
            <h1 className="mb-5 text-2xl font-black leading-tight text-[#fff200]">{copy.detailsTitle}</h1>
            <div className="grid grid-cols-1 gap-2">
              <Field label={copy.labels.name} value={form.name} placeholder={copy.placeholders.name} onChange={(value) => setField("name", value)} required />
              <Field label={copy.labels.email} value={form.email} type="email" placeholder={copy.placeholders.email} onChange={(value) => setField("email", value)} required />
              <label className="block min-w-0">
                <RequiredLabel required={false}>{copy.labels.phone}</RequiredLabel>
                <InternationalPhoneInput value={form.phone} onChange={(value) => setField("phone", value)} locale={locale} defaultCountry={getCurrentMarket().countryCode} placeholder={copy.placeholders.phone} />
              </label>
              <Field label={copy.labels.city} value={form.city} placeholder={copy.placeholders.city} onChange={(value) => setField("city", value)} />
              <Field label={copy.labels.device} value={form.device} placeholder={copy.placeholders.device} onChange={(value) => setField("device", value)} />
              <label><RequiredLabel required={false}>{copy.labels.urgency}</RequiredLabel><select value={form.urgency} onChange={(event) => setField("urgency", event.target.value)} className="h-11 w-full rounded-2xl border border-white/20 bg-transparent px-3 text-xs font-bold text-white outline-none">{copy.urgency.map((option) => <option className="bg-[#07111f] text-white" key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            </div>
            <label className="mt-2 block"><RequiredLabel>{copy.labels.message}</RequiredLabel><textarea value={form.message} onChange={(event) => setField("message", event.target.value)} placeholder={copy.placeholders.message} rows={2} required className="min-h-[5rem] w-full rounded-2xl border border-white/20 bg-transparent px-3 py-2 text-xs font-bold text-white outline-none placeholder:text-white/40" /></label>
          </section>}
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
          <button type="button" onClick={() => setStep(1)} disabled={step === 1} className="rounded-full border-2 border-white py-4 text-xs font-black uppercase disabled:opacity-25">{back}</button>
          {step === 1 ? <button type="button" onClick={() => setStep(2)} className="rounded-full border-2 border-[#fff200] bg-[#fff200] py-4 text-xs font-black uppercase text-[#071a33]">{next} &gt;</button> : <button type="submit" disabled={isSubmitting} className="rounded-full border-2 border-[#fff200] bg-[#fff200] py-4 text-xs font-black uppercase text-[#071a33] disabled:opacity-50">{isSubmitting ? copy.submitting : copy.submit}</button>}
        </div>
      </form>
    </main>
  );
};

