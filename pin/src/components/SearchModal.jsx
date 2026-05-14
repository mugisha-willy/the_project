import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Search, Video, Newspaper, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function SearchModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ videos: [], posts: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults({ videos: [], posts: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.length >= 2) {
        performSearch();
      } else {
        setResults({ videos: [], posts: [] });
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
     const response = await api.get(`/search?q=${query}`);
      setResults({
        videos: response.data.videos || [],
        posts: response.data.posts || []
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white">{t('search.title', 'Search')}</h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5 dark:text-white" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search.placeholder', 'Search videos, news...')}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div className="mt-6 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 dark:text-white">{t('common.loading', 'Loading...')}</div>
            ) : query.length >= 2 ? (
              <>
                {results.videos.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center space-x-2 dark:text-white">
                      <Video className="w-4 h-4 text-gold" />
                      <span>{t('search.videos', 'Videos')} ({results.videos.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {results.videos.map((video) => (
                        <Link
                          key={video.id}
                          to={`/video/${video.id}`}
                          onClick={onClose}
                          className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                        >
                          <span className="font-medium dark:text-white">{video.title}</span>
                          <span className="text-sm text-gray-500 flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{video.views || 0}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {results.posts.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2 dark:text-white">
                      <Newspaper className="w-4 h-4 text-gold" />
                      <span>{t('search.news', 'News')} ({results.posts.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {results.posts.map((post) => (
                        <Link
                          key={post.id}
                          to={`/post/${post.id}`}
                          onClick={onClose}
                          className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                        >
                          <p className="font-medium dark:text-white">{post.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{post.content}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {results.videos.length === 0 && results.posts.length === 0 && query.length >= 2 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    {t('search.noResults', 'No results found')} "{query}"
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {t('search.typeMore', 'Type at least 2 characters to search')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;