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
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email });
    if (existing) throw new Error('Déjà abonné');
    const subscription = new Newsletter({ email });
    await subscription.save();
    await sendEmail(email, 'Confirmation abonnement newsletter', 'Merci pour votre abonnement à la newsletter BAY SA WAAR !');
    res.status(201).json({ message: 'Abonnement réussi' });
  } catch (err) {
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
