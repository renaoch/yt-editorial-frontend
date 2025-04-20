import {
  UploadCloud,
  BookOpen,
  MessageSquare,
  Bell,
  LifeBuoy,
  Send,
  Folder,
  Palette,
} from "lucide-react";

// === EDITOR SIDEBAR DATA ===
export const editorSidebar = {
  navMain: [
    { title: "View  Projects", section: "editor-projects", icon: BookOpen },
    {
      title: "Chat",
      icon: MessageSquare,
      section: "chat",
    },
    {
      title: "Notifications",
      icon: Bell,
      section: "notifications",
    },
    {
      title: "Theme",
      icon: Palette,
      section: "theme",
    },
  ],
  navSecondary: [{ title: "Feedback", icon: Send }],
  projects: [], 
};

// === CREATOR SIDEBAR DATA ===
export const creatorSidebar = {
  navMain: [
    {
      title: "My Projects",
      icon: Folder,
      section: "projects",
    },
    {
      title: "Editor Management",
      icon: Folder,
      section: "editors",
    },

    {
      title: "Thumbnail Generator",
      icon: UploadCloud,
      section: "thumbnail-gen",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      section: "chat",
    },
    {
      title: "Notifications",
      icon: Bell,
      section: "notifications",
    },
    {
      title: "Theme",
      icon: Palette,
      section: "theme",
    },
  ],
  navSecondary: [{ title: "Feedback", icon: Send }],

  projects: [],
};
