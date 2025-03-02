import type { Metadata } from "next";
import "@/app/globals.css";
import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/features/theme-toggle";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Blog Admin",
  description: "Blog admin dashboard",
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
      <ThemeToggle />
    </ThemeProvider>
  );
};

export default AdminLayout;
