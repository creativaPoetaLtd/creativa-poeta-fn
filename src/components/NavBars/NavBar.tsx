import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaTiktok,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import logoBurger from "../../assets/flags/logoBurger.png";
import NavLocale from "../../i18n/NavLocale";
import getLangFromLocalStorage from "../../../utils/Lang";
import { useAuth } from "../../contexts/AuthContext";
import BurgerButton from "./BurgerButton";
import { localizePath } from "../../data/marketRuntime";

type MenuService = [string, string, string];

const menuCopy: Record<
  string,
  {
    menu: string;
    close: string;
    audit: string;
    auditText: string;
    services: string;
    start: string;
    contact: string;
    assistanceRequest: string;
    assistanceRequestText: string;
    servicesList: MenuService[];
  }
> = {
  fr: {
    menu: "Menu",
    close: "Fermer le menu",
    audit: "Diagnostic visibilite",
    auditText: "Voir comment votre entreprise apparait sur Google et les outils IA",
    services: "Services",
    start: "Demarrer un projet",
    contact: "Contact",
    assistanceRequest: "Demander une assistance",
    assistanceRequestText: "Depannage, configuration et aide numerique pas a pas",
    servicesList: [
      ["Presence locale", "Google, Maps et visibilite IA", "/services/visibilite-locale"],
      ["Outils digitaux", "Sites, apps, logiciels et systemes", "/services/site-officiel"],
      ["Assistants IA", "GPT, chatbots et agents connectes", "/services/ia-automatisation"],
      ["Identite visuelle", "Logo, design et supports de marque", "/services/graphic-design"],
      ["Contenu documents", "Textes, CV, rapports et guides", "/services/content-writing"],
      ["Assistance numerique", "Depannage, installation et accompagnement", "/services/assistance-numerique"],
    ],
  },
  en: {
    menu: "Menu",
    close: "Close menu",
    audit: "Visibility diagnosis",
    auditText: "See how your business appears on Google and AI tools",
    services: "Services",
    start: "Start a project",
    contact: "Contact",
    assistanceRequest: "Request assistance",
    assistanceRequestText: "Troubleshooting, setup and step-by-step digital help",
    servicesList: [
      ["Local presence", "Google, Maps and AI visibility", "/services/visibilite-locale"],
      ["Digital tools", "Websites, apps, software and systems", "/services/site-officiel"],
      ["AI assistants", "GPTs, chatbots and connected agents", "/services/ia-automatisation"],
      ["Visual identity", "Logo, design and brand materials", "/services/graphic-design"],
      ["Content documents", "Copy, resumes, reports and guides", "/services/content-writing"],
      ["Digital assistance", "Troubleshooting, setup and guidance", "/services/assistance-numerique"],
    ],
  },
  nl: {
    menu: "Menu",
    close: "Menu sluiten",
    audit: "Zichtbaarheidsdiagnose",
    auditText: "Bekijk hoe uw bedrijf verschijnt op Google en AI-tools",
    services: "Diensten",
    start: "Start een project",
    contact: "Contact",
    assistanceRequest: "Digitale hulp aanvragen",
    assistanceRequestText: "Problemen oplossen, installatie en begeleiding",
    servicesList: [
      ["Lokale aanwezigheid", "Google, Maps en AI-zichtbaarheid", "/services/visibilite-locale"],
      ["Digitale tools", "Websites, apps, software en systemen", "/services/site-officiel"],
      ["AI-assistenten", "GPTs, chatbots en gekoppelde agents", "/services/ia-automatisation"],
      ["Visuele identiteit", "Logo, design en merkmateriaal", "/services/graphic-design"],
      ["Content documenten", "Teksten, CVs, rapporten en gidsen", "/services/content-writing"],
      ["Digitale hulp", "Problemen oplossen, installatie en begeleiding", "/services/assistance-numerique"],
    ],
  },
  kiny: {
    menu: "Menu",
    close: "Funga menu",
    audit: "Visibility diagnosis",
    auditText: "Reba uko business yawe igaragara kuri Google na AI tools",
    services: "Serivisi",
    start: "Tangira umushinga",
    contact: "Twandikire",
    assistanceRequest: "Saba assistance",
    assistanceRequestText: "Depannage, setup no kugufasha gukoresha digital",
    servicesList: [
      ["Local presence", "Google, Maps na AI visibility", "/services/visibilite-locale"],
      ["Digital tools", "Websites, apps, software na systems", "/services/site-officiel"],
      ["AI assistants", "GPTs, chatbots na agents", "/services/ia-automatisation"],
      ["Visual identity", "Logo, design na brand materials", "/services/graphic-design"],
      ["Content documents", "Texts, CV, reports na guides", "/services/content-writing"],
      ["Digital assistance", "Depannage, setup no kugufasha", "/services/assistance-numerique"],
    ],
  },
};

