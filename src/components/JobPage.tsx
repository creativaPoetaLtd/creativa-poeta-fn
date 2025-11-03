import { useState, useEffect } from "react";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import { FaClipboardList } from "react-icons/fa";

export interface Job {
  _id: string;
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  howToApply: string;
  applicationInstructions: string;
  isRemote: boolean;
  createdAt: string;
  updatedAt: string;
}

const JobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://creativa-poeta-bn-phi.vercel.app/api/jobs";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data.jobs);

        if (window.innerWidth >= 768 && data.jobs.length > 0) {
          setSelectedJob(data.jobs[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const highlightEmail = (text: string) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;
    return text.split(emailRegex).map((part, index) => {
      if (emailRegex.test(part)) {
        return (
          <span key={index} className="font-bold text-blue-600">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    // @ts-ignore
    const highlightedHowToApply = highlightEmail(job.howToApply);
    setIsSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading jobs: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="job-page flex flex-col h-screen mt-24 bg-gradient-to-br from-gray-100 to-gray-300">
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
        <aside
          className={`absolute md:static z-10 top-0 left-0 h-full bg-white shadow-md transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 md:w-1/3 lg:w-1/4`}
        >
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-black p-4 border-b">
              Open Jobs
            </h2>
            <div className="flex-1 overflow-y-auto p-4">
              {jobs.length > 0 ? (
                <JobList jobs={jobs} onJobSelect={handleJobSelect} />
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No jobs currently available
                </p>
              )}
            </div>
            <div className="p-4 border-t">
              <a
                href="/form-to-leave-info"
                className="block text-[#d4a625] hover:underline font-medium text-center"
              >
                Didn't see a suitable job? Submit your info here for future
                recommendations!
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-lg p-4 overflow-y-auto md:w-2/3 lg:w-3/4">
          {selectedJob ? (
            <JobDetails job={selectedJob} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FaClipboardList className="text-6xl mb-4" />
              <p className="text-lg font-medium">
                Select a job to view details
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobPage;
