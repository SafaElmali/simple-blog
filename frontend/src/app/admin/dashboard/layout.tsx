import { AdminSidebar } from "@/app/admin/_components/sidebar/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarTrigger />
      <main className="container mx-auto p-4">{children}</main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
