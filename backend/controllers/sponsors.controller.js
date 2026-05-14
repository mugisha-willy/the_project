const db = require('../config/db');

const requestSponsorship = async (req, res) => {
  try {
    const { company_name, company_email, budget, message } = req.body;
    
    if (!company_name || !company_email) {
      return res.status(400).json({ message: 'Company name and email are required' });
    }
    
    await db.query(
      `INSERT INTO sponsorship_requests (company_name, company_email, budget, message, status, created_at) 
       VALUES (?, ?, ?, ?, 'pending', NOW())`,
      [company_name, company_email, budget || null, message || null]
    );
    
    res.json({ message: 'Sponsorship request sent! We will contact you within 48 hours.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getSponsorshipRequests = async (req, res) => {
  try {
    const [requests] = await db.query('SELECT * FROM sponsorship_requests ORDER BY created_at DESC');
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateSponsorshipStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'approved', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    await db.query('UPDATE sponsorship_requests SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Sponsorship request updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { requestSponsorship, getSponsorshipRequests, updateSponsorshipStatus };