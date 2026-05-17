import { Link } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-red-500 hover:-translate-y-1 shadow-sm hover:shadow-xl">
        {post.image && (
          <div className="overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition text-gray-800">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-3 mb-3">
            {post.content?.substring(0, 120)}...
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye size={14} /> {post.views || 0} views
            </span>
            <ArrowRight size={16} className="group-hover:text-red-600 transition" />
          </div>
        </div>
      </div>
    </Link>
  );
}