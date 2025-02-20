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
import { useDeletePost, useGetPosts } from "@/queries/posts";
import { UrlUtil } from "@/lib/urls";
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
  const { data: posts, isLoading, isError } = useGetPosts();
  const { mutateAsync: deletePost, isPending } = useDeletePost();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="text-muted-foreground">Loading posts...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
          Error loading posts. Please try again later.
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">No posts found.</p>
        <Link href={UrlUtil.buildAdminPostsNewPath()}>
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
        {posts.map((post) => (
          <TableRow key={post._id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>
              {new Date(post.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{post.status}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={UrlUtil.buildAdminPostPath(post._id)}>
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
                        This action cannot be undone. This will permanently
                        delete the post &ldquo;{post.title}&rdquo;.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(post._id)}
                        disabled={isPending}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {isPending ? "Deleting..." : "Delete"}
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
