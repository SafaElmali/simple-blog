"use client";

import { PostCard } from "@/components/features/post/post-card";
import { useGetPostsQuery } from "@/queries/posts";
import { PostListSkeleton } from "./post-list-skeleton";

const PostList = () => {
  const { data: activePosts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <PostListSkeleton />;
  }

  if (activePosts?.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activePosts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export { PostList };