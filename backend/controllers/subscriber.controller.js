const db = require('../config/db');

const subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    await db.query('INSERT INTO subscribers (email, name, subscribed_at) VALUES (?, ?, NOW())', [email, name || null]);
    res.json({ message: 'Subscribed successfully! Check your email for updates.' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already subscribed' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getSubscribers = async (req, res) => {
  try {
    const [subscribers] = await db.query('SELECT * FROM subscribers ORDER BY subscribed_at DESC');
    res.json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getSubscriberCount = async (req, res) => {
  try {
    const [[result]] = await db.query('SELECT COUNT(*) as count FROM subscribers');
    res.json({ count: result.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { subscribe, getSubscribers, getSubscriberCount };