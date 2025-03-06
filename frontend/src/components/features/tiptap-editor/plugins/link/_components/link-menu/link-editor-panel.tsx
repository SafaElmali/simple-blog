import { FC, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";
import { cn } from "@/lib/utils";

type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
};

export const LinkEditorPanel: FC<LinkEditorPanelProps> = ({
  initialUrl = "",
  initialOpenInNewTab = false,
  onSetLink,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink]
  );

  return (
    <div className="bg-popover border rounded-lg shadow-md p-3 min-w-[300px]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2">
          <Link className="h-4 w-4" />
          <Input
            type="url"
            className="flex-1 border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
            placeholder="Enter URL"
            value={url}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="new-tab"
              checked={openInNewTab}
              onCheckedChange={setOpenInNewTab}
            />
            <Label htmlFor="new-tab" className="text-sm">
              Open in new tab
            </Label>
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={!isValidUrl}
            className={cn(!isValidUrl && "opacity-50")}
          >
            Set Link
          </Button>
        </div>
      </form>
    </div>
  );
}; 