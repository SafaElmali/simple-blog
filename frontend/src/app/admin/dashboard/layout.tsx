import { AdminSidebar } from "@/app/admin/_components/sidebar/admin-sidebar";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-72 border-r">
        <AdminSidebar />
      </div>
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout; 