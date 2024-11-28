import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image2 from '../../assets/flags/image2.jpg';
import logo from '../../assets/flags/logopoeta1.png';
import why from '../../assets/flags/why.jpg';
import DesignLocale from "../../i18n/Services/Subservices/DesignLocale";
import getLangFromLocalStorage from '../../../utils/Lang';
import { FaTwitter, FaInstagram,FaLinkedinIn, FaFacebook, FaGithub } from 'react-icons/fa';

const lang: string = getLangFromLocalStorage();


const testimonials = [
  {
    quote:  DesignLocale[lang].quote1,
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

  const goToSlide = (index:number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonial-slider min-h-screen w-full md:w-[80%] items-center justify-center flex flex-col max-w-screen-lg mx-auto mt-12 text-center  text-white rounded-lg shadow-lg relative z-10">
      <h2 className="text-4xl font-bold mb-8 text-[#EEBA2B]">What Our Clients Say</h2>

      <div className="overflow-hidden relative w-full">
        <div
          className="flex transition-transform duration-1000"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex flex-col items-center text-center px-4"
              style={{ flex: "0 0 100%" }} 
            >
              <svg className="w-12 h-12 text-[#EEBA2B] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <FaQuoteLeft />
              </svg>
              
              <p className="text-xl italic px-4 lg:px-16 max-w-xl mx-auto leading-relaxed">
               "{testimonial.quote} "
              </p>
              
              <div className="mt-6 flex flex-col items-center">
                <img src={testimonial.image} alt={`${testimonial.client}`} className="w-16 h-16 rounded-full shadow-lg mb-2" />
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
              currentIndex === index ? 'bg-[#EEBA2B]' : 'bg-gray-500'
            }`}
          ></button>
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
    <section className="related-services-section w-full md:w-[95%] py-16 px-8  text-center z-10">
      <h2 className="text-4xl font-bold text-white mb-8">{DesignLocale[lang].relatedServTitle}</h2>
      <div className="grid gap-8  laptop:grid-cols-4 md:grid-cols-2">
        {relatedServices.map((service, index) => (
          <div key={index} className="service-card p-6 bg-white text-black rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={service.icon} alt={`${service.title} Icon`} className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
            <p className="text-base mb-4">{service.description}</p>
            <a href={service.link} className="text-[#EEBA2B] font-semibold hover:text-black border-2 border-[#EEBA2B] py-2 px-4 rounded transition-colors duration-300">
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
    question: DesignLocale[lang].question1,
    answer: DesignLocale[lang].answer1,
  },
  {
  question: DesignLocale[lang].question2,
  answer: DesignLocale[lang].answer2,
  },
  {
    question: DesignLocale[lang].question3,
    answer: DesignLocale[lang].answer3
  },
  {
    question: DesignLocale[lang].question4,
    answer: DesignLocale[lang].answer4
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section w-full md:w-[95%] mx-auto my-12 p-8 text-gray-800  rounded-lg shadow-lg z-10">
      <h2 className="text-4xl font-bold text-center text-[#EEBA2B] mb-8">{DesignLocale[lang].faqTitle}</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full text-left text-lg text-white font-bold focus:outline-none"
            >
              {faq.question}
              <span className="text-2xl text-[#EEBA2B]">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            <div
              className={`mt-2 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}
            >
              <p className="text-gray-100 mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const DesignGraphique = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${image2})` }} 
      id="design-graphique"
    >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <Link to="/">
        <div className="logo top-5 text-white text-xl absolute left-4 ml-0 p-1 md:top-3 md:left-8 md:ml-11 md:text-4xl">
          <img
            src={logo}
            alt="logo"
            className="w-[50%] h-[100%] md:w-[85%] md:h-[95%]"
          />
        </div>
      </Link>
 
      <section className="min-h-fit w-[95%] mt-16 md:mt-auto m-auto h-screen py-16 md:px-2 flex flex-col md:flex-row items-center justify-between z-10">
  <div className="w-full laptop:w-1/2 space-y-6 text-white flex flex-col items-center md:items-start md:justify-between px-4 md:px-8 py-5">
    <div className="flex items-center mb-4">
      <h1 className="text-4xl font-bold text-start md:text-left">
        {DesignLocale[lang].title} <br />
        <span className="text-[#EEBA2B] text-2xl"> {DesignLocale[lang].substitle} </span>
      </h1>
    </div>
    <p className="text-md md:text-lg laptop:text-xl leading-relaxed text-start md:text-left">
      {DesignLocale[lang].description}
    </p>
    <Link to="/start-project">
    <button
      // type="primary"
      className="bg-[#EEBA2B] p-4 rounded-lg border-[#EEBA2B] text-[1.2rem] w-full hover:bg-yellow-400 text-black hover:border hover:border-[#EEBA2B] hover:text-black mt-4"
    >
      {DesignLocale[lang].action}
    </button>
    </Link>
  </div>

  <div className="hidden items-center justify-center laptop:flex w-full laptop:w-1/2 mt-8 md:mt-0">
    <img
      src="/serv.png"
      alt="Web Marketing Strategy"
      className="object-cover rounded-lg"
    />
  </div>
</section>


      <section className="graphic-design-section  relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 gap-24 text-white rounded-lg mb-12 flex flex-col md:flex-row z-10">
        <div className="yellow-lines-container  hidden laptop:flex md:w-1/2 h-full">
         
          <img src="/graphic-skills.jpg" alt="" className='w-[95%] h-[90%] rounded-md' />
        </div>
        <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#EEBA2B] mb-6">{DesignLocale[lang].skillsTitle}</h2>
          <ul className="space-y-4 text-lg p-4 h-full flex flex-col justify-between">
            <li><strong className='text-2xl' > {DesignLocale[lang].skill1} </strong> {DesignLocale[lang].skilldesc1}</li>
            <li><strong className='text-2xl' > {DesignLocale[lang].skill2} </strong> {DesignLocale[lang].skilldesc2}</li>
            <li><strong className='text-2xl' > {DesignLocale[lang].skill3} </strong> {DesignLocale[lang].skilldesc3}</li>
            <li><strong className='text-2xl' > {DesignLocale[lang].skill4} </strong> {DesignLocale[lang].skilldesc4}</li>
            <li><strong className='text-2xl' > {DesignLocale[lang].skill5} </strong> {DesignLocale[lang].skilldesc5}</li>
          </ul>
        </div>
      </section>

      <section className="why-choose-us-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10">
        <h2 className="text-4xl font-bold text-[#EEBA2B] mb-4"> {DesignLocale[lang].whyTitle} </h2>

        <div className="flex flex-col md:flex-row w-full">
  <div className="w-full laptop:w-1/2 laptop:flex  mb-8 md:mb-0 hidden">
    <img
      src={why}
      alt="Creative workspace"
      className="w-[90%] items-start justify-start h-[90%] object-cover rounded-lg hidden md:block"
    />
  </div>
  <div className="w-full laptop:w-1/2 flex flex-col justify-center text-xl space-y-4 p-6 md:p-8  md:h-full">
    <p className="italic mt-12">
    "{DesignLocale[lang].whyIntro}"    </p>
    <ul className="list-inside space-y-8">
      <li>{DesignLocale[lang].why1} </li>
      <li>{DesignLocale[lang].why2} </li>
      <li>{DesignLocale[lang].why3} </li>
      <li>{DesignLocale[lang].why4} </li>
    </ul>
  </div>
</div>

      </section>
<section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10">
  <h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8"> {DesignLocale[lang].whoTitle} </h2>
  
  <p className="text-lg text-center mb-8">
    {DesignLocale[lang].whoIntro}
  </p>

  <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
    {/* Business */}
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
      <h3 className="text-xl font-semibold mb-2"> {DesignLocale[lang].who1} </h3>
      <p className="md:w-[70%]">{DesignLocale[lang].whodesc1}.</p>
    </div>

    {/* Content Creators */}
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img src="/content.webp" alt="Content Creators Icon" className="w-36 h-24 mb-4 rounded-md"/>
      <h3 className="text-xl font-semibold mb-2">{DesignLocale[lang].who2}</h3>
      <p className="md:w-[70%]" >{DesignLocale[lang].whodesc2}</p>
    </div>

    {/* Individuals */}
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img src="/individual.png" alt="Individuals Icon" className="w-20 h-36 mb-4"/>
      <h3 className="text-xl font-semibold mb-2">{DesignLocale[lang].who3}</h3>
      <p className="md:w-[70%]">{DesignLocale[lang].whodesc3}</p>
    </div>

    {/* Associations */}
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img src="/associations.png" alt="Associations Icon" className="w-40 h-36 mb-4"/>
      <h3 className="text-xl font-semibold mb-2">{DesignLocale[lang].who4}</h3>
      <p className="md:w-[70%]">{DesignLocale[lang].whodesc4}</p>
    </div>
  </div>
</section>




<section className="design-process-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg  text-white shadow-lg relative z-10">
  <h2 className="text-4xl font-bold text-center mb-12 text-[#EEBA2B]"> {DesignLocale[lang].processTitle} </h2>
  
  <div className="relative flex flex-col laptop:flex-row items-center space-y-16">
    {/* Step 1 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <div className="lg:order-2 order-1">
        <img src="/consultancy.png" alt="Consultation Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
        <div className="text-center lg:text-left">
          <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">{DesignLocale[lang].process1}</h3>
          <p className="text-white">{DesignLocale[lang].processdesc1}</p>
        </div>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 2 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/research.png" alt="Research Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">{DesignLocale[lang].process2}</h3>
        <p className="text-white">{DesignLocale[lang].processdesc2}</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 3 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/concept.jpg" alt="Development Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">{DesignLocale[lang].process3}</h3>
        <p className="text-white">{DesignLocale[lang].processdesc3}</p>
      </div>
    </div>
    {/* Connector Line */}
        <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>


    {/* Step 4 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/revision.jpg" alt="Revision Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">{DesignLocale[lang].process4}</h3>
        <p className="text-white">{DesignLocale[lang].processdesc4}</p>
      </div>
    </div>
    {/* Connector Line */}
        <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>


    {/* Step 5 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/delivery.png" alt="Delivery Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg bg-white mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">{DesignLocale[lang].process5}</h3>
        <p className="text-white">{DesignLocale[lang].processdesc5}</p>
      </div>
    </div>
  </div>
</section>

<section className="portfolio-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 text-center  text-white z-10">
  <h2 className="text-4xl font-bold text-[#EEBA2B] mb-8">{DesignLocale[lang].portifolioTitle}</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-6">
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/beauty.jpg" alt="Portfolio Item" className="w-[100%] h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Creative Logo</h3>
        <p className="text-white text-sm">For Tech Startup</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/card2.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Business card</h3>
        <p className="text-gray-300 text-sm">For a Company</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/port1.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Flyer</h3>
        <p className="text-gray-300 text-sm">For a Business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/port2.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Poster</h3>
        <p className="text-gray-300 text-sm">For A business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/port3.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Poster</h3>
        <p className="text-gray-300 text-sm">For business advertising</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/port4.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Book Covers</h3>
        <p className="text-gray-300 text-sm">For individual or a business</p>
      </div>
    </div>
  </div>

  <div className="mt-12">
    <a href="/contact" className="px-6 py-3 bg-[#EEBA2B] text-black font-semibold rounded-lg hover:bg-yellow-600">
    {DesignLocale[lang].ctaCaption}
    </a>
  </div>
</section>

<TestimonialSlider />
<RelatedServices />
<FAQSection />
<section className="contact-section w-full md:w-[95%] py-16 px-6 text-white text-center flex flex-col items-center z-10">
      
      {/* Encouragement Text */}
      <h2 className="text-3xl font-semibold mb-4">{DesignLocale[lang].ctaTitle}</h2>
      <p className="text-lg mb-8 px-6 max-w-2xl mx-auto">
      {DesignLocale[lang].ctaDescription}
      </p>
      
      <Link to="/start-project">
      <button
        className="main-cta-btn bg-[#EEBA2B] text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
      >
        {DesignLocale[lang].ctaAction}
      </button>
      </Link>
    </section>


    <section className="visual-elements w-full  md:w-[95%] rounded-md mb-4 bg-white py-16 px-4 text-gray-800 flex flex-col items-center z-10">
      {/* Title */}
      <h2 className="text-4xl font-semibold text-center text-[#1e1e2f] mb-12">
      {DesignLocale[lang].expTitle}
      </h2>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
        
        {/* Skill Icon with Description */}
        <div className="skill-item text-center">
          <img src="/logodesign.png" alt="Logo Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">{DesignLocale[lang].exp1}</h3>
          <p>{DesignLocale[lang].expdesc1}</p>
        </div>

        <div className="skill-item text-center">
          <img src="/businessCarddesign.png" alt="Business Card Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-md font-bold text-[#EEBA2B] mb-2">{DesignLocale[lang].exp2}</h3>
          <p>{DesignLocale[lang].expdesc2}</p>
        </div>

        <div className="skill-item text-center">
          <img src="/posterdesign.jpg" alt="Poster Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#EEBA2B] mb-2"> {DesignLocale[lang].exp3} </h3>
          <p>{DesignLocale[lang].expdesc3}</p>
        </div>
        
        <div className="col-span-full">
          <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-6 text-center">{DesignLocale[lang].projTitle}</h3>
          <div className="carousel flex overflow-x-scroll space-x-4">
            <img src="/beauty.jpg" alt="Project 1" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/logos.webp" alt="Project 2" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/card1.webp" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/poster1.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/card2.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/poster2.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
          </div>
        </div>
        
      </div>

      {/* Social Sharing */}
      <div className="social-sharing flex space-x-4 mt-8">
        <button className="text-black hover:text-[#EEBA2B]">
         <FaFacebook className="text-2xl" />
        </button>
        <button className="text-black hover:text-[#EEBA2B]">
          <FaInstagram className="text-2xl" />
        </button>
        <button className="text-black hover:text-[#EEBA2B]">
          <FaLinkedinIn className="text-2xl" />
        </button>
        <button className="text-black hover:text-[#EEBA2B]">
          <FaTwitter className="text-2xl" />
        </button>
        <button className="text-black hover:text-[#EEBA2B]">
          <FaGithub className="text-2xl" />
        </button>

      </div>

      {/* Links to Other Services */}
      <div className="related-services mt-12 text-center">
        <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-4">{DesignLocale[lang].explore}</h3>
        <div className="flex justify-center space-x-8">
          <a href="/services/digital-marketing" className="text-[#EEBA2B] hover:underline">{DesignLocale[lang].dm}</a>
          <a href="/services/content-writing" className="text-[#EEBA2B] hover:underline">{DesignLocale[lang].cw}</a>
        </div>
      </div>
    </section>

    </div>
  );
};

export default DesignGraphique;
