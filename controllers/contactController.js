import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';
import sendEmail from '../utils/sendEmail.js';
import { v4 as uuidv4 } from 'uuid';

export async function submitContact(req, res, next) {
  try {
    const contact = new Contact({ ...req.body, ticketId: uuidv4() });
    await contact.save();
    await sendEmail('admin@baysawaar.com', `Nouveau ticket: ${contact.ticketId}`, `Catégorie: ${contact.category}\nMessage: ${contact.message}`);
    res.status(201).json({ message: 'Message soumis', ticketId: contact.ticketId });
  } catch (err) {
    next(err);
  }
}

export async function subscribeNewsletter(req, res, next) {
  try {
    console.log('🔍 subscribeNewsletter called with email:', req.body.email);
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }
    
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      console.log('⚠️ Email déjà abonné:', email);
      return res.status(409).json({ error: 'Déjà abonné' });
    }
    
    console.log('💾 Sauvegarde de l\'abonnement...');
    const subscription = new Newsletter({ email });
    await subscription.save();
    console.log('✅ Abonnement sauvegardé');
    
    // Envoi d'email désactivé temporairement
    console.log('📧 Envoi d\'email désactivé temporairement');
    // TODO: Réactiver l'envoi d'email une fois la configuration corrigée
    
    res.status(201).json({ message: 'Abonnement réussi' });
  } catch (err) {
    console.error('❌ Erreur dans subscribeNewsletter:', err);
    next(err);
  }
}

export async function getAllContacts(req, res, next) {
  if (req.userRole !== 'admin') throw new Error('Accès interdit');
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
}

export async function updateContactStatus(req, res, next) {
  if (req.userRole !== 'admin') throw new Error('Accès interdit');
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!contact) throw new Error('Message non trouvé');
    res.json(contact);
  } catch (err) {
    next(err);
  }
}
