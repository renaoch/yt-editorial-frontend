import axios from "axios";
import useSelectedUserStore from "../../store/useSelectedUserStore";

/**
 * Create a new task and assign to an editor
 *
 * @param {Object} taskData - Task creation payload
 * @param {string} taskData.title - Task title
 * @param {string} [taskData.description] - Optional description
 * @param {string} [taskData.editorId] - Optional editor ID
 * @param {string} [taskData.status] - Task status (default: 'pending')
 * @param {Date} [taskData.deadline] - Optional deadline (Date object)
 * @returns {Promise<Object>} Created task object
 */
export const createTask = async ({
  title,
  description,
  editorId,
  status = "pending",
  deadline,
}) => {
  const { selectedUser } = useSelectedUserStore.getState();

  try {
    const res = await axios.post(
      "https://yt-editorial-backend.onrender.com/user/create-task",
      {
        title,
        description,
        editorId,
        status,
        deadline: deadline?.toISOString() ?? null,
      },
      {
        withCredentials: true,
      }
    );

    return res.data.task;
  } catch (err) {
    console.error("❌ Task creation failed:", err);
    throw new Error(err.response?.data?.message || "Failed to create task");
  }
};
export const getTasks = async () => {
  try {
    const res = await axios.get("https://yt-editorial-backend.onrender.com/user/get-task", {
      withCredentials: true,
    });
    console.log("helllo from api res.data", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch tasks:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch tasks");
  }
};
