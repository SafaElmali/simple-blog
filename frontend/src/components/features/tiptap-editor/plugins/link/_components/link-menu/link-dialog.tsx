import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FC, useState } from "react";
import { formatUrl } from "@/lib/urls";

type LinkDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
  isEditing?: boolean;
};

export const LinkDialog: FC<LinkDialogProps> = ({
  isOpen,
  onClose,
  initialUrl = "",
  initialOpenInNewTab = false,
  onSetLink,
  isEditing = false,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab);

  const resetStates = () => {
    setUrl(initialUrl);
    setOpenInNewTab(initialOpenInNewTab);
  };

  const handleClose = () => {
    resetStates();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const formattedUrl = formatUrl(url);
    onSetLink(formattedUrl, openInNewTab);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Link" : "Add Link"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="open-in-new-tab"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Open in new tab
            </Label>
            <Switch
              id="open-in-new-tab"
              checked={openInNewTab}
              onCheckedChange={setOpenInNewTab}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
