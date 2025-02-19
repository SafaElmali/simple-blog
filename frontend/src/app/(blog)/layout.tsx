import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { FC } from "react";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "A blog built with Next.js and TypeScript",
};

const BlogLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
};

export default BlogLayout;
