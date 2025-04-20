import React, { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar/AppSidebar"; // ✅ use your custom sidebar

import UploadSection from "../editor/UploadSection"; // Import other sections
import UploadHistory from "../editor/UploadHistory";
import NotificationManager from "../../components/notifications/Notification";
import ProjectsPage from "../creator/projects/ProjectsPage";
import EditorProjectsPage from "../editor/projects/EditorProjectPage";
import ChatApp from "./chat/ChatBubble";
import SettingsPage from "../../components/Settings/Settings";

// Dashboard component that manages switching sections
export function Dashboard() {
  const [activeSection, setActiveSection] = useState("default"); // Default section

  const ComponentMap = {
    upload: <UploadSection />,
    history: <UploadHistory />,
    notifications: <NotificationManager />,
    editors: <NotificationManager />,
    projects: <ProjectsPage />,
    chat: <ChatApp />,
    theme: <SettingsPage />,
    "editor-projects": (
      <EditorProjectsPage assignedProjects={assignedProjects} />
    ),
    default: (
      <div>
        Select a <section></section>
      </div>
    ),
    // Add other sections here
  };

  return (
    <div>
      {/* Sidebar can trigger setActiveSection */}
      <AppSidebar onSelect={setActiveSection} />=
      <div>
        {/* Switch components without page reload */}
        {ComponentMap[activeSection] || <div>Select a section</div>}
      </div>
    </div>
  );
}
