import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ApplyJob } from "../APIs/JobApi";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  currentJobTitle: string;
  yearsOfExperience: string;
  desiredJobTitles: string;
  skills: string[];
  education: string;
  certifications: string;
  languages: string;
  references: string;
  preferredLocation: string;
  additionalComments: string;
}

const JobApplicationForm = () => {
  const [step, setStep] = useState<number>(1);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    currentJobTitle: "",
    yearsOfExperience: "",
    desiredJobTitles: "",
    skills: [],
    education: "",
    certifications: "",
    languages: "",
    references: "",
    preferredLocation: "",
    additionalComments: "",
  });

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.fullName && formData.email && formData.phone);
      case 2:
        return !!(formData.currentJobTitle && formData.yearsOfExperience && formData.desiredJobTitles);
      case 3:
        return !!(formData.skills.length && formData.education && formData.languages);
      case 4:
        return !!(formData.preferredLocation && formData.additionalComments);
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (!validateStep(step)) {
      setShowError(true);
      return;
    }
    setStep((prev) => prev + 1);
    setShowError(false);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    setShowError(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await ApplyJob(formData);
      
      if (response?.message) {
        toast.success(response.message);
        navigate("/thank-you-for-applying");
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          linkedin: "",
          currentJobTitle: "",
          yearsOfExperience: "",
          desiredJobTitles: "",
          skills: [],
          education: "",
          certifications: "",
          languages: "",
          references: "",
          preferredLocation: "",
          additionalComments: "",
        });
        setStep(1);
      } else if (response?.response?.data?.message) {
        // Handle backend validation errors
        toast.error(response.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error('Application submission error:', error);
      if (error instanceof Error) {
        toast.error(`Error submitting application: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while submitting your application.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      method="post"
      className="w-full md:w-[80%] laptop:w-[50%] h-fit mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">Step {step} of 4</div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((item) => (
            <span
              key={item}
              className={`h-2 w-8 rounded-full ${
                item <= step ? "bg-[#EEBA2B]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Personal Information
          </h2>
          <div className="space-y-2">
            <input
              onChange={handleChange}
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
            />
            {showError && !formData.fullName && (
              <p className="text-red-500">Full Name is required</p>
            )}
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
            />
            {showError && !formData.email && (
              <p className="text-red-500">Email is required</p>
            )}
            <input
              onChange={handleChange}
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
            />
            {showError && !formData.phone && (
              <p className="text-red-500">Phone Number is required</p>
            )}
            <input
              onChange={handleChange}
              type="url"
              name="linkedin"
              placeholder="LinkedIn Profile (optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
            />
            {showError && !formData.linkedin && (
              <p className="text-red-500">LinkedIn Profile is required</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={step === 1}
              className={`px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 transition ${
                step === 1 && "opacity-50 cursor-not-allowed"
              }`}>
              Back
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-[#EEBA2B] text-white rounded-lg hover:bg-yellow-400 transition">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Professional Background
          </h2>
          <div className="space-y-2">
            <input
              onChange={handleChange}
              type="text"
              name="currentJobTitle"
              placeholder="Current Job Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
            />
            {showError && !formData.currentJobTitle && (
              <p className="text-red-500">Current Job Title is required</p>
            )}
            <select
              onChange={handleChange}
              name="yearsOfExperience"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]">
              <option value="">Years of Experience</option>
              <option>0-1 Years</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
            {showError && !formData.yearsOfExperience && (
              <p className="text-red-500">Years of Experience is required</p>
            )}
            <input
              onChange={handleChange}
              type="text"
              name="desiredJobTitles"
              placeholder="Desired Job Titles"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
            />
            {showError && !formData.desiredJobTitles && (
              <p className="text-red-500">Desired Job Titles is required</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 transition">
              Back
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-[#EEBA2B] text-white rounded-lg hover:bg-yellow-400 transition">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Skills & Experience
          </h2>
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                Skills (select all that apply)
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="skills"
                    value="JavaScript"
                    className="form-checkbox"
                  />
                  <span className="ml-2">JavaScript</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="skills"
                    value="React"
                    className="form-checkbox"
                  />
                  <span className="ml-2">React</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="skills"
                    value="HTML/CSS"
                    className="form-checkbox"
                  />
                  <span className="ml-2">HTML/CSS</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    onChange={handleChange}
                    type="checkbox"
                    name="skills"
                    value="Python"
                    className="form-checkbox"
                  />
                  <span className="ml-2">Python</span>
                </label>
              </div>
              {showError && !formData.skills.length && (
                <p className="text-red-500">Skills are required</p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                Education
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="education"
                placeholder="Degree and Institution"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
              />
              {showError && !formData.education && (
                <p className="text-red-500">Education is required</p>
              )}
            </div>

            {/* Certifications */}
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                Certifications (optional)
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="certifications"
                placeholder="Certification Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
              />
              {showError && !formData.certifications && (
                <p className="text-red-500">Certifications are required</p>
              )}
            </div>

            {/* Languages */}
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                Languages
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="languages"
                placeholder="Languages Spoken"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
              />
              {showError && !formData.languages && (
                <p className="text-red-500">Languages are required</p>
              )}
            </div>

            {/* References */}
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">
                References (optional)
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="references"
                placeholder="Reference Name and Contact"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
              />
              {showError && !formData.references && (
                <p className="text-red-500">References are required</p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
          <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 transition">
              Back
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-[#EEBA2B] text-white rounded-lg hover:bg-yellow-400 transition">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Additional Information
          </h2>
          <div className="space-y-2">
            <input
              onChange={handleChange}
              type="text"
              name="preferredLocation"
              placeholder="Preferred Location(s)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
            />
            {showError && !formData.preferredLocation && (
              <p className="text-red-500">Preferred Location is required</p>
            )}
            <textarea
              onChange={handleChange}
              rows={4}
              name="additionalComments"
              placeholder="Additional Comments"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B]"
            />
            {showError && !formData.additionalComments && (
              <p className="text-red-500">Additional Comments are required</p>
            )}
          </div>
          <div className="flex justify-between">
          <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 transition">
              Back
            </button>
            <button
      type="button"
      onClick={handleSubmit}
      disabled={isSubmitting}
      className={`px-6 py-2 ${
        isSubmitting 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-[#EEBA2B] hover:bg-yellow-400'
      } text-white rounded-lg transition`}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default JobApplicationForm;
