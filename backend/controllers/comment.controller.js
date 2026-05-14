const db = require('../config/db');

// ============ ADD COMMENT - NO LOGIN REQUIRED ============
const addComment = async (req, res) => {
  try {
    const { post_id, video_id, content, author_name, author_email } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    if (!post_id && !video_id) {
      return res.status(400).json({ message: 'Either post_id or video_id is required' });
    }
    
    const result = await db.query(
      `INSERT INTO comments (post_id, video_id, content, author_name, author_email, created_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [post_id || null, video_id || null, content, author_name || 'Anonymous', author_email || null]
    );
    
    res.status(201).json({ 
      message: 'Comment added successfully', 
      commentId: result[0].insertId 
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ============ GET COMMENTS - NO LOGIN REQUIRED ============
const getComments = async (req, res) => {
  try {
    const { post_id, video_id } = req.query;
    
    let query = `
      SELECT c.*, 
             c.author_name as name,
             DATE_FORMAT(c.created_at, '%Y-%m-%d %H:%i:%s') as created_at
      FROM comments c
      WHERE 1=1
    `;
    const params = [];
    
    if (post_id) {
      query += ' AND c.post_id = ?';
      params.push(post_id);
    }
    if (video_id) {
      query += ' AND c.video_id = ?';
      params.push(video_id);
    }
    
    query += ' ORDER BY c.created_at DESC';
    
    const [comments] = await db.query(query, params);
    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ============ DELETE COMMENT - ADMIN ONLY ============
const deleteComment = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Admin login required to delete comments' });
    }
    
    await db.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ============ GET ALL COMMENTS - ADMIN DASHBOARD ============
const getAllComments = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Admin login required' });
    }
    
    const [comments] = await db.query(`
      SELECT c.*, 
             p.title as post_title,
             v.title as video_title,
             DATE_FORMAT(c.created_at, '%Y-%m-%d %H:%i:%s') as created_at
      FROM comments c
      LEFT JOIN posts p ON c.post_id = p.id
      LEFT JOIN videos v ON c.video_id = v.id
      ORDER BY c.created_at DESC
      LIMIT 50
    `);
    
    res.json(comments);
  } catch (error) {
    console.error('Get all comments error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getComments, deleteComment, getAllComments };