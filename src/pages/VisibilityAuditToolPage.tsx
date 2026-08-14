import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowRight,
  FaCheckCircle,
  FaGlobe,
  FaMapMarkedAlt,
  FaRobot,
  FaSearch,
} from "react-icons/fa";
import PageLayout from "../components/layout/PageLayout";
import InternationalPhoneInput from "../components/forms/InternationalPhoneInput";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { projectForm } from "../APIs/projectForm";
import {
  runTechnicalVisibilityAudit,
  runVisibilityAuditInterpretation,
  TechnicalVisibilityAudit,
  VisibilityInterpretation,
} from "../APIs/visibilityAudit";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../data/marketRuntime";
import { getExampleCity, getExampleEmail, getExampleLanguages, getExampleName, getExamplePhone } from "../utils/localExamples";
import { validateLocalizedForm } from "../utils/localizedFormValidation";

type LocaleKey = "fr" | "en" | "nl" | "kiny";

type AuditForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  website: string;
  hasGoogleProfile: string;
  hasSocial: string;
  infoConsistent: string;
  hasReviews: string;
  languages: string;
  mainGoal: string;
  message: string;
};

type AuditResult = {
  score: number;
  label: string;
  priorities: string[];
};

const initialForm: AuditForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  website: "",
  hasGoogleProfile: "not-sure",
  hasSocial: "not-sure",
  infoConsistent: "not-sure",
  hasReviews: "not-sure",
  languages: "",
  mainGoal: "",
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
    scoreTitle: string;
    scoreText: string;
    fieldsTitle: string;
    contactTitle: string;
    resultTitle: string;
    resultIntro: string;
    submit: string;
    submitting: string;
    startProject: string;
    talk: string;
    labels: Record<keyof AuditForm, string>;
    placeholders: Partial<Record<keyof AuditForm, string>>;
    options: {
      yes: string;
      no: string;
      notSure: string;
      goals: string[];
    };
    scoreLabels: {
      low: string;
      medium: string;
      high: string;
    };
    priorities: {
      website: string;
      maps: string;
      consistency: string;
      social: string;
      reviews: string;
      languages: string;
      ai: string;
    };
    success: string;
    error: string;
  }
