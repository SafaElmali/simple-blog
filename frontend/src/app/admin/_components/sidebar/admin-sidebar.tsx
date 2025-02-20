import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UrlUtil } from "@/lib/urls";
import { ChevronRight, FileText, LayoutDashboard } from "lucide-react";
import Link from "next/link";

// Menu items.
const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: UrlUtil.buildAdminDashboardPath(),
      icon: LayoutDashboard,
    },
    {
      title: "Posts",
      url: UrlUtil.buildAdminPostsPath(),
      icon: FileText,
      hasSubmenu: true,
      items: [
        {
          title: "All Posts",
          url: UrlUtil.buildAdminPostsPath(),
        },
        {
          title: "Create Post",
          url: UrlUtil.buildAdminPostsNewPath(),
        },
      ],
    },
  ],
};

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.hasSubmenu ? (
                    <Collapsible className="p-2">
                      <CollapsibleTrigger className="flex w-full items-center">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        {item.items?.map((subItem) => (
                          <SidebarMenuButton key={subItem.title} asChild className="gap-2">
                            <Link href={subItem.url} className="pl-4">
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AdminSidebar };
