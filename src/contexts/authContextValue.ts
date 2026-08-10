import { createContext } from "react";

export interface MailboxAccess {
  address: string;
  permission: "read" | "send" | "manage";
  type: "personal" | "shared";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleLabel?: string;
  accountStatus?: string;
  mailboxAccess?: MailboxAccess[];
  permissions?: string[];
  permissionsAllow?: string[];
  permissionsDeny?: string[];
  internalGroups?: string[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
