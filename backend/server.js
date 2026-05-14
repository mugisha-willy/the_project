const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const db = require("./config/db");  // ✅ This handles the space correctly

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date() });
});

// Import routes
const authRoutes = require('./routes/auth.routes');
const videoRoutes = require('./routes/video.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const profileRoutes = require('./routes/profile.routes');
const donationRoutes = require('./routes/donation.routes');
const sponsorRoutes = require('./routes/sponsor.routes');
const subscriberRoutes = require('./routes/subscriber.routes');
const adsRoutes = require('./routes/ads.routes');
const contactRoutes=require("./routes/contact.routes")

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', videoRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api', subscriberRoutes);
app.use('/api', adsRoutes);
app.use('/api',contactRoutes)


app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ videos: [], posts: [] });
    
    const [videos] = await db.query('SELECT * FROM videos WHERE title LIKE ? LIMIT 10', [`%${q}%`]);
    const [posts] = await db.query('SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? LIMIT 10', [`%${q}%`, `%${q}%`]);
    
    res.json({ videos, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// Start YouTube sync job (only if configured)
if (process.env.YOUTUBE_CHANNEL_ID && process.env.YOUTUBE_API_KEY) {
  require('./jobs/youtubeSync');
  console.log('📡 YouTube auto-sync active');
} else {
  console.log('⚠️ YouTube sync disabled (missing API key or channel ID)');
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ PIN RWANDA Backend running on port ${PORT}`);
  console.log(`💝 Donation system active`);
  console.log(`🤝 Sponsorship system active`);
  console.log(`📧 Newsletter system active`);
});