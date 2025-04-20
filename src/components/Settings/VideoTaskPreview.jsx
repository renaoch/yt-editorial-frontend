import React from "react";
import { ArrowRight } from "lucide-react";

const MOCK_VIDEO = {
  title: "Ultimate YouTube Growth Strategy",
  thumbnailUrl:
    "https://i.cdn.newsbytesapp.com/images/l15520250101133549.jpeg?tr=w-720",
  editor: { name: "Renao" },
  status: "approved",
};

const statusStyles = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-gray-200 text-gray-700",
};

const VideoTaskPreview = ({ video = MOCK_VIDEO }) => {
  const statusClass = statusStyles[video.status] || statusStyles["pending"];

  return (
    <div className="group relative h-30 flex w-full max-w-md items-center gap-4 rounded-2xl border border-base-300 bg-base-100 hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer">
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt="Video Thumbnail"
        className="w-24 h-16 object-cover rounded-lg border border-base-300"
      />

      {/* Info */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <h2 className="text-base font-semibold text-base-content truncate">
          {video.title}
        </h2>
        <p className="text-sm text-base-content/70 truncate">
          Uploaded by {video.editor?.name}
        </p>

        {/* Status Badge */}
        <div
          className={`text-xs px-2 py-0.5 rounded mt-1 w-fit font-medium capitalize ${statusClass}`}
        >
          {video.status}
        </div>
      </div>

      {/* Right Arrow Icon */}
      <ArrowRight
        className="text-base-content/50 group-hover:translate-x-1 transition-transform duration-200"
        size={20}
      />
    </div>
  );
};

export default VideoTaskPreview;
