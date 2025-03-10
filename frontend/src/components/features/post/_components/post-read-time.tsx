import { calculateReadingTime } from "@/lib/utils";
import { Clock } from "lucide-react";
import { FC } from "react";

type PostReadTimeProps = {
  content: string;
};

const PostReadTime: FC<PostReadTimeProps> = ({ content }) => {
  return (
    <div className="flex items-center gap-1">
      <Clock className="h-4 w-4" />
      <span>{calculateReadingTime(content)} min read</span>
    </div>
  );
};

export { PostReadTime };
