import { useState } from 'react';
import api from '../api/api';

export default function SponsorRequest() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    company_name: '',
    company_email: '',
    budget: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/sponsors/request', form);
      alert('Sponsorship request sent! We will contact you within 48 hours.');
      setShowForm(false);
      setForm({ company_name: '', company_email: '', budget: '', message: '' });
    } catch (error) {
      console.error('Sponsorship error:', error);
      alert('Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        🤝 Advertise
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">Advertise With Us</h2>
            <p className="text-gray-600 mb-4">Reach our audience of engaged viewers</p>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Company Name"
                required
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg mb-3"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.company_email}
                onChange={(e) => setForm({ ...form, company_email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg mb-3"
              />
              <input
                type="number"
                placeholder="Budget (USD)"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg mb-3"
              />
              <textarea
                placeholder="Tell us about your campaign"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Request'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}