> = {
  fr: {
    seoTitle: "Tester ma visibilité | Creativa Poeta",
    seoDescription:
      "Test rapide de votre visibilité sur Google, maps, réseaux sociaux et outils IA, puis envoi de votre demande a Creativa Poeta.",
    backHome: "Retour à l'accueil",
    eyebrow: "Diagnostic rapide",
    title: "Testez votre visibilité avant de depenser plus.",
    intro:
      "Répondez à quelques questions. Vous obtenez une première lecture et nous recevons les infos pour vous conseiller proprement.",
    scoreTitle: "Ce que le test regarde",
    scoreText:
      "Site, Google Maps, cohérence des infos, réseaux, avis, langues et lisibilite pour les outils modernes.",
    fieldsTitle: "Votre présence actuelle",
    contactTitle: "Pour recevoir le retour",
    resultTitle: "Premiere lecture",
    resultIntro: "Ce score reste indicatif. Il sert à savoir par où commencer.",
    submit: "Tester et envoyer",
    submitting: "Envoi...",
    startProject: "Démarrer un projet",
    talk: "Parler a CP",
    labels: {
      name: "Votre nom",
      email: "Email",
      phone: "Téléphone",
      company: "Entreprise ou activité",
      city: "Ville / zone",
      website: "Site web ou page officielle",
      hasGoogleProfile: "Google Maps / fiche Google",
      hasSocial: "Réseaux sociaux actifs",
      infoConsistent: "Infos cohérentes partout",
      hasReviews: "Avis clients visibles",
      languages: "Langues importantes",
      mainGoal: "Objectif principal",
      message: "Precision utile",
    },
    placeholders: {
      name: "John Doe",
      email: "vous@email.com",
      phone: "+32 ...",
      company: "Nom de votre activité",
      city: "Bruxelles",
      website: "https://...",
      languages: "français, néerlandais, anglais...",
      message: "Ajoutez ce que vous voulez qu'on verifie en priorite.",
    },
    options: {
      yes: "Oui",
      no: "Non",
      notSure: "Je ne sais pas",
      goals: [
        "Être trouvé sur Google",
        "Améliorer Google Maps",
        "Clarifier mes services",
        "Être mieux compris par les IA",
        "Verifier toute ma présence",
      ],
    },
    scoreLabels: {
      low: "Présence fragile",
      medium: "Base correcte, a renforcer",
      high: "Présence solide",
    },
    priorities: {
      website: "Créer ou clarifier une page officielle qui explique vos services.",
      maps: "Mettre en place ou corriger votre fiche Google Maps.",
      consistency: "Aligner nom, horaires, contacts, zones et services partout.",
      social: "Rendre au moins un canal social propre et utile.",
      reviews: "Faire apparaître des avis ou preuves de confiance.",
      languages: "Preciser les langues importantes pour vos clients.",
      ai: "Structurer vos informations sous forme de réponses simples.",
    },
    success: "Test envoyé. Votre demande est dans l'espace admin.",
    error: "Impossible d'envoyer le test pour le moment.",
  },
  en: {
    seoTitle: "Test my visibility | Creativa Poeta",
    seoDescription:
      "Quick visibility test for Google, maps, social profiles and AI tools, then send your request to Creativa Poeta.",
    backHome: "Back home",
    eyebrow: "Quick diagnosis",
    title: "Test your visibility before spending more.",
    intro:
      "Answer a few questions. You get a first reading and we receive the details to advise you properly.",
    scoreTitle: "What the test checks",
    scoreText:
      "Website, Google Maps, information consistency, social profiles, reviews, languages and readability for modern tools.",
    fieldsTitle: "Your current présence",
    contactTitle: "To receive feedback",
    resultTitle: "First reading",
    resultIntro: "This score is indicative. It helps define where to start.",
    submit: "Test and send",
    submitting: "Sending...",
    startProject: "Start a project",
    talk: "Talk to CP",
    labels: {
      name: "Your name",
      email: "Email",
      phone: "Phone",
      company: "Business or activity",
      city: "City / area",
      website: "Website or official page",
      hasGoogleProfile: "Google Maps / Google profile",
      hasSocial: "Active social profiles",
      infoConsistent: "Information consistent everywhere",
      hasReviews: "Visible client reviews",
      languages: "Important languages",
      mainGoal: "Main goal",
      message: "Useful detail",
    },
    placeholders: {
      name: "John Doe",
      email: "you@email.com",
      phone: "+32 ...",
      company: "Business name",
      city: "Brussels",
      website: "https://...",
      languages: "French, Dutch, English...",
      message: "Add what you want us to check first.",
    },
    options: {
      yes: "Yes",
      no: "No",
      notSure: "Not sure",
      goals: [
        "Be found on Google",
        "Improve Google Maps",
        "Clarify my services",
        "Be understood by AI tools",
        "Review my full présence",
      ],
    },
    scoreLabels: {
      low: "Fragile présence",
      medium: "Good base, needs work",
      high: "Solid présence",
    },
    priorities: {
      website: "Create or clarify an official page explaining your services.",
      maps: "Create or fix your Google Maps profile.",
      consistency: "Align name, hours, contacts, areas and services everywhere.",
      social: "Make at least one social channel clean and useful.",
      reviews: "Show reviews or trust signals.",
      languages: "Clarify the important languages for your clients.",
      ai: "Structure your information as clear answers.",
    },
    success: "Test sent. Your request is in the admin space.",
    error: "Could not send the test right now.",
  },
  nl: {
    seoTitle: "Mijn zichtbaarheid testen | Creativa Poeta",
    seoDescription:
      "Snelle zichtbaarheidstest voor Google, maps, sociale profielen en AI-tools, daarna sturen we uw aanvraag naar Creativa Poeta.",
    backHome: "Terug naar home",
    eyebrow: "Snelle diagnose",
    title: "Test uw zichtbaarheid voordat u meer uitgeeft.",
    intro:
      "Beantwoord enkele vragen. U krijgt een eerste beeld en wij ontvangen de info om u goed te adviseren.",
    scoreTitle: "Wat de test bekijkt",
    scoreText:
      "Website, Google Maps, consistente info, sociale profielen, reviews, talen en leesbaarheid voor moderne tools.",
    fieldsTitle: "Uw huidige aanwezigheid",
    contactTitle: "Om feedback te ontvangen",
    resultTitle: "Eerste lezing",
    resultIntro: "Deze score is indicatief. Ze helpt bepalen waar te beginnen.",
    submit: "Testen en verzenden",
    submitting: "Verzenden...",
    startProject: "Project starten",
    talk: "Praat met CP",
    labels: {
      name: "Uw naam",
      email: "Email",
      phone: "Telefoon",
      company: "Bedrijf of activitéit",
      city: "Stad / regio",
      website: "Website of officiele pagina",
      hasGoogleProfile: "Google Maps / Google-profiel",
      hasSocial: "Actieve sociale profielen",
      infoConsistent: "Info overal consistent",
      hasReviews: "Zichtbare klantreviews",
      languages: "Belangrijke talen",
      mainGoal: "Hoofddoel",
      message: "Nuttige toelichting",
    },
    placeholders: {
      name: "John Doe",
      email: "u@email.com",
      phone: "+32 ...",
      company: "Naam van uw activitéit",
      city: "Amsterdam",
      website: "https://...",
      languages: "Frans, Nederlands, Engels...",
      message: "Voeg toe wat we eerst moeten contrôleren.",
    },
    options: {
      yes: "Ja",
      no: "Nee",
      notSure: "Ik weet het niet",
      goals: [
        "Vindbaar zijn op Google",
        "Google Maps verbeteren",
        "Mijn diensten verduidelijken",
        "Beter begrepen worden door AI",
        "Mijn volledige aanwezigheid nakijken",
      ],
    },
    scoreLabels: {
      low: "Kwetsbare aanwezigheid",
      medium: "Goede basis, te versterken",
      high: "Sterke aanwezigheid",
    },
    priorities: {
      website: "Maak of verduidelijk een officiele pagina met uw diensten.",
      maps: "Maak of corrigeer uw Google Maps-profiel.",
      consistency: "Stem naam, uren, contact, regio en diensten overal af.",
      social: "Maak minstens een sociaal kanaal proper en nuttig.",
      reviews: "Toon reviews of vertrouwenssignalen.",
      languages: "Bepaal de belangrijke talen voor uw klanten.",
      ai: "Structureer uw info als eenvoudige antwoorden.",
    },
    success: "Test verzonden. Uw aanvraag staat in de adminruimte.",
    error: "De test kon nu niet worden verzonden.",
  },
  kiny: {
    seoTitle: "Reba uko ugaragara | Creativa Poeta",
    seoDescription:
      "Isuzuma ryihuse rya Google, maps, social media na AI tools, hanyuma wohereze icyifuzo kuri Creativa Poeta.",
    backHome: "Subira ahabanza",
    eyebrow: "Isuzuma ryihuse",
    title: "Reba uko ugaragara mbere yo gushora byinshi.",
    intro:
      "Subiza ibibazo bike. Ubona igitekerezo cya mbere, natwe tukabona amakuru yo kukugira inama.",
    scoreTitle: "Ibyo isuzuma rireba",
    scoreText:
      "Website, Google Maps, amakuru ahuye, social media, reviews, indimi n'uko AI tools zigukuramo amakuru.",
    fieldsTitle: "Uko ugaragara ubu",
    contactTitle: "Kugira ngo tubagusubize",
    resultTitle: "Igitekerezo cya mbere",
    resultIntro: "Iyi score ni intangiriro yo kumenya aho mwatangirira.",
    submit: "Suzuma no kohereza",
    submitting: "Kohereza...",
    startProject: "Tangira umushinga",
    talk: "Vugana na CP",
    labels: {
      name: "Izina ryawe",
      email: "Email",
      phone: "Telefone",
      company: "Business cyangwa igikorwa",
      city: "Umujyi / akarere",
      website: "Website cyangwa page officiel",
      hasGoogleProfile: "Google Maps / Google profile",
      hasSocial: "Social media zikora",
      infoConsistent: "Amakuru ahuye hose",
      hasReviews: "Reviews zigaragara",
      languages: "Indimi z'ingenzi",
      mainGoal: "Intego nyamukuru",
      message: "Icyo mwongeraho",
    },
    placeholders: {
      name: "John Doe",
      email: "wowe@email.com",
      phone: "+250 ...",
      company: "Izina rya business",
      city: "Kigali",
      website: "https://...",
      languages: "Kinyarwanda, français, English...",
      message: "Andika icyo wifuza ko tubanza kureba.",
    },
    options: {
      yes: "Yego",
      no: "Oya",
      notSure: "Simbizi",
      goals: [
        "Kuboneka kuri Google",
        "Gukosora Google Maps",
        "Gusobanura serivisi",
        "Kumvikana kuri AI tools",
        "Kureba présence yose",
      ],
    },
    scoreLabels: {
      low: "Presence ifite intege nke",
      medium: "Hari ishingiro, rikeneye gukomera",
      high: "Presence ikomeye",
    },
    priorities: {
      website: "Kora cyangwa usobanure page officiel ya serivisi zawe.",
      maps: "Kora cyangwa ukosore Google Maps profile.",
      consistency: "Huza izina, amasaha, contacts, aho ukorera na serivisi hose.",
      social: "Tunganya nibura social channel imwe.",
      reviews: "Garagaza reviews cyangwa ibimenyetso by'icyizere.",
      languages: "Sobanura indimi z'ingenzi ku bakiriya.",
      ai: "Tegura amakuru yawe nk'ibisubizo byoroshye.",
    },
    success: "Isuzuma ryoherejwe. Ryageze muri admin.",
    error: "Kohereza isuzuma ntibikunze ubu.",
  },
};

