import axios, { AxiosError } from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:5173",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

//Global Error Handler
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Only mark unauthorized, do NOT redirect here
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/logout")
    ) {
      console.warn("Unauthorized request:", error.config?.url);
    }

    return Promise.reject(error);
  }
);

export default api;
