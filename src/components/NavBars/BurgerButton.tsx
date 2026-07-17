import React from "react";
import { FaTimes } from "react-icons/fa";
import { LiaBarsSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { Dropdown } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";
import { LocaleCode } from "../../data/markets";

interface BurgerButtonProps {
  sidebarVisible: boolean;
  toggleSidebar: () => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
  sidebarVisible,
  toggleSidebar,
}) => {
  const [selectedLang, setSelectedLang] = useState<string>("en");
  const [languageVisible, setLanguageVisible] = useState(false);
  const market = getCurrentMarket();
  const showLanguageSwitcher = market.locales.length > 1;

  const languageOptions: Record<
    LocaleCode,
    { key: string; label: string; flag: string }
  > = {
    en: { key: "English", label: "English", flag: "/uk.svg" },
    fr: { key: "French", label: "French", flag: "/fr.png" },
    nl: { key: "Dutch", label: "Dutch", flag: "/nll.jpg" },
    kiny: { key: "Kinyarwanda", label: "Kinyarwanda", flag: "/rwanda.png" },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentLocal = getCurrentLocale(market);
      setSelectedLang(currentLocal);
    }
  }, [market]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let hideTimer: number | undefined;
    const revealLanguage = () => {
      setLanguageVisible(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setLanguageVisible(false), 1600);
    };

    window.addEventListener("scroll", revealLanguage, { passive: true });
    return () => {
      window.removeEventListener("scroll", revealLanguage);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const handleLanguageChange = (lang: string) => {
    const selected =
      lang === "English"
        ? "en"
        : lang === "French"
        ? "fr"
        : lang === "Kinyarwanda"
        ? "kiny"
        : lang === "Dutch"
        ? "nl"
        : "en";

    setSelectedLang(selected);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("selectedLang", selected);
      window.location.href = buildLocalLocalePath(
        market,
        selected as LocaleCode,
        window.location.pathname
      );
    }
  };

  const currentLocale = (selectedLang in languageOptions ? selectedLang : "en") as LocaleCode;
  const alternativeLocales = market.locales.filter((locale) => locale !== currentLocale);

  const langMenu = {
    onClick: ({ key }: { key: string }) => handleLanguageChange(key),
    style: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      marginTop: "0.75rem",
      width: "50px",
    },
    items: alternativeLocales.map((locale) => ({
      key: languageOptions[locale].key,
      label: (
        <div className="flagAndLang flex items-center">
          <img
            src={languageOptions[locale].flag}
            alt={languageOptions[locale].label}
            className="h-4 w-6 rounded-[2px] object-cover"
          />
        </div>
      ),
    })),
  };

  return (
    <div className="z-30 flex items-center justify-end gap-1 p-0 text-center text-2xl font-bold text-white phone:gap-3 phone:p-1 phone:text-3xl md:p-1 md:text-4xl">
      {showLanguageSwitcher && alternativeLocales.length > 0 && (
        <div
          className={`localizationButtonSwitcher justify-start transition duration-300 ${
            sidebarVisible || languageVisible
              ? "opacity-100"
              : "pointer-events-none opacity-0 laptop:pointer-events-auto laptop:opacity-100"
          }`}
        >
          <Dropdown menu={langMenu} trigger={["click"]}>
            <button
              type="button"
              className="currentLocal flex items-center space-x-1 rounded-full bg-black/45 px-1.5 py-1 backdrop-blur-sm phone:space-x-2"
              aria-label="Changer de langue"
            >
              <img
                src={languageOptions[currentLocale].flag}
                alt={languageOptions[currentLocale].label}
                className="h-4 w-6 rounded-[2px] object-cover"
              />
              <span className="text-sm text-white">
                <IoMdArrowDropdown />
              </span>
            </button>
          </Dropdown>
        </div>
      )}
      <button
        type="button"
        onClick={toggleSidebar}
        className="flex items-center justify-center gap-1 rounded-md bg-black/85 px-1.5 py-0.5 backdrop-blur-lg phone:gap-2 phone:px-2"
        aria-label={sidebarVisible ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <span className="text-xs font-black text-[#FFFF00] phone:text-base">MENU</span>
        {sidebarVisible ? <FaTimes /> : <LiaBarsSolid />}
      </button>
    </div>
  );
};

export default BurgerButton;