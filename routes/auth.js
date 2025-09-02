import express from 'express';
import validate from '../middlewares/validate.js'; // Import par défaut
import authMiddleware from '../middlewares/auth.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', validate.registerValidation, authController.register); // Accès via validate.registerValidation
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.getProfile);
//router.put('/profile', authMiddleware, validate.updateProfileValidation, authController.updateProfile); // Accès via validate.updateProfileValidation
//router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authController.getMe);

export default router;
