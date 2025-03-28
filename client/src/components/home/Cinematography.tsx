import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Play, Film, Activity } from 'lucide-react';
import VideoPlayer from '@/components/shared/VideoPlayer';

const cinematographyItems = [
  {
    id: 1,
    title: "Urban Rhythms",
    category: "Short Film",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-32807-large.mp4",
    description: "A visual exploration of city life rhythms and patterns captured through dynamic camera movement.",
    techniques: ["Dolly Zoom", "Time Lapse", "Aerial Drone Shots"]
  },
  {
    id: 2,
    title: "Emotional Landscapes",
    category: "Documentary",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4",
    description: "Documenting the changing emotional landscapes through visual storytelling techniques.",
    techniques: ["Golden Hour", "Natural Lighting", "Long Shots"]
  },
  {
    id: 3,
    title: "Character Study",
    category: "Drama",
    thumbnail: "https://images.unsplash.com/photo-1581271293441-324af5b346b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-woman-standing-on-building-roof-seen-from-above-32689-large.mp4",
    description: "Intimate character portrayal through cinematic techniques that reveal inner emotions.",
    techniques: ["Extreme Close-ups", "Shallow Depth of Field", "Handheld Camera"]
  }
];

const Cinematography = () => {
  const { ref, controls } = useScrollAnimation();
  const [selectedVideo, setSelectedVideo] = useState<{id: number, title: string, videoSrc: string} | null>(null);
  
  return (
    <section id="cinematography" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <Film className="mr-2 text-primary" size={28} />
            <span className="text-sm uppercase tracking-widest text-primary">Cinematography</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
            }}
          >
            Visual Storytelling Through Motion
          </motion.h2>
          
          <motion.p 
            className="text-lg max-w-2xl mx-auto text-gray-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            Our cinematography team combines technical expertise with artistic vision to create compelling visual narratives.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cinematographyItems.map((item, index) => (
            <CinematographyItem 
              key={item.id} 
              item={item} 
              index={index} 
              onPlay={() => setSelectedVideo({
                id: item.id,
                title: item.title,
                videoSrc: item.videoSrc
              })} 
            />
          ))}
        </div>
      </div>
      
      {/* Film strip decoration */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden opacity-30">
        <div className="flex">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-16 h-16 border border-white/20 flex-shrink-0 relative">
              <div className="absolute inset-1 bg-black/40"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden opacity-30">
        <div className="flex">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-16 h-16 border border-white/20 flex-shrink-0 relative">
              <div className="absolute inset-1 bg-black/40"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer 
          src={selectedVideo.videoSrc}
          title={selectedVideo.title}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};

interface CinematographyItemProps {
  item: {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    videoSrc: string;
    description: string;
    techniques: string[];
  };
  index: number;
  onPlay: () => void;
}

const CinematographyItem: React.FC<CinematographyItemProps> = ({ item, index, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Generate a visual "waveform" for each item representing the video's energy
  const generateWaveform = () => {
    const bars = [];
    const count = 16;
    
    for (let i = 0; i < count; i++) {
      // Create a semi-random height based on item id and position
      const height = 20 + Math.sin(i * (item.id * 0.5) * 0.3) * 15 + Math.random() * 10;
      
      bars.push(
        <div 
          key={i}
          className="w-1 bg-primary rounded-full mx-[1px] transition-all duration-300"
          style={{ 
            height: `${height}%`,
            opacity: isHovered ? 0.8 : 0.4,
            transform: isHovered ? 'scaleY(1.2)' : 'scaleY(1)',
            transitionDelay: `${i * 30}ms`
          }}
        />
      );
    }
    
    return bars;
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, delay: 0.1 * index }
      }}
      className="relative rounded-lg overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{ 
            backgroundImage: `url(${item.thumbnail})`,
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={onPlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.8 }}
            animate={{ scale: isHovered ? 1 : 0.8 }}
          >
            <Play size={24} className="text-white ml-1" />
          </motion.button>
        </div>
        
        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs bg-primary/80 text-white rounded-full">
            {item.category}
          </span>
        </div>
        
        {/* Audio waveform visual element */}
        <div className="absolute bottom-4 left-4 right-4 h-10 flex items-end space-x-[1px]">
          {generateWaveform()}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 bg-gray-900">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <Activity size={16} className="text-primary" />
        </div>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.techniques.map((tech, idx) => (
            <span key={idx} className="px-2 py-1 text-xs bg-gray-800/60 text-gray-300 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Film frame overlay effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Film frame lines */}
        <div className="absolute top-0 left-4 right-4 h-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Sprocket holes */}
        <div className="absolute left-1 top-[20%] w-2 h-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute left-1 top-[40%] w-2 h-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute left-1 top-[60%] w-2 h-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute left-1 top-[80%] w-2 h-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="absolute right-1 top-[20%] w-2 h-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute right-1 top-[40%] w-2 h-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute right-1 top-[60%] w-2 h-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute right-1 top-[80%] w-2 h-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </motion.div>
  );
};

export default Cinematography;