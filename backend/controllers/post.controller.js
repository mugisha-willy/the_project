const db = require('../config/db');
const { uploadToCloudinary } = require('../middleware/upload');

const createPost = async (req, res) => {
  try {
    const { title, content, category, isSponsored, isFeatured } = req.body;
    let image = null;
    
    if (req.file) {
      image = await uploadToCloudinary(req.file);
    }
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    const result = await db.query(
      `INSERT INTO posts (title, content, image, category, is_sponsored, is_featured, views) 
       VALUES (?, ?, ?, ?, ?, ?, 0)`,
      [title, content, image, category || 'general', isSponsored || false, isFeatured || false]
    );
    
    res.status(201).json({ message: 'Post created successfully', postId: result[0].insertId });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    let query = 'SELECT * FROM posts WHERE 1=1';
    const params = [];
    
    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }
    
    if (featured === 'true') {
      query += ' AND is_featured = 1';
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM posts');
    
    res.json({
      posts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ NO view increment here - PURE read only
const getPostById = async (req, res) => {
  try {
    const [posts] = await db.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    
    if (!posts.length) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // ✅ NO database update here - just return the data
    res.json(posts[0]);
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ ONLY place where views are incremented
const incrementPostView = async (req, res) => {
  try {
    console.log(`📊 Incrementing view for post ID: ${req.params.id}`);
    await db.query('UPDATE posts SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Increment view error:', error);
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, category, isSponsored, isFeatured } = req.body;
    let image = null;
    
    if (req.file) {
      image = await uploadToCloudinary(req.file);
    }
    
    const fields = [];
    const values = [];
    
    if (title) { fields.push('title = ?'); values.push(title); }
    if (content) { fields.push('content = ?'); values.push(content); }
    if (category) { fields.push('category = ?'); values.push(category); }
    if (isSponsored !== undefined) { fields.push('is_sponsored = ?'); values.push(isSponsored); }
    if (isFeatured !== undefined) { fields.push('is_featured = ?'); values.push(isFeatured); }
    if (image) { fields.push('image = ?'); values.push(image); }
    
    if (!fields.length) {
      return res.status(400).json({ message: 'No fields to update' });
    }
    
    values.push(req.params.id);
    await db.query(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`, values);
    
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createPost, 
  getPosts, 
  getPostById, 
  updatePost, 
  deletePost,
  incrementPostView
};