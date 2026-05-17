import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Video, Newspaper, Flame, LogIn, User, ChevronDown, Search, Info, LogOut, MessageCircle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './SearchModal';
import { logout as apiLogout } from '../api/api';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { t } = useTranslation();
  const { isLoggedIn, user, logout: authLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authLogout();
      navigate('/login');
    }
  };

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/videos', label: t('nav.videos'), icon: Video },
    { to: '/posts', label: t('nav.news'), icon: Newspaper },
    { to: '/trending', label: t('nav.trending'), icon: Flame },
    { to: '/about', label: t('nav.about'), icon: Info },
    { to: '/contact', label: t('nav.contact'), icon: MessageCircle }
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark shadow-lg py-2' : 'bg-dark/95 backdrop-blur-sm py-3'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <img 
                src="/pinRwanda.png" 
                alt="PIN RWANDA Logo" 
                className="w-9 h-9 object-contain rounded-lg shadow-lg"
              />
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white">PIN <span className="text-primary">RWANDA</span></span>
                <p className="text-xs text-gray-400 hidden lg:block">{t('hero.subtitle')}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg transition whitespace-nowrap"
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg transition"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <LanguageSwitcher />

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm hidden md:inline">{user?.name?.split(' ')[0] || 'Admin'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showUserMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50">
                        <div className="px-4 py-2 text-xs text-gray-500 border-b">Admin Panel</div>
                        <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setShowUserMenu(false)}>Dashboard</Link>
                        <Link to="/create-post" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setShowUserMenu(false)}>Create Post</Link>
                        <Link to="/admin/display-ads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setShowUserMenu(false)}>Manage Ads</Link>
                        <hr className="my-1" />
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center space-x-2">
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm">{t('nav.login')}</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg ml-1"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
            <div className="flex flex-col space-y-2 border-t border-gray-800 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg"
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg">Dashboard</Link>
                  <Link to="/create-post" onClick={() => setIsOpen(false)} className="px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg">Create Post</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-white/5 rounded-lg">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg">
                  <LogIn className="w-4 h-4" />
                  <span>{t('nav.login')}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}

export default Navbar;