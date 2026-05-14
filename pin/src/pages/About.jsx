import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Target, Shield, Users, Heart, Building, Award, TrendingUp, ArrowLeft, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import Footer from '../components/Footer';

function About() {
  const { t } = useTranslation();

  const stats = [
    { number: '50K+', label: t('readers'), icon: Users },
    { number: '500+', label: t('videos'), icon: Award },
    { number: '1000+', label: t('articles'), icon: TrendingUp },
    { number: '150+', label: t('supporters'), icon: Heart },
  ];

  const team = [
    { name: 'John Doe', role: t('editor'), image: null },
    { name: 'Jane Smith', role: t('managingEditor'), image: null },
    { name: 'David Kim', role: t('videoProducer'), image: null },
    { name: 'Sarah Johnson', role: t('seniorReporter'), image: null },
  ];

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <div className="bg-gradient-red text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </Link>
          
          <Globe className="w-16 h-16 mx-auto mb-4" />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('about.title')}
          </h1>
          
          <p className="text-xl max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <Target className="w-12 h-12 text-primary mb-4" />
            
            <h2 className="text-2xl font-bold mb-4">
              {t('about.mission')}
            </h2>
            
            <p className="text-gray-700 leading-relaxed">
              {t('about.missionText')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-8">
            <Shield className="w-12 h-12 text-primary mb-4" />
            
            <h2 className="text-2xl font-bold mb-4">
              {t('about.values')}
            </h2>
            
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{t('about.valuesList.integrity')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{t('about.valuesList.accuracy')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{t('about.valuesList.independence')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{t('about.valuesList.innovation')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{t('about.valuesList.community')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              
              <p className="text-2xl font-bold text-primary">
                {stat.number}
              </p>
              
              <p className="text-gray-600 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Support Section - Donate & Sponsor */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-red rounded-2xl p-8 text-white text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" fill="currentColor" />
            
            <h2 className="text-2xl font-bold mb-3">
              {t('buttons.support')}
            </h2>
            
            <p className="mb-4 opacity-90">
              {t('donate.subtitle')}
            </p>
            
            <Link to="/donate" className="inline-block bg-white text-primary px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
              {t('buttons.donateNow')}
            </Link>
          </div>
          
          <div className="bg-dark rounded-2xl p-8 text-white text-center">
            <Building className="w-12 h-12 mx-auto mb-4" />
            
            <h2 className="text-2xl font-bold mb-3">
              {t('sponsorship.title')}
            </h2>
            
            <p className="mb-4 opacity-90">
              {t('sponsorship.subtitle')}
            </p>
            
            <Link to="/sponsorship" className="inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition">
              {t('buttons.sponsorNow')}
            </Link>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t('about.team')}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                
                <h3 className="font-bold text-lg">
                  {member.name}
                </h3>
                
                <p className="text-gray-500 text-sm">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t('about.contact')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <span>info@pinrwanda.com</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-5 h-5 text-primary" />
              <span>+250 788 123 456</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{t('footer.address')}</span>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}

export default About;