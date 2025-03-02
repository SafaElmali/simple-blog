import { Schema, model } from 'mongoose';

export type Post = {
  title: string;
  description: string;
  content: string;
  coverImage: string;
  tags: string[];
  slug: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, required: true },
  tags: [{ type: String }],
  slug: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 },
}, { timestamps: true });

export const Post = model<Post>('Post', postSchema); 