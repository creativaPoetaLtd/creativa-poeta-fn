import { useEffect, useState } from "react";
import { FaQuoteLeft, FaTiktok } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image2 from "../../assets/flags/image2.jpg";
import logo from "../../assets/flags/logopoeta1.png";
import DesignLocale from "../../i18n/Services/Subservices/DesignLocale";
import getLangFromLocalStorage from "../../../utils/Lang";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebook,
} from "react-icons/fa";
import { handleNavigate } from "./DigitalMarketing";
const lang: string = getLangFromLocalStorage();

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
  {
    "question": "What types of websites do you develop?",
    "answer": "We specialize in developing various types of websites, including e-commerce platforms, corporate websites, personal blogs, portfolio sites, and custom web applications tailored to your business needs."
  },
  {
    "question": "What technologies do you use for web development?",
    "answer": "Our team uses modern technologies such as React, Angular, Vue.js, Node.js, Django, and Laravel. For design, we leverage tools like Tailwind CSS, Bootstrap, and Material UI, ensuring fast, responsive, and user-friendly websites."
  },
  {
    "question": "Do you offer mobile app development services?",
    "answer": "Yes, we provide mobile app development services for both iOS and Android platforms. We use tools like React Native and Flutter for cross-platform apps, and native development for highly customized experiences."
  },
  {
    "question": "Can you integrate third-party services into the website or app?",
    "answer": "Absolutely! We can integrate third-party services such as payment gateways (Stripe, PayPal), social media platforms, CRM systems, analytics tools, and more to enhance the functionality of your website or app."
  },
  {
    "question": "How do you ensure the security of web and app projects?",
    "answer": "We prioritize security by implementing HTTPS, data encryption, regular vulnerability scans, and secure coding practices. We also ensure compliance with industry standards like GDPR for data protection."
  },
  {
    "question": "Do you provide maintenance and support after project completion?",
    "answer": "Yes, we offer post-launch maintenance and support services, including bug fixes, updates, performance optimization, and feature enhancements to ensure your website or app stays up-to-date."
  },
  {
    "question": "How long does it take to develop a website or an app?",
    "answer": "The timeline depends on the complexity of the project. Simple websites can take 2-4 weeks, while more complex web applications or mobile apps may take 8-16 weeks or longer, depending on your requirements."
  },
  {
    "question": "Can you help with SEO and performance optimization?",
    "answer": "Yes, we offer SEO services to improve your website's visibility on search engines, and we optimize performance by improving loading speeds, implementing caching strategies, and using efficient coding practices."
  },
  {
    "question": "Do you provide custom designs for websites and apps?",
    "answer": "Absolutely! Our design team creates custom, user-centric designs tailored to your brand identity, ensuring your website or app stands out and provides a seamless user experience."
  },
  {
    "question": "What is the cost of developing a website or app?",
    "answer": "The cost varies based on project requirements, complexity, and features. Contact us with your project details for a tailored quote."
  }
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

