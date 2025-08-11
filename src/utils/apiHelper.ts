import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Helper function to handle authenticated API requests
export const authenticatedApiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    // Add authorization header to the request
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<T> = await axios(requestConfig);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle authentication errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Clear invalid tokens and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Only redirect if we're not already on the login page
        if (!window.location.pathname.includes("login")) {
          window.location.href = "/secure-admin-login-2024";
        }

        throw new Error("Session expired. Please login again.");
      }

      // Handle other API errors
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "API request failed";
      throw new Error(message);
    }

    // Handle network errors
    if (error instanceof Error) {
      throw new Error(`Network error: ${error.message}`);
    }

    throw new Error("An unexpected error occurred");
  }
};

// Helper function for non-authenticated requests
export const publicApiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "API request failed";
      throw new Error(message);
    }

    if (error instanceof Error) {
      throw new Error(`Network error: ${error.message}`);
    }

    throw new Error("An unexpected error occurred");
  }
};
