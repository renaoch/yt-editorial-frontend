import axios from "axios";

/**
 * Send a message from the current user to another user.
 *
 * @param {string|number} receiverId - ID of the message recipient
 * @param {string} content - The message content
 * @returns {Promise<Object>} Sent message object
 */
// Send message function with created_at timestamp
export const sendMessage = async (receiverId, content) => {
  try {
    const res = await axios.post(
      "https://yt-editorial-backend.onrender.com/message/send",
      {
        receiverId,
        messageText: content,
      },
      {
        withCredentials: true, // ensures session/cookie auth is sent
      }
    );
    console.log("res data: ", res.data);
    if (res.data && res.data.data) {
      return res.data.data; // Ensure data contains created_at
    } else {
      throw new Error("Invalid response format from sendMessage.");
    }
  } catch (error) {
    console.error("❌ Failed to send message:", error);
    throw error?.response?.data || { message: "Failed to send message" };
  }
};

// Fetch messages with created_at handling
export const getMessages = async (receiverId) => {
  try {
    const res = await axios.get(`https://yt-editorial-backend.onrender.com/message/${receiverId}`, {
      withCredentials: true,
    });

    if (res.data && Array.isArray(res.data.messages)) {
      return res.data.messages.map((msg) => ({
        ...msg,
        created_at: new Date(msg.created_at), // Ensure created_at is a Date object
      }));
    } else {
      throw new Error("Invalid response format from getMessages.");
    }
  } catch (error) {
    console.error("❌ Failed to fetch messages:", error);
    throw error?.response?.data || { message: "Failed to fetch messages" };
  }
};
