const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const auth = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  incrementPostView
} = require('../controllers/post.controller');

router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.post('/posts/:id/view', incrementPostView);  // ✅ View increment endpoint
router.post('/posts', auth, upload.single('image'), createPost);
router.put('/posts/:id', auth, upload.single('image'), updatePost);
router.delete('/posts/:id', auth, deletePost);

module.exports = router;