import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Globe2,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEO/SEOHead";
import poetaImage from "../assets/poeta.jpeg";
import {
  auditToolContentFr,
  homeContentFr,
  servicePageContentFr,
} from "../data/siteContent";
import { serviceSummariesFr } from "../data/services";
import "./RefontePreviewPage.css";

const proofPoints = [
  {
    icon: Search,
    title: "Google",
    body: "Vos services, vos horaires et vos contacts doivent etre faciles a trouver.",
  },
  {
    icon: MapPin,
    title: "Maps",
    body: "Vos profils locaux doivent dire la meme chose que votre site.",
  },
  {
    icon: MessageCircle,
    title: "Voix",
    body: "Un client peut chercher en parlant a son telephone ou dans sa voiture.",
  },
  {
    icon: Bot,
    title: "IA",
    body: "Des outils comme ChatGPT ou Perplexity ont besoin d'informations claires.",
  },
];

const reassurance = [
  "On peut commencer meme si vous n'avez pas encore de site.",
  "On peut refondre une presence existante sans tout jeter.",
  "On garde Google Maps, Instagram et Facebook quand ils sont utiles.",
  "On construit une base que vous controlez vraiment.",
];

const visibleWithoutJargon = [
  {
    label: "Votre offre",
    text: "ce que vous faites, pour qui, et dans quel contexte",
  },
  {
    label: "Vos informations",
    text: "adresse, horaires, langues, contact, zone desservie",
  },
  {
    label: "Vos preuves",
    text: "avis, realisations, questions frequentes, garanties",
  },
  {
    label: "Vos chemins de contact",
    text: "telephone, formulaire, WhatsApp, rendez-vous ou devis",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Creativa Poeta",
  url: "https://creativapoeta.com",
  description:
    "Creativa Poeta aide les entreprises a etre plus faciles a trouver, comprendre et contacter dans Google, les maps, les recherches vocales et les moteurs IA.",
  serviceType: [
    "Visibilite digitale",
    "Creation de site web",
    "Refonte de site web",
    "Presence locale",
    "Contenu de marque",
  ],
};

const RefontePreviewPage = () => {
  const siteService = servicePageContentFr["ai-ready-websites"];
  const visibilityService = servicePageContentFr["ai-visibility"];

  return (
    <main className="refonte-page">
      <SEOHead
        title={homeContentFr.metadata.title}
        description={homeContentFr.metadata.description}
        url="https://creativapoeta.com/refonte"
        image="https://creativapoeta.com/poeta.jpeg"
        locale="fr_BE"
        structuredData={structuredData}
      />

      <section className="refonte-hero">
        <div className="refonte-shell refonte-hero-grid">
          <div className="refonte-hero-copy">
            <p className="refonte-eyebrow">{homeContentFr.hero.eyebrow}</p>
            <h1>{homeContentFr.hero.title}</h1>
            <p className="refonte-lead">{homeContentFr.hero.body}</p>
            <div className="refonte-actions">
              <Link className="refonte-button refonte-button-primary" to={homeContentFr.hero.primaryCta.href}>
                {homeContentFr.hero.primaryCta.label}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="refonte-button refonte-button-secondary" to={homeContentFr.hero.secondaryCta.href}>
                {homeContentFr.hero.secondaryCta.label}
              </Link>
            </div>
            <p className="refonte-trust">{homeContentFr.hero.trustLine}</p>
          </div>

          <div className="refonte-hero-media" aria-label="Creativa Poeta">
            <img src={poetaImage} alt="Creativa Poeta" />
            <div className="refonte-hero-panel">
              <span>Base officielle</span>
              <strong>Site, maps, reseaux et demandes clients alignes</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="refonte-section refonte-section-light">
        <div className="refonte-shell">
          <div className="refonte-section-heading">
            <p className="refonte-eyebrow">Le probleme actuel</p>
            <h2>{homeContentFr.problem.title}</h2>
            <p>{homeContentFr.problem.body}</p>
          </div>
          <div className="refonte-query-list">
            {homeContentFr.problem.examples.map((example) => (
              <blockquote key={example}>{example}</blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="refonte-section">
        <div className="refonte-shell">
          <div className="refonte-section-heading">
            <p className="refonte-eyebrow">Ce qu'il faut aligner</p>
            <h2>{homeContentFr.approach.title}</h2>
            <p>{homeContentFr.approach.body}</p>
          </div>
          <div className="refonte-proof-grid">
            {proofPoints.map((item) => {
              const Icon = item.icon;
              return (
                <article className="refonte-proof" key={item.title}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="refonte-section refonte-split-section">
        <div className="refonte-shell refonte-split">
          <div>
            <p className="refonte-eyebrow">Avec ou sans site aujourd'hui</p>
            <h2>{siteService.hero.title}</h2>
            <p>{siteService.hero.body}</p>
            <p>{siteService.approach.body}</p>
            <div className="refonte-actions">
              <Link className="refonte-button refonte-button-primary" to={siteService.hero.primaryCta.href}>
                {siteService.hero.primaryCta.label}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="refonte-paths">
            {homeContentFr.audiencePaths.map((path) => (
              <article key={path.title}>
                <h3>{path.title}</h3>
                <p>{path.body}</p>
                <Link to={path.cta.href}>
                  {path.cta.label}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="refonte-section refonte-section-light">
        <div className="refonte-shell">
          <div className="refonte-section-heading">
            <p className="refonte-eyebrow">La base que nous construisons</p>
            <h2>Un endroit fiable que vos clients et les moteurs modernes peuvent comprendre.</h2>
            <p>
              Le site ne remplace pas vos reseaux sociaux. Il devient la base officielle
              qui confirme vos informations et renvoie vers les bons chemins de contact.
            </p>
          </div>
          <div className="refonte-info-grid">
            {visibleWithoutJargon.map((item) => (
              <article key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="refonte-section">
        <div className="refonte-shell">
          <div className="refonte-section-heading">
            <p className="refonte-eyebrow">Services</p>
            <h2>Des services presentes comme des resultats, pas comme du jargon.</h2>
            <p>
              Chaque service doit expliquer clairement le probleme du client, ce que nous
              faisons, et ce que cela change pour son entreprise.
            </p>
          </div>
          <div className="refonte-services-grid">
            {serviceSummariesFr.map((service) => (
              <article className="refonte-service" key={service.code}>
                <span>{String(service.priority).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link to={service.slug}>
                  {service.primaryCta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="refonte-section refonte-audit-section">
        <div className="refonte-shell refonte-audit">
          <div>
            <p className="refonte-eyebrow">Premier produit d'appel</p>
            <h2>{auditToolContentFr.hero.title}</h2>
            <p>{auditToolContentFr.hero.body}</p>
            <ul className="refonte-check-list">
              {auditToolContentFr.checks.map((check) => (
                <li key={check.title}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{check.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <form className="refonte-audit-card" id="audit-form">
            <label>
              Votre site ou profil principal
              <input type="url" placeholder="https://..." />
            </label>
            <label>
              Pays ou zone visee
              <input type="text" placeholder="Ex. Bruxelles" />
            </label>
            <label>
              Email
              <input type="email" placeholder="vous@entreprise.com" />
            </label>
            <button type="button">
              Recevoir mon premier diagnostic
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p>{auditToolContentFr.hero.microcopy}</p>
          </form>
        </div>
      </section>

      <section className="refonte-section refonte-section-light">
        <div className="refonte-shell refonte-split">
          <div>
            <p className="refonte-eyebrow">Visibilite moderne</p>
            <h2>{visibilityService.problem.title}</h2>
            <p>{visibilityService.problem.body}</p>
          </div>
          <div className="refonte-reassurance">
            {reassurance.map((item) => (
              <div key={item}>
                <ShieldCheck size={20} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="refonte-final">
        <div className="refonte-shell refonte-final-inner">
          <Globe2 size={34} aria-hidden="true" />
          <h2>{homeContentFr.finalCta.title}</h2>
          <p>{homeContentFr.finalCta.body}</p>
          <div className="refonte-actions">
            <Link className="refonte-button refonte-button-primary" to={homeContentFr.finalCta.primaryCta.href}>
              {homeContentFr.finalCta.primaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="refonte-button refonte-button-secondary" to={homeContentFr.finalCta.secondaryCta.href}>
              {homeContentFr.finalCta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RefontePreviewPage;

