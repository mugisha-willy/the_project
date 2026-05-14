const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ============ GENERATE 6-DIGIT CODE ============
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// ============ REGISTER ============
const register = async (req, res) => {
    try {
        const { name, email, password, role = 'viewer' } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// ============ LOGIN ============
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }
        
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!users.length) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                has_changed_credentials: user.has_changed_credentials || false
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// ============ GET PROFILE ============
const getProfile = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, role, avatar, bio FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (!users.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ============ UPDATE PROFILE ============
const updateProfile = async (req, res) => {
    try {
        const { name, bio } = req.body;
        let avatar = null;
        
        if (req.file) {
            const { uploadToCloudinary } = require('../middleware/upload');
            avatar = await uploadToCloudinary(req.file);
        }
        
        const fields = [];
        const values = [];
        
        if (name) {
            fields.push('name = ?');
            values.push(name);
        }
        if (bio) {
            fields.push('bio = ?');
            values.push(bio);
        }
        if (avatar) {
            fields.push('avatar = ?');
            values.push(avatar);
        }
        
        if (!fields.length) {
            return res.status(400).json({ message: 'No fields to update' });
        }
        
        values.push(req.user.id);
        await db.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
        
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ============ LOGOUT ============
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }
        
        const decoded = jwt.decode(token);
        
        if (decoded && decoded.exp) {
            const expiresAt = new Date(decoded.exp * 1000);
            await db.query(
                'INSERT INTO token_blacklist (token, expires_at) VALUES (?, ?)',
                [token, expiresAt]
            );
        }
        
        res.json({ 
            message: 'Logged out successfully',
            success: true
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: error.message });
    }
};

// ============ CHANGE PASSWORD (First Login) ============
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, newEmail } = req.body;
        const userId = req.user.id;
        
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (!users.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = users[0];
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        
        const updates = [];
        const values = [];
        
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updates.push('password = ?');
            values.push(hashedPassword);
        }
        
        if (newEmail && newEmail !== user.email) {
            const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [newEmail]);
            if (existing.length) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            updates.push('email = ?');
            values.push(newEmail);
        }
        
        updates.push('has_changed_credentials = TRUE');
        
        if (updates.length === 0) {
            return res.status(400).json({ message: 'No changes provided' });
        }
        
        values.push(userId);
        await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
        
        const token = jwt.sign(
            { id: user.id, email: newEmail || user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            message: 'Credentials updated successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: newEmail || user.email,
                role: user.role,
                has_changed_credentials: true
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// ============ FORGOT PASSWORD - REQUEST CODE ============
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        console.log('🔐 Forgot password request for:', email);
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Check if user exists
        const [users] = await db.query('SELECT id, name FROM users WHERE email = ?', [email]);
        
        // Delete any old unused codes
        await db.query('DELETE FROM password_reset_codes WHERE email = ? AND used = FALSE', [email]);
        
        // Generate 6-digit code
        const code = generateVerificationCode();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        
        // Save to database
        await db.query(
            'INSERT INTO password_reset_codes (email, code, expires_at) VALUES (?, ?, ?)',
            [email, code, expiresAt]
        );
        
        // Log to console
        console.log(`\n========================================`);
        console.log(`🔐 PASSWORD RESET CODE`);
        console.log(`📧 Email: ${email}`);
        console.log(`🔢 Code: ${code}`);
        console.log(`⏰ Expires in: 15 minutes`);
        console.log(`========================================\n`);
        
        res.json({ 
            success: true, 
            message: 'Verification code sent!',
            code: code
        });
        
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: error.message });
    }
};

// ============ VERIFY RESET CODE ============
const verifyResetCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        
        console.log('🔑 Verifying code for:', email, 'Code:', code);
        
        if (!email || !code) {
            return res.status(400).json({ message: 'Email and code are required' });
        }
        
        // Check if code exists and is valid
        const [codes] = await db.query(
            `SELECT * FROM password_reset_codes 
             WHERE email = ? AND code = ? AND used = FALSE AND expires_at > NOW()`,
            [email, code]
        );
        
        if (!codes.length) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }
        
        // Mark code as used
        await db.query('UPDATE password_reset_codes SET used = TRUE WHERE id = ?', [codes[0].id]);
        
        // Generate reset token
        const resetToken = jwt.sign(
            { email: email, purpose: 'password_reset' },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
        );
        
        res.json({ 
            success: true, 
            message: 'Code verified successfully',
            resetToken: resetToken
        });
        
    } catch (error) {
        console.error('Verify code error:', error);
        res.status(500).json({ message: error.message });
    }
};

// ============ RESET PASSWORD ============
const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        
        console.log('🔓 Resetting password with token');
        
        if (!resetToken || !newPassword) {
            return res.status(400).json({ message: 'Reset token and new password are required' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        
        // Verify reset token
        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        
        if (decoded.purpose !== 'password_reset') {
            return res.status(400).json({ message: 'Invalid reset token' });
        }
        
        const { email } = decoded;
        
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password
        const [result] = await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Delete all reset codes for this email
        await db.query('DELETE FROM password_reset_codes WHERE email = ?', [email]);
        
        console.log('✅ Password reset successful for:', email);
        
        res.json({ 
            success: true, 
            message: 'Password reset successful! You can now login with your new password.' 
        });
        
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: error.message });
    }
};

// ============ ADMIN RESET USER PASSWORD ============
const adminResetPassword = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        
        const { userId, newPassword } = req.body;
        
        if (!userId || !newPassword) {
            return res.status(400).json({ message: 'User ID and new password are required' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        
        const [users] = await db.query('SELECT id, email FROM users WHERE id = ?', [userId]);
        if (!users.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ?, has_changed_credentials = FALSE WHERE id = ?', 
            [hashedPassword, userId]);
        
        res.json({ 
            success: true,
            message: `Password reset successfully for ${users[0].email}`
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// ============ GET ALL USERS (ADMIN ONLY) ============
const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        
        const [users] = await db.query(
            'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
        );
        
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ============ EXPORTS ============
module.exports = { 
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
};