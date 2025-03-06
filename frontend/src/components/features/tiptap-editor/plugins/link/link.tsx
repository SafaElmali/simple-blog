import { FC, useState } from "react";
import { type Editor } from "@tiptap/react";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkDialog } from "./_components/link-menu/link-dialog";

type LinkButtonProps = {
  editor: Editor;
};

export const LinkButton: FC<LinkButtonProps> = ({ editor }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isEditing = editor.isActive("link");

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "h-8 w-8 p-2 flex items-center justify-center",
          isEditing && "bg-accent text-accent-foreground"
        )}
        onClick={() => setIsDialogOpen(true)}
        type="button"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      <LinkDialog
        initialUrl={editor.getAttributes("link").href}
        initialOpenInNewTab={editor.getAttributes("link").target === "_blank"}
        onSetLink={(url, openInNewTab) => {
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
          } else {
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
              .run();
          }
          setIsDialogOpen(false);
        }}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isEditing={isEditing}
      />
    </>
  );
};
