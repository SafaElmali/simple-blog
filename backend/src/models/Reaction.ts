import { Schema, model, Types } from 'mongoose';

export interface IReaction {
  user: Types.ObjectId;
  post: Types.ObjectId;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  count: { type: Number, default: 1, min: 0, max: 16 }, // Maximum 16 likes per user
}, { timestamps: true });

// Ensure a user can only have one reaction record per post
reactionSchema.index({ user: 1, post: 1 }, { unique: true });

export const Reaction = model<IReaction>('Reaction', reactionSchema); 