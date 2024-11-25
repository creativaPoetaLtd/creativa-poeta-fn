import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image2 from '../../assets/flags/image2.jpg';
import logo from '../../assets/flags/logopoeta1.png';
import { FaTwitter, FaInstagram,FaLinkedinIn, FaFacebook, FaGithub } from 'react-icons/fa';



const testimonials = [
  {
    quote: "Our website went from outdated to outstanding! The new design is sleek, user-friendly, and has significantly improved our customer engagement.",
    client: "Sophia Carter",
    role: "Marketing Director, Elite Apparel",
    image: "/avatar1.jpg",
  },
  {
    quote: "Their expertise in website development transformed our online store. Sales have increased by 50% since the launch of our new site.",
    client: "Liam Jackson",
    role: "Owner, Bloom & Beyond",
    image: "/avatar1.jpg",
  },
  {
    quote: "The website they created for our nonprofit is both beautiful and functional. It's helped us connect with more donors and volunteers than ever before.",
    client: "Isabella Ramirez",
    role: "Program Manager, GreenFuture Alliance",
    image: "/avatar1.jpg",
  },
  {
    quote: "Their attention to detail and innovative ideas made our new site a perfect representation of our brand. We’ve received countless compliments from customers.",
    client: "Ethan Walker",
    role: "CEO, PureTech Solutions",
    image: "/avatar1.jpg",
  },
  {
    quote: "The team created a responsive, SEO-optimized website that’s brought in more traffic and leads than we thought possible. We couldn’t be happier!",
    client: "Charlotte Davis",
    role: "Brand Manager, Luxe Living Co.",
    image: "/avatar1.jpg",
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
    title: "Graphic Design",
    description: "Create visually appealing designs for your website, social media, and marketing materials.",
    icon: "/digital-marketing.jpg",
    link: "/services/graphic-design",
  },
  {
    title: "Project Development",
    description: "Bring your ideas to life with our comprehensive project development services.",
    icon: "/content-writting.png",
    link: "/services/project-development",
  },
  {
    title: "Advertising Design",
    description: "Design engaging ads that capture attention and drive results for your campaigns.",
    icon: "/content-writting.png",
    link: "/services/advertising-design",
  },

];

