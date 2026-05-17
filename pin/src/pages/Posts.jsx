import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Eye, Calendar, User, Newspaper } from 'lucide-react';
import api from '../api/api';
import Footer from '../components/Footer';

function Posts() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts');
      
      console.log('API Response:', response.data);
      
      // ✅ FIXED: Your response has { posts: [], total, page, totalPages }
      if (response.data && response.data.posts) {
        setPosts(response.data.posts);
      } 
      // Fallback if response is directly an array
      else if (Array.isArray(response.data)) {
        setPosts(response.data);
      } 
      else {
        console.warn('Unexpected response format:', response.data);
        setPosts([]);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center max-w-md">
          <p className="mb-4">{error}</p>
          <button onClick={fetchPosts} className="bg-primary text-white px-4 py-2 rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header Section */}
      <div className="bg-dark text-white py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </Link>
          
          <h1 className="text-3xl font-bold">{t('posts.title')}</h1>
          <p className="text-gray-400 mt-2">{posts.length} {t('stats.articles')} available</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
            <p className="text-gray-500">Check back later for new articles.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                to={`/post/${post.id}`} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                {post.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}
                
                <div className="p-5">
                  {post.category && (
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mb-2">
                      {post.category}
                    </span>
                  )}
                  
                  <h2 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.content?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>PIN RWANDA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{post.views || 0} {t('stats.views')}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-400">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
}

export default Posts;