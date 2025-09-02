import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  getUsersByRole,
  searchUsers,
  filterUsers,
  getUserStats,
  submitEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  getMe,
  getEnrollmentStatus,
    deleteUser
} from '../controllers/adminController.js';
import authMiddleware  from '../middlewares/auth.js';
import  isAdmin  from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/stats', authMiddleware, isAdmin, getAdminStats);
router.get('/users', authMiddleware, isAdmin, getAllUsers);
router.delete('/users/:id', authMiddleware, isAdmin, deleteUser);
router.get('/users/role/:role', authMiddleware, isAdmin, getUsersByRole);
router.get('/users/search', authMiddleware, isAdmin, searchUsers);
router.get('/users/filter', authMiddleware, isAdmin, filterUsers);
router.get('/user-stats', authMiddleware, isAdmin, getUserStats);
router.post('/enrollments', authMiddleware, isAdmin, submitEnrollment);
router.get('/enrollments', authMiddleware, isAdmin, getAllEnrollments);
router.get('/enrollments/:id', authMiddleware, isAdmin, getEnrollmentById);
router.put('/enrollments/:id', authMiddleware, isAdmin, updateEnrollment);
router.delete('/enrollments/:id', authMiddleware, isAdmin, deleteEnrollment);
router.get('/me', authMiddleware, isAdmin, getMe);
router.get('/enrollment-status', authMiddleware, isAdmin, getEnrollmentStatus);

export default router;
