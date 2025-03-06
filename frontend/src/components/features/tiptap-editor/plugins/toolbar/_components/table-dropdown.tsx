import { type Editor } from "@tiptap/react";
import { FC, Fragment } from "react";
import {
  Table,
  ArrowRight,
  ArrowLeft,
  Rows,
  Columns,
  Merge,
  Split,
  Trash,
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

type TableAction = {
  label: string;
  icon: React.ReactNode;
  command: (editor: Editor) => void;
  isDisabled?: (editor: Editor) => boolean;
};

const tableActions: TableAction[] = [
  {
    label: "Insert Table",
    icon: <Table className="h-4 w-4 mr-2" />,
    command: (editor) =>
      editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run(),
    isDisabled: (editor) => !editor.can().insertTable({ rows: 3, cols: 3 }),
  },
  {
    label: "Add Column Before",
    icon: <ArrowLeft className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().addColumnBefore().run(),
    isDisabled: (editor) => !editor.can().addColumnBefore(),
  },
  {
    label: "Add Column After",
    icon: <ArrowRight className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().addColumnAfter().run(),
    isDisabled: (editor) => !editor.can().addColumnAfter(),
  },
  {
    label: "Delete Column",
    icon: <Columns className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().deleteColumn().run(),
    isDisabled: (editor) => !editor.can().deleteColumn(),
  },
  {
    label: "Add Row Before",
    icon: <ArrowLeft className="h-4 w-4 mr-2 rotate-90" />,
    command: (editor) => editor.chain().focus().addRowBefore().run(),
    isDisabled: (editor) => !editor.can().addRowBefore(),
  },
  {
    label: "Add Row After",
    icon: <ArrowRight className="h-4 w-4 mr-2 rotate-90" />,
    command: (editor) => editor.chain().focus().addRowAfter().run(),
    isDisabled: (editor) => !editor.can().addRowAfter(),
  },
  {
    label: "Delete Row",
    icon: <Rows className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().deleteRow().run(),
    isDisabled: (editor) => !editor.can().deleteRow(),
  },
  {
    label: "Merge Cells",
    icon: <Merge className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().mergeCells().run(),
    isDisabled: (editor) => !editor.can().mergeCells(),
  },
  {
    label: "Split Cell",
    icon: <Split className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().splitCell().run(),
    isDisabled: (editor) => !editor.can().splitCell(),
  },
  {
    label: "Delete Table",
    icon: <Trash className="h-4 w-4 mr-2" />,
    command: (editor) => editor.chain().focus().deleteTable().run(),
    isDisabled: (editor) => !editor.can().deleteTable(),
  },
];

type TableDropdownProps = {
  editor: Editor;
};

export const TableDropdown: FC<TableDropdownProps> = ({ editor }) => {
  const isTableActive = editor.isActive("table");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 w-8 p-2 flex items-center justify-center",
            isTableActive && "bg-accent text-accent-foreground"
          )}
        >
          <Table className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {tableActions.map((item, index) => (
          <Fragment key={item.label}>
            {index === 1 && <DropdownMenuSeparator />}
            {index === 4 && <DropdownMenuSeparator />}
            {index === 7 && <DropdownMenuSeparator />}
            {index === 9 && <DropdownMenuSeparator />}
            <DropdownMenuItem
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
