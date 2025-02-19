import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { FC } from "react";
import { NavItem } from "@/types/sidebar";

type NavMainProps = {
  items: NavItem[];
};

const NavMain: FC<NavMainProps> = ({ items }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} asChild={!item.items}>
                  {item.items ? (
                    <div className="flex items-center w-full py-2">
                      {item.icon && (
                        <item.icon className="h-4 w-4 mr-3 shrink-0" />
                      )}
                      <span className="flex-1 truncate">{item.title}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </div>
                  ) : (
                    <Link
                      href={item.url || ""}
                      className="flex items-center w-full py-2"
                    >
                      {item.icon && <item.icon className="h-4 w-4  shrink-0" />}
                      <span className="flex-1 truncate">{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            className="flex items-center py-2"
                          >
                            <span className="flex-1 truncate">
                              {subItem.title}
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { NavMain };
