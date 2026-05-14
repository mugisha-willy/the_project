import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Building, Award, TrendingUp, Mail, Phone, ArrowLeft, CheckCircle, Star, Diamond, Send } from 'lucide-react';
import Footer from '../components/Footer';

function Sponsorship() {
  const { t } = useTranslation();
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const sponsorshipPackages = [
    { 
      value: 'bronze', 
      label: t('sponsorship.bronze'), 
      amount: 100000, 
      icon: Award, 
      benefits: [
        t('sponsorship.bronzeBenefit1'),
        t('sponsorship.bronzeBenefit2'),
        t('sponsorship.bronzeBenefit3')
      ] 
    },
    { 
      value: 'silver', 
      label: t('sponsorship.silver'), 
      amount: 250000, 
      icon: Star, 
      benefits: [
        t('sponsorship.silverBenefit1'),
        t('sponsorship.silverBenefit2'),
        t('sponsorship.silverBenefit3')
      ] 
    },
    { 
      value: 'gold', 
      label: t('sponsorship.gold'), 
      amount: 500000, 
      icon: Diamond, 
      benefits: [
        t('sponsorship.goldBenefit1'),
        t('sponsorship.goldBenefit2'),
        t('sponsorship.goldBenefit3')
      ] 
    },
    { 
      value: 'platinum', 
      label: t('sponsorship.platinum'), 
      amount: 1000000, 
      icon: TrendingUp, 
      benefits: [
        t('sponsorship.platinumBenefit1'),
        t('sponsorship.platinumBenefit2'),
        t('sponsorship.platinumBenefit3')
      ] 
    }
  ];

  const selectedPackage = sponsorshipPackages.find(p => p.value === formData.sponsorship_type);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-red text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </Link>
          
          <Building className="w-16 h-16 mx-auto mb-4" />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('sponsorship.title')}
          </h1>
          
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('sponsorship.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Packages Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t('sponsorship.packages')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipPackages.map((pkg) => (
              <div 
                key={pkg.value} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                  formData.sponsorship_type === pkg.value 
                    ? 'border-primary shadow-xl' 
                    : 'border-transparent'
                }`}
              >
                <div className="bg-dark p-6 text-white text-center">
                  <pkg.icon className="w-12 h-12 mx-auto mb-2 text-primary" />
                  
                  <h3 className="text-2xl font-bold">
                    {pkg.label}
                  </h3>
                  
                  <p className="text-2xl font-bold mt-2 text-primary">
                    RWF {pkg.amount.toLocaleString()}
                  </p>
                  
                  <p className="text-sm opacity-80">
                    /{t('sponsorship.perMonth')}
                  </p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {pkg.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setFormData({ 
                      ...formData, 
                      sponsorship_type: pkg.value, 
                      amount: pkg.amount.toString() 
                    })}
                    className={`w-full py-3 rounded-xl font-bold transition ${
                      formData.sponsorship_type === pkg.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formData.sponsorship_type === pkg.value 
                      ? t('sponsorship.selected') 
                      : t('sponsorship.select')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t('sponsorship.requestForm')}
            </h2>
            
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">
                  {t('sponsorship.success')}
                </h3>
                
                <p className="text-gray-600">
                  {t('sponsorship.successMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('sponsorship.companyName')} *
                    </label>
                    
                    <input
                      type="text"
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('sponsorship.contactPerson')} *
                    </label>
                    
                    <input
                      type="text"
                      required
                      value={formData.contact_person}
                      onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('sponsorship.email')} *
                    </label>
                    
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('sponsorship.phone')}
                    </label>
                    
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('sponsorship.selectedPackage')}
                    </label>
                    
                    <div className="px-4 py-3 bg-gray-50 rounded-xl font-semibold">
                      {selectedPackage?.label} - RWF {selectedPackage?.amount.toLocaleString()}/{t('sponsorship.perMonth')}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('sponsorship.duration')}
                    </label>
                    
                    <select
                      value={formData.duration_months}
                      onChange={(e) => setFormData({ ...formData, duration_months: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value={1}>1 {t('sponsorship.month')}</option>
                      <option value={3}>3 {t('sponsorship.months')} (5% {t('sponsorship.discount')})</option>
                      <option value={6}>6 {t('sponsorship.months')} (10% {t('sponsorship.discount')})</option>
                      <option value={12}>12 {t('sponsorship.months')} (15% {t('sponsorship.discount')})</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('sponsorship.message')}
                  </label>
                  
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('sponsorship.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('sponsorship.submit')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Sponsorship;