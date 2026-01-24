import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/useAuthStore";

// Define the shape of a queued request
interface FailedRequest {
  resolve: (token?: string | null) => void;
  reject: (error: unknown) => void;
}

const api = axios.create({
  baseURL: "http://localhost:5173",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
// 1. Type the queue correctly
let failedQueue: FailedRequest[] = [];

// 2. Type the error and token in processQueue
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 3. Type originalRequest as Axios request config
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If the request was for login, don't try to refresh tokens.
    // Just throw the error immediately!
    if (originalRequest.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      const user = useAuthStore.getState().user;
      if (!user) {
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");
        isRefreshing = false;
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        useAuthStore.getState().logout();
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
