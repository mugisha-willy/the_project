import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { createDonation, getDonationStats } from '../api/api';

function NewsletterSignup({ variant = 'footer' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await subscribe({ email, name });
      setSuccess(true);
      setEmail('');
      setName('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'popup') {
    return (
      <div className="bg-gradient-red rounded-2xl p-8 text-white text-center">
        <Mail className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Stay Informed</h3>
        <p className="mb-4 opacity-90">Get the latest news delivered to your inbox</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-gray-900"
          />
          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-gray-900"
          />
          {error && <p className="text-sm text-red-200">{error}</p>}
          {success && (
            <p className="text-sm text-green-200 flex items-center justify-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Subscribed!</span>
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="email"
        placeholder="Your email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 pr-24 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-1 top-1 px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
      </button>
      {success && (
        <p className="text-xs text-green-400 mt-1 flex items-center space-x-1">
          <CheckCircle className="w-3 h-3" />
          <span>Subscribed!</span>
        </p>
      )}
    </form>
  );
}

export default NewsletterSignup;