import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ImageDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (url: string) => void;
};

export const ImageDialog: FC<ImageDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        {/* <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res: { url: string }[]) => {
            if (res?.[0]?.url) {
              onUploadComplete(res[0].url);
            }
            onClose();
          }}
          onUploadError={(error: Error) => {
            console.error(error);
            onClose();
          }}
          onUploadBegin={(name: string) => {
            console.log("Upload started:", name);
          }}
        /> */}
      </DialogContent>
    </Dialog>
  );
};
