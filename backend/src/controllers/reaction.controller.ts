import { Request, Response } from 'express';
import { Reaction } from '../models/Reaction';
import { Post } from '../models/Post';
import { Types } from 'mongoose';

export const incrementLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    // Find or create reaction
    let reaction = await Reaction.findOne({ user: userId, post: postId });

    if (reaction) {
      // Increment if below max
      if (reaction.count < 16) {
        reaction.count += 1;
        await reaction.save();
      }
    } else {
      // Create new reaction
      reaction = new Reaction({
        user: userId,
        post: postId,
        count: 1,
      });
      await reaction.save();
    }

    // Get total likes for the post
    const totalLikes = await Reaction.aggregate([
      { $match: { post: post._id } },
      { $group: { _id: null, total: { $sum: '$count' } } }
    ]);

    res.json({
      userLikes: reaction.count,
      totalLikes: totalLikes[0]?.total || 0,
      canLikeMore: reaction.count < 16
    });
  } catch (error) {
    console.error('Error incrementing like:', error);
    res.status(500).json({ error: 'Error incrementing like' });
  }
};

export const getLikeStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const reaction = await Reaction.findOne({ user: userId, post: postId });
    const totalLikes = await Reaction.aggregate([
      { $match: { post: Types.ObjectId.createFromHexString(postId) } },
      { $group: { _id: null, total: { $sum: '$count' } } }
    ]);

    res.json({
      userLikes: reaction?.count || 0,
      totalLikes: totalLikes[0]?.total || 0,
      canLikeMore: !reaction || reaction.count < 16
    });
  } catch (error) {
    console.error('Error getting like status:', error);
    res.status(500).json({ error: 'Error getting like status' });
  }
};

export const resetLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    await Reaction.findOneAndDelete({ user: userId, post: postId });

    const totalLikes = await Reaction.aggregate([
      { $match: { post: Types.ObjectId.createFromHexString(postId) } },
      { $group: { _id: null, total: { $sum: '$count' } } }
    ]);

    res.json({
      userLikes: 0,
      totalLikes: totalLikes[0]?.total || 0,
      canLikeMore: true
    });
  } catch (error) {
    console.error('Error resetting likes:', error);
    res.status(500).json({ error: 'Error resetting likes' });
  }
}; 