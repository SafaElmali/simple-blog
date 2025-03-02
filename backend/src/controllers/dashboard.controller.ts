import { Request, Response } from "express";
import { Post } from "../models/Post";
import { User } from "../models/User";

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalViews = await Post.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" }
        }
      }
    ]);
    const totalUsers = await User.countDocuments();

    // Get views over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const viewsOverTime = await Post.find(
      {
        createdAt: { $gte: thirtyDaysAgo }
      },
      'views createdAt',
      { sort: { createdAt: 1 } }
    );

    // Get popular posts
    const popularPosts = await Post.find(
      {},
      'title views slug',
      {
        sort: { views: -1 },
        limit: 5
      }
    );

    res.status(200).json({
      totalPosts,
      totalViews: totalViews[0]?.totalViews || 0,
      totalUsers,
      viewsOverTime,
      popularPosts
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ 
      error: "Failed to fetch dashboard statistics" 
    });
  }
}; 