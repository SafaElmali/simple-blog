import { Request, Response } from "express";
import { Reaction } from "../models/Reaction";
import { isValidObjectId } from "mongoose";
import { getClientIp } from "../utils";

export const getLikeStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const ipAddress = getClientIp(req);

    if (!isValidObjectId(postId)) {
      res.status(400).json({ error: "Invalid post ID" });
      return;
    }

    // Get IP's reaction
    const reaction = await Reaction.findOne({ ipAddress, post: postId });

    // Get total likes
    const totalLikes = await Reaction.countDocuments({
      post: postId,
      hasLiked: true,
    });

    res.json({
      userLikes: reaction?.hasLiked ? 1 : 0,
      totalLikes,
      canLikeMore: !reaction?.hasLiked,
    });
  } catch (error) {
    console.error("Error getting like status:", error);
    res.status(500).json({ error: "Failed to get like status" });
  }
};

export const incrementLike = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const ipAddress = getClientIp(req);

    if (!isValidObjectId(postId)) {
      res.status(400).json({ error: "Invalid post ID" });
      return;
    }

    // Find or create reaction
    let reaction = await Reaction.findOne({ ipAddress, post: postId });

    if (reaction) {
      // Toggle the like
      reaction.hasLiked = !reaction.hasLiked;
      await reaction.save();
    } else {
      // Create new reaction with like
      reaction = await Reaction.create({
        ipAddress,
        post: postId,
        hasLiked: true,
      });
    }

    // Get updated total likes
    const totalLikes = await Reaction.countDocuments({
      post: postId,
      hasLiked: true,
    });

    res.json({
      userLikes: reaction.hasLiked ? 1 : 0,
      totalLikes,
      canLikeMore: !reaction.hasLiked,
    });
  } catch (error) {
    console.error("Error incrementing like:", error);
    res.status(500).json({ error: "Failed to update like" });
  }
};

export const resetLikes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;

    if (!isValidObjectId(postId)) {
      res.status(400).json({ error: "Invalid post ID" });
      return;
    }

    // Reset all reactions for this post
    await Reaction.updateMany({ post: postId }, { hasLiked: false });

    res.json({
      userLikes: 0,
      totalLikes: 0,
      canLikeMore: true,
    });
  } catch (error) {
    console.error("Error resetting likes:", error);
    res.status(500).json({ error: "Failed to reset likes" });
  }
};
