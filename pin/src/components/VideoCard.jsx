import { Link } from 'react-router-dom';
import { Eye, Calendar } from 'lucide-react';

export default function VideoCard({ video, rank }) {
  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
  };

  return (
    <Link to={`/video/${video.id}`} style={{ textDecoration: 'none' }}>
      <div style={{ 
        background: 'var(--card-bg)', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        border: '1px solid var(--border)', 
        transition: 'all 0.3s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Thumbnail */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              background: '#1a1a1a'
            }}>
              🎬
            </div>
          )}
          
          {/* Live Badge */}
          {video.is_live === 1 && (
            <span style={{ 
              position: 'absolute', 
              top: 8, 
              left: 8, 
              background: '#e63946', 
              padding: '2px 8px', 
              borderRadius: '4px', 
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              🔴 LIVE
            </span>
          )}
          
          {/* Rank Badge for Trending */}
          {rank && (
            <span style={{ 
              position: 'absolute', 
              top: 8, 
              left: 8, 
              background: rank <= 3 ? '#e63946' : '#333', 
              width: 28, 
              height: 28, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              #{rank}
            </span>
          )}
          
          {/* YouTube Badge */}
          {video.type === 'youtube' && (
            <span style={{ 
              position: 'absolute', 
              bottom: 8, 
              right: 8, 
              background: 'rgba(0,0,0,0.7)', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '10px',
              color: '#fff'
            }}>
              YouTube
            </span>
          )}
        </div>
        
        {/* Info */}
        <div style={{ padding: '12px', flex: 1 }}>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold',
            marginBottom: '6px', 
            overflow: 'hidden', 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical',
            color: '#fff'
          }}>
            {video.title}
          </h3>
          
          <div style={{ display: 'flex', gap: '12px', color: '#888', fontSize: '12px', marginTop: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={12} /> {formatViews(video.views)}
            </span>
            {video.created_at && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} /> {new Date(video.created_at).toLocaleDateString()}
              </span>
            )}
          </div>
          
          {video.category && (
            <span style={{ 
              background: 'rgba(230, 57, 70, 0.2)', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              fontSize: '10px', 
              marginTop: '8px', 
              display: 'inline-block',
              color: '#e63946'
            }}>
              {video.category}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}