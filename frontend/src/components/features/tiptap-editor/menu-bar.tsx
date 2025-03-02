"use client";

import { type Editor } from "@tiptap/react";
import { FC, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Wand2,
  MinusSquare,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadButton } from "./plugins/image-upload-button";
import { LinkDialog } from "./plugins/link-dialog";
import { MenuButton } from "./plugins/menu-button";

type MenuBarProps = {
  editor: Editor | null;
  linkDialogOpen: boolean;
  onLinkDialogOpen: (open: boolean) => void;
};

const MenuBar: FC<MenuBarProps> = ({
  editor,
  linkDialogOpen,
  onLinkDialogOpen,
}) => {
  const { toast } = useToast();
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhanceContent = async () => {
    if (!editor) return;

    const content = editor.getHTML();
    if (!content.trim()) {
      toast({
        title: "Empty Content",
        description: "Please write something first",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editor.getText() }),
      });

      if (!response.ok) throw new Error("AI enhancement failed");

      const data = await response.json();

      editor.commands.setContent(data.content);

      toast({
        title: "Content Enhanced",
        description: "Your text has been magically improved!",
      });
    } catch {
      toast({
        title: "Enhancement Failed",
        description: "Could not enhance the content",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  if (!editor) return null;

  const setLink = (url: string) => {
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-border bg-background p-2 flex gap-1 flex-wrap">
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <Bold className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <Italic className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <Strikethrough className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <List className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <ListOrdered className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      >
        <Quote className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MinusSquare className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
      >
        <Code className="h-4 w-4" />
      </MenuButton>
      <ImageUploadButton editor={editor} />
      <MenuButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => onLinkDialogOpen(true)}
        isActive={editor.isActive("link")}
      >
        <Link2 className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        isActive={editor.isActive({ textAlign: "justify" })}
      >
        <AlignJustify className="h-4 w-4" />
      </MenuButton>
      <div className="flex-1" />
      <MenuButton
        onClick={enhanceContent}
        disabled={isEnhancing}
      >
        <Wand2 className={cn("h-4 w-4", isEnhancing && "animate-spin")} />
      </MenuButton>

      <LinkDialog
        open={linkDialogOpen}
        onOpenChange={onLinkDialogOpen}
        onSubmit={setLink}
      />
    </div>
  );
};

export { MenuBar };
