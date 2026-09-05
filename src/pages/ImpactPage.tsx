import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Church,
  CircleDollarSign,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Loader2,
  LockKeyhole,
  Mail,
  Palette,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/impact/impact-hero.webp";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { getCurrentLocale, localizePath } from "../data/marketRuntime";
import impactLocale, { type ImpactLanguage } from "../i18n/ImpactLocale";
import { projectForm } from "../APIs/projectForm";
import "./ImpactPage.css";

const audienceIcons = [HeartHandshake, Church, GraduationCap, UsersRound, Palette, Leaf];
const promiseIcons = [Sparkles, CircleDollarSign, HeartHandshake, LockKeyhole];

type ImpactFormState = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  country: string;
  organization: string;
  organizationType: string;
  mission: string;
  beneficiaries: string;
  verification: string;
  needs: string[];
  problem: string;
  result: string;
  deadline: string;
  externalCosts: string;
  representationConsent: boolean;
  selectionConsent: boolean;
  privacyConsent: boolean;
};

const initialForm: ImpactFormState = {
  firstName: "",
  lastName: "",
  role: "",
  email: "",
  phone: "",
  country: "",
  organization: "",
  organizationType: "",
  mission: "",
  beneficiaries: "",
  verification: "",
  needs: [],
  problem: "",
  result: "",
  deadline: "",
  externalCosts: "",
  representationConsent: false,
  selectionConsent: false,
  privacyConsent: false,
};

const resolveLanguage = (): ImpactLanguage => {
  const locale = getCurrentLocale();
  return locale === "fr" || locale === "nl" ? locale : "en";
};

