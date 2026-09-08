import { authRequest, publicRequest } from "./client";
import { trackConversion } from "../analytics/analytics";

export interface TicketActivity {
  type: "assigned" | "released" | "opened" | "replied" | "status" | string;
  message: string;
  actorEmail?: string;
  actorName?: string;
  at: string;
}

export interface ProjectInquiryPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  selectedServices: string[];
  customServiceDescription?: string;
  customServiceNeeds?: string;
  serviceSpecificOtherDescription?: string;
  additionalInfo?: string;
  locale?: string;
}

export interface ProjectRequest {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType?: string;
  selectedServices?: string[];
  customServiceDescription?: string;
  customServiceNeeds?: string;
  serviceSpecificOtherDescription?: string;
  additionalInfo?: string;
  locale?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  isReplied?: boolean;
  repliedAt?: string;
  repliedBy?: string;
  replyMessage?: string;
  assignedToEmail?: string;
  assignedToName?: string;
  assignedAt?: string;
  activity?: TicketActivity[];
}

export interface ProjectListResponse {
  message: string;
  requests: ProjectRequest[];
  projects?: ProjectRequest[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects?: number;
    totalRequests: number;
    limit: number;
  };
}

export const projectForm = async (data: ProjectInquiryPayload) => {
  const response = await publicRequest<{ message?: string }>(
    {
      method: "POST",
      url: "/api/project/send-inquiry",
      data,
    },
    "Failed to submit project request."
  );
  const serviceType = data.serviceType.toLowerCase();
  if (serviceType.includes("assistance") || serviceType.includes("depannage")) {
    trackConversion("assistance_request_submitted", "assistance_request");
  } else {
    trackConversion("project_request_submitted", "project_request");
  }
  return response;
};

export const getProjectSummary = async () => {
  return authRequest<{ metrics: Record<string, number> }>(
    {
      method: "GET",
      url: "/api/project/summary",
    },
    "Failed to fetch project summary."
  );
};

export const getProjects = async <T = ProjectListResponse>(
  page = 1,
  limit = 25,
  status = "all",
  kind?: "projects" | "impact" | "visibility" | "assistance"
): Promise<T> => {
  return authRequest<T>(
    {
      method: "GET",
      url: "/api/project",
      params: { page, limit, status, kind },
    },
    "Failed to fetch project requests."
  );
};

export const updateProjectStatus = async (projectId: string, status: string) => {
  return authRequest(
    {
      method: "PUT",
      url: `/api/project/${projectId}/status`,
      data: { status },
    },
    "Failed to update project status."
  );
};

export const replyToProject = async (
  projectId: string,
  replyMessage: string,
  subject: string
) => {
  return authRequest(
    {
      method: "POST",
      url: `/api/project/${projectId}/reply`,
      data: { replyMessage, subject },
    },
    "Failed to send reply."
  );
};

export const claimProject = async (projectId: string) => {
  return authRequest<{ request: ProjectRequest }>(
    {
      method: "POST",
      url: `/api/project/${projectId}/claim`,
    },
    "Failed to assign project request."
  );
};

export const releaseProject = async (projectId: string) => {
  return authRequest<{ request: ProjectRequest }>(
    {
      method: "POST",
      url: `/api/project/${projectId}/release`,
    },
    "Failed to release project request."
  );
};

export const deleteProject = async (projectId: string) => {
  return authRequest(
    {
      method: "DELETE",
      url: `/api/project/${projectId}`,
    },
    "Failed to delete project request."
  );
};

export const getProjectById = async (projectId: string) => {
  return authRequest<{ request?: ProjectRequest } | ProjectRequest>(
    {
      method: "GET",
      url: `/api/project/${projectId}`,
    },
    "Failed to fetch project details."
  );
};
