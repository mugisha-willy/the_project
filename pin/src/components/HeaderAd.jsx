import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { getActiveDisplayAd, trackAdView, trackAdClick } from '../api/api';

function HeaderAd() {
  const [ad, setAd] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchHeaderAd();
  }, []);

  const fetchHeaderAd = async () => {
    try {
      const response = await getActiveDisplayAd();
      if (response.data) {
        setAd(response.data);
        await trackAdView(response.data.id);
      }
    } catch (error) {
      console.error('Error fetching header ad:', error);
    }
  };

  const handleClick = async () => {
    if (ad && ad.link) {
      try {
        await trackAdClick(ad.id);
        window.open(ad.link, '_blank');
      } catch (error) {
        console.error('Error tracking click:', error);
      }
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!ad || !visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-primary/30">
      <div className="container mx-auto px-4 py-3">
        <div className="relative group">
          <div className="absolute top-0 left-0 z-10 bg-primary/80 text-white text-xs px-2 py-0.5 rounded-br-lg">
            Advertisement
          </div>
          
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 z-20 bg-gray-800 rounded-full shadow-md p-1 hover:bg-gray-700 transition opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div onClick={handleClick} className="cursor-pointer">
            {ad.type === 'video' ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={ad.video_url}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-auto max-h-32 object-contain rounded-lg"
                />
                <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
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
                src={ad.image_url}
                alt={ad.title}
                className="w-full h-auto max-h-32 object-contain mx-auto rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAd;