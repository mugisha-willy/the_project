// Add this to your existing auth.controller.js
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, newEmail } = req.body;
        const userId = req.user.id;
        
        // Get current user
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (!users.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = users[0];
        
        // Verify current password
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        
        // Update database
        const updates = [];
        const values = [];
        
        // Change password if provided
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updates.push('password = ?');
            values.push(hashedPassword);
        }
        
        // Change email if provided and not taken
        if (newEmail && newEmail !== user.email) {
            const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [newEmail]);
            if (existing.length) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            updates.push('email = ?');
            values.push(newEmail);
        }
        
        // Mark that user has changed credentials (first login flag)
        updates.push('has_changed_credentials = TRUE');
        
        if (updates.length === 0) {
            return res.status(400).json({ message: 'No changes provided' });
        }
        
        values.push(userId);
        await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
        
        // Generate new token with updated email
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

// Add to module.exports
module.exports = { register, login, getProfile, updateProfile, changePassword };