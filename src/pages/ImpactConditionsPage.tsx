import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import ImpactProgramNav from "../components/impact/ImpactProgramNav";
import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { getCurrentLocale, localizePath } from "../data/marketRuntime";
import impactLocale, { type ImpactLanguage } from "../i18n/ImpactLocale";
import "./ImpactProgram.css";

const getLanguage = (): ImpactLanguage => { const value = getCurrentLocale(); return value === "fr" || value === "nl" ? value : "en"; };
const labels = {
  fr: { kicker: "Conditions du programme", title: "Des règles simples, transparentes et réalistes.", intro: "Le programme offre une contribution numérique limitée aux projets sélectionnés. Il ne constitue ni un financement, ni une promesse de prise en charge complète.", selection: "Comment nous sélectionnons", exchange: "Ce que chacun doit savoir avant de commencer", faq: "Questions avant de candidater", apply: "J’ai compris — présenter un projet" },
  en: { kicker: "Program conditions", title: "Simple, transparent and realistic rules.", intro: "The program offers a limited digital contribution to selected projects. It is neither a funding scheme nor a promise to cover an entire project.", selection: "How we select projects", exchange: "What everyone should know before starting", faq: "Questions before applying", apply: "I understand — present a project" },
  nl: { kicker: "Programmavoorwaarden", title: "Eenvoudige, transparante en realistische regels.", intro: "Het programma biedt een beperkte digitale bijdrage aan geselecteerde projecten. Het is geen financiering en geen belofte om een volledig project uit te voeren.", selection: "Hoe we projecten selecteren", exchange: "Wat iedereen moet weten voor de start", faq: "Vragen voor u zich aanmeldt", apply: "Ik begrijp het — stel een project voor" },
};

const ImpactConditionsPage = () => {
  const language = getLanguage();
  const copy = impactLocale[language];
  const ui = labels[language];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <PageLayout className="impact-program">
      <MarketSEOHead title={`${ui.kicker} | Creativa Poeta Impact`} description={ui.intro} keywords="Creativa Poeta Impact conditions, eligibility, nonprofit digital support" path="/impact/conditions" />
      <ImpactProgramNav language={language} />
      <main className="impact-main">
        <section className="impact-page-hero">
          <div className="impact-shell"><div className="impact-heading"><p className="impact-kicker">{ui.kicker}</p><h1>{ui.title}</h1><p>{ui.intro}</p></div></div>
        </section>

        <section className="impact-section">
          <div className="impact-shell"><div className="impact-heading"><p className="impact-kicker">{copy.selectionEyebrow}</p><h2>{ui.selection}</h2><p>{copy.selectionIntro}</p></div><div className="impact-conditions">{copy.selectionGroups.map((group) => <article className="impact-condition-group" data-tone={group.tone} key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul></article>)}</div></div>
        </section>

        <section className="impact-section impact-section--soft">
          <div className="impact-shell"><div className="impact-heading"><p className="impact-kicker">{copy.promiseEyebrow}</p><h2>{ui.exchange}</h2><p>{copy.promiseIntro}</p></div><div className="impact-promises">{copy.promises.map((promise) => <article className="impact-promise-card" key={promise.title}><h3>{promise.title}</h3><p>{promise.text}</p><ul className="impact-list">{promise.items.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul></article>)}</div></div>
        </section>

        <section className="impact-section">
          <div className="impact-shell"><div className="impact-heading"><p className="impact-kicker">FAQ</p><h2>{ui.faq}</h2></div><div className="impact-faq">{copy.faqs.map((item, index) => { const isOpen = openFaq === index; return <article key={item.question} className={isOpen ? "is-open" : ""}><button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}><span>{item.question}</span><ChevronDown size={19} /></button>{isOpen ? <p>{item.answer}</p> : null}</article>; })}</div><p className="impact-lead" style={{ fontSize: 14 }}>{copy.disclaimer}</p><div className="impact-actions"><Link className="impact-button impact-button--primary" to={localizePath("/impact/candidature")}>{ui.apply}<ArrowRight size={18} /></Link></div></div>
        </section>
      </main>
    </PageLayout>
  );
};

export default ImpactConditionsPage;
