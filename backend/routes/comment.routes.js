const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  addComment, 
  getComments, 
  deleteComment,
  getAllComments 
} = require('../controllers/comment.controller');

// ============ PUBLIC ROUTES (No login required) ============
router.get('/comments', getComments);           // View comments
router.post('/comments', addComment);           // Add comment (anonymous)

// ============ ADMIN ONLY ROUTES (Login required) ============
router.delete('/comments/:id', auth, deleteComment);        // Delete comment
router.get('/admin/comments', auth, getAllComments);       // View all comments in dashboard

module.exports = router;