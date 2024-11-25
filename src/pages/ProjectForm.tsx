import { useEffect, useState } from 'react';
import emailjs from "@emailjs/browser";
import { Link } from 'react-router-dom';
import logo from '../assets/flags/logopoeta1.png';

const ProjectForm = () => {
    const [step, setStep] = useState(1);
    const [showSecondQuestion, setShowSecondQuestion] = useState(false);
    const [showDeliverablesOptions, setShowDeliverablesOptions] = useState(false); 
    const [showSecondStepQuestion1, setShowSecondStepQuestion1] = useState(false);
    const [showSecondStepQuestion2, setShowSecondStepQuestion2] = useState(false);
    const [showSecondStepOptions1, setShowSecondStepOptions1] = useState(false);
    const [showSecondStepOptions2, setShowSecondStepOptions2] = useState(false);
    const [showThirdStepQuestion1, setShowThirdStepQuestion1] = useState(false);
    const [showThirdStepQuestion2, setShowThirdStepQuestion2] = useState(false);
    const [showThirdStepOptions1, setShowThirdStepOptions1] = useState(false);
    const [showThirdStepOptions2, setShowThirdStepOptions2] = useState(false);
    const [showFourthStepQuestion1, setShowFourthStepQuestion1] = useState(false);
    const [showFourthStepQuestion2, setShowFourthStepQuestion2] = useState(false);
    const [showFourthStepOptions1, setShowFourthStepOptions1] = useState(false);
    const [showFourthStepOptions2, setShowFourthStepOptions2] = useState(false);
    const[showFifthStepQuestion1, setShowFifthStepQuestion1] = useState(false);
    const[showFifthStepOptions1, setShowFifthStepOptions1] = useState(false);
    const[showFifthStepQuestion2, setShowFifthStepQuestion2] = useState(false);
    const[showFifthStepOptions2, setShowFifthStepOptions2] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '' as keyof typeof options.deliverables,
        deliverables: [] as string[],
        mainGoal: '',
        audience: [] as string[],
        stylePreference: '',
        contentElements: [] as string[],
        budget: '',
        timeline: '',
        status: '',
        projectPurpose: [] as string[],
        additionalInfo: ''
    });
    const [showOptions, setShowOptions] = useState(false); 
    useEffect(() => {
        if (formData.projectType) {
            setShowSecondQuestion(true); 
            setTimeout(() => setShowDeliverablesOptions(true), 2000); 
        }
    }, [formData.projectType]);

    useEffect(() => {
        const timer = setTimeout(() => setShowOptions(true), 2000); 
        return () => clearTimeout(timer);
    }, [step]);


    useEffect(() => {
        if (step === 2) {
            setShowSecondStepQuestion1(true); 
            setTimeout(() => setShowSecondStepOptions1(true), 2000);  
            setTimeout(() => setShowSecondStepQuestion2(true), 4000);
            setTimeout(() => setShowSecondStepOptions2(true), 6000); 
        } else {
            setShowSecondStepQuestion1(false);
            setShowSecondStepQuestion2(false);
            setShowSecondStepOptions1(false);
            setShowSecondStepOptions2(false);
        }
    }, [step]);

    useEffect(() => {
        if (step === 3) {
            setShowThirdStepQuestion1(true); 
            setTimeout(() => setShowThirdStepOptions1(true), 2000);  
            setTimeout(() => setShowThirdStepQuestion2(true), 4000);
            setTimeout(() => setShowThirdStepOptions2(true), 6000);  
        } else {
            setShowThirdStepQuestion1(false);
            setShowThirdStepQuestion2(false);
            setShowThirdStepOptions1(false);
            setShowThirdStepOptions2(false);
        }
    }, [step]);

    useEffect(() => {
        if (step === 4) {
            setShowFourthStepQuestion1(true); 
            setTimeout(() => setShowFourthStepOptions1(true), 2000);  
            setTimeout(() => setShowFourthStepQuestion2(true), 4000); 
            setTimeout(() => setShowFourthStepOptions2(true), 6000); 
        } else {
            setShowFourthStepQuestion1(false);
            setShowFourthStepQuestion2(false);
            setShowFourthStepOptions1(false);
            setShowFourthStepOptions2(false);
        }
    }
    , [step]);

    useEffect(() => {
        if (step === 5) {
            setShowFifthStepQuestion1(true); 
            setTimeout(() => setShowFifthStepOptions1(true), 2000);  
            setTimeout(() => setShowFifthStepQuestion2(true), 4000); 
            setTimeout(() => setShowFifthStepOptions2(true), 6000); 
        } else {
            setShowFifthStepQuestion1(false);
            setShowFifthStepQuestion2(false);
            setShowFifthStepOptions1(false);
            setShowFifthStepOptions2(false);
        }
    }
    , [step]);

    const handleNextStep = () =>{
         setStep((prevStep) => prevStep + 1);
         setShowOptions(false);
    }
    const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (e.target instanceof HTMLInputElement && type === 'checkbox') {
            const { checked } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked 
                    ? [...(prevData[name as keyof typeof formData] as string[]), value] 
                    : (prevData[name as keyof typeof formData] as string[]).filter((item) => item !== value)
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const serviceID = "service_9qlvez4";
        const templateID = "template_3tn36hc";
        const publicKey = "xX4q61Mzs09zxCu_A";

        // validate form data
        if (!formData.name || !formData.email || !formData.phone || !formData.company) {
            alert("Please fill in all required fields.");
            return;
        }
        else if (formData.deliverables.length === 0) {
            alert("Please select at least one deliverable.");
            return;
        }
        else if (!formData.mainGoal || formData.audience.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }
        else if (!formData.stylePreference || formData.contentElements.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }
        else if (!formData.budget || !formData.timeline) {
            alert("Please fill in all required fields.");
            return;
        }
        else if (!formData.status || formData.projectPurpose.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }


        try {
            await emailjs.send(serviceID, templateID, formData, publicKey);
            alert("Form submitted successfully!");
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                projectType: 'Graphic Design',
                deliverables: [],
                mainGoal: '',
                audience: [],
                stylePreference: '',
                contentElements: [],
                budget: '',
                timeline: '',
                status: '',
                projectPurpose: [],
                additionalInfo: ''
            });
            setStep(1);
        } catch (error) {
            if (error instanceof Error) {
                alert("Error sending email: " + error.message);
            } else {
                alert("An unknown error occurred.");
            }
        }
    };

    const options = {
        projectType: ["Graphic Design", "Content Writing", "Video Creation and Editing", "Digital Marketing", "Advertising Design", "Website Creation", "Digital Assistance"],
        deliverables: {
            "Graphic Design": ["Logo", "Poster or flyer", "Visual advertisement"],
            "Content Writing": ["Blog post", "Social media content"],
            "Video Creation and Editing": ["Promotional video", "Tutorial video"],
            "Digital Marketing": ["Marketing strategy", "SEO content"],
            "Advertising Design": ["Banner ads", "Brochures"],
            "Website Creation": ["Complete website", "Landing page"],
            "Digital Assistance": ["Digital assistance", "advice or consultation", "Technical support", "Other"]
        },
        mainGoals: ["Increase brand visibility", "Attract new clients", "Build a visual identity", "Increase sales", "Promote a new offering", "Educate or inform the public"],
        audience: ["General public", "Professionals", "Young adults", "Local community", "International market"],
        stylePreferences: ["Formal and professional", "Creative and original", "Minimalistic and modern", "Warm and engaging", "Casual and relaxed", "Innovative and high-tech"],
        contentElements: ["Photos", "Illustrations", "Videos", "Explanatory text", "Client testimonials", "Call-to-action statements"],
        budgetOptions: ["Less than €500", "Between €500 and €1000", "Between €1000 and €5000", "More than €5000"],
        timelineOptions: ["Less than a month", "1 to 3 months", "3 to 6 months", "More than 6 months"],
        statusOptions: ["Self-employed", "Student", "Company", "Non-profit organization"],
        projectPurposes: ["Launch a new service", "Improve brand image", "Generate more sales", "Personal project (portfolio, CV, etc.)"]
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#24303E] py-12 px-4 sm:px-6 lg:px-8">
            <Link to="/">
                <div className="absolute top-5 left-4 text-white">
                    <img src={logo} alt="logo" className="h-[50px]" />
                </div>
            </Link>
            <div className="md:max-w-5xl max-w-7xl w-full p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-10">
                        Step {step}: {[
                            'Project Type', 
                            'Project Goals', 
                            'Content and Style', 
                            'Budget and Timeline', 
                            'Personal Information', 
                            'Contact Information'
                        ][step - 1]}
                    </h2>

                    {step === 1 && (
                        <>
                            <label className="block text-lg font-semibold text-white mb-2 typewriter-text">What type of project would you like to undertake?</label>
                            {showOptions && (
                            <div className="space-y-2">
                                {options.projectType.map((type) => (
                                    <label key={type} className="block text-white">
                                        <input 
                                            type="radio" 
                                            name="projectType" 
                                            value={type} 
                                            onChange={handleChange} 
                                            checked={formData.projectType === type} 
                                            className="mr-2"
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                            )}
                                {showSecondQuestion && (
                                <>
                                    <label className="block text-lg font-semibold text-white mt-6 typewriter-text">What deliverables are you expecting from this project?</label>
                                    {showDeliverablesOptions && (
                                    <div className="space-y-2">
                                        {(options.deliverables[formData.projectType] || []).map((deliverable) => (
                                            <label key={deliverable} className="block text-white">
                                                <input 
                                                    type="checkbox" 
                                                    name="deliverables" 
                                                    value={deliverable} 
                                                    onChange={handleChange} 
                                                    checked={formData.deliverables.includes(deliverable)} 
                                                    className="mr-2"
                                                />
                                                {deliverable}
                                            </label>
                                        ))}
                                    </div>
                                    )}
                                </>
                            )}
                              <div className="flex justify-end mt-6">
                                <button type="button" onClick={handleNextStep} className="px-6 py-2 bg-[#EEBA2B] font-semibold rounded-md hover:bg-[#8b6e1c]">
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <> {showSecondStepQuestion1 && (
                            <>
                                <label className="block text-lg font-semibold text-white mb-2 typewriter-text">What is the main goal of your project?</label>
                                {showSecondStepOptions1 && (
                                    <select name="mainGoal" onChange={handleChange} value={formData.mainGoal} className="w-full p-2 border rounded-md">
                                        {options.mainGoals.map((goal) => (
                                            <option key={goal} value={goal}>{goal}</option>
                                        ))}
                                    </select>
                                )}
                            </>
                        )}

                        {showSecondStepQuestion2 && (
                            <>
                                <label className="block text-lg font-semibold text-white mt-6 typewriter-text">What audience are you aiming to reach?</label>
                                {showSecondStepOptions2 && (
                                    <div className="space-y-2">
                                        {options.audience.map((aud) => (
                                            <label key={aud} className="block text-white">
                                                <input 
                                                    type="checkbox" 
                                                    name="audience" 
                                                    value={aud} 
                                                    onChange={handleChange} 
                                                    checked={formData.audience.includes(aud)} 
                                                    className="mr-2"
                                                />
                                                {aud}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={handlePrevStep} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md">
                                    Back
                                </button>
                                <button type="button" onClick={handleNextStep} className="px-6 py-2 bg-[#EEBA2B] font-semibold rounded-md hover:bg-[#8b6e1c]">
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            {showThirdStepQuestion1 && (
                                <>
                                    <label className="block text-lg font-semibold text-white mb-2 typewriter-text">What design style or tone of voice do you prefer for this project?</label>
                                    {showThirdStepOptions1 && (
                                        <div className="space-y-2">
                                            {options.stylePreferences.map((style) => (
                                                <label key={style} className="block text-white">
                                                    <input 
                                                        type="radio" 
                                                        name="stylePreference" 
                                                        value={style} 
                                                        onChange={handleChange} 
                                                        checked={formData.stylePreference === style} 
                                                        className="mr-2"
                                                    />
                                                    {style}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            {showThirdStepQuestion2 && (
                                <>
                                    <label className="block text-lg font-semibold text-white mt-6 typewriter-text">What specific graphic elements or content would you like to include?</label>
                                    {showThirdStepOptions2 && (
                                        <div className="space-y-2">
                                            {options.contentElements.map((element) => (
                                                <label key={element} className="block text-white">
                                                    <input 
                                                        type="checkbox" 
                                                        name="contentElements" 
                                                        value={element} 
                                                        onChange={handleChange} 
                                                        checked={formData.contentElements.includes(element)} 
                                                        className="mr-2"
                                                    />
                                                    {element}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={handlePrevStep} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md">
                                    Back
                                </button>
                                <button type="button" onClick={handleNextStep} className="px-6 py-2 bg-[#EEBA2B] font-semibold rounded-md hover:bg-[#8b6e1c] ">
                                    Next
                                </button>
                            </div>
                        </>
                    )}


                    {step === 4 && (
                        <>
                            {showFourthStepQuestion1 && (
                                <>
                                    <label className="block text-lg font-semibold text-white mb-2 typewriter-text">What is your budget for this project?</label>
                                    {showFourthStepOptions1 && (
                                        <select name="budget" onChange={handleChange} value={formData.budget} className="w-full p-2 border rounded-md">
                                            {options.budgetOptions.map((budget) => (
                                                <option key={budget} value={budget}>{budget}</option>
                                            ))}
                                        </select>
                                    )}
                                </>
                            )}

                            {showFourthStepQuestion2 && (
                                <>
                                    <label className="block text-lg font-semibold text-white mt-6 typewriter-text">What is your desired timeline for this project?</label>
                                    {showFourthStepOptions2 && (
                                        <select name="timeline" onChange={handleChange} value={formData.timeline} className="w-full p-2 border rounded-md">
                                            {options.timelineOptions.map((timeline) => (
                                                <option key={timeline} value={timeline}>{timeline}</option>
                                            ))}
                                        </select>
                                    )}
                                </>
                            )}
                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={handlePrevStep} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md">
                                    Back
                                </button>
                                <button type="button" onClick={handleNextStep} className="px-6 py-2 bg-[#EEBA2B]  font-semibold rounded-md hover:bg-[#8b6e1c] ">
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {step === 5 && (
                        <>
                            {showFifthStepQuestion1 && (
                                <>
                                    <label className="block text-lg font-semibold text-white mb-2 typewriter-text">What is your current status?</label>
                                    {showFifthStepOptions1 && (
                                        <select name="status" onChange={handleChange} value={formData.status} className="w-full p-2 border rounded-md">
                                            {options.statusOptions.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    )}
                                </>
                            )}

                            {showFifthStepQuestion2 && (
                                <>
                                    <label className="block text-lg font-semibold text-white mt-6 typewriter-text">What is the purpose of this project?</label>
                                    {showFifthStepOptions2 && (
                                        <div className="space-y-2">
                                            {options.projectPurposes.map((purpose) => (
                                                <label key={purpose} className="block text-white">
                                                    <input 
                                                        type="checkbox" 
                                                        name="projectPurpose" 
                                                        value={purpose} 
                                                        onChange={handleChange} 
                                                        checked={formData.projectPurpose.includes(purpose)} 
                                                        className="mr-2"
                                                    />
                                                    {purpose}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={handlePrevStep} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md">
                                    Back
                                </button>
                                <button type="button" onClick={handleNextStep} className="px-6 py-2 bg-[#EEBA2B] font-semibold rounded-md hover:bg-[#8b6e1c] ">
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {step === 6 && (
                        <>
                            <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} value={formData.name} className="w-full p-3 border rounded-md" />

                            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} className="w-full p-3 border rounded-md" />

                            <input type="tel" name="phone" placeholder="Enter your phone number" onChange={handleChange} value={formData.phone} className="w-full p-3 border rounded-md" />

                            <input type="text" name="company" placeholder="Enter your company name" onChange={handleChange} value={formData.company} className="w-full p-3 border rounded-md" />
                            <textarea name="additionalInfo" placeholder="Enter any additional information here" onChange={handleChange} value={formData.additionalInfo} className="w-full p-3 border rounded-md" />
                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={handlePrevStep} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md">
                                    Back
                                </button>
                                <button type="submit" className="px-6 py-2 bg-[#EEBA2B] font-semibold rounded-md hover:bg-[#8b6e1c] ">
                                    Submit
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
