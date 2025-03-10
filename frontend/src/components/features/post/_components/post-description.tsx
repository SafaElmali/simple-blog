import { cn } from "@/lib/utils";
import { FC } from "react";

type PostDescriptionProps = {
  description: string;
  className?: string;
};

const PostDescription: FC<PostDescriptionProps> = ({ description, className }) => {
  return (
    <p className={cn("text-muted-foreground mt-2 line-clamp-2 h-12", className)}>
      {description}
    </p>
  );
};

export { PostDescription };
