import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaRegEnvelope, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Popup from "./MailConfirm";
import { useState } from "react";
import { toast } from "react-toastify";
import getLangFromLocalStorage from "../../../utils/Lang";
import FooterLocale from "../../i18n/FooterLocale";
import { contactUs } from "../../APIs/Contact";
import { getCurrentMarket } from "../../data/marketRuntime";

const lang:any = getLangFromLocalStorage();
const Cont = () => {
  const market = getCurrentMarket();
  const contactEmail = market.email ?? "contact@creativapoeta.com";
  const contactPhone = "+32 473 29 71 12";
  const contactPhoneHref = "tel:+32473297112";
  const contactWhatsappHref = "https://wa.me/32473297112";

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: { target: { value: string; }; }) => setEmail(e.target.value);
  const handleNameChange = (e: { target: { value: string; }; }) => setName(e.target.value);
  const handleMessageChange = (e: { target: { value: string; }; }) => setMessage(e.target.value);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    if (!email || !name || !message) {
      toast.error('Veuillez remplir tous les champs.', { theme: 'colored' });
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Veuillez saisir une adresse e-mail valide.', { theme: 'colored' });
      return;
    }
  
    setIsLoading(true);
  
    const formData = {
      fullName: name,
      email,
      message,
    };
    try {
      const response = await contactUs(formData);
      console.log('Raw API Response:', response);
    
      if (response?.message) { // Instead of response.success
        setEmail('');
        setName('');
        setMessage('');
        toast.success(response.message, { theme: 'colored' });
      } else {
        console.warn('⚠️ Unexpected response format:', response);
        throw new Error('Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.', { theme: 'colored' });
    } finally {
      setIsLoading(false);
    }
    
 
  };
  
  const handleClosePopup = () => setShowPopup(false);

    return (
      <>
        <section
          id="contact"
          className="contacnt w-full laptop:px-10 desktop:px-10 px-0 justify-center h-fit min-h-screen mt-0 text-white flex flex-col  relative"
        >
          <div className=" items-center flex justify-center">
            <div className="w-full flex flex-col  basis basis-full space-y-0">
              <div className="contuctus-text flex-center flex justify-center text-center p-2 desktop:mt-4 laptop:mt-4 tablet:mt-0 mt-4">
                <h1 className="laptop:text-2xl desktop:text-2xl text-2xl font-bold">
                  {FooterLocale[lang].contact1}
                </h1>
              </div>
              <div className="flex flex-col laptop:flex-col desktop:flex-col laptop:mt-0 desktop:0 mt-2 backdrop-blur-sm">
                <div className="flex flex-col laptop:basis-full desktop:basis-full basis-full  h-full">
                  <div className="forms py-9">
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="flex flex-col">
                        <label className="bg-gre text-md text-gray-500">
                          {FooterLocale[lang].nom}
                        </label>
                        <input
                          className="border-b-2 border-b-gray-700 bg-inherit outline-none text-[#EEBA2B]  hover:border-white py-2"
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                        />
                        <label className="  text-md  text-gray-500">
                          {FooterLocale[lang].email}
                        </label>
                        <input
                          className=" bg-inherit border-b-2 border-b-gray-700 outline-none text-[#EEBA2B] hover:border-white  py-2"
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        <label className="bg-gre  text-md  text-gray-500">
                          {FooterLocale[lang].message}
                        </label>
                        <textarea
                          className=" outline-none hover:border-white py-2 bg-inherit text-[#EEBA2B] border-b-2 border-b-gray-700 h-20"
                          value={message}
                          onChange={handleMessageChange}
                        />
                        <button className=" rounded-md p-3 mt-8 bg-[#EEBA2B] border text-white font-semibold">
                          {!isLoading
                            ? `${FooterLocale[lang].ohereza}`
                            : "attendez..."}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-col basis-full backdrop-blur-2xl h-full text-gray-500">
                  <div className="contactInfo  flex flex-col j laptop:justify-normal desktop:justify-normal  text-gray-500">
                    <div className="text-2xl mt-2  text-[#EEBA2B] flex space-x-4 ">
                      <FaRegEnvelope className="text-2xl  text-[#EEBA2B] flex my-auto justify-center text-center items-center " />
                      <h1 className="laptop:text-2xl desktop:text-xl text-xl ">
                        {contactEmail}
                      </h1>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-black uppercase text-slate-200">
                      <a href={contactPhoneHref} className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/20 px-3 py-3 text-center transition hover:border-[#fff200] hover:text-[#fff200]">
                        <FaPhoneAlt className="text-[#EEBA2B]" />
                        {contactPhone}
                      </a>
                      <a href={contactWhatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] px-3 py-3 text-center text-[#04120a] transition hover:bg-[#1fb858] hover:text-[#04120a]">
                        <FaWhatsapp />
                        WhatsApp
                      </a>
                    </div>

                    <div className="flex space-x-4  bottom-0 mt-20 text-xl pb-4">
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
                      {/* tik tock link*/}
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

          {showPopup && (
            <Popup
              message="Merci pour votre abonnement à creativa poeta. nous vous avons envoyé un e-mail de confirmation."
              isSuccess={true}
              onClose={handleClosePopup}
            />
          )}
        </section>
        {/* <Footer setShowPopUp={setShowPopup} /> */}
      </>
    );
  };
export default Cont;  


