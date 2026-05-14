const db = require('../config/db');

// Get active ads by position (public)
const getAdsByPosition = async (req, res) => {
  try {
    const { position } = req.params;
    const [ads] = await db.query(
      `SELECT * FROM ads 
       WHERE position = ? AND is_active = 1 
       AND (start_date IS NULL OR start_date <= NOW()) 
       AND (end_date IS NULL OR end_date >= NOW())
       ORDER BY created_at DESC`,
      [position]
    );
    
    // Track impressions
    for (const ad of ads) {
      await db.query('UPDATE ads SET impressions = impressions + 1 WHERE id = ?', [ad.id]);
    }
    
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Track ad click (public)
const trackClick = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('UPDATE ads SET clicks = clicks + 1 WHERE id = ?', [id]);
    
    const [ads] = await db.query('SELECT link FROM ads WHERE id = ?', [id]);
    if (ads.length) {
      res.json({ link: ads[0].link });
    } else {
      res.status(404).json({ message: 'Ad not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create ad (admin only)
const createAd = async (req, res) => {
  try {
    const { title, image_url, video_url, link, position, type, start_date, end_date } = req.body;
    
    if (!title || !image_url) {
      return res.status(400).json({ message: 'Title and image URL are required' });
    }
    
    const result = await db.query(
      `INSERT INTO ads (title, image_url, video_url, link, position, type, start_date, end_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, image_url, video_url || null, link || null, position || 'sidebar', type || 'banner', start_date || null, end_date || null]
    );
    
    res.status(201).json({ message: 'Ad created successfully', adId: result[0].insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update ad (admin only)
const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image_url, video_url, link, position, type, start_date, end_date, is_active } = req.body;
    
    await db.query(
      `UPDATE ads SET 
       title = COALESCE(?, title),
       image_url = COALESCE(?, image_url),
       video_url = COALESCE(?, video_url),
       link = COALESCE(?, link),
       position = COALESCE(?, position),
       type = COALESCE(?, type),
       start_date = COALESCE(?, start_date),
       end_date = COALESCE(?, end_date),
       is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [title, image_url, video_url, link, position, type, start_date, end_date, is_active, id]
    );
    
    res.json({ message: 'Ad updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete ad (admin only)
const deleteAd = async (req, res) => {
  try {
    await db.query('DELETE FROM ads WHERE id = ?', [req.params.id]);
    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all ads (admin only)
const getAllAds = async (req, res) => {
  try {
    const [ads] = await db.query('SELECT * FROM ads ORDER BY created_at DESC');
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get single ad by ID
const getAdById = async (req, res) => {
  try {
    const [ads] = await db.query('SELECT * FROM ads WHERE id = ?', [req.params.id]);
    if (!ads.length) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json(ads[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get ad statistics (admin only)
const getAdStats = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        COUNT(*) as total_ads,
        SUM(clicks) as total_clicks,
        SUM(impressions) as total_impressions,
        CASE 
          WHEN SUM(impressions) > 0 
          THEN ROUND((SUM(clicks) / SUM(impressions)) * 100, 2)
          ELSE 0 
        END as ctr
      FROM ads
    `);
    
    const [positionStats] = await db.query(`
      SELECT 
        position,
        COUNT(*) as count,
        SUM(clicks) as clicks,
        SUM(impressions) as impressions
      FROM ads
      GROUP BY position
    `);
    
    res.json({
      overview: result[0],
      byPosition: positionStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getAdsByPosition, 
  trackClick, 
  createAd, 
  updateAd, 
  deleteAd, 
  getAllAds,
  getAdById,
  getAdStats
};