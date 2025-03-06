import { type Editor } from "@tiptap/react";
import { FC } from "react";
import { Code, Eraser, MoreHorizontal, Strikethrough } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShortcutKey } from "@/components/ui/shortcut-key";

type FormattingAction = "strike" | "code" | "clear";

type FormattingItem = {
  value: FormattingAction;
  label: string;
  icon: React.ReactNode;
  isActive: (editor: Editor) => boolean;
  action: (editor: Editor) => void;
  shortcuts: string[];
};

const formattingActions: FormattingItem[] = [
  {
    value: "strike",
    label: "Strikethrough",
    icon: <Strikethrough className="h-4 w-4 mr-2" />,
    isActive: (editor) => editor.isActive("strike"),
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    shortcuts: ["mod", "shift", "x"],
  },
  {
    value: "code",
    label: "Code",
    icon: <Code className="h-4 w-4 mr-2" />,
    isActive: (editor) => editor.isActive("code"),
    action: (editor) => editor.chain().focus().toggleCode().run(),
    shortcuts: ["mod", "e"],
  },
  {
    value: "clear",
    label: "Clear formatting",
    icon: <Eraser className="h-4 w-4 mr-2" />,
    isActive: () => false,
    action: (editor) => editor.chain().focus().unsetAllMarks().clearNodes().run(),
    shortcuts: ["mod", "\\"],
  },
];

type FormattingDropdownProps = {
  editor: Editor;
};

const FormattingDropdown: FC<FormattingDropdownProps> = ({ editor }) => {
  const activeItem = formattingActions.find((item) => item.isActive(editor));

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
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {formattingActions.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => item.action(editor)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              {item.icon}
              {item.label}
            </div>
            <ShortcutKey keys={item.shortcuts} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { FormattingDropdown };
