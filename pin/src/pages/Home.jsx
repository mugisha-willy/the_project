import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Play, Newspaper, Flame, ChevronRight, Heart, Building } from 'lucide-react';
import { getVideos, getPosts, getTrending } from '../api/api';
import HeaderSlideshow from '../components/HeaderSlideshow';
import VideoCard from '../components/VideoCard';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';

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

function Home() {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [videosRes, postsRes, trendingRes] = await Promise.all([
        getVideos(),
        getPosts(),
        getTrending()
      ]);
      
      // Handle videos response
      if (videosRes.data && videosRes.data.videos) {
        setVideos(videosRes.data.videos.slice(0, 6));
      } else if (Array.isArray(videosRes.data)) {
        setVideos(videosRes.data.slice(0, 6));
      }
      
      // Handle posts response
      if (postsRes.data && postsRes.data.posts) {
        setPosts(postsRes.data.posts.slice(0, 3));
      } else if (Array.isArray(postsRes.data)) {
        setPosts(postsRes.data.slice(0, 3));
      }
      
      // Handle trending response
      if (Array.isArray(trendingRes.data)) {
        setTrending(trendingRes.data.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* ✅ Header Slideshow - Ads will appear here */}
      <HeaderSlideshow />
      
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12">
        {/* Trending Section */}
        {trending.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Flame className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-dark">{t('sections.trending')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trending.map((item, idx) => (
                <VideoCard key={item.id} video={item} rank={idx + 1} />
              ))}
            </div>
          </section>
        )}
        
        {/* Videos Section */}
        <section id="videos" className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">{t('sections.latestVideos')}</h2>
            <Link to="/videos" className="text-primary hover:text-primary-dark flex items-center space-x-1 font-medium">
              <span>{t('sections.viewAll')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="mb-12">
          <div className="relative bg-gradient-red rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('buttons.support', 'Support Independent Journalism')}
              </h2>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                {t('donate.subtitle', 'Your donation helps us continue providing quality news and content to Rwanda')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/donate" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg inline-flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>{t('buttons.donateNow', 'Donate Now')}</span>
                </Link>
                <Link to="/sponsorship" className="border-2 border-white text-white hover:bg-white hover:text-dark px-8 py-3 rounded-full font-bold transition inline-flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>{t('buttons.sponsorNow', 'Become a Sponsor')}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Posts Section */}
        <section id="news">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">{t('sections.latestNews')}</h2>
            <Link to="/posts" className="text-primary hover:text-primary-dark flex items-center space-x-1 font-medium">
              <span>{t('sections.viewAll')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
      
      
    </div>
  );
}

export default Home;