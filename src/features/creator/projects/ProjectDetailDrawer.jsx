import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "../../../components/ui/drawer";
import { Button } from "../../../components/ui/button";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { cn } from "../../../lib/utils";
import {
  Calendar,
  User,
  Tag,
  CheckCircle,
  RotateCcw,
  UploadCloud,
  XCircle,
  Video,
  Folder,
} from "lucide-react";
import { uploadToYouTube } from "../../../lib/api/Video"; // Import the YouTube upload function
import { useState } from "react";
export default function ProjectDetailDrawer({ project, onClose }) {
  const [isUploading, setIsUploading] = useState(false); // State to manage upload status
  const [uploadError, setUploadError] = useState(null); // State to manage upload errors
  const [uploadSuccess, setUploadSuccess] = useState(false); // State to manage upload success

  if (!project) return null;

  const isCompleted = project.status === "completed";
  const latestVideo = project.video || null;

  // Function to handle the YouTube upload
  const handleYouTubeUpload = async () => {
    if (!latestVideo?.video_url) {
      alert("No video available for upload.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      // Call the uploadToYouTube function with the necessary parameters
      const response = await uploadToYouTube({
        r2PresignedUrl: latestVideo.video_url,
        title: project.title,
        description: project.description,
      });

      // Handle success
      setUploadSuccess(true);
      console.log("YouTube upload successful:", response);
    } catch (error) {
      // Handle error
      setUploadError("Error uploading to YouTube. Please try again.");
      console.error("YouTube upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Drawer
      open={!!project}
      onOpenChange={onClose}
      direction="right"
      className="transition-all duration-500"
    >
      <DrawerContent
        className={cn(
          "h-screen ml-auto border-l max-w-4xl flex flex-col shadow-xl transition-all transform",
          "lg:translate-x-0",
          "ease-in-out"
          // Dynamically applying background color based on theme
        )}
        style={{ backdropFilter: "blur(10px)", width: "80vw" }}
      >
        <DrawerHeader className="border-b p-6">
          <div className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            <DrawerTitle className="text-2xl font-semibold">
              {project.title}
            </DrawerTitle>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
          <section>
            <p className=" leading-relaxed text-sm">
              {project.description || "No description provided."}
            </p>
          </section>

          <section className="bg-secondary rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm ">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Deadline:</span> {project.deadline}
            </div>

            <div className="flex items-center gap-2 text-sm ">
              <User className="w-4 h-4" />
              <span className="font-medium">Editor:</span>{" "}
              <div className="mt-5">
                {project.editor.name || "No editor assigned"} (
                {project.editor.email})
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm ">
              <Tag className="w-4 h-4 mt-1" />
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {!(latestVideo.video_url === "No video uploaded") ? (
            latestVideo ? (
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Video className="w-5 h-5" />
                  Final Edited Video
                </div>
                {console.log("latestVideo", latestVideo)}
                <video
                  src={latestVideo.video_url} // Directly using the video URL from backend
                  controls
                  preload="none"
                  className="w-full rounded-lg shadow-md border"
                />

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button className=" hover:bg-green-700 text-secondary ">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive">
                    <RotateCcw className=" w-4 h-4 mr-2" />
                    Redo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleYouTubeUpload}
                    disabled={isUploading}
                  >
                    <UploadCloud className="w-4 h-4 mr-2" />
                    {isUploading ? "Uploading..." : "Upload to YouTube"}
                  </Button>
                </div>

                {uploadSuccess && (
                  <div className="text-green-600 mt-4">Upload Successful!</div>
                )}
                {uploadError && (
                  <div className="text-red-600 mt-4">{uploadError}</div>
                )}
              </section>
            ) : (
              <section className="space-y-3">
                <p className="text-lg font-semibold text-gray-800">
                  No video uploaded
                </p>
              </section>
            )
          ) : (
            <section>
              <p className="text-lg font-semibold text-gray-800">
                This project is not completed yet.
              </p>
            </section>
          )}
        </ScrollArea>

        <DrawerFooter className="border-t p-4">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              <XCircle className="w-4 h-4 mr-2" />
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
