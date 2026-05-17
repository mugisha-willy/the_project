import { Link } from 'react-router-dom';
import { Eye, Calendar } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

export default function VideoCard({ video, rank }) {
  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
  };

  const truncateDescription = (description, maxLength = 80) => {
    if (!description) return 'No description available.';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <Link to={`/video/${video.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-red-500 hover:-translate-y-1 shadow-sm hover:shadow-xl">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-900">
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              🎬
            </div>
          )}
          
          {video.is_live === 1 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">🔴 LIVE</span>
          )}
          
          {rank && (
            <span className="absolute top-2 left-2 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
              #{rank}
            </span>
          )}
          
          {video.type === 'youtube' && (
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <FaYoutube className="w-3 h-3" />
              YouTube
            </span>
          )}
        </div>
        
        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition text-gray-800">
            {video.title}
          </h3>
          
          {/* ✅ Video Description - ADDED */}
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">
            {truncateDescription(video.description)}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye size={14} /> {formatViews(video.views)} views
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {new Date(video.created_at).toLocaleDateString()}
            </span>
          </div>
          
          {video.category && (
            <div className="mt-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                {video.category}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}