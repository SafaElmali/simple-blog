import { Badge } from "@/components/ui/badge";
import { FC } from "react";

type PostTagsProps = {
  tags: string[];
};

const PostTags: FC<PostTagsProps> = ({ tags }) => {
  return (
    <div className="flex gap-2 mb-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export { PostTags };
