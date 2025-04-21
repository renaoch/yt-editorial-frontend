// src/store/useAuthStore.js
import { create } from "zustand";
import { checkUser, logoutUser } from "../lib/api/User";

export const useAuthStore = create((set, get) => ({
  user: null,
  role: null,
  isLoading: false,
  error: null,
  hasCheckedAuth: false,

  checkUserStatus: async () => {
    const { isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true });

    try {
      const user = await checkUser();
      if (user) {
        set({ user, role: user.role, error: null });
      } else {
        set({ user: null, role: null, error: null });
      }
    } catch (err) {
      console.error("checkUserStatus error:", err);
      set({
        error: err.message || "Failed to check user status",
        user: null,
        role: null,
      });
    } finally {
      set({ isLoading: false, hasCheckedAuth: true });
    }
  },

  logout: async () => {
    await logoutUser();
    set({ user: null, role: null, hasCheckedAuth: false, error: null });
  },
}));
