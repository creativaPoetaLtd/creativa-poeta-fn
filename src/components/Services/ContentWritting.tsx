import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import image2 from "../../assets/flags/image2.jpg";
import logo from "../../assets/flags/logopoeta1.png";

import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebook,
} from "react-icons/fa";


const testimonials = [
  {
    quote:
      "The content they provided was not only engaging but also perfectly aligned with our brand voice. It's like they read our minds!",
    client: "Jessica Carter",
    role: "Content Manager, StartupHub",
    image: "/profile.jpg",
  },
  {
    quote:
      "Their writing increased our blog traffic by 50% in just a few months. They truly understand SEO and audience needs.",
    client: "Michael Green",
    role: "Marketing Lead, BrightPath",
    image: "/profile.jpg",
  },
  {
    quote:
      "I’ve worked with several writers, but this team stands out. Their creativity, timeliness, and quality are unmatched.",
    client: "Olivia Harrison",
    role: "Founder, HealthyBites",
    image: "/profile.jpg",
  },
  {
    quote:
      "Our sales copy has never been better. They helped us double our conversion rate with persuasive and well-structured content.",
    client: "Daniel Roberts",
    role: "Head of Sales, TechInnovate",
    image: "/profile.jpg",
  },
  {
    quote:
      "Professional, responsive, and extremely talented. Their storytelling skills brought our brand to life in ways we never imagined.",
    client: "Sophia Wilson",
    role: "CEO, NatureEssence",
    image: "/profile.jpg",
  },
];
;

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
    <section className="testimonial-slider min-h-screen w-full md:w-[80%] items-center justify-center flex flex-col max-w-screen-lg mx-auto mt-12 text-center  text-white rounded-lg shadow-lg relative">
      <h2 className="text-4xl font-bold mb-8 text-[#EEBA2B]">
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

              <p className="text-xl italic px-4 lg:px-16 max-w-xl mx-auto leading-relaxed">
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
    title: "Graphic design",
    description:
    "Striving visual creations that reflect your brand identity and captivate your audience.",
    icon: "/digital-marketing.jpg",
    link: "/services/graphic-design",
  },
  {
    title: "Digital support",
    description:
    "Boost your online presence with engaging and informative digital content.",
    icon: "/content-writting.png",
    link: "/services/digital-support",
  },
  {
    title: "Digital marketing",
    description: "Reach your target audience with strategic digital marketing campaigns.",
    icon: "/content-writting.png",
    link: "/services/digital-marketing",
  },
  {
    title: "Advertising design",
    description: "We bring your ideas to life. Our team of experts will help you create the perfect advertising design.",
    icon: "/videoProd.png",
    link: "/services/advertising-design",
  },
];

