import { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import HomeLocale from "../../i18n/HomeLocale";
import {
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import "./SectionScrollButton.css";

const phoneHref = "tel:+32473297112";
const whatsappHref = "https://wa.me/32473297112";

const sectionSelectors = [
  "#home",
  "#about",
  "#probleme-actuel",
  "#visibilite-moderne",
  "#source-officielle",
  "#canaux",
  "#voix-ia",
  "#confiance",
  "#services",
  "#cta-final",
  "#faq",
  "main > section",
  "main > div[id]",
  "section[id]",
  ".cp-refonte-section",
  ".cp-refonte-final",
  "#footer",
  "footer",
];

const FixedContactActions = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const market = getCurrentMarket();
  const lang = getCurrentLocale(market);
  const scrollLabel = HomeLocale[lang]?.scroll ?? HomeLocale.en.scroll;

  useEffect(() => {
    const footer = document.getElementById("footer") || document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.02 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const getScrollableSections = () => {
    const seen = new Set<HTMLElement>();

    return Array.from(document.querySelectorAll<HTMLElement>(sectionSelectors.join(",")))
      .filter((section) => {
        if (seen.has(section)) return false;
        seen.add(section);
        const rect = section.getBoundingClientRect();
        const style = window.getComputedStyle(section);
        return rect.height > 60 && rect.width > 60 && style.display !== "none" && style.visibility !== "hidden";
      })
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  };

  const highlightTarget = (target: HTMLElement) => {
    target.classList.remove("cp-scroll-fade-target");
    window.setTimeout(() => target.classList.add("cp-scroll-fade-target"), 180);
    window.setTimeout(() => target.classList.remove("cp-scroll-fade-target"), 1100);
  };

  const handleScrollNext = () => {
    const sections = getScrollableSections();
    const viewportOffset = 96;
    const target = sections.find((section) => section.getBoundingClientRect().top > viewportOffset);

    if (!target) {
      window.scrollBy({ top: window.innerHeight * 0.82, behavior: "smooth" });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    highlightTarget(target);
  };

  return (
    <div
      className={`cp-fixed-contact-actions${footerVisible ? " cp-fixed-actions-hidden" : ""}`}
      aria-label="Contacts rapides Creativa Poeta"
      aria-hidden={footerVisible}
    >
      <a className="cp-scroll-contact" href={phoneHref} aria-label="Appeler Creativa Poeta">
        <FaPhoneAlt />
        <span>Tel</span>
      </a>
      <a
        className="cp-scroll-contact cp-scroll-contact-whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter Creativa Poeta sur WhatsApp"
      >
        <FaWhatsapp />
        <span>WhatsApp</span>
      </a>
      <button
        type="button"
        className="cp-scroll-button cp-scroll-button-right cp-scroll-button-light"
        onClick={handleScrollNext}
      >
        <span className="cp-scroll-button-icon" aria-hidden="true">
          <AiOutlineDown />
        </span>
        <span>{scrollLabel}</span>
      </button>
    </div>
  );
};

export default FixedContactActions;
