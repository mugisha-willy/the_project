const db = require('../config/db');

// ============ VIEW TRACKING ============
const viewVideo = async (req, res) => {
  try {
    await db.query('UPDATE videos SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'View tracked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewPost = async (req, res) => {
  try {
    await db.query('UPDATE posts SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'View tracked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ LIKE VIDEO - NO LOGIN REQUIRED ============
const likeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('INSERT INTO likes (video_id) VALUES (?)', [id]);
    res.json({ message: 'Video liked', liked: true });
  } catch (error) {
    console.error('Like video error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ============ LIKE POST - NO LOGIN REQUIRED ============
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('INSERT INTO likes (post_id) VALUES (?)', [id]);
    res.json({ message: 'Post liked', liked: true });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ============ GET LIKE COUNT - NO LOGIN REQUIRED ============
const getLikes = async (req, res) => {
  try {
    const { video_id, post_id } = req.query;
    
    if (video_id) {
      const [[{ count }]] = await db.query('SELECT COUNT(*) as count FROM likes WHERE video_id = ?', [video_id]);
      return res.json({ count });
    }
    
    if (post_id) {
      const [[{ count }]] = await db.query('SELECT COUNT(*) as count FROM likes WHERE post_id = ?', [post_id]);
      return res.json({ count });
    }
    
    res.json({ count: 0 });
  } catch (error) {
    console.error('Get likes error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { viewVideo, viewPost, likeVideo, likePost, getLikes };