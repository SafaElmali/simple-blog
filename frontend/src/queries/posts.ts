import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/services/posts";
import { CreatePost, Post, UpdatePost } from "@/types/post";
import { useToast } from "@/components/ui/use-toast";

// Query keys
export const postKeys = {
  all: ["posts"],
  lists: () => [...postKeys.all, "list"],
  list: (filters: string) => [...postKeys.lists(), { filters }],
  details: () => [...postKeys.all, "detail"],
  detail: (id?: string) => [...postKeys.details(), id],
  bySlug: (slug?: string) => [...postKeys.details(), { slug }],
};

// Queries
const useGetPostsQuery = () => {
  const { data, isLoading, error,isError } = useQuery({
    queryKey: postKeys.lists(),
    queryFn: () => postsApi.getAll(),
  });

  const activePosts = data?.filter((post) => post.status === "published");

  return { data, isLoading, error, activePosts, isError };
};

const useGetPostBySlugQuery = (slug?: string) => {
  return useQuery({
    queryKey: postKeys.bySlug(slug),
    queryFn: () => postsApi.getBySlug(slug),
    enabled: !!slug,
  });
};

const useGetPostByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postsApi.getById(id),
    enabled: !!id,
  });
};

// Mutations
const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreatePost) => postsApi.create(data),
    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(postKeys.lists(), (old = []) => [
        ...old,
        newPost,
      ]);
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to create post: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePost }) =>
      postsApi.update(id, data),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<Post[]>(postKeys.lists(), (old = []) =>
        old.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
      queryClient.setQueryData(postKeys.detail(updatedPost._id), updatedPost);
      queryClient.setQueryData(postKeys.bySlug(updatedPost.slug), updatedPost);
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update post: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => postsApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Post[]>(postKeys.lists(), (old = []) =>
        old.filter((post) => post._id !== deletedId)
      );
      queryClient.removeQueries({ queryKey: postKeys.detail(deletedId) });
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete post: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export {
  useGetPostsQuery,
  useGetPostBySlugQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
};
