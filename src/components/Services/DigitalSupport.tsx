import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
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

const testimonials = [
  {
    quote:
      "Their proactive monitoring and quick resolution of technical issues have been a game changer for our business. We now have peace of mind knowing everything runs smoothly 24/7.",
    client: "Olivia Martin",
    role: "Operations Manager, Global Logistics Inc.",
    image: "/avatar2.webp",
  },
  {
    quote:
      "Thanks to their regular system updates and seamless integrations, our workflows are now more efficient and secure than ever. I highly recommend their services!",
    client: "Noah Thompson",
    role: "IT Administrator, Horizon Health Group",
    image: "/avatar2.webp",
  },
  {
    quote:
      "Their backup and recovery solutions saved us from a major data loss incident. Their professionalism and quick action were truly impressive!",
    client: "Ava Brown",
    role: "Finance Director, Nexus Financial",
    image: "/avatar2.webp",
  },
  {
    quote:
      "The digital support team’s expertise ensured our e-commerce platform stayed operational during peak sales periods. We couldn't have asked for better support.",
    client: "William Johnson",
    role: "Founder, Artisan Trends",
    image: "/avatar2.webp",
  },
  {
    quote:
      "Their IT consulting services helped us revamp our digital strategy, reducing costs and improving system performance across the board. Exceptional team to work with!",
    client: "Mia Wilson",
    role: "CEO, Pinnacle Technologies",
    image: "/avatar2.webp",
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

const faqs = [
  {
    question: "What is included in your digital support services?",
    answer:
      "Our services cover IT consulting, 24/7 monitoring, system maintenance, data backup and recovery, software updates, troubleshooting, and more.",
  },
  {
    question: "Do you offer remote support?",
    answer:
      "Yes, we provide comprehensive remote support to quickly resolve technical issues, no matter where your team is located.",
  },
  {
    question: "How does 24/7 monitoring work?",
    answer:
      "We use advanced tools to continuously monitor your systems, detect potential issues, and address them before they impact your operations.",
  },
  {
    question: "Can you help with cybersecurity measures?",
    answer:
      "Absolutely. We implement robust security protocols, including firewalls, antivirus solutions, and regular vulnerability assessments to protect your systems.",
  },
  {
    question: "Do you support cloud-based solutions?",
    answer:
      "Yes, we assist with cloud migration, management, and integration to optimize your workflows and improve accessibility.",
  },
  {
    question:
      "What kind of businesses can benefit from digital support services?",
    answer:
      "Our services are ideal for small to large businesses across industries like retail, healthcare, finance, tech, education, and more.",
  },
  {
    question: "How often will you update my systems and software?",
    answer:
      "We perform updates based on your needs and industry best practices, ensuring your systems remain secure and up-to-date.",
  },
  {
    question: "Can you assist with data recovery in case of a system failure?",
    answer:
      "Yes, we provide reliable backup and recovery solutions to ensure your data is safe and can be quickly restored if needed.",
  },
  {
    question: "What if I have an in-house IT team? Can you still help?",
    answer:
      "Absolutely. We can complement your in-house IT team by providing additional expertise, tools, or handling specific tasks like monitoring and backups.",
  },
  {
    question: "How do I get started with your digital support services?",
    answer:
      "Contact us to discuss your business needs. We’ll create a customized support plan to help you achieve optimal system performance and security.",
  },
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
          <div key={index} className="border-b border-gray-100 pb-4">
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

      <section className="min-h-fit w-[95%] mt-16 md:mt-auto m-auto h-screen py-16 md:px-2 flex flex-col md:flex-row items-center justify-between z-10">
        <div className="w-full laptop:w-1/2 space-y-6 text-white flex flex-col items-center md:items-start md:justify-between px-4 md:px-8 py-5">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold text-start md:text-left">
              Digital Support <br />
              <span className="text-[#EEBA2B] text-2xl">
                Reliable, round-the-clock support to ensure your digital tools
                and platforms run smoothly.
              </span>
            </h1>
          </div>
          <p className="text-xl leading-relaxed text-start md:text-left">
            In today’s fast-paced digital world, downtime is not an option. Our
            Digital Support Services are designed to help businesses maintain
            seamless operations across their websites, apps, and other digital
            platforms. From troubleshooting and updates to comprehensive IT
            support, we ensure your digital presence is always performing at its
            best.
          </p>
          <Link to="/start-project">
            <button className="bg-[#EEBA2B] p-4 rounded-lg border-[#EEBA2B] text-[1.2rem] hover:bg-yellow-400 text-black hover:border hover:border-[#EEBA2B] hover:text-black mt-4">
              Get Support Today
            </button>
          </Link>
        </div>

        <div className="hidden items-center justify-center laptop:flex w-full laptop:w-1/2 mt-8 md:mt-0">
          <img
            src="/digitsupport.png"
            alt="Digital Support Services"
            className="object-cover rounded-lg w-[80%] h-auto"
          />
        </div>
      </section>

      <section className="digital-support-section relative w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-6 gap-24 text-white rounded-lg mb-12 flex flex-col md:flex-row z-10">
        <div className="visual-container hidden laptop:flex md:w-1/2 h-full">
          <img
            src="/digitskills.png"
            alt="Digital Support Skills"
            className="w-[95%] h-[95%] rounded-md"
          />
        </div>
        <div className="content-container w-full md:w-full laptop:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#EEBA2B] mb-6">
            Our Digital Support Expertise
          </h2>
          <ul className="space-y-4 text-lg p-4 h-full flex flex-col justify-between">
            <li>
              <strong className="text-2xl">
                - 24/7 Monitoring and Maintenance:{" "}
              </strong>{" "}
              Ensure your digital platforms run smoothly with round-the-clock
              monitoring and proactive issue resolution.
            </li>
            <li>
              <strong className="text-2xl">
                - Troubleshooting and Bug Fixing:{" "}
              </strong>{" "}
              Quickly identify and resolve technical issues to minimize downtime
              and enhance user experience.
            </li>
            <li>
              <strong className="text-2xl">
                - System Updates and Upgrades:{" "}
              </strong>{" "}
              Keep your systems up-to-date with the latest technology, security
              patches, and performance enhancements.
            </li>
            <li>
              <strong className="text-2xl">- Data Backup and Recovery: </strong>{" "}
              Protect your data with regular backups and reliable recovery
              solutions in case of unexpected incidents.
            </li>
            <li>
              <strong className="text-2xl">- Integration Support: </strong>{" "}
              Seamlessly integrate third-party tools and platforms to enhance
              your digital infrastructure.
            </li>
          </ul>
        </div>
      </section>

      <section className="why-choose-us-section text-white w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg flex flex-col z-10 bg-gradient-to-br from-gray-800 to-black shadow-lg">
        <h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8">
          Why Choose Our Digital Support Services?
        </h2>

        <p className="text-lg text-center mb-8">
          Our Digital Support Services are designed to provide reliable
          solutions, ensuring your systems remain efficient, secure, and
          up-to-date. Here's what makes us the ideal partner for your digital
          needs:
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 laptop:grid-cols-3 gap-8 text-black">
          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/expert.png"
              alt="Expert Support Icon"
              className="w-24 h-24 mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold mb-2">
              Expert Technical Support
            </h3>
            <p className="md:w-[70%]">
              Benefit from a team of professionals ready to resolve issues and
              provide guidance at every step.
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/monitoring.jpg"
              alt="Proactive Monitoring Icon"
              className="w-24 h-24 mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold mb-2">Proactive Monitoring</h3>
            <p className="md:w-[70%]">
              Stay ahead with real-time monitoring and quick responses to ensure
              minimal disruptions.
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/digiserv.png"
              alt="Custom Solutions Icon"
              className="w-24 h-24 mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold mb-2">Custom Solutions</h3>
            <p className="md:w-[70%]">
              Get tailored services that align perfectly with your business
              objectives and operational needs.
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/security.jpg"
              alt="Secure Data Icon"
              className="w-24 h-24 mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold mb-2">
              Data Security & Backup
            </h3>
            <p className="md:w-[70%]">
              Ensure your data is safe with robust backup and recovery systems
              to protect against losses.
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/digicost.png"
              alt="Cost Efficiency Icon"
              className="w-24 h-24 mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold mb-2">Cost Efficiency</h3>
            <p className="md:w-[70%]">
              Optimize costs with scalable support plans that fit your budget
              and business growth.
            </p>
          </div>

          <div className="shadow-lg rounded-md bg-white p-6 flex flex-col items-center text-center">
            <img
              src="/round.png"
              alt="Round-the-Clock Icon"
              className="w-24 h-24 mb-4 rounded-full"
            />
            <h3 className="text-xl font-semibold mb-2">
              Round-the-Clock Service
            </h3>
            <p className="md:w-[70%]">
              Enjoy 24/7 support to keep your systems running smoothly, no
              matter the time.
            </p>
          </div>
        </div>
      </section>

      <section className="support-process-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg text-white shadow-lg relative z-10 bg-gradient-to-br from-gray-800 to-black">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#EEBA2B]">
          Our Digital Support Process
        </h2>

        <div className="relative flex flex-col laptop:flex-row items-center space-y-16">
          {/* Step 1 - Left */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
            <div className="lg:order-2 order-1">
              <img
                src="/consultancy.png"
                alt="Assessment Icon"
                className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
              />
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                  1. Assessment and Strategy
                </h3>
                <p className="text-white">
                  We analyze your current digital landscape, identify gaps, and
                  develop a customized support strategy.
                </p>
              </div>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 2 - Right */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
            <img
              src="/implementation.png"
              alt="Implementation Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                2. Implementation and Setup
              </h3>
              <p className="text-white">
                From setting up systems to integrating tools, we handle every
                technical aspect of your digital presence.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 3 - Left */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
            <img
              src="/maintainance.png"
              alt="Maintenance Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                3. Monitoring and Support
              </h3>
              <p className="text-white">
                We monitor your systems 24/7, ensuring smooth operations and
                addressing issues as they arise.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 4 - Right */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row-reverse flex-col lg:items-center">
            <img
              src="/optimization.png"
              alt="Optimization Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                4. Optimization and Updates
              </h3>
              <p className="text-white">
                Regularly optimizing your tools, software, and strategies to
                stay ahead in a rapidly changing digital environment.
              </p>
            </div>
          </div>
          {/* Connector Line */}
          <div className="laptop:w-72 laptop:h-1 w-1 h-16 bg-[#EEBA2B]"></div>

          {/* Step 5 - Left */}
          <div className="flex items-start space-x-6 lg:space-x-12 lg:flex-row flex-col lg:items-center">
            <img
              src="/growth.png"
              alt="Scaling Icon"
              className="w-36 h-36 mx-auto lg:mx-0 rounded-full shadow-lg bg-white mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-[#EEBA2B]">
                5. Scaling and Growth
              </h3>
              <p className="text-white">
                Supporting your business as it grows, implementing scalable
                solutions to meet your expanding digital needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="types-of-digital-support-section w-full md:w-[95%] max-w-screen-lg mx-auto mt-12 p-8 rounded-lg bg-gray-900 text-white shadow-lg z-10">
        <h2 className="text-4xl font-bold text-[#EEBA2B] text-center mb-8">
          Types of Digital Support Services We Offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
            <img src="/round.png" alt="24/7 Monitoring" className="w-16 h-16" />
            <div>
              <h3 className="text-2xl font-semibold text-[#EEBA2B]">
                24/7 Monitoring & Maintenance
              </h3>
              <p className="text-base">
                Ensure your digital platforms run smoothly around the clock with
                our proactive monitoring and maintenance services.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
            <img
              src="/troubleshoot.webp"
              alt="Troubleshooting"
              className="w-16 h-16"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#EEBA2B]">
                Troubleshooting & Bug Fixing
              </h3>
              <p className="text-base">
                Quickly identify and resolve technical issues to minimize
                downtime and enhance user experience.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
            <img src="/update.png" alt="System Updates" className="w-16 h-16" />
            <div>
              <h3 className="text-2xl font-semibold text-[#EEBA2B]">
                System Updates & Upgrades
              </h3>
              <p className="text-base">
                Keep your systems current with the latest technology, security
                patches, and performance enhancements.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
            <img src="/recovery.jpg" alt="Data Backup" className="w-16 h-16" />
            <div>
              <h3 className="text-2xl font-semibold text-[#EEBA2B]">
                Data Backup & Recovery
              </h3>
              <p className="text-base">
                Protect your valuable data with regular backups and reliable
                recovery solutions to safeguard against unexpected losses.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
            <img
              src="/support.jpg"
              alt="Integration Support"
              className="w-16 h-16"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#EEBA2B]">
                Integration Support
              </h3>
              <p className="text-base">
                Seamlessly integrate third-party tools and platforms to enhance
                your digital infrastructure and operational efficiency.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow hover:shadow-lg transform transition-transform hover:scale-105">
            <img
              src="/consulting.webp"
              alt="IT Consulting"
              className="w-16 h-16"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#EEBA2B]">
                IT Consulting
              </h3>
              <p className="text-base">
                Receive expert advice and strategic planning to optimize your IT
                infrastructure and align it with your business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSlider />
      <FAQSection />
      <section className="contact-section w-full md:w-[95%] py-16 px-6 text-white text-center flex flex-col items-center z-10">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to optimize your business with expert digital support?
        </h2>
        <p className="text-lg mb-8 px-6 max-w-2xl mx-auto">
          Contact us to discuss your digital support needs and learn how we can
          enhance your operations, security, and efficiency.
        </p>

        <Link to="/start-project">
          <button className="main-cta-btn bg-[#EEBA2B] text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            Get Digital Support Now
          </button>
        </Link>
      </section>

      <section className="visual-elements w-full  md:w-[95%] rounded-md mb-4 py-16 px-4 text-gray-800 flex flex-col items-center z-10">
        <div className="social-sharing flex space-x-4 mt-8">
          <button className="text-white hover:text-[#EEBA2B]">
            <FaFacebook className="text-2xl" />
          </button>
          <button className="text-white hover:text-[#EEBA2B]">
            <FaInstagram className="text-2xl" />
          </button>
          <button className="text-white hover:text-[#EEBA2B]">
            <FaLinkedinIn className="text-2xl" />
          </button>
          <button className="text-white hover:text-[#EEBA2B]">
            <FaTwitter className="text-2xl" />
          </button>
          <button className="text-white hover:text-[#EEBA2B]">
            <FaGithub className="text-2xl" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default DiditalMarketing;
