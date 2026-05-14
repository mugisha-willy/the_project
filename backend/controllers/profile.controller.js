const db = require('../config/db');
const { uploadToCloudinary } = require('../middleware/upload');

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

const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    let avatar = null;
    
    if (req.file) {
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

module.exports = { getProfile, updateProfile };