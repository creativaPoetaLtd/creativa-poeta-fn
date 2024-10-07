import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { LiaBarsSolid } from 'react-icons/lia';
import { useEffect, useState } from "react";
import { Dropdown, Menu } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";

interface BurgerButtonProps {
  sidebarVisible: boolean;
  toggleSidebar: () => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
  toggleSidebar,
}) => {

  const [sidebarVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>("en");


  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentLocal = window.localStorage.getItem("selectedLang") || "en";
      setSelectedLang(currentLocal);
    }
  }, []);

  // Removed duplicate toggleSidebar function
  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang === "English" ? "en" : lang === "French" ? "fr" : "kiny");
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "selectedLang",
        lang === "English" ? "en" : lang === "French" ? "fr" : "kiny"
      );
      window.location.reload();
    }
  };
  const langMenu = (
    <Menu onClick={({ key }) => handleLanguageChange(key)}
    style={{ backgroundColor: "rgba(0, 0, 0, 0)",
      marginTop: "1rem",
      width: "50px",
     }}
    >
      <Menu.Item key="English">
        <div className="flagAndLang flex items-center">
          <img src="/uk.svg" alt="flag" className="w-6 h-4" />
        </div>
      </Menu.Item>
        <Menu.Item key="Kinyarwanda">
          <div className="flagAndLang flex items-center space-x-2">
            <img src="/rwanda.png" alt="flag" className="w-6 h-4" />
          </div>
        </Menu.Item>
       <Menu.Item key="French">
          <div className="flagAndLang flex items-center space-x-2">
            <img src="/fr.png" alt="flag" className="w-6 h-4" />
          </div>
        </Menu.Item>
    </Menu>
  );
  return (
    <div
      className={`menus font-bold z-30 text-3xl backdrop-blur-lg md:text-4xl bg-black  text-white flex space-x-3 justify-center m-auto text-center items-center rounded-md p-1 md:p-1 fixed top-5 right-4`}
    > 
 <div className="localizationButtonSwitcher flex justify-start">
            <Dropdown overlay={langMenu} trigger={["click"]} >
              <button className="currentLocal flex items-center space-x-2">
                <img
                  src={selectedLang === "en" ? "/uk.svg" : selectedLang === "fr" ? "/fr.png" : "/rwanda.png"}
                  alt="flag"
                  className="w-6 h-4"
                />
                <span className="text-
                text-white text-sm">
                 <IoMdArrowDropdown />
                </span>
              </button>
            </Dropdown>
          </div>    
          <p className='menu text-[#FFFF00] text-base font-thin'>MENU</p>
      {sidebarVisible ? (
        <FaTimes onClick={toggleSidebar} />
      ) : (
        <LiaBarsSolid onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default BurgerButton;
