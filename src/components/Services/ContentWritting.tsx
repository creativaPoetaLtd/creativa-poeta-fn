import { Link } from "react-router-dom";
import ContentWritingLocale from "../../i18n/ContentWritingLocale";
import getLangFromLocalStorage from "../../../utils/Lang";

const ContentWritting = () => {
  const lang = getLangFromLocalStorage();
  const t = ContentWritingLocale[lang] ?? ContentWritingLocale["en"];

  return (
    <section
      id="content-writing"
      className="w-full flex flex-col items-center justify-center bg-white text-black"
    >
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-r from-white to-yellow-50">
        <h1 className="text-4xl font-bold">
          {t.hero.title}
          <br />
          <span className="text-[#EEBA2B] text-2xl">{t.hero.subtitle}</span>
        </h1>
        <p className="text-xl mt-4">{t.hero.description}</p>
        <button className="mt-6 px-6 py-3 bg-[#EEBA2B] text-black font-bold rounded-lg hover:bg-yellow-400">
          {t.hero.cta}
        </button>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-6 text-center bg-gray-100 w-full">
        <h2 className="text-4xl font-bold mb-8 text-[#EEBA2B]">
          {t.testimonialsTitle}
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {t.testimonials.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3"
            >
              <p className="italic text-gray-700">"{item.quote}"</p>
              <h4 className="font-bold mt-4">{item.client}</h4>
              <span className="text-sm text-gray-500">{item.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="py-20 px-6 text-center bg-white w-full">
        <h2 className="text-4xl font-bold mb-8 text-[#EEBA2B]">
          {t.portfolioTitle}
        </h2>
        <p className="mb-6 text-gray-600">{t.portfolioDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.portfolio.map((item: any, index: number) => (
            <div
              key={index}
              className="relative group border-2 border-yellow-400 rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="object-cover w-full h-60 group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
              />
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-yellow-400 hover:text-yellow-500 transition-opacity duration-300 ease-in-out"
              >
                {t.viewDemo}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Related Services */}
      <div className="py-20 px-6 text-center bg-gray-100 w-full">
        <h2 className="text-4xl font-bold mb-8 text-[#EEBA2B]">
          {t.relatedServicesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.relatedServices.map((service: any, index: number) => (
            <Link
              to={service.link}
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition"
            >
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 px-6 text-center bg-white w-full">
        <h2 className="text-4xl font-bold mb-8 text-[#EEBA2B]">{t.faqTitle}</h2>
        <div className="space-y-6">
          {t.faq.map((item: any, index: number) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg shadow-md"
            >
              <h3 className="font-bold text-lg mb-2">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 px-6 text-center bg-gray-100 w-full">
        <h2 className="text-4xl font-bold mb-8 text-[#EEBA2B]">
          {t.whyChooseUsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.whyChooseUs.map((item: any, index: number) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default ContentWritting;
