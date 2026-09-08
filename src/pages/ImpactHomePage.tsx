import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Heart, HeartHandshake, GraduationCap, UsersRound, Palette, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/impact/impact-hero.webp";
import educationImage from "../assets/impact/impact-education.webp";
import environmentImage from "../assets/impact/impact-environment.webp";
import communityImage from "../assets/impact/impact-community.webp";
import ImpactProgramNav from "../components/impact/ImpactProgramNav";
import ImpactCounters from "../components/impact/ImpactCounters";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { getCurrentLocale, localizePath } from "../data/marketRuntime";
import impactLocale, { type ImpactLanguage } from "../i18n/ImpactLocale";
import "./ImpactProgram.css";

const resolveLanguage = (): ImpactLanguage => {
  const locale = getCurrentLocale();
  return locale === "fr" || locale === "nl" ? locale : "en";
};

const audienceIcons = [HeartHandshake, Building2, GraduationCap, UsersRound, Palette, Leaf];

const pageLabels = {
  fr: {
    signature: "CP Impact — une initiative de Creativa Poeta",
    previous: "Image précédente", next: "Image suivante", scenes: ["Des outils pour apprendre et transmettre", "Le numérique au service des initiatives locales", "Mieux organiser l’aide sur le terrain"],
    pathsEyebrow: "Un parcours clair", pathsTitle: "Tout comprendre sans lire une page interminable.",
    paths: [
      { title: "Comment ça marche", text: "Découvrez les étapes, les solutions possibles et des cas concrets.", action: "Voir le fonctionnement" },
      { title: "Conditions du programme", text: "Ce qui est inclus, nos critères et les engagements de chacun.", action: "Lire les conditions" },
      { title: "Présenter un projet", text: "Trois étapes courtes pour nous expliquer votre mission et votre besoin.", action: "Commencer la candidature" },
    ],
    statsEyebrow: "Notre impact en chiffres",
    statsTitle: "Des actions concrètes, un impact déjà mesurable.",
    stats: [
      { value: 32, label: "projets d’impact réalisés" },
      { value: 25, label: "associations, ONG et structures accompagnées" },
      { value: 15, suffix: "k", label: "heures consacrées à ces projets" },
      { value: 50, label: "solutions numériques déployées" },
    ],
    audienceAction: "Vérifier les conditions", supportTitle: "Vous voulez financer une prochaine “pierre” numérique ?", supportText: "Entreprises, fondations et particuliers peuvent soutenir du temps de conception, des licences ou de l’hébergement pour les projets sélectionnés.", supportAction: "Devenir soutien d’impact",
  },
  en: {
    signature: "CP Impact — an initiative by Creativa Poeta",
    previous: "Previous image", next: "Next image", scenes: ["Tools for learning and sharing", "Digital skills serving local initiatives", "Better organization for field support"],
    pathsEyebrow: "A clear journey", pathsTitle: "Understand everything without one endless page.",
    paths: [
      { title: "How it works", text: "Explore the steps, possible solutions and practical examples.", action: "See how it works" },
      { title: "Program conditions", text: "What is included, our criteria and everyone's commitments.", action: "Read the conditions" },
      { title: "Present a project", text: "Three short steps to explain your mission and your need.", action: "Start the application" },
    ],
    audienceAction: "Check the conditions", supportTitle: "Would you like to fund the next digital “stone”?", supportText: "Companies, foundations and individuals can support design time, licenses or hosting for selected projects.", supportAction: "Become an impact supporter",
    statsEyebrow: "Our impact in figures",
    statsTitle: "Concrete action, with impact already delivered.",
    stats: [
      { value: 32, label: "impact projects completed" },
      { value: 25, label: "charities, NGOs and organizations supported" },
      { value: 15, suffix: "k", label: "hours dedicated to these projects" },
      { value: 50, label: "digital solutions delivered" },
    ],
  },
  nl: {
    signature: "CP Impact — een initiatief van Creativa Poeta",
    previous: "Vorige afbeelding", next: "Volgende afbeelding", scenes: ["Tools om te leren en kennis te delen", "Digitale expertise voor lokale initiatieven", "Hulp op het terrein beter organiseren"],
    pathsEyebrow: "Een duidelijk traject", pathsTitle: "Begrijp alles zonder één eindeloze pagina.",
    paths: [
      { title: "Hoe werkt het", text: "Ontdek de stappen, mogelijke oplossingen en praktische voorbeelden.", action: "Bekijk de werking" },
      { title: "Programmavoorwaarden", text: "Wat inbegrepen is, onze criteria en ieders engagementen.", action: "Lees de voorwaarden" },
      { title: "Een project voorstellen", text: "Drie korte stappen om uw missie en behoefte toe te lichten.", action: "Start de aanvraag" },
    ],
    audienceAction: "Bekijk de voorwaarden", supportTitle: "Wilt u de volgende digitale “steen” financieren?", supportText: "Bedrijven, stichtingen en particulieren kunnen ontwerptijd, licenties of hosting voor geselecteerde projecten ondersteunen.", supportAction: "Word impactpartner",
    statsEyebrow: "Onze impact in cijfers",
    statsTitle: "Concrete acties met een impact die nu al zichtbaar is.",
    stats: [
      { value: 32, label: "gerealiseerde impactprojecten" },
      { value: 25, label: "ondersteunde verenigingen, ngo’s en organisaties" },
      { value: 15, suffix: "k", label: "uren besteed aan deze projecten" },
      { value: 50, label: "opgeleverde digitale oplossingen" },
    ],
  },
};

