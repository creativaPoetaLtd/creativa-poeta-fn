import { authRequest } from "./client";

export type EmailStatus = "new" | "read" | "replied" | "archived";

export interface EmailMessage {
  _id: string;
  mailbox: string;
  mailboxAddress: string;
  uid?: number;
  messageId?: string;
  fromName?: string;
  fromEmail?: string;
  to?: string[];
  cc?: string[];
  subject: string;
  preview: string;
  text: string;
  html?: string;
  status: EmailStatus;
  isSeenOnServer?: boolean;
  receivedAt?: string;
  syncedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  replyMessage?: string;
  replySubject?: string;
  repliedAt?: string;
  repliedBy?: string;
}

export interface EmailsResponse {
  emails: EmailMessage[];
  metrics?: Record<string, number>;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalEmails: number;
    limit: number;
  };
}

export interface EmailSyncResult {
  message: string;
  imported: number;
  updated: number;
  skipped: number;
  results: Array<{
    mailbox: string;
    address?: string;
    configured: boolean;
    imported: number;
    updated: number;
    skipped: number;
    error?: string;
  }>;
}

export const getEmails = async (
  page = 1,
  limit = 25,
  status = "all",
  mailbox = "all",
  search = ""
) => {
  return authRequest<EmailsResponse>(
    {
      method: "GET",
      url: "/api/emails",
      params: { page, limit, status, mailbox, search },
    },
    "Failed to fetch emails."
  );
};

export const getEmail = async (id: string) => {
  return authRequest<{ email: EmailMessage }>(
    {
      method: "GET",
      url: `/api/emails/${id}`,
    },
    "Failed to fetch email."
  );
};

export const syncEmails = async (limit = 50) => {
  return authRequest<EmailSyncResult>(
    {
      method: "POST",
      url: "/api/emails/sync",
      data: { limit },
    },
    "Failed to sync emails."
  );
};

export const updateEmailStatus = async (id: string, status: EmailStatus) => {
  return authRequest<{ email: EmailMessage }>(
    {
      method: "PUT",
      url: `/api/emails/${id}/status`,
      data: { status },
    },
    "Failed to update email status."
  );
};

export const deleteEmail = async (id: string) => {
  return authRequest(
    {
      method: "DELETE",
      url: `/api/emails/${id}`,
    },
    "Failed to delete email."
  );
};

export const replyToEmail = async (
  id: string,
  replyMessage: string,
  subject?: string
) => {
  return authRequest<{ email: EmailMessage }>(
    {
      method: "POST",
      url: `/api/emails/${id}/reply`,
      data: { replyMessage, subject },
    },
    "Failed to send email reply."
  );
};
