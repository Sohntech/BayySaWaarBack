import express from 'express';
import { submitEnrollment, getAllEnrollments, getEnrollmentById, updateEnrollment, deleteEnrollment, getEnrollmentStatus } from '../controllers/enrollmentController.js';
import validate from '../middlewares/validate.js';
import authMiddleware from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
import { uploadEnrollmentImages, handleUploadError } from '../middlewares/cloudinaryUpload.js';

const router = express.Router();

router.post('/submit', uploadEnrollmentImages, handleUploadError, submitEnrollment);
router.get('/my-status', authMiddleware, getEnrollmentStatus);
router.get('/', authMiddleware, isAdmin, getAllEnrollments);
router.get('/:id', authMiddleware, isAdmin, getEnrollmentById);
router.put('/:id', authMiddleware, isAdmin, updateEnrollment);
router.delete('/:id', authMiddleware, isAdmin, deleteEnrollment);

export default router;
