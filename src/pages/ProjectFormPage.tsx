import { useEffect } from "react";
import NavBar from "../components/NavBars/NavBar"
import Footer from "../components/sections/Footer";
import MainFooter from "../components/sections/MainFooter";
import ProjectForm from "./ProjectForm";

const ProjectFormPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="App w-full flex flex-col snap-x scroll-smooth">
            <div className="w-full ml-6 right-2 left flex justify-end">
                <NavBar />
            </div>
            <ProjectForm />

            <div className="w-full flex flex-col scroll-smooth snap-x">

                <Footer />
                <MainFooter />
            </div>
        </div>
    )
}


export default ProjectFormPage;