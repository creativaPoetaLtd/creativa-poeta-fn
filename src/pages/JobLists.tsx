// JobList.tsx
import React from 'react';
import { jobs, Job } from '../data/jobData';
import phonvid from '../assets/phonevid.mp4';
import { Link } from 'react-router-dom';
import logo from '../assets/flags/logopoeta1.png';

const JobList: React.FC = () => {
  return (
    <section className="relative bg-gray-800 py-10 min-h-screen">
      <div className="absolute inset-0 overflow-hidden z-0">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={phonvid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <Link to="/">
          <div className="logo laptop:top-0 desktop:top-0 tablet:top-3 md:top-3 top-5  text-white laptop:text-4xl desktop:text-4xl text-xl  phone:left-8 tablet:left-8 desktop:left-8 md:left-8 laptop:left-8 left-4 laptop:ml-11 desktop:ml-11 ml-0 absolute laptop:p-1 desktop:p-1">
            <img
              src={logo}
              alt="logo"
              className="laptop:w-[85%] desktop:w-[85%] laptop:h-[95%] desktop:h-[95%] h-[100%] w-[50%]"
            />
          </div>
        </Link>

      <div className="relative z-10 md:max-w-9xl mx-auto md:px-2 laptop:px-36 px-4 pt-6">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Open Jobs</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800">{job.jobTitle}</h2>
      <p className="text-gray-500 mb-4">{job.location}</p>
      <p className="text-gray-700">{job.companyOverview}</p>
      <p className="text-gray-700 mt-2">{job.jobSummary}</p>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Key Responsibilities:</h3>
        <ul className="list-disc ml-4 text-gray-700">
          {job.keyResponsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Requirements:</h3>
        <ul className="list-disc ml-4 text-gray-700">
          {job.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Key Skills:</h3>
        <p className="text-gray-700">{job.keySkills.join(', ')}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Benefits & Perks:</h3>
        <ul className="list-disc ml-4 text-gray-700">
          {job.benefitsAndPerks.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 font-semibold text-gray-800">
        <h3>Salary Range:</h3>
        <p className="text-gray-700">{job.salaryRange}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Application Instructions:</h3>
        <p className="text-gray-700">{job.applicationInstructions}</p>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>{job.equalOpportunityStatement}</p>
        <p className="mt-1">{job.contactInfo}</p>
      </div>
    </div>
  );
};

export default JobList;
