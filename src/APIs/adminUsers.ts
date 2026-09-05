import { authRequest } from "./client";

export type AdminRole =
  | "super_admin"
  | "admin_0"
  | "admin_1"
  | "admin_2"
  | "admin_3"
  | "admin_4"
  | "admin_5";

export type AccountStatus = "pending" | "active" | "disabled";
export type MailboxPermission = "read" | "send" | "manage";
export type MailboxType = "personal" | "shared";

export type AdminPermission =
  | "dashboard:read"
  | "requests:projects"
  | "requests:visibility"
  | "requests:assistance"
  | "requests:partnerships"
  | "referrals:read"
  | "referrals:manage"
  | "partners:approve"
  | "rewards:read"
  | "rewards:approve"
  | "rewards:pay"
  | "referrals:settings"
  | "contacts:read"
  | "contacts:reply"
  | "whatsapp:read"
  | "whatsapp:reply"
  | "whatsapp:manage"
  | "email:read"
  | "email:send"
  | "email:manage"
  | "blogs:manage"
  | "seo:manage"
  | "jobs:manage"
  | "users:manage"
  | "internal:messages"
  | "reports:read"
  | "analytics:read";

export interface MailboxAccess {
  address: string;
  permission: MailboxPermission;
  type: MailboxType;
}

export interface AdminUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: AdminRole;
  roleLabel?: string;
  permissions?: AdminPermission[];
  permissionsAllow?: AdminPermission[];
  permissionsDeny?: AdminPermission[];
  internalGroups?: string[];
  isActive: boolean;
  accountStatus?: AccountStatus;
  mailboxAccess?: MailboxAccess[];
  createdAt?: string;
  protectedArchiveAccess?: boolean;
}

export interface CreateAdminPayload {
  name: string;
  email: string;
  role: Exclude<AdminRole, "super_admin">;
  mailboxAccess?: MailboxAccess[];
  permissionsAllow?: AdminPermission[];
  permissionsDeny?: AdminPermission[];
}

export interface UpdateAdminPayload {
  name?: string;
  role?: Exclude<AdminRole, "super_admin">;
  isActive?: boolean;
  mailboxAccess?: MailboxAccess[];
  permissionsAllow?: AdminPermission[];
  permissionsDeny?: AdminPermission[];
}

export const getAdminUsers = async () => {
  return authRequest<{ users: AdminUser[] }>(
    {
      method: "GET",
      url: "/api/auth/admins",
    },
    "Failed to fetch admin users."
  );
};

export const createAdminUser = async (data: CreateAdminPayload) => {
  return authRequest<{ user: AdminUser; message: string }>(
    {
      method: "POST",
      url: "/api/auth/admins",
      data,
    },
    "Failed to create admin user."
  );
};

export const updateAdminUser = async (id: string, data: UpdateAdminPayload) => {
  return authRequest<{ user: AdminUser; message: string }>(
    {
      method: "PATCH",
      url: `/api/auth/admins/${id}`,
      data,
    },
    "Failed to update admin user."
  );
};

export const createAdminPasswordResetLink = async (id: string) => {
  return authRequest<{ message: string; resetLink: string }>(
    {
      method: "POST",
      url: `/api/auth/admins/${id}/reset-password`,
    },
    "Failed to create password reset link."
  );
};

export const deleteAdminUser = async (id: string) => {
  return authRequest<{ message: string }>(
    {
      method: "DELETE",
      url: `/api/auth/admins/${id}`,
    },
    "Failed to delete admin user."
  );
};

export const setAdminProtectedArchiveAccess = async (id: string, enabled: boolean) => {
  return authRequest<{ user: AdminUser; message: string }>(
    {
      method: "PATCH",
      url: `/api/auth/admins/${id}/trash-access`,
      data: { enabled },
    },
    "Failed to update protected archive access."
  );
};
