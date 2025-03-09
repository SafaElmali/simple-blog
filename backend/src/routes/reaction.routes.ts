import { Router } from 'express';
import { 
  incrementLike, 
  getLikeStatus, 
  resetLikes 
} from '../controllers/reaction.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/:postId/increment', auth, incrementLike);
router.delete('/:postId/reset', auth, resetLikes);
router.get('/:postId/status', auth, getLikeStatus);

export default router; 