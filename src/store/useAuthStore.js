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
    // If already checking, don't trigger again
    if (get().isLoading) return;

    set({ isLoading: true });

    try {
      const user = await checkUser();
      if (user) {
        set({ user, role: user.role, error: null });
      } else {
        set({ user: null, role: null, error: null });
      }
    } catch (err) {
      set({ error: err.message || "Failed to check user status" });
      // Retry the check if error occurs
      setTimeout(() => get().checkUserStatus(), 2000); // Retry after 2 seconds
    } finally {
      // If request completes (success or failure), set loading to false
      set({ isLoading: false, hasCheckedAuth: true });
    }
  },

  logout: async () => {
    await logoutUser();
    set({ user: null, role: null, hasCheckedAuth: false, error: null });
  },
}));
