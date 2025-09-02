import BlogPost from '../models/BlogPost.js';

export const getAllBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const query = category ? { category } : {};
    const blogs = await BlogPost.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const total = await BlogPost.countDocuments(query);
    res.json({ blogs, total });
  } catch (err) {
    next(err);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const blog = new BlogPost(req.body);
    await blog.save();
    res.status(201).json({ message: 'Article créé', blog });
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }
    res.json({ message: 'Article mis à jour', blog });
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    next(err);
  }
};
