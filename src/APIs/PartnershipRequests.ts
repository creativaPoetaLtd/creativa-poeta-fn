import { authRequest, publicRequest } from "./client";
import type { TicketActivity } from "./Contact";
import { trackConversion } from "../analytics/analytics";

export type PartnershipRequestStatus = "pending" | "in_progress" | "replied" | "closed";

export interface PartnershipRequestPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  partnershipType: string;
  locale: string;
  message: string;
}

export interface PartnershipRequest extends PartnershipRequestPayload {
  _id: string;
  status: PartnershipRequestStatus;
  replyMessage?: string;
  repliedAt?: string;
  repliedBy?: string;
  assignedToEmail?: string;
  assignedToName?: string;
  assignedAt?: string;
  activity?: TicketActivity[];
  createdAt: string;
  updatedAt?: string;
}

export interface PartnershipRequestsResponse {
  requests: PartnershipRequest[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRequests: number;
    limit: number;
  };
}

export const submitPartnershipRequest = async (data: PartnershipRequestPayload) => {
  const response = await publicRequest<{ requestId: string; status: PartnershipRequestStatus }>(
    { method: "POST", url: "/api/partnership-requests", data },
    "Failed to submit partnership request."
  );
  trackConversion("partnership_request_submitted", "partnership_request");
  return response;
};

export const getPartnershipRequestSummary = () =>
  authRequest<{ metrics: Record<string, number> }>(
    { method: "GET", url: "/api/partnership-requests/summary" },
    "Failed to fetch partnership request summary."
  );

export const getPartnershipRequests = (page = 1, limit = 25, status = "all") =>
  authRequest<PartnershipRequestsResponse>(
    { method: "GET", url: "/api/partnership-requests", params: { page, limit, status } },
    "Failed to fetch partnership requests."
  );

export const getPartnershipRequest = (id: string) =>
  authRequest<{ request: PartnershipRequest }>(
    { method: "GET", url: `/api/partnership-requests/${id}` },
    "Failed to fetch partnership request."
  );

export const claimPartnershipRequest = (id: string) =>
  authRequest<{ request: PartnershipRequest }>(
    { method: "POST", url: `/api/partnership-requests/${id}/claim` },
    "Failed to assign partnership request."
  );

export const releasePartnershipRequest = (id: string) =>
  authRequest<{ request: PartnershipRequest }>(
    { method: "POST", url: `/api/partnership-requests/${id}/release` },
    "Failed to release partnership request."
  );

export const updatePartnershipRequestStatus = (id: string, status: PartnershipRequestStatus) =>
  authRequest<{ request: PartnershipRequest }>(
    { method: "PATCH", url: `/api/partnership-requests/${id}/status`, data: { status } },
    "Failed to update partnership request."
  );

export const replyToPartnershipRequest = (id: string, replyMessage: string, subject: string) =>
  authRequest<{ request: PartnershipRequest; emailSent: boolean }>(
    { method: "POST", url: `/api/partnership-requests/${id}/reply`, data: { replyMessage, subject } },
    "Failed to send partnership reply."
  );

export const deletePartnershipRequest = (id: string) =>
  authRequest<{ message: string }>(
    { method: "DELETE", url: `/api/partnership-requests/${id}` },
    "Failed to delete partnership request."
  );
