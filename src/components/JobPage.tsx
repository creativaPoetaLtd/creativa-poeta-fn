import { useState } from "react";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import { Job } from "../types/types";
import { FaClipboardList } from "react-icons/fa";

const JobPage = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const jobData: Job[] = [
    {
      id: 1,
      title: "Web/Graphic Designer [internship]",
      company: "Creativa Poeta",
      location: "Remote work",
      description:
        "We are looking for a motivated Web/Graphic Designer to join our growing team. This internship is ideal for someone at the beginning of their career, seeking valuable first work experience. The position could evolve into a permanent role. The internship is paid.",
      responsibilities: [
        "Design and maintain aesthetically pleasing and functional websites,",
        "Create engaging visuals for advertising campaigns (posters, videos, animations)",
        "Contribute to the graphic design of projects, including logo creation, flyers, and other visual media",
        "Perform video editing and production for digital platforms",
        "Collaborate with the team to develop and enhance our visual identity",
        "Contribute to web or mobile app development projects",
      ],
      requirements: [
        "Proficiency in graphic design tools ",
        "Proficiency in web design tools ",
        "Familiarity with video creation and editing tools",
        "Skills in web design and responsive design",
        "Knowledge of web or mobile development is a plus",
        "Creativity, autonomy, and strong organizational skills",
        "Ability to work in a team",
        "Willingness to learn and grow",
        "Proficiency in French or English (both would be an advantage) and Kinyarwanda",
      ],

      benefits: [
        "Opportunity to work in a dynamic and creative environment",
        "Paid internship with the possibility of evolving into a permanent position",
        "Flexibility with remote work options",
        "Autonomy in project management",
        "Opportunity to develop your skills in design, IT, and digital communication",
      ],
      applicationInstructions:
        "Send us your CV, portfolio, and a brief message describing your motivation to job@creativapoeta.com. We look forward to discovering your talent and working together on exciting projects!",
    },
    {
      id: 2,
      title: "Community manager & digital content creator[Internship]",
      company: "Creativa Poeta",
      location: "Remote work",
      description:
        "We are looking for a passionate individual to manage and animate our social media platforms. This role is perfect for someone seeking their first professional experience or looking to build upon their skills in this dynamic field.",
      responsibilities: [
        "Manage Creativa Poeta’s social media platforms as well as those of affiliated websites (Instagram, Facebook, X, YouTube, LinkedIn, TikTok, etc.).",
        "Manage customer interactions on a website affiliated with Creativa Poeta, serving as the main point of contact and providing first-level support (forwarding technical issues to developers if necessary).",
        "Animate and moderate communities by creating and publishing engaging content(posts, stories, ads).",
        "Optimize social media accounts to increase engagement and visibility.",
        "Work on client projects by managing their social media, creating strategies, and improving their online presence",
      ],
      requirements: [
        "Adequate knowledge of social media management (content creation, ads, optimizing accounts).",
        "Proficiency in Kinyarwanda, with a good command of either French or English (both languages are a plus). ",
        "Strong writing skills for effective online communication.",
        "Knowledge of design tools (Photoshop, Illustrator, Canva, GIMP) and/or animation creation is a plus.",
        "Experience with ChatGPT or other AI tools.",
        "Autonomous, well-organized, and able to work in a team.",
        "Adaptable to new tools and technologies.",
      ],

      benefits: [
        " Opportunity to work in a dynamic and creative environment.",
        "Ability to work on your own project (Yes, we support your personal ambitions and would be delighted to help you realize them).",
        "Develop your skills in IT, multimedia, and digital communication.",
        " Contribute to innovative and varied projects.",
        " Flexibility to work remotely with full autonomy in task management.",
        " Paid internship (not a full salary, but a benefit to compensate your time).",
        " Potential for full-time employment at the end of the internship.",
      ],
      applicationInstructions:
        "If you're passionate about digital creation, social media management, and looking to develop your skills in a stimulating environment, send your application to job@creativapoeta.com. We are excited to learn about your profile and explore this unique opportunity together.",
    },
  ];

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
    setIsSidebarOpen(false);
  };

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
              <JobList jobs={jobData} onJobSelect={handleJobSelect} />
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-lg p-4 overflow-y-auto md:w-2/3 lg:w-3/4">
          {selectedJob ? (
            <JobDetails
              job={{
                ...selectedJob,
                applicationInstructions: (
                  <p>
                    {highlightEmail(String(selectedJob.applicationInstructions || ""))}
                  </p>
                ),
              }}
            />
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
};

export default JobPage;
