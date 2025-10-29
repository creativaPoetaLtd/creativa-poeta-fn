import { Link } from "react-router-dom";
import image8 from "../assets/flags/image8.jpg";
import thankyouLocale from "../i18n/thankyouLocale";
import getLangFromLocalStorage from "../../utils/Lang";

const ThankYouPage = () => {
  // Get language inside the component
  let lang: string = getLangFromLocalStorage() || "en";
  lang = lang.toLowerCase(); // ensure it matches keys in thankyouLocale

  // Safely access locale with fallback to English
  const locale =
    thankyouLocale[lang as keyof typeof thankyouLocale] || thankyouLocale.en;
  const { title, message, ending, company, headline, button } = locale;

  // Optional: debug logs
  console.log("Current language:", lang);
  console.log("Locale used:", locale);

  return (
    <div
      className="flex justify-center items-center min-h-screen relative "
      style={{
        backgroundImage: `url(${image8})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* <div></div> */}
      <div className="relative bg-white p-8 border border-[#EEBA2B] rounded-lg shadow-lg max-w-xl w-[90%] md:w-full text-center z-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mt-6 mb-6">{message}</p>
        <p className="text-lg text-gray-500 mb-6">{ending}</p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#EEBA2B] text-white font-semibold rounded-md hover:bg-[#8b6e1c]"
        >
          {button}
        </Link>
        <p className="text-sm font-semibold text-gray-700 mt-6">{company}</p>
        <h2 className="text-sm font-medium">{headline}</h2>
      </div>
    </div>
  );
};

export default ThankYouPage;
