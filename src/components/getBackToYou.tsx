import { Link } from 'react-router-dom'; 
import image8 from '../assets/flags/image8.jpg';
// import getBackToYouLocale from '../i18n/getBackToYouLocale';

const GetBackToYou = () => {
    //   const t = getBackToYouLocale[lang] || getBackToYouLocale.en;
    return (
        <div 
            className="flex justify-center items-center min-h-screen relative" 
            style={{
                backgroundImage: `url(${image8})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div> 

            <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-[90%] md:w-full text-center z-10">
                {/* <h1 className="text-3xl font-semibold text-gray-800 mb-4">{t.title}</h1> */}
                <p className="text-lg text-gray-600 mb-6">
                  
                    {/* {t.message} */}
                </p>
                <Link 
                    to="/" 
                    className="inline-block px-6 py-3 bg-[#EEBA2B] text-white font-semibold rounded-md hover:bg-[#8b6e1c]"
                >
                     {/* {t.button} */}
                </Link>
            </div>
        </div>
    );
};

export default GetBackToYou;
