import React from "react";
import { THEMES } from "../../constants/index";
import { useThemeStore } from "../../store/useThemeStore";
import VideoTaskPreview from "./VideoTaskPreview";

const PREVIEW_VIDEOS = [
  {
    id: 1,
    title: "How to Grow on YouTube in 2025",
    thumbnailUrl:
      "https://img.freepik.com/free-vector/modern-youtube-thumbnail-with-comic-art-background_1361-2738.jpg?t=st=1744436227~exp=1744439827~hmac=a17102a628d74229cfc5e642c8143736bfddb90ce4a4a549d1512f55cb6b2c97&w=1380",
    editor: { name: "Renao" },
    status: "approved",
  },
  {
    id: 2,
    title: "Thumbnail A/B Test Results",
    thumbnailUrl:
      "https://img.freepik.com/free-vector/modern-youtube-thumbnail-with-comic-art-background_1361-2738.jpg?t=st=1744436227~exp=1744439827~hmac=a17102a628d74229cfc5e642c8143736bfddb90ce4a4a549d1512f55cb6b2c97&w=1380",
    editor: { name: "Sanu" },
    status: "pending",
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  // Update the `data-theme` attribute to apply the theme globally
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="h-screen container mx-auto px-4     bg-base-100 border-base-300">
      <div className="space-y-6">
        {/* Theme Selection */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-base-content">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your interface
          </p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 bg-base-100 border-base-300">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
        group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
        ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"} 
        border border-base-300 bg-base-100 text-base-content
      `}
              onClick={() => setTheme(t)} // Set the theme when clicked
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3 text-base-content">
          Preview
        </h3>
        <div className="rounded-xl border border-base-300 flex justify-center gap-20 overflow-hidden bg-base-100 shadow-lg p-4 space-y-4">
          {PREVIEW_VIDEOS.map((video) => (
            <VideoTaskPreview key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
