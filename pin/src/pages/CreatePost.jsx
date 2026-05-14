import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { createPost } from '../api/api';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost({ title, content });
      alert('Post created successfully!');
      navigate('/dashboard');
    } catch (error) { alert('Failed to create post'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-off-white">
      <div className="bg-dark text-white py-8"><div className="container mx-auto px-4"><Link to="/dashboard" className="inline-flex items-center space-x-2 text-gray-300 hover:text-primary mb-4"><ArrowLeft className="w-4 h-4" /><span>Back to Dashboard</span></Link><h1 className="text-3xl font-bold">Create New Post</h1></div></div>
      <div className="container mx-auto px-4 py-12 max-w-3xl"><form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6"><div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required /></div><div><label className="block text-sm font-medium text-gray-700 mb-2">Content</label><textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required /></div><div className="flex space-x-4"><button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50">{loading ? 'Publishing...' : 'Publish Post'}</button><button type="button" onClick={() => navigate('/dashboard')} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">Cancel</button></div></form></div>
    </div>
  );
}

export default CreatePost;