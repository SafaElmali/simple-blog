"use client";

import "./styles.css";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import { EditorToolbar } from "./_components/editor-toolbar";
import { EditorBubbleMenu } from "./_components/bubble-menu";
import { FC, useEffect } from "react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

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
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn("tiptap", className),
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
      <div className="w-full min-h-[300px] p-4 overflow-y-auto cursor-text">
        <EditorBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export { TiptapEditor };
