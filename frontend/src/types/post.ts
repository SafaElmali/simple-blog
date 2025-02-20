export type Post = {
  _id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  tags: string[];
  slug: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export type CreatePost = Omit<Post, "_id" | "createdAt" | "updatedAt">;
export type UpdatePost = Partial<CreatePost>;
