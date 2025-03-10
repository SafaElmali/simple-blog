import { cn } from "@/lib/utils";
import { FC } from "react";

type PostTitleProps = {
  title: string;
  className?: string;
};

const PostTitle: FC<PostTitleProps> = ({ title, className }) => {
  return (
    <h2
      className={cn(
        "text-xl font-semibold group-hover:text-primary transition-colors",
        className
      )}
    >
      {title}
    </h2>
  );
};

export { PostTitle };
