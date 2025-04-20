import { create } from "zustand";
import { getAssignedCreators } from "../lib/api/Creator"; // API call to fetch assigned creators

const useCreatorStore = create((set) => ({
  assignedCreators: [], // Store assigned creators
  loading: false, // Loading state for fetching creators
  error: null, // Error state for any issues during API call

  fetchAssignedCreators: async () => {
    set({ loading: true, error: null }); // Reset error and set loading

    try {
      const result = await getAssignedCreators(); // API call
      console.log("Fetched result:", result);

      // Ensure the result is an object with a success flag and creators array
      if (result && result.success && Array.isArray(result.creators)) {
        set({
          assignedCreators: result.creators, // Update with fetched creators
          loading: false,
          error: null, // Clear error on success
        });
      } else {
        set({
          assignedCreators: [], // Ensure it's empty if the result isn't valid
          loading: false,
          error: result?.error || "Failed to fetch assigned creators", // Use error from API
        });
      }
    } catch (err) {
      set({
        assignedCreators: [], // Ensure this is empty on error
        loading: false,
        error: err.message || "Server error", // Show error message
      });
      console.error("Error fetching assigned creators:", err);
    }
  },
}));

export default useCreatorStore;
