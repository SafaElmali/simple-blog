import { FC } from "react";

type PostDescriptionProps = {
  description: string;
};

const PostDescription: FC<PostDescriptionProps> = ({ description }) => {
  return (
    <p className="text-muted-foreground mt-2 line-clamp-2 h-12">
      {description}
    </p>
  );
};

export { PostDescription };
