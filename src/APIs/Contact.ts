import axios from "axios";

const BASE_URL = "https://creativapoeta-bn.onrender.com/api/contact";

// Public endpoint for contact form submission
export const contactUs = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/send`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to submit contact form"
      );
    }
    throw error;
  }
};

// Admin endpoints for contact management

// Get all contact queries (admin only)
export const getContactQueries = async (
  page = 1,
  limit = 10,
  status = "all"
) => {
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
        error.response?.data?.message || "Failed to fetch contact queries"
      );
    }
    throw error;
  }
};

// Get single contact query (admin only)
export const getContactQuery = async (queryId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/${queryId}`, {
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
        error.response?.data?.message || "Failed to fetch contact query"
      );
    }
    throw error;
  }
};

// Reply to contact query (admin only)
export const replyToContactQuery = async (
  queryId: string,
  replyMessage: string,
  subject: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/${queryId}/reply`,
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

// Update contact query status (admin only)
export const updateContactQueryStatus = async (
  queryId: string,
  status: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/${queryId}/status`,
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
        error.response?.data?.message || "Failed to update query status"
      );
    }
    throw error;
  }
};

// Delete contact query (admin only)
export const deleteContactQuery = async (queryId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/${queryId}`, {
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
        error.response?.data?.message || "Failed to delete contact query"
      );
    }
    throw error;
  }
};
