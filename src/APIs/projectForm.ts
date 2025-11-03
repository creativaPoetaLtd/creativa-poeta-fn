import axios from "axios";

const BASE_URL = "https://creativa-poeta-bn-phi.vercel.app/api/project";

// Helper function to handle auth errors gracefully
const handleAuthError = (error: any) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    // Check if the error is specifically about token signature/expiration
    const errorMessage = error.response?.data?.message || "";

    if (
      errorMessage.includes("signature") ||
      errorMessage.includes("expired")
    ) {
      // Only clear storage and redirect for genuine token issues
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Use a more gentle approach - don't immediately redirect
      console.warn(
        "Authentication token expired. Please refresh and login again."
      );
      throw new Error(
        "Session expired. Please refresh the page and login again."
      );
    } else {
      // For other 401 errors, just throw without auto-logout
      throw new Error(
        errorMessage || "Authentication failed. Please try again."
      );
    }
  }

  if (axios.isAxiosError(error)) {
    throw new Error(
      error.response?.data?.message || "Request failed. Please try again."
    );
  }
  throw error;
};

// Public endpoint for project inquiries
export const projectForm = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-inquiry`, data);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

// Admin endpoints for project management
export const getProjects = async (page = 1, limit = 10, status = "all") => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    const response = await axios.get(`${BASE_URL}`, {
      params: { page, limit, status },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const updateProjectStatus = async (
  projectId: string,
  status: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    const response = await axios.put(
      `${BASE_URL}/${projectId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const replyToProject = async (
  projectId: string,
  replyMessage: string,
  subject: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    const response = await axios.post(
      `${BASE_URL}/${projectId}/reply`,
      { replyMessage, subject },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    const response = await axios.delete(`${BASE_URL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    const response = await axios.get(`${BASE_URL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};