export function RelatedServices() {
  return (
    <section className="related-services-section w-full md:w-[95%] py-16 px-8  text-center z-10">
      <h2 className="text-4xl font-bold text-white mb-8">Related Services</h2>
      <div className="grid gap-8  laptop:grid-cols-3 md:grid-cols-2">
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
    question: "How long does it take to create a website?",
    answer: "The timeline varies depending on the complexity and features required. A basic website typically takes 2-4 weeks, while more complex sites with custom features may take 6-8 weeks or more.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely! All websites we create are fully responsive, ensuring they look and function great on devices of all sizes, including smartphones and tablets.",
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes, we specialize in redesigning outdated websites to improve their functionality, aesthetics, and user experience, while maintaining your brand identity.",
  },
  {
    question: "Do you provide e-commerce functionality?",
    answer: "Yes, we offer e-commerce website development with features like product catalogs, secure payment gateways, and inventory management.",
  },
  {
    question: "Will my website be optimized for SEO?",
    answer: "Yes, we implement on-page SEO best practices, including keyword optimization, meta tags, and fast-loading pages to help your website rank higher in search results.",
  },
  {
    question: "Can I update the content on my website myself?",
    answer: "Yes, we build websites on user-friendly platforms like WordPress or custom CMS, allowing you to easily update and manage content without technical expertise.",
  },
  {
    question: "Do you offer hosting and maintenance services?",
    answer: "Yes, we provide reliable hosting solutions and ongoing maintenance to ensure your website runs smoothly and stays up-to-date.",
  },
  {
    question: "What industries do you cater to for website creation?",
    answer: "We have experience working with various industries, including e-commerce, nonprofits, tech startups, healthcare, education, and more. Our solutions are customized for your specific needs.",
  },
  {
    question: "Can you integrate third-party tools or software into my website?",
    answer: "Yes, we can integrate tools such as CRMs, payment gateways, analytics, and other third-party software to enhance your website’s functionality.",
  },
  {
    question: "How do I get started with your website creation services?",
    answer: "Simply contact us to discuss your requirements. We'll guide you through the process, from understanding your needs to delivering a tailored website that meets your goals.",
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
          <div key={index} className="border-b border-gray-100 pb-4">
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

const DiditalMarketing = () => {
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
      <h1 className="text-4xl font-bold text-start md:text-left">
      Website Creation <br />
        <span className="text-[#EEBA2B] text-2xl">Engaging, responsive websites that represent your brand and connect with your audience</span>
      </h1>
    </div>
    <p className="text-xl leading-relaxed text-start md:text-left">
    Your website is often the first interaction customers have with your brand. Our Website Creation service is dedicated to building websites that reflect your brand’s personality, are visually appealing, and deliver an outstanding user experience. From simple landing pages to complex e-commerce sites, we develop websites tailored to your goals and optimized for all devices.</p>
    <Link to="/start-project">
    <button
      className="bg-[#EEBA2B] p-4 rounded-lg border-[#EEBA2B] text-[1.2rem] hover:bg-yellow-400 text-black hover:border hover:border-[#EEBA2B] hover:text-black mt-4"
    >
      Start a project
    </button>
    </Link>
  </div>

  <div className="hidden items-center justify-center laptop:flex w-full laptop:w-1/2 mt-8 md:mt-0">
    <img
      src="/website.jpg"
      alt="Web Marketing Strategy"
      className="object-cover rounded-lg w-[80%] h-auto "
    />
  </div>
</section>

<section className="advertising-design-section relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 gap-24 text-white rounded-lg mb-12 flex flex-col md:flex-row z-10">
  <div className="visual-container hidden laptop:flex md:w-1/2 h-full">
    <img src="/websiteskills.jpg" alt="Website Creation Skills" className="w-[95%] h-[95%] rounded-md" />
  </div>
  <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
  <h2 className="text-3xl font-bold text-[#EEBA2B] mb-6">Our Website Creation Skills</h2>
  <ul className="space-y-4 text-lg p-4 h-full flex flex-col justify-between">
    <li>
      <strong className="text-2xl">- Custom Web Design: </strong> Build visually stunning and responsive websites tailored to reflect your brand’s identity and goals.
    </li>
    <li>
      <strong className="text-2xl">- User Experience (UX) Design: </strong> Prioritize intuitive navigation and seamless user experiences to keep your visitors engaged and satisfied.
    </li>
    <li>
      <strong className="text-2xl">- E-commerce Development: </strong> Design and implement fully functional online stores with secure payment gateways and a smooth shopping experience.
    </li>
    <li>
      <strong className="text-2xl">- SEO Optimization: </strong> Ensure your website ranks higher on search engines with integrated SEO best practices for improved visibility and traffic.
    </li>
    <li>
      <strong className="text-2xl">- Mobile-First Design: </strong> Create mobile-friendly websites that look great and perform seamlessly across all devices.
    </li>
  </ul>
</div>

</section>


<section className="why-choose-us-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
  <h2 className="text-4xl font-bold text-[#EEBA2B] mb-6 text-center md:text-left">
  Why Choose Creativa Poeta for Your Website Creation Needs?  </h2>

  <div className="flex flex-col md:flex-row w-full items-center">
    <div className="w-full laptop:w-1/2 mb-8 md:mb-0 flex justify-center">
      <img
        src="/whyweb.webp"
        alt="Creative workspace"
        className="w-[90%] h-[90%] object-cover rounded-lg shadow-md"
      />
    </div>

    <div className="w-full laptop:w-1/2 flex flex-col justify-center text-lg space-y-6 p-6 md:p-8">
      <blockquote className="italic text-lg bg-opacity-10 bg-gray-100 p-4 rounded-md border-l-4 border-[#EEBA2B] shadow">
      "Our team is committed to delivering websites that not only look great but perform well. With an emphasis on functionality, user experience, and SEO, we ensure that your website stands out, loads quickly, and attracts the right audience."
      </blockquote>
            <ul className="space-y-6 pl-4 list-disc text-base md:text-lg">
        <li>Custom designs tailored to your brand and goals</li>
        <li>Fully responsive and mobile-friendly layouts</li>
        <li>SEO-optimized structure for improved search engine visibility</li>
        <li>Secure and scalable website solutions</li>
        <li>Ongoing maintenance and support available</li>

      </ul>
    </div>
  </div>
</section>


<section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
  <h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8">
  Who Can Benefit from Our Website Creation Services?</h2>

  <p className="text-lg text-center mb-8">
  A professionally designed website is a powerful tool for connecting with your audience and achieving your goals. Our Website Creation Services are tailored to meet the needs of various clients.
  </p>

  <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
      <h3 className="text-xl font-semibold mb-2">Startups and Entrepreneurs  </h3>
      <p className="md:w-[70%]">
      Seeking an effective online presence to attract new customers.    </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
        src="/content.webp"
        alt="Content Creators Icon"
        className="w-36 h-24 mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">Small and Medium Businesses   </h3>
      <p className="  md:w-[70%]">
      Looking to upgrade or redesign their existing website.   </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
    <img
        src="/ecommerce.jpg"
        alt="Nonprofits Icon"
        className="w-40 h-36 mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">E-commerce Brands  </h3>
      <p className="md:w-[70%]">
      needing a fully functional and optimized online store.   </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
     
       <img
        src="/non.jpg"
        alt="Educators Icon"
        className="w-36 h-36 mb-4 rounded-full"
      />
      <h3 className="text-xl font-semibold mb-2">Nonprofits and Organizations   </h3>
      <p className="md:w-[70%]">
      Aiming to raise awareness and engage supporters with an informative website.    </p>
    </div>
  </div>
</section>




<section className="design-process-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg text-white shadow-lg relative z-10 bg-gradient-to-br from-gray-800 to-black">
  <h2 className="text-4xl font-bold text-center mb-12 text-[#EEBA2B]">Our Website Development Process</h2>

  <div className="relative flex flex-col laptop:flex-row items-center space-y-16">
    {/* Step 1 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <div className="lg:order-2 order-1">
        <img src="/consultancy.png" alt="Consultation Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
        <div className="text-center lg:text-left">
          <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">1. Consultation and Discovery</h3>
          <p className="text-white"> We begin with an in-depth discussion to understand your goals, audience, and design preferences.</p>
        </div>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 2 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/script.jpg" alt="Scriptwriting Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">2.	Planning and Wireframing</h3>
        <p className="text-white">: Developing the site’s structure, wireframes, and layout based on user experience best practices.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 3 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/codedev.webp" alt="Production Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">3.	Design and Development </h3>
        <p className="text-white">Creating the visual elements and coding the site using industry-standard technologies.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 4 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/editvid.jpg" alt="Editing Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">4.	Testing and Quality Assurance </h3>
        <p className="text-white">Rigorous testing to ensure the website functions smoothly on all devices and browsers.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 5 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/delive.avif" alt="Delivery Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg bg-white mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">5.	Launch and Maintenance</h3>
        <p className="text-white">Launching the website and offering ongoing maintenance to keep it secure and updated.We deliver ready-to-publish files optimized for the platforms of your choice.</p>
      </div>
    </div>
  </div>
</section>


<section className="portfolio-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 text-center  text-white z-10">
  <h2 className="text-4xl font-bold text-[#EEBA2B] mb-8">Our Portfolio</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-6">
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/web1.webp" alt="Portfolio Item" className="w-[100%] h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 1</h3>
        <p className="text-white text-sm">For Tech Startup</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/web2.webp" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 2</h3>
        <p className="text-gray-300 text-sm">For a Company</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/web3.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 3</h3>
        <p className="text-gray-300 text-sm">For a Business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/web4.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 4</h3>
        <p className="text-gray-300 text-sm">For A business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/web5.png" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Prject 5</h3>
        <p className="text-gray-300 text-sm">For business advertising</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/web6.png" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
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

<section className="types-of-websites-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg bg-gray-900 text-black shadow-lg z-10">
<h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8">
Types of Websites We Create</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
    <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
      <img src="/businessweb.png" alt="Business Website" className="w-16 h-16" />
      <div>
        <h3 className="text-2xl font-semibold text-[#EEBA2B]">Business Websites</h3>
        <p className="text-base">Professional sites that showcase your brand, services, and products.</p>
      </div>
    </div>
    
    <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
      <img src="/ecommerceweb.png" alt="E-commerce Sites" className="w-16 h-16" />
      <div>
        <h3 className="text-2xl font-bold text-[#EEBA2B]">E-commerce Sites</h3>
        <p className="text-base">Secure, scalable online stores for selling products and services.</p>
      </div>
    </div>
    
    <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
      <img src="/portweb.png" alt="Portfolio Websites" className="w-16 h-16" />
      <div>
        <h3 className="text-2xl font-semibold text-[#EEBA2B]">Portfolio Websites</h3>
        <p className="text-base">Visually appealing sites for artists, photographers, and professionals to showcase their work.</p>
      </div>
    </div>
    
    <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
      <img src="/blogweb.png" alt="Blogs and Content Sites" className="w-16 h-16" />
      <div>
        <h3 className="text-2xl font-semibold text-[#EEBA2B]">Blogs and Content Sites</h3>
        <p className="text-base">SEO-friendly sites that attract readers and encourage engagement.</p>
      </div>
    </div>
    
    <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
      <img src="/landIcon.svg" alt="Landing Pages" className="w-16 h-16" />
      <div>
        <h3 className="text-2xl font-semibold text-[#EEBA2B]">Landing Pages</h3>
        <p className="text-base">Single-page sites designed for targeted campaigns and lead generation.</p>
      </div>
    </div>
  </div>
</section>


<TestimonialSlider />
<RelatedServices />
<FAQSection />
<section className="contact-section w-full md:w-[95%] py-16 px-6 text-white text-center flex flex-col items-center z-10">
  <h2 className="text-3xl font-semibold mb-4">Ready to create a website that captures your brand’s essence? </h2>
  <p className="text-lg mb-8 px-6 max-w-2xl mx-auto">
  Contact us to discuss your website creation needs and get started on your project today.
  </p>

  <Link to="/start-project">
    <button
      className="main-cta-btn bg-[#EEBA2B] text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
    >
Build Your Website with Us</button>
  </Link>
</section>



    <section className="visual-elements w-full  md:w-[95%] rounded-md mb-4 bg-white py-16 px-4 text-gray-800 flex flex-col items-center z-10">
      {/* Title */}
      <h2 className="text-4xl font-semibold text-center text-[#1e1e2f] mb-12">
        Our Website Creation Expertise
      </h2>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
        
        {/* Skill Icon with Description */}
        <div className="skill-item text-center">
          <img src="/research1.jpg" alt="Logo Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">Research</h3>
          {/* Description of websites in research sector */}
          <p>Researching your target audience and industry to create a website that meets your goals.</p>
         
        </div>

        <div className="skill-item text-center">
          <img src="/businessweb.png" alt="Business Card Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-md font-bold text-[#EEBA2B] mb-2">Business</h3>
          <p>Professional sites that showcase your brand, services, and products.</p>
        </div>

        <div className="skill-item text-center">
          <img src="/ecommerceweb.png" alt="Poster Design" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">Ecommerce</h3>
          <p>Secure, scalable online stores for selling products and services.</p>
        </div>
        
        <div className="col-span-full">
          <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-6 text-center">Our Projects</h3>
          <div className="carousel flex overflow-x-scroll space-x-4">
            <img src="/web6.png" alt="Project 1" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/web5.png" alt="Project 2" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/web1.webp" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/web2.webp" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/web3.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/web4.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
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

      <div className="related-services mt-12 text-center">
        <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-4">Explore More Services</h3>
        <div className="flex justify-center space-x-8">
          <a href="/services/graphic-design" className="text-[#EEBA2B] hover:underline">Graphic Design</a>
          <a href="/services/projetc-development" className="text-[#EEBA2B] hover:underline">Project Development</a>
        </div>
      </div>
    </section>

    </div>
  );
};

export default DiditalMarketing;
