import { authRequest } from "./client";

export type WhatsAppConversationStatus =
  | "open"
  | "waiting"
  | "resolved"
  | "closed"
  | "spam";

export interface WhatsAppActivity {
  _id?: string;
  type: "assigned" | "released" | "status" | "note" | "inbound" | "outbound";
  message: string;
  actorEmail?: string;
  actorName?: string;
  at: string;
}

export interface WhatsAppConversation {
  _id: string;
  conversationKey: string;
  waId: string;
  phoneNumberId: string;
  displayPhoneNumber?: string;
  displayName?: string;
  status: WhatsAppConversationStatus;
  unreadCount: number;
  lastMessagePreview?: string;
  lastMessageAt?: string;
  lastDirection?: "inbound" | "outbound";
  lastInboundAt?: string;
  lastOutboundAt?: string;
  serviceWindowExpiresAt?: string;
  assignedToEmail?: string;
  assignedToName?: string;
  assignedAt?: string;
  activity?: WhatsAppActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface WhatsAppMessage {
  _id: string;
  providerMessageId: string;
  contextMessageId?: string;
  direction: "inbound" | "outbound";
  type: string;
  text?: string;
  status: "received" | "queued" | "sent" | "delivered" | "read" | "failed";
  from: string;
  to: string;
  providerTimestamp?: string;
  mediaId?: string;
  mediaMimeType?: string;
  mediaFilename?: string;
  mediaCaption?: string;
  errorCode?: string;
  errorMessage?: string;
  sentByEmail?: string;
  sentByName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WhatsAppSummary {
  configured: boolean;
  metrics: {
    open: number;
    waiting: number;
    unread: number;
    unassigned: number;
    assignedToMe: number;
    resolved: number;
    spam: number;
    attention: number;
  };
}

export interface WhatsAppConversationsResponse {
  configured: boolean;
  conversations: WhatsAppConversation[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalConversations: number;
    limit: number;
  };
}

export const getWhatsAppSummary = () =>
  authRequest<WhatsAppSummary>(
    { method: "GET", url: "/api/whatsapp/summary" },
    "Failed to fetch WhatsApp summary."
  );

export const getWhatsAppConversations = (params: {
  page?: number;
  limit?: number;
  status?: WhatsAppConversationStatus | "all";
  owner?: "all" | "mine" | "unassigned";
  search?: string;
}) =>
  authRequest<WhatsAppConversationsResponse>(
    { method: "GET", url: "/api/whatsapp/conversations", params },
    "Failed to fetch WhatsApp conversations."
  );

export const getWhatsAppConversation = (id: string) =>
  authRequest<{
    configured: boolean;
    conversation: WhatsAppConversation;
    messages: WhatsAppMessage[];
  }>(
    { method: "GET", url: `/api/whatsapp/conversations/${id}` },
    "Failed to fetch WhatsApp conversation."
  );

export const claimWhatsAppConversation = (id: string) =>
  authRequest<{ message: string; conversation: WhatsAppConversation }>(
    { method: "POST", url: `/api/whatsapp/conversations/${id}/claim` },
    "Failed to assign WhatsApp conversation."
  );

export const releaseWhatsAppConversation = (id: string) =>
  authRequest<{ message: string; conversation: WhatsAppConversation }>(
    { method: "POST", url: `/api/whatsapp/conversations/${id}/release` },
    "Failed to release WhatsApp conversation."
  );

export const updateWhatsAppConversationStatus = (
  id: string,
  status: WhatsAppConversationStatus
) =>
  authRequest<{ message: string; conversation: WhatsAppConversation }>(
    { method: "PATCH", url: `/api/whatsapp/conversations/${id}/status`, data: { status } },
    "Failed to update WhatsApp conversation status."
  );

export const addWhatsAppConversationNote = (id: string, note: string) =>
  authRequest<{ message: string; conversation: WhatsAppConversation }>(
    { method: "POST", url: `/api/whatsapp/conversations/${id}/notes`, data: { note } },
    "Failed to add the internal note."
  );

export const replyToWhatsAppConversation = (id: string, message: string) =>
  authRequest<{
    message: string;
    conversation: WhatsAppConversation;
    sentMessage: WhatsAppMessage;
  }>(
    { method: "POST", url: `/api/whatsapp/conversations/${id}/reply`, data: { message } },
    "Failed to send the WhatsApp reply."
  );
