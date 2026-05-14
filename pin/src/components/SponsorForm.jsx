import { useState } from 'react';
import { X, Building, User, Mail, Phone, DollarSign, Calendar } from 'lucide-react';
import { createDonation, getDonationStats } from '../api/api';
function SponsorForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    sponsorship_type: 'bronze',
    amount: '',
    duration_months: 1,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sponsorshipTypes = [
    { value: 'bronze', label: 'Bronze', amount: 100000, color: 'bg-amber-600', benefits: 'Logo placement, Social media mention' },
    { value: 'silver', label: 'Silver', amount: 250000, color: 'bg-gray-400', benefits: 'All Bronze + Sidebar ad, Priority support' },
    { value: 'gold', label: 'Gold', amount: 500000, color: 'bg-yellow-500', benefits: 'All Silver + Homepage feature, 2 sponsored posts' },
    { value: 'platinum', label: 'Platinum', amount: 1000000, color: 'bg-blue-400', benefits: 'All Gold + Exclusive interview, Custom package' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createSponsorship(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ company_name: '', contact_person: '', email: '', phone: '', sponsorship_type: 'bronze', amount: '', duration_months: 1, message: '' });
      }, 2000);
    } catch (error) {
      alert('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const selectedType = sponsorshipTypes.find(t => t.value === formData.sponsorship_type);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">Sponsorship Request</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Request Sent!</h3>
            <p className="text-gray-600">We'll contact you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name *</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact Person *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.contact_person}
                  onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="contact@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+250 788 123 456"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sponsorship Package *</label>
              <div className="space-y-2">
                {sponsorshipTypes.map((type) => (
                  <label key={type.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition hover:border-primary ${formData.sponsorship_type === type.value ? 'border-primary bg-primary/5' : ''}`}>
                    <input
                      type="radio"
                      name="sponsorship_type"
                      value={type.value}
                      checked={formData.sponsorship_type === type.value}
                      onChange={(e) => setFormData({ ...formData, sponsorship_type: e.target.value, amount: type.amount.toString() })}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className={`font-semibold ${type.color} text-white px-2 py-0.5 rounded text-sm`}>
                          {type.label}
                        </span>
                        <span className="font-bold">RWF {type.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{type.benefits}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration (Months)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={formData.duration_months}
                  onChange={(e) => setFormData({ ...formData, duration_months: parseInt(e.target.value) })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={1}>1 Month</option>
                  <option value={3}>3 Months (5% discount)</option>
                  <option value={6}>6 Months (10% discount)</option>
                  <option value={12}>12 Months (15% discount)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Additional Message</label>
              <textarea
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Any specific requirements or questions?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SponsorForm;