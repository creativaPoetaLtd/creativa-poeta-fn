import { authRequest } from "./client";

export type EmailStatus = "new" | "read" | "replied" | "archived";
export type EmailFolder = "inbox" | "spam" | "sent" | "drafts";

export interface EmailActivity {
  type: "assigned" | "released" | "read" | "replied" | "status";
  actorName?: string;
  actorEmail?: string;
  message?: string;
  createdAt?: string;
}

export interface EmailMessage {
  _id: string;
  mailbox: string;
  mailboxAddress: string;
  uid?: number;
  sourceFolder?: string;
  sourceSpecialUse?: string;
  messageId?: string;
  fromName?: string;
  fromEmail?: string;
  to?: string[];
  cc?: string[];
  subject: string;
  preview: string;
  text: string;
  html?: string;
  folder?: "inbox" | "spam";
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
  assignedToEmail?: string;
  assignedToName?: string;
  assignedToRole?: string;
  assignedAt?: string;
  activity?: EmailActivity[];
}

export interface EmailAttachmentMeta {
  filename: string;
  mimeType?: string;
  size?: number;
}

export interface OutboundEmail {
  _id: string;
  folder: "sent" | "draft";
  status: "draft" | "sent" | "failed";
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  signature?: string;
  fromEmail?: string;
  attachments?: EmailAttachmentMeta[];
  error?: string;
  sentAt?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface EmailsResponse {
  emails: EmailMessage[];
  mailboxes?: string[];
  metrics?: Record<string, number>;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalEmails: number;
    limit: number;
  };
}

export interface OutboundEmailsResponse {
  emails: OutboundEmail[];
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
    folders?: string[];
    folderErrors?: Array<{ folder: string; error: string }>;
    error?: string;
  }>;
}

export interface ComposeEmailPayload {
  to: string[] | string;
  cc?: string[] | string;
  bcc?: string[] | string;
  subject: string;
  body: string;
  signature?: string;
  draftId?: string;
  fromEmail?: string;
}

export const getEmails = async (
  page = 1,
  limit = 25,
  status = "all",
  mailbox = "all",
  search = "",
  folder: "inbox" | "spam" = "inbox"
) => {
  return authRequest<EmailsResponse>(
    {
      method: "GET",
      url: "/api/emails",
      params: { page, limit, status, mailbox, search, folder },
    },
    "Failed to fetch emails."
  );
};

export const getOutboundEmails = async (
  folder: "sent" | "draft" = "sent",
  page = 1,
  limit = 25,
  search = ""
) => {
  return authRequest<OutboundEmailsResponse>(
    {
      method: "GET",
      url: "/api/emails/outbound",
      params: { folder, page, limit, search },
    },
    "Failed to fetch outbound emails."
  );
};

export const getEmailSummary = async () => {
  return authRequest<{ metrics: Record<string, number> }>(
    {
      method: "GET",
      url: "/api/emails/summary",
    },
    "Failed to fetch email summary."
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

export const claimEmail = async (id: string) => {
  return authRequest<{ email: EmailMessage }>(
    {
      method: "POST",
      url: `/api/emails/${id}/claim`, 
    },
    "Failed to assign email."
  );
};

export const releaseEmail = async (id: string) => {
  return authRequest<{ email: EmailMessage }>(
    {
      method: "POST",
      url: `/api/emails/${id}/release`, 
    },
    "Failed to release email."
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
  subject?: string,
  signature?: string
) => {
  return authRequest<{ email: EmailMessage }>(
    {
      method: "POST",
      url: `/api/emails/${id}/reply`,
      data: { replyMessage, subject, signature },
    },
    "Failed to send email reply."
  );
};

export const saveEmailDraft = async (payload: ComposeEmailPayload) => {
  return authRequest<{ email: OutboundEmail }>(
    {
      method: "POST",
      url: "/api/emails/outbound/draft",
      data: payload,
    },
    "Failed to save email draft."
  );
};

export const updateEmailDraft = async (id: string, payload: ComposeEmailPayload) => {
  return authRequest<{ email: OutboundEmail }>(
    {
      method: "PUT",
      url: `/api/emails/outbound/${id}/draft`,
      data: payload,
    },
    "Failed to update email draft."
  );
};

const appendComposeField = (formData: FormData, key: string, value?: string[] | string) => {
  const normalized = Array.isArray(value) ? value.join(",") : value || "";
  if (normalized) formData.append(key, normalized);
};

export const sendComposedEmail = async (payload: ComposeEmailPayload, attachments: File[] = []) => {
  const data = attachments.length ? new FormData() : payload;

  if (data instanceof FormData) {
    appendComposeField(data, "to", payload.to);
    appendComposeField(data, "cc", payload.cc);
    appendComposeField(data, "bcc", payload.bcc);
    appendComposeField(data, "subject", payload.subject);
    appendComposeField(data, "body", payload.body);
    appendComposeField(data, "signature", payload.signature);
    appendComposeField(data, "fromEmail", payload.fromEmail);
    appendComposeField(data, "draftId", payload.draftId);
    attachments.forEach((file) => data.append("attachments", file));
  }

  return authRequest<{ email: OutboundEmail }>(
    {
      method: "POST",
      url: "/api/emails/outbound/send",
      data,
    },
    "Failed to send email."
  );
};


export const forwardEmail = async (id: string, payload: ComposeEmailPayload, attachments: File[] = []) => {
  const data = attachments.length ? new FormData() : payload;

  if (data instanceof FormData) {
    appendComposeField(data, "to", payload.to);
    appendComposeField(data, "cc", payload.cc);
    appendComposeField(data, "bcc", payload.bcc);
    appendComposeField(data, "subject", payload.subject);
    appendComposeField(data, "body", payload.body);
    appendComposeField(data, "signature", payload.signature);
    appendComposeField(data, "fromEmail", payload.fromEmail);
    attachments.forEach((file) => data.append("attachments", file));
  }

  return authRequest<{ email: OutboundEmail }>(
    {
      method: "POST",
      url: `/api/emails/${id}/forward`,
      data,
    },
    "Failed to forward email."
  );
};
export const sendEmailDraft = async (id: string) => {
  return authRequest<{ email: OutboundEmail }>(
    {
      method: "POST",
      url: `/api/emails/outbound/${id}/send`,
    },
    "Failed to send email draft."
  );
};

export const deleteOutboundEmail = async (id: string) => {
  return authRequest(
    {
      method: "DELETE",
      url: `/api/emails/outbound/${id}`,
    },
    "Failed to delete outbound email."
  );
};


