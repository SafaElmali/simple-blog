import { Suspense } from "react";
import { PostList } from "@/app/(blog)/_components/post/post-list";
import { PostListSkeleton } from "@/app/(blog)/_components/post/post-list-skeleton";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  );
};

export default HomePage;
