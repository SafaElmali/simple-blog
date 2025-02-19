import { Router } from 'express';
import { login, register, createAdmin } from '../controllers/auth.controller';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/create-first', createAdmin);
router.post('/admin', adminAuth, createAdmin);

export default router; 