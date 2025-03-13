import { type Editor } from "@tiptap/react";
import { FC, useState } from "react";
import { ImageIcon } from "lucide-react";
import { ToggleButton } from "../../_components/toggle-button";
import { ImageDialog } from "../../image/_components/image-dialog";

type ImageButtonProps = {
  editor: Editor;
};

export const ImageButton: FC<ImageButtonProps> = ({ editor }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <ToggleButton
        icon={<ImageIcon className="h-4 w-4" />}
        label="Image"
        isActive={false}
        command={() => setIsDialogOpen(true)}
      />

      <ImageDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUploadComplete={(url) => {
          editor.chain().focus().setImage({ src: url }).run();
          setIsDialogOpen(false);
        }}
      />
    </>
  );
}; 