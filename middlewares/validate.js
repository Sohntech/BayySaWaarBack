import { body, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  body('firstName').notEmpty().withMessage('Prénom requis'),
  body('lastName').notEmpty().withMessage('Nom requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Mot de passe doit avoir 6+ caractères'),
  body('role').isIn(['user', 'partner', 'distributor', 'admin']).withMessage('Rôle invalide'),
  body('companyDetails.name').optional().notEmpty().withMessage('Nom de l’entreprise requis si fourni'),
  body('companyDetails.type').optional().notEmpty().withMessage('Type d’entreprise requis si fourni'),
  body('companyDetails.years').optional().isInt({ min: 0 }).withMessage('Années d’expérience invalides'),
  handleValidationErrors,
];

const enrollmentValidation = [
  body('type').isIn(['partner', 'distributor']).withMessage('Type invalide'),
  body('firstName').notEmpty().withMessage('Prénom requis'),
  body('lastName').notEmpty().withMessage('Nom requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('phone').notEmpty().withMessage('Téléphone requis'),
  body('country').notEmpty().withMessage('Pays requis'),
  body('city').notEmpty().withMessage('Ville requise'),
  body('companyName').notEmpty().withMessage('Nom de l’entreprise requis'),
  body('businessType').notEmpty().withMessage('Type d’entreprise requis'),
  body('website').optional().isURL().withMessage('URL du site web invalide'),
  body('description').optional().notEmpty().withMessage('Description requise si fournie'),
  body('distributionArea').if(body('type').equals('distributor')).notEmpty().withMessage('Zone de distribution requise pour distributeur'),
  body('targetMarkets').if(body('type').equals('distributor')).notEmpty().withMessage('Marchés cibles requis pour distributeur'),
  body('industry').if(body('type').equals('client')).notEmpty().withMessage('Industrie requise pour client'),
  body('companySize').if(body('type').equals('client')).notEmpty().withMessage('Taille de l’entreprise requise pour client'),
  body('interests').if(body('type').equals('client')).isArray().withMessage('Intérêts doivent être un tableau'),
  handleValidationErrors,
];

const productValidation = [
  body('name').notEmpty().withMessage('Nom produit requis'),
  body('description').notEmpty().withMessage('Description requise'),
  body('price').isFloat({ min: 0 }).withMessage('Prix invalide'),
  body('stock').isInt({ min: 0 }).withMessage('Stock invalide'),
  body('category').optional().notEmpty().withMessage('Catégorie requise si fournie'),
  handleValidationErrors,
];

const blogValidation = [
  body('title').notEmpty().withMessage('Titre requis'),
  body('content').notEmpty().withMessage('Contenu requis'),
  body('author').notEmpty().withMessage('Auteur requis'),
  body('category').optional().notEmpty().withMessage('Catégorie requise si fournie'),
  body('tags').optional().isArray().withMessage('Tags doivent être un tableau'),
  handleValidationErrors,
];

const contactValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('message').notEmpty().withMessage('Message requis'),
  body('category').isIn(['information', 'partnership', 'support']).withMessage('Catégorie invalide'),
  handleValidationErrors,
];

export default { registerValidation, enrollmentValidation, productValidation, blogValidation, contactValidation };
