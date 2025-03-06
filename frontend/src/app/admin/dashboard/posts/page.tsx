import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PostList } from "@/app/admin/dashboard/posts/_components/post-list";
import { UrlUtil } from "@/lib/urls";

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
        <Link href={UrlUtil.buildAdminPostsNewPath()}>
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
