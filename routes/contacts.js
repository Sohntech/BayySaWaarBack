import { Router } from 'express';
const router = Router();
import { submitContact, subscribeNewsletter, getAllContacts, updateContactStatus } from '../controllers/contactController.js';
import validate from '../middlewares/validate.js'; // Import par défaut
import authMiddleware from '../middlewares/auth.js';

router.post('/submit', validate.contactValidation, submitContact); // Accès via validate.contactValidation
router.post('/newsletter', subscribeNewsletter);
router.get('/', authMiddleware, getAllContacts);
router.patch('/:id', authMiddleware, updateContactStatus);

export default router;
