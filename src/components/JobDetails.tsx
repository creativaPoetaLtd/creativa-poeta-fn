import { Job } from "../types/types"; // Ensure this matches the central Job type
import { FaBriefcase, FaMapMarkerAlt, FaCheckCircle, FaClipboardList, FaListAlt, } from "react-icons/fa";

const JobDetails = ({ job }: { job: Job }) => {
    console.log("Job received in JobDetails:", job); // Add this line
    return (
        <div className="job-details p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-2xl max-w-4xl mx-auto my-6">
            {/* Job Title, Company, and Location */}
            <h2 className="text-3xl font-bold text-[#EEBA2B] mb-2">{job.title}</h2>
            <p className="text-lg font-medium text-gray-800 flex items-center mb-2">
                <FaBriefcase className="mr-2 text-[#EEBA2B]" /> {job.company}
            </p>
            <p className="text-md text-gray-600 flex items-center mb-4">
                <FaMapMarkerAlt className="mr-2 text-[#EEBA2B]" /> {job.location}
            </p>
           

            {/* Job Description */}
            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <h3 className="text-xl font-semibold text-[#EEBA2B] mb-2">About the Job</h3>
                <p className="text-gray-700 text-sm">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <h3 className="text-xl font-semibold text-[#EEBA2B] flex items-center mb-2">
                    <FaClipboardList className="mr-2 text-[#EEBA2B]" /> Key Responsibilities
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                    {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="mb-1">{responsibility}</li>
                    ))}
                </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <h3 className="text-xl font-semibold text-[#EEBA2B] flex items-center mb-2">
                    <FaListAlt className="mr-2 text-[#EEBA2B]" /> Requirements
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                    {job.requirements.map((requirement, index) => (
                        <li key={index} className="mb-1">{requirement}</li>
                    ))}
                </ul>
            </div>

          

            {/* Benefits & Perks */}
            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <h3 className="text-xl font-semibold text-[#EEBA2B] flex items-center mb-2">
                    <FaCheckCircle className="mr-2 text-[#EEBA2B]" /> Benefits & Perks
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                    {job.benefits.map((benefit, index) => (
                        <li key={index} className="mb-1">{benefit}</li>
                    ))}
                </ul>
            </div>

            {/* Application Instructions */}
            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <h3 className="text-xl font-semibold text-[#EEBA2B] mb-2">How to Apply?</h3>
                <p className="text-gray-700 text-sm">{job.howToApply}</p>
            </div>

        </div>
    );
};

export default JobDetails;
