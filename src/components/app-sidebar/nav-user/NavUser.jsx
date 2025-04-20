import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";

// Fallback Avatar component
function AvatarWithFallback({ userAvatar, userName }) {
  const initials = userName
    ? userName
        .split(" ")
        .map((word) => word[0])
        .join("")
    : "UN"; // Default initials if no name is available

  return (
    <Avatar className="shrink-0">
      {userAvatar ? (
        <AvatarImage src={userAvatar} alt="User Avatar" />
      ) : (
        <AvatarFallback className="bg-gray-500 text-white">
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

// Assuming the `logoutUser` function is already imported from your api file
import { logoutUser } from "../../../lib/api/User";

export function NavUser({ user }) {
  if (!user) {
    return <div>Loading...</div>; // Show loading UI if user data is not yet available
  }

  const { userName, userAvatar } = user;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Avatar with fallback */}
              <AvatarWithFallback userAvatar={userAvatar} userName={userName} />
              <h1 className="ml-2">{userName}</h1>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Theme
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutUser}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
