import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Post } from "@/types/post";
import { FC } from "react";

type PostCardProps = {
  post: Post;
};

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`${post.slug}`} className="block group">
      <Card className="overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-md">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex gap-2 mb-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground mt-2 line-clamp-2">
            {post.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardFooter>
      </Card>
    </Link>
  );
};

export { PostCard };
