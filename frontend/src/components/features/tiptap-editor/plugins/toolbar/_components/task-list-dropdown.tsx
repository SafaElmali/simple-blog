import { type Editor } from "@tiptap/react";
import { FC, Fragment } from "react";
import {
  CheckSquare,
  ArrowUpCircle,
  ArrowDownCircle,
  Split,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TaskAction = {
  label: string;
  icon: React.ReactNode;
  command: (editor: Editor) => void;
  isDisabled?: (editor: Editor) => boolean;
};

const taskActions: TaskAction[] = [
  {
    label: "Toggle Task List",
    icon: <CheckSquare className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().toggleTaskList().run(),
    isDisabled: (editor) => !editor.can().toggleTaskList(),
  },
  {
    label: "Lift Task",
    icon: <ArrowUpCircle className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().liftListItem("taskItem").run(),
    isDisabled: (editor) => !editor.can().liftListItem("taskItem"),
  },
  {
    label: "Sink Task",
    icon: <ArrowDownCircle className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().sinkListItem("taskItem").run(),
    isDisabled: (editor) => !editor.can().sinkListItem("taskItem"),
  },
  {
    label: "Split Task",
    icon: <Split className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().splitListItem("taskItem").run(),
    isDisabled: (editor) => !editor.can().splitListItem("taskItem"),
  },
];

type TaskListDropdownProps = {
  editor: Editor;
};

export const TaskListDropdown: FC<TaskListDropdownProps> = ({ editor }) => {
  const isTaskListActive = editor.isActive("taskList");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 w-8 p-2 flex items-center justify-center",
            isTaskListActive && "bg-accent text-accent-foreground"
          )}
        >
          <CheckSquare className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {taskActions.map((item, index) => (
          <Fragment key={item.label}>
            {index === 1 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              key={item.label}
              onClick={() => item.command(editor)}
              disabled={item.isDisabled?.(editor)}
              className="flex items-center"
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
