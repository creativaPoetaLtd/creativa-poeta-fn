import type { CSSProperties } from "react";
import { AiOutlineDown } from "react-icons/ai";
import "./SectionScrollButton.css";

type SectionScrollButtonProps = {
  label?: string;
  targetId: string;
  side?: "left" | "right";
  tone?: "light" | "dark";
  topColor?: string;
  bottomColor?: string;
};


const SectionScrollButton = ({
  label = "Faire defiler",
  targetId,
  side = "right",
  tone = "light",
  topColor = "#EEBA2B",
  bottomColor = "#071a33",
}: SectionScrollButtonProps) => {
  const handleClick = () => {
    const target =
      targetId === "__next-section"
        ? getNextSection()
        : document.getElementById(targetId);
    if (!target) return;

    target.classList.remove("cp-scroll-fade-target");
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      target.classList.add("cp-scroll-fade-target");
    }, 220);

    window.setTimeout(() => {
      target.classList.remove("cp-scroll-fade-target");
    }, 1100);
  };

  const getNextSection = () => {
    const ids = [
      "home",
      "about",
      "probleme-actuel",
      "visibilite-moderne",
      "source-officielle",
      "canaux",
      "voix-ia",
      "confiance",
      "services",
      "cta-final",
      "faq",
      "footer",
    ];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const currentY = window.scrollY + 120;
    const next = sections.find((section) => section.offsetTop > currentY);

    return next || sections[0] || null;
  };

  return (
    <div className={`cp-scroll-actions cp-scroll-actions-${side}`}>
      <button
        type="button"
        className={`cp-scroll-button cp-scroll-button-${side} cp-scroll-button-${tone}`}
        style={
          {
            "--cp-scroll-top": topColor,
            "--cp-scroll-bottom": bottomColor,
          } as CSSProperties
        }
        onClick={handleClick}
      >
        <span className="cp-scroll-button-icon" aria-hidden="true">
          <AiOutlineDown />
        </span>
        <span>{label}</span>
      </button>
    </div>
  );
};

export default SectionScrollButton;
