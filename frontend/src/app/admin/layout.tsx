import type { Metadata } from "next";
import "@/app/globals.css";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Blog Admin",
  description: "Blog admin dashboard",
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default AdminLayout;
