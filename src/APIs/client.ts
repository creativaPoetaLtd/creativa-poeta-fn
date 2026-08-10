import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { trackApiError } from "../analytics/analytics";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "https://creativa-poeta-bn-phi.vercel.app";

export const getAuthToken = () => localStorage.getItem("token");

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      fallback
    );
  }

  if (error instanceof Error) return error.message;
  return fallback;
};

export const publicRequest = async <T = unknown>(
  config: AxiosRequestConfig,
  fallbackMessage = "Request failed. Please try again."
): Promise<T> => {
  try {
    const requestUrl = config.url ?? "";
    const response: AxiosResponse<T> = await axios({
      ...config,
      url: /^https?:\/\//i.test(requestUrl)
        ? requestUrl
        : `${API_BASE_URL}${requestUrl}`,
    });
    return response.data;
  } catch (error) {
    trackApiError(String(config.url || "unknown"), axios.isAxiosError(error) ? error.response?.status : undefined);
    throw new Error(getErrorMessage(error, fallbackMessage));
  }
};

export const authRequest = async <T = unknown>(
  config: AxiosRequestConfig,
  fallbackMessage = "Request failed. Please try again."
): Promise<T> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found. Please login.");
  }

  try {
    const response: AxiosResponse<T> = await axios({
      ...config,
      url: `${API_BASE_URL}${config.url}`,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    trackApiError(String(config.url || "unknown"), axios.isAxiosError(error) ? error.response?.status : undefined);
    if (axios.isAxiosError(error) && [401, 403].includes(error.response?.status ?? 0)) {
      clearAuthSession();
      if (!window.location.pathname.includes("login")) {
        window.location.href = "/secure-admin-login-2024";
      }
      throw new Error("Session expired. Please login again.");
    }

    throw new Error(getErrorMessage(error, fallbackMessage));
  }
};
