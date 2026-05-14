import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Video, Newspaper, Eye, Heart, Plus, LogOut, 
  TrendingUp, MessageCircle, Search, Trash2, Edit,
  AlertCircle, RefreshCw, Image, PlayCircle, 
  CheckCircle, XCircle, Calendar, User, Save, X,
  Mail, Inbox, MailOpen, Trash
} from 'lucide-react';
import { getDashboard, getVideos, getPosts, deletePost, deleteVideo, createPost, updatePost, logout } from '../api/api';
import api from '../api/api';
import Footer from '../components/Footer';

function Dashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  // Post Form Modal
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    category: 'general',
    image: null,
    is_sponsored: false,
    is_featured: false
  });
  const [postLoading, setPostLoading] = useState(false);
  const [postImagePreview, setPostImagePreview] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token) { navigate('/login'); return; }
    if (!user.has_changed_credentials) { navigate('/change-credentials'); return; }
    fetchAllData();
    fetchComments();
    fetchContactMessages();
  }, [navigate]);

  const fetchContactMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/admin/contact-messages', {
        headers: { Authorization: token }
      });
      setContactMessages(response.data);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/admin/contact-messages/${messageId}/read`, {}, {
        headers: { Authorization: token }
      });
      fetchContactMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const deleteContactMessage = async (messageId) => {
    if (!confirm('Delete this message?')) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/admin/contact-messages/${messageId}`, {
        headers: { Authorization: token }
      });
      fetchContactMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/admin/comments', {
        headers: { Authorization: token }
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [dashboardRes, videosRes, postsRes] = await Promise.all([
        getDashboard(),
        getVideos(),
        getPosts()
      ]);
      setStats(dashboardRes.data);
      setVideos(videosRes.data.videos || []);
      setPosts(postsRes.data.posts || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    await fetchComments();
    await fetchContactMessages();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (deleteType === 'video') {
        await deleteVideo(itemToDelete.id);
      } else if (deleteType === 'post') {
        await deletePost(itemToDelete.id);
      }
      await fetchAllData();
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const openPostModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setPostForm({
        title: post.title,
        content: post.content,
        category: post.category || 'general',
        image: null,
        is_sponsored: post.is_sponsored || false,
        is_featured: post.is_featured || false
      });
      if (post.image) {
        setPostImagePreview(post.image);
      }
    } else {
      setEditingPost(null);
      setPostForm({
        title: '',
        content: '',
        category: 'general',
        image: null,
        is_sponsored: false,
        is_featured: false
      });
      setPostImagePreview(null);
    }
    setShowPostModal(true);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    
    const formData = new FormData();
    formData.append('title', postForm.title);
    formData.append('content', postForm.content);
    formData.append('category', postForm.category);
    formData.append('isSponsored', postForm.is_sponsored);
    formData.append('isFeatured', postForm.is_featured);
    if (postForm.image) {
      formData.append('image', postForm.image);
    }
    
    try {
      if (editingPost) {
        await updatePost(editingPost.id, formData);
        alert('Post updated successfully!');
      } else {
        await createPost(formData);
        alert('Post created successfully!');
      }
      setShowPostModal(false);
      setPostForm({ title: '', content: '', category: 'general', image: null, is_sponsored: false, is_featured: false });
      setPostImagePreview(null);
      fetchAllData();
    } catch (error) {
      alert('Failed to save post');
    } finally {
      setPostLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostForm({ ...postForm, image: file });
      setPostImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  const unreadMessages = contactMessages.filter(m => !m.is_read).length;

  const statCards = [
    { title: 'Total Videos', value: stats?.totalVideos || 0, icon: Video, color: 'bg-primary' },
    { title: 'Total Posts', value: stats?.totalPosts || 0, icon: Newspaper, color: 'bg-dark' },
    { title: 'Video Views', value: formatNumber(stats?.totalVideoViews || 0), icon: Eye, color: 'bg-primary' },
    { title: 'Post Views', value: formatNumber(stats?.totalPostViews || 0), icon: TrendingUp, color: 'bg-dark' },
    { title: 'Total Likes', value: formatNumber(stats?.totalLikes || 0), icon: Heart, color: 'bg-primary' },
    { title: 'Comments', value: formatNumber(stats?.totalComments || 0), icon: MessageCircle, color: 'bg-dark' },
    { title: 'Messages', value: contactMessages.length, icon: Mail, color: 'bg-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-off-white">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Manage your content and analytics here.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <div className={`${stat.color} p-2 rounded-lg inline-block mb-2 text-white`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-gray-500 text-xs">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'posts'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Posts
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'videos'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Videos
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Messages {unreadMessages > 0 && `(${unreadMessages})`}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-red rounded-xl p-6 text-white">
                    <h4 className="text-lg font-bold mb-2">Content Performance</h4>
                    <p className="text-3xl font-bold mb-1">{stats?.totalVideos + stats?.totalPosts}</p>
                    <p className="text-sm opacity-90">Total content pieces</p>
                    <div className="mt-4 flex space-x-4">
                      <div>
                        <p className="text-2xl font-bold">{formatNumber(stats?.totalVideoViews || 0)}</p>
                        <p className="text-xs opacity-75">Video Views</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{formatNumber(stats?.totalPostViews || 0)}</p>
                        <p className="text-xs opacity-75">Post Views</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-dark rounded-xl p-6 text-white">
                    <h4 className="text-lg font-bold mb-2">Engagement</h4>
                    <p className="text-3xl font-bold mb-1">{formatNumber((stats?.totalLikes || 0) + (stats?.totalComments || 0))}</p>
                    <p className="text-sm opacity-90">Total interactions</p>
                    <div className="mt-4 flex space-x-4">
                      <div>
                        <p className="text-2xl font-bold">{formatNumber(stats?.totalLikes || 0)}</p>
                        <p className="text-xs opacity-75">Likes</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{formatNumber(stats?.totalComments || 0)}</p>
                        <p className="text-xs opacity-75">Comments</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-xl p-4">
                    <h3 className="font-bold mb-3">Recent Posts</h3>
                    {stats?.recentPosts?.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm truncate flex-1">{post.title}</span>
                        <span className="text-xs text-gray-500">{post.views || 0} views</span>
                      </div>
                    ))}
                  </div>
                  <div className="border rounded-xl p-4">
                    <h3 className="font-bold mb-3">Recent Videos</h3>
                    {stats?.recentVideos?.slice(0, 5).map((video) => (
                      <div key={video.id} className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm truncate flex-1">{video.title}</span>
                        <span className="text-xs text-gray-500">{video.views || 0} views</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="border rounded-xl p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Recent Comments ({comments.length})
                  </h3>
                  {comments.slice(0, 5).map((comment) => (
                    <div key={comment.id} className="py-2 border-b text-sm">
                      <span className="font-semibold text-primary">{comment.author_name || 'Anonymous'}</span>
                      <p className="text-gray-600 line-clamp-2">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                  <h3 className="text-lg font-semibold">All Posts ({posts.length})</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-3 py-2 border rounded-lg w-64" />
                    </div>
                    <button onClick={() => openPostModal()} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>New Post</span>
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Views</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            {post.image ? <img src={post.image} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center"><Newspaper className="w-6 h-6 text-gray-400" /></div>}
                          </td>
                          <td className="px-4 py-3"><p className="font-medium line-clamp-1">{post.title}</p></td>
                          <td className="px-4 py-3"><span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{post.category || 'general'}</span></td>
                          <td className="px-4 py-3">{post.views || 0}</td>
                          <td className="px-4 py-3 text-sm">{new Date(post.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-3">{post.is_featured ? <span className="text-green-600 text-xs">Featured</span> : <span className="text-gray-500 text-xs">Draft</span>}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => openPostModal(post)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => { setItemToDelete(post); setDeleteType('post'); setShowDeleteModal(true); }} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div>
                <div className="flex justify-between items-center mb-6 gap-4">
                  <h3 className="text-lg font-semibold">All Videos ({videos.length})</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search videos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-3 py-2 border rounded-lg w-64" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="relative h-40 bg-gray-900">
                        {video.thumbnail ? <img src={video.thumbnail} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center"><PlayCircle className="w-12 h-12 text-primary" /></div>}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold line-clamp-1">{video.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{video.views || 0} views</p>
                        <div className="flex justify-between mt-3">
                          <span className="text-xs text-gray-400">{new Date(video.created_at).toLocaleDateString()}</span>
                          <button onClick={() => { setItemToDelete(video); setDeleteType('video'); setShowDeleteModal(true); }} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Contact Messages ({contactMessages.length})
                    {unreadMessages > 0 && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{unreadMessages} unread</span>
                    )}
                  </h3>
                  <button onClick={fetchContactMessages} className="text-primary text-sm hover:underline">Refresh</button>
                </div>

                {contactMessages.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No messages yet</h3>
                    <p className="text-gray-500">When someone contacts you, messages will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactMessages.map((msg) => (
                      <div key={msg.id} className={`bg-white rounded-xl shadow-md overflow-hidden transition ${!msg.is_read ? 'border-l-4 border-primary' : ''}`}>
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <span className="font-bold text-primary text-lg">{msg.name}</span>
                                <span className="text-sm text-gray-400">{msg.email}</span>
                                {!msg.is_read && <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>}
                              </div>
                              <p className="font-semibold text-gray-700 mb-2 text-lg">{msg.subject}</p>
                              <p className="text-gray-600 mb-3 whitespace-pre-wrap">{msg.message}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span>{new Date(msg.created_at).toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              {!msg.is_read && (
                                <button onClick={() => markMessageAsRead(msg.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Mark as read">
                                  <MailOpen className="w-4 h-4" />
                                </button>
                              )}
                              <button onClick={() => deleteContactMessage(msg.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
              <button onClick={() => setShowPostModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handlePostSubmit} className="p-6 space-y-5">
              <div><label className="block text-sm font-medium mb-2">Title *</label><input type="text" required value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="block text-sm font-medium mb-2">Category</label><select value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value })} className="w-full px-4 py-2 border rounded-lg"><option value="general">General</option><option value="news">News</option><option value="politics">Politics</option><option value="sports">Sports</option><option value="entertainment">Entertainment</option><option value="technology">Technology</option><option value="business">Business</option></select></div>
              <div><label className="block text-sm font-medium mb-2">Featured Image</label><div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary cursor-pointer"><input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" /><label htmlFor="image-upload" className="cursor-pointer">{postImagePreview ? <img src={postImagePreview} className="max-h-48 mx-auto rounded" /> : <div className="py-8"><Image className="w-10 h-10 text-gray-400 mx-auto mb-2" /><p className="text-gray-500">Click to upload image</p></div>}</label></div></div>
              <div><label className="block text-sm font-medium mb-2">Content *</label><textarea rows="10" required value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div className="flex gap-4"><label className="flex items-center gap-2"><input type="checkbox" checked={postForm.is_featured} onChange={(e) => setPostForm({ ...postForm, is_featured: e.target.checked })} className="w-4 h-4 text-primary rounded" /><span className="text-sm">Feature this post</span></label><label className="flex items-center gap-2"><input type="checkbox" checked={postForm.is_sponsored} onChange={(e) => setPostForm({ ...postForm, is_sponsored: e.target.checked })} className="w-4 h-4 text-primary rounded" /><span className="text-sm">Sponsored content</span></label></div>
              <div className="flex gap-3 pt-4"><button type="submit" disabled={postLoading} className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center justify-center gap-2">{postLoading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : <><Save className="w-4 h-4" /><span>{editingPost ? 'Update Post' : 'Publish Post'}</span></>}</button><button type="button" onClick={() => setShowPostModal(false)} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">Cancel</button></div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><AlertCircle className="w-6 h-6 text-red-600" /></div><h3 className="text-xl font-bold">Confirm Delete</h3></div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{itemToDelete?.title}"? This action cannot be undone.</p>
            <div className="flex gap-3"><button onClick={handleDelete} className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">Delete</button><button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;