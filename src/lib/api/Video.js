import axios from "axios";
import useSelectedUserStore from "../../store/useSelectedUserStore";

/**
 * Uploads a video file along with its metadata to the server.
 *
 * @param {Object} params - Upload parameters
 * @param {File} params.file - The video file
 * @param {string} params.title - Title of the video
 * @param {string} params.description - Description of the video
 * @param {string[]} [params.tags] - Optional array of tags
 * @param {string} [params.notes] - Optional notes string
 * @param {function} [params.onUploadProgress] - Optional progress callback
 *
 * @returns {Promise<Object>} - Response data from the server
 */
export const uploadVideo = async ({
  file,
  title,
  description,
  tags,
  notes,
  taskId, // Accept task_id as a parameter
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
  if (taskId) formData.append("task_id", taskId); // Append task_id here

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
    console.error("❌ Video upload failed:", error);

    const serverError = error?.response?.data || {};
    throw {
      message: serverError.message || "Unknown error occurred during upload",
      status: error?.response?.status || 500,
    };
  }
};

// Function to upload video to YouTube (Creator role)
export const uploadToYouTube = async ({
  r2PresignedUrl, // The presigned URL from Cloudflare
  title,
  description,
  privacyStatus = "unlisted", // Optional, default is 'unlisted'
}) => {
  try {
    const response = await axios.post(
      "https://yt-editorial-backend.onrender.com/upload/upload-youtube", // Your backend route for YouTube upload
      {
        r2PresignedUrl,
        title,
        description,
        privacyStatus,
      },
      { withCredentials: true }
    );

    return response.data; // This will contain the YouTube video ID
  } catch (error) {
    console.error("❌ YouTube upload failed:", error);
    const serverError = error?.response?.data || {};
    throw {
      message: serverError.message || "YouTube upload failed",
      status: error?.response?.status || 500,
    };
  }
};
