const db = require('../config/db');
const { uploadToCloudinary } = require('../middleware/upload');
const youtube = require('../config/youtube');

// Get all videos (with pagination)
const getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Get total count
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM videos');
    
    // Get videos with pagination
    const [videos] = await db.query(
      'SELECT * FROM videos ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [parseInt(limit), offset]
    );
    
    res.json({
      success: true,
      videos: videos,
      total: total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single video by ID
const getVideoById = async (req, res) => {
  try {
    const [videos] = await db.query('SELECT * FROM videos WHERE id = ?', [req.params.id]);
    
    if (videos.length === 0) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    
    res.json({ success: true, video: videos[0] });
  } catch (error) {
    console.error('Get video by ID error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get trending videos
const getTrending = async (req, res) => {
  try {
    const [videos] = await db.query(
      'SELECT * FROM videos ORDER BY views DESC, created_at DESC LIMIT 20'
    );
    res.json({ success: true, videos: videos });
  } catch (error) {
    console.error('Get trending error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get related videos
const getRelated = async (req, res) => {
  try {
    const [videos] = await db.query(
      'SELECT * FROM videos WHERE id != ? ORDER BY views DESC LIMIT 5',
      [req.params.id]
    );
    res.json({ success: true, videos: videos });
  } catch (error) {
    console.error('Get related error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search videos
const searchVideos = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ success: true, videos: [] });
    }
    
    const [videos] = await db.query(
      'SELECT * FROM videos WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT 20',
      [`%${q}%`, `%${q}%`]
    );
    res.json({ success: true, videos: videos });
  } catch (error) {
    console.error('Search videos error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Increment video view
const incrementVideoView = async (req, res) => {
  try {
    await db.query('UPDATE videos SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Increment view error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload video (admin only)
const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file uploaded' });
    }
    
    const videoUrl = await uploadToCloudinary(req.file);
    const { title, description, category } = req.body;
    
    const result = await db.query(
      'INSERT INTO videos (title, description, video_url, type, category, views) VALUES (?, ?, ?, "upload", ?, 0)',
      [title, description || '', videoUrl, category || 'general']
    );
    
    res.json({ 
      success: true, 
      message: 'Video uploaded successfully', 
      videoId: result[0].insertId 
    });
  } catch (error) {
    console.error('Upload video error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Import YouTube video (admin only)
const importYouTube = async (req, res) => {
  try {
    const { youtubeId, category } = req.body;
    
    if (!youtubeId) {
      return res.status(400).json({ success: false, message: 'YouTube ID is required' });
    }
    
    // Check if already exists
    const [existing] = await db.query('SELECT id FROM videos WHERE youtube_video_id = ?', [youtubeId]);
    if (existing.length) {
      return res.status(400).json({ success: false, message: 'Video already imported' });
    }
    
    // Fetch from YouTube API
    const response = await youtube.videos.list({
      part: ['snippet', 'statistics'],
      id: [youtubeId]
    });
    
    const video = response.data.items[0];
    if (!video) {
      return res.status(404).json({ success: false, message: 'YouTube video not found' });
    }
    
    const thumbnail = video.snippet.thumbnails?.high?.url || '';
    const views = parseInt(video.statistics?.viewCount) || 0;
    
    await db.query(
      `INSERT INTO videos (title, description, video_url, youtube_video_id, thumbnail, type, category, views) 
       VALUES (?, ?, ?, ?, ?, 'youtube', ?, ?)`,
      [
        video.snippet.title,
        video.snippet.description || '',
        `https://www.youtube.com/watch?v=${youtubeId}`,
        youtubeId,
        thumbnail,
        category || 'general',
        views
      ]
    );
    
    res.json({ success: true, message: 'YouTube video imported successfully' });
  } catch (error) {
    console.error('Import YouTube error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete video (admin only)
const deleteVideo = async (req, res) => {
  try {
    await db.query('DELETE FROM videos WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getVideos,
  getVideoById,
  getTrending,
  getRelated,
  searchVideos,
  incrementVideoView,
  uploadVideo,
  importYouTube,
  deleteVideo
};