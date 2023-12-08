import { Link } from 'react-router-dom';
import image8 from '../assets/flags/image8.jpg';
import logo from '../assets/flags/logopoeta1.png'; // Make sure to replace 'creativa-poeta-logo.png' with the actual file name of your logo
const Hero = () => {
    return (
        <>
            <header className="relative">
                <div className="w-full bg-center bg-cover h-[50rem]" style={{ backgroundImage: `url(${image8})` }}>
                    <Link to="/">
                        <div className="logo laptop:top-0 desktop:top-0 tablet:top-3 md:top-3 top-5  text-white laptop:text-4xl desktop:text-4xl text-xl  phone:left-8 tablet:left-8 desktop:left-8 md:left-8 laptop:left-8 left-4 laptop:ml-11 desktop:ml-11 ml-0 absolute laptop:p-1 desktop:p-1">
                            <img src={logo} alt="logo" className="laptop:w-[85%] desktop:w-[85%] laptop:h-[95%] desktop:h-[95%] h-[100%] w-[50%]" />
                        </div>
                    </Link>
                    <div className="flex items-center justify-center w-full h-full bg-gray-900/40 p-8">
                        <h1 className="text-3xl font-semibold text-white lg:text-4xl">You can look into <span className="text-yellow-400">FAQ</span> Question</h1>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Hero;
