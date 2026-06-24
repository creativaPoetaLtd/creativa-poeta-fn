import { authRequest, publicRequest } from "./client";

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
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  isReplied?: boolean;
  repliedAt?: string;
  repliedBy?: string;
  replyMessage?: string;
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
  return publicRequest<{ message?: string }>(
    {
      method: "POST",
      url: "/api/project/send-inquiry",
      data,
    },
    "Failed to submit project request."
  );
};

export const getProjects = async (
  page = 1,
  limit = 25,
  status = "all"
): Promise<any> => {
  return authRequest(
    {
      method: "GET",
      url: "/api/project",
      params: { page, limit, status },
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
