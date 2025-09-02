import { Router } from 'express';
const router = Router();
import { getDashboardData } from '../controllers/dashboardController.js';
import authMiddleware from '../middlewares/auth.js';

router.get('/my-data', authMiddleware, getDashboardData);

export default router;
