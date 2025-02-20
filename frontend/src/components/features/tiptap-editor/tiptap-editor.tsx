"use client";

import "./styles.css";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import { EditorToolbar } from "./_components/editor-toolbar";
import { FC, useEffect } from "react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";

type TiptapEditorProps = {
  value: string;
  onChange: (content: string) => void;
  className?: string;
};

const TiptapEditor: FC<TiptapEditorProps> = ({
  value,
  onChange,
  className,
}) => {
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
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-stone dark:prose-invert prose-sm sm:prose-base lg:prose-lg w-full focus:outline-none min-h-[300px]",
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="w-full border rounded-md">
      <EditorToolbar editor={editor} />
      <div
        className="w-full min-h-[300px] p-4 overflow-y-auto cursor-text"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent editor={editor} className="max-w-none" />
      </div>
    </div>
  );
};

export { TiptapEditor };
