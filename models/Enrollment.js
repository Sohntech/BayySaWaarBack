import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['partner', 'distributor'] },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  companyName: { type: String, required: true },
  businessType: { type: String, required: true },
  distributionArea: { type: String },
  targetMarkets: { type: String },
  industry: { type: String },
  companySize: { type: String },
  interests: [{ type: String }],
  // Champs pour les images
  companyLogo: {
    publicId: { type: String },
    url: { type: String }
  },
  businessDocuments: [{
    publicId: { type: String },
    url: { type: String },
    name: { type: String }
  }],
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Enrollment', enrollmentSchema);
