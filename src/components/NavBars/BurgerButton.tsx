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
        <Menu.Item key="Dutch">
  <div className="flagAndLang flex items-center space-x-2">
    <img src="/nll.jpg" alt="flag" className="w-6 h-4" />
  </div>
</Menu.Item>

    </Menu>
  );
  return (
    
    <div
    
      className={` font-bold z-30 text-3xl  md:text-4xl   text-white flex space-x-3 justify-center m-auto text-center items-center p-1 md:p-1 fixed top-5 right-4`}
    > 
  <div className="localizationButtonSwitcher justify-start ">
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
          <div className="flex justify-center items-center menus bg-black backdrop-blur-lg gap-2 px-2 rounded-md" >
          <p className='menu text-[#FFFF00] text-base font-thin'>MENU</p>
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
