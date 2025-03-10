import { FC } from "react";

type PostCreatedDateProps = {
  createdAt: string;
};

const PostCreatedDate: FC<PostCreatedDateProps> = ({ createdAt }) => {
  const createdDate = new Date(createdAt);
  const formattedDate = createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return <div>{formattedDate}</div>;
};

export { PostCreatedDate };
