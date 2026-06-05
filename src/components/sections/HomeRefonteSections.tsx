import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Globe2,
  Languages,
  Link2,
  MapPin,
  MessageCircle,
  MousePointerClick,
  Search,
  ShieldCheck,
  Smartphone,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionScrollButton from "../buttons/SectionScrollButton";
import {
  auditToolContentFr,
  homeContentFr,
  servicePageContentFr,
} from "../../data/siteContent";
import { localizePath } from "../../data/marketRuntime";
import "./HomeRefonteSections.css";

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
    title: "Outils IA",
    body: "Des outils comme ChatGPT ont besoin d'informations claires et coherentes.",
  },
];

const baseItems = [
  {
    icon: Target,
    label: "Votre offre",
    text: "ce que vous faites, pour qui, et dans quel contexte",
  },
  {
    icon: MapPin,
    label: "Vos informations",
    text: "adresse, horaires, langues, contact, zone desservie",
  },
  {
    icon: ShieldCheck,
    label: "Vos preuves",
    text: "avis, realisations, questions frequentes, garanties",
  },
  {
    icon: MousePointerClick,
    label: "Vos chemins de contact",
    text: "telephone, formulaire, WhatsApp, rendez-vous ou devis",
  },
];

const pathIcons = [Building2, Smartphone, Languages];

const reassurance = [
  "On peut commencer meme si vous n'avez pas encore de site.",
  "On peut refondre une presence existante sans tout jeter.",
  "On garde Google Maps, Instagram et Facebook quand ils sont utiles.",
  "On construit une base que vous controlez vraiment.",
];

const sectionStyleOne = {
  background: "rgba(247, 244, 237, 0.32)",
};

const sectionStyleTwo = {
  background: "rgba(12, 34, 25, 0.58)",
};

