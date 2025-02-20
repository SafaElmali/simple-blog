"use client";

import { useParams } from "next/navigation";
import { useGetPostById } from "@/queries/posts";
import { PostEditor } from "@/app/admin/_components/post-editor/post-editor";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";

const EditPostPage = () => {
  const params = useParams();
  const { data: post, isLoading, isError } = useGetPostById(
    params.id as string
  );

  if (isError || (!isLoading && !post)) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostEditor post={post} />
    </div>
  );
};

export default EditPostPage;
