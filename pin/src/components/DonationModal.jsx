import { useState } from 'react';
import { X, Heart, TrendingUp, Users, Gift } from 'lucide-react';
import { createDonation, getDonationStats } from '../api/api';

function DonationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    amount: '',
    message: '',
    is_anonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [stats, setStats] = useState(null);

  useState(() => {
    if (isOpen) {
      fetchStats();
    }
  }, [isOpen]);

  const fetchStats = async () => {
    try {
      const res = await getDonationStats();
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createDonation(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ donor_name: '', donor_email: '', amount: '', message: '', is_anonymous: false });
      }, 2000);
    } catch (error) {
      alert('Error processing donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const presetAmounts = [5000, 10000, 25000, 50000, 100000];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold">Support PIN RWANDA</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600">Your support means the world to us!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Stats */}
            {stats && (
              <div className="bg-gradient-red rounded-xl p-4 text-white">
                <div className="flex justify-between mb-2">
                  <span className="text-sm opacity-90">Total Raised</span>
                  <span className="text-sm opacity-90">{stats.donorCount} Donors</span>
                </div>
                <p className="text-3xl font-bold mb-2">RWF {parseInt(stats.totalDonations).toLocaleString()}</p>
                {stats.currentGoal && (
                  <div className="mt-2">
                    <div className="bg-white/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-white h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((stats.totalDonations / stats.currentGoal.target_amount) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs opacity-90 mt-1">
                      Goal: RWF {stats.currentGoal.target_amount.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-sm font-medium mb-2">Quick Amount (RWF)</label>
              <div className="grid grid-cols-5 gap-2">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                    className={`py-2 px-3 rounded-lg border transition ${
                      formData.amount === amount.toString()
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {amount / 1000}K
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.donor_name}
                onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.donor_email}
                onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount (RWF) *</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message (Optional)</label>
              <textarea
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Leave a supportive message..."
              />
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.is_anonymous}
                onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-sm text-gray-600">Donate anonymously</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Donate Now'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Your donation helps us continue providing quality journalism
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default DonationModal;