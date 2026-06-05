
import ContentWritting from "../../components/Services/Content";
import NavBar from "../../components/NavBars/NavBar";
import Footer from "../../components/sections/Footer";
import MainFooter from "../../components/sections/MainFooter";
import MarketSEOHead from "../../components/SEO/MarketSEOHead";
import { seoConfig } from "../../components/SEO/seoConfig";
const ContentPage = () => {
    return (
        <div className="App w-full flex flex-col snap-x scroll-smooth">
            <MarketSEOHead
                {...seoConfig.services.contentWriting}
                path="/services/content-writing"
            />
            <div className="w-full ml-6 right-2 left flex justify-end">
                <NavBar />
            </div>
            <ContentWritting/>
            <div className="w-full flex flex-col scroll-smooth snap-x">
                <Footer />
                <MainFooter />
            </div>
        </div>
    )
}

export default ContentPage;
