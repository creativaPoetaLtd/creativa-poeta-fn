import { useEffect } from "react";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { seoConfig } from "../components/SEO/seoConfig";
import ProjectForm from "./ProjectForm";

const ProjectFormPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="App h-[100dvh] w-full overflow-hidden">
            <MarketSEOHead {...seoConfig.startProject} path="/start-project" />
            <ProjectForm />
        </div>
    )
}


export default ProjectFormPage;
