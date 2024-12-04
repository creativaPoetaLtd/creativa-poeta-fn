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
  FaGithub,
} from "react-icons/fa";

// handle navigate to start-project
export const handleNavigate = () => {
  window.location.href = "/start-project";
};

const testimonials = [
  {
    quote:
      "Their advertising designs brought our brand to life. The campaigns were not only visually stunning but also incredibly effective in attracting new customers.",
    client: "Sophia Carter",
    role: "Marketing Director, Elite Apparel",
    image: "/avatar1.jpg",
  },
  {
    quote:
      "Working with their team was seamless. Their ad designs captured our vision perfectly, helping us achieve a 40% increase in sales during our seasonal campaign.",
    client: "Liam Jackson",
    role: "Owner, Bloom & Beyond",
    image: "/avatar1.jpg",
  },
  {
    quote:
      "The creativity and precision they put into every design are unmatched. Our nonprofit's awareness campaign exceeded expectations, thanks to their expertise.",
    client: "Isabella Ramirez",
    role: "Program Manager, GreenFuture Alliance",
    image: "/avatar1.jpg",
  },
  {
    quote:
      "Their innovative designs and out-of-the-box thinking were exactly what we needed for our product launch. The ads were a huge hit with our audience.",
    client: "Ethan Walker",
    role: "CEO, PureTech Solutions",
    image: "/avatar1.jpg",
  },
  {
    quote:
      "The team went above and beyond to deliver ads that truly resonated with our audience. Their designs helped us stand out in a crowded market.",
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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonial-slider min-h-screen w-full md:w-[80%] items-center justify-center flex flex-col max-w-screen-lg mx-auto mt-12 text-center  text-white rounded-lg shadow-lg relative z-10">
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
    title: "  Digital Marketing",
    description:
      "Create visually stunning ads that captivate your audience and drive engagement.",
    icon: "/digital-marketing.jpg",
    link: "/services/digital-marketing",
  },
  {
    title: "Graphic Design",
    description:
      "Design eye-catching visuals for your brand, from logos and business cards to social media graphics.",
    icon: "/content-writting.png",
    link: "/services/graphic-design",
  },
  {
    title: "Video production",
    description:
      "To create engaging content that resonates with your audience and boosts your brand.",
    icon: "/content-writting.png",
    link: "/services/video-production",
  },
];

