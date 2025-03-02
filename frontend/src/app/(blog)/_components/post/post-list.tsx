"use client";

import { PostCard } from "@/app/(blog)/_components/post/post-card";
import { useGetPosts } from "@/queries/posts";

export const PostList = () => {
  const { activePosts } = useGetPosts();

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
