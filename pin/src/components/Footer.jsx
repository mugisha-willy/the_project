import { Mail, Phone, MapPin, Send, Heart } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white mt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">PIN <span className="text-primary">RWANDA</span></span>
                <p className="text-xs text-gray-400">News & Multimedia</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.about', 'Your trusted source for news, videos, and multimedia content in Rwanda.')}
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="https://www.facebook.com/PINRWANDA" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="https://x.com/PINRWANDA" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/pin_rwanda/" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/results?search_query=pin+rwanda" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition flex items-center space-x-2 group"><span className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all"></span><span>{t('nav.home', 'Home')}</span></Link></li>
              <li><Link to="/videos" className="text-gray-400 hover:text-primary transition flex items-center space-x-2 group"><span className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all"></span><span>{t('nav.videos', 'Videos')}</span></Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-primary transition flex items-center space-x-2 group"><span className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all"></span><span>{t('nav.news', 'News')}</span></Link></li>
              <li><Link to="/trending" className="text-gray-400 hover:text-primary transition flex items-center space-x-2 group"><span className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all"></span><span>{t('nav.trending', 'Trending')}</span></Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition flex items-center space-x-2 group"><span className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all"></span><span>{t('nav.about', 'About Us')}</span></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('footer.contactUs', 'Contact Us')}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="hover:text-primary transition">pintvrwanda@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="hover:text-primary transition">+250 739 852 098</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="hover:text-primary transition">Kigali, Rwanda</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('footer.newsletter', 'Newsletter')}</h4>
            <p className="text-gray-400 text-sm mb-3">Subscribe for daily updates</p>
            <div className="flex relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all pr-12"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary rounded-lg hover:bg-primary-dark transition-all duration-300">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PIN RWANDA. {t('footer.rights', 'All rights reserved.')} | PIN MEDIA RWANDA LTD
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Made with <Heart className="w-3 h-3 inline text-primary animate-pulse" /> for Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;