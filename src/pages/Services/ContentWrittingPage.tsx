
import ContentWritting from "../../components/Services/Content";
import NavBar from "../../components/NavBars/NavBar";
import Footer from "../../components/sections/Footer";
import MainFooter from "../../components/sections/MainFooter";
import FixedContactActions from "../../components/buttons/FixedContactActions";

const ContentWrittingPage = () => {
    return (
        <div className="App w-full flex flex-col snap-x scroll-smooth">
            <div className="w-full ml-6 right-2 left flex justify-end">
                <NavBar />
            </div>
            <FixedContactActions />
            <ContentWritting />
            <div className="w-full flex flex-col scroll-smooth snap-x">
                <Footer />
                <MainFooter />
            </div>
        </div>
    )
}

export default ContentWrittingPage;
