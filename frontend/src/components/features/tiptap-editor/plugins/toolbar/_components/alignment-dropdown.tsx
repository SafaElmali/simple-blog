import { type Editor } from "@tiptap/react";
import { FC } from "react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AlignmentAction = "left" | "center" | "right" | "justify";

type AlignmentItem = {
  value: AlignmentAction;
  label: string;
  icon: React.ReactNode;
  isActive: (editor: Editor) => boolean;
  command: (editor: Editor) => void;
};

const alignmentActions: AlignmentItem[] = [
  {
    value: "left",
    label: "Align left",
    icon: <AlignLeft className="h-4 w-4 mr-2" />,
    isActive: (editor) => editor.isActive({ textAlign: "left" }),
    command: (editor) => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    value: "center",
    label: "Align center",
    icon: <AlignCenter className="h-4 w-4 mr-2" />,
    isActive: (editor) => editor.isActive({ textAlign: "center" }),
    command: (editor) => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    value: "right",
    label: "Align right",
    icon: <AlignRight className="h-4 w-4 mr-2" />,
    isActive: (editor) => editor.isActive({ textAlign: "right" }),
    command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  },
  {
    value: "justify",
    label: "Justify",
    icon: <AlignJustify className="h-4 w-4 mr-2" />,
    isActive: (editor) => editor.isActive({ textAlign: "justify" }),
    command: (editor) => editor.chain().focus().setTextAlign("justify").run(),
  },
];

type AlignmentDropdownProps = {
  editor: Editor;
};

export const AlignmentDropdown: FC<AlignmentDropdownProps> = ({ editor }) => {
  const activeItem = alignmentActions.find((item) => item.isActive(editor));
  const activeIcon = activeItem?.icon || <AlignLeft className="h-4 w-4" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 w-8 p-2 flex items-center justify-center",
            activeItem && "bg-accent text-accent-foreground"
          )}
        >
          {activeIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {alignmentActions.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => item.command(editor)}
            className="flex items-center"
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 