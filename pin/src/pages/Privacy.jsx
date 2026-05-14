import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail, Cookie } from 'lucide-react';
import Footer from '../components/Footer';

function Privacy() {
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
            {t('privacy.title')}
          </h1>
          
          <p className="text-xl max-w-2xl mx-auto">
            {t('privacy.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          {/* Intro Box */}
          <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3">
            <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary flex items-center space-x-2">
              <Database className="w-6 h-6" />
              <span>{t('privacy.collect')}</span>
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect information that you provide directly to us, including:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Name and contact information (email, phone number)</li>
              <li>Account credentials (username and password)</li>
              <li>Payment information for donations and sponsorships</li>
              <li>Comments and messages you post on our platform</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary flex items-center space-x-2">
              <Eye className="w-6 h-6" />
              <span>{t('privacy.use')}</span>
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              We use your information to:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process donations and sponsorship requests</li>
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage patterns</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary flex items-center space-x-2">
              <Cookie className="w-6 h-6" />
              <span>{t('privacy.cookies')}</span>
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('privacy.sharing')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share information 
              with service providers who assist in our operations, law enforcement when required by law, or with your consent.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('privacy.security')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('privacy.rights')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('privacy.children')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t('privacy.changes')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting 
              the new policy on this page.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary flex items-center space-x-2">
              <Mail className="w-6 h-6" />
              <span>{t('privacy.contact')}</span>
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@pinrwanda.com" className="text-primary hover:underline">
                privacy@pinrwanda.com
              </a>
            </p>
          </section>

          {/* Footer */}
          <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-500">
            <p>Last updated: January 1, 2025</p>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default Privacy;