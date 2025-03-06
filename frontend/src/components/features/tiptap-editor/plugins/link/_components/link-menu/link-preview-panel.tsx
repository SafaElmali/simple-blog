import { FC } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Pencil, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
};

export const LinkPreviewPanel: FC<LinkPreviewPanelProps> = ({
  url,
  onEdit,
  onClear,
}) => {
  const sanitizedLink = url?.startsWith("javascript:") ? "" : url;

  return (
    <div className="flex items-center gap-2 bg-popover border rounded-lg p-2 shadow-md">
      <a
        href={sanitizedLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline truncate max-w-[200px]"
      >
        {url}
      </a>
      <Separator orientation="vertical" className="h-4" />
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-2"
          onClick={() => window.open(sanitizedLink, "_blank")}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-2"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-2"
          onClick={onClear}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 