const express = require('express');
const router = express.Router();
const { requestSponsorship, getSponsorshipRequests, updateSponsorshipStatus } = require('../controllers/sponsors.controller');
const auth = require('../middleware/auth');

router.post('/request', requestSponsorship);
router.get('/requests', auth, getSponsorshipRequests);
router.put('/requests/:id', auth, updateSponsorshipStatus);

module.exports = router;