import { useState } from 'react';
import JobList from './JobList';
import JobDetails from './JobDetails';
import { Job } from '../types/types';
import { FaClipboardList } from 'react-icons/fa';


const JobPage = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For toggling the job list sidebar

    const jobData: Job[] = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
        {
            id: 2,
            title: "Angular Developer",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
        {
            id: 3,
            title: "Social media manager",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
        {
            id: 4,
            title: "Ruby Developer",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
        {
            id: 5,
            title: "Graphic designer",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
        {
            id: 6,
            title: "Angular Developer",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
        {
            id: 7,
            title: "Video editor",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
        {
            id: 8,
            title: "Content writter",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
        {
            id: 9,
            title: "UX/UI Designer",
            company: "Tech Company",
            location: "San Francisco, CA",
            salary: "$80,000 - $100,000",
            description: "A leading tech company dedicated to innovative solutions. As a Frontend Developer, you'll be creating user-centric web experiences.",
            responsibilities: [
                "Develop responsive and visually appealing interfaces.",
                "Collaborate with backend engineers and designers.",
                "Maintain and improve front-end architecture."
            ],
            requirements: [
                "Bachelor's degree in Computer Science or related field.",
                "3+ years of experience in frontend development."
            ],
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
            benefits: [
                "Health and dental insurance",
                "Flexible working hours",
                "Remote work options"
            ],
            applicationInstructions: "Please send your resume and portfolio to hr@techcompany.com."
        },
    ];

    const handleJobSelect = (job: Job) => {
        setSelectedJob(job);
        setIsSidebarOpen(false); // Close sidebar when a job is selected (on mobile/tablet)
    };


    return (
        <div className="job-page flex flex-col h-screen mt-24 bg-gradient-to-br from-gray-100 to-gray-300">
            {/* Header with toggle button */}
            <header className="md:hidden flex justify-between items-center p-4 bg-white shadow-md">
                <h1 className="text-xl font-bold text-gray-800">Job Portal</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="px-4 py-3 mt-6 text-md font-bold tracking-wide bg-yellow-500 text-black rounded-md hover:bg-yellow-400"
                >
                    Job List
                </button>
            </header>
    
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`absolute md:static z-10 top-0 left-0 h-full bg-white shadow-md transform ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-transform duration-300 md:w-1/3 lg:w-1/4`}
                >
                    <div className="flex flex-col h-full">
                        <h2 className="text-2xl font-bold text-black p-4 border-b">Open Jobs</h2>
                        <div className="flex-1 overflow-y-auto p-4">
                            <JobList jobs={jobData} onJobSelect={handleJobSelect} />
                        </div>
                        <div className="p-4 border-t">
                            <a
                                href="/form-to-leave-info"
                                className="block text-blue-600 hover:underline font-medium text-center"
                            >
                                Don't see a suitable position? Submit your info here!
                            </a>
                        </div>
                    </div>
                </aside>
    
                {/* Job Details */}
                <main className="flex-1 bg-white rounded-lg shadow-lg p-4 overflow-y-auto md:w-2/3 lg:w-3/4">
                    {selectedJob ? (
                        <JobDetails job={selectedJob} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <FaClipboardList className="text-6xl mb-4" />
                            <p className="text-lg font-medium">Select a job to view details</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}    


export default JobPage;