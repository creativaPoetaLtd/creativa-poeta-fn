import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, Check, CheckCircle2, ChevronDown, ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import educationImage from "../assets/impact/impact-education.webp";
import ImpactProgramNav from "../components/impact/ImpactProgramNav";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { projectForm } from "../APIs/projectForm";
import { getCurrentLocale, localizePath } from "../data/marketRuntime";
import impactLocale, { type ImpactLanguage } from "../i18n/ImpactLocale";
import "./ImpactProgram.css";

type FormState = {
  firstName: string; lastName: string; role: string; email: string; phone: string; country: string;
  organization: string; organizationType: string; mission: string; beneficiaries: string; verification: string;
  needs: string[]; problem: string; result: string; deadline: string; externalCosts: string;
  representationConsent: boolean; selectionConsent: boolean; privacyConsent: boolean;
};
type FieldName = keyof FormState;
type FieldErrors = Partial<Record<FieldName, string>>;

const initialForm: FormState = { firstName: "", lastName: "", role: "", email: "", phone: "", country: "", organization: "", organizationType: "", mission: "", beneficiaries: "", verification: "", needs: [], problem: "", result: "", deadline: "", externalCosts: "", representationConsent: false, selectionConsent: false, privacyConsent: false };
const getLanguage = (): ImpactLanguage => { const value = getCurrentLocale(); return value === "fr" || value === "nl" ? value : "en"; };
const sideCopy = {
  fr: { title: "Présentez-nous la mission, pas un cahier des charges.", text: "Nous avons besoin de comprendre votre action, votre public et le problème concret. Aucun vocabulaire technique n’est nécessaire.", note: "Chaque demande est étudiée par notre équipe. Si votre projet correspond au programme, nous vous recontactons pour définir ensemble la première solution utile.", back: "Retour au programme" },
  en: { title: "Tell us about the mission, not a specification document.", text: "We need to understand your work, your audience and the practical problem. No technical language is required.", note: "Every request is reviewed by our team. If your project fits the program, we will contact you to define the first useful solution together.", back: "Back to the program" },
  nl: { title: "Vertel ons over de missie, niet over een lastenboek.", text: "We willen uw werk, uw publiek en het concrete probleem begrijpen. Technische taal is niet nodig.", note: "Elke aanvraag wordt door ons team beoordeeld. Past uw project bij het programma, dan nemen we contact op om samen de eerste nuttige oplossing te bepalen.", back: "Terug naar het programma" },
};
const validationCopy = {
  fr: { required: "Ce champ est obligatoire.", email: "Cette adresse email n’est pas valide. Utilisez le format nom@organisation.org.", url: "Saisissez une adresse complète commençant par http:// ou https://.", organizationType: "Choisissez un type d’organisation dans la liste.", needs: "Sélectionnez au moins un type d’aide.", externalCosts: "Choisissez une réponse dans la liste.", consent: "Cette confirmation est obligatoire pour envoyer la demande.", select: "Sélectionnez une option", requiredHint: "Les champs marqués d’un astérisque sont obligatoires." },
  en: { required: "This field is required.", email: "This email address is not valid. Use the format name@organization.org.", url: "Enter a complete address beginning with http:// or https://.", organizationType: "Choose an organization type from the list.", needs: "Select at least one type of support.", externalCosts: "Choose an answer from the list.", consent: "This confirmation is required to submit the application.", select: "Select an option", requiredHint: "Fields marked with an asterisk are required." },
  nl: { required: "Dit veld is verplicht.", email: "Dit e-mailadres is niet geldig. Gebruik het formaat naam@organisatie.org.", url: "Vul een volledig adres in dat begint met http:// of https://.", organizationType: "Kies een organisatietype uit de lijst.", needs: "Selecteer minstens één type ondersteuning.", externalCosts: "Kies een antwoord uit de lijst.", consent: "Deze bevestiging is verplicht om de aanvraag te verzenden.", select: "Kies een optie", requiredHint: "Velden met een sterretje zijn verplicht." },
};

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const ImpactApplicationPage = () => {
  const language = getLanguage();
  const formCopy = impactLocale[language].form;
  const aside = sideCopy[language];
  const validation = validationCopy[language];
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends FieldName>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSubmitError("");
  };

  const validate = () => {
    const errors: FieldErrors = {};
    const requireText = (field: FieldName) => { if (!String(form[field] ?? "").trim()) errors[field] = validation.required; };
    if (step === 0) {
      (["firstName", "lastName", "role", "email", "phone", "country", "organization"] as FieldName[]).forEach(requireText);
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = validation.email;
      if (!form.organizationType) errors.organizationType = validation.organizationType;
    }
    if (step === 1) {
      requireText("mission");
      requireText("beneficiaries");
      if (form.verification.trim() && !isValidUrl(form.verification.trim())) errors.verification = validation.url;
    }
    if (step === 2) {
      if (form.needs.length === 0) errors.needs = validation.needs;
      requireText("problem");
      requireText("result");
      if (!form.externalCosts) errors.externalCosts = validation.externalCosts;
      if (!form.representationConsent) errors.representationConsent = validation.consent;
      if (!form.selectionConsent) errors.selectionConsent = validation.consent;
      if (!form.privacyConsent) errors.privacyConsent = validation.consent;
    }
    setFieldErrors(errors);
    const firstInvalid = Object.keys(errors)[0] as FieldName | undefined;
    if (firstInvalid) {
      window.requestAnimationFrame(() => document.getElementById(`impact-${firstInvalid}`)?.focus());
      return false;
    }
    return true;
  };
  const toggleNeed = (need: string) => updateField("needs", form.needs.includes(need) ? form.needs.filter((item) => item !== need) : [...form.needs, need]);
  const next = () => { if (validate()) setStep((current) => Math.min(current + 1, 2)); };
  const requiredLabel = (label: ReactNode) => <span className="impact-form__label">{label}<span className="impact-form__required" aria-hidden="true">*</span></span>;
  const errorFor = (field: FieldName) => fieldErrors[field] ? <span id={`impact-${field}-error`} className="impact-form__field-error" role="alert"><AlertCircle size={15} />{fieldErrors[field]}</span> : null;
  const invalidProps = (field: FieldName) => ({ id: `impact-${field}`, "aria-invalid": Boolean(fieldErrors[field]), "aria-describedby": fieldErrors[field] ? `impact-${field}-error` : undefined, className: fieldErrors[field] ? "is-invalid" : undefined });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true); setSubmitError("");
    try {
      await projectForm({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`, email: form.email.trim(), phone: form.phone.trim(), company: form.organization.trim(),
        serviceType: "Creativa Poeta Impact", selectedServices: form.needs,
        customServiceDescription: form.problem.trim(), customServiceNeeds: form.result.trim(), serviceSpecificOtherDescription: form.mission.trim(),
        additionalInfo: [`Type d'organisation: ${form.organizationType}`, `Fonction du contact: ${form.role}`, `Pays: ${form.country}`, `Bénéficiaires: ${form.beneficiaries}`, `Vérification: ${form.verification || "Non renseignée"}`, `Échéance: ${form.deadline || "Non renseignée"}`, `Frais externes: ${form.externalCosts}`, "Consentements: représentation autorisée, sélection non garantie, réponse à la demande autorisée."].join("\n"),
        locale: language,
      });
      setSubmitted(true); setForm(initialForm); setFieldErrors({}); setStep(0);
    } catch { setSubmitError(formCopy.error); } finally { setSubmitting(false); }
  };

  return (
    <PageLayout className="impact-program">
      <MarketSEOHead title={`${formCopy.title} | Creativa Poeta Impact`} description={formCopy.intro} keywords="apply Creativa Poeta Impact, nonprofit digital support application" path="/impact/candidature" />
      <ImpactProgramNav language={language} />
      <main className="impact-main impact-application">
        <div className="impact-shell impact-application__layout">
          <aside className="impact-application__aside"><p className="impact-kicker">{formCopy.eyebrow}</p><h1>{aside.title}</h1><p>{aside.text}</p><img src={educationImage} alt="Une équipe prépare son projet numérique" width="1600" height="900" /><p><CheckCircle2 size={17} style={{ display: "inline", marginRight: 7, color: "#2659ff" }} />{aside.note}</p><Link className="impact-button impact-button--outline" to={localizePath("/impact")}>{aside.back}</Link></aside>
          <section className="impact-form-card" aria-labelledby="impact-application-title">
            {submitted ? (
              <div className="impact-success"><span><CheckCircle2 size={37} /></span><p className="impact-kicker">Creativa Poeta Impact</p><h2>{formCopy.successTitle}</h2><p>{formCopy.successText}</p><p className="impact-success__note">{formCopy.successNote}</p><Link className="impact-button impact-button--primary" to={localizePath("/impact")}>{formCopy.closeSuccess}</Link></div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="impact-heading"><h2 id="impact-application-title">{formCopy.title}</h2><p>{formCopy.intro}</p></div>
                <div className="impact-form__progress">{formCopy.steps.map((label, index) => <div key={label} className={index <= step ? "is-active" : ""}><span>{index + 1}</span><small>{label}</small></div>)}</div>
                <div className="impact-form__step-meta"><p className="impact-form__step-label">{formCopy.step} {step + 1} / 3</p><p className="impact-form__required-note"><span aria-hidden="true">*</span>{validation.requiredHint}</p></div>

                {step === 0 ? <div className="impact-form__grid">
                  <label>{requiredLabel(formCopy.firstName)}<input {...invalidProps("firstName")} required autoFocus value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} />{errorFor("firstName")}</label>
                  <label>{requiredLabel(formCopy.lastName)}<input {...invalidProps("lastName")} required value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} />{errorFor("lastName")}</label>
                  <label>{requiredLabel(formCopy.role)}<input {...invalidProps("role")} required value={form.role} onChange={(e) => updateField("role", e.target.value)} />{errorFor("role")}</label>
                  <label>{requiredLabel(formCopy.email)}<input {...invalidProps("email")} required type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />{errorFor("email")}</label>
                  <label>{requiredLabel(formCopy.phone)}<input {...invalidProps("phone")} required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />{errorFor("phone")}</label>
                  <label>{requiredLabel(formCopy.country)}<input {...invalidProps("country")} required autoComplete="country-name" value={form.country} onChange={(e) => updateField("country", e.target.value)} />{errorFor("country")}</label>
                  <label className="impact-form__wide">{requiredLabel(formCopy.organization)}<input {...invalidProps("organization")} required autoComplete="organization" value={form.organization} onChange={(e) => updateField("organization", e.target.value)} />{errorFor("organization")}</label>
                  <label className="impact-form__wide">{requiredLabel(formCopy.organizationType)}<span className="impact-form__select"><select {...invalidProps("organizationType")} required value={form.organizationType} onChange={(e) => updateField("organizationType", e.target.value)}><option value="" disabled>{validation.select}</option>{formCopy.organizationTypes.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={20} aria-hidden="true" /></span>{errorFor("organizationType")}</label>
                </div> : null}

                {step === 1 ? <div className="impact-form__grid">
                  <label className="impact-form__wide">{requiredLabel(formCopy.mission)}<textarea {...invalidProps("mission")} required rows={4} value={form.mission} onChange={(e) => updateField("mission", e.target.value)} />{errorFor("mission")}</label>
                  <label className="impact-form__wide">{requiredLabel(formCopy.beneficiaries)}<textarea {...invalidProps("beneficiaries")} required rows={3} value={form.beneficiaries} onChange={(e) => updateField("beneficiaries", e.target.value)} />{errorFor("beneficiaries")}</label>
                  <label className="impact-form__wide"><span className="impact-form__label">{formCopy.verification}</span><input {...invalidProps("verification")} type="url" inputMode="url" placeholder="https://" value={form.verification} onChange={(e) => updateField("verification", e.target.value)} />{errorFor("verification")}</label>
                </div> : null}

                {step === 2 ? <div className="impact-form__grid">
                  <fieldset id="impact-needs" tabIndex={-1} aria-invalid={Boolean(fieldErrors.needs)} aria-describedby={fieldErrors.needs ? "impact-needs-error" : undefined} className={`impact-form__wide impact-form__needs${fieldErrors.needs ? " is-invalid" : ""}`}><legend>{requiredLabel(formCopy.needs)}</legend><div>{formCopy.needOptions.map((need) => <label key={need} className={form.needs.includes(need) ? "is-checked" : ""}><input type="checkbox" checked={form.needs.includes(need)} onChange={() => toggleNeed(need)} /><span><Check size={14} /></span>{need}</label>)}</div>{errorFor("needs")}</fieldset>
                  <label className="impact-form__wide">{requiredLabel(formCopy.problem)}<textarea {...invalidProps("problem")} required rows={3} value={form.problem} onChange={(e) => updateField("problem", e.target.value)} />{errorFor("problem")}</label>
                  <label className="impact-form__wide">{requiredLabel(formCopy.result)}<textarea {...invalidProps("result")} required rows={3} value={form.result} onChange={(e) => updateField("result", e.target.value)} />{errorFor("result")}</label>
                  <label><span className="impact-form__label">{formCopy.deadline}</span><input {...invalidProps("deadline")} value={form.deadline} onChange={(e) => updateField("deadline", e.target.value)} />{errorFor("deadline")}</label>
                  <label>{requiredLabel(formCopy.externalCosts)}<span className="impact-form__select"><select {...invalidProps("externalCosts")} required value={form.externalCosts} onChange={(e) => updateField("externalCosts", e.target.value)}><option value="" disabled>{validation.select}</option>{formCopy.externalCostOptions.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={20} aria-hidden="true" /></span>{errorFor("externalCosts")}</label>
                  <div className="impact-form__wide impact-form__consents">
                    <div><label><input {...invalidProps("representationConsent")} type="checkbox" checked={form.representationConsent} onChange={(e) => updateField("representationConsent", e.target.checked)} /><span>{formCopy.representationConsent}<span className="impact-form__required" aria-hidden="true">*</span></span></label>{errorFor("representationConsent")}</div>
                    <div><label><input {...invalidProps("selectionConsent")} type="checkbox" checked={form.selectionConsent} onChange={(e) => updateField("selectionConsent", e.target.checked)} /><span>{formCopy.selectionConsent}<span className="impact-form__required" aria-hidden="true">*</span></span></label>{errorFor("selectionConsent")}</div>
                    <div><label><input {...invalidProps("privacyConsent")} type="checkbox" checked={form.privacyConsent} onChange={(e) => updateField("privacyConsent", e.target.checked)} /><span>{formCopy.privacyConsent} <Link to={localizePath("/confidentialite-cookies")} target="_blank">{formCopy.privacyLink}</Link><span className="impact-form__required" aria-hidden="true">*</span></span></label>{errorFor("privacyConsent")}</div>
                  </div>
                </div> : null}

                {submitError ? <p className="impact-form__error" role="alert"><AlertCircle size={17} />{submitError}</p> : null}
                <div className="impact-form__actions">
                  {step > 0 ? <button type="button" className="impact-button impact-button--outline" onClick={() => { setStep((value) => value - 1); setFieldErrors({}); setSubmitError(""); }}><ChevronLeft size={18} />{formCopy.previous}</button> : <span />}
                  {step < 2 ? <button type="button" className="impact-button impact-button--primary" onClick={next}>{formCopy.next}<ArrowRight size={18} /></button> : <button type="submit" className="impact-button impact-button--primary" disabled={submitting}>{submitting ? <Loader2 className="impact-spinner" size={18} /> : <ArrowRight size={18} />}{submitting ? formCopy.submitting : formCopy.submit}</button>}
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
    </PageLayout>
  );
};

export default ImpactApplicationPage;
