import { Link } from 'react-router-dom';
import logo from '../assets/flags/logopoeta1.png'; // Make sure to replace 'creativa-poeta-logo.png' with the actual file name of your logo

const ServiceHero = () => {
    return (
        <div>
            <main>

                <section>
                    <div className="relative grid w-full bg-[#283444] h-96 lg:h-[52rem] place-items-center">
                        <Link to="/">
                            <div className="logo laptop:top-0 desktop:top-0 tablet:top-3 md:top-3 top-5  text-white laptop:text-4xl desktop:text-4xl text-xl  phone:left-8 tablet:left-8 desktop:left-8 md:left-8 laptop:left-8 left-4 laptop:ml-11 desktop:ml-11 ml-0 absolute laptop:p-1 desktop:p-1">
                                <img src={logo} alt="logo" className="laptop:w-[85%] desktop:w-[85%] laptop:h-[95%] desktop:h-[95%] h-[100%] w-[50%]" />
                            </div>
                        </Link>
                        <div className="flex flex-col items-center mx-auto text-center">
                            <h1 className="text-3xl font-semibold text-yellow-500 uppercase md:text-6xl">Digital marketing AGENCY</h1>

                            <p className="mt-6 text-2xl font-semibold Capitalize leading-5 text-yellow-500">The best in town.</p>

                            <a href="#about" className="mt-8 cursor-pointer animate-bounce">
                                <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="27" cy="26" r="18" stroke="yellow" strokeWidth="2" />
                                    <path
                                        d="M22.41 23.2875L27 27.8675L31.59 23.2875L33 24.6975L27 30.6975L21 24.6975L22.41 23.2875Z"
                                        fill="yellow"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <svg className="fill-[#283444]" viewBox="0 0 1440 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1440 0H0V57C720 0 1440 57 1440 57V0Z" />
                    </svg>
                </section>

                <section className="container  flex flex-1 px-6 py-12 mx-auto" id="about">
                    <div className="flex w-full justify-between desktop:flex-row laptop:flex-row tablet:flex-col flex-col">
                        <div className="w-full my-auto desktop:w-[50%] laptop:w-1/2 tablet:w-full">
                            <h3 className="font-bold text-grey-800 desktop:text-4xl laptop:text-4xl tablet:text-3xl text-3xl">We create awesome Digital marteting</h3>

                            <p className="mt-6 text-black-500 desktop:text-xl laptop:text-1/2 tablet:text-1/3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam provident voluptatum id magni iste nobis corrupti, delectus quis repellat, debitis error quod explicabo molestiae rerum totam ab sunt excepturi,
                                delectus quis repellat, debitis error quod explicabo molestiae rerum totam ab sunt excepturi?
                            </p>
                            <p className="mt-6 text-black-500 desktop:text-xl laptop:text-1/2 tablet:text-1/3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam provident voluptatum id magni iste nobis corrupti, delectus quis repellat, debitis error quod explicabo molestiae rerum totam ab sunt excepturi?</p>

                        </div>

                        <div className="mt-10 w-full my-auto desktop:w-[50%] laptop:w-1/2 tablet:w-full">
                            <img className="object-cover w-full rounded-xl h-96" src="https://images.unsplash.com/photo-1516131206008-dd041a9764fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="Video thumbnail" />
                        </div>
                    </div>
                </section>

                <section className="bg-white ">
                    <div className="container flex  flex-1 px-6 py-12 mx-auto">
                        <div className="flex w-full justify-between desktop:flex-row laptop:flex-row tablet:flex-col flex-col">

                            <div className=" w-full my-auto desktop:w-[50%] laptop:w-1/2 tablet:w-full">
                                <img className="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full" src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80" alt="" />
                            </div>
                            <div className="w-full mt-12 my-auto desktop:w-[50%] laptop:w-1/2 tablet:w-full ">
                                <div>
                                    <h1 className="text-3xl font-semibold text-black-800 capitalize lg:text-3xl ">explore our <br /> awesome Features</h1>

                                    <div className="mt-2">
                                        <span className="inline-block w-40 h-1 bg-yellow-500 rounded-full"></span>
                                        <span className="inline-block w-3 h-1 ml-1 bg-yellow-500 rounded-full"></span>
                                        <span className="inline-block w-1 h-1 ml-1 bg-yellow-500 rounded-full"></span>
                                    </div>
                                </div>

                                <div className="md:flex mt-12 md:items-start md:-mx-4">
                                    <span className="inline-block p-2 text-white-500 bg-yellow-500 rounded-xl md:mx-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </span>

                                    <div className="mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-2xl font-semibold text-grey-700 capitalize ">Search engine optimization (SEO)</h1>

                                        <p className="mt-3 text-xl text-grey-500 ">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                                        </p>
                                    </div>
                                </div>

                                <div className=" mt-4 md:flex md:items-start md:-mx-4">
                                    <span className="inline-block p-2 text-white-500 bg-yellow-500 rounded-xl md:mx-6 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </span>

                                    <div className="mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-2xl font-semibold text-grey-700 capitalize">Social media utilization</h1>

                                        <p className="mt-3 text-xl text-grey-500 ">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 md:flex md:items-start md:-mx-4">
                                    <span className="inline-block p-2 text-white-500 bg-yellow-500 rounded-xl md:mx-6 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                                        </svg>
                                    </span>

                                    <div className="mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-2xl font-semibold text-grey-700 capitalize ">Content Marketing</h1>

                                        <p className="mt-3 text-xl text-grey-500 ">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-12 border-grey-200 dark:border-grey-700" />
                    </div>
                </section>

                {/* Additional sections go here */}
            </main>


        </div>
    );
};

export default ServiceHero;
