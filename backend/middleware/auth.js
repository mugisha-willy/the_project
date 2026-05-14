const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
        // Check if token is blacklisted
        const [blacklisted] = await db.query(
            'SELECT id FROM token_blacklist WHERE token = ? AND expires_at > NOW()',
            [token]
        );
        
        if (blacklisted.length) {
            return res.status(401).json({ message: 'Token invalidated. Please login again.' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please login again.' });
        }
        res.status(403).json({ message: 'Invalid token.' });
    }
};