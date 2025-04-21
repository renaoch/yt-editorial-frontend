import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/ui/tabs";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";
import { uploadVideo, fetchVideoVersions } from "../../../lib/api/Video";
import { toast } from "sonner";

const ProjectTabs = ({ selectedProject, selectedTab, setSelectedTab }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [comments, setComments] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videoVersions, setVideoVersions] = useState([]); 


  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const taskId = selectedProject?._id;
        if (taskId) {
          const versions = await fetchVideoVersions(taskId);
          setVideoVersions(versions);
        }
      } catch (error) {
        console.error("Error fetching video versions:", error);
        toast.error("Failed to fetch video versions");
      }
    };

    if (selectedProject?._id) {
      fetchVersions();
    }
  }, [selectedProject]); 

  const handleUpload = async () => {
    if (!videoFile || !title || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setUploading(true);

      const taskId = selectedProject?._id;

      const response = await uploadVideo({
        file: videoFile,
        title,
        description,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        notes: comments,
        taskId, // Pass task_id here
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("Upload progress:", percentCompleted, "%");
        },
      });

      toast.success("Video uploaded successfully!");
      console.log("Server response:", response);

      // After upload, fetch the updated versions
      const updatedVersions = await fetchVideoVersions(taskId);
      setVideoVersions(updatedVersions);
    } catch (err) {
      toast.error("Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Tabs
      className="flex flex-col"
      value={selectedTab}
      onValueChange={setSelectedTab}
    >
      <TabsList className="flex space-x-4 border-b pb-3">
        <TabsTrigger
          value="overview"
          className="text-sm font-semibold py-2 px-4 rounded-md hover:bg-secondary-200 transition-colors"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="upload"
          className="text-sm font-semibold py-2 px-4 rounded-md hover:bg-secondary-200transition-colors"
        >
          Upload New Version
        </TabsTrigger>
        <TabsTrigger
          value="versions"
          className="text-sm font-semibold py-2 px-4 rounded-md hover:bg-secondary-200 transition-colors"
        >
          Previous Versions
        </TabsTrigger>
      </TabsList>

      {/* Overview */}
      <TabsContent
        value="overview"
        className="flex-1 overflow-y-auto p-6 rounded-lg shadow-md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="font-medium">Deadline:</span>
            <p>{selectedProject.deadline}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">Assigned By:</span>
            <p>{selectedProject.creator?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">Tags:</span>
            <p>{selectedProject.tags?.join(", ") || "No tags"}</p>
          </div>
        </div>
      </TabsContent>

      {/* Upload */}
      <TabsContent
        value="upload"
        className="flex-1 overflow-y-auto p-6 rounded-lg shadow-md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Edited Version
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="mb-4 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mb-4 w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tags (comma separated)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-4 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Comments</label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="mb-4 w-full p-2 border rounded-md"
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={uploading || !videoFile || !title || !description}
            className="mt-4 w-full py-2 bg-secondary font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            {uploading ? "Uploading..." : "Upload Version"}
          </Button>
        </div>
      </TabsContent>

      {/* Versions */}
      <TabsContent
        value="versions"
        className="flex-1 overflow-y-auto p-6 rounded-lg shadow-md"
      >
        <div className="space-y-4">
          {console.log("vid", videoVersions)}
          {videoVersions.length > 0 ? (
            videoVersions.map((version) => (
              <div
                key={version._id}
                className="border rounded-lg p-4 shadow-sm space-y-2"
              >
                <p className="font-medium">Version {version.version_number}</p>
                <video
                  controls
                  className="w-full h-auto rounded-md border"
                  src={version.video_url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No previous versions available.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;
