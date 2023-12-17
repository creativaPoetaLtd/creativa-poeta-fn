import CommencerProject from "../components/CommencerProject"
import NavBar from "../components/NavBars/NavBar"
import Footer from "../components/sections/Footer"
import MainFooter from "../components/sections/MainFooter"

const CommencerProjectPage = () => {
    return (
        <>
            <div className="App w-full flex flex-col snap-x scroll-smooth">
                <div className="w-full ml-6 right-2 left flex justify-end">
                    <NavBar />
                </div>
                <CommencerProject />
                <div className="w-full flex flex-col scroll-smooth snap-x">
                    <Footer />
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export default CommencerProjectPage