import { Router } from 'express';
const router = Router();
import { setConfig, getConfigs, deleteConfig, fetchPosts } from '../controllers/socialController.js';
import authMiddleware from '../middlewares/auth.js';

router.post('/config', authMiddleware, setConfig);
router.get('/config', authMiddleware, getConfigs);
router.delete('/config/:id', authMiddleware, deleteConfig);
router.get('/posts', fetchPosts);

export default router;
