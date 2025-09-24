import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/flags/logopoeta1.png";
import Typewriter from "../utils/TypeWritter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import image8 from "../assets/flags/image8.jpg";
import { projectForm } from "../APIs/projectForm";
import CustomSelect from "../components/CustomSelect";
import "../styles/custom-inputs.css";
import getLangFromLocalStorage from "../../utils/Lang";
import ProjectsFormLocale from "../i18n/ProjectsFormLocale";
// const lang: keyof typeof ProjectsFormLocale = getLangFromLocalStorage() as keyof typeof ProjectsFormLocale;
const lang:any = getLangFromLocalStorage();
const ProjectForm = () => {
  const [step, setStep] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [showError, setShowError] = useState(false); // New state for validation
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "" as keyof typeof options.deliverables | "Other",
    deliverables: [] as string[],
    mainGoal: "",
    audience: [] as string[],
    stylePreference: "",
    contentElements: [] as string[],
    budget: "",
    timeline: "",
    status: "",
    projectPurpose: [] as string[],
    additionalInfo: "",
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
        if (
          !formData.name ||
          !formData.email ||
          !formData.phone ||
          !formData.company
        )
          isValid = false;
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      const { checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...(prevData[name as keyof typeof formData] as string[]), value]
          : (prevData[name as keyof typeof formData] as string[]).filter(
              (item) => item !== value
            ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields based on backend requirements
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.projectType ||
      !formData.deliverables.length ||
      !formData.audience.length ||
      !formData.contentElements.length ||
      !formData.projectPurpose.length ||
      !formData.mainGoal ||
      !formData.stylePreference ||
      !formData.budget ||
      !formData.timeline
    ) {
      setShowError(true);
      toast.error("Please fill in all required fields");
      return;
    }

    // Convert budget range to numeric value for backend
    const getBudgetValue = (budgetRange: string): number => {
      switch (budgetRange) {
        case "Less than €500":
          return 500;
        case "Between €500 and €1000":
          return 1000;
        case "Between €1000 and €5000":
          return 5000;
        case "More than €5000":
          return 10000;
        default:
          return 1000; // fallback value
      }
    };

    try {
      const data: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: formData.projectType,
        deliverables: formData.deliverables,
        mainGoal: formData.mainGoal,
        audience: formData.audience,
        stylePreference: formData.stylePreference,
        contentElements: formData.contentElements,
        budget: getBudgetValue(formData.budget), // Convert to numeric value
        timeline: formData.timeline,
        status: formData.status,
        projectPurpose: formData.projectPurpose,
        additionalInfo: formData.additionalInfo,
      };

      const response = await projectForm(data);

      toast.success(
        response.message || "Project inquiry submitted successfully!"
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: ProjectsFormLocale[lang].projectType1,
        deliverables: [],
        mainGoal: "",
        audience: [],
        stylePreference: "",
        contentElements: [],
        budget: "",
        timeline: "",
        status: "",
        projectPurpose: [],
        additionalInfo: "",
      });

      setStep(1);
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    }
  };




// 1. Type for Project Types
type ProjectType =
  | typeof ProjectsFormLocale["en"]["projectType1"]
  | typeof ProjectsFormLocale["en"]["projectType2"]
  | typeof ProjectsFormLocale["en"]["projectType3"]
  | typeof ProjectsFormLocale["en"]["projectType4"]
  | typeof ProjectsFormLocale["en"]["projectType5"];

// 2. Type for Deliverables mapping
type DeliverablesMap = {
  [key in ProjectType]: string[];
};

// 3. Type for the full options object
interface Options {
  projectType: ProjectType[];
  deliverables: DeliverablesMap;
  mainGoals: string[];
  audience: string[];
  stylePreferences: string[];
  contentElements: string[];
  budgetOptions: string[];
  timelineOptions: string[];
  statusOptions: string[];
  projectPurposes: string[];
}

