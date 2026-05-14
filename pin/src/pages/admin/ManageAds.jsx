import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Image, Video, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageDisplayAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'image',
    image_url: '',
    video_url: '',
    link: '',
    is_active: true
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/display-ads', {
        headers: { Authorization: token }
      });
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingAd 
        ? `http://localhost:5000/api/admin/display-ads/${editingAd.id}`
        : 'http://localhost:5000/api/admin/display-ads';
      const method = editingAd ? 'put' : 'post';
      
      await axios[method](url, formData, {
        headers: { Authorization: token }
      });
      
      setShowModal(false);
      setEditingAd(null);
      setFormData({ title: '', type: 'image', image_url: '', video_url: '', link: '', is_active: true });
      fetchAds();
    } catch (error) {
      console.error('Error saving ad:', error);
      alert('Failed to save ad');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/admin/display-ads/${id}`, {
          headers: { Authorization: token }
        });
        fetchAds();
      } catch (error) {
        console.error('Error deleting ad:', error);
        alert('Failed to delete ad');
      }
    }
  };

  const handleToggleStatus = async (ad) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/display-ads/${ad.id}`, {
        ...ad,
        is_active: !ad.is_active
      }, {
        headers: { Authorization: token }
      });
      fetchAds();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Header Display Ads</h1>
          <p className="text-gray-500 mt-1">These ads will appear at the top of your website</p>
        </div>
        <Link to="/dashboard" className="text-gray-600 hover:text-primary">← Back to Dashboard</Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-semibold">Header Ads</h2>
          <button
            onClick={() => {
              setEditingAd(null);
              setFormData({ title: '', type: 'image', image_url: '', video_url: '', link: '', is_active: true });
              setShowModal(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Ad</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Preview</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Link</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {ad.type === 'video' ? (
                      <video src={ad.video_url} className="w-24 h-12 object-cover rounded" muted />
                    ) : (
                      <img src={ad.image_url} alt={ad.title} className="w-24 h-12 object-cover rounded" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{ad.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${ad.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {ad.type === 'video' ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                      <span>{ad.type}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">{ad.link || '-'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleStatus(ad)}
                      className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${
                        ad.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {ad.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{ad.is_active ? 'Active' : 'Inactive'}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingAd(ad);
                          setFormData({
                            title: ad.title,
                            type: ad.type,
                            image_url: ad.image_url || '',
                            video_url: ad.video_url || '',
                            link: ad.link || '',
                            is_active: ad.is_active
                          });
                          setShowModal(true);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">{editingAd ? 'Edit Ad' : 'Add New Ad'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Ad Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="image"
                      checked={formData.type === 'image'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                    <Image className="w-4 h-4" />
                    <span>Image Ad</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="video"
                      checked={formData.type === 'video'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                    <Video className="w-4 h-4" />
                    <span>Video Ad</span>
                  </label>
                </div>
              </div>
              
              {formData.type === 'image' ? (
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/ad-image.jpg"
                  />
                  {formData.image_url && (
                    <img src={formData.image_url} alt="Preview" className="mt-2 h-16 object-contain rounded" />
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-1">Video URL</label>
                  <input
                    type="text"
                    required
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/ad-video.mp4"
                  />
                  {formData.video_url && (
                    <video src={formData.video_url} className="mt-2 h-16 object-contain rounded" muted />
                  )}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">Link URL (Optional)</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageDisplayAds;