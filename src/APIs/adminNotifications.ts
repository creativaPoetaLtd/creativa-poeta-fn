import { authRequest } from "./client";

export type AdminNotificationStatus = "new" | "read" | "resolved" | "archived";
export type AdminNotificationType = "password_reset";

export interface AdminNotification {
  _id: string;
  id?: string;
  type: AdminNotificationType;
  status: AdminNotificationStatus;
  title: string;
  message?: string;
  targetEmail?: string;
  targetName?: string;
  resolvedByEmail?: string;
  resolvedByName?: string;
  resolvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getAdminNotifications = async (status = "active") =>
  authRequest<{ notifications: AdminNotification[] }>(
    {
      method: "GET",
      url: "/api/admin-notifications",
      params: { status },
    },
    "Failed to fetch notifications."
  );

export const getAdminNotificationSummary = async () =>
  authRequest<{ metrics: { new: number; open: number } }>(
    {
      method: "GET",
      url: "/api/admin-notifications/summary",
    },
    "Failed to fetch notification summary."
  );

export const markAdminNotificationRead = async (id: string) =>
  authRequest<{ notification: AdminNotification }>(
    {
      method: "PATCH",
      url: `/api/admin-notifications/${id}/read`,
    },
    "Failed to mark notification as read."
  );

export const resolvePasswordResetNotification = async (id: string) =>
  authRequest<{ message: string; resetLink: string; notification: AdminNotification }>(
    {
      method: "POST",
      url: `/api/admin-notifications/${id}/resolve-password-reset`,
    },
    "Failed to generate reset link."
  );

export const archiveAdminNotification = async (id: string) =>
  authRequest<{ notification: AdminNotification }>(
    {
      method: "PATCH",
      url: `/api/admin-notifications/${id}/archive`,
    },
    "Failed to archive notification."
  );
