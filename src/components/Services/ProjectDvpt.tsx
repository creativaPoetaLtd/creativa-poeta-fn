import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image2 from '../../assets/flags/image2.jpg';
import logo from '../../assets/flags/logopoeta1.png';
import why from '../../assets/flags/why.jpg';
import { FaTwitter, FaInstagram,FaLinkedinIn, FaFacebook, FaGithub } from 'react-icons/fa';



const testimonials = [
  {
    quote: "The team’s expertise in project development has been phenomenal. They delivered a robust solution that exceeded our expectations.",
    client: "Sarah Johnson",
    role: "Product Manager, InnovateTech",
    image: "/avatar.jpg",
  },
  {
    quote: "Their structured approach and technical skills ensured our project was completed on time and within budget. Highly recommended!",
    client: "James Lee",
    role: "CTO, BuildRight Inc.",
    image: "/avatar.jpg",
  },
  {
    quote: "From initial planning to final delivery, the level of professionalism and attention to detail was outstanding. Our system works flawlessly.",
    client: "Emma Brown",
    role: "Operations Manager, Streamline Solutions",
    image: "/avatar.jpg",
  },
  {
    quote: "They brought our idea to life with cutting-edge technology and a clear development roadmap. A truly remarkable experience!",
    client: "Emma Brown",
    role: "CEO, Visionary Ventures",
    image: "/avatar.jpg",
  },
  {
    quote: "Their project management skills and technical knowledge are unmatched. We couldn’t have asked for a better partner.",
    client: "Emma Brown",
    role: "Founder, Startup Hub",
    image: "/avatar.jpg",
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
    title: "Digital support",
    description: "Amplify your visual content reach with targeted digital strategies.",
    icon: "/digital-marketing.jpg",
    link: "/services/digital-support",
  },
  {
    title: "Website creation",
    description: "Engage audiences with powerful words that enhance your visuals.",
    icon: "/content-writting.png",
    link: "/services/website-creation",
  },
  {
    title: "Graphic design",
    description: "Engage audiences with powerful words that enhance your visuals.",
    icon: "/content-writting.png",
    link: "/services/design",
  },
  {
    title: "Video Creation and montage",
    description: "Extend your brand identity with impactful video content.",
    icon: "/videoProd.png",
    link: "/services/video-creation",
  },
];

