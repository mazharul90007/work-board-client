import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/useAuthStore";

// Define the shape of a queued request
interface FailedRequest {
  resolve: () => void;
  reject: (error: unknown) => void;
}

const api = axios.create({
  baseURL: "https://workboard-server-nestjs.onrender.com",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
// 1. Type the queue correctly
let failedQueue: FailedRequest[] = [];

// 2. Type the error and token in processQueue
const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
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
    if (originalRequest.url?.includes("/auth/login") || !error.response) {
      return Promise.reject(error);
    }

    // 401 Unauthorized means the Access Token is likely expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we don't have a user in Zustand, they aren't logged in at all
      const user = useAuthStore.getState().user;
      if (!user) {
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // This call works because the browser sends the 'refreshToken' cookie automatically
        // NestJS then responds with a 'Set-Cookie' for the new 'accessToken'
        await api.post("/auth/refresh-token");
        isRefreshing = false;
        processQueue(null);

        // Retry the original request (it will now include the new accessToken cookie)
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        // If refresh fails, the Refresh Token is expired too. Force Logout.
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
