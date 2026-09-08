import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import educationImage from "../assets/impact/impact-education.webp";
import environmentImage from "../assets/impact/impact-environment.webp";
import communityImage from "../assets/impact/impact-community.webp";
import heroImage from "../assets/impact/impact-hero.webp";
import ImpactProgramNav from "../components/impact/ImpactProgramNav";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { getCurrentLocale, localizePath } from "../data/marketRuntime";
import impactLocale, { type ImpactLanguage } from "../i18n/ImpactLocale";
import "./ImpactProgram.css";

const getLanguage = (): ImpactLanguage => { const value = getCurrentLocale(); return value === "fr" || value === "nl" ? value : "en"; };
const labels = {
  fr: { kicker: "Le fonctionnement", title: "Une demande simple. Une première réalisation bien cadrée.", intro: "Nous cherchons le plus petit résultat numérique capable de produire une vraie amélioration pour votre équipe ou votre public.", solutions: "Ce que cette première pierre peut débloquer", examples: "Trois situations très concrètes", apply: "Présenter votre projet", conditions: "Consulter les conditions", scenario: "Cas d’usage" },
  en: { kicker: "How it works", title: "A simple request. A focused first delivery.", intro: "We look for the smallest digital result capable of making a real difference for your team or audience.", solutions: "What this first stone can unlock", examples: "Three very practical situations", apply: "Present your project", conditions: "Read the conditions", scenario: "Use case" },
  nl: { kicker: "Hoe het werkt", title: "Een eenvoudige aanvraag. Een duidelijk afgebakende eerste realisatie.", intro: "We zoeken het kleinste digitale resultaat dat een echt verschil kan maken voor uw team of publiek.", solutions: "Wat deze eerste steen kan mogelijk maken", examples: "Drie heel concrete situaties", apply: "Stel uw project voor", conditions: "Lees de voorwaarden", scenario: "Praktijkvoorbeeld" },
};

const ImpactHowPage = () => {
  const language = getLanguage();
  const [openSolution, setOpenSolution] = useState<number | null>(null);
  const copy = impactLocale[language];
  const ui = labels[language];
  const images = [educationImage, communityImage, environmentImage];
  return (
    <PageLayout className="impact-program">
      <MarketSEOHead title={`${ui.kicker} | Creativa Poeta Impact`} description={ui.intro} keywords="Creativa Poeta Impact process, digital support nonprofit" path="/impact/comment-ca-marche" />
      <ImpactProgramNav language={language} />
      <main className="impact-main">
        <section className="impact-page-hero">
          <div className="impact-shell impact-page-hero__grid">
            <div><p className="impact-kicker">{ui.kicker}</p><h1>{ui.title}</h1><p className="impact-lead">{ui.intro}</p><div className="impact-actions"><Link className="impact-button impact-button--primary" to={localizePath("/impact/candidature")}>{ui.apply}<ArrowRight size={18} /></Link><Link className="impact-button impact-button--outline" to={localizePath("/impact/conditions")}>{ui.conditions}</Link></div></div>
            <div className="impact-page-hero__visual"><img src={educationImage} alt="Une équipe apprend et collabore avec des outils numériques" width="1600" height="900" /><img src={heroImage} alt="Discussion autour d'un projet numérique solidaire" width="1600" height="800" /></div>
          </div>
        </section>

        <section className="impact-section">
          <div className="impact-shell"><div className="impact-heading"><p className="impact-kicker">{copy.processEyebrow}</p><h2>{copy.processTitle}</h2></div><div className="impact-process">{copy.process.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div>
        </section>

        <section className="impact-section impact-section--soft">
          <div className="impact-shell">
            <div className="impact-heading"><p className="impact-kicker">{copy.solutionsEyebrow}</p><h2>{ui.solutions}</h2><p>{copy.solutionsIntro}</p></div>
            <div className="impact-solutions">
              {copy.solutions.map((solution, index) => {
                const isOpen = openSolution === index;
                return (
                  <article className={`impact-solution${isOpen ? " is-open" : ""}`} key={solution.title}>
                    <button className="impact-solution__trigger" type="button" aria-expanded={isOpen} onClick={() => setOpenSolution(isOpen ? null : index)}>
                      <span className="impact-solution__number">0{index + 1}</span>
                      <h3>{solution.title}</h3>
                      <span className="impact-solution__chevron"><ChevronDown size={20} /></span>
                    </button>
                    <div className="impact-solution__panel" aria-hidden={!isOpen}>
                      <div className="impact-solution__content">
                        <p>{solution.summary}</p>
                        <ul className="impact-list">{solution.items.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="impact-section">
          <div className="impact-shell"><div className="impact-heading impact-heading--center"><p className="impact-kicker">{copy.examplesEyebrow}</p><h2>{ui.examples}</h2><p>{copy.examplesNote}</p></div><div className="impact-cases">{copy.examples.map((example, index) => <article className="impact-case" key={example.title}><img src={images[index]} alt="" width="1600" height="900" loading="lazy" /><div className="impact-case__body"><small>{ui.scenario}</small><h3>{example.title}</h3><p><strong>{copy.problemLabel} :</strong> {example.problem}</p><p><strong>{copy.solutionLabel} :</strong> {example.solution}</p></div></article>)}</div><div className="impact-actions" style={{ justifyContent: "center" }}><Link className="impact-button impact-button--primary" to={localizePath("/impact/candidature")}>{ui.apply}<ArrowRight size={18} /></Link></div></div>
        </section>
      </main>
    </PageLayout>
  );
};

export default ImpactHowPage;
