import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppSidebar } from "./components/app-sidebar/AppSidebar";
import { Toaster } from "sonner";
import { SidebarProvider } from "./components/ui/sidebar";
import NotificationManager from "./components/notifications/Notification";
import AllEditors from "./features/creator/AllEditors";
import ProjectsPage from "./features/creator/projects/ProjectsPage";
import EditorProjectsPage from "./features/editor/projects/EditorProjectPage";
import ChatApp from "./features/shared/chat/ChatBubble";
import SettingsPage from "./components/Settings/Settings";
import ThemeInitializer from "./components/theme/ThemeController";
import { useAuthStore } from "./store/useAuthStore";
import { Spinner } from "./components/ui/Spinner";

const AppLayout = () => {
  const navigate = useNavigate();
  const { checkUserStatus, user, isLoading, hasCheckedAuth } = useAuthStore();

  // Check user auth status when AppLayout loads
  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  // If not authenticated, redirect to /auth
  useEffect(() => {
    if (hasCheckedAuth && !user) {
      navigate("/auth");
    }
  }, [hasCheckedAuth, user, navigate]);
console.log("hasCheckedAuth ",hasCheckedAuth ,"user",user,"isLoading",isLoading)
  // Show loading spinner while checking auth
  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Handle sidebar selection
  const handleSelect = (section) => {
    switch (section) {
      case "notifications":
        navigate("/notifications");
        break;
      case "projects":
        navigate("/projects");
        break;
      case "editor-projects":
        navigate("/editor-projects");
        break;
      case "editors":
        navigate("/editors");
        break;
      case "chat":
        navigate("/chat");
        break;
      case "theme":
        navigate("/theme");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex">
      <ThemeInitializer />
      <Toaster />
      <SidebarProvider>
        <AppSidebar onSelect={handleSelect} />
      </SidebarProvider>

      <div className="main-content w-full p-4">
        <Routes>
          <Route path="/notifications" element={<NotificationManager />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/editor-projects" element={<EditorProjectsPage />} />
          <Route path="/editors" element={<AllEditors />} />
          <Route path="/chat" element={<ChatApp />} />
          <Route path="/theme" element={<SettingsPage />} />
          <Route
            path="/"
            element={
              <div className="text-center text-lg mt-10">
                Please select a section to continue.
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;
