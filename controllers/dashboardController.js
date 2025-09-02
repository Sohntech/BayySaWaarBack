import Enrollment from '../models/Enrollment.js';
import Product from '../models/Product.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';

export async function getDashboardData(req, res, next) {
  try {
    const enrollments = await Enrollment.find({ userId: req.userId });
    const orders = await Product.find({ /* Lien futur avec commandes */ }).limit(5);
    const user = await User.findById(req.userId);
    const contacts = await Contact.find({ email: user.email }).limit(5);
    const stats = {
      totalEnrollments: enrollments.length,
      pendingEnrollments: enrollments.filter(e => e.status === 'pending').length,
      approvedEnrollments: enrollments.filter(e => e.status === 'approved').length,
      recentOrders: orders,
      recentContacts: contacts
    };
    res.json({ enrollments, stats });
  } catch (err) {
    next(err);
  }
}


