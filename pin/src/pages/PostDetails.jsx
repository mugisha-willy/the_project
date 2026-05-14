import { useState, useEffect, useRef } from 'react';  // ✅ Add useRef
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Eye, Calendar, User, Heart, MessageCircle } from 'lucide-react';
import api from '../api/api';
import Footer from '../components/Footer';

function PostDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  
  const hasViewed = useRef(false);  // ✅ Add this to track if view was already counted

  useEffect(() => {
    console.log(`🔍 Loading post ID: ${id}`);
    fetchPost();
    fetchComments();
    fetchLikes();
    
    // ✅ Only call view increment ONCE
    if (!hasViewed.current) {
      hasViewed.current = true;
      console.log(`👁️ Calling view increment for post ID: ${id}`);
      api.post(`/posts/${id}/view`).catch(err => console.error('View error:', err));
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments?post_id=${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await api.get(`/likes?post_id=${id}`);
      setLikes(response.data.count);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    try {
      await api.post(`/like-post/${id}`);
      setLikes(prev => prev + 1);
    } catch (error) {
      console.error('Error liking post:', error);
      alert('Failed to like post');
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
        post_id: id,
        content: commentText,
        author_name: commentName.trim() || 'Anonymous'
      });
      
      setCommentText('');
      setCommentName('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p>Post not found</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          {t('common.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header Section */}
      <div className="bg-dark text-white py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-primary">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Link>
          
          <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{t('posts.author')} PIN RWANDA</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{post.views || 0} {t('stats.views')}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>{likes} {t('stats.likes')}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length} {t('stats.comments')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {post.image && (
            <div className="w-full">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full max-h-96 object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </div>

        {/* Like Button */}
        <div className="mt-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            <Heart className="w-4 h-4" />
            <span>{t('like')} ({likes})</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            {t('videos.comments')} ({comments.length})
          </h3>
          
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
    </div>
  );
}

export default PostDetails;