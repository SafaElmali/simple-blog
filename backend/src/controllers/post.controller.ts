import { Request, Response } from 'express';
import { Post } from '../models/Post';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Error creating post' });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find and increment views in one operation
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true } // Return updated document
    );

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Error updating post' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};

export const incrementViews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const post = await Post.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.status(200).json({ views: post.views });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({ error: 'Failed to increment views' });
  }
}; 