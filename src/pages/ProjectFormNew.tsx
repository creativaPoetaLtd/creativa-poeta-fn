import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/flags/logopoeta1.png";
import Typewriter from "../utils/TypeWritter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import image8 from "../assets/flags/image8.jpg";
import { projectForm } from "../APIs/projectForm";
import "../styles/custom-inputs.css";
import getLangFromLocalStorage from "../../utils/Lang";
import ProjectsFormLocale from "../i18n/ProjectsFormLocale";

const lang: any = getLangFromLocalStorage();

const ProjectForm = () => {
  const [step, setStep] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    selectedServices: [] as string[],
    additionalInfo: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowOptions(true), 2000);
    return () => clearTimeout(timer);
  }, [step]);

  // Service type options for step 1
  const serviceTypes = [
    ProjectsFormLocale[lang]?.serviceType1 ||
      ProjectsFormLocale.en.serviceType1,
    ProjectsFormLocale[lang]?.serviceType2 ||
      ProjectsFormLocale.en.serviceType2,
    ProjectsFormLocale[lang]?.serviceType3 ||
      ProjectsFormLocale.en.serviceType3,
    ProjectsFormLocale[lang]?.serviceType4 ||
      ProjectsFormLocale.en.serviceType4,
    ProjectsFormLocale[lang]?.serviceType5 ||
      ProjectsFormLocale.en.serviceType5,
    ProjectsFormLocale[lang]?.serviceType6 ||
      ProjectsFormLocale.en.serviceType6,
  ];

  // Get services based on selected service type
  const getServicesForType = (serviceType: string) => {
    const locale = ProjectsFormLocale[lang] || ProjectsFormLocale.en;

    if (
      serviceType ===
      (ProjectsFormLocale[lang]?.serviceType1 ||
        ProjectsFormLocale.en.serviceType1)
    ) {
      // Graphic Design Services
      return [
        locale.graphicService1,
        locale.graphicService2,
        locale.graphicService3,
        locale.graphicService4,
        locale.graphicService5,
        locale.graphicService6,
        locale.graphicService7,
        locale.graphicService8,
        locale.graphicService9,
        locale.graphicService10,
      ];
    } else if (
      serviceType ===
      (ProjectsFormLocale[lang]?.serviceType2 ||
        ProjectsFormLocale.en.serviceType2)
    ) {
      // Content Writing Services
      return [
        locale.contentService1,
        locale.contentService2,
        locale.contentService3,
        locale.contentService4,
        locale.contentService5,
        locale.contentService6,
        locale.contentService7,
        locale.contentService8,
        locale.contentService9,
        locale.contentService10,
        locale.contentService11,
        locale.contentService12,
        locale.contentService13,
        locale.contentService14,
        locale.contentService15,
      ];
    } else if (
      serviceType ===
      (ProjectsFormLocale[lang]?.serviceType3 ||
        ProjectsFormLocale.en.serviceType3)
    ) {
      // Digital Marketing Services
      return [
        locale.marketingService1,
        locale.marketingService2,
        locale.marketingService3,
        locale.marketingService4,
        locale.marketingService5,
        locale.marketingService6,
        locale.marketingService7,
        locale.marketingService8,
        locale.marketingService9,
        locale.marketingService10,
      ];
    } else if (
      serviceType ===
      (ProjectsFormLocale[lang]?.serviceType4 ||
        ProjectsFormLocale.en.serviceType4)
    ) {
      // Web Development Services
      return [
        locale.webService1,
        locale.webService2,
        locale.webService3,
        locale.webService4,
        locale.webService5,
        locale.webService6,
        locale.webService7,
        locale.webService8,
        locale.webService9,
        locale.webService10,
        locale.webService11,
      ];
    }
    return [];
  };

  const handleNextStep = () => {
    let isValid = true;

    if (step === 1) {
      if (!formData.serviceType) isValid = false;
    } else if (step === 2) {
      if (
        formData.selectedServices.length === 0 ||
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.company
      ) {
        isValid = false;
      }
    }

    if (!isValid) {
      setShowError(true);
      return;
    }

    if (step === 1) {
      setStep(2);
    } else {
      handleSubmit();
    }
    setShowError(false);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setShowError(false);
    }
  };

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      serviceType: e.target.value,
      selectedServices: [], // Reset selected services when service type changes
    });
  };

  const handleServiceSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, value],
      });
    } else {
      setFormData({
        ...formData,
        selectedServices: formData.selectedServices.filter(
          (service) => service !== value
        ),
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: formData.serviceType,
        selectedServices: formData.selectedServices,
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
        serviceType: "",
        selectedServices: [],
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

  const renderStep = () => {
    const locale = ProjectsFormLocale[lang] || ProjectsFormLocale.en;

    switch (step) {
      case 1:
        return (
          <>
            <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex text-[#806829]">
              {locale.header1}
            </h1>
            <div className="w-full max-w-screen-sm mx-auto">
              <Typewriter text={locale.step1Question} className="mb-2" />
            </div>

            {showError && (
              <p className="text-red-500 text-sm mb-4">{locale.paragraph1}</p>
            )}

            {showOptions && (
              <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto space-y-3">
                {serviceTypes.map((serviceType, index) => (
                  <label
                    key={index}
                    className="block p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="serviceType"
                        value={serviceType}
                        checked={formData.serviceType === serviceType}
                        onChange={handleServiceTypeChange}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{serviceType}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </>
        );

      case 2:
        const availableServices = getServicesForType(formData.serviceType);
        // const isGraphicDesign = formData.serviceType === locale.serviceType1;
        const isContentWriting = formData.serviceType === locale.serviceType2;
        const isMarketing = formData.serviceType === locale.serviceType3;
        const isWebDev = formData.serviceType === locale.serviceType4;

        let questionText = locale.step2GraphicQuestion;
        if (isContentWriting) questionText = locale.step2ContentQuestion;
        else if (isMarketing) questionText = locale.step2MarketingQuestion;
        else if (isWebDev) questionText = locale.step2WebQuestion;

        return (
          <>
            <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex text-[#806829]">
              {locale.header1}
            </h1>

            <div className="w-full max-w-screen-sm mx-auto mb-6">
              <Typewriter text={questionText} className="mb-4" />
            </div>

            {showError && (
              <p className="text-red-500 text-sm mb-4">{locale.paragraph2}</p>
            )}

            {/* Service Selection */}
            {showOptions && (
              <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto space-y-3 mb-8">
                {availableServices.map((service, index) => (
                  <label
                    key={index}
                    className="block p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="selectedServices"
                        value={service}
                        checked={formData.selectedServices.includes(service)}
                        onChange={handleServiceSelection}
                        className="mr-3"
                      />
                      <span className="text-gray-700 text-sm">{service}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Applicant Information */}
            <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-[#806829]">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={locale.name2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#806829] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={locale.email2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#806829] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={locale.phone2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#806829] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale.company}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={locale.company2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#806829] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {locale.additionalInfo}
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder={locale.additionalInfo2}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#806829] focus:border-transparent"
                />
              </div>
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
        <div className="project-form space-y-8 w-full text-white">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
              >
                {ProjectsFormLocale[lang]?.button2 ||
                  ProjectsFormLocale.en.button2}
              </button>
            )}
            <button
              type="button"
              onClick={handleNextStep}
              className={`px-6 py-2 font-semibold rounded-md transition-colors ${
                (step === 1 && formData.serviceType) ||
                (step === 2 &&
                  formData.selectedServices.length > 0 &&
                  formData.name &&
                  formData.email &&
                  formData.phone &&
                  formData.company)
                  ? "bg-[#EEBA2B] hover:bg-[#8b6e1c] text-black"
                  : "bg-gray-400 cursor-not-allowed text-gray-600"
              } ${step === 1 ? "ml-auto" : ""}`}
              disabled={
                (step === 1 && !formData.serviceType) ||
                (step === 2 &&
                  (formData.selectedServices.length === 0 ||
                    !formData.name ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.company))
              }
            >
              {step === 2
                ? ProjectsFormLocale[lang]?.header2 ||
                  ProjectsFormLocale.en.header2
                : ProjectsFormLocale[lang]?.button1 ||
                  ProjectsFormLocale.en.button1}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
