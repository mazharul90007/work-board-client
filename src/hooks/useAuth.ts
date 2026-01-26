import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../lib/api-client";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/useAuthStore";

//=====================Login============================
export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      //set user
      setUser(data.user);

      toast.success(`Welcome back, ${data.user.name || "User"}!`);
      // Hard redirect to ensure Middleware detects the new httpOnly cookie
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Check your credentials.",
      );
    },
  });
}

//===========================Logout==========================
export function useLogout() {
  const logoutStore = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear Zustand store
      logoutStore();

      // Notify and redirect
      toast.info("Logged out successfully");

      // Hard redirect to clear any cached states/cookies
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Logout failed. Try again.");
    },
  });
}
