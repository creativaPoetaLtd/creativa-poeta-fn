import NavBar from "../components/NavBars/NavBar";
import Footer from "../components/sections/Footer";
import MainFooter from "../components/sections/MainFooter";
import { Link } from "react-router-dom";
import logo from "../assets/flags/logopoeta1.png"; 
import BlogPost from "../components/SingleBlog";
const SingleBlogPage = () => {
    return (
        <div className="w-full flex flex-col bg-[#0F072A]">
            <div className="w-full mb-24">
                   
         <Link to="/">
          <div className="logo laptop:top-0 desktop:top-0 tablet:top-3 md:top-3 top-5  text-white laptop:text-4xl desktop:text-4xl text-xl  phone:left-8 tablet:left-8 desktop:left-8 md:left-8 laptop:left-8 left-4 laptop:ml-11 desktop:ml-11 ml-0 absolute laptop:p-1 desktop:p-1">
            <img
              src={logo}
              alt="logo"
              className="laptop:w-[85%] desktop:w-[85%] laptop:h-[95%] desktop:h-[95%] h-[100%] w-[50%]"
            />
          </div>
        </Link>
                <NavBar />
            </div>
            <BlogPost />
            <div className="w-full flex flex-col">
                <Footer />
                <MainFooter />
            </div>
        </div>
    )
}

export default SingleBlogPage;