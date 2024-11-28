import { useEffect, useState } from 'react';
import emailjs from "@emailjs/browser";
import { Link } from 'react-router-dom';
import logo from '../assets/flags/logopoeta1.png';
import Typewriter from '../utils/TypeWritter';

const ProjectForm = () => {
    const [step, setStep] = useState(1);
    const [showOptions, setShowOptions] = useState(false);

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

    useEffect(() => {
        const timer = setTimeout(() => setShowOptions(true), 2000); 
        return () => clearTimeout(timer);
    }, [step]);

    const handleNextStep = () => {
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

    const renderStep = () => {
        switch(step) {
          case 1:
    return (
        <>
         <h1 className="laptop:text-5xl text-3xl font-bold mx-auto items-center justify-center self-center flex  text-[#806829]">
         <b className="text-black mr-6">Get</b>Started
        </h1>
      <div className="w-full max-w-screen-sm mx-auto px-4">
      <Typewriter 
                    text="What type of project would you like to undertake?"
                    className="mb-2"
                />
</div>

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
            <div className="flex justify-end mt-6">
                <button 
                    type="button" 
                    onClick={handleNextStep} 
                    disabled={!formData.projectType}
                    className={`px-6 py-2 ${formData.projectType ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                >
                    Next
                </button>
            </div>
        </>
    );
            case 2:
                return (
                    <>
                        <Typewriter
                            text="What deliverables are you expecting from this project?"
                            className="mb-2"
                        />
                        {showOptions && (
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
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep} 
                                disabled={formData.deliverables.length === 0}
                                className={`px-6 py-2 ${formData.deliverables.length > 0 ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                       <Typewriter 
                            text="What is the main goal of your project?"
                            className="mb-2"
                        />
                        {showOptions && (
                            <select 
                                name="mainGoal" 
                                onChange={handleChange} 
                                value={formData.mainGoal} 
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select a goal</option>
                                {options.mainGoals.map((goal) => (
                                    <option key={goal} value={goal}>{goal}</option>
                                ))}
                            </select>
                        )}
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep} 
                                disabled={!formData.mainGoal}
                                className={`px-6 py-2 ${formData.mainGoal ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <Typewriter
                        text='What audience are you aiming to reach?'
                        className="mb-2"
                        />

                        {showOptions && (
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
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep} 
                                disabled={formData.audience.length === 0}
                                className={`px-6 py-2 ${formData.audience.length > 0 ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 5:
                return (
                    <>
                        
                        <Typewriter
                        text='What style preferences do you have for this project?'
                        className="mb-2"
                        />
                        {showOptions && (
                            <select 
                                name="stylePreference" 
                                onChange={handleChange} 
                                value={formData.stylePreference} 
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select a style</option>
                                {options.stylePreferences.map((style) => (
                                    <option key={style} value={style}>{style}</option>
                                ))}
                            </select>
                        )}
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep} 
                                disabled={!formData.stylePreference}
                                className={`px-6 py-2 ${formData.stylePreference ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 6:
                return (
                    <>
                        <Typewriter
                        text=' What content elements would you like to include in your project?'
                        className="mb-2"
                        />
                        {showOptions && (
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
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep} 
                                disabled={formData.contentElements.length === 0}
                                className={`px-6 py-2 ${formData.contentElements.length > 0 ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 7: 
            return (
                <>
                 
                    <Typewriter
                        text='What is your budget for this project?'
                        className="mb-2"
                        />
                    {showOptions && (
                        <select 
                            name="budget" 
                            onChange={handleChange} 
                            value={formData.budget} 
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Select a budget</option>
                            {options.budgetOptions.map((budget) => (
                                <option key={budget} value={budget}>{budget}</option>
                            ))}
                        </select>
                    )}
                    <div className="flex justify-between mt-6">
                        <button 
                            type="button" 
                            onClick={handlePrevStep} 
                            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                        >
                            Back
                        </button>
                        <button 
                            type="button" 
                            onClick={handleNextStep} 
                            disabled={!formData.budget}
                            className={`px-6 py-2 ${formData.budget ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                        >
                            Next
                        </button>
                    </div>
                </>
            );
            case 8:
                return (
                    <>
                        <Typewriter
                        text='What is your timeline for this project?'
                        className="mb-2"
                        />

                        {showOptions && (
                            <select 
                                name="timeline" 
                                onChange={handleChange} 
                                value={formData.timeline} 
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select a timeline</option>
                                {options.timelineOptions.map((timeline) => (
                                    <option key={timeline} value={timeline}>{timeline}</option>
                                ))}
                            </select>
                        )}
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep} 
                                disabled={!formData.timeline}
                                className={`px-6 py-2 ${formData.timeline ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 9:
                return (
                    <>
                        <Typewriter
                        text='What is your current status?'
                        className="mb-2"
                        />
                        {showOptions && (
                            <select 
                                name="status" 
                                onChange={handleChange} 
                                value={formData.status} 
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select a status</option>
                                {options.statusOptions.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        )}
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep} 
                                disabled={!formData.status}
                                className={`px-6 py-2 ${formData.status ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 10:
                return (
                    <>
              
                        <Typewriter
                        text='What is the purpose of this project?'
                        className="mb-2"
                        />
                        {showOptions && (
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
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep} 
                                disabled={formData.projectPurpose.length === 0}
                                className={`px-6 py-2 ${formData.projectPurpose.length > 0 ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
                case 11: 
                return (
                    <>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter your name" 
                            onChange={handleChange} 
                            value={formData.name} 
                            className="w-full p-3 border rounded-md mb-4" 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            onChange={handleChange} 
                            value={formData.email} 
                            className="w-full p-3 border rounded-md mb-4" 
                        />

                        <input 
                            type="text" 
                            name="phone" 
                            placeholder="Enter your phone number" 
                            onChange={handleChange} 
                            value={formData.phone} 
                            className="w-full p-3 border rounded-md mb-4"
                        />
                        <input 
                            type="text" 
                            name="company" 
                            placeholder="Enter your company name" 
                            onChange={handleChange} 
                            value={formData.company} 
                            className="w-full p-3 border rounded-md mb-4"
                        />
                        <textarea 
                            name="additionalInfo" 
                            placeholder="Additional information" 
                            onChange={handleChange} 
                            value={formData.additionalInfo} 
                            className="w-full p-3 border rounded-md mb-4"
                        />
                        
                        <div className="flex justify-between mt-6">
                            <button 
                                type="button" 
                                onClick={handlePrevStep} 
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
                            >
                                Back
                            </button>
                            <button 
                                type="submit" 
                                className="px-6 py-2 bg-[#EEBA2B] font-semibold rounded-md hover:bg-[#8b6e1c]"
                            >
                                Submit
                            </button>
                        </div>
                    </>
                );
            default:
                return null;
        }
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
                        Step {step}
                    </h2>

                    {renderStep()}
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;