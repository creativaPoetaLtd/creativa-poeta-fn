import { authRequest, publicRequest } from "./client";

export interface TicketActivity {
  type: "assigned" | "released" | "opened" | "replied" | "status" | string;
  message: string;
  actorEmail?: string;
  actorName?: string;
  at: string;
}

export interface ContactPayload {
  fullName?: string;
  name?: string;
  email: string;
  message: string;
}

export interface ContactQuery {
  _id: string;
  name: string;
  fullName?: string;
  email: string;
  message: string;
  status?: "pending" | "replied" | "closed" | string;
  isReplied?: boolean;
  replyMessage?: string;
  repliedAt?: string;
  repliedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  assignedToEmail?: string;
  assignedToName?: string;
  assignedAt?: string;
  activity?: TicketActivity[];
}

export interface ContactQueriesResponse {
  queries: ContactQuery[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalQueries: number;
    limit: number;
  };
}

export const contactUs = async (data: ContactPayload) => {
  return publicRequest<{ message?: string }>(
    {
      method: "POST",
      url: "/api/contact/send",
      data,
    },
    "Failed to submit contact form."
  );
};

export const getContactSummary = async () => {
  return authRequest<{ metrics: Record<string, number> }>(
    {
      method: "GET",
      url: "/api/contact/summary",
    },
    "Failed to fetch contact summary."
  );
};

export const getContactQueries = async (
  page = 1,
  limit = 25,
  status = "all"
) => {
  return authRequest<ContactQueriesResponse>(
    {
      method: "GET",
      url: "/api/contact",
      params: { page, limit, status },
    },
    "Failed to fetch contact queries."
  );
};

export const getContactQuery = async (queryId: string) => {
  return authRequest<{ query?: ContactQuery } | ContactQuery>(
    {
      method: "GET",
      url: `/api/contact/${queryId}`,
    },
    "Failed to fetch contact query."
  );
};

export const replyToContactQuery = async (
  queryId: string,
  replyMessage: string,
  subject: string
) => {
  return authRequest(
    {
      method: "POST",
      url: `/api/contact/${queryId}/reply`,
      data: { replyMessage, subject },
    },
    "Failed to send reply."
  );
};

export const updateContactQueryStatus = async (
  queryId: string,
  status: string
) => {
  return authRequest(
    {
      method: "PUT",
      url: `/api/contact/${queryId}/status`,
      data: { status },
    },
    "Failed to update query status."
  );
};

export const claimContactQuery = async (queryId: string) => {
  return authRequest<{ query: ContactQuery }>(
    {
      method: "POST",
      url: `/api/contact/${queryId}/claim`,
    },
    "Failed to assign contact query."
  );
};

export const releaseContactQuery = async (queryId: string) => {
  return authRequest<{ query: ContactQuery }>(
    {
      method: "POST",
      url: `/api/contact/${queryId}/release`,
    },
    "Failed to release contact query."
  );
};

export const deleteContactQuery = async (queryId: string) => {
  return authRequest(
    {
      method: "DELETE",
      url: `/api/contact/${queryId}`,
    },
    "Failed to delete contact query."
  );
};
