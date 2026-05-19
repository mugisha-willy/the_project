import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Eye, Calendar, Heart, MessageCircle, Share2, ThumbsUp } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import api from '../api/api';
import Footer from '../components/Footer';

export default function VideoDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchVideo();
    fetchComments();
    fetchLikes();
    api.post(`/view-video/${id}`).catch(err => console.error('View error:', err));
  }, [id]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/videos/${id}`);
      setVideo(response.data.video);
    } catch (err) {
      console.error('Error fetching video:', err);
      setError(err.response?.data?.message || 'Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments?video_id=${id}`);
      setComments(response.data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await api.get(`/likes?video_id=${id}`);
      setLikes(response.data?.count || 0);
    } catch (err) {
      console.error('Error fetching likes:', err);
    }
  };

  const handleLike = async () => {
    try {
      await api.post(`/like-video/${id}`);
      setLikes(prev => prev + 1);
    } catch (err) {
      console.error('Error liking video:', err);
      alert('Failed to like video');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert('Please enter a comment');
      return;
    }
    
    try {
      await api.post('/comments', {
        video_id: id,
        content: commentText,
        author_name: commentName.trim() || 'Anonymous'
      });
      
      setCommentText('');
      setCommentName('');
      fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center max-w-md">
          <p className="mb-4">{error || 'Video not found'}</p>
          <Link to="/videos" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
            {t('common.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header Section */}
      <div className="bg-dark text-white py-8">
        <div className="container mx-auto px-4">
          <Link to="/videos" className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold">{video.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{video.views?.toLocaleString() || 0} {t('stats.views')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likes} {t('stats.likes')}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length} {t('stats.comments')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(video.created_at).toLocaleDateString()}</span>
            </div>
            {video.category && (
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                {video.category}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube-nocookie.com/embed/${video.youtube_video_id}`}
                title={video.title}
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Video Description */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {video.description || 'No description available.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{t('video.like')} ({likes})</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                {t('videos.comments')} ({comments.length})
              </h3>
              
              {/* Comment Form */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <form onSubmit={handleComment}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder={t('videos.yourName')}
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder={t('videos.writeComment')}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                  >
                    {t('videos.postComment')}
                  </button>
                </form>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">{t('videos.noComments')}</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-xl shadow-md p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-primary">
                            {comment.author_name || 'Anonymous'}
                          </p>
                          <p className="text-gray-700 mt-2 leading-relaxed">{comment.content}</p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Video Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 text-dark">
                {t('videoDetails.videoInfo')}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('videoDetails.published')}</span>
                  <span className="text-dark">
                    {new Date(video.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('videoDetails.source')}</span>
                  <span className="text-dark capitalize">YouTube</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">{t('videoDetails.category')}</span>
                  <span className="text-dark capitalize">{video.category || 'General'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Video ID</span>
                  <span className="text-dark text-xs">{video.youtube_video_id}</span>
                </div>
              </div>
            </div>

            {/* Watch on YouTube Button */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h3 className="font-bold text-lg mb-4">{t('video.havingTrouble')}</h3>
              <a
                href={`https://www.youtube.com/watch?v=${video.youtube_video_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <FaYoutube className="w-5 h-5" />
                {t('video.watchOnYouTube')}
              </a>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}