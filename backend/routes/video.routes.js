const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const auth = require('../middleware/auth');
const {
  uploadVideo,
  getVideos,
  getVideoById,
  getTrending,
  getRelated,
  searchVideos,
  importYouTube,
  deleteVideo,
  incrementVideoView  // ✅ Import the new function
} = require('../controllers/video.controller');

router.get('/videos', getVideos);
router.get('/videos/trending', getTrending);
router.get('/videos/related/:id', getRelated);
router.get('/videos/search', searchVideos);
router.get('/videos/:id', getVideoById);
router.post('/videos/:id/view', incrementVideoView);  // ✅ View increment happens here only
router.post('/videos/upload', auth, upload.single('video'), uploadVideo);
router.post('/videos/import-youtube', auth, importYouTube);
router.delete('/videos/:id', auth, deleteVideo);

module.exports = router;