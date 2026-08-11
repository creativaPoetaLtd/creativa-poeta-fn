import { authRequest, publicRequest } from "./client";
import { trackConversion } from "../analytics/analytics";
import type { CareerDiscoverySource } from "../i18n/CareerLocale";

export type CareerJobStatus = "draft" | "published" | "closed";
export type CareerJobType = "fulltime" | "parttime" | "internship" | "contract";
export type CareerApplicationStatus = "new" | "reviewing" | "shortlisted" | "rejected" | "archived";

export interface CareerJob {
  _id: string;
  title: string;
  summary?: string;
  company: string;
  department?: string;
  location: string;
  type: CareerJobType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isRemote: boolean;
  howToApply?: string;
  status: CareerJobStatus;
  applicationDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareerApplication {
  _id: string;
  kind: "job" | "spontaneous";
  job?: Pick<CareerJob, "_id" | "title" | "status"> | string;
  jobTitle?: string;
  fullName: string;
  email?: string;
  phone?: string;
  country?: string;
  desiredRole?: string;
  experience?: string;
  skills?: string;
  linkedin?: string;
  portfolio?: string;
  hasCv?: boolean;
  cvOriginalName?: string;
  discoverySource?: CareerDiscoverySource;
  discoverySourceOther?: string;
  availability?: string;
  message?: string;
  locale?: string;
  status: CareerApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export type CareerJobPayload = Omit<CareerJob, "_id" | "createdAt" | "updatedAt">;

export interface CareerApplicationPayload {
  jobId?: string;
  fullName: string;
  email?: string;
  phone?: string;
  country?: string;
  desiredRole?: string;
  skills?: string;
  availability?: string;
  message?: string;
  discoverySource: CareerDiscoverySource;
  discoverySourceOther?: string;
  locale: string;
  consentAccepted: boolean;
  websiteConfirmation?: string;
}

export const getPublishedCareerJobs = () => publicRequest<{ jobs: CareerJob[] }>({ method: "GET", url: "/api/jobs" }, "Unable to load career opportunities.");
export const submitCareerApplication = async (data: CareerApplicationPayload, cvFile?: File | null) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, String(value));
  });
  if (cvFile) formData.append("cv", cvFile);
  const response = await publicRequest<{ message: string; applicationId?: string }>({ method: "POST", url: "/api/job/apply", data: formData }, "Unable to send your application.");
  trackConversion("job_application_submitted", data.jobId ? "career_job" : "spontaneous_application");
  return response;
};
export const getAdminCareerJobs = () => authRequest<{ jobs: CareerJob[] }>({ method: "GET", url: "/api/jobs/admin/all" }, "Unable to load career opportunities.");
export const createCareerJob = (data: CareerJobPayload) => authRequest<{ message: string; job: CareerJob }>({ method: "POST", url: "/api/jobs", data }, "Unable to create the opportunity.");
export const updateCareerJob = (id: string, data: Partial<CareerJobPayload>) => authRequest<{ message: string; job: CareerJob }>({ method: "PATCH", url: `/api/jobs/${id}`, data }, "Unable to update the opportunity.");
export const closeCareerJob = (id: string) => authRequest<{ message: string; job: CareerJob }>({ method: "DELETE", url: `/api/jobs/${id}` }, "Unable to close the opportunity.");
export const getCareerApplications = (status = "all") => authRequest<{ applications: CareerApplication[] }>({ method: "GET", url: "/api/job/applications", params: { status } }, "Unable to load applications.");
export const updateCareerApplicationStatus = (id: string, status: CareerApplicationStatus) => authRequest<{ message: string; application: CareerApplication }>({ method: "PATCH", url: `/api/job/applications/${id}`, data: { status } }, "Unable to update the application.");
export const downloadCareerApplicationCv = async (id: string, originalName = "candidate-cv") => {
  const file = await authRequest<Blob>({ method: "GET", url: `/api/job/applications/${id}/cv`, responseType: "blob" }, "Unable to download the CV.");
  const objectUrl = window.URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = originalName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
};
