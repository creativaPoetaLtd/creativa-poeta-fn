import { authRequest } from "./client";

export type TrashEntityType =
  | "admin_user"
  | "blog"
  | "blog_comment"
  | "project_request"
  | "contact_query"
  | "partnership_request"
  | "referral_partner"
  | "referral_lead"
  | "job_application"
  | "inbound_email"
  | "outbound_email"
  | "job"
  | "referral_reward"
  | "admin_notification"
  | "internal_conversation"
  | "whatsapp_conversation"
  | "whatsapp_message";

export interface TrashItem {
  _id: string;
  entityType: TrashEntityType;
  originalId: string;
  label: string;
  deletedByEmail?: string;
  deletedByName?: string;
  deletedAt: string;
}

export interface TrashListResponse {
  items: TrashItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  entityTypes: TrashEntityType[];
}

export interface AuditEvent {
  _id: string;
  entityType: string;
  entityId: string;
  action: "create" | "update" | "delete" | "restore" | "purge" | "rollback";
  changedPaths: string[];
  actorEmail?: string;
  actorName?: string;
  actorRole?: string;
  createdAt: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  canRollback?: boolean;
}

export interface AuditListResponse {
  events: AuditEvent[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export const getTrashItems = async (params?: {
  page?: number;
  limit?: number;
  entityType?: string;
  search?: string;
}) =>
  authRequest<TrashListResponse>(
    { method: "GET", url: "/api/trash", params },
    "Failed to load deleted items."
  );

export const probeProtectedArchiveAccess = async () => {
  await getTrashItems({ page: 1, limit: 1 });
  return true;
};

export const restoreTrashItem = async (item: Pick<TrashItem, "entityType" | "originalId">) =>
  authRequest<{ message: string }>(
    { method: "POST", url: `/api/trash/${encodeURIComponent(item.entityType)}/${encodeURIComponent(item.originalId)}/restore` },
    "Failed to restore the item."
  );

export const permanentlyDeleteTrashItem = async (item: Pick<TrashItem, "entityType" | "originalId">) =>
  authRequest<{ message: string }>(
    { method: "DELETE", url: `/api/trash/${encodeURIComponent(item.entityType)}/${encodeURIComponent(item.originalId)}` },
    "Failed to permanently delete the item."
  );

export const getAuditHistory = async (item: Pick<TrashItem, "entityType" | "originalId">) =>
  authRequest<{ events: AuditEvent[] }>(
    { method: "GET", url: `/api/trash/${encodeURIComponent(item.entityType)}/${encodeURIComponent(item.originalId)}/history` },
    "Failed to load the audit history."
  );

export const getSecurityAuditEvents = async (params?: {
  page?: number;
  limit?: number;
  entityType?: string;
  action?: string;
  search?: string;
}) => authRequest<AuditListResponse>(
  { method: "GET", url: "/api/trash/audit", params },
  "Failed to load the security history."
);

export const rollbackAuditEvent = async (
  item: Pick<TrashItem, "entityType" | "originalId">,
  eventId: string
) => authRequest<{ message: string }>(
  { method: "POST", url: `/api/trash/${encodeURIComponent(item.entityType)}/${encodeURIComponent(item.originalId)}/rollback/${encodeURIComponent(eventId)}` },
  "Failed to restore the previous version."
);
