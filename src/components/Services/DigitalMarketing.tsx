import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image2 from '../../assets/flags/image2.jpg';
import logo from '../../assets/flags/logopoeta1.png';
import { FaTwitter, FaInstagram,FaLinkedinIn, FaFacebook, FaGithub } from 'react-icons/fa';



const testimonials = [
  {
    quote: "Their digital marketing strategies helped us skyrocket our online presence. We saw a 300% increase in website traffic within three months!",
    client: "Emma Johnson",
    role: "CEO, Urban Outfitters Co.",
    image: "/profile1.webp",
  },
  {
    quote: "The team’s expertise in SEO and PPC campaigns drove significant growth in our e-commerce sales. They’re a game-changer for our business.",
    client: "Noah Brown",
    role: "E-commerce Manager, Trendy Deals",
    image: "/profile1.webp",
  },
  {
    quote: "Thanks to their social media campaigns, our nonprofit gained thousands of new followers and significantly increased donor engagement.",
    client: "Olivia Martinez",
    role: "Director, Helping Hands Foundation",
    image: "/profile1.webp",
  },
  {
    quote: "Their content marketing strategy was brilliant. Our blog and social channels are now a go-to resource for our audience, boosting our credibility.",
    client: "James Wilson",
    role: "Founder, TechInnovate",
    image: "/profile1.webp",
  },
  {
    quote: "The personalized approach and constant support from their team made a huge difference. My personal brand has never been stronger!",
    client: "Ava Taylor",
    role: "Lifestyle Influencer",
    image: "/profile1.webp",
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
    title: "Advertsing design",
    description: "Create visually stunning ads that captivate your audience and drive engagement.",
    icon: "/digital-marketing.jpg",
    link: "/services/advertising-design",
  },
  {
    title: "Graphic Design",
    description: "Design eye-catching visuals for your brand, from logos and business cards to social media graphics.",
    icon: "/content-writting.png",
    link: "/services/digital-marketing",
  },
  {
    title: "Content Writing",
    description: "To create engaging content that resonates with your audience and boosts your brand.",
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
    question: "How long does it take to see results from digital marketing efforts?",
    answer: "The timeline for results depends on the strategies used and your specific goals. SEO typically takes 3-6 months to show significant progress, while PPC and social media ads can deliver results within weeks.",
  },
  {
    question: "Do you offer social media management only, without advertising?",
    answer: "Yes, we provide social media management services separately. This includes creating and scheduling posts, engaging with your audience, and maintaining a consistent online presence.",
  },
  {
    question: "Can I choose specific platforms for my campaigns?",
    answer: "Absolutely! We tailor our strategies to your preferences and target audience. Whether it's Facebook, Instagram, LinkedIn, or Google Ads, you can select the platforms you want to focus on.",
  },
  {
    question: "What type of reports can I expect on campaign performance?",
    answer: "We provide detailed reports that include key metrics such as traffic, engagement, conversions, and ROI. These reports are presented in a clear, actionable format to help you understand the results of your campaigns.",
  },
  {
    question: "Do you provide SEO services as part of digital marketing?",
    answer: "Yes, our digital marketing services include comprehensive SEO strategies, such as keyword research, on-page optimization, link building, and content creation, to improve your website’s search engine rankings.",
  },
  {
    question: "Can you manage email marketing campaigns?",
    answer: "Yes, we offer email marketing services, including campaign creation, list segmentation, automation, and analytics to ensure your messages reach and engage your target audience effectively.",
  },
  {
    question: "What industries do you specialize in for digital marketing?",
    answer: "We have experience working with a variety of industries, including e-commerce, tech startups, nonprofits, healthcare, and more. Our strategies are adaptable to suit your unique business needs.",
  },
  {
    question: "How do you determine the right budget for my campaigns?",
    answer: "We assess your goals, industry, and competition to recommend a budget that aligns with your objectives. Our goal is to maximize ROI and ensure your investment delivers measurable results.",
  },
  {
    question: "Can you help with content creation for my campaigns?",
    answer: "Yes, we provide content creation services, including blog posts, social media graphics, videos, and more, to support your digital marketing campaigns.",
  },
  {
    question: "Do you offer local marketing solutions?",
    answer: "Yes, we specialize in local SEO and targeted campaigns to help businesses reach their nearby customers effectively and boost local visibility.",
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
      Digital Marketing <br />
        <span className="text-[#EEBA2B] text-2xl">Strategic solutions to boost your online visibility and drive conversions  </span>
      </h1>
    </div>
    <p className="text-xl leading-relaxed text-start md:text-left">
    In today's digital landscape, a well-crafted marketing strategy is key to reaching and engaging your audience. Our Digital Marketing service provides a personalized approach to help your brand stand out online, generate qualified traffic, and convert visitors into loyal customers. From social media campaigns to SEO and beyond, we equip you with the tools and tactics needed for sustained success.
    </p>
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
      src="/digitalM.jpg"
      alt="Web Marketing Strategy"
      className="object-cover rounded-lg w-[80%] h-auto "
    />
  </div>
</section>


<section className="video-creation-section relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 gap-24 text-white rounded-lg mb-12 flex flex-col md:flex-row z-10">
  <div className="visual-container hidden laptop:flex md:w-1/2 h-full">
    <img src="/digitalMskills.jpg" alt="Video Creation and Montage Skills" className="w-[95%] h-[90%] rounded-md" />
  </div>
  <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
    <h2 className="text-3xl font-bold text-[#EEBA2B] mb-6">Our Video Creation & Montage Skills</h2>
    <ul className="space-y-4 text-lg p-4 h-full flex flex-col justify-between">
      <li>
        <strong className="text-2xl">- Social Media Management: </strong> Engage with your audience on platforms like Instagram, Facebook, Twitter, LinkedIn, and more with content that builds brand loyalty.
      </li>
      <li>
        <strong className="text-2xl">- Search Engine Optimization (SEO):</strong>Improve your site’s ranking on search engines with keyword research, on-page optimization, and backlink strategies.
      </li>
      <li>
        <strong className="text-2xl">- Email Marketing Campaigns: </strong>Reach your audience with targeted email campaigns that deliver personalized content and drive conversions.
      </li>
      <li>
        <strong className="text-2xl">- Pay-Per-Click (PPC) Advertising: </strong>Run cost-effective ad campaigns on platforms like Google Ads and social media to attract qualified leads.
      </li>
      <li>
        <strong className="text-2xl">- Content Marketing Strategy:</strong>Build a content plan that resonates with your audience and enhances your brand's authority.
      </li>
    </ul>
  </div>
</section>


<section className="why-choose-us-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
  <h2 className="text-4xl font-bold text-[#EEBA2B] mb-6 text-center md:text-left">
  Why Choose Creativa Poeta for Your Digital Marketing Needs?
  </h2>

  <div className="flex flex-col md:flex-row w-full items-center">
    <div className="w-full laptop:w-1/2 mb-8 md:mb-0 flex justify-center">
      <img
        src="/whyDigi.jpg"
        alt="Creative workspace"
        className="w-[90%] h-[90%] object-cover rounded-lg shadow-md"
      />
    </div>

    <div className="w-full laptop:w-1/2 flex flex-col justify-center text-lg space-y-6 p-6 md:p-8">
      <blockquote className="italic text-lg bg-opacity-10 bg-gray-100 p-4 rounded-md border-l-4 border-[#EEBA2B] shadow">
      "Our team brings a blend of creativity and data-driven strategy to help your brand achieve visibility, engagement, and growth. With a customized approach, we ensure that your marketing efforts align with your brand identity and drive real results."      </blockquote>

      <ul className="space-y-6 pl-4 list-disc text-base md:text-lg">
        <li>Data-driven strategies focused on measurable results</li>
        <li>Expert knowledge of various digital platforms</li>
        <li>Customized content and ad solutions</li>
        <li>Regular updates and reporting</li>
        <li>Proven experience in different industries</li>
      </ul>
    </div>
  </div>
</section>


<section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
  <h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8">
  Who Can Benefit from Our Digital Marketing Services?
  </h2>

  <p className="text-lg text-center mb-8">
  Our Digital Marketing services are designed to cater to a diverse range of clients, offering tailored strategies to meet their unique goals and challenges. Whether you’re a budding entrepreneur, a well-established organization, or an individual looking to expand your influence, we’ve got you covered.   </p>

  <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
      <h3 className="text-xl font-semibold mb-2">Businesses and Startups </h3>
      <p className="md:w-[70%]">
      Businesses and Startups seeking to establish or expand their online presence.      </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
        src="/content.webp"
        alt="Content Creators Icon"
        className="w-36 h-24 mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">E-commerce Brands </h3>
      <p className="md:w-[70%]">
      E-commerce Brands wanting to increase site traffic and boost sales.      </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
    <img
        src="/non.jpg"
        alt="Nonprofits Icon"
        className="w-40 h-36 mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">Nonprofits and Community Organizations </h3>
      <p className="md:w-[70%]">
      Aiming to reach more supporters and grow their influence.      </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
     
       <img
        src="/influencer.avif"
        alt="Educators Icon"
        className="w-36 h-36 mb-4 rounded-full"
      />
      <h3 className="text-xl font-semibold mb-2">Individuals and Influencers </h3>
      <p className="md:w-[70%]">
      Individuals and Influencers looking to build a following and grow their personal brand.      </p>
    </div>
  </div>
</section>




<section className="design-process-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg text-white shadow-lg relative z-10 bg-gradient-to-br from-gray-800 to-black">
  <h2 className="text-4xl font-bold text-center mb-12 text-[#EEBA2B]">Our Video Creation & Montage Process</h2>

  <div className="relative flex flex-col laptop:flex-row items-center space-y-16">
    {/* Step 1 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <div className="lg:order-2 order-1">
        <img src="/consultancy.png" alt="Consultation Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
        <div className="text-center lg:text-left">
          <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">1. Initial Consultation</h3>
          <p className="text-white">We discuss your goals, target audience, and brand identity.</p>
        </div>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 2 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/script.jpg" alt="Scriptwriting Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">2. Audit and Analysis</h3>
        <p className="text-white">In-depth review of your current online presence and competitors to identify opportunities.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 3 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/prod.jpg" alt="Production Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">3.	Strategy Development</h3>
        <p className="text-white">Crafting a customized digital marketing strategy aligned with your goals.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 4 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/editvid.jpg" alt="Editing Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">4.	Implementation</h3>
        <p className="text-white">Executing the strategy with measurable actions, from content creation to ad placements.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 5 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/delive.avif" alt="Delivery Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg bg-white mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">5.	Monitoring and Optimization</h3>
        <p className="text-white">Regular tracking and adjustments to maximize results and adapt to changes.</p>
      </div>
    </div>
  </div>
</section>


<section className="portfolio-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 text-center  text-white z-10">
  <h2 className="text-4xl font-bold text-[#EEBA2B] mb-8">Our Portfolio</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-6">
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/ad1.webp" alt="Portfolio Item" className="w-[100%] h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 1</h3>
        <p className="text-white text-sm">For Tech Startup</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/ad2.png" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 2</h3>
        <p className="text-gray-300 text-sm">For a Company</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/ad3.webp" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 3</h3>
        <p className="text-gray-300 text-sm">For a Business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/ad4.png" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 4</h3>
        <p className="text-gray-300 text-sm">For A business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/ad5.png" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Prject 5</h3>
        <p className="text-gray-300 text-sm">For business advertising</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/ad6.avif" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
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
  <h2 className="text-3xl font-semibold mb-4">Ready to Bring Your Vision to Life?</h2>
  <p className="text-lg mb-8 px-6 max-w-2xl mx-auto">
    Whether you need a stunning promotional video, engaging social media content, or a captivating montage, we’re here to help. Let’s create something extraordinary together!
  </p>

  <Link to="/start-project">
    <button
      className="main-cta-btn bg-[#EEBA2B] text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
    >
      Start Your Video Journey Today!
    </button>
  </Link>
</section>



    <section className="visual-elements w-full  md:w-[95%] rounded-md mb-4 bg-white py-16 px-4 text-gray-800 flex flex-col items-center z-10">
      {/* Title */}
      <h2 className="text-4xl font-semibold text-center text-[#1e1e2f] mb-12">
        Our Digital Marketing Expertise
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
            <img src="/ad6.avif" alt="Project 1" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/ad2.png" alt="Project 2" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/ad5.png" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/ad1.webp" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/ad3.webp" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/ad4.png" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
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
          <a href="/services/content-writting" className="text-[#EEBA2B] hover:underline">Content writting</a>
          <a href="/services/advertising-design" className="text-[#EEBA2B] hover:underline">Advertising design</a>
        </div>
      </div>
    </section>

    </div>
  );
};

export default DiditalMarketing;