const yesNoFields: Array<keyof AuditForm> = [
  "hasGoogleProfile",
  "hasSocial",
  "infoConsistent",
  "hasReviews",
];

function getResult(form: AuditForm, copy: (typeof copies)[LocaleKey]): AuditResult {
  let score = 15;
  const priorities: string[] = [];

  if (form.website.trim()) score += 18;
  else priorities.push(copy.priorities.website);

  if (form.hasGoogleProfile === "yes") score += 18;
  else priorities.push(copy.priorities.maps);

  if (form.infoConsistent === "yes") score += 14;
  else priorities.push(copy.priorities.consistency);

  if (form.hasSocial === "yes") score += 10;
  else priorities.push(copy.priorities.social);

  if (form.hasReviews === "yes") score += 10;
  else priorities.push(copy.priorities.reviews);

  if (form.languages.trim()) score += 8;
  else priorities.push(copy.priorities.languages);

  if (form.mainGoal.includes("AI") || form.mainGoal.includes("IA")) score += 7;
  else priorities.push(copy.priorities.ai);

  const finalScore = Math.min(100, score);
  const label =
    finalScore >= 76
      ? copy.scoreLabels.high
      : finalScore >= 46
      ? copy.scoreLabels.medium
      : copy.scoreLabels.low;

  return {
    score: finalScore,
    label,
    priorities: priorities.slice(0, 3),
  };
}

function combineAuditResults(
  questionnaire: AuditResult,
  technical: TechnicalVisibilityAudit | null,
  copy: (typeof copies)[LocaleKey]
): AuditResult {
  if (!technical) return questionnaire;

  const score = Math.round(technical.score * 0.7 + questionnaire.score * 0.3);
  const label =
    score >= 76
      ? copy.scoreLabels.high
      : score >= 46
      ? copy.scoreLabels.medium
      : copy.scoreLabels.low;

  return {
    score,
    label,
    priorities: Array.from(
      new Set([...technical.priorities, ...questionnaire.priorities])
    ).slice(0, 5),
  };
}

const technicalCopy = {
  fr: {
    title: "Diagnostic technique",
    unavailable:
      "Le diagnostic technique n'a pas pu être réalisé. Le score affiché repose uniquement sur vos réponses.",
    status: "Statut HTTP",
    response: "Temps de reponse",
    details: "Voir les contrôles",
  },
  en: {
    title: "Technical diagnosis",
    unavailable:
      "The technical diagnosis could not be completed. The displayed score is based only on your answers.",
    status: "HTTP status",
    response: "Response time",
    details: "View checks",
  },
  nl: {
    title: "Technische diagnose",
    unavailable:
      "De technische diagnose kon niet worden uitgevoerd. De getoonde score is alleen gebaseerd op je antwoorden.",
    status: "HTTP-status",
    response: "Reactietijd",
    details: "Controles bekijken",
  },
  kiny: {
    title: "Isuzuma rya tekiniki",
    unavailable:
      "Isuzuma rya tekiniki ntiryashobotse. Amanota agaragara ashingiye gusa ku bisubizo byawe.",
    status: "HTTP status",
    response: "Igihe cyo gusubiza",
    details: "Reba igenzura",
  },
} satisfies Record<LocaleKey, Record<string, string>>;

