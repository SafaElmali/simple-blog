"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { FC, KeyboardEvent, useState } from "react";

type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  minTagLength?: number;
  placeholder?: string;
  className?: string;
};

const TagInput: FC<TagInputProps> = ({
  tags,
  onChange,
  maxTags = 5,
  minTagLength = 2,
  placeholder = "Add a tag and press Enter",
  className = "",
}) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && trimmedTag.length >= minTagLength) {
      if (tags.length < maxTags && !tags.includes(trimmedTag)) {
        onChange([...tags, trimmedTag]);
        setNewTag("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
            <Button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 hover:text-destructive p-0 size-3"
              variant="ghost"
            >
              <X className="size-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <Input
        placeholder={placeholder}
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={tags.length >= maxTags}
      />
    </div>
  );
};

export { TagInput };
