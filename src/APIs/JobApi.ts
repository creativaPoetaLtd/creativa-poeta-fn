import { publicRequest } from "./client";
import { trackConversion } from "../analytics/analytics";

export interface JobApplicationPayload {
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

interface JobApplicationResponse {
  message?: string;
  response?: { data?: { message?: string } };
}

export const ApplyJob = async (data: JobApplicationPayload) => {
  const response = await publicRequest<JobApplicationResponse>(
    {
      method: "POST",
      url: "/api/job/apply",
      data,
    },
    "Failed to submit job application."
  );
  trackConversion("job_application_submitted", "job_application");
  return response;
};
