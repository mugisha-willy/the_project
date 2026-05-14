const db = require('../config/db');
const youtube = require('../config/youtube');
require('dotenv').config();

async function importAllYouTubeVideos() {
  console.log('📹 Starting YouTube channel import...');
  console.log('⏳ This may take a few minutes...\n');

  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  
  if (!channelId) {
    console.error('❌ YOUTUBE_CHANNEL_ID not set in .env file');
    process.exit(1);
  }

  let pageToken = null;
  let totalImported = 0;
  let totalSkipped = 0;
  let hasMore = true;

  while (hasMore) {
    try {
      const searchRes = await youtube.search.list({
        part: ['snippet'],
        channelId: channelId,
        maxResults: 50,
        order: 'date',
        type: ['video'],
        pageToken: pageToken
      });

      const videos = searchRes.data.items;
      
      if (!videos || videos.length === 0) {
        console.log('No more videos found.');
        break;
      }

      console.log(`\n📦 Processing batch of ${videos.length} videos...`);

      for (const item of videos) {
        const youtubeId = item.id.videoId;
        
        const [existing] = await db.query(
          'SELECT id FROM videos WHERE youtube_video_id = ?', 
          [youtubeId]
        );
        
        if (existing.length) {
          console.log(`⏭️  Skipping existing: ${item.snippet.title.substring(0, 50)}...`);
          totalSkipped++;
          continue;
        }

        const detailRes = await youtube.videos.list({
          part: ['snippet', 'statistics'],
          id: [youtubeId]
        });

        const details = detailRes.data.items[0];
        if (!details) continue;

        const thumbnail = details.snippet.thumbnails?.high?.url || '';
        const views = parseInt(details.statistics?.viewCount) || 0;
        
        await db.query(
          `INSERT INTO videos (
            title, description, video_url, youtube_video_id, 
            thumbnail, type, category, views, is_live, created_at
          ) VALUES (?, ?, ?, ?, ?, 'youtube', 'general', ?, 0, NOW())`,
          [
            item.snippet.title,
            item.snippet.description || '',
            `https://www.youtube.com/watch?v=${youtubeId}`,
            youtubeId,
            thumbnail,
            views
          ]
        );
        
        totalImported++;
        console.log(`✅ Imported: ${item.snippet.title.substring(0, 60)}...`);
      }

      pageToken = searchRes.data.nextPageToken;
      hasMore = !!pageToken;
      
      if (hasMore) {
        console.log('📄 Fetching next page...');
      }
      
    } catch (error) {
      console.error('❌ Error during import:', error.message);
      break;
    }
  }

  console.log(`\n🎉 IMPORT COMPLETE!`);
  console.log(`📊 New videos imported: ${totalImported}`);
  console.log(`⏭️  Videos already existing: ${totalSkipped}`);
  
  const [result] = await db.query('SELECT COUNT(*) as total FROM videos');
  console.log(`📹 Total videos in database: ${result.total}`);
  
  process.exit(0);
}

// Run the import
importAllYouTubeVideos();