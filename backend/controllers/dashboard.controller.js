const db = require('../config/db');

const getDashboard = async (req, res) => {
  try {
    // Get counts from existing tables
    const [[{ totalVideos }]] = await db.query('SELECT COUNT(*) as totalVideos FROM videos');
    const [[{ totalPosts }]] = await db.query('SELECT COUNT(*) as totalPosts FROM posts');
    const [[{ totalVideoViews }]] = await db.query('SELECT COALESCE(SUM(views), 0) as totalVideoViews FROM videos');
    const [[{ totalPostViews }]] = await db.query('SELECT COALESCE(SUM(views), 0) as totalPostViews FROM posts');
    const [[{ totalLikes }]] = await db.query('SELECT COUNT(*) as totalLikes FROM likes');
    const [[{ totalComments }]] = await db.query('SELECT COUNT(*) as totalComments FROM comments');
    
    // ✅ FIXED: Use correct table name 'sponsorships' not 'sponsorship_requests'
    const [[{ sponsorCount }]] = await db.query('SELECT COUNT(*) as sponsorCount FROM sponsorships');
    
    // Get recent items
    const [recentVideos] = await db.query('SELECT * FROM videos ORDER BY created_at DESC LIMIT 5');
    const [recentPosts] = await db.query('SELECT * FROM posts ORDER BY created_at DESC LIMIT 5');
    
    // Get popular items
    const [popularVideos] = await db.query('SELECT * FROM videos ORDER BY views DESC LIMIT 5');
    const [popularPosts] = await db.query('SELECT * FROM posts ORDER BY views DESC LIMIT 5');
    
    res.json({
      totalVideos: totalVideos || 0,
      totalPosts: totalPosts || 0,
      totalVideoViews: totalVideoViews || 0,
      totalPostViews: totalPostViews || 0,
      totalLikes: totalLikes || 0,
      totalComments: totalComments || 0,
      sponsorCount: sponsorCount || 0,
      recentVideos: recentVideos || [],
      recentPosts: recentPosts || [],
      popularVideos: popularVideos || [],
      popularPosts: popularPosts || []
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      message: error.message,
      totalVideos: 0,
      totalPosts: 0,
      totalVideoViews: 0,
      totalPostViews: 0,
      totalLikes: 0,
      totalComments: 0,
      sponsorCount: 0,
      recentVideos: [],
      recentPosts: [],
      popularVideos: [],
      popularPosts: []
    });
  }
};

module.exports = { getDashboard };