const ImpactHomePage = () => {
  const language = resolveLanguage();
  const copy = impactLocale[language];
  const ui = pageLabels[language];
  const slides = [educationImage, environmentImage, communityImage];
  const [slide, setSlide] = useState(0);
  const paths = ["/impact/comment-ca-marche", "/impact/conditions", "/impact/candidature"];
  const seo = useMemo(() => ({
    title: language === "fr" ? "Creativa Poeta Impact | Programme numérique solidaire" : language === "nl" ? "Creativa Poeta Impact | Digitale hulp voor projecten" : "Creativa Poeta Impact | Digital skills for good",
    description: language === "fr" ? "Un programme numérique solidaire pour associations, ONG, collectifs et initiatives à impact." : language === "nl" ? "Een solidair digitaal programma voor verenigingen, ngo's, collectieven en impactinitiatieven." : "A solidarity digital program for charities, NGOs, community groups and impact initiatives.",
  }), [language]);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 5500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <PageLayout className="impact-program">
      <MarketSEOHead {...seo} path="/impact" keywords="Creativa Poeta Impact, digital solidarity, NGO website, nonprofit digital support" />
      <ImpactProgramNav language={language} />
      <main className="impact-main">
        <section className="impact-hero">
          <div className="impact-shell impact-hero__grid">
            <div className="impact-hero__copy">
              <p className="impact-kicker">{ui.signature}</p>
              <h1 className="impact-title">{copy.title} <em>{copy.titleAccent}</em></h1>
              <p className="impact-lead">{copy.intro}</p>
              <div className="impact-actions">
                <Link className="impact-button impact-button--primary" to={localizePath("/impact/candidature")}>{copy.apply}<ArrowRight size={18} /></Link>
                <Link className="impact-button impact-button--outline" to={localizePath("/impact/comment-ca-marche")}>{copy.discover}</Link>
              </div>
            </div>
            <div className="impact-carousel" aria-roledescription="carousel" aria-label="Creativa Poeta Impact">
              {slides.map((image, index) => (
                <figure key={image} className={`impact-carousel__slide ${index === slide ? "is-active" : ""}`} aria-hidden={index !== slide}>
                  <img src={image} alt="" width="1600" height="900" />
                  <figcaption className="impact-carousel__caption"><small>0{index + 1} / 03</small><p>{ui.scenes[index]}</p></figcaption>
                </figure>
              ))}
              <div className="impact-carousel__dots">{slides.map((_, index) => <button key={index} type="button" className={index === slide ? "is-active" : ""} onClick={() => setSlide(index)} aria-label={`${index + 1} / 3`} />)}</div>
              <div className="impact-carousel__controls">
                <button type="button" onClick={() => setSlide((slide + slides.length - 1) % slides.length)} aria-label={ui.previous}><ArrowLeft size={18} /></button>
                <button type="button" onClick={() => setSlide((slide + 1) % slides.length)} aria-label={ui.next}><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="impact-section">
          <div className="impact-shell impact-story">
            <div className="impact-story__visual">
              <img src={heroImage} alt="Une équipe associative travaille sur un projet numérique" width="1600" height="800" loading="lazy" />
              <img src={communityImage} alt="Des bénévoles organisent une action locale avec des outils numériques" width="1600" height="900" loading="lazy" />
            </div>
            <div className="impact-heading">
              <p className="impact-kicker">{copy.whyEyebrow}</p><h2>{copy.whyTitle}</h2><p>{copy.whyBody}</p>
              <div className="impact-frictions">{copy.frictions.map((item, index) => <div key={item.title}><span>{index + 1}</span><div className="impact-friction__copy"><strong>{item.title}</strong><p>{item.text}</p></div></div>)}</div>
            </div>
          </div>
        </section>

        <section className="impact-section impact-section--soft impact-audience-section">
          <div className="impact-shell">
            <div className="impact-heading"><p className="impact-kicker">{copy.audienceEyebrow}</p><h2>{copy.audienceTitle}</h2><p>{copy.audienceIntro}</p></div>
            <div className="impact-audiences">{copy.audiences.map((item, index) => { const Icon = audienceIcons[index]; return <article key={item.title} title={item.text}><Icon size={23} /><h3>{item.title}</h3></article>; })}</div>
            <div className="impact-actions"><Link className="impact-button impact-button--outline" to={localizePath("/impact/conditions")}>{ui.audienceAction}<ArrowRight size={17} /></Link></div>
          </div>
        </section>

        <section className="impact-section impact-metrics">
          <div className="impact-shell">
            <div className="impact-heading impact-heading--center"><p className="impact-kicker">{ui.statsEyebrow}</p><h2>{ui.statsTitle}</h2></div>
            <ImpactCounters items={ui.stats} locale={language} />
          </div>
        </section>

        <section className="impact-section impact-section--lilac">
          <div className="impact-shell impact-support">
            <div><p className="impact-kicker">Creativa Poeta Impact</p><h2>{ui.supportTitle}</h2><p>{ui.supportText}</p></div>
            <div className="impact-support__actions"><a className="impact-button" href="mailto:contact@creativapoeta.com?subject=Soutenir%20Creativa%20Poeta%20Impact"><Heart size={17} />{ui.supportAction}</a></div>
          </div>
        </section>

        <nav className="impact-shortcuts" aria-label="CP Impact">
          <div className="impact-shell impact-shortcuts__inner">
            {ui.paths.map((item, index) => <Link className="impact-shortcut" to={localizePath(paths[index])} key={item.title}><strong>{item.title}</strong><ArrowRight size={17} /></Link>)}
          </div>
        </nav>
      </main>
    </PageLayout>
  );
};

export default ImpactHomePage;
