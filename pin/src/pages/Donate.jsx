import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, TrendingUp, Users, Shield, ArrowLeft, CheckCircle, Plus, Minus } from 'lucide-react';
import Footer from '../components/Footer';

function Donate() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    amount: '',
    message: '',
    is_anonymous: false
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const presetAmounts = [5000, 10000, 25000, 50000, 100000];

  const handleAmountChange = (value) => {
    const numericValue = parseInt(value) || 0;
    setFormData({ ...formData, amount: numericValue.toString() });
  };

  const incrementAmount = () => {
    const current = parseInt(formData.amount) || 0;
    setFormData({ ...formData, amount: (current + 1000).toString() });
  };

  const decrementAmount = () => {
    const current = parseInt(formData.amount) || 0;
    if (current >= 1000) {
      setFormData({ ...formData, amount: (current - 1000).toString() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({
        donor_name: '',
        donor_email: '',
        amount: '',
        message: '',
        is_anonymous: false
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-red text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </Link>
          
          <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse" fill="currentColor" />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('donate.title')}
          </h1>
          
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('donate.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>{t('donate.impact')}</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-primary">150+</p>
                  <p className="text-gray-600">{t('donate.supporters')}</p>
                </div>
                
                <div>
                  <p className="text-3xl font-bold text-primary">RWF 2.5M</p>
                  <p className="text-gray-600">{t('donate.raised')}</p>
                </div>
                
                <div>
                  <p className="text-3xl font-bold text-primary">50K+</p>
                  <p className="text-gray-600">{t('donate.readers')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>{t('donate.whyDonate')}</span>
              </h3>
              
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>{t('donate.reason1')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>{t('donate.reason2')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>{t('donate.reason3')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>{t('donate.reason4')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">
                    {t('donate.thankYou')}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {t('donate.thankYouMessage')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {t('donate.selectAmount')}
                    </label>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountChange(amount)}
                          className={`py-3 px-4 rounded-xl font-semibold transition ${
                            parseInt(formData.amount) === amount
                              ? 'bg-primary text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          RWF {amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    
                    {/* Custom Amount */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        {t('donate.customAmount')}
                      </label>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={decrementAmount}
                          className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <input
                          type="number"
                          value={formData.amount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-center text-lg font-semibold"
                          placeholder="0"
                          min="0"
                          step="1000"
                        />
                        
                        <button
                          type="button"
                          onClick={incrementAmount}
                          className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('donate.name')} *
                    </label>
                    
                    <input
                      type="text"
                      required
                      value={formData.donor_name}
                      onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={t('donate.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('donate.email')}
                    </label>
                    
                    <input
                      type="email"
                      value={formData.donor_email}
                      onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('donate.message')}
                    </label>
                    
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={t('donate.messagePlaceholder')}
                    />
                  </div>

                  {/* Anonymous Checkbox */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_anonymous}
                      onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-sm text-gray-600">
                      {t('donate.anonymous')}
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Heart className="w-5 h-5" fill="currentColor" />
                        <span>
                          {t('donate.button')} {formData.amount ? `RWF ${parseInt(formData.amount).toLocaleString()}` : ''}
                        </span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Donate;