type TechnicalResultProps = {
  audit: TechnicalVisibilityAudit | null;
  error: string;
  locale: LocaleKey;
  compact?: boolean;
};

const TechnicalResult = ({
  audit,
  error,
  locale,
  compact = false,
}: TechnicalResultProps) => {
  const labels = technicalCopy[locale] ?? technicalCopy.fr;

  if (error) {
    return (
      <div className="mt-3 rounded-xl border border-amber-400/45 bg-amber-400/10 px-3 py-2 text-xs font-bold leading-5 text-amber-100">
        {labels.unavailable}
        <span className="mt-1 block text-[10px] text-white/50">{error}</span>
      </div>
    );
  }

  if (!audit) return null;

  return (
    <details className="mt-3 rounded-xl border border-white/15 bg-[#071a33]/75 px-3 py-2 text-white">
      <summary className="cursor-pointer list-none text-xs font-black text-[#fff200]">
        {labels.title}: {audit.score}/100
        <span className="ml-2 text-[10px] text-white/55">
          {labels.details}
        </span>
      </summary>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-bold text-white/70">
        <span>
          {labels.status}: {audit.http.status}
        </span>
        <span>
          {labels.response}: {audit.http.responseTimeMs} ms
        </span>
      </div>
      <ul className={`mt-3 grid gap-2 ${compact ? "" : "tablet:grid-cols-2"}`}>
        {audit.checks.map((check) => (
          <li
            key={check.id}
            className={`rounded-lg border px-2 py-2 text-[10px] font-bold leading-4 ${
              check.passed
                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                : "border-amber-400/30 bg-amber-400/10 text-amber-100"
            }`}
          >
            <span className="mr-1">{check.passed ? "OK" : "!"}</span>
            {check.label}: {check.detail}
          </li>
        ))}
      </ul>
    </details>
  );
};

const requestInterpretation = async (
  form: AuditForm,
  result: AuditResult,
  technical: TechnicalVisibilityAudit | null,
  locale: LocaleKey
) => {
  const response = await runVisibilityAuditInterpretation({
    locale,
    finalScore: result.score,
    goal: form.mainGoal,
    company: form.company,
    city: form.city,
    languages: form.languages,
    signals: {
      googleProfile: form.hasGoogleProfile,
      social: form.hasSocial,
      consistentInfo: form.infoConsistent,
      reviews: form.hasReviews,
    },
    technical: technical
      ? {
          score: technical.score,
          verdict: technical.verdict,
          failedChecks: technical.checks
            .filter((check) => !check.passed)
            .map((check) => ({
              label: check.label,
              detail: check.detail,
              priority: check.priority,
              weight: check.weight,
            })),
          passedChecks: technical.checks
            .filter((check) => check.passed)
            .map((check) => check.label),
        }
      : null,
  });

  return response.interprétation;
};

const interprétationCopy = {
  fr: {
    title: "Analyse personnalisée",
    ai: "IA",
    rules: "Synthese automatique",
    strengths: "Points d'appui",
    actions: "Plan d'action prioritaire",
  },
  en: {
    title: "Personalized analysis",
    ai: "AI",
    rules: "Automatic summary",
    strengths: "Strengths",
    actions: "Priority action plan",
  },
  nl: {
    title: "Persoonlijke analyse",
    ai: "AI",
    rules: "Automatische samenvatting",
    strengths: "Sterke punten",
    actions: "Prioritair actieplan",
  },
  kiny: {
    title: "Isesengura ryihariye",
    ai: "AI",
    rules: "Incamake yikora",
    strengths: "Ibyiza bihari",
    actions: "Ibikorwa by'ingenzi",
  },
} satisfies Record<LocaleKey, Record<string, string>>;

type InterpretationResultProps = {
  interprétation: VisibilityInterpretation | null;
  locale: LocaleKey;
  compact?: boolean;
};

