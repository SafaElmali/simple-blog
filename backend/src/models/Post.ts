import { Schema, model } from 'mongoose';

export interface IPost {
  title: string;
  description: string;
  content: string;
  coverImage: string;
  tags: string[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, required: true },
  tags: [{ type: String }],
  slug: { type: String, required: true, unique: true },
}, { timestamps: true });

// Create slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

export const Post = model<IPost>('Post', postSchema); 