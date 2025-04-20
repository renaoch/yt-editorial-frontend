import { create } from "zustand";
import { fetchNotifications } from "../lib/api/Notification";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  fetchAndSetNotifications: async () => {
    try {
      const data = await fetchNotifications();
      if (data?.notifications) {
        set({ notifications: data.notifications });
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  },
  markRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
  },
}));
