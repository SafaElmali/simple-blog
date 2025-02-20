"use client";

import * as React from "react";
import { LayoutDashboard, FileText, Wrench } from "lucide-react";
import { UrlUtil } from "@/lib/urls";

import { NavMain } from "@/app/admin/_components/sidebar/nav-main";
import { NavUser } from "@/app/admin/_components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { FC } from "react";

// This is sample data.
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
    {
      title: "Settings",
      url: UrlUtil.buildAdminSettingsPath(),
      icon: Wrench,
    },
  ],
};

const AdminSidebar: FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
};

export { AdminSidebar };
