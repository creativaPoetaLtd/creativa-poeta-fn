import { FormEvent, useLayoutEffect, useMemo, useState } from "react";
import { FaArrowRight, FaBriefcase, FaCalculator, FaCheck, FaHandshake, FaPaperPlane, FaShieldAlt, FaTimes, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { submitPartnershipRequest } from "../APIs/PartnershipRequests";
import { submitProspectReferral, submitReferralApplication, submitReferralLead } from "../APIs/ReferralProgram";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { seoConfig } from "../components/SEO/seoConfig";
import { buildLocalLocalePath, getCurrentLocale, getCurrentMarket } from "../data/marketRuntime";
import referralProgramLocale from "../i18n/ReferralProgramLocale";
import "./ReferralProgramPage.css";

const inputClass = "cp-referral-control min-h-12 w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-[#EEBA2B] focus:ring-2 focus:ring-[#EEBA2B]/20";
const labelClass = "mb-2 block text-[11px] font-black uppercase leading-snug tracking-[.06em] text-slate-300 sm:text-xs";

export default function ReferralProgramPage() {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const copy = referralProgramLocale[locale] ?? referralProgramLocale.fr;
  const prospectCopy = locale === "nl"
    ? { title: "U bent doorverwezen naar Creativa Poeta", lead: "Vertel ons zelf wat uw bedrijf nodig heeft. Uw gegevens worden aan de partner toegewezen die u deze link stuurde.", consent: "Ik vraag Creativa Poeta om contact met mij op te nemen over deze behoefte.", send: "Mijn aanvraag verzenden", success: "Uw aanvraag is verzonden. Creativa Poeta neemt contact met u op." }
    : locale === "en"
    ? { title: "You were referred to Creativa Poeta", lead: "Tell us directly what your business needs. Your request will be attributed to the partner who shared this link.", consent: "I ask Creativa Poeta to contact me about this business need.", send: "Send my request", success: "Your request has been sent. Creativa Poeta will contact you." }
    : locale === "kiny"
    ? { title: "Referral Partner yakwohereje kuri Creativa Poeta", lead: "Tubwire service business yawe ikeneye. Request izandikwa kuri partner waguhaye iyi link.", consent: "Ndasaba Creativa Poeta kumvugisha kuri iyi business need.", send: "Ohereza request", success: "Request yawe yoherejwe. Creativa Poeta izakuvugisha." }
    : { title: "Un partenaire vous a recommandé Creativa Poeta", lead: "Expliquez-nous directement le besoin de votre entreprise. Votre demande sera attribuée au partenaire qui vous a transmis ce lien.", consent: "Je demande à Creativa Poeta de me contacter au sujet de ce besoin professionnel.", send: "Envoyer ma demande", success: "Votre demande a été envoyée. Creativa Poeta vous contactera." };
  const termsPath = buildLocalLocalePath(market, locale, "/referral-program-terms");
  const [projectValue, setProjectValue] = useState(1500);
  const estimatedReward = useMemo(() => Math.min(200, Math.max(0, projectValue) * 0.1), [projectValue]);
  const [applicationSending, setApplicationSending] = useState(false);
  const [leadSending, setLeadSending] = useState(false);
  const [prospectSending, setProspectSending] = useState(false);
  const [strategicSending, setStrategicSending] = useState(false);
  const [partnerAccess, setPartnerAccess] = useState({ partnerId: "", accessSecret: "" });
  const referralCode = useMemo(() => new URLSearchParams(window.location.search).get("ref") || "", []);
  const [application, setApplication] = useState({
    name: "", email: "", country: "", profileType: copy.form.profiles[0], program: "referral" as "referral" | "business",
    website: "", networkDescription: "", termsAccepted: false, marketingConsent: false, websiteConfirmation: "",
  });
  const [lead, setLead] = useState({
    companyName: "", contactName: "", contactEmail: "", contactPhone: "", website: "", serviceNeeded: copy.services[0],
    budgetRange: "", needDescription: "", relationship: copy.leadForm.relationships[0], consentStatus: "agreed" as "agreed" | "not_yet",
    introductionMethod: copy.leadForm.intros[0], introductionDetails: "", websiteConfirmation: "",
  });
  const [strategic, setStrategic] = useState({ name: "", company: "", email: "", phone: "", partnershipType: "Strategic partnership", message: "" });
  const [prospect, setProspect] = useState({ companyName: "", contactName: "", contactEmail: "", contactPhone: "", website: "", serviceNeeded: copy.services[0], budgetRange: "", needDescription: "", contactConsent: false, websiteConfirmation: "" });

  useLayoutEffect(() => {
    const rawHash = window.location.hash.replace(/^#/, "");
    const params = new URLSearchParams(rawHash);
    const partnerId = params.get("partner") || sessionStorage.getItem("cp_referral_partner_id") || "";
    const accessSecret = params.get("access") || sessionStorage.getItem("cp_referral_access") || "";
    if (!partnerId || !accessSecret) return;
    sessionStorage.setItem("cp_referral_partner_id", partnerId);
    sessionStorage.setItem("cp_referral_access", accessSecret);
    setPartnerAccess({ partnerId, accessSecret });
    if (params.has("partner")) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#submit-referral`);
      window.setTimeout(() => document.getElementById("submit-referral")?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, []);

  const handleApplication = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setApplicationSending(true);
      await submitReferralApplication({ ...application, locale });
      toast.success(copy.form.success);
      setApplication((current) => ({ ...current, name: "", email: "", country: "", website: "", networkDescription: "", termsAccepted: false, marketingConsent: false }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.form.error);
    } finally {
      setApplicationSending(false);
    }
  };

  const handleLead = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLeadSending(true);
      await submitReferralLead({ ...lead, ...partnerAccess, locale });
      toast.success(copy.leadForm.success);
      setLead((current) => ({ ...current, companyName: "", contactName: "", contactEmail: "", contactPhone: "", website: "", budgetRange: "", needDescription: "", introductionDetails: "" }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.leadForm.error);
    } finally {
      setLeadSending(false);
    }
  };

  const handleStrategic = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setStrategicSending(true);
      await submitPartnershipRequest({ ...strategic, locale });
      toast.success(copy.strategicSuccess);
      setStrategic({ name: "", company: "", email: "", phone: "", partnershipType: "Strategic partnership", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.form.error);
    } finally {
      setStrategicSending(false);
    }
  };

  const handleProspect = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setProspectSending(true);
      await submitProspectReferral({ ...prospect, referralCode, locale });
      toast.success(prospectCopy.success);
      setProspect((current) => ({ ...current, companyName: "", contactName: "", contactEmail: "", contactPhone: "", website: "", budgetRange: "", needDescription: "", contactConsent: false }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.leadForm.error);
    } finally {
      setProspectSending(false);
    }
  };

  return <PageLayout className="text-white">
    <MarketSEOHead {...seoConfig.referralProgram} path="/referral-partners" />
    <main className="cp-referral-program min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(5,12,22,.3),rgba(5,12,22,.74))] pt-24 sm:pt-28">
      <section className="mx-auto grid w-full max-w-6xl gap-7 px-4 pb-9 pt-4 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,.85fr)] lg:items-end lg:gap-10 lg:pb-12">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[.18em] text-[#EEBA2B] sm:text-sm">{copy.eyebrow}</p>
          <h1 className="max-w-4xl text-[2.7rem] font-black leading-[.95] sm:text-6xl lg:text-7xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-slate-200 sm:text-xl">{copy.hero}</p>
          <p className="mt-3 max-w-3xl text-base font-black text-[#ffee00] sm:text-xl">{copy.rewardLine}</p>
          <div className="mt-6 flex flex-col items-start gap-2.5 sm:flex-row">
            <a href="#join-cprpp" className="inline-flex min-h-[46px] w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#ffee00] px-6 text-sm font-black text-black hover:bg-white sm:w-auto sm:max-w-none">{copy.join}<FaArrowRight /></a>
            <a href="#submit-referral" className="inline-flex min-h-[46px] w-full max-w-sm items-center justify-center gap-2 rounded-full border border-white/30 bg-black/20 px-6 text-sm font-black backdrop-blur hover:border-[#EEBA2B] sm:w-auto sm:max-w-none">{copy.submitLead}</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-slate-300 sm:text-sm">{copy.trust.map((item) => <span key={item} className="inline-flex items-center gap-1.5"><FaCheck className="text-[#EEBA2B]" />{item}</span>)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 self-start sm:gap-3 lg:self-end">
          {[{ icon: FaUsers, value: "10%", label: copy.referralTitle }, { icon: FaCalculator, value: "€200", label: "Maximum" }, { icon: FaShieldAlt, value: "100%", label: "Transparent" }, { icon: FaHandshake, value: "CP", label: "Sales & delivery" }].map(({ icon: Icon, value, label }) => <div key={label} className="rounded-xl border border-white/15 bg-black/25 p-4 backdrop-blur-sm sm:p-5"><Icon className="mb-3 text-xl text-[#EEBA2B]" /><p className="text-2xl font-black sm:text-3xl">{value}</p><p className="mt-1 text-xs font-bold text-slate-300 sm:text-sm">{label}</p></div>)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 py-9 backdrop-blur-sm sm:py-12"><div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="max-w-4xl text-2xl font-black sm:text-4xl">{copy.howTitle}</h2><p className="mt-2 max-w-3xl text-sm font-semibold text-slate-300 sm:text-base">{copy.howLead}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">{copy.steps.map((step, index) => <article key={step.title} className="flex gap-3 rounded-xl border border-white/15 bg-white/[.04] p-4 sm:block sm:p-5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEBA2B] text-sm font-black text-black">{index + 1}</span><div><h3 className="text-lg font-black sm:mt-4 sm:text-xl">{step.title}</h3><p className="mt-1 text-sm font-semibold leading-relaxed text-slate-300">{step.text}</p></div></article>)}</div>
      </div></section>

      <section className="mx-auto max-w-6xl px-4 py-9 md:px-8 sm:py-12"><h2 className="text-2xl font-black sm:text-4xl">{copy.servicesTitle}</h2><div className="mt-5 flex flex-wrap gap-2">{copy.services.map((service) => <span key={service} className="rounded-full border border-[#EEBA2B]/35 bg-black/25 px-3.5 py-2 text-xs font-black sm:text-sm">{service}</span>)}</div></section>

      <section id="business-partners" className="mx-auto grid max-w-6xl scroll-mt-28 items-start gap-4 px-4 pb-9 md:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] sm:pb-12">
        <article className="rounded-2xl border border-[#EEBA2B]/30 bg-black/25 p-5 backdrop-blur sm:p-6"><FaCalculator className="text-2xl text-[#EEBA2B]" /><h2 className="mt-3 text-2xl font-black sm:text-3xl">{copy.calculatorTitle}</h2><p className="mt-2 text-sm font-semibold leading-relaxed text-slate-300">{copy.calculatorLead}</p><div className="mt-5 grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"><label className="cp-referral-field block"><span className={labelClass}>{copy.estimatedValue}</span><div className="flex items-center rounded-xl border border-white/20 bg-black/30 px-3"><span className="font-black text-[#EEBA2B]">€</span><input type="number" min="0" step="50" value={projectValue} onChange={(event) => setProjectValue(Number(event.target.value))} className="min-h-12 w-full bg-transparent px-2 font-black outline-none" /></div></label><div className="w-fit min-w-[12rem] rounded-xl bg-[#EEBA2B] px-4 py-3 text-black"><p className="text-[10px] font-black uppercase tracking-wide">{copy.estimatedReward}</p><p className="mt-0.5 text-3xl font-black">€{estimatedReward.toFixed(2)}</p></div></div><p className="mt-3 text-xs font-semibold leading-relaxed text-slate-400">{copy.estimateNote}</p></article>
        <div><h2 className="mb-3 text-2xl font-black sm:text-3xl">{copy.programsTitle}</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{[
          { title: copy.referralTitle, text: copy.referralText, points: copy.referralPoints, icon: FaUsers },
          { title: copy.businessTitle, text: copy.businessText, points: copy.businessPoints, icon: FaBriefcase },
        ].map(({ title, text, points, icon: Icon }) => <article key={title} className="h-fit rounded-xl border border-white/15 bg-black/25 p-4 backdrop-blur"><Icon className="text-xl text-[#EEBA2B]" /><h3 className="mt-3 text-xl font-black">{title}</h3><p className="mt-2 text-sm font-semibold text-slate-300">{text}</p><ul className="mt-3 space-y-2">{points.map((point) => <li key={point} className="flex gap-2 text-xs font-bold text-slate-200"><FaCheck className="mt-0.5 shrink-0 text-[#EEBA2B]" />{point}</li>)}</ul></article>)}</div></div>
      </section>

      <section className="border-y border-white/10 bg-black/20 py-9 sm:py-12"><div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:px-8"><article><h2 className="text-2xl font-black text-emerald-300">{copy.validTitle}</h2><ul className="mt-4 grid gap-2">{copy.valid.map((item) => <li key={item} className="flex gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm font-bold"><FaCheck className="mt-0.5 text-emerald-300" />{item}</li>)}</ul></article><article><h2 className="text-2xl font-black text-red-300">{copy.invalidTitle}</h2><ul className="mt-4 grid gap-2">{copy.invalid.map((item) => <li key={item} className="flex gap-2 rounded-lg bg-red-500/10 p-3 text-sm font-bold"><FaTimes className="mt-0.5 text-red-300" />{item}</li>)}</ul></article></div></section>

      {referralCode && <section id="referred-business" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-9 md:px-8 sm:py-12"><div className="rounded-2xl border border-emerald-400/35 bg-emerald-500/10 p-4 sm:p-6"><p className="text-xs font-black uppercase tracking-wider text-emerald-300">Verified referral link</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">{prospectCopy.title}</h2><p className="mt-2 max-w-3xl text-sm font-semibold text-slate-200 sm:text-base">{prospectCopy.lead}</p>
        <form data-analytics-form="prospect_confirmed_referral" onSubmit={handleProspect} className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <input tabIndex={-1} autoComplete="off" className="hidden" value={prospect.websiteConfirmation} onChange={(event) => setProspect({ ...prospect, websiteConfirmation: event.target.value })} />
          <Field label={copy.leadForm.company}><input required className={inputClass} value={prospect.companyName} onChange={(event) => setProspect({ ...prospect, companyName: event.target.value })} /></Field>
          <Field label={copy.leadForm.contact}><input required className={inputClass} value={prospect.contactName} onChange={(event) => setProspect({ ...prospect, contactName: event.target.value })} /></Field>
          <Field label={copy.leadForm.email}><input required type="email" className={inputClass} value={prospect.contactEmail} onChange={(event) => setProspect({ ...prospect, contactEmail: event.target.value })} /></Field>
          <Field label={copy.leadForm.phone}><input className={inputClass} value={prospect.contactPhone} onChange={(event) => setProspect({ ...prospect, contactPhone: event.target.value })} /></Field>
          <Field label={copy.leadForm.website}><input type="url" className={inputClass} value={prospect.website} onChange={(event) => setProspect({ ...prospect, website: event.target.value })} /></Field>
          <Field label={copy.leadForm.service}><select className={inputClass} value={prospect.serviceNeeded} onChange={(event) => setProspect({ ...prospect, serviceNeeded: event.target.value })}>{copy.services.map((service) => <option className="bg-slate-900" key={service}>{service}</option>)}</select></Field>
          <Field label={copy.leadForm.budget}><input className={inputClass} value={prospect.budgetRange} onChange={(event) => setProspect({ ...prospect, budgetRange: event.target.value })} /></Field>
          <Field label={copy.leadForm.need} wide><textarea required rows={4} className={inputClass} value={prospect.needDescription} onChange={(event) => setProspect({ ...prospect, needDescription: event.target.value })} /></Field>
          <label className="cp-referral-check flex gap-2 text-sm font-bold sm:col-span-2"><input required type="checkbox" checked={prospect.contactConsent} onChange={(event) => setProspect({ ...prospect, contactConsent: event.target.checked })} className="mt-1 h-4 w-4 accent-[#EEBA2B]" />{prospectCopy.consent}</label>
          <SubmitButton sending={prospectSending} label={prospectCopy.send} sendingLabel={copy.form.sending} />
        </form>
      </div></section>}

      <section id="join-cprpp" className="mx-auto grid max-w-6xl scroll-mt-28 items-start gap-6 px-4 py-9 md:px-8 lg:grid-cols-[minmax(15rem,.68fr)_minmax(0,1.32fr)] lg:gap-8 sm:py-12"><div><h2 className="text-3xl font-black sm:text-4xl">{copy.applyTitle}</h2><p className="mt-2 text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">{copy.applyLead}</p></div>
        <form data-analytics-form="referral_partner_application" onSubmit={handleApplication} className="grid gap-3 rounded-2xl border border-white/15 bg-black/30 p-4 backdrop-blur sm:grid-cols-2 sm:gap-4 sm:p-6">
          <input tabIndex={-1} autoComplete="off" className="hidden" value={application.websiteConfirmation} onChange={(event) => setApplication({ ...application, websiteConfirmation: event.target.value })} />
          <Field label={copy.form.name}><input required className={inputClass} value={application.name} onChange={(event) => setApplication({ ...application, name: event.target.value })} /></Field>
          <Field label={copy.form.email}><input required type="email" className={inputClass} value={application.email} onChange={(event) => setApplication({ ...application, email: event.target.value })} /></Field>
          <Field label={copy.form.country}><input required className={inputClass} value={application.country} onChange={(event) => setApplication({ ...application, country: event.target.value })} /></Field>
          <Field label={copy.form.profile}><select className={inputClass} value={application.profileType} onChange={(event) => setApplication({ ...application, profileType: event.target.value })}>{copy.form.profiles.map((option) => <option className="bg-slate-900" key={option}>{option}</option>)}</select></Field>
          <Field label={copy.form.program}><select className={inputClass} value={application.program} onChange={(event) => setApplication({ ...application, program: event.target.value as "referral" | "business" })}><option className="bg-slate-900" value="referral">{copy.form.referral}</option><option className="bg-slate-900" value="business">{copy.form.business}</option></select></Field>
          <Field label={copy.form.website}><input type="url" className={inputClass} value={application.website} onChange={(event) => setApplication({ ...application, website: event.target.value })} /></Field>
          <Field label={copy.form.network} wide><textarea rows={4} className={inputClass} value={application.networkDescription} onChange={(event) => setApplication({ ...application, networkDescription: event.target.value })} /></Field>
          <label className="cp-referral-check flex gap-2 text-sm font-semibold text-slate-200 sm:col-span-2"><input required type="checkbox" checked={application.termsAccepted} onChange={(event) => setApplication({ ...application, termsAccepted: event.target.checked })} className="mt-1 h-4 w-4 accent-[#EEBA2B]" /><span>{copy.form.terms} <a className="font-black text-[#EEBA2B] underline" href={termsPath}>{copy.termsLink}</a></span></label>
          <label className="cp-referral-check flex gap-2 text-sm font-semibold text-slate-300 sm:col-span-2"><input type="checkbox" checked={application.marketingConsent} onChange={(event) => setApplication({ ...application, marketingConsent: event.target.checked })} className="mt-1 h-4 w-4 accent-[#EEBA2B]" />{copy.form.marketing}</label>
          <SubmitButton sending={applicationSending} label={copy.form.send} sendingLabel={copy.form.sending} />
        </form>
      </section>

      <section id="submit-referral" className="scroll-mt-28 border-y border-white/10 bg-black/20 py-9 sm:py-12"><div className="mx-auto max-w-6xl px-4 md:px-8"><h2 className="text-3xl font-black sm:text-4xl">{copy.leadTitle}</h2><p className="mt-2 max-w-3xl text-sm font-semibold text-slate-300 sm:text-base">{copy.leadLead}</p>
        {!partnerAccess.accessSecret ? <div className="mt-5 max-w-3xl rounded-xl border border-[#EEBA2B]/30 bg-[#EEBA2B]/10 p-4 text-sm font-bold"><FaShieldAlt className="mb-2 text-xl text-[#EEBA2B]" />{copy.leadLocked}</div> : <form data-analytics-form="referral_lead" onSubmit={handleLead} className="mt-5 grid gap-3 rounded-2xl border border-[#EEBA2B]/30 bg-black/30 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6">
          <div className="rounded-lg bg-[#EEBA2B]/10 p-3 text-sm font-black text-[#ffee00] sm:col-span-2">Partner ID: {partnerAccess.partnerId}</div>
          <input tabIndex={-1} autoComplete="off" className="hidden" value={lead.websiteConfirmation} onChange={(event) => setLead({ ...lead, websiteConfirmation: event.target.value })} />
          <Field label={copy.leadForm.company}><input required className={inputClass} value={lead.companyName} onChange={(event) => setLead({ ...lead, companyName: event.target.value })} /></Field>
          <Field label={copy.leadForm.contact}><input required className={inputClass} value={lead.contactName} onChange={(event) => setLead({ ...lead, contactName: event.target.value })} /></Field>
          <Field label={copy.leadForm.email}><input type="email" className={inputClass} value={lead.contactEmail} onChange={(event) => setLead({ ...lead, contactEmail: event.target.value })} /></Field>
          <Field label={copy.leadForm.phone}><input className={inputClass} value={lead.contactPhone} onChange={(event) => setLead({ ...lead, contactPhone: event.target.value })} /></Field>
          <Field label={copy.leadForm.website}><input type="url" className={inputClass} value={lead.website} onChange={(event) => setLead({ ...lead, website: event.target.value })} /></Field>
          <Field label={copy.leadForm.service}><select className={inputClass} value={lead.serviceNeeded} onChange={(event) => setLead({ ...lead, serviceNeeded: event.target.value })}>{copy.services.map((service) => <option className="bg-slate-900" key={service}>{service}</option>)}</select></Field>
          <Field label={copy.leadForm.budget}><input className={inputClass} value={lead.budgetRange} onChange={(event) => setLead({ ...lead, budgetRange: event.target.value })} /></Field>
          <Field label={copy.leadForm.relationship}><select className={inputClass} value={lead.relationship} onChange={(event) => setLead({ ...lead, relationship: event.target.value })}>{copy.leadForm.relationships.map((option) => <option className="bg-slate-900" key={option}>{option}</option>)}</select></Field>
          <Field label={copy.leadForm.need} wide><textarea required rows={4} className={inputClass} value={lead.needDescription} onChange={(event) => setLead({ ...lead, needDescription: event.target.value })} /></Field>
          <Field label={copy.leadForm.consent}><select className={inputClass} value={lead.consentStatus} onChange={(event) => setLead({ ...lead, consentStatus: event.target.value as "agreed" | "not_yet" })}><option className="bg-slate-900" value="agreed">{copy.leadForm.consentYes}</option><option className="bg-slate-900" value="not_yet">{copy.leadForm.consentNo}</option></select></Field>
          <Field label={copy.leadForm.intro}><select className={inputClass} value={lead.introductionMethod} onChange={(event) => setLead({ ...lead, introductionMethod: event.target.value })}>{copy.leadForm.intros.map((option) => <option className="bg-slate-900" key={option}>{option}</option>)}</select></Field>
          <Field label={copy.leadForm.introDetails} wide><textarea rows={3} className={inputClass} value={lead.introductionDetails} onChange={(event) => setLead({ ...lead, introductionDetails: event.target.value })} /></Field>
          <SubmitButton sending={leadSending} label={copy.leadForm.send} sendingLabel={copy.leadForm.sending} />
        </form>}
      </div></section>

      <section id="strategic-partnerships" className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-9 md:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-8 sm:py-12"><div><FaHandshake className="text-3xl text-[#EEBA2B]" /><h2 className="mt-3 text-3xl font-black sm:text-4xl">{copy.strategicTitle}</h2><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">{copy.strategicLead}</p><ul className="mt-5 space-y-2">{copy.strategicPoints.map((point) => <li className="flex gap-2 text-sm font-bold" key={point}><FaCheck className="mt-0.5 text-[#EEBA2B]" />{point}</li>)}</ul></div>
        <form data-analytics-form="strategic_partnership" onSubmit={handleStrategic} className="grid gap-3 rounded-2xl border border-white/15 bg-black/30 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6"><h3 className="text-xl font-black sm:col-span-2">{copy.strategicFormTitle}</h3><Field label={copy.form.name}><input required className={inputClass} value={strategic.name} onChange={(event) => setStrategic({ ...strategic, name: event.target.value })} /></Field><Field label={copy.leadForm.company}><input className={inputClass} value={strategic.company} onChange={(event) => setStrategic({ ...strategic, company: event.target.value })} /></Field><Field label={copy.form.email}><input required type="email" className={inputClass} value={strategic.email} onChange={(event) => setStrategic({ ...strategic, email: event.target.value })} /></Field><Field label={copy.leadForm.phone}><input className={inputClass} value={strategic.phone} onChange={(event) => setStrategic({ ...strategic, phone: event.target.value })} /></Field><Field label={copy.leadForm.need} wide><textarea required rows={5} className={inputClass} value={strategic.message} onChange={(event) => setStrategic({ ...strategic, message: event.target.value })} /></Field><SubmitButton sending={strategicSending} label={copy.strategicFormTitle} sendingLabel={copy.form.sending} /></form>
      </section>

      <section className="border-t border-white/10 bg-black/20 py-9 sm:py-12"><div className="mx-auto max-w-6xl px-4 md:px-8"><h2 className="text-3xl font-black sm:text-4xl">{copy.faqTitle}</h2><div className="mt-5 grid items-start gap-2 lg:grid-cols-2">{copy.faq.map((item) => <details key={item.question} className="rounded-xl border border-white/15 bg-black/25 p-4"><summary className="cursor-pointer list-none pr-6 text-sm font-black sm:text-base">{item.question}</summary><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-300">{item.answer}</p></details>)}</div><a href={termsPath} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#EEBA2B] underline">{copy.termsLink}<FaArrowRight /></a></div></section>
    </main>
  </PageLayout>;
}

const Field = ({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) => <label className={`cp-referral-field block min-w-0 ${wide ? "sm:col-span-2" : ""}`}><span className={labelClass}>{label}</span>{children}</label>;
const SubmitButton = ({ sending, label, sendingLabel }: { sending: boolean; label: string; sendingLabel: string }) => <button disabled={sending} className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 justify-self-start rounded-full bg-[#ffee00] px-6 text-sm font-black text-black disabled:opacity-60 sm:col-span-2 sm:w-auto sm:min-w-[15rem]">{sending ? sendingLabel : label}<FaPaperPlane /></button>;
