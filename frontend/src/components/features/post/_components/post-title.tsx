import { FC } from "react";

type PostTitleProps = {
  title: string;
};

const PostTitle: FC<PostTitleProps> = ({ title }) => {
  return (
    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
      {title}
    </h2>
  );
};

export { PostTitle };
