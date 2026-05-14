const express = require('express');
const router = express.Router();
const { createDonation, getDonationTotal, getRecentDonations } = require('../controllers/donation.controller');
const auth = require('../middleware/auth');

router.post('/', createDonation);
router.get('/total', getDonationTotal);
router.get('/recent', getRecentDonations);
router.get('/all', auth, getRecentDonations);

module.exports = router;