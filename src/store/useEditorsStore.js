import { create } from "zustand";
import {
  getAllEditors,
  assignEditor,
  getAssignedEditors,
} from "../lib/api/User";

const useEditorStore = create((set) => ({
  editors: [],
  assignedEditors: [],
  loading: false,
  assignLoading: false,
  error: null,

  // Fetch all editors (for creators to assign)
  fetchEditors: async () => {
    set({ loading: true, error: null });

    const result = await getAllEditors();

    if (result && result.editors) {
      set({ editors: result.editors, loading: false });
    } else {
      set({
        editors: [],
        loading: false,
        error: "Failed to load editors",
      });
    }
  },

  // Fetch editors already assigned to the current creator
    fetchAssignedEditors: async () => {
      set({ loading: true, error: null });

      const result = await getAssignedEditors();

      if (result && result.editors) {
        set({ assignedEditors: result.editors, loading: false });
      } else {
        set({
          assignedEditors: [],
          loading: false,
          error: "Failed to load assigned editors",
        });
      }
    },
}));

export default useEditorStore;
