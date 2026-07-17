import React from "react";
import { FaTimes } from "react-icons/fa";
import { LiaBarsSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { getCurrentMarket } from "../../data/marketRuntime";

interface BurgerButtonProps {
  sidebarVisible: boolean;
  toggleSidebar: () => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
  sidebarVisible,
  toggleSidebar,
}) => {
  const [languageVisible, setLanguageVisible] = useState(false);
  const market = getCurrentMarket();
  const showLanguageSwitcher = market.locales.length > 1;

  useEffect(() => {
    if (typeof window === "undefined") return;

    let hideTimer: number | undefined;
    const revealLanguage = () => {
      setLanguageVisible(true);
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setLanguageVisible(false), 1600);
    };

    window.addEventListener("scroll", revealLanguage, { passive: true });
    return () => {
      window.removeEventListener("scroll", revealLanguage);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="flex items-center justify-end gap-2 p-0 text-center text-2xl font-bold text-white phone:gap-3 phone:text-3xl">
      {showLanguageSwitcher && (
        <div
          className={`transition duration-300 ${
            sidebarVisible || languageVisible
              ? "opacity-100"
              : "pointer-events-none opacity-0 laptop:pointer-events-auto laptop:opacity-100"
          }`}
        >
          <LanguageSwitcher />
        </div>
      )}
      <button
        type="button"
        onClick={toggleSidebar}
        className="flex items-center justify-center gap-1 rounded-md bg-black/85 px-2 py-1 backdrop-blur-lg phone:gap-2 phone:px-2.5"
        aria-label={sidebarVisible ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <span className="text-xs font-black text-[#FFFF00] phone:text-base">MENU</span>
        {sidebarVisible ? <FaTimes /> : <LiaBarsSolid />}
      </button>
    </div>
  );
};

export default BurgerButton;