const InterpretationResult = ({
  interprétation,
  locale,
  compact = false,
}: InterpretationResultProps) => {
  if (!interprétation) return null;
  const labels = interprétationCopy[locale] ?? interprétationCopy.fr;

  return (
    <details
      open={!compact}
      className="mt-3 rounded-xl border border-[#EEBA2B]/40 bg-[#EEBA2B]/10 px-3 py-3"
    >
      <summary className="cursor-pointer list-none">
        <span className="flex items-center justify-between gap-3">
          <span className="text-xs font-black uppercase text-[#fff200]">
            {labels.title}
          </span>
          <span className="rounded-full border border-[#EEBA2B]/40 px-2 py-1 text-[9px] font-black uppercase text-white/70">
            {interprétation.source === "openai" ? labels.ai : labels.rules}
          </span>
        </span>
        <span className="mt-2 block text-sm font-black leading-5 text-white">
          {interprétation.headline}
        </span>
      </summary>

      <p className="mt-3 text-xs font-bold leading-5 text-white/70">
        {interprétation.summary}
      </p>

      {interprétation.strengths.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-black uppercase text-emerald-300">
            {labels.strengths}
          </p>
          <ul className="mt-2 grid gap-1">
            {interprétation.strengths.map((strength) => (
              <li key={strength} className="text-[11px] font-bold text-white/80">
                + {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3">
        <p className="text-[10px] font-black uppercase text-[#fff200]">
          {labels.actions}
        </p>
        <ol className={`mt-2 grid gap-2 ${compact ? "" : "tablet:grid-cols-2"}`}>
          {interprétation.actions.map((action, index) => (
            <li
              key={`${action.title}-${index}`}
              className="rounded-lg border border-white/10 bg-black/20 px-3 py-2"
            >
              <p className="text-[11px] font-black text-white">
                {index + 1}. {action.title}
              </p>
              <p className="mt-1 text-[10px] font-bold leading-4 text-white/60">
                {action.why}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-3 text-[9px] font-bold leading-4 text-white/45">
        {interprétation.caution}
      </p>
    </details>
  );
};

const VisibilityAuditToolPage = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market) as LocaleKey;
  const baseCopy = copies[locale] ?? copies.fr;
  const copy = useMemo(
    () => ({
      ...baseCopy,
      placeholders: {
        ...baseCopy.placeholders,
        name: getExampleName(locale),
        email: getExampleEmail(locale),
        phone: getExamplePhone(market),
        city: getExampleCity(market, locale),
        languages: getExampleLanguages(market, locale),
      },
    }),
    [baseCopy, locale, market]
  );
  const [form, setForm] = useState<AuditForm>(initialForm);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [technicalAudit, setTechnicalAudit] =
    useState<TechnicalVisibilityAudit | null>(null);
  const [technicalError, setTechnicalError] = useState("");
  const [interprétation, setInterpretation] =
    useState<VisibilityInterpretation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const liveResult = useMemo(() => getResult(form, copy), [copy, form]);

  const setField = (field: keyof AuditForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateLocalizedForm(event.currentTarget, locale);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setIsSubmitting(true);
    setTechnicalError("");
    setInterpretation(null);

    let technical: TechnicalVisibilityAudit | null = null;
    let technicalFailure = "";

    if (form.website.trim()) {
      try {
        const response = await runTechnicalVisibilityAudit(form.website);
        technical = response.audit;
        setTechnicalAudit(technical);
      } catch (error) {
        technicalFailure =
          error instanceof Error ? error.message : copy.error;
        setTechnicalAudit(null);
        setTechnicalError(technicalFailure);
      }
    } else {
      setTechnicalAudit(null);
    }

    const questionnaire = getResult(form, copy);
    const computed = combineAuditResults(questionnaire, technical, copy);
    setResult(computed);

    let generatedInterpretation: VisibilityInterpretation | null = null;
    try {
      generatedInterpretation = await requestInterpretation(
        form,
        computed,
        technical,
        locale
      );
      setInterpretation(generatedInterpretation);
    } catch {
      setInterpretation(null);
    }

    try {
      await projectForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        serviceType: "Diagnostic visibilité",
        selectedServices: [
          "Test visibilité",
          form.mainGoal || "Objectif non précise",
          `Score final: ${computed.score}/100 - ${computed.label}`,
          technical
            ? `Score technique: ${technical.score}/100`
            : "Audit technique non disponible",
        ],
        customServiceDescription: [
          `Ville / zone: ${form.city || "Non précisee"}`,
          `Site: ${form.website || "Aucun / non précise"}`,
          `Google Maps: ${form.hasGoogleProfile}`,
          `Réseaux sociaux: ${form.hasSocial}`,
          `Infos cohérentes: ${form.infoConsistent}`,
          `Avis clients: ${form.hasReviews}`,
          `Langues: ${form.languages || "Non précisees"}`,
          technical ? `URL finale: ${technical.finalUrl}` : "",
          technical
            ? `Reponse du site: HTTP ${technical.http.status} en ${technical.http.responseTimeMs} ms`
            : "",
          technicalFailure ? `Erreur audit technique: ${technicalFailure}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        customServiceNeeds: [
          ...computed.priorities,
          ...(generatedInterpretation?.actions.map(
            (action) => `${action.title}: ${action.why}`
          ) ?? []),
        ].join("\n"),
        serviceSpecificOtherDescription: [
          generatedInterpretation
            ? `Analyse personnalisée (${generatedInterpretation.source}): ${generatedInterpretation.headline}\n${generatedInterpretation.summary}`
            : "",
          technical
            ? technical.checks
                .filter((check) => !check.passed)
                .map((check) => `${check.label}: ${check.detail}`)
                .join("\n")
            : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
        additionalInfo: form.message,
      });
      toast.success(copy.success);
    } catch {
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
        keywords="test visibilité, audit Google Maps, visibilité locale, ChatGPT, Creativa Poeta"
        path="/tester-visibilite"
      />

      <MobileVisibilityAudit copy={copy} locale={locale} />

      <main className="relative isolate hidden min-h-screen overflow-hidden px-4 pb-16 pt-28 text-white phone:px-6 tablet:px-10 laptop:block laptop:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(238,186,43,.18),transparent_32rem),linear-gradient(145deg,#071a33,#020609_72%)]" />
        <div className="absolute inset-0 -z-10 opacity-[.08] [background-image:linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="mx-auto max-w-7xl">
          <Link
            to={localizePath("/")}
            className="mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white/75 transition hover:text-[#fff200]"
          >
            <span>&lt;</span>
            {copy.backHome}
          </Link>

          <section className="grid gap-5 laptop:grid-cols-[.82fr_1.18fr] laptop:items-start">
            <aside className="rounded-[1.7rem] border border-[#EEBA2B]/35 bg-black/25 p-5 shadow-2xl backdrop-blur-md phone:p-7 laptop:sticky laptop:top-24">
              <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[.18em] text-[#fff200]">
                <span className="h-4 w-8 skew-x-[-14deg] bg-[#EEBA2B]" />
                {copy.eyebrow}
              </div>
              <h1 className="font-['Black_Ops_One'] text-3xl leading-tight text-white phone:text-5xl laptop:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-white/80 phone:text-base">
                {copy.intro}
              </p>

              <div className="mt-6 rounded-[1.3rem] border border-white/15 bg-[#071a33]/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEBA2B] text-[#071a33]">
                    <FaSearch />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-[#fff200]">
                      {copy.scoreTitle}
                    </h2>
                    <p className="mt-1 text-xs font-bold leading-5 text-white/70">
                      {copy.scoreText}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase text-white/55">
                      Score live
                    </p>
                    <p className="font-['Black_Ops_One'] text-5xl text-[#fff200]">
                      {liveResult.score}
                    </p>
                  </div>
                  <p className="rounded-full border border-[#EEBA2B]/45 px-3 py-2 text-right text-xs font-black uppercase text-white">
                    {liveResult.label}
                  </p>
                </div>
              </div>
            </aside>

            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-[1.7rem] border border-white/20 bg-white/[.06] p-4 shadow-2xl backdrop-blur-md phone:p-6"
            >
              <div className="mb-5 flex items-center gap-3 text-lg font-black text-[#fff200]">
                <FaGlobe />
                <h2>{copy.fieldsTitle}</h2>
              </div>

              <div className="grid gap-3 tablet:grid-cols-2">
                <Field
                  label={copy.labels.company}
                  value={form.company}
                  placeholder={copy.placeholders.company}
                  onChange={(value) => setField("company", value)}
                  required
                />
                <Field
                  label={copy.labels.city}
                  value={form.city}
                  placeholder={copy.placeholders.city}
                  onChange={(value) => setField("city", value)}
                />
                <Field
                  label={copy.labels.website}
                  value={form.website}
                  placeholder={copy.placeholders.website}
                  onChange={(value) => setField("website", value)}
                />
                <Field
                  label={copy.labels.languages}
                  value={form.languages}
                  placeholder={copy.placeholders.languages}
                  onChange={(value) => setField("languages", value)}
                />
              </div>

              <div className="mt-4 grid gap-3 tablet:grid-cols-2">
                {yesNoFields.map((field) => (
                  <ToggleGroup
                    key={field}
                    label={copy.labels[field]}
                    value={form[field]}
                    yes={copy.options.yes}
                    no={copy.options.no}
                    notSure={copy.options.notSure}
                    onChange={(value) => setField(field, value)}
                  />
                ))}
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-black uppercase text-white/75">
                  {copy.labels.mainGoal}
                </label>
                <div className="grid gap-2 phone:grid-cols-2">
                  {copy.options.goals.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setField("mainGoal", goal)}
                      className={`flex min-h-[3rem] items-center justify-between rounded-full border px-4 py-2 text-left text-xs font-black transition ${
                        form.mainGoal === goal
                          ? "border-[#fff200] bg-[#EEBA2B] text-[#071a33]"
                          : "border-white/20 bg-white/10 text-white hover:border-[#EEBA2B]"
                      }`}
                    >
                      <span>{goal}</span>
                      {form.mainGoal === goal ? <FaCheckCircle /> : <FaRobot />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-white/15 pt-5">
                <div className="mb-4 flex items-center gap-3 text-lg font-black text-[#fff200]">
                  <FaMapMarkedAlt />
                  <h2>{copy.contactTitle}</h2>
                </div>
                <div className="grid gap-3 tablet:grid-cols-2">
                  <Field
                    label={copy.labels.name}
                    value={form.name}
                    placeholder={copy.placeholders.name}
                    onChange={(value) => setField("name", value)}
                    required
                  />
                  <Field
                    label={copy.labels.email}
                    value={form.email}
                    type="email"
                    placeholder={copy.placeholders.email}
                    onChange={(value) => setField("email", value)}
                    required
                  />
                  <label className="block min-w-0">
                    <span className="mb-2 block text-xs font-black uppercase text-white/75">{copy.labels.phone}</span>
                    <InternationalPhoneInput value={form.phone} onChange={(value) => setField("phone", value)} locale={locale} defaultCountry={market.countryCode} placeholder={copy.placeholders.phone} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase text-white/75">
                      {copy.labels.message}
                    </span>
                    <textarea
                      value={form.message}
                      onChange={(event) => setField("message", event.target.value)}
                      placeholder={copy.placeholders.message}
                      rows={3}
                      className="min-h-[6.2rem] w-full rounded-2xl border border-white/20 bg-[#071a33]/80 px-4 py-3 text-sm font-bold text-white outline-none transition placeholder:text-white/40 focus:border-[#fff200]"
                    />
                  </label>
                </div>
              </div>

              {result ? (
                <div className="mt-5 rounded-[1.35rem] border border-[#EEBA2B]/45 bg-black/25 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase text-white/60">
                        {copy.resultTitle}
                      </p>
                      <p className="mt-1 text-2xl font-black text-[#fff200]">
                        {result.score}/100 - {result.label}
                      </p>
                    </div>
                    <FaCheckCircle className="text-3xl text-[#EEBA2B]" />
                  </div>
                  <p className="mt-3 text-xs font-bold leading-5 text-white/70">
                    {copy.resultIntro}
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {result.priorities.map((priority) => (
                      <li
                        key={priority}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold leading-5 text-white/85"
                      >
                        {priority}
                      </li>
                    ))}
                  </ul>
                  <InterpretationResult
                    interprétation={interprétation}
                    locale={locale}
                  />
                  <TechnicalResult
                    audit={technicalAudit}
                    error={technicalError}
                    locale={locale}
                  />
                </div>
              ) : null}

              <div className="mt-6 grid grid-cols-2 gap-2 phone:gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cp-one-line-button inline-flex min-w-0 items-center justify-center gap-2 rounded-full border-2 border-[#fff200] bg-[#fff200] px-3 py-4 text-[11px] font-black uppercase leading-tight text-[#071a33] transition hover:bg-transparent hover:text-[#fff200] disabled:cursor-not-allowed disabled:opacity-60 phone:text-sm"
                >
                  <span className="cp-one-line-label">
                    {isSubmitting ? copy.submitting : copy.submit}
                  </span>
                  <FaArrowRight className="flex-none" />
                </button>
                <Link
                  to={localizePath("/start-project")}
                  className="cp-one-line-button inline-flex min-w-0 items-center justify-center rounded-full border-2 border-white px-3 py-4 text-center text-[11px] font-black uppercase leading-tight text-white transition hover:border-[#fff200] hover:text-[#fff200] phone:text-sm"
                >
                  {copy.startProject}
                </Link>
              </div>
            </form>
          </section>
        </div>
      </main>
    </PageLayout>
  );
};

type FieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

const Field = ({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: FieldProps) => (
  <label className="block">
    <span className="mb-2 block text-xs font-black uppercase text-white/75">
      {label}
    {required ? <span className="ml-1 text-[#fff200]" aria-hidden="true">*</span> : null}
    </span>
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="h-14 w-full rounded-2xl border border-white/20 bg-[#071a33]/80 px-4 text-sm laptop:h-12 font-bold text-white outline-none transition placeholder:text-white/40 focus:border-[#fff200]"
    />
  </label>
);

type ToggleGroupProps = {
  label: string;
  value: string;
  yes: string;
  no: string;
  notSure: string;
  onChange: (value: string) => void;
};

const ToggleGroup = ({
  label,
  value,
  yes,
  no,
  notSure,
  onChange,
}: ToggleGroupProps) => {
  const options = [
    { value: "yes", label: yes },
    { value: "no", label: no },
    { value: "not-sure", label: notSure },
  ];

  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase text-white/75">{label}</p>
      <div className="grid grid-cols-3 gap-1 rounded-full border border-white/15 bg-black/20 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`min-h-[3rem] rounded-full px-2 text-[11px] laptop:min-h-[2.35rem] laptop:text-[10px] font-black uppercase leading-tight transition ${
              value === option.value
                ? "bg-[#EEBA2B] text-[#071a33]"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

type MobileVisibilityAuditProps = {
  copy: (typeof copies)[LocaleKey];
  locale: LocaleKey;
};

const MobileVisibilityAudit = ({ copy, locale }: MobileVisibilityAuditProps) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AuditForm>(initialForm);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [technicalAudit, setTechnicalAudit] =
    useState<TechnicalVisibilityAudit | null>(null);
  const [technicalError, setTechnicalError] = useState("");
  const [interprétation, setInterpretation] =
    useState<VisibilityInterpretation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const labels = locale === "nl" ? ["Aanwezigheid", "Signalen", "Contact"] : locale === "en" ? ["Presence", "Signals", "Contact"] : locale === "kiny" ? ["Presence", "Ibimenyetso", "Contact"] : ["Presence", "Signaux", "Contact"];
  const back = locale === "nl" ? "Terug" : locale === "en" ? "Back" : "Retour";
  const next = locale === "nl" ? "Verder" : locale === "en" ? "Continue" : "Continuer";
  const setField = (field: keyof AuditForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

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
    setTechnicalError("");
    setInterpretation(null);

    let technical: TechnicalVisibilityAudit | null = null;
    let technicalFailure = "";

    if (form.website.trim()) {
      try {
        const response = await runTechnicalVisibilityAudit(form.website);
        technical = response.audit;
        setTechnicalAudit(technical);
      } catch (error) {
        technicalFailure =
          error instanceof Error ? error.message : copy.error;
        setTechnicalAudit(null);
        setTechnicalError(technicalFailure);
      }
    } else {
      setTechnicalAudit(null);
    }

    const questionnaire = getResult(form, copy);
    const computed = combineAuditResults(questionnaire, technical, copy);
    setResult(computed);

    let generatedInterpretation: VisibilityInterpretation | null = null;
    try {
      generatedInterpretation = await requestInterpretation(
        form,
        computed,
        technical,
        locale
      );
      setInterpretation(generatedInterpretation);
    } catch {
      setInterpretation(null);
    }

    try {
      await projectForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        serviceType: "Diagnostic visibilité",
        selectedServices: [
          "Test visibilité",
          form.mainGoal || "Objectif non précise",
          `Score final: ${computed.score}/100 - ${computed.label}`,
          technical
            ? `Score technique: ${technical.score}/100`
            : "Audit technique non disponible",
        ],
        customServiceDescription: [
          `Ville / zone: ${form.city || "Non précisee"}`,
          `Site: ${form.website || "Aucun"}`,
          `Google Maps: ${form.hasGoogleProfile}`,
          `Réseaux sociaux: ${form.hasSocial}`,
          `Infos cohérentes: ${form.infoConsistent}`,
          `Avis clients: ${form.hasReviews}`,
          `Langues: ${form.languages || "Non précisees"}`,
          technical ? `URL finale: ${technical.finalUrl}` : "",
          technical
            ? `Reponse du site: HTTP ${technical.http.status} en ${technical.http.responseTimeMs} ms`
            : "",
          technicalFailure ? `Erreur audit technique: ${technicalFailure}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        customServiceNeeds: [
          ...computed.priorities,
          ...(generatedInterpretation?.actions.map(
            (action) => `${action.title}: ${action.why}`
          ) ?? []),
        ].join("\n"),
        serviceSpecificOtherDescription: [
          generatedInterpretation
            ? `Analyse personnalisée (${generatedInterpretation.source}): ${generatedInterpretation.headline}\n${generatedInterpretation.summary}`
            : "",
          technical
            ? technical.checks
                .filter((check) => !check.passed)
                .map((check) => `${check.label}: ${check.detail}`)
                .join("\n")
            : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
        additionalInfo: form.message,
      });
      toast.success(copy.success);
    } catch {
      toast.error(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#071a33] p-3 text-white laptop:hidden">
      <form noValidate onSubmit={submit} className="flex min-h-[calc(100dvh-1.5rem)] flex-col rounded-[1.4rem] border border-white/20 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-2">
          <Link to={localizePath("/")} className="text-[10px] font-black uppercase text-white/65">&lt; {copy.backHome}</Link>
          <button type="button" onClick={closeForm} aria-label={copy.backHome} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-xl font-black text-white">X</button>
        </div>
        <div className="mt-3 flex justify-center gap-2">
            {labels.map((label, index) => { const number = index + 1; return (
              <button key={label} type="button" onClick={() => setStep(number)} className={`h-8 rounded-full border text-[9px] font-black uppercase ${step === number ? "border-[#fff200] bg-[#fff200] px-2 text-[#071a33]" : "w-8 border-white/20 bg-white/10 text-white/70"}`}>
                {step === number ? `${number} ${label}` : number}
              </button>
            ); })}
          </div>

        <div className="mt-6 flex-1">
          {step === 1 && <section>
            <h1 className="mb-5 text-2xl font-black text-[#fff200]">{copy.fieldsTitle}</h1>
            <div className="grid gap-4">
              <Field label={copy.labels.company} value={form.company} placeholder={copy.placeholders.company} onChange={(value) => setField("company", value)} />
              <Field label={copy.labels.city} value={form.city} placeholder={copy.placeholders.city} onChange={(value) => setField("city", value)} />
              <Field label={copy.labels.website} value={form.website} placeholder={copy.placeholders.website} onChange={(value) => setField("website", value)} />
              <Field label={copy.labels.languages} value={form.languages} placeholder={copy.placeholders.languages} onChange={(value) => setField("languages", value)} />
            </div>
          </section>}

          {step === 2 && <section>
            <h1 className="mb-5 text-2xl font-black text-[#fff200]">{labels[1]}</h1>
            <div className="grid gap-3">
              {yesNoFields.map((field) => <ToggleGroup key={field} label={copy.labels[field]} value={form[field]} yes={copy.options.yes} no={copy.options.no} notSure={copy.options.notSure} onChange={(value) => setField(field, value)} />)}
            </div>
            <p className="mb-2 mt-3 text-[9px] font-black uppercase text-white/70">{copy.labels.mainGoal}</p>
            <div className="grid grid-cols-2 gap-2">
              {copy.options.goals.map((goal) => <button key={goal} type="button" onClick={() => setField("mainGoal", goal)} className={`min-h-[3.5rem] rounded-2xl border px-3 py-3 text-left text-[11px] font-black leading-tight ${form.mainGoal === goal ? "border-[#fff200] bg-[#EEBA2B] text-[#071a33]" : "border-white/20 bg-white/10"}`}>{goal}</button>)}
            </div>
          </section>}

          {step === 3 && <section>
            <h1 className="mb-5 text-2xl font-black text-[#fff200]">{copy.contactTitle}</h1>
            <div className="grid gap-4">
              <Field label={copy.labels.name} value={form.name} placeholder={copy.placeholders.name} onChange={(value) => setField("name", value)} required />
              <Field label={copy.labels.email} value={form.email} type="email" placeholder={copy.placeholders.email} onChange={(value) => setField("email", value)} required />
              <label className="block min-w-0">
                <span className="mb-2 block text-xs font-black uppercase text-white/75">{copy.labels.phone}</span>
                <InternationalPhoneInput value={form.phone} onChange={(value) => setField("phone", value)} locale={locale} defaultCountry={getCurrentMarket().countryCode} placeholder={copy.placeholders.phone} />
              </label>
              <label><span className="mb-2 block text-xs font-black uppercase text-white/75">{copy.labels.message}</span><textarea value={form.message} onChange={(event) => setField("message", event.target.value)} placeholder={copy.placeholders.message} rows={3} className="min-h-[6rem] w-full rounded-2xl border border-white/20 bg-[#071a33]/80 px-3 py-2 text-xs font-bold text-white outline-none placeholder:text-white/40" /></label>
            </div>
            {result && (
              <div className="mt-3 rounded-2xl border border-[#EEBA2B]/50 bg-black/25 p-3">
                <p className="text-lg font-black text-[#fff200]">
                  {result.score}/100 - {result.label}
                </p>
                <p className="text-[9px] font-bold text-white/60">
                  {copy.resultIntro}
                </p>
                <InterpretationResult
                  interprétation={interprétation}
                  locale={locale}
                  compact
                />
                <TechnicalResult
                  audit={technicalAudit}
                  error={technicalError}
                  locale={locale}
                  compact
                />
              </div>
            )}
          </section>}
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
          <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1} className="rounded-full border-2 border-white py-4 text-xs font-black uppercase disabled:opacity-25">{back}</button>
          {step < 3 ? <button type="button" onClick={() => setStep((current) => Math.min(3, current + 1))} className="rounded-full border-2 border-[#fff200] bg-[#fff200] py-4 text-xs font-black uppercase text-[#071a33]">{next} &gt;</button> : <button type="submit" disabled={isSubmitting} className="rounded-full border-2 border-[#fff200] bg-[#fff200] py-4 text-xs font-black uppercase text-[#071a33] disabled:opacity-50">{isSubmitting ? copy.submitting : copy.submit}</button>}
        </div>
      </form>
    </main>
  );
};

export default VisibilityAuditToolPage;


