import { useEffect, useState } from "react";
import Typewriter from "../utils/TypeWritter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import image8 from "../assets/flags/image8.jpg";
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
    customServiceDescription: "", // For "Other" service type description
    customServiceNeeds: "", // For "Other" specific needs description
    serviceSpecificOtherDescription: "", // For when user selects "Other" from service options
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
      ];
    }
    return [];
  };

  const handleNextStep = () => {
    let isValid = true;
    const locale = ProjectsFormLocale[lang] || ProjectsFormLocale.en;
    const isOtherServiceType = formData.serviceType === locale.serviceType6;

    // Check if user selected ONLY "Other" from service-specific options
    const otherServices = [
      "graphicService10",
      "contentService15",
      "marketingService9",
      "webService6",
    ];
    const selectedOtherServices = formData.selectedServices.filter((service) =>
      otherServices.includes(service)
    );
    const hasOnlyServiceSpecificOther =
      selectedOtherServices.length === 1 &&
      formData.selectedServices.length === 1;

    if (step === 1) {
      if (!formData.serviceType) {
        isValid = false;
      } else if (
        isOtherServiceType &&
        !formData.customServiceDescription.trim()
      ) {
        isValid = false;
      }
    } else if (step === 2) {
      if (isOtherServiceType && !formData.customServiceNeeds.trim()) {
        isValid = false;
      } else if (
        !isOtherServiceType &&
        formData.selectedServices.length === 0
      ) {
        isValid = false;
      }
    } else if (step === 3) {
      // If we have ONLY service-specific "Other", validate the description
      if (
        hasOnlyServiceSpecificOther &&
        !formData.serviceSpecificOtherDescription.trim()
      ) {
        isValid = false;
      } else if (
        !hasOnlyServiceSpecificOther &&
        (!formData.name ||
          !formData.email ||
          !formData.phone ||
          !formData.company)
      ) {
        isValid = false;
      }
    } else if (step === 4) {
      if (
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

    // Determine next step logic
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // If user selected ONLY service-specific "Other", go to step 3 for description
      if (hasOnlyServiceSpecificOther) {
        setStep(3);
      } else {
        // Skip to contact info (step 3 or 4 depending on service type)
        setStep(isOtherServiceType ? 4 : 3);
      }
    } else if (step === 3) {
      // If we're on step 3 and have ONLY service-specific "Other", go to contact (step 4)
      // Otherwise submit
      if (hasOnlyServiceSpecificOther) {
        setStep(4);
      } else {
        handleSubmit();
      }
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
      customServiceDescription: "", // Reset custom service description
      customServiceNeeds: "", // Reset custom service needs
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
        customServiceDescription: formData.customServiceDescription,
        customServiceNeeds: formData.customServiceNeeds,
        serviceSpecificOtherDescription:
          formData.serviceSpecificOtherDescription,
        additionalInfo: formData.additionalInfo,
      };

      // Dynamic import to avoid module resolution issues
      const { projectForm } = await import("../APIs/projectForm");
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
        customServiceDescription: "",
        customServiceNeeds: "",
        serviceSpecificOtherDescription: "",
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
            <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex text-[#FFFF00] mb-6">
              {locale.header1}
            </h1>
            <div className="w-full max-w-screen-sm mx-auto mb-6">
              <Typewriter
                text={locale.step1Question}
                className="mb-4 text-white text-lg font-medium"
              />
            </div>

            {showError && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {formData.serviceType === locale.serviceType6
                  ? locale.otherValidationMessage
                  : locale.paragraph1}
              </p>
            )}

            {showOptions && (
              <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto space-y-3">
                {serviceTypes.map((serviceType, index) => (
                  <label
                    key={index}
                    className="block p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
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
                      <span className="text-white">{serviceType}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Show description field if "Other" is selected */}
            {formData.serviceType === locale.serviceType6 && (
              <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto mt-6">
                <div className="mb-4">
                  <label className="block text-white text-lg font-medium mb-2 text-center">
                    {locale.otherServiceQuestion}
                  </label>
                  <textarea
                    name="customServiceDescription"
                    value={formData.customServiceDescription}
                    onChange={handleInputChange}
                    placeholder={locale.otherServicePlaceholder}
                    rows={4}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            )}
          </>
        );

      case 2:
        const availableServices = getServicesForType(formData.serviceType);
        const isContentWriting = formData.serviceType === locale.serviceType2;
        const isMarketing = formData.serviceType === locale.serviceType3;
        const isWebDev = formData.serviceType === locale.serviceType4;
        const isOtherService = formData.serviceType === locale.serviceType6;

        let questionText = locale.step2GraphicQuestion;
        if (isContentWriting) questionText = locale.step2ContentQuestion;
        else if (isMarketing) questionText = locale.step2MarketingQuestion;
        else if (isWebDev) questionText = locale.step2WebQuestion;
        else if (isOtherService) questionText = locale.otherSpecificQuestion;

        return (
          <>
            <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex text-[#FFFF00] mb-6">
              {locale.header1}
            </h1>

            <div className="w-full max-w-screen-sm mx-auto mb-6">
              <Typewriter
                text={questionText}
                className="mb-4 text-white text-lg font-medium text-center"
              />
            </div>

            {showError && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {isOtherService
                  ? locale.otherValidationMessage
                  : locale.paragraph2}
              </p>
            )}

            {/* Show specific needs input for "Other" service type */}
            {isOtherService ? (
              <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto">
                <div className="mb-6">
                  <textarea
                    name="customServiceNeeds"
                    value={formData.customServiceNeeds}
                    onChange={handleInputChange}
                    placeholder={locale.otherSpecificPlaceholder}
                    rows={6}
                    className="w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            ) : (
              /* Show predefined services for standard service types */
              showOptions && (
                <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto space-y-3">
                  {availableServices.map((service, index) => (
                    <label
                      key={index}
                      className="block p-3 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors bg-gray-900"
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
                        <span className="text-white text-sm">{service}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )
            )}
          </>
        );

      case 3:
        // Check if we need to show service-specific "Other" description
        const hasServiceSpecificOther = formData.selectedServices.some(
          (service) =>
            service === "graphicService10" ||
            service === "contentService15" ||
            service === "marketingService9" ||
            service === "webService6"
        );

        if (hasServiceSpecificOther) {
          return (
            <>
              <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex text-[#FFFF00] mb-6">
                {locale.serviceSpecificOtherQuestion}
              </h1>

              {showError && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  {locale.serviceSpecificOtherValidation}
                </p>
              )}

              <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto">
                <div className="mb-6">
                  <textarea
                    name="serviceSpecificOtherDescription"
                    value={formData.serviceSpecificOtherDescription}
                    onChange={handleInputChange}
                    placeholder={locale.serviceSpecificOtherPlaceholder}
                    rows={6}
                    className="w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            </>
          );
        }
        // If no service-specific "Other", show contact info directly
        return (
          <>
            <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex text-[#FFFF00] mb-6">
              Contact Information
            </h1>

            {showError && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {locale.paragraph21}
              </p>
            )}

            <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {locale.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={locale.name2}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {locale.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={locale.email2}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {locale.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={locale.phone2}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {locale.company}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={locale.company2}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-1">
                  {locale.additionalInfo}
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder={locale.additionalInfo2}
                  rows={4}
                  className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h1 className="laptop:text-3xl text-xl font-bold mx-auto items-center justify-center self-center flex text-[#FFFF00] mb-6">
              Contact Information
            </h1>

            {showError && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {locale.paragraph21}
              </p>
            )}

            <div className="w-full laptop:max-w-screen-lg max-w-screen-sm mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {locale.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={locale.name2}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {locale.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={locale.email2}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {locale.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={locale.phone2}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {locale.company}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={locale.company2}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-1">
                  {locale.additionalInfo}
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder={locale.additionalInfo2}
                  rows={4}
                  className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
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
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image8})`,
      }}
    >
      <div className="bg-black rounded-3xl shadow-xl p-8 w-full max-w-4xl relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-700 hover:bg-red-600 transition-colors duration-200 flex items-center justify-center text-white text-lg font-bold z-10"
          title="Close and return to home"
        >
          ×
        </button>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {(() => {
                const locale =
                  ProjectsFormLocale[lang] || ProjectsFormLocale.en;
                const isOtherServiceType =
                  formData.serviceType === locale.serviceType6;
                // Check if user selected ONLY "Other" from service-specific options
                const otherServices = [
                  "graphicService10",
                  "contentService15",
                  "marketingService9",
                  "webService6",
                ];
                const selectedOtherServices = formData.selectedServices.filter(
                  (service) => otherServices.includes(service)
                );
                const hasOnlyServiceSpecificOther =
                  selectedOtherServices.length === 1 &&
                  formData.selectedServices.length === 1;

                const totalSteps =
                  isOtherServiceType || hasOnlyServiceSpecificOther ? 4 : 3;

                return Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                  (stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber
                          ? "bg-[#FFFF00] text-black"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {stepNumber}
                    </div>
                  )
                );
              })()}
            </div>
            <span className="text-sm text-gray-400 ">
              Step {step} of{" "}
              {(() => {
                const locale =
                  ProjectsFormLocale[lang] || ProjectsFormLocale.en;
                const isOtherServiceType =
                  formData.serviceType === locale.serviceType6;
                const hasServiceSpecificOther = formData.selectedServices.some(
                  (service) =>
                    service === "graphicService10" ||
                    service === "contentService15" ||
                    service === "marketingService9" ||
                    service === "webService6"
                );

                if (isOtherServiceType) return 4;
                if (hasServiceSpecificOther) return 4;
                return 3;
              })()}
            </span>
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevStep}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              step === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-500"
            }`}
          >
            {ProjectsFormLocale[lang]?.button2 || ProjectsFormLocale.en.button2}
          </button>

          <button
            onClick={handleNextStep}
            className="px-6 py-2 bg-[#FFFF00] text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
          >
            {step === 3
              ? ProjectsFormLocale[lang]?.header2 ||
                ProjectsFormLocale.en.header2
              : ProjectsFormLocale[lang]?.button1 ||
                ProjectsFormLocale.en.button1}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
