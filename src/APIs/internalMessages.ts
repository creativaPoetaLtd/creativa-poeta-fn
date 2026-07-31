import { authRequest } from "./client";

export interface InternalMessage {
  _id?: string;
  id?: string;
  body: string;
  senderEmail: string;
  senderName: string;
  readByEmails?: string[];
  createdAt: string;
}

export interface InternalConversation {
  _id?: string;
  id?: string;
  title: string;
  type: "group" | "direct" | "custom";
  groupKey?: string;
  participantEmails: string[];
  createdByEmail: string;
  messages: InternalMessage[];
  lastMessage?: InternalMessage | null;
  unreadCount: number;
  lastMessageAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getInternalConversations = async () =>
  authRequest<{ conversations: InternalConversation[] }>(
    {
      method: "GET",
      url: "/api/internal-messages",
    },
    "Failed to load internal messages."
  );

export const getInternalMessageSummary = async () =>
  authRequest<{ metrics: { total: number; unread: number } }>(
    {
      method: "GET",
      url: "/api/internal-messages/summary",
    },
    "Failed to load internal message summary."
  );

export const createInternalConversation = async (data: {
  title: string;
  participantEmails: string[];
  body?: string;
}) =>
  authRequest<{ conversation: InternalConversation }>(
    {
      method: "POST",
      url: "/api/internal-messages",
      data,
    },
    "Failed to create internal conversation."
  );

export const sendInternalMessage = async (id: string, body: string) =>
  authRequest<{ conversation: InternalConversation }>(
    {
      method: "POST",
      url: `/api/internal-messages/${id}/messages`,
      data: { body },
    },
    "Failed to send internal message."
  );

export const markInternalConversationRead = async (id: string) =>
  authRequest<{ conversation: InternalConversation }>(
    {
      method: "PATCH",
      url: `/api/internal-messages/${id}/read`,
    },
    "Failed to update internal conversation."
  );
