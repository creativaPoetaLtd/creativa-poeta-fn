import { useEffect, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import BackgroundCircles from "../buttons/BackgroundCircles";
import SectionScrollButton from "../buttons/SectionScrollButton";
import SlideLeft from "../buttons/SlideLeft";
import SlideRight from "../buttons/SlideRight";
import logopoeta1 from "../../assets/flags/logopoeta1.png";
import Confirm from "../unUsedComponents/Confirm";
import { Link, useLocation } from "react-router-dom";
import HomeLocale from "../../i18n/HomeLocale";
import {
  getCurrentLocale,
  getCurrentMarket,
  localizePath,
} from "../../data/marketRuntime";

const Home = () => {
  const market = getCurrentMarket();
  const lang = getCurrentLocale(market);
  const homeCopy = HomeLocale[lang] ?? HomeLocale.en;
  const backgrounds = [
    {
      image: "",
      content: {
        title: homeCopy.title1,
        description: homeCopy.description1,
      },
    },
    {
      image: "",
      content: {
        title: homeCopy.title2,
        description: homeCopy.description2,
      },
    },
    {
      image: "",
      content: {
        title: homeCopy.title3,
        description: homeCopy.description3,
      },
    },
    {
      image: "",
      content: {
        title: homeCopy.title4,
        description: homeCopy.description4,
      },
    },
  ];
  const [hoveredIcon, setHoveredIcon] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [istToken, setToken] = useState(false);
  const [isTokenValid, setTokenValid] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [successMessage, setsuccessMessage] = useState("" as any);
  const [errorMessage, setErrorMessage] = useState("" as any);

  useEffect(() => {
    if (token) {
      setToken(true);
    }
  }, [token]);

  useEffect(() => {
    const confirmToken = async () => {
      const res = await fetch("https://blue-angry-gorilla.cyclic.app/confirm", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const data = await res.json();
      if (data.error) setTokenValid(true);
      else setTokenValid(false);
      const message = data?.message;
      const emes = data?.error;
      setErrorMessage(emes);
      setsuccessMessage(message);
    };
    confirmToken();
  }, [token]);

  const handleCloseConfitm = () => {
    setToken(false);
  };

  // const [touchStartX, setTouchStartX] = useState(null); // Add this line
  const [touchStartX, setTouchStartX] = useState<number | null>(null); // Adjust the state type
  const prevIndex =
    (currentIndex - 1 + backgrounds.length) % backgrounds.length;

  const handleIconHover = (iconName: string) => {
    setHoveredIcon(iconName);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const titleTimeout = setTimeout(() => {
      setShowTitle(true);
    }, 900);

    const descriptionTimeout = setTimeout(() => {
      setShowDescription(true);
    }, 10000);

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(descriptionTimeout);
    };
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX) return;

    const touch = e.touches[0];
    const touchEndX = touch.clientX;

    const deltaX = touchEndX - touchStartX;
    const sensitivity = 50;

    if (deltaX > sensitivity) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + backgrounds.length) % backgrounds.length
      );
      setTouchStartX(null);
    } else if (deltaX < -sensitivity) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const handleNavigateToServices = () => {
    window.location.href = `${localizePath("/")}#services`;
  };
  const currentBackground = backgrounds[currentIndex];
  const handleVisibilityTest = () => {
    window.location.href = localizePath("/tester-visibilite");
  };

  return (
    <section
      id="home"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`homesec h-fit min-h-screen laptop:m-0 tablet:m-0 tablet:-0 flex flex-col laptop:p-[10rem] tablet:p-[8rem] laptop:pr-[4rem] tablet:pr-[4rem] laptop:justify-center laptop:text-center text-center tablet:text-center items-center my-auto justify-center px-2 relative ${
        currentIndex === prevIndex ? "slide-in" : "slide-out"
      }`}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        transition: "background 0.9s ease-in-out",
        animation: "slideAnimation 0.9s ease-in-out",
        animationName: "slideAnimation",
      }}
    >
      <Link
        to={localizePath("/")}
        aria-label="Retour a l'accueil Creativa Poeta"
        className="logo laptop:top-0 desktop:top-0 tablet:top-3 md:top-3 top-5 laptop:text-4xl desktop:text-4xl text-xl  phone:left-8 tablet:left-8 desktop:left-8 md:left-8 laptop:left-8 left-4 laptop:ml-11 desktop:ml-11 ml-0 absolute laptop:p-1 desktop:p-1"
      >
        <img
          src={logopoeta1}
          alt="Creativa Poeta"
          className="laptop:w-[85%] desktop:w-[85%] laptop:h-[95%] desktop:h-[95%] h-[100%] w-[50%]"
        />
      </Link>
      <div className="">
        <div className="flex justify-between">
          <div className="flex flex-col laptop:w-[72%] tablet:w-[80%] w-full justify-center laptop:m-0 items-center">
            <div className="phone:space-y-3 xs:space-y-1 laptop:space-y-0 text-center">
              <h1
                className={`laptop:text-4xl desktop:text-4xl laptop:pb-7 desktop:pb-7 tablet:-bottom-7 pb-7 xs:pb-2 tablet:text-4xl md:text-4xl text-sm text-[#FFFF00] phone:text-3xl font-bold laptop:px-0 desktop:px-0 tablet:px-0 mdpx0 px-7 mx-0 animate-fade-in animate-bounce ${
                  showTitle ? "visible2" : ""
                }`}
              >
                {currentBackground.content.title.toLocaleUpperCase()}
              </h1>
              <p
                className={`animate-bounce leading-tight text-center laptop:ox-0 desktop:px-0 tablet:px-0 mdpx0 px-7 font-semibold text-white animate-slide-up ${
                  currentBackground.content.title === "CREATIVE MODERN DESIGN"
                    ? "laptop:text-xl desktop:text-xl phone:text-lg tablet:text-1xl text-lg xs:text-sm "
                    : "laptop:text-2xl desktop:text-2xl phone:text-lg tablet:text-1xl text-lg xs:text-sm"
                } ${showDescription ? "visible2" : ""}`}
              >
                {currentBackground.content.description}
              </p>
            </div>
            <div className="flex animate-bounce flex-row gap-2 phone:gap-3 laptop:gap-5 mt-12 mx-auto laptop:mx-auto w-full justify-center items-center px-3">
              <button
                onClick={handleVisibilityTest}
                className="hover:bg-white hover:text-black text-white laptop:w-[300px] min-w-0 flex-1 max-w-[300px] px-2 phone:px-5 laptop:px-10 laptop:py-3 desktop:py-3 phone:py-3 tablet:py-3 xs:py-2 laptop:text-base desktop:text-base tablet:text-base phone:text-base xs:text-xs border-2 border-white animate-fade-in whitespace-nowrap"
              >
                {homeCopy.action1}
              </button>

              <button
                onClick={handleNavigateToServices}
                className="hover:bg-white hover:text-black text-white laptop:w-[300px] min-w-0 flex-1 max-w-[300px] px-2 phone:px-5 laptop:px-10 laptop:py-3 desktop:py-3 phone:py-3 tablet:py-3 xs:py-2 laptop:text-base desktop:text-base tablet:text-base phone:text-base xs:text-xs border-2 border-white animate-fade-in whitespace-nowrap"
              >
                {homeCopy.action2}
              </button>
            </div>

            <SlideLeft
              backgrounds={backgrounds}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <SlideRight
              backgrounds={backgrounds}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <BackgroundCircles
              backgrounds={backgrounds}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
          <div className="laptop:block tablet:block hidden absolute right-60 ">
            <div className="flex flex-col space-y-5 animate-pulse hover:animate-none py-20">
              <a href="https://x.com/CreativaPoeta?t=-5QmeRVUl_M7lQbSOhC7JA&s=09">
                <div
                  className={`group rounded-full h-[3rem] w-[3rem] border-4 text-slate-500 text-center items-center flex justify-center text-xl  border-gray-500 cursor-pointer animate-icon ${
                    hoveredIcon === "Twitter" ? "animate-icon-active" : ""
                  }`}
                  onMouseEnter={() => handleIconHover("Twitter")}
                  onMouseLeave={() => handleIconHover("")}
                >
                  <span
                    className={`absolute -right-20 text-[#FFFF00] ${
                      hoveredIcon === "Twitter" ? "block" : "hidden"
                    }`}
                  >
                    Twitter
                  </span>
                  <AiOutlineTwitter />
                </div>
              </a>
              <a href="https://web.facebook.com/profile.php?id=61550577241125&_rdc=1&_rdr">
                <div
                  className={`group rounded-full h-[3rem] w-[3rem] border-4 text-slate-500 text-center items-center flex justify-center text-xl  border-gray-500 cursor-pointer animate-icon ${
                    hoveredIcon === "Facebook" ? "animate-icon-active" : ""
                  }`}
                  onMouseEnter={() => handleIconHover("Facebook")}
                  onMouseLeave={() => handleIconHover("")}
                >
                  <span
                    className={`absolute -right-24 text-[#FFFF00] ${
                      hoveredIcon === "Facebook" ? "block" : "hidden"
                    }`}
                  >
                    Facebook
                  </span>
                  <FaFacebookF />
                </div>
              </a>
              <a href="https://www.instagram.com/creativapoeta_/">
                <div
                  className={`group rounded-full h-[3rem] w-[3rem] border-4 text-slate-500 text-center items-center flex justify-center text-xl  border-gray-500 cursor-pointer animate-icon ${
                    hoveredIcon === "Instagram" ? "animate-icon-active" : ""
                  }`}
                  onMouseEnter={() => handleIconHover("Instagram")}
                  onMouseLeave={() => handleIconHover("")}
                >
                  <span
                    className={`absolute -right-28 text-[#FFFF00] ${
                      hoveredIcon === "Instagram" ? "block" : "hidden"
                    }`}
                  >
                    Instagram
                  </span>
                  <FaInstagram />
                </div>
              </a>
              <a href="https://www.tiktok.com/@creativapoeta?_t=ZM-8sjgBGfxZna&_r=1">
                <div
                  className={`group rounded-full h-[3rem] w-[3rem] border-4 text-slate-500 text-center items-center flex justify-center text-xl  border-gray-500 cursor-pointer animate-icon ${
                    hoveredIcon === "Tick Tok" ? "animate-icon-active" : ""
                  }`}
                  onMouseEnter={() => handleIconHover("Tick Tok")}
                  onMouseLeave={() => handleIconHover("")}
                >
                  <span
                    className={`absolute -right-28 text-[#FFFF00] ${
                      hoveredIcon === "Tick Tok" ? "block" : "hidden"
                    }`}
                  >
                    TickTok
                  </span>
                  <FaTiktok />
                </div>
              </a>
              <a href="https://www.linkedin.com/company/105066709/">
                <div
                  className={`group rounded-full h-[3rem] w-[3rem] border-4 text-slate-500 text-center items-center flex justify-center text-xl  border-gray-500 cursor-pointer animate-icon ${
                    hoveredIcon === "LinkedIn" ? "animate-icon-active" : ""
                  }`}
                  onMouseEnter={() => handleIconHover("LinkedIn")}
                  onMouseLeave={() => handleIconHover("")}
                >
                  <span
                    className={`absolute -right-24 text-[#FFFF00] ${
                      hoveredIcon === "LinkedIn" ? "block" : "hidden"
                    }`}
                  >
                    LinkedIn
                  </span>
                  <FaLinkedinIn />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <SectionScrollButton
        label={homeCopy.scroll}
        targetId="__next-section"
        side="right"
        tone="light"
        topColor="#EEBA2B"
        bottomColor="#071a33"
      />

      {istToken && !isTokenValid && (
        <Confirm
          message={successMessage}
          isSuccess={true}
          onClose={handleCloseConfitm}
        />
      )}
      {istToken && isTokenValid && (
        <Confirm
          message={errorMessage}
          isSuccess={false}
          onClose={handleCloseConfitm}
        />
      )}
    </section>
  );
};

export default Home;