const blogCopy: Record<string, { label: string; text: string }> = {
  fr: {
    label: "Blog",
    text: "Guides pratiques sur la visibilite, le design et les outils digitaux",
  },
  en: {
    label: "Blog",
    text: "Practical guides on visibility, design and digital tools",
  },
  nl: {
    label: "Blog",
    text: "Praktische gidsen over zichtbaarheid, design en digitale tools",
  },
  kiny: {
    label: "Blog",
    text: "Guides kuri visibility, design na digital tools",
  },
};


function NavBar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [servicesSubMenuVisible, setServicesSubMenuVisible] = useState(true);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const adminDropdownRef = useRef<HTMLDivElement>(null);

  const lang = getLangFromLocalStorage();
  const navCopy = NavLocale[lang] ?? NavLocale.en;
  const copy = menuCopy[lang] ?? menuCopy.en;
  const primaryLinks = [
    {
      label: navCopy.home ?? "Home",
      text: "",
      href: localizePath("/"),
      featured: false,
    },
    {
      label: copy.audit,
      text: copy.auditText,
      href: localizePath("/tester-visibilite"),
      featured: true,
    },
    {
      label: copy.assistanceRequest,
      text: copy.assistanceRequestText,
      href: localizePath("/demander-assistance-numerique"),
      featured: true,
    },
    {
      label: (blogCopy[lang] ?? blogCopy.en).label,
      text: (blogCopy[lang] ?? blogCopy.en).text,
      href: localizePath("/blogs"),
      featured: false,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target as Node)
      ) {
        setAdminDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible((visible) => !visible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible((visible) => !visible);
  };

  const handleLogout = () => {
    logout();
    setAdminDropdownVisible(false);
  };

  const handleAdminDashboard = () => {
    navigate("/secure-admin-dashboard-2024");
    setAdminDropdownVisible(false);
  };

  return (
    <>
      <div className="cp-nav-actions fixed left-0 right-0 top-5 z-50 flex items-center justify-end gap-1 px-2 phone:gap-4 phone:px-4">
        {isAuthenticated && (
          <div className="relative" ref={adminDropdownRef}>
            <button
              onClick={toggleAdminDropdown}
              className="flex items-center space-x-2 rounded-full bg-[#EEBA2B] px-3 py-2 font-bold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#FFE533]"
              title="Admin Menu"
            >
              <FaUser className="text-sm" />
              <span className="hidden text-xs md:block">Admin</span>
              <FaChevronDown
                className={`text-xs transition-transform duration-200 ${
                  adminDropdownVisible ? "rotate-180" : ""
                }`}
              />
            </button>

            {adminDropdownVisible && (
              <div className="absolute right-0 z-60 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                <button
                  onClick={handleAdminDashboard}
                  className="flex w-full items-center space-x-3 px-4 py-2 text-left text-gray-700 transition-colors duration-150 hover:bg-gray-100"
                >
                  <FaTachometerAlt className="text-[#EEBA2B]" />
                  <span>Admin Dashboard</span>
                </button>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center space-x-3 px-4 py-2 text-left text-red-600 transition-colors duration-150 hover:bg-red-50"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}

        <BurgerButton
          sidebarVisible={sidebarVisible}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <aside
        className={`sidebar fixed z-50 mx-auto w-[86%] max-w-[27rem] justify-end border-l border-[#EEBA2B]/30 bg-[linear-gradient(155deg,rgba(0,0,0,.98),rgba(7,26,51,.98))] shadow-[0_0_60px_rgba(0,0,0,.65)] tablet:w-[25rem] laptop:w-[27rem] desktop:w-[28rem] ${
          sidebarVisible ? "visible" : "sidebar-closing"
        }`}
      >
        <nav
          className={`navbar flex min-h-[94vh] max-h-[100vh] flex-col justify-start overflow-y-auto p-5 phone:p-7 ${
            sidebarVisible ? "" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[#fff200]">
              {copy.menu}
            </p>
            <button
              type="button"
              onClick={closeSidebar}
              aria-label={copy.close}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition hover:border-[#fff200] hover:text-[#fff200]"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex h-fit flex-col gap-3 pb-32 pt-5">
            <div className="grid gap-2">
              {primaryLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`group rounded-2xl border px-4 py-3 text-white transition hover:border-[#EEBA2B]/70 hover:bg-[#EEBA2B]/10 hover:text-[#fff200] ${
                    item.featured
                      ? "border-[#EEBA2B]/35 bg-[#EEBA2B]/10"
                      : "border-white/10 bg-white/[.04]"
                  } ${
                    location.pathname === item.href
                      ? "border-[#EEBA2B]/70 text-[#fff200]"
                      : ""
                  }`}
                >
                  <span className="flex items-center justify-between text-base font-black phone:text-lg">
                    <span>{item.label}</span>
                    <span className="h-2 w-2 rounded-full bg-[#EEBA2B] opacity-0 transition group-hover:opacity-100" />
                  </span>
                  {item.text && (
                    <span className="mt-1 block text-[11px] font-bold leading-4 text-white/65">
                      {item.text}
                    </span>
                  )}
                </a>
              ))}
            </div>

            <div className="rounded-[1.35rem] border border-[#EEBA2B]/30 bg-black/25 p-3">
              <button
                type="button"
                onClick={() => setServicesSubMenuVisible((visible) => !visible)}
                className="flex w-full items-center justify-between px-1 py-1 text-left"
              >
                <span className="text-xs font-black uppercase tracking-[.22em] text-[#fff200]">
                  {copy.services}
                </span>
                <FaChevronDown
                  className={`text-sm text-[#fff200] transition ${
                    servicesSubMenuVisible ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesSubMenuVisible && (
                <div className="mt-3 grid gap-2">
                  {copy.servicesList.map(([title, text, path]) => (
                    <Link
                      key={path}
                      to={localizePath(path)}
                      onClick={closeSidebar}
                      className="group rounded-2xl border border-white/10 bg-[#071a33]/65 px-3 py-3 text-white transition hover:border-[#EEBA2B]/70 hover:bg-[#071a33]"
                    >
                      <span className="block text-sm font-black leading-tight text-white group-hover:text-[#fff200]">
                        {title}
                      </span>
                      <span className="mt-1 block text-[11px] font-bold leading-4 text-white/65">
                        {text}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to={localizePath("/start-project")}
                onClick={closeSidebar}
                className="inline-flex min-w-0 items-center justify-center rounded-full border-2 border-[#fff200] bg-[#fff200] px-3 py-3 text-center text-[11px] font-black uppercase leading-tight text-[#071a33] transition hover:bg-transparent hover:text-[#fff200]"
              >
                {copy.start}
              </Link>
              <Link
                to={localizePath("/contact")}
                onClick={closeSidebar}
                className="inline-flex min-w-0 items-center justify-center rounded-full border-2 border-white px-3 py-3 text-center text-[11px] font-black uppercase leading-tight text-white transition hover:border-[#fff200] hover:text-[#fff200]"
              >
                {copy.contact}
              </Link>
            </div>
          </div>

          <img
            src={logoBurger}
            alt="Creativa Poeta"
            className="pointer-events-none mx-auto -mt-24 w-[58%] max-w-[13rem] object-cover opacity-90"
          />

          <div className="absolute bottom-5 left-5 flex space-x-4 text-xl phone:left-7">
            <a
              href="https://web.facebook.com/profile.php?id=61550577241125&_rdc=1&_rdr#"
              className="text-white transition hover:text-[#fff200]"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/CreativaPoeta?t=-5QmeRVUl_M7lQbSOhC7JA&s=09"
              className="text-white transition hover:text-[#fff200]"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/creativapoeta_/"
              className="text-white transition hover:text-[#fff200]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@creativapoeta?_t=ZM-8sjgBGfxZna&_r=1"
              className="text-white transition hover:text-[#fff200]"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.linkedin.com/company/105066709/"
              className="text-white transition hover:text-[#fff200]"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default NavBar;

