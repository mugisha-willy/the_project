const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { getProfile, updateProfile } = require('../controllers/profile.controller');

router.get('/', auth, getProfile);
router.put('/', auth, upload.single('avatar'), updateProfile);

module.exports = router;