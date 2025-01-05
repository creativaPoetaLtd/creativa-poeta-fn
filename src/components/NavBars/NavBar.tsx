import {useState } from "react";
import { useLocation } from "react-router-dom";
import BurgerButton from "./BurgerButton";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTimes, FaTwitter } from "react-icons/fa";
import logoBurger from '../../assets/flags/logoBurger.png'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import NavLocale from "../../i18n/NavLocale";
import  getLangFromLocalStorage  from "../../../utils/Lang";

function NavBar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [servicesSubMenuVisible, setServicesSubMenuVisible] = useState(false);
  



  console.log();
  
  
  const lang:any = getLangFromLocalStorage();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
 
  const toggleServicesSubMenu = () => {
    setServicesSubMenuVisible(!servicesSubMenuVisible);
  };




  const location = useLocation();

  return (
    <>
      <div className="flex-center flex flex-col m-auto float-right">
        <BurgerButton
          sidebarVisible={sidebarVisible}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div
        className={`mx-auto z-50 fixed w-[65%] laptop:w-[20%] desktop:w-[20%] tablet:w-[45%] float-right justify-end bg-black shadow-sm sidebar ${sidebarVisible ? 'visible' : 'sidebar-closing'}`}
      >
        <div className="container flex justify-between">
          <nav className="flex flex-col w-full">
            <div
              className={`navbar flex flex-col laptop:min-h-[98vh] desktop:min-h-[98vh] tablet:min-h-[98vh] ipod:min-h-[98vh] min-h-[94vh] h-fit max-h-[100%] justify-start p-10 space-y-4 float-right ${sidebarVisible ? "" : "hidden"}`}
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              <div className="flex text-[#EEBA2B] justify-between">
                <p className="D">
                {NavLocale[lang]?.navigation}
                </p>
                <div className=" flex mx-auto text-2xl justify-center absolute top-5 right-12 text-center text-white items-center">
                  <FaTimes onClick={toggleSidebar} />
                </div>
              </div>
              <div className="h-fit flex  space-y-3 flex-col mt-6">
                <a
                  href="/"
                  onClick={toggleSidebar}
                  className={` overflow-y-auto rounded text-white mt-12 text-xl hover:text-[#EEBA2B] ${location.hash === "#home" ? "text-[#EEBA2B]" : ""}`}
                >
                  {NavLocale[lang]?.home}
                </a>
                <a
                  href="#about"
                  onClick={toggleSidebar}
                  className={` overflow-y-auto rounded text-white text-xl hover:text-[#EEBA2B] ${location.hash === "#about" ? "text-[#EEBA2B]" : ""}`}
                >
                  {NavLocale[lang]?.about}
                </a>
                <a
                  href="#projects"
                  onClick={toggleSidebar}
                  className={` overflow-y-auto rounded text-white text-xl hover:text-[#EEBA2B] ${location.hash === "#parteners" ? "text-[#EEBA2B]" : ""}`}
                >
                  {NavLocale[lang]?.Projects}
                </a>
                <div onClick={toggleServicesSubMenu}>
                  <div className="flex my-auto justify-between">
                    <p
                      className={` overflow-y-auto rounded text-white text-xl hover:text-[#EEBA2B] cursor-pointer ${location.hash === "#services" ? "text-[#EEBA2B]" : ""
                        }`}
                    >
                      {NavLocale[lang]?.services}
                    </p>
                    {servicesSubMenuVisible ? <AiOutlineMinus className="flex justify-center mt-2 cursor-pointer text-slate-700 text-xl my-auto items-center text-center" /> : <AiOutlinePlus className="text-slate-700 cursor-pointer flex justify-center mt-2 text-xl my-auto items-center text-center rotate-90" />}
                  </div>
                  {servicesSubMenuVisible && (
                    <div className="pl-6 flex text-md flex-col mt-3 space-y-2">
                      <a
                        href="/services/graphic-design"
                        onClick={toggleSidebar}
                        className={` overflow-y-auto rounded text-white  hover:text-[#EEBA2B] ${location.hash === "#services" ? "text-[#EEBA2B]" : ""
                          }`}
                      >
                        {NavLocale[lang]?.subservice1}
                      </a>
                      <a
                        href="/services/content-writing"
                        onClick={toggleSidebar}
                        className={` overflow-y-auto rounded text-white  hover:text-[#EEBA2B] ${location.hash === "#services" ? "text-[#EEBA2B]" : ""
                          }`}
                      >
                        {NavLocale[lang]?.subservice2}
                      </a>
                      <a
                        href="/services/digital-marketing"
                        onClick={toggleSidebar}
                        className={` overflow-y-auto rounded text-white  hover:text-[#EEBA2B] ${location.hash === "#services" ? "text-[#EEBA2B]" : ""
                          }`}
                      >
                        {NavLocale[lang]?.subservice3}
                      </a>
                      <a
                        href="/services/web-app"
                        onClick={toggleSidebar}
                        className={` overflow-y-auto rounded text-white  hover:text-[#EEBA2B] ${location.hash === "#services" ? "text-[#EEBA2B]" : ""
                          }`}
                      >
                        {NavLocale[lang]?.subservice4}
                      </a>
                    </div>
                  )}
                </div>

                <Link
                  to="/career"
                  onClick={toggleSidebar}
                  className={` overflow-y-auto rounded text-white text-xl hover:text-[#EEBA2B] ${location.hash === "#faq" ? "text-[#EEBA2B]" : ""}`}
                >
                  {NavLocale[lang]?.career}
                </Link>
                <Link
                  to="/start-project"
                  onClick={toggleSidebar}
                  className={` overflow-y-auto rounded text-white text-xl hover:text-[#EEBA2B] ${location.hash === "#faq" ? "text-[#EEBA2B]" : ""}`}
                >
                  { NavLocale[lang]?.getStarted}
                </Link>
                <Link
                  to="/contact"
                  onClick={toggleSidebar}
                  className={` overflow-y-auto rounded text-white text-xl hover:text-[#EEBA2B] ${location.hash === "#contact" ? "text-[#EEBA2B]" : ""}`}
                >
                  {NavLocale[lang]?.contacts}
                </Link>
              </div>
    
              <p className="text-white">
                <img src={logoBurger}
                  alt="test"
                  className="w-[100%] h-[100%] object-cover mt-2"
                />
              </p>
              <div className="flex space-x-4 laptop:bottom-8 desktop:bottom-8 tablet:bottom-8 phone:bottom-8 bottom-2 absolute justify-center text-xl ">
                <a href="https://web.facebook.com/profile.php?id=61550577241125&_rdc=1&_rdr#" className="text-white">
                  <FaFacebook />
                </a>
                <a href="https://x.com/CreativaPoeta?t=-5QmeRVUl_M7lQbSOhC7JA&s=09" className="text-white">
                  <FaTwitter />
                </a>
                <a href="https://www.instagram.com/creativapoeta_/" className="text-white">
                  <FaInstagram />
                </a>
                <a href="https://www.tiktok.com/@creativapoeta?_t=ZM-8sjgBGfxZna&_r=1" className="text-white">
                <FaTiktok />
                </a>
                <a href="https://www.linkedin.com/company/105066709/" className="text-white">
                  <FaLinkedin />
                </a>
              
              </div>
            </div>
          </nav>
        </div>
      </div></>
  );
}

export default NavBar;