// 4. Example of using it
const options: Options = {
  projectType: [
    ProjectsFormLocale[lang].projectType1,
    ProjectsFormLocale[lang].projectType2,
    ProjectsFormLocale[lang].projectType3,
    ProjectsFormLocale[lang].projectType4,
    ProjectsFormLocale[lang].projectType5,
  ],
  deliverables: {
    [ProjectsFormLocale[lang].projectType1]: [
      ProjectsFormLocale[lang].deliverables2,
      ProjectsFormLocale[lang].deliverables3,
      ProjectsFormLocale[lang].deliverables4,
      ProjectsFormLocale[lang].deliverables5,
      ProjectsFormLocale[lang].deliverables6,
      ProjectsFormLocale[lang].deliverables7,
      ProjectsFormLocale[lang].deliverables8,
      ProjectsFormLocale[lang].deliverables9,
      ProjectsFormLocale[lang].deliverables10,
    ],
    [ProjectsFormLocale[lang].projectType2]: [
      ProjectsFormLocale[lang].deliverables12,
      ProjectsFormLocale[lang].deliverables13,
      ProjectsFormLocale[lang].deliverables14,
      ProjectsFormLocale[lang].deliverables15,
      ProjectsFormLocale[lang].deliverables16,
      ProjectsFormLocale[lang].deliverables17,
      ProjectsFormLocale[lang].deliverables18,
      ProjectsFormLocale[lang].deliverables19,
      ProjectsFormLocale[lang].deliverables20,
    ],
    [ProjectsFormLocale[lang].projectType3]: [
      ProjectsFormLocale[lang].deliverables22,
      ProjectsFormLocale[lang].deliverables23,
      ProjectsFormLocale[lang].deliverables24,
      ProjectsFormLocale[lang].deliverables25,
      ProjectsFormLocale[lang].deliverables26,
      ProjectsFormLocale[lang].deliverables27,
      ProjectsFormLocale[lang].deliverables28,
      ProjectsFormLocale[lang].deliverables29,
      ProjectsFormLocale[lang].deliverables30,
    ],
    [ProjectsFormLocale[lang].projectType4]: [
      ProjectsFormLocale[lang].deliverables32,
      ProjectsFormLocale[lang].deliverables33,
      ProjectsFormLocale[lang].deliverables34,
      ProjectsFormLocale[lang].deliverables35,
      ProjectsFormLocale[lang].deliverables36,
      ProjectsFormLocale[lang].deliverables37,
      ProjectsFormLocale[lang].deliverables38,
      ProjectsFormLocale[lang].deliverables39,
      ProjectsFormLocale[lang].deliverables40,
      ProjectsFormLocale[lang].deliverables41,
    ],
    [ProjectsFormLocale[lang].projectType5]: [
      ProjectsFormLocale[lang].deliverables42,
    ],
  },
  mainGoals: [
    ProjectsFormLocale[lang].mainGoals1,
    ProjectsFormLocale[lang].mainGoals2,
    ProjectsFormLocale[lang].mainGoals3,
    ProjectsFormLocale[lang].mainGoals4,
    ProjectsFormLocale[lang].mainGoals5,
    ProjectsFormLocale[lang].mainGoals6,
  ],
  audience: [
    ProjectsFormLocale[lang].audience1,
    ProjectsFormLocale[lang].audience2,
    ProjectsFormLocale[lang].audience3,
    ProjectsFormLocale[lang].audience4,
    ProjectsFormLocale[lang].audience5,
  ],
  stylePreferences: [
    ProjectsFormLocale[lang].stylePreferences1,
    ProjectsFormLocale[lang].stylePreferences2,
    ProjectsFormLocale[lang].stylePreferences3,
    ProjectsFormLocale[lang].stylePreferences4,
    ProjectsFormLocale[lang].stylePreferences5,
    ProjectsFormLocale[lang].stylePreferences6,
  ],
  contentElements: [
    ProjectsFormLocale[lang].contentElements1,
    ProjectsFormLocale[lang].contentElements2,
    ProjectsFormLocale[lang].contentElements3,
    ProjectsFormLocale[lang].contentElements4,
    ProjectsFormLocale[lang].contentElements5,
    ProjectsFormLocale[lang].contentElements6,
  ],
  budgetOptions: [
    ProjectsFormLocale[lang].budgetOptions1,
    ProjectsFormLocale[lang].budgetOptions2,
    ProjectsFormLocale[lang].budgetOptions3,
    ProjectsFormLocale[lang].budgetOptions4,
  ],
  timelineOptions: [
    ProjectsFormLocale[lang].timelineOptions1,
    ProjectsFormLocale[lang].timelineOptions2,
    ProjectsFormLocale[lang].timelineOptions3,
    ProjectsFormLocale[lang].timelineOptions4,
  ],
  statusOptions: [
    ProjectsFormLocale[lang].statusOptions1,
    ProjectsFormLocale[lang].statusOptions2,
    ProjectsFormLocale[lang].statusOptions3,
    ProjectsFormLocale[lang].statusOptions4,
  ],
  projectPurposes: [
    ProjectsFormLocale[lang].projectPurposes1,
    ProjectsFormLocale[lang].projectPurposes2,
    ProjectsFormLocale[lang].projectPurposes3,
    ProjectsFormLocale[lang].projectPurposes4,
  ],
};


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex  text-[#806829]">
              {ProjectsFormLocale[lang]?.header1 || ProjectsFormLocale.en.header1}
            </h1>
            <div className="w-full max-w-screen-sm mx-auto">
              <Typewriter
                text= {ProjectsFormLocale[lang]?.paragraph3 || ProjectsFormLocale.en.paragraph3}
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
                {ProjectsFormLocale[lang]?.paragraph1 || ProjectsFormLocale.en.paragraph1}
              </p>
            )}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleNextStep}
                //   disabled={isNextDisabled}
                className={`px-6 py-2 ${
                  isNextDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
              </button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <Typewriter
              text={ProjectsFormLocale[lang]?.paragraph4 || ProjectsFormLocale.en.paragraph4}
              className="mb-2"
            />
          {showOptions && (
              <div className="space-y-2">
                {(options.deliverables[formData.projectType] || []).map(
                  (deliverable) => (
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
                  )
                )}
              </div>
            )}
            {showError && (
              <p className="text-red-500 text-sm mt-2">
                {ProjectsFormLocale[lang]?.paragraph1 || ProjectsFormLocale.en.paragraph1}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={formData.deliverables.length === 0}
                className={`px-6 py-2 ${
                  formData.deliverables.length > 0
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <Typewriter
              text= {ProjectsFormLocale[lang]?.paragraph2 || ProjectsFormLocale.en.paragraph2}
              className="mb-2"
            />
            {showOptions && (
              <CustomSelect
                name="mainGoal"
                value={formData.mainGoal}
                onChange={handleSelectChange}
                options={options.mainGoals}
                placeholder={ProjectsFormLocale[lang]?.placeholder1 || ProjectsFormLocale.en.placeholder1}
              />
            )}
            {showError && (
              <p className="text-red-500 text-sm mt-2">
                {ProjectsFormLocale[lang]?.paragraph1 || ProjectsFormLocale.en.paragraph1}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={!formData.mainGoal}
                className={`px-6 py-2 ${
                  formData.mainGoal
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <Typewriter
              text={ProjectsFormLocale[lang]?.paragraph5 || ProjectsFormLocale.en.paragraph5}
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
                {ProjectsFormLocale[lang]?.paragraph6 || ProjectsFormLocale.en.paragraph6}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={formData.audience.length === 0}
                className={`px-6 py-2 ${
                  formData.audience.length > 0
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
              </button>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <Typewriter
              text= {ProjectsFormLocale[lang]?.paragraph7 || ProjectsFormLocale.en.paragraph7}
              className="mb-2"
            />
            {showOptions && (
              <CustomSelect
                name="stylePreference"
                value={formData.stylePreference}
                onChange={handleSelectChange}
                options={options.stylePreferences}
                placeholder= {ProjectsFormLocale[lang]?.placeholder2 || ProjectsFormLocale.en.placeholder2}
              />
            )}
            {showError && (
              <p className="text-red-500 text-sm mt-2">
                {ProjectsFormLocale[lang]?.paragraph8 || ProjectsFormLocale.en.paragraph8}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={!formData.stylePreference}
                className={`px-6 py-2 ${
                  formData.stylePreference
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
              </button>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <Typewriter
              text=" What content elements would you like to include in your project?"
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
                {ProjectsFormLocale[lang]?.paragraph9 || ProjectsFormLocale.en.paragraph9}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={formData.contentElements.length === 0}
                className={`px-6 py-2 ${
                  formData.contentElements.length > 0
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
              </button>
            </div>
          </>
        );
      case 7:
        return (
          <>
            <Typewriter
              text={ProjectsFormLocale[lang]?.paragraph10 || ProjectsFormLocale.en.paragraph10}
              className="mb-2"
            />
            {showOptions && (
              <CustomSelect
                name="budget"
                value={formData.budget}
                onChange={handleSelectChange}
                options={options.budgetOptions}
                placeholder={ProjectsFormLocale[lang]?.placeholder3 || ProjectsFormLocale.en.placeholder3}
              />
            )}
            {showError && (
              <p className="text-red-500 text-sm mt-2">
                {ProjectsFormLocale[lang]?.paragraph11 || ProjectsFormLocale.en.paragraph11}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={!formData.budget}
                className={`px-6 py-2 ${
                  formData.budget
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
              </button>
            </div>
          </>
        );
      case 8:
        return (
          <>
            <Typewriter
              text= {ProjectsFormLocale[lang]?.paragraph12 || ProjectsFormLocale.en.paragraph12}
              className="mb-2"
            />

            {showOptions && (
              <CustomSelect
                name="timeline"
                value={formData.timeline}
                onChange={handleSelectChange}
                options={options.timelineOptions}
                placeholder= {ProjectsFormLocale[lang]?.paragraph14 || ProjectsFormLocale.en.paragraph14}
              />
            )}
            {showError && (
              <p className="text-red-500 text-sm mt-2">
                 {ProjectsFormLocale[lang]?.paragraph15 || ProjectsFormLocale.en.paragraph15}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={!formData.timeline}
                className={`px-6 py-2 ${
                  formData.timeline
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
              </button>
            </div>
          </>
        );
      case 9:
        return (
          <>
            <Typewriter text={ProjectsFormLocale[lang]?.paragraph16 || ProjectsFormLocale.en.paragraph16} className="mb-2" />
            {showOptions && (
              <CustomSelect
                name= "status"
                value={formData.status}
                onChange={handleSelectChange}
                options={options.statusOptions}
                placeholder={ProjectsFormLocale[lang]?.paragraph18 || ProjectsFormLocale.en.paragraph18}
              />
            )}
            {showError && (
              <p className="text-red-500 text-sm mt-2">
                {ProjectsFormLocale[lang]?.paragraph19 || ProjectsFormLocale.en.paragraph19}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={!formData.status}
                className={`px-6 py-2 ${
                  formData.status
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
              </button>
            </div>
          </>
        );
      case 10:
        return (
          <>
            <Typewriter
              text="What is the purpose of this project?"
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
                 {ProjectsFormLocale[lang]?.paragraph20 || ProjectsFormLocale.en.paragraph20}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                 {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                // disabled={formData.projectPurpose.length === 0}
                className={`px-6 py-2 ${
                  formData.projectPurpose.length > 0
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                 {ProjectsFormLocale[lang]?.button1 || ProjectsFormLocale.en.button1}
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
               {ProjectsFormLocale[lang]?.paragraph21 || ProjectsFormLocale.en.paragraph21}
              </p>
            )}

            {/* Form Inputs */}
            <input
              type="text"
              name= "name"
              placeholder={ProjectsFormLocale[lang]?.name2 || ProjectsFormLocale.en.name2}
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              name="email"
              placeholder={ProjectsFormLocale[lang]?.email2 || ProjectsFormLocale.en.email2}
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="text"
              name="phone"
              placeholder={ProjectsFormLocale[lang]?.phone2 || ProjectsFormLocale.en.phone2}
              onChange={handleChange}
              value={formData.phone}
            />
            <input
              type="text"
              name="company"
              placeholder= {ProjectsFormLocale[lang]?.company2 || ProjectsFormLocale.en.company2}
              onChange={handleChange}
              value={formData.company}
            />
            <textarea
              name="additionalInfo"
              placeholder={ProjectsFormLocale[lang]?.additionalInfo2 || ProjectsFormLocale.en.additionalInfo2}
              onChange={handleChange}
              value={formData.additionalInfo}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md"
              >
                {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                // disabled={formData.name === '' || formData.email === '' || formData.phone === '' || formData.company === '' || formData.additionalInfo === ''}  // Disable if any field is empty
                className={`px-6 py-2 ${
                  formData.name &&
                  formData.email &&
                  formData.phone &&
                  formData.company &&
                  formData.additionalInfo
                    ? "bg-[#EEBA2B] hover:bg-[#8b6e1c]"
                    : "bg-gray-400 cursor-not-allowed"
                } font-semibold rounded-md`}
              >
                 {ProjectsFormLocale[lang]?.header2 || ProjectsFormLocale.en.header2}
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
          className="project-form space-y-8 w-full"
          style={{ height: "500px" }}
        >
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
