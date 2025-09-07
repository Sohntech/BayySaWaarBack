import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import authMiddleware from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import { uploadProductImages, handleUploadError } from '../middlewares/cloudinaryUpload.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, isAdmin, uploadProductImages, handleUploadError, createProduct);
router.put('/:id', authMiddleware, isAdmin, uploadProductImages, handleUploadError, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

export default router;
