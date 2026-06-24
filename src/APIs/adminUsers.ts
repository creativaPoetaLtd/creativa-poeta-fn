import { authRequest } from "./client";

export type AdminRole = "super_admin" | "admin" | "editor" | "viewer";

export interface AdminUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt?: string;
}

export interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
}

export interface UpdateAdminPayload {
  name?: string;
  role?: AdminRole;
  isActive?: boolean;
  password?: string;
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

export const deleteAdminUser = async (id: string) => {
  return authRequest<{ message: string }>(
    {
      method: "DELETE",
      url: `/api/auth/admins/${id}`,
    },
    "Failed to delete admin user."
  );
};
