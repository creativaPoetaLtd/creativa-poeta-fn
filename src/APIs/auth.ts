import { authRequest, publicRequest } from "./client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  roleLabel?: string;
  accountStatus?: string;
}

export interface AuthenticatedResponse {
  token: string;
  user: AuthUser;
}

export interface MfaChallengeResponse {
  mfaRequired: true;
  mfaSetupRequired: boolean;
  challengeToken: string;
}

export type PrimaryAuthResponse = AuthenticatedResponse | MfaChallengeResponse;

export interface MfaSetupResponse {
  setupKey: string;
  qrCodeDataUrl: string;
  expiresAt: string;
}

export interface MfaSetupConfirmation extends AuthenticatedResponse {
  recoveryCodes: string[];
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
  return publicRequest<PrimaryAuthResponse>(
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
  return publicRequest<PrimaryAuthResponse>(
    {
      method: "POST",
      url: "/api/auth/password-reset/complete",
      data: { email, token, password, confirmPassword },
    },
    "Failed to reset password."
  );
};

export const startAdminMfaSetup = async (challengeToken: string) =>
  publicRequest<MfaSetupResponse>(
    { method: "POST", url: "/api/auth/mfa/setup", data: { challengeToken } },
    "Failed to start multi-factor authentication setup."
  );

export const confirmAdminMfaSetup = async (challengeToken: string, code: string) =>
  publicRequest<MfaSetupConfirmation>(
    { method: "POST", url: "/api/auth/mfa/setup/confirm", data: { challengeToken, code } },
    "Failed to confirm multi-factor authentication."
  );

export const verifyAdminMfa = async (
  challengeToken: string,
  values: { code?: string; recoveryCode?: string }
) =>
  publicRequest<AuthenticatedResponse & { recoveryCodeUsed?: boolean; recoveryCodesRemaining?: number }>(
    { method: "POST", url: "/api/auth/mfa/verify", data: { challengeToken, ...values } },
    "Failed to verify the authentication code."
  );

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
