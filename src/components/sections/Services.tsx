import blogData from "../../data/blog";
import ServiceLocale from "../../i18n/ServiceLocale";
import getLangFromLocalStorage from "../../../utils/Lang";
import { Link } from "react-router-dom";
import SectionScrollButton from "../buttons/SectionScrollButton";
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from "../../data/marketRuntime";

const lang: any = getLangFromLocalStorage();

const Services = () => {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const servicePath = (path: string) => buildLocalLocalePath(market, locale, path);

  return (
    <section
      id="services"
      className="mainn h-fit min-h-screen flex flex-col items-center bg-slate-800 relative"
    >
      {/* Title Section */}
      <div className="w-full backdrop-blur-lg bg-gradient-to-r from-white to-transparent flex flex-col items-center py-3">
        <h1 className="text-2xl tablet:text-3xl laptop:text-4xl font-bold text-center text-[#EEBA2B]">
          <b className="text-black">{ServiceLocale[lang].title1}</b>
          <br />
          {ServiceLocale[lang].title2}
        </h1>
      </div>

      {/* Blogs Section */}
      <div className="w-full grid laptop:grid-cols-2 desktop:grid-cols-2 tablet:grid-cols-1 grid-cols-1 gap-10 laptop:gap-20 desktop:gap-20 tablet:gap-12 p-4 laptop:p-28 desktop:p-28 tablet:p-8">
        {blogData.map((blog) => (
          <Link
            to={
              blog.id === 1
                ? servicePath("/services/audit-visibilite")
                : blog.id === 2
                ? servicePath("/services/content-writing")
                : blog.id === 3
                ? servicePath("/services/graphic-design")
                : blog.id === 4
                ? servicePath("/services/digital-marketing")
                : "#"
            }
            key={blog.id}
          >
            <div className="flex flex-col laptop:w-full desktop:w-full tablet:w-4/5 w-[98%] mx-auto h-fit">
              <div className="flex items-center h-[6rem]">
                {/* Blog Icon */}
                <div className="w-[20%] flex justify-center items-center">
                  <img
                    src={blog.image}
                    alt=""
                    height={100}
                    width={100}
                    className="object-contain"
                  />
                </div>
                {/* Blog Details */}
                <div className="flex flex-col w-fit p-3 h-[7rem] space-y-2">
                  <div className="flex flex-col text-xl laptop:text-3xl text-white">
                    <p>{blog.h1}</p>
                    <p className="font-bold text-[#def0f2]">{blog.h2}</p>
                  </div>
                  <div className="w-full bg-yellow-400 h-[0.5rem]"></div>
                </div>
              </div>
              {/* Blog Description */}
              <div className="w-full mt-2 p-1">
                <p className="text-sm laptop:text-xl text-white pl-[22%]">
                  {blog.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <SectionScrollButton
        targetId="audit-visibilite"
        side="left"
        tone="light"
        topColor="#EEBA2B"
        bottomColor="#071a33"
      />
    </section>
  );
};

export default Services;