export function RelatedServices() {
  return (
    <section className="related-services-section w-full md:w-[95%] py-16 px-8  text-center z-10">
      <h2 className="text-4xl font-bold text-white mb-8">Related Services</h2>
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
    question: "What is project development?",
    answer: "Projectn development is the process of planning, organizing, and executing a project from start to finish. It involves defining project goals, creating a roadmap, and monitoring progress to ensure successful outcomes.",

  },
  
  {
    question: "How long does the project development process usually take?",
    answer: "The timeline for project development varies based on the scope and complexity of the project. We provide detailed timelines during the initial consultation phase.",
  },
  {
    question: "Do you offer support during the implementation phase?",
    answer: "Yes, we provide ongoing support during the implementation phase to ensure that your project stays on track and meets its goals.",
  },
  {
    question: "Is it possible to request market research only?",
    answer: "Yes, we offer market research services as a standalone option for clients who need insights into their industry and target market.",
  },
  {
    question: "What kind of reporting can I expect at each stage?",
    answer: "We provide detailed progress reports at each stage of the project development process, including key milestones, achievements, and areas for improvement.",
  },
  {
    question: "How do you ensure that my project aligns with my goals and vision?",
    answer: "We work closely with you to understand your goals, vision, and expectations, ensuring that every aspect of the project aligns with your unique needs.",
  },
  {
    question: "What happens if my project requires changes or adjustments during development?",
    answer: "We are flexible and responsive to changes throughout the project development process. We work with you to make adjustments as needed to ensure successful outcomes.",
  },
  {
    question: "What kind of support do you offer after the project is completed?",
    answer: "We provide ongoing support and maintenance services to ensure that your project continues to meet its goals and objectives long after completion.",
  },
  {
    question: "How do I get started with your project development service?",
    answer: "To get started, simply contact us to schedule an initial consultation. We will discuss your project goals, timeline, and budget to create a customized plan that meets your needs.",
  },
  {
    question: "What industries do you work with for project development?",
    answer: "We work with clients across a wide range of industries, including technology, healthcare, finance, retail, and more. Our team has experience in diverse sectors and can tailor our services to meet your specific industry needs.",
  },
  {
    question: "Do you offer project development services for startups and small businesses?",
    answer: "Yes, we offer project development services for startups, small businesses, and entrepreneurs looking to launch new ventures or refine existing projects. Our team can provide the guidance and support you need to achieve your goals.",
  },
  {
    question: "What makes your project development service unique?",
    answer: "Our project development service is unique in that we provide personalized support tailored to your goals and vision. We focus on clear communication, strategic insight, and effective execution to ensure that every step of your project is well-supported.",
  },
  {
    question: "How do you ensure that my project stays within budget?",
    answer: "We provide detailed budgeting and financial planning services to help you allocate resources effectively and optimize spending throughout the project development process.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section w-full md:w-[95%] mx-auto my-12 p-8 text-gray-800  rounded-lg shadow-lg z-10">
      <h2 className="text-4xl font-bold text-center text-[#EEBA2B] mb-8">Frequently Asked Questions</h2>
      
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

const ProjectDevelopment = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${image2})` }} 
      id="project-development"
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
      <h1 className="text-4xl font-bold text-justify md:text-left">
      Project Development <br />
        <span className="text-[#EEBA2B] text-2xl"> Tailored advice and strategies to guide you from concept to completion </span>
      </h1>
    </div>
    <p className="text-xl leading-relaxed text-start md:text-left">
    Every great idea needs a solid foundation to grow into a successful project. Our Project Development service offers comprehensive support and strategic guidance at each step of your journey. Whether you're launching a new venture, refining an existing project, or simply exploring ideas, we’re here to help bring your vision to life with expert planning and execution.
    </p>
    <Link to="/start-project">
    <button
      // type="primary"
      className="bg-[#EEBA2B] p-4 rounded-lg border-[#EEBA2B] text-[1.2rem] hover:bg-yellow-400 text-black hover:border hover:border-[#EEBA2B] hover:text-black mt-4"
    >
      Start a project
    </button>
    </Link>
  </div>

  <div className="hidden items-center justify-center laptop:flex w-full laptop:w-1/2 mt-8 md:mt-0">
    <img
      src="/proj.webp"
      alt="Web Marketing Strategy"
      className="object-cover rounded-lg "
    />
  </div>
</section>


      <section className="graphic-design-section  relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 gap-24 text-white rounded-lg mb-12 flex flex-col md:flex-row z-10">
        <div className="yellow-lines-container  hidden laptop:flex md:w-1/2 h-full">
         
          <img src="/projSkills.png" alt="" className='w-[95%] h-[90%] rounded-md' />
        </div>
        <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#EEBA2B] mb-6">Our Project Development skills</h2>
          <ul className="space-y-4 text-lg p-4 h-full flex flex-col justify-between">
            <li><strong className='text-2xl' >- Project Planning and Structuring:</strong> From initial concepts to detailed plans, we help structure your project to maximize efficiency and impact.</li>
            <li><strong className='text-2xl'>- Market Research and Analysis:</strong> Gain insights into your industry and target market with in-depth research, helping you position your project effectively.</li>
            <li><strong className='text-2xl'>- Business Strategy and Goal Setting:</strong> We assist you in defining clear objectives and creating a roadmap that aligns with your vision and resources.</li>
            <li><strong className='text-2xl'>- 	Financial Planning and Budgeting:</strong> We provide financial insights to help you budget wisely, optimizing resources for each stage of development.We bring your advertising messages to life with visuals tailored to all types of media.</li>
            <li><strong className='text-2xl'>- 	Execution and Monitoring: </strong> Support during the project implementation phase with regular check-ins to track progress and make adjustments as needed.</li>
          </ul>
        </div>
      </section>

      <section className="why-choose-us-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10">
        <h2 className="text-4xl font-bold text-[#EEBA2B] mb-4">Why Choose Creativa Poeta for Project Development Needs?</h2>

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
      "With years of experience in project planning and development, our team is committed to providing tailored solutions that help bring your vision to life. We focus on clear communication, strategic insight, and effective execution, ensuring that every step of your project is well-supported"
    </p>
    <ul className="list-inside space-y-8">
      <li>- ersonalized approach tailored to your goals</li>
      <li>- In-depth industry knowledge and experience</li>
      <li>- Comprehensive support from start to finish</li>
      <li>- Clear roadmap and actionable steps</li>
      <li>- Emphasis on sustainable growth and innovation</li>
    </ul>
  </div>
</div>

      </section>
<section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10">
  <h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8">Who Can Benefit from Our Project Development Service?</h2>
  
  <p className="text-lg text-center mb-8">
    Our Project Development service is ideal for a wide range of clients, including: startups, small businesses, entrepreneurs, and organizations looking to refine their project strategies and achieve sustainable growth. Whether you're launching a new venture, expanding an existing project, or seeking expert guidance, we're here to help you succeed.
  </p>

  <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
      <h3 className="text-xl font-semibold mb-2">Startups and Entrepreneurs </h3>
      <p className="md:w-[70%]">Startups and Entrepreneurs launching new products or services.</p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img src="/content.webp" alt="Content Creators Icon" className="w-36 h-24 mb-4 rounded-md"/>
      <h3 className="text-xl font-semibold mb-2">Small and Medium Enterprises (SMEs) </h3>
      <p className="md:w-[70%]" >Small and Medium Enterprises (SMEs) looking to expand, restructure, or enter new markets.</p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img src="/individual.png" alt="Individuals Icon" className="w-20 h-36 mb-4"/>
      <h3 className="text-xl font-semibold mb-2">Nonprofits and Community Organizations </h3>
      <p className="md:w-[70%]">Nonprofits and Community Organizations aiming to maximize impact with limited resources.</p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img src="/associations.png" alt="Associations Icon" className="w-40 h-36 mb-4"/>
      <h3 className="text-xl font-semibold mb-2">Individuals </h3>
      <p className="md:w-[70%]">o	Individuals with innovative ideas who need guidance to turn their vision into reality.</p>
    </div>
  </div>
</section>




<section className="design-process-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg  text-white shadow-lg relative z-10">
  <h2 className="text-4xl font-bold text-center mb-12 text-[#EEBA2B]">Our Design Process</h2>
  
  <div className="relative flex flex-col laptop:flex-row items-center space-y-16">
    {/* Step 1 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <div className="lg:order-2 order-1">
        <img src="/consultancy.png" alt="Consultation Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
        <div className="text-center lg:text-left">
          <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">1. Initial Consultation</h3>
          <p className="text-white">We meet with you to understand your goals, vision, and current project stage.</p>
        </div>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 2 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/research.png" alt="Research Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">2. Research and Analysis</h3>
        <p className="text-white"> Detailed market and industry research to guide strategic planning.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 3 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/concept.jpg" alt="Development Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">3.Strategic Planning</h3>
        <p className="text-white">Developing a roadmap that includes timelines, goals, and key milestones.</p>
      </div>
    </div>
    {/* Connector Line */}
        <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>


    {/* Step 4 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/revision.jpg" alt="Revision Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">4. Execution and Support</h3>
        <p className="text-white">Ongoing assistance through the implementation phase, ensuring progress aligns with initial goals.</p>
      </div>
    </div>
    {/* Connector Line */}
        <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>


    {/* Step 5 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/delivery.png" alt="Delivery Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg bg-white mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">5. Review and Evaluation</h3>
        <p className="text-white">Post-project assessment to measure success and gather insights for future development.</p>
      </div>
    </div>
  </div>
</section>

<section className="portfolio-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 text-center  text-white z-10">
  <h2 className="text-4xl font-bold text-[#EEBA2B] mb-8">Our Portfolio</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-6">
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/proj1.png" alt="Portfolio Item" className="w-[100%] h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 1</h3>
        <p className="text-white text-sm">For Tech Startup</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/proj2.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 2</h3>
        <p className="text-gray-300 text-sm">For a Company</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/proj3.webp" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 3</h3>
        <p className="text-gray-300 text-sm">For a Business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/proj4.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 4</h3>
        <p className="text-gray-300 text-sm">For A business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/proj5.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Prject 5</h3>
        <p className="text-gray-300 text-sm">For business advertising</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/proj6.png" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 6</h3>
        <p className="text-gray-300 text-sm">For individual or a business</p>
      </div>
    </div>
  </div>

  <div className="mt-12">
    <a href="/contact" className="px-6 py-3 bg-[#EEBA2B] text-black font-semibold rounded-lg hover:bg-yellow-600">
      Like what you see? Contact us!
    </a>
  </div>
</section>

<TestimonialSlider />
<RelatedServices />
<FAQSection />
<section className="contact-section w-full md:w-[95%] py-16 px-6 text-white text-center flex flex-col items-center z-10">
      
      {/* Encouragement Text */}
      <h2 className="text-3xl font-semibold mb-4"> Ready to turn your ideas into reality?  </h2>
      <p className="text-lg mb-8 px-6 max-w-2xl mx-auto">
      Contact us to start building a strategy that brings your vision to life!
      </p>
      
      <Link to="/start-project">
      <button
        className="main-cta-btn bg-[#EEBA2B] text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
      >
        Start Developing Your Project Today
      </button>
      </Link>
    </section>


    <section className="visual-elements w-full  md:w-[95%] rounded-md mb-4 bg-white py-16 px-4 text-gray-800 flex flex-col items-center z-10">
      {/* Title */}
      <h2 className="text-4xl font-semibold text-center text-[#1e1e2f] mb-12">
        Our Project development Expertise
      </h2>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
        
        {/* Skill Icon with Description */}
        <div className="skill-item text-center">
          <img src="/logodesign.png" alt="Logo Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">Design</h3>
          <p>Unique, memorable logos that define your brand identity.</p>
        </div>

        <div className="skill-item text-center">
          <img src="/businessCarddesign.png" alt="Business Card Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-md font-bold text-[#EEBA2B] mb-2">Business</h3>
          <p>Elegant business cards that leave a lasting impression.</p>
        </div>

        <div className="skill-item text-center">
          <img src="/posterdesign.jpg" alt="Poster Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">Software development</h3>
          <p> Friendly, scalable and mantained applications </p>
        </div>
        
        <div className="col-span-full">
          <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-6 text-center">Our Projects</h3>
          <div className="carousel flex overflow-x-scroll space-x-4">
            <img src="/proj1.png" alt="Project 1" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/proj2.jpg" alt="Project 2" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/proj3.webp" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/proj4.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/proj5.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/proj6.png" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
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
        <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-4">Explore More Services</h3>
        <div className="flex justify-center space-x-8">
          <a href="/services/digital-support" className="text-[#EEBA2B] hover:underline">Digital Support</a>
          <a href="/services/website-creation" className="text-[#EEBA2B] hover:underline">Website creation</a>
        </div>
      </div>
    </section>

    </div>
  );
};

export default ProjectDevelopment;
