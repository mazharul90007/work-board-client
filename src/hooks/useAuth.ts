import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../lib/api-client";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/useAuthStore";

//=====================Login============================
export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      //set user
      useAuthStore.getState().setUser(data.user);

      toast.success(`Welcome back, ${data.user.name || "User"}!`);
      router.replace("/dashboard");
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
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // 1. Clear Zustand store
      logoutStore();

      // 2. Notify and redirect
      toast.info("Logged out successfully");
      router.replace("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Logout failed. Try again.");
    },
  });
}
