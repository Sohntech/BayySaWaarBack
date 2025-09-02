import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function testEmail() {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'test@example.com',
      subject: 'Test Email from Baysawar',
      text: 'Ceci est un test d’envoi d’email.',
    });
    console.log('Email envoyé avec succès');
  } catch (err) {
    console.error('Erreur lors de l’envoi de l’email:', err);
  }
}

testEmail();
