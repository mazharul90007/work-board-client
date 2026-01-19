import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logginUser } from "../interfaces/auth.interface";

interface AuthState {
  user: logginUser | null;
  setUser: (user: logginUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