const ImpactPage = () => {
  const language = resolveLanguage();
  const copy = impactLocale[language];
  const formCopy = copy.form;
  const [activeSolution, setActiveSolution] = useState(0);
  const [criteriaOpen, setCriteriaOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formOpen, setFormOpen] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [form, setForm] = useState<ImpactFormState>(initialForm);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeSolutionCopy = copy.solutions[activeSolution];
  const privacyPath = localizePath("/confidentialite-cookies");

  const seo = useMemo(() => {
    if (language === "fr") {
      return {
        title: "Creativa Poeta Impact | Une Pierre de Plus",
        description:
          "Creativa Poeta accompagne associations, églises, ONG et projets à impact avec une première solution numérique gratuite ou à tarif solidaire.",
        keywords:
          "Creativa Poeta Impact, pro bono numérique, site association, outil numérique ONG, aide digitale église, Belgique, Rwanda",
      };
    }
    if (language === "nl") {
      return {
        title: "Creativa Poeta Impact | Digitale hulp voor projecten",
        description:
          "Creativa Poeta helpt verenigingen, kerken, ngo's en impactprojecten met een eerste digitale oplossing, gratis of aan sociaal tarief.",
        keywords:
          "Creativa Poeta Impact, digitale hulp vereniging, website vzw, digitale oplossing ngo, België, Rwanda",
      };
    }
    return {
      title: "Creativa Poeta Impact | Digital skills for good",
      description:
        "Creativa Poeta supports charities, churches, NGOs and impact projects with a first digital solution, free or at a solidarity rate.",
      keywords:
        "Creativa Poeta Impact, pro bono digital support, charity website, NGO digital tools, Belgium, Rwanda",
    };
  }, [language]);

  useEffect(() => {
    if (!formOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) setFormOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [formOpen, submitting]);

  const openApplication = () => {
    setFormOpen(true);
    setFormError("");
  };

  const closeApplication = () => {
    if (submitting) return;
    setFormOpen(false);
  };

  const toggleNeed = (need: string) => {
    setForm((current) => ({
      ...current,
      needs: current.needs.includes(need)
        ? current.needs.filter((item) => item !== need)
        : [...current.needs, need],
    }));
  };

  const validateCurrentStep = () => {
    if (
      formStep === 0 &&
      (!form.firstName ||
        !form.lastName ||
        !form.role ||
        !form.email ||
        !/^\S+@\S+\.\S+$/.test(form.email) ||
        !form.phone ||
        !form.country ||
        !form.organization ||
        !form.organizationType)
    ) {
      setFormError(formCopy.required);
      return false;
    }
    if (formStep === 1 && (!form.mission || !form.beneficiaries)) {
      setFormError(formCopy.required);
      return false;
    }
    if (formStep === 2 && form.needs.length === 0) {
      setFormError(formCopy.needsRequired);
      return false;
    }
    if (
      formStep === 2 &&
      (!form.problem ||
        !form.result ||
        !form.externalCosts ||
        !form.representationConsent ||
        !form.selectionConsent ||
        !form.privacyConsent)
    ) {
      setFormError(formCopy.required);
      return false;
    }
    setFormError("");
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    setFormStep((current) => Math.min(current + 1, 2));
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateCurrentStep()) return;

    setSubmitting(true);
    setFormError("");
    try {
      await projectForm({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.organization.trim(),
        serviceType: "Creativa Poeta Impact — Une Pierre de Plus",
        selectedServices: form.needs,
        customServiceDescription: form.problem.trim(),
        customServiceNeeds: form.result.trim(),
        serviceSpecificOtherDescription: form.mission.trim(),
        additionalInfo: [
          `Type d'organisation: ${form.organizationType}`,
          `Fonction du contact: ${form.role}`,
          `Pays: ${form.country}`,
          `Bénéficiaires: ${form.beneficiaries}`,
          `Vérification: ${form.verification || "Non renseignée"}`,
          `Échéance: ${form.deadline || "Non renseignée"}`,
          `Frais externes: ${form.externalCosts}`,
          "Consentements: représentation autorisée, sélection non garantie, réponse à la demande autorisée.",
        ].join("\n"),
        locale: language,
      });
      setSubmitted(true);
      setForm(initialForm);
      setFormStep(0);
    } catch {
      setFormError(formCopy.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout className="impact-page">
      <MarketSEOHead
        {...seo}
        path="/impact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Creativa Poeta Impact",
          description: seo.description,
          provider: {
            "@type": "Organization",
            name: "Creativa Poeta",
            url: "https://creativapoeta.com",
          },
          serviceType: "Digital support for social impact projects",
          areaServed: ["Belgium", "Rwanda"],
        }}
      />

      <main>
        <section className="impact-hero">
          <div className="impact-hero__glow impact-hero__glow--one" />
          <div className="impact-hero__glow impact-hero__glow--two" />
          <div className="impact-shell impact-hero__grid">
            <div className="impact-hero__content">
              <div className="impact-kicker impact-kicker--light">
                <span>{copy.eyebrow}</span>
                <span className="impact-kicker__dot" />
                <span>{copy.program}</span>
              </div>
              <h1>
                {copy.title}
                <span>{copy.titleAccent}</span>
              </h1>
              <p className="impact-hero__intro">{copy.intro}</p>
              <div className="impact-hero__actions">
                <button type="button" className="impact-button impact-button--primary" onClick={openApplication}>
                  {copy.apply}
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <a className="impact-button impact-button--ghost" href="#programme">
                  {copy.discover}
                </a>
              </div>
              <ul className="impact-trust" aria-label={copy.trust.join(", ")}>
                {copy.trust.map((item) => (
                  <li key={item}>
                    <Check size={14} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="impact-hero__visual">
              <img
                src={heroImage}
                alt="Une équipe associative collabore autour d’un projet numérique"
                width="1774"
                height="887"
              />
              <div className="impact-hero__card">
                <HeartHandshake size={22} aria-hidden="true" />
                <p>{copy.capacity}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="impact-section impact-why" id="programme">
          <div className="impact-shell impact-why__grid">
            <div>
              <p className="impact-eyebrow">{copy.whyEyebrow}</p>
              <h2>{copy.whyTitle}</h2>
            </div>
            <div className="impact-why__body">
              <p>{copy.whyBody}</p>
              <div className="impact-frictions">
                {copy.frictions.map((item, index) => (
                  <div key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="impact-section impact-audience">
          <div className="impact-shell">
            <div className="impact-heading impact-heading--center">
              <p className="impact-eyebrow">{copy.audienceEyebrow}</p>
              <h2>{copy.audienceTitle}</h2>
              <p>{copy.audienceIntro}</p>
            </div>
            <div className="impact-audience__grid">
              {copy.audiences.map((item, index) => {
                const Icon = audienceIcons[index];
                return (
                  <article key={item.title} className="impact-audience__card">
                    <span className="impact-icon"><Icon size={22} aria-hidden="true" /></span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="impact-section impact-solutions">
          <div className="impact-shell impact-solutions__layout">
            <div className="impact-heading">
              <p className="impact-eyebrow">{copy.solutionsEyebrow}</p>
              <h2>{copy.solutionsTitle}</h2>
              <p>{copy.solutionsIntro}</p>
            </div>
            <div className="impact-solutions__explorer">
              <div className="impact-solutions__tabs" role="tablist" aria-label={copy.solutionsEyebrow}>
                {copy.solutions.map((solution, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeSolution === index}
                    key={solution.title}
                    onClick={() => setActiveSolution(index)}
                  >
                    <span>0{index + 1}</span>
                    {solution.title}
                  </button>
                ))}
              </div>
              <article className="impact-solutions__panel" role="tabpanel">
                <p className="impact-solutions__summary">{activeSolutionCopy.summary}</p>
                <ul>
                  {activeSolutionCopy.items.map((item) => (
                    <li key={item}><CheckCircle2 size={18} aria-hidden="true" />{item}</li>
                  ))}
                </ul>
                {activeSolutionCopy.note ? (
                  <p className="impact-solutions__note"><ShieldCheck size={18} aria-hidden="true" />{activeSolutionCopy.note}</p>
                ) : null}
              </article>
            </div>
          </div>
        </section>

        <section className="impact-section impact-promise">
          <div className="impact-shell">
            <div className="impact-heading impact-heading--center impact-heading--light">
              <p className="impact-eyebrow">{copy.promiseEyebrow}</p>
              <h2>{copy.promiseTitle}</h2>
              <p>{copy.promiseIntro}</p>
            </div>
            <div className="impact-promise__grid">
              {copy.promises.map((item, index) => {
                const Icon = promiseIcons[index];
                return (
                  <article key={item.title} className="impact-promise__card">
                    <Icon size={24} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <ul>{item.items.map((detail) => <li key={detail}><Check size={14} />{detail}</li>)}</ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="impact-section impact-process">
          <div className="impact-shell">
            <div className="impact-heading">
              <p className="impact-eyebrow">{copy.processEyebrow}</p>
              <h2>{copy.processTitle}</h2>
            </div>
            <ol className="impact-process__steps">
              {copy.process.map((step, index) => (
                <li key={step.title}>
                  <span>{index + 1}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="impact-section impact-selection">
          <div className="impact-shell">
            <div className="impact-selection__top">
              <div className="impact-heading">
                <p className="impact-eyebrow">{copy.selectionEyebrow}</p>
                <h2>{copy.selectionTitle}</h2>
                <p>{copy.selectionIntro}</p>
              </div>
              <button
                type="button"
                className="impact-button impact-button--dark-outline"
                onClick={() => setCriteriaOpen((current) => !current)}
                aria-expanded={criteriaOpen}
              >
                {criteriaOpen ? copy.hideCriteria : copy.showCriteria}
                <ChevronDown className={criteriaOpen ? "is-rotated" : ""} size={18} aria-hidden="true" />
              </button>
            </div>
            {criteriaOpen ? (
              <div className="impact-selection__grid">
                {copy.selectionGroups.map((group) => (
                  <article key={group.title} data-tone={group.tone}>
                    <h3>{group.title}</h3>
                    <ul>{group.items.map((item) => <li key={item}><span />{item}</li>)}</ul>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="impact-section impact-examples">
          <div className="impact-shell">
            <div className="impact-heading impact-heading--center">
              <p className="impact-eyebrow">{copy.examplesEyebrow}</p>
              <h2>{copy.examplesTitle}</h2>
              <p>{copy.examplesNote}</p>
            </div>
            <div className="impact-examples__grid">
              {copy.examples.map((item, index) => (
                <article key={item.title}>
                  <span className="impact-examples__number">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <div><small>{copy.problemLabel}</small><p>{item.problem}</p></div>
                  <div><small>{copy.solutionLabel}</small><p>{item.solution}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="impact-section impact-faq">
          <div className="impact-shell impact-faq__layout">
            <div className="impact-heading">
              <p className="impact-eyebrow">{copy.faqEyebrow}</p>
              <h2>{copy.faqTitle}</h2>
              <button type="button" className="impact-button impact-button--primary" onClick={openApplication}>
                {copy.apply}<ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="impact-faq__list">
              {copy.faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={item.question} className={isOpen ? "is-open" : ""}>
                    <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                      <span>{item.question}</span><ChevronDown size={19} aria-hidden="true" />
                    </button>
                    {isOpen ? <p>{item.answer}</p> : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="impact-final">
          <div className="impact-shell impact-final__box">
            <div>
              <p className="impact-eyebrow">Creativa Poeta Impact</p>
              <h2>{copy.finalTitle}</h2>
              <p>{copy.finalText}</p>
            </div>
            <div className="impact-final__actions">
              <button type="button" className="impact-button impact-button--primary" onClick={openApplication}>
                {copy.apply}<ArrowRight size={18} aria-hidden="true" />
              </button>
              <a className="impact-button impact-button--dark-outline" href="mailto:contact@creativapoeta.com?subject=Demande%20%E2%80%94%20Creativa%20Poeta%20Impact">
                <Mail size={18} aria-hidden="true" />{copy.emailTeam}
              </a>
            </div>
          </div>
          <p className="impact-final__disclaimer">{copy.disclaimer}</p>
        </section>
      </main>

      {formOpen ? (
        <div className="impact-modal" role="dialog" aria-modal="true" aria-labelledby="impact-form-title">
          <button type="button" className="impact-modal__backdrop" aria-label={formCopy.close} onClick={closeApplication} />
          <div className="impact-modal__panel">
            <button type="button" className="impact-modal__close" onClick={closeApplication} aria-label={formCopy.close}>
              <X size={21} aria-hidden="true" />
            </button>

            {submitted ? (
              <div className="impact-success">
                <span><CheckCircle2 size={36} aria-hidden="true" /></span>
                <p className="impact-eyebrow">Creativa Poeta Impact</p>
                <h2>{formCopy.successTitle}</h2>
                <p>{formCopy.successText}</p>
                <p className="impact-success__note">{formCopy.successNote}</p>
                <button type="button" className="impact-button impact-button--primary" onClick={() => { setSubmitted(false); closeApplication(); }}>
                  {formCopy.closeSuccess}
                </button>
              </div>
            ) : (
              <form onSubmit={submitApplication} noValidate>
                <div className="impact-modal__header">
                  <p className="impact-eyebrow">{formCopy.eyebrow}</p>
                  <h2 id="impact-form-title">{formCopy.title}</h2>
                  <p>{formCopy.intro}</p>
                </div>

                <div className="impact-form__progress">
                  {formCopy.steps.map((label, index) => (
                    <div key={label} className={index <= formStep ? "is-active" : ""}>
                      <span>{index + 1}</span><small>{label}</small>
                    </div>
                  ))}
                </div>
                <p className="impact-form__step-label">{formCopy.step} {formStep + 1} / 3</p>

                {formStep === 0 ? (
                  <div className="impact-form__grid">
                    <label>{formCopy.firstName}<input required autoFocus value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} /></label>
                    <label>{formCopy.lastName}<input required value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} /></label>
                    <label>{formCopy.role}<input required value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} /></label>
                    <label>{formCopy.email}<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
                    <label>{formCopy.phone}<input required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
                    <label>{formCopy.country}<input required value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} /></label>
                    <label className="impact-form__wide">{formCopy.organization}<input required value={form.organization} onChange={(event) => setForm({ ...form, organization: event.target.value })} /></label>
                    <label className="impact-form__wide">{formCopy.organizationType}<select required value={form.organizationType} onChange={(event) => setForm({ ...form, organizationType: event.target.value })}><option value="" />{formCopy.organizationTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
                  </div>
                ) : null}

                {formStep === 1 ? (
                  <div className="impact-form__grid">
                    <label className="impact-form__wide">{formCopy.mission}<textarea required rows={4} value={form.mission} onChange={(event) => setForm({ ...form, mission: event.target.value })} /></label>
                    <label className="impact-form__wide">{formCopy.beneficiaries}<textarea required rows={3} value={form.beneficiaries} onChange={(event) => setForm({ ...form, beneficiaries: event.target.value })} /></label>
                    <label className="impact-form__wide">{formCopy.verification}<input type="url" placeholder="https://" value={form.verification} onChange={(event) => setForm({ ...form, verification: event.target.value })} /></label>
                  </div>
                ) : null}

                {formStep === 2 ? (
                  <div className="impact-form__grid">
                    <fieldset className="impact-form__wide impact-form__needs">
                      <legend>{formCopy.needs}</legend>
                      <div>{formCopy.needOptions.map((need) => <label key={need} className={form.needs.includes(need) ? "is-checked" : ""}><input type="checkbox" checked={form.needs.includes(need)} onChange={() => toggleNeed(need)} /><span><Check size={14} /></span>{need}</label>)}</div>
                    </fieldset>
                    <label className="impact-form__wide">{formCopy.problem}<textarea required rows={3} value={form.problem} onChange={(event) => setForm({ ...form, problem: event.target.value })} /></label>
                    <label className="impact-form__wide">{formCopy.result}<textarea required rows={3} value={form.result} onChange={(event) => setForm({ ...form, result: event.target.value })} /></label>
                    <label>{formCopy.deadline}<input value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} /></label>
                    <label>{formCopy.externalCosts}<select required value={form.externalCosts} onChange={(event) => setForm({ ...form, externalCosts: event.target.value })}><option value="" />{formCopy.externalCostOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
                    <div className="impact-form__wide impact-form__consents">
                      <label><input type="checkbox" checked={form.representationConsent} onChange={(event) => setForm({ ...form, representationConsent: event.target.checked })} /><span />{formCopy.representationConsent}</label>
                      <label><input type="checkbox" checked={form.selectionConsent} onChange={(event) => setForm({ ...form, selectionConsent: event.target.checked })} /><span />{formCopy.selectionConsent}</label>
                      <label><input type="checkbox" checked={form.privacyConsent} onChange={(event) => setForm({ ...form, privacyConsent: event.target.checked })} /><span />{formCopy.privacyConsent} <Link to={privacyPath} target="_blank">{formCopy.privacyLink}</Link></label>
                    </div>
                  </div>
                ) : null}

                {formError ? <p className="impact-form__error" role="alert">{formError}</p> : null}

                <div className="impact-form__actions">
                  {formStep > 0 ? <button type="button" className="impact-button impact-button--dark-outline" onClick={() => { setFormStep((current) => current - 1); setFormError(""); }}><ChevronLeft size={18} />{formCopy.previous}</button> : <span />}
                  {formStep < 2 ? <button type="button" className="impact-button impact-button--primary" onClick={nextStep}>{formCopy.next}<ArrowRight size={18} /></button> : <button type="submit" className="impact-button impact-button--primary" disabled={submitting}>{submitting ? <Loader2 className="impact-spinner" size={18} /> : <ArrowRight size={18} />}{submitting ? formCopy.submitting : formCopy.submit}</button>}
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </PageLayout>
  );
};

export default ImpactPage;
