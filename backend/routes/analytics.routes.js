const express = require('express');
const router = express.Router();
const { viewVideo, viewPost, likeVideo, likePost, getLikes } = require('../controllers/analytics.controller');

// Public routes - No authentication needed
router.post('/view-video/:id', viewVideo);
router.post('/view-post/:id', viewPost);
router.post('/like-video/:id', likeVideo);
router.post('/like-post/:id', likePost);
router.get('/likes', getLikes);

module.exports = router;