import express from 'express';
import { submitEnrollment, getAllEnrollments, getEnrollmentById, updateEnrollment, deleteEnrollment, getEnrollmentStatus } from '../controllers/enrollmentController.js';
import validate from '../middlewares/validate.js';
import authMiddleware from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/submit', validate.enrollmentValidation, submitEnrollment);
router.get('/', authMiddleware, isAdmin, getAllEnrollments);
router.get('/:id', authMiddleware, isAdmin, getEnrollmentById);
router.put('/:id', authMiddleware, isAdmin, updateEnrollment);
router.delete('/:id', authMiddleware, isAdmin, deleteEnrollment);
router.get('/my-status', authMiddleware, getEnrollmentStatus);

export default router;
