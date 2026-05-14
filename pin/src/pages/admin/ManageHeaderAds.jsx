
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Eye, EyeOff, Image } from 'lucide-react';
import axios from 'axios';

function ManageHeaderAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    link: '',
    is_active: true
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/header-ads', {
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
        ? `http://localhost:5000/api/admin/header-ads/${editingAd.id}`
        : 'http://localhost:5000/api/admin/header-ads';
      const method = editingAd ? 'put' : 'post';
      
      await axios[method](url, formData, {
        headers: { Authorization: token }
      });
      
      setShowModal(false);
      setEditingAd(null);
      setFormData({ title: '', image_url: '', link: '', is_active: true });
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
        await axios.delete(`http://localhost:5000/api/admin/header-ads/${id}`, {
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
      await axios.put(`http://localhost:5000/api/admin/header-ads/${ad.id}`, {
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
        <h1 className="text-3xl font-bold">Manage Header Ads</h1>
        <button
          onClick={() => {
            setEditingAd(null);
            setFormData({ title: '', image_url: '', link: '', is_active: true });
            setShowModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Header Ad</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Link</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {ad.image_url ? (
                    <img src={ad.image_url} alt={ad.title} className="w-20 h-12 object-cover rounded" />
                  ) : (
                    <Image className="w-8 h-8 text-gray-400" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{ad.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">{ad.link}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleStatus(ad)}
                    className={`px-2 py-1 rounded-full text-xs ${
                      ad.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {ad.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingAd(ad);
                        setFormData({
                          title: ad.title,
                          image_url: ad.image_url || '',
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">{editingAd ? 'Edit Header Ad' : 'Add Header Ad'}</h2>
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
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/ad-image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link URL</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com"
                />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="text-sm">Active</span>
              </label>
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

export default ManageHeaderAds;