import { useEffect, useState } from 'react';
import emailjs from "@emailjs/browser";
import { Link } from 'react-router-dom';
import logo from '../assets/flags/logopoeta1.png';
import Typewriter from '../utils/TypeWritter';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import image8 from '../assets/flags/image8.jpg';


const ProjectForm = () => {
    const [step, setStep] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [showError, setShowError] = useState(false); // New state for validation
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '' as keyof typeof options.deliverables | 'Other',
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
        let isValid = true;
          // Special handling for "Other" project type in step 1
    if (step === 1 && formData.projectType === "Other") {
        setStep(11); // Skip to the last step
        setShowError(false);
        return;
    }
    
        switch (step) {
            case 1:
                if (!formData.projectType) isValid = false;
                break;
            case 2:
                if (formData.deliverables.length === 0) isValid = false; // Validate deliverables
                break;
            case 3:
                if (!formData.mainGoal) isValid = false; // Validate main goal
                break;
            case 4:
                if (formData.audience.length === 0) isValid = false; // Validate audience
                break;
            case 5:
                if (!formData.stylePreference) isValid = false; // Validate style preference
                break;
            case 6:
                if (formData.contentElements.length === 0) isValid = false; // Validate content elements
                break;
            case 7:
                if (!formData.budget) isValid = false; // Validate budget
                break;
            case 8:
                if (!formData.timeline) isValid = false; // Validate timeline
                break;
            case 9:
                if (!formData.status) isValid = false; // Validate status
                break;
            case 10:
                if (formData.projectPurpose.length === 0) isValid = false; // Validate project purpose
                break;
                // additional information form case
            case 11:
                if (!formData.name || !formData.email || !formData.phone || !formData.company) isValid = false;
                break;
            default:
                break;

        }
    
        if (!isValid) {
            setShowError(true); // Show error message
            return;
        }
    
        // Proceed if validation passes
        setStep((prevStep) => prevStep + 1);
        setShowError(false); // Reset error state
    };

    const isNextDisabled = step === 1 && !formData.projectType;
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
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        // Validate if all required fields are filled
        const isValid = formData.name &&
                        formData.email &&
                        formData.phone &&
                        formData.company &&
                        formData.additionalInfo;
    
        if (!isValid) {
            setShowError(true);  
            return;  
        }
    
        setShowError(false);  
    
        const serviceID = "service_l3behim";
        const templateID = "template_eeu5gqf";
        const publicKey = "IyTvafQS4Xo3-QeKc";
    
        try {
            await emailjs.send(serviceID, templateID, formData, publicKey);     
            toast.success("Form submitted successfully!");
            
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                projectType: 'Graphic Design and Visual Communication',
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
            navigate('/thank-you');
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error sending email: " + error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    };
    

    const options = {
        projectType: ["Graphic Design and Visual Communication", "Content Writing and Creation", "Digital Marketing and Social Media", "Web and App Development", "Other"],
        deliverables: {
            "Graphic Design and Visual Communication": [
                "Logo Design",
                "Brand Identity Package (logos, business cards, letterheads)",
                "Custom Illustrations",
                "Infographics",
                "Social Media Templates",
                "Marketing Collaterals (posters, flyers, brochures)",
                "Digital Ads Graphics",
                "Product Packaging Design",
                "Presentation Design"
            ],
            "Content Writing and Creation": [
                "SEO-Optimized Blog Posts",
                "Website Copy",
                "Social Media Captions and Content",
                "White Papers and Case Studies",
                "Email Marketing Campaign Content",
                "E-books and Guides",
                "Press Releases",
                "Video Scriptwriting",
                "Product Descriptions"
            ],
            "Digital Marketing and Social Media": [
                "Comprehensive Marketing Strategy Plan",
                "Search Engine Optimization (SEO) Audits and Reports",
                "Google Ads Campaign Setup and Management",
                "Social Media Strategy and Management",
                "Content Calendar for Social Platforms",
                "Email Marketing Campaigns",
                "Performance Analytics and Reports",
                "Brand Campaign Development",
                "Influencer Marketing Collaboration Plan"
            ],
            "Web and App Development": [
                "Fully Responsive Website",
                "Custom Landing Page Design",
                "E-commerce Website Development",
                "Web Application Development",
                "Mobile App Development (iOS and Android)",
                "User Interface (UI) Design",
                "User Experience (UX) Prototyping",
                "Backend and Database Integration",
                "Website Performance Optimization",
                "Maintenance and Support Plans"
            ],
            "Other": []
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
         <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex  text-[#806829]">
         Get Started
        </h1>
      <div className="w-full max-w-screen-sm mx-auto">
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
            {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select a project type to proceed.
                            </p>
                        )}
            <div className="flex justify-end mt-6">
            <button 
  type="button" 
  onClick={handleNextStep} 
//   disabled={isNextDisabled}
  className={`px-6 py-2 ${isNextDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#EEBA2B] hover:bg-[#8b6e1c]'} font-semibold rounded-md`}
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
                         {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select a deliverable to proceed.
                            </p>
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
                                // disabled={formData.deliverables.length === 0}
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
                          {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select a main goal to proceed.
                            </p>
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
                                // disabled={!formData.mainGoal}
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
                          {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select audience to proceed.
                            </p>
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
                                // disabled={formData.audience.length === 0}
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
                          {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select prefered styles to proceed.
                            </p>
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
                                // disabled={!formData.stylePreference}
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
                          {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select content elements to proceed.
                            </p>
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
                                // disabled={formData.contentElements.length === 0}
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
                      {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select a budget to proceed.
                            </p>
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
                            // disabled={!formData.budget}
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
                          {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select a timeline to proceed.
                            </p>
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
                                // disabled={!formData.timeline}
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
                          {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select a status to proceed.
                            </p>
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
                                // disabled={!formData.status}
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
                          {showError && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select a project purpose to proceed.
                            </p>
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
                                // disabled={formData.projectPurpose.length === 0}
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
                            {/* Error Message */}
                            {showError && (
                                <p className="text-red-500 text-sm mb-4">
                                    Please fill out all fields correctly before submitting.
                                </p>
                            )}
                
                            {/* Form Inputs */}
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
                            
                            {/* Navigation Buttons */}
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
                                    onClick={handleSubmit} 
                                    // disabled={formData.name === '' || formData.email === '' || formData.phone === '' || formData.company === '' || formData.additionalInfo === ''}  // Disable if any field is empty
                                    className={`px-6 py-2 ${formData.name && formData.email && formData.phone && formData.company && formData.additionalInfo ? 'bg-[#EEBA2B] hover:bg-[#8b6e1c]' : 'bg-gray-400 cursor-not-allowed'} font-semibold rounded-md`}
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
        <div
          className="min-h-screen flex items-center justify-center bg-[#24303E] py-12 px-4 sm:px-6 lg:px-8"
          style={{
            backgroundImage: `url(${image8})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Link to="/" className="">
            <div className="absolute top-5 left-4 text-white">
              <img src={logo} alt="logo" className="h-[50px]" />
            </div>
          </Link>
          <div className="md:max-w-5xl max-w-7xl w-full md:p-10 p-6 relative bg-black rounded-2xl">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 w-full"
              style={{ height: "500px" }} 
            >
              {renderStep()}
            </form>
          </div>
        </div>
      );
      };

export default ProjectForm;