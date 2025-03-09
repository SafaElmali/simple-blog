"use client";

import { FC, use } from "react";
import { format } from "date-fns";
import { notFound, useRouter } from "next/navigation";
import { useGetPostBySlugQuery } from "@/queries/posts";
import Image from "next/image";
import { PostSkeleton } from "./_components/post-skeleton";
import { HtmlViewer } from "@/components/features/html-viewer/html-viewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { PostReaction } from "./_components/post-reaction";
import { calculateReadingTime } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const BlogPostPage: FC<BlogPostPageProps> = ({ params }) => {
  const router = useRouter();
  const { slug } = use(params);
  const { data: post, isLoading, isError } = useGetPostBySlugQuery(slug);

  if (isError || (!isLoading && !post)) {
    notFound();
  }

  if (isLoading) {
    return <PostSkeleton />;
  }

  const readingTime = calculateReadingTime(post!.content);

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24 relative">
      <article className="container max-w-4xl py-10">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-transparent hover:text-primary -ml-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post!.title}</h1>
          <p className="text-muted-foreground mb-4">{post!.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post!.createdAt}>
              {format(new Date(post!.createdAt), "MMMM d, yyyy")}
            </time>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            {post!.tags && post!.tags.length > 0 && (
              <div className="flex gap-2">
                {post!.tags.map((tag) => (
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
        </header>

        {post!.coverImage && (
          <div className="mb-8">
            <Image
              src={post!.coverImage}
              alt={post!.title}
              width={1200}
              height={630}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        )}

        <HtmlViewer content={post!.content} />
      </article>

      <PostReaction postId={post!._id} title={post!.title} />
    </div>
  );
};

export default BlogPostPage;
