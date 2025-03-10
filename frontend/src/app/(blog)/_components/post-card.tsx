import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";
import { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

const PostCard: FC<PostCardProps> = ({ post }) => {
  const readingTime = calculateReadingTime(post.content);

  return (
    <Link
      href={`/${post.slug}`}
      className="group block space-y-4 rounded-lg border p-6 transition-colors hover:bg-muted/50"
    >
      {post.coverImage && (
        <div className="aspect-video overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={600}
            height={340}
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-2xl font-bold leading-tight tracking-tight">
          {post.title}
        </h2>
        <p className="text-muted-foreground">{post.description}</p>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <time dateTime={post.createdAt}>
          {format(new Date(post.createdAt), "MMMM d, yyyy")}
        </time>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{readingTime} min read</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-secondary px-2 py-1 rounded-md text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export { PostCard };
