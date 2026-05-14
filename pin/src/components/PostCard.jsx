import { Link } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="card group cursor-pointer">
      {post.image && (
        <div className="overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-4">
        {post.is_sponsored && (
          <span className="inline-block mb-2 gold-badge">Sponsored</span>
        )}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-gold transition-colors text-navy-deep">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            <span>{post.views || 0} views</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;