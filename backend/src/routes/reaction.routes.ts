import { Router } from 'express';
import { 
  incrementLike, 
  getLikeStatus, 
  resetLikes 
} from '../controllers/reaction.controller';

const router = Router();

// Public endpoint - no auth required
router.get('/:postId/status', getLikeStatus);

// Protected endpoints - require auth
router.post('/:postId/increment', incrementLike);
router.delete('/:postId/reset', resetLikes);

export default router; 