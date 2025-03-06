import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Editor } from "@tiptap/react";
import { FC } from "react";

const headingOptions = [
  { label: "Normal Text", value: "paragraph" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Heading 4", value: "h4" },
  { label: "Heading 5", value: "h5" },
  { label: "Heading 6", value: "h6" },
];

type HeadingDropdownProps = {
  editor: Editor;
};

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export const HeadingDropdown: FC<HeadingDropdownProps> = ({ editor }) => {
  const getCurrentHeading = () => {
    if (editor.isActive("paragraph")) return "paragraph";
    for (const level of [1, 2, 3, 4, 5, 6]) {
      if (editor.isActive("heading", { level })) return `h${level}`;
    }
    return "paragraph";
  };

  return (
    <Select
      value={getCurrentHeading()}
      onValueChange={(value) => {
        if (value === "paragraph") {
          editor.chain().focus().setParagraph().run();
        } else {
          const level = parseInt(value.charAt(1)) as Level;
          editor.chain().focus().toggleHeading({ level }).run();
        }
      }}
    >
      <SelectTrigger className="w-[130px] h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {headingOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
