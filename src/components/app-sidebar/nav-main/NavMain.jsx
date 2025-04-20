import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../components/ui/sidebar";
export function NavMain({ items, onSelect }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <button
                onClick={() => {
                  // If there are no nested items, trigger onSelect directly
                  if (!item.items || item.items.length === 0) {
                    onSelect(item.section);
                  }
                }}
              >
                <item.icon />
                <span>{item.title}</span>

                {/* Check if item has a badge and render it */}

                {item.badge !== undefined && (
                  <span className="ml-16 text-xs font-bold bg-red-500 text-white rounded-full px-1 mt-1 py-1/2">
                    {item.badge}
                  </span>
                )}
              </button>
            </SidebarMenuButton>

            {/* Only render collapsible content if the item has sub-sections */}
            {item.items?.length > 0 && (
              <Collapsible asChild>
                <div>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <button onClick={() => onSelect(subItem.section)}>
                              <span>{subItem.title}</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