const WebApp = () => {
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
          {/* <h1 className="text-xl md:text-3xl font-bold">
          Web & app development
          </h1> */}
          <h1>{DesignLocale[lang].webAppTitle}</h1>
          <div className="bg-yellow-400 h-1 mt-2 w-full"></div>
        </div>
        {/* <p className="text-[#EEBA2B] text-start text-lg md:text-xl italic">
        Innovative digital solutions, tailored for your needs.
        </p> */}
        <p>{DesignLocale[lang].webAppSubtitle}</p>
      </div>

      <div className="flex flex-col space-y-10 laptop:space-y-16 w-full mt-12">
        {/* <p className="text-md md:text-lg text-justify leading-relaxed text-white">
        In the ever-evolving digital landscape, a robust and engaging online presence is essential. At Creativa Poeta, we transform your ideas into digital realities by crafting modern websites, powerful applications, and custom software solutions designed to elevate your business.
</p> */}
       
       <p className="text-md md:text-lg text-justify leading-relaxed text-white">
  {DesignLocale[lang].webAppIntro}
</p>
        <button
          onClick={handleNavigate}
          className="contact us bg-[#EEBA2B] text-[#EEBA2B] w-full full md:w-1/4 flex text-center justify-center font-bold py-2 rounded-lg border-2 border-[#FFE533] hover:bg-yellow-400 hover:text-white transition-all">
          {DesignLocale[lang].action}
        </button>
      </div>
    </div>

    <div className="laptop:w-[45%] w-full h-ful md:height-[2rem] flex items-center justify-center">
      <img
        src="/webApp.webp"
        alt="Web & App Development"
        className="object-contain rounded-lg shadow-md"
      />
    </div>
    
  </div>
</section>

<section className="service-type-section mb-8 text-white w-full md:w-[92%] max-w-screen-lg mx-auto mt-12 p-6 md:p-0 laptop:p-8 rounded-lg flex flex-col z-10">
    
    {/* <h2 className="text-2xl font-bold text-center mb-12 text-[#EEBA2B]">
    Services offered
    </h2> */}
    <h2>{DesignLocale[lang].servicesOfferedWebApp}</h2>
    {/* <p className="text-md md:text-lg text-center mb-8">
    Our web & app development includes the following services:
    </p> */}
    <p>{DesignLocale[lang].servicesDescWebApp}</p>

    <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
          src="/webdev.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
          />    
         
             {/* <h3 className="text-xl font-semibold mb-2">
          Web development
          </h3>
          <p className="md:w-[70%] text-center">Development and maintenance of showcase websites, e-commerce platforms, and web applications.</p>  */}
       <h3 className="text-xl font-semibold mb-2">
      {DesignLocale[lang].webDevTitle}
    </h3>
    <p className="md:w-[70%] text-center">
      {DesignLocale[lang].webDevDesc}
    </p>
     
      </div>

      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
        <img
          src="/app.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />
        {/* <h3 className="text-xl font-semibold mb-2">
        App development
        </h3>
        <p className="md:w-[70%] text-center">Creation of interactive mobile and web applications that deliver seamless user experiences.</p> */}
     <h3 className="text-xl font-semibold mb-2">
      {DesignLocale[lang].appDevTitle}
    </h3>
    <p className="md:w-[70%] text-center">
      {DesignLocale[lang].appDevDesc}
    </p>
    
      </div>

      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
          src="/software.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />
        {/* <h3 className="text-xl font-semibold mb-2">
        Software development
        </h3>
        <p className="md:w-[70%] text-center">Tailored software solutions such as ERP, CRM, and internal systems (e.g., intranets, project management tools).</p> */}
       <h3 className="text-xl font-semibold mb-2">
      {DesignLocale[lang].softwareDevTitle}
    </h3>
    <p className="md:w-[70%] text-center">
      {DesignLocale[lang].softwareDevDesc}
    </p>
      
      
      </div>

      <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
          src="/UI.jpeg"
          alt="Content Creators Icon"
          className="w-36 h-24 mb-4 rounded-md"
        />
        {/* <h3 className="text-xl font-semibold mb-2">
        Web/App design (UI/UX)
        </h3>
        <p className="md:w-[70%] text-center">Designing intuitive and visually appealing interfaces for websites and applications.</p> */}
        <h3 className="text-xl font-semibold mb-2">
      {DesignLocale[lang].uiUxTitle}
    </h3>
    <p className="md:w-[70%] text-center">
      {DesignLocale[lang].uiUxDesc}
    </p>
      
      </div>
    </div>
  </section>


<section className="relative w-[89%] md:w-[93%] min-h-screen flex items-center justify-center bg-white rounded-md">
  {/* Container */}
  <div className="relative md:w-[70%] p-8 flex flex-col laptop:flex-row items-center gap-12">
    {/* Left side - Main circle */}
    <div className="w-52 md:w-64 shrink-0">
      <div className="relative bg-gradient-to-tr from-yellow-400 to-yellow-500 rounded-full w-48 h-48 md:w-64 md:h-64 border-4 border-white flex items-center justify-center shadow-lg">
        <div className="text-black text-center">
          {/* <h2 className="font-bold text-xl md:text-3xl leading-tight">KEY</h2> */}
            <h2 className="font-bold text-xl md:text-3xl leading-tight">
        {DesignLocale[lang].keyCompTitle1}
      </h2>
          {/* <h2 className="font-bold text-xl md:text-3xl leading-tight">COMPETENCIES</h2> */}
           <h2 className="font-bold text-xl md:text-3xl leading-tight">
        {DesignLocale[lang].keyCompTitle2}
      </h2>
        </div>
      </div>
    </div>

    {/* Right side - Competency items */}
    <div className="flex-1 space-y-6 md:space-y-8">
      {[
        // {
        //   number: "1",
        //   text: "Expertise in major social media platforms and their algorithms",
        //   bgColor: "bg-[#E265FF]",
        // },
        // {
        //   number: "2",
        //   text: "Proficiency in SEO tools and techniques for optimized content",
        //   bgColor: "bg-[#8B3DFF]",
        // },
        // {
        //   number: "3",
        //   text: "Skills in crafting and managing ad campaigns for maximum ROI",
        //   bgColor: "bg-[#3DB9FF]",
        // },
        // {
        //   number: "4",
        //   text: "Knowledge of CMS platforms and e-commerce tools",
        //   bgColor: "bg-[#FFA53D]",
        // },
        // {
        //   number: "5",
        //   text: "Ability to analyze and adapt strategies based on performance metrics",
        //   bgColor: "bg-[#76C56F]",
        // },

         { number: "1", text: DesignLocale[lang].comp1, bgColor: "bg-[#E265FF]" },
    { number: "2", text: DesignLocale[lang].comp2, bgColor: "bg-[#8B3DFF]" },
    { number: "3", text: DesignLocale[lang].comp3, bgColor: "bg-[#3DB9FF]" },
    { number: "4", text: DesignLocale[lang].comp4, bgColor: "bg-[#FFA53D]" },
    { number: "5", text: DesignLocale[lang].comp5, bgColor: "bg-[#76C56F]" },
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
            src="/graphic-skills.jpg"
            alt=""
            className=" w-[100%] laptop:w-[70%] md:h-[22rem] rounded-md"
          />
        </div>
        <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-[#EEBA2B] mb-6">
  {DesignLocale[lang].whyChooseTitle}
</h2>
          {/* <h2 className="text-2xl font-bold text-[#EEBA2B] mb-6">
          Why choose Creativa Poeta?
          </h2> */}
          <ul className="space-y-4 md:space-x-0 list-disc p-4 h-full flex flex-col text-center md:text-start laptop:text-center justify-between">
            {/* <li>
              <strong className="text-md md:text-lg mr-3">
                Tailored solutions
                              </strong>
               Every project is uniquely designed to meet your specific business needs
            </li> */}
              <li>
    <strong className=" text-md md:text-lg mr-3">{DesignLocale[lang].whyChooseStrong1}</strong>
    {DesignLocale[lang].whyChooseText1}
  </li>
            {/* <li>
              <strong className="text-md md:text-lg mr-3">
                Experienced team
              </strong>
              Our developers and designers are skilled in the latest technologies and trends.
            </li> */}
            <li>
    <strong className="text-md md:text-lg mr-3">{DesignLocale[lang].whyChooseStrong2}</strong>
    {DesignLocale[lang].whyChooseText2}
  </li>
            {/* <li>
              <strong className="text-md md:text-lg mr-3">
                
                Comprehensive support
              </strong>
              From ideation to deployment, we provide full support throughout the development lifecycle.
            </li> */}
           <li>
    <strong className=" text-md md-text-lg mr-3">{DesignLocale[lang].whyChooseStrong3}</strong>
    {DesignLocale[lang].whyChooseText3}
  </li>
            {/* <li>
              <strong className="text-md md:text-lg mr-3">
                
                Customer-centric approach
              </strong>
              Your satisfaction is our priority, and we ensure your vision becomes a reality.
            </li> */}
            <li>
    <strong className="text-md md:text-lg mr-3">{DesignLocale[lang].whyChooseStrong4}</strong>
    {DesignLocale[lang].whyChooseText4}
  </li>

            {/* <li>
              <strong className="text-md md:text-lg mr-3">
                
                Scalable and future-ready
              </strong>
              We build solutions that grow with your business and adapt to future needs.
            </li> */}
             <li>
    <strong className=" text-md md:text-lg mr-3">{DesignLocale[lang].whyChooseStrong5}</strong>
    {DesignLocale[lang].whyChooseText5}
  </li>
          </ul>
        </div>
      </section>


      <section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10">
    
        <h2 className="text-2xl font-bold text-center mb-12 text-[#EEBA2B]">
          {" "}
          Who are these services for?{" "}
        </h2>

        <p className="text-md md:text-lg text-center mb-8">
        Our web & app development services cater to:
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
            <h3 className="text-xl font-semibold mb-2">
              {" "}
              Startups{" "}
            </h3>
            <p className="md:w-[70%] text-center">Launch your brand with a dynamic online presence.</p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/content.webp"
              alt="Content Creators Icon"
              className="w-36 h-24 mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold mb-2">
            Small to Medium Enterprises (SMEs)
            </h3>
            <p className="md:w-[70%] text-center">Upgrade your digital tools to enhance operations and customer engagement.</p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/individual.png"
              alt="Individuals Icon"
              className="w-24 h-24 mb-4 rounded-md"
              />
            <h3 className="text-xl font-semibold mb-2">
            Enterprises
            </h3>
            <p className="md:w-[70%] text-center">Streamline processes with custom software and advanced applications.</p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/associations.png"
              alt="Associations Icon"
              className="w-32 h-24 mb-4 rounded-md"
              />
            <h3 className="text-xl font-semibold mb-2">
            	Freelancers and Creatives 
            </h3>
            <p className="md:w-[70%] text-center">Showcase your work with an impressive portfolio site or application.</p>
          </div>
        </div>
      </section>

      <section className="web-development-process-section w-[94%] max-w-screen-lg mx-auto mt-12 p-6 rounded-lg text-black shadow-lg relative z-10">
  <h2 className="text-2xl font-bold text-center mb-12 text-[#EEBA2B]">
    Process Workflow
  </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-5 gap-5 justify-between items-center space-y-12 md:space-y-0 laptop:space-x-4">
    {/* Step 1 */}
     
      <div className="bg-[#ffffff] text-black p-6 w-full shadow-lg rounded-lg items-center text-center flex flex-col">
      <div className="w-10 h-10 flex items-center justify-center  border-2 border-black  rounded-full  text-black font-bold mb-4">
        1
      </div>
        <h3 className="text-lg font-semibold mb-2  p-3 border-2 border-black w-full">Consultation</h3>
        <p className="text-sm">
          Understanding your requirements, vision, and goals.
        </p>
      </div>
    {/* Step 1 */}
     
      <div className="bg-[#ffffff] text-black p-6  shadow-lg rounded-lg w-full items-center text-center flex flex-col">
      <div className="w-10 h-10 flex items-center justify-center  border-2 border-black  rounded-full  text-black font-bold mb-4">
        2
      </div>
        <h3 className="text-lg font-semibold mb-2  p-3 border-2 border-black w-full">Planning</h3>
        <p className="text-sm">
        Developing a comprehensive strategy and timeline for your project.
        </p>
      </div>
    {/* Step 1 */}
     
      <div className="bg-[#ffffff] text-black p-6  shadow-lg rounded-lg w-full items-center text-center flex flex-col">
      <div className="w-10 h-10 flex items-center justify-center  border-2 border-black  rounded-full  text-black font-bold mb-4">
        3
      </div>
        <h3 className="text-lg font-semibold mb-2  p-3 border-2 border-black w-full">Design</h3>
        <p className="text-sm">
         Creating wireframes, mockups, and user-friendly interfaces.        </p>
      </div>
    {/* Step 1 */}
     
      <div className="bg-[#ffffff] text-black p-6  shadow-lg rounded-lg w-full items-center text-center flex flex-col">
      <div className="w-10 h-10 flex items-center justify-center  border-2 border-black  rounded-full  text-black font-bold mb-4">
        4
      </div>
        <h3 className="text-lg font-semibold mb-2  p-3 border-2 border-black w-full">Development</h3>
        <p className="text-sm">
         Building websites, applications, or software using cutting-edge technologies.        </p>
      </div>
    {/* Step 1 */}
     
      <div className="bg-[#ffffff] text-black p-6  shadow-lg rounded-lg w-full items-center text-center flex flex-col">
      <div className="w-10 h-10 flex items-center justify-center  border-2 border-black  rounded-full  text-black font-bold mb-4">
        5
      </div>
        <h3 className="text-lg font-semibold mb-2  p-3 border-2 border-black w-full">Testing</h3>
        <p className="text-sm">
         Ensuring performance, security, and compatibility across devices.        </p>
      </div>


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
        Ready to bring your digital vision to life? 
        </h2>
        <p className="text-md md:text-lg text-center mb-8 max-w-4xl mx-auto">
        Contact us today and let’s build something extraordinary together.
        </p>

          {/* <button
            onClick={handleNavigate}  
           className="main-cta-btn bg-[#EEBA2B] text-black w-[90%] md:w-[30%] font-bold py-4 px-8 rounded-lg text-md md:text-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            Digitize your idea with us
          </button> */}
          <button>{DesignLocale[lang].ctaButtonWebApp}</button>
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
          <a href="https://www.tiktok.com/@creativapoeta?_t=ZM-8sjgBGfxZna&_r=1">
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

export default WebApp;
