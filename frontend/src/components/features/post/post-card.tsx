import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Post } from "@/types/post";
import { FC } from "react";
import { calculateReadingTime } from "@/lib/utils";

type PostCardProps = {
  post: Post;
};

const PostCard: FC<PostCardProps> = ({ post }) => {
  const createdDate = new Date(post.createdAt);
  const formattedDate = createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <p className="text-muted-foreground mt-2 line-clamp-2 h-12">
            {post.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex items-center gap-4">
          {formattedDate}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{calculateReadingTime(post.content)} min read</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export { PostCard };
