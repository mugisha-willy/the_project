const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getProfile, 
    updateProfile, 
    logout,
    changePassword,
    forgotPassword,
    verifyResetCode,
    resetPassword,
    adminResetPassword,
    getAllUsers
} = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// ============ PUBLIC ROUTES (No login required) ============
router.post('/register', register);
router.post('/login', login);

// ============ PASSWORD RESET ROUTES ============
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/reset-password', resetPassword);

// ============ PROTECTED ROUTES (Login required) ============
router.post('/logout', auth, logout);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, upload.single('avatar'), updateProfile);
router.post('/change-password', auth, changePassword);

// ============ ADMIN ONLY ROUTES ============
router.get('/admin/users', auth, getAllUsers);
router.post('/admin/reset-password', auth, adminResetPassword);

module.exports = router;