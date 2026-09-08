import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { localizePath } from "../../data/marketRuntime";
import type { ImpactLanguage } from "../../i18n/ImpactLocale";

type ImpactProgramNavProps = { language: ImpactLanguage };

const labels = {
  fr: { overview: "Aperçu", how: "Comment ça marche", conditions: "Conditions", apply: "Candidature", support: "Soutenir le programme", menu: "Menu Impact", byline: "Une initiative de Creativa Poeta" },
  en: { overview: "Overview", how: "How it works", conditions: "Conditions", apply: "Apply", support: "Support the program", menu: "Impact menu", byline: "An initiative by Creativa Poeta" },
  nl: { overview: "Overzicht", how: "Hoe werkt het", conditions: "Voorwaarden", apply: "Aanmelden", support: "Steun het programma", menu: "Impact-menu", byline: "Een initiatief van Creativa Poeta" },
} satisfies Record<ImpactLanguage, Record<string, string>>;

const ImpactProgramNav = ({ language }: ImpactProgramNavProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const copy = labels[language];
  const links = [
    { label: copy.overview, path: "/impact" },
    { label: copy.how, path: "/impact/comment-ca-marche" },
    { label: copy.conditions, path: "/impact/conditions" },
    { label: copy.apply, path: "/impact/candidature" },
  ];
  const isActive = (path: string) => location.pathname === localizePath(path);

  return (
    <nav className="impact-subnav" aria-label={copy.menu}>
      <div className="impact-shell impact-subnav__inner">
        <Link className="impact-subnav__brand" to={localizePath("/impact")}>
          <span>CP</span><strong>Impact</strong><small>{copy.byline}</small>
        </Link>
        <button className="impact-subnav__toggle" type="button" aria-expanded={open} aria-label={copy.menu} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`impact-subnav__links ${open ? "is-open" : ""}`}>
          {links.map((item) => (
            <Link key={item.path} to={localizePath(item.path)} aria-current={isActive(item.path) ? "page" : undefined} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a className="impact-subnav__support" href="mailto:contact@creativapoeta.com?subject=Soutenir%20Creativa%20Poeta%20Impact">
            <Heart size={15} aria-hidden="true" />{copy.support}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default ImpactProgramNav;
