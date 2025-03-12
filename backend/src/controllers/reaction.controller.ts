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

    const reaction = await Reaction.findOne({ ipAddress, post: postId });

    // Get total likes
    const totalLikes = await Reaction.aggregate([
      { $match: { post: postId } },
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);

    res.json({
      userLikes: reaction?.count || 0,
      totalLikes: totalLikes[0]?.total || 0,
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

    // Increment or create reaction
    const reaction = await Reaction.findOneAndUpdate(
      { ipAddress, post: postId },
      { 
        $inc: { count: 1 },
        $setOnInsert: { ipAddress, post: postId }
      },
      { upsert: true, new: true }
    ).lean();

    // Get updated total likes
    const totalLikes = await Reaction.aggregate([
      { $match: { post: postId } },
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);

    res.json({
      userLikes: reaction?.count || 0,
      totalLikes: totalLikes[0]?.total || 0,
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
    await Reaction.deleteMany({ post: postId });

    res.json({
      userLikes: 0,
      totalLikes: 0,
    });
  } catch (error) {
    console.error("Error resetting likes:", error);
    res.status(500).json({ error: "Failed to reset likes" });
  }
};
