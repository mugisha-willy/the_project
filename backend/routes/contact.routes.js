const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  saveContactMessage,
  getContactMessages,
  getUnreadCount,
  markAsRead,
  deleteMessage
} = require('../controllers/contact.controller');

// Public route - anyone can send message (no login required)
router.post('/contact', saveContactMessage);

// Admin only routes (require login)
router.get('/admin/contact-messages', auth, getContactMessages);
router.get('/admin/contact-unread', auth, getUnreadCount);
router.put('/admin/contact-messages/:id/read', auth, markAsRead);
router.delete('/admin/contact-messages/:id', auth, deleteMessage);

module.exports = router;