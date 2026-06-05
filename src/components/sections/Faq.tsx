import faqData from "../../data/faq";
import phonevid from "../../assets/phonevid.mp4";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import SectionScrollButton from "../buttons/SectionScrollButton";

// About.tsx
const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index: any) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  return (
    <section
      id="faq"
      className="faq h-fit min-h-screen w-full  flex flex-col justify-center items-center text-center relative"
    >
      <video autoPlay loop muted className="video-background">
        <source src={phonevid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="mb-16 ">
        <div className="w-full p-2 text-center bg-gradient-to-r from-white to-transparent">
          <h1 className="text-xl laptop:text-2xl font-bold text-[#524913]">
            <span className="text-black">F.A.Q.</span> <br /> Frequently Asked
            Questions
          </h1>
        </div>

        <div
          className={`grid laptop:grid-cols-4 tablet:grid-cols-3 px-1 laptop:gap-8 grid-cols-2 mt-[3%] gap-3 sm:grid-cols-2`}
        >
          {faqData.map((faq, index) => (
            <div className="border px-0 h-fit" key={index}>
              <h3
                className={`font-bold backdrop-blur-md text-slate-900 2xl:h-[17rem] laptop:h-[5rem] desktop:h-[7rem] tablet:h-[7rem] h-fit xs:h-[12rem] phone:h-[9rem] m-auto px-2 text-center flex justify-center items-center border-b laptop:text-base desktop:text-base text-sm leading-tight`}
                style={{ backgroundColor: "rgba(245, 233, 66,0.4)" }}
              >
                {faq.title}
              </h3>

              <div
                className={`wi-full p-2 mt-0  ${
                  expandedIndex === index ? "bg-white" : ""
                }`}
              >
                <p className="text-md flex justify-start text-start">
                  {expandedIndex === index
                    ? faq.description || ""
                    : `${(faq.description || "").substring(0, 0)}`}
                </p>
                {(faq.description || "").length > 100 && (
                  <button
                    className={` ${
                      expandedIndex === index
                        ? "text-slate-500"
                        : "text-slate-300"
                    } font-bold text-2xl mt-2`}
                    onClick={() => handleExpand(index)}
                  >
                    {expandedIndex === index ? (
                      <AiOutlineMinus />
                    ) : (
                      <AiOutlinePlus />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionScrollButton
        targetId="footer"
        side="right"
        tone="light"
        topColor="#ffffff"
        bottomColor="#EEBA2B"
      />
    </section>
  );
};
export default Faq;
