import { Card, CardContent, CardHeader, CardTitle } from "@/app/admin/_components/ui/card";

type Post = {
  _id: string;
  title: string;
  published: boolean;
};

const getPostStats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  const posts: Post[] = await res.json();

  return {
    total: posts.length,
    published: posts.filter((post) => post.published).length,
    draft: posts.filter((post) => !post.published).length,
  };
};

const PostStats = async () => {
  const stats = await getPostStats();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.published}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Drafts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.draft}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export { PostStats };
