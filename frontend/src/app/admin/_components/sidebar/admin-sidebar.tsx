"use client";

import * as React from "react";
import { LayoutDashboard, FileText, Wrench } from "lucide-react";
import { urls } from "@/lib/urls";

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
      url: urls.admin.dashboard.root,
      icon: LayoutDashboard,
    },
    {
      title: "Posts",
      url: urls.admin.dashboard.posts.root,
      icon: FileText,
      hasSubmenu: true,
      items: [
        {
          title: "All Posts",
          url: urls.admin.dashboard.posts.root,
        },
        {
          title: "Create Post",
          url: urls.admin.dashboard.posts.new,
        },
      ],
    },
    {
      title: "Settings",
      url: urls.admin.dashboard.settings,
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
