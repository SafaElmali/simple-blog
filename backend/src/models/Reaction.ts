import { Schema, model } from 'mongoose';

export interface IReaction {
  ipAddress: string;
  post: string;
  hasLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  ipAddress: { type: String, required: true },
  post: { type: String, required: true },
  hasLiked: { type: Boolean, default: false },
}, { 
  timestamps: true,
});

// Ensure an IP can only have one reaction per post
reactionSchema.index({ ipAddress: 1, post: 1 }, { unique: true });

export const Reaction = model<IReaction>('Reaction', reactionSchema); 