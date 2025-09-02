import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: String,
  createdAt: { type: Date, default: Date.now }
});

export default model('Product', productSchema);
