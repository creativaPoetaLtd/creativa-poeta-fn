import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image2 from '../../assets/flags/image2.jpg';
import logo from '../../assets/flags/logopoeta1.png';
import { FaTwitter, FaInstagram,FaLinkedinIn, FaFacebook, FaGithub } from 'react-icons/fa';



const testimonials = [
  {
    quote: "The team brought our vision to life with stunning visuals and seamless editing. The final video exceeded all our expectations!",
    client: "Alex Carter",
    role: "Marketing Manager, BrightWave Media",
    image: "/avatar.jpg",
  },
  {
    quote: "Their storytelling and editing skills transformed our raw footage into a masterpiece. The video truly resonated with our audience.",
    client: "Sophia Lopez",
    role: "Content Creator, Inspire Studios",
    image: "/avatar.jpg",
  },
  {
    quote: "From planning to delivery, their professionalism and creativity stood out. Our promotional video was a huge hit!",
    client: "Michael Roberts",
    role: "CEO, EventSphere",
    image: "/avatar.jpg",
  },
  {
    quote: "Their ability to blend visuals and audio perfectly captured our brand’s message. We’ll definitely collaborate again!",
    client: "Emily White",
    role: "Founder, Green Horizon",
    image: "/avatar.jpg",
  },
  {
    quote: "The quality of their editing and post-production work was phenomenal. They made every second of the video count!",
    client: "Liam Turner",
    role: "Director, NextGen Films",
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
    title: "Advertsing design",
    description: "Create visually stunning ads that captivate your audience and drive engagement.",
    icon: "/digital-marketing.jpg",
    link: "/services/advertising-design",
  },
  {
    title: "Digital marketing",
    description: "Boost your online presence with strategic marketing campaigns that drive results.",
    icon: "/content-writting.png",
    link: "/services/digital-marketing",
  },
  {
    title: "Advertising design",
    description: "Create visually stunning ads that captivate your audience and drive engagement.",
    icon: "/content-writting.png",
    link: "/services/advertising-design",
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
    question: "What is video creation and montage?",
    answer: "Video creation and montage involve producing visually engaging videos by combining creative storytelling, high-quality footage, and seamless editing to deliver impactful content tailored to your needs.",
  },
  {
    question: "What types of videos do you create?",
    answer: "We create a variety of videos, including promotional videos, corporate presentations, event coverage, social media content, explainer videos, and more.",
  },
  {
    question: "How long does it take to complete a video project?",
    answer: "The timeline varies based on the project's complexity, length, and requirements. During our initial consultation, we’ll provide a clear timeline for delivery.",
  },
  {
    question: "Can you work with existing footage for editing and montage?",
    answer: "Yes, we can work with your existing footage, enhancing it through professional editing, color correction, and sound design to deliver a polished final product.",
  },
  {
    question: "What is the cost of your video creation services?",
    answer: "Costs depend on the project scope, duration, and specific requirements. We offer tailored pricing after understanding your needs during the consultation phase.",
  },
  {
    question: "Do you provide scriptwriting and concept development services?",
    answer: "Yes, we offer comprehensive pre-production services, including scriptwriting, storyboarding, and concept development to ensure your vision is fully realized.",
  },
  {
    question: "What formats and resolutions do you deliver videos in?",
    answer: "We deliver videos in various formats and resolutions, optimized for platforms like social media, websites, and presentations, ensuring compatibility with your intended use.",
  },
  {
    question: "Do you offer revisions if changes are needed after the first draft?",
    answer: "Yes, we include revisions in our process to ensure the final video meets your expectations and aligns with your vision.",
  },
  {
    question: "Can you add animations or special effects to my video?",
    answer: "Absolutely! We can incorporate animations, motion graphics, and special effects to enhance your video and make it more engaging.",
  },
  {
    question: "Do you provide voiceovers and background music for videos?",
    answer: "Yes, we offer professional voiceover and royalty-free background music options to enhance the audio quality of your videos.",
  },
  {
    question: "Can you create videos for social media campaigns?",
    answer: "Yes, we specialize in creating videos optimized for social media platforms, ensuring they capture attention and engage your audience effectively.",
  },
  {
    question: "What makes your video creation services unique?",
    answer: "Our services stand out due to our attention to detail, creativity, and ability to tailor each project to the client's unique needs. We focus on delivering visually stunning and impactful videos that achieve your goals.",
  },
  {
    question: "How do I get started with your video creation and montage services?",
    answer: "Getting started is easy! Contact us to schedule an initial consultation, and we’ll discuss your ideas, goals, and requirements to create a custom plan for your video project.",
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

const VideoCreation = () => {
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
      Video Creation <br />
        <span className="text-[#EEBA2B] text-2xl">Focuses on end-to-end video creation, including scripting, filming, production, and piecing together multiple video clips to form a cohesive, engaging story.   </span>
      </h1>
    </div>
    <p className="text-xl leading-relaxed text-start md:text-left">
      Our Video Creation service is designed to help you tell your story in a visually compelling way. Whether you're looking to create a promotional video, a product demo, or a brand story, we have the expertise to bring your vision to life. Our team of videographers, editors, and producers work together to deliver high-quality videos that engage, inform, and inspire your audience.
      Our Montage service focuses on piecing together multiple video clips to form a cohesive, engaging story. We work with you to select the best footage, add music and effects, and create a final product that captures the essence of your message. Whether you're looking to create a highlight reel, a recap video, or a social media montage, we have the skills and creativity to make it happen.
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
      src="/videocre.jpg"
      alt="Web Marketing Strategy"
      className="object-cover rounded-lg "
    />
  </div>
</section>


<section className="video-creation-section relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 gap-24 text-white rounded-lg mb-12 flex flex-col md:flex-row z-10">
  <div className="visual-container hidden laptop:flex md:w-1/2 h-full">
    <img src="/vidskills.svg" alt="Video Creation and Montage Skills" className="w-[95%] h-[90%] rounded-md" />
  </div>
  <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
    <h2 className="text-3xl font-bold text-[#EEBA2B] mb-6">Our Video Creation & Montage Skills</h2>
    <ul className="space-y-4 text-lg p-4 h-full flex flex-col justify-between">
      <li>
        <strong className="text-2xl">- Creative Storyboarding:</strong> Visualize compelling narratives with professional storyboard designs that set the stage for impactful videos.
      </li>
      <li>
        <strong className="text-2xl">- High-Quality Filming:</strong> Capture stunning visuals with expert videography tailored to your project's needs.
      </li>
      <li>
        <strong className="text-2xl">- Professional Editing:</strong> Seamlessly integrate visuals, sound, and effects for polished and dynamic video content.
      </li>
      <li>
        <strong className="text-2xl">- Advanced Motion Graphics:</strong> Add eye-catching animations and transitions to elevate your video's aesthetic appeal.
      </li>
      <li>
        <strong className="text-2xl">- Audio Enhancement:</strong> Ensure crisp sound quality with professional mixing and voice-over integration for an immersive experience.
      </li>
      <li>
        <strong className="text-2xl">- Multi-Platform Optimization:</strong> Customize videos for optimal performance across social media, websites, and other platforms.
      </li>
    </ul>
  </div>
</section>


<section className="why-choose-us-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
  <h2 className="text-4xl font-bold text-[#EEBA2B] mb-6 text-center md:text-left">
    Why Choose Creativa Poeta for Video Creation & Montage?
  </h2>

  <div className="flex flex-col md:flex-row w-full items-center">
    <div className="w-full laptop:w-1/2 mb-8 md:mb-0 flex justify-center">
      <img
        src="/whyvid.jpg"
        alt="Creative workspace"
        className="w-[90%] h-[90%] object-cover rounded-lg shadow-md"
      />
    </div>

    <div className="w-full laptop:w-1/2 flex flex-col justify-center text-lg space-y-6 p-6 md:p-8">
      <blockquote className="italic text-lg bg-opacity-10 bg-gray-100 p-4 rounded-md border-l-4 border-[#EEBA2B] shadow">
        "With years of experience in crafting stunning videos and montages, our team ensures your vision comes to life with unmatched creativity, precision, and storytelling. We focus on seamless collaboration, advanced techniques, and delivering content that truly resonates."
      </blockquote>

      <ul className="space-y-6 pl-4 list-disc text-base md:text-lg">
        <li><strong>Personalized Vision:</strong> Every project is tailored to reflect your unique goals and audience.</li>
        <li><strong>Expertise & Innovation:</strong> Leverage our in-depth knowledge and cutting-edge tools for impactful visuals.</li>
        <li><strong>Seamless Process:</strong> Enjoy smooth communication and end-to-end support from ideation to execution.</li>
        <li><strong>Platform Optimization:</strong> Videos are fine-tuned for maximum engagement across multiple platforms.</li>
        <li><strong>Commitment to Excellence:</strong> Dedicated to delivering quality that exceeds expectations every time.</li>
      </ul>
    </div>
  </div>
</section>


<section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
  <h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8">
    Who Can Benefit from Our Video Creation & Montage Service?
  </h2>

  <p className="text-lg text-center mb-8">
    Our Video Creation & Montage service is perfect for anyone looking to elevate their content with professional visuals. Whether you’re a brand, content creator, educator, or nonprofit, our tailored solutions cater to diverse needs and ensure your message is delivered with impact.
  </p>

  <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
      <h3 className="text-xl font-semibold mb-2">Brands & Businesses</h3>
      <p className="md:w-[70%]">
        Enhance marketing campaigns and showcase products with stunning video content.
      </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
        src="/content.webp"
        alt="Content Creators Icon"
        className="w-36 h-24 mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">Content Creators</h3>
      <p className="md:w-[70%]">
        Elevate your channels with engaging videos that captivate your audience.
      </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
        src="/edu.jpg"
        alt="Educators Icon"
        className="w-20 h-36 mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">Educators</h3>
      <p className="md:w-[70%]">
        Create instructional videos that simplify learning and boost engagement.
      </p>
    </div>

    <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
      <img
        src="/non.jpg"
        alt="Nonprofits Icon"
        className="w-40 h-36 mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">Nonprofits</h3>
      <p className="md:w-[70%]">
        Spread awareness and tell compelling stories to maximize your outreach.
      </p>
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
          <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">1. Discovery and Consultation</h3>
          <p className="text-white">Understanding your goals, target audience, and the story you want to tell through video.</p>
        </div>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 2 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/script.jpg" alt="Scriptwriting Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">2. Scriptwriting and Storyboarding</h3>
        <p className="text-white">Crafting a compelling script and visual plan that aligns with your brand and message.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 3 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/prod.jpg" alt="Production Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">3. Video Production</h3>
        <p className="text-white">Capturing high-quality footage using professional techniques to bring your story to life.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 4 - Right */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
      <img src="/editvid.jpg" alt="Editing Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">4. Post-Production and Editing</h3>
        <p className="text-white">Seamlessly editing and enhancing footage, adding effects, transitions, and audio to create a polished final product.</p>
      </div>
    </div>
    {/* Connector Line */}
    <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

    {/* Step 5 - Left */}
    <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
      <img src="/delive.avif" alt="Delivery Icon" className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg bg-white mb-4 lg:mb-0" />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">5. Final Delivery</h3>
        <p className="text-white">Providing you with the completed video in your desired format, ready to share across platforms.</p>
      </div>
    </div>
  </div>
</section>


<section className="portfolio-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 text-center  text-white z-10">
  <h2 className="text-4xl font-bold text-[#EEBA2B] mb-8">Our Portfolio</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-6">
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/vid1.jpg" alt="Portfolio Item" className="w-[100%] h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 1</h3>
        <p className="text-white text-sm">For Tech Startup</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/vid2.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 2</h3>
        <p className="text-gray-300 text-sm">For a Company</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/vid3.jpg" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 3</h3>
        <p className="text-gray-300 text-sm">For a Business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/vid4.avif" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Project 4</h3>
        <p className="text-gray-300 text-sm">For A business</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/vid5.webp" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg font-semibold text-[#EEBA2B]">Prject 5</h3>
        <p className="text-gray-300 text-sm">For business advertising</p>
      </div>
    </div>
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
      <img src="/vid6.png" alt="Portfolio Item" className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover" />
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
            <img src="/vid1.jpg" alt="Project 1" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/vid6.png" alt="Project 2" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/vid4.avif" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/vid2.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/vid3.jpg" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
            <img src="/vid5.webp" alt="Project 3" className="w-64 h-48 object-cover rounded-lg shadow-lg" />
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
          <a href="/services/digital-marketing" className="text-[#EEBA2B] hover:underline">Digital marketing</a>
          <a href="/services/advertising-design" className="text-[#EEBA2B] hover:underline">Advertising design</a>
        </div>
      </div>
    </section>

    </div>
  );
};

export default VideoCreation;
