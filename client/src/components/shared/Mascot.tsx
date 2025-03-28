import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface MascotProps {
  initialMessage?: string;
}

interface MascotMessage {
  id: number;
  text: string;
  section: string;
}

const Mascot: React.FC<MascotProps> = ({ initialMessage = "Hi there! I'm Pixel, your creative guide!" }) => {
  const [location] = useLocation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState(initialMessage);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isWaving, setIsWaving] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Messages for different sections
  const sectionMessages: MascotMessage[] = [
    { 
      id: 1, 
      text: "Welcome! I'm Pixel, your creative companion. Scroll down to explore our amazing work!", 
      section: "/" 
    },
    { 
      id: 2, 
      text: "Our team has crafted stunning visuals and innovative designs for clients worldwide!", 
      section: "#about" 
    },
    { 
      id: 3, 
      text: "Check out these awesome services we offer! Which one catches your eye?", 
      section: "#services" 
    },
    { 
      id: 4, 
      text: "Here's our best work! Hover over each project to see more details.", 
      section: "#portfolio" 
    },
    { 
      id: 5, 
      text: "Our clients love working with us! See what they have to say.", 
      section: "#testimonials" 
    },
    { 
      id: 6, 
      text: "Want to work together? Drop us a message and let's create something amazing!", 
      section: "#contact" 
    }
  ];

  // Initialize blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Stop waving after initial appearance
  useEffect(() => {
    const wavingTimeout = setTimeout(() => {
      setIsWaving(false);
    }, 3000);

    return () => clearTimeout(wavingTimeout);
  }, []);

  // Update mascot position based on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Position the mascot on the bottom right corner, adjusted for scroll
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Keep mascot in bottom right, but don't let it go offscreen
      setPosition({
        x: viewportWidth - 150,
        y: window.scrollY + viewportHeight - 150,
      });

      // Determine which section is in view
      const sections = ['#about', '#services', '#portfolio', '#testimonials', '#contact'];
      
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section is in viewport
          if (rect.top < viewportHeight * 0.7 && rect.bottom > 0) {
            const sectionMsg = sectionMessages.find(msg => msg.section === section);
            if (sectionMsg) {
              setMessage(sectionMsg.text);
              break;
            }
          }
        }
      }
    };

    // Initial position
    handleScroll();

    // Update on scroll
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionMessages]);

  // Show appropriate message when location changes
  useEffect(() => {
    const currentSectionMsg = sectionMessages.find(msg => 
      location.includes(msg.section) || 
      (location === '/' && msg.section === '/')
    );
    
    if (currentSectionMsg) {
      setMessage(currentSectionMsg.text);
      setIsExpanded(true);
      
      // Hide message after some time
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      messageTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }

    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [location, sectionMessages]);

  // Toggle message visibility
  const toggleMessage = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Clear previous timeout if exists
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      // Set new timeout
      messageTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }
  };

  // Save visibility to localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem('mascotVisible');
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === 'true');
    }
  }, []);

  // Update localStorage when visibility changes
  useEffect(() => {
    localStorage.setItem('mascotVisible', isVisible.toString());
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div 
      ref={mascotRef}
      className="fixed z-50 select-none"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-100%, -100%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {/* Mascot character with message bubble */}
      <div className="relative flex flex-col items-end">
        {/* Message bubble */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-3 mb-3 max-w-[250px] text-sm relative"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-gray-800 dark:text-gray-200">
                {message}
              </div>
              <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white dark:bg-gray-800 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot character (SVG) */}
        <motion.div 
          className="bg-primary rounded-full w-20 h-20 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
          onClick={toggleMessage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 60 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="p-1"
          >
            {/* Face */}
            <circle cx="30" cy="30" r="25" fill="#F8FAFC" />
            
            {/* Eyes */}
            <motion.g 
              animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
              transition={{ duration: 0.1 }}
              style={{ transformOrigin: 'center' }}
            >
              <circle cx="22" cy="25" r="5" fill="#334155" />
              <circle cx="38" cy="25" r="5" fill="#334155" />
              
              {/* Eye highlights */}
              <circle cx="24" cy="23" r="2" fill="white" />
              <circle cx="40" cy="23" r="2" fill="white" />
            </motion.g>
            
            {/* Mouth */}
            <path d="M22 38C22 38 26 43 30 43C34 43 38 38 38 38" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            
            {/* Wave hand animation */}
            <motion.g
              animate={isWaving ? { 
                rotate: [0, 20, 0, 20, 0],
                translateY: [0, -2, 0, -2, 0]
              } : {}}
              transition={{ 
                repeat: isWaving ? Infinity : 0, 
                duration: 1.5,
                repeatType: "loop" 
              }}
              style={{ transformOrigin: 'bottom right' }}
            >
              <circle cx="48" cy="40" r="6" fill="#F8FAFC" />
              <path d="M45 40L48 43L51 40" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>
          </svg>
        </motion.div>
        
        {/* Close button */}
        <button 
          className="absolute -top-2 -right-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          onClick={() => setIsVisible(false)}
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default Mascot;