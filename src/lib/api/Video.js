import axios from "axios";
import useSelectedUserStore from "../../store/useSelectedUserStore";

/**
 * Uploads a video file along with its metadata to the server.
 */
export const uploadVideo = async ({
  file,
  title,
  description,
  tags,
  notes,
  taskId,
  onUploadProgress,
}) => {
  const { selectedUser } = useSelectedUserStore.getState();
  const creatorId = selectedUser?._id;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("description", description);
  if (creatorId) formData.append("creatorId", creatorId);
  if (tags?.length) formData.append("tags", JSON.stringify(tags));
  if (notes) formData.append("notes", notes);
  if (taskId) formData.append("task_id", taskId);

  try {
    const response = await axios.post(
      "https://yt-editorial-backend.onrender.com/upload/upload-video",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        onUploadProgress,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Video upload failed:", error);

    const serverError = error?.response?.data || {};
    throw {
      message: serverError.message || "Unknown error occurred during upload",
      status: error?.response?.status || 500,
    };
  }
};

/**
 * Uploads video to YouTube.
 */
export const uploadToYouTube = async ({
  r2PresignedUrl,
  title,
  description,
  privacyStatus = "unlisted",
}) => {
  try {
    const response = await axios.post(
      "https://yt-editorial-backend.onrender.com/upload/upload-youtube",
      {
        r2PresignedUrl,
        title,
        description,
        privacyStatus,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("YouTube upload failed:", error);
    const serverError = error?.response?.data || {};
    throw {
      message: serverError.message || "YouTube upload failed",
      status: error?.response?.status || 500,
    };
  }
};

/**
 * Fetches video versions based on a task ID.
 *
 * @param {string} taskId - The task ID to fetch versions for.
 * @returns {Promise<Object[]>} - Array of video version objects.
 */
export const fetchVideoVersions = async (taskId) => {
  try {
    const response = await axios.post(
      "https://yt-editorial-backend.onrender.com/upload/video-versions",
      { taskId },
      { withCredentials: true }
    );

    return response.data.versions;
  } catch (error) {
    console.error("Failed to fetch video versions:", error);
    const serverError = error?.response?.data || {};
    throw {
      message: serverError.message || "Failed to fetch video versions",
      status: error?.response?.status || 500,
    };
  }
};
