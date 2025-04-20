import * as React from "react";
import { UploadCloud, ChevronDown } from "lucide-react";
import { NavMain } from "./nav-main/NavMain";
import { NavProjects } from "./nav-projects/NavProjects";
import { NavSecondary } from "./nav-secondary/NavSecondary";
import { NavUser } from "./nav-user/NavUser";
import useSelectedUserStore from "../../store/useSelectedUserStore";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";
import { useAuthStore } from "../../store/useAuthStore";
import useEditorStore from "../../store/useEditorsStore"; // Editor store
import useCreatorStore from "../../store/useAssignedCreatorsStore"; // Creator store
import { editorSidebar, creatorSidebar } from "../../constants/sidebarData"; // Sidebar data constants
import { fetchNotifications } from "../../lib/api/Notification"; // Import notification fetch function

export function AppSidebar({ onSelect }) {
  const { user, isLoading, error } = useAuthStore();

  const {
    editors,
    assignedEditors,
    fetchEditors,
    fetchAssignedEditors,
    loading: editorLoading,
    error: editorError,
  } = useEditorStore(); // Editor store
  const {
    assignedCreators,
    fetchAssignedCreators,
    loading: creatorLoading,
    error: creatorError,
  } = useCreatorStore(); // Creator store

  const isCreator = user?.userRole === "creator";
  const isEditor = user?.userRole === "editor";

  // Sidebar data (dynamic based on role)
  const sidebarData = isCreator ? creatorSidebar : editorSidebar;
  const selectableUsers = isEditor ? assignedCreators : assignedEditors; // Dynamic based on role

  // Set selected user state
  const { selectedUser, setSelectedUser } = useSelectedUserStore(); // Now getting whole user object

  React.useEffect(() => {
    // Fetch data based on the user's role
    if (isCreator) {
      fetchAssignedEditors(); // Fetch assigned editors for creators
    } else if (isEditor) {
      fetchAssignedCreators(); // Fetch assigned creators for editors
    }
  }, [isCreator, isEditor, fetchAssignedEditors, fetchAssignedCreators]);

  React.useEffect(() => {
    // If we have assigned users and no selected user is set, set the first one
    if (
      (isCreator && assignedCreators.length > 0 && !selectedUser) ||
      (isEditor && assignedEditors.length > 0 && !selectedUser)
    ) {
      const firstUser = isCreator ? assignedCreators[0] : assignedEditors[0];
      if (selectedUser?.id !== firstUser?.id) {
        setSelectedUser(firstUser); // Set only if different from current selected
      }
    }
  }, [
    assignedCreators,
    assignedEditors,
    isCreator,
    isEditor,
    selectedUser,
    setSelectedUser,
  ]);

  // Use the selected user object directly
  const selectedUserName = selectedUser?.name ?? "Select User";
  const selectedUserAvatar =
    selectedUser?.avatar || `https://i.pravatar.cc/150?u=${selectedUser?.id}`;

  const [activeSection, setActiveSection] = React.useState("");
  const [notifications, setNotifications] = React.useState([]); // State for notifications
  const [loadingNotifications, setLoadingNotifications] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNotifications(); // Fetch notifications from the backend
        setNotifications(data.notifications || []); // Set the notifications
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchData();
  }, []); // Only run once when the component mounts

  const unreadNotificationsCount =
    notifications?.filter((n) => !n.is_read).length || 0; // Count unread notifications

  // Update navMain to show unread count
  const navMain = sidebarData.navMain.map((item) =>
    item.title === "Notifications"
      ? {
          ...item,
          badge:
            unreadNotificationsCount > 0
              ? `${unreadNotificationsCount}+`
              : null,
        }
      : item
  );

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (onSelect) onSelect(section);
  };

  return (
    <Sidebar variant="inset">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <UploadCloud className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Stream Forge</span>
                  <span className="truncate text-xs">
                    {isCreator ? "Creator" : "Editor"} Dashboard
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Dropdown for selecting users */}
      {(isCreator || isEditor) && (
        <div className="px-2 pb-2 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm">
                <img
                  src={selectedUserAvatar}
                  className="w-6 h-6 rounded-full"
                  alt={selectedUserName}
                />
                <span className="truncate">{selectedUserName}</span>
                <ChevronDown className="ml-auto w-4 h-4 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[200px] bg-secondary "
            >
              {editorLoading || creatorLoading ? (
                <DropdownMenuItem disabled>Loading users...</DropdownMenuItem>
              ) : editorError || creatorError ? (
                <DropdownMenuItem disabled>
                  Error loading users
                </DropdownMenuItem>
              ) : (
                selectableUsers.map((user) => (
                  <DropdownMenuItem
                    key={user.id || user.email || user.name}
                    onSelect={() => setSelectedUser(user)} // Store the full user object
                    className="flex items-center gap-2"
                  >
                    <img
                      src={
                        user.avatar || `https://i.pravatar.cc/150?u=${user.id}`
                      }
                      className="w-5 h-5 rounded-full"
                      alt={user.name}
                    />
                    <span>{user.name}</span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Main Navigation */}
      <SidebarContent>
        <NavMain items={navMain} onSelect={handleSectionChange} />
        <NavProjects projects={sidebarData.projects} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
