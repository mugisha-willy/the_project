const db = require('../config/db');

const createDonation = async (req, res) => {
  try {
    const { donor_name, donor_email, amount, message, is_monthly, video_id, post_id } = req.body;
    
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }
    
    const result = await db.query(
      `INSERT INTO donations (donor_name, donor_email, amount, message, is_monthly, video_id, post_id, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [donor_name || 'Anonymous', donor_email || null, amount, message || null, is_monthly || false, video_id || null, post_id || null]
    );
    
    res.json({ message: 'Thank you for supporting independent journalism!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getDonationTotal = async (req, res) => {
  try {
    const [[result]] = await db.query('SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count FROM donations');
    res.json({ total: result.total, count: result.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getRecentDonations = async (req, res) => {
  try {
    const [donations] = await db.query('SELECT * FROM donations ORDER BY created_at DESC LIMIT 20');
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDonation, getDonationTotal, getRecentDonations };