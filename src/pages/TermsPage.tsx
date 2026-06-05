import { useEffect } from "react";
import NavBar from "../components/NavBars/NavBar"
import Footer from "../components/sections/Footer";
import MainFooter from "../components/sections/MainFooter";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import Term from "../components/Terms";

const TermsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="App w-full flex flex-col snap-x scroll-smooth">
            <MarketSEOHead
                title="Terms and conditions | Creativa Poeta"
                description="Read the terms and conditions for using Creativa Poeta services and website."
                keywords="Creativa Poeta terms, terms and conditions, service terms"
                path="/terms-and-conditions"
            />
            <div className="w-full ml-6 right-2 left flex justify-end">
                <NavBar />
                <Term />
            </div>

            <div className="w-full flex flex-col scroll-smooth snap-x">

                <Footer />
                <MainFooter />
            </div>
        </div>
    )
}


export default TermsPage;
