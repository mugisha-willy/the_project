const db = require('../config/db');

// Save contact message (public - no login required)
const saveContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Save to database
    await db.query(
      `INSERT INTO contact_messages (name, email, subject, message, created_at) 
       VALUES (?, ?, ?, ?, NOW())`,
      [name, email, subject, message]
    );

    res.status(201).json({ 
      success: true, 
      message: 'Your message has been sent successfully! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all contact messages (admin only)
const getContactMessages = async (req, res) => {
  try {
    const [messages] = await db.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get unread count (admin only)
const getUnreadCount = async (req, res) => {
  try {
    const [[{ count }]] = await db.query(
      'SELECT COUNT(*) as count FROM contact_messages WHERE is_read = FALSE'
    );
    res.json({ unread: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Mark message as read (admin only)
const markAsRead = async (req, res) => {
  try {
    await db.query(
      'UPDATE contact_messages SET is_read = TRUE WHERE id = ?',
      [req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete message (admin only)
const deleteMessage = async (req, res) => {
  try {
    await db.query('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveContactMessage,
  getContactMessages,
  getUnreadCount,
  markAsRead,
  deleteMessage
};