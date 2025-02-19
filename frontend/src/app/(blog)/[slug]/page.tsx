"use client";

import { useParams } from "next/navigation";
import { usePostBySlugQuery } from "@/queries/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const BlogPostPage = () => {
  const params = useParams();
  const { data: post, isLoading, isError } = usePostBySlugQuery(params.slug as string);

  if (isError || (!isLoading && !post)) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-10">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <Skeleton className="aspect-video w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <article className="container max-w-4xl py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post!.title}</h1>
        <p className="text-muted-foreground mb-4">{post!.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post!.createdAt}>
            {format(new Date(post!.createdAt), "MMMM d, yyyy")}
          </time>
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

      <div
        className="prose prose-stone dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post!.content }}
      />
    </article>
  );
};

export default BlogPostPage;
