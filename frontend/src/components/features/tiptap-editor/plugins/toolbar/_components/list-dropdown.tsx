import { type Editor } from "@tiptap/react";
import { FC } from "react";
import { List, ListOrdered } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShortcutKey } from "@/components/ui/shortcut-key";

type ListAction = "bulletList" | "orderedList";

type ListItem = {
  value: ListAction;
  label: string;
  icon: React.ReactNode;
  isActive: (editor: Editor) => boolean;
  action: (editor: Editor) => void;
  shortcuts: string[];
};

const listActions: ListItem[] = [
  {
    value: "bulletList",
    label: "Bullet list",
    icon: <List className="h-4 w-4 mr-2" />,
    isActive: (editor) => editor.isActive("bulletList"),
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    shortcuts: ["mod", "shift", "8"],
  },
  {
    value: "orderedList",
    label: "Numbered list",
    icon: <ListOrdered className="h-4 w-4 mr-2" />,
    isActive: (editor) => editor.isActive("orderedList"),
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    shortcuts: ["mod", "shift", "7"],
  },
];

type ListDropdownProps = {
  editor: Editor;
};

const ListDropdown: FC<ListDropdownProps> = ({ editor }) => {
  const activeItem = listActions.find((item) => item.isActive(editor));

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
          <List className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {listActions.map((item) => (
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

export { ListDropdown };