export function RelatedServices() {
  return (
    <section className="related-services-section w-full md:w-[95%] py-16 px-8  text-center z-10">
      <h2 className="text-4xl font-bold text-white mb-8">Related Services</h2>
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
            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
            <p className="text-base mb-4">{service.description}</p>
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
    question: "How long does it take to write a blog post?",
    answer: "The time it takes to write a blog post depends on the length and complexity of the content. On average, we can deliver a 500-word blog post within 2-3 days. Longer posts may take up to a week to complete.",},
  {
    question: "Do you offer proofreading services only?",
    answer: "No, we offer a range of content writing services, including blog writing, web content creation, professional document writing, and more. Our team can assist with all your writing needs, from start to finish.",},
  {
    question: "Is it possible to request revisions on the written text?",
    answer:
      "Yes, we offer revisions on all written content to ensure it meets your expectations. We value your feedback and will work with you to make any necessary changes to the text.",},
  {
    question: "In what formats do you provide the finalized text?",
    answer: "We can provide the finalized text in various formats, including Word documents, PDFs, and Google Docs. Let us know your preferred format, and we will deliver the content accordingly.",},
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section w-full md:w-[95%] mx-auto my-12 p-8 text-gray-800  rounded-lg shadow-lg z-10">
      <h2 className="text-4xl font-bold text-center text-[#EEBA2B] mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full text-left text-lg text-white font-bold focus:outline-none">
              {faq.question}
              <span className="text-2xl text-[#EEBA2B]">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            <div
              className={`mt-2 overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-screen" : "max-h-0"
              }`}>
              <p className="text-gray-100 mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ContentWritting = () => {
  return (
    <div
      className="relative min-h-screen bg-white flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${image2})` }}
      id="design-graphique">
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
              Content Writing <br />
              <span className="text-[#EEBA2B] text-2xl">
                {" "}
                Carefully crafted words to tell your story and captivate your
                audience{" "}
              </span>
            </h1>
          </div>
          <p className="text-xl leading-relaxed text-center md:text-left">
            The power of words should never be underestimated. Our passionate
            writers create customized content that aligns with your brand and
            values, engaging and informing your audience. Whether it's blog
            articles, web content, or professional documents, our team masters
            the art of written communication to deliver your message clearly and
            impactfully.
          </p>
          <Link to="/start-project">
            <button
              // type="primary"
              className="bg-[#EEBA2B] p-4 rounded-lg border-[#EEBA2B] text-[1.2rem] hover:bg-yellow-400 text-black hover:border hover:border-[#EEBA2B] hover:text-black mt-4">
              Start a project
            </button>
          </Link>
        </div>

        <div className="hidden items-center justify-center laptop:flex w-full laptop:w-1/2 mt-8 md:mt-0">
          <img
            src="/contentWser.jpg"
            alt="Web Marketing Strategy"
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      <section className="graphic-design-section  relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 gap-24 text-white rounded-lg mb-12 flex flex-col md:flex-row z-10">
        <div className="yellow-lines-container  hidden laptop:flex md:w-1/2 h-full">
          <img
            src="/contentWskills.avif"
            alt=""
            className="w-[95%] h-[90%] rounded-md"
          />
        </div>
        <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#EEBA2B] mb-6">
            Our Content Writing Skills
          </h2>
          <ul className="space-y-4 text-lg p-4 h-full flex flex-col justify-between">
            <li>
              <strong className="text-2xl">- Web Content Writing:</strong> Each
              SEO-optimized texts that boost your online visibility and attract qualified visitors.
            </li>
            <li>
              <strong className="text-2xl">- Proofreading and Editing:</strong>{" "}
              Our experts ensure high-quality documents by correcting, editing, and enhancing your texts, eliminating errors and refining style.
            </li>
            <li>
              <strong className="text-2xl">
                - Professional Letters and Documents:
              </strong>{" "}
              We write letters, professional emails, and official documents with a formal tone suited to each need.
            </li>
            <li>
              <strong className="text-2xl">- Speech and Poetry Writing:</strong>{" "}
              From poetry to oratory, our writers craft inspiring texts that leave a lasting impression.
            </li>
            <li>
              <strong className="text-2xl">
                - Academic and Professional Report Assistance:
              </strong>{" "}
              Our writers assist with academic and professional reports, ensuring compliance with required standards and guidelines
            </li>
          </ul>
        </div>
      </section>

      <section className="why-choose-us-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10">
        <h2 className="text-4xl font-bold text-[#EEBA2B] mb-4">
          Why Choose Creativa Poeta for your content writting projects?
        </h2>

        <div className="flex flex-col md:flex-row w-full  mt-6">
          <div className="w-full laptop:w-1/2 laptop:flex md:mb-0 hidden">
            <img
              src="/contentWhy.jpg"
              alt="Creative workspace"
              className="w-[90%] items-start justify-start h-[90%] object-cover rounded-lg hidden md:block"
            />
          </div>
          <div className="w-full laptop:w-1/2 flex flex-col justify-center text-xl space-y-4 p-6 md:p-8  md:h-full">
            <p className="italic">
              Creativa Poeta has a team of passionate writers who understand the power of words. We create content that resonates with your audience, engaging and informing them effectively. Our team is dedicated to delivering high-quality texts that reflect your brand identity and values, helping you stand out in a crowded digital landscape. 

            </p>
            <ul className="list-inside space-y-8">
              <li>- Tailored Content: We
                create customized texts that align with your brand identity and
                values, engaging your audience and enhancing your online
                presence.
              </li>
              <li>- SEO Optimization: Our
                writers craft SEO-optimized texts that boost your online
                visibility and attract qualified visitors.
              </li>
              <li>- Professionalism: We
                ensure high-quality documents by correcting, editing, and
                enhancing your texts, eliminating errors and refining style.
              </li>
              <li>- Creativity: From poetry
                to oratory, our writers craft inspiring texts that leave a
                lasting impression.
              </li>
              <li>- Compliance: Our writers
                assist with academic and professional reports, ensuring
                compliance with required standards and guidelines.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10">
        <h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8">
          Who is this service for?
        </h2>

        <p className="text-lg text-center mb-8">
          Our content writing services are ideal for businesses and individuals
          looking to enhance their online presence and engage audiences with
          compelling written content. We cater to clients seeking SEO-optimized
          web content, professional documents, and creative writing solutions.
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
          {/* Business */}
          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
            <h3 className="text-xl font-semibold mb-2">Businesses</h3>
            <p className="md:w-[70%]">
              Ideal for businesses seeking an online presence with engaging
              content.
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/content.webp"
              alt="Content Creators Icon"
              className="w-36 h-24 mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold mb-2">
            Entrepreneurs and bloggers 
            </h3>
            <p className="md:w-[70%]">
              Ideal for individuals looking to create a unique and professional brand identity that reflects their personality and style, and want to share their knowledge and establish authority in their field.
            </p>
          </div>

          {/* Individuals */}
          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/individual.png"
              alt="Individuals Icon"
              className="w-20 h-36 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Professionals</h3>
            <p className="md:w-[70%]">
              Ideal for professionals in need of high-quality documents such as letters, reports for formal interactions.
            </p>
          </div>

          {/* Associations */}
          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/associations.png"
              alt="Associations Icon"
              className="w-40 h-36 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              Studens and Researchers
            </h3>
            <p className="md:w-[70%]">
            Students and researchers requiring assistance in writing theses and academic papers.
            </p>
          </div>
        </div>
      </section>

      <section className="design-process-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg  text-white shadow-lg relative">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#EEBA2B]">
          Our Writting Process
        </h2>

        <div className="relative flex flex-col laptop:flex-row items-center space-y-16">
          {/* Step 1 - Left */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
            <div className="lg:order-2 order-1">
              <img
                src="/consultancy.png"
                alt="Consultation Icon"
                className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
              />
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                  1. Initial Briefing
                </h3>
                <p className="text-white">
                We take the time to understand your objectives and target audience.
                </p>
              </div>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 2 - Right */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
            <img
              src="/research.png"
              alt="Research Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                2. Research
              </h3>
              <p className="text-white">
              Gathering relevant information to structure content professionally.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 3 - Left */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
            <img
              src="/concept.jpg"
              alt="Development Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                3. Content Writting
              </h3>
              <p className="text-white">
              Creating carefully tailored texts suited to your needs.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 4 - Right */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
            <img
              src="/revision.jpg"
              alt="Revision Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                4.	Review and Approval
              </h3>
              <p className="text-white">
              We send the content for your review and incorporate any necessary revisions.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 5 - Left */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
            <img
              src="/delivery.png"
              alt="Delivery Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg bg-white mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                5. Delivery
              </h3>
              <p className="text-white">
              Final text delivered in your chosen format, ready for publication or use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 text-center  text-white z-10">
        <h2 className="text-4xl font-bold text-[#EEBA2B] mb-8">
          Our Portfolio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/book1.png"
              alt="Portfolio Item"
              className="w-[100%] h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Book
              </h3>
              <p className="text-white text-sm">For Tech Startup</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/book2.webp"
              alt="Portfolio webp"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
              Book
              </h3>
              <p className="text-gray-300 text-sm">For a Company</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/book3.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">Book</h3>
              <p className="text-gray-300 text-sm">For a Business</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/book4.webp"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">Book</h3>
              <p className="text-gray-300 text-sm">For A business</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/book5.webp"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">Book</h3>
              <p className="text-gray-300 text-sm">For business advertising</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/book6.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Book 
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
            Like what you see? Contact us!
          </a>
        </div>
      </section>

      <TestimonialSlider />
      <RelatedServices />
      <FAQSection />
      <section className="contact-section w-full md:w-[95%] py-16 px-6 text-white text-center flex flex-col items-center z-10">
        {/* Encouragement Text */}
        <h2 className="text-3xl font-semibold mb-4">
          Want to deliver professionally written content?
        </h2>
        <p className="text-lg mb-8 px-6 max-w-2xl mx-auto">
          Contact us to discuss your project today and discover how we can bring
          your vision to life!
        </p>

        <Link to="/start-project">
          <button className="main-cta-btn bg-[#EEBA2B] text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            Elevate Your Brand with Our writtings
          </button>
        </Link>
      </section>

      <section className="visual-elements w-full  md:w-[95%] rounded-md mb-4 bg-white py-16 px-4 text-gray-800 flex flex-col items-center z-10">
        <h2 className="text-4xl font-semibold text-center text-[#1e1e2f] mb-12">
          Our Content Writting Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          <div className="skill-item text-center">
            <img
              src="/expe1.png"
              alt="Logo Design"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">
              Logo Ideas
            </h3>
            <p>Unique, memorable logos that define your brand identity.</p>
          </div>

          <div className="skill-item text-center">
            <img
              src="/card1.webp"
              alt="Business Card ideas"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-md font-bold text-[#EEBA2B] mb-2">
              Business Card Design ideas
            </h3>
            <p>Elegant business cards that leave a lasting impression.</p>
          </div>

          <div className="skill-item text-center">
            <img
              src="/expe3.jpg"
              alt="Poster Design"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">
              Poster contents
            </h3>
            <p>Visually captivating posters for promotions and events.</p>
          </div>

          <div className="col-span-full">
            <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-6 text-center">
              Our Projects
            </h3>
            <div className="carousel flex overflow-x-scroll space-x-4">
              <img
                src="/expe1.png"
                alt="Project 1"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/expe2.webp"
                alt="Project 2"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/expe3.jpg"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/expe4.webp"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/expe5.jpg"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/expe6.png"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Social Sharing */}
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
            Explore More Services
          </h3>
          <div className="flex justify-center space-x-8">
            <a
              href="/services/digital-marketing"
              className="text-[#EEBA2B] hover:underline">
              Digital Marketing
            </a>
            <a
              href="/services/content-writing"
              className="text-[#EEBA2B] hover:underline">
              Content Writing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentWritting;
