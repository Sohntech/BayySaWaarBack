import express from 'express';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import authMiddleware from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

export default router;
