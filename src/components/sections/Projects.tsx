import ProjectsLocale from "../../i18n/ProjectsLocale";
import getLangFromLocalStorage from "../../../utils/Lang";
const Projects = () => {
   const lang = getLangFromLocalStorage();
  return (
    <section
      id="projects"
      className="projects desktop:flex flex-col h-screen max-h-fit  w-full bg-red-600">
      <div className="w-full min-w-screen backdrop-blur-xs backdrop-blur-lg flex flex-col space-y-7 bg-gradient-to-r from-white to-transparent">
        <h1 className="laptop:text-4xl desktop:text-4xl tablet:text-3xl text-2xl font-bold mx-auto text-[#EEBA2B]">
          <b className="text-black">  {ProjectsLocale[lang]?.headingPart1 ?? ProjectsLocale["en"].headingPart1}</b>
          <br />
          {ProjectsLocale[lang]?.headingPart2 ?? ProjectsLocale["en"].headingPart2}
        </h1>
      </div>

      <div className="projects desktop:flex laptop:flex tablet:grid tablet:grid-cols-2 phone:grid-cols-1 grid-cols-1 desktop:flex-row laptop:flex-row max-h-screen overflow-y-auto laptop:px-28 desktop:px-28 tablet:px-8 px-4 w-full laptop:space-x-8 desktop:space-x-8 tablet:space-x-2 space-x-0 bg-gray-500">
        {/* Column 1 */}
        <div className="laptop:w-[32%] desktop:w-[32%] tablet:w-59 w-full flex flex-col laptop:space-y-20 desktop:space-y-20 tablet:space-y-20 space-y-8 h-screen py-5">
          {/* Kompras project */}
          <div className="relative group w-full h-[45%] border-yellow-400 border-2 rounded-lg overflow-hidden">
            <img
              src="/kompras.png"
              alt="Kompras"
              className="object-scale-down w-full h-full group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
            />
            <a
              href="https://komparas.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-yellow-400 hover:text-yellow-500 transition-opacity duration-300 ease-in-out">
              {ProjectsLocale[lang]?.viewDemo ?? ProjectsLocale["en"].viewDemo}
            </a>
          </div>

          {/* Poeta project */}
          <div className="relative group w-full h-[45%] border-yellow-400 border-2 rounded-lg overflow-hidden">
            <img
              src="/poeta.jpeg"
              alt="Poeta"
              className="object-scale-down w-full h-full group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
            />
            <a
              href="https://creativapoeta.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-yellow-400 hover:text-yellow-500 transition-opacity duration-300 ease-in-out">
              {/* View Demo */} {ProjectsLocale[lang]?.viewDemo ?? ProjectsLocale["en"].viewDemo}
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="laptop:w-[32%] desktop:w-[32%] w-full flex flex-col laptop:space-y-12 desktop:space-y-12 tablet:space-y-12 space-y-8 h-screen laptop:pt-16 desktop:pt-16 tablet:pt-16 pt-1 pb-2">
          {/* QiewCode project */}
          <div className="relative group w-full h-[47%] border-yellow-400 border-2 rounded-lg overflow-hidden">
            <img
              src="/qiewcode.png"
              alt="QiewCode"
              className="object-scale-down w-full h-full group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
            />
            <a
              href="https://quecode.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-yellow-400 hover:text-yellow-500 transition-opacity duration-300 ease-in-out">
               {ProjectsLocale[lang]?.viewDemo ?? ProjectsLocale["en"].viewDemo}
            </a>
          </div>

          {/* Duplicate Poeta project */}
          <div className="relative group w-full h-[47%] border-yellow-400 border-2 rounded-lg overflow-hidden">
            <img
              src="/poeta.jpeg"
              alt="Poeta"
              className="object-scale-down w-full h-full group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
            />
            <a
              href="https://creativapoeta.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-yellow-400 hover:text-yellow-500 transition-opacity duration-300 ease-in-out">
              {/* View Demo */}{ProjectsLocale[lang]?.viewDemo ?? ProjectsLocale["en"].viewDemo}
            </a>
          </div>
        </div>

        {/* Column 3 */}
        <div className="laptop:w-[32%] desktop:w-[32%] w-full flex flex-col laptop:space-y-10 desktop:space-y-10 tablet:space-y-20 laptop:mt-7 desktop:mt-7 mt-0 space-y-8 h-screen py-5">
          {/* Duplicate QiewCode project */}
          <div className="relative group w-full h-[45%] border-yellow-400 border-2 rounded-lg overflow-hidden">
            <img
              src="/qiewcode.png"
              alt="QiewCode"
              className="object-scale-down w-full h-full group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
            />
            <a
              href="https://quecode.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-yellow-400 hover:text-yellow-500 transition-opacity duration-300 ease-in-out">
              {/* View Demo */}     {ProjectsLocale[lang]?.viewDemo ?? ProjectsLocale["en"].viewDemo}
            </a>
          </div>

          {/* Duplicate Poeta project */}
          <div className="relative group w-full h-[45%] border-yellow-400 border-2 rounded-lg overflow-hidden">
            <img
              src="/poeta.jpeg"
              alt="Poeta"
              className="object-scale-down w-full h-full group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
            />
            <a
              href="https://creativapoeta.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-yellow-400 hover:text-yellow-500 transition-opacity duration-300 ease-in-out">
              {/* View Demo */}      {ProjectsLocale[lang]?.viewDemo ?? ProjectsLocale["en"].viewDemo}
            </a>
          </div>
        </div>
      </div>

      {/* <dc iv className="laptop:h-[9%] tablet:h-[7%] phone:h-[6%] h-[5%] laptop:w-[5.57%] tablet:w-[3%] w-[4%] absolute laptop:left-0 left-0 top-0 border-r-2 border-white"></div> */}
    </section>
  );
};

export default Projects;
