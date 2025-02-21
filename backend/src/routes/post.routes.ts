import { Router } from "express";
import { adminAuth } from "../middleware/auth";
import {
  createPost,
  deletePost,
  getPostById,
  getPostBySlug,
  getPosts,
  updatePost,
} from "../controllers/post.controller";

const router = Router();

// Define routes - order matters!
router.get("/", getPosts);
router.get("/by-slug/:slug", getPostBySlug);  // More specific route first
router.get("/:id", getPostById);              // Dynamic route after

// Admin routes
router.post("/", adminAuth, createPost);
router.put("/:id", adminAuth, updatePost);
router.delete("/:id", adminAuth, deletePost);

export default router; 