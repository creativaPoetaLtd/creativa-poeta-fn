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
    const target = document.getElementById(targetId);
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

  return (
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
  );
};

export default SectionScrollButton;
