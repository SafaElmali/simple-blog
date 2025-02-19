import { Post } from "@/types/post";
import { axiosInstance } from "@/lib/axios";

export type CreatePostData = Omit<Post, "_id" | "createdAt" | "updatedAt">;
export type UpdatePostData = Partial<CreatePostData>;

const ENDPOINTS = {
  POSTS: "/api/posts",
  POST_BY_ID: (id: string) => `/api/posts/${id}`,
  POST_BY_SLUG: (slug: string) => `/api/posts/by-slug/${slug}`,
} as const;

export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    try {
      const { data } = await axiosInstance.get<Post[]>(ENDPOINTS.POSTS);
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Post> => {
    try {
      const { data } = await axiosInstance.get<Post>(ENDPOINTS.POST_BY_ID(id));
      return data;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  },

  getBySlug: async (slug: string): Promise<Post | null | null> => {
    if (!slug) return null;

    try {
      const { data } = await axiosInstance.get<Post>(
        ENDPOINTS.POST_BY_SLUG(slug)
      );
      return data;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  },

  create: async (postData: CreatePostData): Promise<Post> => {
    try {
      const { data } = await axiosInstance.post<Post>(
        ENDPOINTS.POSTS,
        postData
      );
      return data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },

  update: async (id: string, postData: UpdatePostData): Promise<Post> => {
    try {
      const { data } = await axiosInstance.put<Post>(
        ENDPOINTS.POST_BY_ID(id),
        postData
      );
      return data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(ENDPOINTS.POST_BY_ID(id));
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },
};
