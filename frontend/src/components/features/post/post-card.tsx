import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Post } from "@/types/post";
import { FC } from "react";
import { PostTags } from "./_components/post-tags";
import { PostCoverImage } from "./_components/post-cover-image";
import { PostTitle } from "./_components/post-title";
import { PostDescription } from "./_components/post-description";
import { PostReadTime } from "./_components/post-read-time";
import { PostCreatedDate } from "./_components/post-created-date";

type PostCardProps = {
  post: Post;
};

// To-DO: Instead the post, we can only pass the post id or slug and fetch the post data from the server

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`${post.slug}`} className="block group">
      <Card className="overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-md">
        <CardHeader className="p-0">
          <PostCoverImage coverImage={post.coverImage} title={post.title} />
        </CardHeader>
        <CardContent className="p-4">
          <PostTags tags={post.tags} />
          <PostTitle title={post.title} />
          <PostDescription description={post.description} />
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex items-center gap-4">
          <PostCreatedDate createdAt={post.createdAt} />
          <PostReadTime content={post.content} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export { PostCard };
