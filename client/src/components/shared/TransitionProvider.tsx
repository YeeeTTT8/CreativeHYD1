import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Animation for transition overlay
const overlayVariants = {
  initial: {
    scale: 0,
    opacity: 0.5,
    borderRadius: '100%',
  },
  animate: {
    scale: 3,
    opacity: 0,
    borderRadius: '100%',
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const TransitionProvider = ({
  children,
  enableTransitions = true,
}: {
  children: ReactNode;
  enableTransitions?: boolean;
}) => {
  const [location] = useLocation();
  const [transitionKey, setTransitionKey] = useState(location);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  
  // Update transition key when location changes
  useEffect(() => {
    if (location !== transitionKey) {
      if (enableTransitions) {
        // Create a revealing transition animation from the center of the screen
        setOverlayPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        });
        setShowOverlay(true);
        
        // Delay the actual page change to allow overlay animation
        setTimeout(() => {
          setTransitionKey(location);
          setTimeout(() => {
            setShowOverlay(false);
          }, 600);
        }, 300);
      } else {
        setTransitionKey(location);
      }
    }
  }, [location, transitionKey, enableTransitions]);
  
  return (
    <>
      {/* Transition overlay */}
      {enableTransitions && (
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="initial"
              variants={overlayVariants}
              className="fixed z-[9999] w-20 h-20 -ml-10 -mt-10 bg-primary pointer-events-none"
              style={{
                top: overlayPosition.y,
                left: overlayPosition.x,
              }}
            />
          )}
        </AnimatePresence>
      )}
      
      {/* Page content with transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default TransitionProvider;