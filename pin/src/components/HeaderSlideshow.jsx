import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDisplayAds, trackAdClick } from '../api/api';

function HeaderSlideshow() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    fetchAds();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const fetchAds = async () => {
    try {
      console.log('Fetching header ads...');
      const response = await getDisplayAds();
      console.log('Ads response:', response.data);
      
      if (response.data && response.data.length > 0) {
        setAds(response.data);
      } else {
        console.log('No ads found');
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentAd = ads[currentIndex];
  const duration = currentAd?.duration || 5;

  const startTimer = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    setProgress(0);
    startTimeRef.current = Date.now();
    
    const updateProgress = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const newProgress = (elapsed / duration) * 100;
      if (newProgress >= 100) {
        nextSlide();
      } else {
        setProgress(newProgress);
        animationRef.current = requestAnimationFrame(updateProgress);
      }
    };
    
    animationRef.current = requestAnimationFrame(updateProgress);
  }, [duration]);

  useEffect(() => {
    if (ads.length > 0 && isPlaying) {
      startTimer();
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [currentIndex, ads.length, isPlaying, startTimer]);

  const nextSlide = () => {
    if (ads.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }
  };

  const prevSlide = () => {
    if (ads.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
    }
  };

  const handleClick = async () => {
    if (currentAd && currentAd.link) {
      try {
        await trackAdClick(currentAd.id);
        window.open(currentAd.link, '_blank');
      } catch (error) {
        console.error('Error tracking click:', error);
      }
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      startTimer();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (loading) {
    return null;
  }

  if (!visible || ads.length === 0) {
    return null;
  }

  return (
    <div className="relative bg-dark border-b border-primary/30">
      <div className="container mx-auto px-4 py-2">
        <div className="relative group">
          <div className="absolute top-0 left-0 z-10 bg-primary text-white text-xs px-2 py-0.5 rounded-br-lg">
            Advertisement
          </div>
          
          <div className="absolute top-0 right-0 z-10 bg-black/50 text-white text-xs px-2 py-0.5 rounded-bl-lg">
            {currentIndex + 1} / {ads.length}
          </div>
          
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 z-20 bg-gray-800 rounded-full shadow-md p-1 hover:bg-gray-700 transition opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-gray-700">
            <div 
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {ads.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}
          
          <div onClick={handleClick} className="cursor-pointer">
            {currentAd?.type === 'video' ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={currentAd.video_url}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-auto max-h-24 object-contain rounded-lg"
                />
                <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                    className="bg-black/50 rounded-full p-1 hover:bg-black/70"
                  >
                    {isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    className="bg-black/50 rounded-full p-1 hover:bg-black/70"
                  >
                    {isMuted ? <VolumeX className="w-3 h-3 text-white" /> : <Volume2 className="w-3 h-3 text-white" />}
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={currentAd?.image_url}
                alt={currentAd?.title}
                className="w-full h-auto max-h-24 object-contain mx-auto rounded-lg"
              />
            )}
          </div>
          
          {ads.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1">
              {ads.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-primary w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderSlideshow;