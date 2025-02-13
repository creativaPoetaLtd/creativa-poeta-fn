import BlogGrid from "../components/Blogs";
import NavBar from "../components/NavBars/NavBar";
import Footer from "../components/sections/Footer";
import MainFooter from "../components/sections/MainFooter";
import { Link } from "react-router-dom";
import logo from "../assets/flags/logopoeta1.png"; 
import image8 from "../assets/flags/image8.jpg";
import image2 from "../assets/flags/image2.jpg";
import { useEffect, useState } from "react";
const BlogsPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
  const backgrounds = [
    { image: image8 },
    { image: image2 },
  ];
  
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX) return;
    const touchEndX = e.touches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const sensitivity = 50;
  
    if (deltaX > sensitivity) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + backgrounds.length) % backgrounds.length);
      setTouchStartX(null);
    } else if (deltaX < -sensitivity) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
      setTouchStartX(null);
    }
  };
  
  const handleTouchEnd = () => setTouchStartX(null);
  
  const currentBackground = backgrounds[currentIndex];
  
    return (
        <div className="w-full flex flex-col bg-[#0F072A]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          backgroundImage: currentBackground.image
            ? `url(${currentBackground.image})`
            : "none",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          transition: "background 0.9s ease-in-out",
          animation: "slideAnimation 0.9s ease-in-out",
          animationName: "slideAnimation",
        }}
        >
            <div className="w-full">
                   
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
            <BlogGrid />
            <div className="w-full flex flex-col">
                <Footer />
                <MainFooter />
            </div>
        </div>
    )
}

export default BlogsPage;