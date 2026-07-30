import { authRequest, publicRequest } from "./client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  roleLabel?: string;
  accountStatus?: string;
}

export const checkAdminActivation = async (email: string) => {
  return publicRequest<{ message: string; user: AuthUser }>(
    {
      method: "POST",
      url: "/api/auth/activate/check",
      data: { email },
    },
    "Failed to check admin account."
  );
};

export const activateAdminAccount = async (email: string, password: string, confirmPassword: string) => {
  return publicRequest<{ token: string; user: AuthUser }>(
    {
      method: "POST",
      url: "/api/auth/activate",
      data: { email, password, confirmPassword },
    },
    "Failed to activate admin account."
  );
};

export const requestAdminPasswordReset = async (email: string) => {
  return publicRequest<{ message: string }>(
    {
      method: "POST",
      url: "/api/auth/password-reset/request",
      data: { email },
    },
    "Failed to request password reset."
  );
};

export const completeAdminPasswordReset = async (
  email: string,
  token: string,
  password: string,
  confirmPassword: string
) => {
  return publicRequest<{ token: string; user: AuthUser }>(
    {
      method: "POST",
      url: "/api/auth/password-reset/complete",
      data: { email, token, password, confirmPassword },
    },
    "Failed to reset password."
  );
};

export const changeAdminPassword = async (
  currentPassword: string,
  password: string,
  confirmPassword: string
) => {
  return authRequest<{ message: string }>(
    {
      method: "POST",
      url: "/api/auth/change-password",
      data: { currentPassword, password, confirmPassword },
    },
    "Failed to change password."
  );
};
