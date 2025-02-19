import Link from "next/link";
import { Button } from "@/components/ui/button";
import { urls } from "@/lib/urls";

export default function PostNotFound() {
  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight">Post Not Found</h2>
        <p className="mt-4 text-muted-foreground">
          The post you are looking for does not exist or has been removed.
        </p>
        <Link href={urls.admin.dashboard.posts.root} className="mt-8 inline-block">
          <Button>Return to Posts</Button>
        </Link>
      </div>
    </div>
  );
} 