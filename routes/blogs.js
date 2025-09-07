import express from 'express';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import authMiddleware from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import { uploadBlogImages, handleUploadError } from '../middlewares/cloudinaryUpload.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', authMiddleware, isAdmin, uploadBlogImages, handleUploadError, createBlog);
router.put('/:id', authMiddleware, isAdmin, uploadBlogImages, handleUploadError, updateBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

export default router;