export const HomeRefonteBeforeServices = () => {
  const siteService = servicePageContentFr["ai-ready-websites"];

  return (
    <>
      <section
        id="about"
        className="cp-refonte-section cp-refonte-light"
        style={sectionStyleOne}
      >
        <div className="cp-shape-ring cp-shape-ring-left" aria-hidden="true" />
        <div className="cp-shape-slab cp-shape-slab-right" aria-hidden="true" />
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading">
            <p>Le probleme actuel</p>
            <h2>{homeContentFr.problem.title}</h2>
            <span>{homeContentFr.problem.body}</span>
          </div>
          <div className="cp-refonte-quotes cp-animate-list">
            {homeContentFr.problem.examples.map((example) => (
              <blockquote key={example}>{example}</blockquote>
            ))}
          </div>
        </div>
        <SectionScrollButton
          targetId="aligner"
          side="right"
          tone="dark"
          topColor="#071a33"
          bottomColor="#EEBA2B"
        />
      </section>

      <section
        id="aligner"
        className="cp-refonte-section cp-refonte-dark"
        style={sectionStyleTwo}
      >
        <div className="cp-shape-stripes cp-shape-stripes-left" aria-hidden="true" />
        <div className="cp-shape-ring cp-shape-ring-right" aria-hidden="true" />
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-refonte-heading-dark">
            <p>Ce qu'il faut aligner</p>
            <h2>{homeContentFr.approach.title}</h2>
            <span>{homeContentFr.approach.body}</span>
          </div>
          <div className="cp-refonte-icon-grid cp-animate-list">
            {proofPoints.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <span className="cp-refonte-icon-badge">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
        <SectionScrollButton
          targetId="avec-ou-sans-site"
          side="left"
          tone="light"
          topColor="#EEBA2B"
          bottomColor="#ffffff"
        />
      </section>

      <section
        id="avec-ou-sans-site"
        className="cp-refonte-section cp-refonte-light"
        style={sectionStyleOne}
      >
        <div className="cp-shape-slab cp-shape-slab-left" aria-hidden="true" />
        <div className="cp-refonte-shell cp-refonte-split">
          <div>
            <p className="cp-refonte-kicker">Avec ou sans site aujourd'hui</p>
            <h2>{siteService.hero.title}</h2>
            <p>{siteService.hero.body}</p>
            <p>{siteService.approach.body}</p>
            <Link className="cp-refonte-button cp-refonte-button-dark" to={localizePath("/contact")}>
              Parler de mon projet
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="cp-refonte-paths">
            {homeContentFr.audiencePaths.map((path, index) => {
              const Icon = pathIcons[index] || Link2;
              return (
              <article key={path.title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{path.title}</h3>
                <p>{path.body}</p>
              </article>
            )})}
          </div>
        </div>
        <SectionScrollButton
          targetId="base-officielle"
          side="right"
          tone="dark"
          topColor="#071a33"
          bottomColor="#EEBA2B"
        />
      </section>

      <section
        id="base-officielle"
        className="cp-refonte-section cp-refonte-dark"
        style={sectionStyleTwo}
      >
        <div className="cp-shape-stripes cp-shape-stripes-right" aria-hidden="true" />
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-refonte-heading-dark">
            <p>La base que nous construisons</p>
            <h2>Un endroit fiable que vos clients et les moteurs modernes peuvent comprendre.</h2>
            <span>
              Le site ne remplace pas vos reseaux sociaux. Il devient la base
              officielle qui confirme vos informations et renvoie vers les bons
              chemins de contact.
            </span>
          </div>
          <div className="cp-refonte-base-grid">
            {baseItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label}>
                  <span className="cp-refonte-icon-badge">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
        <SectionScrollButton
          targetId="services"
          side="left"
          tone="light"
          topColor="#EEBA2B"
          bottomColor="#ffffff"
        />
      </section>
    </>
  );
};

export const HomeRefonteAfterServices = () => {
  const visibilityService = servicePageContentFr["ai-visibility"];

  return (
    <>
      <section
        id="audit-visibilite"
        className="cp-refonte-section cp-refonte-audit"
        style={sectionStyleTwo}
      >
        <div className="cp-shape-ring cp-shape-ring-left" aria-hidden="true" />
        <div className="cp-refonte-shell cp-refonte-split">
          <div>
            <p className="cp-refonte-kicker">Premier produit d'appel</p>
            <h2>{auditToolContentFr.hero.title}</h2>
            <p>{auditToolContentFr.hero.body}</p>
            <ul className="cp-refonte-checks">
              {auditToolContentFr.checks.map((check) => (
                <li key={check.title}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{check.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <form className="cp-refonte-form" id="audit-form">
            <label>
              Votre site ou profil principal
              <input type="url" placeholder="https://..." />
            </label>
            <label>
              Pays ou zone visee
              <input type="text" placeholder="Ex. Bruxelles, Kigali, Paris..." />
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
        <SectionScrollButton
          targetId="visibilite-moderne"
          side="right"
          tone="light"
          topColor="#EEBA2B"
          bottomColor="#ffffff"
        />
      </section>

      <section
        id="visibilite-moderne"
        className="cp-refonte-section cp-refonte-light"
        style={sectionStyleOne}
      >
        <div className="cp-shape-slab cp-shape-slab-right" aria-hidden="true" />
        <div className="cp-refonte-shell cp-refonte-split">
          <div>
            <p className="cp-refonte-kicker">Visibilite moderne</p>
            <h2>{visibilityService.problem.title}</h2>
            <p>{visibilityService.problem.body}</p>
          </div>
          <div className="cp-refonte-reassurance">
            {reassurance.map((item) => (
              <div key={item}>
                <ShieldCheck size={20} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <SectionScrollButton
          targetId="cta-final"
          side="left"
          tone="dark"
          topColor="#071a33"
          bottomColor="#EEBA2B"
        />
      </section>

      <section id="cta-final" className="cp-refonte-final">
        <div className="cp-shape-stripes cp-shape-stripes-left" aria-hidden="true" />
        <div className="cp-refonte-shell">
          <Globe2 size={36} aria-hidden="true" />
          <h2>{homeContentFr.finalCta.title}</h2>
          <p>{homeContentFr.finalCta.body}</p>
          <div className="cp-refonte-actions">
            <a className="cp-refonte-button cp-refonte-button-yellow" href="#audit-form">
              Tester ma visibilite
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <Link className="cp-refonte-button cp-refonte-button-outline" to={localizePath("/contact")}>
              Parler a Creativa Poeta
            </Link>
          </div>
        </div>
        <SectionScrollButton
          targetId="faq"
          side="right"
          tone="light"
          topColor="#EEBA2B"
          bottomColor="#ffffff"
        />
      </section>
    </>
  );
};
