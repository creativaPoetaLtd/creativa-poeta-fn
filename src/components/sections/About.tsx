import getLangFromLocalStorage from "../../../utils/Lang";
import AboutLocale from "../../i18n/AboutLocale";
import image8 from "../../assets/flags/image8.jpg";
import { useState, useEffect } from "react";
import image4 from "../../assets/flags/image4.jpg";

const lang: any = getLangFromLocalStorage();

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const backgrounds = [
    { image: image8 },
    { image: image4 },
  ];

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX) return;
    const touchEndX = e.touches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const sensitivity = 50;

    if (deltaX > sensitivity) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + backgrounds.length) % backgrounds.length);
      setTouchStartX(null);
    } else if (deltaX < -sensitivity) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => setTouchStartX(null);

  const currentBackground = backgrounds[currentIndex];

  return (
    <section
      id="about"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundImage: `url(${currentBackground.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="about h-fit min-h-screen flex flex-col justify-center items-center relative"
    >
      <div className="w-full py-6 text-center bg-gradient-to-r from-white to-black">
        <h1 className="text-4xl laptop:text-5xl font-bold text-[#FFE533]">
          <span className="text-black">{AboutLocale[lang].title1}</span>
          <br />
          {AboutLocale[lang].title2}
        </h1>
      </div>

      <div
        className="h-fit min-h-screen backdrop-blur-sm flex flex-col justify-center items-center text-center relative"
        style={{ backgroundColor: "rgba(245, 233, 66, 0.4)" }}
      >
        <div className="flex flex-col laptop:w-[70%] w-[90%] space-y-10 mt-10">
          <p className="text-lg laptop:text-2xl text-slate-800 leading-relaxed text-justify">
            {AboutLocale[lang].decription}
          </p>
        </div>
        <a
          href="/contact"
          className="mt-10 bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 border-2 border-[#FFE533] transition-all duration-300"
        >
          {AboutLocale[lang].action}
        </a>
      </div>
    </section>
  );
};

export default About;
