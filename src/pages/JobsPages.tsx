
import NavBar from "../components/NavBars/NavBar";
import Footer from "../components/sections/Footer";
import MainFooter from "../components/sections/MainFooter";
import JobPage from "../components/JobPage";
import { Link } from "react-router-dom";
import logo from "../assets/flags/logopoeta1.png";
import { localizePath } from "../data/marketRuntime";

const JobsPages = () => {
    return (
        <div className="App w-full flex flex-col snap-x scroll-smooth bg-[#151B27]">
            <div className="w-full ml-6 right-2 left flex justify-end">
            <Link to={localizePath("/")}>
                <div className="absolute top-5 left-4 text-white">
                    <img src={logo} alt="logo" className="h-[50px]" />
                </div>
            </Link>
                <NavBar />
            </div>
            <JobPage />
            <div className="w-full flex flex-col scroll-smooth snap-x">
                <Footer />
                <MainFooter />
            </div>
        </div>
    )
}

export default JobsPages;
