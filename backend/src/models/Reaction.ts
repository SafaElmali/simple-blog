import { Schema, model, Types } from 'mongoose';

export interface IReaction {
  user: Types.ObjectId;
  post: Types.ObjectId;
  hasLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  hasLiked: { type: Boolean, default: false },
}, { 
  timestamps: true,
});

// Ensure a user can only have one reaction per post
reactionSchema.index({ user: 1, post: 1 }, { unique: true });

export const Reaction = model<IReaction>('Reaction', reactionSchema); 