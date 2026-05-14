const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers, getSubscriberCount } = require('../controllers/subscriber.controller');
const auth = require('../middleware/auth');

router.post('/subscribe', subscribe);
router.get('/subscribers', auth, getSubscribers);
router.get('/subscribers/count', getSubscriberCount);

module.exports = router;