export function RelatedServices() {
  return (
    <section className="related-services-section w-full md:w-[95%] py-16 px-8  text-center z-10">
      <h2 className="text-2xl text-[#EEBA2B] font-bold  mb-8">
        Related Services
      </h2>
      <div className="grid gap-8  laptop:grid-cols-3 md:grid-cols-2">
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
    question: "What formats are available for the final ad designs?",
    answer:
      "We deliver ad designs in a variety of formats, including images (JPG, PNG), videos (MP4), and platform-specific formats optimized for social media, print, or digital use.",
  },
  {
    question: "Can you create ads for multiple social media platforms?",
    answer:
      "Yes, we specialize in creating versatile ad designs tailored to platforms such as Facebook, Instagram, LinkedIn, Twitter, and others, ensuring each design aligns with platform-specific requirements.",
  },
  {
    question:
      "How long does it take to design a campaign from start to finish?",
    answer:
      "The timeline depends on the complexity and scope of the campaign. Typically, ad designs are completed within 1-3 weeks, including feedback and revisions.",
  },
  {
    question:
      "Do you offer consultation on advertising strategy along with design?",
    answer:
      "Yes, we provide strategic consultation to help you plan your advertising campaigns effectively. This includes audience targeting, platform selection, and messaging strategies.",
  },
  {
    question: "Can you handle both digital and print ad design?",
    answer:
      "Absolutely! We design ads for both digital platforms like social media and websites, as well as traditional print media such as magazines, brochures, and billboards.",
  },
  {
    question: "Do you offer revisions for the ad designs?",
    answer:
      "Yes, we include a set number of revisions in our design process to ensure the final ads meet your expectations and align with your brand identity.",
  },
  {
    question:
      "Can you design ads that align with my existing brand guidelines?",
    answer:
      "Yes, we work closely with your brand guidelines to ensure all ad designs are consistent with your brand’s tone, colors, and style.",
  },
  {
    question: "Do you provide motion graphics or animated ads?",
    answer:
      "Yes, we create engaging motion graphics and animated ads to capture attention and enhance the impact of your campaigns.",
  },
  {
    question: "What industries do you cater to for advertising design?",
    answer:
      "We have experience working with a wide range of industries, including retail, e-commerce, nonprofits, technology, healthcare, and more. Our designs are tailored to suit your specific business goals.",
  },
  {
    question: "How do I get started with your advertising design services?",
    answer:
      "Getting started is easy! Contact us to discuss your campaign goals, and we’ll create a customized plan and timeline for your advertising needs.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section w-full md:w-[95%] mx-auto my-12 p-8 text-gray-800  rounded-lg shadow-lg z-10">
      <h2 className="text-2xl font-bold text-center text-[#EEBA2B] mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-100 pb-4">
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

const DiditalMarketing = () => {
  return (
    <div
      className="relative min-h-screen bg-white flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${image2})` }}
      id="project-development">
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
      <section className="min-h-fit h-screen justify-center w-[95%] mt-16 m-auto py-16 px-4 flex flex-col items-center space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-8 md:space-y-0 md:space-x-8 z-10">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-4">
            <div className="flex flex-col items-center md:items-start text-white">
              <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
                Advertising Design
                <div className="bg-yellow-400 h-1 mt-2"></div>
              </h1>
              <span className="text-[#EEBA2B] text-lg md:text-xl text-center mt-4 md:text-left">
                Transforming ideas into compelling campaigns that captivate and
                inspire action
              </span>
            </div>
            <p className="text-sm md:text-lg text-justify md:text-left leading-relaxed text-white">
              Effective advertising design goes beyond aesthetics—it
              communicates, persuades, and inspires action. Our team crafts
              visually engaging ad campaigns that highlight your brand's
              message, capture attention, and resonate with your audience. From
              digital ads to print materials, we create advertisements that
              elevate your brand’s visibility and drive results across all media
              platforms.
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src="/AdDesgn.png"
              alt="Advertising Design"
              className="object-contain rounded-lg max-w-full h-auto shadow-md"
            />
          </div>
        </div>

        {/* Button */}
        <div className="w-full flex justify-center px-10 z-10">
          <button
            onClick={handleNavigate}
            className="bg-[#EEBA2B] px-6 py-3 rounded-lg border border-[#EEBA2B] text-lg font-semibold hover:bg-yellow-400 hover:text-black transition-all">
            Start a project
          </button>
        </div>
      </section>

      <section className="advertising-design-section relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 gap-24 text-white rounded-lg mb-12 flex flex-col-reverse md:flex-row z-10">
        <div className="visual-container laptop:flex md:w-1/2 h-full">
          <img
            src="/AdDesgnn.jpg"
            alt="Advertising Design Skills"
            className="w-[95%] h-[95%] rounded-md"
          />
        </div>
        <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#EEBA2B] mb-6">
            Our Advertising Design Skills
          </h2>
          <ul className="space-y-4 text-lg p-4 h-full flex flex-col justify-between">
            <li>
              <strong className="text-md md:text-lg laptop:text-xl">
                - Visual Branding:{" "}
              </strong>{" "}
              Develop consistent and compelling visual identities that resonate
              with your target audience and elevate your brand’s presence.
            </li>
            <li>
              <strong className="text-md md:text-lg laptop:text-xl">
                - Campaign Design:{" "}
              </strong>{" "}
              Create impactful and strategic advertising campaigns tailored for
              digital and print platforms to maximize reach and engagement.
            </li>
            <li>
              <strong className="text-md md:text-lg laptop:text-xl">
                - Graphic Design Expertise:{" "}
              </strong>{" "}
              Deliver high-quality visuals including banners, posters, flyers,
              and digital ads that captivate and inspire action.
            </li>
            <li>
              <strong className="text-md md:text-lg laptop:text-xl">
                - Motion Graphics and Animation:{" "}
              </strong>{" "}
              Enhance campaigns with dynamic animations and motion graphics that
              bring your message to life.
            </li>
            <li>
              <strong className="text-md md:text-lg laptop:text-xl">
                - Platform-Specific Ad Design:{" "}
              </strong>{" "}
              Customize designs for platforms like Google Ads, Facebook,
              Instagram, and LinkedIn to optimize performance and ROI.
            </li>
          </ul>
        </div>
      </section>

      <section className="why-choose-us-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
        <h2 className="text-2xl  font-bold text-[#EEBA2B] mb-6 text-center md:text-left">
          Why Choose Creativa Poeta for Your Advertising Design Needs?
        </h2>

        <div className="flex flex-col md:flex-row w-full items-center">
          <div className="w-full laptop:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img
              src="/whyadv.jpg"
              alt="Creative workspace"
              className="w-[90%] h-[90%] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="w-full laptop:w-1/2 flex flex-col justify-center text-md md:text-lg laptop:text-xl space-y-6 md:p-8">
            <blockquote className="italic text-md md:text-lg laptop:text-xl bg-opacity-10 bg-gray-100 p-4 rounded-md border-l-4 border-[#EEBA2B] shadow">
              "Our advertising design team combines creativity with strategic
              insights to create campaigns that not only look great but drive
              results. With a focus on brand consistency, target audience
              alignment, and visual impact, we deliver ads that capture
              attention and inspire action."{" "}
            </blockquote>
            <ul className="space-y-6 pl-4 list-disc text-base text-md md:text-lg laptop:text-xl">
              <li>Custom designs tailored to your brand and goals</li>
              <li>Cross-platform expertise in digital, print, and video ads</li>
              <li>
                In-depth understanding of advertising trends and audience
                behavior
              </li>
              <li>Collaborative approach with multiple rounds of revisions</li>
              <li>Experience working across various industries and sectors</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="who-is-this-service-for-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
        <h2 className="text-2xl font-bold text-[#EEBA2B] text-center mb-8">
          Who Can Benefit from Our Advertising Design Services?{" "}
        </h2>

        <p className="text-md md:text-lg laptop:text-xl text-center mb-8">
          Our Advertising Design Service is tailored to create visually
          compelling and effective advertisements that drive results. Whether
          you’re looking to strengthen your market presence, launch a product,
          or promote a cause, our team of design experts is here to help.
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-4 gap-8 text-black">
          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <IoBusinessOutline className="w-24 h-24 mb-4 text-black" />
            <h3 className="text-xl font-semibold mb-2">
              Businesses and Brands{" "}
            </h3>
            <p className="md:w-[70%]">
              Wanting to enhance their market presence through professional
              advertising.{" "}
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/content.webp"
              alt="Content Creators Icon"
              className="w-36 h-24 mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold mb-2">
              Startups and Entrepreneurs{" "}
            </h3>
            <p className="  md:w-[70%]">
              Aiming to launch products or services with memorable ad campaigns.{" "}
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/non.jpg"
              alt="Nonprofits Icon"
              className="w-40 h-36 mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold mb-2">
              Nonprofits and Community Organizations{" "}
            </h3>
            <p className="md:w-[70%]">
              Seeking to raise awareness and support for their cause.{" "}
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/influencer.avif"
              alt="Educators Icon"
              className="w-36 h-36 mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold mb-2">
              Retailers and E-commerce Brands{" "}
            </h3>
            <p className="md:w-[70%]">
              Needing creative ads to boost sales and promote special offers.{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="design-process-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg text-white shadow-lg relative z-10 bg-gradient-to-br from-gray-800 to-black">
        <h2 className="text-2xl font-bold text-center mb-12 text-[#EEBA2B]">
          Our Video Creation & Montage Process
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
                <h3 className="text-xl font-semibold mb-2 text-[#EEBA2B]">
                  1. Initial Consultation
                </h3>
                <p className="text-white">
                  {" "}
                  We discuss your goals, target audience, and the message you
                  want to convey.
                </p>
              </div>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 2 - Right */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
            <img
              src="/script.jpg"
              alt="Scriptwriting Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2 text-[#EEBA2B]">
                2. Concept Development
              </h3>
              <p className="text-white">
                Our team brainstorms and develops ad concepts that align with
                your brand.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 3 - Left */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
            <img
              src="/ad33.jpg"
              alt="Production Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2 text-[#EEBA2B]">
                3. Design and Creation{" "}
              </h3>
              <p className="text-white">
                Visual design, video production, or motion graphics tailored to
                your campaign.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 4 - Right */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
            <img
              src="/editvid.jpg"
              alt="Editing Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2 text-[#EEBA2B]">
                4. Feedback and Revisions{" "}
              </h3>
              <p className="text-white">
                We refine the design based on your feedback to ensure your
                satisfaction.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 5 - Left */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
            <img
              src="/delive.avif"
              alt="Delivery Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg bg-white mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2 text-[#EEBA2B]">
                5. Final Delivery
              </h3>
              <p className="text-white">
                We deliver ready-to-publish files optimized for the platforms of
                your choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 text-center  text-white z-10">
        <h2 className="text-2xl font-bold text-[#EEBA2B] mb-8">
          Our Portfolio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/proeject1.jpg"
              alt="Portfolio Item"
              className="w-[100%] h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Project 1
              </h3>
              <p className="text-white text-sm">For Tech Startup</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/project2.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Project 2
              </h3>
              <p className="text-gray-300 text-sm">For a Company</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/project3.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Project 3
              </h3>
              <p className="text-gray-300 text-sm">For a Business</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/project4.webp"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Project 4
              </h3>
              <p className="text-gray-300 text-sm">For A business</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/project5.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">Prject 5</h3>
              <p className="text-gray-300 text-sm">For business advertising</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src="/project6.jpg"
              alt="Portfolio Item"
              className="w-full h-full transform group-hover:scale-105 transition duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-lg font-semibold text-[#EEBA2B]">
                Project 6
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
        <h2 className="text-2xl font-semibold mb-4">
          Ready to Make Your Brand Stand Out?
        </h2>
        <p className="text-lg mb-8 px-6 max-w-2xl mx-auto">
          Ready to captivate your audience with powerful advertising? Get in
          touch with us to launch a campaign that drives results!
        </p>

        <Link to="/start-project">
          <button className="main-cta-btn bg-[#EEBA2B] text-black font-bold py-4 px-8 rounded-lg text-md md:text-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            Start Your Ad Campaign Today!{" "}
          </button>
        </Link>
      </section>

      <section className="visual-elements w-full  md:w-[95%] rounded-md mb-4 bg-white py-16 px-4 text-gray-800 flex flex-col items-center z-10">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-[#1e1e2f] mb-12">
          Our Advertising Design Expertise
        </h2>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          {/* Skill Icon with Description */}
          <div className="skill-item text-center">
            <img
              src="/logodesign.png"
              alt="Logo Design"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">Design</h3>
            {/* Description of design involved in advertising design */}
            <p>
              Unique and creative designs that capture attention and inspire
              action.
            </p>
          </div>

          <div className="skill-item text-center">
            <img
              src="/businessCarddesign.png"
              alt="Business Card Design"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-md font-bold text-[#EEBA2B] mb-2">Business</h3>
            <p>
              {" "}
              Strategic campaigns that align with your brand and target
              audience.
            </p>
          </div>

          <div className="skill-item text-center">
            <img
              src="/posterdesign.jpg"
              alt="Poster Design"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#EEBA2B] mb-2">Wall ads</h3>
            <p>
              {" "}
              Motion graphics and animations that enhance the impact of your
              ads.
            </p>
          </div>

          <div className="col-span-full">
            <h3 className="text-2xl font-semibold text-[#1e1e2f] mb-6 text-center">
              Our Projects
            </h3>
            <div className="carousel flex overflow-x-scroll space-x-4">
              <img
                src="/project6.jpg"
                alt="Project 1"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/project5.jpg"
                alt="Project 2"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/project4.webp"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/project3.jpg"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/project2.jpg"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/proeject1.jpg"
                alt="Project 3"
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
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
              href="/services/graphic-design"
              className="text-[#EEBA2B] hover:underline">
              Graphic Design
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiditalMarketing;
