"use client";

import { FC, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "@/styles/code-blocks.css";

type HtmlViewerProps = {
  content: string;
  className?: string;
};

export const HtmlViewer: FC<HtmlViewerProps> = ({ content, className }) => {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [content]);

  return (
    <div
      className={`prose prose-stone dark:prose-invert max-w-none
        prose-pre:bg-[#1e1e1e] prose-pre:p-0 prose-pre:rounded-md prose-pre:overflow-x-auto
        prose-code:bg-[#1e1e1e] prose-code:text-[#d4d4d4] prose-code:rounded-md 
        prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono
        prose-code:before:content-none prose-code:after:content-none
        [&_pre]:my-4 [&_pre]:rounded-md [&_pre]:bg-[#1e1e1e]
        [&_pre_code]:block [&_pre_code]:bg-transparent [&_pre_code]:p-4 
        [&_pre_code]:text-sm [&_pre_code]:leading-relaxed [&_pre_code]:font-mono
        ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
