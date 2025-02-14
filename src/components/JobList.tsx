import { Job } from "../types/types"; // Ensure this matches the central Job type
import { FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

interface JobListProps {
    jobs: Job[];
    onJobSelect: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobSelect }) => {
    console.log("Jobs received in JobList:", jobs); 
    return (
        <div className="job-list grid gap-4 p-4 bg-gray-50 rounded-lg shadow-inner">
            {jobs.map((job) => (
                <div
                    key={job.id}
                    onClick={() => onJobSelect(job)}
                    className="job-card p-5 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer transition-all duration-200 transform hover:shadow-lg hover:-translate-y-1 hover:bg-yellow-50"
                >
                    <h3 className="text-xl font-bold text-black mb-2">{job.title}</h3>

                    <p className="text-sm font-medium text-gray-800 flex items-center mb-1">
                        <FaBuilding className="mr-2 text-[#EEBA2B]" /> {job.company}
                    </p>

                    <p className="text-sm text-gray-600 flex items-center mb-1">
                        <FaMapMarkerAlt className="mr-2 text-[#EEBA2B]" /> {job.location}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default JobList;
