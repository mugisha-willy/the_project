import { useState } from 'react';
import api from '../api/api';

export default function DonationButton({ videoId, postId }) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(10);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      await api.post('/donations', {
        donor_name: name || 'Anonymous',
        donor_email: email,
        amount,
        message,
        video_id: videoId,
        post_id: postId
      });
      alert('Thank you for your support!');
      setShowModal(false);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Donation error:', error);
      alert('Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        💝 Support
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">Support Independent Journalism</h2>
            <p className="text-gray-600 mb-4">Your donation helps us continue our work</p>
            
            <div className="flex gap-2 mb-4 flex-wrap">
              {[5, 10, 20, 50, 100].map(a => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`px-4 py-2 rounded-lg transition ${
                    amount === a ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>
            
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-3"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-3"
            />
            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleDonate}
                disabled={loading}
                className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Donate $${amount}`}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}