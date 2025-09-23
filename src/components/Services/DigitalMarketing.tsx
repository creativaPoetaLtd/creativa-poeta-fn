import { useEffect, useState } from "react";
import { FaQuoteLeft, FaTiktok } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image2 from "../../assets/flags/image2.jpg";
import logo from "../../assets/flags/logopoeta1.png";
 import DesignLocale from "../../i18n/Services/Subservices/DesignLocale";
 import DigitalLocale from "../../i18n/Services/DigitalLocale";
import getLangFromLocalStorage from "../../../utils/Lang";
import{
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebook,
} from "react-icons/fa";

export const handleNavigate = () => {
  window.location.href = "/start-project";
};


// const lang: string = getLangFromLocalStorage();
const lang: keyof typeof DigitalLocale = getLangFromLocalStorage() as keyof typeof DigitalLocale;

const testimonials = [
  {
    quote: DesignLocale[lang].quote1,
    client: "Sarah Johnson",
    role: "CEO, TechNova",
    image: "/profile.jpg",
  },
  {
    quote: DesignLocale[lang].quote2,
    client: "James Lee",
    role: "Marketing Director, BrightWave",
    image: "/delivery.png",
  },
  {
    quote: DesignLocale[lang].quote3,
    client: "Emma Brown",
    role: "Founder, GreenNest",
    image: "/profile.jpg",
  },

  {
    quote: DesignLocale[lang].quote4,
    client: "John Doe",
    role: "CEO, TechNova",
    image: "/profile.jpg",
  },
  {
    quote: DesignLocale[lang].quote5,
    client: "Alice Smith",
    role: "Marketing Director, BrightWave",
    image: "/profile.jpg",
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };


  
  return (
    <section className="testimonial-slider hidden min-h-screen w-full md:w-[80%] items-center justify-center  flex-col max-w-screen-lg mx-auto mt-12 text-center  text-white rounded-lg shadow-lg relative z-10">
      <h2 className="text-2xl font-bold mb-8 text-[#EEBA2B]">
        What Our Clients Say
      </h2>

      <div className="overflow-hidden relative w-full">
        <div
          className="flex transition-transform duration-1000"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex flex-col items-center text-center px-4"
              style={{ flex: "0 0 100%" }}>
              <svg
                className="w-12 h-12 text-[#EEBA2B] mb-4"
                fill="currentColor"
                viewBox="0 0 24 24">
                <FaQuoteLeft />
              </svg>

              <p className="text-md md:text-lg italic px-4 lg:px-16 max-w-xl mx-auto leading-relaxed">
                "{testimonial.quote} "
              </p>

              <div className="mt-6 flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.client}`}
                  className="w-16 h-16 rounded-full shadow-lg mb-2"
                />
                <p className="text-lg font-semibold">{testimonial.client}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-[#EEBA2B]" : "bg-gray-500"
            }`}></button>
        ))}
      </div>
    </section>
  );
}

const relatedServices = [
  {
    title: DesignLocale[lang].title1,
    description: DesignLocale[lang].description1,
    icon: "/digital-marketing.jpg",
    link: "/services/digital-marketing",
  },
  {
    title: DesignLocale[lang].title2,
    description: DesignLocale[lang].description2,
    icon: "/content-writting.png",
    link: "/services/content-writing",
  },
  {
    title: DesignLocale[lang].title3,
    description: DesignLocale[lang].description3,
    icon: "/content-writting.png",
    link: "/services/content-writing",
  },
  {
    title: DesignLocale[lang].title4,
    description: DesignLocale[lang].description4,
    icon: "/videoProd.png",
    link: "/services/video-creation",
  },
];

export function RelatedServices() {
  return (
    <section className="related-services-section hidden w-full md:w-[95%] py-16 px-8  text-center z-10">
      <h2 className="text-2xl text-[#EEBA2B]  font-bold mb-8">
        {DesignLocale[lang].relatedServTitle}
      </h2>
      <div className="grid gap-8  laptop:grid-cols-4 md:grid-cols-2">
        {relatedServices.map((service, index) => (
          <div
            key={index}
            className="service-card p-6 bg-white text-black rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={service.icon}
              alt={`${service.title} Icon`}
              className="w-12 h-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-md md:text-lg mb-4">{service.description}</p>
            <a
              href={service.link}
              className="text-[#EEBA2B] font-semibold hover:text-black border-2 border-[#EEBA2B] py-2 px-4 rounded transition-colors duration-300">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
 { question: DigitalLocale[lang].question1, answer: DigitalLocale[lang].answer1 },
   { question: DigitalLocale[lang].question2, answer: DigitalLocale[lang].answer2 },
   { question: DigitalLocale[lang].question3, answer: DigitalLocale[lang].answer3 },
   { question: DigitalLocale[lang].question4, answer: DigitalLocale[lang].answer4 },
   { question: DigitalLocale[lang].question6, answer: DigitalLocale[lang].answer5 },
   { question: DigitalLocale[lang].question7, answer: DigitalLocale[lang].answer7 },
   { question: DigitalLocale[lang].question8, answer: DigitalLocale[lang].answer8 },
   { question: DigitalLocale[lang].question9, answer: DigitalLocale[lang].answer9 },
   { question: DigitalLocale[lang].question10, answer: DigitalLocale[lang].answer10 },
   { question: DigitalLocale[lang].question11, answer: DigitalLocale[lang].answer11 },
   { question: DigitalLocale[lang].question12, answer: DigitalLocale[lang].answer12 },
   { question: DigitalLocale[lang].question13, answer: DigitalLocale[lang].answer13 },
   { question: DigitalLocale[lang].question14, answer: DigitalLocale[lang].answer14 },
   { question: DigitalLocale[lang].question15, answer: DigitalLocale[lang].answer15 },
   { question: DigitalLocale[lang].question16, answer: DigitalLocale[lang].answer16 },
   { question: DigitalLocale[lang].question17, answer: DigitalLocale[lang].answer17 },
   { question: DigitalLocale[lang].question18, answer: DigitalLocale[lang].answer18 },
   { question: DigitalLocale[lang].question19, answer: DigitalLocale[lang].answer19 },
   { question: DigitalLocale[lang].question20, answer: DigitalLocale[lang].answer20 },
];



export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section w-full md:w-[95%] mx-auto my-12 p-8 text-gray-800  rounded-lg shadow-lg z-10">
      <h2 className="text-2xl font-bold text-center text-[#EEBA2B] mb-8">
        {DesignLocale[lang].faqTitle}
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full text-left text-md md:text-lg text-white font-bold focus:outline-none">
              {faq.question}
              <span className="text-2xl text-[#EEBA2B]">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            <div
              className={`mt-2 overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-screen" : "max-h-0"
              }`}>
              <p className="text-gray-100 mt-2 text-md md:text-lg">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const DigitalMarketings = () => {
  return (
    <div
      className="relative min-h-screen bg-white flex flex-col bg-transparent justify-center items-center "
      style={{
        backgroundImage: image2
          ? `url(${image2})`
          : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        transition: "background 0.9s ease-in-out",
        animation: "slideAnimation 0.9s ease-in-out",
        animationName: "slideAnimation",
      }}
      id="design-graphique">
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

      <Link to="/">
        <div className="logo top-5 text-white text-xl left-6 absolute ml-0 p-1 md:top-3 md:left-0 md:ml-11 md:text-4xl z-20">
          <img
            src={logo}
            alt="logo"
            className="w-[50%] h-[100%] md:w-[85%] md:h-[95%]"
          />
        </div>
      </Link>


<section className="min-h-fit h-screen justify-center  w-[95%] mt-28 md:mt-16 m-auto  px-4 flex flex-col items-center relative">
  <div className="flex flex-col md:gap-10 laptop:flex-row items-center justify-between w-full space-y-8 md:space-y-0 laptop:space-x-8 z-10">
    <div className="laptop:w-[45%] w-full flex flex-col items-start space-y-4 px-2 md:px-0 laptop:gap-16">
      <div className="flex flex-col space-y-2 gap-6 text-white w-full">
        <div className="w-fit">
           <h1 className="text-xl md:text-3xl font-bold">
          {DigitalLocale[lang]?.header1 || DigitalLocale.en.header1}
          </h1>
           <h1>{DesignLocale[lang].title1}</h1>
          <div className="bg-yellow-400 h-1 mt-2 w-full"></div>
        </div>
        <p className="text-[#EEBA2B] text-start text-lg md:text-xl italic">
         {DigitalLocale[lang]?.paragraph1 || DigitalLocale.en.paragraph1}
        </p> 
            
      </div>

      <div className="flex flex-col space-y-10 laptop:space-y-16  w-full mt-12">
        <p className="text-md md:text-lg text-justify leading-relaxed text-white">
        {DigitalLocale[lang]?.paragraph2 || DigitalLocale.en.paragraph2}
    </p>
        <button
          onClick={handleNavigate}
          className="contact us bg-[#EEBA2B] text-[#EEBA2B] w-full full md:w-1/4 flex text-center justify-center font-bold p-2 rounded-lg border-2 border-[#FFE533] hover:bg-yellow-400 hover:text-white transition-all">
          {DesignLocale[lang].action}
        </button>
      </div>
    </div>

    <div className="laptop:w-[45%] w-full h-ful md:height-[2rem] flex items-center justify-center">
      <img
        src="/digital-marketing.webp"
        alt="Advertising Design"
        className="object-contain rounded-lg shadow-md"
      />
    </div>
    
  </div>
</section>

<section className="service-type-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 md:p-8 rounded-lg flex flex-col z-10">
    
    <h2 className="text-2xl font-bold text-center mb-12 text-[#EEBA2B]">
    {DigitalLocale[lang]?.header2 || DigitalLocale.en.header2}
    </h2>

    <p className="text-md md:text-lg text-center mb-8">
    {DigitalLocale[lang]?.paragraph3 || DigitalLocale.en.paragraph3}
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-2 gap-8 text-black">
      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
          src="/webdev.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />      
    

         <h3 className="text-xl font-semibold mb-2">
        {DigitalLocale[lang]?.header3 || DigitalLocale.en.header3}
        </h3>
        <p className="md:w-[70%] text-center">
        {DigitalLocale[lang]?.paragraph4 || DigitalLocale.en.paragraph4}</p>
      </div>

      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
        <img
          src="/app.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />
        <h3 className="text-xl font-semibold mb-2">
        {DigitalLocale[lang]?.header4 || DigitalLocale.en.header4}
        </h3>
        <p className="md:w-[70%] text-center">
        {DigitalLocale[lang]?.paragraph5 || DigitalLocale.en.paragraph5}</p>
      </div>

      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
          src="/software.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />
        <h3 className="text-xl font-semibold mb-2">
            {DigitalLocale[lang]?.header5 || DigitalLocale.en.header5}
        </h3>
        <p className="md:w-[70%] text-center">	
          {DigitalLocale[lang]?.paragraph6 || DigitalLocale.en.paragraph6}
        </p>      
        </div>

      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
          src="/UI.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />
        <h3 className="text-xl font-semibold mb-2">
        {DigitalLocale[lang]?.header6 || DigitalLocale.en.header6}
        </h3>
        <p className="md:w-[70%] text-center">
            {DigitalLocale[lang]?.Paragraph7 || DigitalLocale.en.paragraph7}       </p>
      </div>
      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
          src="/UI.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />
        <h3 className="text-xl font-semibold mb-2">
       {DigitalLocale[lang]?.header7 || DigitalLocale.en.header7}
        </h3>
        <p className="md:w-[70%] text-center">
                {DigitalLocale[lang]?.paragraph8 || DigitalLocale.en.paragraph8}   </p>
      </div>
      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
          src="/UI.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />
        <h3 className="text-xl font-semibold mb-2">
        {DigitalLocale[lang]?.header8 || DigitalLocale.en.header8}
        </h3>
        <p className="md:w-[70%] text-center">
           {DigitalLocale[lang]?.paragraph9 || DigitalLocale.en.paragraph9} 
        </p>
      </div>
    </div>
    
  </section>


<section className="relative w-[89%] md:w-[87%] laptop:w-[92%] min-h-screen flex items-center justify-center bg-white rounded-md">
  {/* Container */}
  <div className="relative md:w-[70%] p-8 flex flex-col laptop:flex-row items-center gap-12">
    {/* Left side - Main circle */}
    <div className="w-52 md:w-64 shrink-0">
      <div className="relative bg-gradient-to-tr from-yellow-400 to-yellow-500 rounded-full w-48 h-48 md:w-64 md:h-64 border-4 border-white flex items-center justify-center shadow-lg">
        <div className="text-black text-center">
          <h2 className="font-bold text-xl md:text-3xl leading-tight">{DigitalLocale[lang]?.key || DigitalLocale.en.key}</h2>
          <h2 className="font-bold text-xl md:text-3xl leading-tight">{DigitalLocale[lang]?.competencies || DigitalLocale.en.competencies}</h2>
        </div>
      </div>
    </div>

    {/* Right side - Competency items */}
    <div className="flex-1 space-y-6 md:space-y-8">
      {[
         { number: "1", text: DigitalLocale[lang].key1 || DigitalLocale.en.key1, bgColor: "bg-[#E265FF]" },
    { number: "2", text: DigitalLocale[lang].key2 || DigitalLocale.en.key2, bgColor: "bg-[#8B3DFF]" },
    { number: "3", text:  DigitalLocale[lang].key3 || DigitalLocale.en.key3, bgColor: "bg-[#3DB9FF]" },
    { number: "4", text:  DigitalLocale[lang].key4 || DigitalLocale.en.key4, bgColor: "bg-[#FFA53D]" },
    { number: "5", text:  DigitalLocale[lang].key5 || DigitalLocale.en.key5, bgColor: "bg-[#76C56F]" },
      ].map(({ number, text, bgColor }, index) => (
        <div key={index} className="flex items-center gap-4">
          {/* Circle */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-black font-bold text-lg md:text-2xl shadow-md shrink-0">
            {number}
          </div>
          {/* Text Item */}
          <div
            className={`flex-1 py-3 px-4 md:py-4 md:px-6 rounded-lg text-white text-sm md:text-lg shadow-lg ${bgColor}`}
          >
            {text}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      
<section className="why-choose-us-section  relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-6 p-6 gap-5 md:gap-24 text-white rounded-lg mb-12 flex flex-col-reverse laptop:flex-row z-10">
  <div className="yellow-lines-container laptop:flex laptop:w-1/2 h-full">
    <img
      src="/content-why.webp"
      alt=""
      className=" w-[100%] md:w-[100%] md:h-auto rounded-md"
    />
  </div>
  <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
    <h2 className="text-2xl font-bold text-[#EEBA2B] mb-6">
      {DigitalLocale[lang]?.header9 || DigitalLocale.en.header9}
    </h2>
    <ul className="space-y-4 md:space-x-0 list-disc  p-4 h-full flex flex-col text-center md:text-start laptop:text-center justify-between">
      <li>
        <strong className="text-md md:text-lg">{DigitalLocale[lang]?.strong1 || DigitalLocale.en.strong1} </strong>
        {DigitalLocale[lang]?.list1 || DigitalLocale.en.list1}      </li>
      <li>
        <strong className="text-md md:text-lg">{DigitalLocale[lang]?.strong2 || DigitalLocale.en.strong2}</strong>
        {DigitalLocale[lang]?.list2 || DigitalLocale.en.list2}     </li>
      <li>
        <strong className="text-md md:text-lg">{DigitalLocale[lang]?.strong3 || DigitalLocale.en.strong3} </strong>
         {DigitalLocale[lang]?.list3 || DigitalLocale.en.list3}      </li>
      <li>
        <strong className="text-md md:text-lg">{DigitalLocale[lang]?.strong4 || DigitalLocale.en.strong4}</strong>
        {DigitalLocale[lang]?.list4 || DigitalLocale.en.list4}</li>
      <li>
        <strong className="text-md md:text-lg">{DigitalLocale[lang]?.strong5 || DigitalLocale.en.strong5} </strong>
        {DigitalLocale[lang]?.list5 || DigitalLocale.en.list5}</li>
    
    
    </ul>
  </div>
</section>


<section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10">
  <h2 className="text-2xl font-bold text-center mb-12 text-[#EEBA2B]">
    {DigitalLocale[lang]?.header10 || DigitalLocale.en.header10}
  </h2>

  <p className="text-md md:text-lg text-center mb-8">
      {DigitalLocale[lang]?.paragraph10 || DigitalLocale.en.paragraph10}  </p>

  <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
      <h3 className="text-xl font-semibold mb-2">
      {DigitalLocale[lang]?.header11 || DigitalLocale.en.header11}
      </h3>
      <p className="md:w-[70%] text-center">{DigitalLocale[lang]?.paragraph11 || DigitalLocale.en.paragraph11} 
       </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
        src="/content.webp"
        alt="Content Creators Icon"
        className="w-36 h-24 mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">
        {DigitalLocale[lang]?.header12 || DigitalLocale.en.header12}
      </h3>
      <p className="md:w-[70%] text-center">
      {DigitalLocale[lang]?.paragraph12 || DigitalLocale.en.paragraph12} </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
        src="/individual.png"
        alt="Individuals Icon"
        className="w-24 h-24 mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">
          {DigitalLocale[lang]?.header13 || DigitalLocale.en.header13}
      </h3>
      <p className="md:w-[70%] text-center">
      {DigitalLocale[lang]?.paragraph13 || DigitalLocale.en.paragraph13}      </p>
      </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
        src="/associations.png"
        alt="Associations Icon"
        className="w-32 h-24 mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">
      {DigitalLocale[lang]?.header14 || DigitalLocale.en.header14}
      </h3>
      <p className="md:w-[70%] text-center">
        {DigitalLocale[lang]?.paragraph14 || DigitalLocale.en.paragraph14}     </p>
      </div>
  </div>
</section>


<section className="content-creation-process-section w-[94%] max-w-screen-lg mx-auto mt-12 p-6 rounded-lg text-black shadow-lg relative z-10">
  <h2 className="text-2xl font-bold text-center mb-12 text-[#EEBA2B]">
   {DigitalLocale[lang]?.header15 || DigitalLocale.en.header15} </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-6 gap-5 justify-between items-center space-y-12 md:space-y-0 laptop:space-x-4">
    {/* Step 1 */}
    <div className="bg-[#ffffff] text-black p-6 w-full shadow-lg rounded-lg items-center text-center flex flex-col min-h-[15rem]">
      <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full text-black font-bold mb-4">
        1
      </div>
      <h3 className="text-lg font-semibold mb-2 p-3 border-2 border-black w-full">{DigitalLocale[lang]?.header16 || DigitalLocale.en.header16} </h3>
      <p className="text-sm">
       {DigitalLocale[lang]?.paragraph15 || DigitalLocale.en.paragraph15}      </p>
    </div>

    {/* Step 2 */}
    <div className="bg-[#ffffff] text-black p-6 shadow-lg rounded-lg w-full items-center text-center flex flex-col min-h-[15rem]">
      <div className="w-10 h-10  flex items-center justify-center border-2 border-black rounded-full text-black font-bold mb-4">
        2
      </div>
      <h3 className="text-lg font-semibold mb-2 p-3 border-2 border-black w-full">{DigitalLocale[lang]?.header17 || DigitalLocale.en.header17} </h3>
      <p className="text-sm">
      {DigitalLocale[lang]?.paragraph16 || DigitalLocale.en.paragraph16}     </p>
    </div>

    {/* Step 3 */}
    <div className="bg-[#ffffff] text-black p-6 shadow-lg rounded-lg w-full items-center text-center flex flex-col min-h-[15rem]">
      <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full text-black font-bold mb-4">
        3
      </div>
      <h3 className="text-lg font-semibold mb-2 p-3 border-2 border-black w-full">{DigitalLocale[lang]?.header18 || DigitalLocale.en.header18}</h3>
      <p className="text-sm">
          {DigitalLocale[lang]?.paragraph17 || DigitalLocale.en.paragraph17}  </p>
    </div>

    {/* Step 4 */}
    <div className="bg-[#ffffff] text-black p-6 shadow-lg rounded-lg w-full items-center text-center flex flex-col min-h-[15rem]">
      <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full text-black font-bold mb-4">
        4
      </div>
      <h3 className="text-lg font-semibold mb-2 p-3 border-2 border-black w-full">{DigitalLocale[lang]?.header19 || DigitalLocale.en.header19}</h3>
      <p className="text-sm">
           {DigitalLocale[lang]?.paragraph18 || DigitalLocale.en.paragraph18}  </p>
    </div>

    {/* Step 5 */}
    <div className="bg-[#ffffff] text-black p-6 shadow-lg rounded-lg w-full items-center text-center flex flex-col min-h-[15rem]">
      <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full text-black font-bold mb-4">
        5
      </div>
      <h3 className="text-lg font-semibold mb-2 p-3 border-2 border-black w-full">{DigitalLocale[lang]?.header20 || DigitalLocale.en.header20}</h3>
      <p className="text-sm">
           {DigitalLocale[lang]?.paragraph19 || DigitalLocale.en.paragraph19} </p>
    </div>
    {/* Step 6 */}
    <div className="bg-[#ffffff] text-black p-6 shadow-lg rounded-lg w-full items-center text-center flex flex-col min-h-[15rem]">
      <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full text-black font-bold mb-4">
        6
      </div>
      <h3 className="text-lg font-semibold mb-2 p-3 border-2 border-black w-full">{DigitalLocale[lang]?.header21 || DigitalLocale.en.header21}</h3>
      <p className="text-sm">
        {DigitalLocale[lang]?.paragraph20 || DigitalLocale.en.paragraph20}
      </p>    </div>
  </div>
</section>



      <section className="portfolio-section hidden w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 text-center  text-white z-10">
        <h2 className="text-2xl font-bold text-[#EEBA2B] mb-8">
          {DesignLocale[lang].portifolioTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/beauty.jpg"
              alt="Portfolio Item"
              className="w-[100%] h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Creative Logo
              </h3>
              <p className="text-white text-sm">For Tech Startup</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/card2.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Business card
              </h3>
              <p className="text-gray-300 text-sm">For a Company</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/port1.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">Flyer</h3>
              <p className="text-gray-300 text-sm">For a Business</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/port2.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">Poster</h3>
              <p className="text-gray-300 text-sm">For A business</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/port3.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">Poster</h3>
              <p className="text-gray-300 text-sm">For business advertising</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/port4.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Book Covers
              </h3>
              <p className="text-gray-300 text-sm">
                For individual or a business
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/contact"
            className="px-6 py-3 bg-[#EEBA2B] text-black font-semibold rounded-lg hover:bg-yellow-600">
            {DesignLocale[lang].ctaCaption}
          </a>
        </div>
      </section>

      <TestimonialSlider />
      <RelatedServices />
      <FAQSection />
      <section className="contact-section w-full md:w-[95%] py-16 px-6 text-white text-center flex flex-col items-center z-10">
  <h2 className="text-xl font-semibold p-4 mb-4">
   {DigitalLocale[lang]?.header22 || DigitalLocale.en.header22}
  </h2>
  <p className="text-md md:text-lg text-center mb-8 max-w-4xl mx-auto">{DigitalLocale[lang]?.paragraph21 || DigitalLocale.en.paragraph21}
   </p>

  <button
    onClick={handleNavigate}
    className="main-cta-btn bg-[#EEBA2B] text-black w-[90%] laptop:w-[30%] font-bold py-4 px-8 rounded-lg text-md md:text-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
     {DigitalLocale[lang]?.header23 || DigitalLocale.en.header23}
    </button>
</section>


      <section className="visual-elements w-[95%] hidden  md:w-[95%] rounded-md mb-4 bg-white py-16 px-4 text-gray-800 flex-col items-center z-10">
        <h2 className="text-2xl font-semibold text-center text-[#EEBA2B]  mb-12">
          {DesignLocale[lang].expTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          <div className="skill-item text-center">
            <img
              src="/logodesign.png"
              alt="Logo Design"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">
              {DesignLocale[lang].exp1}
            </h3>
            <p>{DesignLocale[lang].expdesc1}</p>
          </div>

          <div className="skill-item text-center">
            <img
              src="/businessCarddesign.png"
              alt="Business Card Design"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-md font-bold text-[#EEBA2B] mb-2">
              {DesignLocale[lang].exp2}
            </h3>
            <p>{DesignLocale[lang].expdesc2}</p>
          </div>

          <div className="skill-item text-center">
            <img
              src="/posterdesign.jpg"
              alt="Poster Design"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">
              {" "}
              {DesignLocale[lang].exp3}{" "}
            </h3>
            <p>{DesignLocale[lang].expdesc3}</p>
          </div>

          <div className="col-span-full">
            <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-6 text-center">
              {DesignLocale[lang].projTitle}
            </h3>
            <div className="carousel flex overflow-x-scroll space-x-4">
              <img
                src="/beauty.jpg"
                alt="Project 1"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/logos.webp"
                alt="Project 2"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/card1.webp"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/poster1.jpg"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/card2.jpg"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/poster2.jpg"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="social-sharing flex space-x-4 mt-8">
        <a href="https://web.facebook.com/profile.php?id=61550577241125&_rdc=1&_rdr#">
          <button className="text-black hover:text-[#EEBA2B]">
            <FaFacebook className="text-2xl" />
          </button>
          </a>
          <a href="https://www.instagram.com/creativapoeta_/">
          <button className="text-black hover:text-[#EEBA2B]">
            <FaInstagram className="text-2xl" />
          </button>
          </a>
          <a href="https://www.instagram.com/creativapoeta_/">
          <button className="text-black hover:text-[#EEBA2B]">
          <FaTiktok className="text-2xl" />
          </button>
          </a>
          <a href="https://www.linkedin.com/company/105066709/">
          <button className="text-black hover:text-[#EEBA2B]">
            <FaLinkedinIn className="text-2xl" />
          </button>
          </a>
          <a href="https://x.com/CreativaPoeta?t=-5QmeRVUl_M7lQbSOhC7JA&s=09">
          <button className="text-black hover:text-[#EEBA2B]">
            <FaTwitter className="text-2xl" />
          </button>
          </a>
         
        </div>

        {/* Links to Other Services */}
        <div className="related-services mt-12 text-center">
          <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-4">
            {DesignLocale[lang].explore}
          </h3>
          <div className="flex justify-center space-x-8">
            <a
              href="/services/digital-marketing"
              className="text-[#EEBA2B] hover:underline">
              {DesignLocale[lang].dm}
            </a>
            <a
              href="/services/content-writing"
              className="text-[#EEBA2B] hover:underline">
              {DesignLocale[lang].cw}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketings;
