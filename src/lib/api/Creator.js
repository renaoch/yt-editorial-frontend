import axios from "axios";

/**
 * Fetch creators assigned to the current editor.
 *
 * @returns {Promise<Object[]>} Array of creator objects
 */
export const getAssignedCreators = async () => {
  try {
    const res = await axios.get(
      "https://yt-editorial-backend.onrender.com/user/assigned-creators",
      { withCredentials: true }
    );

    if (res.data?.success && Array.isArray(res.data.creators)) {
      return res.data; // Already in { success: true, creators: [...] } format
    } else {
      throw new Error("Invalid response format.");
    }
  } catch (error) {
    console.error("❌ Failed to fetch assigned creators:", error);

    if (
      error?.response?.status === 404 &&
      error?.response?.data?.message === "No creators assigned"
    ) {
      console.log("No creators assigned to this editor.");
      return { success: true, creators: [] };
    }

    return {
      success: false,
      error: error?.response?.data || {
        message: "Failed to fetch assigned creators",
      },
    };
  }
};
