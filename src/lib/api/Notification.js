import axios from "axios";

// Function to fetch notifications from backend API
export const fetchNotifications = async () => {
  try {
    const response = await axios.get(
      "https://yt-editorial-backend.onrender.com/notify/notifications",
      { withCredentials: true }
    ); // Your backend endpoint for notifications
    return response.data; // Assuming your backend returns { notifications: [...] }
  } catch (error) {
    console.error("Error fetching notifications", error);
    throw error;
  }
};

// Function to mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.patch(
      `https://yt-editorial-backend.onrender.com/notify/notifications/${notificationId}/read`,
      {}, // Empty object as no data is needed in the body
      { withCredentials: true }
    ); // Your backend endpoint to mark the notification as read
    return response.data; // Assuming your backend returns { success: true }
  } catch (error) {
    console.error("Error marking notification as read", error);
    throw error;
  }
};
