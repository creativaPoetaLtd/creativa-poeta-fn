import { useState } from 'react';

const JobApplicationForm = () => {
    const [step, setStep] = useState(1);

    const handleNextStep = () => setStep((prev) => prev + 1);
    const handlePreviousStep = () => setStep((prev) => prev - 1);

    return (
        <div className="w-full md:w-[80%] laptop:w-[50%]  h-fit mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div className="text-gray-600">Step {step} of 4</div>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((item) => (
                        <span
                            key={item}
                            className={`h-2 w-8 rounded-full ${
                                item <= step ? 'bg-[#EEBA2B] ' : 'bg-gray-200'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                        <input
                            type="url"
                            placeholder="LinkedIn Profile (optional)"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Professional Background</h2>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Current Job Title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] ">
                            <option value="">Years of Experience</option>
                            <option>0-1 Years</option>
                            <option>1-3 Years</option>
                            <option>3-5 Years</option>
                            <option>5+ Years</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Desired Job Titles"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Skills & Resume</h2>
                    <div className="space-y-2">
                        <select multiple className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] ">
                            <option>JavaScript</option>
                            <option>React</option>
                            <option>HTML/CSS</option>
                            <option>Python</option>
                        </select>
                        <input
                            type="file"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Additional Information</h2>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Preferred Location(s)"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                        <textarea
                            rows={4}
                            placeholder="Additional Comments"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEBA2B] "
                        />
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={handlePreviousStep}
                    disabled={step === 1}
                    className={`px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 transition ${
                        step === 1 && 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    Back
                </button>
                {step < 4 ? (
                    <button
                        onClick={handleNextStep}
                        className="px-4 py-2 bg-[#EEBA2B]  text-white rounded-lg hover:bg-yellow-400 transition"
                    >
                        Next
                    </button>
                ) : (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default JobApplicationForm;
