import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Quote,
  Redo,
  Underline,
  Undo,
  Minus,
  Sparkles,
} from "lucide-react";
import { FC, useState } from "react";
import { HeadingDropdown } from "./_components/heading-dropdown";
import { FormattingDropdown } from "./_components/formatting-dropdown";
import { ListDropdown } from "./_components/list-dropdown";
import { TableDropdown } from "./_components/table-dropdown";
import { TaskListDropdown } from "./_components/task-list-dropdown";
import { ColorDropdown } from "../../_components/color-picker/color-dropdown";
import { AlignmentDropdown } from "./_components/alignment-dropdown";
import { LinkButton } from "../link/link";
import { ToggleButton } from "../../_components/toggle-button";
import { AIPromptDialog } from "../ai-prompt-dialog";

type ToolbarProps = {
  editor: Editor | null;
};

const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  const [showAIDialog, setShowAIDialog] = useState(false);

  const handleGenerateSuccess = (content: string) => {
    if (editor) {
      editor.commands.setContent(content);
    }
  };

  if (!editor) return null;

  return (
    <div className="bg-transparent rounded-t-md overflow-x-auto">
      <div className="flex items-center gap-1 p-1 min-w-max border-b border-input">
        <HeadingDropdown editor={editor} />
        <ToggleButton
          icon={<Bold className="h-4 w-4" />}
          label="Toggle bold"
          command={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        />
        <ToggleButton
          icon={<Italic className="h-4 w-4" />}
          label="Toggle italic"
          command={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        />
        <ToggleButton
          icon={<Underline className="h-4 w-4" />}
          label="Toggle underline"
          command={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        />
        <ToggleButton
          icon={<Quote className="h-4 w-4" />}
          label="Toggle quote"
          command={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        />
        <ToggleButton
          icon={<Undo className="h-4 w-4" />}
          label="Undo"
          command={() => editor.chain().focus().undo().run()}
          isActive={false}
          disabled={!editor.can().undo()}
        />
        <ToggleButton
          icon={<Redo className="h-4 w-4" />}
          label="Redo"
          command={() => editor.chain().focus().redo().run()}
          isActive={false}
          disabled={!editor.can().redo()}
        />
        <ToggleButton
          icon={<Minus className="h-4 w-4" />}
          label="Horizontal Rule"
          command={() => editor.chain().focus().setHorizontalRule().run()}
          isActive={false}
        />
        {/* <ImageButton editor={editor} /> */}
        <LinkButton editor={editor} />
        <ColorDropdown editor={editor} />
        <AlignmentDropdown editor={editor} />
        <TableDropdown editor={editor} />
        <ListDropdown editor={editor} />
        <TaskListDropdown editor={editor} />
        <FormattingDropdown editor={editor} />
        <div className="flex-1" />
        <div className="w-px h-6 bg-border" />
        <ToggleButton
          icon={<Sparkles className="h-4 w-4 text-purple-500" />}
          label="Generate AI Content"
          command={() => setShowAIDialog(true)}
          isActive={false}
        />
      </div>
      <AIPromptDialog
        open={showAIDialog}
        onOpenChange={setShowAIDialog}
        onSubmitSuccess={handleGenerateSuccess}
      />
    </div>
  );
};

export { Toolbar };
