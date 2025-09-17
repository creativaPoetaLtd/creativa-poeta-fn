import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import Popup from "../unUsedComponents/MailConfirm";
import { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import contactLocale from "../../i18n/contactLocale"; // ✅ import your translations

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ get selected language (same logic as in your other pages)
  const lang =
    typeof window !== "undefined"
      ? window.localStorage.getItem("selectedLang") || "en"
      : "en";

  const t = contactLocale[lang] ?? contactLocale["en"]; 

  const handleEmailChange = (e: { target: { value: string } }) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: { target: { value: string } }) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e: { target: { value: string } }) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !name || !message) {
      toast.error(t.validation, { theme: "colored" });
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t.email, { theme: "colored" });
      setIsLoading(false);
      return;
    }

    try {
      const serviceID = "service_l3behim";
      const templateID = "template_udaqscj";
      const publicKey = "IyTvafQS4Xo3-QeKc";

      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setEmail("");
      setName("");
      setMessage("");
      toast.success(t.success, { theme: "colored" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error(t.sendErrror, { theme: "colored" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <section
        id="contact"
        className="contact w-full  justify-center h-fit min-h-screen mt-0 text-white flex flex-col  relative"
      >
        <div className="items-center flex justify-center">
          <div className="w-full flex flex-col laptop:space-y-8 desktop:space-y-8  basis basis-full space-y-0 laptop:px-[12%] desktop:px-[12%] px-1">
            <div className="contuctus-text flex-center flex justify-center text-center p-6">
              <h1 className="laptop:text-4xl desktop:text-4xl text-lg font-bold">
                {t.title}
              </h1>
            </div>
            <div className="contuctus-text flex-center flex justify-center text-center">
              <p className="laptop:text-2xl desktop:test-2xl texr-xl font-bold">
                {t.intro}
              </p>
            </div>
            <div className="flex flex-col laptop:flex-row desktop:flex-row laptop:mt-0 desktop:0 mt-2 backdrop-blur-sm">
              <div className="flex flex-col laptop:basis-3/4 desktop:basis-3/4 basis-full  h-full">
                <div className="sendMessage py-9 px-6 ">
                  <h1 className="text-2xl font-bold text-white">
                    {t.form}
                  </h1>
                </div>
                <div className="forms py-9 px-6">
                  <form className="contact-form form" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <label className="bg-gre text-md text-gray-500">
                        {t.fullName}
                      </label>
                      <input
                        className="border-b-2 border-b-gray-700 bg-inherit outline-none text-[#EEBA2B]  hover:border-white py-2"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                      />
                      <label className="text-md text-gray-500">
                        {t.emailAddress}
                      </label>
                      <input
                        className=" bg-inherit border-b-2 border-b-gray-700 outline-none text-[#EEBA2B] hover:border-white  py-2"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <label className="bg-gre text-md text-gray-500">
                        {t.message}
                      </label>
                      <textarea
                        className="outline-none hover:border-white py-2 bg-inherit text-[#EEBA2B] border-b-2 border-b-gray-700 h-20"
                        value={message}
                        onChange={handleMessageChange}
                      />
                      <button className="rounded-md p-3 mt-8 bg-[#EEBA2B] border text-white font-semibold">
                        {!isLoading ? t.action : t.wait}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-col basis-1/4 backdrop-blur-2xl h-full text-gray-500">
                <div className="contactInfo py-9 px-6 flex flex-col space-y-10 text-gray-500">
                  <h1 className="text-2xl font-bold text-white ">
                    Contact Info
                  </h1>
                  <div className="contactInfoItem ">
                    <h2 className="text-xl font-bold text-[#FFFF00] ">
                      Address
                    </h2>
                    <p className="text-gray-500">123 Street, New York, USA</p>
                    <p className="text-gray-500">123 Street, New York, USA</p>
                  </div>
                  <div className="emailsInformation">
                    <h2 className="text-xl font-bold text-[#FFFF00]">Email</h2>
                    <p className="text-gray-500">test@gmail.com</p>
                    <p className="text-gray-500">capital@gmail.com</p>
                  </div>
                  <div className="callUsinfo">
                    <h2 className="text-xl font-bold text-[#FFFF00]">
                      Call Us
                    </h2>
                    <p className="text-gray-500">+1 234 56 78</p>
                  </div>
                  <div className="flex space-x-4 bottom-0 text-xl pb-4">
                    <a
                      href="https://web.facebook.com/profile.php?id=61550577241125&_rdc=1&_rdr#"
                      className="text-white"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="https://x.com/CreativaPoeta?t=-5QmeRVUl_M7lQbSOhC7JA&s=09"
                      className="text-white"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="https://www.instagram.com/creativapoeta_/"
                      className="text-white"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://www.tiktok.com/@creativapoeta?_t=ZM-8sjgBGfxZna&_r=1"
                      className="text-white"
                    >
                      <FaTiktok />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/105066709/"
                      className="text-white"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="laptop:h-[8%] tablet:h-[8%] phone:h-[5%] h-[3%] laptop:w-[10%] w-[35%] absolute laptop:right-11 right-11 top-0 border-r-2 border-[#EEBA2B]"></div>
        {showPopup && (
          <Popup
            message="Merci pour votre abonnement à creativa poeta. nous vous avons envoyé un e-mail de confirmation."
            isSuccess={true}
            onClose={handleClosePopup}
          />
        )}
      </section>
    </>
  );
};
export default Contact;
