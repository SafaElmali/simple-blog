"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardStats } from "@/queries/dashboard";

const DashboardPage = () => {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your blog statistics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
            <CardDescription>Number of published posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalPosts || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
            <CardDescription>Across all posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalViews || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>Post views in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
            {stats?.viewsOverTime
              ? "Chart implementation coming soon"
              : "No data available"}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Posts</CardTitle>
            <CardDescription>Most viewed posts</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {stats?.popularPosts && stats.popularPosts.length > 0 ? (
              <div className="space-y-4">
                {stats.popularPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="flex items-center justify-between"
                  >
                    <a href={`/posts/${post.slug}`} className="hover:underline">
                      {post.title}
                    </a>
                    <span className="text-muted-foreground">
                      {post.views} views
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No popular posts yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
