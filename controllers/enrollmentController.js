import Enrollment from '../models/Enrollment.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Charger les variables d'environnement
dotenv.config();

export const submitEnrollment = async (req, res, next) => {
  try {
    const {
      type,
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      companyName,
      businessType,
      distributionArea,
      targetMarkets,
      industry,
      companySize,
      interests,
    } = req.body;

    // Valider le type d'enrôlement
    if (!['partner', 'distributor'].includes(type)) {
      return res.status(400).json({ error: 'Type d’enrôlement invalide' });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Créer un utilisateur automatiquement
    const password = crypto.randomBytes(8).toString('hex'); // Génère un mot de passe aléatoire
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = type; // Rôle basé sur le type (partner ou distributor)

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role,
      companyDetails: {
        name: companyName,
        type: businessType,
      },
    });
    await user.save();

    // Créer l'enrôlement
    const enrollmentData = {
      type,
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      companyName,
      businessType,
      distributionArea,
      targetMarkets,
      industry,
      companySize,
      interests,
      userId: user._id,
      status: 'pending',
    };

    const enrollment = new Enrollment(enrollmentData);
    await enrollment.save();

    // Vérifier les identifiants email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Erreur: EMAIL_USER ou EMAIL_PASS manquant dans .env');
    } else {
      // Créer le transporter à l'intérieur de la fonction
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Envoyer l'email de confirmation à l'utilisateur
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmation de votre demande d’inscription',
        text: `Bonjour ${firstName},\n\nMerci pour votre demande d’inscription en tant que ${type} chez BAY SA WAAR. Votre demande est en cours de traitement.\n\nVoici vos identifiants de connexion:\nEmail: ${email}\nMot de passe: ${password}\n\nVeuillez vous connecter à http://localhost:5173/login pour accéder à votre compte et changer votre mot de passe.\n\nCordialement,\nL'équipe BAY SA  WAAR`,
      });     

      // Tenter d'envoyer l'email
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'iguisse97@gmail.com',
          subject: `Nouvelle demande d'inscription - ${type}`,
          text: `Type: ${type}\nNom: ${firstName} ${lastName}\nEmail: ${email}\nTéléphone: ${phone}\nPays: ${country}\nVille: ${city}\nEntreprise: ${companyName}`,
        });
        console.log('Email envoyé avec succès');
      } catch (emailErr) {
        console.error('Erreur lors de l’envoi de l’email:', emailErr);
      }
    }

    res.status(201).json({ message: 'Demande soumise' });
  } catch (err) {
    next(err);
  }
};


export const getAllEnrollments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    const enrollments = await Enrollment.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const total = await Enrollment.countDocuments(query);
    res.json({ enrollments, total });
  } catch (err) {
    next(err);
  }
};

export const getEnrollmentById = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Inscription non trouvée' });
    }
    res.json(enrollment);
  } catch (err) {
    next(err);
  }
};

export const updateEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!enrollment) {
      return res.status(404).json({ error: 'Inscription non trouvée' });
    }
    res.json({ message: 'Inscription mise à jour', enrollment });
  } catch (err) {
    next(err);
  }
};

export const deleteEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Inscription non trouvée' });
    }
    res.json({ message: 'Inscription supprimée' });
  } catch (err) {
    next(err);
  }
};

export const getEnrollmentStatus = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

