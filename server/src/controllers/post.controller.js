import {Post} from '../models/post.model.js';

export const getPostController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({ posts, totalPosts, totalPages, currentPage: page });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};
