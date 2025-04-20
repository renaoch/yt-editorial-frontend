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
    if (get().hasCheckedAuth) return;
    set({ isLoading: true });

    try {
      const user = await checkUser();
      if (user) {
        set({ user, role: user.role });
      } else {
        set({ user: null, role: null });
      }
    } catch (err) {
      set({ error: "Failed to check user status" });
    } finally {
      set({ isLoading: false, hasCheckedAuth: true });
    }
  },

  logout: async () => {
    await logoutUser();
    set({ user: null, role: null, hasCheckedAuth: false });
  },
}));
