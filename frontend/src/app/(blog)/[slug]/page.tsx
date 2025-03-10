"use client";

import { FC, use, useRef } from "react";
import { notFound, useRouter } from "next/navigation";
import { useGetPostBySlugQuery } from "@/queries/posts";
import { PostSkeleton } from "./_components/post-skeleton";
import { HtmlViewer } from "@/components/features/html-viewer/html-viewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PostReaction } from "./_components/post-reaction";
import { ReadingProgress } from "@/components/features/reading-progress";
import { PostTags } from "@/components/features/post/_components/post-tags";
import { PostReadTime } from "@/components/features/post/_components/post-read-time";
import { PostCreatedDate } from "@/components/features/post/_components/post-created-date";
import { PostDescription } from "@/components/features/post/_components/post-description";
import { PostTitle } from "@/components/features/post/_components/post-title";
import { PostCoverImage } from "@/components/features/post/_components/post-cover-image";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const BlogPostPage: FC<BlogPostPageProps> = ({ params }) => {
  const router = useRouter();
  const { slug } = use(params);
  const { data: post, isLoading, isError } = useGetPostBySlugQuery(slug);
  const articleRef = useRef<HTMLDivElement>(null);

  if (isError || (!isLoading && !post)) {
    notFound();
  }

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <>
      <ReadingProgress targetRef={articleRef} />
      <div className="min-h-[calc(100vh-4rem)] pb-24 relative">
        <article ref={articleRef} className="container max-w-4xl py-10">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-transparent hover:text-primary -ml-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <header className="mb-8">
            <PostTitle
              title={post!.title}
              className="text-4xl font-bold mb-2"
            />
            <PostDescription description={post!.description} className="mb-4" />
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <PostCreatedDate createdAt={post!.createdAt} />
              <PostReadTime content={post!.content} />
              <PostTags tags={post!.tags} className="m-0" />
            </div>
          </header>

          <PostCoverImage coverImage={post!.coverImage} title={post!.title} />

          <div className="mt-8">
            <HtmlViewer content={post!.content} />
          </div>
        </article>

        <PostReaction postId={post!._id} title={post!.title} />
      </div>
    </>
  );
};

export default BlogPostPage;
