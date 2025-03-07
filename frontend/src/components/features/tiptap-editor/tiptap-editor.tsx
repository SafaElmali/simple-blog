"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./plugins/toolbar/toolbar";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import "./styles/index.css";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Dropcursor from "@tiptap/extension-dropcursor";
import { LinkMenu } from "./plugins/link/_components/link-menu/link-menu";
import { OutputTabs } from "./_components/output-tabs";
import { BubbleMenuBar } from "./plugins/bubble-menu/bubble-menu";
import CodeBlock from '@tiptap/extension-code-block';

type TiptapEditorProps = {
  className?: string;
  content?: string;
  onChange?: (content: string) => void;
  hideOutput?: boolean;
};

const TiptapEditor: FC<TiptapEditorProps> = ({
  content = "",
  onChange,
  className,
  hideOutput = false,
}) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Table,
      TableRow,
      TableHeader,
      TableCell,
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary/80",
        },
      }),
      Image,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
      BubbleMenu.configure({
        shouldShow: ({ editor }) => {
          // Only show if text is selected
          return !editor.state.selection.empty;
        },
      }),
      Dropcursor.configure({
        color: "var(--primary)",
        width: 2,
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'block rounded-md bg-muted/50 p-4 text-sm my-4',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(className),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditorContent(html);
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
        {editor && (
          <>
            <LinkMenu editor={editor} />
            <BubbleMenuBar editor={editor} />
          </>
        )}
      </div>
      {!hideOutput && <OutputTabs content={editorContent} />}
    </div>
  );
};

export { TiptapEditor };
