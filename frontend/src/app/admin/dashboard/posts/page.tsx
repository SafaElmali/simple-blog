import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PostList } from "@/app/admin/_components/post-list";
import { urls } from "@/lib/urls";

const PostsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Posts</h2>
          <p className="text-sm text-muted-foreground">
            Manage your blog posts
          </p>
        </div>
        <Link href={urls.admin.dashboard.posts.new}>
          <Button>Create Post</Button>
        </Link>
      </div>

      <Card className="p-6">
        <PostList />
      </Card>
    </div>
  );
};

export default PostsPage;
