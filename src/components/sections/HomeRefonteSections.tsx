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
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../../data/marketRuntime";
import problemVisibilityEn from "../../assets/problem-visibility-en.png";
import problemVisibilityFr from "../../assets/problem-visibility-fr.png";
import problemVisibilityNl from "../../assets/problem-visibility-nl.png";
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

const creativePillars = [
  {
    icon: MessageCircle,
    title: "Une voix",
    body: "Des mots qui portent votre idee avec clarte, rythme et intention.",
  },
  {
    icon: Target,
    title: "Une image",
    body: "Des visuels, logos et supports qui donnent une forme visible a votre univers.",
  },
  {
    icon: Globe2,
    title: "Une presence",
    body: "Un site, des profils et des contenus qui relient votre creation au public.",
  },
  {
    icon: Bot,
    title: "Une intelligence",
    body: "Des assistants IA et outils sur mesure qui prolongent votre savoir-faire.",
  },
];

const latestProjects = [
  {
    title: "Refonte d'une presence officielle",
    tag: "Site, contenu, maps",
    body: "Transformer une presence dispersee en source claire pour les clients, les recherches et les outils IA.",
  },
  {
    title: "Identite et supports de communication",
    tag: "Logo, visuels, message",
    body: "Donner une signature visuelle et des mots plus nets a une activite qui veut etre comprise vite.",
  },
  {
    title: "Assistant IA prive pour une equipe",
    tag: "IA, knowledge base, support",
    body: "Preparer un assistant capable de repondre avec les informations internes, les services et le ton de l'entreprise.",
  },
];

const testimonials = [
  {
    quote:
      "Creativa Poeta a transforme nos idees en une presence plus claire, plus belle et plus facile a expliquer.",
    author: "Entrepreneur local",
  },
  {
    quote:
      "On avait des contenus, des profils et des envies partout. L'equipe nous a aide a remettre de l'ordre sans perdre notre style.",
    author: "Createur de contenu",
  },
  {
    quote:
      "Le plus utile a ete la maniere de traduire notre activite en mots simples, visuels propres et prochaines actions.",
    author: "Petite entreprise",
  },
];

const sectionStyleOne = {
  background: "rgba(247, 244, 237, 0.32)",
};

const sectionStyleTwo = {
  background: "rgba(12, 34, 25, 0.58)",
};

export const HomeRefonteBeforeServices = () => {
  const siteService = servicePageContentFr["ai-ready-websites"];
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const problemImage =
    locale === "fr"
      ? problemVisibilityFr
      : locale === "nl"
        ? problemVisibilityNl
        : problemVisibilityEn;

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
            <p>Qui sommes-nous</p>
            <h2>Un souffle creatif, une main technique, une touche poetique.</h2>
            <span>
              Creativa Poeta donne vie aux idees. Nous melons design, mots,
              sites web, contenus, visibilite et intelligence artificielle pour
              creer des presences qui se voient, se comprennent et se retiennent.
              Votre creativite est notre passion.
            </span>
          </div>
          <div className="cp-refonte-icon-grid cp-animate-list">
            {creativePillars.map((item) => {
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
          targetId="probleme-actuel"
          side="right"
          tone="dark"
          topColor="#071a33"
          bottomColor="#EEBA2B"
        />
      </section>

      <section
        id="probleme-actuel"
        className="cp-refonte-section cp-refonte-light cp-refonte-problem-visual"
      >
        <div className="cp-shape-slab cp-shape-slab-right" aria-hidden="true" />
        <div className="cp-refonte-shell cp-refonte-problem-shell">
          <div className="cp-refonte-heading">
            <p>Le probleme actuel</p>
            <h2>{homeContentFr.problem.title}</h2>
            <span>{homeContentFr.problem.body}</span>
          </div>
          <figure className="cp-refonte-problem-art">
            <img
              src={problemImage}
              alt="Presence invisible ou visible au bon moment selon la coherence des informations"
            />
          </figure>
        </div>
        <Link
          to={localizePath("/contact")}
          className="cp-refonte-local-cta"
          aria-label="Contacter Creativa Poeta"
        >
          <div className="cp-refonte-local-bubbles" aria-hidden="true">
            <span>
              <Search size={30} />
              Quelle agence peut refaire mon site pour etre visible dans Google
              et les moteurs IA ?
            </span>
            <span>
              <MapPin size={32} />
              Qui peut m'aider a etre visible dans Google Maps, Apple Maps et
              ChatGPT ?
            </span>
          </div>
          <div className="cp-refonte-local-ribbon">
            <span className="cp-refonte-local-target">
              <Target size={52} />
            </span>
            <strong>
              avec Creativa Poeta
              <em>vous avez</em>
            </strong>
            <small>
              la bonne visibilite, au bon moment, sur tous les canaux
            </small>
            <span className="cp-refonte-local-action">
              Contacter Creativa Poeta
              <ArrowRight size={18} />
            </span>
          </div>
        </Link>
        <SectionScrollButton
          targetId="aligner"
          side="left"
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
          targetId="derniers-projets"
          side="left"
          tone="dark"
          topColor="#071a33"
          bottomColor="#EEBA2B"
        />
      </section>

      <section
        id="derniers-projets"
        className="cp-refonte-section cp-refonte-dark"
        style={sectionStyleTwo}
      >
        <div className="cp-shape-stripes cp-shape-stripes-left" aria-hidden="true" />
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading cp-refonte-heading-dark">
            <p>Nos derniers projets</p>
            <h2>Des idees mises en forme, des presences remises en lumiere.</h2>
            <span>
              Chaque projet est une rencontre entre une intention, une image,
              des mots et un chemin pour atteindre le bon public.
            </span>
          </div>
          <div className="cp-refonte-showcase-grid">
            {latestProjects.map((project) => (
              <article key={project.title}>
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
              </article>
            ))}
          </div>
        </div>
        <SectionScrollButton
          targetId="paroles-clients"
          side="right"
          tone="light"
          topColor="#EEBA2B"
          bottomColor="#ffffff"
        />
      </section>

      <section
        id="paroles-clients"
        className="cp-refonte-section cp-refonte-light"
        style={sectionStyleOne}
      >
        <div className="cp-shape-ring cp-shape-ring-right" aria-hidden="true" />
        <div className="cp-refonte-shell">
          <div className="cp-refonte-heading">
            <p>Paroles de confiance</p>
            <h2>Quand une idee devient plus claire, elle respire mieux.</h2>
            <span>
              Nous accompagnons entrepreneurs, createurs, entreprises et
              particuliers pour transformer une intuition en presence solide.
            </span>
          </div>
          <div className="cp-refonte-testimonial-grid">
            {testimonials.map((item) => (
              <blockquote key={item.quote}>
                <p>{item.quote}</p>
                <cite>{item.author}</cite>
              </blockquote>
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
          <h2>Votre creativite, notre passion.</h2>
          <p>
            Que vous soyez entrepreneur, createur de contenu, entreprise ou
            particulier, nous sommes la pour donner vie a vos idees, renforcer
            votre presence en ligne et susciter l'engagement de votre public.
          </p>
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
