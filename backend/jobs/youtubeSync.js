const cron = require('node-cron');
const db = require('../config/db');
const youtube = require('../config/youtube');

// ✅ Runs every 2 hours (not every minute!)
cron.schedule('0 */2 * * *', async () => {
  console.log('[CRON] Syncing YouTube channel for new videos...');
  
  try {
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    if (!channelId) {
      console.log('[CRON] No YOUTUBE_CHANNEL_ID set, skipping.');
      return;
    }
    
    const searchRes = await youtube.search.list({
      part: ['snippet'],
      channelId,
      maxResults: 20,
      order: 'date',
      type: ['video']
    });
    
    let syncedCount = 0;
    
    for (const item of searchRes.data.items) {
      const youtubeId = item.id.videoId;
      
      const [existing] = await db.query('SELECT id FROM videos WHERE youtube_video_id = ?', [youtubeId]);
      if (existing.length) continue;
      
      // Get video details for views
      const detailRes = await youtube.videos.list({
        part: ['statistics'],
        id: [youtubeId]
      });
      
      const views = detailRes.data.items[0]?.statistics?.viewCount || 0;
      
      await db.query(
        `INSERT INTO videos (title, description, video_url, youtube_video_id, thumbnail, type, category, views) 
         VALUES (?, ?, ?, ?, ?, 'youtube', 'general', ?)`,
        [
          item.snippet.title,
          item.snippet.description || '',
          `https://www.youtube.com/watch?v=${youtubeId}`,
          youtubeId,
          item.snippet.thumbnails?.high?.url || '',
          views
        ]
      );
      
      syncedCount++;
      console.log(`[CRON] Synced new video: ${item.snippet.title}`);
    }
    
    console.log(`[CRON] Sync completed. Added ${syncedCount} new videos.`);
  } catch (error) {
    console.error('[CRON] Error:', error.message);
  }
});

console.log('[CRON] YouTube sync scheduler started - Runs every 2 hours');