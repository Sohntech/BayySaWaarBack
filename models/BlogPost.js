import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  authorBio: String,
  category: String,
  tags: [String],
  image: String,
  readTime: String,
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now }
  }],
  relatedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('BlogPost', blogPostSchema);
