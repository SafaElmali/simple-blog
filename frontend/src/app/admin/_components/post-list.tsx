"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { usePostsQuery } from "@/queries/posts";
import { urls } from "@/lib/urls";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const PostList = () => {
  const { posts, deletePost } = usePostsQuery();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deletePost.mutateAsync(id);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post",
      });
    }
  };

  if (posts.isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="text-muted-foreground">Loading posts...</div>
      </div>
    );
  }

  if (posts.isError) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
          Error loading posts. Please try again later.
        </div>
      </div>
    );
  }

  if (!posts.data || posts.data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">No posts found.</p>
        <Link href={urls.admin.dashboard.posts.new}>
          <Button className="mt-4">Create your first post</Button>
        </Link>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.data.map((post) => (
          <TableRow key={post._id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>
              {new Date(post.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{post.status}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={urls.admin.dashboard.posts.edit(post._id)}>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post
                        &ldquo;{post.title}&rdquo;.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(post._id)}
                        disabled={deletePost.isPending}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {deletePost.isPending ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
