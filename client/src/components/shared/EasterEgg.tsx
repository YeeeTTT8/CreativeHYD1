import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSoundEffect } from '@/lib/sounds';

const EasterEgg = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Easter egg will appear at a random position after 30 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      const x = 20 + Math.random() * (window.innerWidth - 100);
      const y = 20 + Math.random() * (window.innerHeight - 100);
      setPosition({ x, y });
      setIsVisible(true);
    }, 30000);

    return () => clearTimeout(timeout);
  }, []);

  // Handle activation
  const activateEasterEgg = () => {
    setIsActivated(true);
    
    // Play sound effect
    playSoundEffect();
    
    // Hide after animation completes
    setTimeout(() => {
      setIsVisible(false);
      
      // Show again after 60 seconds at a new position
      setTimeout(() => {
        const x = 20 + Math.random() * (window.innerWidth - 100);
        const y = 20 + Math.random() * (window.innerHeight - 100);
        setPosition({ x, y });
        setIsVisible(true);
        setIsActivated(false);
      }, 60000);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed z-50 pointer-events-none" style={{ left: position.x, top: position.y }}>
          {!isActivated ? (
            <motion.button
              className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg pointer-events-auto cursor-pointer"
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [0, 20, -20, 0],
                opacity: 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
              onClick={activateEasterEgg}
              whileHover={{ 
                scale: 1.2,
                boxShadow: "0 0 25px rgba(168, 85, 247, 0.7)"
              }}
            >
              <span className="block text-lg font-bold text-white">?</span>
            </motion.button>
          ) : (
            <motion.div className="absolute">
              <div className="relative w-screen h-screen" style={{ left: -position.x, top: -position.y }}>
                {/* Particle explosion */}
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 rounded-full"
                    initial={{ 
                      x: position.x, 
                      y: position.y, 
                      scale: 0,
                      backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`
                    }}
                    animate={{ 
                      x: position.x + (Math.random() - 0.5) * window.innerWidth * 1.5,
                      y: position.y + (Math.random() - 0.5) * window.innerHeight * 1.5,
                      scale: [0, Math.random() * 3],
                      opacity: [1, 0]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 3,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Center explosion */}
                <motion.div
                  className="absolute rounded-full bg-white"
                  style={{ 
                    left: position.x, 
                    top: position.y,
                    width: '50px',
                    height: '50px',
                    marginLeft: '-25px',
                    marginTop: '-25px'
                  }}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 15],
                    opacity: [1, 0]
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                
                {/* Message */}
                <motion.div
                  className="absolute px-8 py-4 bg-black/80 text-white font-bold rounded-lg text-xl"
                  style={{ 
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  🎉 You found the secret! 🎉
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;