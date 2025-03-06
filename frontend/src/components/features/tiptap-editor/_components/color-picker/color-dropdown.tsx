import { type Editor } from "@tiptap/react";
import { FC } from "react";
import { Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColorPicker } from "./color-picker";

type ColorDropdownProps = {
  editor: Editor;
};

export const ColorDropdown: FC<ColorDropdownProps> = ({ editor }) => {
  const currentColor = editor.getAttributes("textStyle").color || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 w-8 p-2 flex items-center justify-center",
            currentColor && "bg-accent text-accent-foreground"
          )}
        >
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        sideOffset={4}
        alignOffset={0}
        className="w-64"
      >
        <ColorPicker
          color={currentColor}
          onChange={(color) => {
            if (color) {
              editor.chain().focus().setColor(color).run();
            }
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
