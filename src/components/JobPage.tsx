import { useState } from 'react';
import JobList from './JobList';
import JobDetails from './JobDetails';
import { Job } from '../types/types';
import { FaClipboardList } from 'react-icons/fa';



const JobPage = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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
    };

    return (
        <div className="job-page grid grid-cols-1 md:grid-cols-3 gap-6 h-screen mt-24 p-2 md:p-6 bg-gradient-to-br from-gray-100 to-gray-300">
            {jobData.length === 0 ? (
                <div className="col-span-3 flex flex-col items-center justify-center text-center rounded-lg p-10">
                    <p className="text-3xl font-semibold text-gray-700 mb-6">
                        No jobs available at the moment
                    </p>
                    <p className="text-gray-500 mb-8">
                        We're constantly adding new opportunities. If you'd like to stay updated, please submit your info below.
                    </p>
                    <button className="inline-block px-6 py-3 bg-[#EEBA2B] text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-400">
                        Submit Your Info
                    </button>
                </div>
            ) : (
                <>
                    <div className="col-span-1 bg-white rounded-lg shadow-md p-4 flex flex-col h-[calc(100vh-8rem)]">
                        <h2 className="text-2xl font-bold text-black mb-4">Open Jobs</h2>
                        
                        {/* Scrollable container with explicit height */}
                        <div className="flex-1 overflow-y-auto min-h-0">
                            <JobList jobs={jobData} onJobSelect={handleJobSelect} />
                        </div>
                        
                        {/* Footer with link - now using sticky positioning */}
                        <div className="sticky bottom-0 left-0 right-0 mt-4 pt-4 bg-white border-t">
                            <a
                                href="/form-to-leave-info"
                                className="block text-blue-600 hover:underline font-medium text-center"
                            >
                                Don't see a suitable position? Submit your info here!
                            </a>
                        </div>
                    </div>

                    <div className="col-span-2 bg-white rounded-lg shadow-lg p-2 h-[calc(100vh-8rem)] overflow-y-auto">
                        {selectedJob ? (
                            <JobDetails job={selectedJob} />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <FaClipboardList className="text-6xl mb-4" />
                                <p className="text-lg font-medium">Select a job to view details</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default JobPage;