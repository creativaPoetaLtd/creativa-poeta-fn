 import { Link } from 'react-router-dom'; 
 import image8 from '../assets/flags/image8.jpg';
 import getLangFromLocalStorage from "../../utils/Lang";
import GetBackLocale from '../i18n/GetBackLocale';
 const GetBackToYou = () => {
     const lang = getLangFromLocalStorage() as keyof typeof GetBackLocale;

    // fallback to English if lang is not valid
    const { title, message, button } = GetBackLocale[lang] || GetBackLocale.en;

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
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">{title}</h1> 
               <p className="text-lg text-gray-600 mb-6">
                  
                   {message}
               </p>                <Link 
                   to="/" 
                   className="inline-block px-6 py-3 bg-[#EEBA2B] text-white font-semibold rounded-md hover:bg-[#8b6e1c]"
               >
                    {button}
               </Link>
           </div>
       </div>
);
 };

export default GetBackToYou;


