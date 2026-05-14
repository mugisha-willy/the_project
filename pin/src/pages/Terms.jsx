import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/Footer';

function Terms() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-red text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </Link>
          
          <Shield className="w-16 h-16 mx-auto mb-4" />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('terms.title')}
          </h1>
          
          <p className="text-xl max-w-2xl mx-auto">
            {t('terms.lastUpdated')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('terms.acceptance')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              By accessing and using PIN RWANDA website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('terms.content')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              All content published on PIN RWANDA is protected by copyright laws. You may not:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Republish material from our website without permission</li>
              <li>Sell, rent, or sub-license content from our website</li>
              <li>Reproduce, duplicate, or copy material from our website</li>
              <li>Redistribute content from PIN RWANDA</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('terms.accounts')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              When you create an account with us, you must provide accurate and complete information. 
              You are responsible for maintaining the security of your account and for all activities 
              that occur under your account.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('terms.comments')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              Users may post comments on our articles. We reserve the right to remove any comments 
              that are offensive, inappropriate, or violate our policies.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('terms.donations')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              Donations and sponsorships are non-refundable. We use all funds to support independent 
              journalism and improve our services.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('terms.liability')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              PIN RWANDA shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use of our website.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('terms.changes')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Your continued use of the site 
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Footer */}
          <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-500">
            <p>© 2025 PIN RWANDA. {t('footer.rights')}</p>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Terms;