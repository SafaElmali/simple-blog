import { Router, RequestHandler } from "express";
import { adminAuth } from "../middleware/auth";
import { Post } from "../models/Post";
import { getPostById } from "../controllers/post.controller";

const router = Router();

// Get all posts
const getAllPosts: RequestHandler = async (_req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Get post by slug
const getPostBySlug: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Create new post
const createPost: RequestHandler = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// Update post by ID
const updatePost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Delete post by ID
const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Define routes - order matters!
router.get("/", getAllPosts);
router.get("/by-slug/:slug", getPostBySlug);  // More specific route first
router.get("/:id", getPostById);              // Dynamic route after

// Admin routes
router.post("/", adminAuth, createPost);
router.put("/:id", adminAuth, updatePost);
router.delete("/:id", adminAuth, deletePost);

export default router; 