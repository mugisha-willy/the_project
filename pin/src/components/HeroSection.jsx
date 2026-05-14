import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Play, Newspaper, Heart, Building } from 'lucide-react';

function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <div className="relative bg-gradient-red overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          PIN <span className="text-primary">RWANDA</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#videos" className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition inline-flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>{t('hero.watch')}</span>
          </a>
          <a href="#news" className="border-2 border-white text-white hover:bg-white hover:text-dark px-6 py-3 rounded-full font-semibold transition inline-flex items-center space-x-2">
            <Newspaper className="w-5 h-5" />
            <span>{t('hero.read')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;