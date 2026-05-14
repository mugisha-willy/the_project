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
// Get ads by position (header, sidebar, between_posts, footer, home_hero)
router.get('/ads/position/:position', getAdsByPosition);
// Track ad click
router.post('/ads/:id/click', trackClick);

// ============ ADMIN ROUTES (Authentication required) ============
// Get all ads
router.get('/ads', auth, getAllAds);
// Get ad statistics
router.get('/ads/stats', auth, getAdStats);
// Get single ad
router.get('/ads/:id', auth, getAdById);
// Create new ad
router.post('/ads', auth, createAd);
// Update ad
router.put('/ads/:id', auth, updateAd);
// Delete ad
router.delete('/ads/:id', auth, deleteAd);

module.exports = router;