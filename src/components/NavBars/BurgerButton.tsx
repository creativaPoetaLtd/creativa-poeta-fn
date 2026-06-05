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
  const market = getCurrentMarket();

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
        : "en"; // fallback to English if not recognized

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

  const langMenu = {
    onClick: ({ key }: { key: string }) => handleLanguageChange(key),
    style: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      marginTop: "1rem",
      width: "50px",
    },
    items: market.locales.map((locale) => ({
      key: languageOptions[locale].key,
      label: (
        <div className="flagAndLang flex items-center">
          <img
            src={languageOptions[locale].flag}
            alt={languageOptions[locale].label}
            className="w-6 h-4"
          />
        </div>
      ),
    })),
  };

  return (
    <div
      className={`font-bold z-30 text-2xl phone:text-3xl md:text-4xl text-white flex space-x-1 phone:space-x-3 justify-end text-center items-center p-0 phone:p-1 md:p-1`}
    >
      {/* Flags Dropdown */}

      {/* Menu Button */}
      <div className="localizationButtonSwitcher justify-start ">
        <Dropdown menu={langMenu} trigger={["click"]}>
          <button className="currentLocal flex items-center space-x-2">
            <img
              src={
                selectedLang === "en"
                  ? languageOptions.en.flag
                  : selectedLang === "fr"
                  ? languageOptions.fr.flag
                  : selectedLang === "nl"
                  ? languageOptions.nl.flag
                  : languageOptions.kiny.flag
              }
              alt="flag"
              className="w-6 h-4"
            />
            <span className="text-white text-sm">
              <IoMdArrowDropdown />
            </span>
          </button>
        </Dropdown>
      </div>
      <div className="flex justify-center items-center menus bg-black backdrop-blur-lg gap-1 phone:gap-2 px-1.5 phone:px-2 rounded-md">
        <p className="menu text-[#FFFF00] text-xs phone:text-base font-thin">MENU</p>
        {sidebarVisible ? (
          <FaTimes onClick={toggleSidebar} />
        ) : (
          <LiaBarsSolid onClick={toggleSidebar} />
        )}
      </div>
    </div>
  );
};

export default BurgerButton;
