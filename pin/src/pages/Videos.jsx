import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, Calendar, Play } from 'lucide-react';
import api from '../api/api';
import Footer from '../components/Footer';

function Videos() {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);

  useEffect(() => {
    fetchVideos();
  }, [currentPage]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/videos?page=${currentPage}&limit=12`);
      
      if (response.data.success) {
        setVideos(response.data.videos);
        setTotalPages(response.data.totalPages);
        setTotalVideos(response.data.total);
      } else if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else if (response.data.videos) {
        setVideos(response.data.videos);
        setTotalPages(response.data.totalPages || 1);
        setTotalVideos(response.data.total || response.data.videos.length);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.response?.data?.message || 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views || 0;
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
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center">
          <p>{error}</p>
          <button onClick={fetchVideos} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
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
            ← {t('common.back')}
          </Link>
          
          <h1 className="text-3xl font-bold">{t('videos.title')}</h1>
          <p className="text-gray-400 mt-2">
            {totalVideos} {t('stats.videos')} available
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {videos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos yet</h3>
            <p className="text-gray-500">Check back later for new videos.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Link 
                  key={video.id} 
                  to={`/video/${video.id}`} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gray-900 overflow-hidden">
                    {video.thumbnail ? (
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-12 h-12 text-primary" />
                      </div>
                    )}
                    
                    {video.is_live === 1 && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        LIVE
                      </span>
                    )}
                    
                    {video.type === 'youtube' && (
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        YouTube
                      </span>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h2 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition">
                      {video.title}
                    </h2>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{formatViews(video.views)} {t('stats.views')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(video.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {video.category && (
                      <div className="mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {video.category}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  Previous
                </button>
                
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      
    </div>
  );
}

export default Videos;