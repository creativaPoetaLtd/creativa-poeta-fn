import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface MailboxAccess {
  address: string;
  permission: "read" | "send" | "manage";
  type: "personal" | "shared";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleLabel?: string;
  accountStatus?: string;
  mailboxAccess?: MailboxAccess[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated
  const checkAuth = (): boolean => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!storedToken || !storedUser) {
      return false;
    }

    try {
      // Validate token format (basic check)
      if (storedToken.length < 10) {
        return false;
      }

      // Parse and validate user data
      const userData = JSON.parse(storedUser);
      if (!userData.id || !userData.email) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return false;
    }
  };

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);

          // Validate required user fields
          if (userData.id && userData.email) {
            setToken(storedToken);
            setUser(userData);
          } else {
            // Invalid user data, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          // Clear corrupted data
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (newToken: string, userData: User) => {
    if (!newToken || !userData || !userData.id || !userData.email) {
      throw new Error("Invalid login credentials provided");
    }

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);

    // Redirect to secure login page
    navigate("/secure-admin-login-2024", { replace: true });
  };

  // Auto-logout on storage changes (multiple tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        if (!e.newValue) {
          // Token or user was removed, logout
          setToken(null);
          setUser(null);
          navigate("/secure-admin-login-2024", { replace: true });
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!(token && user),
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


