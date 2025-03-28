import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Initialize video
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const updateDuration = () => {
        if (video.duration) setDuration(video.duration);
      };
      
      const updateProgress = () => {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
      };
      
      // Event listeners
      video.addEventListener('loadedmetadata', updateDuration);
      video.addEventListener('timeupdate', updateProgress);
      
      return () => {
        video.removeEventListener('loadedmetadata', updateDuration);
        video.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [isOpen]);
  
  // Handle play/pause
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
  
  // Handle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * duration;
      videoRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };
  
  // Handle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!isFullscreen) {
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };
  
  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle escape key for closing
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div 
        ref={playerRef}
        className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Video title bar */}
        <div className="flex items-center justify-between p-3 bg-gray-900">
          <h3 className="text-white font-medium truncate">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Video container */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-contain"
            onClick={togglePlay}
          />
          
          {/* Play/Pause overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center"
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={36} className="text-white ml-1" />
              </motion.button>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="p-3 bg-gray-900">
          {/* Progress bar */}
          <div className="relative my-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`,
              }}
            />
          </div>
          
          {/* Buttons row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-primary transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-primary transition-colors"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
        
        {/* Film border effect */}
        <div className="absolute inset-0 pointer-events-none border-[3px] border-transparent border-l-white/10 border-r-white/10">
          {/* Sprocket holes for film reel effect */}
          <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between py-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-black border-2 border-white/20 mx-auto" />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-between py-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-black border-2 border-white/20 mx-auto" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;