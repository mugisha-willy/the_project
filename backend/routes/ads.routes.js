const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAdsByPosition,
  trackClick,
  createAd,
  updateAd,
  deleteAd,
  getAllAds,
  getAdById,
  getAdStats
} = require('../controllers/ads.controller');

// ============ PUBLIC ROUTES (No authentication needed) ============
// Get ads by position (header, sidebar, etc.)
router.get('/ads/position/:position', getAdsByPosition);
// Get all active ads
router.get('/ads', getAllAds);  // ✅ REMOVED auth - now public
// Get single active ad
router.get('/ads/active', async (req, res) => {
  try {
    const db = require('../config/db');
    const [ads] = await db.query('SELECT * FROM ads WHERE is_active = 1 LIMIT 1');
    res.json(ads[0] || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Track ad click
router.post('/ads/:id/click', trackClick);

// ============ ADMIN ROUTES (Authentication required) ============
// Get all ads (admin)
router.get('/admin/ads', auth, getAllAds);
// Get ad statistics (admin)
router.get('/admin/ads/stats', auth, getAdStats);
// Get single ad (admin)
router.get('/admin/ads/:id', auth, getAdById);
// Create new ad (admin)
router.post('/admin/ads', auth, createAd);
// Update ad (admin)
router.put('/admin/ads/:id', auth, updateAd);
// Delete ad (admin)
router.delete('/admin/ads/:id', auth, deleteAd);

module.exports = router;