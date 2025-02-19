import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postsApi, CreatePostData, UpdatePostData } from "@/services/posts";
import { Post } from "@/types/post";
import { useToast } from "@/components/ui/use-toast";

// Query keys
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  bySlug: (slug: string) => [...postKeys.details(), { slug }] as const,
};

// Queries
const useGetPosts = () => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: () => postsApi.getAll(),
  });
};

const useGetPost = (id: string) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postsApi.getById(id),
    enabled: !!id,
  });
};

const useGetPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: postKeys.bySlug(slug),
    queryFn: () => postsApi.getBySlug(slug),
    enabled: !!slug,
  });
};

// Mutations
const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreatePostData) => postsApi.create(data),
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

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostData }) =>
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

const useDeletePost = () => {
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

const usePostsQuery = () => {
  const posts = useGetPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
  };
};

// Separate hooks for getting a single post to follow React Hooks rules
const usePostQuery = (id: string) => {
  return useGetPost(id);
};

const usePostBySlugQuery = (slug: string) => {
  return useGetPostBySlug(slug);
};

export { usePostsQuery, usePostQuery, usePostBySlugQuery };
