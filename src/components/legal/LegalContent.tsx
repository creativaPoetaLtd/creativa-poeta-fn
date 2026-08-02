import { LegalPageKind, legalCopies } from "./legalCopies";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../../data/marketRuntime";
import "./LegalContent.css";

const pageLinks: Array<{ kind: LegalPageKind; path: string }> = [
  { kind: "legal", path: "/mentions-legales" },
  { kind: "terms", path: "/terms-and-conditions" },
  { kind: "privacy", path: "/confidentialite-cookies" },
];

const linkLabels = {
  fr: {
    legal: "Mentions légales",
    terms: "Conditions générales",
    privacy: "Confidentialité et cookies",
  },
  en: {
    legal: "Legal notice",
    terms: "Terms and conditions",
    privacy: "Privacy and cookies",
  },
  nl: {
    legal: "Juridische vermeldingen",
    terms: "Algemene voorwaarden",
    privacy: "Privacy en cookies",
  },
  kiny: {
    legal: "Amakuru yemewe",
    terms: "Amategeko",
    privacy: "Privacy na cookies",
  },
} as const;

type LegalContentProps = {
  kind: LegalPageKind;
};

const LegalContent = ({ kind }: LegalContentProps) => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const normalizedLocale = locale in legalCopies ? locale : "en";
  const copy = legalCopies[normalizedLocale][kind];
  const labels = linkLabels[normalizedLocale];

  return (
    <main className="cp-legal-page">
      <section className="cp-legal-hero">
        <div className="cp-legal-shell">
          <p className="cp-legal-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="cp-legal-intro">{copy.intro}</p>
          <p className="cp-legal-updated">{copy.updated}</p>
          <nav className="cp-legal-tabs" aria-label="Pages légales">
            {pageLinks.map((item) => (
              <a
                key={item.kind}
                href={localizePath(item.path, market, normalizedLocale)}
                className={item.kind === kind ? "is-active" : ""}
              >
                {labels[item.kind]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="cp-legal-body">
        <div className="cp-legal-shell cp-legal-grid">
          {copy.sections.map((section) => (
            <article key={section.heading} className="cp-legal-card">
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LegalContent;

