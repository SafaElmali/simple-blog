"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { cn } from "@/lib/utils";
import { EditorToolbar } from "./editor-toolbar";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export function TiptapEditor({ content, onChange, className }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-stone dark:prose-invert w-full focus:outline-none",
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="relative w-full border rounded-md">
      <EditorToolbar editor={editor} />
      <div 
        className="p-4 h-[500px] overflow-y-auto cursor-text"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
} 