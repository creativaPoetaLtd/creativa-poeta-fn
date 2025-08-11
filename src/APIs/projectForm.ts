import axios from "axios";

const BASE_URL = "https://creativapoeta-bn.onrender.com/api/project";

// Public endpoint for project inquiries
export const projectForm = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-inquiry`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to submit project inquiry"
      );
    }
    throw error;
  }
};

// Admin endpoints for project management
export const getProjects = async (page = 1, limit = 10, status = "all") => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}`, {
      params: { page, limit, status },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Token is invalid/expired - clear storage and redirect to secure login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/secure-admin-login-2024";
      throw new Error("Session expired. Please login again.");
    }
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
    throw error;
  }
};

export const updateProjectStatus = async (
  projectId: string,
  status: string
) => {
  try {
    const token = localStorage.getItem("token");
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/secure-admin-login-2024";
      throw new Error("Session expired. Please login again.");
    }
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update project status"
      );
    }
    throw error;
  }
};

export const replyToProject = async (
  projectId: string,
  replyMessage: string,
  subject: string
) => {
  try {
    const token = localStorage.getItem("token");
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/secure-admin-login-2024";
      throw new Error("Session expired. Please login again.");
    }
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to send reply");
    }
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/secure-admin-login-2024";
      throw new Error("Session expired. Please login again.");
    }
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete project"
      );
    }
    throw error;
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/secure-admin-login-2024";
      throw new Error("Session expired. Please login again.");
    }
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch project"
      );
    }
    throw error;
  }
};
