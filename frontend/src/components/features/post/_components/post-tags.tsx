import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FC } from "react";

type PostTagsProps = {
  tags: string[];
  className?: string;
};

const PostTags: FC<PostTagsProps> = ({ tags, className }) => {
  return (
    <div className={cn("flex gap-2 mb-2", className)}>
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export { PostTags };
