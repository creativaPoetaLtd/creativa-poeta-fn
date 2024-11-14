import phonevid from "../../assets/phonevid.mp4";
import { Link } from "react-router-dom";
import logo from "../../assets/flags/logopoeta1.png";
// import ContentLocale from "../../i18n/Services/ContentWriting";
// import getLangFromLocalStorage from "../../../utils/Lang";
import web from "../../assets/web.png";
// const lang = getLangFromLocalStorage();

const Website = () => {
  return (
    <div className="relative min-h-screen bg-white flex justify-center items-center">
      <div className="absolute inset-0 overflow-hidden z-0">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={phonevid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <section className="relative w-[90%] max-w-screen-lg mx-auto py-16 px-8 md:px-24 flex flex-col md:flex-row items-center justify-between z-10">
        <Link to="/">
          <div className="logo laptop:top-0 desktop:top-0 tablet:top-3 md:top-3 top-5  text-white laptop:text-4xl desktop:text-4xl text-xl  phone:left-8 tablet:left-8 desktop:left-8 md:left-8 laptop:left-8 left-4 laptop:ml-11 desktop:ml-11 ml-0 absolute laptop:p-1 desktop:p-1">
            <img
              src={logo}
              alt="logo"
              className="laptop:w-[85%] desktop:w-[85%] laptop:h-[95%] desktop:h-[95%] h-[100%] w-[50%]"
            />
          </div>
        </Link>
        <div className="md:w-2/3 space-y-6 text-white">
          <div className="flex items-center mb-4">
          <img src={web} alt="" className="w-[8rem] h-[8rem]" />
          <h1 className="text-4xl ml-4 font-bold">
              Website Creation & Digital Support
              <br />
              <span className="text-blue-600">
                {" "}
                Empowering You to Navigate the Digital World with Confidence
              </span>
            </h1>
          </div>

          <p className="text-2xl leading-relaxed w-3/4">
            Our website creation service is more than just building a site—it’s
            about empowering you to embrace technology with ease. From online
            shopping and handling administrative tasks to exploring social
            media, we’re here to guide you every step of the way with our free
            support. Our experienced team offers personalized assistance,
            ensuring you feel secure and capable as you navigate the digital
            landscape. Unlock the potential of the online world and simplify
            your digital life with our dedicated support, tailored to meet your
            needs—at no cost to you.
          </p>
        </div>

        <div className="md:w-1/3 mt-8 md:mt-0">
          <img
            src="/serv.png"
            alt="Web Marketing Strategy"
            className="w-full h-auto object-cover shadow-lg rounded-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Website;
